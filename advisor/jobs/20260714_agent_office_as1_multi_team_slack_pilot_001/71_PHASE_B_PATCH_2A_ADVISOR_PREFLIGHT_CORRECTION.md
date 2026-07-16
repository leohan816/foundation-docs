# AS1 Phase B Patch 2A Advisor Preflight Correction

## Classification

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Phase: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_PATCH_2A`
- Reason: Advisor source/result validation found one exact F03 closure mismatch
- Worker: same `agent-office-opus`
- Reviewer: do not dispatch until this correction is complete

## Frozen inputs

- Product branch: `feature/as1-phase-b-live-pilot-001`
- Current product HEAD: `82f69527ab2f9aab83bd47c21b55110f44a85417`
- Patch 2 source candidate: `bd3f8fc69cd610febb6df32d8c5daa9dc92bfe38`
- Patch 2 result: `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_2_WORKER_RESULT.md`
- Governing independent review: `69_PHASE_B_PATCH_1_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- Governing Patch 2 brief: `70_PHASE_B_WORKER_PATCH_2_BRIEF.md`

## Exact mismatch

Patch 2 correctly retains `acceptedLease` only after `DELIVERED`, but the real
owner immediately calls `ingestEvidenceAndProject()` and does not call
`deliverPending()` again. The evidence method currently:

1. requires and re-observes `acceptedDeliveryGrant`; but
2. neither requires `acceptedLease` nor re-observes the readiness lease with
   that accepted pair before constructing evidence and outbound projection.

Therefore the Patch 2 result's F03 claim is stronger than the source, and the
exact requirement in brief 70 lines 101-107 is not yet closed. Passing totals
do not override this source mismatch.

## Required correction

1. In `ingestEvidenceAndProject()`, require both accepted artifacts.
2. Re-observe both the pointer-delivery grant and readiness lease with their
   retained `(firstAddCommit, blobSha256)` pairs before evidence construction.
3. A divergent, deleted, dirty, rewritten, unavailable, or malformed accepted
   lease must fail closed, durably latch the selected profile where the existing
   divergence contract requires it, and prevent evidence/outbound projection.
4. Parse and validate the re-observed lease and prove it is the same lease bound
   to the accepted delivery authority/correlation. Do not infer acceptance from
   the stored pair alone.
5. Add an adversarial test that passes on the corrected source and fails on
   `bd3f8fc6`: after a successful delivery, make the accepted readiness lease
   diverge before evidence ingress and prove no evidence/outbound occurs.
6. Add missing/absent accepted-lease evidence-gating coverage if not already
   implied by the same test.
7. Do not rewrite Patch 2 evidence. Write a new Patch 2A result and pointer that
   explicitly supersede the inaccurate F03 sentence.

## Exact path lock

Implementation/test paths:

1. `src/runtime/as1-slack-pilot/composition.ts`
2. `tests/integration/as1-slack-live-composition.test.ts`

New evidence paths:

3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_2A_WORKER_RESULT.md`
4. `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_2A_WORKER_RESULT_POINTER.txt`

No other path may change. Existing Patch 2 result/pointer are immutable
historical evidence and must not be edited.

## Required gates

- affected live-composition suite;
- exact five-file focused Phase B suite;
- full AS1 19-file suite (bounded and already established);
- typecheck;
- build;
- ESLint on the two changed TypeScript paths;
- `git diff --check`;
- exact path-lock and descriptor/prior-evidence identity checks;
- direct fail-on-`bd3f8fc6` adversarial verification, followed by restoration.

Do not read secrets, connect Slack, initialize owner state, activate the
descriptor, signal a process, or mutate tmux. Commit and non-force push only the
authorized feature branch. Return the new pointer to Advisor and STOP.
