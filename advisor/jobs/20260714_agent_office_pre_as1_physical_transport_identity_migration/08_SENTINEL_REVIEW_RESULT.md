# Independent Sentinel Implementation Security Authority Review Result

## Findings

### F01 — HIGH — malformed registry identity cells are accepted as exact authority

The required authority fence is not fail closed for structurally malformed current-destination rows.

- The controlling patch handoff requires an exact structural column check and explicitly forbids matching that accepts a malformed row (`07_WORKER_PATCH_HANDOFF.md:37-42`). The review handoff independently requires malformed targets to fail closed (`08_SENTINEL_REVIEW_HANDOFF.md:42-44`).
- Candidate `9a7e9444208b613752dc4ab42e23b3cc70cc1516` filters candidate rows with only `cells.length >= 11` and then extracts every backticked identity value using the start-anchored expression `/^`([^`]+)`/u` (`src/adapters/gateways/tmux-advisor/exact-authority.ts:616-645`). The expression is not end anchored.
- Consequently, malformed cells such as `` `agent-office-advisor`JUNK ``, `` `$26`JUNK ``, `` `@26`JUNK ``, `` `%26`JUNK ``, or `` `/home/leo/Project/agent-office`JUNK `` are reduced to the expected value and accepted. The row-width predicate also accepts a structurally truncated row containing only the fields through `currentCommand` rather than the real canonical row shape.
- A direct read-only evaluation of the candidate's row-splitting and extraction logic against a suffix-contaminated row returned `accepted: true`. No candidate file was changed.
- The targeted negative cases cover a fabricated label, a duplicate row, and a wrong pane `%99`, but do not cover suffix-contaminated identity cells or a truncated row (`tests/integration/exact-advisor-delivery.test.ts:375-391`).
- The Worker result says the columns are exact and that zero, duplicate, or malformed rows fail closed (`artifacts/pre-as1-physical-transport-identity-migration/WORKER_RESULT.md:148-153`); that conclusion is inaccurate.

Impact: a clean, pushed authority snapshot containing a semantically malformed or ambiguous registry row can pass static authority validation and participate in the capability authority hash. Other candidate fences still hard-code the live target, so this review did not demonstrate caller-selected redirection, but the mandatory provenance/authority boundary is weaker than specified. This is a security-authority defect and blocks approval.

Required closure: validate the identity/location columns as complete exact cell values, validate the real canonical row structure while retaining only the explicitly allowed command-version annotation shape, and add negative tests for suffix-contaminated and truncated rows. The same independent Reviewer must re-review the resulting exact delta.

### F02 — LOW — migrated test retains an unclassified historical pane label

- The test title still says `paste-to-%9` (`tests/integration/exact-advisor-delivery.test.ts:450`) while its executable assertions correctly require `%26` (`tests/integration/exact-advisor-delivery.test.ts:470-474`).
- Current authority requires every remaining legacy token to be classified as immutable evidence, a non-routable historical compatibility fixture, or a defect removed before review (`01A_ACTIVE_REFERENCE_SCOPE_CLARIFICATION.md:34-39`). This title is neither routing behavior nor an intentional historical-negative fixture.
- The Worker result reports no such active-surface defect and classifies remaining historical tokens only as an evidence join key or historical-only negative fixtures (`WORKER_RESULT.md:190-194`).

Impact: no runtime route is affected, but the test name is misleading and the reported legacy-token classification is incomplete.

Required closure: rename the test to the current pane identity and update the durable Worker evidence/search classification.

## Verdict

`NEEDS_PATCH`

The mandatory exact structural registry-authority criterion is not met. This verdict does not authorize transport activation, Slack/AS1 work, tmux input, risk acceptance, merge, or release.

## Review coordinates

- Mission: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`
- Pass: `IMPLEMENTATION_SECURITY_AUTHORITY_REVIEW`
- Actor: Agent Office Independent SOL Sentinel Reviewer (`agent-office-reviewer`)
- Target worktree: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`
- Baseline: `88c6cbd757ed205eb1aadd68d8ea7629865d5765`
- First candidate: `b523b5cf0277badb093c6d1046d71ff3f414446c`
- Candidate reviewed: `9a7e9444208b613752dc4ab42e23b3cc70cc1516`
- Candidate branch: `config/pre-as1-physical-transport-identity-migration-001`
- Governance worktree HEAD: `0d2fa9abeffb97f929373e88a8b05c3652468a0a`
- Review handoff SHA-256: `f7023c9f66f6130d88d42cb5f09bf6ea3728e2045e520158618a2b4856132302`

The baseline, first candidate, and final candidate were resolved as immutable commits. The candidate is a descendant of both the baseline and first candidate. At review completion, the candidate branch was clean and exactly equal to its configured upstream.

## Authority and skill entry

- Required Sentinel skill loaded directly; SHA-256 matched the expected value: `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`.
- Loaded Sentinel references:
  - `contract-review.md`: `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`: `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`: `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
- Loaded the skill-referenced role protocol V2 (`9bdd36ddd3f0d718da7adc3c2f0d0204c53d1191f0119f2a6e56c5160dc37b7b`). It identifies itself as superseded historical evidence; it was not treated as current authority.
- Current Agent Office Reviewer authority was read from the exact candidate snapshot:
  - `docs/agent/TEAM_OPERATING_MODEL.md`: `810d1884a90e3351097350e5d77e568e2aab6f544188d73ae44b4ee5d79efe17`
  - `docs/agent/roles/reviewer.md`: `40fd0a0530e5270997fe24a080823555a37b9f630f623f61eeda5e1625f78188`
  - `docs/agent/RUN_PROTOCOL.md`: `34ab6d76e11422e2250b99284a3f6f767fbc76d5c17182e635cf00e4e76d2995`
  - `docs/agent/RESULT_REPORTING_PROTOCOL.md`: `570fa25aa601d5a3ea690f7a308d351873895fa42c29f2b569cf02814741fffb`

No operative conflict was found between the current Reviewer documents and the exact Advisor review handoff. Current Agent Office authority controlled over the explicitly superseded historical role pointer.

## Evidence reviewed and criterion outcome

The actual `88c6cbd..9a7e944` diff and narrower `b523b5c..9a7e944` patch were inspected before the Worker conclusion. The baseline-to-candidate delta contains nine paths (including the Worker result and pointer), with 536 insertions and 83 deletions. The narrower patch contains the two Worker evidence files plus `exact-authority.ts`, `exact-config.ts`, and the exact-delivery test, with 294 insertions and 25 deletions.

- **Current exact destination and live correspondence — PASS.** The exact `01A_ACTIVE_REFERENCE_SCOPE_CLARIFICATION.md` blob has SHA-256 `b7b42babc3130aac2058eea09236059a85c504642f392fca55f1b5391e8e9ae6` and specifies `agent-office-advisor/$26/@26/%26`, indexes `0/0`, workspace `/home/leo/Project/agent-office`, command `codex`. A read-only tmux observation of `%26` matched every field and showed `pane_dead=0`, `pane_in_mode=0`, `input_off=0`, and `synchronize-panes=0`.
- **Canonical registry structural fence — FAIL.** F01 above.
- **Version/path/current-decision authority — PASS.** Activation v2 requires nine exact snapshot references, including the exact current `01A` path; v1 and old `20260711` readiness/evidence paths fail schema validation. Static authority checks exact pushed/current-upstream bytes and incorporates the migration decision into the capability authority hash. The canonical wrapped decision prose is normalized only for whitespace before its required semantics are checked.
- **Historical-artifact non-authority — PASS.** Historical activation/evidence artifacts were not changed by the candidate. They are insufficient without current v2/01A authority and no active source/config fallback to the old physical destination was found.
- **Subject and decision lineage — PASS.** Current Advisor authority subject, intake/ACK/decision lineage, and evidence-ingress subject/destination checks use `agent-office-advisor`; no caller-selected destination surface was found.
- **Delivery safety invariants — PASS.** One-use durable capability consumption, exact single-pane targeting, the two live preflights, pre-paste authority revalidation, kill switch, manual fallback, and journal fail-closed behavior remain present. No delivery was exercised.
- **Forbidden scope — PASS.** No VibeNews, Slack/AS1 activation, transport activation, DB, secret, dependency, remote/public/production, or unrelated product delta was found. No tmux input, commit, push, merge, or product patch was performed.
- **Worker evidence accuracy — FAIL.** F01 contradicts the malformed-row closure claim, and F02 is omitted from the legacy-token classification.

## Independent targeted reproduction

- Exact four-file Vitest command: PASS — 4 files, 55 tests passed.
- `npm run typecheck`: PASS — zero TypeScript errors.
- Focused ESLint over the six required changed source/test paths: PASS.
- `git diff --check 88c6cbd757ed205eb1aadd68d8ea7629865d5765..9a7e9444208b613752dc4ab42e23b3cc70cc1516`: PASS.
- Targeted active physical-target search: no historical physical destination or old `20260711` authority path remained in active `src/**` or `config/**`; F02 was found in the targeted test surface.
- Read-only live tmux observation: PASS for the current destination and safety fields. No capture or input command was used.

To run the mandated Node-based checks without installing or changing dependencies, the target worktree temporarily referenced the existing main-worktree `node_modules`; both worktrees' lockfiles had SHA-256 `6570d01007f1a3c88f08b77f280ecf71ffe1f0206df4e5cdc610f1057420301c`. The temporary ignored symlink was removed. The target worktree remained clean.

Broad product, UI, visual, Living Office, Slack, VibeNews, dependency, and unrelated security suites were not run, as forbidden by the handoff.

## Routing and stop

RETURN_TO: `agent-office-advisor`

NEXT_REQUIRED_ACTION: Advisor-routed narrow Worker patch for F01 and F02, followed by exact same-Reviewer re-review. No activation or next mission is authorized.

STOP
