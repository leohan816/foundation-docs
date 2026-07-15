# Advisor Implementation Patch Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

REQUIRED_SKILL_SHA256:
`9a5afeefd34775a918b83900aa19859278f4e151a067cf6ab82cb6a25757091b`

MODEL_EFFORT: `Opus 4.8 / Ultracode` (verify directly before editing)

## 1. Advisor decision and immutable review input

The same independent SOL Sentinel Reviewer returned `NEEDS_PATCH`. The finding
set is repairable inside the already reviewed AS1 boundary and does not require
a product, authority, dependency, or design change. Continue the same candidate
train; do not restart the implementation or redesign accepted contracts.

Read the complete immutable review result directly:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/20_IMPLEMENTATION_SECURITY_REVIEW_RESULT.md`

- governance result commit:
  `3100a717418d8a4dc17d0114aaa3daa8b14ac083`
- result SHA256:
  `c06bbad3ce948829b6e192b30f07f2144e57efec9fa441e21b87580e4dcccf6b`
- governance pointer commit:
  `399fd3cc173b787a9aae07eb1895545908bb6075`
- verdict: `NEEDS_PATCH`

The nine blocking findings `B01` through `B09`, their code references, and
their required evidence are the exact patch contract. Do not reinterpret,
omit, downgrade, or convert a blocking finding into accepted risk.

## 2. Exact candidate coordinates

- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- branch: `feature/as1-multi-team-slack-pilot-001`
- current clean/upstream-equal HEAD:
  `16e3720318239e1466f16a526e23819ba1bd0702`
- frozen reviewed design parent:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- rejected source candidate:
  `aac3e515ca05b89545688f84a4c17e4be12fa29d`

Before editing, verify the exact session/process/model/effort, skill hash,
worktree/branch/HEAD, clean and upstream-equal state, no conflicting writer,
and all required repository role/run/result instructions. If any coordinate
differs, return the exact mismatch before editing.

## 3. Exact patch WorkUnits

Execute these serially and continue through routine failures without returning
to Leo or the Advisor:

1. `AS1-PATCH-01_SDK_SEAM` — correct the pinned public-root
   `@slack/socket-mode@3.0.0` event and connection contract; consume the actual
   `body`/`retry_num` shape, obtain and validate the bounded connection/App
   identity through an actually emitted public event/state, require a real ACK
   function, disable SDK/provider reconnect and `apps.connections.open` retry,
   enforce redacted logging, and add a test that exercises the pinned SDK seam
   rather than the post-adapter fake shape.
2. `AS1-PATCH-02_INBOUND_RECOVERY` — implement the exact durable, hash-bound
   `PREACK_PENDING -> terminal pre-ACK decision -> TRANSPORT_ACK_RECORDED ->
   MATERIALIZED|TERMINAL_NO_INTAKE` machine; make duplicate ACKs reproduce only
   the exact durable decision; recover every reviewed pre/post-ACK crash
   boundary; materialize once after expiry/restart without Socket reopen.
3. `AS1-PATCH-03_CONTINUATION_KIND` — persist thread replies as the already
   fixed `CLARIFICATION` or `DECISION_RESPONSE` contract, bound to the original
   intake/root/question; never persist them as `NEW_MISSION` and never let Slack
   text select the kind.
4. `AS1-PATCH-04_EXACT_AUTHORITY_TRANSPORT` — verify the complete immutable Git,
   authority, registry, owner, review, control/latch, destination, state-root,
   and snapshot chain; remove capability, target, profile, buffer name, pointer
   path, and trusted time from caller-controlled production inputs; derive them
   internally; use a fresh trusted clock before each authorized side effect;
   atomically consume grant and lease; make every interrupted nonterminal tmux
   journal require manual reconciliation.
5. `AS1-PATCH-05_CONTROL_LIFECYCLE` — use closed legal transition tables and
   the exact two-profile union; strictly parse durable control/latch records;
   make kill/latches irreversible without an explicit separately reviewed reset;
   persist contradictions and capacity failures; own/release the WriterLock;
   enforce kill/latch checks before dequeue and side effects; prove bounded
   shutdown, offline drain, restart, Socket close, and ambiguity handling.
6. `AS1-PATCH-06_EVIDENCE_PROVENANCE` — implement the reviewed read-only bounded
   Git/content verifier behind the existing port, bind repository/source commit
   and both frozen authority snapshots, compare blob bytes/hash and all accepted
   correlations, require exact duplicate equality, and durably latch every
   provenance/order contradiction.
7. `AS1-PATCH-07_OUTBOX` — derive token/channel/thread only from the selected
   closed profile and immutable accepted root; resume terminal/ambiguous phases
   without network I/O; persist request/response hashes; translate actual
   provider definitely-unsent/rate-limit outcomes into only the reviewed retry
   classes; validate exact Slack timestamps and latch ambiguity.
8. `AS1-PATCH-08_BOUNDS_RECOVERY_SCHEMAS` — enforce every approved external,
   provider, subprocess, queue/in-flight, retention, timer, depth, array, and
   durable-index limit in its owning component; replace generic casts with
   strict exact-key/type/hash/phase parsers; reject illegal journal transitions;
   persist required profile/global latches on corruption/capacity.
9. `AS1-PATCH-09_TRUTHFUL_OPERATIONS_EVIDENCE` — update Setup Pack status,
   as-built documentation, feature index where needed, and Worker result so they
   describe the repaired implementation exactly. Local syntax/permission
   validation must not report live Slack identity verification. Preserve
   fake-only/default-disconnected Phase A and disclose every remaining deferred
   live boundary.

## 4. Allowed target paths

Modify only these existing files:

- `src/application/slack-pilot/contracts.ts`
- `src/application/slack-pilot/inbound-store.ts`
- `src/application/slack-pilot/service.ts`
- `src/application/slack-pilot/evidence-ingress.ts`
- `src/application/slack-pilot/outbox.ts`
- `src/adapters/gateways/slack-pilot/socket-client.ts`
- `src/adapters/gateways/slack-pilot/web-client.ts`
- `src/adapters/gateways/slack-pilot/exact-authority.ts`
- `src/adapters/gateways/slack-pilot/exact-transport.ts`
- `src/operations/readiness/as1-slack-control.ts`
- `src/runtime/as1-slack-pilot/composition.ts`
- `src/runtime/as1-slack-pilot/cli.ts`
- `tests/helpers/as1-slack-fakes.ts`
- the eleven existing AS1 test files named in
  `16_WORKER_IMPLEMENTATION_BRIEF.md`
- `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
- `docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md`
- `docs/FEATURE_INDEX.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT_POINTER.txt`

The following narrowly scoped new files are also authorized if needed to keep
adapter and provenance proof isolated:

- `src/adapters/gateways/slack-pilot/git-provenance.ts`
- `tests/adapters/as1-slack-sdk-adapter.test.ts`
- `tests/adapters/as1-slack-git-provenance.test.ts`
- `tests/security/as1-slack-durable-boundaries.test.ts`

Do not change package versions, package metadata, manifests, environment
template, reviewed design/security documents, Exact Delivery v2, Advisor inbox,
organization registry, or any other file. Do not add a dependency, deep import,
type/lint suppression, generic target selector, or reset path.

If the pinned public package-root API cannot satisfy B01 without a dependency or
material design change, stop with `MATERIAL_SDK_CONTRACT_BLOCKER` and exact
public-API evidence. Do not use a deep import, monkey patch, private property,
package patch, or weakened test as a substitute.

## 5. Required focused evidence

For each `B01`-`B09`, add a regression that fails on `aac3e515` and passes on
the repaired source. Exercise the real pinned public SDK seam for B01; fakes may
still isolate all network and tmux side effects. Cover every crash/restart and
illegal-transition case explicitly named by the Reviewer.

Run, in this order:

1. the new/changed test files directly while patching;
2. all AS1 focused files, including any newly authorized files;
3. the four protected regressions from the original handoff;
4. `npm run typecheck`;
5. changed-file ESLint only;
6. `npm run build:core`;
7. `npm audit --audit-level=high`;
8. `git diff --check 81a8c3474380a7e427516d6f5e57c97ad88c6c9b..HEAD`;
9. targeted scans for suppressions, deep imports, secrets, caller-selected
   profile/target/path/buffer/time/capability, unsafe resets, and generic Slack
   or tmux execution.

Do not run Living Office, visual, browser, broad E2E, unrelated suites, real
Slack, real tokens/secrets, or real tmux mutation. Record every failed command
and correction honestly.

## 6. Result protocol and routing

Keep Phase A default disconnected. Do not create apps, credentials, grants,
leases, capabilities, owner setup, or a live round trip.

After all nine findings are repaired:

1. commit bounded source/test/doc patches using explicit paths and non-force
   push;
2. freeze a new source-candidate commit;
3. update `WORKER_RESULT.md` in a result-only commit with an explicit B01-B09
   closure matrix, exact commands/failures, remaining fake-only boundaries, and
   corrected claims;
4. update `WORKER_RESULT_POINTER.txt` in a pointer-only commit with exact hashes
   and coordinates;
5. prove clean/upstream-equal state;
6. return the pointer to `agent-office-advisor` and STOP.

The same `agent-office-reviewer` independently re-reviews the exact frozen
delta. The Worker must not self-review, approve, accept risk, dispatch another
actor, start owner setup, or begin another mission.
