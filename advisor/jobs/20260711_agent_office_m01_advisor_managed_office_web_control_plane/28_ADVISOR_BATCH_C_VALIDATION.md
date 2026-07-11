# Advisor Batch C Validation

## Verdict

`NEEDS_PATCH__FINAL_CODE_AND_COMMITTED_VISUAL_BASELINES_DIVERGE`

Batch C is not accepted as the Batch D dependency yet.

## Direct Verification

- Target branch and upstream both resolve to
  `6d53b493652c5e149d0ebfc2b2e6163b08986b24`.
- Lint, strict typecheck, 27 Vitest files / 123 tests, and the production build
  passed under direct Advisor execution.
- The structured result-return projection accepts only the statically verified
  `SceneResultEvidenceProjection` type, and the accepted event, result path, and
  pointer path are checked before rendering `RETURNING_RESULT`.
- Playwright started successfully after the prior Worker browser process exited.
- Seven of ten Playwright checks passed, including axe A/AA automation, live
  regions, no-overlap geometry, tablet/mobile reflow, safety-state rendering,
  keyboard focus, and 44px controls.
- All three committed screenshot comparisons failed:
  - desktop: 44,206 pixels / 4 percent;
  - mobile: 22,409 pixels / 7 percent;
  - reduced motion: 43,159 pixels / 4 percent.

## Root Cause

The baseline images were created in commit `22baff7`, while the later effective
Batch C code commit `e30a6cd` intentionally changed static and animated scene
cues. The baseline images were not updated in that later commit. Direct visual
inspection shows the received images are coherent with the intended final cue
changes, but the committed test evidence does not describe the effective code.

The Worker result's claim that the final ten Playwright tests passed is therefore
not reproducible from the pushed final commit. This is a test-evidence and
as-built baseline defect, not an accepted environment variance.

## Required Patch

The same Agent Office Worker session must:

1. re-read the effective Batch C code and this validation;
2. regenerate exactly the three approved deterministic baselines from the final
   code and current authorized Chromium/UTC/Korean-locale test configuration;
3. inspect the regenerated desktop, mobile, and reduced-motion images directly;
4. reject overlap, clipping, unreadable text, wrong cue destination, or missing
   structured state rather than blindly accepting snapshots;
5. run `npm run test:e2e` sequentially and obtain 10/10 pass;
6. rerun lint, strict typecheck, 123-test unit/integration suite, build, audit,
   and boundary checks;
7. commit and push only the three baseline images plus materially necessary
   as-built evidence changes; and
8. publish a corrected Batch C result and pointer.

No product-source change is authorized by this rework. If direct visual review
finds a product code defect, STOP and return it to Advisor without changing code.

## Status

`BATCH_C_REWORK_REQUIRED__BATCH_D_NOT_AUTHORIZED`
