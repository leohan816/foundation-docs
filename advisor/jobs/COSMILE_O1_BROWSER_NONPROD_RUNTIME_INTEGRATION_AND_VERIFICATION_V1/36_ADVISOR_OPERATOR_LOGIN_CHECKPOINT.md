# Advisor Operator Google Login Checkpoint

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
CHECKPOINT: OWNER_INTERACTIVE_OPERATOR_GOOGLE_LOGIN
STATE: WAITING_FOR_LEO_OPERATOR_GOOGLE_LOGIN
NEW_AUTHORITY_REQUIRED: NO
PRODUCT_SOURCE_CHANGED: NO
```

The registered tunnel hostname remains exact. The isolated runtime, database, bundle, and
preview gate remain alive and contained. Pre-login counts are all zero:

```text
AUTH_IDENTITY_TOTAL: 0
AUTH_IDENTITY_GOOGLE_ISSUER: 0
CUSTOMER_ACCOUNT: 0
EMPTY_TABLE_OPERATOR_FIRST_PRECONDITION: PASS
```

The first official Google test login must therefore use the dedicated non-personal operator
account. The owner-only helper is a regular file owned by `leo:leo`, mode `0700`; it has not
been executed by the Worker or Advisor. It refuses ambiguous counts and transfers the
subject directly into `owner.env` without displaying or retaining it elsewhere.

## Exact Leo interaction

1. Open `https://website-richmond-watch-planes.trycloudflare.com/preview` and unlock the
   preview using the local `COSMILE_O1_PREVIEW_ACCESS_SECRET` from the protected owner
   environment. Do not transmit or print the value.
2. In the same browser session, open
   `https://website-richmond-watch-planes.trycloudflare.com/api/auth/google/start` and sign
   in with the dedicated operator test account only. Do not use the customer or a personal
   account.
3. Run as Leo:
   `/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/bootstrap_operator_subject.sh`
   Expected final category: `OPERATOR_SUBJECT_BOOTSTRAP_COMPLETE`.
4. Run as Leo:
   `/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/restart_app.sh`
   Expected category: app restarted and responding `200`.
5. Return only `OPERATOR_GOOGLE_LOGIN_COMPLETE`. On failure, return only the failing step
   number; if Google reports redirect mismatch, return only `redirect_uri_mismatch`.

No email, subject, password, MFA value, cookie, code, token, or account identifier may be
sent through chat. The bounded runtime remains alive for this expected human checkpoint.

```text
GOOGLE_CUSTOMER_LOGIN: NOT_STARTED
TOSS_EXECUTION: NOT_STARTED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
