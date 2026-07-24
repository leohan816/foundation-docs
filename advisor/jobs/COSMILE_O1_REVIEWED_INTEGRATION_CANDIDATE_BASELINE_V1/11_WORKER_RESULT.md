# Worker Result — COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1

ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoffs: 10 (SHA256 `38a6db40`), 20 recovery (`e90df4d4`), 21 focused supersession (SHA256 `06caa42f` blob `4e07280f`, docs `8ce7c81b`). `PRODUCT_WRITE: PROHIBITED` — none performed. Integration branch at `e1a5f3f`, clean/upstream-equal, zero product delta throughout.

## Candidate baseline outcome
Reviewed integration candidate `e1a5f3f`: the pure/mocked Vitest suite is fully green under network isolation; the actual-repository disposable-Postgres file has **2 genuine assertion failures** (M2B, M3A) when run against a live DB. Both preserved; no correction proposed.

## Evidence A — preserved isolated full gate (`bwrap --unshare-net`, handoff 10)
- `npm ci` (normal, engine provisioned 6.19.3); `npm run test:focused -- --cache=false`; `prisma:generate` first → `✔ Generated Client v6.19.3`.
- Full inventory: `Test Files 1 failed | 42 passed (43)` · `Tests 37 failed | 865 passed | 7 skipped (909)`.
- All 37 failures = one class in `scripts/o1_order_service_request.dbtest.vitest.ts` (`disposable PostgreSQL (actual repository)`): the test's own host-loopback DB was unreachable under `--unshare-net` (every case returned `{ kind: 'repository_error' }`). Execution-boundary mismatch, not a product assertion — hence the focused re-gate.

## Evidence B — focused DB-file re-gate (host-loopback, handoff 21)
- Prerequisite verified: docker present, existing local `postgres:16-alpine` image present (not pulled); no residual container/port; canonical fixed-locale baseline recorded.
- Fresh normal `npm ci --no-audit --no-fund` (mission-local HOME/XDG/npm cache), exit 0; worktree-local `prisma`/`@prisma/client` `6.19.3`; engine present; `package.json`/`package-lock.json` unchanged.
- Ran exactly once on host (no `--unshare-net`; owner/provider/Google/Toss/prod env unset): `npm run test:focused -- scripts/o1_order_service_request.dbtest.vitest.ts --cache=false`. `prisma:generate` first → `✔ Generated Client v6.19.3`. The test alone started its own `postgres:16-alpine` on `127.0.0.1`, applied committed migrations, seeded synthetic fixtures.
- Result (exit 1): `Test Files 1 failed (1)` · `Tests 2 failed | 44 passed (46)` · 101.95s. The disposable DB was reachable — 44 of 46 pass with the real repository.
- **First actionable failure (preserved):** `M2B actual runtime inspection projects all three eligible request kinds with zero write` — `AssertionError: expected { kind: 'terminal' } to deeply equal { kind: 'eligible', …(1) }`.
- Second failure: `M3A minimum active operator service-request queue > M3A actual runtime returns all three categories with exact redacted keys and deterministic oldest-first order`. STOP after preserving the first; no diagnosis expansion.

## Integrity / cleanup
- Canonical fixed-locale (`en_US.UTF-8`) targeted hashes IDENTICAL before/after both runs (`.prisma/client` `0c29c3a7…`, `@prisma/client` `0b988dcb…`, `prisma` `6b6ba73b…`, `package.json` `a486716…`, `package-lock.json` `36dfa1a…`) → canonical never executed/copied/linked/written.
- Disposable container + loopback port absent (test `afterAll` + verified `NO_CONTAINER`); worktree deps + mission cache/temp + build/test residue removed; zero residue; HEAD `e1a5f3f` clean/upstream-equal; no lingering child process.

## Constraints honored / not asserted
No product write, other Vitest file, full-suite re-run, typecheck, build, lint, retry, provider/DB/runtime beyond the test's own disposable DB, commit, push, patch, or proposed correction. No independent-review verdict. The M2B/M3A actual-repository failures at `e1a5f3f` are Advisor findings, not addressed here.

RETURN_TO `foundation-advisor`. STOP.
