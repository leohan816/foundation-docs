# 89 Advisor Evidence Verifier Reconciliation

## Decision

`PROCEED_WITH_LIMITS`

The final Worker run proved every code, browser, accessibility, performance,
media, and visual gate through direct inspection, then correctly stopped at
`scripts/verify-living-pixel-prototype-evidence.mjs`. Direct Advisor inspection
confirms that its historical-baseline rule predates and contradicts the exact
26-path reconciliation authorized in artifacts 83, 85, and 87.

This is a technical evidence-contract correction. It introduces no new product,
visual, runtime, security, authority, or integration decision.

## Exact Authorized Script Change

Only `scripts/verify-living-pixel-prototype-evidence.mjs` may be additionally
changed. Replace the broad historical prefix rule with an exact path contract:

- enumerate the exact 13 living-prototype PNG paths already present under
  `tests/e2e/baselines/living-pixel-prototype.spec.ts/`;
- enumerate the exact 16 default historical PNG paths authorized by artifact 83;
- enumerate the exact three top-level composed PNG paths authorized by artifact 85;
- enumerate the exact seven nested AO12-D PNG paths authorized by artifact 87;
- reject every changed, staged, or untracked baseline path outside that exact
  39-path set;
- require all 13 living-prototype PNGs to exist as the exact filesystem set;
- require all 26 reconciled historical/composed PNGs to be changed from the
  design base when the final verifier runs;
- keep all existing artifact, duration, dimension, pin, production-bundle,
  listener, and evidence-output checks unchanged.

The script must remain fail-closed before and after staging. No bypass, warning-
only behavior, generic directory prefix, wildcard expansion, test filtering, or
environment escape hatch is allowed.

## Completion Boundary

The Worker may reapply the previously reviewed candidate, regenerate exactly the
same 26 PNGs and eight media artifacts, run the complete train, and commit/push
only if the corrected verifier passes. Fable5 must independently inspect the
verifier diff and prove that it accepts only the exact authorized evidence set.

Full authenticated integration remains `DEFERRED_WITH_GATE`. Prototype visual
acceptance remains Leo/GPT's.
