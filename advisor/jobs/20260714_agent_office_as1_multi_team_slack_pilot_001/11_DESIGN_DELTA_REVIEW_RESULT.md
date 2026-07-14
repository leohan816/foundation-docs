# Independent Sentinel F01 Design Delta Review Result

## Delta finding

### F01 — PARTIAL / F01-D1 HIGH — receive-grant expiry has two incompatible decision points

The core F01 correction is present: the frozen patch replaces the conflated
activation with a pre-event `As1PilotReceiveGrantV1`, an atomic one-root binding,
and a separate post-intake `As1PointerDeliveryGrantV1`. The gateway cannot mint
either grant, and no receive grant contains event, intake, pointer, lease,
capability, or tmux-destination authority.

The changed lifecycle nevertheless leaves expiry behavior internally
contradictory at two load-bearing boundaries:

- The integration contract says the pre-ACK eligibility decision **and later
  asynchronous materialization** use the same policy function and both require a
  valid, **unexpired** receive grant
  (`0d217149c609c827e99fcc1324e247a809c13ff4:docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md:410-427`).
- The same document says expiry after root binding must refuse new input but
  **drain already-durable work** (`...SLACK_DESIGN.md:632-657`) and says restart
  resumes materialization from a durable `TRANSPORT_ACK_RECORDED` decision while
  only reopening the Socket requires an unexpired grant
  (`...SLACK_DESIGN.md:912-936`).
- For a pre-ACK crash, the integration and security contracts say a
  `PREACK_PENDING` event must become an expiry rejection if expiry occurs before
  the missing root-binding transition (`...SLACK_DESIGN.md:393-408` and
  `0d217149...:docs/security/AGENT_OFFICE_AS1_SLACK_SECURITY_AUTHORITY_MODEL.md:376-381`).
- The security time contract instead says trusted durable **receive time** decides
  whether receive-grant expiry was exclusive
  (`...SECURITY_AUTHORITY_MODEL.md:701-712`).

Concrete failure scenarios:

1. A root is bound and its Socket ACK is durably recorded immediately before
   `expiresAt`; the asynchronous materializer runs immediately after. The shared
   unexpired predicate rejects materialization, while the expiry/restart rules
   require that already-durable accepted work to drain. The implementation must
   either drop an ACKed intake or ignore the shared policy contract.
2. Receipt/dedupe enters `PREACK_PENDING` just before expiry and recovery runs
   just after. Durable receive time says the event was pre-expiry, while the
   missing-transition rule forbids a late binding. The implementation cannot
   determine which time is authoritative without inventing behavior.

Impact: the patch can either extend receive authority after its exclusive expiry
or ACK an accepted root that never materializes into its one immutable intake.
Both outcomes affect the security/recovery contract required to close F01. The
Designer result's claim that expiry, partial pre-ACK crash, restart, and
materialization are aligned (`fa9e7eccd22df07cce78c8a2349a31125314ecd9:artifacts/as1-multi-team-slack-pilot/DESIGNER_F01_PATCH_RESULT.md:83-107,165-168`)
is therefore incomplete.

Required closure:

1. Name one exact expiry comparison instant for initial eligibility/root binding
   and `PREACK_PENDING` recovery. State whether pre-expiry durable receipt freezes
   eligibility or whether the atomic binding must itself complete before expiry;
   align the integration and security time rules to that choice.
2. Once `TRANSPORT_ACK_RECORDED` exists for a bound root or consumed continuation,
   drive materialization from that immutable accepted decision. Do not reapply a
   current-time `unexpired` receive predicate to already-durable work; expiry may
   close new receive while drain/restart completes that accepted work.
3. Add exact focused cases for receipt-before/transition-after expiry and
   ACK-recorded-before/materialization-after expiry, including restart.
4. Update the Designer evidence to report the corrected single source of truth,
   then return the exact documentation delta to this same Reviewer.

## Verdict

`NEEDS_PATCH`

F01's authority-stage separation is closed, but its required expiry/recovery and
post-ACK materialization behavior is not. This is a routine documentation-level
correction inside the existing F01 scope. The unresolved authority-time
ambiguity cannot receive `PASS` and does not authorize implementation, owner
setup, Slack connection, tmux input, risk acceptance, release, final approval,
or a next mission.

## Review coordinates

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Pass: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_DELTA_REVIEW`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Live process: `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh`
- Live read-only binding: `$25/@25/%25`, indexes `0/0`, workspace
  `/home/leo/Project/agent-office`, synchronized panes off, pane live, input on
- Prior verdict commit: `8cfe192b7bfba3fe2c93d01232aec314878cec99`
- Prior reviewed head: `ce250c05218cc6d9cc4f2f3b0c43b678b95ec776`
- F01 package commit: `0d217149c609c827e99fcc1324e247a809c13ff4`
- F01 result commit: `fa9e7eccd22df07cce78c8a2349a31125314ecd9`
- Frozen delta-review head: `86c7edb3f5cee26171fcb80c0704c46962d15be6`
- Delta handoff SHA-256:
  `15327373209b265eab2c1bdddc47b8ae4ab313e1c9dd0056e9b456be3f8c8611`

The frozen commits resolve immutably in the required linear order. At review
completion the target branch was clean and
`HEAD == upstream == 86c7edb3f5cee26171fcb80c0704c46962d15be6`.

## Authority and delta protocol

- Required `fable-sentinel` skill loaded directly; SHA-256 matched
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`.
- Relevant references loaded directly:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
  - `delta-review.md`:
    `31965d290395f16ca64939d1d755d587ed460ff828586538eafa58fa8de70749`
  - shared `failure-escalation.md`:
    `e62d6725799bcfa6de3f8a1a987f5ee8d7d1a7b398d9690b77064b89d532f128`
- The skill-linked role protocol was read directly and identified itself as
  `SUPERSEDED_HISTORICAL_EVIDENCE`; current frozen Agent Office operating and
  Reviewer role documents controlled.
- The initial verdict, exact F01 brief/handoff, delta brief/handoff, all five
  frozen changed files, and the complete three-document contract diff were read
  directly. Unaffected prior accepted gates were preserved and not reopened.

## Frozen delta and provenance

`ce250c0..86c7edb` contains exactly five authorized paths:

1. `docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md`
2. `docs/security/AGENT_OFFICE_AS1_SLACK_SECURITY_AUTHORITY_MODEL.md`
3. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
4. `artifacts/as1-multi-team-slack-pilot/DESIGNER_F01_PATCH_RESULT.md`
5. `artifacts/as1-multi-team-slack-pilot/DESIGNER_F01_PATCH_RESULT_POINTER.txt`

The package commit changes only paths 1-3. The next commit adds only the result,
and the frozen head adds only the pointer. Both evidence files have one exact Git
addition. Their current SHA-256 values are:

- Designer result:
  `35f2260d47e8c7ea2a0d70459c39b07578f7acbbe657e1bbfed00dbef9ef5bfd`
- Designer pointer:
  `885cbdaebc8b0ce28fac2cb4b7588057f5e97bdcd053ad243b9be002ceb89391`

The pointer correctly names package `0d217149...`, result `fa9e7ecc...`, prior
verdict `8cfe192...`, branch, result path, and upstream-equal status. The named
Designer authority commit `dab940cac2276f370d80b483854cb9e4a69388e7` exists,
is governance-branch ancestral, and contains the exact F01 brief/handoff hashes.
Scope, commit sequence, frozen-blob claims, and disclosed Designer command
failures are accurate. The result's semantic lifecycle-PASS claim is partial due
to F01-D1.

## Required-gate outcomes

1. **Pre-event receive grant — PASS.** Exact Advisor-created, committed/pushed,
   expiring, one-profile authority; forbidden future/delivery fields are excluded.
2. **Atomic first-root binding before ACK — PASS.** Receipt/dedupe and
   `UNBOUND -> ROOT_BOUND` precede ACK; the binding contains no `intakeId`.
3. **Retry/restart/expiry safety — NOT CLOSED.** Dedupe, root/question,
   competing-root, disconnect, kill, corruption, and profile isolation are
   specified, but F01-D1 leaves the expiry comparison point contradictory.
4. **Post-ACK-only materialization — NOT CLOSED.** The ACK ordering is explicit,
   but the shared unexpired predicate conflicts with required draining of an
   already `TRANSPORT_ACK_RECORDED` decision.
5. **Post-intake pointer-delivery grant — PASS.** Exact event/intake/root/pointer
   facts are mandatory before the separate Advisor-created one-use grant.
6. **No gateway/CLI grant minting — PASS.** Absence remains fail closed at
   `AWAITING_POINTER_DELIVERY_GRANT`; no tmux state exists.
7. **Profile isolation/no standing or generic route — PASS.** Grant, binding,
   state, consumption, evidence, and latch namespaces remain literal-profile
   bound with no fallback or cross-Team transfer.
8. **Exact Delivery v2 compatibility — PASS.** No v2 source, schema, state,
   journal, history, fixed-destination, or evidence-join path changed.
9. **Setup/start/restart authority ordering — PASS, subject to F01-D1.** Commands
   cannot create grants or renew authority; the remaining expiry source-of-truth
   correction must be reflected consistently.
10. **Frozen manifests/environment and forbidden scope — PASS.** Both manifests
    and the ten-key template are byte-identical to the prior reviewed head. No
    source, test, package, lockfile, secret, live Slack, or tmux mutation entered
    the delta.
11. **Designer result/pointer accuracy — PARTIAL.** Git scope, sequence, checks,
    failure ledger, and exclusions are accurate; the assertion that all expiry,
    partial-crash, restart, and materialization contracts are aligned is not.

## Independent targeted reproduction

- Exact five-path delta and exact three-path package checks: PASS.
- Required ancestry, clean status, upstream equality, and evidence first-add
  history: PASS.
- `git diff --check ce250c0..0d21714`: PASS.
- `git diff --check ce250c0..86c7edb`: PASS.
- Both manifests and environment template byte equality: PASS.
- Patch token-pattern scan: PASS, zero token-shaped value.
- Receive-grant required/forbidden field assertions: PASS.
- Pointer-delivery-grant required field and one-use assertions: PASS.
- Receive binding -> ACK -> materialization ordering assertion: PASS.
- Waiting-without-delivery-grant, no gateway mint, no CLI mint, lifecycle-state,
  profile-isolation, and durable consumption assertions: PASS.
- Balanced Markdown fences and zero `activationId` in the three patched
  documents: PASS.
- Exact expiry conflict scenario: REPRODUCED from immutable package lines cited
  in F01-D1.

The first ad hoc lifecycle harness stopped on a reviewer-authored occurrence
selection: it compared the later literal `UNBOUND -> ROOT_BOUND` schema text to
the earlier ACK text rather than the ordered security invariant. Following the
Sentinel failure-escalation protocol, the assertions were printed separately,
the brittle locator was isolated, and the corrected invariant-specific harness
passed. That harness failure was not attributed to the candidate. No other
Reviewer check failed or was skipped.

No current Slack-source lookup was needed: the changed claims are internal
authority/time contracts, and the prior official Slack protocol findings were
unaffected. No product, visual, browser, broad unit, live network, Slack, tmux
mutation, dependency, runtime, or unrelated test was run.

## Carried-forward gates, residuals, and exclusions

All unaffected prior PASS findings remain accepted: exact app/bot identity,
manifest least privilege, ten-key no-secret template, startup identity pairing,
closed profiles, Exact Delivery v2 isolation, intake/thread classifications,
rejection surfaces, outbound no-blind-resend semantics, Foundation lineage, and
Designer scope.

Live IDs/tokens, SDK versions, capacity/retention numbers, implementation,
implementation/security review, owner setup, actual grants, live Slack, and real
tmux delivery remain later exact gates. Candidate patching, secret access,
runtime activation, risk acceptance, final approval, release, and next-actor
dispatch were excluded and not performed.

## Routing and stop

RETURN_TO: `agent-office-advisor`

NEXT_REQUIRED_ACTION: Advisor-routed narrow Designer correction for F01-D1,
followed by exact same-Reviewer delta re-review. No Worker or owner/live phase is
authorized.

STOP
