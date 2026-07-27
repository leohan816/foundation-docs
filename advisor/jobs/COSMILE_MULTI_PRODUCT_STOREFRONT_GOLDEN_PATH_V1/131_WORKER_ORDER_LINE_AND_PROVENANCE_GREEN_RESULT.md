# WORKER RESULT — ORDER LINE + PROVENANCE, CORRECTED FOCUSED GATE

Status: **HOLD** — the one corrected focused GREEN failed. Stopped at the first failure with no retry and no diagnosis, per disposition 129.

## Pins

- Disposition `129` at docs `39c39971e234e181b1ab61b8fcc18ac095019233`; computed sha256 `6baeb9ead2e4148e840eef72e31eef7292e39fb9b23ed4181a506a8af422fcc9`.
- Handoff `125` implemented in its five source paths. Product base `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`; **no commit made**.

## What was applied

Stale string oracle corrected exactly as named: `operatorActionSurface(mode, legacyActionsEnabled)` → `grantAwareOperatorActionSurface(mode, legacyActionsEnabled…)`. The three preserved test deltas are otherwise unchanged.

Handoff 125 implemented across the five authorized source paths:

- `contracts.ts` — `OperatorOrderLine` (title, nullable sku, quantity, unitPrice, totalPrice) and raw `OperatorOrderLineData`; `lines` added to both `OperatorOrderData` and `OperatorOrderView`.
- `repository.ts` — `operatorOrderData` reads existing `OrderItem` values only (`productNameSnapshot`, `skuId`, `quantity`, `unitPrice`, `totalPrice`) ordered by row id; no join to buyer, payment, provider or reservation data.
- `service.ts` — validates every line (non-blank title, null-or-non-blank sku, positive integer quantity, non-negative integer unit/total, and `totalPrice === unitPrice * quantity`) and fails closed as the existing `repository_error`; authorization still precedes repository access.
- `O1OperatorPanel.tsx` — one Korean table (`상품`, `SKU`, `수량`, `단가`, `합계`), `l.sku ?? "—"`, integer KRW via `toLocaleString("ko-KR")`; existing surfaces untouched.
- `o1CommerceRuntime.ts` — the verified `snapshotContentSha256` flows through the priced line and `O1CheckoutOrderCreateInput`, and the one real create path connects `foundationSnapshot` by `snapshotContentSha256`. It is **not** added to `deriveO1OrderNo` or the exact-replay tuple.

## The corrected focused GREEN (run once)

`2 failed | 1 passed (3)` files, `3 failed | 15 passed | 85 skipped (103)`, exit `1`.

| # | Test | Exact failure |
|---|---|---|
| 1 | `checkout-start idempotent order boundary > keeps snapshot provenance out of the derivation and the exact-replay comparison entirely` | `ReferenceError: readFileSyncSource is not defined` |
| 2 | `checkout-start idempotent order boundary > connects foundationSnapshot by snapshotContentSha256 in the one real create path` | `ReferenceError: readFileSyncSource is not defined` |
| 3 | `operatorOrderView … > returns bounded counts for an authorized operator, leaking no ids` | `AssertionError: expected { orderNo: 'ono_o1', …(8) } to deeply equal { orderNo: 'ono_o1', …(7) }` — the received object carries the new `lines` array |

Characterisation only, no diagnosis performed beyond what the run printed:

- **1 and 2 are defects in my own test edits**, not in the source: I used a `readFileSyncSource` helper that exists in a different suite and never defined it in `o1_checkout_start_idempotency.vitest.ts`. The two cases therefore never evaluated their source-contract assertions.
- **3 is a stale whole-object equality oracle** in a pre-existing case: it asserts the operator view deep-equals a 7-key object, so admitting `lines` breaks it. Handoff 125 §"Tests-first oracles" item 1 authorised updating directly stale oracles of this class, but disposition 129 named only the WU-1 string oracle, so I did not touch it and I am not touching it now.

None of the three indicates the implemented contract is wrong; none was weakened, skipped or normalised.

## State

- Working tree holds exactly the eight ceiling paths, uncommitted: 266 insertions, 6 deletions. `git diff --check` exit `0`; `package.json`, `package-lock.json`, `prisma/` unchanged. No ninth path.
- Product HEAD remains `76497d6…`; nothing committed or pushed to the runtime repo.
- No schema, migration, DB, runtime, browser, provider, build, typecheck, refund or economic action. Seven-SKU shared-path evidence and the one-SKU captured economic evidence remain separate and untouched.

## Blocker

Advisor decision required — I will not choose unilaterally:

1. authorise fixing the two `readFileSyncSource` references in `o1_checkout_start_idempotency.vitest.ts` (define the helper in that suite), **and**
2. authorise updating the stale whole-object equality oracle in `returns bounded counts for an authorized operator, leaking no ids` to account for the newly admitted `lines` key,

then one re-run of the identical corrected focused gate.
