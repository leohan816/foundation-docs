# 32 — Independent Design Re-review

PASS: `DESIGN_REVIEW` delta re-review · VERDICT: **`PASS`** · F1–F6 all `CLOSED` · REGRESSION 0 · `RETURN_TO: foundation-advisor`

**Binding.** Actual live `claude-opus-5` / effort `max` / `/fable-sentinel`; existing independent Reviewer session; only the two mission workdirs. Docs candidate `61b450cb0f678f6827a257a0c99c05f14f58a4d9` (ancestor of dispatch HEAD `4ae0cae`); reviewed delta `da1f4d04..61b450cb` = 4 commits, 14 files, all inside this job dir (+340/−82). Product `8d4a3272…` read-only, **worktree clean, 0 changed files**. Per handoff 31 I did not render, reread product source or runtime, or touch old-mission context.

## Q1 — F1–F4 closed without contradiction

- **F1 CLOSED.** Headline is now count-free (`오늘 만나는 / 테스트 컬렉션.`), the label dropped `· 07`, and `<desc>` no longer says “일곱”. Every surviving count/sequence is annotated to its source: `data-bind="catalog.length"` (hero 07, `7개`), `data-repeat="catalog"` (hero tile field), `data-bind="index + 1"` (all seven ledger marks), `data-bind="catalog[n]"` per card. `12` §1–§2 and `11` restate the rule and now also forbid copying counts/sequence into static markup. Mobile dropped its static `01 /` sequence.
- **F2 CLOSED.** One primitive, two frozen variants: `12` §6 now reads radius **16 px** with the exact `312×194` card and `112×170` media rail (matching `13` byte-for-byte), §5 freezes the desktop rail and names the mobile two-column **vertical 4:3** variant, and `11` records them as responsive forms of one component, not a second one. The prior 14 px / “Media is 4:3” contradiction is gone.
- **F3 CLOSED.** Every persimmon action label lost `class="white"` and inherits ink `#18211D` (≈4.91:1): seven desktop Cart labels, the mobile Cart label, and both cart-count badges (gate `29` item 2). Residual `class="white"` text appears **only on pine `#24463C`** (context strip, `전체 상품 보기` pill, `CUSTOMER TEST SURFACE`) at ≈10.4:1. `12` §3 adds the absolute rule.
- **F4 CLOSED.** `AvailabilityStatus` is separated (`상품 상태` → `구매 가능 상태`, own row, own copy) and one `id="mobile-add-status-slot"` with `aria-live="polite"` sits directly below the Cart action inside the bar. `12` §6 states focus stays on the originating Cart action, the persistent Cart link is next in tab order, `AddStatus` never carries sold-out, and at 200 % the bar and slot enter normal flow after availability.

## Q2 — F5/F6 closed with no new route, component or behavior

- **F5 CLOSED.** `12` §5 and `11` `/account` name the existing Wishlist row and live count badge as the deliberate mobile entry, explicitly forbidding a sixth tab or duplicate route. The five reviewed tabs are unchanged.
- **F6 CLOSED.** The duplicate heart was removed from the purchase bar (Cart action widened to a single full-width control); the identity-level control carries `id="mobile-wishlist-control" data-state-source="wishlist"`, and `11` fixes one control, one `aria-pressed`, one announcement.

## Q3 — truthful at seven, and at eight only when admitted

Bindings are to `catalog`/`catalog.length`/`index + 1`, never to a literal; the visual still shows the honest seven-item snapshot, ends at card 07, and reserves nothing. No count survives in words. `11` keeps “no blank eighth tile or incomplete-product content”.

## Q4 — deterministic enough to implement

Card geometry, radius, media rails and both breakpoint variants; action contrast; `AddStatus` slot, focus, tab order and 200 % behavior; single Wishlist state source and its mobile entry — all are now stated as values, not intentions. No remaining item requires Worker UX invention.

## Q5 — exclusions preserved, effects zero

Delta is documentation only (5 corrected artifacts + 4 new records, all in the job dir). SVGs keep exact `1440×900` / `390×844`, no `<image>`, `data:`, `xlink:href`, `@import` or `<script>`. No promotion, claim, KPI, recommendation, route, data contract, commerce-behaviour change or deletion plan appeared; legacy-parallel and Golden Reversal HOLD language is intact; product/runtime/DB/provider/browser/economic effects `0`. `27` now reports render provenance truthfully (Designer raw-headless child stalled and was contained without output; Advisor completed the finite CDP render; no Actor terminated), satisfying gate `29` item 4 — I did not re-render, so Korean legibility this cycle rests on that Advisor evidence, not my own.

## Non-blocking observations

1. `12` §7 still permits white on persimmon “at sizes/weights that pass” while §3 forbids it at normal size — compatible (≈3.36:1 clears the 3:1 large-text bar) but worth one sentence at the next edit.
2. The mobile bar’s `장바구니 가격은 서버가 다시 확인합니다.` was displaced by the status slot; the server-reprice truth now lives only in the mist panel’s pricing-basis copy.
3. Both card-name lines share `data-bind="item.displayName"`; the two-line clamp is defined in `12` §4 but the annotation reads as two fields.
4. The mobile catalog card variant remains frozen **textually only** — no mobile grid visual exists (two visuals were the authorized scope); verify it at implementation review.
