# SDK Identity Design Delta Independent Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

TARGET_SESSION: `agent-office-reviewer`

REVIEW_CLASS: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_DELTA`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

MODEL_EFFORT: `GPT-5.6 SOL / max`

EFFORT_RATIONALE: This delta selects a new security-critical WebSocket
dependency and defines the pre-event credential-pair boundary. `max` is
proportionate. No risk acceptance is delegated.

## Exact candidate

- Read-only target worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001_SDK_DESIGN_DELTA`
- Branch: `design/as1-sdk-pre-event-identity-delta-001`
- Start base: `16e3720318239e1466f16a526e23819ba1bd0702`
- Design package commit: `f18ba7fa32917df544fc562b7778c0ab97e238ce`
- Designer result commit: `d3984e7aae39018a0f8707511dc166c6ae204fe0`
- Frozen reviewed head: `c5140fcf6ba4a626bd9c28f02f6bc8afae54b41e`
- Canonical delta:
  `docs/integration/AGENT_OFFICE_AS1_SOCKET_IDENTITY_DESIGN_DELTA.md`
- Delta SHA256:
  `104c4044aee518e8a536ead6b4a2f11638554850b48d8c7c4014f7820d460742`
- Durable Designer result:
  `artifacts/as1-multi-team-slack-pilot/DESIGNER_SDK_IDENTITY_DELTA_RESULT.md`
- Designer result SHA256:
  `883c7d368f469eff11c21d8f3b978d7e609d340209cfacec7066db0a8075f0ce`

Read the original `B01` finding at governance commit
`3100a717418d8a4dc17d0114aaa3daa8b14ac083`, the frozen design at
`81a8c3474380a7e427516d6f5e57c97ad88c6c9b`, the exact Designer handoff at
governance commit `f9d6ad1a0a7ce3b7a5f9bfb71bf043bdbad7c13c`, and the actual
three-file candidate delta. Do not trust the Designer summary as evidence.

## Required review order

1. Inspect the actual full design delta and commit/file provenance.
2. Independently verify public, supported contracts for:
   - Slack Socket Mode `apps.connections.open`, raw `hello`, manual ACK, and
     disconnect behavior;
   - `@slack/web-api@8.0.0` public-root controls used by the design;
   - exact `ws@8.21.1` package-root constructor and receiver behavior;
   - exact `@types/ws@8.18.1` gap and the proposed strict structural extension.
3. Determine whether the selected design proves, before any Team event body is
   parsed or delivered, the exact fixed profile/App/token/workspace binding.
4. Determine whether all inbound memory is bounded before the application
   callback: payload 32,768 bytes, 64 buffered chunks, 64 fragments including
   empty fragments, compression disabled, redirects disabled, and one bounded
   startup/close lifecycle.
5. Verify that hostile first-frame/event, swapped token, wrong App, binary,
   oversized, fragmented, retry, disconnect, logging, and ACK traces fail
   closed without source-text exposure or implicit reconnect.
6. Verify dependency scope, exact pins/integrities, no optional native package,
   strict TypeScript compatibility, testability, lockfile/audit gates, and
   rollback.
7. Verify the nine-file B01 scope is implementable, does not silently repair or
   rewrite B02-B09, and does not activate Slack or change authority.
8. Classify whether replacing `@slack/socket-mode` with this bounded public-root
   transport is a narrow reviewed dependency delta or a material security-model
   redesign requiring Leo/GPT.

Use primary sources and exact published artifacts only for external contract
claims. Read-only network/package inspection is allowed. Do not install into,
modify, stage, or commit the target worktree.

## Mandatory questions

- Does `ws@8.21.1` actually expose and enforce `maxPayload`,
  `maxBufferedChunks`, and `maxFragments` before `message`, including empty
  fragments and compressed/fragmented paths?
- Can the proposed strict TypeScript bridge express the two newer options
  without `any`, casts, deep imports, or suppressions?
- Does the design prevent a swapped app-level token from exposing any Team
  event content before exact `hello.connection_info.app_id` equality?
- Are the URL, retry, logging, parser, ACK, and shutdown rules complete and
  mutually coherent?
- Do `auth.test` and `bots.info` remain supported for the exact fixed bot/App
  proof, and does the committed manifest provide only the needed scope?
- Is there any unrecorded residual that would require `PASS_WITH_RISK`?

## Verdict and output

Return exactly one verdict:

- `PASS`
- `NEEDS_PATCH`
- `PASS_WITH_RISK`
- `FAIL`

`PASS_WITH_RISK`, `FAIL`, or a material security-model redesign is a mandatory
Founder stop. Routine `NEEDS_PATCH` returns to the same Designer. Do not accept
or hide residual risk.

Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/24_SDK_IDENTITY_DESIGN_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/24_SDK_IDENTITY_DESIGN_DELTA_REVIEW_RESULT_POINTER.md`

Commit and non-force push only those result files on the checked-out governance
branch. Do not patch design, implement, access secrets, connect Slack, send
tmux input, dispatch another actor, accept risk, or grant final approval.
Return the exact verdict and pointer to `agent-office-advisor`, then STOP.

