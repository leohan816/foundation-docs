# Advisor CD-3 Prototype-Marker Non-Weakening Correction

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Decision: `REQUIRED_ROUTINE_CORRECTION_BEFORE_CANDIDATE_REVIEW`
- Product decision required: `NO`
- Security/authority change: `NO`

## Finding

The accepted CD-3 design requires all three markers below to be absent from the
authenticated eager/fallback and production Office built-output graphs:

- `SYNTHETIC PROTOTYPE`
- `PIXEL_PROTOTYPE_FIXTURE_ID`
- `fixtures/prototype-`

The current in-progress Worker change makes the production UI render an
authenticated eyebrow, but leaves the literal `SYNTHETIC PROTOTYPE` default in
the shared `living-office-hud.tsx`. The production bundle therefore still
contains the forbidden marker. Filtering that marker out of the CD-3 assertion
weakens the accepted gate and is not allowed.

## Required Correction

Restore the CD-3 assertion over all three exact markers. The production bundle
must actually exclude every marker; do not filter or exempt one.

Use the existing frame contract to carry a truthful eyebrow from the producing
projector rather than embedding a prototype default in the shared HUD:

1. Add a required `eyebrow` string to `PixelWorldFrameV1.hud` in
   `src/ui/pixel/contracts.ts`.
2. In the prototype-only `frame-projector.ts`, derive the prototype eyebrow from
   the prototype projection's `fixtureLabel` plus its existing visual-patch
   suffix. Do not add a direct production import edge to a prototype fixture.
3. In `production-frame-projector.ts`, set the authenticated Living Office
   eyebrow directly.
4. Make `living-office-hud.tsx` render `frame.hud.eyebrow`; remove its optional
   prototype default and the direct prototype marker literal.
5. Remove the production-scene eyebrow override that becomes redundant.
6. Preserve `prototype-entry.tsx` byte-for-byte and keep the existing prototype
   e2e visible-label expectation passing.
7. Keep the corrected graph-membership assertion for fixture imports; comments
   are not import edges.

All named source paths above are already in the closed Batch A source scope.
No additional path or product decision is introduced.

## Required Evidence

- CD-3 asserts all three exact markers are absent from production output;
- prototype e2e still renders the exact historical prototype eyebrow;
- production Office renders the authenticated eyebrow;
- typecheck, lint, focused HUD/prototype/CD-3 tests, and full regression pass;
- no skip, suppression, test filtering, or assertion weakening remains.

