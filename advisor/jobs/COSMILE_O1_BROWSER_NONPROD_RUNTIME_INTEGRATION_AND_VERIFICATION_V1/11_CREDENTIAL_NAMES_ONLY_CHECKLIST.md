# Consolidated Names-Only Credential and Console Checklist

No value is requested or accepted in chat, tmux text, Git, documentation, command output, logs, screenshots, or evidence.

## Environment-variable names

```text
DATABASE_URL
COSMILE_O1_RUNTIME_ENABLED
COSMILE_O1_GOOGLE_AUTH_ENABLED
COSMILE_GOOGLE_CLIENT_ID
COSMILE_GOOGLE_CLIENT_SECRET
COSMILE_GOOGLE_REDIRECT_URI
COSMILE_SESSION_TTL_SECONDS
NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY
O1_TOSS_TEST_SECRET_KEY
O1_TOSS_MODE
O1_TOSS_SANDBOX_ONESHOT
COSMILE_O1_PUBLIC_BASE_URL
COSMILE_O1_FOUNDATION_BUNDLE_ROOT
COSMILE_O1_PREVIEW_ACCESS_SECRET
COSMILE_O1_OPERATOR_SUB_ALLOWLIST
COSMILE_O1_OPERATOR_STEP_UP_SECRET
```

The final implementation may remove an unnecessary name but may not add a credential name without documenting why. `O1_TOSS_MODE` must be a test/sandbox value; live-looking keys or production mode must be refused. Any `NEXT_PUBLIC_` value is browser-visible and must never carry a secret.

## Leo-owned console actions

Google test-mode:

1. Use a dedicated non-production OAuth client.
2. Add only the dedicated customer and operator test accounts as test users.
3. Register the exact HTTPS callback URI produced by the restricted preview.
4. Do not add real customer accounts or broad organization/public access.

Toss TEST:

1. Use TEST/sandbox client and secret keys only.
2. Configure the exact non-production success/fail URLs shown by the runtime package.
3. Configure only the exact non-production general-payment webhook URL if a dashboard registration is required.
4. Do not use live keys, merchant activation, KYC/contract action, or a real payment method.

Operator/test preview:

1. Keep the operator account separate from the customer account.
2. Put the immutable Google subject allowlist only in the approved owner-only secret boundary; never use email as the allowlist.
3. Use a distinct preview-access secret and a distinct test-only step-up secret.
4. Enter values only through a no-echo prompt or owner-only `0600` mission env file under the mission temp root.
5. Do not paste any value into chat or a result artifact.

The Advisor/Worker may report only readiness booleans and key names. They must never read back or echo values.

