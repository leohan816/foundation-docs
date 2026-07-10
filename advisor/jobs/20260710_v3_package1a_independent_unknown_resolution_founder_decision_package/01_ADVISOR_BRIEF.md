# V3 Package 1A Discovery Advisor Brief

Date: 2026-07-10

Validation verdict: `PROCEED_WITH_LIMITS`

## Executive Finding

The mission is necessary and can proceed as discovery only. Current repositories contain a partial storage skeleton and several policy hypotheses, but they do not prove a usable post-order feedback product, a V3-11D semantic feedback contract, end-to-end erasure, safe guest-to-login linkage, raw-text non-persistence across all infrastructure, or measurable learning value.

No Package 1B design should begin until the blind assessments and founder decision package are complete.

## Inventory Method

Advisor used a two-pass evidence method:

1. Inventory candidate reports, canonical design records, schemas, routes, services, contracts, and actor instructions.
2. Deep-read only load-bearing files that determine whether a claim is code-backed, contract-backed, canonical, historical, or unresolved.

No tests, DB queries, runtime commands, live models, or secret-bearing files were executed or read.

## Load-Bearing Files Read

### Advisor and role authority

- `../foundation-advisor/AGENTS.md`
- `../foundation-advisor/CLAUDE.md`
- `../foundation-advisor/README.md`
- `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`

### Current approved Commerce Memory direction

- `../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/13_ADVISOR_REVIEW_CONSOLIDATION.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/05_FINAL_AUDIT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/14_CLOSURE_RECORD.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/05_FINAL_AUDIT.md`

### V3 feedback and semantic design evidence

- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11D_SEMANTIC_EXTRACTION_GATE_PLAN_20260707.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11_CONTRACT_TO_CODE_MAPPING_20260706.md`
- `../foundation-docs/docs/reports/fable5/COSMILE_MEMORY_V3_FABLE_DESIGN_REVIEW_20260706.md`
- `../foundation-docs/advisor/jobs/20260708_cross_repo_v1_to_v3_current_state_audit/01_ADVISOR_BRIEF.md`

### Current Cosmile runtime and schema

- `../Cosmile/app/prisma/schema.prisma`
- `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/migration.sql`
- `../Cosmile/app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql`
- `../Cosmile/app/src/types/recOutcome.ts`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts`
- `../Cosmile/app/src/lib/memoryCandidate.ts`
- `../Cosmile/app/src/lib/adverse.ts`
- `../Cosmile/app/src/lib/ids.ts`
- `../Cosmile/app/src/lib/foundationSignalMapper.ts`
- `../Cosmile/app/src/lib/commerceEventService.ts`
- `../Cosmile/app/src/adapters/foundationClient.ts`
- `../Cosmile/app/src/adapters/cosmileSemanticAdapter.ts`
- `../Cosmile/app/src/app/api/slice/consult-foundation/route.ts`
- `../Cosmile/app/src/app/orders/[orderId]/page.tsx`
- `../Cosmile/app/src/app/account/orders/page.tsx`
- `../Cosmile/app/src/app/api/orders/[orderId]/route.ts`
- `../Cosmile/app/src/app/api/checkout/mock-complete/route.ts`
- `../Cosmile/app/docs/COSMILE_TO_FOUNDATION_SIGNAL_CONTRACT.md`
- `../Cosmile/설계자료/COSMILE_Foundation_Signal_Contract.md`

### Current foundation-control contract and raw-text surfaces

- `../foundation-control/foundation_http_service/contracts.py`
- `../foundation-control/foundation_http_service/core.py`
- `../foundation-control/foundation_http_service/server.py`
- `../foundation-control/foundation_http_service/semantic_router.py`
- `../foundation-control/foundation_http_service/llm_guard.py`
- `../foundation-control/foundation_http_service/deepseek_composer.py`
- `../foundation-control/contracts/FOUNDATION_CORE_DECISION_CONTRACT_V1.md`
- `../foundation-control/contracts/COSMILE_FOUNDATION_CONTRACT_V1.md`

### SIASIU boundary evidence

- `../SIASIU/CLAUDE.md`
- `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- `../SIASIU/app/adapters/consult_via_foundation.py`
- `../SIASIU/app/adapters/foundation_client.py`
- `../SIASIU/app/adapters/siasiu_semantic_adapter.py`
- `../SIASIU/app/adapters/siasiu_response_adapter.py`
- selected files under `../SIASIU/app/service_memory/`

## Files Not Read Or Systems Not Accessed

- No secret files or environment values.
- No `.env` contents.
- No DB contents or connection tests.
- No production, staging, live, or customer data.
- No external legal source.
- No live model or network call.
- No Foundation Worker independent result, Cosmile Worker independent result, or Fable5 blind result; none existed when Advisor wrote its first pass.
- No unrelated historical archive was treated as current authority.

## Evidence-Layer Findings

### Code-backed current facts

1. Cosmile has `RecOutcomeFeedback` schema/type artifacts, but current source search found no route, service, UI, or production code that creates feedback rows.
2. Current order and order-history surfaces display order information and provide no review, rating, survey, or feedback submission control.
3. `RecOutcomeEvent` is currently an organic purchase summary row with hard uniqueness by `orderItemId`; its service explicitly excludes semantic feedback and V3-11D.
4. Current Cosmile `Frc` client type and foundation-control `build_frc` do not expose `semantic_label`, `adverse_severity`, or `adverse_certainty` as a V3-11D feedback output contract.
5. Cosmile consultation sends masked request text to `/v1/consult_contract`; it is not linked to an `OrderItem` feedback provenance path.
6. foundation-control's dev HTTP server disables default request logging and keeps a sanitized in-memory trace ring, but raw request text still exists in process memory and can be sent to semantic/composer model transports when enabled.
7. Current code cannot prove behavior of external provider retention, reverse proxies, platform access logs, crash capture, observability, queues, retries, or deployment infrastructure.
8. Current `RecOutcomeFeedback` schema is narrower than the historical V3-04 proposed contract: it lacks explicit `subjectRef`, `feedbackType`, `signalSource`, `sourceRef`, `contentHash`, `rawTextStored`, product/SKU, and score fields.
9. Current identity code mints separate `subjectRef` and `anonymousRef`; the C2 writer rejects both-present and both-absent identity states. No runtime stitching/re-key implementation was found in the inspected files.
10. `FoundationSignalOutbox` and a mapper exist, but the mapper is draft-only, assumes a logged-in user is consented, stores pending rows, and does not flush to Foundation.

### Canonical and document-backed facts

1. The approved V3-11C2 Commerce Memory design keeps raw commerce evidence in Cosmile and limits Foundation to refined/whitelisted signals.
2. The same approved design explicitly carries R-1, R-2, and R-3 as unresolved gates.
3. V3-11D is a gate/plan only and remains blocked by missing feedback input and missing semantic output contract.
4. Historical V3 documents contain proposed retention, erasure, stitching, feedback, and signal behavior, but those proposals are not sufficient to override later explicit unresolved-gate status or absent runtime behavior.

### Test-backed limits

1. Existing DB tests prove enum/CHECK acceptance and rejection for synthetic `RecOutcomeFeedback` rows.
2. Existing tests do not prove user input UX, semantic calibration, multilingual/mixed-statement quality, deletion propagation, identity stitching, raw-text non-persistence across infrastructure, or product value.
3. No pilot corpus, calibrated confusion matrix, feedback selection-bias analysis, recommendation uplift study, or stop-threshold evidence was found in the load-bearing sources.

### Runtime/prod status

`NOT_PROVEN_AND_NOT_APPROVED`

No runtime or production claim is made by this discovery mission.

## Material Document Conflicts

### Identity and erasure

The older V3 data dictionary describes a stitching state machine and erasure behavior. The newer approved Commerce Memory canonical design explicitly marks retention/erasure and guest-to-login behavior as unresolved R-2/R-3 gates. Current runtime code does not implement the older policy. The unresolved canonical status controls this mission.

### Signal whitelist authority

Cosmile has a file that calls itself the unique signal contract and a mapper that references it. The newer approved Commerce Memory canonical design still marks the canonical whitelist/contract owner as unresolved R-1. The mapper also implements only a subset and contains an explicit consent assumption. Therefore the existence of the older file does not close ownership, versioning, consent, or expansion authority.

### Feedback contract shape

The historical V3-04 contract proposes a rich append-only feedback record with provenance and raw-text non-storage fields. Current Prisma schema implements only a smaller subset. This is a current design-to-schema gap, not an invitation to patch schema during discovery.

## Discovery Decision

Proceed with the frozen register and blind assessments. Do not call Control. Do not design Package 1B. Do not let any actor resolve product, legal, identity, retention, or semantic-calibration choices by assumption.
