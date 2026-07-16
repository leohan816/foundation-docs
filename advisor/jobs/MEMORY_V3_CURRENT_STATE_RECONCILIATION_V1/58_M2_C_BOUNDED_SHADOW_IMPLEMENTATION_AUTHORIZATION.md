FOUNDER_MEMORY_V3_C_BOUNDED_SHADOW_IMPLEMENTATION_AUTHORIZATION

Authorize only the bounded Foundation-side Shadow implementation
defined by the independently reviewed C design.

REVIEWED_DESIGN:
foundation-docs commit
7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117

INDEPENDENT_DESIGN_REVIEW:
foundation-docs commit
920359eb03971540dae405dc836cc00f398e4ff1

DESIGN_REVIEW_VERDICT:
PASS

AUTHORIZED_FOUNDATION_REPOSITORY:
/home/leo/Project/FOUNDATION

AUTHORIZED_FOUNDATION_BRANCH:
shadow/foundation-shared-memory-v0

EXPECTED_FOUNDATION_BASE_HEAD:
f6417004d9157766b2b23d4d0870ade7f0c7fe96

Before dispatch, the Advisor must verify the exact repository,
branch, HEAD, workspace, and known pre-existing Git state.

If the exact branch or HEAD differs, do not infer or select
a replacement branch. Return to Leo/GPT and stop.


AUTHORIZED SCOPE:

- implement only official future WorkUnits 1 through 7
  listed in reviewed design section 17;

- Foundation repository only;

- only the exact Foundation paths, functions, dependencies,
  and tests permitted by those WorkUnits;

- exact cosmile.commerce_evidence.v1 contract;

- exact 18 guarded Foundation C reason codes;

- byte-compatible v1 idempotency and source-hash behavior,
  including the reviewed pinned JavaScript sentinel behavior;

- fail-closed provenance verifier interface;

- fail-closed current-effective-consent verifier interface;

- verifier defaults remain UNCONFIGURED and accept nothing;

- adverse retention/legal policy remains UNCONFIGURED;

- one-process ephemeral Shadow ledger only;

- correction, retraction, replay, collision, idempotency,
  lineage, and bounded in-process concurrency logic;

- Foundation-owned review-only DTOs:

  CommerceOutcomeCandidateV1
  CommerceAdverseCandidateV1

- default-OFF Foundation Shadow service;

- synthetic review-only draft creation and default-OFF
  ephemeral Shadow execution strictly required by
  authorized WorkUnits 4 through 6;

- synthetic fixtures and in-memory or ephemeral test evidence only;

- dedicated unit, property, malicious-input, concurrency,
  rollback, containment, serialization, and regression tests;

- independent implementation review;

- bounded same-Worker patch and same-Reviewer
  delta-review loops;

- commit and push only to the exact authorized
  non-protected Foundation Shadow branch;

- return one consolidated result to Leo/GPT and stop.


ADVERSE BOUNDARY:

CommerceAdverseCandidateV1 type, mapping, and synthetic-test
implementation inside the authorized Shadow scope is permitted.

While adverse retention/legal policy remains UNCONFIGURED,
skin_reaction and other adverse evidence must produce:

- accepted evidence: 0
- effective eligibility: 0
- review-only candidate drafts: 0

No duration, jurisdiction, legal role, reporting duty,
or retention exception may be inferred.


DEFAULT-FAIL-CLOSED REQUIREMENT:

With default configuration:

- feature flag is OFF;
- provenance verifier is UNCONFIGURED;
- current-effective-consent verifier is UNCONFIGURED;
- adverse retention/legal policy is UNCONFIGURED.

Therefore default runtime results must remain:

- accepted evidence: 0
- candidate drafts: 0
- real-user application: 0
- live writes: 0
- promotion: 0


STRICT EXCLUSIONS:

- WorkUnit 8 is NOT AUTHORIZED;

- no Cosmile outbox consumer;

- no transport, sender, flush, endpoint, network,
  broker, polling, delivery worker, or provider;

- no activated Foundation intake;

- no real Cosmile evidence delivery;

- no secrets, credential implementation, signature mechanism,
  token, certificate, or live attestation;

- no real target DB;

- no durable product storage;

- no restart-safe or multi-process production backend;

- no current MemoryCandidate materialization;

- no furef_v2 synthesis;

- no SharedMemoryStore write;

- no existing ingest_event_signal overload or semantic change;

- no candidate approval;

- no reuse;

- no durable memory promotion;

- no personalization;

- no ranking mutation;

- no safety mutation;

- no real-user candidate application;

- no generated medical advice;

- no external adverse reporting;

- no SIASIU or Cosmile product changes;

- no production or live activation;

- no main or protected branch merge;

- no Full Package 1B authority;

- no M3 authority.


RUNTIME CLARIFICATION:

No delivery, activated intake, durable/current MemoryCandidate runtime,
real-user candidate application, approval, reuse, promotion,
ranking, or safety mutation may begin.

Synthetic review-only draft creation and default-OFF ephemeral
Shadow execution strictly required by authorized WorkUnits
4 through 6 are authorized.


DEPENDENCY AND GATE DISCIPLINE:

All dependencies and stop conditions in reviewed design
section 17 remain binding.

The Advisor may proceed through WorkUnits 1 through 7
without intermediate Founder interruption only while:

- each prior dependency is satisfied;
- each required review gate passes;
- implementation remains inside the reviewed design;
- no excluded authority becomes necessary.

No WorkUnit automatically unlocks WorkUnit 8 or any delivery,
activated intake, durable runtime, or live activation.


ROLE BOUNDARY:

- only the Foundation Worker may modify
  the Foundation product repository;

- Control may perform contract analysis only;

- Designer may correct implementation-ready design artifacts
  only when routed by the Advisor;

- Control and Designer must not modify product repositories;

- the independent Reviewer must not patch implementation;

- all corrections must return through the Advisor;

- the same Worker performs bounded implementation corrections;

- the same independent Reviewer performs delta-only re-review.


REQUIRED REVIEW EVIDENCE:

The implementation review must verify at minimum:

- exact field and reason-code contract coverage;

- all 18 reason codes have positive and adjacent-negative tests;

- provenance and consent defaults reject everything;

- adverse policy UNCONFIGURED accepts and creates nothing
  for skin_reaction and other adverse evidence;

- replay, collision, correction, retraction,
  lineage, and race behavior are deterministic;

- no raw text, PII, producer identifiers, credentials,
  or payload details appear in responses, audits, metrics,
  exceptions, or fixtures;

- applied_to_real_user is always false;

- write_live is always false;

- promotion_performed is always false;

- feature flags remain OFF by default;

- no runtime API, endpoint, transport, consumer,
  network, provider, durable DB, or product migration exists;

- current Foundation shared-memory and subject-ref regression
  tests remain unchanged and passing;

- no SIASIU or Cosmile repository change occurred.


STOP EARLY ONLY IF:

- a new Founder-level product, privacy, security,
  safety, legal, identity, or retention decision is required;

- implementation would exceed the reviewed C design;

- the exact Foundation branch or expected base HEAD does not match;

- real DB, durable storage, network, secrets,
  delivery, activated intake, or live operation becomes necessary;

- a current MemoryCandidate or SharedMemoryStore connection
  becomes necessary;

- an unresolved safety, privacy, data-loss,
  authority, or contract conflict is found;

- an independent review gate cannot pass
  within the authorized bounded patch scope.


FINAL STOP:

After WorkUnits 1 through 7 and independent implementation review:

- commit and push the authorized Foundation Shadow implementation;
- commit and push the authorized evidence;
- perform the Advisor final audit;
- return one consolidated result to Leo/GPT;
- activate HARD STOP;
- stop all actors.

WorkUnit 8 must not begin.

No delivery, activated Foundation intake,
durable/current MemoryCandidate runtime,
real-user candidate application, approval, reuse,
promotion, ranking, or safety mutation may begin.

M3 must not begin.
