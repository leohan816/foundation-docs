# Advisor SDK Identity Design Delta Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Designer

TARGET_SESSION: `agent-office-designer`

MODE: `SECURITY_TRANSPORT_DESIGN_DELTA_ONLY`

MODEL_EFFORT: `GPT-5.6 SOL / max` (verify directly before work)

## 1. Exact reason for this delta

The independent implementation review returned `NEEDS_PATCH`. During the same
Worker patch loop, pinned `@slack/socket-mode@3.0.0` source inspection proved
that its public callback surface consumes raw Socket `hello`, emits only the
`apps.connections.open` response on `connected`, and does not expose
`hello.connection_info.app_id`. The Worker correctly stopped after the Advisor
rejected a non-equivalent first-callback `api_app_id` substitution.

A swapped app-level token must never allow a profile to receive or parse another
Team's event content before the fixed App identity is proven. The approved
pre-event, fail-closed credential-pair boundary remains mandatory unless an
independently reviewed design delta proves an exactly equivalent or stronger
boundary. Do not weaken it to post-event rejection.

Immutable inputs:

- frozen design commit:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- rejected source candidate:
  `aac3e515ca05b89545688f84a4c17e4be12fa29d`
- independent implementation review result commit:
  `3100a717418d8a4dc17d0114aaa3daa8b14ac083`
- review result SHA256:
  `c06bbad3ce948829b6e192b30f07f2144e57efec9fa441e21b87580e4dcccf6b`
- exact Worker patch handoff commit:
  `a61207fb81de2fe21f5519348bffbceab51782fe`

Read the full `B01` finding and the approved design/security startup identity
sections directly. Inspect the pinned package's public root exports, type
declarations, runtime event behavior, and linked official Slack protocol docs.
Do not rely on summaries or package internals as authority; package internals
may be used only to prove why an option is unsupported or unstable.

## 2. Isolated coordinates

Work only in:

`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001_SDK_DESIGN_DELTA`

Branch:

`design/as1-sdk-pre-event-identity-delta-001`

Exact clean starting HEAD:

`16e3720318239e1466f16a526e23819ba1bd0702`

The implementation worktree is intentionally dirty with six preserved,
uncommitted Worker files. Do not enter, read as design authority, modify, stage,
clean, reset, or commit that worktree. Do not contact or direct the Worker.

## 3. Required design question

Determine whether one of the two fixed Slack app profiles can prove, before any
Team event body is delivered to AS1 application code, that all of the following
belong to the same fixed profile:

- owner-configured App ID;
- app-level token used for Socket Mode;
- bot token verified by `auth.test` and `bots.info`;
- workspace ID;
- immutable channel ID;
- fixed Advisor profile.

The solution must preserve:

- two separately authenticated clients and physically isolated profile state;
- no credential swapping or cross-Team fallback;
- no event-content parse/dispatch before App identity proof;
- exact 32-KiB/depth/array bounds before JSON is trusted;
- redacted logging before any SDK/provider debug path;
- manual ACK only after durable receipt/decision;
- all provider/SDK retry disabled unless the reviewed AS1 state machine performs
  an explicitly safe retry;
- public package-root or platform APIs only;
- strict TypeScript 6.0.3, `skipLibCheck:false`;
- fakeable, deterministic, no-network Phase A tests;
- default disconnected state and no new authority.

## 4. Options that must be evaluated, not assumed

Evaluate and classify at least:

1. documented/public `@slack/socket-mode@3.0.0` events and state payloads;
2. EventEmitter hooks such as `ws_message`, including whether the event name and
   ordering are actually public/supported and whether SDK parsing/logging occurs
   before the hook;
3. a public-root or officially supported SDK hook that exposes raw `hello`
   before application events;
4. a bounded adapter built from official `apps.connections.open` plus a Node 24
   platform WebSocket, including retry, redaction, TLS, close/reconnect, ACK,
   frame-size, binary-frame, and dependency implications;
5. any official Slack API that can bind an `xapp` token to immutable App ID
   before opening or accepting events;
6. process/profile isolation as defense in depth, while explicitly determining
   whether it can ever replace token-to-App proof (default answer: no unless
   proven);
7. dependency pin change or replacement, with exact security and review cost.

Do not select an undocumented/private/deep API merely because the current pinned
implementation exposes it. Do not treat a version pin as converting an internal
event into a supported public contract. Do not use a real token, create an app,
connect Slack, or test a live workspace.

## 5. Required output and decision classes

Create exactly one canonical delta package:

`docs/integration/AGENT_OFFICE_AS1_SOCKET_IDENTITY_DESIGN_DELTA.md`

It must contain:

- exact SDK/platform evidence and public/private classification;
- a threat trace for swapped app token before first event;
- option matrix with security equivalence, API support, implementation impact,
  testability, rollback, and residual unknowns;
- one recommended exact contract, only if it preserves or strengthens every
  mandatory boundary;
- exact source/test/file-scope delta and acceptance tests;
- package/dependency impact;
- migration/rollback plan;
- explicit interaction with `B01` and whether `B02`-`B09` remain unchanged;
- one of these terminal design decisions:
  - `SAFE_NARROW_DELTA_READY_FOR_REVIEW`
  - `MATERIAL_SECURITY_MODEL_REDIRECT_REQUIRED`
  - `NO_SUPPORTED_PRE_EVENT_IDENTITY_PATH`

If recommending a raw WebSocket adapter, specify a complete bounded state
machine from `apps.connections.open` response through raw `hello` validation to
event acceptance, including all limits, retries, logging, timeouts, close paths,
and how no event body can reach application code first. Do not hand-wave the
protocol surface.

Also create protocol evidence:

- `artifacts/as1-multi-team-slack-pilot/DESIGNER_SDK_IDENTITY_DELTA_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/DESIGNER_SDK_IDENTITY_DELTA_RESULT_POINTER.txt`

Commit package, result, and pointer in protocol order and non-force push only
this design branch. Return the pointer to `agent-office-advisor` and STOP.

## 6. Prohibitions and timebox

Do not modify runtime source, tests, package files, existing reviewed design
files, setup/as-built docs, registry, Exact Delivery v2, or the Worker branch.
Do not implement, self-review, accept risk, activate Slack, perform owner setup,
or start another mission.

Target: 45-75 minutes. Hard stop: 120 minutes. If no supported pre-event path is
proved, return the exact blocker rather than expanding scope.
