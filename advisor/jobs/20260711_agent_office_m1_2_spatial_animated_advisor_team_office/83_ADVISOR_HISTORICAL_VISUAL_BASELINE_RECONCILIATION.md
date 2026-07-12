# 83 Advisor Historical Visual Baseline Reconciliation

## Decision

`PROCEED_WITH_LIMITS`

The second Worker stop is valid. Direct comparison confirms the 16 required
historical screenshots are stale relative to the already approved current
source at Agent Office base `56385b8`:

- the current source and rendered labels use the required current product name
  `SIASIU`;
- the old M1 baseline still displays the forbidden current name `Shashu`;
- the source, CSS, tests, and these baseline bytes are unchanged between the
  reviewed technical M1.2 base `48c8dbd` and current `56385b8`; and
- the configured browser renders the current reviewed source, while the old
  images encode an earlier scene state.

This is a stale evidence defect, not authority to change product behavior.

## Exact Authorized Reconciliation

Regenerate only the 16 PNGs already present under these exact directories:

```text
tests/e2e/baselines/office-scene.spec.ts/
tests/e2e/baselines/spatial-office-accessibility.spec.ts/
tests/e2e/baselines/spatial-office-motion.spec.ts/
tests/e2e/baselines/spatial-office-static.spec.ts/
```

The exact file list must remain the 16 paths enumerated by the current tree. No
new historical-baseline path may be added.

## Mandatory Safeguards

- Generate from the current approved source using the configured deterministic
  Playwright runtime only.
- Do not change source, CSS, fixture data, test logic, screenshot thresholds,
  browser configuration, package versions, compiler settings, or accessibility
  expectations to make an image pass.
- Before staging, directly inspect all 16 regenerated images and compare them
  with their prior bytes. Record every meaningful visual difference.
- Current UI and every regenerated baseline must use `SIASIU`; current `Shashu`
  variants are forbidden.
- Run the complete unfiltered default browser train after regeneration. It must
  pass without snapshot-update mode.
- Fable5 must independently inspect the exact 16-image delta and reject any
  accepted regression, missing object, overlap, clipping, unreadable content,
  semantic mismatch, accessibility loss, or unsupported state.
- The baseline reconciliation and prototype correction must be one reviewable
  candidate; no baseline-only final approval is implied.

## Authority Boundary

This technical evidence reconciliation follows the existing founder-approved
SIASIU naming rule and current reviewed M1.2 source. It introduces no new
product policy and does not authorize visual acceptance, authenticated/full
integration, production, remote exposure, or final approval.
