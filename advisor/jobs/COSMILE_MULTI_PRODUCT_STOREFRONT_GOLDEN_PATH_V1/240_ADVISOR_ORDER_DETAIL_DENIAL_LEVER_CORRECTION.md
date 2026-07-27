# 240 — Advisor order-detail denial-lever correction

- Preserved gate: `1 failed / 98 passed`, exit `1`.
- All new line/option/image/time cases pass; lifecycle is green.
- Exact remaining case: existing M3F denied sub-case expects `403` and zero
  downstream calls, but still drives the retired `operatorResolveMock` lever.
- Current unchanged route denies only when `authorizeConsoleOperator.ok` is
  false.

## One-line correction

Inside that denied sub-case only, add:

`authorizeConsoleOperatorMock.mockResolvedValue({ ok: false });`

Preserve the `403 not_authorized` and zero downstream request/nonce
assertions. Do not change product source. Run the identical focused command
once. On PASS, commit/non-force push the exact six paths, write `242`/`243`
uncommitted, and STOP.

No other read, edit, command, or side effect.
