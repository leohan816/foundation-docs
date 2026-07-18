# Strategy Verification Policy — Delta-Only Default

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
SOURCE: Leo via foundation-strategy-sol
EFFECTIVE: IMMEDIATELY
AUTHORITY_EFFECT: VERIFICATION_POLICY_SUPERSESSION_ONLY
SCOPE_EXPANSION: NO
```

This policy supersedes the earlier current-mission instruction that preserved an automatic
full-repository-suite gate at final closure.

## Current rule

1. Every correction and implementation change is verified only with focused tests for the
   exact changed behavior and directly affected contracts.
2. The full repository test suite is not run by default, including at final mission closure.
3. A full-suite run is permitted only when:
   - Leo explicitly directs it; or
   - concrete evidence shows a material cross-cutting impact that cannot be bounded or
     validated by focused testing.
4. Before using the evidence-based exception, the Advisor must stop and return the exact
   evidence, affected surfaces, expected cost, and reason focused testing is insufficient
   through Strategy to Leo. The only exception to waiting is an immediate
   safety-preservation need.
5. Generic caution, habit, Reviewer preference, or final-gate language is not sufficient
   justification.
6. Independent Review examines the focused commands, changed paths, directly affected
   contracts, and resulting evidence without automatically rerunning the full suite.
7. Every verification record states why the selected focused commands are sufficient and
   why broader gates were omitted or, after explicit approval, added.

## Current preview-fix disposition

The preview hydration correction already completed independent review `PASS`. Its previously
completed full-suite run is historical evidence and will not be repeated. Publication is
complete, and the authorized browser checkpoint remains open pending
`PREVIEW_UNLOCK_CONFIRMED`. Google and Toss remain blocked until that confirmation.

