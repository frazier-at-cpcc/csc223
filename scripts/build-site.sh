#!/usr/bin/env bash
# Builds every chapter course as a plain web export into _site/<course>/ for GitHub Pages.
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/check-terms.mjs
for check in shared/sims/*.check.mjs; do node "$check"; done
rm -rf _site && mkdir -p _site
cp site/index.html _site/
for dir in courses/ie-ch*/; do
  course=$(basename "$dir")
  pnpm export "$course" --standard web
  cp -R "$dir/dist" "_site/$course"
done
