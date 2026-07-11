# Intake - Agent Office M01 LocalBootstrap Private-Run Gate

- Mission ID: `AGENT_OFFICE_M01_LOCALBOOTSTRAP_PRIVATE_RUN_GATE`
- Parent mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Decision request: `AO-WU-14-PRIVATE-RUN-AUTH-POSTURE`
- Leo/GPT decision: `OPTION_B__KEEP_M01_OPEN_AND_AUTHORIZE_SEPARATE_LOCALBOOTSTRAP_PRIVATE_RUN_GATE`
- Risk level: Level 3 security/authentication/secret-handling
- Date: 2026-07-11
- Entry verdict: `PROCEED_WITH_LIMITS`

## Authorized

- LocalBootstrap authentication implementation only;
- loopback-only private access;
- owner-only credential creation and injection;
- actual latest canonical manifest projection;
- desktop, mobile, PWA, login, logout, restart, expiry/revocation, and recovery evidence;
- independent Fable5 implementation/security review;
- final Advisor private-run audit after review.

## Not authorized

- public, Tailscale, remote-host, production, or live exposure;
- database or Hermes implementation;
- browser dispatch to Worker/Reviewer or arbitrary terminal execution;
- real Agent Office-to-Advisor tmux delivery activation;
- committed credentials or credential values in Git, logs, artifacts, terminal summaries, or chat.

## Entry evidence

- Agent Office branch `shadow/agent-office-m01` is clean at
  `abff45c9925962be29be535685e3efbccd587528` and equals upstream.
- Existing Worker session is `agent-office/$13/%13`, workspace
  `/home/leo/Project/agent-office`, Codex 5.6 Sol Ultra, idle.
- Existing independent Reviewer is `reviewer-fable5/$5/%5`, Fable5 Max, prior
  review complete.
- General Advisor tmux transport is active; no parallel Agent Office or
  foundation-docs writer is authorized.
- The temporary synthetic demo server was stopped before this mission.
