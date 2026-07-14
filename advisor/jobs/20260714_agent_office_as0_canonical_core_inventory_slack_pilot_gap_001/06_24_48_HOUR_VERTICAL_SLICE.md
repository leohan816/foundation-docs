# Exact 24-48 Hour Slack Vertical Slice

## Product Slice

One private Slack app, Socket Mode, one manually mapped Agent Office Team
channel, Leo-only input, three read-only queries, and one real synthetic
non-sensitive mission round trip through the existing Agent Office Advisor.

## Accepted Input

- messages must be an app mention or an explicitly registered bounded command;
- sender, workspace, and channel must exactly match the allowlist;
- ordinary channel messages are ignored;
- no file upload, arbitrary command, pane/session target, Worker target, or
  Reviewer target is accepted.

## WorkUnits

| ID | WorkUnit | Completion evidence |
|---|---|---|
| `AS0-SP-01` | Establish exact branch/worktree and reconcile reviewed organization module with Agent Office Advisor decision | clean diff, registry tests, Foundation Advisor absent |
| `AS0-SP-02` | Add owner-controlled Slack config, minimal scopes record, secret injection, allowlist validation, and redaction | schema tests, permissions checks, secret scan |
| `AS0-SP-03` | Implement Socket Mode envelope adapter, bounded parser, ACK, reconnect/backoff, and durable event dedupe | fake-client lifecycle/restart tests |
| `AS0-SP-04` | Implement `status`, `agents`, and `missions` read-only projections | projection fixtures proving unknown/stale truthfulness |
| `AS0-SP-05` | Persist immutable Slack correlation/Mission Intake and call existing Advisor Inbox/gateway path | artifact/event/restart/idempotency tests |
| `AS0-SP-06` | Select accepted Advisor result, reply to the same thread, and persist reply/audit receipts | wrong-thread, duplicate, unverified-result, and restart tests |
| `AS0-SP-07` | Run focused regression, type, lint, build, dependency, security, and recovery gates | exact command/result record; no Living Office suite |
| `AS0-SP-08` | Owner-gated local real Slack -> Advisor -> Slack rehearsal, safe stop, independent review, and Advisor audit | stage-by-stage evidence, fresh one-use authority, no listener/process residue |

## Execution Order

```text
AS0-SP-01
-> AS0-SP-02
-> AS0-SP-03
-> AS0-SP-04
-> AS0-SP-05
-> AS0-SP-06
-> AS0-SP-07
-> independent security/authority review
-> owner credential and one-use authority gate
-> AS0-SP-08
-> same Reviewer delta review if patched
-> Advisor final audit
-> Leo/GPT decision
```

## Targeted Test Policy

During implementation, run tests directly affected by each WorkUnit. At the
candidate boundary run:

- new Slack adapter/config/parser/dedupe tests;
- `advisor-inbox.test.ts`;
- `http-advisor-message.test.ts` where the shared application boundary changes;
- `tmux-advisor-gateway.test.ts`;
- relevant exact-delivery cases, not unrelated visual cases;
- `decision-authority-evidence.test.ts`;
- `lifecycle-audit.test.ts` and `audit-log.test.ts`;
- organization registry/projection tests if reconciled;
- writer-lock/restart/recovery tests if composition changes;
- lint, strict typecheck, core/application build, dependency audit, and secret
  scan.

Do not rerun Living Office visual suites. A complete broad suite is required
only if a shared event/store/runtime contract change creates a concrete broad
regression risk; the reason must be recorded first.

## Success State

```text
SLACK_SOCKET_MODE: ONE_PRIVATE_APP_CONNECTED
ALLOWLIST: ONE_WORKSPACE__ONE_LEO_USER__ONE_TEAM_CHANNEL
READ_QUERIES: STATUS__AGENTS__MISSIONS_PASS
MISSION_INTAKE: IMMUTABLE_AND_IDEMPOTENT
ADVISOR_DELIVERY: EXISTING_FIXED_GATEWAY__ONE_USE_AUTHORITY
ADVISOR_ACK: RECORDED_SEPARATELY
SLACK_RESULT: SAME_THREAD__STRUCTURED_EVIDENCE_ONLY
FOUNDATION_ADVISOR: NOT_CREATED
WORKER_REVIEWER_SLACK_DISPATCH: FORBIDDEN
```
