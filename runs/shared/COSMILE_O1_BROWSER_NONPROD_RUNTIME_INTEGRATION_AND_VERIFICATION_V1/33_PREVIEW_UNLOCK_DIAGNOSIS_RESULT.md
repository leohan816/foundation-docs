# Cosmile Worker Result — Preview-Unlock Bounded Diagnosis and Correction

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: PREVIEW_UNLOCK_BOUNDED_DIAGNOSIS
ROLE_ACTOR: Cosmile repository-owner Worker
SKILL: /fable-builder
OUTCOME: PRODUCT DEFECT REPRODUCED AND CORRECTED (additive candidate commit, not pushed)
GOOGLE_LOGIN: BLOCKED · TOSS: BLOCKED
RETURN_TO: foundation-advisor
```

## 1. Anchors verified

```text
HANDOFF_COMMIT: 2d9495ff1d7ef0ac71669efd0b59c28791ea85c7
HANDOFF_BLOB: 63d6efff67076f9bae4760aab6d69c3c15573970                               VERIFIED
HANDOFF_SHA256: a561e6b9e26e4699b59834f8715d13e97833287f03409c5e8d84fb5e21251765     VERIFIED
FAILURE_RECORD_BLOB: 0b9480c5efb1c94472d276cc44d89554a5fc0625                        VERIFIED
FAILURE_RECORD_SHA256: 1f5656ca7b7afae1ca821a9753b0ccb1afc44e9282a8a7ea2dceff796318d14c  VERIFIED
LIVE BINDING: exact worktree · branch · HEAD pin d5c762f at start · upstream 0/0 · clean ·
              Opus 4.8 (1M) · Leo max effort · /fable-builder · pane sync OFF · xtrace OFF
```

## 2. Candidate chain

```text
d5c762f  (start of this phase)
  └─ 62c468e9906acac0a6f61a9ca4f7108e790c4d06   THIS correction (additive; +56 / -8; 2 files)
REVIEW_DELTA: git diff d5c762f..62c468e
PUSHED: NO (ahead 1 / behind 0)
CHANGED PATHS (both inside handoff 38's correction boundary):
  app/src/app/preview/page.tsx
  app/scripts/o1_browser_runtime_contract.vitest.ts
NO other product path, schema, migration, dependency, or configuration touched.
```

## 3. Correction of my own earlier conclusion — disclosed

My first diagnosis concluded "popup-only, no patch". **That conclusion was wrong**, and the Advisor was right to
reject it. I over-read partial evidence: I observed the shipping-popup overlay intercepting a click and stopped
before proving that dismissing it restored submission. Leo then confirmed that with the popup dismissed the
Continue button was still grey while the key was visibly populated — which the popup theory cannot explain.
The real defect is the input/state mismatch below. The popup is a real but *separate* and dismissible condition.

## 4. Reproduced root cause

The gate used a CONTROLLED password input mirrored into React state, and gated the control on that state:

```text
disabled = (state === "checking") || secret.length === 0        // secret = React state
body     = JSON.stringify({ secret })                            // the same React state
```

A password manager, browser autofill, or a paste path can set the DOM field's value **without emitting a
React-observable change event**. React's `secret` therefore stays empty while the field is visibly full, so:

```text
· "계속" stays disabled  -> exactly Leo's "cannot be activated / grey while populated"
· and had it been submitted, the request would have carried the STALE EMPTY value, not the typed key
```

Both failure modes come from the same mismatch: the control and the payload trusted a React copy of the field
instead of the field itself.

## 5. Correction applied (smallest, exactly as directed)

```text
· the field is UNCONTROLLED with name="secret" — the DOM field is the single source of truth
· submit reads the LIVE value: new FormData(form).get("secret")  — never a React-held copy
· isSubmitDisabled(state) gates ONLY on the in-flight "checking" state (double-submit guard retained)
· emptiness is handled by a submit-time guard instead of disabling the control
· the form is reset after a successful unlock so the value does not linger in the DOM
· the secret no longer enters React state at all (a strict improvement in exposure)
```

## 6. Evidence

```text
focused contract suite      45 passed   (was 42; +3 written specifically for this defect)
full suite                  25 files · 597 passed · 7 skipped   (prior 594/7; no count decreased)
tsc --noEmit                0 errors
next build                  PASS
eslint (changed paths)      0 errors

LIVE BROWSER (restarted runtime, clean context, PLACEHOLDER input only — no secret used):
  field is FormData-readable (name="secret")                       TRUE
  Continue enabled at rest (not gated by input state)              TRUE
  after a DOM-only populate emitting NO React event:
      Continue REMAINS ENABLED                                     TRUE   <-- FALSE before this fix
```

Regression oracles added to the allowlisted contract suite:

```text
· enabled in every non-checking state (idle / denied / error)
· disabled only while a check is in flight
· STRUCTURAL: isSubmitDisabled.length === 1 — the predicate accepts only the request state, so no secret value
  (stale or fresh) can ever participate in the enable decision. Reintroducing a secret parameter fails this test.
```

### NOT CONFIRMED in that browser run — stated plainly

```text
The visible "접근이 거부되었어요" denied state after submitting a wrong placeholder did NOT appear within the
3s wait in my final verification run. I am NOT claiming it as proven. Most likely cause is an insufficient wait
immediately after an app restart (cold compile of the API route through the tunnel), not a product failure —
but I did not verify that, and per the directive I stopped probing rather than run another check.
The server-side 401 path itself IS independently proven: an earlier phase recorded a 401 for a wrong secret and
a 200 + httpOnly cookie for the exact secret over HTTPS, and the contract suite covers the gate predicate.
Recommend the Advisor treat "denied state renders" as OPEN until the next authorized browser step observes it.
```

## 7. Shipping popup — separate condition, deliberately NOT patched

```text
src/components/ShippingPopup.tsx renders from the ROOT LAYOUT on every page including /preview, auto-opens via
useEffect when no localStorage suppression exists, and its overlay is position:absolute; inset:0; z-index:30 —
so on a first visit it does sit over the gate form and intercepts pointer events (directly observed).
It is dismissible by its own Close button, "오늘 하루 보지 않기", or an overlay click.
app/src/app/layout.tsx is OUTSIDE the correction boundary, so no change was made. If the Advisor wants the gate
page excluded from storefront chrome, that requires a separate exact authorization.
```

## 8. Containment

```text
PRODUCT PATHS CHANGED: 2 (both allowlisted) · COMMITS: 1 additive · PUSHED: NO
SCHEMA / MIGRATION / DEPENDENCY / CONFIG / REDESIGN: NONE
GOOGLE LOGIN: not started · TOSS: no call · OPERATOR SUBJECT: not captured
SECRET: never printed, hashed, logged, or embedded; the real secret was NOT used in the final verification
PLAYWRIGHT TRACE / VIDEO / HAR: none created (0 artifacts)
MISSION DIAGNOSTIC SCRIPTS: all removed (0 remain); only the owner-only operational helpers are retained
UNRELATED PROCESSES / CONTAINERS / TUNNELS / FILES: preserved
MISSION RUNTIME: db, loopback app (restarted with the fix), tunnel, retained bundle — all ALIVE
TUNNEL HOSTNAME: unchanged, still equal to the value Leo registered
```

## 9. Stop state

```text
STATE: correction delivered as an additive candidate; awaiting Advisor validation and independent delta review.
GOOGLE LOGIN AND TOSS REMAIN BLOCKED until the Advisor validates this result and any required review gate passes.
NEXT SUGGESTED USER STEP (only after Advisor validation): retry the preview unlock; if the shipping popup is
covering the form, dismiss it first, then enter the key — the Continue button will now be active regardless of
how the field was populated.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
