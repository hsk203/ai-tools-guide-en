# Deploy (Cloudflare Workers)

> Deploy to the NEW Cloudflare account (517519203@qq.com) only. Never to the switchlivo.com (old) account.

- Worker name: `ai-tools-guide-en`
- URL: https://ai-tools-guide-en.517519203.workers.dev
- Config: `wrangler.toml` (`[assets]` directory `./dist`)
- Build: `SITE_URL=https://ai-tools-guide-en.517519203.workers.dev pnpm build` (single English build; no zh-Hant variant for this site)
- Deploy: `python3 ~/workspace/goals/goal/hidden_files/run_wrangler.py <this-dir> deploy`
- GSC verification file `public/googlec79f6a06001528c5.html` must stay exactly 53 bytes (no trailing newline) and listed in `.prettierignore`.
