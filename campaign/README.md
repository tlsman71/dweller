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

1. **Scheduled build (start here):** a GitHub Action runs daily with the secrets, fetches FEC and Civic data, and writes JSON the page reads. Fine for federal and statewide dates.
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

`.github/workflows/campaign-api-check.yml` calls each service once and prints only HTTP status codes. Run it from the Actions tab when a key changes.

## Daily data build

`.github/workflows/campaign-live-data.yml` runs every day at 10:15 UTC (and by hand from the Actions tab). It runs `campaign/scripts/fetch-live-data.mjs`, which writes `campaign/live-data.js` (`window.CAMPAIGN_LIVE`) with the next 24 months of:

- `fec_elections`: federal primaries, runoffs, specials and generals from OpenFEC `/v1/election-dates/` (state, district, office, election type).
- `fec_reports`: federal campaign report due dates from OpenFEC `/v1/reporting-dates/`, one row per due date and FEC report code (for example `12GR`). The API gives no description here, so the page must label codes from an official FEC source, not from memory.
- `civic_elections`: elections Google Civic has ballot data for, with their OCD division (state or nationwide). Google's test election is left out.

Every record has a `src` that points to its entry in the file's `src` section. A section whose source fails keeps its previous data, and the run turns red so it gets noticed. The workflow commits only when the dates change, not when only the fetch times do.

The page doesn't show this data yet. Showing it is a design change and follows `campaign/CLAUDE.md`.
