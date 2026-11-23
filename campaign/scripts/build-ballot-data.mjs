#!/usr/bin/env node
// Builds the static ballot data the ZIP/address lookup reads: for each state, the federal offices
// on the ballot, upcoming election dates (federal, state and local), filing dates where a free
// official source has them, and the election offices to ask where none does.
//
//   FEC_API_KEY=... GOOGLE_CIVIC_API_KEY=... node campaign/scripts/build-ballot-data.mjs
//
// Writes campaign/ballot/index.json (states, federal report dates, sources, build times) and
// campaign/ballot/<ST>.json (one file per state). The page fetches only the file for the state
// the candidate's address is in.
//
// Free sources only, no paid AI APIs:
//   OpenFEC /v1/elections/search/   federal races (House district, Senate seat, President) per cycle
//   OpenFEC /v1/election-dates/     federal primaries, runoffs, specials and generals
//   OpenFEC /v1/reporting-dates/    federal campaign report due dates
//   Google Civic /v2/elections      upcoming elections, each for an OCD division (state, county, city)
//   Google Civic /v2/voterinfo      (officialOnly) the state's election office links and, close to
//                                   an election, the contests the state's official feed lists
//
// Rules (campaign/CLAUDE.md): every record carries its source. A value no free official source has
// is written as missing, with the office to ask, never filled in. Keys come only from the
// environment and never reach the files or the log (errors print the host and path only).
// If a source fails, the previous data for that source is kept and the script exits 1.
//
// For tests without network access: BALLOT_FIXTURES=<dir> reads responses from <dir>/<name>.json
// instead of calling the APIs (see fixtureName below). BALLOT_TODAY=YYYY-MM-DD pins "today".

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "..", "ballot");
const FIX = process.env.BALLOT_FIXTURES || "";
const today = (process.env.BALLOT_TODAY || new Date().toISOString()).slice(0, 10);
const horizon = addMonths(today, 30);
const year = Number(today.slice(0, 4));
// Federal cycles are named for their even-numbered election year. Read the cycle we're in and the next.
const CYCLES = [year % 2 ? year + 1 : year, (year % 2 ? year + 1 : year) + 2];

const STATES = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};

// Where each kind of record comes from. Records point here by key ("src").
const SOURCES = {
  fec_races: { label: "FEC: Elections (races by state and district)", url: "https://www.fec.gov/data/elections/", api: "https://api.open.fec.gov/developers/#/financial/get_elections_search_", official: true },
  fec_dates: { label: "FEC: Election dates", url: "https://www.fec.gov/calendar/", api: "https://api.open.fec.gov/developers/#/dates/get_election_dates_", official: true },
  fec_reports: { label: "FEC: Reporting dates and deadlines", url: "https://www.fec.gov/help-candidates-and-committees/dates-and-deadlines/", api: "https://api.open.fec.gov/developers/#/dates/get_reporting_dates_", official: true },
  civic_elections: { label: "Google Civic Information API: elections", url: "https://developers.google.com/civic-information/docs/v2/elections", api: "https://www.googleapis.com/civicinfo/v2/elections", official: false,
    note: "Google lists elections from state and local election offices. It is not itself an election office, so each date links the office that publishes it." },
  civic_voterinfo: { label: "Google Civic Information API: voter info (official data only)", url: "https://developers.google.com/civic-information/docs/v2/elections/voterInfoQuery", api: "https://www.googleapis.com/civicinfo/v2/voterinfo", official: false,
    note: "Asked with officialOnly=true, so it returns only what the state's election office published." },
  usagov: { label: "USA.gov: State and local election offices", url: "https://www.usa.gov/state-election-office", official: true },
};

const OFFICE = { H: "U.S. House", S: "U.S. Senate", P: "President" };

function addMonths(iso, n) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clean = (s) => (s == null ? null : String(s).trim() || null);
const pad2 = (d) => (d == null || d === "" ? null : /^\d+$/.test(String(d)) ? String(d).padStart(2, "0") : String(d));

// ---------- HTTP (keys never printed) ----------
function fixtureName(u) {
  const p = new URL(u);
  const keep = [...p.searchParams].filter(([k]) => !["api_key", "key", "per_page"].includes(k)).sort();
  return (p.host + p.pathname + "?" + keep.map(([k, v]) => `${k}=${v}`).join("&")).replace(/[^A-Za-z0-9=&._-]+/g, "_");
}
let calls = 0;
async function getJson(url, params, { allow404 = false } = {}) {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) if (v != null) u.searchParams.set(k, v);
  if (FIX) {
    try { return JSON.parse(await readFile(path.join(FIX, fixtureName(u) + ".json"), "utf8")); }
    catch {}
    // Fall back to one file per endpoint (<host><path>.json), then to "no data".
    try { return JSON.parse(await readFile(path.join(FIX, (u.host + u.pathname).replace(/[^A-Za-z0-9._-]+/g, "_") + ".json"), "utf8")); }
    catch { if (allow404) return null; throw new Error(`no fixture ${fixtureName(u)}`); }
  }
  for (let attempt = 1; ; attempt++) {
    calls++;
    const res = await fetch(u, { headers: { accept: "application/json" } });
    if (res.ok) return res.json();
    if ((res.status === 429 || res.status >= 500) && attempt < 4) { await sleep(2000 * attempt); continue; }
    if (allow404 && (res.status === 404 || res.status === 400)) return { _status: res.status, ...(await res.json().catch(() => ({}))) };
    // Host and path only: the query string holds the key.
    throw new Error(`${u.host}${u.pathname} answered HTTP ${res.status}`);
  }
}

async function fecPages(endpoint, params) {
  const out = [];
  for (let page = 1; page <= 40; page++) {
    const body = await getJson(`https://api.open.fec.gov/v1/${endpoint}/`, {
      ...params, api_key: process.env.FEC_API_KEY, per_page: "100", page: String(page),
    });
    out.push(...(body.results || []));
    if (!body.pagination || page >= body.pagination.pages) break;
  }
  return out;
}

// ---------- OpenFEC ----------
function fecRaceUrl(office, state, district, cycle) {
  if (office === "P") return `https://www.fec.gov/data/elections/president/${cycle}/`;
  if (office === "S") return `https://www.fec.gov/data/elections/senate/${state}/${cycle}/`;
  return `https://www.fec.gov/data/elections/house/${state}/${district}/${cycle}/`;
}

async function fecRaces() {
  const byState = {};
  for (const st of Object.keys(STATES)) {
    const rows = [];
    for (const cycle of CYCLES) {
      const res = await fecPages("elections/search", { state: st, cycle: String(cycle) });
      for (const r of res) {
        const office = r.office || null;
        if (!OFFICE[office]) continue;
        const district = office === "H" ? pad2(r.district) : null;
        rows.push({
          level: "federal", office: OFFICE[office], office_code: office,
          district, cycle: Number(r.cycle || cycle),
          url: fecRaceUrl(office, st, district, Number(r.cycle || cycle)), src: "fec_races",
        });
      }
    }
    const seen = new Set();
    byState[st] = rows.filter((r) => { const k = `${r.office_code}|${r.district}|${r.cycle}`; if (seen.has(k)) return false; seen.add(k); return true; })
      .sort((a, b) => a.cycle - b.cycle || "PSH".indexOf(a.office_code) - "PSH".indexOf(b.office_code) || String(a.district).localeCompare(String(b.district)));
  }
  return byState;
}

async function fecElectionDates() {
  const rows = await fecPages("election-dates", { min_election_date: today, max_election_date: horizon, sort: "election_date" });
  return rows.map((r) => ({
    date: r.election_date,
    level: "federal",
    state: clean(r.election_state),
    district: pad2(clean(r.election_district)),
    office: OFFICE[r.office_sought] || clean(r.office_sought),
    office_code: clean(r.office_sought),
    what: [clean(r.election_type_full) || clean(r.election_type_id), clean(r.election_party) ? `(${r.election_party})` : null].filter(Boolean).join(" ") || "Federal election",
    notes: clean(r.election_notes),
    src: "fec_dates",
  })).filter((r) => r.date);
}

async function fecReportDates() {
  const rows = await fecPages("reporting-dates", { min_due_date: today, max_due_date: horizon, sort: "due_date" });
  // The API repeats a due date once per state it applies to without naming the state, so keep one
  // row per due date and report type. Labels are the FEC's own (report_type_full).
  const seen = new Set(), out = [];
  for (const r of rows) {
    const k = `${r.due_date}|${r.report_type}`;
    if (!r.due_date || seen.has(k)) continue;
    seen.add(k);
    out.push({ date: String(r.due_date).slice(0, 10), level: "federal", report_type: clean(r.report_type), what: clean(r.report_type_full) || null, year: r.report_year ?? null, src: "fec_reports" });
  }
  return out;
}

// ---------- Google Civic ----------
const civicKey = () => process.env.GOOGLE_CIVIC_API_KEY;
const stateOfDivision = (ocd) => { const m = /\/state:([a-z]{2})/.exec(ocd || ""); return m ? m[1].toUpperCase() : null; };
const levelOfDivision = (ocd) => (!ocd || /^ocd-division\/country:us$/.test(ocd) ? "national" : /^ocd-division\/country:us\/(state|district):[a-z]{2}$/.test(ocd) ? "state" : "local");

async function civicElections() {
  const body = await getJson("https://www.googleapis.com/civicinfo/v2/elections", { key: civicKey() });
  return (body.elections || [])
    .filter((e) => String(e.id) !== "2000" && e.electionDay && e.electionDay >= today) // 2000 is Google's test election
    .map((e) => ({
      date: e.electionDay, what: clean(e.name), civic_id: String(e.id),
      division: clean(e.ocdDivisionId), state: stateOfDivision(e.ocdDivisionId), level: levelOfDivision(e.ocdDivisionId),
      src: "civic_elections",
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

const pickUrls = (b) => {
  if (!b) return null;
  const o = { name: clean(b.name) };
  for (const k of ["electionInfoUrl", "electionRegistrationUrl", "ballotInfoUrl", "electionRulesUrl", "votingLocationFinderUrl", "absenteeVotingInfoUrl"]) if (clean(b[k])) o[k] = b[k].trim();
  return Object.keys(o).length > 1 || o.name ? o : null;
};

// voterinfo needs an address and an election. We ask with the state's name as the address and the
// state's next listed election, officialOnly=true. That gives the state's election office links and
// any statewide contests in the state's official feed. A district or local contest it returns is
// kept with its district id, and the page shows it only when that id matches the candidate's.
async function civicVoterInfo(st, electionId) {
  const body = await getJson("https://www.googleapis.com/civicinfo/v2/voterinfo", {
    key: civicKey(), address: STATES[st], electionId, officialOnly: "true",
  }, { allow404: true });
  if (!body || body._status) return { status: body?._status || "none", reason: body?.error?.errors?.[0]?.reason || body?.error?.message || null };
  const s = (body.state || [])[0] || {};
  const contests = (body.contests || []).filter((c) => c.office || c.referendumTitle).map((c) => ({
    office: clean(c.office) || clean(c.referendumTitle),
    kind: c.type === "Referendum" ? "measure" : "office",
    type: clean(c.type),
    levels: c.level || [],
    district: c.district ? { name: clean(c.district.name), scope: clean(c.district.scope), id: clean(c.district.id) } : null,
    candidates: (c.candidates || []).length,
    sources: (c.sources || []).map((x) => ({ name: clean(x.name), official: !!x.official })),
  }));
  return {
    status: 200,
    election: body.election ? { date: body.election.electionDay, name: clean(body.election.name), civic_id: String(body.election.id) } : null,
    state_office: pickUrls(s.electionAdministrationBody),
    local_office: pickUrls(s.local_jurisdiction?.electionAdministrationBody),
    contests,
    sources: (s.sources || []).map((x) => ({ name: clean(x.name), official: !!x.official })),
  };
}

// ---------- previous build (kept for a source that fails) ----------
async function readPrev() {
  const prev = { index: null, states: {} };
  try { prev.index = JSON.parse(await readFile(path.join(OUT, "index.json"), "utf8")); } catch { return prev; }
  for (const st of Object.keys(STATES)) {
    try { prev.states[st] = JSON.parse(await readFile(path.join(OUT, `${st}.json`), "utf8")); } catch {}
  }
  return prev;
}

// ---------- run ----------
const prev = await readPrev();
const fetched = { ...(prev.index?.fetched || {}) };
const failed = [];
async function section(name, keyVar, fn) {
  if (!FIX && !process.env[keyVar]) { console.error(`${name}: skipped, ${keyVar} is not set; keeping the previous data`); failed.push(name); return null; }
  try {
    const v = await fn();
    fetched[name] = new Date().toISOString();
    return v;
  } catch (err) {
    console.error(`${name}: failed (${err.message}); keeping the previous data`);
    failed.push(name);
    return null;
  }
}

const races = await section("fec_races", "FEC_API_KEY", fecRaces);
const fDates = await section("fec_dates", "FEC_API_KEY", fecElectionDates);
const reports = await section("fec_reports", "FEC_API_KEY", fecReportDates);
const cElections = await section("civic_elections", "GOOGLE_CIVIC_API_KEY", civicElections);

// voterinfo for each state that has a Civic election coming up (soonest one).
let vinfo = null;
if (cElections) {
  vinfo = await section("civic_voterinfo", "GOOGLE_CIVIC_API_KEY", async () => {
    const out = {};
    for (const st of Object.keys(STATES)) {
      const e = cElections.find((x) => x.state === st) || cElections.find((x) => x.level === "national");
      if (!e) continue;
      out[st] = await civicVoterInfo(st, e.civic_id);
      if (!FIX) await sleep(150);
    }
    return out;
  });
}

await mkdir(OUT, { recursive: true });
const counts = { offices: 0, elections: 0, contests: 0, state_offices: 0 };
const index = { built: new Date().toISOString(), today, cycles: CYCLES, fetched, src: SOURCES, states: {}, federal_reports: reports ?? prev.index?.federal_reports ?? [] };

for (const [st, name] of Object.entries(STATES)) {
  const old = prev.states[st] || {};
  const offices = races ? races[st] || [] : old.offices || [];
  const fed = fDates ? fDates.filter((d) => d.state === st || (!d.state && d.office_code === "P")) : (old.elections || []).filter((d) => d.src === "fec_dates");
  const civ = cElections ? cElections.filter((d) => d.state === st || d.level === "national") : (old.elections || []).filter((d) => d.src === "civic_elections");
  const vi = vinfo ? vinfo[st] || null : old.voterinfo || null;
  const elections = [...fed, ...civ].sort((a, b) => a.date.localeCompare(b.date) || a.level.localeCompare(b.level));

  // Filing dates: no free API publishes candidate filing deadlines (they are set by each state, and
  // by counties and cities for local offices). Say so, and point to who publishes them.
  const stateOffice = vi?.state_office || null;
  const ask = stateOffice?.electionInfoUrl
    ? { name: stateOffice.name || `${name} election office`, url: stateOffice.electionInfoUrl, src: "civic_voterinfo" }
    : { name: `${name} election office (find it on USA.gov)`, url: SOURCES.usagov.url, src: "usagov" };
  const filing = ["federal", "state", "local"].map((level) => ({
    level, date: null, status: "not_in_free_data",
    what: level === "federal" ? "Deadline to file to get on the ballot for Congress" : level === "state" ? "Filing period for state offices" : "Filing period for county, city and school board offices",
    ask: level === "local" && vi?.local_office?.electionInfoUrl ? { name: vi.local_office.name || "Your local election office", url: vi.local_office.electionInfoUrl, src: "civic_voterinfo" } : ask,
  }));

  const file = {
    state: st, name, built: index.built, cycles: CYCLES,
    offices,
    elections,
    contests: vi?.contests || [],
    contests_for: vi?.election || null,
    filing,
    election_offices: { state: stateOffice, local: vi?.local_office || null, ask },
    voterinfo: vi,
  };
  counts.offices += offices.length; counts.elections += elections.length; counts.contests += file.contests.length; counts.state_offices += stateOffice ? 1 : 0;
  index.states[st] = { name, offices: offices.length, elections: elections.length, contests: file.contests.length, next: elections.find((e) => e.date >= today)?.date || null, state_office: !!stateOffice };
  await writeFile(path.join(OUT, `${st}.json`), JSON.stringify(file, null, 1) + "\n");
}
await writeFile(path.join(OUT, "index.json"), JSON.stringify(index, null, 1) + "\n");

// Counts only, never data or keys, so the log is safe to read in a public repo.
console.log(`cycles ${CYCLES.join(", ")} · today ${today}`);
console.log(`federal races: ${races ? Object.values(races).reduce((a, r) => a + r.length, 0) : "kept"}`);
console.log(`federal election dates: ${fDates ? fDates.length : "kept"} · federal report dates: ${reports ? reports.length : "kept"}`);
console.log(`civic elections: ${cElections ? cElections.length : "kept"} · voterinfo states answered: ${vinfo ? Object.values(vinfo).filter((v) => v.status === 200).length + " of " + Object.keys(vinfo).length : "kept"}`);
if (vinfo) {
  const why = {};
  for (const v of Object.values(vinfo)) if (v.status !== 200) why[`${v.status} ${v.reason || ""}`.trim()] = (why[`${v.status} ${v.reason || ""}`.trim()] || 0) + 1;
  if (Object.keys(why).length) console.log(`voterinfo not answered: ${JSON.stringify(why)}`);
}
console.log(`written: ${Object.keys(STATES).length} state files · ${counts.offices} offices · ${counts.elections} elections · ${counts.contests} contests · ${counts.state_offices} state office links · ${calls} API calls`);
if (failed.length) { console.error(`failed or skipped: ${failed.join(", ")}`); process.exit(1); }
