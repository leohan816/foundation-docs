# WU-5 R4 Async Operator Authorization Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-5_R4_ASYNC_OPERATOR_AUTHORIZATION_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `cb67af4bbadbb86480fbfff6d925e7dc1dbbef49`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

## Blocking direct evidence and path ceiling

The two WU-5 pages import `o1OperatorForCustomer` from `o1ConsoleView`, which does not export it. The existing function is the async runtime function in `@/lib/runtime/o1CommerceRuntime`; both pages currently omit `await` and use Promise truthiness (`if (!operator)`), which cannot enforce the frozen fail-closed operator gate. The known-good Console orders page proves the exact existing contract.

Change only:

1. `app/src/app/console/page.tsx`
2. `app/src/app/console/settings/page.tsx`
3. `app/scripts/o1_console_shell_ui.vitest.ts`

No fourth path; no auth/runtime implementation, new authority, UI, config, schema/DB, provider, or economic change.

## Tests first and exact correction

First add one exact named test:

`awaits runtime operator resolution and denies every non-operator result`

For both page sources require:

- `o1OperatorForCustomer` imported from `@/lib/runtime/o1CommerceRuntime`;
- the Console view import contains only its existing view constants, not `o1OperatorForCustomer`;
- `const operator = await o1OperatorForCustomer(process.env, shopper.userId);`;
- `if (operator.kind !== "operator")`;
- absence of `if (!operator)`.

Run the exact named test and preserve RED. Then, in each page only:

1. remove `o1OperatorForCustomer` from the `o1ConsoleView` import;
2. import it from `@/lib/runtime/o1CommerceRuntime`;
3. await the existing call;
4. replace only the truthiness denial check with `operator.kind !== "operator"`.

Do not change gate order, denied text, JSX, data reads, actions, or any other line. Run the identical named GREEN once.

Exact command:

```bash
./node_modules/.bin/vitest run scripts/o1_console_shell_ui.vitest.ts \
  -t 'awaits runtime operator resolution and denies every non-operator result' \
  --config vitest.config.ts --reporter=verbose --cache=false
```

Use/remove only the mission-approved temporary dependency symlink. No cumulative gate, build, typecheck, lint, install/generate, DB, browser/runtime, provider, or economic command.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `68_WU5_R4_ASYNC_OPERATOR_AUTHORIZATION_CORRECTION_RESULT.md`, return to Advisor, and STOP before the final P6 re-gate. This safety correction remains subject to the frozen final Fable 5/max review.
