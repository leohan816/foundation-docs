# ADVISOR CORRECTION — INHERITED NEXT IPC STATE

STATUS: **CORRECTED LAUNCH AUTHORIZED**
MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1

- Optimized build passed once and is preserved; no rebuild is authorized.
- The first `next start` invocation exited before TCP listen, HTTP, browser, DB,
  provider, or product action.
- Exact category: `INHERITED_NEXT_CHILD_IPC_STATE`. The verified source process
  is a Next child and its environment included `NEXT_PRIVATE_WORKER` and
  `NODE_CHANNEL_FD`; inheriting these made the new top-level process call
  `process.send()` against an invalid inherited channel (`write EINVAL`).
- Preserve the owner-only first log as
  `HOLD-inherited-ipc-start.log`.
- Correct only the mission-local launcher: remove `NEXT_PRIVATE_*`,
  `__NEXT_PRIVATE_*`, `NODE_CHANNEL_FD`, `NODE_CHANNEL_SERIALIZATION_MODE`, and
  `NEXT_RUNTIME` after reading the protected environment and before `execve`.
- Retry one top-level `next start` from the same built candidate. All other
  freeze 18 boundaries remain exact.

This is an invocation-boundary correction, not a product/runtime-contract
change.
