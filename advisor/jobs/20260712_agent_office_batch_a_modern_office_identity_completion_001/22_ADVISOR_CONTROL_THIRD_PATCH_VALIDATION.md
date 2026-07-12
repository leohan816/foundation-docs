# Advisor Validation - Control Third Patch Pre-review Hold

Status: `NEEDS_TARGETED_CONTROL_CORRECTION_BEFORE_SENTINEL`

- Candidate: `a39634d3a0b292f371db0051f5c25ff2abb2a513`
- Control result commit: `e3d0442406e0ca4331cea49d1aed8dcfe28f9a3a`
- Branch/upstream: clean and equal.
- Scope: four design documents only; no implementation change.

Advisor directly inspected the after snapshots before spending another
independent-review pass. S3's single-runtime-truth direction, STALE normalization,
R2 preservation, exact test names, and full result paths are substantially
corrected. The following deterministic defects remain visible and must be fixed
before routing to Sentinel.

## T1 - accepted-evidence identity and dedup are incomplete

The required input contract still omits `schemaVersion`, a stable `evidenceId`,
and an immutable artifact/evidence reference. `sourceEventIds` does not replace
record identity or the artifact that proves acceptance. The contract also does
not define duplicate-record handling or deterministic selection when multiple
valid same-kind records exist.

Required correction:

- add an exact schema-version literal;
- add immutable `evidenceId` and `evidenceRef` fields with exact formats;
- define equality/idempotency and duplicate collapse;
- define ordering/arbitration for multiple valid same-kind records, including
  same effective time and conflicting value cases;
- define observed/effective/expiry validation without using recency alone as
  proof;
- retain fail-closed conflict behavior and the current total runtime-state table.

## T2 - baseline and script scope is still deferred

The supposedly exact baseline path contains
`tests/e2e-composed/baselines/application-office-scene.spec.ts/<new-batch-a-subdir>`.
That is a placeholder, not a path. The application design also says the exact
`scripts/local-office-rehearsal.mjs` is allowed only “if named by the handoff,”
while the WorkUnit plan already names it.

Required correction:

- replace the placeholder with one literal directory name, for example
  `tests/e2e-composed/baselines/application-office-scene.spec.ts/batch-a-living-office/`;
- state `scripts/local-office-rehearsal.mjs` directly and consistently, without
  handoff deferral;
- ensure every summary/closure row uses the same literal paths.

## T3 - active historical closure rows contradict the final contract

The current application design still contains earlier closure rows stating
`sessionProcess -> SESSION_OFFLINE`, assigning changing facts to two committed
inputs, and describing incomplete prior R3 behavior as closed. These rows are
inside the active canonical design and can mislead the Worker.

Required correction:

- update or explicitly mark superseded every older P1/P3/R1/R3 closure row that
  conflicts with the final S1/S3 contract;
- the active document must have one unambiguous current rule:
  `SESSION_PROCESS_UNKNOWN` for missing/unverified process evidence, RT sole
  work truth, local attestations only for absent facts, no store-back;
- do not erase review history; label superseded descriptions as historical and
  point to the current section.

Preserve closed R2 and all accepted product, security, authority, accessibility,
fallback, rollback, Channy, no-Grok, excluded-session, and Batch B-E boundaries.
Patch the same four documents only. Implementation and independent review remain
unauthorized until this correction is validated.
