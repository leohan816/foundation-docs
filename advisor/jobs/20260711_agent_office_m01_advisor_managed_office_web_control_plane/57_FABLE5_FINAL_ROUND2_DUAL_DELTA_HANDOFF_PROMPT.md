TARGET_ACTOR: Fable5 Reviewer Re-Review
TARGET_SESSION: same existing reviewer-fable5 session, never Advisor or Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor session or Agent Office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Reviewer session

# Agent Office M01 Final Round-2 Dual Delta Review

Use the same existing independent Fable5 Reviewer session that returned the prior Agent Office final verdicts.

## Required role and effort

- Skill: `/fable-sentinel`
- Model/effort: `Fable5:Max`
- Review level: Level 3
- No new session, agent, sub-agent, or delegated context
- Two separate review artifacts and verdicts:
  - `DESIGN_REVIEW__AGENT_OFFICE_M01_FINAL_ROUND2_DELTA`
  - `IMPLEMENTATION_REVIEW__AGENT_OFFICE_M01_FINAL_ROUND2_DELTA`

## Read directly

1. This handoff.
2. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/56_ADVISOR_FINAL_ROUND2_VALIDATION.md`
3. Prior Fable5 final and delta artifacts.
4. Both final-round Worker results and pointers:
   - `WORKER_FINAL_REWORK_ROUND2_RESULT.md`
   - `52_WORKER_FINAL_REWORK_ROUND2_RESULT_POINTER.md`
   - `WORKER_OPERATIONAL_CONFIG_MODE_PATCH_RESULT.md`
   - `55_WORKER_OPERATIONAL_CONFIG_MODE_PATCH_RESULT_POINTER.md`
5. Original M01 intake/brief/manifest/addendum and current canonical Agent Office documents.
6. Actual Agent Office repo instructions, source, tests, scripts, config, current Git state, commits, and diffs.

Review the exact chain:

- base `3bd0e8f8cf10ecd53b917ba6cc1da45b9410b57b`
- R3 implementation `10fdee75dca73c4fb5cde09019c403d4dc1682bb`
- R3 docs `c0c389068f91ce6e0fe2ad09bf7df03974a4d9a0`
- mode implementation `ae7dd5ea1d92b025dd74b79806a26c086ab76de0`
- mode docs / final HEAD `abff45c9925962be29be535685e3efbccd587528`

Do not trust Worker or Advisor summaries as proof.

## Mandatory implementation review

Independently verify and disposition:

1. AO-E-R2 remains closed with no regression.
2. Production CLI requires explicit operational configuration and has no fixture fallback.
3. External manifest authority uses exact bounded no-follow path/hash/commit/Git evidence and fails closed.
4. Operational source registration isolates project/root/host/actor/station/WorkUnit/artifact identities.
5. Read-only Git/tmux/artifact/manifest observation is actually composed and never reads pane prose or writes an observed surface.
6. Current/stale/offline/missing/dirty/unverified/identity mismatch/partial failure and restart behavior are evidence-correct.
7. No unsupported `CURRENT`, actor activity, or animation is produced.
8. Observation semantic changes produce monotonic projection/SSE revisions without event-ledger corruption.
9. Durable alert details are hash-verified, redacted, lifecycle-correct, and surfaced to the communication UI.
10. The authenticated application projection renders the office scene and suppresses motion when evidence is not current.
11. M01 executable composition uses the typed `TmuxAdvisorGateway` boundary, never the Hermes stub.
12. Capability plus delivery port is required for READY; absent authority, kill switch, ambiguous receipt, and duplicate paths fail closed.
13. Browser code exposes no tmux target, shell/terminal command, Worker/Reviewer dispatch, or authority bypass.
14. The composed deterministic test proves immutable message, idempotent fixed Advisor pointer delivery, receipt, acknowledgement, intake, verified decision, resume, and no duplicate execution without claiming real activation.
15. Operational config requires current UID, regular file, no-follow, bounded size, fatal UTF-8 JSON, and no group/other write bits; `0400`/`0600` accept and `0620`/`0602`/`0666` reject.
16. Loopback/no-provider production remains fail-closed; real auth and real delivery remain external.
17. Multi-project and future multi-Advisor extension boundaries remain additive and isolated.
18. Tests, builds, Playwright evidence, smoke, dependency audit, Git scope, pushes, and clean state are real.

Re-run the complete Vitest suite and focused security/operational tests. Re-run Playwright composed-path tests and any demo regression needed for confidence. Inspect actual screenshots directly. Record anything not rerun as reported-only.

## Mandatory design review

Independently verify:

1. All seven canonical documents describe the actual final implementation, not an aspiration.
2. Every material requirement maps design -> implementation -> test -> evidence -> status -> deferred gate.
3. Prior D-1/D-2/D-3 and R3.9 are closed without weakening design.
4. Security/operations documents accurately state the authority config mode boundary.
5. Current canonical manifest states are distinguished from synthetic/demo inputs.
6. Real auth, real tmux delivery, remote hosts, deployment, and AO-WU-14 remain visibly unresolved.
7. No hidden final approval, production authorization, Hermes implementation, or automatic next mission appears.
8. Multi-project/multi-Advisor future architecture remains isolated and additive.

## Known test-history disclosure

During the narrow mode patch, the Worker initially overlapped `npm run check`'s production build with Playwright's demo build, causing the demo server to expose the wrong built page. The Worker stopped only its disposable test processes and reran the full browser suite sequentially, reporting 21/21 PASS. Advisor separately ran 21/21 PASS before the mode-only patch. Determine whether this is only a harness concurrency limitation or a product defect; preserve it as a testability/operations finding if appropriate.

## Verdict contract

Each pass must use exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Classify divergences as `CODE_DEFECT`, `DESIGN_DEFECT`, `DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or `NEEDS_LEO_GPT_DECISION`. Keep patchable defects separate from external authority gates.

## Forbidden

- patching any Agent Office or Advisor file;
- implementation or target commit/push;
- DB, secret, credential, real auth, real tmux input, privilege, production/live, or public exposure;
- new context/session/agent/sub-agent;
- final approval or next mission.

## Required outputs

Write and push only:

1. `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_ROUND2_DESIGN_DELTA_REVIEW_RESULT.md`
2. `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_ROUND2_IMPLEMENTATION_DELTA_REVIEW_RESULT.md`
3. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/58_FABLE5_FINAL_ROUND2_DUAL_DELTA_RESULT_POINTER.md`

Terminal output must be ASCII-only. Return the pointer to Advisor and STOP.
