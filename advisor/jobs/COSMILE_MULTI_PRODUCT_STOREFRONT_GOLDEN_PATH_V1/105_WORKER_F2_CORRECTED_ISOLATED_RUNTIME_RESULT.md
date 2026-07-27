# F2 CORRECTED ISOLATED CATALOG RUNTIME GATE — WORKER RESULT

Status: **PASS** — both one-shots succeeded; every protected count and category unchanged.

- Handoff `104` verified: docs `2c9a9eadf858af16e64b6af6a98d6aaea521d6d0`, sha256 `b76b7cf7e6b200afd17f362aee335bfe95a6358b60404b3ac60cbe5c8c3620d4`.
- Pins unchanged throughout: Cosmile `8a1a5b70c8b6df1f9aaf75cf40821d761a089ae7` clean/upstream-equal · Foundation `966db20822b7accb36c33dedb01ffba51a9bef68` clean · vault `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf` clean.

## Preconditions

Bundle re-verified read-only: `ok=true`, `reason=null`, `manifest_count=1`, `snapshot_count=7`; owner-only `0700` `leo:leo`. Exactly one listener on `127.0.0.1:3000`, CWD the mission app, owner `leo`, **not restarted** (uptime `86141 s`, same process across the whole gate). Gates verified before running: non-production `true`, runtime flag exactly `true`, Google exactly `true`, Toss mode `test`, Toss secret `test_`-prefixed, **sandbox one-shot `false`**, **local substitute `false`**, bundle-root override exact. Environment loaded into process memory only; overrides limited to `COSMILE_O1_FOUNDATION_BUNDLE_ROOT` and `O1_TEST_CANDIDATE_SETUP=1`.

## One-shots

| Run | Result | Exit |
|---|---|---|
| #1 corrected initial apply | `1 passed (1)` file, `2 passed (2)` tests | `0` |
| #2 authorized idempotent replay | `1 passed (1)` file, `2 passed (2)` tests | `0` |

Both runs asserted the frozen contract inside the one-shot: `imported = 7`, `bound = 7`, `activated = 7`, `offersCreated = 0`. The E4 correction is confirmed at runtime — the predecessor stage that previously threw `ReferenceError` now resolves, and the import completes.

## Candidate read-back

| Check | Value |
|---|---|
| candidate snapshots at `missing_initial` | **7** |
| candidate bindings (`o1tc_` → one of the seven) | **7** |
| bindings agreeing with SKU product **and** candidate snapshot | **7** |
| candidate SKUs total | **7** |
| candidate SKUs active and non-hidden | **7** |
| candidate `CommerceOffer` rows | **0** |
| incomplete eighth snapshots / SKUs | **0 / 0** |
| representative predecessors superseded | **1** (exactly once) |
| representative structural heads | **1** |
| products with split heads (whole table) | **0** |

Snapshot lifecycle after: `missing_initial` 7 + `superseded` 1. Mutable counts moved `1 → 8` for `FoundationProductSnapshot`, `SkuBinding` and `CommerceSku` — exactly seven new rows each, no more. The replay added nothing: totals are 7 candidates, not 14.

## Protected state: byte-for-byte unchanged

- `protected_counts_identical = true`, `protected_diffs = none` across **every** public table (all non-authorized tables, named or not).
- `order_categories_identical = true` — `pending:2`. `reservation_categories_identical = true` — `reserved:2`. The two preserved ambiguous pending orders and two reserved holds are untouched.
- Order, cart, wishlist, customer, identity, session, payment, refund, reservation, shipment, reconciliation and audit counts all equal the fresh baseline.

## Containment

- Only the three handoff-92 transient files were created under owner-only `f2/evidence/` (`0700` dir, `0600` files) and all three plus the empty directory were removed — verified absent. No scratchpad, `/tmp`, log, PID or other path.
- Bundle preserved unmodified: 9 files, 0 symlinks. No bundle rewrite.
- No tracked write, schema/migration, package/lock change, runtime restart, build, typecheck, other test, provider, browser, Google, Toss, checkout, order, refund or economic action. Git state identical before and after.

## Not proven

- The seven candidate rows are proven present, bound, active and non-hidden **at the database level**. No HTTP request was made, so storefront rendering of the seven through `o1EligibleCatalog` is not proven by this gate.
- The pre-existing representative SKU (`o1sku_…`) still exists and is `active`/`on_sale`, while its snapshot is now `superseded` — so that legacy SKU is expected to fail closed at the catalog decision. That behaviour was not exercised here.
- No checkout, payment, order or refund path was touched; economic effects remain zero.
