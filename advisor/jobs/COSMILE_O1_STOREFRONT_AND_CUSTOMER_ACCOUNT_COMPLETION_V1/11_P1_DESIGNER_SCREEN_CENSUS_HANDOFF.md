# P1 Designer Handoff — Screen and Experience Census

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
ACTOR: existing Foundation Designer, `foundation-designer:codex.0`
MODE: read-only as-built screen census; no candidate or implementation yet
PRODUCT_BASE: `51ef5f2b4d576979f4b432f114151755f02f3385`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
DOCS_WORKTREE: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`

## Required entry and skill

- Read current Agent Office entry docs, Team operating model, Designer role, result protocol, product/app rules, and this committed handoff.
- Load `/frontend-design`.
- Apply only its subject-grounding, two-pass critique, responsive, keyboard-focus, reduced-motion, and clear empty/error-copy floor. The mission overrides any urge to create a new palette, font system, signature motif, or redesign.
- Live-confirm Designer role, `gpt-5.6-sol/max`, exact per-command product/docs workdirs, clean base, and no product writer.

## Exact read ceiling

- `app/src/app/{globals.css,layout.tsx,page.tsx,shop/page.tsx,products/[id]/page.tsx,cart/page.tsx,account/page.tsx,account/orders/page.tsx,orders/[orderId]/page.tsx}`
- `app/src/components/layout/{AppHeader.tsx,CategoryNav.tsx}`
- `app/src/components/product/{AddToCartButton.tsx,CartList.tsx,ProductCard.tsx,ProductCarousel.tsx,ProductCartFab.tsx}`
- `app/src/lib/order/o1OrderServiceRequestBadge.ts`
- `app/docs/{COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md,COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md}`
- `설계자료/COSMILE_O1_고객취소_최소운영큐_설계서.md`

No runtime/browser start is authorized. Inspect source and committed design evidence only; label every visual conclusion `SOURCE_INSPECTION`, not browser proof. Do not read operator/console/admin/legacy/AI surfaces.

## Required compact result

For home, catalog, product detail, cart, checkout transition states, account/history/detail/timeline, cancellation/support status, mobile navigation, accessibility, empty/error/loading:

- current experience and exact evidence path;
- coherence/usability gap;
- existing visual/component/copy token to retain;
- state or acceptance need for the later Designer candidate;
- classification `RETAIN | REPAIR | DEFER | UNVERIFIED`.

Conclude with the smallest candidate design agenda and any fact that requires Worker technical evidence. Do not draw the final IA or write product code in this pass.

## Writes and prohibitions

Write only:

- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/12_P1_DESIGNER_SCREEN_CENSUS_RESULT.md`
- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/13_P1_DESIGNER_SCREEN_CENSUS_POINTER.md`

in the docs worktree. Do not commit or push. No product write, runtime, test, build, typecheck, DB/provider/network/secret action. Result <=80 lines.

RETURN_TO: `foundation-advisor`
STOP.
