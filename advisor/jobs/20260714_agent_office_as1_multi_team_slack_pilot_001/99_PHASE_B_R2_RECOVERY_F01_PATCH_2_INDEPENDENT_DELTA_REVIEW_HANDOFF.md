# AS1 Phase B R2 Recovery F01 Patch 2 Independent Delta Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: independent Agent Office Reviewer (`agent-office-reviewer`)

REVIEW_CLASS: `R2_RECOVERY_F01_PATCH_2_DELTA`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

## Dispatch profile

- `SELECTED_MODEL`: `gpt-5.6-sol`
- `SELECTED_MODE`: independent Sentinel implementation/security delta review
- `SELECTED_EFFORT`: `max`
- `WHY_NOT_LOWER`: the two-file patch controls status ordering around durable
  latches and phase writes, preserves the B08 quarantine latch, and must close
  a prior independent high-severity finding without admitting a race
- `WHY_NOT_HIGHER`: max is sufficient for the exact two-source-path delta and
  six named adversarial cases; no broad product or architecture review is in scope
- `ESCALATION_TRIGGER`: unresolved status-ordering, quarantine-latch,
  evidence-integrity, or activation-safety conflict

Verify actual process, model, effort, skill, workspace, and independence
directly. Do not infer them from the session name.

## Exact review subject

Product worktree, strictly read-only:

`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

Branch:

`feature/as1-phase-b-live-pilot-001`

Coordinates:

- exact patch parent: `5911a5bad0b3eb617556929fa9a06040bd533905`
- source/test patch: `1666cb0`
- Worker result: `77f6e96`
- final candidate/pointer: `d0b1494`
- prior independent result identifying F01-R1: governance commit `d8f3f1ac`
- accepted R2 design: `a837bbf9d4072638a6dac676fb5ccc8da9bfa1ff`
- governing Worker handoff: governance commits `cdb6bbf` and `b1832d6`

Worker result and pointer:

1. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F01_PATCH_2_RESULT.md`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F01_PATCH_2_RESULT_POINTER.txt`

Expected result SHA-256:

`33f1736a609e69f0747d8610488f931342f9d12325126eff4d3dec4fcb185546`

## Exact changed-path scope

Inspect `5911a5b..d0b1494`. Exactly these four paths may differ:

1. `src/application/slack-pilot/outbox.ts`
2. `tests/integration/as1-slack-outbound.test.ts`
3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F01_PATCH_2_RESULT.md`
4. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F01_PATCH_2_RESULT_POINTER.txt`

No descriptor, CLI, composition, writer-lock, setup/lifecycle, store/schema,
package, secret, Registry, framework, service, UI, VibeNews, or external-project
path may change.

## Review order and exact questions

Inspect the actual source diff and load-bearing surrounding source first. Then
inspect the six new adversarial tests, reproduce the focused gates, and only
then compare the Worker result to direct evidence.

Determine independently whether all of the following are true:

1. Existing `REQUEST_STARTED` recovery rechecks status ordering immediately
   before the interrupted-request latch and again immediately before the
   `MANUAL_RECONCILIATION_REQUIRED` phase write.
2. Shared reconciliation receives the exact status guard and truthful current
   phase, and rechecks immediately before its latch and again immediately
   before the manual phase write.
3. The request-hash-mismatch call site reports `PREPARED`; every post-start
   reconciliation call site reports `REQUEST_STARTED`.
4. A refusal before a latch performs neither that latch nor the phase write; a
   refusal after/during the mandatory latch prevents the manual write while
   accurately acknowledging that the latch already occurred.
5. `checkStatusOrdering` converts only the fixed status-ordering
   `GATEWAY_DISABLED` error to `REJECTED_CONTROL`. `STORE_QUARANTINED` and every
   other non-ordering durable failure propagate to the existing B08 fail-closed
   latch path.
6. The accepted-evidence path (`statusGuard === null`), no-blind-resend,
   deterministic IDs, bounded retries, exact target, one-use authority,
   redaction, and existing successful behavior remain unchanged.
7. The six tests genuinely introduce the sibling/quarantine condition at the
   previously uncovered awaited boundaries and prove truthful phase, latch,
   no-manual-write, and no-Web behavior. Test-only seams must not alter product
   behavior.
8. Worker result/pointer claims, hashes, lineage, scope, test totals, failures,
   rollback, clean/upstream state, and corrected latch wording match direct
   evidence.

Do not repeat the prior full R2 review. F02 is not in this patch. Verify only
that its files are unchanged, its prior HOLD remains explicit, and no live
activation is claimed or authorized.

## Focused reproduction

Run only:

```bash
npx vitest run --maxWorkers=1 tests/integration/as1-slack-outbound.test.ts

npx tsc --noEmit -p tsconfig.json

npx eslint \
  src/application/slack-pilot/outbox.ts \
  tests/integration/as1-slack-outbound.test.ts

npm run build:core

git diff --check 5911a5b..d0b1494
```

Also verify exact four-path scope, result hash/pointer linkage, descriptor byte
identity, no adversarial edit marker, no old-root/secret addition, and clean
upstream-equal product state. Do not run Living Office, browser/visual, broad
AS1, or unrelated product suites.

## Verdict contract

Return exactly one verdict for this bounded F01 Patch 2 delta:

- `PASS`
- `NEEDS_PATCH`
- `FAIL`

`PASS` means F01-R1 and the fresh Worker evidence are closed for this exact
delta. It does **not** close F02 and does **not** authorize original-root access,
R2 initialization, descriptor activation, Slack connection, owner start, live
destination observation, process signaling, or tmux delivery. Record
`LIVE_R2_SLACK_ACTIVATION: BLOCKED_F02` even if this delta passes.

## Boundaries and output

- Product worktree is strictly read-only: no edit, stage, commit, push, stash,
  or patch.
- Do not access secrets; touch either real state root; connect Slack; activate
  the descriptor; observe or mutate a live destination; signal a process; or
  send tmux input.
- Do not delegate, create another agent/session, implement, accept risk, merge,
  or start another mission.

Write only these uncommitted governance artifacts:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/100_PHASE_B_R2_RECOVERY_F01_PATCH_2_INDEPENDENT_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/100_PHASE_B_R2_RECOVERY_F01_PATCH_2_INDEPENDENT_DELTA_REVIEW_RESULT_POINTER.md`

Return to `agent-office-advisor` and STOP.
