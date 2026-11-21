#!/usr/bin/env node
// Fetches election and reporting dates for the next 24 months from free official APIs and writes
// campaign/live-data.js (window.CAMPAIGN_LIVE), which the page can load next to data.js.
//
//   FEC_API_KEY=... GOOGLE_CIVIC_API_KEY=... node campaign/scripts/fetch-live-data.mjs
//
// Sources (free, no paid AI APIs):
//   OpenFEC /v1/election-dates/   federal primaries, runoffs, specials and generals
//   OpenFEC /v1/reporting-dates/  federal campaign report due dates
//   Google Civic /v2/elections    elections that Google Civic has ballot data for
//
// Rules: every record carries the source it came from. Keys come only from the
// environment and are never written to the file or the log. If a source fails,
// its previous section is kept and the script exits 1 so the workflow shows red.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "..", "live-data.js");
const today = (process.env.LIVE_DATA_TODAY || new Date().toISOString()).slice(0, 10);
const horizon = addMonths(today, 24);

const SOURCES = {
  fec_elections: {
    label: "FEC election dates (OpenFEC API)",
    url: "https://www.fec.gov/calendar/",
    api: "https://api.open.fec.gov/developers/#/dates/get_election_dates_",
  },
  fec_reports: {
    label: "FEC reporting due dates (OpenFEC API)",
    url: "https://www.fec.gov/help-candidates-and-committees/dates-and-deadlines/",
    api: "https://api.open.fec.gov/developers/#/dates/get_reporting_dates_",
  },
  civic_elections: {
    label: "Google Civic Information API: elections",
    url: "https://developers.google.com/civic-information/docs/v2/elections",
    api: "https://www.googleapis.com/civicinfo/v2/elections",
  },
};

function addMonths(iso, n) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}

async function getJson(url, params) {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const res = await fetch(u, { headers: { accept: "application/json" } });
  // Report the host and path only: the query string holds the key.
  if (!res.ok) throw new Error(`${u.host}${u.pathname} answered HTTP ${res.status}`);
  return res.json();
}

async function fecPages(endpoint, params) {
  const out = [];
  for (let page = 1; page <= 20; page++) {
    const body = await getJson(`https://api.open.fec.gov/v1/${endpoint}/`, {
      ...params, api_key: process.env.FEC_API_KEY, per_page: "100", page: String(page),
    });
    out.push(...(body.results || []));
    if (!body.pagination || page >= body.pagination.pages) break;
  }
  return out;
}

const OFFICE = { H: "House", S: "Senate", P: "President" };

async function fecElections() {
  const rows = await fecPages("election-dates", {
    min_election_date: today, max_election_date: horizon, sort: "election_date",
  });
  return rows.map((r) => ({
    date: r.election_date,
    state: r.election_state || null,
    district: (r.election_district || "").trim() || null,
    office: OFFICE[r.office_sought] || r.office_sought || null,
    type: r.election_type_full || r.election_type_id || null,
    party: r.election_party || null,
    notes: r.election_notes || null,
    src: "fec_elections",
  }));
}

async function fecReports() {
  const rows = await fecPages("reporting-dates", {
    min_due_date: today, max_due_date: horizon, sort: "due_date",
  });
  // The API repeats a due date once per state it applies to (without naming the state),
  // so keep one row per due date and report type. report_type is the FEC code
  // (for example 12GR); the API gives no description on this endpoint.
  const seen = new Set();
  const out = [];
  for (const r of rows) {
    const k = `${r.due_date}|${r.report_type}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ due: r.due_date, report_type: r.report_type || null, year: r.report_year ?? null, src: "fec_reports" });
  }
  return out;
}

async function civicElections() {
  const body = await getJson(SOURCES.civic_elections.api, { key: process.env.GOOGLE_CIVIC_API_KEY });
  return (body.elections || [])
    // id 2000 is Google's test election, not a real one.
    .filter((e) => e.id !== "2000" && e.electionDay >= today)
    .map((e) => ({
      date: e.electionDay,
      name: e.name,
      civic_id: e.id,
      ocd_division: e.ocdDivisionId || null,
      src: "civic_elections",
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

async function previous() {
  try {
    const text = await readFile(OUT, "utf8");
    const marker = "window.CAMPAIGN_LIVE = ";
    const json = text.slice(text.indexOf(marker) + marker.length, text.lastIndexOf("}") + 1);
    return JSON.parse(json);
  } catch {
    return {};
  }
}

const sections = [
  ["fec_elections", "FEC_API_KEY", fecElections],
  ["fec_reports", "FEC_API_KEY", fecReports],
  ["civic_elections", "GOOGLE_CIVIC_API_KEY", civicElections],
];

const old = await previous();
const data = { fetched: old.fetched || {}, src: SOURCES };
let failed = 0;

for (const [name, keyVar, fn] of sections) {
  if (!process.env[keyVar]) {
    console.error(`${name}: skipped, ${keyVar} is not set; keeping the previous data`);
    data[name] = old[name] || [];
    failed++;
    continue;
  }
  try {
    data[name] = await fn();
    data.fetched[name] = new Date().toISOString();
    console.log(`${name}: ${data[name].length} records`);
  } catch (err) {
    console.error(`${name}: failed (${err.message}); keeping the previous data`);
    data[name] = old[name] || [];
    failed++;
  }
}

const header = [
  "// Dweller Campaign live data. Generated by campaign/scripts/fetch-live-data.mjs; do not edit by hand.",
  "// Each record's src field names its source in the src section. 'fetched' is when each section was last read.",
];
await writeFile(OUT, `${header.join("\n")}\nwindow.CAMPAIGN_LIVE = ${JSON.stringify(data, null, 1)};\n`);
process.exit(failed ? 1 : 0);
