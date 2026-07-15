# Memory V3 M2 C — Designer Implementation-Ready Design Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-IMPLEMENTATION-READY-DESIGN-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: foundation-designer
TARGET_SESSION: foundation-designer
TARGET_WINDOW_ID: @29
TARGET_PANE_ID: %29
ROLE: Designer
MODE: C_IMPLEMENTATION_READY_DESIGN_ONLY
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

DESIGN_SCOPE: Foundation acceptance/rejection and candidate-creation boundary for Cosmile commerce_evidence.v1
FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_BRANCH: shadow/foundation-shared-memory-v0
FOUNDATION_HEAD: f6417004d9157766b2b23d4d0870ade7f0c7fe96
COSMILE_REPOSITORY: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f
FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
CONTROL_CONTRACT_EVIDENCE_COMMIT: c53855c6e191c24819e98555f83bf12b37e9a127

ACTUAL_MODEL: verify live and record exactly
EFFORT: max
REQUIRED_SKILL: /fable-builder
PRODUCT_REPOSITORY_WRITE: FORBIDDEN
FOUNDATION_DOCS_COMMIT_PUSH: FORBIDDEN — Advisor publishes returned artifacts
TEST_DB_SECRET_ENV_NETWORK_PROVIDER: FORBIDDEN
C_IMPLEMENTATION_DELIVERY_INTAKE: FORBIDDEN
STOP_AFTER_RETURN: true
```

## 1. Objective and hard boundary

Turn the committed Control contract at `c53855c6...` into a precise,
implementation-ready **C design package** that a future Foundation Worker could
implement without inventing product, privacy, safety, identity, or lifecycle
policy. This design is a review subject only. It must not create or modify any
product file, schema, migration, endpoint, transport, consumer, feature flag,
credential, database, or runtime.

The design may describe a future Foundation intake, validator, reason taxonomy,
envelope-to-candidate mapper, candidate creation workflow, shadow metrics, and
tests. It must not authorize or begin them. Independent design review is
required after this work, followed by a HARD STOP and return to Leo/GPT.

## 2. Fixed Founder decisions and unresolved gates

Preserve D1-A, D2-A, D3-A and all constraints in
`24_M2_FOUNDER_D1_D3_DECISION.md`:

- Cosmile owns deterministic closed-choice normalization and the evidence
  envelope; it never creates candidates.
- Foundation may, only in a separately approved future implementation, validate
  evidence and create Foundation-owned candidates from accepted evidence.
- feedback-storage and cross-service-use consent are separate; userId/login is
  not consent; identity linking is default OFF.
- correction/retraction are append-only; no destructive re-key or silent
  overwrite.
- satisfaction and adverse are independent; satisfaction cannot lower safety.
- no raw text, external semantic provider, automatic promotion, ranking or
  safety mutation, delivery, intake activation, real DB, production/live, or
  full Package 1B.

Do not resolve these open gates:

1. `adverse_regulatory_hold` jurisdiction/legal role/duration;
2. the concrete ingress authenticity credential or attestation mechanism;
3. any anonymous/guest cross-service exception;
4. C implementation, delivery, intake activation, or candidate runtime.

Design fail-closed behavior around them: an unconfigured attestation verifier,
unknown retention legality, unsupported anonymous evidence, or disabled C flag
must accept nothing and create nothing. Do not invent placeholder secrets,
credentials, endpoints, or legal durations.

## 3. Mandatory direct reads

Read directly:

1. Agent Office operating model and Designer role document.
2. FOUNDATION and Cosmile root `AGENTS.md`/`CLAUDE.md`; Cosmile app rules and
   security/migration policies.
3. `/home/leo/Project/skill/fable-builder/SKILL.md` and only task-relevant
   references.
4. Mission `00`, `16`, `20`, `22`, `24`, `25` and the reviewed A/B chain `26`
   through `49` at foundation-docs commit `c53855c6...`.
5. `50_M2_C_CONTROL_CONTRACT_HANDOFF.md` and both C Control result files at
   exact evidence commit `c53855c6...`.
6. Current Cosmile producer contract/source/schema/tests at `f26fa5c` needed to
   specify the exact input envelope and containment invariants.
7. Current Foundation candidate, consent/identity, gate, reason-code,
   approval/reuse, provenance, safety, feature-flag, API-contract, and test
   surfaces at `f6417004` needed to define the future Foundation design.

Verify Git heads and pre/post status. Treat source as truth over prose and label
every current versus future behavior.

## 4. Required design content

Produce one coherent implementation-ready design with at least:

1. **Design status and authority.** Exact current heads, fixed decisions,
   unresolved gates, non-authorized runtime scope, and explicit HARD STOP.
2. **System spaces and ownership.** Cosmile producer/outbox, deferred unowned
   transport, future Foundation intake/validator/mapper/candidate workflow,
   audit/decision plane, and explicit SIASIU non-participation.
3. **Exact versioned input contract.** Field-by-field validation matrix for
   `cosmile.commerce_evidence.v1`: type, required/nullability, source of truth,
   invariant, failure code, and forbidden fields. Do not add fields to the
   producer envelope unless explicitly classified as a future version requiring
   new review.
4. **Deterministic validation state machine.** Ordered, fail-closed gates;
   category-level reason codes; first-failure semantics; all 18 reserved C codes
   mapped; notice/purpose mismatch handling stated exactly; unknown reason codes
   collapse safely without hiding the primary design.
5. **Provenance and authenticity seam.** Define a narrow verifier interface and
   its inputs/outputs without choosing credentials/protocol. `UNCONFIGURED`,
   `UNVERIFIED`, or verifier failure must become `provenance_untrusted` and
   create nothing. Unkeyed `source_hash` is integrity evidence, not
   authentication.
6. **Replay, idempotency, and concurrency.** Exact identity key, first-writer
   semantics, duplicate receipt, transaction boundary, retry behavior at the
   data-contract level, correction/retraction races, single-successor lineage,
   and no double candidate creation.
7. **Consent and identity.** Purpose/version/state matrix; separate consent
   purposes; latest valid append-only snapshot; revoked/expired/missing/unknown
   fail closed; opaque refs; default-OFF linking; guest rejected; no re-key or
   retroactive link.
8. **Lineage, correction, retraction, erasure, and retention.** Root/leaf
   invariants, out-of-order handling, tombstone behavior, candidate eligibility
   revocation, deletion/erasure boundary, non-adverse expiry, and adverse hold
   remaining duration-unconfigured and activation-blocking where law is needed.
9. **Envelope-to-Foundation mapping.** Explicit mapping table to the current
   Foundation `MemoryCandidate`/future named candidate types; preserve evidence
   versus memory separation; acceptance, eligibility, creation, review,
   approval, and reuse are separate states. Define adverse candidate behavior
   without diagnosis or generated medical advice.
10. **Candidate and safety workflow.** Foundation-only creation from accepted
    evidence; initial status; manual review path; adverse priority; correction
    and retraction effects; zero automatic promotion/reuse/ranking/safety
    mutation; satisfaction cannot mask adverse.
11. **Response and audit contract.** Minimal receipt/accept/reject result,
    stable decision IDs/reason codes/lineage pointer, category-level metrics,
    no raw payload/PII/identifier echo, and exact audit retention boundaries.
12. **Future Foundation file/module plan.** Exact proposed paths and
    responsibility per file, minimal additive changes, dependencies, feature
    flags default OFF, reason-code extension, and why existing
    `ingest_event_signal` is not overloaded. This is a plan only; write no
    product file.
13. **Future additive schema/migration plan.** Only if strictly required:
    non-prod/local/shadow tables/fields, indexes and uniqueness, forward/down
    rehearsal, empty-table/compatibility gates, rollback, and explicit no real
    target DB. No migration file is created now.
14. **Test and verification design.** Unit, property/invariant, malicious-input,
    lineage/concurrency, consent/identity, adverse safety, version/reason-code,
    containment/no-transport, static no-PII, ephemeral DB, integration-shadow,
    rollback, and fail-at-old/pass-at-new oracles. Specify safe commands or
    harness categories for a future Worker, but run none now.
15. **Activation, rollback, and kill switch.** Default OFF; local → ephemeral →
    shadow; objective evidence gates; fail-closed rollback to no-intake;
    containment of queued producer rows; no replay without idempotency proof;
    new Founder approval required before every delivery/intake/candidate runtime
    step.
16. **Threat model.** Forgery, hash substitution, downgrade, consent
    laundering, identity confusion, cross-tenant leakage, replay, lineage race,
    retraction evasion, adverse suppression, retention bypass, reason-code
    oracle leakage, and denial/poisoning.
17. **Traceability.** Founder constraint → Control clause → design requirement →
    proposed file/module → future test → review criterion.
18. **Implementation handoff table.** Ordered future WorkUnits, exact repo-local
    actor ownership, allowed paths, dependencies, stop conditions, rollback, and
    evidence—clearly marked `NOT_AUTHORIZED` until a new Leo/GPT approval.
19. **Honest limitations and decision requests.** Separate what is fully
    implementation-ready from what remains blocked by the four unresolved
    gates; do not downgrade a blocker to a risk.

No UI mockup is required because this C scope has no authorized user-facing UI.
Any operational state must nevertheless define screen-reader-equivalent,
machine-readable, and human-audit-readable status/error semantics without raw
data exposure.

## 5. Objective design-review criteria

The independent Reviewer must be able to decide all of the following from the
design and pinned source:

- every envelope field has one validation/nullability/reject outcome;
- all 18 C codes are versioned, category-level, and safely integrated with the
  Foundation reason guard;
- `source_hash` is never misrepresented as authentication; authenticity is
  fail-closed while the verifier is unconfigured;
- purpose-specific consent and identity default-OFF rules cannot be bypassed;
- lineage/replay/concurrency cannot silently overwrite, double-create, or evade
  retraction;
- adverse handling is independent, conservative, and never auto-promoted;
- acceptance, eligibility, candidate creation, review, approval, and reuse are
  distinct;
- proposed Foundation changes are minimal/additive and do not overload legacy
  intake;
- tests cover old/new failure oracles and security invariants without requiring
  real DB/network/secrets;
- flags, delivery, intake, candidate runtime, production/live, and full Package
  1B remain OFF/not authorized;
- every open Founder/legal/security decision remains explicit and no C
  implementation can begin after a review verdict.

## 6. Allowed writes and result contract

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md
```

Do not commit or push; Advisor publishes. Record live runtime and pre/post Git
evidence. Return the compact pointer to `foundation-advisor` and STOP.

STOP with `DESIGN_NOT_READY` if pinned facts conflict materially, an unresolved
gate prevents an honest bounded design, a product write/test/DB/secret/network
action is needed, or the design would infer new policy. A partial design may be
returned as evidence, but must not be labeled implementation-ready.
