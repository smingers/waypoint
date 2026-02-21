# Waypoint — TrueNorth PRD Analyzer

A web app that analyzes Product Requirements Documents (PRDs) using Claude and produces structured strategic recommendations.

## What it does

Paste a PRD, spec, or epic and get back:

1. **PRD Quality Scorecard** — rates completeness across 8 dimensions
2. **Jobs to Be Done Analysis** — identifies core user jobs and solution fit
3. **Hidden Assumptions Audit** — surfaces 5-7 untested assumptions with validation methods
4. **Impact Forecast** — probabilistic assessment of utilization and revenue impact
5. **10x Moonshot Alternatives** — 2-3 higher-leverage alternative approaches
6. **Pre-Mortem (Success)** — what went right and why
7. **Pre-Mortem (Failure)** — what went wrong and why
8. **Top Recommendations** — 3-5 prioritized next steps

## Setup

```bash
npm install
```

Create `.env.local`:

```
ANTHROPIC_API_KEY=your-key-here
ANALYSIS_MODEL=haiku
```

Model options: `haiku` (fast/cheap), `sonnet` (balanced), `opus` (highest quality).

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Set `ANTHROPIC_API_KEY` and `ANALYSIS_MODEL` as environment variables on your host (e.g. Render).

```bash
npm run build
npm start
```

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- Claude API via `@anthropic-ai/sdk`
- react-markdown + remark-gfm
