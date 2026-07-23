# WU-4 Finance/Reconciliation — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-4_FINANCE_RECONCILIATION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `eda422a327f37026f2227238b294b8f6fa47e38b`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

## Exact path ceiling

1. `app/src/app/console/finance/page.tsx` (new)
2. `app/src/components/console/O1ConsoleFinance.tsx` (new)
3. `app/scripts/o1_console_finance_ui.vitest.ts` (new)

No fourth path. No schema/migration, repository/runtime/auth/API route, payment/refund/order/inventory/shipment, provider/economic behavior, root/nav/settings, WU-5, or deferred-feature change.

## Frozen server page

`/console/finance` is `force-dynamic` and fails closed before reconciliation data:

1. `await requireConsoleUser()`;
2. `o1RuntimeEnabled(process.env)` else `notFound()`;
3. `getShopper()` then `o1OperatorForCustomer(process.env, shopper.userId)`;
4. denied renders `CONSOLE_STATE_VOCAB.denied` and reads zero reconciliation data;
5. verified operator calls `readO1ReconciliationProjection()` exactly once;
6. `null` is a truthful repository-error state, never empty/zero;
7. success passes only `exhaustedUnverified`, `pendingVerification`, and `openReconciliation` counts to `O1ConsoleFinance`.

No ID, order/payment/refund/provider reference, amount/currency, payload/hash, secret, raw error, or fabricated KPI.

## Frozen client surface

`O1ConsoleFinance` is a client component with:

- mobile-safe read-only Korean labels for the three initial server counts;
- one desktop-only protected recovery section;
- one GET `/api/o1/operator/reconciliation` to refresh the count-only projection and obtain a fresh single-use nonce;
- one POST to that same route only after non-empty step-up input and nonce;
- POST body exactly `{ stepUpSecret, stepUpNonce }`; no order/payment/refund/provider key, amount, currency, limit, scope, actor, reason, or other caller choice;
- secret input `type=password`, `autoComplete=off`; submitted secret is cleared and never rendered/stored/logged;
- nonce is never rendered and is cleared after POST; a later explicit refresh may obtain a new one;
- closed Korean categories for denied/unavailable/invalid/stale/step-up-denied/disabled/success; no raw server error/reason;
- successful recovery may render only the existing count summary keys `claimed`, `captureConverged`, `refundConverged`, `nonCaptureSettled`, `quarantined`, `rescheduled`, `exhausted`, `fencedOut`, then refresh counts through the same GET;
- no retry/poll loop, adjustable limit, direct runtime call, provider call, payment/refund control, new economic promise, identifier output, mobile protected control, or client-side authorization claim.

The existing route remains the sole action authority and independently re-checks runtime flag, immutable-subject operator allowlist, strict body allowlist, fresh single-use nonce, exact step-up, and fixed server-side sweep bound.

## Tests first and exact command

First create only `app/scripts/o1_console_finance_ui.vitest.ts`, exact named block:

`WU-4 finance reconciliation counts and protected recovery`

Prove:

- server gate order, zero data read on denied branch, exactly one projection read on admitted branch, and explicit repository-error state;
- exactly three count categories and no prohibited identifier/economic/raw fields;
- GET/POST use only the existing exact route; POST body has exactly the two authorized fields and no caller-selected limit;
- secret/nonce handling is non-rendering, single-attempt, cleared, and category-only;
- successful response accepts only the eight existing count summary keys and refreshes through GET;
- protected action is desktop-only while mobile remains count/read-only;
- no alternate route/runtime/provider/payment/refund action, retry/polling loop, or authorization inference.

Run only:

```bash
./node_modules/.bin/vitest run scripts/o1_console_finance_ui.vitest.ts -t 'WU-4 finance reconciliation counts and protected recovery' --config vitest.config.ts --reporter=verbose --cache=false
```

Require meaningful RED, then identical GREEN with exact exit status. Do not weaken/delete assertions. No full file/suite, predecessor test, build, typecheck, lint, generate, install, DB, app/browser, provider, or economic command.

## Dependency, cleanup, Git, return

Use the mission-authorized temporary canonical dependency symlink only after package/lock/absence checks. Cache disabled; remove immediately; canonical representative hashes unchanged; zero symlink/cache/process residue.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `52_WU4_FINANCE_RECONCILIATION_RESULT.md`, return to Advisor, STOP before WU-5.

STOP if a fourth path, route/runtime/auth change, new recovery/economic/provider authority, client-selected bound/scope, raw identifier/error display, concurrent write, or mobile protected action is required. One bounded no-delta Claude attempt returns `EXECUTION_NONCONVERGENCE`; Advisor alone may route the exact frozen WorkUnit to the preserved Codex fallback with explicit per-command absolute workdir.
