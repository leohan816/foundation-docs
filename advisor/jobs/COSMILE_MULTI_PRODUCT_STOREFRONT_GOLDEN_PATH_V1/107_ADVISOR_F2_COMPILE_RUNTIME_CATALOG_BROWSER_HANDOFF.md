# Advisor handoff — F2 compile, runtime, and catalog browser gate

VERDICT: `PROCEED_WITH_LIMITS` · no Google/Toss/economic action.

## Pins and actor

- Product `8a1a5b70c8b6df1f9aaf75cf40821d761a089ae7`,
  clean/upstream-equal.
- Corrected DB gate `105`/`106`, docs `ad053b4`: PASS; exact seven candidate
  snapshots/bindings/active SKUs, protected counts unchanged.
- Existing `cosmile:claude.0`, actual Opus 5/xhigh, exact mission CWD,
  `/fable-builder`.
- Current public hostname remains `https://cosmile.leohan.net`; its single
  listener is the owned mission runtime at `127.0.0.1:3000`. Preserve rollback.

## Exact filesystem/process ceiling

No tracked product/config/schema/migration/package/lock/test write.

Allowed runtime artifacts only:

- existing owner-only
  `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/runtime/start-candidate.sh`
  (change only the Foundation bundle-root assignment if required; no secret
  value or other command change);
- `runtime/candidate.pid` (`0600`, process-group leader only);
- `runtime/rollback/f2-prebuild-next-8a1a5b7/` (one intact pre-gate `.next`
  quarantine, only if `.next` exists);
- `runtime/f2-catalog-home-1440.png` and
  `runtime/f2-catalog-shop-1440.png` (non-PII screenshots);
- one owner-only temporary Playwright profile/output under
  `runtime/f2-browser-tmp/`, removed after categorical capture.

All mission runtime directories/files are `leo:leo`, real/non-symlink,
directories `0700`, files `0600`. No other log/PID/profile/output path.

## Gate

1. Reverify pins, real worktree-local dependencies, bundle, exact seven DB
   state, protected counts, current listener identity/CWD/process group,
   public tunnel target, protected env **names only**, and rollback path.
2. Load current runtime env only in process memory. Override only the exact F2
   bundle root. Keep `NODE_ENV=development`, O1 runtime/Google flags ready,
   Toss mode TEST, sandbox one-shot off, local substitute off. No env value is
   printed, hashed, copied, committed, logged, or placed in argv.
3. Run exactly once each, in this order:
   - `cd app && ./node_modules/.bin/prisma generate --schema prisma/schema.prisma`
   - `cd app && ./node_modules/.bin/tsc --noEmit --incremental false`
4. Verify the current listener again, then stop only its exact owned runtime
   process group. Do not touch tmux/Actor/another service.
5. Move the current worktree `.next` intact to the fixed quarantine path.
   The destination must not preexist.
6. Run exactly once:
   `cd app && NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 ./node_modules/.bin/next build`.
   This is compile evidence only: the O1 runtime must fail closed on its
   production guard, so the build performs no candidate/DB/provider action.
   First failure stops.
7. After build evidence, remove only the newly generated build `.next`. Start
   exactly one `next dev` runtime on `127.0.0.1:3000` through the protected
   wrapper, with the exact product CWD/env/bundle root and a trackable process
   group. Do not attempt a second start. Use TCP readiness, then local `GET /`
   once for status-class readiness.
8. Use the already installed local Playwright/Chromium in one clean
   owner-only browser context. No Google/Toss/provider request and no clicks on
   favorite/cart/checkout. Browser-probe the actual public host:
   - `/` and `/shop`: status 200; exactly seven distinct admitted ELT product
     detail links/cards; seven real Foundation Korean names; seven exact
     deterministic positive KRW prices; incomplete eighth absent; legacy
     representative/mock rows absent.
   - each of the seven exact detail routes: status 200; matching Foundation
     display identity and KRW price; favorite and cart controls present but
     not invoked.
   - home/shop source ownership is the current `8a1a5b7` runtime; no hydration
     or browser console error.
   Capture only the two authorized 1440px screenshots and categorical/count
   evidence.
9. Remove browser tmp/profile/output. Keep the new runtime and its dev `.next`
   live for the later Leo Golden Path. Verify exactly one listener, PID/CWD/
   process group, public route status, bundle binding, Git clean/upstream,
   protected DB counts unchanged, and provider/economic effects zero.

Do not restore the quarantined old `.next` on PASS. It is rollback evidence.
Do not run another test/build/typecheck/generate, browse authenticated routes,
click writes, contact Google/Toss, or mutate cart/order/payment/refund.

Write only:

- `108_WORKER_F2_COMPILE_RUNTIME_CATALOG_BROWSER_RESULT.md`
- `109_WORKER_F2_COMPILE_RUNTIME_CATALOG_BROWSER_POINTER.md`

Commit/push only those docs and STOP for Advisor/Leo browser checkpoint.
First failure is HOLD with no retry or alternative.
