# P2 Designer Handoff — Storefront and Customer Account Candidate

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
ACTOR: existing Foundation Designer, `foundation-designer:codex.0`
PRODUCT_BASE: `51ef5f2b4d576979f4b432f114151755f02f3385`
MODE: design candidate only; no runtime implementation

## Required evidence

Read the committed P1 results 12, 14, corrected 17, and fact supplement 20. Result 17 supersedes result-14 C1: the O1 cart checkout is already connected.

Read only the target source already admitted in handoff 11 plus:

- `app/src/components/commerce/{O1TossCheckout.tsx,O1OrderStatus.tsx}`
- `app/src/components/layout/MallTabs.tsx`
- `app/src/components/category/CategoryDrawer.tsx`
- `app/src/components/product/{ProductCartFab.tsx,ProductCarousel.tsx}`
- the customer projection slices identified in result 20.

Load `/frontend-design`. Use its two-pass subject/token/layout/critique process, but preserve the existing Cosmile palette, type, shell, cards, navigation family, and Korean-first copy. No new visual system, signature motif, font, or redesign.

## Candidate contract

Specify the smallest coherent experience for:

1. O1-truthful home, catalog, and eligible product detail using existing cards/data only.
2. Existing cart and O1 Toss TEST checkout with clear idle/busy/failure/return/recovery states, duplicate-submit protection, live status, focus restoration, and no new payment semantics.
3. Account, order history, stable detail, sanitized truthful timeline, and cancellation/support status/actions. Timeline may show only projected durable facts; unknown dates/events remain unlabeled or absent.
4. Existing mobile shell at 320/390/768px, truthful tab/drawer/cart behavior, no inert control.
5. Shared loading/empty/error/not-found/HOLD vocabulary and accessibility floor: keyboard, visible focus, 44px target, reduced motion, live/alert/busy semantics, 200% text.

For each surface include retained elements, exact state matrix, Korean copy, responsive behavior, accessibility behavior, component reuse, forbidden/deferred content, and acceptance criteria. Clearly distinguish `CURRENT`, `REPAIR`, `DEFERRED`, and `UNVERIFIED`.

The candidate must not add personalization, recommendation judgment, rich content unsupported by O1 data, customer PII, operator UI, new auth/payment/provider behavior, schema, or economic semantics.

## Exact writes

Product:

- `app/docs/COSMILE_O1_STOREFRONT_CUSTOMER_ACCOUNT_COMPLETION_DESIGN.md`
- `app/docs/COSMILE_O1_STOREFRONT_CUSTOMER_ACCOUNT_FLOW_BOARD.svg`

Docs:

- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/23_P2_DESIGNER_CANDIDATE_RESULT.md`
- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/24_P2_DESIGNER_CANDIDATE_POINTER.md`

Open the SVG at original size and perform one self-critique against the written state matrix. Stage only the two product paths; commit once and non-force push. Leave docs results uncommitted. No runtime/test/build/typecheck/DB/browser/provider/network/secret action. Result <=80 lines.

RETURN_TO: `foundation-advisor`
STOP for independent design review.
