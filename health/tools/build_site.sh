#!/usr/bin/env bash
# Builds the public site for https://health.dwellerapp.org into health/_site/.
# Cloudflare Pages runs this on every push to main:
#   Build command:          bash health/tools/build_site.sh
#   Build output directory: health/_site
# The home page is the mockup page. Its relative links (../deck/, ../drawings/, ../story/,
# ../../fonts/, ../../images/) resolve from the site root, so the files are copied unchanged.
# Nothing here reads keys or .env files.
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=health/_site
rm -rf "$OUT"
mkdir -p "$OUT"
cp -r health/deck health/drawings health/mockup health/story "$OUT"/
cp -r fonts images "$OUT"/
cp health/mockup/index.html "$OUT/index.html"
find "$OUT" -name 'README.md' -delete
rm -rf "$OUT/drawings/draft"
cat > "$OUT/_redirects" <<'R'
/mockup             /  301
/mockup/            /  301
/mockup/index.html  /  301
R
echo "built $OUT: $(find "$OUT" -type f | wc -l) files, $(du -sh "$OUT" | cut -f1)"
