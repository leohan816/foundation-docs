# Grok Pilot Implementation Rework

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing `agent-office-grok/$16/%16`
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
DO_NOT_PASTE_INTO: Advisor, `agent-office`, or Reviewer
RETURN_RESULT_TO: Advisor

Patch candidate `2378b28de2975f3cf00ba9922ea2f14d7af0fd30` only. Directly read
`12_ADVISOR_IMPLEMENTATION_VALIDATION.md`, the original mission/brief, actual
source/diff/tests, and active repo instructions. Do not trust your prior report.

## Required Technical Corrections

1. Use the exact uppercase truthful state vocabulary from the mission. Design a
   coherent primary/faceted observation contract without pretending mutually
   independent unknowns are one proven state.
2. Define typed server, session, window, pane, AI runtime, evidence-source,
   accepted runtime-identity evidence, accepted structured-work evidence, and
   observation-time contracts.
3. Process name may establish only process detection. `grok`, `claude`, or
   `codex` must never set verified identity/model/effort. Session/window names
   are opaque and never identity evidence.
4. A Grok fixture becomes `AI_READY` only through separate accepted structured
   runtime metadata. `AI_WORKING` requires separate accepted structured WorkUnit
   evidence with evidence IDs; prose, attach, activity time, proximity, and
   process name are insufficient.
5. Parse the exact `tmux list-panes -a -F` record with fatal UTF-8, exact field
   count, safe strings, exact ID regexes, nonnegative integer validation, strict
   booleans, strict timestamps, and deterministic `result.completedAt` as the
   observation time. Include attached state explicitly. Never synthesize empty
   records or epoch fallback from malformed input.
6. Deduplicate byte/field-identical pane observations deterministically. Treat
   same-identity conflicting observations as `AI_ERROR`/conflict evidence or a
   strict structured error; never pick one silently.
7. Implement and test every required fixture: shell-only; Claude unknown model;
   Codex unknown effort; Grok with separately verified identity; dead pane;
   unknown process; attached-idle; identical duplicate; conflict; offline server;
   malformed output; plus AI waiting/error/working and rejected unstructured work.
8. Update `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md` and
   `docs/FEATURE_INDEX.md` with exact as-built pilot/deferred status. Do not claim
   production integration or Worker promotion.
9. Correct the Worker report to match the actual changed files, exact tests,
   failures/retries, elapsed/context/token/cost availability, limitations, and
   scope deviations. Run `git diff --check` before commit.
10. Configure local upstream to `origin/pilot/grok-tmux-runtime-classification`
    and verify 0/0 equality after non-force push.

## Rework Allowlist

The original allowlist remains, plus these exact technically required files:

- `tests/helpers/fake-tool-runner.ts`
- `tests/helpers/operational-runtime.ts`
- `tests/integration/observation-coordinator.test.ts`

No other file is authorized. Package/lock/config/runtime/UI changes remain
forbidden. No agent/subagent/delegation. Do not contact `agent-office`.

Run focused tests, lint, strict typecheck, complete serial unit suite, build,
`git diff --check`, exact changed-file scan, and forbidden-command/source scan.
Commit/push the rework, then publish one corrected result-bearing Foundation Docs
commit and at most one pointer metadata commit. Return to Advisor and stop.
