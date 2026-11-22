# tlsman71/dweller

This repo holds Dweller (root), Dweller Campaign (`campaign/`) and Dweller Health (`health/`).
It is published two ways:

- **GitHub Pages** (deploy from branch, GitHub's built-in *pages build and deployment* workflow): the tlsman71.github.io/dweller pages.
- **Cloudflare Pages** project `dweller-health`: builds `bash health/tools/build_site.sh` into `health/_site` and serves **health.dwellerapp.org**. It shows up on each commit as the *Cloudflare Pages* check, not as an Actions run.

Never commit keys or personal data.

## After every merge (Tom, Nov 22, 2026)

GitHub's Pages deploy has been failing on the first run after merges (in Dweller Docket and Tom's other projects) and passing on the second. Never report a merge as done until it is verified:

1. **Merged?** `gh api repos/tlsman71/dweller/pulls/<n> --jq '.merged,.merge_commit_sha'` must say `true`. If Tom says he merged and it says `false`, tell him and merge it (his "merged" is his go-ahead).
2. **Deployed?** For the merge commit, wait until both are completed with `success`:
   - GitHub Pages: `gh api "repos/tlsman71/dweller/actions/runs?head_sha=<sha>" --jq '.workflow_runs[]|[.name,.status,.conclusion,.run_attempt]'` → *pages build and deployment*. A `cancelled` run is fine only if a later run for a newer commit succeeded.
   - Cloudflare (health.dwellerapp.org): `gh api repos/tlsman71/dweller/commits/<sha>/check-runs --jq '.check_runs[]|[.name,.status,.conclusion]'` → *Cloudflare Pages*. For Health changes, also load health.dwellerapp.org and confirm the change is there.
3. **Failed?**
   - GitHub Pages: `.github/workflows/retry-deploy.yml` re-runs it automatically, up to two times, 45s apart, and opens an issue (which emails Tom) if the third attempt fails. Wait for the retry and check again. If the retry workflow didn't start, re-run it yourself: `gh api -X POST repos/tlsman71/dweller/actions/runs/<run_id>/rerun-failed-jobs`.
   - Cloudflare: not covered by the retry workflow (it isn't an Actions run). Retry the deployment in the Cloudflare dashboard (Workers & Pages → `dweller-health` → Deployments → Retry deployment), up to two times. If it still fails, tell Tom with the link from the check and a note to check cloudflarestatus.com.
4. **Report** to Tom in one line: merged, deployed, and how many attempts it took. If it still failed after three tries, say so plainly with the link to the run and a note to check githubstatus.com (or cloudflarestatus.com).
