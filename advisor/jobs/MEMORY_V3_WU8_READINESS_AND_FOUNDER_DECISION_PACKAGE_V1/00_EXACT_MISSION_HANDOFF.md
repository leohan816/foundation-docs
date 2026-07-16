MISSION_ID:
MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1

MISSION_TYPE:
READ_ONLY_DECISION_PREPARATION

PURPOSE:

Prepare a reviewed Founder Decision Package for the future WU8
delivery, Foundation intake, and candidate-bridge boundary.

This mission does not authorize WU8 implementation.

CURRENT VERIFIED BASELINES:

FOUNDATION:
- repository: /home/leo/Project/FOUNDATION
- branch: shadow/foundation-shared-memory-v0
- head: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6

COSMILE:
- repository: /home/leo/Project/Cosmile
- branch: shadow/m4-cosmile-memory
- head: f26fa5ced7083bb8d0af00bda2a54951923ea22f

CURRENT STATE:

- Cosmile A/B evidence plane: implemented and independently reviewed
- Foundation bounded C Shadow WU1–WU7: implemented and independently reviewed
- WU8: NOT_AUTHORIZED
- delivery: NOT_AUTHORIZED
- activated Foundation intake: NOT_AUTHORIZED
- durable/current candidate runtime: NOT_AUTHORIZED
- M3: NOT_AUTHORIZED
- HARD STOP: ACTIVE


AUTHORIZED ANALYSIS SCOPE:

Use the current reviewed evidence and pinned repository source
to prepare explicit Founder options for:

D8-1 — AUTHENTICITY AND INGRESS AUTHORITY

- how Foundation proves that evidence came from the authorized Cosmile source;
- what component owns ingress authentication;
- what must remain unconfigured and fail-closed;
- no credential, token, certificate, signature, or secret may be implemented.

D8-2 — CURRENT CONSENT, REVOCATION, AND ERASURE PROPAGATION

- how Foundation verifies consent is currently effective;
- how revocation, expiry, correction, and erasure state reaches the intake boundary;
- which system remains the consent authority;
- what happens when the authority is unavailable.

D8-3 — DELIVERY, RETRY, ORDERING, AND DURABILITY

- compare bounded non-prod delivery patterns;
- define retry, replay, ordering, dead-letter, idempotency, and backpressure needs;
- determine what durable state is required for restart-safe and multi-process behavior;
- no transport, consumer, endpoint, queue, durable DB, or sender may be implemented.

D8-4 — FOUNDATION CANDIDATE BRIDGE

- how accepted and eligible commerce evidence relates to the current
  Foundation MemoryCandidate contract;
- address furef_v2 absence and retention representation mismatch;
- preserve the boundary:
  accepted evidence
  ≠ eligibility
  ≠ review-only candidate draft
  ≠ approval
  ≠ reuse
  ≠ runtime application;
- no current MemoryCandidate materialization or SharedMemoryStore write.

D8-5 — ADVERSE AND IDENTITY BOUNDARIES

- adverse jurisdiction, legal role, retention class, and erasure exception
  must remain unresolved unless supported by explicit authority;
- guest/anonymous cross-service evidence remains forbidden by default;
- present an exception option only if evidence shows it is necessary;
- no legal conclusion or jurisdiction may be inferred.


PACKAGE FORMAT:

For each D8-1 through D8-5 provide:

1. verified current facts;
2. exact unresolved question;
3. no more than three concrete options;
4. Advisor recommended option;
5. implementation consequence;
6. privacy/security/safety consequence;
7. what remains deferred;
8. whether Leo alone can decide or Security/Legal input is required.

Also provide:

- the minimum coherent WU8 design scope after the decisions;
- the exact boundary between:
  a. delivery design,
  b. delivery implementation,
  c. activated intake,
  d. durable candidate runtime;
- a proposed execution sequence with a HARD STOP before implementation;
- a list of decisions that can safely remain deferred;
- an explicit statement that no current scope is automatically authorized.


ACTOR AND ROLE BOUNDARY WHEN LATER LAUNCHED:

- foundation-advisor remains the responsible orchestrator;
- foundation-control may perform read-only cross-project contract analysis;
- repository-owner Workers may perform read-only verification only when
  a load-bearing fact cannot be proven from current pinned evidence;
- Designer is not required unless the Advisor proves a decision cannot be
  expressed without a design artifact;
- independent Reviewer must review the final decision package;
- Reviewer must not patch;
- no actor may implement product code.


STRICT EXCLUSIONS:

- no Foundation, Cosmile, SIASIU, or foundation-control product changes;
- no WU8 code;
- no transport, consumer, sender, endpoint, broker, polling, or network;
- no secrets or credential implementation;
- no DB access or migration;
- no feature-flag activation;
- no actual delivery;
- no activated Foundation intake;
- no durable/current MemoryCandidate runtime;
- no real-user application;
- no approval, reuse, promotion, ranking, or safety mutation;
- no production/live;
- no Full Package 1B authority;
- no M3.


COMPLETION REQUIREMENTS:

- Founder Decision Package completed;
- independent review completed;
- Advisor final audit completed;
- blocking findings and unresolved unknowns listed explicitly;
- no implementation started;
- return to Leo/GPT;
- HARD STOP remains active.
