# Advisor Validation of Information-State Geometry Patch

## Verdict

- Patch commit: `ad147ecbecdddaea1966f7094837cf1272456af5`
- Base: `1ab8ad200338d90d230d8d4f3373fa9b73d549c9`
- Scope: exact information-state SVG/PNG only
- Geometry/content correction: `ACCEPTED`
- PNG export evidence: `NARROW_CORRECTION_REQUIRED`
- Worker: `NOT_AUTHORIZED`

Advisor directly verified the clean/upstream/direct-origin candidate, exact
two-file diff, unchanged SVG canvas `1200×920`, exact/fail-closed tokens, and the
corrected original-size content. The three reported overlap/overflow defects are
visually resolved and the SVG reflow is within the authorized boundary.

The regenerated PNG is `1200×920`, while the canonical mockup spec and prior
artifact require a 2x export at `2400×1840`. This is an export-evidence defect,
not a design or product defect. Sending it to Sentinel now would create an
avoidable review loop.

## Exact correction

Same Control must:

1. Keep the SVG byte-identical to `ad147ec`.
2. Re-export only `a1r-information-interaction-states.png` from that exact SVG
   at `2400×1840` (2x scale).
3. Inspect the 2x PNG at original size.
4. Verify the PNG signature/dimensions, the three geometry closures, unchanged
   hashes for every other mockup, exact one-path delta from `ad147ec`, and
   `git diff --check`.
5. Commit and non-force push the PNG-only correction.

No SVG, document, source, test, config, dependency, canvas, design, runtime, or
authority change is authorized. No runtime suite is required.
