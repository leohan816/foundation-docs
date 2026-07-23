# WU-1 Single-Source Action/View Contract — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-1_SINGLE_SOURCE_ACTION_VIEW_CONTRACT`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `3390b1af69c22626f0398579c457de0232bff77b`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; load `implementation-report-template` only at return.

## Exact path ceiling

1. `app/src/lib/console/o1ConsoleView.ts` (new)
2. `app/src/components/commerce/O1OperatorPanel.tsx`
3. `app/scripts/o1_console_view.vitest.ts` (new)
4. `app/scripts/o1_operator_request_detail_ui.vitest.ts`

No fifth path. No schema/migration, route/API/fetch change, server-authority change, DB, provider/economic effect, product runtime, UI redesign, package/config change, WU-2+, or deferred-feature behavior.

## Frozen contract

1. Move the existing `OperatorRequestDetail`, `OperatorRequestMode`, terminal vocabulary, `classifyOperatorRequestMode`, and `operatorActionSurface` implementation verbatim into the new pure module. `O1OperatorPanel` imports those exports and re-exports the existing public names for predecessor compatibility. There is one implementation source only.
2. Preserve all existing classifier semantics: `null -> legacy`; exact paid-unshipped requested refund and shipped-support requested support actions; exact reviewed terminal combinations -> settled; every other non-null/malformed/future value -> hold.
3. Extend only `operatorActionSurface` with fail-closed legacy control gating. Its optional `legacyActionsEnabled` input defaults to `true`. When `mode=legacy` and it is `false`, result is control-free HOLD; it never yields shipment, step-up, refund, or support controls. Every non-legacy mode remains byte-equivalent in meaning.
4. Add `legacyActionsEnabled?: boolean` to `O1OperatorPanel`, default `true`. The panel must use the shared action-surface result. With `false`, a null/legacy request renders a truthful HOLD/control-0 state; no legacy shipment/refund/step-up controls. This prop can remove controls only and grants no authority.
5. Export one immutable nine-row Korean IA model from the pure module:
   - active links: `실시간 운영` `/console`; `주문·고객 지원` `/console/orders`; `재고·구매·출고` `/console/fulfillment`; `재무·정합성` `/console/finance`; `운영 설정` `/console/settings`;
   - inert/deferred rows with no href/action/form: `카탈로그·상품 운영`, `분석·전략`, `마케팅·리뷰`, `Agent Control Center`;
   - every deferred row is explicitly `준비 중 · 동작 없음` and `ariaDisabled=true`.
6. Export a closed Korean state vocabulary for the reviewed design keys only: `loading`, `denied`, `queue_error`, `empty`, `refund_requested`, `support_requested`, `hold`, `settled`, `recovery`, `action_error`. Include the exact truthful phrases from the reviewed design; do not expose raw enum/provider/identity values or fabricate counts/KPIs.
7. The new pure module contains no React, fetch, environment/secret access, mutation, mock-live data, AI/automation action, or route implementation.

## Tests first and exact commands

First patch only the two test paths.

- In `o1_console_view.vitest.ts`, add the exact named block `WU-1 single-source Console view contract`. Prove 9 rows/5 active/4 inert, exact Korean labels and active hrefs, inert rows have no href and are disabled, vocabulary keys are closed, classifier/action categories remain fail-closed, and `legacy + false` has zero controls.
- In `o1_operator_request_detail_ui.vitest.ts`, add the exact named block `WU-1 shared action contract and legacy disable`. Prove the panel re-exports the exact shared functions/types, imports rather than redeclares their implementation, default legacy behavior remains compatible, `legacyActionsEnabled=false` yields HOLD/control 0, and no non-legacy action changes.

Run only:

```bash
./node_modules/.bin/vitest run scripts/o1_console_view.vitest.ts -t 'WU-1 single-source Console view contract' --config vitest.config.ts --reporter=verbose --cache=false
./node_modules/.bin/vitest run scripts/o1_operator_request_detail_ui.vitest.ts -t 'WU-1 shared action contract and legacy disable' --config vitest.config.ts --reporter=verbose --cache=false
```

Require meaningful RED before source implementation, then identical GREEN. Preserve first failure and exact exit status. Do not weaken/delete existing assertions. Do not run either full file, a broad test, build, typecheck, lint, generate, install, or any other command.

## Dependency, cleanup, Git, return

Before use, verify worktree `app/node_modules` absent and product/canonical package+lock hashes still match. Temporarily symlink only to the unchanged real `/home/leo/Project/Cosmile/app/node_modules`; do not write target. Remove immediately and prove canonical representative hashes unchanged plus zero symlink/cache/process residue.

Advisor/Claude nonconvergence history does not authorize scope expansion. If Claude has one bounded no-delta attempt, STOP with compact evidence; Advisor alone may route this exact WorkUnit to the preserved Codex fallback under the approved per-command absolute-workdir rule.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `46_WU1_SINGLE_SOURCE_ACTION_VIEW_RESULT.md` in this mission docs result directory, follow concise reporting, RETURN to Advisor, and STOP before WU-2.
