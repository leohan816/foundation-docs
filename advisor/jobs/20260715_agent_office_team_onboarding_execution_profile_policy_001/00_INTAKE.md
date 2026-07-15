# Advisor Intake

MISSION_ID: `AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`

INSTRUCTION_VERDICT: `PROCEED_WITH_LIMITS`

## Accepted intent

Build one canonical Agent Office onboarding and execution-profile system so a
responsible Advisor can onboard every registered Team actor from one Leo
instruction, validate actual understanding, record protocol readiness, and
aggregate `TEAM_READY` without Leo restating the operating routine.

## Approved limits

1. Start from exact product baseline
   `50124a1ea720e162e906c04c6f6fb2591c4974b8` in a new isolated worktree.
2. Keep AS1 candidate `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
   and every AS1 governance artifact unchanged.
3. Extend the existing Organization Registry only as narrowly as required for
   actor-specific execution capabilities. Do not create another Registry.
4. Store `PROTOCOL_READY` and `TEAM_READY` as immutable evidence/projection
   state joined through `roleInstanceId`, never as mutable static registry facts.
5. A Leo-nominated Actor must first receive a reviewed registry commit and
   remains non-dispatchable until onboarding passes.
6. Define the project entry-pointer contract centrally. Do not modify
   FOUNDATION, SIASIU, Cosmile, VibeNews, or their product code/docs here.
7. Build artifact-backed onboarding only. Do not create or activate a new tmux
   transport, Slack path, secret path, public service, DB, or runtime deployment.
8. Do not touch the canonical checkout's unrelated `.grok/`, `grok-max`,
   `grokx`, or `grokx-max` paths.

## Current evidence

- common role authority already exists under `docs/agent/`;
- the existing Organization Registry is
  `src/application/organization/registry.ts` with type authority in
  `src/application/organization/types.ts`;
- `roleInstanceId` is the immutable evidence join key and `actorId` is the
  current routable identity;
- current allowed model/effort metadata is shared globally across rows and is
  not sufficient evidence of actor-specific model, mode, effort, or skill
  support;
- no current `PROTOCOL_READY` or `TEAM_READY` evidence contract exists;
- Team roles are already optional in data: missing Control must not block a Team;
- the existing project root pointer pattern and role docs must be reused, not
  copied into projects.

## Safe interpretation

- protocol readiness is a separate accepted-evidence stream and deterministic
  projection, not inferred from session names, terminal prose, timestamps, or
  static membership;
- Team actors are selected only from accepted registry rows matching the
  responsible Advisor Team;
- capability selection considers only profile values explicitly declared for
  that Actor and fails closed when required capability evidence is absent;
- one-instruction onboarding may generate committed handoffs and evidence but
  this mission does not activate transport to deliver them automatically.

## Material stop conditions

- existing identity/evidence joins cannot be preserved;
- implementation requires a second registry or governance truth;
- the approved baseline must change;
- AS1 or another project must be modified;
- a new authority/risk decision is required.
