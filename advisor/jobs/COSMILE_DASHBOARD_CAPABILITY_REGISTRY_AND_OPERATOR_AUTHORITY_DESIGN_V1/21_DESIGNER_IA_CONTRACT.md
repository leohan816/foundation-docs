# COSMILE Console / Dashboard / Lab IA 계약

- Mission: `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1`
- Actor: Foundation Designer
- Status: `P2_IA_CANDIDATE`
- Evidence base: product `3dc5129b573237a85f34bfa65a329a299d31fef2`
- Claim ceiling: `REVIEWED_COSMILE_CONSOLE_DASHBOARD_LAB_OPERATOR_AUTHORITY_DESIGN`
- Language: Korean-first; source identifiers remain exact English.
- Scope: information architecture, state/truth presentation, responsive and accessibility behavior only.
- Current implementation claim: none. Every target path below is `CANDIDATE_NOT_IMPLEMENTED` unless the mapping says otherwise.

## 1. Non-negotiable boundary

| Space | One operator question | Permanent purpose | Current truth |
|---|---|---|---|
| `/console` | “무엇을 대화로 요청하고, 어떤 검토 산출물이 생겼는가?” | conversational/control workspace | `PARTIAL_V0_MOCK`; current `/console/c/[id]`, jobs, messages, uploads and artifacts exist, but no live AI service control |
| `/dashboard` | “지금 사람이 확인하거나 제한적으로 처리해야 할 운영 사실은 무엇인가?” | operational visibility plus evidence-bounded manual work | route namespace absent; current O1 views are incorrectly hosted under `/console` |
| `/lab` | “어떤 후보가 어떤 증거와 승격 관문을 충족했는가?” | read-only capability registry and promotion-gate evidence | route namespace absent |

Rules:

1. A capability has one permanent host. Console, Dashboard and Lab do not duplicate a permanent screen.
2. Current `/console` O1 operational paths are transition evidence, not proof that operations belong in Console.
3. Lab is read-only: inspect, filter, copy an evidence reference and navigate back only. It has no mutation, approval, promotion, AI, dry-run execution or “try” control.
4. `MAIN_NOW` means the capability belongs in minimum Dashboard IA; it does not assert that `/dashboard` exists.
5. `MAIN_LATER` and `LAB` rows remain visibly deferred and nonfunctional unless direct source already provides a read.
6. `RETIRE_CANDIDATE` is a review state, not deletion authority. No route, source, history or data is removed by this design.
7. Price, purchasing, listing, event planning, CRM, marketing, AI collaboration, automation, Agent Control Center and advanced analytics are deferred placement seams only.

## 2. Pass 1 — Space and navigation

### 2.1 Shared frame, no visual redesign

Reuse the present white/neutral shell, 56-width desktop rail, sticky compact mobile bar, 6xl content width, rounded neutral cards, existing Korean type scale and focus-outline treatment from
`app/src/components/console/ConsoleNav.tsx:27-100`. Extracting a neutral shell is an implementation option, not a new visual system.

Target global switcher, always in this order:

1. `Console` — 대화·검토 (`부분 구현 · 실제 제어 아님`)
2. `Dashboard` — 운영 현황 (`권한 계약 대기` until Control closes authority)
3. `Lab` — 후보 레지스트리 (`읽기 전용`)

The switcher is a landmark navigation, not tabs controlling one document. Each item has a real URL, visible current-page state and screen-reader `aria-current="page"`.

### 2.2 Target hierarchy

```text
/console
  새 대화 / 대화 목록                 MAIN_LATER · DEFERRED_PROGRAM
  /console/c/[id] 대화·artifact       MAIN_LATER · DEFERRED_PROGRAM
  /console/jobs 작업 기록             MAIN_LATER · DEFERRED_PROGRAM
  Agent Control Center placement seam MAIN_LATER · DEFERRED_PROGRAM

/dashboard
  개요                                MAIN_NOW · PAID_BETA_BLOCKER
  /dashboard/requests                 MAIN_NOW · PAID_BETA_BLOCKER
  /dashboard/requests/[orderId]       MAIN_NOW · PAID_BETA_BLOCKER
  /dashboard/fulfillment              MAIN_NOW · SOON_AFTER_BETA
  /dashboard/finance                  MAIN_NOW · PAID_BETA_BLOCKER
  /dashboard/activity                 MAIN_NOW · CONTROLLED_LIVE_BLOCKER
  /dashboard/settings                 MAIN_LATER · SOON_AFTER_BETA

/lab
  capability registry                 LAB · OPTIONAL_GROWTH
  /lab/[capabilityId] evidence/gates  LAB · OPTIONAL_GROWTH
```

`/dashboard/inventory` is not a page candidate yet: current source exposes order-level committed/HOLD facts but no aggregate inventory-risk read contract. `/dashboard/customers` is also absent: the current safe operator projection deliberately excludes customer/PII. Analytics is Lab only. These absences prevent empty navigation promises.

### 2.3 Entry and exit

- Successful Console login returns to the requested safe internal destination when the future canonical authority contract permits it; current redirect to `/console` is only current evidence (`app/src/app/console/login/page.tsx:7-20`).
- Console opens on a truthful first-conversation entry. Until implemented, show `새 대화 시작 화면이 아직 연결되지 않았습니다`; never redirect into operations.
- Dashboard opens on the overview. Every queue/card deep-links only to a matching Dashboard detail.
- Dashboard detail exits to the exact originating filtered list; fallback is `/dashboard/requests`.
- Lab detail exits to the registry with filter state preserved.
- Cross-space links use “Console에서 검토”, “Dashboard에서 사실 확인”, “Lab에서 후보 근거 보기”; they never imply shared authority.

## 3. Pass 2 — Behavior and information truth

### 3.1 Global truth strip

Every Dashboard and Lab page starts with a compact, non-dismissible truth strip:

`환경` · `데이터 성격` · `갱신 시각/기준` · `권한 상태`

For this evidence snapshot the safe default is:

- `격리 비프로덕션`
- `합성 데이터`
- `현재성 미확인` unless a source returns an explicit generation/read time
- `운영 권한 계약 대기`

Color is supplemental. Each badge includes text and an accessible name. “Live”, “real”, “production”, “customer data” or an unlabeled zero is prohibited.

### 3.2 Closed datum-state vocabulary

| State | Korean label | Presentation contract |
|---|---|---|
| `CONFIRMED_ZERO` | `확인된 0건` | only after a successful exact read whose returned collection/count is zero |
| `UNAVAILABLE` | `현재 조회할 수 없음` | source/read failed; preserve last confirmed value only if timestamped and marked stale |
| `NOT_CONFIGURED` | `연결되지 않음` | required configuration/authority is absent; never phrase as empty |
| `NOT_COLLECTED` | `수집하지 않음` | source explicitly has no collection contract |
| `STALE` | `기준 시각 경과` | last confirmed value remains visible with its source time; actions disabled |
| `SYNTHETIC` | `합성 비프로덕션 데이터` | overlays the primary state; never converted to a live claim |
| `UNVERIFIED` | `검증되지 않음` | value exists but authority/source/currentness cannot be proved |

Priority: `DENIED` > `HOLD` > `UNAVAILABLE` > `NOT_CONFIGURED` > `NOT_COLLECTED` > `STALE` > returned value. `SYNTHETIC` and `UNVERIFIED` are additive badges.

### 3.3 Async/action-state behavior

| UI state | Required behavior |
|---|---|
| Loading | preserve heading/card skeleton; `aria-busy=true`; announce once: `요청 상태를 불러오는 중…` |
| Empty | show `CONFIRMED_ZERO` only after successful read; keep the page purpose and recovery link |
| Denied | no protected read and no stale value; alert: `이 계정에는 O1 운영 권한이 없습니다.` |
| Error | use `UNAVAILABLE`; no `0`, raw exception, provider value or retry loop |
| HOLD | amber text plus icon: `HOLD · 사실 확인 전에는 처리하지 않습니다.`; all economic/cross-state controls absent |
| Recovery | do not optimistically change status; `처리 결과를 확인 중입니다. 완료로 확인될 때까지 상태를 바꾸지 않습니다.` |
| Action error | clear secret/nonce inputs, keep last confirmed projection, focus the status: `처리되지 않았습니다. 상태를 다시 확인해 주세요.` |

The exact current phrases are sourced from `app/src/lib/console/o1ConsoleView.ts:73-89`.

## 4. Minimum Dashboard modules

| ID | Card/module and operator question | Exact current source/read contract | Authority and allowed action | Truth/state behavior |
|---|---|---|---|---|
| D01 | `처리 필요 요청` — “취소·지원 중 지금 확인할 요청은?” | `o1OperatorServiceRequestQueue(50)` in `app/src/app/console/orders/page.tsx:15-47`; closed row projection in `O1ConsoleQueue.tsx:5-55` | Read only after Console session plus current exact O1 operator gate; open category-safe detail only | repository error=`UNAVAILABLE`; successful empty=`CONFIRMED_ZERO`; unknown category=`HOLD`; `SYNTHETIC` always |
| D02 | `요청 상세` — “이 요청의 현재 범주와 유일한 허용 조치는?” | GET `/api/o1/operator/orders/[orderId]`; shared fail-closed classifier/surface `o1ConsoleView.ts:7-50`; current host `orders/[orderId]/page.tsx:11-40` | Exactly one surface: support acknowledgement, full TEST refund, standalone record-only shipment, HOLD or settled. No cross-mode control | malformed/unknown=`HOLD`; terminal=`settled`; action waits for reread; no raw identifiers beyond current safe projection |
| D03 | `출고 대기` — “어떤 주문의 출고 사실을 확인해야 하나?” | `o1OperatorOrderList(50)` in `console/fulfillment/page.tsx:11-30`; order/status-only list in `O1ConsoleFulfillment.tsx:3-55` | Open shared detail; record shipment only where the existing detail gate offers it and Control authority is approved | successful empty=`CONFIRMED_ZERO`; unknown status=`UNVERIFIED`; no purchase/courier execution claim |
| D04 | `재고 위험` — “판매 가능으로 되돌리면 안 되는 주문이 있는가?” | current order detail inventory category and fixed setting `committed/HOLD`; no aggregate read projection exists (`console/settings/page.tsx:31-34`) | No overview action and no numeric claim. Detail may show current committed/HOLD fact | default=`UNAVAILABLE · 집계 조회 계약 없음`; never synthesize a count |
| D05 | `정합성 HOLD` — “검증·정합 작업이 얼마나 열려 있는가?” | `readO1ReconciliationProjection()` in `console/finance/page.tsx:12-45`; three closed nonnegative counts in `O1ConsoleFinance.tsx:13-41,66-82` | Count read. Protected recovery only after existing step-up/nonce and Control closure | null/invalid=`UNAVAILABLE`; returned zeros=`CONFIRMED_ZERO`; labels remain count-only |
| D06 | `보호된 복구` — “고정 범위 복구가 허용되고 결과가 수렴했는가?” | GET/POST `/api/o1/operator/reconciliation`; current UI `O1ConsoleFinance.tsx:144-280` | desktop only today; candidate keeps it unavailable on mobile. Action is hidden/disabled while authority contract is pending, stale or HOLD | show category outcome and eight count-only result categories; never expose target IDs or optimistic success |
| D07 | `최근 민감 운영 기록` — “최근 환불·출고·지원 조치가 감사 기록으로 남았는가?” | transactional `ConsoleAuditLog` writes: `order.refund_finalize`, `order.fulfillment_transition` (`order/repository.ts:229-276`), `order.operator_paid_cancel_settle`, `order.operator_shipped_support_ack` (`serviceRequestRepository.ts:517-624`) | Read-only. Current source has no allowlisted recent-action list projection; no detail/action until one exists | default=`UNAVAILABLE · 조회 계약 없음`; no generic admin audit substitution; `targetId`, `meta`, operator subject and PII stay hidden |

Dashboard overview contains only D01, D03, D04, D05 and D07. D02 and D06 are detail/action modules. No revenue, conversion, traffic, campaign, AI insight, pricing or recommendation metric appears in Main.

## 5. Authority presentation and STOP

Two current authorities coexist:

- Console session/role gate: `requireConsoleUser()` (`app/src/lib/console/guard.ts:4-8`) and role actions (`permission.ts:1-35`).
- O1 operator gate: exact Google immutable-subject allowlist, fixed admin role and in-memory nonce (`app/src/lib/auth/o1Operator.ts:19-20,42-65,68-88,118-135`).

Designer does not select, merge or elevate them. Until Foundation Control supplies the canonical per-space matrix:

- Dashboard renders `운영 권한 계약 대기`.
- A Console role never grants O1 read or action authority.
- Customer identity never grants operator authority.
- Existing O1 action controls remain source evidence only; the candidate must not make them more available.
- `DENIED`, `NOT_CONFIGURED` and `HOLD` are distinct.
- STOP if implementation would require a new role, grant, session, cookie, allowlist, step-up, nonce, bypass or DB authority model.

## 6. Console behavior contract

- Preserve current three-part workspace and current conversations owned by the Console user (`console/c/[id]/page.tsx:8-42`).
- Label the header `Console · 대화와 검토`, not Dashboard.
- Empty entry says no action has run. Message submit is `요청 기록`, not “AI 실행”.
- Current response produces a mock product-intake plan and mock approval artifact (`api/console/conversations/[id]/messages/route.ts:50-80`); show persistent `V0 MOCK · 실제 서비스 제어 없음`.
- Artifact types—plan, validation, page preview, voice preview, diff and approval—remain review cards.
- `approve/reject` are mock job-state transitions. `execute/publish` remain disabled and are never placed in Dashboard or Lab.
- Upload is a Console conversation attachment only. It never becomes operator evidence or authority.

## 7. Lab registry contract

Each row contains:

`capabilityId` · Korean name · current source path · current truth (`CURRENT_O1|LEGACY|PARTIAL|MOCK|DRY_RUN|DEFERRED`) · disposition · release timing · data state · authority owner · last evidence commit · unresolved risk.

Each detail shows six read-only gates:

1. direct source/read contract exists;
2. state vocabulary distinguishes zero/unavailable/configuration/collection/stale/synthetic/unverified;
3. canonical authority owner and deny behavior are approved;
4. permitted/prohibited actions and audit proof are closed;
5. responsive, keyboard and screen-reader acceptance is specified;
6. Advisor/independent review evidence exists.

Gate values are `PASS_EVIDENCED | FAIL | HOLD | NOT_APPLICABLE`, never an interactive promotion control. A row with any `FAIL` or `HOLD` cannot display `ready`. Lab never executes the current Foundation dry-run APIs; it may only cite their existing output contract as evidence.

## 8. Responsive and accessibility acceptance

- Desktop ≥768px: shared rail plus one primary content column; do not nest a second rail. Dashboard count cards may use three columns.
- Mobile <768px: global switcher and current-space primary items are horizontally scrollable, keyboard reachable and named; all data becomes one column.
- The present mobile omission of finance actions is retained and explicitly explained (`O1ConsoleFinance.tsx:230-263`); no hidden action is represented as available.
- Minimum 44×44 CSS-pixel interactive target; visible `:focus-visible`; logical DOM order follows visual order.
- One `h1`, nested headings, named `nav`, lists for queues, `dl` for label/value cards, tables only for comparable rows.
- Badges never rely on color; icons are decorative unless they add a distinct accessible label.
- Status updates use one polite live region; denied/error use `role=alert`; no repeated announcements during polling.
- Reduced motion: no auto-scroll, shimmer or transition required. High-text/200% zoom: no clipping or two-axis scrolling except an explicitly labeled table region.
- Queue row accessible name includes safe order number, request kind/status, category and requested time; it excludes internal orderId and PII.

## 9. Candidate implementation seams — not current implementation

| Candidate path/module | Reuse requirement |
|---|---|
| `app/src/app/dashboard/{layout,page}.tsx` | extract/reuse current shell; do not restyle |
| `app/src/app/dashboard/requests/{page,[orderId]/page}.tsx` | reuse `O1ConsoleQueue`, `O1OperatorPanel` and shared classifier/action vocabulary |
| `app/src/app/dashboard/{fulfillment,finance,activity,settings}/page.tsx` | reuse present components; add no economic interpretation |
| `app/src/app/lab/{page,[capabilityId]/page}.tsx` | static/read-only registry over this mapping; no execution endpoint |
| `app/src/components/operator/OperatorShell.tsx` | optional neutral extraction of current `ConsoleShell`; preserve dimensions/tokens |
| `app/src/lib/dashboard/operatorActivityProjection.ts` | only if separately authorized: closed allowlisted audit read; no schema change |
| `app/src/lib/dashboard/capabilityRegistry.ts` | closed static registry generated from approved mapping, not runtime self-discovery |

Schema disposition: `NO_SCHEMA_CHANGE`. Reuse current read models and audit truth. Missing aggregate/read projections remain `UNAVAILABLE` until a separately authorized implementation handoff.

## 10. Focused acceptance and STOPs

1. Source census accounts for 12 page files, 9 nav rows, all current screen/card groups and every current UI-backed action listed in `22_DESIGNER_SURFACE_MAPPING.md`.
2. `/console` contains no operational queue/finance/fulfillment home after transition; `/dashboard` contains no conversational artifact/AI control; `/lab` contains no action.
3. Every Main datum answers one operator question and declares source, authority, allowed/prohibited action and all required states.
4. Successful zero, unavailable, not configured, not collected, stale, synthetic and unverified are visually/textually distinct.
5. Unknown request shapes and unresolved economic truth render HOLD with zero controls.
6. No route or card treats ConsoleUser as O1 authority, or customer identity as operator authority.
7. No current mock/dry-run/legacy surface gains a live or production badge.
8. Current Korean vocabulary, neutral shell, mobile omission, category-safe projections and no-PII boundaries are preserved.
9. Keyboard-only and screen-reader passes cover space switcher, queue, detail surface, status announcement and Lab registry.
10. STOP on any request for runtime/code/schema/DB/auth/provider/browser change, canonical authority choice, Lab mutation, real AI/automation, production claim, deletion or scope expansion.

Residual risks:

- `R1` layout is not itself an auth boundary; current protected pages guard individually.
- `R2` legacy admin visibility/write policy is not a target authority contract.
- `R3` dual ConsoleUser/O1 identity remains unresolved and blocks canonical Dashboard action authority.
- `R4` current O1 nonce is in-process and non-durable.
- `R5` legacy commerce metrics mix mock/dry-run/current data and cannot enter Main.
- `R6` direct source contains 12 `/console/**/page.tsx` files while Worker result reports 11; this design uses the direct-source count and preserves the discrepancy for Advisor audit.
