# M6 R1 Environment-Recovery Addendum

```text
MISSION_ID: COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
MODULE: M6_R1_ENVIRONMENT_RECOVERY_THEN_EXISTING_M6
ACTOR: cosmile
ROLE: Cosmile Worker
MODEL: Opus 4.8
EFFORT: max
SKILL: /fable-builder
BASE: 89affb86eeaf0a52a28297ac9e973c19f9cfa248
CONTROLLING_HANDOFF: 40_M6_RUNTIME_RECONCILIATION_WORKER_HANDOFF.md at docs commit b921449

VERIFIED_PRECONDITIONS:
- Worktree/shared app/package.json SHA256: a486716043eda96a51fe0ef1817c023dd81588ebf1b2e61f8e43d0ed20ae66c4
- Worktree/shared app/package-lock.json SHA256: 36dfa1a40fc8c10a3283e3871f248bf52e9add41bee16b624911a10d7ed8ab79
- prisma and @prisma/client versions: 6.19.3 in both lockfiles
- Shared .prisma/client tree SHA256: a44746f3a884278c5569599182a579a23421238d8a123df9eb001182c66f82ae
- Shared @prisma/client tree SHA256: 25428f66add54746e5ab7bb8bb6cd5b3634e53cee3cae3e0d8ebc01b4531962f

EXACT_PRIVATE_COPY:
/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/runtime/m6-r1-node_modules

RECOVERY_SEQUENCE:
1. Reverify BASE, clean/upstream-equal Git, hashes/versions above, copy-path absence, and app/node_modules + app/.next absence. Mismatch/collision => HOLD.
2. Create the private destination under mission-tmp with owner-only directory permissions. Copy /home/leo/Project/Cosmile/app/node_modules using `cp -a --reflink=auto --no-preserve=links`; never hardlink, install, or modify the shared tree. Verify representative shared/destination Prisma files do not share device+inode.
3. Bind worktree app/node_modules only as a symlink to the private copy.
4. Change only app/src/lib/runtime/o1ReliabilityRuntime.ts: immediately after the exhaust branch returns, add an explicit fail-closed return for `d.kind !== "reschedule"`; access delayMinutes only after the reschedule narrowing. No other gate-time code change.
5. In the private copy only, run Prisma generate exactly once from app/ against prisma/schema.prisma with:
   DATABASE_URL=postgresql://localhost:1/o1_schema_validation
   CHECKPOINT_DISABLE=1
   PRISMA_HIDE_UPDATE_MESSAGE=1
   PRISMA_GENERATE_SKIP_AUTOINSTALL=1
   npm_config_offline=true
   ./node_modules/.bin/prisma generate --schema prisma/schema.prisma
6. Generation must not install/download, connect to DB/provider/network, or change any product/shared path. Any attempt/change => STOP and containment.
7. Run exactly once: `./node_modules/.bin/tsc --noEmit -p tsconfig.json`.
8. If typecheck passes, run exactly once with NEXT_TELEMETRY_DISABLED=1: `./node_modules/.bin/next build`. Do not start/serve.
9. Failure of generation/typecheck/build => HOLD; no further correction or M6 implementation.
10. Capture categorical evidence; remove only app/.next. Keep the private copy and app/node_modules link for the already-frozen focused M6 tests.
11. Re-hash both shared Prisma-client trees after generation and after final cleanup; hashes must remain the verified values above.

ON_R1_PASS:
- Continue the exact seven-path M6 handoff at tests-first contract mapping/implementation.
- Replace its Vitest binary/NODE_PATH reference only with the isolated app/node_modules copy; never use the shared tree for M6 tests.
- No repeated generate/typecheck/build and no extra command/path.
- After focused M6 tests and evidence capture, remove app/node_modules and the exact private copy; verify app/.next absent, shared hashes unchanged, and Git containment before commit/push.

PATH_CEILING:
- The same seven product paths in handoff 40 only.
- Before R1 PASS, only app/src/lib/runtime/o1ReliabilityRuntime.ts may change, exactly as item 4.

STOP:
- Package/hash/version mismatch; hardlink/shared mutation; install/download/network/DB attempt; unexpected generated product path; gate failure; cleanup failure; or any scope expansion.

RETURN:
- First return a brief R1 PASS/HOLD gate result to foundation-advisor.
- On PASS continue existing M6 automatically; on HOLD stop.
- No Reviewer or next mission until a stable M6 candidate exists.
```
