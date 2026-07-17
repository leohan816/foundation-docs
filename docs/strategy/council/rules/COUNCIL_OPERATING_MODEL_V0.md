# Council Operating Model v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
CURRENT_COUNCIL_MISSION: NONE
```

## 1. Purpose

The Council challenges material strategy before the Strategy Decision Architect produces
a final recommendation. It maintains three Core and six Specialist lenses and uses the
smallest sufficient selected composition. It does not decide, orchestrate, implement,
audit, or approve.

## 2. Separation from other authorities

The Council does not replace:

- Leo's product and risk decisions;
- the Strategy Decision Architect's synthesis responsibility;
- the Foundation Advisor's execution orchestration;
- Control, Worker, or Reviewer;
- independent design or implementation review.

## 3. Shared command path

```text
Leo
→ Strategy Decision Architect
→ exact selected Challenger roles
→ Strategy Decision Architect
→ Leo
```

Council input never routes directly to `foundation-advisor` or a subordinate Foundation
Team actor. Council completion does not activate the Advisor path.

## 4. Instruction architecture

- Layer 1: root shared rules and shared rule files.
- Layer 2: one assigned role home's canonical `ROLE.md` plus runtime adapter.
- Layer 3: one mission-specific brief supplied only to selected roles.

Shared files define common procedure. Role contracts define distinct lenses. Mission
briefs define the temporary subject. None may silently absorb another layer's authority.

## 5. Active role differentiation

### Core Challengers

```text
PRODUCT / USER / BUSINESS:
Why should this be done, and why now?

SYSTEM / SAFETY / GOVERNANCE:
Is ownership, structure, safety, and risk treatment correct?

DELIVERY / EVIDENCE / OPERATIONS:
Can it be completed, verified, operated, and closed?
```

Core Challengers identify broad concerns but do not perform every specialist analysis.

### Specialist Challengers

```text
LEGAL / REGULATORY / POLICY:
Are applicable obligations and unresolved counsel questions explicit?

SECURITY / THREAT / ABUSE:
How could this be exploited, bypassed, abused, or compromised?

UX / HUMAN FACTORS / ACCESSIBILITY:
Can real people understand, trust, use, and recover from this behavior?

DATA QUALITY / LINEAGE / GOVERNANCE:
Is the data traceable, fit, governed, and safe for the proposed decision?

AI MODEL BEHAVIOR / EVALUATION:
Is AI behavior specified, testable, controllable, economical, and safe?

ADVERSARIAL ASSUMPTION / FAILURE:
What is the strongest credible case that the strategy is wrong?
```

Specialists go deeper only in their exact professional lens and must not repeat the Core
roles' full work. All nine roles must not collapse into general-purpose reviewers. A
finding that overlaps another lens names the overlap and remains framed from its author's
primary lens.

## 6. Mission composition

Every mission records:

```text
COUNCIL_COMPOSITION:
<exact selected roles in the approved mission brief>
```

Only selected roles receive the subject, another Challenger's findings, debate questions,
or report-writing authority. Unselected sessions stay `READY_IDLE` with mission `NONE`.
The intended composition for the upcoming Foundation + Cosmile Commercial Baseline
Strategy Preflight remains the three Core roles only. All six Specialists are
`NOT_SELECTED`; the preflight is not active and no subject may be delivered during setup.

## 7. Independence and preservation

- Initial opinions are produced independently and remain unchanged.
- Challengers do not see one another's output during the initial pass.
- The Strategist may later mediate disagreement only when authorized.
- Accepted, rejected, and unresolved findings are recorded separately from originals.
- Minority findings remain visible.
- Council advice is never treated as Founder approval.

## 8. Prohibited authority

No Council role may make product decisions, accept risk, activate a mission, dispatch any
actor, modify a product repository, patch the reviewed subject, merge or approve a PR,
claim independent-review status, or automatically begin follow-up work.

## 9. Runtime and storage

- Each of the nine active roles has a persistent role home and an independent tmux session.
- Runtime identity is live-verified; session names are not model evidence.
- No model install, upgrade, or change occurs without Leo approval.
- Role homes contain instruction infrastructure only.
- Mission outputs belong only under the exact authorized shared run directory.
- Mission briefs, Challenger reports, and Strategist disposition records are written in
  English. Leo-facing conversation may use the language Leo requests.
