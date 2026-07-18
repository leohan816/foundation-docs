# Advisor Google Registration Checkpoint

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
CHECKPOINT: GOOGLE_AUTH_PLATFORM_REGISTRATION_REQUIRED_BEFORE_LOGIN
STATE: WAITING_FOR_LEO_GOOGLE_REGISTRATION_CONFIRMATION
GOOGLE_LOGIN_EXECUTED: NO
TOSS_EXECUTED: NO
PRODUCT_SOURCE_CHANGED: NO
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```

## Exact registration values

```text
AUTHORIZED_JAVASCRIPT_ORIGIN_IF_REQUIRED:
https://website-richmond-watch-planes.trycloudflare.com

AUTHORIZED_REDIRECT_URI:
https://website-richmond-watch-planes.trycloudflare.com/api/auth/google/callback
```

The redirect URI must be registered exactly. The JavaScript origin should be registered
only if the Google Auth Platform client configuration requires that field. No wildcard,
alternate path, HTTP origin, localhost substitute, or inferred hostname is acceptable.
The quick-tunnel hostname is ephemeral; if that mission tunnel restarts, a new hostname
must be returned and registered before any login attempt.

## Advisor validation

```text
PRODUCT_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
PRODUCT_HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab
PRODUCT_TRACKED_STATE: CLEAN
PRODUCT_UPSTREAM: ahead 0 / behind 0
WORKER_RESULT_PUBLISHED_BYTE_IDENTICALLY: YES
WORKER_POINTER_PUBLISHED_BYTE_IDENTICALLY: YES
ADVISOR_PUBLIC_SHOP_CHECK: 403 — DENIED
ADVISOR_CALLBACK_WITHOUT_STATE_OR_CODE: 400 — FAIL_CLOSED
```

The Worker's local request to `/api/auth/google/start` returned a locally constructed 302
and was not followed. It caused no outbound Google contact and obtained no authorization
code or token. The Advisor classifies this as a bounded local configuration-resolution
check, not a Google login execution. It must not be repeated before registration unless
needed after an exact tunnel change.

The preview gate was proven denying before tunnel start and again over HTTPS. The isolated
tmpfs PostgreSQL container, loopback-only Next process, mission tunnel, and canonical local
bundle remain alive only for this bounded registration wait. No secret value, provider
credential, cookie, subject, token, payment key, DB connection string, or PII is included
in this artifact.

## Dispatch monitoring

The Advisor submitted the exact Worker handoff with Enter, immediately verified acceptance
and active work, monitored the Actor through the checkpoint, and handled no capacity or
additional-safety prompt because none appeared. This operational evidence changes no scope.

## Resume condition

Google login remains blocked until Leo confirms that the exact values above are registered.
After confirmation, the existing mission authority permits the Advisor to resume the same
bounded runtime mission through official Google test execution, Toss TEST/sandbox evidence,
browser Golden Order and Golden Reversal, cleanup, independent review, and final audit.

