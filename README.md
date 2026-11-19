# AI Tools Guide (ai-tools-guide-en)

English-original guide to AI tools: comparisons, workflows, and tutorials for content teams, marketers, and creators. Every article lists its sources and states verified pricing, free-plan limits, and who should not buy.

> Direction (Gemini, 2026-11-13): comparisons + workflows only; avoid broad head terms. First batch: 10 articles (6 comparisons, 4 tutorials/workflows). Full direction: `~/workspace/goals/goal/files/gemini-en-ai-tools-direction-2026-11-13.md`.

## Tech stack

Kanade theme: Astro 7.3.7 + Tailwind CSS 4.3.3 + Vue 3.5, static output, deployed on Cloudflare Workers (new account 517519203@qq.com).

- Live site: https://aitech8.com (English at root, since 2026-11-19)
- GitHub: https://github.com/hsk203/ai-tools-guide-en
- Language: English only (`PUBLIC_SITE_LANGUAGE=en`)

## Build & deploy

```bash
pnpm install   # use pnpm 10; pnpm 12 hangs on this VM
SITE_URL=https://aitech8.com ./node_modules/.bin/astro build
```

Then merge into `../ai-tools-guide/dist-merged` and deploy with
`run_wrangler_aitech8.py` — full steps in `DEPLOY.md`. The 76 old Chinese
articles are served as 410 by `../ai-tools-guide/worker.js` (never remove);
`/en/*` URLs 301 to root via `public/_redirects`.

CI (`.github/workflows/ci.yml`) runs format check, audit, and build in 4 language jobs; the e2e step is intentionally skipped (template tests expect sample content that does not exist).
