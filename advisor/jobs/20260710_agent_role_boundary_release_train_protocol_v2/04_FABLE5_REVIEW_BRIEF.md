# Fable5 Independent Review Brief

## Role

Act as the independent Fable5 Reviewer in the existing Fable5 Reviewer session.
Use `/fable-sentinel`. Do not act as Advisor, Worker, author, or final approver.

## Required Passes

Perform two separate passes and write two separate artifacts with independent
verdicts.

### Pass 1: `DESIGN_REVIEW`

Review the canonical V2 protocol itself for:

- complete actor responsibility matrix;
- Advisor authority and anti-self-review boundary;
- evidence-based exception audit Levels 1/2/3;
- Worker and Reviewer evidence contracts;
- Control anti-expansion and mode separation;
- Foundation Worker restoration without canonical-authority leakage;
- Fable5 pass separation and SOL fallback/session separation;
- high-risk release train and low-risk fast path;
- Hermes no-judgment boundary;
- precedence, supersede, STOP, return, and reload rules;
- hidden decisions, contradictions, or authority gaps.

### Pass 2: `IMPLEMENTATION_REVIEW`

Review actual propagation files, diffs, commits, pointers, branches, and exclusions.
Verify that:

- each actor's actual entry/reference uses the same canonical V2;
- long protocol text was not duplicated into every entry file;
- obsolete active rules were replaced rather than left in parallel;
- the historical operating model is visibly superseded;
- Foundation Worker is active and Control is constrained;
- Fable5 instructions require separate review passes and explicit coverage;
- Advisor local files match the recorded SHA-256 values;
- only Markdown docs/config were changed;
- unrelated dirty files were not committed;
- branch and commit pointers in `02_PROPAGATION_COMMIT_REGISTER.md` are accurate;
- no session reload has occurred before this review.

## Required Result Coverage

Each result must include:

- reviewed artifacts;
- reviewed files/diffs;
- reviewed references;
- explicit required-criterion coverage;
- excluded scope;
- conflicts found;
- unresolved risks;
- verdict rationale;
- one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Do not trust Advisor's self-check. Inspect actual files and commits directly.

## Result Paths

- `../foundation-docs/runs/shared/20260710_agent_role_boundary_release_train_protocol_v2/FABLE5_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/runs/shared/20260710_agent_role_boundary_release_train_protocol_v2/FABLE5_IMPLEMENTATION_REVIEW_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/12_FABLE5_REVIEW_RESULT_POINTER.md`

Commit/push only the foundation-docs result artifacts and pointer. Do not modify
or commit any reviewed workspace.

## Routing by Verdict

- Both `PASS`: return both pointers to Advisor; Advisor may prepare reload routing.
- Any `PASS_WITH_RISK`: return to Advisor; Advisor must stop and return to Leo/GPT.
- Any `NEEDS_PATCH`: return to Advisor; Advisor patches and routes re-review to the
  same Fable5 session.
- Any `FAIL`: STOP and return through Advisor to Leo/GPT.

