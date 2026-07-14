# Independent F01-D1 Design Delta Re-review Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

REVIEW_CLASS: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_DELTA_REREVIEW`

Review only closure of prior finding `F01-D1` and the exact affected lifecycle
interfaces. Carry forward every unaffected PASS finding from the initial review
and first delta review. Do not repeat manifest/Slack-protocol review, patch the
candidate, implement, access secrets, connect Slack, send tmux input, dispatch
another actor, or accept risk.

## Frozen target

- Prior delta-reviewed head:
  `86c7edb3f5cee26171fcb80c0704c46962d15be6`
- F01-D1 package commit:
  `509017f87982d9fa64e434b6f49f02c922f9c4b0`
- F01-D1 result commit:
  `f7744dc17c83b8d881a94d0bd6a574b24c398d86`
- Frozen re-review head:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`

## Required closure gates

1. The serialized atomic root-binding or question-consumption transition has
   one trusted-local linearization time and commits accepted state only when
   `boundAt`/`consumedAt < expiresAt`.
2. Durable receipt time, provider event time, parse time, and dedupe time do not
   freeze receive eligibility or permit a late root/question transition.
3. `PREACK_PENDING` recovery first detects an exact already-committed valid
   transition; if absent, it invokes the same serialized decision and terminally
   rejects at/after expiry. It cannot create a second transition or intake.
4. Post-ACK materialization has a distinct predicate. It requires exact durable
   `TRANSPORT_ACK_RECORDED` accepted state and never reapplies current receive-
   grant expiry.
5. An expired-grant restart remains disconnected and cannot bind or consume new
   receive state. It may only drain exact ACK-recorded local materialization
   once, while kill/latch/corruption/ambiguity remain fail closed.
6. The ordering is unambiguous: accepted atomic transition -> Socket ACK ->
   durable `TRANSPORT_ACK_RECORDED` -> one asynchronous materialization.
7. All six required expiry/recovery cases have exact outcomes and are carried
   into Worker checks/completion criteria.
8. The two grant schema blocks, Exact Delivery v2 boundary, profile isolation,
   no-minting rule, manifests, and environment template remain unchanged.
9. Setup/start/stop/restart semantics align with the same decision and cannot
   reopen a Socket or manufacture authority after expiry.
10. The Designer result accurately records scope, checks, failures, and the
    package/result/pointer sequence.

## Proportionate reproduction

- Inspect `86c7edb..81a8c34` and confirm exactly five changed paths.
- Inspect the complete three-document F01-D1 diff and only affected surrounding
  lifecycle/time sections.
- Verify ancestry, clean/upstream equality, `git diff --check`, frozen setup
  blobs, unchanged grant schema blocks, non-secret status, and all six cases.
- Do not run product, visual, browser, broad unit, live network, Slack, tmux-
  mutation, package, or unrelated checks.

## Verdict

Return exactly one of `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
`PASS` closes F01/F01-D1 and permits Advisor design acceptance and exact Worker
handoff. `PASS_WITH_RISK` returns to Leo/GPT. Any patchable remaining ambiguity
returns to the same Designer and same Reviewer.
