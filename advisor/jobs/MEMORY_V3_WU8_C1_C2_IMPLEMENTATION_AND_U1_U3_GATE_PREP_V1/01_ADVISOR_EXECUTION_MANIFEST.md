# Advisor Execution Manifest — WU8 C1/C2 + U1–U3 Gate Preparation

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
STATUS: REVIEW_REQUIRED
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
RESPONSIBLE_ADVISOR: foundation-advisor
CURRENT_PHASE: PRE_ACTIVATION_MANIFEST_REVIEW
FOUNDER_DECISION_PATH: advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/00_FOUNDER_DECISION_RECORD.md
FOUNDER_DECISION_COMMIT: 691a2d065f5857f7d44d8e23588f2f760204bc47
FOUNDER_DECISION_BLOB: a5dcf52601ce78fbfda3ce425e54714707f74ad0
FOUNDER_DECISION_SHA256: 0373798359fde9703e38857371f399816b32bb62f41647983359f5502db406cf
MAX_CORRECTION_CYCLES_PER_SUBJECT: 2
HARD_STOP_AFTER_AUTHORIZED_BATCH: REQUIRED
NEXT_WORKUNIT_AUTOSTART: FORBIDDEN
```

## 1. Authority and precedence

This Manifest translates, but does not expand, the committed Founder Decision
Record above. Current role and routing authority comes only from:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`;
- `/home/leo/Project/agent-office/docs/agent/roles/advisor.md`;
- the matching Worker, Control, and Reviewer role documents;
- `/home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md`;
- `/home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md`.

The technical source for C1 and C2 is the exact committed design:

```text
DESIGN_FILE: runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
DESIGN_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
DESIGN_DELTA_REVIEW_COMMIT: 5ea5469dec56768270fdb8c3eb8e1cf51bdacb49
DESIGN_ADVISOR_AUDIT_COMMIT: 1c661fbfce8d8065ccb2d1e6204fd727042ed345
```

A contradiction, missing authority, path expansion, or runtime-binding mismatch
requires `STOP_AND_RETURN_TO_LEO_GPT`.

## 2. Verified starting baselines

The Advisor directly verified these values before authoring this Manifest:

| Repository | Branch | HEAD | Upstream | Ahead/behind | Tracked state |
|---|---|---|---|---:|---|
| foundation-docs worktree | `advisor/foundation-team-role-alignment-20260714` | `691a2d065f5857f7d44d8e23588f2f760204bc47` | matching origin branch | `0/0` | clean after Founder record commit |
| Cosmile | `shadow/m4-cosmile-memory` | `f26fa5ced7083bb8d0af00bda2a54951923ea22f` | matching origin branch | `0/0` | tracked clean |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` | matching origin branch | `0/0` | tracked clean |
| SIASIU | `shadow/m4-siasiu-memory` | `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602` | matching origin branch | `0/0` | tracked clean |
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` | matching origin branch | `0/0` | tracked clean |

Pre-existing untracked inventory to preserve byte-for-byte and never stage:

```text
Cosmile:
app/docs/COSMILE_FOUNDATION_PARITY_CROSSCHECK_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_ALIGNMENT_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md
app/docs/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md
app/docs/COSMILE_MEMORY_INVENTORY_20260704.md
app/docs/FOUNDATION_DOCS_SYNC_POLICY.md

FOUNDATION:
docs/FOUNDATION_DOCS_SYNC_POLICY.md
설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html

SIASIU:
docs/SIASIU_COSMILE_FOUNDATION_PARITY_REPORT_20260703.md
docs/SIASIU_FOUNDATION_USER_REF_ALIGNMENT_20260703.md
docs/SIASIU_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md

foundation-control:
all pre-existing untracked paths recorded by the Advisor's preflight; Track B
must modify none of them and must report pre/post status equality.
```

Before every dispatch, recheck exact branch, HEAD, upstream, tracked drift,
untracked inventory, live actor runtime, and synchronized-panes state.

## 3. Runtime bindings and serialization

```text
COSMILE_WORKER: cosmile / @1 / %1
EXPECTED_WORKSPACE: /home/leo/Project/Cosmile
EXPECTED_MODEL_FAMILY: Opus 4.8
REQUIRED_EFFORT: high
REQUIRED_SKILL: /fable-builder
ROLE: Cosmile repository-owner Worker

CONTROL: foundation-control / @4 / %4
EXPECTED_WORKSPACE: /home/leo/Project/foundation-control
EXPECTED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: high
REQUIRED_SKILL: /fable-builder
ROLE: read-only cross-project Control

REVIEWER: foundation-reviewer-fable5 / @5 / %5
EXPECTED_WORKSPACE: /home/leo/Project/FOUNDATION
EXPECTED_MODEL_FAMILY: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
ROLE: independent read-only Reviewer
```

The Reviewer session is serialized in this order unless a stop condition
intervenes: Manifest review, C1 review/delta, C2 review/delta, Gate Package
review/delta. A single Reviewer review never overlaps another.

## 4. Durable mission paths

All foundation-docs writes are limited to the two Founder-authorized mission
roots. Every dispatch receives one unique result and pointer path.

```text
MANIFEST_REVIEW_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_EXECUTION_MANIFEST_REVIEW_RESULT.md
MANIFEST_REVIEW_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_EXECUTION_MANIFEST_REVIEW_POINTER.md
MANIFEST_DELTA_1_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/02_EXECUTION_MANIFEST_DELTA_REVIEW_RESULT.md
MANIFEST_DELTA_1_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/02_EXECUTION_MANIFEST_DELTA_REVIEW_POINTER.md
MANIFEST_DELTA_2_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/03_EXECUTION_MANIFEST_DELTA_REVIEW_RESULT.md
MANIFEST_DELTA_2_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/03_EXECUTION_MANIFEST_DELTA_REVIEW_POINTER.md

CONTROL_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_CONTROL_RESULT.md
CONTROL_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_CONTROL_POINTER.md

C1_WORKER_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_WORKER_RESULT.md
C1_WORKER_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_WORKER_POINTER.md
C1_REVIEW_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_REVIEW_RESULT.md
C1_REVIEW_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_REVIEW_POINTER.md
C1_DELTA_1_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_DELTA_REVIEW_01_RESULT.md
C1_DELTA_1_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_DELTA_REVIEW_01_POINTER.md
C1_DELTA_2_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_DELTA_REVIEW_02_RESULT.md
C1_DELTA_2_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C1_DELTA_REVIEW_02_POINTER.md

C2_WORKER_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_RESULT.md
C2_WORKER_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_POINTER.md
C2_REVIEW_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_REVIEW_RESULT.md
C2_REVIEW_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_REVIEW_POINTER.md
C2_DELTA_1_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_DELTA_REVIEW_01_RESULT.md
C2_DELTA_1_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_DELTA_REVIEW_01_POINTER.md
C2_DELTA_2_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_DELTA_REVIEW_02_RESULT.md
C2_DELTA_2_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_DELTA_REVIEW_02_POINTER.md

GATE_PACKAGE: advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/20_U1_U3_GATE_PACKAGE.md
GATE_REVIEW_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_REVIEW_RESULT.md
GATE_REVIEW_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_REVIEW_POINTER.md
GATE_DELTA_1_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_DELTA_REVIEW_01_RESULT.md
GATE_DELTA_1_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_DELTA_REVIEW_01_POINTER.md
GATE_DELTA_2_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_DELTA_REVIEW_02_RESULT.md
GATE_DELTA_2_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_DELTA_REVIEW_02_POINTER.md

FINAL_AUDIT: advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/90_ADVISOR_FINAL_AUDIT.md
FINAL_POINTER: advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/99_FINAL_POINTER.md
```

Advisor handoffs and validations use unique numbered files beneath the same
Advisor job root. Exact-path staging only; no other foundation-docs path may be
modified.

## 5. Pre-activation Manifest review

The independent Reviewer reviews this exact committed Manifest only. It checks:

- faithful translation of the Founder record and pinned design;
- exact C1/C2 path containment and dependency order;
- the C1 ephemeral-PostgreSQL exception and cleanup gate;
- Actor, model, effort, skill, workspace, independence, and review serialization;
- unique durable evidence paths;
- two-cycle correction ceiling;
- U1–U3 path-truth and open-gate semantics;
- strict exclusions and final HARD STOP.

Verdicts follow the Founder record. The Reviewer writes only the declared
Manifest review result and pointer and returns to the Advisor.

## 6. Activation and parallel schedule

No Worker or Control dispatch occurs until Manifest review PASS and the durable
Activation Record are committed, pushed, and re-read. After activation:

1. Dispatch C1 to the Cosmile Worker.
2. In parallel, dispatch read-only U1–U3 analysis to Control.
3. When C1 returns, validate its candidate HEAD and evidence, then serialize the
   C1 independent review.
4. Route at most two bounded same-Worker/same-Reviewer correction cycles.
5. Push only the final independently reviewed C1 PASS HEAD and verify upstream
   equality.
6. Pin that exact C1 PASS HEAD as C2's only starting base; reject any intervening
   tracked drift or unreviewed commit.
7. Dispatch C2, validate its candidate, and serialize its independent review and
   at most two correction cycles.
8. Integrate the Control evidence into the Advisor-authored Gate Package without
   inventing any path, owner, mechanism, technology, or approval.
9. After Track A reviews, serialize the Gate Package full review and any bounded
   delta-only re-review.
10. Complete containment verification, Advisor final audit, final pointer, push,
    HARD STOP, and one consolidated return to Leo/GPT.

## 7. WU8-C1 exact Worker envelope

```text
ACTOR: cosmile
REPOSITORY: /home/leo/Project/Cosmile
BRANCH: shadow/m4-cosmile-memory
REQUIRED_BASE: f26fa5ced7083bb8d0af00bda2a54951923ea22f
REQUIRED_SKILL: /fable-builder
REQUIRED_EFFORT: high
COMMIT_PERMISSION: local candidate commits allowed
PUSH_PERMISSION: final independently reviewed PASS HEAD only
```

Allowed product paths only:

```text
app/prisma/schema.prisma
app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/migration.sql
app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/down.sql
app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py
```

The Worker must read the Founder record, this Manifest, the exact pinned design,
Cosmile `AGENTS.md` and `CLAUDE.md`, Agent Office Worker role/run/result rules,
Cosmile security/migration/test-meaning policies, and the exact C1 handoff.

C1 implements only design §7.1 and WU8-C1:

- add the nine nullable evidence-only delivery columns to
  `FoundationSignalOutbox`; generic non-evidence rows remain null;
- evidence rows deterministically backfill to `blocked`, `contained`,
  `acknowledged`, or `dead_lettered` exactly as §7.1 states;
- replace only `FSO_evidence_row_chk` with existing minimization/retention rules
  plus the exact state/status/time/count/byte/failure-category constraints;
- add only the two reviewed evidence delivery indexes;
- enforce `1..32768` byte length, nonnegative counts/versions, exact eight-state
  closure, and exact delivery-only failure categories;
- make down migration fail closed unless every evidence row is
  `contained|blocked`, attempt count is zero, and no acknowledgement/rejection/
  dead-letter transition occurred;
- down drops only these additive columns/indexes/checks and never deletes or
  rewrites an outbox row;
- keep every delivery/activation flag OFF; add no sender, consumer, endpoint,
  timer, network, provider, credential, or runtime process.

Tests are restricted to:

```text
NEW_FOCUSED_TEST: app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py
EXISTING_M2_AB_REGRESSION: app/scripts/m2_ab_migration_rehearsal.dbtest.py
```

The Worker may use only an isolated disposable PostgreSQL process or an
already-local image/container, Unix socket or loopback only, synthetic data only,
with no image pull or external network. It must perform forward/down/forward,
schema and constraint probes, deterministic backfill, generic-row preservation,
zero-row-loss, fail-closed down-gate, and report only bounded counts/categories.
It must not print a DSN, password, payload, identifier, raw hash, environment, or
exception containing sensitive values.

Cleanup evidence is mandatory: process/container identity category, creation
method, loopback/socket containment, synthetic-only status, shutdown status,
volume/data-directory removal status, transient credential removal status, and
post-cleanup absence. Cleanup failure blocks C1 PASS and C2.

The Worker stages only the four allowed paths, inspects cached diff, creates a
candidate commit without amend/rebase/squash/force-push, writes the declared
C1 result/pointer, and returns to Advisor. It does not push the candidate before
review unless the final PASS is already established by the independent Reviewer.

## 8. WU8-C1 independent review

The Reviewer reviews one exact C1 candidate HEAD against base `f26fa5c...` and
the four paths. It directly checks the migration, schema, new test, exact existing
M2 A/B regression, forward/down/forward evidence, cleanup evidence, generic-row
preservation, zero data loss, no secret/identifier leakage, no external network,
and absence of any out-of-scope path or runtime behavior.

`NEEDS_PATCH` returns only to the same Worker and the same Reviewer reviews only
the exact old-reviewed-HEAD to new-candidate-HEAD delta. A third NEEDS_PATCH,
PASS_WITH_RISK, FAIL, or correction outside four paths stops the mission.

## 9. WU8-C2 base gate and Worker envelope

C2 starts only after C1 independent PASS, final C1 push, upstream equality, and
proof that no tracked commit or path drift occurred after the reviewed C1 HEAD.

```text
ACTOR: cosmile
REPOSITORY: /home/leo/Project/Cosmile
BRANCH: shadow/m4-cosmile-memory
REQUIRED_BASE: exact final C1 independently reviewed PASS HEAD
REQUIRED_SKILL: /fable-builder
REQUIRED_EFFORT: high
COMMIT_PERMISSION: local candidate commits allowed
PUSH_PERMISSION: final independently reviewed PASS HEAD only
```

Allowed product paths only:

```text
app/src/types/commerceEvidenceDelivery.ts
app/src/lib/commerceEvidenceDeliveryState.ts
app/scripts/wu8_commerce_evidence_delivery_contract.vitest.ts
app/scripts/wu8_commerce_evidence_delivery_property.vitest.ts
```

C2 implements only pure contracts and deterministic transitions from design
§3.4, §4, §12.1, and WU8-C2:

- exact `foundation.commerce_evidence_delivery_ack.v1` acknowledgement type and
  its five valid outcome/reason/disposition combinations;
- exact eight delivery states, valid transitions, terminal states, generic
  status mapping, and fail-closed unknown/malformed handling;
- fixed constants: depth 1,000, bytes 32,768, batch 20, global in-flight 4,
  per-root in-flight 1, rate/burst 10/20, lease 30 seconds, attempts 5, and
  injected deterministic retry/jitter schedule;
- pure root-ordering, lease/CAS, retry, replay, correction/retraction,
  acknowledgement, poison, backpressure, and category-only dead-letter logic;
- no sender, I/O, DB, timer, scheduler, endpoint, route, provider, broker,
  credential, network, process launcher, activation, or schema change.

Tests are restricted to the two new C2 files plus verified existing relevant
M2 A/B and no-transport regressions. The C2 handoff must list the exact commands
after the Worker/Advisor confirms the current scripts. Tests must cover strict
serialization, closed acknowledgement matrix, every valid and invalid transition,
unknown fail-closed behavior, limits, root ordering, lease expiry/CAS, deterministic
retry/jitter, replay/collision, correction/retraction, poison/oversize,
backpressure, and zero transport.

The Worker stages only the four C2 paths, commits without history rewriting,
writes the declared result/pointer, returns to Advisor, and does not self-review
or start another WorkUnit.

## 10. WU8-C2 independent review

The same independent Reviewer session reviews one exact C2 candidate HEAD. It
verifies the base equals the final reviewed C1 PASS HEAD, path containment,
frozen semantics, exact tests, regressions, no-transport scan, zero I/O/DB/
network/timer/endpoint/provider/credential behavior, and no excluded authority.
Correction and verdict rules are identical to C1.

## 11. Track B — Control and Gate Package

Control is read-only across FOUNDATION, Cosmile, SIASIU, foundation-control, and
the pinned design/current evidence. It writes only its declared foundation-docs
result and pointer. It must not modify or stage any product/control repository,
select an option, close a gate, accept risk, invent a path, or dispatch another
actor.

The Control result supplies verified facts and at most three decision-ready
options for:

- U1 authenticity: infrastructure/gateway ownership, principal, environment,
  digest/source-hash and idempotency binding, freshness/replay, custody,
  rotation, revocation, incident/failure implications, Security/Founder owners,
  exact blocked/unlocked WorkUnits, fail-closed default;
- U2 current consent: Cosmile authority, adapter/transport options, request and
  closed verdict, unavailable/stale/unknown/mismatch/revoked/expired/erasure
  behavior, intake and every-transition verification, snapshot non-authority,
  privacy/Security/Legal/Founder owners, blocked/unlocked WorkUnits, fail-closed;
- U3 Foundation durable backend: verified architecture, at most three grounded
  backend options, receipt/evidence/lineage/tombstone/draft-slot/category-audit
  entities, transaction boundary, six uniqueness constraints, multi-process/
  restart/crash/replay/retention/cleanup/migration/rollback, tradeoffs,
  architecture/Founder owners, blocked/unlocked WorkUnits, fail-closed.

Unverified facts use exactly:

```text
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER:
REQUIRED_DISCOVERY:
DEPENDENT_WORKUNITS: BLOCKED
```

The Advisor integrates the Control evidence into the Gate Package, preserves
U1/U2/U3 as OPEN, and does not turn package review PASS into gate closure or
implementation authority.

## 12. Gate Package independent review

The Reviewer checks factual accuracy, completeness, option quality, dependency
and authority accuracy, path truth, decision readiness, and absence of policy
selection or risk acceptance. PASS means only `REVIEWED_DECISION_READY`.
Correction/verdict limits follow Section 9 of the Founder record.

## 13. Strict exclusions and evidence ceiling

No WU8-F1/F2/F3/C3/X1, Foundation or SIASIU product modification,
foundation-control repository modification, sender, consumer, delivery,
endpoint, broker, external network other than authorized Git push/C1 loopback,
activated intake, Foundation durable backend/schema/migration, real auth or
credential, current MemoryCandidate, SharedMemoryStore bridge, approval, reuse,
promotion, personalization, ranking, safety mutation, adverse enablement,
guest/anonymous exception, production/live, Full Package 1B, or M3.

Evidence contains booleans, counts, categories, file paths, and Git object IDs
only. It must not contain raw payloads, identifiers, hashes derived from user
data, credentials, environment dumps, PII, customer/order/payment data, or raw
exceptions that could expose them.

## 14. Completion and final audit

The Advisor closes only after independent PASS for Manifest, C1, C2, and Gate
Package; final reviewed C1/C2 heads pushed and upstream-equal; all foundation-
docs mission artifacts pushed; C2 base exactly equals C1 PASS; pre-existing
untracked paths untouched; FOUNDATION/SIASIU/foundation-control branches and
HEADs unchanged; Cosmile changes limited to the eight authorized paths; no
strict exclusion used; U1/U2/U3 OPEN; and HARD STOP active.

The final audit and pointer return one consolidated result to Leo/GPT. No later
WorkUnit begins automatically.

```text
WU8_C1: REVIEWED_PASS | STOPPED_WITH_BLOCKER
WU8_C2: REVIEWED_PASS | NOT_STARTED_DUE_TO_C1 | STOPPED_WITH_BLOCKER
U1_U3_GATE_PACKAGE: REVIEWED_DECISION_READY | STOPPED_WITH_BLOCKER
U1_STATUS: OPEN
U2_STATUS: OPEN
U3_STATUS: OPEN
WU8_F1_F2_F3_C3_X1: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED
M3: NOT_AUTHORIZED
HARD_STOP: ACTIVE
NEXT_ACTOR: Leo/GPT
STOP
```
