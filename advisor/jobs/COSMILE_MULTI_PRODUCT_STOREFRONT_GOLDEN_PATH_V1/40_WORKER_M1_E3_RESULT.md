# Worker result — M1 E3 reused favorite ownership oracle

OUTCOME: `PASS` — identical focused command, run once: **11 passed (11)**. Product committed and pushed once. This closes the `31`, `34` and `37` holds and completes M1.

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1` · MODULE `M1_MULTI_PRODUCT_STOREFRONT_E3`
ACTOR: same existing Cosmile Worker · Opus 5 / xhigh.
HANDOFF: docs `2bf9500945c17bee27ea1d713059979e8166a7a9`, blob `4a795870f4d8cf5a67e71a74cac0e911328cc7f6`, SHA256 `521d2608cac547e6cc416766b79e9e3b2a997b99e26312a7f7d7182513ef0750` — verified. Every command began with `cd --` to the exact worktree.
BASE `1efde21e2942696b585b8c27e2980e97795cb3e1` → HEAD `f0842bd96e54b6b5b757a390578247d7483a0776`; base is ancestor, upstream created and equal, worktree clean.

## The correction — one assertion, one test path

In `app/scripts/o1_multi_product_storefront.vitest.ts`, inside the 44px test, `expect(card).toContain("wish-card-btn")` was replaced by a normalized assertion that the card renders the reused favorite in its card variant: `<WishlistButton productId={item.foundationProductId} initialWished={wished} variant="card"`. That respects the frozen reuse boundary — `WishlistButton` owns its own class; the card's obligation is to select the canonical component contract.

All E1 assertions in the same test are unchanged: the last line-anchored standalone `.wish-card-btn { … }` block still must exist with its closing brace and declare `min-width:44px` and `min-height:44px`, and the file-level `:focus-visible` and `prefers-reduced-motion` guarantees still must hold. No other edit, no source change, no read.

## Evidence chain

RED **11 failed (11)** → first GREEN **1 failed / 10 passed** (hold `31`) → E1 cascade-winner CSS correction, **1 failed / 10 passed** (hold `34`) → E2 diagnostic named the failure exactly at `:129:18` (`37`) → E3 **11 passed (11)**. The E1 correction is now also genuinely exercised, since the assertion that previously short-circuited the test passes.

## Containment and effects

`git diff --check` clean. Exactly the eight ceiling paths staged and committed (6 modified, 2 new): the five route pages, the new shared card, `globals.css`, and the new focused test. No ninth path; no config, manifest, lockfile, schema, migration, runtime, API, auth, payment, refund, dashboard or fixture path. `package.json` and `package-lock.json` unchanged; `node_modules` remains git-ignored. Leftover unstaged/untracked `0`; post-push delta `0`.

Effects `0` — no DB, provider, process, port, runtime, browser or economic action; the npm registry fetch during the single authorized `npm ci` was the only network boundary in this module. The reused `WishlistButton` and `AddToCartButton` were never modified.

## What M1 proves

At source-contract level: Home and Shop each map the complete `o1EligibleCatalog` with no slice, cap or alternate source and show a count derived from the rendered array; the shared card exposes three non-nested targets carrying only admitted truth and the existing SKU for server pricing; detail stays admitted-only behind `decideProductRoute`/`notFound` and gained the durable favorite; wishlist intersects saved ids with the admitted array without a legacy lookup; cart returns its own generic unavailable, sold-out, removable row before any legacy lookup and keeps exactly one guarded legacy lookup on the flag-OFF path; the 44px favorite target, orange focus ring and reduced-motion rules are declared.

## Not proven

Nothing rendered or executed. No runtime, browser, build or typecheck ran, so the 390×844 and 1440×900 frames, keyboard order, screen-reader behaviour, 200% text growth, Korean glyph rendering and the actual cascade of the appended CSS are unverified. The favorite and cart paths were never exercised against a live owner, and the Golden Path transitions beyond source structure — Google identity, Toss TEST handoff, order and reversal — are untouched and unverified here.

RETURN_TO: foundation-advisor
STOP
