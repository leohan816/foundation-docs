# R3/R4 Single Replacement Toss TEST Window Resume — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
FOUNDER_AUTHORITY: exactly one still-unused replacement Toss TEST/Sandbox provider window
PRODUCT_HEAD: `824b41751238390b8baf54a3be68ee82a4d5823f`
ACTOR: existing `cosmile:0.0` / Opus 4.8 / xhigh / exact mission CWD
SKILL: `/fable-builder`; implementation-execution, contract-to-code-mapping, test-design-before-code, implementation-report-template
DELTA_ONLY_VERIFICATION: REQUIRED

Advisor re-read the complete 709-line temporary driver and verified:

- exact driver: `app/scripts/tmp/cosmile-o1-r3r4-replacement/r3r4_one_replacement_provider.vitest.ts`
- driver SHA-256: `787062cf9c6582a20ae9489c5a3d4fe450149a1deb8fa8c4aeb882578b5ab2ac`
- regular non-symlink `leo:leo 0600`;
- existing Playwright-managed Chromium path is fixed in the driver;
- CDP readiness polls loopback `/json/version`, not the parent PID;
- `replacementWindowStarted=true` is durably written only after CDP/WebSocket readiness and immediately before `PROVIDER_WINDOW` / first SDK evaluation;
- recovery correlation is fsynced before provider contact; a nonterminal post-fence failure stops app/browser, creates exactly one owner-only `pg_dump -Fc`, and retains only correlation/dump/stages;
- full capture/refund tuple binding, stable idempotency, durable Refund-row authority, replay refusal, restart, exhausted visibility, reconciliation, and terminal query gates remain intact;
- product worktree is clean/upstream-equal at the exact HEAD; tracked/product delta is zero;
- original failure evidence `56_`/`57_`, containment `58_`/`59_`, and pre-provider replacement result `60_`/`61_` remain preserved.

Execute exactly once from `app/`:

`R3R4_REPLACEMENT_ONESHOT=1 ./node_modules/.bin/vitest run scripts/tmp/cosmile-o1-r3r4-replacement/r3r4_one_replacement_provider.vitest.ts`

Route command stdout/stderr to `/dev/null`; use only protected categorical `stage.jsonl`. Do not print, hash, copy, or return credentials, correlation values, provider keys/bodies, IDs, cookies, tokens, customer data, or secrets.

No second execution under any outcome. Do not suppress or normalize the first failure. Do not weaken assertions. No product/tracked write, schema change, install, generate, build, typecheck, broad test, Google, live credential, real money, PII, production/shared DB, public exposure, merge, or unrelated work.

On terminal PASS, capture categories/counts/booleans only, then remove the exact disposable DB/runtime/correlation/profile/bundle and ignored temporary driver; prove ports/processes absent, durable TEST store unchanged, and Git clean/upstream-equal. On any nonterminal post-fence failure, preserve recovery correlation, dump, stage evidence, and driver; clean all other runtime state; do not retry.

Return <=60 lines: ordered categorical stages, capture/refund/economic counts, tuple/replay/restart/reconciliation booleans, provider-window count `1`, cleanup or retained-recovery state, Git state, and `PASS | HOLD_WITH_NAMED_BLOCKER`. STOP. No Reviewer dispatch by Worker.
