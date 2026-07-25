# COSMILE Core Operations Dashboard — M1 디자인 계약

- Mission: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Phase: `M1_DESIGN`
- Actor: `foundation-designer`
- Product evidence: `6486019e0968de5671e43521e5cfb40d03b0bdca`
- Candidate status: `DESIGN_ONLY_NOT_IMPLEMENTED`
- Single job: **“오늘 무엇을 처리해야 하고, 무엇이 사실이며, 무엇이 막혀 있는가?”**
- Audience: 비프로덕션 O1 주문·지원·출고·정합성 운영자
- Boundary: product/runtime/auth/DB/provider mutation 없음; 수치·고객·매출·재고를 발명하지 않음
- Vocabulary relationship: 이 Core Operations Dashboard 계약은 이 Dashboard view에 한해 predecessor `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1/21_DESIGNER_IA_CONTRACT.md`의 seven-state presentation vocabulary를 supersede한다. Predecessor capability-registry evidence states는 provenance qualifier로 계속 authoritative하며, `NOT_COLLECTED`, `STALE`, `SYNTHETIC`, `UNVERIFIED`는 정직한 Dashboard unavailable/provenance presentation으로 매핑하고 절대 `CONFIRMED_ZERO`로 매핑하지 않는다.

## 1. 현재 증거와 문제 정의

### Source evidence

| Evidence | As-built fact | Design consequence |
|---|---|---|
| `app/src/app/layout.tsx:20-49` | Storefront chrome 제외 조건이 `/console`뿐이다. `/dashboard`, `/lab`에는 device/status/header/tabs/shipping/cart shell이 mount된다. | Dashboard/Lab도 Console처럼 Storefront와 분리된 root shell이어야 한다. |
| `app/src/components/operator/OperatorShell.tsx:6-58` | Console/Dashboard/Lab space switcher와 neutral fixed frame은 있으나 Dashboard left navigation은 없다. | 기존 neutral vocabulary와 space separation은 재사용하고 desktop operations rail을 추가한다. |
| `app/src/app/dashboard/page.tsx:119-205` | 현재 홈은 한 열의 D01/D03/D04/D05/D07 카드이며 action priority가 약하다. D04/D07은 조회 계약 없음으로 unavailable이다. | 처리·차단 queue를 먼저, summary fact를 뒤에 둔다. unavailable을 수치로 바꾸지 않는다. |
| `app/src/app/dashboard/requests/page.tsx:28-81` | 권한·unavailable·confirmed-zero가 분리되고 category-safe queue를 재사용한다. | 상태 의미와 safe row content는 보존한다. |
| `app/src/app/dashboard/requests/[orderId]/page.tsx:45-128` | read/action capability를 분리하고 action grant 실패는 control removal로 닫힌다. | 상세 화면은 fact pane과 mutually-exclusive action pane을 분리한다. |
| `app/src/app/dashboard/fulfillment/page.tsx:28-86` | 주문·출고 읽기와 successful empty가 분리된다. | Fulfillment는 Main fact/queue로 유지하되 purchasing 의미를 추가하지 않는다. |
| `app/src/app/dashboard/finance/page.tsx:45-103` | reconciliation counts와 recovery grant가 분리된다. | count fact와 protected recovery를 같은 카드처럼 보이지 않게 한다. |
| `app/src/app/dashboard/activity/page.tsx:14-44` | sensitive activity는 권한 gate 뒤에도 `조회 계약 없음`이다. | Audit은 `NOT_IMPLEMENTED`/`UNAVAILABLE`, 수치 없음, action 없음. |
| `app/src/app/dashboard/settings/page.tsx:14-50` | 현재 settings는 비프로덕션·합성·read-only 경계만 표시한다. | truth banner의 source copy로 재사용한다. |
| `app/src/lib/console/o1ConsoleView.ts:19-72,95-110` | unknown request는 HOLD, action grant는 exact action만 남기며 Korean state copy가 닫혀 있다. | HOLD에는 control 0; state vocabulary를 단일 source로 유지한다. |
| `app/src/components/console/O1ConsoleQueue.tsx:5-55` | queue row는 safe order number, category, status, requested time만 보인다. | customer/amount/provider/raw error를 Main에 추가하지 않는다. |
| `app/src/components/console/O1ConsoleFulfillment.tsx:26-55` | order/status/detail link만 제공한다. | “구매”나 courier execution을 암시하지 않는다. |
| `app/src/components/console/O1ConsoleFinance.tsx:144-290` | recovery는 desktop-only이고 mobile은 counts-only다. | 390px에서는 보호 조치를 숨기고 사실 확인만 허용한다. |
| `app/src/components/commerce/O1OperatorPanel.tsx:166-285` | loading/denied/error, exact action surface, HOLD, settled, mobile action omission이 존재한다. | 상세 interaction 및 recovery presentation의 as-built source로 재사용한다. |
| `app/src/app/console/page.tsx:5-19` | Console은 대화·검토이며 `V0 MOCK · 실제 서비스 제어 없음`이다. | Console을 operational Dashboard로 되돌리지 않는다. |
| `app/src/app/lab/page.tsx:11-104` | Lab은 read-only candidate registry다. | Lab에 실행·승인·승격 action을 넣지 않는다. |

### Original-size read-only observation

- Public root, Dashboard, Console, Lab inspected without login at `1440×1000`; Dashboard also at `390×844`.
- Root is a centered 390px Storefront device.
- Dashboard desktop has the operator switcher/content, but Storefront status/header overlays its heading and Storefront bottom tabs overlay the viewport.
- Dashboard 390px loses the visible space switcher behind Storefront header and retains Storefront bottom navigation.
- Lab has the same header/bottom-tab collision. Console login is the only inspected space without Storefront chrome.
- The inspection runtime rendered Korean as missing-glyph boxes because no Korean font was available locally. This is not treated as product copy evidence; Korean glyph rendering is an implementation acceptance check.

## 2. Pass 1 — compact design plan

### Subject-specific tokens

| Token | Value | Use |
|---|---|---|
| `workspace` | `#F4F6F2` | independent operations canvas |
| `surface` | `#FFFFFF` | ledger/card surface |
| `ink` | `#16231D` | left rail, primary text, structure |
| `confirmed` | `#0F766E` | CONFIRMED and CONFIRMED_ZERO |
| `blocked` | `#C2412D` | DENIED and action-blocked emphasis |
| `attention` | `#A16207` | UNAVAILABLE and NOT_CONFIGURED |

No gradient, glow, glass, shopping orange, device bezel, mall iconography or decorative KPI color.

### Type roles

- Display: `Noto Sans KR` / `Apple SD Gothic Neo`, 800, tight but not condensed; page question and section thesis only.
- Body: same Korean-safe system stack, 400/600, 15–16px desktop and 14–15px mobile.
- Data/state: `ui-monospace, SFMono-Regular, Menlo, monospace`, 11–13px, tabular numerals.
- Implementation must provide a Korean-capable deployed font fallback; no font asset is introduced by this design.

### Layout concept

An **operations ledger**, not a card dashboard: a persistent left navigation, a compact truth header, then a work ledger ordered by action/blocked status before any summary facts.

```text
DESKTOP 1440×1000
┌──────────────────────────────── global spaces + truth labels ──────────────┐
│ ┌─ LEFT NAV 250 ─┐ ┌─ TODAY / ACTION FIRST ─────────────────────────────┐ │
│ │ Dashboard      │ │ 오늘 처리할 일                                     │ │
│ │ Orders         │ │ ┌ truth rail ─ work / state / fact / safe next ┐  │ │
│ │ Customers      │ │ │ request · DENIED · no read · no action        │  │ │
│ │ Products       │ │ │ fulfillment · UNAVAILABLE · retry/read only   │  │ │
│ │ Inventory      │ │ │ reconciliation · NOT_CONFIGURED · no action   │  │ │
│ │ Fulfillment    │ │ └────────────────────────────────────────────────┘  │ │
│ │ Payments...    │ │ blocked-work explanation │ source/status panel      │ │
│ │ Support        │ │ Summary facts (no invented KPI)                    │ │
│ │ Reconciliation │ │ Six-state legend · “표현 규칙, 운영 데이터 아님”  │ │
│ │ Audit          │ └─────────────────────────────────────────────────────┘ │
│ │ Settings       │                                                         │
│ └────────────────┘                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

MOBILE 390×844
┌────────────────────────────────────┐
│ menu  COSMILE OPERATIONS  spaces   │
│ 비프로덕션 · 합성 데이터           │
│ 오늘 처리할 일                     │
│ ┌ request / DENIED ──────────────┐ │
│ └ fact + safe next ──────────────┘ │
│ ┌ fulfillment / UNAVAILABLE ─────┐ │
│ └ fact + safe next ──────────────┘ │
│ ┌ reconciliation / NOT_CONFIGURED┐ │
│ └ no protected action ───────────┘ │
│ 모바일: 사실 확인만               │
└────────────────────────────────────┘
```

### Signature element — Truth Rail

A 4px vertical rail and state node align every work row to its explicit truth state. It comes from reconciliation/queue work: operators scan proof and blockage, not decorative metrics. The rail is the only expressive device; cards, typography and borders remain quiet.

## 3. Pass 2 — generic/template risk critique and revision

Initial generic risks:

1. A top row of large totals would reproduce a generic admin template and would force unsupported numbers.
2. Equal cards would give blocked work the same weight as passive facts.
3. Rainbow state pills would make color carry truth and read as a component-library demo.
4. A responsive bottom nav would imitate Storefront and repeat the current defect.
5. A large “hero” would consume operator space without answering today’s question.

Revisions:

- Removed the KPI row and big-number hero entirely.
- Replaced equal cards with one ledger ordered `action-required → blocked → fact summary`.
- Limited color to one semantic rail plus text/icon state labels.
- Mobile uses one menu trigger and the same information order; no bottom navigation.
- Navigation seams without direct pages remain visibly `NOT_IMPLEMENTED`, not clickable promises.
- Summary facts appear below the work ledger and never show a number without a confirmed read contract.

## 4. Final information architecture

### Global spaces

1. `Console · 대화/계획/근거` — current mock/non-live labeling persists.
2. `Dashboard · 운영` — current space.
3. `Lab · 승격 후보` — read-only.

These are real page links with `aria-current="page"`; space access never implies shared authority.

### Desktop left navigation — exact order

| Order | Label | M1 behavior |
|---:|---|---|
| 1 | Dashboard | active home |
| 2 | Orders | entry to current request/order facts when routed |
| 3 | Customers | `NOT_IMPLEMENTED`, no href |
| 4 | Products | `NOT_IMPLEMENTED`, no href |
| 5 | Inventory | `NOT_IMPLEMENTED` aggregate; order-level inventory fact remains in detail |
| 6 | Fulfillment | current `/dashboard/fulfillment` |
| 7 | Payments & Refunds | placement seam; current exact refund action remains request-detail only |
| 8 | Support | entry/filter seam over current request queue; no invented support CRM |
| 9 | Reconciliation | current `/dashboard/finance` |
| 10 | Audit | current `/dashboard/activity`, truthfully unavailable |
| 11 | Settings | current `/dashboard/settings` |

Unsupported rows use text `아직 구현되지 않음`, `aria-disabled=true`, no href, no click handler.

### Dashboard home order

1. Persistent truth strip: `격리 비프로덕션 · 합성 데이터 · 실제 운영/고객 데이터 아님`.
2. Page thesis: `오늘 처리할 일`.
3. Work ledger:
   - 취소·지원 요청;
   - 출고 대기;
   - 정합성 HOLD/복구;
   - supported order-level inventory risk.
4. Blocked-work panel explaining why no action is possible and the safe next step.
5. Summary facts: request read, fulfillment read, reconciliation read, sensitive activity contract—no revenue/KPI.
6. State legend explicitly labeled `표현 규칙 · 운영 데이터 아님`.

Each ledger row has exactly: operator question, state, last confirmed fact/copy, authority, permitted action, prohibited action, recovery.

## 5. Exact truth-state contract

| State | Korean visible label | Screen-reader label | Meaning | Action |
|---|---|---|---|---|
| `CONFIRMED` | `확인됨` | `상태: 확인됨` | exact read succeeded and returned a supported fact | only capability-approved action |
| `CONFIRMED_ZERO` | `확인된 0건` | `상태: 확인된 0건` | exact successful read returned zero | no empty-state escalation |
| `UNAVAILABLE` | `현재 조회할 수 없음` | `상태: 현재 조회할 수 없음` | source/read failed or contract returns unavailable | read-only retry if defined; no mutation |
| `NOT_CONFIGURED` | `연결되지 않음` | `상태: 연결되지 않음` | required authority/configuration is absent | show owner/next configuration step; no retry loop |
| `NOT_IMPLEMENTED` | `아직 구현되지 않음` | `상태: 아직 구현되지 않음` | no current source/read/page contract | no href/action; Lab evidence link may exist |
| `DENIED` | `권한 없음` | `상태: 권한 없음` | authorization fails before protected read | no protected content, count, stale value or action |

Operational precedence: `DENIED` → `HOLD` → `NOT_CONFIGURED` → `UNAVAILABLE` → `NOT_IMPLEMENTED` → `CONFIRMED`/`CONFIRMED_ZERO`. A runtime state never silently becomes zero.

`HOLD` is a cross-cutting operational command-blocking condition, not a fabricated datum. It dominates actions while the underlying datum truth remains visible; no mutation control appears.

## 6. State, action and recovery presentation

| Situation | Required presentation |
|---|---|
| Loading | retain page/row structure, muted rail, `aria-busy=true`, announce once `운영 사실을 불러오는 중입니다.` |
| Denied page | heading remains; one alert explains missing scope; protected rows and counts are absent |
| Unavailable row | last confirmed value only if timestamped, otherwise no value; `다시 확인` is read-only |
| Not configured | name the missing connection/authority owner; no generic error/retry |
| Not implemented | inert nav/row; explain current supported alternative, if any |
| HOLD | `사실 확인 전에는 처리하지 않습니다`; zero controls |
| Recovery pending | preserve last confirmed fact; disable repeat; `완료로 확인될 때까지 상태를 바꾸지 않습니다.` |
| Action error | clear step-up secret/nonce; focus status; no optimistic completion |
| Confirmed zero | keep section purpose and `확인된 0건`; do not hide the section |

## 7. Page/module behavior

- Requests: reuse category-safe queue; row accessible name contains safe order number, request kind/status, category and requested time only.
- Request detail: fact panel first; exactly one action panel after capability grants. HOLD and denied remove controls rather than disabling a dangerous alternative.
- Fulfillment: order/status/detail only. No purchasing, courier dispatch or stock restoration promise.
- Reconciliation: three closed counts as facts; protected recovery is a visually separate desktop-only section.
- Audit: `NOT_IMPLEMENTED` or `UNAVAILABLE · 조회 계약 없음`; never substitute generic admin audit or fake activity.
- Settings: source for environment/synthetic/read-only truth; no authority editor.
- Console: conversation/planning/evidence only; `V0 MOCK · 실제 서비스 제어 없음`.
- Lab: read-only registry/gates; no execution, approval, promotion or provider call.

## 8. Responsive contract

### Desktop ≥1024px

- 64px global bar; 250px persistent left navigation; main content max 1120px.
- Ledger uses four columns: work, state, confirmed fact, safe next action.
- Action/blocked content is above summary facts in the first viewport.
- No Storefront device/status/header/category/tab/cart/shipping layers.

### Tablet 768–1023px

- left nav collapses to a 72px icon/short-label rail; full labels available on focus and in an accessible menu.
- Ledger becomes two lines per row; state stays next to work label.

### Mobile 390px

- no device bezel or status imitation; one top menu opens a full-height operations drawer.
- truth strip remains directly under the top bar.
- ledger rows become stacked cards in identical priority order.
- protected refund/shipment/recovery actions are absent; show `모바일에서는 운영 사실만 확인할 수 있습니다. 보호된 작업은 데스크톱에서 진행합니다.`
- no bottom navigation, cart FAB, shipping promo, mall/category chrome.

## 9. Accessibility and reduced-motion floor

- Landmarks: one global-space `nav`, one operations `nav`, one `main`, one page `h1`.
- `aria-current=page` for active space and active operations route.
- Minimum 44×44 CSS-pixel targets; visible 2px focus ring with 2px offset.
- DOM order equals visual order; ledger uses a real list or table with a mobile list equivalent.
- State icon and color are supplemental; exact English token plus Korean label are always text.
- `role=alert` for denied/action failure; one `aria-live=polite` region for loading/recovery completion.
- At 200% zoom there is no two-axis page scroll; a wide ledger may become stacked rows, not clipped text.
- Korean line height ≥1.5, no all-caps Korean, no 10px operational copy.
- `prefers-reduced-motion: reduce`: no animated rail, shimmer, auto-scroll or layout transition. Default design requires no motion.
- Deployed Korean glyph smoke test is mandatory because the read-only inspection environment lacked a Korean font.

## 10. Candidate implementation seams — not authorization

- `app/src/app/layout.tsx`: classify `/console`, `/dashboard`, `/lab` as operator spaces before mounting Storefront providers/chrome.
- `app/src/components/operator/OperatorShell.tsx`: add desktop left nav and bounded mobile drawer while retaining the current space switcher.
- `app/src/app/dashboard/page.tsx`: replace equal card list with action-first ledger; keep current data contracts/states.
- Reuse `O1ConsoleQueue`, `O1ConsoleFulfillment`, `O1ConsoleFinance`, `O1OperatorPanel`, and the single `o1ConsoleView` classifier/state source.
- No new schema, endpoint, role, grant, provider integration, KPI, customer projection or action is designed.

## 11. Acceptance and STOPs

1. Desktop at 1440×1000 shows full left nav in the exact required order and no Storefront chrome.
2. 390×844 shows one operations header/menu, persistent Korean truth label, stacked action-first rows and no bottom nav.
3. Action-required/blocked work precedes every summary fact.
4. All six exact states render distinct Korean and screen-reader-equivalent labels.
5. No number appears without a confirmed source read; mockup state examples are labeled non-data.
6. Unknown/HOLD/denied remove protected controls.
7. Console and Lab purposes remain unchanged.
8. Keyboard, focus, 200% zoom, reduced motion, live-region and Korean-glyph checks pass before implementation review.
9. STOP on product/runtime/auth/schema/DB/provider/login/production change, invented data, new capability, or authority decision.

Limitations:

- The public no-login Dashboard is default-denied, so no authorized runtime data view was observed.
- Inventory aggregate and sensitive activity list have no current read contract.
- Final typography must be visually checked in an environment with Korean fonts.
- This Designer candidate is not implementation, review, approval or risk acceptance.
