# FOUNDATION ADVISOR ADDENDUM — PRISMA CACHE BIND CORRECTION

```text
MISSION_ID: COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
AUTHORITY: STRATEGY_BOUNDED_CODEGEN_CORRECTION
PARENT_CODEGEN_ADDENDUM: ad3f51d22cf76c962238283ee9be6a87b500b67f
```

- Repeat the same scripts-disabled lockfile install and the same one-time locked Prisma generation.
- In network-isolated `bwrap`, hide `/home/leo/.cache/prisma` with a fresh empty owner-only mission directory bind-mounted at that exact path; never make, read, copy, or alter the shared cache.
- Writable paths are limited to worktree `app/node_modules`, ephemeral `/tmp`, and the empty mission Prisma cache.
- Keep the closed-loopback process-only `DATABASE_URL`; no DB/network/provider/runtime/build/typecheck/schema/config/tracked write.
- Remove both mission npm and Prisma caches after categorical evidence.
- Any other writable-path, shared-content, network, or tracked-file need: cleanup and HOLD.
- On PASS, resume only the already-approved exact named Correction B RED → two-source-path patch → identical GREEN → three-path commit/push → STOP.
