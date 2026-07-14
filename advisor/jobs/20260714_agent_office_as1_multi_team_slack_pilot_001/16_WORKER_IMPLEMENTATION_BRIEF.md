# Phase A Worker Implementation Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

MODEL_EFFORT: `Opus 4.8 / Ultracode` (verify live; never infer from the session
name)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

SKILL_SHA256:
`9a5afeefd34775a918b83900aa19859278f4e151a067cf6ab82cb6a25757091b`

## 1. Exact implementation coordinates

- Worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Branch: `feature/as1-multi-team-slack-pilot-001`
- Frozen implementation parent:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- Reviewed design package:
  - `docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md`
  - `docs/security/AGENT_OFFICE_AS1_SLACK_SECURITY_AUTHORITY_MODEL.md`
  - `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
- Independent design PASS:
  `a220c3e80059002b19bf9e41b89bd3069598e927`
- Advisor design acceptance: `15_ADVISOR_DESIGN_ACCEPTANCE.md`

Before editing, verify the exact worktree, branch, parent, clean/upstream-equal
state, role instructions, skill hash, and absence of another writer. Read the
reviewed design from the frozen target, not from memory or summaries.

## 2. Phase A objective

Implement a default-disabled, synthetic-only shared Slack Gateway with exactly
two closed profiles:

| Profile | Team | Actor | roleInstanceId | Workspace |
|---|---|---|---|---|
| `AGENT_OFFICE_ADVISOR` | Agent Office Team | `agent-office-advisor` | `foundation-advisor` | `/home/leo/Project/agent-office` |
| `FOUNDATION_ADVISOR` | Foundation Team | `foundation-advisor` | `foundation-advisor-20260714-01` | `/home/leo/Project/FOUNDATION` |

The first profile preserves the continuing Actor's immutable historical join
key but never uses that key as a physical destination. The second profile is a
new Actor with a new immutable join key. No historical evidence is transferred.

All Phase A Slack and tmux ports are fakes. The default descriptor has no live
receive-grant ref and cannot connect, deliver, mint authority, or select a
profile. Implement production-shaped boundaries without using real tokens,
Slack, DNS/HTTP/WebSocket, or tmux mutation.

## 3. Required WorkUnits

Execute serially in this dependency order, keeping commits reversible:

1. `AS1-WU-01`: closed profiles, exact schemas/parsers, redaction primitives.
2. `AS1-WU-02`: profile-local roots, receipt/dedupe, receive binding, root and
   question state, exact atomic transitions.
3. `AS1-WU-03`: narrow Socket/Web ports, pair verification, disabled adapters.
4. `AS1-WU-04`: persist/bind-before-ACK service, post-ACK materializer,
   top-level/thread classification, expiry/recovery cases.
5. `AS1-WU-05`: post-intake pointer-delivery grant, readiness lease,
   in-memory capability, separate exact tmux journal/runner.
6. `AS1-WU-06`: profile-bound ACK/intake/question/result evidence ingress.
7. `AS1-WU-07`: rendered same-thread outbox and no-blind-resend state machine.
8. `AS1-WU-08`: kill/latches, replay, lock, bounded drain, shutdown/rollback.
9. `AS1-WU-09`: default-disabled composition, CLI, pinned packages, operations.
10. `AS1-WU-10`: focused compatibility gates, as-built docs, durable evidence.

Do not stop between routine WorkUnits. Resolve ordinary implementation/test
failures within this train and report every failure honestly.

## 4. Fixed implementation limits

These values close the reviewed design's numeric-capacity gate. They are AS1
pilot constants, not configurable Slack input:

| Limit | Exact value |
|---|---:|
| secret file / raw Socket envelope | 32,768 UTF-8 bytes each |
| inbound or outbound message text | 16,384 UTF-8 bytes and 4,000 Unicode scalar values |
| provider response body / subprocess output | 65,536 bytes each |
| JSON nesting depth | 8 |
| any parsed array | 16 entries |
| external/internal opaque ID | 128 UTF-8 bytes |
| Slack timestamp | 32 ASCII bytes |
| artifact/evidence ref | 512 UTF-8 bytes |
| root slots / conversations per receive grant | 1 / 1 |
| simultaneously open questions per root | 1 |
| durable receipt records per profile | 128 |
| envelope and event dedupe records per profile | 256 each |
| question/continuation history per profile | 32 |
| intake correlations per profile | 32 |
| pointer-delivery/lease/capability journal records per profile | 64 |
| evidence-ingress records per profile | 128 |
| outbox records per profile | 128 |
| minimal denial-audit records per profile | 256 |
| in-memory queue / in-flight side effects per profile | 32 / 1 |
| automatic retention floor after terminal state | 90 days |
| receive-grant maximum lifetime | 15 minutes |
| pointer-delivery-grant maximum lifetime | 5 minutes |
| readiness lease / in-memory capability maximum lifetime | 30 seconds |
| startup identity call / Socket hello timeout | 10 seconds each |
| outbound Web API request timeout | 10 seconds |
| Git or tmux subprocess timeout | 10 seconds |
| clean shutdown / offline drain deadline | 15 seconds each |
| outbound attempts | maximum 3 total attempts |
| safe retry backoff | 250 ms, then 1,000 ms; accepted `Retry-After` maximum 5 seconds |

No AS1 automatic deletion, compaction, or silent eviction is authorized.
Crossing a count, size, time, or retention capacity must persist a stable reason
and latch the affected profile; a cross-profile/global contradiction latches
globally. Tests use disposable roots and may advance a fake clock.

## 5. Exact allowed target paths

### New source

- `src/application/slack-pilot/contracts.ts`
- `src/application/slack-pilot/profiles.ts`
- `src/application/slack-pilot/inbound-store.ts`
- `src/application/slack-pilot/service.ts`
- `src/application/slack-pilot/evidence-ingress.ts`
- `src/application/slack-pilot/outbox.ts`
- `src/adapters/gateways/slack-pilot/secret-config.ts`
- `src/adapters/gateways/slack-pilot/socket-client.ts`
- `src/adapters/gateways/slack-pilot/web-client.ts`
- `src/adapters/gateways/slack-pilot/exact-authority.ts`
- `src/adapters/gateways/slack-pilot/exact-transport.ts`
- `src/operations/readiness/as1-slack-control.ts`
- `src/runtime/as1-slack-pilot/composition.ts`
- `src/runtime/as1-slack-pilot/cli.ts`

### Configuration and package metadata

- `config/agent-office.as1-slack-pilot.disabled.json`
- `package.json`
- `package-lock.json`

Pin public package-root imports only:

- `@slack/socket-mode@3.0.0`
- `@slack/web-api@8.0.0`

Do not add another dependency, deep import, patch-package override, global
toolchain change, type suppression, or automatic provider retry. If either
package cannot satisfy manual ACK, disabled reconnect, strict TypeScript 6.0.3,
`skipLibCheck: false`, and fake-port injection without weakening the design,
stop and return the exact material blocker before substituting a package.

### Focused tests and helper

- `tests/helpers/as1-slack-fakes.ts`
- `tests/contract/as1-slack-profiles.test.ts`
- `tests/security/as1-slack-secret-config.test.ts`
- `tests/integration/as1-slack-startup-auth.test.ts`
- `tests/security/as1-slack-authority-lifecycle.test.ts`
- `tests/integration/as1-slack-inbound.test.ts`
- `tests/integration/as1-slack-thread-correlation.test.ts`
- `tests/integration/as1-slack-exact-transport.test.ts`
- `tests/integration/as1-slack-evidence-ingress.test.ts`
- `tests/integration/as1-slack-outbound.test.ts`
- `tests/recovery/as1-slack-recovery.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`

### Documentation and result evidence

- `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
- `docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md`
- `docs/FEATURE_INDEX.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT_POINTER.txt`

The two manifests, ten-key environment template, reviewed integration/security
designs, and every other file are read-only. Do not broaden this allowlist
without an exact Advisor patch handoff.

## 6. Protected compatibility surfaces

Do not modify:

- `src/adapters/gateways/tmux-advisor/exact-config.ts`
- `src/adapters/gateways/tmux-advisor/exact-authority.ts`
- `src/adapters/gateways/tmux-advisor/exact-transport.ts`
- `src/application/advisor-inbox/evidence-ingress.ts`
- existing Exact Delivery v2 schemas, config, journals, artifacts, and tests
- existing `AdvisorInboxService` contracts
- organization registry identity/history

Reuse only low-level validation, canonical JSON, hashing, containment,
owner-only file, atomic append/write, Git verification, and structured tmux
observation primitives. AS1 owns separate schemas, roots, journals, ingress,
latches, grants, and capabilities. Never add a profile selector or generic
target to v2.

## 7. Required behavior and security checks

Implement and test all reviewed gates, including:

- exactly two compile-time/runtime profile literals and no dynamic target;
- strict regular-file/owner/mode/no-follow/exact-key secret parsing with
  double-stat race protection and complete redaction;
- startup `auth.test` + `bots.info` + Socket `hello` identity proof, including
  every swapped token/App and wrong workspace/App negative through fakes;
- exact workspace + Leo + channel + App/profile validation;
- DM, App Home, public/shared channel, edit/delete/subtype, bot/app/echo,
  wrong-user/workspace/channel/App, malformed, deferred query, and
  uncorrelated-reply rejection;
- receipt and both dedupe keys plus atomic root/question transition before ACK;
- no ACK on persistence/transition failure;
- sole trusted-local transition-time expiry decision and all six reviewed
  expiry/restart/retry cases;
- one top-level intake, one root, one fixed-kind pending question, and
  same-thread `CLARIFICATION` or `DECISION_RESPONSE` continuation only;
- receive-grant forbidden-field rejection and no gateway/CLI grant creation;
- post-intake pointer-delivery grant required before any lease/capability/tmux
  state; permanent one-use consumption and two preflights;
- per-profile physical isolation and global latch on cross-profile references;
- exact Foundation fresh lineage and no historical evidence transfer;
- immutable ordered ingress and exact Git provenance negatives;
- same-thread structured outbound, no raw prompt/log/secret, and no blind
  resend after ambiguity;
- kill before every dequeue/side effect, lock contention, restart replay,
  bounded offline drain, forced timeout, clean shutdown, and default-disabled
  rollback;
- attempted real network or real tmux mutation fails immediately in Phase A.

`status`, `agents`, and `missions` are not Slack commands. They must not create
Missions. Operational CLI `status` is local, redacted, read-only process state.

## 8. Required commands and focused gates

Run and report exact results for:

```sh
npm run typecheck
npx eslint <all changed .ts/.tsx files>
npx vitest run --maxWorkers=1 \
  tests/contract/as1-slack-profiles.test.ts \
  tests/security/as1-slack-secret-config.test.ts \
  tests/security/as1-slack-authority-lifecycle.test.ts \
  tests/integration/as1-slack-startup-auth.test.ts \
  tests/integration/as1-slack-inbound.test.ts \
  tests/integration/as1-slack-thread-correlation.test.ts \
  tests/integration/as1-slack-exact-transport.test.ts \
  tests/integration/as1-slack-evidence-ingress.test.ts \
  tests/integration/as1-slack-outbound.test.ts \
  tests/recovery/as1-slack-recovery.test.ts \
  tests/operations/as1-slack-lifecycle.test.ts
npx vitest run --maxWorkers=1 \
  tests/contract/organization-registry.test.ts \
  tests/integration/advisor-inbox.test.ts \
  tests/integration/exact-advisor-delivery.test.ts \
  tests/operations/readiness.test.ts
npm run build:core
npm audit --audit-level=high
git diff --check 81a8c3474380a7e427516d6f5e57c97ad88c6c9b..HEAD
```

Also run a changed-file secret/static scan that rejects token-shaped values,
private keys, `source`/`eval`, shell interpolation, generic Slack method/route,
generic tmux target, dynamic profile selection, deep Slack imports,
`eslint-disable`, `@ts-ignore`, and `@ts-expect-error`. Record every failed command,
including failures later corrected. Do not run Living Office, visual, browser,
broad E2E, VibeNews, live Slack, real-token, real-tmux, or unrelated suites.

## 9. Operations and default-disabled proof

Implement the documented local command forms:

```sh
npm run as1:slack-pilot -- start --env-file /home/leo/.config/agent-office/as1-slack-pilot.env
npm run as1:slack-pilot -- stop --env-file /home/leo/.config/agent-office/as1-slack-pilot.env
npm run as1:slack-pilot -- restart --env-file /home/leo/.config/agent-office/as1-slack-pilot.env
npm run as1:slack-pilot -- status --env-file /home/leo/.config/agent-office/as1-slack-pilot.env
npm run as1:slack-pilot -- redacted-check --env-file /home/leo/.config/agent-office/as1-slack-pilot.env
```

Phase A must exercise these only with fake ports and synthetic placeholder data.
With the committed descriptor and no reviewed receive-grant ref, `start` must
return a stable disconnected/authority-missing result without opening Slack or
tmux. `redacted-check` may parse/validate a disposable synthetic owner-only file
but may not contact real Slack in Phase A.

## 10. Git and durable result protocol

Use explicit-path staging and non-force push only. Preserve unrelated work. Do
not merge, force push, push to `main`, alter another branch/worktree, dispatch an
actor, or start owner/live work.

Use this commit sequence:

1. one or more bounded implementation commits;
2. a frozen source-candidate commit after all checks;
3. one result-only commit adding `WORKER_RESULT.md` with the source candidate,
   complete command/failure ledger, diff, limits, dependencies, tests, status,
   rollback, and scope attestations;
4. one pointer-only commit adding `WORKER_RESULT_POINTER.txt` with exact source
   candidate/result coordinates and hashes.

The result must include:

- actual session/model/effort and skill hash;
- branch, base, source candidate, result commit, pointer commit;
- exact changed files and diff stat;
- requirements/WorkUnits and reused primitives;
- every command and result, every failure/retry, no inaccurate totals;
- dependency versions/audit and strict TypeScript/lint state;
- network/tmux fake-only attestation and default-disabled proof;
- secrets absent/redacted; owner setup not performed;
- protected v2 byte/behavior compatibility;
- known limitations and remaining owner-only values;
- rollback to `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`;
- clean, non-force-pushed, upstream-equal status;
- no agents/subagents, no Designer/Reviewer action, no next mission.

Return the pointer to `agent-office-advisor` and STOP. The same independent SOL
Sentinel Reviewer, not the Worker, owns implementation/security review.
