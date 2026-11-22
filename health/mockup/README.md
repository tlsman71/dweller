# Dweller Health · landing-page mockup (v2.1)

Design mockup of the Dweller Health landing page, Nov 13, 2026. Every figure is a draft until it passes Phase 1 source checks.

- **View:** https://health.dwellerapp.org/
- **One file:** `index.html`. It loads the living deck's shared files from `../deck/` (`slides.js`, `deck.js`, `deck.css`, `img/`), so the slide show and the street images always match the deck.

## What's on the page
1. **Hero:** headline, the three key dates and SHIIP number.
2. **In pictures (centerpiece, Nov 15, 2026):** a slide show of the approved node illustrations from `../drawings/` (decision O45). Each slide has a caption (what the picture shows, plus one sourced fact) once Tom approves it, and a **Share this picture** button whose card carries the Dweller Health name, a QR code and a link back to `#slide-<id>`. Only approved images appear; `?drafts=1` previews waiting ones locally. See `../drawings/README.md`.
3. **The Street:** a scroll-driven story. The street stays on screen while 10 steps scroll past; the camera, the walking figures and their tags follow the scroll. The steps are the `S` array in the script, with their fact cards, sources and the deck slide each one comes from. The storyboard is in the project's `docs/centerpiece-street-brief.md`.
4. **The presentation:** the living deck as a slide show.
5. **Follow the money:** totals, a documented/estimate filter, "where it started → where it ended up" bands, a transactions table, a clickable money map (the `N` nodes and `E` connections in the script; every connection names its source) and key dates. Lobbying, political giving and DOJ cases stay "not yet sourced" until the filings are pulled. Clicking a circle opens its record; if the node has an approved picture, it sits at the very top of the record, above the title, with the line "Illustration. The facts and sources are below.", a **Share this picture** button (same share card as the slide show) and a link to the picture in the slide show.
6. **What you can do:** enrollment periods, Medigap note and SHIIP (checked Nov 9, 2026).
7. **Follow the updates:** sample entries; live feeds come in the prototype.

**Building labels (Nov 13, 2026):** plain-text signs on the street art (the `BL` list in the script): Original Medicare (CMS) on the left; UnitedHealthcare, Humana, Aetna (CVS Health), Elevance, Kaiser Permanente, Centene (WellCare) and All other plans on the right, in the brief's order by building size. Sizes are illustrative until enrollment shares are verified. In the "Lights out" and "Doctors leave" stills, the two dark buildings read "Plan closed · example" instead of a company name. Hidden on the hourglass close-up. A screen-reader description of the street is included.

## Look
"Chalkboard civics class" in Dweller colors: Cabin Sketch headings, Atkinson Hyperlegible body text at 20px or larger, high contrast, labels written out in words. Honors reduced-motion settings.

## Next
- Phone-width check of the scroll story.
- North Carolina figures beside the national ones, once verified.

## Change log
- **v2.1 · Nov 22, 2026:** money-map record: the node's picture moved from the bottom to the top of the record, full width, with a share button (Tom; project doc `docs/node-illustrations-protection.md`).
