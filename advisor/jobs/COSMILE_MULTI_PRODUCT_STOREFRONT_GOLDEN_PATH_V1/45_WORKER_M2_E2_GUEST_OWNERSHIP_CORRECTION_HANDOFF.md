# M2 E2 GUEST OWNERSHIP CORRECTION — WORKER HANDOFF

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `a39773aeb75bae50dd3a398319b036cfabe7d1b8`, clean/upstream-equal.
- Actor: same Cosmile Worker, Opus 5/xhigh, `/fable-builder`; tests first.
- Preserved facts: 3 active carts/3 items are durably present; every cart is ownerless; items match the admitted product; order/payment/refund effects `0`. Do not reset them.

## Proven defect

- Google mode derives a guest only from `cosmile_gid`, but no current Google/O1 boundary issues that cookie before the first favorite/cart mutation.
- `getOrCreateCart` and `toggleWish` accept `{userId:null,guestId:null}` and persist ownerless rows.
- Reads correctly fail closed via `guestId="__none__"`, so POST acknowledgement and subsequent SSR ownership diverge.

## Exact product ceiling

1. `app/src/lib/shopperIdentity.ts` (new, pure)
2. `app/src/lib/shopper.ts`
3. `app/src/middleware.ts`
4. `app/src/lib/cart.ts`
5. `app/src/lib/wishlist.ts`
6. `app/scripts/o1_guest_owner_projection.vitest.ts` (new)

## Frozen correction

1. Add a pure default-deny guest-bootstrap decision and owner XOR predicate. Re-export existing shopper cookie constants without changing callers.
2. In O1 Google-enabled non-production only, middleware preserves `x-pathname` and issues one opaque high-entropy `cosmile_gid` cookie only when both verified session and guest cookie are absent. Cookie: HttpOnly, SameSite=Lax, path `/`, bounded max-age, `secure` derived fail-closed from the configured public base. Never expose/log the value.
3. Cart and wishlist mutations reject ownerless or dual-owned shapes before any Prisma read/write. Existing authenticated and valid guest ownership/merge semantics remain unchanged.
4. Do not alter API payloads, cart pricing, catalog, auth session, checkout, provider, DB schema, or economic behavior.

## Tests-first command

Create the exact focused test first, then run and preserve RED:

`cd app && ./node_modules/.bin/vitest run scripts/o1_guest_owner_projection.vitest.ts --config vitest.config.ts -t "O1 guest ownership projection"`

The test must prove middleware issue/preserve/refuse cases, opaque cookie attributes without value output, `x-pathname` preservation, owner XOR, and guards appearing before cart/wishlist Prisma mutation. Patch the five source paths only, then run the identical command once for GREEN.

## Completion

- Exact six-path diff; `git diff --check`; package/lock/schema unchanged.
- No DB/runtime/browser/provider/payment/refund command or data cleanup.
- One additive commit, non-force push, clean/upstream-equal; compact PASS/HOLD; STOP.
