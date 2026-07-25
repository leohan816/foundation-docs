# 12 As-Built Result — Console / Dashboard / Operator Authority (P1, read-only)

MISSION `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1`. PINNED product HEAD `3dc5129`. Handoff 10 verified (blob `8ceca5e3`, sha256 `20d02243`, docs `74e5c399`). Direct source read; no product/runtime/DB/env/auth/test/build write. Full evidence in `11_WORKER_AS_BUILT_REGISTRY.md`.

## Material counts
- Console route pages: **11** (`console/{admin,c/[id],commerce,finance,fulfillment,jobs,login,orders,orders/[orderId],settings,traffic}`), 1 layout.
- Console APIs: **10** (`api/console/{auth/login,auth/logout,conversations,conversations/[id]/messages,foundation/claim-check,foundation/context-preview,foundation/evidence,jobs,jobs/[id]/transition,upload}`).
- Console lib: **9** (adminWrite, audit, foundationConsoleAdapter, guard, o1ConsoleView, password, permission, session, upload).
- Console components: **9** (incl O1ConsoleFinance/Fulfillment/Queue).
- Operator-auth lib: `auth/o1Operator.ts` (+ contracts/googleOidc/repository/session).
- Prisma console models: ConsoleUser`:255`, ConsoleSession`:269`, ConsoleAuditLog`:355` (+ consoleConversation/Message/Job/Attachment referenced). **No operator step-up/grant table** (nonce in-memory).
- Focused tests EXIST (not run this phase): o1_console_{shell,view,finance_ui,fulfillment_ui,orders_ui}, o1_operator_{request_detail_ui,service_request_queue,support_ack}, o1_console_inventory_projection.dbtest, o1_browser_runtime_contract 'O1 operator access'/'step-up'.

## Primary finding — TWO operator-authority systems overlap (core design question)
- **A. ConsoleUser session** (password/scrypt, roles owner>admin>editor>viewer, cookie `cosmile_console_session` 24h) gates **every** `/console` screen (`requireConsoleUser`) + console APIs (`can(role,action)`; admin-write owner/admin). `execute`/`publish` are **v0-disabled/mock** (`permission.ts:34`).
- **B. Google-sub operator + step-up** (`o1Operator.ts`: exact `COSMILE_O1_OPERATOR_SUB_ALLOWLIST` sub match, email never a key, default-deny, role fixed `admin`, single-use in-memory nonce, `COSMILE_O1_OPERATOR_STEP_UP_SECRET`) gates the O1 commerce operator **data/actions** (`o1OperatorForCustomer` `o1CommerceRuntime:537-547`; refund step-up `api/o1/operator/reconciliation/route.ts:50`).
- **Contradiction (R3):** O1 operator SCREENS are authorized by A (password) but their DATA/ACTIONS by B (Google-sub). Distinct identities, no unified policy — a ConsoleUser not in the Google-sub allowlist can still open the operator screens. **Canonical policy is Control's decision; not decided here.**

## Truth classification (summary)
- CURRENT_O1: console shell/IA; O1 operator screens finance/orders(+detail)/fulfillment/settings; both auth systems.
- PARTIAL/DRY_RUN/MOCK: `/console/commerce` (real events **mixed with `*_mock`** + Foundation-signal **dry-run**, boundary §0.5).
- DEFERRED/NOT_COLLECTED: `/console/traffic` (truthful `현재 미수집`).
- LEGACY: `/console/{admin,jobs,c/[id]}` + most console APIs.

## Dashboard-datum truthful states (per handoff §)
- Every O1 operator screen renders only `CONSOLE_STATE_VOCAB` closed Korean states (`o1ConsoleView.ts:78-89`: loading/denied/queue_error/empty/refund_requested/support_requested/hold/settled/recovery/action_error) — no raw enum/provider/PII/fabricated KPI.
- Reconciliation is **count-only** with categorical disabled reasons `production_refused|flag_off|transport_unavailable` (`o1ReliabilityRuntime`).
- **Preview zeroes = confirmed empty SYNTHETIC non-production** (disposable DB + synthetic fixtures; e.g. ConsoleSession=0, near-zero queues). Not "verified live."

## State axes (never one VERIFIED)
source PRESENT@3dc5129 · build **UNVERIFIED@3dc5129** (P6 build PASS was @71e05266; only `next.config` appended since, not rebuilt) · test **EXIST/NOT_RUN** · runtime **LIVE_NONPROD** (`/console/login`=200 post dev-origin fix) · integration o1CommerceRuntime+disposable-DB MATCH · data **SYNTHETIC_NONPROD** · authority **DUAL (A+B)** · surface CURRENT_O1 (operator) / LEGACY (admin/commerce/traffic/jobs).

## Risks (evidence-only, not patched)
- R1 auth per-page not layout-enforced (`layout.tsx:12`). R2 admin VIEW open to any ConsoleUser; writes owner/admin. **R3 dual operator authority (core).** R4 step-up nonce non-durable (restart-dropped; no revocation table). R5 commerce metrics mock-mixed.

## Release-timing headline
PAID_BETA_BLOCKER: console shell + O1 operator finance/orders. CONTROLLED_LIVE_BLOCKER: unify/decide operator authority (R3). SOON_AFTER_BETA: fulfillment/settings/request+upload APIs. LAB/DEFERRED: commerce, admin, traffic, jobs, conversations.

STOP — bounded by direct evidence; no canonical Control policy decided. RETURN_TO foundation-advisor.
