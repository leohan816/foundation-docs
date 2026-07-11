# Fable5 Dual Review Handoff - Agent Office LocalBootstrap Gate

TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: existing independent `reviewer-fable5` session only
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate`
DO_NOT_PASTE_INTO: Advisor or Worker session
RETURN_RESULT_TO: Advisor

Use `/fable-sentinel` at Fable5 Max. Read actual files and Git evidence. Do not
trust Worker or Advisor summaries until independently reproduced.

Perform two separate Level-3 passes with separate artifacts and verdicts:

1. `DESIGN_REVIEW__AGENT_OFFICE_LOCALBOOTSTRAP_DELTA`
2. `IMPLEMENTATION_SECURITY_REVIEW__AGENT_OFFICE_LOCALBOOTSTRAP`

## Required Reads

- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/03_FABLE5_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/12_ADVISOR_WORKER_VALIDATION.md`
- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_localbootstrap_private_run_gate/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/11_WORKER_RESULT_POINTER.md`
- Agent Office repository instructions, actual full diff
  `abff45c9925962be29be535685e3efbccd587528..9c403da5662aeedc28a8c677c37a134aaa44dce3`,
  current source, tests, screenshots, README, seven canonical documents, and
  `docs/operations/LOCAL_BOOTSTRAP_PRIVATE_RUN_PREPARATION.md`.

## Mandatory Design Review

Verify that the canonical documents and runbook accurately describe the actual
implementation without weakening M01 authority, inventing a private-run result,
or authorizing real delivery. Classify divergences as `CODE_DEFECT`,
`DESIGN_DEFECT`, `DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or
`NEEDS_LEO_GPT_DECISION`.

Explicitly inspect the apparent UI combination of a historical `READ ONLY`
presentation label with `LOCAL_BOOTSTRAP_ENABLED` and decide whether it is
accurate, ambiguous, or defective.

## Mandatory Implementation/Security Review

Directly verify:

- entropy, verifier-only retained state, expiry, single use, replay/restart,
  removal, and owner/no-follow/regular/bounded file behavior;
- trusted config selection and rejection of group/other writable modes;
- no credential in Git, logs, audit, stdout/stderr, argv, URL/query, env,
  browser storage, PWA cache, state/artifacts, screenshots, or result files;
- exact loopback/Host/Origin/Fetch Metadata/CSRF/rate/body limits;
- secure cookie, fixed capabilities, rotation, expiry, logout, revocation, and
  SSE close;
- actual canonical manifest projection, no fixture fallback, and fail-closed
  startup before proof creation/listener bind;
- no usable Advisor gateway capability or delivery port in LocalBootstrap;
- desktop/mobile/PWA/reduced-motion behavior, recovery, and testability;
- source/test/doc commit scope, upstream state, and absence of an active server
  or real credential after review.

Re-run the focused security/composition tests and enough full/e2e checks to
support the verdict. Inspect all three composed screenshots directly.

## Prohibitions

- Read-only review of Agent Office. Do not patch it.
- Do not create/read a real proof, credential, operational config, or state root.
- Do not start the real private run or send tmux input.
- No DB, secret, public/Tailscale/remote/prod/live/Hermes scope.
- No new session, agent, sub-agent, or temporary delegated context.
- Do not grant final approval.

## Result Contract

Write and push exactly:

- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_localbootstrap_private_run_gate/FABLE5_LOCALBOOTSTRAP_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_localbootstrap_private_run_gate/FABLE5_LOCALBOOTSTRAP_IMPLEMENTATION_SECURITY_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/14_FABLE5_DUAL_REVIEW_RESULT_POINTER.md`

Each pass must independently use one verdict: `PASS`, `PASS_WITH_RISK`,
`NEEDS_PATCH`, or `FAIL`.

`PASS_WITH_RISK` returns to Leo/GPT without activation. `NEEDS_PATCH` returns to
Advisor for the same Worker/same Reviewer loop. `PASS` activates nothing by
itself. Terminal output and POINTER BLOCK must be ASCII-only. Return to Advisor
and STOP.
