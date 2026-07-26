# Independent design review — COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1

VERDICT: `PASS`

PASS TYPE: `DESIGN_REVIEW` · tier `HARD_IMPORTANT_SAFETY`.
REVIEWER: independent Foundation Reviewer · actual runtime Fable 5 (`claude-fable-5`) / max · session separate from Advisor/Designer/Worker.
SKILL: `/fable-sentinel` + contract-review, provenance-review, review-classification (loaded before inspection).
LAUNCHER PIN (corrected): `20` at docs `c4a3baf194a90c97fc14e631a6c6ad332398b957`; blob `6d8d03d59b8e340b8c020f549a3e224847d81809`; SHA256 `2f85bf106175cf11b5a09b8541426c704827b3358bfee24ca495830289436618` — verified. The originally dispatched pin (`3d1f5398`/`b1db8847`/`bff685c3…`) was also verified; its four shorthand component paths do not exist and were corrected mid-review by Advisor commit `c4a3baf` to the exact files this review had already resolved and read. Zero evidence impact.
SNAPSHOTS: docs candidate `c0fd0233` (parent `2623ae4f`, matching the Designer-reported uncommitted base; freezes exactly 11/12/13/14; zero drift to HEAD). Product worktree `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1` at exact baseline `1efde21e`, clean, read-only throughout. Designer handoff `10` blob/SHA256 match the values reported in `13`.
METHOD: read-only file reads + `git`/`grep` over the 10-file corrected ceiling, the design package `00/10/11/12/13/14`, and the SVG as committed text (not rerendered). No product write, test, build, runtime, browser, provider, network, or sub-agent.

## Criterion coverage

1. SATISFIED — the contract reintroduces none of the baseline flag-off hazards, which are real in source (`page.tsx`: `MOCK_USER` curation, fabricated `price*1.4` list price, hardcoded timers, group-buy rows, "전부 AI가 실행" flag). §1/§11 exclude mock identity, discounts/timers, group-buy, fake recommendation, and AI-execution claims; the SVG carries only `{{…}}` bindings and no product identifier or fabricated asset.
2. SATISFIED — Home and Shop bind to the complete `o1EligibleCatalog` array (baseline already renders the full array with no slice); §1/§4/§6 forbid slicing/representative lists; counts derive from the displayed array; visible count is explicitly dynamic `0…8`; unusable records stay individually fail-closed with no tile, gap, or manufactured eighth card.
3. SATISFIED — §5 card anatomy mandates three separate non-nested targets (detail link, `aria-pressed` favorite, cart), correcting the current nested legacy card; admitted-only detail cannot fall through because the baseline already enforces `decideProductRoute` → `notFound` and §6 Detail preserves it.
4. SATISFIED — Google is the only identity transition (`Google로 계속하기`; Apple/email/mock-user explicitly excluded), Toss TEST the only checkout handoff (`Toss TEST로 주문하기 · 실제 청구 없음`), and §7/§11 keep Golden Order, full reversal, and O1 history as untouched existing contracts.
5. SATISFIED — implementable from current shapes without schema/migration/new authority/alternate dataset/broad rewrite: `WishlistButton` already has optimistic-revert toggle, `aria-pressed`, and 찜하기/찜 해제 labels; `AddToCartButton` already has the server-priced add, busy copy `장바구니에 담는 중…`, persistent success `장바구니에 담겼어요. 장바구니 보기`, generic `role=alert` failure with focus return; `MallTabs` O1 tabs are exactly 홈/상품/장바구니/주문내역/MY with `aria-current`; §3 tokens match `globals.css :root` character-for-character (`#f6f5f3`/`#1b1714`/`#6b645e`/`#f2622a`/`#d94f1c`/`rgba(27,23,20,.10)`); Cart already resolves O1 line identity against the admitted map; the Wishlist O1 branch is an additive page-level change over existing `getWishedProductIds` + catalog resolution.
6. SATISFIED — §8/§9 fix exact Korean copy per state (empty/unavailable/omission/favorite/cart/Google/checkout), keyboard/focus-ring, ≥44px targets, screen-reader naming, live regions, 200% text growth, and reduced-motion; the semantics required are ones the existing components already exhibit, so the contracts are implementable.
7. SATISFIED — the SVG and Markdown correspond: exact `390×844` and `1440×900` frames; `{{displayName}}`/`{{price}}`/`{{eligibleItems.length}}` bindings only; `VISIBLE COUNT … 0…8`, `NO SLICE · NO REPRESENTATIVE LIST`, and explicit per-item omission (`판정 실패 항목은 카드·빈 칸을 만들지 않음`, `COUNT RECOMPUTES FROM RENDERED ARRAY`); state-ledger copy matches §8 and the existing component copy verbatim.

## Blocking findings

None. No STOP condition exists: no safety-weakening path, no source-of-truth contamination, no broken join/route contract, no undecidable value set; a Worker can implement from this contract without inventing copy, hierarchy, breakpoints, or state behavior.

## Residuals (non-blocking — no risk accepted by this Reviewer)

- R1 SVG drawing drift: desktop card action buttons are drawn at 42px and header icon circles at 40px while §9 requires ≥44×44 for all interactive targets. The Markdown rule and acceptance map item 10 are normative and unambiguous; mobile-frame targets are drawn at 44px. Implementation must follow §9.
- R2 Cart orphan line: §6 Cart decides the safety boundary (line identity only from the admitted collection; never legacy/mock identity — note the baseline cart still has a legacy fallback that O1 implementation must not use), but does not enumerate the exact rendering of a persisted line whose product is no longer admitted (omit vs unavailable row). Recommend the Advisor pin this one treatment at module freeze.
- R3 Copy standardization deltas vs baseline (Shop provenance/empty strings, Wishlist empty string) are intended target-state changes with §8 as the single source, not contradictions.
- R4 Launcher path drift (four nonexistent shorthand paths) was a docs-process defect only, corrected at `c4a3baf`; no product or evidence impact.

RETURN_TO: `foundation-advisor` — Worker admission remains an Advisor/Leo decision; this Reviewer grants no closure and accepts no risk.
STOP
