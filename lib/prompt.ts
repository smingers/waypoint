export const SYSTEM_PROMPT = `You are Waypoint, an expert product strategy analyst. You review Product Requirements Documents (PRDs), specs, and epics with the rigor of a seasoned VP of Product and the creativity of a startup founder.

Your analysis is structured, opinionated, and actionable. You don't just identify problems — you propose solutions. You don't just validate assumptions — you challenge them.

You output your analysis in clean markdown with clear section headers.`;

export function buildAnalysisPrompt(prd: string): string {
  return `Analyze the following PRD and produce a comprehensive strategic review. Be specific, reference the actual content of the PRD, and provide actionable recommendations.

<prd>
${prd}
</prd>

Produce your analysis using the following structure. For each section, be concrete and specific to THIS PRD — avoid generic advice.

---

## 1. PRD Quality Scorecard

Rate each dimension from 1-5 (1 = missing/poor, 5 = excellent) and provide a brief note explaining the score:

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

**Overall Assessment:** [1-2 sentence summary of PRD quality and biggest gap]

---

## 2. Jobs to Be Done Analysis

Identify the core Job(s) to Be Done this PRD is targeting. For each:
- **The Job:** [Functional, emotional, and social dimensions]
- **Current alternatives:** How do users solve this today?
- **Solution fit:** How well does the proposed solution address the job? Where are the gaps?
- **Hiring criteria:** What would make a user "hire" this solution over alternatives?

---

## 3. Hidden Assumptions Audit

Surface 5-7 implicit assumptions underlying this PRD that are NOT explicitly stated or validated. For each:
- **The assumption:** [What is being taken for granted]
- **Risk if wrong:** [What happens if this assumption is false]
- **How to test:** [A fast, cheap way to validate this before building]

---

## 4. Impact Forecast

Provide a probabilistic assessment of the feature's impact if built as described:

**Utilization Metrics:**
- Expected adoption rate: [range with confidence]
- Usage frequency: [range with confidence]
- Time to meaningful adoption: [weeks/months/years]

**Revenue/Business Metrics:**
- Expected revenue impact: [range with confidence]
- Time to measurable revenue impact: [weeks/months/years]

**Key dependencies** that could shift these forecasts up or down.

---

## 5. 10x Moonshot Alternatives

Brainstorm 2-3 alternative approaches in the same problem space that could produce dramatically higher impact. For each:
- **The idea:** [One-line description]
- **Why it could be 10x:** [What leverage does it create?]
- **Key risk:** [What's the biggest reason it might not work?]
- **Effort vs. current proposal:** [More/less/similar]

---

## 6. Pre-Mortem: Success Scenario

*It's 12 months from now. This feature was a clear success.*

- **Plausible metrics:** [What specific numbers would define success?]
- **Top 3-5 reasons it succeeded:**
  1. [Reason + why it mattered]
  2. ...
- **Implications for the team right now:** [What should the team do today to maximize the probability of this scenario?]

---

## 7. Pre-Mortem: Failure Scenario

*It's 12 months from now. This feature was a clear failure.*

- **Plausible metrics:** [What specific numbers would define failure?]
- **Top 3-5 reasons it failed:**
  1. [Reason + why it was fatal]
  2. ...
- **Implications for the team right now:** [What should the team do today to minimize the probability of this scenario? What are the early warning signs to watch for?]

---

## 8. Top Recommendations

Provide your 3-5 highest-priority recommendations for the product team, ordered by impact. Each should be a specific, actionable next step — not a vague suggestion.`;
}
