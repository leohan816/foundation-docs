# Handoff — WU8-C1 Independent Implementation Review

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-C1-IMPLEMENTATION-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW: @5
TARGET_PANE: %5
ROLE: Independent Reviewer
REVIEW_PASS: FULL_IMPLEMENTATION_REVIEW
EXPECTED_MODEL_FAMILY: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
EXPECTED_WORKSPACE: /home/leo/Project/FOUNDATION
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

SUBJECT_REPOSITORY: /home/leo/Project/Cosmile
SUBJECT_BRANCH: shadow/m4-cosmile-memory
SUBJECT_BASE: f26fa5ced7083bb8d0af00bda2a54951923ea22f
SUBJECT_HEAD: ad172db403065fc8e498a1e80cdd347034ea7c48
EXPECTED_PARENT: f26fa5ced7083bb8d0af00bda2a54951923ea22f
SUBJECT_PUSHED: NO
SUBJECT_PATHS:
- app/prisma/schema.prisma
- app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/migration.sql
- app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/down.sql
- app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py

WORKER_RESULT: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_WORKER_RESULT.md
WORKER_EVIDENCE_COMMIT: b1e80b31ad726c8cb1359a73c5e2347e38b5b844
ADVISOR_VALIDATION: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/12_ADVISOR_C1_VALIDATION.md
DESIGN_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
DESIGN_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
FOUNDER_DECISION_COMMIT: 691a2d065f5857f7d44d8e23588f2f760204bc47
EXECUTION_MANIFEST_COMMIT: 006ef9108f4acba3a2302e6be91ca02c4a8c978e

CURRENT_ROLE_AUTHORITY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/reviewer.md
- /home/leo/Project/Cosmile/AGENTS.md
- /home/leo/Project/Cosmile/CLAUDE.md

REVIEW_CRITERIA:
- exact base, parent, branch, four-path containment, and no unrelated tracked drift;
- faithful implementation of corrected reviewed design sections 3.4, 4.1, and 7.1;
- nine additive nullable evidence-only columns and exact two indexes;
- deterministic evidence-only backfill, bounded bytes, closed state/failure categories, conditional timestamps, generic status mapping, and preserved M2 minimization/retention constraints;
- non-evidence rows keep all nine columns NULL and generic signal semantics remain unchanged;
- fail-closed forward preflight and non-destructive down gate; zero row deletion or fabrication;
- focused forward/down/forward test reproduced in a new disposable local PostgreSQL environment;
- cleanup independently verified: no container, volume/data, transient credential, host port, or unrelated resource remains;
- assess the honest existing `m2_ab_migration_rehearsal.dbtest.py` SKIP_INFRA. Do not relabel it PASS. Decide whether in-scope focused coverage is sufficient or return a precise blocking finding;
- no raw payload, identifier, secret, credential, DSN, PII, or exception detail in evidence;
- no sender, consumer, transport, endpoint, broker, network, provider, flag activation, shared DB, production DB, or next WorkUnit.

AUTHORIZED_REVIEW_TEST:
- cd /home/leo/Project/Cosmile/app && python3 scripts/wu8_commerce_evidence_delivery_migration.dbtest.py
- cd /home/leo/Project/Cosmile/app && python3 scripts/m2_ab_migration_rehearsal.dbtest.py
- cd /home/leo/Project/Cosmile/app && DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder npx prisma validate

C1_EPHEMERAL_TEST_EXCEPTION:
- only an already-local postgres:16-alpine image; no pull;
- disposable process/container, tmpfs or other ephemeral data only;
- no published port; Unix socket or loopback-only;
- synthetic data and transient synthetic test credential only;
- remove the exact created resource and verify absence;
- do not alter or delete any unrelated process, container, volume, or file.

WRITE_SCOPE:
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_REVIEW_RESULT.md
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_REVIEW_POINTER.md

FORBIDDEN:
- patching, staging, committing, pushing, amending, rebasing, squashing, or force-pushing subject files;
- modifying any product/control repository or Worker/Advisor result;
- accepting risk, broadening scope, dispatching another actor, or beginning C2;
- external network, image pull, shared/real/staging/protected/production/live DB, real secret, credential, endpoint, provider, broker, delivery, or activation;
- new agent, sub-agent, substitute Reviewer, or overlapping review.

VERDICTS: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL
CORRECTION_LIMIT: maximum 2 bounded same-Worker cycles
DELTA_RULE: same Reviewer reviews only the declared old-reviewed-HEAD to new-candidate-HEAD delta
STOP_AFTER_RETURN: true
```

Read all referenced files and inspect the exact pinned candidate. Apply
`/fable-sentinel`. Do not trust Worker prose. Write only the declared review
result/pointer, return to `foundation-advisor`, and STOP.
