# ADVISOR HANDOFF — BOUNDED CUSTOMER DEVICE-SHELL DESIGN

MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1
ACTOR: Foundation Designer
SESSION: existing `foundation-designer` role session only
MODEL/EFFORT: actual Claude Opus 5 / max, live-verified
RETURN_TO: foundation-advisor
CLASSIFICATION: BOUNDED_VISUAL_DESIGN

## Mandatory reads

Read the common operating model, Designer role, result protocol, this handoff, and:

`/home/leo/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md`

Use `/frontend-design`. Do not implement product code.

## Read-only evidence ceiling

Product worktree:
`/home/leo/Project/.worktrees/Cosmile/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1`

Read only:

1. `app/src/app/layout.tsx`
2. `app/src/components/layout/MallTabs.tsx`
3. `app/src/components/layout/AppHeader.tsx`
4. `app/src/app/page.tsx`
5. the O1 customer section of `app/src/app/globals.css`
6. the exact existing customer route files for `/`, `/shop`, `/wishlist`, `/cart`, `/account/orders`, and `/account`
7. the two admitted original-size screenshots named in `00_ADMISSION.md`

No additional repository exploration, browser interaction, authentication, DB, runtime, or network action.

## Frozen design question

Design the same real customer storefront DOM and routes as:

- one centered, refined iPhone-style device on desktop at `1440x900`;
- one edge-to-edge customer surface on a real mobile viewport at `390x844`.

There is no separate preview route, no iframe, and no duplicate route/component/data tree. Operator spaces are outside this design.

The desktop frame must have deliberate material, radius, shadow, safe insets, and a coherent non-fabricated sensor/header treatment. The inner content must behave by its contained width, not the outer desktop viewport. Mobile removes the outer frame/shadow/padding and must not double-frame or overflow.

The mobile bottom navigation has exactly six existing destinations:

| label | route | icon concept |
|---|---|---|
| 홈 | `/` | house |
| 상품 | `/shop` | storefront/grid |
| 찜 | `/wishlist` | heart |
| 장바구니 | `/cart` | cart |
| 주문내역 | `/account/orders` | receipt/package |
| MY | `/account` | person |

All icons are beautiful code-native inline SVGs using `currentColor`, with no emoji, webfont, external image, or platform glyph dependency. Preserve readable Korean labels, one active destination, obvious but truthful Cart, visible focus, screen-reader labels/current state, and controls at least 44px. Do not invent a cart count.

Keep the accepted storefront palette and current seven-product truth. Do not redesign cards, home content, product images, or commerce states.

## Required outputs — exact paths only

Write only:

1. `advisor/jobs/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/10_DESIGNER_VISUAL_CONTRACT.md`
2. `advisor/jobs/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/11_DESIGNER_DESKTOP_1440x900.svg`
3. `advisor/jobs/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/12_DESIGNER_MOBILE_390x844.svg`
4. `advisor/jobs/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/13_DESIGNER_RESULT.md`

The SVGs must be deterministic, exact-size, Korean-legible with local font-family fallbacks, and contain no remote asset. The contract must specify geometry, breakpoints/container behavior, scrolling/sticky behavior, six icon forms, active/inactive/focus states, desktop/mobile acceptance, and exact exclusions. Keep the result under 60 lines.

Open both SVGs at original size before return. If either has clipping, overlap, tofu, unreadable Korean, fake product data, or a second mobile frame, return `DESIGN_NOT_READY`.

Do not commit or push. Return the four paths and STOP.
