# foundation-advisor

`foundation-advisor` defines the cross-repo Advisor role for Leo + ChatGPT.
It is an operating repository, not a runtime implementation repository.

Canonical cross-repo actor and release-train authority is defined in:

`../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`

Canonical design-threshold, unknown-gate, model-effort, skill, delta-review, and
test-rerun policy is defined in:

`../foundation-docs/설계문서/shared/ADVISOR_ORCHESTRATION_MODEL_EFFORT_SKILL_AND_DELTA_PROTOCOL.md`

The Advisor validates instructions against real repository state, identifies
unknowns and blindspots, writes briefs and copy-paste handoff prompts for
Workers and Reviewers, tracks returned results, manages patch loops, and stores
durable artifacts under:

`../foundation-docs/advisor/jobs/<job-id>/`

## Role Boundary

The Advisor is the field manager and final mission-completion auditor after
Leo/GPT defines a mission. It does not implement runtime changes, independently
review its own work, accept risk, or approve delivery. Routine role results return
to Advisor; new scope, material risk, final closure, and next-mission selection
return to Leo/GPT.

Normal Advisor writes are limited to:

`../foundation-docs/advisor/**`

Bootstrap and maintenance writes are limited to:
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `templates/*.md`
- `../foundation-docs/advisor/README.md`

## Standard Job Flow

1. Create a job folder:

   `../foundation-docs/advisor/jobs/<YYYYMMDD_project_stage_task>/`

2. Capture the original instruction in `00_INTAKE.md`.
3. Validate the instruction in `01_ADVISOR_BRIEF.md`.
4. Choose one validation decision:
   - `PROCEED`
   - `PROCEED_WITH_LIMITS`
   - `NEEDS_LEO_DECISION`
   - `HOLD`
   - `FAIL`
5. Write `02_WORKER_BRIEF.md` only when implementation may proceed.
6. Write review briefs when required:
   - `03_SENTINEL_REVIEW_BRIEF.md` for technical review
   - `04_SERVICE_REVIEW_BRIEF.md` for service review
7. Write copy-paste-ready handoff prompts when role sessions are needed:
   - `06_WORKER_HANDOFF_PROMPT.md`
   - `07_SENTINEL_HANDOFF_PROMPT.md`
   - `08_SERVICE_REVIEW_HANDOFF_PROMPT.md`
   - `09_REWORK_HANDOFF_PROMPT.md`
8. Maintain `10_LOOP_STATE.md` for implementation jobs that enter Worker/review/rework loops.
9. After Worker and required Reviewer evidence exists, write `05_FINAL_AUDIT.md`.
10. Maintain `index.md` as the job navigation file.

## Templates

Templates live in `templates/`:
- `00_INTAKE_TEMPLATE.md`
- `01_ADVISOR_BRIEF_TEMPLATE.md`
- `02_WORKER_BRIEF_TEMPLATE.md`
- `03_SENTINEL_REVIEW_BRIEF_TEMPLATE.md`
- `04_SERVICE_REVIEW_BRIEF_TEMPLATE.md`
- `05_FINAL_AUDIT_TEMPLATE.md`

Copy the relevant template into the job folder and replace placeholders with
task-specific facts and evidence.

## Stop Conditions

Stop and ask Leo/GPT when:
- instructions conflict with runtime code or canonical docs
- the target repo, branch, files, or acceptance criteria are unclear
- the requested change would touch forbidden scope
- implementation risk is high and no decision owner is named
- the Advisor would need to silently infer product, safety, legal, or data
  policy decisions

## Review Rules

Reviewer briefs must require a separate session from the Advisor and Worker.
Reviewers are read-only and must inspect the diff, code, tests, and evidence
directly. They must not trust Worker reports without verification.

## Handoff Prompts

Brief files define standards. Full handoff prompt files contain complete role
instructions. Short run prompt / launcher files are the default prompts Leo/GPT
pastes into role-specific sessions.

Long instructions stay in full handoff prompt files. Until Hermes is introduced,
Leo/GPT manually pastes the short run prompt into the target session. After
Hermes is introduced, Hermes reads and executes the `READ_AND_EXECUTE` path from
the short run prompt.

Run prompts are Korean-readable by default, while preserving paths, role names,
skill prefixes, filenames, commands, environment variables, and code identifiers
exactly. The copy-paste prompt body must be wrapped in `========` delimiters.

Run prompts must include `TARGET_ACTOR`, `TARGET_PROJECT`, `TARGET_REPO`,
`TARGET_APP_ROOT` when applicable, `TARGET_SESSION_NAME`, `READ_AND_EXECUTE`,
`RETURN_RESULT_TO`, `DO_NOT_EXECUTE_FROM_MEMORY`, and `DO_NOT_BROADEN_SCOPE`.
When a skill is required, include `REQUIRED_SKILL`.

Required skill prefixes are `/fable-builder` for Worker implementation,
`/fable-sentinel` for Sentinel independent review, and `/fable-debugger` for
general debugging. Do not use `shared-reasoning-core` as a launcher skill
prefix.

Handoff and run prompts must be committed and pushed to `foundation-docs` before
use unless Leo/GPT explicitly says not to publish.

Every handoff prompt must begin with a target header:

```text
TARGET_ACTOR: Worker | Sentinel | Service Reviewer | Worker-Rework | Sentinel-ReReview | Service-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: <advisor job path>
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session
```

For Korean-readable handoff prompts, also include:

```text
이 지시문을 붙여넣을 대상: <Worker/Sentinel/Service Reviewer>
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor
```

If Sentinel or Service Review finds issues, Advisor classifies them. Patchable
issues get a rework handoff prompt. Non-patchable or scope-changing issues go
back to Leo/GPT for decision.

## Role Result Storage

Worker, Sentinel, and Service Reviewer sessions must store long results under:

`../foundation-docs/runs/<target-project>/<job-id>/`

Standard result files:

- `WORKER_RESULT.md`
- `SENTINEL_REVIEW_RESULT.md`
- `SERVICE_REVIEW_RESULT.md`

Advisor job folders store pointer files only:

- `11_WORKER_RESULT_POINTER.md`
- `12_SENTINEL_RESULT_POINTER.md`
- `13_SERVICE_REVIEW_RESULT_POINTER.md`

Pointer files must include the result file path, commit hash, target project,
return target, and next actor. Role-session chat output should be a short
pointer only. Worker, Sentinel, and Service Reviewer may commit/push only
foundation-docs result files unless runtime repo commits are separately
approved. Runtime repo changes must not be committed before separate approval.

Advisor reads the pointer and result files directly before deciding the next
handoff, rework, or final audit. After Hermes is introduced, Hermes reads these
files to execute the next actor.

## Reviewer Selection

Advisor chooses the reviewer route after reading the Worker result and assessing
task risk. The core requirement is Sentinel role behavior, not a fixed model
name: independent, read-only review; distrust Worker reports; inspect diff,
tests, code, and evidence directly; no patch; no commit/push; no final approval;
return result to Advisor.

Available V2 routes:

- Fable5 Reviewer
- Dedicated SOL Reviewer fallback when Fable5 is unavailable
- Multi-reviewer route only when the approved mission requires it

Review levels:

- Level 1: docs/simple low-risk changes -> Advisor Level 1 audit unless independent review is explicitly required
- Level 2: normal runtime code/API/event wiring -> Fable5 implementation review
- Level 3: DB/schema/payment/order/safety/PII/security/Foundation contract/prod-live -> Fable5 and, when required, a separate dedicated SOL Reviewer

For every Sentinel routing decision, Advisor writes a `REVIEWER ROUTING DECISION`
with selected reviewer, target session, required skill, reason, rejected options,
review level, return target, and status.

## Final Response Routing

Every Advisor final response must include a `NEXT ACTION ROUTING` block. The
block tells Leo/GPT the next actor, target session, exact prompt file, required
Leo action, return path, wrong sessions, and readiness status.

If the next actor is Worker, the routing block must clearly say to paste the
short run prompt into a separate Worker session. Sentinel and Service Reviewer
routes must say when they are valid to use. If no role session should start, the
route must say `STOP` / `NEEDS_LEO_DECISION`.

When a short run prompt exists, `NEXT ACTION ROUTING` should point to the short
run prompt and prioritize showing that short launcher over the full handoff body.
For `READY_TO_USE` status, the final report should include the full short run
prompt inside `========` delimiters.

## Final Audit

The final audit compares:
- original Leo/GPT instruction
- Advisor brief
- Worker output
- Sentinel review findings
- Service review findings, when applicable

Allowed final audit verdicts:
- `PASS`
- `PASS_WITH_RISK`
- `FAIL`
- `NEEDS_LEO_DECISION`

Final approval remains with Leo + ChatGPT.
