# WORKER RESULT — ORDER/REQUEST DETAIL LINE PRESENTATION + ORDER TIME

Status: **HOLD** — all twelve intended contract cases pass; the run is not green because three pre-existing route
cases still fail after the authorized harness mock, and resolving them needs a path I am not authorized to open.
No commit, no push.

- Handoff `230` (docs `4b2598d8…`, sha256 `a1818f59…`), additive freeze `232` (docs `a5636a09…`, sha256 `1429c7c9…`),
  RED-gate correction `234` (docs `bbad83ee…`, sha256 `75803024…`) — all three verified before acting.
- Product base `52343f5c6633558ac6ec489b201e5d7746762ab5`, unchanged HEAD; six-path delta uncommitted.
- `/fable-builder` loaded with `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`,
  `implementation-report-template`.

## 1. Scope implemented

Freeze `228/230` line presentation + additive `232` order time, in full. Nothing deferred.

## 2. Files changed (exactly six, no seventh path)

| Path | Change |
|---|---|
| `app/src/lib/order/contracts.ts` | `OperatorOrderLine.option: string \| null`; `OperatorOrderLineData.optionNameSnapshot`; `OperatorOrderView.createdAt: string \| null`; `OperatorOrderData.createdAt: Date \| null` |
| `app/src/lib/order/repository.ts` | widened the two **existing** SELECTs only — `Order` gains `"createdAt"`, `OrderItem` gains `"optionNameSnapshot"`. No new query, join or authority |
| `app/src/lib/order/service.ts` | option validated (null or non-blank; blank ⇒ existing `repository_error`) and projected without defaulting; `createdAt` emitted as exact `toISOString()` only for a valid finite `Date`, else null |
| `app/src/components/commerce/O1OperatorPanel.tsx` | dense table → semantic `<ul>` of separated cards (image fallback, title, SKU, 옵션, 수량, 단가, 합계); new pure `formatOperatorOrderTime`; one `주문 시각` summary fact |
| `app/scripts/o1_order_lifecycle.vitest.ts` | option/createdAt oracles + `234` correction 2 |
| `app/scripts/o1_operator_request_detail_ui.vitest.ts` | card/option/image/KST oracles + `234` correction 1 |

## 3. Files deliberately not changed

`route.ts`, `page.tsx`, schema/migrations, checkout, catalog, Foundation, payment/refund, action surfaces — untouched.
No image field was added anywhere: no truthful durable source exists.

## 4. Contract mapping

| Contract | Landing | Oracle |
|---|---|---|
| exact durable option, byte-for-byte | contracts/repository/service | `option` equals a mixed-script value with an interior separator, so any trim/normalize would break it |
| null option stays null | service (no defaulting) | asserted on two separate lines |
| blank non-null option is malformed | service `optionOk` | added `blank option` **and** `empty option` to the fail-closed matrix |
| honest image state | panel fallback only | region must contain `저장된 상품 이미지 없음`, forbids 12 image/source tokens |
| card hierarchy, SKU → 옵션 → 수량 | panel `op-order-lines` | list/card structure, one-per-label counts, positional index assertions |
| exact ISO createdAt or null | service | exact ISO; null for missing, Invalid Date, ISO **string** and epoch number |
| KST + explicit zone; 확인 없음 | panel pure formatter | `2026-07-27T15:00:00.000Z` → `2026-07-28 00:00 KST (UTC+9)`; five bad inputs → `확인 없음` |
| amounts/privacy/auth preserved | unchanged code | all pre-existing assertions retained |

## 5. Deviations (declared, not silent)

1. **KST via fixed +9 offset, not `Intl`/`Asia/Seoul`.** Korea has no DST, so the offset is exactly Asia/Seoul wall
   time, and the result is deterministic and ICU-independent. It also matches the accepted in-repo precedent.
2. **`234` correction 2 — first attempt overshot.** I replaced the removed assertion with a new token oracle
   (`not.toContain("committed")`), which contradicts the accepted `committed_hold`. Your inline correction was
   right; the added assertion and its claim were removed, leaving only the pre-existing `Object.keys` raw-inventory
   exclusion plus a comment recording why the SKU-secrecy claim is gone.
3. **One in-ceiling oracle repair after the GREEN attempt**: my own new image assertion forbade the bare token
   `legacy`, which matched the pre-existing *action-surface* comment sitting inside the region slice — unrelated to
   imagery. Rather than drop the contract token, I narrowed that one assertion to the card markup (`…</ul>`), so all
   twelve tokens still apply. **This repair is not yet verified by a run.**

## 6. Test results

- Command (identical for both runs):
  `cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_order_lifecycle.vitest.ts scripts/o1_operator_request_detail_ui.vitest.ts`
- **RED** (pure): `2 failed (2)` files, `16 failed | 83 passed (99)`, exit `1`.
- **GREEN attempt** (pure): `1 failed | 1 passed (2)` files, `4 failed | 95 passed (99)`, exit `1`.
  - `o1_order_lifecycle.vitest.ts`: **78/78 pass** — every option, createdAt and fail-closed case green.
  - `o1_operator_request_detail_ui.vitest.ts`: 17/21 — all eight card/option/image/KST cases green.
- db-touch: not run (not authorized, none required). safety invariant: unchanged. regression: no case removed;
  count rose 96 → 99.

## 7. Blocker — the three route cases (Advisor decision required)

Correction 1 was applied exactly: only `@/lib/operator/authorize` is mocked, resolving `{ context: { operatorRef:
"op_1", role: "admin" } }` — the shape every console read surface treats as authorized. It **did** fix the
request-scope crash: `flag_disabled` → 404 and the denied case → 403 now behave. But every remaining call returns
`403 not_authorized`, so the route's authorization predicate is not satisfied by that shape:

| Case | Expected | Received |
|---|---|---|
| not_found / not_authorized / invalid_input / repository_error view mapping | 404 / 403 / 400 / 500 | `403 not_authorized` |
| ok view → request + nonce | 200 with order/request/nonce | `403 not_authorized` |
| detail invalid_input / repository_error / unknown | 400 / 500 / 500 | `403 not_authorized` |

Determining the shape the route actually accepts requires reading
`app/src/app/api/o1/operator/orders/[orderId]/route.ts` — a **seventh path**, which `230` forbids and I did not open.
I did not guess a shape, and I did not weaken any route assertion.

**I need exactly one of:** (a) the authorized return shape as the route consumes it, (b) authorization to read that
one route file, or (c) a disposition to exclude those three pre-existing cases from this slice's gate.

## 8. What is proven

- Pure, provider-independent proof that the operator projection carries the durable option byte-for-byte, preserves
  null, fails closed on blank/empty option, emits an exact ISO instant or null, and never infers a time.
- Pure source-contract proof that the line region is a semantic list of separated cards with the frozen field order,
  the honest image absence, KRW integer formatting, and no buyer/contact/address field.
- Behavioural proof of the KST formatter on the day boundary and on five malformed inputs.

## 9. What is NOT proven

- **No green gate.** The slice is incomplete until the three route cases resolve.
- The image-region oracle repair (§5.3) has not been re-run.
- No typecheck, build, DB, runtime, browser or provider verification — none authorized. The widened SQL columns are
  proven only against the in-memory faithful repository, not against PostgreSQL.
- Rendered DOM is unverified; the panel is proven at source-contract level plus the pure formatter.

## 10. Questions for review

1. Is `{ context: { operatorRef, role } }` the wrong shape, or does the route now derive the operator from
   `authorizeConsoleOperator` and no longer consult `o1OperatorForCustomer` at all?
2. Does narrowing the image assertion to the card markup (§5.3) still satisfy `228`'s "no legacy image" intent?
3. Is the fixed +9 offset acceptable in place of a tz-database formatter (§5.1)?
4. Should `empty option` (added beyond the named `blank`) stay in the fail-closed matrix?

## 11. Rollback

`git -C <product> checkout -- app/scripts/o1_order_lifecycle.vitest.ts
app/scripts/o1_operator_request_detail_ui.vitest.ts app/src/lib/order/contracts.ts app/src/lib/order/repository.ts
app/src/lib/order/service.ts app/src/components/commerce/O1OperatorPanel.tsx` — nothing is committed, so this
restores `52343f5` exactly.

RETURN_TO: foundation-advisor
