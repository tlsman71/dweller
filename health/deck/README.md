# Dweller Health · Medicare Advantage living deck

A nonpartisan, source-checked presentation on Medicare Advantage costs, coverage and choices for North Carolina residents. Based on *Medicare Advantage* by Tom States (Action NC, 2024), rebuilt and source-checked in November 2026.

- **View:** https://tlsman71.github.io/dweller/health/deck/ (after this folder is on `main` with GitHub Pages on)
- **Content:** `slides.js` (one object per slide). The design is in `deck.css` and the renderer in `deck.js`, and the Dweller Health landing page uses the same three files.
- **Images:** `img/` holds the Dweller Health "Street" pencil drawings (no real faces, D7).

## How to update a slide
1. Edit the slide's text in `slides.js`. Keep the source and date with every number, and its kind: `Fact`, `Estimate`, `Forecast` or `Quote`.
2. Set that slide's `updated` date, and `DECK.updated` at the top.
3. Commit with a message that says what changed and why (for example, "Payments slide: MedPAC March 2027 figure"). The commit history is the deck's public change log.

## Rules
- Headlines state findings in neutral words. The original 2024 slide title appears as an attributed quote.
- Where a slide reports criticism of insurers, it shows "Insurers' response" until a sourced response is added.
- Health appears only as coverage and cost, never as personal readings (R7). No real faces (D7).
- Never commit keys or personal data.
