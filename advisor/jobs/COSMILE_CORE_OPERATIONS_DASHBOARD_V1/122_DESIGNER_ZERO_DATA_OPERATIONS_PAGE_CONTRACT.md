# Designer contract — zero-data operations page structure

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
HANDOFF: `121_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_HANDOFF.md`
ACTOR: `foundation-designer`
STATUS: `DESIGN_READY_FOR_INDEPENDENT_REVIEW`
SUBJECT: `/dashboard/orders` with a successful bounded read returning zero rows

## Product subject

- Audience: an authenticated Korean commerce operator working in the Dashboard space.
- Single job: confirm that the bounded order list is empty while retaining the exact
  structure that will display a real order.
- Truth boundary: this design uses only `orderNo`, mapped `dbStatus`, and the existing
  encoded detail destination. It does not introduce customer, payment, shipment,
  tracking, amount, provider, internal ID, or free-text data.
- State boundary: this contract applies only after authorization and a successful read
  where `rows.length === 0`. Existing `DENIED`, `UNAVAILABLE`, and repository-error
  behavior remains distinct and unchanged.

## Two-pass design plan

### Pass 1 — accepted-system reuse

The accepted Dashboard shell supplies the design system; this page does not create a
new one.

| Token | Value | Use |
| --- | --- | --- |
| Evergreen rail | `#173D32` | 250px operations rail |
| Active evergreen | `#245849` | selected navigation surface |
| Verified green | `#2E7658` | active space, table rule, focus |
| Canvas | `#F3F6F3` | gridded operations workspace |
| Paper | `#FFFFFF` | switcher, summary, table |
| Ink / rule | `#17231E` / `#CBD6CF` | primary text and structural borders |

- Display/body face: `Noto Sans CJK KR`, with restrained 700-weight headings.
- Utility/data face: `Noto Sans Mono CJK KR` for the COSMILE eyebrow, counts, and
  bounded operational labels.
- Layout: accepted 250px rail + 64px space switcher + one 1130px content lane at
  1440px.
- Signature: a **stable ledger empty state**. The empty message lives inside the
  table body while the three real column headers remain visible.

```text
┌──────── 250px rail ────────┬──────────── space switcher ─────────────┐
│ grouped operations nav     │ 주문 + description + data provenance   │
│ 주문 = selected            ├─────────────────────────────────────────┤
│                            │ bounded summary              status     │
│                            ├─────────────────────────────────────────┤
│                            │ 주문 목록                    결과 0건   │
│                            │ 주문번호 │ 주문 상태 │ 상세             │
│                            │ ┌──── empty result inside tbody ──────┐ │
│                            │ └──────────────────────────────────────┘ │
└────────────────────────────┴─────────────────────────────────────────┘
```

### Pass 2 — brief and genericity critique

- Rejected direction: a detached centered “0건” card. It is generic, removes the
  operator’s column context, and makes a successful empty list resemble a dashboard
  KPI or loading placeholder.
- Revision: keep the table title, result count, column headers, widths, and detail
  destination column stable in the zero state. Contain one quiet empty panel in a
  spanning body cell.
- The single visual risk is the ledger-like empty body. It is justified by the
  subject: an operator must understand both “nothing is here” and “what will appear
  here” without fabricated sample rows.
- All other styling stays subordinate to the accepted Dashboard shell.

## 1440×900 desktop contract

### Shell continuity

- Left rail is exactly `250px`, full height, Evergreen rail.
- The rail retains the accepted groups: `개요`, `커머스`, `운영`, `거버넌스`.
- `주문` is the only selected rail item on this route. `운영 대시보드` remains
  present but unselected.
- The 64px top switcher retains `Console`, `Dashboard`, and `Lab`; `Dashboard` is
  current and the verified-operation indicator remains at the right.
- Main canvas begins at x=250/y=64 and uses the accepted pale grid. Content uses
  30px horizontal insets.

### Page header and exact copy

- Eyebrow: `COSMILE / TODAY'S COMMERCE TRUTH`
- Visible H1: `주문`
- Description: `현재 확인 가능한 주문번호와 주문 상태를 한 곳에서 확인합니다.`
- Provenance badge: `합성 비프로덕션 데이터`
- H1 is not screen-reader-only.

### Bounded summary

The summary is derived from the already loaded list only:

- `전체 주문` → `0건` → `현재 조회된 목록 기준`
- `상태 분포` → `표시할 주문 상태 없음`
- Helper: `행이 생기면 검토된 한국어 상태로 표시`

No total outside the bounded list, date range, shipment count, amount, customer, or
other inferred metric appears.

### Local status filter

- A single labeled select, `주문 상태`, appears with `전체 상태` selected.
- Permitted labels mirror the existing mapper only: `결제 대기`, `결제 완료`,
  `출고 완료`, `취소`, `환불 완료`, `확인할 수 없음`.
- Filtering is client-local over the already loaded `dbStatus` rows. It performs no
  fetch, navigation, URL mutation, new read, or count request.
- The filtered count updates from that same array and is announced politely.
- If a bounded implementation cannot keep this purely local, omit the filter; no
  read-contract change is authorized.

### Stable table

- Table title: `주문 목록`; trailing result: `조회 결과 0건`.
- Columns and desktop widths:
  1. `주문번호` — flexible, minimum 360px.
  2. `주문 상태` — 315px.
  3. `상세` — 295px.
- Zero body is one `td[colspan="3"]`; it does not remove or replace the header.
- Empty panel copy:
  - `확인할 주문이 없습니다`
  - `현재 조회된 주문 목록이 비어 있습니다.`
  - `새 주문이 확인되면 이 표의 같은 열 구조에 표시됩니다.`
  - `확인된 결과 · 0건`
- Do not expose `CONFIRMED_ZERO` or any raw enum.

### Non-empty row proof

The zero and non-zero states share one table and one column definition:

| Column | Existing value | Display rule |
| --- | --- | --- |
| 주문번호 | `row.orderNo` | Show value; `null` becomes `—` |
| 주문 상태 | `row.dbStatus` | Use existing `orderStatusLabel`; unknown becomes `확인할 수 없음` |
| 상세 | existing `row.orderId` destination | Link text `공용 주문 상세 확인`; href remains `/dashboard/requests/{encoded orderId}` |

- `orderId` remains non-visible and exists only in the React key and encoded href.
- Each row is keyboard reachable through its existing detail link.
- Do not add row selection, actions, pagination, export, sorting, or bulk controls.

## Same grammar on adjacent routes

No second mockup is required. Reuse the same shell, header rhythm, bounded-summary
strip, table card, stable headers, and contained zero body.

### `/dashboard/fulfillment`

- H1: `주문·출고 상태`
- Description: `현재 주문 상태를 확인합니다.`
- Fields remain exactly `주문번호`, existing mapped `주문 상태`, and the existing
  detail destination.
- Empty copy: `확인할 주문이 없습니다`.
- “출고” is only the existing `fulfilled` → `출고 완료` status label. Do not add
  shipment, carrier, tracking number, dispatch time, address, or delivery promise.

### `/dashboard/requests`

- H1: `요청 큐`
- Description: `접수된 요청의 분류와 상태를 확인합니다.`
- Visible columns: `주문번호`, `요청` (existing kind + status label), `분류`
  (existing category badge), `요청 시각`.
- The existing row-level link may remain, but it adds no visible field and never
  exposes `orderId`.
- Unknown kind/status/category keeps the existing fail-closed wording.
- Empty copy: `접수된 요청이 없습니다`.
- Do not add customer identity, request text, eligibility, payment/refund/provider
  identifiers, action buttons, or a new read.

## Responsive and accessibility floor

- `≥1024px`: fixed 250px rail; summary is a three-part horizontal strip.
- `761–1023px`: retain rail and allow header/summary text to wrap without clipping.
- `≤760px`: the rail becomes a compact `운영 메뉴 · 주문` disclosure that opens the
  same grouped navigation; page header and summary stack vertically.
- On narrow screens the table keeps a 680px minimum inner width in a labeled
  horizontal scroll region. Column meaning is never converted into unlabeled text.
- At 200% text zoom, heights expand; no copy is truncated and the table remains
  scrollable.
- Semantic order: H1 → description/provenance → summary/filter → table caption →
  headers → status message.
- The empty result uses `role="status"`; filter-result changes use
  `aria-live="polite"`.
- The filter has a persistent visible label. Table headers use `scope="col"`.
- Focus ring: 3px Verified green with 2px paper offset on nav, select, disclosure,
  and detail links.
- Contrast target: WCAG AA for text and controls; muted copy remains at least 4.5:1.
- There is no required motion. `prefers-reduced-motion: reduce` removes all optional
  transitions and smooth scrolling.

## Requirement traceability

| Handoff requirement | Design evidence |
| --- | --- |
| Accepted switcher and 250px grouped rail | Shell continuity + candidate |
| Visible title, description, provenance | Page header contract |
| Truthful bounded summary | Bounded summary |
| Three existing order fields only | Stable table + non-empty row proof |
| Empty state inside list/table | Spanning tbody cell |
| No raw enum | Korean empty copy and existing status mapper |
| Optional local filtering only | Local status filter boundary |
| Fulfillment/requests mapping without new mockups | Adjacent-route grammar |
| Desktop/mobile/a11y/reduced motion | Responsive and accessibility floor |
| No backend/read/navigation redesign | Explicit field and interaction exclusions |

## Acceptance criteria

1. The 1440×900 PNG retains the accepted Dashboard shell and visibly selects `주문`.
2. The page has a visible `주문` H1, description, and provenance.
3. A reviewer can identify the zero count and the future row schema without reading
   implementation notes.
4. The empty message is visually contained inside the table body.
5. Only `주문번호`, mapped `주문 상태`, and the existing detail destination are
   represented.
6. No raw state enum, internal ID, synthetic example row, or unauthorized field is
   visible.
7. The same contract maps to fulfillment and requests without inventing data.
8. Keyboard, screen-reader, mobile, high-text, and reduced-motion behavior is explicit.

