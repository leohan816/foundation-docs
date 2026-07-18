# Consolidated Non-Production Credential-Gate Checklist

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
AUTHOR: foundation-advisor
PURPOSE: owner actions required only for a later isolated official-provider evidence pass
CURRENT_STATUS: NOT_RUN_CREDENTIAL_GATE
SECRETS_IN_THIS_ARTIFACT: ZERO
EXECUTION_AUTHORIZED_BY_THIS_ARTIFACT: NO
CONTROLLED_LIVE_AUTHORIZED: NO
```

The reviewed implementation and its non-production deterministic/disposable-PostgreSQL claim are
complete without provider credentials. This checklist records the remaining owner-controlled setup
for future official Google and Toss sandbox evidence. Leo must never paste a secret, token, payment
key, OAuth code, customer identity or raw provider response into chat, Git, review artifacts or test
output.

## Google OIDC — future isolated rehearsal

1. In the Google provider console, create or select a **non-production Web OAuth client** owned by
   the approved Cosmile operator. Do not reuse a production client.
2. Select the exact isolated non-production origin and register its callback ending in
   `/api/auth/google/callback`. The origin is deliberately not inferred in this mission.
3. Use an approved synthetic test identity only; no real customer PII.
4. Place these values in the approved local/non-production secret-management boundary, never chat
   or Git:

```text
COSMILE_GOOGLE_CLIENT_ID
COSMILE_GOOGLE_CLIENT_SECRET
COSMILE_GOOGLE_REDIRECT_URI
```

5. Keep `COSMILE_O1_GOOGLE_AUTH_ENABLED` unset/OFF by default. Set it to `true` only inside the
   explicitly approved isolated rehearsal; production remains forced OFF by code.
6. Before any route rehearsal, run the deploy-time generated-client and typecheck/build gate in a
   separately approved non-production environment and verify the additive schema against a
   disposable database. This mission did not run `prisma generate` or claim build readiness.
7. After rehearsal, revoke or rotate the test credential as appropriate, remove local values, turn
   the flag OFF, and retain only bounded category/count evidence without identifiers or tokens.

## Toss Payments V2 — future Golden Order evidence

1. Use a Toss **TEST/sandbox** merchant configuration and TEST secret only. Do not use a live key,
   real payment method, production merchant activation or real customer.
2. Complete the official sandbox checkout prerequisite to obtain a fresh test payment key suitable
   for the reviewed confirmation flow. Store it only in the isolated local secret boundary.
3. Supply these names locally; never publish their values:

```text
O1_TOSS_SANDBOX_ONESHOT=1
O1_TOSS_TEST_SECRET_KEY
O1_TOSS_TEST_PAYMENT_KEY
O1_TOSS_SANDBOX_SYNTHETIC_IDENTITY=1
O1_TOSS_SANDBOX_NO_LIVE=1
O1_TOSS_SANDBOX_NO_PII=1
```

4. Run only the reviewed one-shot Golden Order sandbox test. Preserve the rule that the internal
   capture is credited only after exact server-side provider verification.

## Toss Payments V2 — separate future Golden Reversal evidence

1. Create a **separate fresh captured sandbox payment**. A pre-capture void, reused Golden Order
   payment key, dashboard-only state or fabricated capture cannot satisfy this gate.
2. Record the exact full captured integer KRW amount locally and use a distinct payment key.
3. In addition to the common Toss names above, supply only locally:

```text
O1_TOSS_REVERSAL_CAPTURED=1
O1_TOSS_REVERSAL_PAYMENT_KEY
O1_TOSS_REVERSAL_AMOUNT
```

4. Run only the reviewed one-shot Golden Reversal sandbox test. It must request a full cancel,
   accept completion only on the reviewed exact query-bound reversal truth, preserve inventory
   committed/HOLD, and produce zero second economic effect on replay.

## Mandatory closure for any future credentialed pass

- Use no production/live key, real customer PII, public exposure, provider commitment or real money.
- Confirm every effective target before execution without printing values.
- Capture pre/post Git state; do not generate or persist secret-bearing output.
- Scrub all local credential/payment-key values after the bounded run.
- Publish only status, counts, booleans, timestamps and commit/file pointers.
- Return immediately on provider incompatibility, unexpected state, leakage or any need to expand
  beyond the independently reviewed paths.
- Controlled Live, Paid Beta and Public Launch require new explicit authority regardless of result.
