# P6 Bounded Integration Gate — Worker Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
CANDIDATE: `71e05266086639b4b1ff1f5a277a7f836dc3e5ab`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Admission and justification

M1-M4 focused RED/GREEN evidence already passed and must not be repeated. The cumulative candidate changes server/client route composition across home, navigation, cart, checkout, account, history, and order detail, so exactly one repository-defined non-production build is the smallest material integration gate. Do not run typecheck, Vitest, lint, or any other gate.

Host inspection found no Korean-capable font via `fc-list :lang=ko`; therefore no aesthetic or Korean-font rendering completion claim is authorized from this host. Preserve design-review risk R1 as a nonblocking final limitation; do not install fonts or alter CSS/fonts.

## Binding and skill

Use the existing primary Cosmile Claude Worker at Opus 4.8/xhigh in the exact mission worktree; keep Codex idle. Load `/fable-builder` with `implementation-execution`; use `implementation-report-template` only for the compact return.

## Exact command

From `app/`, run exactly once:

`NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://localhost:1/o1_build_sentinel COSMILE_O1_GOOGLE_AUTH_ENABLED=false COSMILE_O1_TOSS_ENABLED=false npm run build`

This invokes the repository-pinned `prisma:generate` before `next build`. The database value is synthetic, non-secret, closed-loopback, process-local, and must not be persisted. No DB/provider/network/runtime contact is authorized. If the command attempts such contact or fails, preserve the first actionable failure and return `HOLD`; do not diagnose, correct, or rerun.

## Containment and return

No product/source/config/manifest/lock write or commit. After the command, verify:

- package/lock and tracked paths unchanged;
- no DB/provider/runtime process or port;
- remove only mission-created `.next` and `tsconfig.tsbuildinfo` if present;
- keep the worktree-local ignored `node_modules`, including generated Prisma output, for review only;
- product HEAD remains candidate, clean/upstream-equal.

Return build PASS/HOLD, Prisma-generate category, Next build category, cleanup, Git state, and the Korean-font limitation in <=40 lines. STOP for independent review.

RETURN_TO: `foundation-advisor`
STOP.
