# 87 Advisor AO12-D Visual Baseline Reconciliation

## Decision

`PROCEED_WITH_LIMITS`

The Worker correctly stopped when the configured composed-spec snapshot update
changed seven existing AO12-D images beyond the prior 19-image allowlist. Direct
Advisor inspection confirms that all seven paths are tracked assertions in
`tests/e2e-composed/application-office-scene.spec.ts` for the same authenticated
`LIVE` spatial-office projection. They cover desktop, tablet, narrow mobile,
mobile, 200-percent text, forced colors, and reduced motion.

The committed desktop representative still depicts the superseded card/grid
spatial dashboard rather than the reviewed living pixel-office renderer. These
are stale evidence surfaces, not a new product or test scope.

## Exact Additional Paths

```text
tests/e2e-composed/baselines/application-office-scene.spec.ts/ao12-d-authenticated/application-spatial-320x720.png
tests/e2e-composed/baselines/application-office-scene.spec.ts/ao12-d-authenticated/application-spatial-desktop-1440x900.png
tests/e2e-composed/baselines/application-office-scene.spec.ts/ao12-d-authenticated/application-spatial-forced-colors-1440x900.png
tests/e2e-composed/baselines/application-office-scene.spec.ts/ao12-d-authenticated/application-spatial-mobile-390x844.png
tests/e2e-composed/baselines/application-office-scene.spec.ts/ao12-d-authenticated/application-spatial-reduced-motion-1440x900.png
tests/e2e-composed/baselines/application-office-scene.spec.ts/ao12-d-authenticated/application-spatial-tablet-1024x768.png
tests/e2e-composed/baselines/application-office-scene.spec.ts/ao12-d-authenticated/application-spatial-text-200-percent-390x844.png
```

The final reconciliation allowlist is exactly 26 existing PNGs: 16 default
historical images, three top-level composed images, and these seven nested
AO12-D images.

## Binding Limits

- Do not change application source, CSS, fixtures, specs, Playwright config,
  screenshot thresholds, package versions, compiler settings, authority,
  authentication, or delivery behavior to make snapshots pass.
- Regenerate only from the reviewed current source under the configured local
  browser/font runtime.
- Inspect all 26 regenerated images and require all corresponding tests to pass
  again without update mode.
- Include all 26 image deltas and all eight regenerated prototype media files in
  the same independent Fable5 implementation/security/accessibility/visual
  review.
- This is prototype evidence reconciliation only. Full authenticated integration
  remains `DEFERRED_WITH_GATE`, and visual product acceptance remains Leo/GPT's.
