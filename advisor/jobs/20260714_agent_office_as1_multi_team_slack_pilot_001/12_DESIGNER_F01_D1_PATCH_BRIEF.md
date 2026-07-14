# Designer F01-D1 Expiry Patch Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Designer

PATCH_CLASS: `ROUTINE_BOUNDED_DESIGN_CORRECTION`

SOURCE_VERDICT: `NEEDS_PATCH`

SOURCE_FINDING:
`F01-D1_HIGH_RECEIVE_GRANT_EXPIRY_HAS_TWO_INCOMPATIBLE_DECISION_POINTS`

Apply only the expiry/recovery correction required by the same independent
Reviewer. Preserve every unaffected PASS finding and the established two-stage
receive/pointer-delivery authority split. Do not redesign the package.

## Exact decision

1. For a new root or correlated continuation, the authoritative receive-grant
   expiry comparison occurs at the serialized atomic state-transition
   linearization point under the trusted local clock. The transition's exact
   `boundAt` or question-consumption decision time must be strictly earlier than
   the grant's exclusive `expiresAt`.
2. A durable receipt created before expiry does **not** freeze eligibility. If
   `PREACK_PENDING` recovery finds no already-committed root-binding or
   question-consumption transition and the grant has expired, it records the
   terminal expiry rejection. It must not create a late binding or consume a
   question.
3. If recovery finds an exact valid transition already committed before expiry,
   it resumes from that transition without repeating it. Duplicate transport
   retry may reproduce only the durable ACK decision.
4. Once a bound-root or consumed-continuation decision reaches durable
   `TRANSPORT_ACK_RECORDED`, asynchronous intake/pointer materialization is
   driven only by that immutable accepted decision and its integrity/profile
   checks. It must not reapply a current-time `unexpired` receive predicate.
5. Expiry closes new receive and Socket reopen. It does not revoke or drop
   already ACK-recorded local materialization. A restart with an expired grant
   cannot reopen the Socket but may resume bounded local drain of exact
   ACK-recorded decisions. Kill, latch, corruption, and ambiguity controls
   remain fail closed and unchanged.
6. Separate the pre-ACK eligibility function from the post-ACK materializer
   predicate everywhere. Do not leave wording that says they use one common
   live-unexpired policy.

## Required contract cases

Add exact proposed tests/acceptance cases for:

- receipt before expiry, missing transition recovered after expiry -> terminal
  expiry rejection, no root/question/intake;
- root transition committed before expiry, crash before ACK -> exact replay,
  no second transition/intake;
- ACK recorded before expiry, materialization after expiry -> one intake and
  pointer;
- ACK recorded before expiry, restart after expiry -> no Socket reopen, one
  local materialization from the accepted decision;
- grant expires before a new root/question transition -> rejection;
- duplicate retry after expiry -> ACK reproduction only from exact durable
  state, no business-state replay.

## Allowed target paths

1. `docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md`
2. `docs/security/AGENT_OFFICE_AS1_SLACK_SECURITY_AUTHORITY_MODEL.md`
3. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
4. `artifacts/as1-multi-team-slack-pilot/DESIGNER_F01_D1_PATCH_RESULT.md`
5. `artifacts/as1-multi-team-slack-pilot/DESIGNER_F01_D1_PATCH_RESULT_POINTER.txt`

Do not rewrite prior Designer or Reviewer evidence. Both manifests and the
environment template must remain byte-identical. No source, test, package,
lockfile, runtime, Exact Delivery v2, secret, live Slack, or tmux mutation is
authorized.

## Required evidence and STOP

- Inspect exact base `86c7edb3f5cee26171fcb80c0704c46962d15be6`.
- Validate exact five-path scope, ancestry, clean/upstream equality, frozen
  setup bytes, `git diff --check`, non-secret status, and the six cases above.
- Record every command failure and correction honestly.
- Commit the three-document package first, then result, then pointer; non-force
  push each checkpoint.
- Return the pointer to `agent-office-advisor` and STOP. Do not dispatch
  Reviewer or Worker.
