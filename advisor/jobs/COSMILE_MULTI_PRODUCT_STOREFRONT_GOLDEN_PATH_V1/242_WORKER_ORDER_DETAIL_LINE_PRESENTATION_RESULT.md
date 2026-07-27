# WORKER RESULT — ORDER/REQUEST DETAIL LINE PRESENTATION, DURABLE OPTION AND ORDER TIME

Status: **PASS** — focused gate green, six-path delta committed and pushed.

- Anchors verified before each step: handoff `230` (docs `4b2598d8…`, sha256 `a1818f59…`), additive freeze `232`
  (`a5636a09…` / `1429c7c9…`), RED-gate correction `234` (`bbad83ee…` / `75803024…`), auth-mock correction `238`
  (`4fc4d248…` / `179990c6…`), denial-lever correction `240` (`05d8b2f` / `774c7b5f…`), plus your inline confinement
  correction.
- Product base `52343f5c6633558ac6ec489b201e5d7746762ab5` → result commit `b652a8b2ea6a8221a764d42190c318ac2a005d0e`,
  pushed non-force; tree clean, upstream-equal.
- `/fable-builder` loaded with `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`,
  `implementation-report-template`.

## 1. Scope implemented

Freeze `228/230` line presentation and additive `232` order time, in full. Nothing deferred, nothing widened.

## 2. Files changed — exactly six, no seventh path

| Path | Change |
|---|---|
| `app/src/lib/order/contracts.ts` | `OperatorOrderLine.option: string \| null`; `OperatorOrderLineData.optionNameSnapshot`; `OperatorOrderView.createdAt: string \| null`; `OperatorOrderData.createdAt: Date \| null` |
| `app/src/lib/order/repository.ts` | the two **existing** SELECTs widened only — `Order` gains `"createdAt"`, `OrderItem` gains `"optionNameSnapshot"`; no new query, join, authority or schema |
| `app/src/lib/order/service.ts` | option validated (null or non-blank) and projected without defaulting; blank ⇒ existing `repository_error`; `createdAt` emitted as exact `toISOString()` only for a valid finite `Date`, else null |
| `app/src/components/commerce/O1OperatorPanel.tsx` | line table → semantic `<ul>` of separated cards (image absence, title, SKU, 옵션, 수량, 단가, 합계); pure `formatOperatorOrderTime`; one `주문 시각` summary fact |
| `app/scripts/o1_order_lifecycle.vitest.ts` | option/createdAt oracles; `234` correction 2 |
| `app/scripts/o1_operator_request_detail_ui.vitest.ts` | card/option/image/KST oracles; `234` correction 1, `238`, `240`, confinement |

**Not changed:** `route.ts` (read by Advisor only, never edited), pages, schema/migrations, checkout, catalog,
Foundation, payment/refund, action surfaces. No image field anywhere — no truthful durable source exists.

## 3. Contract → code → oracle

| Contract | Landing | Oracle |
|---|---|---|
| exact durable option, byte-for-byte | contracts · repository · service | mixed-script value with an interior separator and space, so any trim/normalize breaks the assertion |
| null option stays null | service (no defaulting) | asserted on two independent lines |
| blank non-null option is malformed | service `optionOk` | `blank option` **and** `empty option` added to the fail-closed matrix |
| honest image state | panel fallback only | card markup must contain `저장된 상품 이미지 없음` and none of twelve image/source tokens |
| card hierarchy, SKU → 옵션 → 수량 | panel `op-order-lines` | list/card structure, one-per-label counts, positional index assertions, title ahead of every label |
| exact ISO `createdAt` or null | service | exact ISO; null for missing, Invalid Date, ISO **string** and epoch number |
| KST with explicit zone, else `확인 없음` | panel pure formatter | day-boundary instant → `2026-07-28 00:00 KST (UTC+9)`; five malformed inputs → `확인 없음` |
| amounts, privacy, authorization preserved | unchanged code | every pre-existing assertion retained |

## 4. Declared deviations

1. **KST via a fixed +9 offset rather than `Intl`/`Asia/Seoul`.** Korea has had no DST since 1988, so the offset is
   exactly Asia/Seoul wall time; the result is deterministic, ICU-independent and matches the accepted in-repo
   precedent. Declared, not silent.
2. **`234` correction 2 — first attempt overshot and was corrected by you.** I had replaced the removed assertion
   with `not.toContain("committed")`, which contradicts the accepted `committed_hold`. Per your inline correction the
   added assertion and its claim were removed; only the pre-existing `Object.keys` raw-inventory exclusion remains,
   with a comment recording why the SKU-secrecy claim is gone.
3. **One in-ceiling repair of my own new image oracle.** Its bare `legacy` token matched the pre-existing
   action-surface comment inside the region slice — unrelated to imagery. Rather than drop a contract token I
   narrowed that assertion to the card markup, so all twelve tokens still apply. Verified green.

## 5. Test results

Command, identical for every run:
`cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_order_lifecycle.vitest.ts scripts/o1_operator_request_detail_ui.vitest.ts`

| Run | Result |
|---|---|
| RED | `16 failed \| 83 passed (99)`, exit `1` — 12 contract-mapped, 4 pre-existing harness defects |
| after `234` | `4 failed \| 95 passed`, exit `1` — lifecycle `78/78`; auth-mock shape blocked 3 route cases |
| after `238` | `1 failed \| 98 passed`, exit `1` — denial lever retired in the route |
| after `240` | `1 failed \| 98 passed`, exit `1` — denied case fixed; lever leaked past its sub-case |
| after confinement | **`2 passed (2)` files, `99 passed (99)`, exit `0`** |

- Layer: **pure** (provider-independent) — no DB, network, browser or provider contact.
- db-touch: not run (none authorized, none required). safety invariant: unchanged. regression: no case removed or
  skipped; total rose 96 → 99.

## 6. What is proven

- The operator projection carries the durable option byte-for-byte, preserves null, and fails closed on blank or
  empty option text rather than yielding a partial or invented line.
- The durable creation instant is emitted exactly or not at all — four distinct malformed inputs all yield null, so
  no current or inferred time can reach an operator.
- The line region is a semantic list of separated cards with the frozen field order, the honest image absence,
  integer KRW formatting, and no buyer/contact/address field.
- The KST formatter is correct on the day boundary and states `확인 없음` for five malformed inputs.
- The three route cases prove their original contracts again — flag-disabled, denied, view-outcome mapping and
  detail-outcome mapping — with denial now driven through the authorization the route actually consults.

## 7. What is NOT proven

- **Pure only.** No typecheck, build, DB, runtime, browser or provider verification was authorized or run. The two
  widened SQL column lists are proven against the faithful in-memory repository, **not** against PostgreSQL — a
  column-name or driver-shape error would not have been caught here.
- Rendered DOM is unverified; the panel is proven at source-contract level plus the pure formatter.
- The route file itself was never opened by me; its authorization contract is taken from your read-only evidence in
  `238`, and the harness now encodes that assumption.
- No claim is made about how the seven-product candidate checkout populates options — it currently writes null, and
  nothing here converts that into text.

## 8. Questions for review

1. Is the fixed +9 offset acceptable long-term, or should the formatter move to a tz-database implementation?
2. Does narrowing the image assertion to the card markup still satisfy `228`'s "no legacy image" intent?
3. Should `empty option`, added beyond the named `blank`, stay in the fail-closed matrix?
4. Should a db-touch test cover the two widened SELECTs before this reaches any real database?

## 9. Rollback

`git -C <product> revert b652a8b2ea6a8221a764d42190c318ac2a005d0e` — a single commit containing exactly the six
paths; reverting restores `52343f5`.

RETURN_TO: foundation-advisor
