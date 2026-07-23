# WU-5 R1 Login/Layout Guard Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-5_R1_LOGIN_LAYOUT_GUARD_CORRECTION`
ACTOR: existing Cosmile Worker, Codex fallback already owning WU-5
PRODUCT_BASE: `f4ecc22c959aa33fe2f090b3748d8f66f24c2e21`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

## Blocking evidence

`app/src/app/console/layout.tsx` wraps every `/console/**` route, including the intentionally unauthenticated `/console/login` page. Its unconditional `requireConsoleUser()` redirects a missing session to `/console/login`, so the login request re-enters the same redirecting layout. Every other current Console page independently calls `requireConsoleUser()`; the login page alone is intentionally unguarded.

## Exact path ceiling

1. `app/src/app/console/layout.tsx`
2. `app/scripts/o1_console_shell_ui.vitest.ts`

No third path. Do not change the login page, guard/session modules, Console shell/nav, route tree, API/runtime/auth behavior, schema/DB, provider/economic behavior, or any deferred/legacy surface.

## Exact correction

- Tests first: add one focused case under the existing named WU-5 block proving the shared layout does not invoke the redirecting `requireConsoleUser` guard, reads the existing Console session with `getConsoleUser`, renders `children` without `ConsoleShell` when no session exists, and wraps exactly one `ConsoleShell` with the current role when a session exists.
- Preserve noindex and the single authenticated Console shell.
- In `layout.tsx`, replace only the unconditional redirecting layout guard with the existing read-only `getConsoleUser()` lookup and the explicit unauthenticated `children` branch. Do not grant access: every non-login Console page retains its own existing `requireConsoleUser()` guard.

## Focused command

Run only:

```bash
./node_modules/.bin/vitest run scripts/o1_console_shell_ui.vitest.ts -t 'allows the unauthenticated login child without a layout redirect loop' --config vitest.config.ts --reporter=verbose --cache=false
```

Require meaningful RED and identical GREEN with exact exit status. Use only the mission-approved temporary dependency symlink, remove it immediately, and verify canonical hashes unchanged and zero cache/process residue. No full file/suite, build, typecheck, lint, generate, install, DB, app/browser, provider, or economic command.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `56_WU5_R1_LOGIN_LAYOUT_GUARD_CORRECTION_RESULT.md`, return to Advisor, and STOP before P6.
