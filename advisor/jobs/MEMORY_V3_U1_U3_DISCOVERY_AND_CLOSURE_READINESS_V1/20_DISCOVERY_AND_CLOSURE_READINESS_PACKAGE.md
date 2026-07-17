# U1–U3 Discovery and Closure-Readiness Package

```text
MISSION_ID: MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1
PACKAGE_TYPE: READ_ONLY_DISCOVERY_AND_CLOSURE_READINESS
AUTHOR: foundation-advisor
CONTROL_EVIDENCE_COMMIT: b00103b38cb837b523a22d1f41b771281e8b0226
CONTROL_EVIDENCE_BLOB: 4dd707167b1b176800945c267a368822196ad65b
CONTROL_EVIDENCE_SHA256: b04c5c2829d5fa6ca90be23361c38d5652a5be48544f2ffaba27269e2427a232
SOURCE_GATE_PACKAGE_COMMIT: 1eb7f884bbe2ebc86db6d06d36831607bc815100
SOURCE_FINAL_AUDIT_COMMIT: 8859574b28086ea8ce56b58ec10650de8839128a

U1_STATUS: OPEN
U2_STATUS: OPEN
U3_STATUS: OPEN

THIS PACKAGE PREPARES CLOSURE REQUESTS ONLY. CLOSURE_READY IS ADVISORY.
IT SELECTS NO OPTION, ACCEPTS NO RISK, CLOSES NO GATE, AND AUTHORIZES NO IMPLEMENTATION.
```

## 1. Executive decision summary

| Gate | Current evidence result | Closure ready | Advisor direction | Required closure authority |
|---|---|---:|---|---|
| U1 authenticity | No qualifying workload-identity/gateway capability is verified; U1-B's precondition is absent | NO | Do not select U1-B. Security and infrastructure must decide/provision U1-A or U1-C, or later prove a real U1-B platform facility | Founder + Security + infrastructure/gateway owner |
| U2 current consent | Exact synchronous fail-closed U2-A contract is specifiable from landed seams and Cosmile's append-only authority; transport and legal erasure remain unresolved | NO (contract-ready YES) | Present U2-A for owner approval; no cache-as-authority; every non-GRANTED/unavailable state fails closed | Founder + privacy + Security + Legal + Cosmile consent owner |
| U3 durable backend | Foundation has no verified DB, ORM, migration tool, packaging/deployment foundation, or durable-store path | NO | Preserve relational U3-A as a direction only; architecture must first select and evidence a concrete storage foundation | Founder + Foundation architecture/storage + privacy/Legal |

No Designer contradiction was found. No Worker was authorized or used. Product and control
repositories remained read-only at their pinned heads.

## 2. U1 — authenticity discovery

### VERIFIED_FACTS

- At FOUNDATION `33570b9d`, the only application-facing authenticity seam is
  `foundation/shared_memory/commerce_evidence/verifiers.py`:
  `ProvenanceVerdict(VERIFIED|UNVERIFIED|UNCONFIGURED|ERROR,
  source_identity, envelope_digest)`. Continue requires `VERIFIED` plus both
  booleans exactly true. The default verifier is `UNCONFIGURED` and accepts
  nothing.
- FOUNDATION contains no committed Docker/compose/Kubernetes/Helm/Terraform
  deployment model, packaging manifest, gateway, mesh, SPIFFE/SPIRE, mTLS, or
  workload-identity integration.
- Cosmile at `b8b61d74` contains no service-to-service workload identity,
  gateway, mesh, SPIFFE/SPIRE, or mTLS deployment binding. Its existing
  identity/auth material is user/auth and opaque-ref derivation material, not a
  sender-workload attestation mechanism.
- A generic local Docker engine or reverse proxy capability is not evidence of
  the required identity, environment, digest, idempotency, freshness, replay,
  revocation, or incident bindings.
- The reviewed WU8 design requires infrastructure/Security to bind the
  authorized `cosmile` workload, exact `local|shadow` environment, complete
  strict-envelope digest (including `source_hash` and `idempotency_key`), and a
  single ingress evaluation. Missing, stale, ambiguous, or unavailable
  verification must fail closed.

### CURRENT_STATUS

```text
U1_STATUS: OPEN
QUALIFYING_WORKLOAD_IDENTITY_CAPABILITY: NOT_VERIFIED
U1_B_PRECONDITION: NOT_SATISFIED
```

### RECOMMENDED_DIRECTION

Do not select U1-B. Ask the named Security and infrastructure owner to decide
whether a non-production ingress boundary will exist and to compare:

1. **U1-A — mutual-TLS workload identity at an approved gateway.** Requires
   verified gateway ownership, certificate issuance/custody/rotation/revocation,
   trust-store lifecycle, digest binding, freshness/replay control, and incident
   response.
2. **U1-C — Security-issued signed request token.** Requires signing/verification
   ownership, key custody/distribution/rotation/revocation, single-use freshness,
   replay state, digest binding, and incident response.

U1-B may be reconsidered only if a real platform workload-identity facility is
later independently verified. This package selects none of U1-A/B/C.

### CLOSURE_READY

```text
CLOSURE_READY: NO
```

### EXACT_REMAINING_DECISION

Security and the infrastructure/gateway owner must establish whether an ingress
boundary will be provisioned and return one concrete reviewed mechanism with:
workload/environment/digest/idempotency/freshness bindings; credential custody,
issuance, rotation, revocation; replay defense; gateway-to-application integrity;
failure mapping; threat review; and incident containment. Leo/GPT then decides
whether to close U1.

### REQUIRED_DECISION_OWNERS

```text
Security
Infrastructure/gateway owner
Leo/GPT
```

### VERIFIED_TECHNOLOGY_AND_PATHS

```text
VERIFIED_PATH: foundation/shared_memory/commerce_evidence/verifiers.py
VERIFIED_CAPABILITY: mechanism-neutral fail-closed provenance seam only
PLATFORM_WORKLOAD_IDENTITY: NONE VERIFIED
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER: Security + infrastructure/gateway owner + Leo/GPT
REQUIRED_DISCOVERY: non-prod ingress boundary; U1-A/U1-C mechanism or independently proven U1-B facility; credential lifecycle; freshness/replay; threat and incident model
DEPENDENT_WORKUNITS: BLOCKED
```

### UNRESOLVED_ITEMS

Gateway/mesh/issuer, concrete mechanism, trust and credential format, custody,
rotation, revocation, freshness/replay store, deployment path, Security owner,
infrastructure owner, threat model, and incident runbook.

### FAIL_CLOSED_DEFAULT

`UnconfiguredProvenanceVerifier` returns `UNCONFIGURED`; accepted evidence is
zero and all activation remains HARD_OFF.

### WORKUNITS_UNLOCKED_AFTER_EXPLICIT_CLOSURE

None by U1 alone. Closure removes one prerequisite only; it does not authorize a
WorkUnit.

### WORKUNITS_REMAINING_BLOCKED

WU8-F3, WU8-C3, WU8-X1 and all downstream delivery/intake work.

### PROPOSED_FOUNDER_CLOSURE_TEXT

```text
U1 is not closure-ready on current evidence. U1-B is not selected because no
qualifying platform workload-identity capability has been verified. Security and
the infrastructure/gateway owner must return a reviewed U1-A or U1-C mechanism,
or independently prove a real U1-B facility, binding the authorized Cosmile
workload, local|shadow environment, strict-envelope digest/source_hash,
idempotency_key, freshness, and replay boundary, with complete lifecycle and
incident controls. Until explicit Founder + Security closure, provenance remains
UNCONFIGURED and no intake implementation is authorized.
```

This is a draft non-closure statement, not gate closure.

## 3. U2 — current-consent closure readiness

### VERIFIED_FACTS

- FOUNDATION's landed `ConsentVerdict` seam has exactly nine states:
  `GRANTED`, `REVOKED`, `EXPIRED`, `MISSING`, `PENDING`, `MISMATCH`,
  `UNKNOWN`, `UNCONFIGURED`, and `ERROR`. Only `GRANTED` continues; the default
  is `UNCONFIGURED`.
- Cosmile is the current-consent authority. Its append-only consent logic is in
  `app/src/lib/commerceEvidenceService.ts`; the durable local model is
  `ConsentRecord` in `app/prisma/schema.prisma`; the current committed
  `app/src/app/api/commerce-evidence/consents/route.ts` is a revoke-only route,
  not a Foundation current-consent query surface.
- Same-service feedback storage and cross-service commerce-evidence use are
  separate purposes. Login or a `userId` never implies cross-service consent.
- The envelope consent snapshot is capture-time provenance only and never
  authoritative current state.
- Current consent must be reverified at initial intake and before every later
  eligibility-affecting transition. Retraction blocks eligibility/replay but is
  not proof of complete legal erasure.

### CURRENT_STATUS

```text
U2_STATUS: OPEN
U2_A_CONTRACT_SPECIFICATION: READY
ADAPTER_TRANSPORT_AND_OWNER_APPROVAL: UNRESOLVED
LEGAL_ERASURE_SEMANTICS: UNRESOLVED
```

### RECOMMENDED_DIRECTION

Present U2-A as the first non-production design: a synchronous, authoritative,
fail-closed pull with no cache-as-authority. U2-C may later reduce latency, but
only as a projection that never replaces the authoritative pull. No transport,
endpoint, or implementation is selected here.

### Exact U2-A contract

```text
CONTRACT: foundation.current_consent_pull.v1

CurrentConsentRequestV1:
- subject_ref: validated opaque subj_v2_*; no raw actor ID
- purpose: exactly cross_service_commerce_evidence
- notice_version: exact version to be checked for compatibility
- captured_at: envelope snapshot time; provenance only
- occurred_at: source occurrence time
- decision_time: Foundation-injected current decision time
- opaque_ingress_context: in-call only; never stored, logged, echoed, or metric-labeled

ConsentVerdict.status:
GRANTED | REVOKED | EXPIRED | MISSING | PENDING | MISMATCH |
UNKNOWN | UNCONFIGURED | ERROR

CONTINUE: only GRANTED
REVOKED -> consent_revoked
EXPIRED -> consent_expired
MISMATCH -> privacy_scope_exceeded
MISSING/PENDING/UNKNOWN/UNCONFIGURED/ERROR/timeout/malformed/unavailable -> consent_missing

AUTHORITY BEHAVIOR:
- resolve exact (subject_ref, cross_service_commerce_evidence) from Cosmile's append-only ledger
- confirm notice compatibility and that snapshot was effective at occurrence
- return no consent row ID or raw actor ID
- verify at intake and before review-open, review-decision, future materialization/reuse, or future promotion
- failed later verification preserves minimized receipt for audit/idempotency but atomically blocks/revokes eligibility and creates no new effect
- envelope snapshot never substitutes for the current call
- decision-time GRANTED must remain within an owner-approved same-call validity bound at commit; otherwise perform a second pre-commit query

ERASURE LIMIT:
retraction/revocation is not complete legal erasure; full erasure protocol,
acknowledgement, jurisdictional exceptions, and adverse hold remain deferred.
```

### CLOSURE_READY

```text
CLOSURE_READY: NO
CONTRACT_READY: YES
```

### EXACT_REMAINING_DECISION

Privacy and Security must approve the U2-A boundary, transport class,
availability behavior, timeout, and same-call validity. The Cosmile consent
owner must confirm the exact authoritative query boundary. Legal must decide
complete-erasure semantics and retained tombstone/audit limits. Leo/GPT then
decides whether to close U2.

### REQUIRED_DECISION_OWNERS

```text
Privacy
Security
Legal
Cosmile consent owner
Leo/GPT
```

### VERIFIED_TECHNOLOGY_AND_PATHS

```text
VERIFIED_PATH: FOUNDATION/foundation/shared_memory/commerce_evidence/verifiers.py
VERIFIED_PATH: Cosmile/app/src/lib/commerceEvidenceService.ts
VERIFIED_PATH: Cosmile/app/prisma/schema.prisma (ConsentRecord)
VERIFIED_PATH: Cosmile/app/src/app/api/commerce-evidence/consents/route.ts (revoke-only; not current-consent adapter)
ADAPTER_OR_TRANSPORT_PATH: UNRESOLVED
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER: privacy + Security + Legal + Cosmile consent owner + Leo/GPT
REQUIRED_DISCOVERY: approved transport; availability and same-call validity; current-state query boundary; legal erasure semantics
DEPENDENT_WORKUNITS: BLOCKED
```

### UNRESOLVED_ITEMS

Adapter/transport/repository path, timeout budget, same-call validity, service
availability requirement, U2-C lifecycle propagation, complete legal-erasure
protocol, and interpretation/retention of minimized tombstone/audit records.

### FAIL_CLOSED_DEFAULT

`UnconfiguredConsentVerifier` returns `UNCONFIGURED`; every envelope is rejected
as consent missing and accepted evidence remains zero.

### WORKUNITS_UNLOCKED_AFTER_EXPLICIT_CLOSURE

None by U2 alone. Closure removes one prerequisite only.

### WORKUNITS_REMAINING_BLOCKED

WU8-F3, WU8-C3, WU8-X1 and all downstream delivery/intake work.

### PROPOSED_FOUNDER_CLOSURE_TEXT

```text
Approve the transport-neutral U2-A synchronous fail-closed current-consent
contract `foundation.current_consent_pull.v1` as the required non-production
boundary, subject to explicit privacy, Security, Legal, Cosmile consent-owner,
and Founder approval. Cosmile remains current authority; only GRANTED continues;
all other/timeout/unavailable/malformed states fail closed; the envelope snapshot
is never authority; and every eligibility-affecting transition reverifies.
Retraction is not complete legal erasure. This gate closure, if all named owners
approve it, authorizes no adapter, endpoint, transport, or implementation and
does not close U1 or U3.
```

This is proposed decision language only; all named authorities must explicitly
approve before U2 can close.

## 4. U3 — Foundation durable-backend discovery

### VERIFIED_FACTS

- At `33570b9d`, Foundation's current commerce-evidence ledger is an in-memory,
  one-process `RLock` implementation that explicitly claims zero durability.
- FOUNDATION has no committed Python packaging manifest, DB driver, ORM,
  migration framework, schema directory, Docker/compose/Kubernetes/Terraform
  deployment model, durable commerce-evidence repository, or DB connection.
  Existing `sqlite3`/`psycopg2` mentions in `_core` are import denylists, not a
  storage implementation.
- The reviewed design fixes backend-neutral logical entities, six uniqueness
  constraints, one serializable-equivalent atomic boundary, replay/race rules,
  retention/cleanup, migration, backup/restore, and rollback obligations, but
  deliberately selects no technology or path.
- Cosmile's verified Prisma/PostgreSQL stack and prior disposable PostgreSQL
  migration rehearsal belong to Cosmile and do not establish a Foundation
  architecture decision.
- Foundation's current security guardrail says it is not a durable customer
  memory database. Any future minimized subject-linked evidence store therefore
  requires explicit Foundation-architecture and privacy/Legal boundary approval;
  it cannot be inferred from the backend-neutral WU8 design.

### CURRENT_STATUS

```text
U3_STATUS: OPEN
FOUNDATION_DURABLE_STORAGE_TECHNOLOGY: NONE VERIFIED
ORM_OR_DIRECT_SQL_DECISION: UNRESOLVED
MIGRATION_TOOL_AND_PATH: UNRESOLVED
ARCHITECTURE_RECOMMENDATION_SUPPORTED: NO
```

### RECOMMENDED_DIRECTION

Retain U3-A (server relational store with serializable isolation) only as the
contract-aligned direction. Do not select a database product, ORM, direct-SQL
stack, migration tool, module/schema path, deployment topology, or operational
owner until Foundation architecture supplies direct evidence.

Architecture must explicitly compare at most these three families:

1. Server relational store with native constraints and serializable isolation.
2. Embedded transactional relational store, only if multi-process locking,
   crash/restart behavior, and deployment compatibility can be proven.
3. Append-only durable log plus atomic uniqueness projection, only if the same
   all-or-none boundary and six constraints can be proven without races.

No option is selected or recommended as an implementation architecture here.

### CLOSURE_READY

```text
CLOSURE_READY: NO
```

### EXACT_REMAINING_DECISION

Foundation architecture/storage authority must first decide whether Foundation
may own the minimized subject-linked durable evidence surface, then select and
evidence the exact backend, ORM versus direct SQL, migration tooling/path,
serializable-equivalent proof, repository allowlist, multi-process/restart/crash
behavior, retention/cleanup, backup/restore, rollback/forward-fix, and disposable
non-production migration rehearsal. Privacy/Legal must approve retention and
erasure boundaries. Leo/GPT then decides whether to close U3.

### REQUIRED_DECISION_OWNERS

```text
Foundation architecture/storage authority
Privacy/Legal
Leo/GPT
```

### VERIFIED_TECHNOLOGY_AND_PATHS

```text
VERIFIED_PATH: foundation/shared_memory/commerce_evidence/ledger.py (ephemeral only)
VERIFIED_LOGICAL_MODEL: reviewed WU8 design sections 5-7
FOUNDATION_DB_OR_ORM_OR_MIGRATION_TOOL: NONE VERIFIED
FOUNDATION_SCHEMA_OR_MIGRATION_PATH: NONE VERIFIED
COSMILE_REFERENCE_ONLY: Prisma 6.19.3 + PostgreSQL under app/prisma (non-transferable)
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER: Foundation architecture/storage + privacy/Legal + Leo/GPT
REQUIRED_DISCOVERY: ownership boundary; backend; ORM-vs-SQL; migration tool/path; isolation proof; exact repository allowlist; cleanup/backup/restore; disposable rehearsal
DEPENDENT_WORKUNITS: BLOCKED
```

### UNRESOLVED_ITEMS

Foundation storage ownership, database technology, ORM/direct SQL, dependency
management, migration tooling/location, exact paths, transaction/isolation proof,
multi-process/restart/crash behavior, retention job, backup/restore owner,
rollback/forward-fix, non-production topology, and legal retention/erasure.

### FAIL_CLOSED_DEFAULT

No durable backend exists. The current store remains ephemeral/default-OFF;
intake is zero and real-user application, live writes, and promotion remain
false/HARD_OFF.

### WORKUNITS_UNLOCKED_AFTER_EXPLICIT_CLOSURE

U3 closure alone authorizes no implementation. It would provide the missing
backend-specific design/allowlist prerequisite for a separately reviewed WU8-F1
and later WU8-F2 handoff.

### WORKUNITS_REMAINING_BLOCKED

WU8-F1, WU8-F2, WU8-F3, WU8-C3, WU8-X1 and all downstream work.

### PROPOSED_FOUNDER_CLOSURE_TEXT

```text
U3 is not closure-ready. Foundation has no verified durable-storage technology,
packaging/deployment foundation, ORM/direct-SQL decision, migration tool, or
repository path. Foundation architecture/storage must first return an approved
ownership boundary and concrete relational design with exact paths, six database
constraints, serializable-equivalent transaction proof, migration and rollback,
retention/cleanup, backup/restore, and disposable non-production rehearsal;
privacy/Legal must approve retention and erasure. Until explicit Founder and
Foundation-architecture closure, no durable backend or dependent WorkUnit is
authorized.
```

This is a draft non-closure statement, not gate closure.

## 5. Exact dependency state

```text
U1_STATUS: OPEN
U2_STATUS: OPEN
U3_STATUS: OPEN

U1_CLOSURE_READY: NO
U2_CLOSURE_READY: NO
U2_CONTRACT_READY: YES
U3_CLOSURE_READY: NO

WU8_F1: NOT_AUTHORIZED / BLOCKED_BY_U3
WU8_F2: NOT_AUTHORIZED / BLOCKED_BY_U3_AND_F1
WU8_F3: NOT_AUTHORIZED / BLOCKED_BY_U1_U2_U3_AND_F2
WU8_C3: NOT_AUTHORIZED / BLOCKED_BY_U1_U2_AND_F3
WU8_X1: NOT_AUTHORIZED / BLOCKED_BY_U1_U2_U3_AND_PRIOR_IMPLEMENTATION_GATES

DELIVERY: NOT_AUTHORIZED
ACTIVATED_FOUNDATION_INTAKE: NOT_AUTHORIZED
FOUNDATION_DURABLE_BACKEND: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED
M3: NOT_AUTHORIZED
```

## 6. Explicitly deferred decisions

- U1 concrete mechanism, credentials/trust lifecycle, gateway/deployment path,
  and production threat model.
- U2 transport, adapter path, SLA/same-call validity, lifecycle projection, and
  complete erasure semantics.
- U3 storage ownership, backend/ORM/tool/path, deployment, operations,
  backup/restore, and legal retention exceptions.
- Every implementation, delivery, intake, current candidate/store bridge,
  approval, reuse, promotion, personalization, ranking, safety mutation,
  adverse-policy enablement, guest exception, production/live, Full Package 1B,
  and M3 decision.

## 7. Containment and evidence

```text
FOUNDATION_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6 (unchanged)
COSMILE_HEAD: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6 (unchanged)
SIASIU_HEAD: e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602 (unchanged)
FOUNDATION_CONTROL_HEAD: c89b792bed177aad9322e09debecc76caab0c8a0 (unchanged)
PRODUCT_OR_CONTROL_REPOSITORY_WRITE: ZERO
DB_SCHEMA_MIGRATION_CREDENTIAL_AUTH_CONSENT_ADAPTER_TRANSPORT_NETWORK_FLAG_RUNTIME: ZERO
WORKER_DISPATCH: ZERO
DESIGNER_DISPATCH: ZERO
OPTION_SELECTED: ZERO
GATE_CLOSED: ZERO
RISK_ACCEPTED: ZERO
IMPLEMENTATION_STARTED: ZERO
HARD_STOP: ACTIVE
```

Evidence:

- Control discovery result:
  `runs/shared/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/10_CONTROL_DISCOVERY_RESULT.md`
  at commit `b00103b38cb837b523a22d1f41b771281e8b0226`.
- Source Gate Package at commit
  `1eb7f884bbe2ebc86db6d06d36831607bc815100`.
- Prior Advisor Final Audit at commit
  `8859574b28086ea8ce56b58ec10650de8839128a`.
- Corrected reviewed WU8 design at commit
  `08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b`.

## 8. Review meaning

Independent review PASS will validate only factual accuracy, completeness,
path-truth discipline, closure-request quality, dependency accuracy, and
decision readiness. PASS cannot select an option, accept risk, close U1/U2/U3,
or authorize a WorkUnit. All gates remain OPEN until the explicitly named
authorities act.
