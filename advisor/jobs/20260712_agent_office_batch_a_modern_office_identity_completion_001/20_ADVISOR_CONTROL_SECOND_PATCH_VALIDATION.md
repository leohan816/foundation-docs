# Advisor Validation - Control Second Design Patch

Status: `READY_FOR_SAME_SENTINEL_SECOND_DELTA_REREVIEW`

- Before: `60a5a720ca52ffdc3805318b4c40a61d0199b4b1`
- After: `77681d9ed5dae3567115082945508f8474308812`
- Exact delta: four existing design-document paths, `+108/-91`.
- Non-document source/test/package/config/media changes: zero.
- Branch/upstream: clean and equal.
- Control result: Foundation Docs commit
  `8a65e503bc31a4e84c15fe29cb96b018bf76e08a`.

Advisor directly inspected the result, exact diff, after snapshots, cited current
source, branch state, and upstream state.

Observed patch coverage:

- R1: `SESSION_PROCESS_UNKNOWN` is distinct from verified offline/no-process/
  process-detected facts; attached state is not readiness proof; non-sentinel
  runtime values require named accepted facts/cues.
- R2: display state is derived from the existing observable projector output,
  not directly from raw WorkUnit state; the exact projector output vocabulary
  maps fail-closed to `PixelOperationalState`.
- R3: stable registry data and changing evidence-derived facts have separate
  owners; changing facts are projection-time values; the operation is an exact
  full outer join on `roleInstanceId`; registry-only and evidence-only behavior
  is specified; the broken internal pointer is corrected.
- R4: broad top-level globs were replaced with named source/test/script paths,
  and the closed-scope amendment rule remains. The same Sentinel must decide
  whether phrases such as “asset files named by the handoff”, “new living-pixel
  baseline directories”, and any wildcard-pattern test reference are still too
  open to satisfy the exact closed-path requirement.

The patch preserves the accepted Office-first direction, secondary views,
eager-shell isolation, auth/authority/security/transport boundaries, symbolic
surfaces, Channy boundary, rollback, and Batch B-E exclusions.

This validation confirms scope and routing readiness. It does not claim R1-R4
review closure. Implementation remains unauthorized until the same independent
Sentinel returns a clean verdict.
