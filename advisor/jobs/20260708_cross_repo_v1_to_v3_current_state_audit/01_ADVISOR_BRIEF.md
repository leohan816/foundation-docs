# 01 Advisor Brief - Cross-Repo V1 to V3 Current-State Audit

## Final Verdict

`ADVISOR_SYSTEM_READY_WITH_LIMITS`

Reason: the Advisor operating files are present and the job followed the allowed write scope, did not modify runtime repos, did not create a Worker brief, and separated source-of-truth layers. Limits remain because `../skills` is absent at the allowed path, V2 is not one clearly defined cross-repo program in the docs inspected, and several runtime repos have stale or partial role-boundary files.

Instruction validation result for this job: `PROCEED_WITH_LIMITS`.

## Executive Summary

- Memory Architecture V1 is explicitly documented as `CLOSED_WITH_LIMITS` under dev/shadow/readiness scope, with prod/live/main/secret/M6-G activation not done.
- V2 is overloaded. SIASIU product V2 is explicitly documented as the repo-root main line, while Foundation User Ref v2 is a separate identity/ref alignment effort. No single cross-repo "V2 program" closure source was found. Overall V2 = `UNKNOWN_NEEDS_VERIFICATION` unless the intended V2 definition is narrowed.
- Cosmile Memory V3 design V3-00 through V3-10 is document-backed `GATE_PASS_WITH_LIMITS`.
- V3-11A core logic is code-backed in Cosmile and report-backed `CLOSED_WITH_LIMITS`.
- V3-11B DB integration is code/migration/test-backed in non-prod ephemeral Postgres and report-backed closed for that scope.
- V3-11C event wiring is code-backed but flag-OFF shadow only, with a known `sessionId=null` flag-ON write-failure limit. Status: `CLOSED_WITH_LIMITS`.
- V3-11D semantic extraction is gate/plan only and implementation is `HOLD` because feedback input source and Foundation semantic output contract are missing.
- V3-11C2 RecOutcomeEvent behavioral outcome is gate/plan only. Organic outcome MVI is considered possible by the plan, but implementation has not begun and requires Leo/GPT decision.
- V3-11E, V3-12, and production are not started.
- Skills role-boundary audit is blocked by path mismatch: allowed `../skills` is `NOT_FOUND`; candidate `../skill` was not inspected because it is outside the allowed scope.

## Method

### Pass 1 - Inventory

Inventoried candidate sources:

- Advisor ops: `AGENTS.md`, `CLAUDE.md`, `README.md`, `templates/*`, `../foundation-docs/advisor/README.md`.
- Control reports: `../foundation-docs/docs/reports/control/`.
- V3 snapshot archive: `../foundation-docs/docs/reports/control/cosmile-v3-11-shadow-snapshot/`.
- Foundation docs/archive: `../foundation-docs/docs/`, `../foundation-docs/설계문서/`.
- Runtime repos: `../Cosmile`, `../foundation-control`, `../SIASIU`.
- Skills allowed path: `../skills` - not found.

Candidate load-bearing V1 docs:

- `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_FINAL_CLOSURE_20260706.md`
- `FOUNDATION_MEMORY_ARCHITECTURE_V1_TO_V3_ENTRY_PACKAGE_20260706.md`
- `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_STATUS_MATRIX_20260705.md`
- `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_CONTROL_REPORT_ERRATA_20260706.md`
- `FOUNDATION_USER_REF_V2_FINAL_PARITY_CHECK_20260703.md`

Candidate load-bearing V2 docs:

- `../SIASIU/CLAUDE.md`
- `SIASIU_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md`
- `COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md`
- `FOUNDATION_USER_REF_V2_FINAL_PARITY_CHECK_20260703.md`

Candidate load-bearing V3 docs:

- `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md`
- `COSMILE_MEMORY_V3_00_PROBLEM_DEFINITION_20260706.md`
- `COSMILE_MEMORY_V3_01_*` through `COSMILE_MEMORY_V3_10_*`
- `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`
- `COSMILE_MEMORY_V3_DESIGN_PATCH_P1_P12_20260706.md`
- `COSMILE_MEMORY_V3_10_GATE_RESULT_20260706.md`
- `COSMILE_MEMORY_V3_11_IMPLEMENTATION_EVIDENCE_20260706.md`
- `COSMILE_MEMORY_V3_11B_DB_INTEGRATION_EVIDENCE_20260706.md`
- `COSMILE_MEMORY_V3_11C_EVENT_WIRING_EVIDENCE_20260706.md`
- `COSMILE_MEMORY_V3_11D_SEMANTIC_EXTRACTION_GATE_PLAN_20260707.md`
- `COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`

### Pass 2 - Deep Verification

Deep-verified only status-bearing files:

- Foundation contract/runtime: `foundation_http_service/contracts.py`, `core.py`, `server.py`, `semantic_router.py`, `ARCHITECTURE_CONSTITUTION.md`.
- Cosmile runtime: `package.json`, `prisma/schema.prisma`, V3-11B migration, `ids.ts`, `adverse.ts`, `memoryCandidate.ts`, `recommendationEventService.ts`, `checkout.ts`, cart/checkout/admin routes, Foundation client/adapters, V3 scripts.
- SIASIU runtime: Foundation-only consultation adapters, response/semantic adapters, provider flag, service-local memory contract/crypto/hard-reject/shadow wiring.
- Role files: `CLAUDE.md`, `AGENTS.md`, `.claude/rules` presence across repos.

No tests were run in this Advisor audit. Test-backed status below means "test evidence exists in reports or test files were inspected", not "tests rerun by Advisor".

## Repos and Files Checked

Advisor:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `templates/00_INTAKE_TEMPLATE.md`
- `templates/01_ADVISOR_BRIEF_TEMPLATE.md`
- `templates/02_WORKER_BRIEF_TEMPLATE.md`
- `templates/03_SENTINEL_REVIEW_BRIEF_TEMPLATE.md`
- `templates/04_SERVICE_REVIEW_BRIEF_TEMPLATE.md`
- `templates/05_FINAL_AUDIT_TEMPLATE.md`
- `../foundation-docs/advisor/README.md`

Cosmile:

- `CLAUDE.md`, `app/CLAUDE.md`, `app/AGENTS.md`
- `app/package.json`
- `app/prisma/schema.prisma`
- `app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/migration.sql`
- `app/src/lib/ids.ts`
- `app/src/lib/adverse.ts`
- `app/src/lib/memoryCandidate.ts`
- `app/src/lib/recommendationEventService.ts`
- `app/src/lib/checkout.ts`
- `app/src/lib/foundation/foundationUserRef.ts`
- `app/src/adapters/foundationClient.ts`
- `app/src/adapters/cosmileSemanticAdapter.ts`
- `app/src/lib/foundation/consultationRiskGate.ts`
- `app/src/app/api/cart/items/route.ts`
- `app/src/app/api/checkout/mock-complete/route.ts`
- `app/src/app/api/admin/orders/[orderId]/status/route.ts`
- `app/scripts/v3_11.vitest.ts`
- `app/scripts/v3_11b_db_integration.dbtest.py`
- `app/scripts/v3_11c_rec_event.vitest.ts`

foundation-control:

- `CLAUDE.md`
- `README.md`
- `ARCHITECTURE_CONSTITUTION.md`
- `foundation_http_service/contracts.py`
- `foundation_http_service/core.py`
- `foundation_http_service/server.py`
- `foundation_http_service/semantic_router.py`

SIASIU:

- `CLAUDE.md`
- `README.md`
- `app/adapters/consult_via_foundation.py`
- `app/adapters/foundation_client.py`
- `app/adapters/siasiu_semantic_adapter.py`
- `app/adapters/siasiu_response_adapter.py`
- `app/adapters/provider_flag.py`
- `app/service_memory/canonical.py`
- `app/service_memory/crypto.py`
- `app/service_memory/hard_reject.py`
- `app/service_memory/shadow_wiring.py`

Skills:

- `../skills`: `NOT_FOUND`
- `../skill`: observed as a candidate sibling directory, but not inspected because it was outside the explicitly allowed read path.

## V1 State

### V1 Definition Handling

Do not merge V1 meanings:

- Explicitly documented Memory Architecture V1: cross-repo memory architecture M1-M6. This is the V1 used by V3 entry docs.
- SIASIU product V1: `../SIASIU/CLAUDE.md` says old V1 is `archive_v1/` local and git tag `v1`. The tag exists, but `../SIASIU/archive_v1` was not found in the working tree.

### Memory Architecture V1 Status

| Layer | Status |
|---|---|
| reported status | `CLOSED_WITH_LIMITS` |
| document-backed status | `CLOSED_WITH_LIMITS` |
| code-backed status | `BUILDER_DONE` for service-local identity/memory-shadow components inspected; not full prod |
| test-backed status | Report-backed runner/test evidence only; Advisor did not rerun |
| runtime/prod status | `PROD_NOT_STARTED`; prod DB, real Vault/secret, live, main merge, M6-G activation not done |
| labels | `BUILDER_DONE`, `TECH_REVIEW_CLOSED`, `CLOSED_WITH_LIMITS`, `PROD_NOT_STARTED` |

Document evidence:

- `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_FINAL_CLOSURE_20260706.md` states Memory V1 is `CLOSED_WITH_LIMITS` under dev/shadow/readiness, not production/live.
- It explicitly lists prod DB backfill, real Vault/secret injection, live M6-G activation, main merge, external release, and production DB migration as not done.
- `FOUNDATION_MEMORY_ARCHITECTURE_V1_TO_V3_ENTRY_PACKAGE_20260706.md` states V3 starts from Option B service-local subject_ref and does not inherit Option A/Foundation-side subject mint.

Code-backed checks:

- SIASIU `service_memory/crypto.py` implements service-local `subj_v2_` and `furef_v2_` with prod/unknown fail-closed behavior.
- SIASIU `service_memory/canonical.py` builds minimized request-scoped memory context with `raw_text_stored=False`.
- SIASIU `service_memory/hard_reject.py` is marked `SIMULATION_ONLY`.
- SIASIU `service_memory/shadow_wiring.py` is flag-OFF by default and sends refs/hashes, not raw text.
- Cosmile V3 `ids.ts` implements service-local `subj_v2_`, `anon_v3_`, and `rec_v3_` ID generation.
- Foundation contract/core declares no durable writes and exposes dev/shadow invariants.

Limits:

- M6-G definition split remains unresolved: ingress hard reject vs memory-reuse hard reject.
- M6-G live activation is not done.
- Prod DB backfill, real secret/Vault, live, main merge, prod DB migration remain hard stops.

### SIASIU Product V1 Status

| Layer | Status |
|---|---|
| reported status | old V1 archived locally; tag `v1` |
| document-backed status | `../SIASIU/CLAUDE.md` documents old V1 as `archive_v1/` and git tag `v1` |
| code-backed status | git tag `v1` exists; `archive_v1/` directory was not found |
| test-backed status | not audited |
| runtime/prod status | not audited |
| labels | `UNKNOWN_NEEDS_VERIFICATION` |

## V2 State

### V2 Definition Handling

No single cross-repo V2 definition was found in the load-bearing docs. V2 is used in at least two explicit ways:

1. SIASIU product V2: `../SIASIU/CLAUDE.md` says "V2 = main" at repo root.
2. Foundation User Ref v2 / furef v2: identity/ref alignment across SIASIU and Cosmile.

Therefore "V2 overall" must be treated as `UNKNOWN_NEEDS_VERIFICATION` unless Leo/GPT narrows the intended V2 definition.

### SIASIU Product V2

| Layer | Status |
|---|---|
| reported status | V2 is main |
| document-backed status | `../SIASIU/CLAUDE.md` explicitly says V2 is repo root |
| code-backed status | repo root exists; old `archive_v1/` not found; tag `v1` exists |
| test-backed status | not audited |
| runtime/prod status | not audited |
| labels | `UNKNOWN_NEEDS_VERIFICATION` |

### Foundation User Ref v2 / furef v2

| Layer | Status |
|---|---|
| reported status | SIASIU `PASS`; Cosmile `PASS_WITH_WATCH`; final parity `PASS_WITH_WATCH` with Memory-live `PATCH_REQUIRED` |
| document-backed status | backed by `SIASIU_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md`, `COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md`, and `FOUNDATION_USER_REF_V2_FINAL_PARITY_CHECK_20260703.md` |
| code-backed status | SIASIU `provider_flag.py` and Cosmile `foundationUserRef.ts` implement `furef_v2_` HMAC/fail-closed logic |
| test-backed status | report-backed test evidence; Advisor did not rerun |
| runtime/prod status | prod secret provisioning remains not verified; Memory live blocked by prior Foundation memory PATCH_REQUIRED in old parity report, superseded in later Memory V1 Option B closure for V3 baseline |
| labels | `BUILDER_DONE`, `CLOSED_WITH_LIMITS`, `NEEDS_PATCH`, `PROD_NOT_STARTED` |

Important conflict/age note:

- The July 3 V2 parity report flags Foundation memory subject_ref as `PATCH_REQUIRED` before Memory live.
- Later July 5-6 Memory V1 Option B docs supersede Foundation-side mint and close Memory V1 with limits.
- For V3, the later V1 closure/entry package is the controlling document. For the standalone V2 parity report, its own status remains `PASS_WITH_WATCH` plus `PATCH_REQUIRED` at the time written.

## V3 State Table

| Stage | Reported status | Document-backed status | Code-backed status | Test-backed status | Runtime/prod status | Labels |
|---|---|---|---|---|---|---|
| V3-00 to V3-10 Design | `GATE_PASS_WITH_LIMITS` | V3-10 gate says design ready with tracked limits | no implementation in design stage | design reviews only | prod not started | `DESIGN_ONLY`, `GATE_APPROVED`, `CLOSED_WITH_LIMITS`, `PROD_NOT_STARTED` |
| V3-11A Core Logic | report says implementation evidence plus patch, closed with limits | V3-11 evidence + addendum | code exists: `ids.ts`, `adverse.ts`, `memoryCandidate.ts`, types, pure logic | reports 43/43 pure + 10/10 regression; test file exists | no DB/prod/live | `BUILDER_DONE`, `TECH_REVIEW_CLOSED`, `CLOSED_WITH_LIMITS`, `PROD_NOT_STARTED` |
| V3-11B DB Integration | report says non-prod DB integration closed after patch | V3-11B evidence + addendum | schema and migration exist in Cosmile | reports 36/36 DB, 43/43 pure; db test file exists | ephemeral/non-prod only; prod not started | `BUILDER_DONE`, `TECH_REVIEW_CLOSED`, `CLOSED_WITH_LIMITS`, `PROD_NOT_STARTED` |
| V3-11C Event Wiring | `CLOSED_WITH_LIMITS` | V3-11C evidence | `trackRecommendationEvent` and cart route wiring exist | reports 10/10 provider-independent, 37/37 DB, 63/63 total; test file exists | flag OFF; live not started; flag ON fails with null `sessionId` | `BUILDER_DONE`, `TECH_REVIEW_CLOSED`, `CLOSED_WITH_LIMITS`, `PROD_NOT_STARTED` |
| V3-11D Semantic Extraction | gate/plan only; implementation NO | 11D plan identifies G-D1/G-D2 STOP candidates | no implementation found; Foundation FRC lacks target semantic output fields | test design only | prod/live not started | `DESIGN_ONLY`, `HOLD`, `UNKNOWN_NEEDS_VERIFICATION`, `PROD_NOT_STARTED` |
| V3-11C2 RecOutcomeEvent Behavioral Outcome | gate/plan only; organic MVI possible after decision | 11C2 plan says STOP 0 for organic MVI but actual implementation cannot begin without approval | schema exists from 11B; no emit service or checkout wiring found | no implementation tests found | prod/live not started | `DESIGN_ONLY`, `GATE_APPROVED`, `UNKNOWN_NEEDS_VERIFICATION`, `PROD_NOT_STARTED` |
| V3-11E Analytics & Alert | not started | only V3-09 design/report minimum found | no V3-11E implementation found | no V3-11E tests found | prod/live not started | `NOT_FOUND`, `DESIGN_ONLY`, `UNKNOWN_NEEDS_VERIFICATION`, `PROD_NOT_STARTED` |
| V3-12 Full Review | not started | planned only | no implementation review artifact found | no tests | prod/live not started | `NOT_FOUND`, `UNKNOWN_NEEDS_VERIFICATION`, `PROD_NOT_STARTED` |
| Production | not started | hard stops repeated across docs | not inspected or accessed by design | no prod evidence | `PROD_NOT_STARTED` | `PROD_NOT_STARTED`, `HOLD` |

## Code Implementation Map

### V3-11A

- Runtime code: yes, Cosmile shadow/current branch files exist.
- Tests: `scripts/v3_11.vitest.ts` exists.
- DB migration: no, out of V3-11A scope.
- Shadow branch only: docs say shadow `af26f94`, main unchanged.
- Main merged: not verified by checkout; docs state main unchanged.
- Prod/live/secret: not accessed; docs state none.

### V3-11B

- Runtime code/schema: yes, `prisma/schema.prisma` has `RecommendationEvent`, `RecOutcomeEvent`, `RecOutcomeFeedback`, and LTM additive fields.
- Migration: yes, `20260706120000_v3_11b_learning_commerce_memory/migration.sql`.
- Tests: DB test file exists and reports show non-prod ephemeral Postgres pass.
- Shadow branch only: docs say shadow `6fd7815`, main unchanged.
- Main merged: not verified by checkout; docs state main unchanged.
- Prod/live/secret: not accessed; docs state none.

### V3-11C

- Runtime code: yes, `recommendationEventService.ts` and cart route wiring.
- Known code limit: cart route passes `sessionId: null`; schema requires `RecommendationEvent.sessionId String NOT NULL`; service catches DB failure as `write_failed`.
- Tests: `scripts/v3_11c_rec_event.vitest.ts` exists.
- Flag: `COSMILE_REC_EVENT_ENABLED` default OFF.
- Prod/live/secret: not accessed; docs state none.

### V3-11D

- Runtime code: no implementation found for semantic label extraction.
- Foundation output contract: `foundation-control/foundation_http_service/contracts.py` `build_frc` outputs final strategy, safety gate, product/recommendation flags, product refs, answer substance, evidence, trace. It does not output `semantic_label`, `adverse_severity`, or `adverse_certainty`.
- Cosmile `foundationClient.ts` FRC type likewise has no 11D semantic output fields.
- Input source: no post-order review/rating/feedback route/model found in inspected Cosmile runtime.
- Status: `HOLD`.

### V3-11C2

- Schema: `RecOutcomeEvent` exists.
- Runtime emit: no `trackRecOutcomeEvent`, no `COSMILE_REC_OUTCOME_ENABLED`, no checkout wiring found.
- Checkout hook: `completeMockOrder` returns `order.items` and `justPaid`; `mock-complete` emits only `purchase_complete` `CommerceEvent`.
- Attribution limit: `CartItem` and `OrderItem` have no `recommendationId`.
- Refund limit: admin status route updates order status only; no line-level refund source.
- Reorder: no route found in inspected paths.

## Report/Evidence/Snapshot Map

- Control report location: `../foundation-docs/docs/reports/control/`.
- V3 shadow snapshot location: `../foundation-docs/docs/reports/control/cosmile-v3-11-shadow-snapshot/`.
- Evidence files: V1 closure, V3 implementation evidence, V3-11B evidence, V3-11C evidence, V3 gate/plan docs under control reports.
- Advisor archive: `../foundation-docs/advisor/`.
- Advisor job archive: `../foundation-docs/advisor/jobs/20260708_cross_repo_v1_to_v3_current_state_audit/`.
- Design/archive docs: `../foundation-docs/설계문서/`.
- Important rule: foundation-docs is not runtime source-of-truth. It is evidence/archive unless a document is a canonical contract/design for reasoning/product/ingredient/safety.
- If report and runtime code conflict, actual runtime code defines current behavior. If canonical Foundation contract and service behavior conflict on reasoning/safety/product/ingredient semantics, STOP and report.

## Source-of-Truth Map

| Category | Source |
|---|---|
| runtime source | `../Cosmile`, `../foundation-control`, `../SIASIU` code |
| canonical contract/source | Foundation contracts in `foundation-control`, Foundation architecture/contract docs, canonical data dictionary where explicitly used as contract |
| evidence/snapshot/report archive | `../foundation-docs/docs/reports/control/`, V3 shadow snapshot folder |
| advisor artifact archive | `../foundation-docs/advisor/jobs/...` |
| stale/historical docs | older reports superseded by errata, foundation-control README old hashes, SIASIU old V1 references, early user_ref v1/v2 docs where later Option B closure supersedes identity assumptions |
| current instruction | Leo/GPT instruction in this job, including no Worker brief and no implementation |

Principles confirmed:

- `foundation-docs` is not runtime source-of-truth.
- Runtime behavior must be verified in actual repo code.
- Foundation canonical docs/contracts are reasoning/product/ingredient/safety authority.
- Cosmile and SIASIU are service/runtime layers.
- Services must not lower Foundation safety/decision results.

## Current Blockers and Limits

- V3-11D G-D1: feedback/post-order input source missing.
- V3-11D G-D2: Foundation semantic output contract missing for `semantic_label`, `adverse_severity`, and `adverse_certainty`.
- V3-11C: `sessionId` is null; flag ON attempts can produce `write_failed` because DB schema requires non-null `sessionId`.
- RecOutcomeEvent ID generator is not implemented in runtime service; schema has `id` but no `trackRecOutcomeEvent` service exists.
- RecOutcomeEvent idempotency decision remains open: code-level existing-check vs unique index.
- `rec_id` threading quality limit: recommendationId is not threaded through CartItem to OrderItem.
- Direct attribution unavailable without rec_id threading.
- Session attribution unavailable without sessionId population.
- Refund line-level source absent; admin route is order-level status only.
- Reorder/repurchase route absent.
- V3-11E analytics/alert not started.
- V3-12 full review not started.
- Prod/live/main/secret remain hard-stop boundaries.
- M6-G definition and activation remain pre-prod/pre-live gate issues.
- G13/COSMILE-4 real DDL restore remains outside current verified implementation.
- MemoryFactCandidate `secretVersion`, real secret rotation, approved-row backfill, and full LTM promotion pipeline remain limits.
- Skills role-boundary audit is blocked by allowed-path mismatch.

## CLAUDE.md / AGENTS.md Audit Notes

| Repo | CLAUDE.md | AGENTS.md | `.claude/rules` | Notes |
|---|---:|---:|---:|---|
| foundation-advisor | yes | yes | not found | Advisor bootstrap files present; templates present; current job intentionally omits Worker brief by instruction |
| Cosmile | root yes, app yes | app yes | not found | App CLAUDE has strong Foundation/Cosmile/SIASIU boundary; app AGENTS is Next.js operational guidance, not Advisor boundary; root/app guidance may be mixed-age |
| foundation-control | yes | not found | not found | CLAUDE defines control tower and no-prod/live/write rules; README appears older/stale in places |
| SIASIU | yes | not found | not found | CLAUDE documents V2 main and role boundaries; old V1 archive path not present in working tree, tag `v1` exists |
| skills | unknown | unknown | unknown | `../skills` not found; `../skill` not inspected due allowed read scope |

Boundary clarity:

- Foundation/Cosmile/SIASIU boundary is clear in current `CLAUDE.md` files and Foundation constitution.
- Builder/Sentinel/Advisor/Reviewer skill-role boundary could not be verified from the skills repo because the allowed path was absent.
- Stale rule candidates: foundation-control README old baseline hashes, SIASIU V1 archive path statement, early V2/user_ref docs superseded by later Option B Memory V1 closure for V3 baseline.

## Advisor System Findings

- Runtime repos were not modified.
- Writes were limited to the specified Advisor job folder.
- No Worker brief was created.
- Source-of-truth layers were separated.
- Uncertain facts were marked `UNKNOWN_NEEDS_VERIFICATION`.
- The missing `../skills` path was reported instead of reading outside the allowed scope.
- No prod/live/main/secret was intentionally accessed.
- No DB write, schema edit, commit, or push was performed.

## What Should NOT Be Done Next

- Do not create a Worker brief from this audit as-is.
- Do not start V3-11D implementation before G-D1 and G-D2 are resolved.
- Do not start V3-11C2 implementation before D-O1 and organic-MVI scope are approved.
- Do not turn on `COSMILE_REC_EVENT_ENABLED` for live/prod while `sessionId` is null.
- Do not add raw-text semantic classification in Cosmile routes to bypass Foundation semantic contract.
- Do not touch prod/live/main/secret or run prod migrations.
- Do not treat foundation-docs reports as runtime truth when code says otherwise.
- Do not inspect `../skill` unless Leo/GPT expands the allowed read scope or corrects the path.

## Exactly One Next Action

Prerequisite next action: Leo/GPT should correct the skills repo read scope by either providing `../skills` or explicitly allowing `../skill`, then run a narrow Advisor delta audit of `fable-builder`, `fable-sentinel`, `fable-debugger`, and `shared-reasoning-core` role boundaries before any Worker brief is written.

Follow-ups after that prerequisite, not next actions for this job:

- Decide V3-11D G-D1/G-D2 if semantic extraction is still desired.
- Decide V3-11C2 D-O1 and organic MVI scope if behavioral outcome wiring is desired.
- Plan a separate technical review for any future implementation result.

