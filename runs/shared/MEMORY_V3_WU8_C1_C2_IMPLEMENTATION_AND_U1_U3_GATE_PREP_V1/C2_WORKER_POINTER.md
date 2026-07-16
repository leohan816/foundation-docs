# WU8-C2 — Pure Cosmile Delivery Contracts and State Machine — POINTER

```text
WORK_UNIT_ID: WU8-C2   ROLE: Cosmile repository-owner Worker   RETURN_TO: foundation-advisor
STATUS: reviewed-design §3.1/§3.4/§4 pure carrier/ack/state-machine implemented · tests PASS · LOCAL candidate commit (NOT pushed) · evidence written (Advisor publishes)
MODEL: Opus 4.8 (1M)   EFFORT: high   SKILL: /fable-builder   DESIGN_SHA256: VERIFIED (2213262a…)
```

## RESULT SUMMARY
Implemented only the pure WU8-C2 delivery contracts and state machine around the existing envelope: `CarrierV1`
exact-key projection with UTF-8 byte ceiling and poison (no `source_hash` repair); the `CommerceEvidenceDeliveryAckV1`
matrix (five outcomes, closed reason/disposition, guarded categories, malformed→ack_malformed); and the section-4
eight-state machine (closed transitions, generic status mapping, claim/lease/version, retry schedule + injected
jitter, compare-and-set ack ignoring stale/late, retraction ordering, limits, category-only DLQ). Every function is
pure/deterministic — no sender/consumer/IO/DB/network/timer/route/flag. No envelope/carrier field changed. One local
candidate commit; NOT pushed. No independent PASS claimed.

## KEY EVIDENCE
```text
BASE (C1 PASS): ad172db403065fc8e498a1e80cdd347034ea7c48  (upstream ahead 0 / behind 0, verified, no fetch)
CANDIDATE (LOCAL, NOT PUSHED): b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6  (parent ad172db; origin/shadow still ad172db)
PATH DELTA: 4 allowed product paths (types/commerceEvidenceDelivery.ts; lib/commerceEvidenceDeliveryState.ts; 2 vitest suites) — no existing M2 file changed
TESTS: C2 contract+property PASS 33 · M2 A/B PASS 57 (unchanged) · no-transport scan PASS (unchanged) · tsc 0-in-allowlist
PURITY: no sender/IO/DB/network/timer/Date.now/Math.random/process.env; clock+jitter injected; source_hash never recomputed
FORBIDDEN ACCESS: schema/migration/DB, delivery/intake, flag activation, raw values, next WU = ZERO
```

## POINTER BLOCK
```text
RESULT:  runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_RESULT.md
POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_POINTER.md
(foundation-docs paths relative to worktree FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714; Worker wrote but did NOT stage/commit/push them.)
```

## NEXT ACTION ROUTING
```text
RETURN_TO: foundation-advisor   PROPOSED_NEXT_ACTOR: foundation-advisor   STOP_AFTER_RETURN: true
Advisor: independently verify the candidate (b8b61d7) and, only after independent PASS, route the push; then proceed to U1–U3 gate prep. Worker did not push, did not dispatch Reviewer, did not self-review, and did not begin the next WorkUnit. No next WorkUnit auto-started.
```
