# Worker Result — COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1

ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff verified SHA256 `38a6db40…` ✓ blob `18e6802e…` ✓ (docs `2a1c6cde`). `PRODUCT_WRITE: PROHIBITED` — none performed. Integration branch `integration/cosmile-o1-reviewed-candidate-baseline-v1-20260724` at `e1a5f3f`, clean/upstream-equal, zero product delta.

## OUTCOME: baseline gate FAILED — 1 DB-integration file cannot run under the no-DB isolated boundary (preserved, no retry/correction)

## Environment (normal lockfile install)
- Canonical `en_US.UTF-8` baselines recorded before action; worktree `app/node_modules`/`.next`/`next-env.d.ts`/tsbuildinfo absent.
- One `npm ci --no-audit --no-fund` (mission-local HOME/XDG_CACHE_HOME/npm cache; network = pinned registry + official Prisma engine), exit 0. Worktree-local `prisma`=`6.19.3`, `@prisma/client`=`6.19.3`; engine provisioned (`schema-engine` + `libquery_engine…`); `package.json`/`package-lock.json` unchanged.

## Isolated full Vitest gate (once, `bwrap --unshare-net`)
Command: `npm run test:focused -- --cache=false` (→ `npm run prisma:generate && vitest run --cache=false`), closed-loopback `DATABASE_URL=postgresql://localhost:1/cosmile_o1_baseline`, Prisma autoinstall/checkpoint/update + telemetry disabled.
- Generate-first proven: `> app@0.1.0 prisma:generate` → `✔ Generated Prisma Client (v6.19.3)`.
- **Complete current gate counts** (exit 1): `Test Files 1 failed | 42 passed (43)` · `Tests 37 failed | 865 passed | 7 skipped (909)` · Duration 30.38s.

### First actionable failure (preserved)
- File: `scripts/o1_order_service_request.dbtest.vitest.ts` (`46 tests | 37 failed`), describe `M1C serviceRequestRepository — disposable PostgreSQL (actual repository)`.
- Cause: the actual repository returns `{ kind: 'repository_error' }` for every case because a **disposable PostgreSQL is unreachable** under `--unshare-net` + closed-loopback `DATABASE_URL`; e.g. `AssertionError: expected { kind: 'repository_error' } to deeply equal { kind: 'not_found' }` (also `completed_pre_capture`, `terminal`, `requested`, `existing_request`, …). All 37 failures are this single DB-unavailability class in this one actual-repository file; first failure at `:421`.
- The remaining 42 test files (865 tests, 7 skipped) — the pure/mocked contract suite — all pass under isolation.

## Integrity / cleanup
- Canonical targeted `en_US.UTF-8` baselines IDENTICAL before/after (`.prisma/client` `0c29c3a7…`, `@prisma/client` `0b988dcb…`, `prisma` `6b6ba73b…`, `package.json` `a486716…`, `package-lock.json` `36dfa1a…`) → canonical never executed/copied/linked/written.
- Unconditional removal of worktree deps, mission cache/temp, `.next`, `next-env.d.ts`, tsbuildinfo, test cache; zero residue; HEAD `e1a5f3f` clean/upstream-equal; no lingering child process.

## Constraints honored / not asserted
No product write, typecheck/build/lint, another test, provider/DB/runtime command, retry, commit, push, patch, or proposed correction. No independent-review verdict. The disposable-PostgreSQL actual-repository requirement vs. the no-DB isolated boundary is an Advisor scope decision, not proposed here.

RETURN_TO `foundation-advisor`. STOP.
