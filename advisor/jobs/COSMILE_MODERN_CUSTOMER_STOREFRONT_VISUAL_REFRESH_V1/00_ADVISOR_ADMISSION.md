# COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1 — Advisor Admission

STATUS: HOLD
DATE: 2026-07-27
INSTRUCTION_GATE: HOLD_MISSING_TRUTHFUL_DATA_AND_ACTOR_BINDING

## Exact pins

- Product base: `8d4a3272c6baced193be4f9ed88710c39c90d739`
- Product branch: `implementation/cosmile-modern-customer-storefront-visual-refresh-v1-20260727`
- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
- Docs base: `cbb5e4512ff00a42cee6357bb634b32d99965876`
- Docs branch: `advisor/cosmile-modern-customer-storefront-visual-refresh-v1-20260727`
- Existing public runtime remains the predecessor mission worktree at product `8d4a327…`, listening only through its existing `127.0.0.1:3000` boundary.
- Both new branches were created from the exact pins and pushed without product changes.

## Read-only census

- Existing customer routes cover `/`, `/shop`, `/products/[id]`, `/wishlist`, `/cart`, `/account`, `/account/orders`, and `/orders/[orderId]`.
- Current O1 home/shop map the complete result of the existing `o1EligibleCatalog`; no representative slice is used.
- Current public `/` returned seven rendered `o1-card` entries. The source of truth is therefore seven currently admitted products, not eight.
- Prior reviewed Foundation/Cosmile evidence records exactly eight canonical ELT identities but only seven active/complete candidates. `elt-serum-triplecapsule-01` remains incomplete, with zero admitted snapshot/SKU in the current lane, and must remain fail-closed.
- `app/public` contains only generic framework SVGs. No durable/licensed product packshot was found. The authorized truthful media placeholder is sufficient for design and is not a blocker.
- Current customer shell is the known `390px × 844px` `.device` frame with mobile header/bottom navigation/popup/FAB behavior. This is the presentation targeted for replacement; the reviewed cart, wishlist, Google auth, checkout, order, payment, and inventory contracts remain outside visual mutation.

## Blocking contradictions

1. **Eight-product truth is unavailable.** The mission requires an eight-product listing but forbids Foundation/data/DB changes. Rendering an eighth card would fabricate an eligible product and violate the existing fail-closed catalog contract.
2. **Designer binding is not the required model.** The preserved `foundation-designer` session is live and idle, but its actual UI binding is `gpt-5.6-sol / max`, not `Claude Opus 5 / max`. No dispatch occurred. Replacing or restarting that process was not inferred from the model requirement.

## Exact bounded resolutions

- **Option A — visual mission over current truth:** explicitly amend acceptance to “render every currently eligible product (seven now), with a layout that scales to eight automatically when the existing catalog admits the eighth.” No fake eighth tile or data write.
- **Option B — eight-product prerequisite:** first authorize and complete the separately bounded Foundation canonical-completeness closure and Cosmile import/admission for the eighth product; then resume this visual mission on an eight-item base.
- For either option, explicitly authorize rebinding only the existing `foundation-designer` role/session process to actual Claude Opus 5/max while preserving its tmux identity, or approve the existing `gpt-5.6-sol/max` binding for this design.

## Effects

- Product source/config/schema/DB/data/runtime/provider/economic effects: `0`.
- Designer/Worker/Reviewer dispatches: `0`.
- Existing preview runtime and Golden Reversal HOLD: preserved.
- No merge, deployment, production/live action, or next implementation step occurred.

RETURN_TO: Strategy/Leo
