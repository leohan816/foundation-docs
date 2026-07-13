# Advisor Office-First Visual Baseline Reconciliation

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Decision: `PROCEED_WITH_NON_DESTRUCTIVE_BASELINE_RECONCILIATION`
- Product decision required: `NO`
- Reason: Office-first navigation is an already approved Batch A delta.

## Confirmed Conflict

The pre-Batch-A composed screenshots capture a Dashboard-first full page without
the new persistent Office/Technical-dashboard navigation. Batch A explicitly
makes Living Office the primary authenticated surface and preserves the old
technical views as secondary views. The current full page therefore cannot be
pixel-identical to the historical Dashboard-first page.

The closed scope separately requires:

- no existing/historical baseline file is edited; and
- new Batch A baselines use the exact new directories named in design section 9.

These rules are compatible when historical artifacts are preserved as history
and the already authorized Office-first delta gets new evidence.

## Required Interpretation

1. Do not edit, regenerate, move, rename, or delete any existing file under:
   `tests/e2e-composed/baselines/application-office-scene.spec.ts/` except for
   adding files below its exact new `batch-a-living-office/` child directory.
2. Verify every pre-existing historical baseline is byte-identical to the file at
   reviewed base `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`.
3. Update `tests/e2e-composed/application-office-scene.spec.ts` so login asserts
   the Office-first surface and navigation, then explicitly selects `Technical
   dashboard` before testing the preserved technical/control views.
4. Do not compare the changed Office-first full page to an old Dashboard-first
   filename. Current screenshots belong only under the new exact directory:
   `tests/e2e-composed/baselines/application-office-scene.spec.ts/batch-a-living-office/`.
5. Create/use `tests/e2e/living-pixel-office.spec.ts` and its exact new baseline
   directory `tests/e2e/baselines/living-pixel-office.spec.ts/` for the primary
   Office desktop/mobile/reduced-motion/static/actor-drawer evidence required by
   the accepted design.
6. Existing historical files remain visible evidence of the prior accepted UI;
   current semantic tests prove secondary technical views remain reachable and
   functional. Do not silently skip those checks.
7. Record the old-baseline byte comparison and all new artifact paths in the
   Worker result.

## Forbidden

- overwriting an old baseline with the new shell;
- deleting old screenshot assertions without replacement semantic coverage;
- treating Office-first as an unapproved product change;
- weakening accessibility, mobile, reduced-motion, static, or secondary-view
  checks;
- writing any baseline outside the two exact new directories.

## Completion Evidence

- old baseline diff against `ac8ba75` is empty;
- composed E2E proves Office-first default and technical-dashboard navigation;
- fresh Batch A screenshots exist only in the two exact new directories;
- desktop/mobile/reduced-motion/static/drawer/secondary-view gates pass;
- full regression remains green.

