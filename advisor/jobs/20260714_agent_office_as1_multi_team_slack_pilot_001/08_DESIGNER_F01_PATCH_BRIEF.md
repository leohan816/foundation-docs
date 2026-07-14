# Designer F01 Authority-Lifecycle Patch Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PATCH_CLASS: `ROUTINE_BOUNDED_DESIGN_CORRECTION`

SOURCE_VERDICT_COMMIT: `8cfe192b7bfba3fe2c93d01232aec314878cec99`

TARGET_PATCH_BASE: `ce250c05218cc6d9cc4f2f3b0c43b678b95ec776`

FINDING: `F01 HIGH`

## Exact defect

The current design uses one activation both to authorize opening/arming the
Socket listener before an event exists and to bind the event/intake identity
created only after that event is received. No implementation can satisfy both
positions without a wildcard, standing delivery authority, or gateway-minted
authority.

## Required correction

Separate the lifecycle into two exact authority stages without weakening any
approved boundary.

1. Define a pre-event, committed and pushed, expiring **pilot receive grant**.
   It may bind only one literal profile, one pilot, exact workspace/App/channel/
   Leo identity, current governance and registry snapshots, one profile-local
   state root, one accepted top-level root/conversation limit, expiry, and kill/
   latch state. It must not contain, wildcard, derive, or pretend to know a
   future Slack event ID, root timestamp, intake ID, pointer, tmux destination,
   lease, or delivery capability.
2. Specify atomic receive-grant state transitions. The first eligible, exact-
   identity top-level Leo event is durably recorded and atomically binds the
   grant to exactly one root/event before Socket ACK. It consumes the sole root
   slot. Subsequent top-level events cannot create another intake. Correlated
   thread replies may continue only that bound root and one exact open Advisor
   question.
3. Specify behavior for wrong identity/surface, malformed events, bot echoes,
   Slack retries, duplicate envelopes/events, rejected top-level events after
   root binding, restart, expiry before root, expiry after root, disconnect,
   ambiguous ACK, kill switch, and state corruption. Rejected input never mints
   authority. A retry may reproduce an ACK from durable dedupe state but never a
   second intake or second root binding.
4. After immutable receipt/classification creates exact `sourceEventId`,
   `intakeId`, and pointer hash, define a separate **post-intake pointer-delivery
   grant**. Only this stage may bind those values and authorize creation of the
   existing fresh, profile-local, one-use readiness lease and in-memory
   capability for one exact tmux pointer attempt.
5. Preserve separate per-profile grant, consumption, journal, evidence, dedupe,
   and latch namespaces. No grant, state, or evidence may cross profiles. There
   is no generic target, standing delivery authority, fallback Advisor, or
   gateway-created grant.
6. Align the integration lifecycle, security state machines, setup/start gate,
   schema names, durable state layout, WorkUnits, completion criteria, and
   focused authority/recovery tests to this ordering.

The exact schema names are a Designer choice, but the two stages must be
unambiguous and must not overload Exact Delivery v2 or reinterpret historical
evidence.

## Allowed target changes

- `docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md`
- `docs/security/AGENT_OFFICE_AS1_SLACK_SECURITY_AUTHORITY_MODEL.md`
- `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md` only where needed to align
  the disabled/start/real-pilot gate
- new `artifacts/as1-multi-team-slack-pilot/DESIGNER_F01_PATCH_RESULT.md`
- new `artifacts/as1-multi-team-slack-pilot/DESIGNER_F01_PATCH_RESULT_POINTER.txt`

The manifests and environment template already passed and must remain byte-
unchanged. Existing Designer result and patch evidence are immutable history.

## Required targeted checks

- `git diff --check` for the exact patch range;
- exact changed-path check against the five allowed paths;
- manifests and environment template byte equality to patch base;
- text/contract assertions proving receive grants contain no event/intake/
  pointer/destination authority and delivery grants require all of them;
- lifecycle trace for first root, retry, correlated reply, second root, restart,
  expiry, kill, and profile isolation;
- no runtime, package, lockfile, source, test, secret, live Slack, tmux input,
  product suite, or broad audit.

## Completion

Commit and non-force push the exact target delta. The result must report every
command, including failures; exact changed files; target commit and upstream
equality; and an attestation that implementation, owner setup, Slack connection,
and tmux mutation did not occur. Return the exact pointer to
`agent-office-advisor` and STOP. The same independent Reviewer performs the
delta re-review.
