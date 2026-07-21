# COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1 — Transport Allowlist Correction

MISSION_ID: `COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1`
WORK_UNIT: `TEST_TRANSPORT_ORDER_QUERY_ALLOWLIST_CORRECTION`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
ACTOR: existing Cosmile Worker (`cosmile:0.0`), Opus 4.8 / xhigh, same session/worktree only
REPOSITORY: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
BRANCH: `implementation/cosmile-toss-query-observability-recovery-v1-20260721`
BASE: `4f767737c18715de2f48bb3f90a16e807691bc4d`
RETURN_TO: `foundation-advisor`

## Entry and skill

Read this exact committed handoff and current Worker authority. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load `implementation-report-template` only for the result. No actor/session/model change, delegation, or sub-agent.

## Exact path ceiling

Only these tracked paths may change:

1. `app/src/lib/payment/tossSandboxTransport.ts`
2. `app/scripts/o1_toss_sandbox_transport.ts`
3. `app/scripts/o1_browser_runtime_contract.vitest.ts`

No other source, test, configuration, manifest, lockfile, schema, migration, or documentation path.

## Frozen correction

- Add exactly one path shape to both transport copies: `/v1/payments/orders/{encodedOrderNo}` where `{encodedOrderNo}` is one nonempty encoded path segment, with no raw `/`, query, fragment, absolute origin, double slash, or literal `..` traversal.
- The new path is `GET`-only. Add the smallest pure request-level predicate needed so both copies reject `POST`, `DELETE`, or any other method for this path before `fetch`; make each transport's `send` use that predicate.
- Preserve existing confirm, paymentKey query, and full-cancel path behavior and the existing `GET | POST` method ceiling for those pre-existing paths.
- Preserve exact `https://api.tosspayments.com` origin, TEST credential and one-shot gates, live-mode refusal, in-memory authorization, redirect refusal, timeout/response cap, strict JSON, no retry/polling, no arbitrary path/header/body, and no raw value exposure.
- Runtime copy and reviewed script twin must remain equivalent for the new path and request predicate.

## Tests-first, focused only

`DELTA_ONLY_VERIFICATION: REQUIRED`.

1. In the existing parity block, add one focused named test for `merchant-order lookup allowlist` covering both copies: exact plain/percent-encoded single segments allowed; empty/extra-segment/query/fragment/absolute/double-slash/literal-dotdot forms denied; GET allowed; POST/DELETE denied; existing confirm/query/cancel cases remain unchanged.
2. Run only this exact named test with `app/node_modules/.bin/vitest ... -t "merchant-order lookup allowlist"`, no pipeline, and preserve meaningful RED nonzero exit.
3. Patch only the two transport files with identical allowlist/request-gate logic.
4. Run the identical named test and require GREEN exit `0`.

Synthetic/pure only. No provider/network, credential/env, DB, runtime, browser, app, window, POST, capture, refund, economic effect, build, typecheck, generate, install, full file/suite, or Reviewer during implementation. If the focused runner cannot execute, STOP; no environment repair.

## Git and result

Advisor requires exact three-path diff and zero drift. Commit once with explicit-path staging and non-force push the same branch. Verify clean/upstream-equal state.

Write only regular non-symlink `leo:leo 0600`:

- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/transport-correction/50_WORKER_RESULT.md`
- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/transport-correction/51_WORKER_POINTER.md`

Result <=60 lines: exact delta, RED/GREEN exit and focused count, preserved boundaries, provider/economic/DB effects `0`, Git state, residual risk, pointer. Do not self-review. Return to Advisor and STOP.
