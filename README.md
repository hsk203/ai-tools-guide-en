# AI Tools Guide (ai-tools-guide-en)

English-original guide to AI tools: comparisons, workflows, and tutorials for content teams, marketers, and creators. Every article lists its sources and states verified pricing, free-plan limits, and who should not buy.

> Direction (Gemini, 2026-11-13): comparisons + workflows only; avoid broad head terms. First batch: 10 articles (6 comparisons, 4 tutorials/workflows). Full direction: `~/workspace/goals/goal/files/gemini-en-ai-tools-direction-2026-11-13.md`.

## Tech stack

Kanade theme: Astro 7.3.7 + Tailwind CSS 4.3.3 + Vue 3.5, static output, deployed on Cloudflare Workers (new account 517519203@qq.com).

- Worker: `ai-tools-guide-en` → https://ai-tools-guide-en.517519203.workers.dev
- GitHub: https://github.com/hsk203/ai-tools-guide-en
- Language: English only (`PUBLIC_SITE_LANGUAGE=en`)

## Build & deploy

```bash
pnpm install
SITE_URL=https://ai-tools-guide-en.517519203.workers.dev pnpm build
python3 ~/workspace/goals/goal/hidden_files/run_wrangler.py ~/workspace/goals/goal/hidden_files/ai-tools-guide-en deploy
```

CI (`.github/workflows/ci.yml`) runs format check, audit, and build in 4 language jobs; the e2e step is intentionally skipped (template tests expect sample content that does not exist).
