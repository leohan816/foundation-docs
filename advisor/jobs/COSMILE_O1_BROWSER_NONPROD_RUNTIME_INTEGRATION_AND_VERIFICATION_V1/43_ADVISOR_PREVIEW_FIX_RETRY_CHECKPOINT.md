# Advisor Preview-Fix Retry Checkpoint

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
RECORDED_AT_UTC: 2026-07-18T19:57:52Z
PREVIEW_FIX_HEAD: 62c468e9906acac0a6f61a9ca4f7108e790c4d06
PREVIEW_FIX_PUSHED_UPSTREAM_EQUAL: YES
INDEPENDENT_DELTA_REVIEW: PASS
OPEN_BLOCKING_FINDINGS: 0
PREVIEW_RUNTIME: ALIVE
TUNNEL_HOSTNAME_CHANGED: NO
GOOGLE_LOGIN: BLOCKED_PENDING_PREVIEW_CONFIRMATION
TOSS: BLOCKED_PENDING_PREVIEW_CONFIRMATION
```

## Exact safe retry instruction for Leo

Open the existing restricted preview URL, perform one hard refresh, dismiss the shipping
popup if it is visible, enter the protected preview key, and click **Continue**. The button
must now remain enabled even when the browser populated the field without a React input
event.

Return only:

```text
PREVIEW_UNLOCK_CONFIRMED
```

Do not send the protected key or any identifier. If the button is still disabled, report
only the visible button state and whether the field appears populated; Google/Toss remain
blocked.

## Evidence anchors

- Worker correction commit: `62c468e9906acac0a6f61a9ca4f7108e790c4d06`
- Old independently reviewed head: `d5c762fcf4029f7027daad02a18ffae43e62e5ab`
- Changed paths: `app/src/app/preview/page.tsx` and
  `app/scripts/o1_browser_runtime_contract.vitest.ts` only.
- Independent review result SHA-256:
  `8d6a9263fbd7a2e301528591f31da0b5c3c2e93fba1db22aa586f111283401b6`
- Independent review pointer SHA-256:
  `70855be202bc3c31eeb9407efaa5d6e99fe15c39f15f06a218cb04bb845e8431`
- Independent gates: focused `45/45`; full suite `597 passed / 7 skipped`;
  TypeScript `0` errors; changed-path lint PASS; non-production build PASS.
- Reviewer collision check: no simultaneous active review; the preceding Foundation P1
  output was completed scrollback before the Cosmile prompt was accepted.

