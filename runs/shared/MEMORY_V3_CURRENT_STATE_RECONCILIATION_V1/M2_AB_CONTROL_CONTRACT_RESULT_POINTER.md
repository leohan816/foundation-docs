# Control Result Pointer — M2 A/B Cross-Project Contract Analysis

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-CONTROL-CONTRACT-ANALYSIS
ACTOR: foundation-control
MODE: READ_ONLY_CROSS_PROJECT_CONTRACT_ANALYSIS
RESULT_TYPE: CONTRACT_ANALYSIS_ONLY (not reviewed design · not implementation authority)
ACTUAL_MODEL: Opus 4.8 (1M context)
EFFORT: high
REQUIRED_SKILL_APPLIED: /fable-builder (anchor-first · contract→code mapping · proved/not-proved)

RESULT_PATH:  .../runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_CONTROL_CONTRACT_RESULT.md
POINTER_PATH: .../runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_CONTROL_CONTRACT_RESULT_POINTER.md
(base: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714)

GIT (no fetch, pre==post, read-only):
- foundation-control shadow/m5-ingress-gate c89b792b (unchanged; untracked 33/35 pre-existing)
- FOUNDATION f6417004 · SIASIU e1830b45 · Cosmile 6e44aa40 (all unchanged; evidence read at Cosmile 6e44aa40)
- foundation-docs worktree 877c358b (only the 2 ALLOWED_WRITE files added)

FOUNDER-FIXED (not reopened): D1-A · D2-A · D3-A.

WHAT THE CONTRACT PACKAGE DELIVERS (14 required elements, evidence-anchored):
- Current code/schema truth + 3 contradictions (§1); ownership matrix + boundary tension B1 (§2);
- event taxonomy + producer-time mapping, two planes/one idempotency key (§3);
- recommendationId/nullable-opaque sessionId/opaque purchase_item_ref/identity XOR rules (§4);
- idempotency inputs + duplicate-aggregation prevention (§5); versioned closed-choice normalization + commerce_evidence.v1 envelope (§6);
- separate satisfaction/adverse axes + fail-closed reject reason set (§7); consent/identity-link/lineage/correction/retraction/retention (§8);
- contained write-only outbox boundary (§9); additive local/shadow schema+migration + rollback/rehearsal, no execution (§10);
- exclusions/STOP (§11); Founder→clause→evidence traceability (§12); Designer acceptance + objective review criteria (§13);
- C-boundary preview only, no C design/authority (§14).

IMPL_DELTAS (recorded, NOT fixed; all latent behind flag-OFF):
1. RecommendationEvent.sessionId NON-NULL (schema.prisma:834 + init_postgres:683 + v3_11b:11) vs Founder nullable.
2. recommendationId minted at add-to-cart (cart/items/route.ts:48-52, sessionId:null) not at presentation.
3. Outbox consent inferred from userId (foundationSignalMapper.ts:30-31) vs Founder "login/userId never = consent".

B1 — RESOLVED_BY_FOUNDER_F4_FOR_A_B: the pre-existing Cosmile-local MemoryFactCandidate (schema.prisma:777) +
gate (memoryCandidate.ts) is a current fact. For A/B, [F4] is decisive — Cosmile MemoryFactCandidate/adverse-candidate
creation and ALL candidate creation/promotion calls are forbidden and must remain ZERO. Legacy/local model left untouched
(no destructive remove/re-key), classified outside A/B write scope. Future C may describe Foundation ownership; no C
runtime authority here. No new Designer/Founder decision required.

ASSERTIONS: product/Control repo write = ZERO · DB/secret/network/fetch/branch/commit/push = ZERO ·
test = NOT_RUN · new agent = ZERO · no PII/raw-id/secret/payload/real-DB evidence in result.

NOT_AUTHORIZED: A/B implementation · C design/impl · Package 1B · Foundation intake · outbox consumer · flag/live activation.

NEXT_ROUTE: foundation-advisor → Designer A/B implementation-ready design → independent A/B design review.
RETURN_TO: foundation-advisor
STOP
```
