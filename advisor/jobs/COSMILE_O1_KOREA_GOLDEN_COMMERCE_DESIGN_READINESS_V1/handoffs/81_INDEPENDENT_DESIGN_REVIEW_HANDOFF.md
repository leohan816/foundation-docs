# Independent Reviewer Handoff — O1 Integrated Design Full Review

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
REVIEW_ID: O1-INTEGRATED-DESIGN-FULL-REVIEW-1
REVIEW_PASS: FULL_REVIEW
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
WORKSPACE: read-only exact foundation-docs worktree and pinned product sources
SUBJECT_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
SUBJECT_BLOB: 4622b564cb6bdeaf1973ac80c0f77dd5d721a148
SUBJECT_SHA256: 9cb2147145e040b7184cc3260d1450feb96185c8d181723c0bab8a9ecc091eff
SUBJECT_PATH: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/80_ADVISOR_INTEGRATED_DESIGN_CANDIDATE.md
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/90_INDEPENDENT_DESIGN_REVIEW.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/90_INDEPENDENT_DESIGN_REVIEW_POINTER.md
RETURN_TO: foundation-advisor
REVIEWER_MUST_NOT_PATCH: TRUE
IMPLEMENTATION_AUTHORIZED: NO
NO_NEW_AGENT_OR_SUBAGENT: TRUE
```

Before review, read the full current mission authority and current Agent Office Reviewer
role. Live-verify the exact session, Fable 5, max effort, `/fable-sentinel`, independence
from all authors, idle/non-overlapping state, and the exact subject commit/blob/SHA-256.

Read the integrated candidate and all role-owned evidence it pins (`10_`, `20_`, `30_`,
`40_`, `50_`, `60_`, `70_`, `71_`) directly from `SUBJECT_COMMIT`. Also read:

- `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/00_ADMISSION_AND_RUNTIME_RECORD.md`
- `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/01_EXECUTION_MANIFEST.md`
- `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/02_DISPATCH_AND_BOUNDARY_LEDGER.md`

Review the complete package, not only the Advisor summary. Verify at minimum:

1. authority, command path, role ownership, evidence provenance, and exact Git pins;
2. Foundation product counts, eligibility, representative/boundary recommendations, and
   fail-closed rights/MFDS/imagery/provenance/human-review gates;
3. Cosmile as-built facts, reuse matrix, and exactly four bounded replacement candidates;
4. Designer-owned customer/operator journey, exception/recovery states, accessibility,
   separate Golden Order and captured-payment Golden Reversal;
5. Foundation/Cosmile ownership, snapshot superset, `0..N` catalog cardinality,
   historical non-rewrite, outage-versus-withdrawal, optional-ack semantics, and concrete
   transport remaining unresolved;
6. product-tree hash, manifest ordering, version significance, idempotency, replay,
   correction, supersession, withdrawal, and path-truth classifications;
7. repository-local state/transaction/compensation model, last-item concurrency,
   server-verified money truth, duplicate/out-of-order/missing-event and restart recovery;
8. database/migration design remaining additive and non-executed, with no real/shared DB;
9. auth/PSP recommendations accurately bounded by official evidence and vendor/Founder
   confirmation, including webhook-as-notification and pull verification;
10. security/privacy/audit/incident invariants and evidence minimization;
11. WorkUnit dependencies, safe parallelization, estimate confidence, rollback/HOLD,
    scope-expansion conditions, unresolved Founder decisions, and external confirmations;
12. all 27 required outputs covered or correctly deferred to review/final pointer;
13. no implementation authority, no product/DB write, and no silent provider/Legal/risk
    decision;
14. the boundary-ledger incident: Cosmile's initial unauthorized background Explore tasks
    were interrupted, rejected, and the accepted facts were reproduced first-hand. Determine
    whether any untrusted delegated output contaminated the final evidence.

Findings must identify exact artifact/section/evidence and owner. Distinguish blocking from
non-blocking. Verdict must be exactly one of:

```text
PASS
NEEDS_PATCH
PASS_WITH_RISK
FAIL
```

On `NEEDS_PATCH`, name the original owner and exact bounded delta; do not patch. On
`PASS_WITH_RISK` or `FAIL`, explain the unaccepted risk/blocker and return immediately.
Write only the exact result and pointer paths, include SHA-256, verify zero product/DB/
runtime changes, return to `foundation-advisor`, and STOP.
