# Council Operating Model v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
CURRENT_COUNCIL_MISSION: NONE
```

## 1. Purpose

The Council challenges material strategy before the Strategy Decision Architect produces
a final recommendation. It supplies three independent lenses; it does not decide,
orchestrate, implement, audit, or approve.

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

```text
PRODUCT / USER / BUSINESS:
Why should this be done, and why now?

SYSTEM / SAFETY / GOVERNANCE:
Is ownership, structure, safety, and risk treatment correct?

DELIVERY / EVIDENCE / OPERATIONS:
Can it be completed, verified, operated, and closed?
```

The three roles must not collapse into general-purpose reviewers. A finding that overlaps
another lens must name the overlap and remain framed from the author's own primary lens.

## 6. Mission composition

Every mission records:

```text
COUNCIL_COMPOSITION:
<exact selected roles in the approved mission brief>
```

Only selected roles receive the subject. Unselected sessions stay idle. The intended
composition for a future Foundation + Cosmile Commercial Baseline Strategy Preflight
review is the three currently active roles, but that review is not active and no subject
may be delivered during setup.

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

- Each active role has a persistent role home and an independent tmux session.
- Runtime identity is live-verified; session names are not model evidence.
- No model install, upgrade, or change occurs without Leo approval.
- Role homes contain instruction infrastructure only.
- Mission outputs belong only under the exact authorized shared run directory.
- Mission briefs, Challenger reports, and Strategist disposition records are written in
  English. Leo-facing conversation may use the language Leo requests.
