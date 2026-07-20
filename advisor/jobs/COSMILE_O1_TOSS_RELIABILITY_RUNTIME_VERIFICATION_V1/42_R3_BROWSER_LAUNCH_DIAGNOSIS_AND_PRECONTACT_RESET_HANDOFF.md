# R3 Browser Launch Diagnosis and Pre-contact Reset — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
PRODUCT_HEAD: `824b41751238390b8baf54a3be68ee82a4d5823f`
ACTOR: same `cosmile:0.0` / Opus 4.8 / xhigh / exact mission CWD
SKILL: `/fable-builder`; use only implementation-execution, test-design-before-code, and implementation-report-template.
DELTA_ONLY_VERIFICATION: REQUIRED
PROVIDER_CONTACT: PROHIBITED

Preserve `56_`/`57_`, `58_`/`59_`, and `60_`/`61_`. Advisor directly verified the replacement stages ended at `FAIL:BROWSER_START:readiness_timeout`; `PROVIDER_WINDOW` and `PROVIDER_KEY_DURABLE` are absent. Toss SDK/request/provider/economic effect count is therefore zero. Leo's one authorized replacement provider window remains unused.

Exact temporary source allowed:
`app/scripts/tmp/cosmile-o1-r3r4-replacement/r3r4_one_replacement_provider.vitest.ts`

Exact protected diagnostic output allowed temporarily:
`/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3-browser-diagnosis/chromium.stderr`
The parent must be `leo:leo 0700`; file regular non-symlink `leo:leo 0600`. Inspect locally only for the exact launch category; never publish its content; delete the file and parent before return.

Required work:

1. Diagnose Chromium/CDP launch once without DB, app, credentials, durable store, provider SDK, or external URL. Use the same Chrome binary, a fresh protected profile, fresh loopback CDP port `9225`, `about:blank`, and flags disabling background networking. Capture stderr only to the protected file above.
2. If and only if the exact failure cause is proven, make the smallest launch correction in the exact temporary driver. Do not infer or add optional flags.
3. Move `replacementWindowStarted=true`, `fenceSet=true`, and `WINDOW_FENCE_SET` so they occur only after browser/CDP readiness and immediately before `PROVIDER_WINDOW` / the first provider SDK evaluation. No provider action may occur between the durable fence and the SDK call.
4. Preserve every crash-safe correlation, tuple, idempotency, pg_dump, and cleanup contract from `40_` and `41_`; change no product source or economic semantics.
5. Prove one local browser readiness result only: CDP ready boolean and `about:blank` final category. No HTTP, DB, app, Toss, Google, credential, or provider action.
6. After Advisor has preserved and validated `60_`/`61_`, remove only the exact stale pre-provider recovery root `r3r4-replacement` because its stage evidence proves provider effect zero. Recreate nothing for provider execution in this handoff.
7. Remove profile, protected stderr, diagnosis root, and any exact mission browser process. Prove ports `9224` and `9225` closed, no mission Chromium process, product Git clean/upstream-equal at `824b417`, and durable TEST store untouched.

No build, typecheck, test suite, DB/container, app runtime, provider/network, credential read, product/tracked write, Reviewer, or R3/R4 provider resume. STOP on any other writable path, unresolved cause, browser binary mismatch, external access, or product change.

Return `READY_TO_PROVIDER` or `HOLD` in <=40 lines: exact temp delta, diagnosed launch category, local readiness boolean, fence placement, cleanup, provider/economic effect `0`, and Git state. STOP.
