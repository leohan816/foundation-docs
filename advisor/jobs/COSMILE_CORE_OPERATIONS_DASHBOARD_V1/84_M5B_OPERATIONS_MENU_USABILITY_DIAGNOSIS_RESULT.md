# M5B operations-menu usability diagnosis — Worker result

VERDICT: `USABLE_AT_FROZEN_DESKTOP_VIEWPORT` — no product correction proposed, no write performed.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · ACTOR existing Cosmile Worker (`cosmile:claude.0`) · Opus 5/xhigh · SKILL `/fable-builder` implementation-execution (read-only classification)
HANDOFF: docs `e2e27d59cd540edc83932ef12c87d47675158cb7`, blob `53d81df7ac71db92ac496bed50c4c6228aa91b4e`, SHA256 `5f3d1465ec9384692afda2b88f7e1ef539c9aabdba8fd4c45660e4232d23b863`; worktree copy identical to the commit.
READ: exactly the two permitted product paths plus the captured geometry in the handoff. No browser rerun, login, cookie, DB, runtime or provider action; no product or test file changed.

## Why the verdict is not "SSR labels exist"

The claim rests on captured geometry, not markup: at 1440×900 the operations nav is present, the list computes to `block`, the rail measures 250×484, **11 of 11 rows are fully visible**, and there is no horizontal overflow. A rail 484px tall is exactly eleven 44px rows, so every row is laid out at full target height. That is a rendered-usability fact, not an SSR-label inference.

## Mechanism — both reported conditions are explained without any CSS defect

The shell applies the rail only at Tailwind `lg`: `lg:w-[250px]`, `lg:block`, `lg:overflow-visible` on the list, and `lg:flex-row` on the container. Below that breakpoint the list is the intended bounded strip, `flex overflow-x-auto` with `shrink-0` rows, whose intrinsic width is ~1336px. That exactly reproduces the captured 980px case (7/11 visible, scroll width 1336 vs client 980) and the 390px case (3/11 visible, same 1336). Both sub-`lg` captures are the designed strip behaving as written, not a broken rail.

Independently, `SpaceSwitcher` is `sticky top-0 z-30` while `OperationsNav` is in normal flow inside the vertically scrolling `fixed inset-0 overflow-y-auto` frame. So at any downward scroll position the Console/Dashboard/Lab switcher stays pinned while the operations rail scrolls out of view. That alone produces the exact reported symptom — "only the top switcher appears usable" — at a fully conforming desktop viewport.

## Exact instruction (option 1)

1. **Minimum CSS viewport width: 1024 CSS px.** All four rail rules key off Tailwind `lg` (min-width 1024px). Captured proof of the working state is at 1440×900; 1024–1439 is derived from the breakpoint rule in source and is *not* independently captured. 980 CSS px is captured as the collapsed strip, so the failing and passing bands are both evidenced.
2. **Zoom / emulation: 100% page zoom (Ctrl+0), device emulation and responsive-design mode off.** What matters is the CSS viewport width, not the window's physical width: at 150% zoom a 1440px-wide window presents 960 CSS px and falls below `lg`. A side-docked DevTools panel subtracts from the CSS viewport the same way — undock it or dock to the bottom.
3. **Scroll position: the operations frame at top (`scrollTop` 0, e.g. `Home`).** The rail is not sticky; only the space switcher is. After scrolling down the ledger, the rail is above the viewport and only the switcher remains — which is the reported appearance.

Meeting all three simultaneously reproduces the captured 1440×900 state with all eleven rows visible and reachable.

## Why no correction is proposed

At the frozen desktop viewport the menu is already fully usable by capture, so a presentation change would not fix a defect that does not exist there, and the handoff bars claiming otherwise. The sub-`lg` strip is the presentation M3 landed and the Advisor accepted.

## Observation the Advisor may want to schedule separately (not part of this verdict, no proposal made)

The captured 980px case sits in design §8's tablet band (768–1023px), where the frozen design specifies a 72px icon/short-label rail with full labels on focus and in an accessible menu. The shipped behavior in that band is the mobile horizontal strip instead — a known divergence already declared in the M3 result, not a newly discovered defect, and not the cause of the reported symptom at the frozen desktop viewport. Resolving it would be a separate authorized module; nothing is proposed or changed here.

## Not proven

No authenticated browser was driven in this module, so the verdict describes the frozen captured geometry rather than a fresh observation of Leo's session. Whether Leo's specific window was below 1024 CSS px, zoomed, or merely scrolled down is not determinable from the evidence supplied — all three produce the same report, and the instruction above covers each. Keyboard reachability, focus order and 200% zoom behavior of the rail were not measured.

## Boundaries

No source, test, docs implementation, browser rerun, login, cookie, DB, runtime, provider, economic, feature, route, menu row or design change. Product worktree untouched: no write, no commit, no push. Only the two named docs files were authored and committed. No agent/sub-agent/delegation, self-review, risk acceptance or approval.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
