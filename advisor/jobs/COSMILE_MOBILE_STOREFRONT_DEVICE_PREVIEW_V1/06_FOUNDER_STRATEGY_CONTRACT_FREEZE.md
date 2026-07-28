# FOUNDER / STRATEGY CONTRACT FREEZE

STATUS: FROZEN_BY_FOUNDER_AND_STRATEGY
DATE_UTC: 2026-07-28
SUPERSEDES_FOR_ROUTING: the STOP disposition in `03_HOLD_POINTER.md` and `05_HOLD_POINTER.md`
PRESERVES_AS_EVIDENCE: `02_DESIGNER_EXECUTION_HOLD.md` and `04_DESIGNER_XHIGH_RECOVERY_RESULT.md`

The Designer supplied useful direct evidence but no artifacts. Leo and Strategy fixed the product direction and authorized implementation from the already committed admission/handoff. This document records that Founder/Strategy contract; it is not an Advisor-authored design substitute.

## Product contract

1. No new route, `/preview/mobile`, iframe, duplicated storefront, or duplicated commerce logic.
2. The existing customer routes render through the same real O1 shell and data:
   `/`, `/shop`, `/wishlist`, `/cart`, `/account/orders`, `/account`, product detail, and order detail.
3. At desktop viewport width `>=768px`, only the O1 customer shell appears as one centered polished iPhone-style device. The outer frame is visual only: dark precision bezel, restrained shadow, rounded screen, and a code-native non-factual sensor treatment. No fake time, carrier, battery, or commerce datum.
4. Below `768px`, the device stage/frame decoration collapses completely. The customer shell is edge-to-edge, full width, with no double frame, rounded clipping, outer shadow, or horizontal overflow.
5. `/dashboard`, `/console`, `/lab`, and every operator route keep the current early short-circuit and receive no device wrapper or customer CSS.
6. The inner customer layout responds to the contained screen width, not the outer desktop viewport. Use one named inline-size CSS container and convert only the existing O1-specific width breakpoints to container queries. Legacy/O1-OFF CSS remains.
7. Desktop-device scrolling is inside the screen: header/context remain coherent, the main customer content scrolls, and the bottom tab bar remains visible inside the device. Genuine mobile keeps the current safe-area behavior and 200%-text reflow guard.
8. Mobile navigation has exactly six existing destinations in this order:
   Home `/`; Shop `/shop`; Wishlist `/wishlist`; Cart `/cart`; Orders `/account/orders` (also active for `/orders/*`); MY `/account`.
9. Each O1 tab icon is code-native inline SVG using `currentColor`, `aria-hidden="true"`, and `focusable="false"`. No emoji, font icon, remote asset, external image, or dependency. Korean labels and `aria-current="page"` remain.
10. Each tab target is at least `44×44px`. Cart is visually obvious through a bounded persimmon/ink icon treatment without fabricating a count or claiming active state when another route is current.
11. Preserve the accepted O1 palette, current seven-product runtime truth, all real links, focus visibility, reduced motion, loading/empty/error states, and customer behavior.

## Exact product path ceiling

1. `app/src/app/layout.tsx`
2. `app/src/components/layout/MallTabs.tsx`
3. `app/src/app/globals.css`
4. `app/src/app/account/page.tsx` — comment-only removal of the superseded “no sixth Wishlist tab” statement
5. `app/scripts/o1_storefront_navigation.vitest.ts`
6. `app/scripts/o1_storefront_visual_shell.vitest.ts`

No seventh product path.

## Test meaning disposition

The two focused suites contain old assertions that the O1 surface has no device frame and exactly five tabs without Wishlist. Those expectations are `CONTRACT_DRIFT_FOUND`, superseded by this explicit Founder/Strategy contract. Tests must be changed first to preserve stronger risks:

- O1-only wrapper; operator and O1-OFF exclusion;
- no iframe or new route;
- container-width responsiveness;
- six exact existing destinations;
- inline SVG and no O1 emoji;
- accessible active state, targets, safe area, reduced motion, and reflow;
- desktop frame plus genuine-mobile edge-to-edge.

Do not weaken unrelated assertions or change pass counts for convenience.

## Completion gates

- Meaningful focused RED before source implementation.
- Identical focused GREEN after source implementation.
- Exact six-path containment and clean/upstream-equal pushed product branch.
- Original-size isolated screenshots: desktop `1440×900`, mobile `390×844`.
- Desktop: one polished device, real customer shell, six visible tabs inside, Cart obvious.
- Mobile: no outer/double frame, no overflow, six SVG tabs, no tofu.
- Current seven cards and all tested existing links truthful; browser errors `0`; provider/economic effects `0`.
- Exact-delta independent review: actual Opus 5/max plus `/fable-sentinel`.
- No public cutover until Strategy visually accepts both original-size screenshots.
