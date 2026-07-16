# AS1 Phase B Scope Audit And Design Correction

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

ACTOR: `agent-office-advisor`

TARGET: `agent-office-designer`

STATUS: `ACTIVE_SCOPE_CORRECTION_BEFORE_DESIGN_COMMIT`

## Authority

Leo directed an explicit scope audit before Phase B could continue, accepted
the resulting minimum-safe plan, and then directed the mission to continue.
This correction narrows, but does not restart, the design pass authorized by
`47_PHASE_B_DESIGNER_HANDOFF.md`.

The Designer's three staged design artifacts are uncommitted. Preserve the
valid security findings, revise them in place, and do not create additional
paths.

## Scope verdict

The current proposed 19-path implementation plan is `OVERSIZED` for the exact
objective. The required product outcome remains only:

1. compose existing Phase A modules into one foreground, single-profile live
   Slack composition;
2. preserve all reviewed identity, authority, isolation, dedupe, journal,
   latch, grant, lease, capability, evidence, and fail-closed boundaries;
3. run Agent Office, stop and audit;
4. run Foundation, stop and audit;
5. return the independent verdict.

## Required design correction

Revise the active design and Designer result before committing them.

Retain only the implementation needed for:

- fixed grant-derived selection of exactly one profile;
- Slack Web/Socket identity proof and authenticated receive quarantine;
- existing intake, dedupe, thread correlation, evidence ingress, and outbound
  composition;
- fixed-path observation of already-authorized Git artifacts;
- existing Exact Delivery transport through one closed tmux port with fresh
  destination proof and one-use authority;
- foreground start, signal-bound stop, bounded drain, lock release, and
  redacted status;
- the missing `AS1_SLACK_STATE_ROOT` owner instruction;
- focused synthetic tests covering only those live boundaries and the two
  profiles sequentially.

The implementation map must be the smallest coherent path set. Aim for no more
than 15 paths. If more than 15 are genuinely load-bearing, do not silently keep
them: mark the design `HOLD` and identify the exact unavoidable path and
dependency. A path quota never permits omission of a real security control.

For every retained source or test path, state one concrete reason it is needed
for one of the two live pilots. Prefer extending an existing focused test over
creating a generic matrix or framework.

## Remove from the active implementation plan

- Worker modification of the default-disabled descriptor. Value-only live
  activation belongs to the later exact reviewed pilot operation.
- A separate Phase B as-built document when the existing Worker result,
  Reviewer result, and Advisor audit can hold the evidence.
- full `npm test`;
- crash injection at every durable phase;
- exhaustive cross-product profile/security/property matrices;
- broad stale-lock and lifecycle permutations unrelated to safe start/stop for
  these two pilots;
- any generic Git, runtime, workflow, service, or orchestration framework;
- any source or test supporting hypothetical profiles or future rollout.

## Explicitly absent

The corrected design must explicitly confirm that it introduces none of:

- database, schema, migration, Registry change, or authority redesign;
- systemd, daemon supervisor, permanent service, or auto-start;
- HTTP ingress, UI, Dashboard, Living Office, or generic command surface;
- VibeNews work;
- FOUNDATION, SIASIU, or Cosmile product changes;
- simultaneous or open-ended two-profile operation;
- unrelated exhaustive tests.

## Proportionate gates

Require only:

- changed-file/typecheck/build gates needed by the affected TypeScript paths;
- focused tests for startup identity and receive quarantine;
- focused tests for fixed artifact observation and exact one-use delivery;
- one synthetic Agent Office composition followed by one synthetic Foundation
  composition;
- focused same-thread evidence/outbound and replay checks;
- focused stop/drain/lock-release and redaction checks;
- changed-file secret/static scans and the directly affected Phase A/Exact
  Delivery regressions.

Do not use test volume as a substitute for the exact live product proof.

## Result correction

The revised Designer result must record:

- exact proposed implementation path count;
- exact retained paths and necessity;
- exact removed paths/gates;
- revised completion estimate of `3-5 hours`, excluding time waiting for Leo's
  two Slack messages;
- no runtime implementation and no live access in the design pass.

Run docs-only validation, commit the same three authorized artifacts once,
non-force push, verify clean/upstream-equal, return to Advisor, and stop.
