RECORD_ID:
MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1

RECORD_TYPE:
FOUNDER_DECISION_RECORD

CURRENT_PHASE:
REVIEW_ONLY

ACTIVATION_PHRASE_REQUIRED:
APPROVE_SAVE_AND_EXECUTE_THIS_EXACT_REVIEWED_AUTHORITY


======================================================================
1. CANONICAL RECORD IDENTITY
======================================================================

Only the UTF-8 content strictly between:

BEGIN_FOUNDER_DECISION_RECORD

and:

END_FOUNDER_DECISION_RECORD

is the canonical Founder Decision Record.

The BEGIN and END marker lines are excluded from the saved file.

EXACT_FOUNDER_DECISION_PATH:
advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/00_FOUNDER_DECISION_RECORD.md

EXACT_EXECUTION_MANIFEST_PATH:
advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_ADVISOR_EXECUTION_MANIFEST.md

EXACT_MANIFEST_REVIEW_PATH:
runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_EXECUTION_MANIFEST_REVIEW_RESULT.md

EXACT_MANIFEST_DELTA_REVIEW_PATH:
runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/02_EXECUTION_MANIFEST_DELTA_REVIEW_RESULT.md

EXACT_ACTIVATION_RECORD_PATH:
advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/02_ACTIVATION_RECORD.md

The Founder Decision Record records Leo/GPT's decision.

The Advisor Execution Manifest translates that decision into operational
instructions but cannot add authority.

The Activation Record proves activation but cannot expand either the
Founder Decision Record or the independently reviewed Manifest.


======================================================================
2. FOUNDER DECISION
======================================================================

After this complete record receives Advisor review PASS and Leo/GPT sends
the exact activation phrase, the following unattended bounded batch is
approved:

1. WU8-C1:
   Cosmile delivery-schema implementation and independent review.

2. WU8-C2:
   Pure Cosmile delivery-contract and state-machine implementation and
   independent review, beginning only from the exact final independently
   reviewed WU8-C1 PASS HEAD.

3. WU8-0:
   Read-only U1-U3 decision-ready Gate Package preparation and independent
   review, proceeding in parallel where safe.

4. Bounded correction and delta-review loops defined in this record.

5. Unattended continuation through:

   Founder Decision Record durability
   -> Advisor Execution Manifest
   -> independent Manifest review PASS
   -> durable Activation Record
   -> C1
   -> C1 independent PASS
   -> exact C1 PASS HEAD verification
   -> C2
   + U1-U3 Gate Package
   -> independent reviews
   -> Advisor final audit
   -> HARD STOP
   -> one consolidated report to Leo/GPT.

No routine intermediate Leo/GPT approval is required within this exact scope.

No later WorkUnit may begin automatically.


======================================================================
3. REVIEWED DESIGN BASIS
======================================================================

CORRECTED_WU8_DESIGN_FILE:
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md

CORRECTED_WU8_DESIGN_COMMIT:
08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b

CORRECTED_WU8_DESIGN_SHA256:
2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de

INDEPENDENT_DELTA_REVIEW_COMMIT:
5ea5469dec56768270fdb8c3eb8e1cf51bdacb49

ADVISOR_FINAL_DESIGN_AUDIT_COMMIT:
1c661fbfce8d8065ccb2d1e6204fd727042ed345

The corrected independently reviewed design controls the exact technical
semantics, paths, dependencies, invariants, tests, rollback rules, and
stop conditions for WU8-C1 and WU8-C2.

Reference to that design does not authorize any other WorkUnit.


======================================================================
4. FOUNDATION-DOCS BASELINE AND WRITE SCOPE
======================================================================

FOUNDATION_DOCS_REPOSITORY:
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714

FOUNDATION_DOCS_BRANCH:
advisor/foundation-team-role-alignment-20260714

EXPECTED_FOUNDATION_DOCS_BASE_HEAD:
878ce4b4d36274e0418c97840bf922f5651d4c82

Before saving anything after activation, verify and record:

- exact repository;
- exact branch;
- exact starting HEAD;
- upstream-equal state;
- staged files;
- unstaged tracked files;
- untracked files;
- unrelated-dirt inventory;
- absence of unrelated tracked drift.

Pre-existing unrelated files must remain untouched.

Authorized foundation-docs write roots only:

advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/**

runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/**

These roots may contain only:

- Founder Decision Record;
- Advisor Execution Manifest;
- Manifest full and delta-review results;
- Activation Record;
- Advisor handoffs and validations;
- Control read-only result and pointer;
- Worker results and pointers;
- Reviewer results and pointers;
- correction handoffs;
- U1-U3 Gate Package;
- bounded document corrections;
- Advisor final audit;
- final pointer.

Every dispatch must declare exact result and pointer paths.

Only exact mission paths may be staged and committed.

Any baseline mismatch or unrelated tracked drift requires:

STOP_AND_RETURN_TO_LEO_GPT.


======================================================================
5. PRODUCT AND CONTROL REPOSITORY PREFLIGHT
======================================================================

COSMILE_REPOSITORY:
/home/leo/Project/Cosmile

COSMILE_BRANCH:
shadow/m4-cosmile-memory

EXPECTED_COSMILE_BASE_HEAD:
f26fa5ced7083bb8d0af00bda2a54951923ea22f


FOUNDATION_REPOSITORY:
/home/leo/Project/FOUNDATION

FOUNDATION_BRANCH:
shadow/foundation-shared-memory-v0

EXPECTED_FOUNDATION_HEAD:
33570b9d7db79c991bb216b6a2dc80880ba1f2d6


SIASIU_REPOSITORY:
/home/leo/Project/SIASIU

SIASIU_BRANCH:
shadow/m4-siasiu-memory

EXPECTED_SIASIU_HEAD:
e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602


FOUNDATION_CONTROL_REPOSITORY:
/home/leo/Project/foundation-control

FOUNDATION_CONTROL_BRANCH:
shadow/m5-ingress-gate

EXPECTED_FOUNDATION_CONTROL_HEAD:
c89b792bed177aad9322e09debecc76caab0c8a0


Before the first Actor dispatch, verify and record for every repository:

- exact repository path;
- exact branch;
- exact pinned HEAD;
- upstream relationship;
- upstream-equal state;
- staged files;
- unstaged tracked files;
- untracked-file inventory;
- absence of unrelated tracked drift.

Pre-existing untracked files must remain untouched.

FOUNDATION, SIASIU, and foundation-control must remain at their exact pinned
branches and HEADs throughout the mission.

Cosmile may change only through the exact authorized C1 and C2 paths and
reviewed commit sequence.

Any unexplained mismatch or drift requires:

STOP_AND_RETURN_TO_LEO_GPT.


======================================================================
6. DOCUMENT CHAIN AND DURABLE ACTIVATION
======================================================================

After Advisor review PASS and receipt of the exact activation phrase:

A. FOUNDER DECISION RECORD

Save the canonical content at EXACT_FOUNDER_DECISION_PATH.

Commit, push, re-read, and record:

- path;
- commit;
- blob;
- SHA-256;
- UTF-8 validity;
- push status;
- upstream status.

The Advisor records but must not rewrite, expand, or replace the Founder
decision.


B. ADVISOR EXECUTION MANIFEST

The Advisor authors the separate Manifest at
EXACT_EXECUTION_MANIFEST_PATH.

It must translate this decision and the corrected reviewed design into exact
operational instructions without adding authority.


C. MANIFEST REVIEW

The pinned independent Reviewer reviews the exact Manifest commit.

PASS:
continue.

NEEDS_PATCH:
the Advisor corrects only the named foundation-docs findings and the same
Reviewer performs delta-only re-review.

PASS_WITH_RISK or FAIL:
STOP_AND_RETURN_TO_LEO_GPT.

No risk may be accepted automatically.


D. ACTIVATION RECORD

Only after Manifest independent PASS, create the Activation Record at
EXACT_ACTIVATION_RECORD_PATH.

It must contain:

APPROVAL_PHRASE:
APPROVE_SAVE_AND_EXECUTE_THIS_EXACT_REVIEWED_AUTHORITY

APPROVAL_TIMESTAMP:

FOUNDER_DECISION_COMMIT:

FOUNDER_DECISION_BLOB:

FOUNDER_DECISION_SHA256:

EXECUTION_MANIFEST_COMMIT:

EXECUTION_MANIFEST_BLOB:

EXECUTION_MANIFEST_SHA256:

MANIFEST_REVIEW_COMMIT:

APPROVAL_RECEIVED:
YES

DELEGATED_ACTIVATION_ALLOWED:
YES

SCOPE_EXPANSION_ALLOWED:
NO

Commit, push, re-read, and verify the Activation Record before dispatching
Control or Worker.

The Activation Record proves activation only and cannot expand scope.


======================================================================
7. EXACT C1 AND C2 PRODUCT SCOPE
======================================================================

WU8-C1 exact product paths:

- app/prisma/schema.prisma
- app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/migration.sql
- app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/down.sql
- app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py

WU8-C2 exact product paths:

- app/src/types/commerceEvidenceDelivery.ts
- app/src/lib/commerceEvidenceDeliveryState.ts
- app/scripts/wu8_commerce_evidence_delivery_contract.vitest.ts
- app/scripts/wu8_commerce_evidence_delivery_property.vitest.ts

The Manifest must preserve the exact C1 and C2 actions, dependencies, tests,
rollback rules, and stop conditions from the corrected reviewed design.

No additional product path or behavior is authorized.

WU8-C2 may begin only from the exact final independently reviewed WU8-C1
PASS HEAD.

Before C2 dispatch, verify and record:

- exact branch;
- exact C1 PASS HEAD;
- review bound to that exact HEAD;
- pushed and upstream-equal state;
- no intervening tracked drift;
- no unreviewed commit after the C1 PASS HEAD.


======================================================================
8. RUNTIME BINDINGS
======================================================================

COSMILE_WORKER_ACTOR:
cosmile

COSMILE_WORKER_EXPECTED_MODEL_FAMILY:
Opus 4.8

COSMILE_WORKER_REQUIRED_SKILL:
/fable-builder

COSMILE_WORKER_EFFORT:
high


CONTROL_ACTOR:
foundation-control

CONTROL_EXPECTED_MODEL:
Opus 4.8 (1M)

CONTROL_REQUIRED_SKILL:
/fable-builder

CONTROL_EFFORT:
high

CONTROL_MODE:
READ_ONLY_CROSS_PROJECT_ANALYSIS


INDEPENDENT_REVIEWER:
foundation-reviewer-fable5

REVIEWER_EXPECTED_MODEL_FAMILY:
Fable 5

REVIEWER_REQUIRED_SKILL:
/fable-sentinel

REVIEWER_EFFORT:
max


Immediately before every Actor dispatch, verify and record:

- actor ID;
- tmux session;
- window;
- pane;
- actual live model;
- expected-model match;
- effort;
- workspace;
- role;
- required skill;
- current Agent Office authority;
- idle/readiness state;
- synchronize-panes OFF;
- absence of conflicting active work.

Current role authority must come from agent-office/docs/agent, not historical
foundation-docs role material.

Any runtime-binding mismatch requires:

STOP_AND_RETURN_TO_LEO_GPT.

All reviews using the Reviewer session must be serialized.

No overlapping Reviewer dispatch is permitted.


======================================================================
9. CORRECTION-LOOP BOUNDS
======================================================================

MAX_CORRECTION_CYCLES_PER_SUBJECT:
2

This limit applies independently to:

- Advisor Execution Manifest;
- WU8-C1;
- WU8-C2;
- U1-U3 Gate Package.

One correction cycle means:

NEEDS_PATCH
-> bounded correction by the authorized author or same Worker
-> same-Reviewer delta-only re-review.

A second NEEDS_PATCH may receive one final bounded correction and
delta-only re-review.

A third NEEDS_PATCH, or any correction requiring scope expansion, requires:

STOP_AND_RETURN_TO_LEO_GPT.

No amend, rebase, squash, force-push, or reviewed-history rewrite is allowed.

PASS_WITH_RISK or FAIL at any full review or delta review requires:

STOP_AND_RETURN_TO_LEO_GPT.


======================================================================
10. C1 EPHEMERAL POSTGRESQL AND CLEANUP
======================================================================

Only for the authorized C1 migration test:

- an isolated disposable PostgreSQL process or already-local container may
  be started;
- Unix-socket or loopback-only access is allowed;
- external network and image pulls are forbidden;
- only synthetic test data may be used;
- synthetic test-only credentials may exist transiently in memory;
- credentials must not be committed, persisted, reused, or printed;
- no product or runtime process launcher is authorized;
- no shared, staging, protected, production, or live DB is authorized;
- no unrelated process, container, volume, or file may be altered or removed.

Cleanup evidence is mandatory and must record:

- disposable PostgreSQL process or container identity;
- creation method;
- loopback or Unix-socket containment;
- synthetic-data-only confirmation;
- shutdown result;
- data-volume removal result;
- transient credential removal result;
- post-cleanup process or container check.

Cleanup must be verified before C1 can close PASS.

If cleanup cannot be verified:

- C1 must not close;
- C2 must not begin;
- no unrelated resource may be deleted or altered;
- mission status becomes STOPPED_WITH_BLOCKER;
- STOP_AND_RETURN_TO_LEO_GPT.


======================================================================
11. U1-U3 GATE PACKAGE REQUIREMENTS
======================================================================

The Gate Package is read-only decision preparation.

It must not select an option, close a gate, accept risk, or authorize
dependent implementation.


U1 - AUTHENTICITY

The package must include:

- verified current authenticity facts;
- infrastructure or gateway ownership;
- no more than three Security-reviewable mechanism options;
- workload or service principal requirements;
- environment binding;
- digest or source-hash binding;
- idempotency-key binding;
- freshness and replay boundaries;
- custody, rotation, revocation, incident, and failure implications;
- Security and Founder decision owners;
- exact WorkUnits unlocked by explicit U1 closure;
- exact WorkUnits blocked while U1 remains open;
- fail-closed default.


U2 - CURRENT CONSENT

The package must include:

- verified current consent facts;
- Cosmile as authoritative current-consent owner;
- no more than three adapter or transport options;
- request and closed-verdict contract;
- unavailable, stale, unknown, mismatch, revoked, expired, and
  erasure-related behavior;
- intake-time verification;
- verification at every later eligible transition;
- explicit statement that the envelope snapshot is never current authority;
- privacy, Security, Legal, and Founder decision owners;
- exact WorkUnits unlocked by explicit U2 closure;
- exact WorkUnits blocked while U2 remains open;
- fail-closed default.


U3 - FOUNDATION DURABLE BACKEND

The package must include:

- verified current Foundation architecture facts;
- no more than three architecture-grounded backend options;
- receipt, accepted-evidence, lineage-head, tombstone,
  review-only draft-slot, and category-only audit requirements;
- exact transaction-boundary requirements;
- the six reviewed uniqueness requirements;
- multi-process, restart, crash, replay, retention, cleanup,
  migration, and rollback requirements;
- technology and operational tradeoffs;
- Foundation architecture and Founder decision owners;
- proposed paths only when independently verified;
- exact WorkUnits unlocked by explicit U3 closure;
- exact WorkUnits blocked while U3 remains open;
- fail-closed default.


PATH TRUTH:

Do not invent paths, owners, technologies, protocols, providers,
or mechanisms.

Where an exact item is not verified, record:

PATH_STATUS:
UNRESOLVED

REQUIRED_OWNER:

REQUIRED_DISCOVERY:

DEPENDENT_WORKUNITS:
BLOCKED


TRACK B REVIEW LOOP:

- Control returns read-only evidence;
- Advisor authors the integrated Gate Package;
- Reviewer performs full independent review;
- NEEDS_PATCH follows the bounded correction rules in Section 9;
- PASS is required for REVIEWED_DECISION_READY;
- PASS_WITH_RISK or FAIL requires STOP_AND_RETURN_TO_LEO_GPT.

Gate Package PASS validates package quality only.

U1, U2, and U3 remain OPEN.


======================================================================
12. STRICT EXCLUSIONS
======================================================================

NOT AUTHORIZED:

- WU8-F1;
- WU8-F2;
- WU8-F3;
- WU8-C3;
- WU8-X1;
- Foundation product modification;
- SIASIU product modification;
- foundation-control repository modification;
- sender;
- consumer;
- actual delivery;
- endpoint;
- broker;
- external network except existing Git pushes and C1 loopback testing;
- activated Foundation intake;
- Foundation durable backend;
- Foundation schema or migration;
- real authentication mechanism or credential;
- current MemoryCandidate;
- SharedMemoryStore bridge;
- approval, reuse, promotion, personalization, ranking, or safety mutation;
- adverse-policy enablement;
- guest or anonymous exception;
- production or live activation;
- Full Package 1B;
- M3.


======================================================================
13. EARLY STOP AND FINAL RETURN
======================================================================

Return early for any of the following:

- canonical record save or committed-artifact validation failure;
- foundation-docs preflight mismatch;
- product or control repository preflight mismatch;
- runtime-binding mismatch;
- cleanup failure;
- Manifest full or delta review PASS_WITH_RISK or FAIL;
- C1 full or delta review PASS_WITH_RISK or FAIL;
- C2 full or delta review PASS_WITH_RISK or FAIL;
- Gate Package full or delta review PASS_WITH_RISK or FAIL;
- correction-cycle limit exceeded;
- unapproved path or WorkUnit required;
- blocking finding cannot be corrected within the approved scope;
- strict exclusion would need to be crossed;
- reviewed-design contradiction.

Otherwise return once after:

- Founder Decision Record committed and verified;
- Execution Manifest independently reviewed PASS;
- Activation Record committed and verified;
- C1 independently reviewed PASS;
- C1 final PASS HEAD pushed and verified;
- C2 independently reviewed PASS from the exact C1 PASS HEAD;
- C2 final PASS HEAD pushed and verified;
- U1-U3 Gate Package reviewed decision-ready;
- Advisor final audit complete;
- HARD STOP active.

U1_STATUS:
OPEN

U2_STATUS:
OPEN

U3_STATUS:
OPEN

No later WorkUnit may begin automatically.

NEXT_ACTOR:
Leo/GPT

STOP
