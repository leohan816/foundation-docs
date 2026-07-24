# Focused gate timeout recovery

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`

The handoff-30 product delta remains frozen to the one DB test file. Two attempted focused executions ended with harness exit `144` before Vitest emitted any verdict because the Claude Bash call's two-minute ceiling covered install/spin-up plus the approximately 100-second DB file. They are preserved as inconclusive execution-boundary failures, not test failures. No mission process/container/port remains; the completed lockfile install remains worktree-local.

Authorize exactly one final conclusive execution of the same focused command without another install:

`npm run test:focused -- scripts/o1_order_service_request.dbtest.vitest.ts --cache=false`

Launch it once as a detached mission-owned process with output and PID only in the existing owner scratch directory, then use read-only short polls until it exits. Do not start another test process. The command still performs the candidate-local Prisma generate first and may reach only its own disposable loopback PostgreSQL with synthetic data. If it does not finish within ten minutes, terminate only that mission-owned process group, clean its container/port, preserve the timeout, and HOLD.

On a verdict: preserve failure and STOP, or require 46/46 PASS. Then remove the PID/log after recording categorical evidence, perform the already-frozen cleanup/integrity checks, commit/push the one-path delta only on PASS, return, and STOP. No reinstall, alternate test, full suite, typecheck, build, schema, source path, provider, owner environment, or retry is authorized.
