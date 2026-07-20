# R2A Clean Rerun — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2A_CONTROLLED_WEBHOOK_CLEAN_RERUN`
PRODUCT_BASE: `c8c18b5cd0c4c01d8fdcbb1601265db3d6855cf3`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
WORKER: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; already-loaded `implementation-execution`, `test-design-before-code`; `implementation-report-template` only for return.
VERIFICATION: `DELTA_ONLY_VERIFICATION: REQUIRED`
PRODUCT_TRACKED_WRITE: `PROHIBITED`
ECONOMIC_EFFECT: `ZERO`
PROVIDER_OR_GOOGLE_CONTACT: `ZERO`
REVIEW_TIER: `SMALL`; no Reviewer.

## Frozen correction and scenarios

`COSMILE_O1_GOOGLE_AUTH_ENABLED=true` is required only by the existing non-production readiness configuration. The exact R2A webhook route/local-substitute flow does not execute Google identity, OAuth, credential, console, or provider code. Run one fresh R2A evidence pass with the flag `true`; do not read or supply a Google credential.

Execute only the original six scenarios:

1. notification intake and durable `200`;
2. exact duplicate and durable `200`;
3. delayed/out-of-order distinct-event intake;
4. paymentKey-missing order-number local query and durable correlation;
5. quarantine/fail-closed mismatch behavior;
6. exact `404`/`413`/`200`/`503` ACK classes.

No verification lease, restart recovery, exhaustion, capture/refund recovery, operator route, R2B+, extra probe, or new scenario.

## Exact read and temporary path ceiling

Read only the original R2A ceiling plus `app/src/lib/runtime/o1NonprodConfig.ts` to confirm the corrected readiness flag. No tracked edit.

- Private root: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r2a-rerun` (`leo:leo`, `0700`).
- Driver: `r2a_http_driver.ts` (`0600`, created with `apply_patch`), reusing the already-frozen design with opaque identifiers generated and retained in process.
- Empty bundle: `foundation-bundle/` (`0700`).
- Result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/44_R2A_RERUN_RESULT.md` (`0600`).
- Pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/45_R2A_RERUN_POINTER.md` (`0600`).

No log, PID, config, raw response/body, identifier, credential, cache, screenshot, or other artifact.

## Exact command/action ceiling

1. Prove before action: clean/upstream-equal base; package/lock/schema unchanged; exact container `cosmile-o1-r2a-pg-20260720`, ports `55439`/`31079`, app process, original and rerun temp roots absent; local locked dependencies present.
2. Create only the rerun root/bundle/driver; return `READY_TO_RUN` before DB/app action.
3. Start exactly one `postgres:16-alpine` container with `--pull=never`, tmpfs data, synthetic credentials, `127.0.0.1:55439:5432`; wait with `pg_isready`.
4. Run locked local `prisma migrate deploy` once: exactly nine committed migrations. Run only committed `o1_nonprod_fixture_setup.vitest.ts` once in one-shot preserve mode.
5. Start only existing `next dev --hostname 127.0.0.1 --port 31079` with O1 enabled, `COSMILE_O1_GOOGLE_AUTH_ENABLED=true`, local Toss substitute, test-shaped synthetic non-secrets, loopback public URL, empty bundle, no sandbox one-shot or provider credential. Discard app output; wait for TCP readiness.
6. Run the single driver once, localhost `/api/o1/webhooks/toss` only, exact six scenarios. For the frozen live `404` case only, stop the enabled app and relaunch the same app on the same loopback port with `COSMILE_O1_RUNTIME_ENABLED=false`; perform exactly the one disabled request, then stop it. This is the original R2A driver design, not an extra probe. Emit categories/counts/status/booleans only. PaymentTransaction/Refund and capture/refund transport effects must remain zero.
7. Unconditionally stop the complete app tree and exact container; remove rerun root/bundle/driver and attributable `.next`, `next-env.d.ts`, tsbuildinfo; verify ports/container/process/roots absent and Git clean/upstream-equal at unchanged HEAD.

No install/copy/symlink/generate/build/typecheck/broad test, provider/Google request, shared/production DB, real secret/PII, product write, R2B+, Reviewer, session/runtime/model change, or unrelated cleanup.

## Return and STOP

Return at most 35 lines: `SKILL_AND_REFS`, `PRE_CLEANUP_CONTAINMENT`, `BASELINE`, `TEMP_PATHS`, `GOOGLE_FLAG_CONTRACT`, `MIGRATIONS_FIXTURE`, `HTTP_SCENARIOS`, `ACK_MATRIX`, `ECONOMIC_EFFECT`, `PROVIDER_GOOGLE_CONTACT`, `PRODUCT_WRITES`, `FINAL_CLEANUP`, `GIT_STATE`, `VERDICT`, `BLOCKER`, `RETURN_TO`, `STOP`.
