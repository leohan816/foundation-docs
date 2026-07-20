# R3 Toss TEST Provider Admission — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R3_TOSS_TEST_PROVIDER_ADMISSION`
PRODUCT_HEAD: `c8c18b5cd0c4c01d8fdcbb1601265db3d6855cf3`
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
ACTOR: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; read only `contract-to-code-mapping` and `test-design-before-code`; `implementation-report-template` only for compact return.
PRODUCT_WRITE: `PROHIBITED`
PROVIDER_API_OR_ECONOMIC_EFFECT: `ZERO`

## Objective

Perform the bounded read-only admission needed before any actual Toss TEST action. Freeze:

1. the exact current official Toss V2 TEST query/full-cancel contracts relevant to this mission, including that general-payment notifications remain untrusted until server-side Payment Query binding and that no signature is invented for an undocumented event class;
2. the exact repository call path already implemented for query by payment key, query by merchant order ID, and identical idempotent full-refund recovery;
3. the smallest actual-provider evidence plan that separates current official-provider evidence from already-passed deterministic-local R2 evidence;
4. names-only credential readiness and non-live isolation;
5. whether actual provider verification needs a fresh bounded Toss TEST payment state and an unavoidable Leo browser/owner action;
6. exact commands, temporary paths, cleanup, evidence ceiling, and STOP conditions for later R3 execution. Do not execute them.

## Exact read ceiling

- `app/src/lib/payment/tossV2.ts`
- `app/src/lib/payment/tossSandboxTransport.ts`
- `app/src/lib/payment/service.ts`
- `app/src/lib/payment/webhook.ts`
- `app/src/lib/runtime/o1NonprodConfig.ts`
- `app/src/lib/runtime/o1CommerceRuntime.ts`
- `app/src/lib/runtime/o1ReliabilityRuntime.ts`
- `app/src/lib/payment/contracts.ts`
- current official Toss Payments documentation pages needed for Payment Query, merchant-order query, payment confirmation, full cancel/refund, TEST keys, and webhook/signature behavior.

Credential inspection is limited to NAME:SET/MISSING and categorical file metadata at these exact candidate locations only:

- `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/runtime/owner.env`
- `/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/owner.env`

Never print, copy, hash, compare, summarize, or return any value, identifier, key, paymentKey, order ID, provider body, token, cookie, PII, or secret. Do not inspect any other secret location. Required names are limited to `O1_TOSS_TEST_SECRET_KEY`; `O1_TOSS_SANDBOX_ONESHOT`; and, only if the existing runtime actually requires it, `NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY`.

## Exact actions and output

- Crypto-verify this handoff; verify product clean/upstream-equal at the exact head.
- Read only the ceiling and official docs. Official docs GET is allowed; no Toss API endpoint request.
- Inspect the two exact candidate env paths by metadata and key-name status only.
- Do not create a credential file, test payment, callback, DB, app, container, browser session, or provider request.
- Write only:
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/54_R3_PROVIDER_ADMISSION_RESULT.md` (`0600`, at most 45 lines);
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/55_R3_PROVIDER_ADMISSION_POINTER.md` (`0600`).

Return the official-contract pins/URLs and dates, repository mapping, credential NAME:STATE, fresh-test-state requirement, exact owner action if unavoidable, frozen later-execution ceiling, residual limits, Git state, verdict `READY | BLOCKED_OWNER_ACTION | HOLD`, and `STOP`. Do not run R3/R4 or dispatch a Reviewer.
