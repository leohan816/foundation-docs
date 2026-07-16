# WU8 U1–U3 Founder / Security / Privacy / Architecture Gate Package

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
WORK_UNIT_ID: WU8-0
PACKAGE_TYPE: READ_ONLY_DECISION_PREPARATION
AUTHOR: foundation-advisor
CONTROL_EVIDENCE_COMMIT: 1efef80ccd957d750ed530f846ab09c09546ab72
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
DESIGN_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de

U1_STATUS: OPEN
U2_STATUS: OPEN
U3_STATUS: OPEN

THIS PACKAGE SELECTS NO OPTION, ACCEPTS NO RISK, CLOSES NO GATE, AND
AUTHORIZES NO DEPENDENT IMPLEMENTATION.
```

## 1. Decision boundary

This package turns the pinned design and reproduced repository facts into a
decision-ready set of options. An independent review PASS validates only its
accuracy, completeness, option quality, dependency mapping, authority mapping,
and path-truth discipline. PASS does not select an option or authorize WU8-F1,
F2, F3, C3, X1, delivery, intake, credentials, a durable backend, or production.

The evidence envelope's unkeyed `source_hash` proves deterministic content
consistency; it does not prove sender authenticity. The envelope's consent
snapshot proves capture-time provenance; it is never authoritative current
consent. The landed Foundation ledger is one-process and in-memory with zero
durability claim; it is not a durable WU8 backend.

## 2. U1 — Security authenticity mechanism

### Verified current facts

- Foundation at `33570b9d` has a minimized `ProvenanceVerdict` seam with
  `VERIFIED`, `UNVERIFIED`, `UNCONFIGURED`, and `ERROR`. Processing continues
  only when the status is `VERIFIED` and both `source_identity` and
  `envelope_digest` are true.
- The default provenance verifier is `UNCONFIGURED` and rejects everything.
- No pinned product repository contains an authorized commerce-evidence
  credential, signature implementation, endpoint, transport, or active ingress.
- The reviewed direction assigns workload authentication to infrastructure or
  gateway ownership. Foundation consumes an opaque, digest-bound verdict and
  must not own raw credentials.
- A valid verdict must bind the authorized `cosmile` workload, the exact
  non-production environment, the complete strict envelope projection,
  `source_hash`, `idempotency_key`, and one ingress evaluation. Missing, stale,
  ambiguous, or unavailable verification fails closed.

### Exact unresolved question

Which Security-owned authenticity mechanism and lifecycle will produce the
opaque Foundation ingress verdict while binding the exact workload,
environment, digest, idempotency key, freshness, and replay boundary?

### Options

1. **U1-A — Mutual-TLS workload identity at the gateway.** The gateway
   authenticates the client channel and binds its verified workload identity to
   the strict-envelope digest. This requires certificate issuance, custody,
   rotation, revocation, trust-store, and incident-response ownership.
2. **U1-B — Platform workload-identity attestation.** An existing platform
   identity, if independently verified to exist, attests the service principal,
   environment, strict digest, idempotency key, and freshness value. This
   avoids application-owned long-lived credentials but depends on an actual
   platform capability that is not yet verified.
3. **U1-C — Security-issued signed request token.** A Security-owned signing
   scheme binds the same fields plus a single-use freshness value. This adds
   signing-key custody, distribution, rotation, verification, and replay-state
   obligations.

### Advisor recommendation

Recommend **U1-B conditionally**, only if Security verifies that an existing
platform workload-identity facility meets every binding and incident-response
requirement. If no such facility exists, return to Security rather than silently
falling back to U1-A or U1-C. The application-facing verdict interface remains
mechanism-neutral in every option.

### Consequences

- **Implementation:** Security/infrastructure must provide the authenticated
  principal and a digest-bound, single-evaluation verdict adapter before any
  activated intake orchestration can exist. No credential belongs in Foundation
  core.
- **Security/privacy:** U1-B minimizes application credential custody, but only
  if the platform identity, environment binding, freshness, revocation, and
  incident controls are real and reviewed. Until then, `UNCONFIGURED` rejects all
  evidence.
- **Deferred:** concrete provider, gateway, endpoint, credential format,
  issuance, custody, rotation, revocation, freshness store, deployment path,
  and production threat model.

```text
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER: Security + infrastructure/gateway owner + Leo/GPT
REQUIRED_DISCOVERY: verified platform capability or alternative mechanism; credential lifecycle; freshness/replay design; threat review; incident model
DEPENDENT_WORKUNITS: WU8-F3, WU8-C3, WU8-X1 BLOCKED
FAIL_CLOSED_DEFAULT: provenance verifier UNCONFIGURED; accepted evidence 0
DECISION_AUTHORITY: Security selects/approves mechanism and lifecycle; Leo/GPT authorizes gate closure
```

Closing U1 alone unlocks no executable WorkUnit. It removes one prerequisite;
F3 and C3 still require the other reviewed gates and dependencies.

## 3. U2 — Current consent adapter

### Verified current facts

- Foundation at `33570b9d` has a closed `ConsentVerdict` seam. Processing
  continues only on `GRANTED`; every other state fails closed.
- Cosmile remains the current-consent authority. Feedback-storage consent and
  cross-service commerce-evidence consent are separate purposes; login or a
  `userId` never implies consent.
- Cosmile's current revocation path is local and append-only and enqueues no
  cross-service revocation or erasure propagation.
- The envelope snapshot cannot establish current consent after queueing.
- Verification is required at initial durable acceptance and every later
  eligibility-affecting transition. Authority unavailable, timeout, malformed,
  stale, unknown, missing, pending, or error results all fail closed.
- Retraction blocks future eligibility and replay; it is not by itself proof of
  complete legal erasure.

### Exact unresolved question

How will Foundation obtain a current, purpose-specific, time-valid consent
verdict from Cosmile at intake and every later eligible transition, and how will
revocation, expiry, correction, and erasure state propagate without treating a
cached snapshot as authority?

### Options

1. **U2-A — Synchronous current-consent pull.** A narrow Foundation adapter asks
   a Cosmile-owned authority for the closed verdict at every required
   transition. Timeouts or unavailability reject the transition.
2. **U2-B — Cosmile read-only current-consent query surface.** Foundation calls
   a dedicated, purpose-specific read surface returning the same closed verdict.
   The surface, transport, availability, and Security boundary remain to be
   selected.
3. **U2-C — Authoritative pull plus later ordered lifecycle projection.** U2-A
   or U2-B remains authoritative; a future versioned and idempotent revocation,
   expiry, and erasure signal reduces latency. The projection never becomes
   authority and is outside the current implementation scope.

### Advisor recommendation

Recommend **U2-A for the first non-production design**, with strict fail-closed
timeouts and no cache-as-authority. Treat U2-C as a separately designed future
latency improvement only after Legal defines erasure completion and privacy and
Security approve the lifecycle channel.

### Consequences

- **Implementation:** define a minimal request containing subject reference,
  purpose, notice version, capture/occurrence/decision times, and opaque ingress
  context; return only the closed verdict. Recheck on every eligible transition.
- **Privacy/security:** availability loss becomes safe denial, not permissive
  processing. The design avoids copying the consent ledger into Foundation, but
  creates an explicit dependency on the current authority.
- **Deferred:** exact adapter/transport/path, SLA, cache behavior, lifecycle
  projection, full erasure protocol, and Legal interpretation of retained
  tombstones/audit evidence.

```text
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER: privacy + Security + Legal + Cosmile consent owner + Leo/GPT
REQUIRED_DISCOVERY: adapter contract and transport; availability policy; same-call validity; revocation/expiry propagation; legal erasure semantics
DEPENDENT_WORKUNITS: WU8-F3, WU8-C3, WU8-X1 BLOCKED
FAIL_CLOSED_DEFAULT: consent verifier UNCONFIGURED; accepted evidence 0
DECISION_AUTHORITY: privacy and Security approve adapter; Legal approves erasure semantics; Leo/GPT authorizes gate closure
```

Closing U2 alone unlocks no executable WorkUnit.

## 4. U3 — Foundation durable backend

### Verified current facts

- Foundation's current commerce-evidence ledger is an in-memory, one-process
  `RLock` implementation and explicitly makes no durability claim.
- The pinned Foundation subsystem has no verified database, ORM, migration
  framework, schema directory, or durable commerce-evidence repository path.
  The observed `sqlite3` and `psycopg2` references are boundary denylists, not a
  storage implementation.
- The reviewed design defines backend-neutral durable entities, six uniqueness
  constraints, a serializable-equivalent atomic transaction, replay behavior,
  retention, cleanup, migration, and rollback requirements.
- Cosmile's Prisma/PostgreSQL stack is Cosmile-local and is not a Foundation
  architecture decision.

### Exact unresolved question

Which Foundation-owned durable backend and migration architecture can enforce
the reviewed entities, six uniqueness constraints, serializable-equivalent
transaction, multi-process/restart/crash behavior, retention, cleanup, and
rollback without inventing a repository path or technology?

### Required logical model

The selected design must support durable receipts, minimized accepted evidence,
lineage nodes and heads, tombstones, review-only draft slots, and category-only
decision audits. It must enforce unique service/source-event, service/evidence,
service/idempotency, service/purchase-lineage-head,
service/predecessor-successor, and service/root-tombstone identities. One
all-or-none serializable-equivalent transaction must resolve replay/collision,
validate lineage/tombstones, insert receipt/evidence, update lineage, reserve
draft slots, re-read the exact-true commit guard, and commit. Serialization retry
is bounded; no auth, consent, provider, or network call occurs inside it.

### Options

1. **U3-A — Server relational store with serializable isolation.** Use native
   unique/partial-unique constraints and a serializable transaction. This maps
   most directly to the reviewed invariants but introduces a new Foundation
   service, migration, backup, restore, cleanup, and operations surface.
2. **U3-B — Embedded transactional relational store.** Lower non-production
   topology cost, but it must independently prove multi-process conflict,
   locking, crash, and restart behavior; this may conflict with the required
   deployment model.
3. **U3-C — Append-only durable log plus atomic uniqueness projection.** Strong
   lineage history, but it must prove an atomic all-or-none projection and all
   six uniqueness constraints without read-then-write races. Operational and
   repair complexity is highest.

### Advisor recommendation

Recommend **U3-A as the architecture direction** because the reviewed contract
is relational and transaction-heavy. Do not select a database product, ORM,
migration tool, module path, or deployment topology until the Foundation
architecture owner verifies the existing platform constraints and supplies an
exact later WorkUnit allowlist.

### Consequences

- **Implementation:** requires a new Foundation storage decision, exact paths,
  backend-specific schema/migration design, isolation proof, cleanup mechanism,
  backup/restore boundary, and disposable forward/down rehearsal.
- **Safety/privacy:** durable minimized evidence improves restart and replay
  correctness but creates explicit retention, erasure, backup, and operational
  obligations. Rollback after data exists must be flags OFF plus forward-fix;
  destructive down is forbidden.
- **Deferred:** exact technology, ORM, schema/migration paths, hosting,
  backup/restore, deployment, retention job, production topology, and legal
  retention exceptions.

```text
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER: Foundation architecture + privacy/Legal for retention/erasure + Leo/GPT
REQUIRED_DISCOVERY: backend selection; isolation proof; exact repository allowlist; migration/rollback design; cleanup and backup/restore ownership; disposable rehearsal plan
DEPENDENT_WORKUNITS: WU8-F1, WU8-F2, WU8-F3, WU8-C3, WU8-X1 BLOCKED
FAIL_CLOSED_DEFAULT: no durable backend and all activation flags HARD_OFF; intake 0
DECISION_AUTHORITY: Foundation architecture selects/approves backend; Leo/GPT authorizes gate closure
```

Explicit U3 closure supplies the later backend-specific allowlist. U3 closure
alone does not authorize implementation; reviewed WU8-F1 and a new exact handoff
are still required before F2.

## 5. Consolidated dependency and decision table

| Gate | Advisor recommendation | Required decision owners | Blocks while OPEN | What closure alone authorizes |
|---|---|---|---|---|
| U1 | U1-B, conditional on verified platform capability | Security, infrastructure/gateway owner, Leo/GPT | F3, C3, X1 | No WorkUnit by itself |
| U2 | U2-A, synchronous fail-closed pull | Privacy, Security, Legal, Cosmile consent owner, Leo/GPT | F3, C3, X1 | No WorkUnit by itself |
| U3 | U3-A relational architecture direction; technology/path unresolved | Foundation architecture, privacy/Legal, Leo/GPT | F1, F2, F3, C3, X1 | Removes backend gate only; new reviewed handoff still required |

## 6. Decisions safely deferred

- Production provider, deployment, endpoint, gateway, credential format, and
  operations topology.
- Consent lifecycle projection and availability optimization beyond the
  authoritative fail-closed pull.
- Complete erasure semantics and adverse legal/retention exceptions.
- Candidate approval, reuse, materialization, promotion, personalization,
  ranking, or safety behavior.
- Guest/anonymous evidence exceptions.
- Full Package 1B and M3.

These items may remain deferred because every current seam defaults to
UNCONFIGURED/HARD_OFF and therefore accepts nothing, creates no durable candidate,
and changes no real-user behavior.

## 7. Exact current state

```text
U1_STATUS: OPEN
U2_STATUS: OPEN
U3_STATUS: OPEN

PACKAGE_REVIEW_PASS_MEANS: decision package is accurate and decision-ready only
PACKAGE_REVIEW_PASS_DOES_NOT_MEAN: option selected, risk accepted, gate closed, or implementation authorized

WU8_F1: NOT_AUTHORIZED
WU8_F2: NOT_AUTHORIZED
WU8_F3: NOT_AUTHORIZED
WU8_C3: NOT_AUTHORIZED
WU8_X1: NOT_AUTHORIZED
DELIVERY: NOT_AUTHORIZED
ACTIVATED_FOUNDATION_INTAKE: NOT_AUTHORIZED
FOUNDATION_DURABLE_BACKEND: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED
M3: NOT_AUTHORIZED

NEXT_REQUIRED_ACTION: independent full review of this package
AFTER_REVIEW_PASS: return decision-ready package to Leo/GPT; gates remain OPEN
HARD_STOP: ACTIVE
```

## 8. Evidence pointers

- Control evidence:
  `runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_CONTROL_RESULT.md`
  at foundation-docs commit `1efef80ccd957d750ed530f846ab09c09546ab72`.
- Corrected reviewed design:
  `runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md`
  at commit `08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b`, SHA-256
  `2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de`.
- Founder Decision Record:
  `advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/00_FOUNDER_DECISION_RECORD.md`
  at commit `691a2d065f5857f7d44d8e23588f2f760204bc47`.
- Advisor Execution Manifest:
  `advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_ADVISOR_EXECUTION_MANIFEST.md`
  at commit `006ef9108f4acba3a2302e6be91ca02c4a8c978e`.
