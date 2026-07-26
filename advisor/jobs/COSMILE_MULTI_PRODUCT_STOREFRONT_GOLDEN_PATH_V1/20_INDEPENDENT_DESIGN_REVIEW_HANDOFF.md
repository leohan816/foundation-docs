# Independent design review handoff

MISSION_ID: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
PASS: `DESIGN_REVIEW`
TIER: `HARD_IMPORTANT_SAFETY`
REASON: the frozen UI contract carries Google-only identity, Toss TEST-only
checkout, admitted-catalog fail-closed behavior, and existing full-reversal
semantics into implementation; review must detect any misleading or bypassing
presentation before product write.

## Binding

- ACTOR: existing independent `foundation-reviewer-fable5`
- MODEL / EFFORT: actual `Fable 5` / `max`
- SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- REFERENCES: `contract-review.md`, `provenance-review.md`,
  `review-classification.md`
- Current Agent Office operating model and Reviewer role are authoritative.
  The V2 role-boundary document is historical procedure evidence only.
- Every command must be explicitly rooted in one of the two exact worktrees
  below; the process root from the completed predecessor mission is not evidence.

## Exact snapshots

- Docs worktree:
  `/home/leo/Project/.worktrees/foundation-docs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Docs branch:
  `advisor/cosmile-multi-product-storefront-golden-path-v1-20260726`
- Docs candidate: `c0fd02331e0633113c893bebcc41ac159f4398e8`
- Product worktree:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product branch:
  `implementation/cosmile-multi-product-storefront-golden-path-v1-20260726`
- Product baseline: `1efde21e2942696b585b8c27e2980e97795cb3e1`
- Admission: `00_ADVISOR_ADMISSION.md`
- Designer handoff: `10_DESIGNER_STOREFRONT_REUSE_HANDOFF.md`
- Candidate: `11_DESIGNER_STOREFRONT_REUSE_CONTRACT.md`,
  `12_DESIGNER_STOREFRONT_REUSE_CANDIDATE.svg`
- Designer report/pointer: `13_DESIGNER_STOREFRONT_REUSE_RESULT.md`,
  `14_DESIGNER_STOREFRONT_REUSE_POINTER.md`

## Direct source ceiling

Inspect only these baseline files, read-only:

1. `app/src/app/page.tsx`
2. `app/src/app/shop/page.tsx`
3. `app/src/app/products/[id]/page.tsx`
4. `app/src/app/cart/page.tsx`
5. `app/src/app/wishlist/page.tsx`
6. `app/src/components/product/ProductCard.tsx`
7. `app/src/components/product/WishlistButton.tsx`
8. `app/src/components/product/AddToCartButton.tsx`
9. `app/src/components/layout/MallTabs.tsx`
10. `app/src/app/globals.css`

## Criteria

1. The design reuses the original visual structure without reintroducing mock
   identity, fabricated discounts/timers, group-buy, fake recommendation, or AI
   execution claims.
2. Home and Shop bind to the complete `o1EligibleCatalog` result, never a
   representative slice or a fabricated count; unusable records fail closed.
3. Every admitted card has distinct, non-nested detail, durable favorite, and
   cart actions; admitted-only detail cannot fall through to legacy/mock truth.
4. Google is the only identity transition, Toss TEST the only checkout handoff,
   and the existing order/history/full-refund economics are not redefined.
5. Current source shapes can implement the contract without a schema,
   migration, new read/write authority, alternate dataset, or broad rewrite.
6. Mobile/desktop, keyboard, focus, 44px target, screen-reader, failure, empty,
   unavailable, reduced-motion, and Korean copy contracts are implementable.
7. The SVG and Markdown correspond, including dynamic `0..8` admitted count and
   explicit per-item omission behavior.

## Prohibitions

No patch, product/config/schema/DB/runtime/browser/provider/network/test/build,
commit to product, risk acceptance, scope expansion, or broad repository read.
Do not rerender the SVG. Do not trust the Designer result without direct source
and committed-artifact evidence.

## Output

Write only:

- `21_INDEPENDENT_DESIGN_REVIEW.md` (maximum 80 lines)
- `22_INDEPENDENT_DESIGN_REVIEW_POINTER.md`

State actual model/effort/skill/references, exact snapshots, criterion coverage,
blocking findings only, residuals, and one verdict:
`PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`.
Commit and non-force push only these two docs files to the current docs branch,
verify clean/upstream-equal, return to `foundation-advisor`, and STOP.
