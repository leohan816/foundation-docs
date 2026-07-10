# Agent Office M01 Design Rework Handoff

TARGET_ACTOR: Agent Office Worker Rework
TARGET_SESSION: same existing `agent-office` session that authored the candidate
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Work Mode

`DESIGN_ONLY_REWORK__FABLE5_F1_F2_F3_ONLY__NO_IMPLEMENTATION`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Use the same existing session/context. No agent, sub-agent, delegated context,
temporary session, second Worker, or Reviewer work.

## Required Direct Reads

- exact Fable5 result and pointer at foundation-docs commit `62dd994`;
- exact original design commit `fedf716e780c760641d157cc9f4c08f698f41409`;
- the seven canonical files, original handoff/addendum, mission manifest, and active
  Agent Office instructions;
- actual branch/diff/status and no summaries as authority.

## Exact Patch Scope

Close all three findings without changing the approved architecture or product
scope.

### F-1 Required-State Conformance

Preserve the sound two-axis model: durable primary WorkUnit state plus structured
RoleActivity. Do not flatten it.

Add an explicit conformance table for every required observable name:

`QUEUED`, `READY`, `DISPATCHING`, `READING`, `WORKING`, `TESTING`,
`WRITING_RESULT`, `RETURNING_RESULT`, `REVIEWING`, `NEEDS_PATCH`,
`WAITING_DEPENDENCY`, `WAITING_LEO`, `BLOCKED`, `COMPLETED`, `FAILED`,
`CANCELLED`.

For each, map the exact user-facing name to primary state and/or activity, trigger,
end condition, persistence semantics, and rationale. Explicitly represent
`WRITING_RESULT` as a structured activity between work/testing and result return.
Explain `DISPATCHING -> DISPATCHED + DELIVERY`, `WORKING -> RUNNING + WORKING`,
`REVIEWING -> REVIEW_PENDING + REVIEW`, and
`RETURNING_RESULT -> RESULT_REPORTED + RESULT_RETURN` without silent renaming.
Update event schemas, mapping, tests, and traceability consistently.

### F-2 Blocker and Alert Contracts

Define a typed `BlockerKind` vocabulary containing at least the exact mission set:

- `MISSING_LEO_DECISION`
- `MISSING_EVIDENCE`
- `SESSION_NOT_READY`
- `SESSION_OFFLINE`
- `WRONG_ACTOR_OR_WORKSPACE`
- `GIT_CONFLICT`
- `DIRTY_WORKTREE_CONFLICT`
- `TEST_FAILURE`
- `AUTHENTICATION_REQUIRED`
- `UNEXPECTED_APPROVAL_PROMPT`
- `SCOPE_CONFLICT`
- `DEPENDENCY_FAILED`
- `TIMEOUT`
- `ARTIFACT_MISSING`
- `COMMIT_NOT_PUSHED`
- `MANUAL_KILL_SWITCH`

Define exact `BlockerOpened` payload fields including blocker ID, entity refs,
kind/reasonCode, human-readable explanation, safe default, resolution owner, next
action, blockedSince, evidence pointer(s), prior/resume destination, causation,
correlation, and idempotency/version fields. Preserve lifecycle and fail-closed
rules.

Define typed `AlertKind` with at least:

- `NEEDS_LEO_DECISION`
- `PASS_WITH_RISK`
- `BLOCKED`
- `AUTHENTICATION_REQUIRED`
- `MANUAL_ACTION_REQUIRED`
- `FINAL_APPROVAL_REQUIRED`
- `MISSION_COMPLETE`
- `MISSION_FAILED`
- `INFORMATION`

Define deterministic alert payload/deduplication and ensure UI/notification
contracts reference the canonical enum rather than inventing kinds.

Pin the deterministic GPT copy package fields exactly:

`TARGET_ACTOR`, `MISSION`, `REQUEST_ID`, `SOURCE_ADVISOR_JOB`,
`READ_DECISION_REQUEST`, `CONFIRMED_FACTS`, `UNKNOWNS`, `QUESTION`, `OPTIONS`,
`ADVISOR_RECOMMENDATION`, `SAFE_DEFAULT`, `RETURN_RESULT_TO`, and
`DO_NOT_START_ANOTHER_MISSION_AUTOMATICALLY`.

### F-3 Korean User-Facing Vocabulary

Add a canonical Korean label table for:

- hierarchy: `활성 작업 묶음`, `패키지`, `현재 미션`, `단계`, `세부 작업`;
- every required observable WorkUnit status;
- required alert actions: `GPT용 패키지 복사`, `증거 열기`,
  `Advisor에게 답변`, `보류`, `미션 일시정지`, `미션 취소`;
- blocker labels or a deterministic reasonCode-to-Korean-label rule;
- progress labels distinguishing WorkUnit-count progress and required-gate
  progress.

No implementer may invent or silently translate these fixed labels. Dynamic
manifest labels remain preserved as `labelKo`.

## Allowed Canonical Files

Patch only files materially required from this list:

- `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
- `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`
- `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
- `docs/FEATURE_INDEX.md`
- `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md` only if needed for a concise
  cross-reference

Do not alter security/operations docs unless a direct broken reference requires it;
if so STOP and report instead of broadening.

## Validation and Git

- Re-run exact F-1/F-2/F-3 reproduction checks.
- Verify all links, traceability, status headers, and no regression to the 17
  questions Fable5 passed.
- Work only on `shadow/agent-office-m01`.
- Commit/push only the exact design delta, non-force.
- No foundation-docs canonical mirror.
- Write and push only:
  - `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_DESIGN_REWORK_RESULT.md`
  - `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/17_WORKER_DESIGN_REWORK_RESULT_POINTER.md`

Terminal output ASCII-only; Markdown may use normal UTF-8 for required Korean UI
labels.

## Forbidden

No implementation/source/package/tests/assets, no architectural redesign, no new
product policy, no bootstrap instruction edit, no DB/secret/env/auth/external/
production/live action, no main/force push, no Reviewer work/self-review, no new
session/agent/sub-agent/delegation, and no automatic implementation.

Return the pointer to Advisor and STOP.
