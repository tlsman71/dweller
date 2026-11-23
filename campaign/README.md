# Dweller Campaign: live ballot lookup APIs

Dweller Campaign helps first-time candidates find the offices on their ballot, filing dates and election dates, each linked to its official source.

Keys never go in code, files or chat. They live in this repo's GitHub Actions secrets (Settings > Secrets and variables > Actions), which hold `FEC_API_KEY` and `GOOGLE_CIVIC_API_KEY` as of Nov 21, 2026, or in a local `.env` that is git-ignored.

## The three services (all free)

| Service | What it gives us | Key | Secret name |
|---|---|---|---|
| US Census Geocoder (geocoding.geo.census.gov) | ZIP/address to state, county, congressional district, state house and senate districts | None | — |
| OpenFEC (api.open.fec.gov) | Federal races: candidates, filing records, FEC election and reporting dates | api.data.gov key (free) | `FEC_API_KEY` |
| Google Civic Information API (`elections`, `voterinfo`) | Upcoming elections and, close to an election, contests on the ballot for an address. Its Representatives endpoints were retired in 2025, so it is not used for officeholders. | Google Cloud API key (free quota) | `GOOGLE_CIVIC_API_KEY` |

Noted, not signed up for: BallotReady / CivicEngine and Democracy Works (paid, nationwide ballot and candidate data) and the Ballotpedia API. Worth a quote later if hand-kept state and local calendars become too much to maintain. A paid AI search API (Claude API) was considered and dropped on Nov 21, 2026 to avoid token costs.

## State and local filing deadlines (no paid API)

No free API covers state and local filing deadlines nationwide, so:

- **Official office links from the Civic API.** `voterinfo` returns each state's and county's election administration body with its official website and election info URLs. When we have no checked date, we show "Check with your election office" and link straight to it.
- **A hand-checked calendar file**, `data/state-calendars.json`: for each state, the filing period, petition deadline and primary and general dates, each with the Secretary of State (or state election board) page it came from and the date it was checked. It starts with the states Dweller's first candidates are in and grows from there. It follows the Docket rule: no document, no date.
- **Local offices** (city, county, school board): link to the county or city clerk from the Civic API result until a checked entry exists.

## Where the keys are used

GitHub Pages is static, so a key in the page would be public. Two options:

1. **Scheduled build (in use since Nov 23, 2026):** `.github/workflows/campaign-ballot-data.yml` runs `campaign/scripts/build-ballot-data.mjs` daily at 10:15 UTC (and on pull requests that change it, where the result is kept as a run artifact instead of committed) with the secrets. It writes `campaign/ballot/index.json` and one `campaign/ballot/<ST>.json` per state: federal races (OpenFEC `elections/search`), federal election and report dates (`election-dates`, `reporting-dates`), Civic elections by OCD division, and per state a `voterinfo` call (`officialOnly=true`, the state's name as the address, its next listed election) for the state's election office links and any contests in its official feed. Filing deadlines are not in any free API, so they are written as missing with the office to ask. The page's **On your ballot** card reads these files. To test without keys: `BALLOT_FIXTURES=<dir> node campaign/scripts/build-ballot-data.mjs`.
2. **Small server function** (for per-ZIP live lookups): a serverless endpoint holds the keys and the page calls it. Needs a host (for example Cloudflare Workers or Vercel) with the same secret names.

Every date shown must link to its official source; a lookup result without one is not displayed.

## Local development

```
# .env  (git-ignored, never committed)
FEC_API_KEY=
GOOGLE_CIVIC_API_KEY=
```

In Actions:

```yaml
env:
  FEC_API_KEY: ${{ secrets.FEC_API_KEY }}
  GOOGLE_CIVIC_API_KEY: ${{ secrets.GOOGLE_CIVIC_API_KEY }}
```

The Google key is restricted to the Civic Information API only.

## Checking the keys

`.github/workflows/campaign-api-check.yml` calls each service once and prints only HTTP status codes. Run it from the Actions tab. The daily data build is `.github/workflows/campaign-ballot-data.yml` (see below).
