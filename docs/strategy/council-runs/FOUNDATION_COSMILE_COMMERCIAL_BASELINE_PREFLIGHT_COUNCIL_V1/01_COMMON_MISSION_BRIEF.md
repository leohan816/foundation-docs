# Common Council Mission Brief

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1
MISSION_TYPE: STRATEGY_PREFLIGHT_CHALLENGE
AUTHORITY: RECOMMENDATION_ONLY
REPORT_LANGUAGE: ENGLISH
COUNCIL_PROCESS: BLIND_INITIAL_THEN_OPEN_CROSS_REVIEW_THEN_UP_TO_THREE_FOCUSED_ROUNDS
COMMERCIAL_AUDIT_ACTIVATION: NO
ADVISOR_OR_FOUNDATION_TEAM_DISPATCH: NO
PRODUCT_MODIFICATION: NO
```

## Decision question

Should Leo authorize the proposed three-working-day, read-only Foundation + Cosmile
Commercial Baseline Audit?

If yes, determine the exact corrections that must be frozen before activation, the
explicit exclusions, the required evidence and runtime safety, the Founder decisions
genuinely required before starting, the mandatory Day 3 outputs, and the conditions that
must stop the audit or return `HOLD`.

## Exact subject pin

```text
REPOSITORY: leohan816/foundation-docs
DRAFT_PR: 2
SUBJECT_BRANCH: strategy/foundation-cosmile-commercial-baseline-preflight-20260717
SUBJECT_COMMIT: 2170f85dddcea3282df786742d601eef2064cefc
SUBJECT_FILE: docs/strategy/20260717_FOUNDATION_COSMILE_COMMERCIAL_BASELINE_STRATEGY_PREFLIGHT_KO.md
SUBJECT_BLOB: 612c5fa8ba5cef842616b5c228602fda0fb9095e
SUBJECT_SHA256: b56b61173b8c0575ce9e3bae8f0f3f6ae75305dae7a959d8b203813b6b0aeabd
SUBJECT_STATUS: NOT_FINAL_NOT_MERGED_NON_EXECUTABLE
```

Read the subject only from the pinned commit, not from a later revision:

```text
WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_STRATEGY_PREFLIGHT_20260717
READ_COMMAND: git -C <WORKTREE> show '<SUBJECT_COMMIT>:<SUBJECT_FILE>'
```

Do not patch the subject. Do not silently substitute a later branch head or working-tree
file.

## Exact selected composition

```text
COUNCIL_COMPOSITION:
- PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER
- SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER
- DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER
```

Only these three Core roles are selected. The six Specialist sessions remain unselected,
`READY_IDLE`, and mission `NONE`. Do not expose the brief, subject, questions, reports, or
packets to them.

## Identical verified baseline

The Strategy Decision Architect verified the following immediately before admission:

1. Draft PR #2 is open and draft; its remote head is the exact subject commit and its only
   current file is the pinned Preflight.
2. The local subject worktree is clean and its HEAD and upstream are both the exact subject
   commit. `git rev-parse <commit>:<file>` and `git hash-object <file>` both returned the
   exact subject blob.
3. Council infrastructure exactly matches setup commit
   `929cccba5673b9e98d79dc71d12910407f55bedd` from Draft PR #3.
4. All nine Council sessions are live in their exact role homes with OpenAI Codex CLI
   `0.144.5`, model `gpt-5.6-sol`, effort `xhigh`, and no conflicting mission.
5. The selected roles are `READY`; the six unselected Specialists are `READY_IDLE`.
6. Current tracked repository heads still equal the heads and remote branch tips recorded
   by the pinned Preflight:

| Repository | Branch | Exact HEAD |
|---|---|---|
| Agent Office | `shadow/agent-office-m1-2-spatial-office` | `c837af565052119862ae5524656080b47974452d` |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` |
| SIASIU | `shadow/m4-siasiu-memory` | `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602` |
| Cosmile | `shadow/m4-cosmile-memory` | `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` |
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` |

7. All five product/control worktrees have zero tracked changes. Existing untracked
   documentation is user-owned, outside scope, and must not be read, modified, staged, or
   treated as current authority.
8. The four final pointers cited by the Preflight exist at foundation-docs commit
   `eba7b5a2eb07aa98bed24e7bc560ba13510b696d` and record the reviewed Memory shadow
   boundary, open U1/U2/U3 gates, non-authorization of runtime expansion, and active hard
   stop.
9. The current authority loop is Leo/GPT -> `foundation-advisor` -> selected Foundation
   Team actors -> `foundation-advisor` -> Leo/GPT. This Council reports only to the
   Strategy Decision Architect and cannot activate that execution loop.
10. The Council mission itself authorizes no commercial audit, runtime command, risk
    acceptance, release decision, product change, or next mission.

## Assumptions that must be challenged

- a three-working-day audit is necessary and is the smallest sufficient next step;
- the proposed Day 3 outputs can support a real implementation-priority decision;
- the audit can remain bounded when unknowns close as `UNVERIFIED`;
- the evidence levels and READY rule are practical rather than ceremonially strict;
- the runtime-safety envelope can provide useful evidence without authorizing risky work;
- Foundation, Cosmile, SIASIU, Control, Advisor, Reviewer, Strategy, and Leo boundaries are
  correctly separated;
- Paid Beta and Public Launch are sufficiently separated;
- Memory V3 can remain paused while commercial baseline reconstruction proceeds.

## Unknowns reserved for the proposed audit or external owners

- complete current customer, operator, payment, order, inventory, shipping, refund, and
  admin flows;
- complete Foundation commercial data/judgment/API/degraded-mode flow;
- complete real/partial/mock/shadow/dead/unverified matrix;
- complete blocker inventory and engineering estimates;
- current runtime, deployment, DB, vendor, legal, policy, and operations readiness;
- exact Paid Beta cohort, market, SKU, currency, payment, operator, and exit thresholds;
- future dispatch-time actor/model/skill bindings.

Do not investigate these to audit depth. Do not turn them into assumptions.

## Allowed reads

1. This common brief.
2. Your own Council role files and current shared Council rules.
3. The exact pinned Preflight blob.
4. When required to test a material objection, these exact cited final pointers at commit
   `eba7b5a2eb07aa98bed24e7bc560ba13510b696d`:

```text
advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/112_M2_C_WU1_WU7_HARD_STOP_POINTER.md
advisor/jobs/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/99_FINAL_POINTER.md
advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/99_FINAL_POINTER.md
advisor/jobs/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/13_FINAL_POINTER.md
```

5. Current Agent Office operating and role files at exact head
   `c837af565052119862ae5524656080b47974452d` when testing an authority objection.
6. Targeted repository metadata or an exact cited path only when necessary to distinguish
   fact from assumption or to confirm physical ownership/artifact existence.

Every extra read must be named in the report with its exact decision relevance. Historical
prose is E0 evidence unless independently pinned.

## Prohibited investigation depth

- complete repository surface inventory;
- full customer-flow or Foundation judgment-flow tracing;
- complete mock-versus-real matrix or blocker enumeration;
- build, lint, test, smoke, runtime, DB, endpoint, migration, network, or vendor execution;
- architecture redesign, code-quality review, security audit, or legal approval;
- use of production, staging, shared DB, secrets, PII, real customers, payment, shipping,
  email/SMS, or public exposure;
- product repository modification, subject patching, branch movement, merge, rebase, or
  dependency installation;
- Advisor, Control, Worker, Designer, Reviewer, or Specialist dispatch.

Any preliminary blocker must be labeled `PRELIMINARY_NOT_COMPLETE`.

## Common questions for all selected roles

1. Is the proposed commercial audit actually necessary?
2. Is the three-working-day scope appropriate?
3. Will the Day 3 outputs support a real implementation-priority decision?
4. Could the audit become another open-ended design project?
5. Are the required Founder decisions excessive, insufficient, premature, or correctly
   timed?
6. Are Paid Beta and Public Launch boundaries sufficiently separated?
7. Is the evidence model practical and strict enough?
8. Is the runtime safety envelope useful without being needlessly restrictive?
9. Are Foundation, Cosmile, SIASIU, Control, Advisor, and Reviewer responsibilities
   correctly separated?
10. What exact correction is required before audit activation?
11. What is the strongest reason to reject or hold this proposal?
12. What evidence would change your verdict?

## Phase 1 admission ACK

Before reading the pinned subject, return this ACK to the Strategy Decision Architect:

```text
SESSION:
ROLE:
ROLE_CATEGORY: CORE
COUNCIL_MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1
SUBJECT_COMMIT: 2170f85dddcea3282df786742d601eef2064cefc
SUBJECT_BLOB: 612c5fa8ba5cef842616b5c228602fda0fb9095e
CWD:
EXPECTED_CWD_MATCH: YES
ACTUAL_RUNTIME: OpenAI Codex CLI 0.144.5
ACTUAL_MODEL: gpt-5.6-sol
ACTUAL_EFFORT: xhigh
OWN_ROLE_AND_SHARED_RULES_READ: YES
COMMON_BRIEF_READ: YES
ASSIGNED_QUESTIONS_RECEIVED: YES
OTHER_CHALLENGER_OUTPUT_VISIBLE: NO
UNSELECTED_SPECIALIST_CONTACT: NO
AUTHORITY: RECOMMENDATION_ONLY
READINESS_FOR_BLIND_INITIAL: READY
STOP.
```

Do not read the subject or begin analysis until the Strategist sends
`PHASE_1_BLIND_REVIEW_GO` after all three ACKs pass.

## Blind initial report requirements

After `PHASE_1_BLIND_REVIEW_GO`, complete one independent pass and write only your exact
assigned report path. Do not read another Challenger's question set, role, report, prompt,
or output. Do not send intermediate analysis to the Strategist.

Use this schema:

```text
ROLE:
SUBJECT_PIN:
VERDICT: PROCEED | PROCEED_WITH_CORRECTIONS | HOLD | NOT_NEEDED

STRONGEST_FINDING:
STRONGEST_OBJECTION:
VERIFIED_FACTS:
INFERENCES:
HIDDEN_ASSUMPTIONS:
UNKNOWN_OR_UNVERIFIED:
MISSING_ALTERNATIVES:
SCOPE_AND_TIMEBOX_RISKS:
EVIDENCE_GAPS:
REQUIRED_CORRECTIONS:
OPTIONAL_IMPROVEMENTS:
FOUNDER_DECISIONS_REQUIRED_BEFORE_AUDIT:
FOUNDER_DECISIONS_BETTER_DEFERRED_UNTIL_AFTER_AUDIT:
WHAT_WOULD_CHANGE_MY_VERDICT:
CONFIDENCE: LOW | MEDIUM | HIGH

BOUNDARY_CONFIRMATION:
PRODUCT_DECISION_MADE: NO
RISK_ACCEPTED: NO
SUBJECT_PATCHED: NO
ACTOR_DISPATCHED: NO
INDEPENDENT_REVIEW_CLAIMED: NO
COMMERCIAL_AUDIT_PERFORMED: NO

STOP:
```

Every material finding must include an ID, severity, claim, evidence, fact/inference/
assumption classification, lens basis, decision impact, and correction. The report must
answer all common questions and all assigned role-specific questions, even when the answer
is `UNKNOWN` or `NO CHANGE`.

After writing, return only the report path, SHA256, verdict, confidence, boundary
confirmation, and `STOP`. The initial report becomes immutable after Strategist validation.

## Deliberation and correction limit

After all initial reports freeze, open cross-review is authorized. Focused correction and
rebuttal are authorized only for material disagreements and may run for at most three
rounds. Original reports remain unchanged. A fourth round is not authorized. Remaining
conflicts after Round 3 are preserved as unresolved or Founder decisions.

## Exit and final routing

Council completion returns to the Strategy Decision Architect. The Strategist will publish
the final package to the existing Preflight branch and Draft PR #2, then stop for Leo/GPT
review. Advisor handoff and audit start require a later explicit Leo/GPT `OK`.
