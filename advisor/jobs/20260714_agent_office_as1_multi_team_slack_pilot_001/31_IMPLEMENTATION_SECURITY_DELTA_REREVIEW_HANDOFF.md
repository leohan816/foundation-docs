# Independent Phase A Implementation/Security Delta Re-review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

TARGET_SESSION: `agent-office-reviewer`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

REQUIRED_SKILL_SHA256:
`429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`

MODEL_EFFORT: `GPT-5.6 SOL / max` (verify live before review; never infer
from the session name)

REVIEW_CLASS: `LEVEL_3_AS1_B01_B09_IMPLEMENTATION_SECURITY_DELTA_REREVIEW`

## 1. Frozen coordinates

- candidate worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- candidate branch: `feature/as1-multi-team-slack-pilot-001`
- reviewed design/base:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- initial rejected source:
  `aac3e515ca05b89545688f84a4c17e4be12fa29d`
- final patched source:
  `0e4274f427904302d67a0de1e78cde60512b94b3`
- corrected Worker result:
  `6bc5325d42d54e384aea64021a9806439e06c5d0`
- corrected Worker pointer / candidate branch tip:
  `6a2ca191cf3b03a53a4c612ddf7d425e87fbc543`
- corrected Worker result SHA256:
  `5974e18c83b4d17044ee003714d2236e74694fb12f223347d14699fa8c83ca8c`
- initial independent `NEEDS_PATCH` result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/20_IMPLEMENTATION_SECURITY_REVIEW_RESULT.md`
- initial review result commit:
  `3100a717418d8a4dc17d0114aaa3daa8b14ac083`
- controlling V2 Worker patch handoff:
  `8b66a7337ae3813bebaa557e23dfe281915d2998`
- reviewed B01 transport-design delta:
  `4826cd11a23dbbe1a6dbd2d4983b919a6a94e7a7`
- independent B01 design-delta PASS:
  `4e62e865061d76768ce918ffc891bdc6ad4681c5`
- evidence-correction handoff:
  `ab3aecc39df9f8c6d3cd9c6230ed2336b198ba34`

Require the candidate and governance worktrees to be clean and upstream-equal
before starting. Freeze all coordinates above. Do not review a moving target.

## 2. Review method and scope

This is the same Reviewer's delta re-review of B01-B09. It is not a new broad
repository audit and it does not reopen accepted M1, M1.2, Living Office, or
organization design.

Review in this order:

1. read the Sentinel skill and its directly relevant references;
2. inspect the actual `aac3e515..0e4274f` patch and load-bearing surrounding
   code before relying on Worker or Advisor summaries;
3. use `81a8c347..0e4274f` only to verify integrated contract conformance and
   protected boundaries;
4. verify each prior B01-B09 finding against actual code and tests;
5. reproduce the exact proportionate gates in section 4;
6. audit the corrected Worker result and pointer for accuracy;
7. inspect Setup Pack, as-built, operations, and FEATURE_INDEX truthfulness;
8. return one explicit verdict.

Do not duplicate the prior design review, reread unrelated history, or rerun
unrelated suites without a concrete finding that requires it.

## 3. Mandatory B01-B09 closure gates

### B01 - Socket identity and public transport seam

- public-root `ws@8.21.1` only; no production `@slack/socket-mode` import;
- bounded fetch/URL/hello/event frame parsing and exact App identity proof;
- one-use manual ACK, no provider retry/reconnect, redacted logs, safe close;
- exact TypeScript 6.0.3 NodeNext package-root contract with
  `skipLibCheck:false` and public `terminate()`.

Verify the exact dependency delta: `package.json` and `package-lock.json`
remove `@slack/socket-mode@3.0.0`, add runtime `ws@8.21.1`, add dev
`@types/ws@8.18.1`, and retain `@slack/web-api@8.0.0`. This patch includes
package and lockfile changes.

### B02 - durable ACK and recovery

- exact hash-bound `PREACK_PENDING -> terminal pre-ACK decision ->
  TRANSPORT_ACK_RECORDED -> MATERIALIZED|TERMINAL_NO_INTAKE` behavior;
- duplicate/restart/crash recovery reproduces only the exact durable decision;
- post-ACK materialization is once-only and does not reopen a Socket or reapply
  current receive-grant expiry.

### B03 - closed continuation kinds

- top-level creates only `NEW_MISSION`;
- a correlated thread reply persists only its already-fixed `CLARIFICATION` or
  `DECISION_RESPONSE` contract;
- Slack text cannot select or create a response kind.

### B04 - authority and exact delivery

- immutable receive-grant Git provenance and required snapshots are verified;
- caller cannot supply capability, target, session/pane, path, buffer, command,
  profile, or trusted time;
- grant/lease/capability are one-use and atomically consumed;
- every interrupted nonterminal delivery phase fails closed without blind
  retry.

### B05 - control, latches, locking, and shutdown

- closed transitions and closed profile vocabulary;
- strict control parsing and irreversible persisted kill/latches;
- no deletion/reset recovery path;
- lock ownership, bounded queue/drain, and clean/ambiguous shutdown behavior;
- every dequeue and side effect rechecks the owning profile control.

### B06 - evidence provenance

- bounded read-only `execFile` Git verifier with closed argv and `shell:false`;
- repository/commit/path/blob/ancestry/first-addition and stage correlations are
  exact and profile-bound;
- duplicate evidence requires exact equality;
- contradiction/quarantine durably latches the owning profile.

### B07 - outbound same-thread delivery

- target, token, bot identity, and thread derive only from the selected fixed
  profile and accepted immutable correlation;
- journal is durable before send and terminal/ambiguous phases never resend;
- real adapter error classification fails closed;
- only structured, redacted, bounded same-thread output is possible.

### B08 - external and durable bounds

- every external frame and durable index uses strict exact-key/type/size/count/
  phase/hash parsing on read;
- queue, retention, timestamp, output, and shutdown limits have owning call
  sites;
- corruption and capacity failures persist the required latch;
- no unchecked cast silently accepts durable state.

### B09 - evidence and operations truth

- `redacted-check` says `LOCAL_SYNTAX_ONLY`, `LIVE_IDENTITY_PROOF:
  NOT_PERFORMED`, and `RESULT: LOCAL_SYNTAX_PASS`;
- Setup Pack, as-built, FEATURE_INDEX, Worker result, and pointer describe the
  actual candidate without live-readiness or completion overclaim;
- corrected result cites the exact review path/commit, exact dependency delta,
  safe rollback posture, and superseded evidence history.

## 4. Proportionate reproduction

Run only the 16 AS1-focused files:

- `tests/adapters/as1-slack-git-provenance.test.ts`
- `tests/adapters/as1-slack-sdk-adapter.test.ts`
- `tests/adapters/as1-slack-socket-client.test.ts`
- `tests/adapters/as1-slack-socket-frame.test.ts`
- `tests/contract/as1-slack-profiles.test.ts`
- `tests/integration/as1-slack-evidence-ingress.test.ts`
- `tests/integration/as1-slack-exact-transport.test.ts`
- `tests/integration/as1-slack-inbound.test.ts`
- `tests/integration/as1-slack-outbound.test.ts`
- `tests/integration/as1-slack-startup-auth.test.ts`
- `tests/integration/as1-slack-thread-correlation.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`
- `tests/recovery/as1-slack-recovery.test.ts`
- `tests/security/as1-slack-authority-lifecycle.test.ts`
- `tests/security/as1-slack-durable-boundaries.test.ts`
- `tests/security/as1-slack-secret-config.test.ts`

Also run only these four protected regressions:

- `tests/contract/organization-registry.test.ts`
- `tests/integration/advisor-inbox.test.ts`
- `tests/integration/exact-advisor-delivery.test.ts`
- `tests/operations/readiness.test.ts`

Then run:

- `npm run typecheck`;
- ESLint over only TypeScript paths changed in `81a8c347..0e4274f`;
- `npm run build:core`;
- `npm audit --audit-level=high`;
- `git diff --check 81a8c347..0e4274f`;
- exact package-root compile/provenance checks already represented by the
  focused adapter tests;
- targeted scans for secrets, suppressions, deep imports, unsafe casts, dynamic
  target/profile/path/command/capability/time inputs, reset paths, historical
  physical fallback, and stale live-readiness claims;
- clean/upstream equality and protected-path diff checks.

Record every failed or skipped command. Do not run Living Office, visual,
browser, broad E2E, broad repository tests, live network, real Slack, real
tokens, real tmux mutation, or owner setup.

## 5. Phase A truth boundary

The accepted design requires Phase A validation to use fake Slack/tmux ports
and disposable state. `composition.ts` intentionally does not compose a live
receive loop, and no production tmux mutation port is built. Verify that:

- this disconnected state conforms to the exact reviewed Phase A design;
- no live path is accidentally reachable;
- documents do not claim that tokens alone make a real pilot runnable;
- the later owner/live-activation gate remains explicit and fail-closed.

A `PASS` means only that this default-disconnected synthetic Phase A candidate
conforms to the reviewed design and is ready for the owner-setup gate. It does
not authorize owner setup, create Slack apps, activate transport, deliver to
tmux, run a real pilot, accept risk, or grant final mission approval.

If the actual code/design/mission relationship cannot support that exact
classification, do not hide it. Return the appropriate verdict and concrete
finding.

## 6. Independence and output

The Reviewer must not modify the candidate, patch code, access/create secrets,
connect Slack, send tmux input, perform owner setup, dispatch an actor, accept
risk, or approve the mission. No agents or subagents.

Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/32_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/32_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_RESULT_POINTER.md`

Commit each artifact in protocol order, non-force push the governance branch,
prove clean/upstream equality, return the exact pointer to
`agent-office-advisor`, and STOP.

Return exactly one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`NEEDS_PATCH` returns through the Advisor to the same Worker and then this same
Reviewer. `PASS_WITH_RISK` or `FAIL` returns to Leo/GPT through the Advisor.
