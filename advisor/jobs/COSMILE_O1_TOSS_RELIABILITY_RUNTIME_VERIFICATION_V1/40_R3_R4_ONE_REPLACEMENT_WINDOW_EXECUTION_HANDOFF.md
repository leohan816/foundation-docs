# R3/R4 One Replacement Toss TEST Window — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULES: `R3_ACTUAL_TOSS_TEST_REPLACEMENT` then `R4_INVARIANT_CLOSURE`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
FOUNDER_AUTHORITY: `AUTHORIZE_ONE_REPLACEMENT_TOSS_TEST_WINDOW_WITH_PRIOR_EFFECT_UNKNOWN`
PRODUCT_HEAD: `824b41751238390b8baf54a3be68ee82a4d5823f`
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
ACTOR: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; read `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; read `implementation-report-template` only for the compact return.
VERIFICATION: `DELTA_ONLY_VERIFICATION: REQUIRED`
PRODUCT_OR_SCHEMA_WRITE: `PROHIBITED`
PROVIDER: official Toss Payments V2 TEST/Sandbox only

## Preserved evidence and authority ceiling

- Preserve original failed evidence `56_R3_R4_TOSS_TEST_RESULT.md` and `57_R3_R4_TOSS_TEST_POINTER.md` byte-identically. The original one-shot `exit=1` remains `UNCLASSIFIED_ACTIONABLE_FAILURE`; never reinterpret or hide it.
- Preserve the completed Next-dev containment correction and clean/upstream-equal product HEAD `824b417`.
- The prior TEST effect is unknown. Leo authorizes exactly ONE replacement provider window despite that uncertainty. A second replacement window is prohibited.
- Provider-window effects for this replacement are bounded to: window starts `<=1`, successful capture `<=1`, full refund `<=1`. Existing idempotency, replay, order, payment, refund, inventory, and authorization semantics remain unchanged.
- No live/production credential, real money, real instrument, real customer PII, public ingress, provider commitment/KYC, merge, schema change, feature work, broad cleanup, or next mission.

## Accepted dependencies — do not rerun

- R2A controlled notification scenarios PASS (`44_`/`45_`).
- R2B restart/lease/exhaustion PASS (`36_`/`37_`).
- R2C reviewed seam Fable 5/max PASS (`50_`/`51_`) and reviewed real-boundary rerun PASS 17/17 (`52_`/`53_`).
- R2D operator HTTP boundary PASS 6/6 (`42_`/`43_`).
- R3 provider admission (`54_`/`55_`) and durable TEST store remain authoritative.
- Next-dev containment PASS (`58_`/`59_`), product commit `824b417`.

## Exact read and runtime ceiling

The exact read ceiling and existing product boundaries are those in committed handoff `38_R3_R4_TOSS_TEST_RUNTIME_EXECUTION_HANDOFF.md`; do not add a source path. No tracked file may change.

- ignored driver root: `app/scripts/tmp/cosmile-o1-r3r4-replacement/` (`0700`);
- one driver only: `r3r4_one_replacement_provider.vitest.ts` (`0600`);
- protected external root: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/` (`leo:leo 0700`, regular directory, non-symlink);
- protected recovery file: `correlation/recovery.json` (`leo:leo 0600`, regular file, non-symlink);
- categorical evidence file: `stage.jsonl` (`leo:leo 0600`, regular file, non-symlink);
- fixture bundle and Chromium profile only under the protected external root;
- disposable DB: `cosmile-o1-r3r4-replacement-pg-20260720`, `postgres:16-alpine`, `--pull=never`, tmpfs, bound only to `127.0.0.1:55446`;
- app: existing Next runtime only at `127.0.0.1:31083`;
- Chromium: existing pinned binary, headless, remote debugging only at `127.0.0.1:9224`;
- result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/60_R3_R4_REPLACEMENT_RESULT.md` (`0600`, <=80 lines);
- pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/61_R3_R4_REPLACEMENT_POINTER.md` (`0600`).

No log, PID, screenshot, HAR, video, extra config, raw response, provider body, secret, token, cookie, PII, or identifier may be printed or placed in result/stage evidence. Child stdout/stderr goes to `/dev/null` only after the categorical failure recorder is armed.

## Crash-safe correlation and evidence contract

1. Before any provider origin is contacted, create the protected root and atomically write+fsync `recovery.json` with the already-created local merchant order correlation, positive KRW amount/currency binding, internal payment-intent correlation and stable capture idempotency correlation needed for exact recovery, `replacementWindowStarted=false`, and no provider key yet. Never print, hash, copy, or return any field/value.
2. Verify categorically that the recovery file is regular, non-symlink, 0600, parent 0700, exact key schema, and sufficient for order-number query/recovery. Append+fsync only `PRECONTACT_CORRELATION_DURABLE` to `stage.jsonl`.
3. Atomically set+fsync `replacementWindowStarted=true` immediately before the first Toss SDK/provider request. This is the single-use fence. If it is already true, NEVER open the SDK/window again; resume only query/reconciliation with retained correlation.
4. Intercept the provider success return in memory and atomically add+fsync the returned provider correlation before releasing any local success navigation or calling confirmation. After capture convergence and before the first refund provider call, atomically add+fsync the exact durable Refund-row correlation, full-amount/currency/capture binding, and its existing stable refund idempotency correlation; do not invent refund authority before that row exists.
5. Before every load-bearing action, append+fsync one categorical stage name. On failure, append+fsync `FAIL:<stage>:<bounded_category>` before exit. No raw exception/message/value. The first actionable failure stage must survive process exit and must never be suppressed.
6. Provider/internal operations after a crash or restart use only the durable correlation and existing stable idempotency keys. Never mint a second order/window/capture/refund operation.
7. Delete `recovery.json` only after provider query plus internal reconciliation prove terminal full-refund convergence and exactly-once invariants. If provider/economic state is unknown or nonterminal, stop all runtime and preserve only this protected recovery file/root for query-only recovery; report `CORRELATION_RETAINED:YES` without values.

## Exact execution sequence

1. Verify exact HEAD/upstream/clean state, immutable prerequisite evidence, durable TEST store categorical readiness, local toolchain/Chromium, and absent replacement temp/container/ports. Do not inspect secret values.
2. Recreate the previous handoff-38 driver behavior only, adding the crash-safe recovery and categorical stage contract above. Inspect exact temporary-path containment and return `READY_TO_PROVIDER` to Advisor before DB/app/browser/provider action.
3. After Advisor validates `READY_TO_PROVIDER`, start the disposable DB, apply exactly the nine committed migrations, run the committed one-shot fixture with exact preserve flags, and seed the minimum synthetic customer/operator/cart/session state only through existing boundaries.
4. Start the app with durable TEST credentials injected only in-process, runtime/Google readiness ON without Google contact, `O1_TOSS_MODE=test`, sandbox one-shot ON, local substitute absent, and public base `http://127.0.0.1:31083`.
5. Execute exactly one replacement official Toss TEST SDK window, guarded by `replacementWindowStarted`. Use no real instrument. Preserve actual-provider versus controlled-synthetic labels.
6. Prove the handoff-38 objectives: order-number query before local success completion; one confirmed capture/paid order/committed inventory; payment-key query DONE; one allowlisted fresh-nonce/step-up full TEST refund; payment-key query CANCELED with zero balance; replay refusal and no second effect.
7. Restart only the app once on the same disposable DB. Prove persistent order/refund/payment/inventory/customer/operator/reconciliation convergence and exhausted/received inbox visibility without claim/reprocessing or economic change.
8. Capture only categorical stages, statuses, booleans, and counts. Never weaken an assertion, normalize a failure, or add pass-only evidence. Preserve every actionable failure category.
9. On terminal convergence, remove the recovery file/root, driver, fixture/browser roots, generated `.next`, attributable `next-env.d.ts`/tsbuildinfo, DB container, and complete app/browser trees. Verify ports 55446/31083/9224 closed, product clean/upstream-equal at `824b417`, package/lock/schema unchanged, and durable TEST store unchanged/preserved.
10. Write `60_`/`61_`, chmod 0600, return to Advisor, and STOP. Do not dispatch Reviewer.

## Provider and economic STOP rules

- STOP before provider contact for an unsafe key/mode, missing durable correlation, unexpected origin, uncontained browser, another file/dependency, or product mutation.
- After `replacementWindowStarted=true`, never open another window. For any failure use retained correlation for query-only/idempotent recovery; no new economic operation.
- STOP immediately for live/prod mode, real instrument request, identifier/secret exposure, economic semantic change, unbounded retry, second capture/refund, schema/product write, or cleanup uncertainty.
- `PASS` requires all named R3/R4 objectives, exactly one replacement window, exactly one successful capture effect, exactly one successful full-refund effect, replay refusal, terminal reconciliation, protected correlation deletion, complete cleanup, and clean/upstream-equal Git. Otherwise return `HOLD_WITH_NAMED_BLOCKERS` with categorical evidence only.

REPORTING: follow current Agent Office `f66a55b`; result <=80 lines, pointer compact. `RETURN_TO: foundation-advisor`. `PROPOSED_NEXT_ACTOR: foundation-advisor`. `STOP`.
