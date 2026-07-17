# AS1 Phase B R2 Recovery F02 Designer Patch Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PHASE_B_R2_RECOVERY_F02_DESIGN_PATCH_D1_D6`

ADVISOR_DECISION: `ROUTE_BOUNDED_SAME_DESIGNER_PATCH`

## Authority and objective

The same independent Reviewer returned `NEEDS_PATCH` for the F02 design at
candidate `44eb5975eca2de1b8cc9abda2ab749d422d1e7a7`. Correct only findings
F02-D1 through F02-D6 in the existing design package. Preserve the accepted R2
and F01 architecture, the descriptor-disabled state, the fixed original and R2
roots, the one-way preservation algorithm, and every existing scope boundary.

Do not implement. A same-Reviewer delta `PASS` is required before any Worker
handoff.

## Actor and profile

- Actor/session: same `agent-office-designer`
- Role: bounded security/transport design correction
- Verified workspace: `/home/leo/Project/agent-office`
- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Patch base: `44eb5975eca2de1b8cc9abda2ab749d422d1e7a7`
- Runtime: GPT-5.6 SOL / max
- Responsible Advisor: `agent-office-advisor`

Profile record:

- SELECTED_MODEL: `gpt-5.6-sol`
- SELECTED_MODE: `design-only bounded patch`
- SELECTED_EFFORT: `max`
- REQUIRED_SKILL: active Agent Office Designer role protocol
- WHY_NOT_LOWER: the patch must close pre-execution trust, Linux capability
  reduction, immutable-filesystem and anti-retry guarantees without creating a
  second production mode.
- WHY_NOT_HIGHER: the Reviewer supplied six exact bounded findings and accepted
  the core traversal/sealing algorithm; max is sufficient for this delta.
- ESCALATION_TRIGGER: closure requires a new framework, dynamic root selector,
  package/config path, schema/Registry change, or material authority redesign.

## Required reads

Read directly:

1. the existing design and Designer result at patch base `44eb597...`;
2. committed Reviewer result and pointer in governance commit
   `7b0bdb43f2fcd00f1aceba6f9c1a23c5a2ea5132`;
3. only the load-bearing source/setup/test/config context already cited by the
   Reviewer when needed to make the corrected contract implementable.

Reviewer result:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/104_PHASE_B_R2_RECOVERY_F02_INDEPENDENT_DESIGN_REVIEW_RESULT.md`

Reviewer result SHA-256:

`35488329b1634793cba26b20d41cf169e426644cac6fd6bc1b54a789bddd393f`

## Exact patch findings

### F02-D1 - noninteractive fixed invocation

Replace the interactive sudo surface with one exact noninteractive invocation.
Specify the external privilege-denial exit/output separately from helper
outcomes. Prove by a synthetic command-construction test that no password,
askpass, stdin, controlling-terminal, or retry path is reachable. Do not add a
wrapper, alias, alternate invocation, or caller argument.

### F02-D2 - non-circular pre-execution trust root

Specify one independently checkable trust root that authenticates the exact
manifest and helper bytes before those privileged bytes can approach the
original root. Close pathname replacement between verification and execution.
Bind an exact reviewed digest without a helper/manifest hash cycle. Do not add a
caller-selected path, second production mode, generic loader, or package alias.

### F02-D3 - exact reproducible manifest and digest grammar

Define every manifest key, literal, type, encoding, canonical serializer,
directory/regular-file representation, numeric format, ordering, domain
separator, terminator, and complete initial/final tree stream. Name the exact
fixed-input generation and independent reproduction surface and the source-
commit/build/evidence-commit sequence. Keep it inside the smallest reviewed
allowlist and make it incapable of selecting a production root or behavior.

### F02-D4 - closed import-safe test seam

Name the exact permitted export set and direct-entry guard. Import must perform
zero filesystem, `/proc`, spawn, privilege, journal, or root action. Keep
production fixed-path adapters and the production entry private and
non-injectable. Export only named pure/state-machine/manifest functions with no
production defaults; no exported seam may select or reach either real root.

### F02-D5 - exact interpreter and privilege transition

Specify exact interpreter path, argv, isolated/no-site flags, literal operand,
cwd, environment, fd mapping, stdin/stdout/stderr behavior, output caps, and
child-failure mapping. Define an ordered transition for real/effective/saved
UID and GID, supplementary groups, securebits/keep-caps, bounding/permitted/
effective/inheritable/ambient capability sets, and `no_new_privs`, plus exact
`/proc/self/status` verification. Every mismatch must fail before original-root
open with one fixed HOLD outcome. Leave no inherited Python option, site
customization, or post-drop exec surface.

### F02-D6 - durable monotonic anti-retry journal

Define the exact journal schema, fixed path, open flags, ownership, mode, link
and immutable/append-only flag checks, exclusive operation lock, legal state
transitions, sync ordering, and full re-read immediately before terminal
success. Specify deletion, truncation, rename, replacement, tamper, ambiguous
prior attempt, and concurrent-writer behavior so none can become a fresh
mutation attempt. No repair/delete/reset mode is allowed. The journal must be
redacted, fixed-path-only, and unable to select a root or helper behavior except
through an authenticated legal state.

## Scope lock

Edit exactly the same three product paths and no others:

1. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_DESIGNER_RESULT.md`
3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_DESIGNER_RESULT_POINTER.txt`

Retain the four-path implementation allowlist unless a finding proves it
impossible. If another implementation/package/config path is genuinely needed,
return `HOLD` with the exact reason instead of silently expanding scope.

## Preserved and forbidden

- Preserve all algorithm-level PASS findings, scratch validation sequencing,
  descriptor identity, F01 behavior, private Leo-only bindings, and sequential
  one-profile operation.
- No implementation, source/test/setup/package/config change beyond the three
  design artifacts.
- No access, stat, traversal, digest, chmod, ioctl, creation, or mutation of the
  original root, R2 root, or scratch path.
- No sudo/helper execution, secret/environment-value access, Slack/network,
  descriptor activation, owner/pilot start, live-destination observation,
  process signal, or tmux input.
- No database, Registry, framework, systemd, UI, VibeNews, external project,
  package/dependency, risk acceptance, Worker/Reviewer dispatch, or next mission.

## Completion

Commit and non-force push exactly the three patched design artifacts. Report
the candidate commit, exact changed paths, hashes, disposition of F02-D1 through
F02-D6, and any remaining conflict to `agent-office-advisor`, then STOP.
