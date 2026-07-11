# Advisor Round-2 Pre-Review Validation

- Mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Code/config/test commit: `10fdee75dca73c4fb5cde09019c403d4dc1682bb`
- Canonical docs commit: `c0c389068f91ce6e0fe2ad09bf7df03974a4d9a0`
- Target status: clean; local HEAD equals `origin/shadow/agent-office-m01`
- Final approval: not granted

## Directly Reproduced Evidence

Advisor independently ran:

- `npm run check`: PASS; 53 test files / 228 tests, lint, strict typecheck, core build, production dashboard build.
- Focused R3 suite: PASS; 6 files / 54 tests.
- `npm run smoke:runtime`: PASS; explicit manifest source, no fixture fallback, loopback shell/status, `AUTH_BLOCKED`, mutation disabled, manual gateway fallback, listener rebind, writer-lock release.
- `npm run audit:dependencies`: PASS; zero vulnerabilities.
- `npm run test:e2e`: PASS; demo 18/18 and composed application 3/3.
- Direct image inspection: desktop, mobile, and reduced-motion composed baselines are nonblank, coherent, responsive, and show no unsupported motion.
- Actual Git diff and both commits: exact declared scope; no runtime DB/secret/provider/public/prod/live or main change.

Advisor directly confirmed the round-2 implementation materially closes the seven R3 wiring gaps: explicit operational manifest authority, observation coordinator, evidence-derived freshness, durable alerts, application office scene, injected Tmux Advisor boundary, and composed Advisor lifecycle tests. Real auth and real delivery activation remain correctly external.

## AO-E-R4 — Operational Authority Configuration Mode Is Not Enforced

**Classification:** `CODE_DEFECT` plus matching `DOCUMENTATION_PRECISION` patch.

`src/runtime/operational-config.ts:67-101` opens the authority-bearing operational configuration with `O_NOFOLLOW`, requires a regular file owned by the current UID, and bounds its size. It does not reject group-writable or other-writable file modes.

This file controls trusted project roots, Git/manifest/artifact/tmux sources, actor-to-WorkUnit mappings, freshness policy, and optional Advisor transport capability. A same-group or other local process must not be able to rewrite those authority inputs between deployments. The current test writes mode `0600`, but no negative mode test proves enforcement.

The handoff required an owner-controlled configuration, and canonical security documentation describes an owner/no-follow configuration. The executable must enforce the write boundary rather than relying on operator convention.

### Required narrow patch

1. Reject any operational configuration file with group or other write bits set (`mode & 0o022 !== 0`).
2. Preserve owner-readable `0400` and owner-read/write `0600` style files; do not require a secret-specific policy because this file is authority config, not a credential store.
3. Add direct tests for accepted secure modes and rejected `0620`, `0602`, and `0666` or equivalent group/other-writable modes.
4. Keep no-follow, owner UID, regular-file, size, and UTF-8 JSON checks unchanged.
5. Update only the canonical security/operations wording needed to state the enforced mode boundary and test evidence.
6. Rerun the full required gates; no unrelated refactor.

## Advisor Verdict

`NEEDS_NARROW_WORKER_PATCH_BEFORE_FABLE5_DELTA_REVIEW`
