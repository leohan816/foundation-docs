# Credential-Gate Closure Record

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
SOURCE: Leo through foundation-strategy-sol
AUTHORITY_EFFECT: CREDENTIAL_GATE_CLOSURE_ONLY
SCOPE_EXPANSION: NO
CONTROLLED_LIVE: NOT_AUTHORIZED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```

## Decision recorded

Leo confirmed that the approved Google OIDC test and Toss Payments V2 TEST/sandbox
credential names are populated in the protected mission-local owner environment file.
Leo also authorized `foundation-advisor` to generate only these two missing local
non-production security values with cryptographically strong randomness:

- `COSMILE_O1_PREVIEW_ACCESS_SECRET`
- `COSMILE_O1_OPERATOR_STEP_UP_SECRET`

The values may exist only in:

`/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/owner.env`

They must never be printed, logged, transmitted, committed, documented, hashed, or
included in evidence. The file must remain a regular file owned by `leo:leo` with mode
`0600`. Verification is names-only and reports only `SET` or `MISSING`.

## Advisor execution evidence

```text
OWNER_ENV_PATH: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/owner.env
OWNER: leo
GROUP: leo
MODE: 0600
TYPE: regular file
COSMILE_GOOGLE_CLIENT_ID: SET
COSMILE_GOOGLE_CLIENT_SECRET: SET
NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY: SET
O1_TOSS_TEST_SECRET_KEY: SET
COSMILE_O1_PREVIEW_ACCESS_SECRET: SET
COSMILE_O1_OPERATOR_STEP_UP_SECRET: SET
SECRET_VALUES_PRINTED_OR_HASHED: NO
GENERATION_HELPER_RETAINED: NO
```

The two generated values were written atomically in the same directory, using strong
local randomness. Existing provider values were not replaced. No value was rendered to
stdout, a terminal, tmux, chat, Git, or this evidence.

## Remaining registration gate

This record does not authorize a Google login attempt before the exact non-production
preview origin and callback URI are returned to Leo and registered in Google Auth
Platform. The next bounded phase may prepare the isolated runtime, prove the preview
gate denies access, open the restricted HTTPS preview, and return:

- the exact Authorized JavaScript Origin if required;
- the exact Authorized Redirect URI.

It must then pause Google login until Leo confirms registration. No product source
change, production/shared database, real customer identity, real payment, public
storefront, Controlled Live, or draft-PR merge is authorized.

