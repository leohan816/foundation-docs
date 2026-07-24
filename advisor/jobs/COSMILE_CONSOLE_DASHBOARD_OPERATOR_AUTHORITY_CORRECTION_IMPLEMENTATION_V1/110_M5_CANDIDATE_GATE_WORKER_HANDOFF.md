# M5 Bounded Candidate Gate — Worker Handoff

MISSION: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`

## Binding

- Actor: existing Cosmile Claude Worker, Opus 4.8/xhigh, `/fable-builder`
- Worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
- Candidate: `d7ede8536b0fae7fb9976e836be0c1618839ee10`, clean/upstream-equal
- Codex is idle. Claude is sole executor. No product or documentation write.

## Frozen command/effect ceiling

1. Preflight only: exact CWD/branch/HEAD/upstream/clean; package.json, package-lock.json and schema hashes; real local ignored `app/node_modules`; local `postgres:16-alpine`; executable `/home/leo/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`; ports `31081` and mission test containers absent.
2. Run once: `cd app && NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run typecheck`.
3. Run once as one exact focused command:
   `cd app && ./node_modules/.bin/vitest run scripts/o1_console_space_contract.vitest.ts scripts/operator_authority_contract.vitest.ts scripts/o1_operator_route_authority.vitest.ts scripts/o1_dashboard_reads.vitest.ts scripts/o1_dashboard_request_detail_authority.vitest.ts scripts/o1_operator_transition_routes.vitest.ts scripts/o1_lab_registry.vitest.ts`
4. Run once each, in order, and require PASS rather than SKIP: `python3 app/scripts/operator_authority_migration.dbtest.py`, `python3 app/scripts/operator_authority_repository.dbtest.py`, `python3 app/scripts/operator_audit_attribution.dbtest.py`. Existing scripts alone own disposable synthetic PostgreSQL and teardown.
5. Only after 2-4 PASS, run once: `cd app && NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run build`.
6. Only after build PASS, start the built candidate once on `127.0.0.1:31081` with the same closed-loopback DATABASE_URL, O1 flags unset/off, stdout/stderr to `/dev/null`, PID held only in the executing shell. Wait for authoritative TCP readiness.
7. Launch the pinned existing Chromium exactly once, local-only, with `--headless=new --no-sandbox --disable-gpu --disable-background-networking`, owner-only ephemeral profile, `--window-size=390,844`, and `--dump-dom http://127.0.0.1:31081/lab`. Verify categorical markers only: HTTP/render success, Korean Lab heading, 31 internal detail links, read-only warning, no button/form/input. Do not navigate externally or contact providers.
8. Unconditionally stop the complete mission-owned app/browser process tree; remove only mission-created profile, `.next`, and incremental/build residue; verify port/container/process/temp absence, package/lock/schema hashes unchanged, product clean/upstream-equal.

## Acceptance and STOP

- PASS requires: typecheck, 7-file focused Vitest, all 3 disposable DB tests, build, and the one mobile browser path all PASS; no tracked delta or residue; provider/economic/production/shared-DB effect `0`.
- Preserve the first actionable failure and STOP immediately: do not rerun, diagnose broadly, patch, weaken assertions, run another test/browser path, or continue review.
- Prohibited: install/generate outside scripts, manifest/lock/schema/source/docs change, public/preview runtime, Google/Toss/provider, secrets/PII, broad/full suite, second browser path, any tmux/session mutation.
- Return compact evidence only to foundation-advisor and STOP before Reviewer.
