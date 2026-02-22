# PRD: Split the Bill — Group Payment Feature for Venmo

## Team & Business Context

**Team:** Payments Experience (2 iOS engineers, 2 Android engineers, 1 backend engineer, 1 designer, 1 PM)
**Business Objective:** Increase monthly active transactions per user from 4.2 to 5.5 within 6 months. Group dining is the #1 use case for Venmo but currently requires the payer to manually request money from each person individually.
**Strategic justification:** Cash App launched group payments in late 2025 and saw a 12% lift in MAU within one quarter (per their earnings call). We're losing share in the 18-34 demographic — our core. This feature directly defends our position in social payments, which is the moat that differentiates us from generic payment apps.

## Problem Statement

**Who:** Groups of friends splitting restaurant bills, shared household expenses, or group trip costs.

**Evidence:**
- In-app search data: "split" is the 3rd most searched term in our app (47K searches/month), and it leads nowhere.
- Support tickets: ~2,100 tickets/month mention "group" or "split" payments.
- User interviews (n=24, Jan 2026): 21 of 24 described a recent frustrating experience calculating and requesting individual shares of a group bill. Average group size: 4.3 people.
- Competitive intel: Cash App, Zelle, and Splitwise all have group split features. Splitwise has 10M+ downloads purely for this use case — that's demand we should be capturing natively.

## Customer Voice

**User interviews (n=24):**
- "I always end up being the person who pays and then has to chase 5 people on Venmo. It takes me 10 minutes to type each request with the right amount." — College student, 21
- "We use Splitwise to figure out who owes what, then switch to Venmo to actually send money. Why can't Venmo just do both?" — Working professional, 28
- "Sometimes I just eat the difference because it's too awkward to request $4.50 from someone." — Graduate student, 25
- "I want to split evenly OR by item. Sometimes one person got the steak and everyone else got salads." — Restaurant regular, 31

## Hypotheses

| # | Hypothesis | Current Evidence | Validation Plan |
|---|-----------|-----------------|-----------------|
| H1 | Users will split at least 20% of their restaurant-related payments if the option is prominent | 47K monthly searches for "split"; Splitwise has 10M downloads | Soft-launch to 10% of users, measure split rate over 4 weeks |
| H2 | Equal split covers 70%+ of use cases (custom amounts are secondary) | 18 of 24 interviewees said they usually split evenly | Track equal vs. custom split ratio in soft launch |
| H3 | This feature increases transactions/user because it converts "I'll just forget about it" into actual payments | 25% of interviewees admitted to absorbing costs to avoid awkwardness | Compare transactions/user for test vs. control over 8 weeks |
| H4 | Group splits drive new user invitations (viral loop) when a non-Venmo user is in the group | Venmo's existing request flow already drives 15% of new signups | Track invite-to-signup conversion from split flows |

## User Stories

**Epic: Create a Split**
- As a payer, I want to take a photo of a receipt and have the app automatically detect the total and suggest an even split, so I don't have to do math.
- As a payer, I want to select friends from my Venmo contacts and split a bill evenly among them with one tap, so I can send all requests in under 30 seconds.
- As a payer, I want to manually adjust individual amounts when the split isn't even (e.g., someone ordered more), so the amounts are fair.
- As a payer, I want to add a non-Venmo user by phone number, so they receive a text invite to pay their share (and sign up).

**Epic: Receive and Pay a Split**
- As a recipient, I want to receive a push notification showing "Jordan split a $127 dinner — your share is $31.75" with a one-tap pay button, so I can settle immediately without opening the app.
- As a recipient, I want to see the breakdown (total, number of people, my share) before I pay, so I can verify the amount is correct.
- As a recipient, I want to decline or dispute my share with a message, so I can flag errors without it being awkward.

**Epic: Split History**
- As any user, I want to see a group split history showing who has paid and who hasn't, so the payer isn't the one who has to follow up.

## Design Direction

- **Entry point:** New "Split" button alongside the existing "Pay" and "Request" buttons on the home screen. Same visual weight.
- **Flow:** Select contacts → enter total (or scan receipt) → choose even/custom split → review → send all requests simultaneously.
- **Receipt scanning:** Camera opens inline (like depositing a check). OCR extracts total. User confirms. This is a delight moment, not a core requirement — fallback is manual entry.
- **Notification:** Rich push notification with the payer's profile photo, restaurant emoji, amount, and "Pay $X" action button. Designed to feel casual/social, not transactional.
- **Group status view:** Simple list showing each person with a green check (paid) or gray clock (pending). Visible to everyone in the split.

## Success Metrics

**Primary (6-month targets):**
| Metric | Current | Target | How Measured |
|--------|---------|--------|-------------|
| Transactions per MAU per month | 4.2 | 5.5 | Analytics dashboard |
| MAU (18-34 segment) | 48M | 51M | Analytics dashboard |

**Leading indicators (weekly from launch):**
| Metric | Target |
|--------|--------|
| % of payment flows that use split | >15% |
| Average split group size | >3 people |
| Split completion rate (all parties paid) | >70% within 48 hours |
| Non-Venmo invites sent per split | >0.3 per split |
| Invite-to-signup conversion | >25% |

**Guardrails:**
- Fraud/dispute rate on split payments must stay under 0.5%
- App store rating must not drop below 4.7

## Technical Feasibility

**Backend:** New `split_group` data model linking multiple payment requests to one parent transaction. Our existing payment request infrastructure handles the individual legs — the split is a thin orchestration layer on top. Estimated: 2 weeks backend work.
**OCR/Receipt scanning:** Google Cloud Vision API. We already use it for check deposits. Accuracy on receipt totals is ~94% based on a test of 200 sample receipts. Cost: ~$0.002 per scan.
**Push notifications:** Existing notification infrastructure supports rich notifications with action buttons on both iOS and Android. No new infra needed.
**Dependencies:** None blocking. Design needs to finalize the receipt scanning UX, but the core split flow can ship independently.

## Timeline

- **Weeks 1-3:** Backend split model + API, basic even-split flow (iOS + Android)
- **Weeks 4-5:** Custom amount splits, group status view
- **Weeks 6-7:** Receipt scanning, rich push notifications
- **Week 8:** Soft launch to 10% of users
- **Weeks 9-12:** Iterate on data, full rollout

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Users find the flow too many steps | Medium | High | Core flow is 3 taps for even split. User test with 8 people before launch |
| Receipt OCR errors frustrate users | Medium | Medium | Always show editable amount, never auto-submit. OCR is optional |
| Awkwardness of requesting money persists even with split framing | Low | Medium | Frame as "splitting" not "requesting" — social proof that everyone does it |
| Fraud: fake splits used to extract money | Low | High | Splits limited to mutual contacts for first 30 days; standard fraud monitoring |
