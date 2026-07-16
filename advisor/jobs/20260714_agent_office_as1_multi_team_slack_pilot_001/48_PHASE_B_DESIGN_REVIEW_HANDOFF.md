# AS1 Phase B Independent Design Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

TARGET_SESSION: `agent-office-reviewer`

REVIEW_CLASS: `PRIVATE_LEO_ONLY_LIVE_SECURITY_TRANSPORT_DESIGN`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

SELECTED_MODEL: `GPT-5.6 SOL`

SELECTED_MODE: `Sentinel`

SELECTED_EFFORT: `max`

WHY_NOT_LOWER: The candidate permits real Slack credentials and one-use exact
tmux delivery for two identities. A missed pre-gate event, profile crossing, or
authority reuse would be material even in a private pilot.

WHY_NOT_HIGHER: The candidate is a bounded three-document design over reviewed
Phase A contracts, with no schema, Registry, product-project, or public-system
change. `max` is sufficient; a higher profile would be disproportionate.

ESCALATION_TRIGGER: A material authority/security redesign, unresolved
identity/evidence conflict, or residual risk that cannot be removed within the
same narrow design.

## Exact candidate

- Read-only product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact Phase A base: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- Exact design candidate: `3d359639c4d819f1c601481245daa81d5de9d5fc`
- Candidate is clean, pushed, upstream-equal, and directly descended from the
  exact base.
- Design:
  `docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md`
- Design SHA256:
  `fb1241a76e11e2dba3501f020db86e876dfdd4536382c9a85c3f23734b86b829`
- Designer result:
  `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT.md`
- Designer result SHA256:
  `781899563ad465ff204a2eacd655ac16f70b772bdbcdc922e9281a28f213db60`
- Scope correction governance commit:
  `e070ee25b2f22635459bd8abf8841ab4f1925d0f`
- Private single-user lock governance commit:
  `b159f5c33d6b07468d98253db39807fd0f7d15f1`

Do not trust the Designer result as evidence. Inspect the exact commit, diff,
design, Phase A load-bearing source/contracts, and the two later scope locks
directly.

## Product objective

The only approved product is a private Leo-only pilot:

1. one configured Slack workspace and Leo as the sole accepted user;
2. two fixed Apps with immutable private-channel mappings;
3. exactly one fixed profile active at a time;
4. foreground manual start/stop, no automatic reconnect or live restart;
5. one Agent Office root-to-result round trip, stop/audit;
6. one Foundation root-to-result round trip, stop/audit.

## Required review order

1. Verify candidate provenance, three-path design-only diff, and no hidden
   source/config/package changes.
2. Determine whether the 14-path implementation map is the smallest coherent
   live delta. Reject retained paths without a concrete pilot need and reject
   omitted load-bearing security paths.
3. Verify the design composes existing Phase A modules rather than creating a
   second Mission, Registry, authority, storage, workflow, or transport model.
4. Verify fixed workspace/user/App/channel/profile identity and that no CLI,
   environment, Slack input, or fallback selects a destination or profile.
5. Verify Web identity and Socket `hello` remain quarantined until durable
   receive state is established and receive is armed exactly once, with no
   pre-arm parse, ACK, or Mission intake.
6. Verify fixed-path Git observation is read-only, bounded, non-fetching, exact
   to accepted commits/blobs, and fails closed on missing, dirty, divergent, or
   rewritten authority/evidence.
7. Verify post-intake delivery requires the exact reviewed grant, one-use lease,
   one-use capability, fresh destination proof, two matching preflights, closed
   tmux argv, and no blind resend or historical fallback.
8. Verify same-thread outbound can originate only from accepted immutable
   Advisor ACK/result evidence and cannot expose terminal buffers, prompts,
   tokens, raw logs, or arbitrary files.
9. Verify profile-contained roots and the common writer lock prevent simultaneous
   operation and cross-Team dedupe/journal/latch/grant/lease/capability/evidence
   reuse.
10. Verify foreground lifecycle, manual stop, bounded drain, lock release,
    redacted status, live-disabled restart, global kill, rollback, and terminal
    ambiguity handling are coherent and implementable.
11. Verify the focused tests are proportionate: enough to prove the actual two
    live paths, but no full suite, generic property framework, exhaustive
    enterprise matrix, or unrelated regression expansion.
12. Verify the missing `AS1_SLACK_STATE_ROOT` owner instruction and exact
    sequential live procedure are sufficient for direct operator use.

## Explicit absence audit

Return `NEEDS_PATCH` or worse if the active design retains or introduces any
unnecessary:

- framework, Registry/schema/database, authority redesign, systemd/permanent
  service, UI, admin plane, HA, VibeNews, FOUNDATION/SIASIU/Cosmile product
  change, simultaneous profiles, multi-user/multi-workspace rollout, or
  unrelated exhaustive tests.

## Verdict contract

Return exactly one:

- `PASS`
- `NEEDS_PATCH`
- `PASS_WITH_RISK`
- `FAIL`

`NEEDS_PATCH` returns to the same Designer. `PASS_WITH_RISK`, `FAIL`, or a
material security/authority redesign is a Founder stop. Do not accept or hide
residual risk.

## Output and prohibitions

Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/49_PHASE_B_DESIGN_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/49_PHASE_B_DESIGN_REVIEW_RESULT_POINTER.md`

Write those files in the named governance worktree. In accordance with the
canonical Reviewer role, do not stage, commit, or push; the Advisor will verify
and persist the exact output. Do not patch the candidate, implement, access
secrets, connect Slack, send tmux input, dispatch another actor, accept risk, or
grant final approval. Return the exact verdict and paths to
`agent-office-advisor`, then STOP.
