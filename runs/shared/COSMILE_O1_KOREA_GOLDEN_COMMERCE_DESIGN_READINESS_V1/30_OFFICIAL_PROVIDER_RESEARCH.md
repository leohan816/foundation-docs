# Official-source Provider Research

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
PHASE: 3
RESEARCH_DATE_UTC: 2026-07-17
SCOPE: Korea/KRW authentication and PSP design options only
PROVIDER_CONTACTED: NO
ACCOUNT_OR_APPLICATION_CREATED: NO
KYC_OR_CONTRACT_ACTION: NO
SECRET_OR_CREDENTIAL_ACCESSED: NO
RECOMMENDATIONS: DESIGN_INPUT_ONLY_PENDING_LEO_APPROVAL
```

## Method and claim limit

Only current primary provider documentation was used. Official documentation proves
documented interface and test-mode properties; it does not prove that Cosmile or its
merchant entity is eligible, approved, contracted, configured, or operational. The
`agent-reach` skill instructions were followed, but its CLI and `mcporter` backend were
not installed in this runtime, so official pages were retrieved through the available
web access. No provider was contacted.

## Authentication options

### A. Direct Kakao Login with OIDC — provisional recommendation for the first Korean customer path

Verified facts:

- Kakao Login can issue ID tokens when OIDC is enabled and exposes an OIDC discovery
  document and JWKS. Its documented authorization flow is authorization code; the
  discovery metadata lists RS256, `S256` PKCE, and `nonce` support.
- Redirect URI and app activation are required. A client secret is enabled by default
  for REST API keys. The service remains responsible for its own terms/consent handling
  and internal account/session/authorization model.
- Kakao's security guide recommends `nonce` for ID-token replay protection.

Design consequence:

- Cosmile should bind immutable `(issuer, subject)` to its own customer ID, verify
  issuer/audience/signature/expiry/nonce/PKCE, and keep customer authorization and
  operator authorization separate.
- Request the minimum claims; email must not become the stable identity key.
- Provider unlink/revocation, local session termination, account collision, and
  recovery need explicit state and operator handling.

Unknowns requiring later confirmation:

- exact Kakao app eligibility, consent items, review requirements, non-production
  account setup, data-retention duties, and whether the approved merchant/legal entity
  can use the selected claims;
- whether the later implementation should support an additional login method before
  Paid Beta.

Primary sources:

- https://developers.kakao.com/docs/en/kakaologin/prerequisite
- https://developers.kakao.com/docs/en/kakaologin/rest-api
- https://developers.kakao.com/docs/en/getting-started/security-guideline

### B. Amazon Cognito user pool brokering Kakao OIDC

Verified facts:

- Cognito user pools can act as a relying party to an OIDC provider and issue a common
  application token set after mapping provider claims.
- The documented OIDC-provider requirements include HTTPS discovery/user-info/JWKS,
  a published signing key ID, supported signing algorithms, and `client_secret_post`.
  Kakao's published OIDC metadata appears structurally compatible, but no integration
  was executed in this mission.

Tradeoff:

- This standardizes the Cosmile-facing token and can support additional providers, but
  adds an AWS tenant, mappings, secret custody, hosted-login/session configuration,
  monitoring, regional/data-processing questions, and a second identity failure
  boundary.

Primary sources:

- https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html
- https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-flow.html

### C. Auth0 custom social connection

Verified fact:

- Auth0 documents custom social connections for OAuth 2.0 providers not supplied as a
  built-in marketplace connection.

Tradeoff:

- It offers a managed CIAM boundary but adds a tenant, custom connection behavior,
  token/session policy, vendor processing terms, cost, and operational dependency.
  Exact Kakao or Naver compatibility and production eligibility remain unverified.

Primary source:

- https://auth0.com/docs/authenticate/identity-providers/social-identity-providers/oauth2

### Authentication recommendation

Use **A, direct Kakao OIDC**, as the narrow O1 design default because it is Korea-fit,
standards-based, and introduces one fewer identity intermediary. Keep the Cosmile
adapter OIDC-shaped so a later approved broker can replace it without changing the
commerce domain. This is not provider selection authority: Leo must approve it after
Cosmile's existing session/auth seams and the Kakao eligibility/consent questions are
confirmed. Operator/admin identity must remain a separate hardened boundary and is not
made equivalent to customer social login.

## Korean PSP options

### A. Direct Toss Payments V2 payment window/API — provisional recommendation

Verified facts:

- Toss provides test keys and states that payments made with test client keys are not
  charged. Contract completion is not required to start documented test integration,
  though some methods/features require contract-specific test keys.
- The documented payment flow returns `paymentKey`, `orderId`, and `amount`; the merchant
  server must compare them to server-stored authoritative order data before approval.
- Payment APIs default to KRW and accept idempotency keys for POST operations. The
  cancel API supports full and partial cancellation and recommends an idempotency key
  to avoid duplicate cancellation.
- Payment-status webhooks are retried up to seven times if a timely HTTP 200 is not
  received.
- The generic payment-status webhook documentation does not document a signature for
  `PAYMENT_STATUS_CHANGED`; the documented `tosspayments-webhook-signature` applies only
  to payout/seller events. Inbound IP allowlisting is documented.

Required design response:

- Treat a payment webhook as an untrusted notification. Before a commerce transition,
  retrieve/confirm provider state through the authenticated server API and bind it to
  the expected merchant order ID, amount, KRW currency, payment key/transaction, and
  current internal state.
- Use unique provider and internal idempotency keys, persist raw-event digest and
  category-safe audit data, handle duplicate/out-of-order/missing events, and reconcile
  all attempts. IP allowlisting is defense in depth, not the sole authenticity proof.
- Golden Reversal must use cancellation/refund of an approved/captured sandbox payment;
  a pre-approval void alone does not close it.

Primary sources:

- https://docs.tosspayments.com/guides/v2/payment-window/integration
- https://docs.tosspayments.com/guides/v2/get-started/payment-flow
- https://docs.tosspayments.com/en/api-guide
- https://docs.tosspayments.com/reference
- https://docs.tosspayments.com/guides/v2/webhook
- https://docs.tosspayments.com/reference/using-api/webhook-events
- https://docs.tosspayments.com/reference/using-api/security

### B. PortOne V2 with an underlying Korean PG

Verified facts:

- PortOne V2 documents a common API/SDK over multiple Korean PGs, including Toss
  Payments, KSNET, KakaoPay, NaverPay, Smartro, NICE, KG Inicis, KPN, and NHN KCP.
- It documents test channels, KRW payment requests, payment IDs, verified webhooks via
  its server SDK, and full/partial cancellation. The cancel flow warns that bypassing
  PortOne and cancelling directly at the PG can create state divergence.
- Production processing still depends on the underlying PG/channel contract and
  credentials; available test behavior differs by PG.

Tradeoff:

- PortOne can preserve multi-PG optionality and offers a verification abstraction, but
  adds an orchestration system, PortOne IDs/state, underlying-PG state, channel
  configuration, and an additional reconciliation/failure boundary.

Primary sources:

- https://developers.portone.io/opi/ko/integration/start/v2/readme?v=v2
- https://developers.portone.io/opi/ko/integration/start/v2/checkout
- https://developers.portone.io/opi/ko/integration/webhook/readme-v2?v=v2
- https://developers.portone.io/opi/ko/integration/cancel/v2/readme
- https://developers.portone.io/opi/ko/console/guide/reg?v=v2

### PSP recommendation

Use **A, direct Toss Payments V2**, as the narrow O1 design default: one PSP boundary is
simpler for a single representative Korean card-payment and captured-refund rehearsal,
and the official documentation covers test keys, KRW, approval, cancellation,
idempotency, error injection, and webhook retry behavior. Choose PortOne only if Leo
explicitly values near-term multi-PG portability enough to accept the extra state and
reconciliation boundary. Neither option is finally selected until merchant eligibility,
contract/test-channel availability, methods, refund semantics, pricing, settlement,
support, and data-processing terms are confirmed.

## Common unresolved confirmation gates

- merchant/legal entity and authorized signatory;
- provider/PG eligibility, contract and KYC path, exact test channel, settlement and
  fees, supported Korean payment methods, cancellation/refund limitations;
- customer data processing, cross-border processing, retention/deletion, consent and
  privacy notice language;
- webhook/network exposure, secret custody/rotation, incident contact and provider
  outage procedure;
- named reconciliation, refund, support, and incident owners.

```text
AUTHENTICATION_RECOMMENDATION: DIRECT_KAKAO_OIDC_PROVISIONAL
PSP_RECOMMENDATION: DIRECT_TOSS_PAYMENTS_V2_PROVISIONAL
PSP_VENDOR_CONFIRMATION_REQUIRED: YES
FOUNDER_SELECTION_REQUIRED: YES
IMPLEMENTATION_AUTHORIZED: NO
```
