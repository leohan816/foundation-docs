# AS1 Phase B Independent Design Delta Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

TARGET_SESSION: `agent-office-reviewer`

REVIEW_CLASS: `PRIVATE_LEO_ONLY_LIVE_SECURITY_TRANSPORT_DESIGN_DELTA`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

SELECTED_MODEL: `GPT-5.6 SOL`

SELECTED_MODE: `Sentinel`

SELECTED_EFFORT: `max`

WHY_NOT_LOWER: The delta closes five HIGH findings at the exact live-delivery
boundary. Missing one residual ambiguity could authorize a wrong tmux side
effect or make incident stop unsafe.

WHY_NOT_HIGHER: The patch is confined to the same three design documents and
the same 14 implementation paths. `max` is sufficient for the exact F01-F05
delta review; no broader architecture decision is authorized.

ESCALATION_TRIGGER: Any residual HIGH finding, schema/authority redesign,
implementation map above 14 paths, or risk that cannot be removed by the same
bounded Designer patch loop.

## Exact candidate

- Read-only product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact Phase A base: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- Previously reviewed design: `3d359639c4d819f1c601481245daa81d5de9d5fc`
- Exact patched design candidate:
  `7ed79bbfd7deea0f8458a3965734ebd1de98eb35`
- Original independent `NEEDS_PATCH` result governance commit: `b84393e`
- Designer patch authority governance commit:
  `ab0e4123a4faeb3e3abc7472542d2a2e92389435`
- Candidate is clean, pushed, upstream-equal, and directly descends from the
  reviewed design.
- The exact delta is three modified design artifacts and no source, test,
  configuration, package, or live-state path.

Exact artifacts and SHA256:

1. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md`
   - `339b31114e7c11ed43817b6d373ebf793cb1a76a8926363bf1d70c7fb029e6e4`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT.md`
   - `e97b40b62050fcc73a5e5989b4d57a75b4d9b601e843735cf8198c4b9e9aa1ae`
3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT_POINTER.txt`
   - `13fc5bbdd823babfdaafe0c787faea44b923d8fb502f6ad549179f6e7519901b`

Do not trust the Designer disposition. Read the complete original F01-F05
result, exact patch diff, patched design, and only the load-bearing Phase A
contracts needed to determine closure.

## Required delta review

### F01 — frozen authority versus live control

Verify the receive grant's frozen control/latch hashes remain byte-for-byte
unchanged through delivery and evidence, while a separate construction-bound
live predicate gates grant acceptance and every delivery side effect. Confirm
there is no new durable field/schema and that a focused distinct-frozen/live
test is specified without weakening existing evidence equality.

### F02 — exact pointer bytes

Verify the design proves no-follow regular-file, owner/mode, size, grammar,
correlation, and raw-byte hash checks before commitment; pins the accepted
bytes; loads only those bytes over closed stdin/private buffer; never reopens
the path; and leaves zero tmux mutation, no `PREPARED`, and unconsumed authority
for all pre-commit failures and replacement races.

### F03 — complete destination/profile binding

Verify selected-profile session/workspace/command binding and an exact-key
decoder for every security-relevant live destination fact in both fresh
preflights. Wrong profile, omitted/additional field, stale lease, and any
between-preflight divergence must reject before `PREPARED`, authority
consumption, or tmux mutation. Confirm the implementation map remains exactly
14 paths and does not require an undeclared load-bearing path.

### F04 — executable incident kill

Verify one zero-operand closed incident-kill action, fixed signal, exact owner
proof, durable global kill before further side effects, stable redacted result,
and bounded shutdown. Clean stop must remain distinct; neither path may clear
or reset durable state; no generic signal/reset/operator command may exist.

### F05 — PID ownership

Verify both fixed signal paths bind the unchanged writer-lock v1 record to OS
process birth, executable identity, UID, boot, and exact entry, followed by an
immediate second lock/process observation. Missing, raced, reused, or ambiguous
ownership must signal no process. Confirm the lifecycle tests cover exact owner,
PID reuse, exit/reuse race, wrong executable/UID/boot, and missing birth facts.

## Scope and private-pilot locks

Also verify the active design still authorizes only:

- one configured workspace and Leo-only input;
- two fixed Apps/channels/advisor profiles;
- one profile active at a time;
- foreground manual start/stop;
- exactly one root-to-result round trip per channel, sequentially;
- no DB/Registry/schema, framework, systemd, UI, VibeNews, external product
  change, simultaneous profile operation, or broad enterprise tests.

## Verdict contract

Return exactly one:

- `PASS`
- `NEEDS_PATCH`
- `PASS_WITH_RISK`
- `FAIL`

`NEEDS_PATCH` returns to the same Designer. `PASS_WITH_RISK`, `FAIL`, a material
security/authority redesign, or an implementation map above 14 paths is a
Founder stop. Do not accept or hide residual risk.

## Output and prohibitions

Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/52_PHASE_B_DESIGN_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/52_PHASE_B_DESIGN_DELTA_REVIEW_RESULT_POINTER.md`

Write those files in the named governance worktree. Do not stage, commit, or
push; the Advisor will verify and persist the exact output. Do not patch or
implement, access secrets, connect Slack, send tmux input, accept risk, or grant
final approval. Return the exact verdict and paths to `agent-office-advisor`,
then STOP.
