# P0 Estimate and Evidence Policy

MISSION_ID: `FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1`

## Estimate

| Bounded activity | Engineering workdays | Elapsed working days | Confidence |
|---|---:|---:|---|
| Admission, scope/evidence freeze, committed handoff | 0.25–0.5 | 0.25–0.5 | HIGH |
| Foundation-local P1 shallow static census | 1.5–3.0 | 1.0–2.0 | MEDIUM |
| Advisor integration and P2/P3 proposal | 0.5–1.0 | 0.5–1.0 | MEDIUM |
| Independent static challenge and bounded documentation closure | 0.75–1.5 | 0.5–1.0 | MEDIUM |
| **P0/P1 total** | **3.0–6.0** | **2.0–4.0** | **MEDIUM** |

External cash cost estimate for P0/P1: `$0`, excluding ordinary already-provisioned agent compute. No vendor, provider, credential, paid API, database, or runtime cost is authorized.

The estimate is not a P2/P3/P4 execution commitment. The integrated package will propose a separate outer envelope for later phases without authorizing them.

## Evidence policy

Every capability row must identify Foundation-local paths and use the following independent axes:

- `SOURCE`: `PRESENT | PARTIAL | ABSENT | UNKNOWN`
- `BUILD`: `VERIFIED | UNVERIFIED | NOT_APPLICABLE | UNKNOWN`
- `TEST`: `VERIFIED | PARTIAL | UNVERIFIED | NOT_APPLICABLE | UNKNOWN`
- `RUNTIME`: `VERIFIED | PARTIAL | UNVERIFIED | NOT_APPLICABLE | UNKNOWN`
- `INTEGRATION`: `VERIFIED | PARTIAL | UNVERIFIED | NOT_APPLICABLE | UNKNOWN`
- `AUTHORITY`: `AUTHORIZED | SHADOW_ONLY | DESIGN_ONLY | LEGACY | UNKNOWN`
- `TARGET_FIT`: `FIT | PARTIAL_FIT | NOT_FIT | UNKNOWN`

P1 may establish only source-grounded facts. Since execution is prohibited, `BUILD`, `TEST`, `RUNTIME`, and `INTEGRATION` remain `UNVERIFIED` unless a cited, immutable existing artifact proves the exact claim at the pinned Foundation HEAD. Historical docs or test source are not execution evidence.

## Required P1 domains

The shallow census must cover discoverable Foundation-local surfaces for:

- canonical product, brand, ingredient, claim, warning, safety, and provenance data;
- suitability/caution/hold/exclude judgment logic;
- search, routing, APIs, adapters, envelopes, schemas/migrations, jobs/scripts, configuration, deployment and monitoring surfaces;
- Memory shadow and commerce snapshot/export surfaces, explicitly separated from active commercial runtime;
- tests and fixtures as source inventory, not proof of execution;
- design-only, legacy, duplicate, dead, or unresolved surfaces.

## Later-probe proposal rule

P1 may propose, but must not execute, a small set of P2/P3 probes. Each proposal must state objective, exact Foundation-local target, command class, required runtime/data boundary, expected evidence, risk, cost, engineering effort, elapsed time, owner, dependencies, and stop conditions. Any dependency on another repository must remain an explicit unresolved cross-repository question; it may not be inspected in this mission.

## Correction bound

One full static review is required. A `NEEDS_PATCH` verdict may receive at most two finding-specific, documentation-only correction cycles by the original author, followed by the same Reviewer's delta-only review. `PASS_WITH_RISK`, `FAIL`, a third `NEEDS_PATCH`, or any need for P2+ execution returns to Strategy/Leo.

## Final states

- P0/P1 package: reviewed static decision evidence only.
- P2: `NOT_AUTHORIZED`
- P3: `NOT_AUTHORIZED`
- P4: `NOT_AUTHORIZED`
- implementation: `NOT_AUTHORIZED`
- next mission: `NOT_AUTHORIZED`
