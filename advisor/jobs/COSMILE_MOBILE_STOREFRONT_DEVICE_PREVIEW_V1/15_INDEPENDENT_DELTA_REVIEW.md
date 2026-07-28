# 15 — Independent Delta Review: device shell

VERDICT: **`PASS_WITH_NONPRODUCT_RESIDUAL`** · blocking **0** · `RETURN_TO: foundation-advisor`

Binding: actual `claude-opus-5` / `max` / `/fable-sentinel`; handoff `14` @ docs `e80ffbb` sha256 `57b23d2e…`; product `a1060412..82fb922b` in the exact candidate worktree = 1 commit, **exactly 9 paths** (4 source + 5 tests), clean. Read-only: no test/build/browser/runtime/DB/provider action, no mutation, no commit.

**Containment: PASS.** `layout.tsx` decides `operatorSpace` (`/console`, `/dashboard`, `/lab`) **before** any storefront chrome and returns bare `children`, so the new stage cannot reach operator surfaces — matching `13`'s "`/dashboard` … customer device wrapper absent". The legacy `<div className="device">` branch is byte-unchanged, and `MallTabs`' legacy `LEFT`/`RIGHT`/emoji sets are untouched (tests still pin `👥`).

**One real shell: PASS.** The three wrappers nest the *same* shell, header, context note, `{children}`, footer, tabs and drawer — no iframe, no second storefront, no preview route, no duplicated logic; `{children}` renders exactly once (asserted). Icons are code-native inline SVG `path` constants with `currentColor`; no emoji, font icon, remote asset, or dependency was added.

**Contained responsiveness: PASS.** `.o1-device-screen` is the single named `inline-size` container, and every O1 width breakpoint (grid 640/1024/1280, detail 7/5, cart 8/4, order placement, header/nav/footer/main) is now `@container o1-screen`. Inside a 390 px screen the mobile presentation therefore holds at any viewport, and the test explicitly forbids a viewport rule hiding the tabs — closing the wide-viewport regression class. The only viewport rules left are the intentional `min-width: 768px` frame, `max-height: 480px` reflow, and reduced motion. Below 768 px the stage collapses fully (`padding/frame/radius/shadow` absent), which both PNGs and `13` confirm (mobile device width = 390 px viewport, overflow 0).

**Six routes, semantics, targets: PASS.** `O1_TABS` is the frozen six in order (`/`, `/shop`, `/wishlist`, `/cart`, `/account/orders`, `/account`), each an existing route; `aria-current="page"` still derives from `pathname` alone; SVGs carry `aria-hidden`/`focusable="false"` with the Korean label as the accessible name; `grid-template-columns: repeat(6, 1fr)` is scoped to `.o1-shell`; the `:where(a,button,summary)` 44 px floor still applies. Cart is obvious via a persimmon chip with ink glyph (≈4.9:1) that invents no count. Wishlist now has both the tab and the retained account row — an explicit contract change (`06`/§8), not a contradiction of the prior "no sixth tab" rule, and the account comment was updated to say so.

**Tests: PASS.** The rewrites convert `@media` oracles to `@container` and re-pin the frozen six; nothing was normalized away. The added negative assertion (no viewport rule may hide the tabs) is a genuine regression guard for the defect class this delta could have introduced.

**Dev indicator: nonproduct residual, not blocking.** The black `N` sits outside the device on desktop and over the bottom-left tab on mobile. It comes from `next dev`, not from the nine paths (no source or config in the delta emits it), so it cannot ship with a production build. It does, however, sit on top of the 홈 tab in the mobile capture, so it degrades that one evidence image rather than the candidate. Strategy disposition only.

## Residuals

- **R1** Desktop frame height is fixed at `780px`; on a viewport shorter than ~884 px the stage will scroll rather than fit. Not exercised by the 1440×900 evidence.
- **R2** `@container` support is assumed; no fallback exists for engines without container queries, where every O1 breakpoint would simply never match (mobile presentation everywhere) — safe-direction, but undeclared.
- **R3** Verified from source, the two PNGs and `13` only: I ran nothing, so route/status/overflow/console counts are cited as reported, not reproduced.
