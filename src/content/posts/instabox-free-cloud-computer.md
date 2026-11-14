---
title: "InstaBox Free Cloud Computer (2026): A Real 4 vCPU / 8 GB Machine — But Not a Free VPS"
description: "InstaBox gives you a free 4 vCPU / 8 GB cloud Linux machine with no credit card — just a Google or GitHub login. We checked the official docs and third-party tests to show what the free tier actually includes, how to claim it, and the three hard limits: a 30-minute idle pause, a 2–8 hour max run, and no dedicated IPv4. Verdict: it's an AI agent workbench, not a free VPS."
date: 2026-11-13
lang: en
category: reviews
tags:
  [
    "InstaBox",
    "free cloud computer",
    "cloud PC",
    "AI agent",
    "free VPS",
    "Claude Code",
  ]
cover: tool
coverImage: "/images/tools/instabox/feature.webp"
featured: false
draft: false
---

**Verdict:** InstaBox's free 4 vCPU / 8 GB cloud computer is real — no credit card, no catch on the specs. But it is an AI agent workbench, not a free VPS. Use it to run Claude Code, automate a browser, or spin up a throwaway dev environment, and it's one of the most generous free compute offers out there. Use it to host a website 24/7, and you'll be disappointed.

**Pricing snapshot (as of November 2026):**

- **Free — $0/month:** 1 machine, 4 vCPU / 8 GiB RAM, 20 GiB persistent disk, 5 snapshots, 100 GiB outbound traffic per month
- **Pro — $20/month + usage:** includes a $20 credit, up to 100 concurrent machines, up to 8 vCPU / 16 GiB per machine, 100 GiB disk, unlimited snapshots, 1 TiB outbound per month, adjustable idle pause (5–30 minutes or off)
- **Builder — $100/month, Team — $500/month, Enterprise — custom**

![InstaBox homepage: Cloud Computers for AI Agents](/images/tools/instabox/feature.webp)

## What InstaBox is

InstaBox (instabox.sh) is a cloud-computer platform from the InsForge team, which joined Y Combinator's Spring 2026 batch. It launched on October 14, 2026. The pitch is simple: give every AI agent its own independent cloud Linux machine.

Under the hood, each machine is a Firecracker microVM (the same virtualization AWS uses), running Debian 13 with sudo root and Docker preinstalled. The free tier uses the agent-browser template, which comes with Node.js 22, Bun, uv, Go, Rust, gcc, Docker and Compose, Claude Code and Codex, plus a desktop environment (VNC + Xfce + Chromium).

You can reach your machine through a REST API, a TypeScript SDK, a CLI (`npx instabox@latest sh` starts one in a single command), SSH / Mosh, or VNC remote desktop. You can also publish a port as a public HTTPS URL, which is handy for demos and testing APIs.

## What the free tier actually includes

Checked against the official documentation (pricing and limits pages, November 2026):

- **1 machine, 4 vCPU / 8 GiB RAM** (about 7.8 GiB usable in practice)
- **20 GiB persistent disk** (/data), with snapshots and files capped at 200 GB combined
- **5 snapshots** — files survive pauses, shutdowns, and restarts; only deleting the machine wipes them
- **100 GiB outbound traffic per month**; inbound is always free
- **Upload capped around 50 Mbit/s per VM; download is uncapped**

![InstaBox free plan: $0/month — 1 machine, 4 vCPU / 8 GiB, 20 GiB disk, 5 snapshots, 100 GiB egress per month](/images/tools/instabox/free-plan.webp)

## How to claim it

Go to [instabox.sh](https://instabox.sh) and click Sign up in the top right. Log in with a Google or GitHub account — the free tier is $0/month and does not ask for a credit card.

When it launched in October, new accounts went onto a waitlist and waited 1–3 days for an activation code. As of November 13, 2026, community reports say sign-up is now direct, with no queue. InstaBox has not announced the change officially, so take the current page as the source of truth when you register.

The fastest way in is the CLI, which logs you in and starts a machine in one step:

```bash
npx instabox@latest sh
```

## Three hard limits to know before you sign up

The free tier has three hard limits. These are what separate it from a free VPS, and you should know them before you claim a machine.

**1. It pauses after 30 minutes idle.** The free tier's idle timeout is fixed at 30 minutes and cannot be changed. The good news: it resumes in under a second and your memory state is preserved, so nothing is lost. While paused, only storage is billed — and the free tier is not charged.

**2. A single run tops out at 2 hours, growing to 8 hours with use.** The official docs say the free tier's max run is 120 minutes, growing with use up to 480 minutes. An independent one-week test confirmed a roughly 8-hour ceiling. Anything that needs to run for days straight will not work.

**3. No dedicated inbound IPv4.** External access goes through InstaBox's HTTPS gateway or SSH gateway. You cannot bind your own domain or run a 24/7 website or bot node. The outbound IP is a shared US AWS datacenter IP — clean, but clearly a datacenter range, so it is not suitable for sending email or passing strict anti-fraud checks.

One more warning: the free policy can be pulled at any time. InstaBox's own wording is "free until we figure it out." Early beta users once had 5 free machines; that has already been cut to 1. Don't keep anything important only on the machine.

## What it's good for — and what it's not

**Good for:**

- **Running Claude Code, Codex, and automation agents** — this is what it was built for, and both tools come preinstalled
- **Cloud browser automation** — a desktop with Chromium you can drive remotely, letting an agent click, type, and fill forms in the cloud
- **Temporary build and dev environments** — Rust, Go, and Node toolchains are ready; run a project, debug, deploy, and test without touching your local machine
- **Watching YouTube and general browsing** — the preinstalled browser has direct internet access
- **Light experiments** — network tests, scrapers, scheduled jobs, website monitoring

**Not good for:**

- **Hosting a website or any 24/7 service** — no dedicated IPv4, a 30-minute pause, and an 8-hour cap
- **Gaming** — no GPU
- **Long-running heavy jobs** — the run gets cut off at 8 hours at most
- **Email or anything needing a clean, dedicated IP** — the shared datacenter NAT IP will be flagged
- **Your only copy of production data** — a beta free tier can tighten at any moment

## How it compares to other free options

- **Simular Box** (box.simular.ai): Also a free cloud Linux desktop for AI, but all agents share one computer through a single MCP link; InstaBox gives each agent its own VM. Note: Simular's free beta ended on November 12, 2026, and daily credits no longer refresh
- **Cube** (cube.computer): A persistent cloud Linux computer with specs up to 32 vCPU / 64 GB; new users get a $25 free credit and sign-up is open with no invite. More of a general-purpose cloud PC than an agent sandbox
- **Oracle Cloud Always Free**: A real free VPS: 2 OCPU / 12 GB ARM instance + 200 GB storage, with a dedicated public IPv4 and no auto-pause — good for 24/7 workloads. The catch is that the Singapore region is often out of capacity, so you may wait a long time for an instance

The three serve different needs: InstaBox for an independent agent sandbox, Cube for a general cloud PC, Oracle's free tier for a 24/7 VPS.

## Limitations / Who should NOT buy

- **Don't claim it to host a website, a bot, or any always-on service.** No dedicated IPv4, a 30-minute idle pause, and an 8-hour run cap make that impossible.
- **Don't use it as your only storage.** The free policy can change, and early users already saw their free machine count cut from 5 to 1.
- **Don't use it as a public proxy or VPN exit.** The terms of service explicitly ban using a machine as a public proxy, a public VPN exit, a Tor exit, or a relay for third-party traffic — and ban farming free quota with multiple accounts. Personal use inside your own cloud machine is fine; sharing the exit publicly risks a ban.
- **Don't expect a residential IP.** The outbound IP is a shared US AWS datacenter address. It works fine for browsing and APIs, but strict platforms (some banks, some AI sign-up flows) may flag it as a datacenter IP.

## Bottom line

InstaBox's free 4 vCPU / 8 GB machine is real, and for AI agent work it is one of the most generous free compute offers available right now. But it is an agent workbench, not a free VPS. Claim it to run agents, compile, test, and browse — and keep your expectations in check for anything that needs to stay online around the clock.

The product launched on October 14, 2026, and the free tier is still in beta, so the terms can change. This article reflects the official pricing and limits as of November 2026; check the official pricing page before you sign up.

Claim it at [instabox.sh](https://instabox.sh).
