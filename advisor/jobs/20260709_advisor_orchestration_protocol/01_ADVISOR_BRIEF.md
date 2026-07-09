# 01 Advisor Brief - Advisor Orchestration Protocol Patch

## Verdict

`ADVISOR_ORCHESTRATION_PROTOCOL_READY`

## Instruction Validation

Decision: `PROCEED_WITH_LIMITS`

Limits:

- This patch updates Advisor operating rules and Advisor artifacts only.
- Runtime repositories remain read-only.
- V3-11C2 implementation is still pending and must happen in a separate Worker session.
- Final V3-11C2 audit is not allowed until Worker, Sentinel, and required Service Review results are returned to Advisor.

## Executive Summary

Advisor operating rules now define Advisor as the manual orchestration controller for Leo/GPT. Advisor receives high-level instructions, validates them against repository reality, writes role briefs and copy-paste-ready handoff prompts, receives role-session results, manages rework loops, and writes final audit only after all required implementation and review evidence exists.

The protocol preserves role separation:

- Leo/GPT remains the only final approver.
- Advisor validates, briefs, orchestrates, compares, and audits.
- Worker implements only from approved handoff prompts.
- Sentinel reviews independently and read-only.
- Service Reviewer reviews service semantics independently and read-only when required.

## Files Checked

- `./AGENTS.md`
- `./README.md`
- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/03_SENTINEL_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/04_SERVICE_REVIEW_BRIEF.md`

## Files Updated

Local Advisor cockpit:

- `./AGENTS.md`
- `./README.md`

Foundation-docs Advisor mirror and artifacts:

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260709_advisor_orchestration_protocol/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_advisor_orchestration_protocol/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_advisor_orchestration_protocol/index.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md`

## Protocol Encoded

Advisor must now follow this orchestration loop:

1. Receive Leo/GPT instruction.
2. Validate the instruction against repository state and source-of-truth hierarchy.
3. Stop and ask Leo/GPT if the instruction is incomplete, unsafe, conflicting, or outside approved scope.
4. If approved, write Advisor and role briefs.
5. Write copy-paste-ready handoff prompts for the required role sessions.
6. Ensure handoff prompts are visible in foundation-docs and published before Leo/GPT uses them, unless Leo/GPT explicitly says not to commit or push.
7. Leo/GPT manually pastes the handoff prompt into a separate Worker, Sentinel, or Service Reviewer session.
8. Results from role sessions return to Advisor.
9. Advisor compares results against the original instruction, Advisor brief, role briefs, actual code diff, tests, and evidence.
10. If Sentinel or Service Review finds issues, Advisor classifies the issue and does not proceed to final audit.
11. If the issue is patchable within approved scope, Advisor writes a `REWORK_HANDOFF_PROMPT` and updates loop state. After rework, Advisor writes or updates the relevant re-review handoff.
12. Repeat until `PASS`, `PASS_WITH_ACCEPTED_RISK`, or STOP for Leo/GPT decision.

## Artifact Convention Added

Implementation jobs may include:

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- `04_SERVICE_REVIEW_BRIEF.md`
- `05_FINAL_AUDIT.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `07_SENTINEL_HANDOFF_PROMPT.md`
- `08_SERVICE_REVIEW_HANDOFF_PROMPT.md`
- `09_REWORK_HANDOFF_PROMPT.md`
- `10_LOOP_STATE.md`
- `index.md`

Conventions:

- Brief files define standards, scope, tests, evidence expectations, and review criteria.
- Handoff prompt files are the actual prompts Leo/GPT pastes into role-specific sessions.
- Loop state records current status, completed actors, blocking findings, rework attempts, and the next required actor.

## Patch Loop Rule

If Sentinel or Service Review finds issues:

- Advisor must not write final audit yet.
- Advisor must classify the issue as patchable within approved scope, needing Leo/GPT decision, or failing the approved scope.
- For patchable issues, Advisor writes `09_REWORK_HANDOFF_PROMPT.md`.
- After Worker rework, Advisor writes or updates the Sentinel and Service re-review handoff as needed.
- The loop continues until the required review verdicts are acceptable or Advisor stops for Leo/GPT decision.

## V3-11C2 Handoff Delta

Because an approved V3-11C2 Worker brief already exists, this job added:

- `06_WORKER_HANDOFF_PROMPT.md`
- `10_LOOP_STATE.md`

Current V3-11C2 loop state:

- status: `HANDOFF_READY`
- next actor: `Worker`
- Worker result: pending
- Sentinel review: pending
- Service review: pending
- final audit: blocked until Worker result and required reviews return

## Scope Check

No runtime implementation was performed. No Worker, Sentinel, or Service Reviewer role was executed. The V3-11C2 handoff prompt only packages the existing approved Worker brief into a prompt Leo/GPT can manually paste into a separate Worker session.

## What Should Not Be Done Next

- Do not implement V3-11C2 inside Advisor.
- Do not paste the Worker prompt into the Advisor session.
- Do not create final audit before Worker and Reviewer results are returned.
- Do not treat the handoff prompt as final approval.

## Recommended Next Step

Leo/GPT should inspect the committed V3-11C2 Worker handoff prompt and paste it into a separate Worker session.
