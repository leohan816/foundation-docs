# FOUNDATION ADVISOR ADDENDUM — LOCAL PRISMA ENGINE REUSE

```text
MISSION_ID: COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
AUTHORITY: STRATEGY_BOUNDED_LOCAL_ENGINE_DECISION
EXPECTED_ENGINE_COMMIT: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
EXPECTED_PLATFORM: debian-openssl-3.0.x
PARENT_ADDENDUM: b824deef8b91e39c02ac1493715cd21a7557f554
```

- Repeat the identical scripts-disabled lockfile install; installed `@prisma/engines-version` must directly report the expected commit.
- Read-only source may be only `/home/leo/.cache/prisma/master/<expected-commit>/<expected-platform>`; require a real directory containing regular files only, with no symlink/device/socket/FIFO, and record names/counts/sizes/SHA-256 plus directory/file metadata.
- Copy only those verified regular files into a fresh owner-only mission Prisma cache at the identical relative path; no shared-cache write, symlink, hardlink, or product-source copy. Destination hashes must match and inodes must differ.
- Bind only the mission cache over `/home/leo/.cache/prisma` in the same network-isolated Prisma generation sandbox. Other writable paths remain worktree `node_modules` and ephemeral `/tmp` only.
- After generation, verify shared source hashes/metadata unchanged; remove mission npm/Prisma caches. Generated client may remain only under ignored worktree `node_modules`.
- Any mismatch, ambiguity, shared mutation, network/DB/other path need, or tracked change: cleanup and HOLD.
- On PASS resume only the approved named Correction B RED → exact two-source-path patch → identical GREEN → three-path commit/push → STOP. No other R1 work or Reviewer.
