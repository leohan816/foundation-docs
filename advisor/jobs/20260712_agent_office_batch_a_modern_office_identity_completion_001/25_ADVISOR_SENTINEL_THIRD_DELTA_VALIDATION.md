# Advisor Validation - Sentinel Third Delta NEEDS_PATCH

Sentinel verdict: `NEEDS_PATCH`

- Result commit: `266720130c5e6fcbdfebecadd770d03f2fd60176`
- Pointer commit: `467ceb9794d0fd3cbff5e2f5b6476a5f66721f14`
- Candidate: `5f8ffd102f8344c5b34e1d97f00cdca578871c3c`

Advisor accepts U1-U3 as exact, technically patchable documentation defects.
S3 and T3 are closed; R2 remains closed. No new Founder decision, authority,
security boundary, or implementation scope is required.

## U1 - total cross-kind process arbitration

After validation, expiry removal, and exact replay/collision handling, evaluate
all contributing process records for one `roleInstanceId` across
`process_offline`, `process_absent`, and `process_detected`:

- none: `SESSION_PROCESS_UNKNOWN`;
- records from exactly one distinct process kind: map to that kind's process
  state after its deterministic same-kind selection;
- records from two or three distinct process kinds, regardless of unequal or
  equal `effectiveFrom`: `SESSION_PROCESS_UNKNOWN` plus a conflict diagnostic.

This conservative rule is input-order independent, does not treat recency as
proof, covers missing/single/multiple/tie/expiry cases, and places cross-kind
conflict before downstream `aiRuntimeState` arbitration.

## U2 - unequal-content evidenceId collision

- Define canonical equality over every contract field.
- Repeated records with the same `evidenceId` and identical canonical content
  are idempotent replays and collapse to one.
- If any record sharing an `evidenceId` differs in any contract field, reject all
  records with that id, emit one collision diagnostic, and let affected fields
  fail closed. Never keep first/last.
- The result must be input-order independent.

## U3 - literal documentation write paths

Replace “the four Batch A documentation paths” in every writable-scope location
with these exact repository-relative paths:

- `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md`
- `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md`
- `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md`
- `docs/FEATURE_INDEX.md`

No descriptive class may remain in the active source allowlist or BA-WU-08.

Patch only the same four design documents and Control result/pointer. Preserve
all closed items and boundaries. Implementation remains unauthorized pending
same-Sentinel delta PASS.
