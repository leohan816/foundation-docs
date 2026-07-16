# Handoff — WU8-C2 Pure Cosmile Delivery Contracts and State Machine

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
WORK_UNIT_ID: WU8-C2
TARGET_ACTOR: cosmile
TARGET_SESSION: cosmile
TARGET_WINDOW: @1
TARGET_PANE: %1
ROLE: Cosmile repository-owner Worker
EXPECTED_MODEL_FAMILY: Opus 4.8
REQUIRED_EFFORT: high
REQUIRED_SKILL: /fable-builder
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_REPOSITORY: /home/leo/Project/Cosmile
TARGET_BRANCH: shadow/m4-cosmile-memory
REQUIRED_BASE: ad172db403065fc8e498a1e80cdd347034ea7c48
REQUIRED_UPSTREAM_HEAD: ad172db403065fc8e498a1e80cdd347034ea7c48
REQUIRED_UPSTREAM_STATE: ahead 0 / behind 0
C1_PASS_REVIEW_COMMIT: 6530daa6c6e558b2b05644a3e6c27ab068881b74
C1_BASE_VERIFICATION_COMMIT: fcdeade231840aa28bc5fa4cfe8104ff25d3174d

DESIGN_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
DESIGN_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
FOUNDER_DECISION_COMMIT: 691a2d065f5857f7d44d8e23588f2f760204bc47
EXECUTION_MANIFEST_COMMIT: 006ef9108f4acba3a2302e6be91ca02c4a8c978e

ALLOWED_PRODUCT_PATHS:
- app/src/types/commerceEvidenceDelivery.ts
- app/src/lib/commerceEvidenceDeliveryState.ts
- app/scripts/wu8_commerce_evidence_delivery_contract.vitest.ts
- app/scripts/wu8_commerce_evidence_delivery_property.vitest.ts

ALLOWED_FOUNDATION_DOCS_WRITES:
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_RESULT.md
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_POINTER.md

AUTHORIZED_ACTIONS:
- implement only the exact frozen `CommerceEvidenceCarrierV1` application contract around the existing `CommerceEvidenceEnvelope`; add, remove, reshape, enrich, normalize, or reinterpret no envelope field;
- enforce UTF-8 JSON serialization, exact-key projection, 32,768-byte ceiling, and poison classification without recomputing or repairing `source_hash`;
- implement only the exact `CommerceEvidenceDeliveryAckV1` contract version, five outcomes, closed reason/disposition matrix, and guarded categories from reviewed design section 3.4;
- implement only the eight reviewed source delivery states, exact transition matrix, generic status mapping, pure lease/version/expiry handling, retry schedule, injected clock/jitter behavior, limits, poison/dead-letter categorization, retraction ordering rules, and deterministic compare-and-set decisions from section 4;
- keep every function pure and deterministic; no sender, I/O, DB, network, timer, scheduler, process, route, endpoint, provider, broker, credential, secret, or actual delivery;
- add exact contract tests and property/malicious-input tests in the two authorized test paths;
- use tests-first discipline and smallest safe diff;
- create one local candidate commit on the exact branch without amend/rebase/squash/force-push;
- do not push before independent PASS;
- write only the declared result/pointer, return to Advisor, and STOP.

FROZEN_CONSTANTS_AND_RULES:
- acknowledgement contract version: foundation.commerce_evidence_delivery_ack.v1;
- outcomes: committed | exact_replay | terminal_rejected | retryable_unavailable | disabled;
- dispositions: acknowledge | retry | contain;
- retryable_unavailable reason is cannot_determine only; terminal_rejected reason is one guarded existing C category; committed/exact_replay/disabled reason is null;
- delivery states: contained | ready | leased | retry_wait | acknowledged | completed_rejected | dead_lettered | blocked;
- terminal states: acknowledged | completed_rejected | dead_lettered | blocked;
- attempts: maximum 5; failed attempts 1–4 delays 1, 2, 4, 8 seconds plus injected uniform jitter 0..250 ms;
- lease: 30 seconds; global concurrency 4; per-root in-flight 1; batch 20; rate 10/s burst 20; unfinished depth 1,000; bytes 32,768;
- delivery-only categories: payload_malformed | payload_too_large | lease_expired | authority_unavailable | receiver_unavailable | retry_exhausted | ancestor_not_committed | backpressure | ack_malformed;
- malformed/unknown acknowledgement retries and never acknowledges; terminal rejection completes delivery but is not acceptance; late acknowledgement at stale lease version never mutates state;
- generic status: pending for contained/ready/leased/retry_wait; sent for acknowledged; failed for completed_rejected/dead_lettered; blocked for blocked;
- no permissive unknown state, acknowledgement, outcome, disposition, reason, or transition.

EXACT_TEST_COMMANDS:
- cd /home/leo/Project/Cosmile/app && npx vitest run scripts/wu8_commerce_evidence_delivery_contract.vitest.ts scripts/wu8_commerce_evidence_delivery_property.vitest.ts
- cd /home/leo/Project/Cosmile/app && npx vitest run scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts
- cd /home/leo/Project/Cosmile/app && node scripts/m2_ab_no_transport.mjs

REQUIRED_TEST_MEANING:
- exact carrier keys/serialization/byte count and zero extra fields;
- full acknowledgement matrix and adjacent-invalid combinations;
- every allowed transition and every adjacent/unknown forbidden transition;
- lease version, expiry, stale acknowledgement, retry attempt 5, backoff/jitter boundaries, deterministic injected clock/jitter;
- per-root ordering, correction/retraction no-overtake, earlier unfinished rows blocked, retraction row remains eligible in the pure model;
- poison, oversize, malformed acknowledgement, category-only dead letter, backpressure/limits, flag/consent containment inputs;
- no raw values in errors, decisions, metrics/DLQ-shaped outputs, or fixtures;
- existing M2 A/B suites and no-transport scan unchanged and passing.

PRE_EXISTING_UNTRACKED_FILES_TO_PRESERVE:
- app/docs/COSMILE_FOUNDATION_PARITY_CROSSCHECK_20260703.md
- app/docs/COSMILE_FOUNDATION_USER_REF_ALIGNMENT_20260703.md
- app/docs/COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md
- app/docs/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md
- app/docs/COSMILE_MEMORY_INVENTORY_20260704.md
- app/docs/FOUNDATION_DOCS_SYNC_POLICY.md

FORBIDDEN:
- any path outside the exact four product paths and two result paths;
- schema, migration, DB connection/query, sender, consumer, polling, I/O, file/runtime persistence, timer/scheduler, process launcher, endpoint/route, provider, broker, network, credential/token/certificate/secret, actual delivery, activated intake, flag activation, Foundation/SIASIU/foundation-control changes;
- carrier/envelope semantic change, new/renamed payload field, weakened validation, permissive unknown;
- self-review, Reviewer dispatch, next WorkUnit, push before independent PASS, history rewrite, or scope expansion;
- new agent or sub-agent.

STOP_CONDITIONS:
- branch/HEAD/upstream mismatch or tracked drift;
- design SHA mismatch;
- required behavior cannot fit the exact four paths;
- sender, I/O, DB, timer, network, endpoint, provider, broker, credential, deployment, or activation is required;
- an envelope/carrier semantic change or permissive unknown is required;
- a reviewed-design contradiction or product-policy decision is discovered;
- a test requires changing an existing M2 file.

COMMIT_PERMISSION: local candidate commit only
PUSH_PERMISSION: NO until exact candidate receives independent PASS
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_POINTER.md
STOP_AFTER_RETURN: true
```

Read all referenced files directly. Apply `/fable-builder`. Verify the exact C1
PASS base and upstream equality before changing anything. Perform only WU8-C2,
write the declared evidence, return to `foundation-advisor`, and STOP.
