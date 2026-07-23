# P6 Bounded Integration Gate — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P6_BOUNDED_INTEGRATION_GATE`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `7110c3dff135009f92b7e7e5d1b57e8525419b1f`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `test-design-before-code`; `implementation-report-template` only at return.

## No-write gate

No product/docs/source/config/manifest/schema/migration/DB/provider/economic write is authorized. The only expected filesystem effects are ignored temporary dependency/build artifacts, all removed before return. STOP and return the owning WorkUnit if a tracked correction is required.

## Exact gate 1 — cumulative focused Vitest

Create only the mission-authorized temporary `app/node_modules` symlink after proving canonical real-directory, package/lock equality, no worktree residue/process, and representative canonical hashes.

From `app/`, run exactly once:

```bash
./node_modules/.bin/vitest run \
  scripts/o1_console_view.vitest.ts \
  scripts/o1_console_orders_ui.vitest.ts \
  scripts/o1_console_fulfillment_ui.vitest.ts \
  scripts/o1_console_finance_ui.vitest.ts \
  scripts/o1_console_shell_ui.vitest.ts \
  scripts/o1_order_lifecycle.vitest.ts \
  scripts/o1_operator_request_detail_ui.vitest.ts \
  scripts/o1_order_service_request_browser.vitest.ts \
  scripts/o1_toss_reconciliation_runtime.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false
```

These are the five new Vitest contracts plus the four directly affected predecessor contracts frozen at P3. The sixth new focused artifact, `o1_console_inventory_projection.dbtest.py`, already passed its disposable PostgreSQL module gate and is not repeated because this final integration gate is no-DB and delta-proportional.

Any failure is preserved with exact file/test/category and returns to its owning WorkUnit. Do not rerun, weaken an assertion, or run another test.

## Exact gate 2 — one non-production Next compilation

Only if gate 1 passes, run exactly once from `app/`:

```bash
DATABASE_URL=postgresql://localhost:1/o1_console_build \
NEXT_TELEMETRY_DISABLED=1 \
./node_modules/.bin/next build --webpack
```

The non-secret closed-loopback sentinel must not be persisted or contacted. `--webpack` is the repository-pinned Next 16 supported compiler mode used only because the authorized dependency is an external read-only symlink and Turbopack rejects that verification topology; it changes no product config or runtime semantics. Do not serve/start the app.

Any compile/type/config failure is preserved once and returns to the exact owning WorkUnit. No repair, retry, alternate compiler, install, generate, typecheck, lint, broad suite, DB/provider/network, runtime/browser, or economic action.

## Cleanup and result

Remove only mission-created `app/.next`, `app/next-env.d.ts`, `app/tsconfig.tsbuildinfo`, Vitest cache, and the temporary `app/node_modules` symlink. Prove canonical hashes unchanged, no process/port/cache/dependency residue, product HEAD/upstream unchanged at base, and clean Git.

Write only uncommitted result `60_P6_BOUNDED_INTEGRATION_GATE_RESULT.md`, return to Advisor, and STOP before independent review. One bounded Claude no-delta attempt may return `EXECUTION_NONCONVERGENCE`; only Advisor may then route this exact no-write gate to the preserved Codex fallback.
