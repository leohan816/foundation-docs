# Advisor Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

## Required train

```text
Advisor intake and exact Designer handoff
-> agent-office-designer design + Setup Pack
-> same independent agent-office-reviewer DESIGN_REVIEW
-> same Designer bounded patch and same Reviewer delta review if required
-> Advisor design audit and exact Worker handoff
-> agent-office-opus implementation with /fable-builder
-> Advisor candidate validation
-> same agent-office-reviewer IMPLEMENTATION_SECURITY_REVIEW
-> same Worker bounded patch and same Reviewer delta review if required
-> OWNER_SETUP_COMPLETE gate
-> fresh one-use Agent Office pilot
-> fresh separate one-use Foundation pilot
-> Advisor final audit
-> Leo/GPT
```

Control is excluded unless a reviewed design exposes a material unresolved
cross-contract conflict that cannot be resolved inside the approved additive
contract. No visual/product Designer work is requested.

## Security invariants

- Two separately authenticated Slack apps; no impersonation or display-name
  override.
- Exact workspace + Leo user + immutable channel ID + exact App profile checks.
- Strict secret-file parser at
  `/home/leo/.config/agent-office/as1-slack-pilot.env`; directory `0700`, file
  `0600`; never `source` or `eval`.
- Persist an accepted Socket Mode envelope before ACK. If durable persistence
  fails, do not ACK so Slack may retry.
- ACK means transport receipt only, never Mission creation or Advisor ACK.
- Top-level accepted Leo message -> one immutable `NEW_MISSION` intake.
- Leo reply in the same thread -> correlated `CLARIFICATION` or
  `DECISION_RESPONSE`; never a second Mission intake.
- Deferred query words are rejected or minimally audited and never create a
  Mission.
- Edits, deletes, hidden subtypes, bot/app messages, retries, echoed outbound
  messages, wrong users/workspaces/channels/apps, DMs, and App Home fail closed.
- Fixed closed profile mapping only. Slack content cannot supply Team, Actor,
  tmux locator, workspace, model, effort, command, or file path.
- Profile state is physically separated: lease/capability, consumption, journal,
  evidence ingress, dedupe, and failure latch.
- Each live pilot receives a fresh one-use authority bound to its profile,
  request/event identity, pointer hash, and exact reverified destination.
- No cross-Team fallback and no blind resend after ambiguous inbound, outbound,
  or tmux delivery state.
- Existing Exact Delivery v2 schemas, parser behavior, journals, and accepted
  historical evidence remain compatible and non-authoritative for the new
  Foundation profile.

## Phase boundaries

- Design phase may create only committed documentation, non-secret manifests,
  the exact-key environment template, and design evidence.
- Worker implementation starts only after independent design `PASS` and Advisor
  acceptance.
- Synthetic Phase A never reads real tokens or connects to Slack.
- Owner setup can proceed after the Setup Pack checkpoint, but live connection
  remains disabled until implementation and independent review both pass.
- The two real pilots are sequential and Advisor-only. No Worker or Reviewer is
  dispatched by a pilot message unless a later explicit mission authorizes it.

## Effort and skills

- Advisor: GPT-5.6 SOL max for Level 3 orchestration and audit.
- Designer: GPT-5.6 SOL max; exact role instructions; no implementation skill.
- Worker: Opus 4.8 Ultracode with `/fable-builder`.
- Reviewer: same independent GPT-5.6 SOL Sentinel at xhigh or max; max preferred
  for the final implementation/security review; `/fable-sentinel` required.

## Validation policy

Use focused contract, Slack boundary, exact-profile, persistence/replay,
redaction, kill-switch, shutdown, typecheck, changed-file lint, integration, and
diff checks. Do not run Living Office, visual, broad browser E2E, unrelated
product suites, or VibeNews validation.
