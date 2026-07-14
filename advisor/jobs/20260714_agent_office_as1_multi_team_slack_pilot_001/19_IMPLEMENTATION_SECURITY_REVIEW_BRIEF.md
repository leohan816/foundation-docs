# Independent Phase A Implementation and Security Review Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

REVIEW_CLASS: `LEVEL_3_SLACK_TRANSPORT_IMPLEMENTATION_SECURITY_REVIEW`

Review the actual product code and tests before relying on Worker or Advisor
summaries. This is a full relevant-diff implementation/security review of the
frozen Phase A candidate, not a broad repository audit and not a live pilot.

## Frozen inputs

- Reviewed design/base:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- Source candidate:
  `aac3e515ca05b89545688f84a4c17e4be12fa29d`
- Worker result:
  `5e52078b5ecfee867b6ae0809058a5f5012b3544`
- Worker pointer:
  `16e3720318239e1466f16a526e23819ba1bd0702`
- Worker result SHA256:
  `dafc6a624a9a69aa0507f5879a005120d027d66441e540de4ce20cd2f3a57bf1`
- Final design PASS governance commit:
  `a220c3e80059002b19bf9e41b89bd3069598e927`
- Advisor candidate validation: `18_ADVISOR_CANDIDATE_VALIDATION.md`

## Required review order

1. Inspect the actual `81a8c34..aac3e51` diff and load-bearing existing
   primitives.
2. Verify code-to-reviewed-design conformance and security invariants.
3. Reproduce the exact focused tests and gates.
4. Audit the Worker result for accuracy and omissions.
5. Inspect Setup Pack and operations/as-built documentation.
6. Return one explicit verdict.

## Mandatory implementation and security gates

1. Exactly two closed profiles exist; no Slack, message, CLI, or caller input
   can select Team, Actor, profile, session, pane, workspace, path, command,
   model, or effort.
2. Agent Office retains immutable historical join key `foundation-advisor`
   while routing only as `agent-office-advisor`; Foundation uses fresh
   `foundation-advisor-20260714-01`. No evidence transfer or physical fallback
   exists.
3. Secret parsing is exact-key, bounded, owner-only, no-follow, regular-file,
   `0700` parent / `0600` file, strict UTF-8, no source/eval/dotenv/env merge,
   and fully redacted on every failure/status path.
4. The two Slack apps are independently authenticated. Bot token, App token,
   workspace, App, channel, and Leo identity swaps or mismatches fail closed
   before intake.
5. The pre-event receive grant cannot contain event/intake/pointer/destination
   authority and is required before connection; gateway code cannot mint it.
6. Durable receipt and the exact serialized root/question transition happen
   before Socket ACK. Transition-time trusted-local expiry is the sole
   eligibility decision. Receipt time never freezes eligibility.
7. Post-ACK materialization runs only from exact durable ACK-recorded state,
   once, and does not reapply current grant expiry or reopen a Socket.
8. Top-level Leo message creates at most one `NEW_MISSION`; a thread reply can
   become only exact pending-question `CLARIFICATION` or `DECISION_RESPONSE`.
   DMs, queries, edits/deletes, bots/apps, wrong users/channels/workspaces,
   retries, echoes, second roots, and unsupported events create no Mission.
9. Receipt, envelope/event dedupe, root/question correlation, grants,
   capabilities, latches, journals, evidence, outbox, and capacity limits are
   separate per profile; no silent eviction or cross-Team fallback is possible.
10. Pointer delivery requires the separate Advisor-created post-intake grant,
    fresh readiness lease, in-memory capability, exact destination validation,
    one-use consumption, double preflight, and no retry at/after paste start.
11. Advisor evidence is immutable, Git-provenance checked through a narrow
    injected port, ordered ACK -> intake -> question/result, profile-bound, and
    rejects historical Foundation lineage.
12. Outbound Slack is same-thread, structured, redacted, durable before send,
    limited to exact `chat.postMessage`, has bounded explicit safe retries, and
    never blindly resends an ambiguous request.
13. Global kill, profile latch, corruption quarantine, single-process lock,
    bounded drain, shutdown, replay, and rollback fail closed.
14. Official SDK imports are public roots only; provider retries and automatic
    reconnect are disabled; strict TypeScript remains enabled without
    suppressions or lint weakening.
15. Default composition cannot connect, mint authority, send tmux input, or
    activate a pilot. Phase A uses only fake Slack/tmux/Git ports and disposable
    state roots. A real connection, real tokens, real tmux mutation, and owner
    setup are outside this candidate and must remain absent.
16. Existing Exact Delivery v2, Advisor inbox, organization identity history,
    browser authority, and M1 behavior remain byte/behavior compatible.
17. Setup Pack contains two non-impersonating manifests, the exact ten-key
    template, owner-only secret path/modes, safe commands, kill/recovery steps,
    and no secret. Operations and FEATURE_INDEX match the as-built code.
18. Worker report coordinates, test totals, failures, limitations, and
    attestations are accurate. No omitted failure or unsupported completion
    claim is accepted.

## Proportionate reproduction

Run only:

- the 11 AS1 focused test files named in the Worker result;
- `organization-registry`, `advisor-inbox`, `exact-advisor-delivery`, and
  `readiness` focused regressions;
- `npm run typecheck`;
- changed-file eslint;
- `npm run build:core`;
- `npm audit --audit-level=high`;
- `git diff --check 81a8c34..aac3e51`;
- targeted secret/suppression/deep-import/dynamic-target scans;
- Git ancestry, clean/upstream equality, and protected-path diff checks.

Do not run Living Office, visual, browser, broad E2E, unrelated suites, live
network, real Slack, real tmux mutation, or owner setup.

## Verdict contract

Return exactly one of:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS_WITH_RISK` returns to Leo/GPT. `NEEDS_PATCH` returns to the same
`agent-office-opus` Worker and the same Reviewer re-reviews the exact delta.
The Reviewer must not patch, implement, accept risk, or grant Founder approval.
