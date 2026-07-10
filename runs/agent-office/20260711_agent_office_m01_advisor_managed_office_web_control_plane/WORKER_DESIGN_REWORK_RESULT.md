# Agent Office Worker Design Rework Result

Status: `F1_F2_F3_PATCH_PUBLISHED__PENDING_INDEPENDENT_FABLE5_DELTA_REREVIEW__RETURN_TO_ADVISOR`

This is a factual Worker rework report. It is not Reviewer work, a review verdict,
risk acceptance, implementation authorization, or final approval.

## 1. Identity and Exact Scope

- MISSION_ID: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- WORK_UNIT: `AO-WU-06`
- ACTOR: `Agent Office Worker Rework`
- WORK_MODE: `DESIGN_ONLY_REWORK__FABLE5_F1_F2_F3_ONLY__NO_IMPLEMENTATION`
- TARGET_PROJECT: `Agent Office`
- TARGET_REPO: `/home/leo/Project/agent-office`
- TARGET_BRANCH: `shadow/agent-office-m01`
- REVIEWED_BASE_COMMIT: `fedf716e780c760641d157cc9f4c08f698f41409`
- RESULTING_HEAD: `82821afe48b08f70b6888e3ebf12dee3095cd2bb`
- FABLE5_RESULT_SOURCE_COMMIT: `62dd994ab08c3f328734fb894466a94693ebda02`
- FABLE5_VERDICT_READ: `NEEDS_PATCH`
- EXISTING_SESSION: `agent-office/$13`, window `0`, pane `%13`
- SESSION_COMMAND_AND_PATH: `codex` at `/home/leo/Project/agent-office`
- ASSIGNED_MODEL_EFFORT: `gpt-5.6-sol / ultra`
- AGENT_SUBAGENT_DELEGATION_STATUS: `NONE`
- RESULT_FILE:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_DESIGN_REWORK_RESULT.md`
- POINTER_FILE:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/17_WORKER_DESIGN_REWORK_RESULT_POINTER.md`

The exact rework handoff, exact Fable5 result/pointer at `62dd994`, original design
commit, all seven canonical files, original handoff/addendum, mission manifest,
active Agent Office instructions, branch, upstream, status, and live session were
read directly. No summary or pane narrative was used as authority.

## 2. Exact Changed Files

Commit `82821afe48b08f70b6888e3ebf12dee3095cd2bb` modifies only:

1. `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
2. `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`
3. `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
4. `docs/FEATURE_INDEX.md`

Commit summary: `4 files changed, 350 insertions, 24 deletions`.

The allowed master design was not needed. Master, security, and operations
documents remain byte-identical to reviewed commit `fedf716`. No fifth design
file, bootstrap instruction, foundation-docs canonical mirror, source, package,
test, or asset file was changed or created.

## 3. F-1 Required-State Conformance Patch

The sound two-axis architecture is preserved: durable primary WorkUnit state plus
structured RoleActivity.

Added to the domain contract:

- an explicit 16-row conformance table for `QUEUED`, `READY`, `DISPATCHING`,
  `READING`, `WORKING`, `TESTING`, `WRITING_RESULT`, `RETURNING_RESULT`,
  `REVIEWING`, `NEEDS_PATCH`, `WAITING_DEPENDENCY`, `WAITING_LEO`, `BLOCKED`,
  `COMPLETED`, `FAILED`, and `CANCELLED`;
- for every row: exact primary state and/or activity, structured trigger, end
  condition, persistence semantics, and rationale;
- exact explanations for `DISPATCHING -> DISPATCHED + DELIVERY`,
  `WORKING -> RUNNING + WORKING`, `REVIEWING -> REVIEW_PENDING + REVIEW`, and
  `RETURNING_RESULT -> RESULT_REPORTED + RESULT_RETURN`;
- new structured `WRITING_RESULT` activity while primary state remains `RUNNING`
  or `TESTING`, triggered by `RESULT_DRAFT_STARTED` and ending before/at durable
  result reporting, return to work/testing, block/wait/fail, or expiry;
- `requiredObservableName` as a deterministic projection field, correlated event
  requirements, and primary/activity pair validation; and
- updated activity schema and traceability/test paths.

Updated in the UI contract:

- WorkUnit dispatch now explicitly triggers `DELIVERY` with
  `WORKUNIT_DISPATCH`;
- `WRITING_RESULT` has a structured visual/static/end-condition row;
- visual precedence includes `RESULT_RETURN > WRITING_RESULT > TESTING`; and
- acceptance/traceability paths cover all 16 exact observable names and the new
  writing-result interval.

Factual reproduction: all 16 conformance rows were counted; all four required
mapping strings, activity-schema value, trigger reason, UI row, precedence, and
future test paths were found.

## 4. F-2 Blocker, Alert, and GPT Package Patch

### Blocker contract

- Added a closed 16-value `BlockerKind` vocabulary containing every exact mission
  kind.
- Each kind has a fail-closed safe default and default resolution owner.
- Added the exact logical `BlockerOpened` envelope/payload contract with blocker
  ID, mission/entity refs, kind/reasonCode, explanation, safe default, resolution
  owner, typed next action, blockedSince, evidence refs, prior/resume state,
  request ID, manifest/expected-stream versions, causation, and correlation.
- Opening is idempotent/version checked. Resolution requires owner, code,
  immutable evidence, resolved time, and ResumeProof. Timeouts, acknowledgement,
  reconnect, and observations cannot auto-resolve it.

### Alert contract

- Added the closed 9-value `AlertKind` vocabulary with default severity and
  canonical action codes.
- Added the exact logical `AlertRaised` payload including entity refs, condition,
  localization keys/parameters, actions, sources/evidence, deterministic key,
  occurrence fields, resolution condition, and envelope idempotency/version/
  causation/correlation fields.
- Pinned the deduplication key to SHA-256 over RFC 8785 canonical JSON of mission,
  kind, primary entity, condition key, and manifest version.
- Integration now consumes canonical `AlertKind`/payload/dedup/action values and
  rejects adapter-invented kinds. Repeated open-key occurrences do not duplicate
  an outbound notification for one trigger event.

### GPT copy package

Pinned the exact ordered 13 fields:

`TARGET_ACTOR`, `MISSION`, `REQUEST_ID`, `SOURCE_ADVISOR_JOB`,
`READ_DECISION_REQUEST`, `CONFIRMED_FACTS`, `UNKNOWNS`, `QUESTION`, `OPTIONS`,
`ADVISOR_RECOMMENDATION`, `SAFE_DEFAULT`, `RETURN_RESULT_TO`, and
`DO_NOT_START_ANOTHER_MISSION_AUTOMATICALLY`.

Types/order, deterministic Markdown headings, no additional fields, canonical
hashing, fixed return to Advisor, and boolean no-automatic-next-mission behavior
are specified.

Factual reproduction: 16 blocker kinds, all required blocker fields, 9 alert
kinds, ordered 13 GPT fields, and canonical integration references were counted/
found.

## 5. F-3 Korean Vocabulary Patch

Added one canonical UI locale section that fixes:

- 5 hierarchy labels, including all exact required Korean nouns;
- Korean labels for all 16 required observable WorkUnit names;
- Korean labels for all 9 canonical AlertKind values;
- all 6 exact required Korean alert-action labels;
- Korean labels for all 16 BlockerKind values;
- deterministic unknown reasonCode fallback without machine translation;
- two separate progress labels: WorkUnit-count progress and required-gate
  progress, with distinct numerator/denominator semantics; and
- byte-preserving `labelKo` behavior with an explicit no-silent-translation rule.

UTF-8 validity was checked. The required Korean strings were tested by exact
match without printing non-ASCII terminal output.

## 6. Validation Evidence

| Check | Factual outcome |
|---|---|
| F-1 reproduction | Complete: 16 rows plus mappings/schema/UI/trace paths |
| F-2 reproduction | Complete: 16 blocker kinds/fields, 9 alerts/dedup, 13 ordered GPT fields, integration references |
| F-3 reproduction | Complete: 5 hierarchy, 16 status, 9 alert, 6 action, 16 blocker, 2 progress labels |
| Local Markdown target existence | No broken local file target found |
| Candidate status headers | 7/7 unchanged and present |
| Local traceability headers | 7/7 present |
| Master material trace rows | Exactly 50 retained |
| Untouched design surfaces | Master/security/operations match `fedf716` |
| Prior passed-surface anchors | Domain/integration/UI invariants remained present |
| UTF-8 | Valid for all four changed Markdown files |
| Whitespace | `git diff --cached --check` returned no findings |
| Staged scope | Exactly four allowed files; unstaged 0; untracked 0 |
| Runtime tests | Not run/not applicable: no runtime or test files exist; declared test paths remain future design targets |

These are reproduction/structure checks, not an independent review. Only Fable5
may determine whether the findings are closed.

## 7. Git, Push, and Ancestry Evidence

- Base: `fedf716e780c760641d157cc9f4c08f698f41409`.
- Commit: `82821afe48b08f70b6888e3ebf12dee3095cd2bb`
  (`docs: close Agent Office design review findings`).
- Staging: only the four explicit paths in Section 2.
- Push: non-force update `fedf716..82821af` to
  `origin/shadow/agent-office-m01`.
- Local HEAD, upstream, and remote ref are all
  `82821afe48b08f70b6888e3ebf12dee3095cd2bb`.
- Local HEAD and upstream are ancestors of each other and therefore equal.
- Final target status count: `0`.
- Commit contains no non-document path.

## 8. Forbidden and Excluded Scope Evidence

- PRODUCT_OR_ARCHITECTURE_REDESIGN: `NONE`
- IMPLEMENTATION_SOURCE_PACKAGE_TEST_OR_ASSET: `NONE`
- MASTER_SECURITY_OR_OPERATIONS_DOC_CHANGE: `NONE`
- BOOTSTRAP_INSTRUCTION_CHANGE: `NONE`
- FOUNDATION_DOCS_CANONICAL_MIRROR: `NONE`
- DATABASE_SCHEMA_MIGRATION_OR_QUERY: `NONE`
- SECRET_ENV_AUTHENTICATION_OR_PII_ACTION: `NONE`
- EXTERNAL_PRIVATE_NETWORK_PUBLIC_PRODUCTION_OR_LIVE_ACTION: `NONE`
- TMUX_INPUT_OR_TRANSPORT_AUTHORITY_CHANGE: `NONE`
- HERMES_IMPLEMENTATION_OR_CONNECTION: `NONE`
- REVIEWER_WORK_SELF_REVIEW_RISK_ACCEPTANCE_OR_FINAL_APPROVAL: `NONE`
- MAIN_PUSH_MAIN_MERGE_PROTECTED_BRANCH_OR_FORCE_PUSH: `NONE`
- AUTOMATIC_IMPLEMENTATION_OR_NEXT_MISSION: `NONE`
- NEW_SESSION_AGENT_SUBAGENT_OR_DELEGATED_CONTEXT: `NONE`

Terminal use was limited to exact reads, repository/session inspection, the narrow
documentation patch, reproduction/structure checks, explicit staging, commit,
non-force push, and evidence verification. Terminal output remained ASCII-only.

## 9. Foundation-Docs Publication Discipline

- Foundation-docs starting branch: `main`.
- Starting HEAD and upstream:
  `3c52687a1c26a73f478147a0ac0cf2772a1c2ebb` (equal).
- Pre-existing unrelated dirt was present and preserved:
  - modified `advisor/_system/AGENTS.md`;
  - modified `advisor/_system/README.md`;
  - modified
    `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`;
  - untracked `advisor/jobs/20260709_reviewer_selection_protocol/`;
  - untracked `advisor/jobs/20260709_role_result_storage_protocol/`.
- Only this result and the exact rework pointer are authorized for publication.
  This result is committed first so the pointer records its exact commit.

## 10. Limitations and Routing

- The patch remains candidate design, not as-built behavior.
- Fable5 delta re-review has not been performed in this Worker session.
- Review status is
  `NOT_PERFORMED_BY_WORKER__PENDING_ADVISOR_ROUTING_TO_SAME_FABLE5_REVIEWER`.
- No STOP condition was encountered.
- Advisor must validate this delta/result and route the same independent Reviewer.

RETURN_TO: `Advisor`

PROPOSED_NEXT_ACTOR: `Advisor`

STOP
