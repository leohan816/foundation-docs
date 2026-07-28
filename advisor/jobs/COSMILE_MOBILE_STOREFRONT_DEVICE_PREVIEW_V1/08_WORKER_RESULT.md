# WORKER RESULT — CUSTOMER DEVICE SHELL IMPLEMENTATION

STATUS: **IMPLEMENTED — focused gate green, product pushed**
MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1
ACTOR: existing Cosmile Worker, actual Opus 5 / xhigh, `/fable-builder`
RETURN_TO: foundation-advisor

## Pins

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1`
- Branch: `implementation/cosmile-mobile-storefront-device-preview-v1-20260728`
- Base: `a10604121aeba0207c12bb1cce8e961e73ad7abc` (ancestry verified)
- Result commit: `82fb922b64a38d563db91cc87736a229fa5558dc`, non-force pushed with upstream; tree clean, upstream-equal
- Authority: contract `06` + `06A`, handoff `07` + `07A`

## Sequence actually executed

1. Verified base/branch/clean state; produced the contract-to-code mapping.
2. One authorized install: `npm ci --ignore-scripts --no-audit --no-fund` in `app/` — 422 packages, `vitest` present, **no generated Prisma client**, tracked delta 0. No lockfile or package change.
3. **HOLD before any patch** — the mapping showed contract §6 could not be honoured without reddening three accepted suites outside the then-six-path ceiling. Advisor issued `06A`/`07A` extending the ceiling to nine paths.
4. Patched all five test files first.
5. RED, exact five-suite command, run once: **`13 failed | 41 passed (54)`**, 5 files failed.
6. Implemented the four source paths.
7. First GREEN attempt: `2 failed | 52 passed (54)` — both failures mine, both in-ceiling. Held without retry; Advisor approved exactly two corrections.
8. GREEN, identical command, run once: **`5 passed (5)` files, `54 passed (54)`, exit 0**.

## What the source now does

| Contract | Implementation |
|---|---|
| §1/§2 same shell and data | additive O1-only wrappers around the existing shell; real `children` render once; no route, iframe, duplicated storefront or commerce logic |
| §3 desktop device ≥768 | `@media (min-width: 768px)` centres a visual-only device: dark bezel, restrained shadow, rounded screen. States no time, carrier, battery or commerce datum |
| §4 below 768 collapse | stage has no padding, frame, radius or shadow; shell is edge-to-edge, full width |
| §5 operator space | early short-circuit untouched; no device wrapper or customer CSS reaches it |
| §6 contained width | `.o1-device-screen` is the **only** `container-type: inline-size` declaration, named `o1-screen`; every O1-specific 640/1024/1280 breakpoint converted from `@media` to `@container o1-screen`. Legacy/O1-OFF CSS untouched |
| §7 scrolling and tabs | in the device the screen is height-contained, `.o1-main` scrolls, tabs become a shell flex item; genuine mobile keeps fixed safe-area tabs and the `max-height: 480px` reflow |
| §8 six destinations | `/`, `/shop`, `/wishlist`, `/cart`, `/account/orders` (also active for `/orders/*`), `/account`, in that order |
| §9 code-native icons | one same-file inline-SVG primitive per tab: `currentColor`, `aria-hidden="true"`, `focusable="false"`. No emoji, font icon, remote asset or dependency in the O1 region; legacy emoji arrays untouched |
| §10 targets and Cart | O1 bar gets a six-column override (legacy five-column base rule preserved); each target keeps the ≥44px floor; Cart has a bounded persimmon/ink icon chip that fabricates no count, and active state comes only from pathname |
| §11 preserved truth | palette, runtime catalog truth, real links, focus, reduced motion and state copy unchanged |

`account/page.tsx` received the comment-only removal of the superseded "no sixth Wishlist tab" statement.

## Test-meaning disposition

- `CONTRACT_DRIFT_FOUND`, superseded by the explicit Founder/Strategy contract: the "exactly five tabs, no sixth Wishlist" and "no device frame / tabs hidden above 640px" expectations.
- The three responsive suites keep every breakpoint value, selector, composition and protected risk; only the *source* of width truth moved from outer viewport to the named container.
- `@media (max-height: 480px)` reflow and `prefers-reduced-motion` expectations are unchanged.
- No assertion deleted, skipped, weakened, or count-reduced. Total cases rose from 54 to 54 with strictly more coverage (device wrappers, container uniqueness, SVG contract, six-tab order, contained scrolling).

## Containment and inspection

- Exactly **nine** changed paths, no tenth, no new file, no dependency/lockfile/manifest change.
- `git diff --check` clean.
- Executable forbidden tokens in the source delta: `<iframe` 0, `src=` 0, `srcDoc` 0, `/preview/mobile` 0, `9:41` 0. Emoji in the O1 tab region: 0.
- **Disclosed:** the strings `iframe`, `통신사`, `배터리` appear once each as **prose inside my own explanatory comment** in `layout.tsx` (declaring what the frame must not do). They are not code and trip no oracle; I left them because the approval authorised no further change.
- No backend, schema/migration, DB/data, auth/session, cart/order/payment/refund/provider, operator/dashboard, Foundation/AI, public runtime, browser, build or full-suite action.

## Not proven

- Source-contract level only. **No browser, build, typecheck or screenshot evidence exists** — the `1440×900` and `390×844` original-size gates in contract §"Completion gates" remain outstanding and are the only way to confirm the device renders as one polished frame, that six tabs fit without clipped Korean labels or horizontal scrolling, and that no double frame or overflow appears on mobile.
- Container queries are proven as declared CSS, not as computed layout; that a 390px screen suppresses the 1024/1280 rules is asserted structurally, not measured.
- Seven-card runtime truth, link truthfulness and `0` browser errors are unverified here.
- Public cutover remains prohibited until Strategy visually accepts both screenshots.

## Next actions for Advisor

1. Isolated original-size browser gate at `1440×900` and `390×844`.
2. Exact-delta independent review (actual Opus 5/max, `/fable-sentinel`).
3. Decide whether the disclosed comment prose in `layout.tsx` should be reworded in a later bounded correction.
