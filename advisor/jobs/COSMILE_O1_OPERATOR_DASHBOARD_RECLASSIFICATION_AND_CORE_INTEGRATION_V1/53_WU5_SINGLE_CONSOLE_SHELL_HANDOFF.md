# WU-5 Single Console Shell — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-5_SINGLE_CONSOLE_SHELL_OVERVIEW_SETTINGS`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `afe59d4970af97bb79c381c1764ecceb5052909b`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

## Exact path ceiling

1. `app/src/app/console/page.tsx`
2. `app/src/app/console/settings/page.tsx`
3. `app/src/app/console/layout.tsx`
4. `app/src/components/console/ConsoleNav.tsx`
5. `app/scripts/o1_console_shell_ui.vitest.ts` (new)

No sixth path. No schema/migration, API/runtime/auth library, order/payment/refund/inventory/shipment/reconciliation, provider/economic behavior, legacy route deletion/redirect, storefront, or deferred-feature implementation.

## Single-shell boundary

- `ConsoleLayout` remains noindex and becomes the one shared independent Console shell. It calls existing `requireConsoleUser()` and supplies only the Console role to `ConsoleShell`.
- `ConsoleShell` uses one local React context so a legacy page that still contains its own transition shell renders only its children under the outer shell. This prevents duplicate permanent consoles without deleting or rewriting any legacy page.
- Console role controls no O1 authority. Every active O1 page continues its independent runtime plus immutable-subject operator gate.
- No old `/console/commerce`, `/console/admin`, `/console/traffic`, chat/conversation, jobs, artifact, bridge, mock, or legacy mutation link remains in the default shell. Those routes remain mounted evidence only.

## Frozen Korean-first navigation

`ConsoleNav.tsx` imports and renders the shared `CONSOLE_NAV` from `@/lib/console/o1ConsoleView` as the sole IA source:

- exactly five active rows: `실시간 운영`, `주문·고객 지원`, `재고·구매·출고`, `재무·정합성`, `운영 설정`;
- exactly four non-link rows with `aria-disabled=true` and `준비 중 · 동작 없음`: `카탈로그·상품 운영`, `분석·전략`, `마케팅·리뷰`, `Agent Control Center`;
- desktop shows all nine rows; active rows are links, deferred rows are inert text only;
- mobile shows links only for `실시간 운영` and `주문·고객 지원`; no protected action, settings/configuration, deferred link, or legacy path;
- no role-derived O1 write claim, fake badge/KPI, form, button, fetch, AI behavior, or mutation.

## Root overview and settings

Both `/console` and `/console/settings` independently:

1. call `await requireConsoleUser()`;
2. require `o1RuntimeEnabled(process.env)` else `notFound()`;
3. call `getShopper()` then `o1OperatorForCustomer(process.env, shopper.userId)`;
4. render `CONSOLE_STATE_VOCAB.denied` for non-operator and no live Console content.

Root:

- removes conversation lookup/create/redirect entirely;
- renders a Korean read-only overview from shared `CONSOLE_NAV`;
- active cards link only to the five frozen Console destinations; deferred cards are inert and truthful;
- no count, KPI, activity, live-status claim, DB read, conversation/chat action, or mutation.

Settings:

- removes legacy roles, display name, Bridge/env values, mock-payment and unimplemented-shipping claims, docs list, and hardening TODO;
- renders only category facts: isolated non-production, Google OIDC test identity plus immutable-subject allowlist, Toss TEST full-refund-only boundary, existing step-up/nonce/audit fail-closed boundary, record-only shipment, and committed/HOLD inventory with no automatic sellable restoration;
- Korean-first, read-only, no env value, secret/identifier/PII, form/input/button/save/config mutation, provider activation, or future-feature behavior.

## Tests first and exact command

First create only `app/scripts/o1_console_shell_ui.vitest.ts`, exact named block:

`WU-5 single Console shell overview navigation and settings`

Prove:

- layout preserves noindex, requires Console session, wraps one `ConsoleShell`, and nested shells collapse through context;
- nav imports shared `CONSOLE_NAV`, renders exactly five active links/four inert deferred rows, and has no legacy/default competing-console link;
- mobile contains only overview and order-queue links;
- root/settings gate in the exact order before content and use the closed denied phrase;
- root has no prisma/conversation/create/redirect and renders no fabricated count/KPI;
- settings contains only the frozen category facts and no old mock/Bridge/env/displayName/docs/TODO or mutation control;
- no deferred row becomes link/action/output and no AI/price/listing/event/marketing/analytics behavior appears.

Run only:

```bash
./node_modules/.bin/vitest run scripts/o1_console_shell_ui.vitest.ts -t 'WU-5 single Console shell overview navigation and settings' --config vitest.config.ts --reporter=verbose --cache=false
```

Require meaningful RED, then identical GREEN with exact exit status. Do not weaken/delete assertions. No full file/suite, predecessor test, build, typecheck, lint, generate, install, DB, app/browser, provider, or economic command.

## Dependency, cleanup, Git, return

Use the mission-authorized temporary canonical dependency symlink only after package/lock/absence checks. Cache disabled; remove immediately; canonical representative hashes unchanged; zero symlink/cache/process residue.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `54_WU5_SINGLE_CONSOLE_SHELL_RESULT.md`, return to Advisor, STOP before the bounded integration gate.

STOP if a sixth path, schema/API/runtime/auth/economic change, legacy route deletion/redirect, second permanent shell, deferred active behavior, new O1 authority, or inability to keep mobile limited to overview/queue is required. One bounded no-delta Claude attempt returns `EXECUTION_NONCONVERGENCE`; Advisor alone may route the exact frozen WorkUnit to the preserved Codex fallback with explicit per-command absolute workdir.
