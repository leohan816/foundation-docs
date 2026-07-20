# R2D Operator Reconciliation HTTP — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2D_OPERATOR_RECONCILIATION_HTTP`
PRODUCT_BASE: `c8c18b5cd0c4c01d8fdcbb1601265db3d6855cf3`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
WORKER: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; already-loaded `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only for return.
VERIFICATION: `DELTA_ONLY_VERIFICATION: REQUIRED`
PRODUCT_TRACKED_WRITE: `PROHIBITED`
PROVIDER_OR_REAL_ECONOMIC_EFFECT: `ZERO`
REVIEW: no module Reviewer; one cumulative `HARD_IMPORTANT_SAFETY` review remains at R5.

## Exact objective

Against one isolated loopback app and disposable PostgreSQL, exercise the actual `GET` and `POST` `/api/o1/operator/reconciliation` route composition with synthetic Google-shaped identities/sessions only:

1. guest and authenticated non-allowlisted customer are denied, with zero bridge/economic effect;
2. allowlisted operator GET succeeds and returns only bounded reconciliation counts plus a fresh nonce—no internal/economic/provider/identity value;
3. missing, malformed, extra-field, wrong-step-up, stale, and replayed POSTs fail closed and run the bridge zero times;
4. one valid operator POST uses the existing fresh single-use nonce and exact step-up boundary, invokes one bounded real recovery sweep, and returns counts only;
5. seed one `exhausted`/`received` inbox plus its `webhook_unverified` task: GET projects it as exhausted/unverified and reconciliation-visible; POST does not claim/reprocess it and never reports it complete;
6. valid POST replay is refused; all PaymentTransaction/Refund/InventoryReservation counts and provider effects remain zero.

No actual Google or Toss request, external callback, real credential/PII, customer identifier output, provider body/key, or secret output.

## Exact read ceiling

- `app/src/app/api/o1/operator/reconciliation/route.ts`
- `app/src/lib/shopper.ts`
- `app/src/lib/auth/contracts.ts`
- `app/src/lib/auth/googleOidc.ts`
- `app/src/lib/auth/session.ts`
- `app/src/lib/auth/repository.ts`
- `app/src/lib/auth/o1Operator.ts`
- `app/src/lib/runtime/o1NonprodConfig.ts`
- `app/src/lib/runtime/o1CommerceRuntime.ts`
- `app/src/lib/runtime/o1ReliabilityRuntime.ts`
- `app/src/lib/payment/repository.ts`
- `app/src/lib/payment/tossSandboxTransport.ts`
- `app/prisma/schema.prisma` and the nine committed `migration.sql` files
- `app/vitest.config.ts`

No tracked path may be edited, staged, committed, or generated.

## Exact temporary/output paths

- Worktree root: `app/scripts/tmp/cosmile-o1-r2d-runtime-verification/` (`leo:leo`, `0700`, gitignored).
- One driver: `r2d_operator_reconciliation.vitest.ts` (`0600`, created with `apply_patch`, removed before return).
- External root: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r2d` (`leo:leo`, `0700`), containing only an empty `foundation-bundle/` (`0700`) while the app runs.
- Result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/42_R2D_RESULT.md` (`0600`).
- Pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/43_R2D_POINTER.md` (`0600`).

No token, cookie, nonce, subject, email, customer/order/payment identifier, raw response, log, PID file, or other artifact may be written or printed. Synthetic raw session tokens and step-up values remain process-memory only.

## Frozen action and command ceiling

1. Verify clean/upstream-equal base; real local locked dependencies/generated client; absent container `cosmile-o1-r2d-pg-20260720`; closed `127.0.0.1:55442` and `127.0.0.1:31080`; ignored/absent temp paths; unchanged package/lock/schema.
2. Read only the exact ceiling. Freeze the driver diff and exact categorical assertions; create only the protected roots/driver; return `READY_TO_RUN` before DB/app action. STOP if actual HTTP cannot be exercised through existing session/operator boundaries without another product path/change.
3. Start one `postgres:16-alpine` container with `--pull=never`, tmpfs data, synthetic credentials, and `127.0.0.1:55442:5432`; apply exactly the nine committed migrations once.
4. The driver uses existing `bindPrincipal` + `prismaIdentityStore` and `issueSession` + `prismaSessionStore` to create exactly two synthetic active accounts: one non-allowlisted customer and one allowlisted operator. Raw tokens remain memory-only. No direct SQL.
5. Seed only the minimum synthetic intent/inbox/reconciliation state through Prisma ORM. Start the existing app as a child on `127.0.0.1:31080`, with Google mode enabled but no provider contact, deterministic-local Toss mode, O1 runtime enabled, synthetic operator allowlist/step-up values in process env, external empty bundle, and app output discarded. Wait for authoritative TCP readiness.
6. Run one focused driver covering the exact six objectives via HTTP. Capture only status classes, booleans, bounded count categories, and before/after zero economic counts. Never print/store request bodies, cookies, nonces, tokens, subjects, identifiers, or raw responses.
7. Stop the complete app process tree; remove container, driver/worktree temp root, external R2D root, `.next`, mission-created `next-env.d.ts`/tsbuildinfo only if attributable; verify both ports/process/container/roots absent and Git clean/upstream-equal at unchanged HEAD.

No install/copy/symlink/generate/build/typecheck/full or repository test, actual provider/network beyond loopback, shared/production DB, Google/Toss credential, real PII, product write, R3/R4, or Reviewer.

## STOP and compact return

STOP for any extra path/change, provider/real effect, secret/identifier output, auth weakening/bypass, direct-SQL identity mint, uncertain cleanup, or inability to prove the actual HTTP boundary.

Return at most 45 lines: `SKILL_AND_REFS`, `BASELINE`, `TEMP_PATHS`, `MIGRATIONS`, `SYNTHETIC_IDENTITY_SESSION`, `GET_AUTH`, `GET_PROJECTION`, `POST_REJECTIONS`, `POST_VALID`, `REPLAY`, `EXHAUSTED_VISIBILITY`, `ECONOMIC_COUNTS`, `PROVIDER_EFFECT`, `CLEANUP`, `GIT_STATE`, `R2D_VERDICT`, `BLOCKER`, `RETURN_TO`, `STOP`.
