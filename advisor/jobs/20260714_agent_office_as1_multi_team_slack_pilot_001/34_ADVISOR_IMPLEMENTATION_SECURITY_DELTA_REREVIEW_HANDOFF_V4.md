# AS1 Phase A Implementation/Security Delta Re-review Handoff V4

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

REVIEW_PASS: `IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V4`

ACTOR: Agent Office Independent SOL Sentinel Reviewer

SESSION: `agent-office-reviewer`

REQUIRED_SKILL: `/fable-sentinel`

REVIEWER_MODEL_EFFORT: `GPT-5.6 SOL / max`

EFFORT_RATIONALE: This is the final narrow Level-3 security delta over authority
provenance, durable state, exact tmux boundaries, Socket control/latching, and
truthful evidence. Max is warranted by the still-critical B04/B05 seams. Do not
infer runtime identity from the session name; verify it directly before review.

## 1. Independent authority and frozen coordinates

The same independent Reviewer that returned the prior `NEEDS_PATCH` must review
the exact correction. The Reviewer must not implement, patch, change the
candidate branch, accept risk, approve owner setup, activate Slack, or select a
next mission.

- Prior review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/32_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_RESULT.md`
- Prior review result commit:
  `3ffbb57689a8b5828eaef235cb9a1ff40dce43e5`
- Prior review result SHA256:
  `8af621decdfbdb55bb38352ab15a7bc6dd9d23572ccce97b17f604669ad38cf3`
- Verdict to re-review: `NEEDS_PATCH`
- Frozen base parent:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- Rejected prior candidate:
  `0e4274f427904302d67a0de1e78cde60512b94b3`
- Frozen corrected source candidate:
  `4cf967d54f14e9b63dc3e94efa1081c13ca38044`
- Final source-behavior commit beneath the docs-only candidate:
  `57af414`
- Corrected Worker result commit:
  `0c2ed3a1537538993a67dbfe648c4e515fb3cc50`
- Worker result SHA256:
  `5adb460b658339cdca6b0d19d7b73b81fa110c146486812fcd6c9a1a9304f0a1`
- Corrected Worker pointer / branch tip:
  `cc823562a52f495ea1b3d54314865b2305ea0932`
- Worker pointer SHA256:
  `c1e698c4d2943ae1051a5ba116fc0deb1757c1b8ab749ae9fce884c9a26275a5`
- Candidate worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Candidate branch:
  `feature/as1-multi-team-slack-pilot-001`

Verify all coordinates, clean status, ancestry, and upstream equality before
reading summaries. Inspect the actual `0e4274f..4cf967d` diff first.

## 2. Exact delta and closure questions

Re-review only B01, B02, B04, B05, B08, and B09 plus load-bearing surrounding
code. Confirm B03, B06, and B07 remain closed and unregressed; do not reopen
unrelated accepted scope.

### B01 - public-root ws construction

- Actual production options use `as const satisfies`.
- The regression targets the production literal, not a detached duplicate.
- No deep import, suppression, unsafe cast, or toolchain weakening exists.

### B02 - durable ACKable rejection decisions

- Every ACKable rejection with usable immutable event identity persists receipt,
  dedupe, committed pre-ACK rejection, transport ACK, and exactly one
  `TERMINAL_NO_INTAKE` decision.
- Crash/retry/restart reproduces the durable decision without a second Mission,
  divergent identity acceptance, or blind ACK loop.
- Malformed identity and identity-contradiction policies remain fail closed.

### B04 - real authority-artifact provenance

- Real read-only Git provenance exists for receive grants and pointer-delivery
  grants: exact repository, path, committed blob, canonical content, source
  commit, single first addition, clean state, upstream ancestry, and frozen
  snapshot descent.
- Trusted repository/upstream/snapshots/artifact resolver/clock/control are
  construction-bound and cannot be selected by Slack or a per-call caller.
- `As1StartupIdentityVerifier` binds trusted clock, receive-grant provenance,
  control snapshot, and connect-ready predicate once at construction; no free
  production-representable `verifyStartupIdentity(input)` trust seam remains.
- The exact transport binds the delivery provenance gate at construction.
- Any malformed Git output, timeout, mismatch, or failed gate refuses before
  connection/delivery.

### B05 - owning control before side effects

- Exact tmux transport is bound to the owning lock-holding profile control.
- Control/kill/latch is rechecked at every relevant adjacent boundary before
  journal mutation, authority consumption, buffer lookup/delete/load, preflight,
  paste, Enter, and terminal recording; terminal fail-closed reconciliation is
  never silently suppressed or retried.
- Raw Socket control is checked before `queue.shift`, preserving bounded FIFO and
  single in-flight behavior.
- Queue overflow, provider disconnect, malformed/unexpected transport state,
  handler failure, forced termination, drain timeout, and close failure persist
  the owning durable profile latch.
- `LATCHED` is preserved across shutdown, pending latch persistence is awaited,
  persistence failure remains observably fail closed, and a handler failure
  during drain does not wait on a dead-socket shutdown timeout.
- No cross-profile fallback, blind retry, permissive constructor default, or
  stale socket reference remains.

### B08 - strict bounded recovery

- Every affected durable file is byte-bounded before allocation/read/parse.
- State/phase-to-field invariants are exact for dedupe, receive-grant,
  pending-question, transport, and affected unions.
- Duplicate root correlation requires complete immutable equality, not only
  `rootTs`.
- Oversize, impossible, conflicting, or corrupted state durably latches the
  correct profile/global control and fails closed.

### B09 - truthful evidence

- As-built, FEATURE_INDEX, Worker result, and pointer match the final source and
  real exported class names.
- They distinguish implemented adapters from absent live composition and absent
  production tmux mutation port.
- They state Phase A is synthetic/default-disconnected, owner setup incomplete,
  independent review pending, and no real Slack/tmux/secret action occurred.
- Confirm the disclosed prohibited `git stash push/pop` attempt is present,
  changes were restored, stash list is empty, no loss occurred, and no later
  destructive operation was used.
- Confirm superseded evidence remains immutable and the corrected handoff
  `ef26aad` is distinct from initial governance lineage `47430b9`.

## 3. Proportionate independent reproduction

Read changed code before command output. Mandatory focused tests:

- `tests/adapters/as1-slack-authority-provenance.test.ts`
- `tests/adapters/as1-slack-socket-client.test.ts`
- `tests/integration/as1-slack-exact-transport.test.ts`
- `tests/integration/as1-slack-inbound.test.ts`
- `tests/integration/as1-slack-startup-auth.test.ts`
- `tests/recovery/as1-slack-recovery.test.ts`
- `tests/security/as1-slack-durable-boundaries.test.ts`

Mandatory protected regressions:

- `tests/contract/organization-registry.test.ts`
- `tests/integration/advisor-inbox.test.ts`
- `tests/integration/exact-advisor-delivery.test.ts`
- `tests/operations/readiness.test.ts`

Also reproduce:

1. `npm run typecheck`;
2. ESLint over TypeScript files changed in `0e4274f..4cf967d`;
3. `npm run build:core`;
4. `npm audit --audit-level=high`;
5. `git diff --check 0e4274f..4cf967d`;
6. focused scans for suppressions, deep imports, permissive trust/control seams,
   unsafe casts, secret/token literals, shell/eval/dynamic targets, historical
   physical fallback, reset/retry paths, and stale live-readiness claims;
7. protected-path byte equality and candidate clean/upstream equality.

Expand beyond these checks only if direct source inspection exposes a concrete
uncertainty. Do not run Living Office, visual/browser, broad E2E, broad repository
suites, live Slack/network/DNS/WebSocket, owner setup, credentials, or real tmux
mutation.

## 4. Advisor validation evidence

The Advisor independently confirmed before dispatch:

- candidate and upstream equal at `cc82356`;
- source candidate `4cf967d` and result `0c2ed3a` exist and are ancestors of tip;
- actual delta contains only 17 authorized source/test/doc/evidence paths;
- `git diff --check` is clean;
- Worker result hash and pointer hash match;
- five highest-risk files independently rerun: 5 files / 103 tests PASS;
- no dependency, manifest, env, Setup Pack, registry, Exact Delivery v2,
  Advisor-inbox, or unrelated product delta is present;
- Worker disclosed the prohibited stash attempt and all Advisor corrections.

This is targeted Advisor validation, not an independent verdict.

## 5. Verdict and output

Return exactly one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS_WITH_RISK` requires return to Leo/GPT. Routine patchable defects are
`NEEDS_PATCH` and return through the same Worker/same Reviewer loop. Do not
rewrite design or evidence to excuse a code defect.

Write and commit, in the governance worktree and current governance branch:

1. `35_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V4_RESULT.md`
2. `35_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V4_RESULT_POINTER.md`

Record exact files, commits, hashes, commands, failures/corrections, test totals,
actual Reviewer session/model/effort/skill hash, independence evidence, and the
explicit verdict. Non-force push, prove clean/upstream equality, return the
pointer to `agent-office-advisor`, and STOP.

No owner setup, live Slack, real tmux delivery, risk acceptance, final approval,
or next mission is authorized by this handoff.
