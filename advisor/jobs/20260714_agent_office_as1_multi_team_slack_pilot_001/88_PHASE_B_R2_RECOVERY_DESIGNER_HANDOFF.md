# AS1 Phase B R2 Recovery Designer Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
PASS: `PHASE_B_R2_SOCKET_COMPATIBILITY_AND_STATUS_DESIGN_DELTA`
ASSIGNED_ACTOR: `agent-office-designer`
ROLE: `Agent Office Designer`
MODEL: `gpt-5.6-sol`
EFFORT: `max`
REQUIRED_SKILL: `NONE_AVAILABLE_FOR_THIS_BOUNDED_SECURITY_DESIGN`

## Dispatch profile record

- `TASK_COMPLEXITY`: narrow cross-layer Slack transport recovery
- `RISK_LEVEL`: high because the design gates live Slack input and exact tmux
  delivery
- `FAILURE_COST`: durable false acceptance, cross-boundary output, or another
  irreversible profile latch
- `REVERSIBILITY`: product patch is reversible; the original live state is
  intentionally immutable forensic evidence
- `CONTEXT_REQUIREMENT`: accepted Phase B contracts plus the exact live failure
  and load-bearing parser/outbound/lifecycle paths
- `SELECTED_MODEL`: `gpt-5.6-sol`
- `SELECTED_MODE`: code/design
- `SELECTED_EFFORT`: `max`
- `WHY_NOT_LOWER`: xhigh is not sufficient for this live security/state-machine
  delta because parser acceptance, durable status ordering, exact-delivery
  authority, and irreversible latch recovery interact
- `WHY_NOT_HIGHER`: no higher profile is required; the defect and scope are
  bounded and the existing architecture is preserved
- `ESCALATION_TRIGGER`: return `HOLD` if safe recovery requires resetting the
  original root, weakening identity/authority checks, or a new framework/schema

## Frozen coordinates

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- product recovery baseline:
  `64d15e34b50ec953fca5dc6c27c2c48703c6513f`
- frozen reviewed implementation source:
  `cca0cb5e2485c029b6d1715e37abf9bc55c548bd`
- governance branch: `advisor/as1-multi-team-slack-pilot-001`
- governance dispatch baseline:
  `400d7c6f5b81ea29371d3328d3b9276da7591db6`
- accepted independent Phase B review:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/85_PHASE_B_PATCH_6_INDEPENDENT_EVIDENCE_DELTA_REVIEW_RESULT.md`
- owner/live preflight:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/86_PHASE_B_OWNER_SETUP_AND_LIVE_PREFLIGHT_GATE.md`
- prior no-event audit:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/87_PHASE_B_AGENT_OFFICE_NO_EVENT_EXPIRY_AUDIT.md`

## Founder recovery authority

Leo approved a versioned fixed-root recovery. The original root must remain
permanently preserved as read-only forensic evidence:

`/home/leo/.local/state/agent-office/as1-slack-pilot`

The only new live root is:

`/home/leo/.local/state/agent-office/as1-slack-pilot-r2`

The original root must never be reset, deleted, repaired, copied into the new
root, selected by fallback, or reused for live operation.

## Observed live incident

The second Agent Office receive attempt passed the committed grant, secret,
workspace, App, channel, Leo identity, and Socket hello gates. At
`2026-07-17T03:40:08.755Z`, immediately after Leo posted the bounded top-level
message, the profile durably latched with the redacted reason
`malformed frame after ready`.

No immutable receipt, Mission intake, pointer-delivery grant, lease,
capability, exact tmux mutation, Advisor ACK, or Slack status/result was
created. The owner was stopped cleanly, the descriptor was restored disabled,
the writer lock is absent, and no AS1 process remains.

The raw Slack frame was intentionally neither logged nor persisted. The defect
classification is the Founder-approved Slack rich-text parser compatibility
defect. Current load-bearing evidence is that the shared structural bound is
eight levels while a normal Slack rich-text message event may reach a deeper
bounded `blocks/elements` structure. Do not add raw-frame logging to prove it.

## Exact design objective

Produce the smallest implementable design delta for exactly three concerns:

1. **Socket rich-text compatibility.** Accept the documented, bounded Slack
   Socket Mode message shape needed for an ordinary rich-text top-level Leo
   message while preserving the 32 KiB raw-frame limit, exact outer-envelope
   validation, bounded arrays/strings, identity checks, fail-closed malformed
   handling, and no raw-frame logging. Do not raise a shared JSON bound for
   unrelated contracts unless direct code evidence proves that is the only
   safe option. Specify the exact accepted maximum and a one-level-over reject
   test.
2. **Versioned fixed state root.** Bind all active owner, lock, marker, status,
   and recovery checks to the exact `r2` path and an unambiguous fixed root ID.
   Eliminate every active fallback to the original root. Specify an operator
   preservation step that makes the original tree operationally read-only
   without deleting or rewriting any evidence, plus proof that no process or
   lock is active before preservation.
3. **Minimal same-thread user status contract.** Add only these exact Korean
   messages, with deterministic idempotent ordering and a validated safe reply
   target:

   - after identity validation and durable acceptance:
     `요청 접수 완료 · Advisor에게 전달 중`
   - only after exact tmux delivery and recorded server Advisor ACK:
     `메시지 전달 완료 · 답변 대기 중`
   - delivery failure before Advisor ACK:
     `전달 실패 · 요청은 실행되지 않았습니다`
   - processing failure after delivery:
     `처리 실패 · 안전하게 중지되었습니다`

No status may be sent before workspace, App, channel, Leo user, message surface,
and root-thread reply target are validated. Statuses must never include raw
logs, payloads, secrets, stack traces, session IDs, internal paths, or dynamic
failure prose. Retries/replay must not duplicate or reorder a status. Exactly
one applicable failure status may follow the accepted status, and a delivery
failure must never claim that execution occurred.

## Required design decisions

The design delta must state:

1. exact parser entry point and why the new limit is sufficient but bounded;
2. exact outer-envelope and message-event fixtures used for accept/reject tests;
3. whether the general JSON contract remains at depth eight and, if not, why a
   local parser boundary cannot be used;
4. exact `r2` path and root-ID invariants across CLI and owner lock;
5. exact original-root read-only preservation and verification commands, with
   no deletion, reset, copy-forward, or mutation of evidence bytes;
6. status lifecycle/state table tied to durable intake, terminal tmux delivery,
   accepted Advisor ACK evidence, and pre/post-delivery failure;
7. deterministic status identity, replay/dedupe behavior, and same-thread
   binding;
8. fail-closed behavior when a status post itself fails, without inventing a
   successful delivery or weakening the profile latch;
9. smallest exact implementation allowlist and focused tests;
10. rollback to disabled configuration while retaining both the original
    forensic root and the new `r2` evidence;
11. confirmation that no database, Registry/schema, framework, systemd, UI,
    VibeNews, other product project, or simultaneous two-profile operation is
    introduced.

If the exact status contract cannot fit the existing durable outbox/evidence
model without broad authority redesign, return `HOLD` with the concrete reason.
Do not invent a generic notification framework.

## Required entry reads

Read the product worktree's `AGENTS.md`, `CLAUDE.md`,
`docs/agent/TEAM_OPERATING_MODEL.md`, `docs/agent/roles/designer.md`, the
accepted Phase B design/security/setup documents, and only the load-bearing
source/tests for:

- `src/adapters/gateways/slack-pilot/socket-frame.ts`
- `src/adapters/gateways/slack-pilot/socket-client.ts`
- `src/application/slack-pilot/contracts.ts`
- current inbound/outbound/evidence status paths
- `src/runtime/as1-slack-pilot/cli.ts`
- `src/persistence/file-store/writer-lock.ts`
- their focused AS1 tests

Read the governance evidence named above directly. Historical summaries are
evidence, not current authority.

## Allowed Designer files

Create exactly:

- `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_DESIGNER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_DESIGNER_RESULT_POINTER.txt`

Do not modify runtime source, tests, package files, configuration, secrets,
existing accepted Phase A/B evidence, or any external project.

## Validation and result contract

Use delta-only document and Git checks. Do not connect to Slack, initialize
`r2`, inspect secret values, alter the original root, send tmux input to another
Actor, run product suites, or self-review.

Record actual files inspected, exact proposed implementation paths, exact
focused commands, unresolved unknowns, rollback, and implementation readiness.
Stage only the three allowed paths, inspect the staged diff, commit once,
non-force push the authorized branch, verify clean/upstream-equal, return the
exact commit and pointer to `agent-office-advisor`, then STOP.
