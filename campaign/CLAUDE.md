# Working on Dweller Campaign

Dweller Campaign (`campaign/`) helps people thinking about running for local, state or federal office set up and run a campaign. Since design guide v2.0 it has its own warm, friendly look (light default, Atkinson Hyperlegible, one long page of eight phases since v3.0) instead of the Dweller Docket terminal look; it keeps Docket's sourcing and neutrality rules.

## The design guide is a living document

`campaign/docs/design-guide.md` describes how Dweller Campaign looks and why. Keep it true to the code.

Whenever a change affects the look or behavior of the page (colors, type, spacing, layout, components, charts, node types, wording rules, the setup, the tabs and pages, the team picture, the money page, accessibility or phone layouts):

1. **Update the guide in the same pull request.** Edit the section the change belongs to, so the guide describes the page as it is now.
2. **Regenerate the token table:** `node campaign/scripts/sync-design-guide.mjs`. Never edit the table between the `tokens:start` and `tokens:end` markers by hand. Change the CSS custom properties in `campaign/index.html` instead.
3. **Add a change-log row** at the top of section 12: minor version (v1.**1**) for a visible design change, major (v**2**.0) for a new direction. Fill in the date, what changed, why, and the commit (`pending` until it exists). Update the version and "Last updated" in the header.
4. **Re-check any changed node or chart colors** with the dataviz palette validator against the card surfaces in both themes (`#FFFFFF` light, `#26292D` dark). Note the result in the change-log row.
5. **Update the claude.ai project copy** of "Dweller Campaign — Design Guide" with the new file.

CI (`.github/workflows/campaign-design-guide.yml`) fails a pull request when the token table doesn't match the code, or when `campaign/index.html` changed without a new change-log row. Label a PR `no-design-change` for logic-only or data-only fixes.

## Rules for content

- Every rule, limit, deadline and figure cites an official source (FEC, state election office or ethics commission, county or city clerk) in `campaign/data.js`. Read the source word for word before adding it. If no official source has an item, say so on the page and link the office. Never fill a gap from memory.
- Last-election figures are copied from the official report, never computed, except two labeled sums: "votes in all" (candidates' totals added) and "registered, no vote for this office" (a subtraction).
- Nonpartisan: same tools, wording and prominence for every party and independents; no party red or blue; all parties get the same bar color, in the report's order. No persuasion content from us.
- Free public sources only for live lookups (Census Geocoder, OpenFEC, Google Civic `elections`/`voterinfo`). No paid AI APIs. Keys live in GitHub Actions secrets (`FEC_API_KEY`, `GOOGLE_CIVIC_API_KEY`), never in the page.
- No ads, only partners and sponsors, who have no say over content.
- Examples are labeled EXAMPLE and use fictional names starting with "Example".
