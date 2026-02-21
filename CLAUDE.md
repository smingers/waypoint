# CLAUDE.md

## Project Overview

Waypoint is the TrueNorth PRD Analyzer — a Next.js web app that takes a PRD as input and produces structured strategic analysis via the Claude API. Built for a startup accelerator hackathon.

## Tech Stack

- **Next.js 15** with App Router (TypeScript)
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **Claude API** via `@anthropic-ai/sdk`
- **react-markdown** + `remark-gfm` for rendering analysis output

## Project Structure

```
app/
  page.tsx              # Main UI — form input + results display (client component)
  layout.tsx            # Root layout, metadata, fonts
  globals.css           # Tailwind imports
  api/analyze/route.ts  # POST endpoint — calls Claude API, returns analysis markdown
lib/
  prompt.ts             # System prompt + analysis prompt template (THE core IP)
public/
  logo.png              # TrueNorth logo
```

## Key Files

- **`lib/prompt.ts`** — The analysis prompt. This is the most important file. It defines the system prompt (persona) and the structured 8-section analysis template. Edit this to change what the analysis produces.
- **`app/api/analyze/route.ts`** — The API route. Accepts `{ prd: string }`, calls Claude, returns `{ analysis: string }`. Model is configured via `ANALYSIS_MODEL` env var.
- **`app/page.tsx`** — The full UI in one client component. TrueNorth-branded with their design system colors.

## Environment Variables

Set in `.env.local` (gitignored):

- `ANTHROPIC_API_KEY` — Required. Claude API key.
- `ANALYSIS_MODEL` — Optional. One of `haiku`, `sonnet`, `opus`. Defaults to `sonnet`. Use `haiku` for cheap testing.

## Design System

Matches the TrueNorth Lovable marketing site (`codingtruenorth.lovable.app`):

- Background: `#0C0E12`
- Primary text: `#E7EBEF`
- Secondary text: `#6C7C93` (UI labels), `#9BA8B9` (prose body)
- Accent: `#13DAEC` (teal/cyan)
- Borders: `#23272F`
- Border radius: `12px`
- Font: Inter

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build
- `npm start` — Start production server

## Common Tasks

**Changing the analysis output:** Edit `lib/prompt.ts`. The `buildAnalysisPrompt()` function contains the full template. Each `## N. Section Name` maps to a section in the rendered output.

**Switching models:** Change `ANALYSIS_MODEL` in `.env.local` and restart the dev server.

**Deploying:** Set `ANTHROPIC_API_KEY` and `ANALYSIS_MODEL` as env vars on the host. Run `npm run build && npm start`.
