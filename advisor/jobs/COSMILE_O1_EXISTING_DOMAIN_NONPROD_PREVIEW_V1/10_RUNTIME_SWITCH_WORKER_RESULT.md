# 10 Runtime Switch Worker Result

MISSION_ID: COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1
CLAIM_CEILING: VERIFIED_NONPRODUCTION_EXISTING_DOMAIN_PREVIEW
HANDOFF_VERIFIED: 00 SHA256 5efd6dd9, blob cc4fbd0e (docs a2c3cb96)

## DECISION
PASS — candidate cut over onto the existing domain as a verified non-production preview. Rollback preserved, not executed.

## Process / port / commit binding
- Candidate commit `71e05266…` (branch implementation/cosmile-o1-storefront-customer-account-v1-20260724); product Git clean, upstream-equal, zero tracked change.
- Old runtime commit `b8b61d74…` — its process group stopped (TERM, bounded wait; no KILL needed).
- Candidate runtime: own session/group PGID `3489168`, CWD = candidate `app`, listener on loopback port 3000 only.
- Ports: live 3000 (candidate) · staging 31080 (started then fully stopped, free) · disposable DB 55450 — all loopback-bound.
- Ingress: cloudflared process present; `cosmile.leohan.net → 127.0.0.1:3000` mapping intact and unchanged. Other hostnames untouched.

## Route verification
- Staging (loopback, Host=cosmile.leohan.net, x-forwarded-proto=https), one GET each: `/`,`/shop`,`/cart`,`/account`,`/account/orders` → HTTP 200 + non-production marker. Staging then stopped.
- Public HTTPS (cosmile.leohan.net), exactly one GET each, no redirect follow: `/`,`/shop`,`/cart`,`/account`,`/account/orders` → HTTP 200 + non-production markers.
- Console availability (routes present in candidate HEAD): `/console` → HTTP 307, `/console/orders` → HTTP 307 (operator-login redirect, not followed) → live and auth-gated.

## Migration / fixture categories
- Disposable `postgres:16-alpine` (trust auth, tmpfs data, `--pull=never`), loopback 55450: 10/10 committed migrations applied.
- Fixture one-shot boundary (`O1_FIXTURE_ONESHOT=1` + `O1_FIXTURE_PRESERVE_FOR_RUNTIME=1`, external approved bundle root, `NODE_ENV=development`, disposable DB): PASS (5 asserted; 6 non-oneshot guards skipped). Bundle root = 3 files. `/account/orders` HTTP 200 confirms live candidate↔disposable-DB binding.

## Secret / provider containment
- Protected store verified regular, non-symlink, mode 600, owner leo:leo. Both Toss keys SET by name only (`NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY`, `O1_TOSS_TEST_SECRET_KEY`); values were consumed only through the protected process-environment boundary and were never printed, copied, hashed, or logged. Local substitute remained unset.
- Zero provider/economic effect: no Google or Toss request issued; no auth/payment link followed; GET-only checks.

## Cleanup / preserved
- Preserved (leo:leo): runtime scripts `start-candidate.sh`/`rollback-to-old.sh` 0700 regular non-symlink; `candidate.pgid`/`candidate.log` 0600; foundation-bundle 0700; disposable DB container; candidate process on 3000.
- Removed: staging-only residue (staging log + probe bodies); staging process (port free).
- Durable TEST/secret store untouched (mode/owner unchanged; read-only access only).

## Rollback
- Preserved protected rollback: stops only the candidate process group, restarts the old app explicitly bound to 127.0.0.1:3000. Not executed after PASS.

## Limitations
- R1 (nonblocking): host has no Korean-capable font (`fc-list :lang=ko` empty) — no aesthetic or Korean-font rendering completion claim is authorized from this host. No fonts installed, no CSS/font change.
- The old process-only dev flag/env cannot be reconstructed because its value was never read or copied; rollback uses the old app's standard dev start on 127.0.0.1:3000.
- Runtime is `next dev` (development) with a disposable DB and synthetic fixtures — non-production ceiling only.

## Git state
Candidate HEAD `71e05266…`, clean, upstream-equal, no tracked product/config/manifest/lock/schema change; no merge. Only these docs result/pointer files written.

RETURN_TO: foundation-advisor
STOP.
