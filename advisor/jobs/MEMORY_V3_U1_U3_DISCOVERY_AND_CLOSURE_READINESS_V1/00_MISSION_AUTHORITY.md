# Mission Authority — U1–U3 Discovery and Closure Readiness

```text
MISSION_ID: MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1
MISSION_MODE: UNATTENDED_BOUNDED_READ_ONLY
RESPONSIBLE_ADVISOR: foundation-advisor
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
```

## Objective

Produce one independently reviewed
`DISCOVERY_AND_CLOSURE_READINESS_PACKAGE` for U1, U2, and U3. This mission
prepares closure requests only. It does not close a gate, authorize an
implementation, or begin a later WorkUnit.

## Immutable source evidence

- U1–U3 Gate Package:
  `advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/20_U1_U3_GATE_PACKAGE.md`
  at commit `1eb7f884bbe2ebc86db6d06d36831607bc815100`.
- Prior Advisor Final Audit:
  `advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/90_ADVISOR_FINAL_AUDIT.md`
  at commit `8859574b28086ea8ce56b58ec10650de8839128a`.

## Pinned read-only baselines

| Repository | Branch | HEAD |
|---|---|---|
| `/home/leo/Project/FOUNDATION` | `shadow/foundation-shared-memory-v0` | `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` |
| `/home/leo/Project/Cosmile` | `shadow/m4-cosmile-memory` | `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` |
| `/home/leo/Project/SIASIU` | `shadow/m4-siasiu-memory` | `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602` |
| `/home/leo/Project/foundation-control` | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` |

Pre-existing untracked files are preserved and are not mission scope.

## Gate work

### U1 — authenticity discovery

Determine whether the verified non-production platform/deployment model has a
real workload-identity capability that can bind the Cosmile workload, exact
environment, complete envelope digest/source hash, idempotency key, freshness,
replay, revocation, and incident handling. If a qualifying capability is
verified, identify its exact capability, owners, integration boundary, and
verified paths and prepare a U1-B closure request. Otherwise do not select U1-B;
compare U1-A and U1-C and record the exact discovery and decision still needed.
No authentication mechanism or credential may be implemented.

### U2 — current-consent closure readiness

Prepare an exact U2-A synchronous fail-closed consent contract covering the
Cosmile authority boundary, request fields, closed verdicts, purpose and notice
version, every failure/staleness/revocation/expiry state, intake verification,
re-verification before every eligibility-affecting transition, erasure limits,
operational consequences, decision owners, and only independently verified
paths. The envelope consent snapshot is never current authority. No endpoint,
transport, adapter, service, projection, or erasure behavior may be implemented.

### U3 — Foundation durable-backend discovery

Inspect the actual Foundation architecture and determine whether a relational
durable backend can be made implementation-ready. Evaluate exact verified
technology options, ORM versus direct SQL, migration tooling, verified paths,
serializable-equivalent transactions, the reviewed six uniqueness requirements,
multi-process concurrency, restart/crash recovery, replay/idempotency,
retention/cleanup, backup/restore, rollback/forward-fix, disposable non-production
migration rehearsal, and decision owners. Recommend an architecture only when
its technology and paths are verified. Never invent a database, ORM, migration
tool, path, topology, or owner.

For anything not verified, record exactly:

```text
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER:
REQUIRED_DISCOVERY:
DEPENDENT_WORKUNITS: BLOCKED
```

## Required output per gate

```text
VERIFIED_FACTS
CURRENT_STATUS
RECOMMENDED_DIRECTION
CLOSURE_READY: YES | NO
EXACT_REMAINING_DECISION
REQUIRED_DECISION_OWNERS
VERIFIED_TECHNOLOGY_AND_PATHS
UNRESOLVED_ITEMS
FAIL_CLOSED_DEFAULT
WORKUNITS_UNLOCKED_AFTER_EXPLICIT_CLOSURE
WORKUNITS_REMAINING_BLOCKED
PROPOSED_FOUNDER_CLOSURE_TEXT
```

`CLOSURE_READY` is a recommendation/evidence result only and never closes a
gate.

## Role and review boundaries

- `foundation-advisor` owns orchestration, integration, evidence validation,
  and final audit.
- `foundation-control` performs read-only cross-project discovery only and
  returns durable evidence to the Advisor.
- No product Worker is authorized.
- No Designer is used unless a contradiction is found; a contradiction is an
  early-stop condition, not implicit design authority.
- `foundation-reviewer-fable5` performs independent review after live
  verification of the Fable 5 runtime, `max` effort, `/fable-sentinel`,
  independence, readiness, and non-overlap.
- On `NEEDS_PATCH`, the Advisor corrects only named foundation-docs findings and
  the same Reviewer performs delta-only re-review. Maximum two correction
  cycles. `PASS_WITH_RISK` or `FAIL` returns immediately to Leo/GPT.

## Strict exclusions

No product/control repository modification; no F1/F2/F3/C3/X1; no DB, schema,
migration, credential, authentication, consent adapter, transport, sender,
delivery, intake, endpoint, broker, network activation, candidate runtime,
production/live, Full Package 1B, or M3. No gate is closed automatically and no
implementation begins automatically.

## Final sequence

```text
read-only discovery
-> integrated closure-readiness package
-> independent full review
-> bounded document correction if required
-> same-Reviewer delta review
-> Advisor final audit
-> HARD STOP
-> one consolidated report to Leo/GPT
```

U1 remains OPEN absent explicit Founder + Security closure. U2 remains OPEN
absent explicit Founder + privacy/Security/Legal/Cosmile consent-authority
closure. U3 remains OPEN absent explicit Founder + Foundation
architecture/storage-authority closure.
