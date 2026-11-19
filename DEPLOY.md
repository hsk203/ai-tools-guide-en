# Deploy (Cloudflare Workers) — aitech8.com

> Live site: https://aitech8.com (English at root). Cloudflare account
> 517519203@qq.com (aitech8 account) only. Never deploy to the switchlivo.com
> (old) account.

## Current flow (root English, since 2026-11-19)

```bash
cd ~/workspace/goals/goal/hidden_files/ai-tools-guide-en
SITE_URL=https://aitech8.com ./node_modules/.bin/astro build   # NO PUBLIC_BASE_PATH
rm -rf dist-zh-cn && mv dist dist-zh-cn
rm -rf ../ai-tools-guide/dist-merged
cp -r dist-zh-cn ../ai-tools-guide/dist-merged
cd ~/workspace/goals/goal/hidden_files
python3 run_wrangler_aitech8.py ai-tools-guide deploy --config wrangler.aitech8.toml
```

(`run_wrangler.py` is broken — Cloudflare Pages token invalid (9109).
Use `run_wrangler_aitech8.py`. Use pnpm 10; pnpm 12 hangs on this VM.)

## Never break (SEO-critical)

- `../ai-tools-guide/worker.js` serves 410 for all 76 old Chinese URLs.
  Never remove it.
- `public/_redirects` serves `/en/*` -> root 301s + slug-rename 301s.
  Keep every 301 permanently.
- `public/googlec79f6a06001528c5.html` (GSC verification) must stay exactly
  53 bytes, no trailing newline, and listed in `.prettierignore`.
- `public/1b2f53fd7eddd4a06e1396e3859f5697.txt` is the IndexNow key.
- Sitemap lists root URLs only. No `/en/` prefix, no hreflang.
- Before every deploy, run the link check:
  `python3 ~/workspace/custom-connectors/custom.gemini/bin/link_check.py`
  against the built `dist` (dead internal links / _redirects hits / 410-list
  hits / external 404-5xx = FAIL).

## Pre-deploy QC

- Mechanical pre-check: `~/workspace/custom-connectors/custom.gemini/bin/precheck.py`
  (Gemini API Flash-Lite). Factual review: browser Gemini Pro ("Deeper
  analysis 4 Neon"), verified against official sources. Fix and resubmit
  until PASS; never force-publish an unpassed article.
- New articles: 3–5 core words, lowercase hyphens, strip stop words and
  years/counts, keep `best-` prefix, don't repeat the category folder word.
