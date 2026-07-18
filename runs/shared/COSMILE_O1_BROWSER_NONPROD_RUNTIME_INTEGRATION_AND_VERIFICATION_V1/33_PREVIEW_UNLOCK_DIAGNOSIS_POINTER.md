# Pointer — Preview-Unlock Bounded Diagnosis and Correction

```text
POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: PREVIEW_UNLOCK_BOUNDED_DIAGNOSIS
RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/33_PREVIEW_UNLOCK_DIAGNOSIS_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/33_PREVIEW_UNLOCK_DIAGNOSIS_POINTER.md
RUNTIME_REPO: /home/leo/Project/Cosmile
RUNTIME_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
RUNTIME_COMMIT_STATUS: committed 62c468e9906acac0a6f61a9ca4f7108e790c4d06 (additive; parent d5c762f)
PUSHED: NO (ahead 1 / behind 0) — awaiting Advisor validation + independent delta review
RETURN_TO: Advisor
NEXT_ACTOR: Advisor
GOOGLE_LOGIN: BLOCKED · TOSS: BLOCKED
```

## Anchors verified

```text
HANDOFF @ 2d9495ff / blob 63d6efff / sha256 a561e6b9…    VERIFIED
FAILURE RECORD      / blob 0b9480c5 / sha256 1f5656ca…   VERIFIED
```

## Review delta

```text
git diff d5c762f..62c468e     2 files · +56 / -8
  app/src/app/preview/page.tsx                        (correction)
  app/scripts/o1_browser_runtime_contract.vitest.ts   (regression oracles)
Both inside handoff 38's correction boundary. No other product path, schema, migration, dependency,
configuration, redesign, or behavior touched.
```

## Root cause (reproduced)

```text
The gate mirrored the password field into React state and gated the control on it:
    disabled = (state === "checking") || secret.length === 0
    body     = JSON.stringify({ secret })
A password manager, autofill, or paste path can populate the DOM value WITHOUT a React-observable change event,
so the state stayed empty while the field was visibly full => "계속" stayed grey, and a submit would have
carried the stale empty value. Both failure modes trace to trusting a React copy instead of the field itself.
```

## Correction

```text
· field UNCONTROLLED with name="secret" — DOM field is the single source of truth
· submit reads the LIVE value via new FormData(form).get("secret")
· isSubmitDisabled(state) gates ONLY on the in-flight "checking" state (double-submit guard kept)
· empty input handled by a submit-time guard, not by disabling the control
· form reset after success; the secret never enters React state at all
```

## Evidence

```text
focused contract suite   45 passed (was 42; +3 targeted at this defect)
full suite               25 files · 597 passed · 7 skipped (prior 594/7; no count decreased)
tsc --noEmit 0 errors · next build PASS · eslint on changed paths 0 errors
live browser (placeholder only, no secret): FormData-readable field TRUE · Continue enabled at rest TRUE ·
  after a DOM-only populate emitting NO React event, Continue REMAINS ENABLED TRUE  <-- was FALSE before
structural oracle: isSubmitDisabled.length === 1 — no secret value can gate enablement; reintroducing a
  secret parameter fails the test
```

## Open item the Advisor must weigh

```text
NOT CONFIRMED: the visible denied state after submitting a wrong placeholder did not render within the 3s wait
in my final run. I am not claiming it as proven. Likely an insufficient wait right after an app restart (cold
API-route compile through the tunnel) rather than a product failure — but unverified, and I stopped probing per
the directive. The server-side 401 path is independently proven by earlier curl evidence and the contract suite.
Recommend treating "denied state renders" as OPEN until the next authorized browser step observes it.
```

## Disclosed self-correction

```text
My first diagnosis ("popup-only, do not patch") was WRONG and the Advisor was right to reject it. I over-read
partial evidence — I saw the popup overlay intercept a click and stopped before proving that dismissing it
restored submission. Leo's follow-up (popup dismissed, button still grey while populated) disproved it.
The shipping popup is a real but separate, dismissible condition; app/src/app/layout.tsx is outside the
correction boundary, so it was deliberately NOT patched.
```

## Containment

```text
GOOGLE LOGIN not started · TOSS no call · OPERATOR SUBJECT not captured
real secret NOT used in the final verification · no secret/identifier in source, output, or evidence
no Playwright trace/video/HAR created · all mission diagnostic scripts removed (0 remain)
owner-only operational helpers retained · unrelated processes/containers/tunnels/files preserved
mission runtime ALIVE (db · loopback app restarted with the fix · tunnel · retained bundle)
tunnel hostname UNCHANGED and still equal to the value Leo registered
```

```text
NEXT AUTHORIZED STEP: none until the Advisor validates this result and any required review gate passes.
Suggested user step afterwards: retry the unlock; dismiss the shipping popup if it covers the form, then enter
the key — Continue is now active regardless of how the field was populated.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
STOP
```
