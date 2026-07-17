# Foundation Worker Handoff — Snapshot Export and Local File Bundle

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: FOUNDATION-O1-SNAPSHOT-EXPORT-1
ACTOR: foundation Worker
SESSION: foundation
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
ROLE: Foundation repository-owner Worker
RETURN_TO: foundation-advisor
```

## Required reads

Read current Agent Office operating model, Worker role, run/result protocols, FOUNDATION
`AGENTS.md`, `CLAUDE.md`, security/testing policies, this exact committed handoff, and these pinned
design artifacts:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/50_FOUNDATION_BOUNDED_SNAPSHOT_DELIVERY_DESIGN.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/71_CONTROL_FOUNDATION_DELIVERY_DELTA_COMPLETION.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/90_INDEPENDENT_DESIGN_REVIEW.md`
- `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/00_ADMISSION_AND_AUTHORITY_RECORD.md`

## Exact repository gate

```text
REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-foundation-snapshot-v1-20260717
START_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
UPSTREAM: MAY_BE_UNSET_BEFORE_REVIEW
```

Stop on any mismatch or unexpected tracked/untracked state.

## Authorized implementation

Implement the reviewed deterministic Foundation-side contract and versioned non-production local
file bundle only:

- immutable snapshot identity and seven-field superset pins;
- canonical deterministic serialization and `snapshot_content_sha256`;
- sequenced manifest, notices, correction/supersession/withdrawal, gap guard, replay and
  idempotency behavior;
- approval/gate inputs with default-deny behavior;
- optional category-only acknowledgement representation;
- asynchronous file-bundle export only — no endpoint, network, sender, broker, service, or
  production transport;
- tests proving determinism, tamper failure, unapproved count zero, duplicate no-op,
  supersession resolvability, withdrawal containment, gap blocking, and historical-pin
  resolvability;
- one module design document and design index update required by FOUNDATION rules.

The canonical vault is read-only. Do not create or modify `approval.yaml`, `_rights.yaml`,
`coverage.yaml`, source checksums, product records, or any canonical gate facts. Tests use
synthetic fixtures only. Real ELT records with unresolved gates remain non-deliverable.

## Exact allowed product paths

```text
foundation/cosmile/commerce_snapshot/__init__.py
foundation/cosmile/commerce_snapshot/contract.py
foundation/cosmile/commerce_snapshot/exporter.py
foundation/cosmile/commerce_snapshot/file_bundle.py
foundation/tests/test_cosmile_commerce_snapshot.py
설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md
설계문서/README.md
```

If another product path is necessary, stop and return the exact necessity. Do not broaden the
allowlist yourself.

## Verification and completion

- Inspect commands before execution; no dependency installation, external network, DB, secret,
  PII, provider, live, or production action.
- Run focused tests and applicable existing Foundation import/regression tests only when they are
  proven local and non-mutating.
- Record exact commands, protected contracts, results, and pre/post Git state.
- Stage only the seven allowed paths. Create one local candidate commit without amend/rebase.
- Do not push before independent review.
- Write only:
  - `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/10_FOUNDATION_SNAPSHOT_EXPORT_RESULT.md`
  - `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/10_FOUNDATION_SNAPSHOT_EXPORT_POINTER.md`
- Do not commit foundation-docs; Advisor publishes evidence.
- Return pointer to Advisor and STOP. Do not dispatch Reviewer or another actor.

## Strict exclusions

No vault write, price/stock/order/customer ownership, Foundation AI, Memory V3, SIASIU, endpoint,
network delivery, DB/schema/migration, secret, production/live, public exposure, Legal conclusion,
approval grant, risk acceptance, or next work unit.
