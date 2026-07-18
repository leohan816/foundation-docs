# Owner Credential and Provider-Console Gate

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
GATE: EXPECTED_HUMAN_OWNER_ACTION
STATUS: WAITING_FOR_OWNER_LOCAL_CONFIGURATION
PRODUCT_CANDIDATE: d5c762fcf4029f7027daad02a18ffae43e62e5ab
IMPLEMENTATION_REVIEW: PASS
RUNTIME_SETUP_DELTA_REVIEW: PASS
DRAFT_PR: https://github.com/leohan816/Cosmile/pull/2
CONTROLLED_LIVE: NOT_AUTHORIZED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```

The Advisor created an owner-only `0600` mission environment template at:

```text
/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/owner.env
```

No secret value appears in this artifact. Leo must enter values only in that local file and must never paste them into chat, tmux, Git, screenshots, logs, or evidence.

## Owner actions required now

1. In Google Cloud, create or select one dedicated non-production Web OAuth client in test mode. Add exactly two separate, non-customer Google test identities: one customer and one operator. Do not configure public access.
2. Obtain the Google test client ID and client secret.
3. Obtain direct Toss Payments V2 TEST/sandbox client and secret keys. Do not use live keys and do not perform merchant activation, KYC, contract, or real payment actions.
4. Choose two distinct, strong, local-only values: one preview-access secret and one test-only operator step-up secret.
5. Locally edit only the following blank entries in `owner.env`:

```text
COSMILE_GOOGLE_CLIENT_ID
COSMILE_GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY
O1_TOSS_TEST_SECRET_KEY
COSMILE_O1_PREVIEW_ACCESS_SECRET
COSMILE_O1_OPERATOR_STEP_UP_SECRET
```

Leave these Advisor/runtime-populated entries unchanged for now:

```text
DATABASE_URL
COSMILE_O1_PUBLIC_BASE_URL
COSMILE_GOOGLE_REDIRECT_URI
COSMILE_O1_OPERATOR_SUB_ALLOWLIST
```

After values are present, Leo returns only:

```text
OWNER_CREDENTIAL_FILE_READY: YES
```

The Advisor will validate presence and TEST/non-live shape without displaying values, create the isolated database and canonical fixture, prove the preview gate denies before starting a tunnel, start the restricted tunnel, and then return the exact HTTPS callback URLs for Google and Toss console registration.

```text
SECRET_VALUES_IN_CHAT: PROHIBITED
OFFICIAL_PROVIDER_EXECUTION: NOT_STARTED
TUNNEL: NOT_STARTED
REAL_PAYMENT: NO
REAL_CUSTOMER_PII: NO
PUBLIC_STOREFRONT: NO
RETURN_TO: Leo via foundation-strategy-sol
```
