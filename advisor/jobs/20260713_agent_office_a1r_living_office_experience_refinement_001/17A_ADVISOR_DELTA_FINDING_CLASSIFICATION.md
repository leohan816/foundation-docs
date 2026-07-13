# Advisor Classification of Sentinel Delta Finding

## Decision

- Sentinel delta verdict: `NEEDS_PATCH`
- Advisor disposition: `PROCEED_WITH_LIMITS`
- Closed findings: `A1R-SDR-01`, `02`, `04`, `05`, `06`
- Open finding: `A1R-SDR-03__INFORMATION_LAYER_GEOMETRY_REGRESSION`
- Patch owner: same existing `foundation-control` session
- Patch class: one-SVG/one-PNG static layout correction
- New product or authority decision: `NOT_REQUIRED`
- Worker implementation: `NOT_AUTHORIZED`
- Same Reviewer focused re-check: `REQUIRED`

The Reviewer directly reproduced three layout defects in the changed
information-state asset:

1. Compact-label explanation and the quick-card WorkUnit label overlap by
   `15.17 × 11` design pixels.
2. Quick-card model/effort content leaves the card by `39.84` design pixels and
   crosses the `click` transition marker.
3. Pinned-card model/effort content leaves the card by `29.84` design pixels.

These are bounded visual-contract/accessibility defects. They do not require a
new product decision, runtime work, authority change, or reopening the five
closed findings.

## Exact correction boundary

Control may change only:

- `docs/ui/a1r/mockups/a1r-information-interaction-states.svg`
- `docs/ui/a1r/mockups/a1r-information-interaction-states.png`

The canvas dimensions must remain unchanged. Reflow or split text rather than
shrinking it below the established readable size. A recommended representation
for the exact model/effort value is two contained rows:

- `모델 · claude-opus-4-8`
- `노력 · ULTRACODE`

Control may choose an equally readable contained layout, but must preserve the
exact source tokens. It may move the transition labels and the compact-label
explanation within the same canvas to eliminate collision.

Control must preserve:

- exact `claude-opus-4-8` and `ULTRACODE` tokens;
- fail-closed unknown values;
- blocker/Leo content;
- non-authoritative example watermark;
- Team text and all progressive-disclosure layers;
- critical overlay contract and icon+text meaning;
- mobile/advisor sheet, role-animation, and all five closed finding contracts;
- all runtime, authority, routing, delivery, recovery, and Batch B-E boundaries;
- byte-identical desktop, mobile, Pod, and Channy assets.

## Proportional verification

Control must:

- inspect the corrected PNG at original size;
- run a Chromium or equivalent SVG geometry probe proving the three measured
  overlaps/overflows are zero;
- check canvas overflow and adjacent label/card collisions in the changed SVG;
- verify unchanged hashes for the other three previously changed PNGs and the
  unchanged Channy asset;
- run `git diff --check` and exact changed-path checks;
- commit and non-force push only the design branch and exact result/pointer.

Do not run runtime unit, E2E, build, server, or full design-review suites. After
Advisor validates the exact two-file delta, the same Sentinel re-checks only
`A1R-SDR-03` and direct visual regressions.
