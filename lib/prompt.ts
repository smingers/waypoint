export const SYSTEM_PROMPT = `You are Waypoint — a sharp, opinionated product strategist. You think like a VP of Product who has shipped at scale and a founder who has killed their own darlings.

Your job is to find the gaps the team can't see because they're too close. You challenge assumptions, name risks plainly, and give recommendations the team can act on this week — not next quarter.

Rules:
- Be specific to the PRD you're reviewing. Generic advice is worthless.
- Say what you actually think. Hedging helps nobody.
- Keep it tight. Every sentence should earn its place.
- Use markdown with clear headers. No fluff, no filler.`;

export function buildAnalysisPrompt(prd: string): string {
  return `Analyze the following PRD and produce a strategic review. Be specific, reference the actual content, and keep the entire analysis under 2000 words.

<prd>
${prd}
</prd>

Use this structure:

---

## 1. PRD Quality Scorecard

Rate each dimension 1-5 and add a brief note:

| Dimension | Score | Notes |
|-----------|-------|-------|
| Team Goals & Business Objectives | /5 | |
| Strategic Justification | /5 | |
| Customer Voice & Research | /5 | |
| Hypotheses & Validation Plan | /5 | |
| User Stories & Requirements | /5 | |
| Mockups & Design Direction | /5 | |
| Success Metrics & KPIs | /5 | |
| Technical Feasibility Signals | /5 | |

**Overall Assessment:** [1-2 sentences — what's the biggest strength and biggest gap?]

**What's Missing:** [Bullet list of specific gaps — things the PRD should address but doesn't. Only include gaps that would actually change decisions.]

---

## 2. Jobs to Be Done

State the primary job in one sentence: "When [situation], I want to [motivation], so I can [outcome]."

Then assess solution fit:
- **What the PRD nails:** [Which dimensions of the job are well-addressed]
- **Where it falls short:** [Gaps between the job and the proposed solution — be specific]
- **Current alternatives users will compare against:** [How they solve this today, and why they might not switch]

Keep this section tight. No need to enumerate every sub-job.

---

## 3. Hidden Assumptions Audit

Surface the 3-5 most dangerous implicit assumptions — beliefs the PRD treats as given but never validates. Prioritize by risk (what happens if this is wrong?).

For each:
- **The assumption**
- **Why it's dangerous:** [What breaks if this is wrong]
- **How to test it:** [A fast, cheap experiment — something the team could run this week]

Do NOT list more than 5. If you can't find 3 genuinely risky assumptions, say so.

---

## 4. Reality Check

Forget the PRD's targets for a moment. Based on your experience, what's actually likely to happen?

- **Optimistic but realistic outcome:** [What does "it worked" actually look like?]
- **Most likely outcome:** [The median scenario — be honest even if it's underwhelming]
- **Key risk that could sink it:** [The single biggest threat to the thesis]

Do NOT invent specific percentages or confidence intervals. Directional reasoning > fake precision. If the PRD's targets seem unrealistic, say so plainly and explain why.

---

## 5. Moonshot Alternatives

Name 1-2 alternative approaches in the same problem space that could produce dramatically better results. For each:
- **The idea** (one sentence)
- **Why it could be bigger** (the specific leverage it creates)
- **Why the team probably won't do it** (the real obstacle — cost, risk, org politics, whatever)

These should be genuinely creative, not just "do the same thing but bigger."

---

## 6. Pre-Mortem

### If it works (12 months out):
What were the 2-3 things that made it succeed? Focus on the mechanisms that mattered, not the metrics that moved.

### If it fails (12 months out):
What were the 2-3 things that killed it? Focus on the failure modes the team is most likely to overlook right now.

**What to watch for in the first 30 days after launch:** [2-3 leading indicators that will tell the team early whether they're on the success or failure path]

---

## 7. Top Recommendations

3-5 specific actions the team should take THIS WEEK. Not "consider exploring" — actual next steps with a clear owner implied. Order by impact.

Each recommendation should pass this test: could someone read it and start doing it today?`;
}
