# Exact Handoff — WU8-C1 Cosmile Delivery Schema

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
WORK_UNIT_ID: WU8-C1
TARGET_ACTOR: cosmile
TARGET_SESSION: cosmile
TARGET_WINDOW: @1
TARGET_PANE: %1
ROLE: Cosmile repository-owner Worker
REQUIRED_MODEL_FAMILY: Opus 4.8
REQUIRED_EFFORT: high
REQUIRED_SKILL: /fable-builder
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_REPOSITORY: /home/leo/Project/Cosmile
TARGET_BRANCH: shadow/m4-cosmile-memory
BASELINE_COMMIT: f26fa5ced7083bb8d0af00bda2a54951923ea22f
EXPECTED_UPSTREAM: origin/shadow/m4-cosmile-memory
UPSTREAM_AT_DISPATCH: equal

FOUNDER_DECISION_COMMIT: 691a2d065f5857f7d44d8e23588f2f760204bc47
EXECUTION_MANIFEST_COMMIT: 006ef9108f4acba3a2302e6be91ca02c4a8c978e
MANIFEST_REVIEW_COMMIT: e6db6fdafde5da6a3800e2b523b93d03f4864796
ACTIVATION_COMMIT: 3033b532a487eb57622b9afe3f66de6c1c1601c6
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
DESIGN_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
DESIGN_DELTA_REVIEW_COMMIT: 5ea5469dec56768270fdb8c3eb8e1cf51bdacb49

REQUIRED_READS:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/Cosmile/AGENTS.md
- /home/leo/Project/Cosmile/CLAUDE.md
- /home/leo/Project/Cosmile/app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md
- /home/leo/Project/Cosmile/app/docs/security/ENV_AND_MIGRATION_POLICY.md
- /home/leo/Project/Cosmile/app/docs/testing/TEST_MEANING_POLICY.md
- committed Founder Decision Record, Execution Manifest, Activation Record, and reviewed design named above

ALLOWED_PRODUCT_PATHS:
- app/prisma/schema.prisma
- app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/migration.sql
- app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/down.sql
- app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py

ALLOWED_FOUNDATION_DOCS_WRITES:
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_WORKER_RESULT.md
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_WORKER_POINTER.md

GOAL:
Implement only reviewed-design §7.1 and WU8-C1 additive evidence-delivery schema,
migration, fail-closed down gate, and focused disposable-PostgreSQL evidence.

AUTHORIZED_ACTIONS:
- add exactly the nine reviewed nullable evidence-delivery columns;
- deterministic evidence-only backfill with generic rows unchanged;
- replace only FSO_evidence_row_chk with existing protections plus exact reviewed state/status/time/count/byte/category rules;
- add only the two reviewed indexes;
- enforce exact eight-state, 1..32768-byte, nonnegative count/version, timestamp, and closed failure-category rules;
- implement down migration only with zero-attempt/no-terminal-transition safety gate;
- add the one focused migration test;
- run only the new test and app/scripts/m2_ab_migration_rehearsal.dbtest.py;
- use only disposable local PostgreSQL via Unix socket or loopback, synthetic data, no image pull/external network;
- collect forward/down/forward, backfill, constraints, generic-row, zero-row-loss, and cleanup evidence using counts/categories only;
- stage only the four allowed product paths and create one local candidate commit;
- write only the two declared foundation-docs artifacts and return to Advisor.

TEST_MEANING:
The new test must protect additive compatibility, deterministic backfill,
constraint closure, generic-row preservation, zero data loss, and fail-closed
rollback. Do not weaken an existing contract or change an expectation merely to
obtain green output. Classify every failure before changing code or test.

EPHEMERAL_DB_CLEANUP_REQUIRED:
- record disposable process/container identity category and creation method;
- prove Unix-socket/loopback-only containment and synthetic-only data;
- record shutdown, data-directory/volume removal, transient credential removal,
  and post-cleanup process/container absence;
- cleanup failure means C1 cannot close and C2 cannot begin;
- never alter or delete an unrelated process, container, volume, or file.

COMMIT_PERMISSION: LOCAL_CANDIDATE_COMMIT_ONLY
PUSH_PERMISSION: NO — Advisor routes push only after independent PASS
HISTORY_REWRITE: FORBIDDEN
FORCE_PUSH: FORBIDDEN

FORBIDDEN:
- changes outside four product paths or two result paths;
- sender, consumer, delivery, endpoint, broker, timer, network, provider, credential, real auth, runtime process, or feature activation;
- shared/staging/protected/production/live DB or data;
- raw payload, identifier, user-derived hash, secret, DSN, password, PII, customer/order/payment data, env dump, or raw exception evidence;
- Foundation, SIASIU, foundation-control, or unrelated foundation-docs writes;
- new agent/sub-agent, Reviewer dispatch, self-review, risk acceptance, next WorkUnit, C2, or any excluded WorkUnit.

PRESERVE_UNTRACKED_STATUS_SHA256: 90210e452ce5bbef5ba271122b55ad1755d4dedd7fca310bd1f08f12291d0939
COMPLETION_CRITERIA:
- exactly four or fewer allowed product paths changed;
- focused migration test PASS and exact M2 A/B migration regression PASS;
- safe forward/down/forward evidence complete;
- cleanup verified;
- generic signal semantics unchanged and zero unauthorized path changed;
- candidate commit recorded but not pushed;
- result and pointer written; RETURN_TO foundation-advisor; STOP.

STOP_CONDITIONS:
base/branch/upstream/tracked-drift mismatch; incompatible non-empty row; oversized
or unknown current state; nondeterministic backfill; unsafe/destructive down;
generic-signal drift; cleanup failure; external network/image pull; real DB,
secret, credential, endpoint/provider/broker/auth requirement; unapproved path;
scope expansion; or evidence leakage.

DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
STOP_AFTER_RETURN: true
```
