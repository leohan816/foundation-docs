# Independent Sentinel Level 3 Design Review Result

## Findings

### F01 — HIGH — one activation is required both before and after its intake/event identity exists

The frozen package assigns mutually incompatible lifecycle positions to the same
`pilot activation` contract.

- The activation selects the one client slot allowed to make a live connection
  (`2a01f054d85c8da18d99ec549e1937ebbc964727:docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md:160-164`).
- After Socket authentication, the selected client still cannot accept a message
  until that profile activation validates (`...SLACK_DESIGN.md:212-233`). The
  security state machine likewise enters `ARMED_ONE_PROFILE` only from an exact
  reviewed activation (`2a01f054d...:docs/security/AGENT_OFFICE_AS1_SLACK_SECURITY_AUTHORITY_MODEL.md:236-250`).
- Yet that same activation must be an exact committed and pushed artifact binding
  one `intake/event identity` (`...SLACK_DESIGN.md:458-474` and
  `...SECURITY_AUTHORITY_MODEL.md:270-284`).
- The source event is learned only from the Events API callback, while the
  `intakeId` is created by the later asynchronous classification after durable
  receipt and Socket ACK (`...SLACK_DESIGN.md:291-333,413-437`). There is no
  intake/event pair available when the activation must already exist to arm the
  profile and accept that callback.

No implementation can satisfy all four statements. Pre-committing the activation
requires an unknown or wildcard event/intake identity, weakening the exact
authority boundary. Creating it after receipt leaves no authority with which to
arm the client or accept the first event. Deriving it from untrusted Slack bytes
inside the gateway would make the gateway mint its own authority. Deferring it
until after classification is also impossible because the package requires the
activation before acceptance and creates the intake only after ACK.

The baseline reinforces the missing separation. Exact Delivery v2 first has a
concrete notification and then validates/consumes a fresh lease and creates a
notification-bound in-memory capability
(`50124a1ea720e162e906c04c6f6fb2591c4974b8:src/adapters/gateways/tmux-advisor/exact-authority.ts:226-315`).
It does not use a future notification identity to authorize startup. The AS1
design needs an equivalent distinction between permission to receive one bounded
pilot conversation and permission to deliver one already-created intake pointer.

Impact: a Worker must either weaken the no-standing-authority gate, open/accept
without the required activation, or invent an undocumented authority-minting
step. This is an implementation-readiness and security-authority blocker. Phase A
implementation must not start from this contract.

Required closure:

1. Split or explicitly stage the contracts. A pre-event, committed/pushed,
   expiring, single-profile pilot-receive authorization may bind the literal
   profile, pilot, governance snapshots, maximum root/conversation use, and
   consumption rules without pretending to know an event or intake ID.
2. Durably bind and consume that receive authorization when the first eligible
   event/root is accepted, with exact behavior specified for rejected events,
   Slack retries, restart, expiry, and a correlated thread continuation.
3. Create the separate post-intake delivery activation/lease/capability only
   after the immutable `intakeId` and `sourceEventId` exist; bind those exact
   values and the one exact pointer attempt.
4. Align the integration lifecycle, security state machines, setup/start gate,
   schemas, WorkUnits, completion criteria, and focused recovery/authority tests
   to that ordering. The same Reviewer must re-review the exact documentation
   delta.

## Verdict

`NEEDS_PATCH`

F01 is a document-level, bounded, patchable defect, but it makes the current
authority chain impossible to implement as written. The mandatory gate against
standing or gateway-minted authority is therefore unresolved. This verdict does
not authorize implementation, owner setup, a Slack connection, tmux input,
transport activation, risk acceptance, merge, release, or the next mission.

## Review coordinates

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Pass: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_REVIEW`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Live process: `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh`
- Live read-only binding: `$25/@25/%25`, indexes `0/0`, workspace
  `/home/leo/Project/agent-office`, synchronized panes off, pane live, input on
- Target branch: `feature/as1-multi-team-slack-pilot-001`
- Design base: `50124a1ea720e162e906c04c6f6fb2591c4974b8`
- Frozen package: `2a01f054d85c8da18d99ec549e1937ebbc964727`
- Frozen evidence head: `ce250c05218cc6d9cc4f2f3b0c43b678b95ec776`
- Review handoff SHA-256:
  `e765a59ca0fd6988a0144d76e9dd8883565edff4ed97e488d5c8c5bb57a30361`

All three target commits resolve immutably. The package descends from the design
base, and the frozen evidence head descends from the package. At review
completion the target worktree was clean and
`HEAD == upstream == ce250c05218cc6d9cc4f2f3b0c43b678b95ec776`.

## Authority and skill entry

- Required `fable-sentinel` skill loaded directly; SHA-256 matched
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`.
- Relevant references loaded directly:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
  - shared `failure-escalation.md`:
    `e62d6725799bcfa6de3f8a1a987f5ee8d7d1a7b398d9690b77064b89d532f128`
- The skill-linked V2 role protocol was read directly and identified itself as
  superseded historical evidence. Current Agent Office authority controlled.
- Current frozen Reviewer authority hashes:
  - `AGENTS.md`: `df680fcee5f22c66c9ff56d15017d720dd547350bd5a5a7a29377759ac21b79e`
  - `CLAUDE.md`: `bba0b496f0305d28d66712e82b4f77aac9394693b05938668f9525b2d8871043`
  - `docs/agent/TEAM_OPERATING_MODEL.md`:
    `810d1884a90e3351097350e5d77e568e2aab6f544188d73ae44b4ee5d79efe17`
  - `docs/agent/roles/reviewer.md`:
    `40fd0a0530e5270997fe24a080823555a37b9f630f623f61eeda5e1625f78188`
  - `docs/agent/RUN_PROTOCOL.md`:
    `34ab6d76e11422e2250b99284a3f6f767fbc76d5c17182e635cf00e4e76d2995`
  - `docs/agent/RESULT_REPORTING_PROTOCOL.md`:
    `570fa25aa601d5a3ea690f7a308d351873895fa42c29f2b569cf02814741fffb`

No operative conflict exists between the current Reviewer documents and the
exact Advisor handoff. The handoff expressly authorizes only these two governance
result files plus their commit/non-force push; it does not authorize a candidate
write.

## Frozen artifacts and provenance

The exact base-to-evidence range contains ten added files and no other path. The
base-to-package range contains the six design/setup files plus the initial result
and pointer. The later exact patch authorization changed four overlapping package
files and added its result and pointer, so the union at the frozen evidence head
is ten paths. This reconciles the initial eight-path scope with the later patch
scope; no unauthorized candidate path was found.

The preflight correction `daf46e5885151acf2b430288464b137d0370efb1..2a01f054d85c8da18d99ec549e1937ebbc964727`
changes exactly both manifests, the integration design, and the setup runbook.
The two named allegedly duplicated fragments each occur exactly once at both
ends of that range. The patch report correctly disclosed the false duplicate
premise and preserved the sole valid occurrences.

Designer evidence accuracy was otherwise confirmed:

- the exact app/bot display-name correction is present and changes no manifest
  permission/event setting;
- the initial Ruby/local-Node YAML attempts were unavailable, and the later
  `python3`/PyYAML parse succeeded;
- the patch report discloses its first orchestration-wrapper syntax failure;
- result and pointer commits are immutable ancestors of the frozen evidence head;
- no runtime, test, package, lockfile, existing-contract, secret, or live-Slack
  candidate change exists.

## Mandatory-gate coverage

- **Exact app/bot identity and non-authoritative labels — PASS.** Both literals
  are exact: `agent-office-advisor` and `foundation-advisor`.
- **Manifest least privilege and disabled surfaces — PASS.** Both parsed
  manifests enable Socket Mode, subscribe only to `message.groups`, request only
  `chat:write`, `groups:history`, and `users:read`, disable App Home tabs and
  interactivity, and define no DM/public/command/shortcut/Request-URL surface.
- **Ten-key no-secret template and parser contract — PASS.** Exactly ten approved
  keys exist; only `SLACK_LEO_USER_ID=U0BD3523C1F` is populated. The design
  requires exact-key data parsing, owner/mode/no-follow checks, and forbids shell,
  dotenv, environment inheritance, interpolation, and value-bearing diagnostics.
- **Startup token/App/workspace/profile correspondence — PASS.** The fixed
  `auth.test`, `bots.info`, `apps.connections.open`, Socket `hello`, and callback
  identity sequence rejects bot/app-token swaps and wrong workspace/App facts.
- **Closed profiles and input non-authority — PASS.** Slack bytes cannot select a
  Team, Actor, session, pane, workspace, model, effort, command, repository, or
  path; VibeNews and all other routes remain absent.
- **Fresh authority and no standing capability — FAIL.** F01.
- **Exact Delivery v2 and immutable identity compatibility — PASS.** AS1 proposes
  new sibling schemas/state roots and protects all current v2 paths. Foundation
  uses fresh `roleInstanceId: foundation-advisor-20260714-01` and cannot inherit
  Agent Office evidence.
- **Persist-before-ACK and dedupe — PASS at design level.** The raw Socket port
  owns ACK timing, requires immutable receipt plus both dedupe identities before
  ACK, and converts ACK ambiguity to replay/dedupe rather than a second intake.
- **Intake and thread classification — CONTRACT PASS, lifecycle blocked by F01.**
  Top-level authorized Leo input creates only pre-Mission `NEW_MISSION`; replies
  require an exact root and one pending question fixing `CLARIFICATION` or
  `DECISION_RESPONSE`.
- **Rejection/echo/deferred-query behavior — PASS.** Wrong identity/surface,
  DMs, shared channels, bot/app/hidden/edit/delete/subtype events, uncorrelated
  replies, retries, and outbound echoes cannot create a new intake or query.
- **Outbound semantics — PASS.** The exact same-thread `chat.postMessage` shape
  forbids identity overrides and blind resend; ambiguous sends require manual
  reconciliation.
- **Kill, isolation, recovery, and rollback — CONTRACT PASS, lifecycle blocked by
  F01.** State separation and failure behavior are specified, but the entry
  transition cannot be implemented until the activation ordering is corrected.
- **One-Worker implementation readiness — FAIL.** F01 forces the Worker to invent
  authority semantics. The remaining source/WorkUnit/test proposal is otherwise
  bounded and additive.
- **Designer scope and forbidden work — PASS.** No runtime/product test or live
  system action occurred.

## Independent static reproduction

- Python/PyYAML `safe_load`: PASS for both frozen manifests.
- Exact parsed name, scope, event, App Home, interactivity, org-deploy, and Socket
  Mode assertions: PASS.
- Environment exact-key/count/value assertions: PASS.
- Credential-pattern scan over all ten frozen files: PASS, zero populated token
  pattern.
- `git diff --check 50124a1e..2a01f054`: PASS.
- `git diff --check 2a01f054..ce250c05`: PASS.
- Patch-base and package duplicate-fragment counts: PASS, `1/1` at both commits.
- Target ancestry, exact changed paths, clean status, and upstream equality:
  PASS.

Current official Slack sources were checked on 2026-07-14: [Socket Mode and
manual envelope ACK](https://docs.slack.dev/apis/events-api/using-socket-mode/),
[app manifests](https://docs.slack.dev/reference/app-manifest/),
[`connections:write`](https://docs.slack.dev/reference/scopes/connections.write/),
[`auth.test`](https://docs.slack.dev/reference/methods/auth.test/),
[`bots.info`](https://docs.slack.dev/reference/methods/bots.info/),
[`users:read`](https://docs.slack.dev/reference/scopes/users.read/),
[`message.groups`](https://docs.slack.dev/reference/events/message.groups/), and
[`chat.postMessage`](https://docs.slack.dev/reference/methods/chat.postMessage/).
The official Node Socket Mode surface exposes application ACK control and
configurable automatic reconnect behavior. No reviewed protocol requirement was
found to depend on an unavailable SDK primitive; F01 is an internal authority
lifecycle contradiction, not a Slack limitation.

Execution disclosure: the preferred Agent Reach Exa route was unavailable because
`mcporter` was not installed, so only official Slack pages were retrieved through
the documented web/Jina fallbacks. `python` was unavailable; `python3` with local
PyYAML succeeded. One early source-search command used incorrect guessed paths and
shell-sensitive backticks and was rerun with exact paths. Two exploratory local
assertion runs also over-specified an optional manifest field and guessed
`AS1_`-prefixed environment keys; both reviewer assumptions were removed, and
the exact handoff/package contracts then passed. These were review-tool errors,
not hidden candidate failures, and no repository state was changed by them.

No product, Living Office, browser, broad unit, live network, Slack, tmux
mutation, dependency, or unrelated suite was run.

## Deferred gates and excluded scope

The live workspace/App/channel/token values, SDK package versions, precise
capacity/retention numbers, state root, authority snapshots, destination
locators, owner setup, and synthetic implementation evidence remain later exact
handoff/setup inputs. They do not repair F01 and were not treated as current
permission or current evidence.

Candidate implementation, candidate patching, secrets, owner setup, live Slack,
tmux input, runtime activation, final approval, risk acceptance, merge, release,
and next-actor dispatch were excluded and not performed.

## Routing and stop

RETURN_TO: `agent-office-advisor`

NEXT_REQUIRED_ACTION: Advisor-routed narrow Designer patch for F01, followed by
exact same-Reviewer design delta re-review. No Worker or owner/live phase is
authorized.

STOP
