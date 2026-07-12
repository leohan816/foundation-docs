# Advisor Implementation Validation

Verdict: `NEEDS_PATCH_BEFORE_FABLE5`

Candidate: `2378b28de2975f3cf00ba9922ea2f14d7af0fd30`

## Directly Reproduced Findings

### A-1 Process name incorrectly becomes verified AI identity

`classifyFromCommandEscaped('grok ...')` returns
`grok-verified-runtime`, `verified: true`. The mission explicitly says process
name alone proves neither AI identity, model, nor effort. A known process name
may prove only `AI_PROCESS_DETECTED`; verified runtime identity requires a
separate accepted structured evidence object.

### A-2 Required truthful state contract is absent

The candidate invents lower-case fixture labels instead of supporting the exact
states `SESSION_DISCOVERED`, `NO_AI_PROCESS`, `AI_PROCESS_DETECTED`,
`AI_IDENTITY_UNKNOWN`, `MODEL_UNKNOWN`, `EFFORT_UNKNOWN`, `AI_READY`,
`AI_WORKING`, `AI_WAITING`, `AI_ERROR`, and `SESSION_OFFLINE`. It contains no
accepted structured WorkUnit-evidence path capable of proving `AI_WORKING`.

### A-3 Malformed output fails open

Fewer than ten fields produce an empty synthetic pane instead of
`STRUCTURED_OUTPUT_INVALID`. UTF-8 is not fatal, exact field count is not checked,
IDs/integers/booleans/timestamps are not validated, and malformed timestamps
fall back to epoch. This can manufacture observations.

### A-4 Required hierarchy and evidence contracts are incomplete

There is no server observation, session/window hierarchy, evidence-source
contract, accepted runtime-identity evidence, accepted work evidence, or clear
observation timestamp separate from activity time. Attached state is not read.

### A-5 Required fixtures are materially missing

No real tests exist for attached-idle, identical duplicate, conflicting duplicate,
offline server, malformed output rejection, AI waiting/error/working, unknown
model/effort facets, or rejected unstructured work evidence. Existing tests
instead assert the prohibited Grok process-name promotion.

### A-6 Changed-file and report evidence are inaccurate

The Worker changed `tests/helpers/fake-tool-runner.ts`,
`tests/helpers/operational-runtime.ts`, and
`tests/integration/observation-coordinator.test.ts` outside the initial allowlist.
Those exact compatibility files are technically necessary and are now approved
for rework, but the original change was an unreported scope violation. The report
also claims two documentation files changed when the actual commit contains no
documentation change, claims all required fixtures exist when they do not, and
leaves `git diff --check` as `to be run`.

### A-7 Branch push lacks local upstream tracking

The remote branch exists at the candidate commit, but the local branch has no
configured upstream. Rework must set and verify exact upstream equality without
changing protected branches.

## Preserved Good Work

- fixed no-shell `/usr/bin/tmux list-panes -a -F` argv;
- bounded runner timeout/output limits;
- isolated branch/worktree and no main checkout modification;
- lint/typecheck/full-test/build execution reported green;
- no DB, secret, remote, browser dispatch, or excluded Worker use;
- no new Grok session detected.

## Rework Decision

All findings are technical and patchable inside the original product intent.
Route one bounded rework to the same Grok session before independent review.
