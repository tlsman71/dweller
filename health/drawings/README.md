# Dweller Health · node illustrations ("In pictures" slide show)

One illustration per node on the Follow-the-money map. They fill the centerpiece slide show on the landing page (`../mockup/#pictures`), above the Street. Rules: the node illustrations protocol in the claude.ai project (`docs/node-illustrations-protocol.md`, decisions O39–O45).

**Nothing reaches the site until Tom approves it.**

| File | What it is |
|---|---|
| `drawings.js` | Every slide: label, caption (scene + one sourced fact with its Fact/Estimate/Forecast label and source link), and two approvals: `image.status` and `caption.status`. Also `share_base`, the address shares and QR codes point to. |
| `img/<id>.webp` | 1280×720 slide image. **Only approved images are here.** |
| `share/<id>.jpg` | Share card: the image, the Dweller Health name, the caption (once approved), a QR code and the link back to `#slide-<id>`. |
| `draft/` | Local only (git-ignored): waiting images for previewing with `?drafts=1`. |

## How a slide goes live
1. Tom approves the image in a review pane (`approve illus-node-<id>-v1`). Set `image.status` to `"approved"` with the date.
2. Rebuild: `python3 health/tools/build_drawings.py --masters "/home/tls/Downloads/Dweller/Dweller Health/Share Pane drawings"` (needs `pip install pillow qrcode fonttools brotli`). It writes `img/` and `share/` for approved slides only and deletes files for anything not approved.
3. Until `caption.status` is `"approved"`, the slide shows the node name and "Caption under review", and the share card carries only the name. Approve the caption, then rebuild so the card includes it.
4. Commit and open a PR. New approved slides join the slide show automatically; there is no list to edit in the page.

## Sharing
Each slide's **Share this picture** button opens the phone's share sheet with the share card and its link (where the browser allows sharing files). Otherwise it shows the card with **Save the picture** and **Copy the link**. Every card carries the Dweller Health name and a QR code, so the picture loops back to its own slide wherever it's posted.

When Dweller Health gets its own domain, change `share_base` in `drawings.js` and rebuild the cards.
