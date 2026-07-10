# Fable5 Dual Review Handoff

TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing independent Fable5 Reviewer session `dev`, never Advisor or author session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch
DO_NOT_PASTE_INTO: Advisor, Control, Worker, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Assignment

Perform two sequential, independent review passes over the actual protocol/config
patch. Use the same existing Fable5 Reviewer session, but create separate artifacts
and separate verdicts.

1. `DESIGN_REVIEW`
2. `IMPLEMENTATION_OR_CONFIG_REVIEW`

Model and effort: `<Fable5:Max>`

Required skill: `/fable-sentinel`

No sub-agent, delegated context, temporary session, or second reviewer session.

## Required Direct Reads

- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/02_PATCH_SCOPE_AND_COMMIT_REGISTER.md`
- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/03_ADVISOR_SELF_CHECK.md`
- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/04_FABLE5_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/05_LOCAL_ADVISOR_INSTRUCTION_EVIDENCE.md`
- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/06_PUBLICATION_VALIDATION.md`
- `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
- every file under `../foundation-docs/advisor/_system/tmux_transport/`
- actual local `/home/leo/Project/foundation-advisor/AGENTS.md`
- actual local `/home/leo/Project/foundation-advisor/CLAUDE.md`
- active role references for Control, Foundation, Cosmile, SIASIU, and Fable5

Read the actual Git diff from review base
`997e7855c30a15fed82e3cd38db7cee8e3582660` through current `origin/main`.
The load-bearing patch and routing commits are
`2f5f99da35e4509ff535fc2818d4665245a59ade` and
`0c22c713d1fe173f1e6f0b4349af855f45956b77`.
Do not trust Advisor summaries or hashes without recomputing them.

## Read-Only tmux Validation

You may inspect `tmux list-sessions`, `tmux list-panes`, window option metadata, and
captured pane output only to validate registry identity and role evidence.

You must not:

- send keys, paste buffers, or any input;
- create, rename, clear, interrupt, reset, or terminate a session/pane/process;
- create an agent, sub-agent, or delegated context;
- patch canonical, config, local Advisor, or runtime files;
- activate transport or disengage the kill switch;
- access DB, secret values, production, or live systems.

## DESIGN_REVIEW Coverage

Answer every item in `04_FABLE5_REVIEW_BRIEF.md`. Explicitly assess:

- whether transport remains routing/evidence only;
- whether activation is truly fail-closed;
- whether misdelivery, role drift, concurrency, branch collision, blindness,
  interaction, timeout, stall, result-trust, and rollback risks are controlled;
- whether manual fallback is always available;
- whether any authority or product mission is silently expanded.

## IMPLEMENTATION_OR_CONFIG_REVIEW Coverage

Directly verify:

- exact commits, files, diffs, hashes, and origin ancestry;
- activation state and kill-switch state;
- actual session registry against live metadata and role evidence;
- `synchronize-panes off`;
- exact file-based `load-buffer` plus bracketed `paste-buffer -p` design;
- no shell interpolation, broadcast, wildcard, or multi-pane path;
- active-dispatch ledger scan and same-repo/branch serialization;
- local Advisor instruction text and hashes;
- no runtime or unrelated dirty-file inclusion;
- no tmux input occurred in this mission;
- final activation template cannot activate by itself.

## Required Results

Write:

- `../foundation-docs/runs/shared/20260711_advisor_managed_existing_tmux_transport_protocol_patch/FABLE5_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/runs/shared/20260711_advisor_managed_existing_tmux_transport_protocol_patch/FABLE5_IMPLEMENTATION_CONFIG_REVIEW_RESULT.md`

Write pointers:

- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md`
- `../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/13_FABLE5_IMPLEMENTATION_CONFIG_REVIEW_RESULT_POINTER.md`

Each result must independently use one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Commit and push only the two result files and two pointers to foundation-docs.
Do not alter reviewed files. Terminal summary and pointer block must be ASCII-only.

If either pass is not `PASS`, session reload is forbidden. Return both results to
Advisor and STOP.

If both passes are `PASS`, return both pointers to Advisor and STOP. Do not reload
sessions and do not activate transport.
