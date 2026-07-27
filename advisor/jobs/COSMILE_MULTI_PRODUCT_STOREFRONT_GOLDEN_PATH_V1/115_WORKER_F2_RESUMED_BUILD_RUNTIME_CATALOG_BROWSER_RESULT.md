# F2 RESUMED BUILD / RUNTIME / CATALOG BROWSER GATE — WORKER RESULT

Status: **PASS** — every handoff-113 assertion holds. Two visual observations are declared below for Leo's checkpoint.

- Handoff `113` verified: docs `1b879eee234af4d2d7f6e66098d7d2ddf270a6bf`, sha256 `83e62c867b02ac8aff1d2c39a711c8804ba5b0d621e0ca55a3974501f3c1c824`.
- Product `40c12947aca718bc76b4b8e34e99e357239b9963`, clean/upstream-equal before and after. Prisma generate, typecheck, Vitest, DB one-shots, import, activation and review were **not** repeated.

## Preconditions

Bundle intact (9 files, `0700`). DB reconfirmed: 7 candidate snapshots / 7 bindings / 7 active non-hidden SKUs, eighth absent. Prior listener PID `1666005`, PGID `1665987`, CWD the mission app, owner `leo`. Tunnel ingress confirmed `cosmile.leohan.net → http://127.0.0.1:3000` (other hostnames map to unrelated ports and were untouched). Chromium pinned at `chromium-1234/chrome-linux64/chrome`; Node `v24.18.0`. Quarantine path, `candidate.pid` and `f2-browser-tmp` all absent beforehand. Protected env observed as **names only** (13).

## Build, runtime replacement

| Step | Result |
|---|---|
| Stop owned group `1665987` | port released, group gone, no tmux/Actor/other service touched |
| Quarantine `.next` → `rollback/f2-prebuild-next-40c1294` | intact, 904 files, destination did not preexist |
| One `next build` (`NODE_ENV=production`, unreachable sentinel `DATABASE_URL`) | **exit 0** — the production guard failed closed, so no candidate/DB/provider work occurred during compile |
| Remove build `.next`, repoint wrapper `BUNDLE_ROOT` only | one line changed; `exec … next dev` line untouched; wrapper stays `0700` |
| One `next dev` start via the wrapper | PID `2737382`, PGID `2737350`, CWD the mission app, F2 bundle bound, TCP ready, local `GET /` **200** |

No second start was attempted.

## Catalog browser pass (one CDP session, read-only)

Mechanism as approved: pinned Chromium + a temporary dependency-free Node 24 controller using built-in APIs and global `WebSocket`; one clean owner-only profile, `about:blank`, headless/no-sandbox, `--remote-debugging-port=0`, `DevToolsActivePort` read, direct browser-WebSocket connect (no `/json`), finite deadlines, no `--dump-dom`.

Public host `https://cosmile.leohan.net`:

| Page | Status | Distinct product links | Exactly the seven | Foundation KO names | Exact KRW prices | Eighth absent | Legacy/mock absent |
|---|---|---|---|---|---|---|---|
| `/` | **200** | 7 | ✅ | 7/7 | 7/7 | ✅ | ✅ |
| `/shop` | **200** | 7 | ✅ | 7/7 | 7/7 | ✅ | ✅ |

All seven detail routes returned **200** with matching Foundation display identity and exact KRW price, and with favorite and cart controls **present but never invoked**: cream-vitayouth ₩24,000 · cream-vpdrn ₩31,000 · mask-vitayouth ₩18,000 · pad-vitayouth ₩27,000 · serum-vitayouth ₩30,000 · serum-vpdrn ₩37,000 · sunscreen-vitayouth ₩22,000.

Console/hydration/page errors: **0**. Identity strings were taken from the reviewed bundle documents, so the page was compared against Foundation truth rather than against a hard-coded list.

## Declared visual observations (not gate failures)

1. **A promotional modal overlays the catalog on first load** of both `/` and `/shop` — a shipping-coupon dialog ("15,000원 → 0원"). The seven cards and the truthful `전체 7개` count render behind it. No assertion in handoff 113 covers modals, and it was **not** dismissed or clicked, so the authorized screenshots show the catalog partially obscured. Leo should expect to close this dialog before the Golden Path.
2. **Korean glyphs render as tofu boxes in the screenshots only.** The DOM text is correct — all seven Foundation Korean names matched exactly via CDP — so this is a missing Korean font in the headless Chromium image, not a content or encoding defect. Do not read the screenshots as broken text.
3. The desktop 1440px viewport renders the storefront inside the existing mobile phone-frame shell. That is pre-existing app chrome, unchanged by F2.

## Final state

- Exactly one listener on `127.0.0.1:3000`; PID `2737382`, PGID `2737350`, CWD the mission app, F2 bundle bound, dev `.next` live and kept for Leo's Golden Path. Public `GET /` **200**.
- Protected DB counts **unchanged**: `counts_unchanged = true`, `diffs = none`, `unexpected = none`; orders `pending:2`, reservations `reserved:2`; 7 candidate SKUs still active. Zero provider/economic effect — no login, favorite, cart, checkout, Google, Toss, order, payment or refund.
- Artifacts are exactly the authorized set: `f2-catalog-home-1440.png` and `f2-catalog-shop-1440.png` (`0600`, `leo:leo`), `candidate.pid` (`0600`), quarantine `rollback/f2-prebuild-next-40c1294`. `f2-browser-tmp` removed and verified absent; Chromium fully exited. Quarantine preserved as rollback evidence, not restored.
- Product Git clean/upstream-equal; no tracked write anywhere.

## Disclosed defect in my own command

During cleanup I ran `pkill -f "chromium-1234/chrome-linux64/chrome"`; the pattern matched the shell's own command line, so the shell killed itself (exit 144) and the remaining cleanup and verification statements in that one command did not run. Nothing was damaged: Chromium had already exited via the controller's own `Browser.close`, the dev runtime stayed up, and both screenshots were already written. I completed the cleanup with a plain `rm -rf` and re-ran the verification. No gate step failed and nothing was retried.

## Not proven

- The build proves compile only; the production guard's fail-closed behaviour is inferred from a clean build against an unreachable DB, not from an executed production request.
- Only the public catalog surface was probed. Authenticated routes, favorite/cart writes, checkout, Google and Toss were never exercised — Leo's Golden Path remains the first test of those.
