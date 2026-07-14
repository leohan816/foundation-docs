# Independent F01 Design Delta Review Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

REVIEW_CLASS: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_DELTA_REVIEW`

Review only the patch for prior finding
`F01_HIGH_PRE_EVENT_RECEIVE_AUTHORITY_AND_POST_INTAKE_DELIVERY_AUTHORITY_CONFLATED`
and its load-bearing lifecycle interfaces. Reuse the same Reviewer's accepted
findings from the initial review. Do not repeat unaffected package review,
patch the candidate, implement runtime code, access secrets, connect Slack,
send tmux input, dispatch another actor, or accept risk.

## Frozen target

- Prior reviewed head:
  `ce250c05218cc6d9cc4f2f3b0c43b678b95ec776`
- F01 contract patch:
  `0d217149c609c827e99fcc1324e247a809c13ff4`
- F01 durable result:
  `fa9e7eccd22df07cce78c8a2349a31125314ecd9`
- Frozen delta-review head:
  `86c7edb3f5cee26171fcb80c0704c46962d15be6`

## Required gates

1. `As1PilotReceiveGrantV1` is a genuinely pre-event, committed/pushed,
   expiring, profile-local receive authorization. It cannot contain, infer, or
   mint future event, intake, pointer, destination, lease, capability, or
   delivery authority.
2. The first eligible top-level Leo event atomically persists receipt/dedupe
   and consumes the single root slot before transport ACK. The binding contains
   only facts then known and no future `intakeId`.
3. Duplicate/retry, competing roots, thread continuation, restart, partial
   pre-ACK crash, expiry, disconnect, kill, corruption, and cross-profile
   behavior cannot create a second root, second intake, reopened question, or
   authority extension.
4. Asynchronous materialization starts only after a durable ACK decision.
   Ambiguous or incomplete ACK state does not claim an intake or delivery.
5. `As1PointerDeliveryGrantV1` may exist only after the exact immutable
   `sourceEventId`, `intakeId`, root correlation, pointer ref, and pointer hash
   exist. Only this separate, Advisor-created, committed/pushed, one-use grant
   can authorize a fresh readiness lease and exact pointer attempt.
6. The gateway and lifecycle commands cannot mint, complete, renew, clone, or
   infer either grant. Absence of the post-intake grant remains fail closed at
   `AWAITING_POINTER_DELIVERY_GRANT` with no tmux authority.
7. Each grant and every state/journal namespace remains bound to one literal
   profile. There is no standing authority, generic destination, fallback,
   blind resend, credential swap, or cross-Team transfer.
8. Exact Delivery v2 schemas, history, journals, evidence joins, and current
   fixed destinations remain unchanged and authoritative only in their
   existing reviewed role.
9. Setup/start/restart/recovery text uses the same two-stage ordering and does
   not allow a lifecycle command to manufacture authority.
10. Both manifests and the ten-key environment template are byte-identical to
    the prior reviewed head. No source, test, package, lockfile, secret, live
    Slack, or tmux mutation entered the patch.
11. The Designer result accurately records scope, checks, failures, and the
    three-commit package/result/pointer sequence.

## Proportionate reproduction

- Inspect `ce250c0..86c7edb` and confirm exactly five changed paths.
- Inspect the complete F01 diff in the three package documents and only the
  affected load-bearing sections needed to test the gates above.
- Verify ancestry, clean/upstream-equal state, `git diff --check`, frozen
  manifest/environment blobs, and non-secret status.
- Reproduce narrow schema/lifecycle assertions. Do not run product, visual,
  browser, broad unit, live network, Slack, or tmux-mutation tests.
- Use current official Slack documentation only if a changed protocol claim
  cannot be established from the previously reviewed source evidence.

## Verdict

Return exactly one of:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS` means F01 is closed and the previously reviewed package remains eligible
for Advisor design acceptance. Any unresolved security uncertainty, authority
broadening, ambiguous ACK/replay behavior, or ability to synthesize delivery
authority cannot receive `PASS`. `PASS_WITH_RISK` returns to Leo/GPT. A routine
patchable defect returns `NEEDS_PATCH` through the same Designer and Reviewer.
