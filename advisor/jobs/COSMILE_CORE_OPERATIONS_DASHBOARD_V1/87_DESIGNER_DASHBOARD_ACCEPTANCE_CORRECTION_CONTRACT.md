# M5C Dashboard Acceptance Correction Contract

## 1. Authority and bounded outcome

- Mission: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Phase: `M5C_DESIGN_ONLY`
- Authority: verified handoff `86_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION_HANDOFF.md`.
- Outcome: the smallest acceptance correction that makes the existing Console dashboard an obvious desktop operations workspace.
- Preserve: the existing Console/Lab space switcher, Korean truth warning, route set, three reviewed reads, six-state vocabulary, authorization behavior, and Storefront separation.
- Change in the future implementation candidate only: desktop rail persistence and dashboard-home information density.
- This contract authorizes no product write, route, read, command, mutation, schema, API, fixture, or provider work.

## 2. Evidence-bound disposition

| Existing evidence | Retain | Acceptance correction |
|---|---|---|
| `OperatorShell.tsx` contains the exact operations entries and a `250px` rail only at `lg` | Labels, ordering, links, inert rows, focus/reduced-motion behavior | At `lg` and above, keep the rail visible and independently stationary while main content scrolls |
| Below `lg`, the shell uses a horizontal operations strip | Existing responsive access and 44px minimum targets | Retain the strip; do not introduce a new drawer, bottom navigation, or command |
| Dashboard home performs exactly three reviewed reads | Request, bounded order, and reconciliation reads | Re-compose only their already-returned truth into a concise queue and summary |
| Home renders five verbose seven-field ledger cards | Truth, authority, recovery, and prohibition semantics | Replace the home-page card repetition with three compact action rows; keep unsupported facts in a separate truth summary |
| Bounded order result exposes only opaque order number plus category/status | Its safe projection and six-state behavior | A recent-order summary may reuse that same result once; no second read or broader field |
| Inventory and audit have no aggregate/read contract | Explicit unknown state | Never infer zero, health, or completion |

## 3. Pass one — system, layout, and signature

### 3.1 Existing visual system

No new font or brand system is introduced.

| Token | Hex | Use |
|---|---|---|
| Canvas | `#F4F6F4` | Main workspace background |
| Ink / rail | `#17211C` | Primary text, Console chrome, desktop rail |
| Surface | `#FFFFFF` | Panels and action rows |
| Confirmed | `#167A64` | Confirmed state and active/focus accent |
| Attention | `#A15C16` | unavailable, not configured, not implemented |
| Critical | `#A23A37` | denied |

- Type stack: retain the product system stack; Korean glyph fallback must remain native and legible.
- Roles: 28/34 semibold page title; 18/26 semibold section title; 15/22 medium row title; 14/21 body; 12/18 state/meta.
- Spacing: use the existing 4px rhythm with `8 / 12 / 16 / 24 / 32px` steps.
- Corners and shadows remain restrained; state and hierarchy must not depend on elevation.

### 3.2 Desktop spatial contract

At viewport widths `>= 1024px`:

```text
┌──────────────────────────── global SpaceSwitcher · 52px ────────────────────────────┐
├──────────────────────── Korean synthetic/non-production truth rail · 36px ──────────┤
│ operations rail · 250px │ independently scrolling main workspace                    │
│ persistent below y=88   │ page heading                                               │
│                         │ ┌─ triage spine ─ 지금 처리할 일 · three compact rows ───┐ │
│ supported + inert nav   │ └────────────────────────────────────────────────────────┘ │
│                         │ ┌─ 운영 요약 ─────────────┐ ┌─ 최근 주문 ───────────────┐ │
│                         │ └─────────────────────────┘ └────────────────────────────┘ │
└─────────────────────────┴────────────────────────────────────────────────────────────┘
```

- Global chrome remains `88px` total: `52px` space switcher plus `36px` truth rail.
- Rail is exactly `250px` wide and fills `calc(100dvh - 88px)`.
- Rail top remains at `88px`; page scrolling must not displace it.
- Rail and main workspace are sibling regions. Main content owns vertical page scroll.
- Main content has `32–48px` responsive inset, a readable maximum line length, and no centered marketing container.
- The first operational content after the page heading is the action queue, never a KPI grid.

### 3.3 Responsive contract

At viewport widths `< 1024px`:

- Preserve the existing horizontal operations strip instead of inventing another navigation model.
- Keep source order, keyboard scrolling, visible active state, and at least `44×44px` interactive targets.
- Main content becomes one column; action rows stack their destination beneath the state/fact at narrow widths.
- Recent orders follows the operational summary.
- No horizontal page overflow is permitted; the navigation strip alone may scroll horizontally.
- The Korean truth warning remains visible before operational content.

### 3.4 Restrained signature

Retain the existing truth-first character as a **triage spine**: one `3px` vertical accent at the leading edge of the action queue, paired with explicit state text. It identifies the work surface without charts, gradients, oversized numerals, or decorative dashboard furniture.

## 4. Pass two — critique and refined behavior

### 4.1 Generic-dashboard critique

Reject these patterns:

- equal-weight KPI tiles that imply unsupported counts or business health;
- a top navigation strip on desktop that makes operations look storefront-adjacent;
- five repeated seven-field cards before a user can see the next action;
- charts, trends, revenue, customer identity, provider data, or invented zero values;
- color-only status, decorative icons, hover-only disclosure, or animated entry effects.

The refined hierarchy is: **truth rail → action queue → bounded operational summary → evidence gaps/state legend**.

### 4.2 Desktop operations rail

The rail must present these entries in the existing order:

| Entry | Disposition | Visible treatment |
|---|---|---|
| Dashboard | Existing link | Active on `/dashboard` |
| Orders | Existing link | Normal supported route |
| Customers | Inert | `NOT_IMPLEMENTED · 아직 구현되지 않음` |
| Products | Inert | `NOT_IMPLEMENTED · 아직 구현되지 않음` |
| Inventory | Inert | `UNAVAILABLE · 현재 조회할 수 없음` |
| Fulfillment | Existing link | Normal supported route |
| Payments & Refunds | Inert | `NOT_IMPLEMENTED · 아직 구현되지 않음` |
| Support | Existing link | Normal supported route |
| Reconciliation | Existing link | Normal supported route |
| Audit | Existing link | Normal supported route |
| Settings | Existing link | Normal supported route |

- Inert entries have no `href`, remain `aria-disabled="true"`, and do not simulate navigation.
- Supported entries remain anchors to their existing destinations; no route is added or renamed.
- English capability names may remain as source-owned labels, but state explanation and page guidance are Korean-first.

### 4.3 Dashboard-home hierarchy

1. Page heading: `오늘 처리할 일`
2. One concise sentence: this surface reports only reviewed Console reads.
3. Action queue, in this order:
   - customer-request response → existing `/dashboard/requests`;
   - fulfillment check → existing `/dashboard/orders`;
   - reconciliation check → existing `/dashboard/finance`.
4. Operational summary:
   - request read truth;
   - bounded order read truth;
   - reconciliation read truth;
   - explicit inventory and audit evidence gaps.
5. Recent orders, only under the reuse rule in §4.5.
6. Compact six-state legend and synthetic/non-production reminder.

Each action row is `72px` minimum on desktop and contains:

- action name and one-line question;
- explicit state code plus Korean state label;
- one bounded fact only when state permits;
- one existing-route text link;
- a short recovery line only for non-confirmed states.

Do not repeat the seven headings `question / authority / nextStep / prohibited / recovery / state / id` in every home row. Authority and prohibition remain product rules, not dashboard ornament.

### 4.4 Truth-state matrix

| State | Korean label | Fact behavior | Interaction behavior |
|---|---|---|---|
| `CONFIRMED` | `확인됨` | Show only the returned bounded fact | Existing destination remains available |
| `CONFIRMED_ZERO` | `확인된 0건` | Show zero only when the read explicitly confirms zero | Existing destination remains available |
| `UNAVAILABLE` | `현재 조회할 수 없음` | Show no count, stale value, or inferred health | Show bounded recovery guidance |
| `NOT_CONFIGURED` | `연결되지 않음` | Show no count or substitute value | Show configuration/recovery guidance already supported |
| `NOT_IMPLEMENTED` | `아직 구현되지 않음` | Never imply a backing capability | Keep the capability inert |
| `DENIED` | `권한 없음` | Suppress protected facts and denial details | No bypass; preserve authorization boundary |

Every state uses code, Korean text, and shape/border treatment together. No state is communicated by color alone.

### 4.5 Recent-order reuse rule

- Source: reuse only the result already returned by the dashboard’s reviewed bounded order read.
- The home must not call that read a second time.
- Display at most three rows, in the source result’s existing order.
- Allowed fields: opaque order number and already-returned category/status only.
- Forbidden fields: customer/session identity, price, totals, refunds, payment data, provider data, dates not already present, or derived analytics.
- `CONFIRMED_ZERO` renders `확인된 0건`, not placeholder rows.
- `UNAVAILABLE`, `NOT_CONFIGURED`, or `DENIED` renders the state panel with no rows.
- If safe reuse cannot be expressed without expanding the projection, omit the recent-order rows and retain the bounded order truth state.

## 5. Source-to-design mapping

| Exact source evidence | Design reliance | Forbidden expansion |
|---|---|---|
| `app/src/components/operator/OperatorShell.tsx` | Space switcher, truth rail, operations ordering, supported/inert semantics, `lg` breakpoint, focus and reduced-motion floor | No Storefront chrome, new route, drawer, or command |
| `app/src/app/dashboard/page.tsx` | Heading, three reviewed reads, current five ledger facts, six states, existing destinations | No additional read, mutation, fabricated aggregate, or broader field |
| `app/scripts/o1_core_dashboard_shell.vitest.ts` | Exact route/inert ordering, `250px` rail, target size, focus, reduced motion, Storefront exclusion | No test or runtime change in this phase |
| `app/scripts/o1_core_dashboard_reads.vitest.ts` | Action ordering, bounded order reuse constraints, six-state truth, prohibited sensitive/economic fields | No test or runtime change in this phase |

## 6. Accessibility and motion floor

- Use a semantic `nav` with an accessible operations label, one `main`, and ordered headings.
- Active route uses `aria-current="page"`; inert capability rows use `aria-disabled="true"` and are not focusable links.
- Keyboard focus is a persistent `2px` outline with at least `2px` offset and does not rely on shadow alone.
- All links and scroll-strip targets are at least `44×44px`.
- Text and status borders meet WCAG AA contrast against their surfaces.
- DOM order matches visual order: global chrome, truth rail, operations access, heading, queue, summary, recent orders, legend.
- Status announcements must not continuously re-announce on ordinary focus.
- With `prefers-reduced-motion: reduce`, remove transition and scrolling animation; no acceptance behavior depends on motion.
- At 200% zoom and at 390px width, content remains readable without horizontal page scrolling.

## 7. Focused acceptance checks

1. At `1440×900`, the rail is visibly `250px` wide, starts below the `88px` global chrome, fills the remaining viewport, and does not move when main content scrolls.
2. At `1024px` and above the rail is left-positioned; below `1024px` the existing horizontal strip provides all entries.
3. The first dashboard section is a three-row action queue: requests, fulfillment, reconciliation.
4. Dashboard home no longer leads with five verbose seven-field ledger cards or a KPI grid.
5. Dashboard, Orders, Fulfillment, Support, Reconciliation, Audit, and Settings are obvious existing links.
6. Customers, Products, Inventory, and Payments & Refunds are inert and visibly state-labeled.
7. Inventory and audit gaps never render as zero or healthy.
8. The home performs only the existing three reviewed reads.
9. Any recent-order rows come from the already-returned bounded order result, max three, with only opaque order number plus category/status.
10. All six truth states retain exact codes and Korean labels and remain understandable without color.
11. Focus, 44px targets, reduced motion, Korean-first guidance, and synthetic/non-production warning remain visible.
12. No Storefront chrome, new route, command, mutation, sensitive field, economic metric, chart, or invented fact appears.

## 8. Exclusions and STOPs

- No product, runtime, API, schema, DB, test, fixture, provider, browser, secret, or deployment action.
- No customer-management, catalog, inventory, payment/refund, analytics, AI, automation, event, pricing, or listing implementation.
- No competing Console or Storefront-embedded operator shell.
- No interpretation of an unavailable read as an empty or successful read.
- Any need for a new route, read, field, mutation, authorization rule, or product write returns to `foundation-advisor`.
