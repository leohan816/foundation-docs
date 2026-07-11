TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing agent-office Worker session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor session or reviewer-fable5 session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Worker session

# Agent Office M01 Operational Config Mode Patch

Use the same existing Agent Office Worker session. This is a narrow pre-review correction only.

## Required role and effort

- Model/effort: `Codex 5.6 Sol:High`
- No new session, agent, sub-agent, or delegated context
- Do not execute from memory

## Read directly

1. This handoff.
2. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/53_ADVISOR_ROUND2_PRE_REVIEW_VALIDATION.md`
3. Current `src/runtime/operational-config.ts`, relevant tests, and the current canonical security/operations documents.

## Exact patch

1. In the operational config loader, reject a regular config file if group or other write bits are set: `(info.mode & 0o022) !== 0`.
2. Preserve owner UID, no-follow, regular-file, bounded-size, and UTF-8 JSON enforcement.
3. Accept secure owner-controlled read modes such as `0400` and `0600`; do not require executable bits or a real secret.
4. Add deterministic tests that accept secure modes and reject representative group/other-writable modes, including `0620`, `0602`, and `0666` or equivalent cases.
5. Update only the exact canonical security/operations/as-built rows needed to state the enforced mode and tests.
6. Run lint, strict typecheck, the focused operational-config/coordinator tests, full `npm run check`, full `npm run test:e2e`, runtime smoke, dependency audit, and `git diff --check`.
7. Inspect that no generated result directory is committed.

## Forbidden

- any R3 architecture rewrite or unrelated refactor;
- real auth, secret, credential, capability, tmux delivery, DB, network exposure, production/live, main, or unrelated file;
- changing Reviewer artifacts or verdicts;
- force push or automatic next mission.

Commit and push a narrow code/test commit and a narrow canonical docs commit to `origin/shadow/agent-office-m01`. Do not amend prior commits.

Write and push only:

1. `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_OPERATIONAL_CONFIG_MODE_PATCH_RESULT.md`
2. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/55_WORKER_OPERATIONAL_CONFIG_MODE_PATCH_RESULT_POINTER.md`

Terminal output must be ASCII-only. Return the pointer to Advisor and STOP.
