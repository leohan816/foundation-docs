# P6 Google Callback Route Export Correction — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `P6_GOOGLE_CALLBACK_ROUTE_EXPORT_CORRECTION`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff 81 verified SHA256 `28326bf6…` ✓ blob `532bdb99…` ✓ (docs HEAD `7c6ab309`). BASE `f48a30e` → HEAD **`9ab1716`** clean/upstream-equal (non-force pushes `f48a30e..00cdade` then `00cdade..9ab1716`). Result uncommitted. Only the admitted result-79 build failure was in scope; all prior sweep findings ignored. Codex idle.

## Exact 3 paths (nothing else)

1. `app/src/lib/runtime/publicOrigin.ts` — appended `resolvePostLoginRedirect` **byte-for-byte** (base route function body `diff`s identically to the new module's function), sitting beside `resolvePublicRedirect` to which it delegates in the same module. Per Advisor containment steer, the **full existing POST-CALLBACK ORIGIN FIX comment block is preserved byte-for-byte** immediately above the moved helper (10 lines, proven identical to the base route comment); it was NOT summarized or dropped.
2. `app/src/app/api/auth/google/callback/route.ts` — import swapped `resolvePublicRedirect` → `resolvePostLoginRedirect` from `@/lib/runtime/publicOrigin`; removed the route `export function resolvePostLoginRedirect` (grep count now 0) and its comment (both relocated to publicOrigin). Call site `const dest = resolvePostLoginRedirect(process.env.COSMILE_O1_PUBLIC_BASE_URL, "/account")` and the `// … (see resolvePostLoginRedirect) …` reference unchanged. `resolvePublicRedirect` was used in the route only inside the moved function, so the route no longer needs it directly.
3. `app/scripts/o1_browser_runtime_contract.vitest.ts` — repointed the `resolvePostLoginRedirect` import from the route to `@/lib/runtime/publicOrigin` (merged with the existing `resolvePublicRedirect` import). The `webhookAckHttpStatus` import (out of scope) untouched.

## Commit sequence

- `00cdade` (`f48a30e..00cdade`): moved the helper byte-for-byte, swapped imports, removed the route export — but initially replaced the origin-fix comment with a short alias comment.
- `9ab1716` (`00cdade..9ab1716`, additive follow-up after Advisor containment steer): replaced that short alias comment with the exact original 10-line POST-CALLBACK ORIGIN FIX block, byte-for-byte, above the helper. Comment-only change; helper body/imports/behavior unchanged. Non-force follow-up because `00cdade` was already pushed (no force/amend).

## Tests first — named RED → identical GREEN

Exact command (`--cache=false`, temp symlink), once for RED then identically for GREEN, `-t 'composes the intended path on the configured public origin'`:

- RED (exit 1): `TypeError: resolvePostLoginRedirect is not a function` — the pure module did not yet export the moved helper. Preserved.
- GREEN (identical): **1 passed | 98 skipped**, exit 0, at both `00cdade` and after the comment correction (`9ab1716`). Verified: `FUNCTION_BYTE_FOR_BYTE=yes`, `COMMENT_BYTE_FOR_BYTE=yes`, route export removed, call/comment reference intact.
- No other path/test, no P6, build, typecheck, lint, install, generate, DB, provider, runtime, browser, sweep, or economic command run.

## Effects / cleanup / rollback

State/nonce/PKCE/session/security/destination behavior change: **0** — a pure destination-composition helper relocated to its canonical module (identical body), its full comment contract preserved verbatim, plus the two import wirings. Three-path containment proven across both commits. Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`=`a486716…`/`package-lock.json`=`36dfa1a…` byte-identical pre/post; no symlink/cache/process residue. Git: two additive commits, non-force push only, no main/force. Rollback: `git revert 9ab1716 00cdade`.

RETURN_TO: `foundation-advisor` · STOP before P6. The result-79 build-fatal defect is corrected at a test-first frozen contract with the full comment contract preserved byte-for-byte. (A further latent route-export defect at `api/o1/webhooks/toss/route.ts` was noted in result 79 but is explicitly out of this handoff's scope; Advisor to decide separately.) The full P6 gate is the authoritative next step; not run here per scope.
