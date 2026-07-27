# Advisor handoff — F2 resumed build, runtime, and catalog browser gate

VERDICT: `PROCEED_WITH_LIMITS` · build/runtime/read-only catalog evidence only.

## Pins and preserved evidence

- Product `40c12947aca718bc76b4b8e34e99e357239b9963`,
  clean/upstream-equal.
- DB gate `105`/`106`: exact seven candidate snapshots/bindings/active SKUs,
  replay-safe, protected counts unchanged.
- Type correction `111`/`112`, docs `22ab584`: preserved typecheck RED then
  exactly one corrected non-incremental typecheck PASS.
- Existing `cosmile:claude.0`: actual `claude --model opus --effort xhigh`,
  exact mission CWD, `/fable-builder`.
- Existing public listener is the owned mission runtime on
  `127.0.0.1:3000`; preserve rollback until the replacement is ready.

Do **not** repeat Prisma generate, typecheck, Vitest, DB one-shots, import,
activation, or review.

## Exact evidence set

The seven intended-sale ELT products are the seven entries in the reviewed,
owner-only Foundation bundle. The eighth incomplete product remains excluded.
Use the bundle identities and this frozen Cosmile overlay:

| Product | SKU | KRW | Qty |
|---|---|---:|---:|
| `elt-cream-vitayouth-01` | `o1tc_elt_cream_vitayouth_01` | 24,000 | 64 |
| `elt-cream-vpdrn-01` | `o1tc_elt_cream_vpdrn_01` | 31,000 | 72 |
| `elt-mask-vitayouth-01` | `o1tc_elt_mask_vitayouth_01` | 18,000 | 80 |
| `elt-pad-vitayouth-01` | `o1tc_elt_pad_vitayouth_01` | 27,000 | 60 |
| `elt-serum-vitayouth-01` | `o1tc_elt_serum_vitayouth_01` | 30,000 | 90 |
| `elt-serum-vpdrn-01` | `o1tc_elt_serum_vpdrn_01` | 37,000 | 56 |
| `elt-sunscreen-vitayouth-01` | `o1tc_elt_sunscreen_vitayouth_01` | 22,000 | 84 |

`TEST_ONLY_CANDIDATE` is the non-production technical disposition, not a
not-for-sale business classification. Do not claim live/commercial approval.

## Filesystem and process ceiling

No tracked product/config/schema/migration/package/lock/test write.

Allowed mission runtime artifacts only:

- existing owner-only `runtime/start-candidate.sh`: change only its
  `BUNDLE_ROOT` assignment to the reviewed F2 bundle;
- `runtime/candidate.pid` (`0600`, process-group leader only);
- `runtime/rollback/f2-prebuild-next-40c1294/`: one intact quarantine of the
  current `.next`; destination must not preexist;
- `runtime/f2-catalog-home-1440.png` and
  `runtime/f2-catalog-shop-1440.png`;
- one owner-only `runtime/f2-browser-tmp/`, including one temporary built-in
  Node 24 CDP controller/profile/output; remove it after capture.

Directories must finish `0700`, files `0600`, real/non-symlink, `leo:leo`.
Do not create another log/PID/profile/output path.

## Single bounded gate

1. Verify pins, bundle, exact seven DB state/protected counts, current
   listener PID/PGID/CWD, tunnel target, protected env **names only**, fixed
   rollback path absence, and the pinned Chromium binary. Do not print,
   hash, copy, log, document, or place protected values in argv.
2. Reverify the owned listener immediately before termination. Stop only that
   exact runtime process group. Do not touch tmux, an Actor, or another service.
3. Move the current `.next` intact to the fixed quarantine path. Run exactly
   one build:
   `cd app && NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_f2_build_sentinel ./node_modules/.bin/next build`
   The production guard must fail closed before candidate/DB/provider work.
   First failure stops.
4. Remove only the newly generated build `.next`. Change only the wrapper
   bundle-root assignment. Start exactly one `next dev` runtime on
   `127.0.0.1:3000` through that wrapper, with the existing protected env,
   F2 bundle, Google-ready non-production flags, Toss TEST, sandbox one-shot
   off, and local substitute off. Never attempt a second start. Use TCP
   readiness and one local `GET /` status-class check.
5. Browser mechanism is explicitly approved without package installation:
   pinned existing Chromium plus a temporary dependency-free Node 24 CDP
   controller using built-in APIs and global `WebSocket`. Launch Chromium
   once, in one clean owner-only profile, `about:blank`, headless/no-sandbox,
   `--remote-debugging-address=127.0.0.1 --remote-debugging-port=0`. Read
   `DevToolsActivePort`, connect directly to the browser WebSocket (no
   `/json`), use finite deadlines, and do not use raw `--dump-dom`.
6. Through CDP, browser-probe the actual public host:
   - `/` and `/shop`: status 200, exactly seven distinct admitted product
     cards/detail links, all seven exact Foundation Korean names, all seven
     exact KRW prices, incomplete eighth absent, legacy/mock rows absent;
   - each of the seven detail routes: status 200, matching identity/price,
     favorite and cart controls present but **not invoked**;
   - no hydration/page/browser-console error.
   Navigation is read-only. No login, favorite/cart click, checkout, Google,
   Toss, provider, order, payment, or refund action. Capture only the two
   authorized 1440px screenshots and categorical/count evidence.
7. Remove browser temp/profile/controller/output. Keep the replacement dev
   runtime and its `.next` live for Leo's later Golden Path. Verify one
   listener, exact PID/PGID/CWD, public status, F2 bundle binding, product
   clean/upstream, protected DB counts unchanged, and provider/economic
   effects zero.

First build/start/readiness/browser/assertion/cleanup failure is `HOLD`; no
retry, second start, second browser launch, alternate controller, correction,
or fallback.

Write only:

- `115_WORKER_F2_RESUMED_BUILD_RUNTIME_CATALOG_BROWSER_RESULT.md`
- `116_WORKER_F2_RESUMED_BUILD_RUNTIME_CATALOG_BROWSER_POINTER.md`

Commit/non-force-push only those docs and STOP for Advisor/Leo Golden Path
checkpoint.
