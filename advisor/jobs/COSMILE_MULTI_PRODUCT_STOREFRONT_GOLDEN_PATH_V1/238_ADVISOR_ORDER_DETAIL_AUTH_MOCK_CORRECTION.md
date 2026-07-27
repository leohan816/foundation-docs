# 238 — Advisor order-detail authorization mock correction

- Preserved gate: `4 failed / 95 passed`, exit `1`; all twelve new contract
  cases and lifecycle `78/78` passed.
- Exact cause: the test mock returned `{ context: CTX }`, while the unchanged
  route checks `authorization.ok` before using that context.
- Read-only route evidence:
  `app/src/app/api/o1/operator/orders/[orderId]/route.ts`.
- Route remains outside the product delta and must not be edited.

## One exact correction

In the already-authorized
`app/scripts/o1_operator_request_detail_ui.vitest.ts`, change only the mock
default to:

`authorizeConsoleOperatorMock.mockResolvedValue({ ok: true, context: CTX });`

Then run the identical focused command once. On PASS, commit and non-force push
the exact six product paths, write `240`/`241` uncommitted, and STOP.

No other read, edit, command, test, build, typecheck, DB, runtime, browser,
provider, refund, or economic action.
