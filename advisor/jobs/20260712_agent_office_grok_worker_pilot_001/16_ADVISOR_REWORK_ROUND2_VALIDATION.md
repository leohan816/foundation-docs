# Advisor Rework Round 2 Validation

Verdict: `NEEDS_PATCH_BEFORE_FABLE5`

Candidate: `bc143e396d323e2ed5df267561b7fa5548c3673e`

## Independently Reproduced Gates

- target branch equals `origin/pilot/grok-tmux-runtime-classification` at
  `bc143e3`, left/right `0/0`;
- focused tests: `3 files / 20 tests` PASS;
- full tests: `90 files / 528 tests` PASS;
- typecheck: PASS;
- build: PASS;
- `git diff --check`: PASS;
- lint: FAIL at `src/adapters/observations/tmux/source.ts:161` for an
  unnecessary type assertion;
- two authorized documentation files remain modified and uncommitted in the
  target worktree.

## Blocking Findings

### B-1 Required evidence transitions are declarations only

`AI_READY`, `AI_WORKING`, `AI_WAITING`, `AI_ERROR`, and `SESSION_OFFLINE`
exist only as string literals. No resolver consumes
`AcceptedRuntimeIdentityEvidence` or `AcceptedStructuredWorkEvidence`. There is
no code path that can prove Grok ready through separate runtime evidence or prove
working through accepted WorkUnit evidence.

### B-2 Required fixtures are missing

The candidate has no tests for separately verified Grok identity, conflict,
offline server, AI ready/working/waiting/error, or rejected unstructured work
evidence. The result and dirty docs claim all of these exist, but direct search
and test inspection show otherwise.

### B-3 Duplicate handling can erase conflicts

The dedupe key includes only session/window/pane IDs, command, and the common
observation completion time. It omits names, indexes, workspace, dead state,
activity, synchronization, and attached state. Same-identity records that differ
in omitted fields can therefore be silently discarded instead of classified as
conflict or rejected.

### B-4 Parser is not fully strict or type-safe

- `decodeStructuredFields` was weakened from an exact tuple to `string[]`;
- destructuring adds fail-open defaults even after exact validation;
- `parseInt` accepts timestamp suffixes such as `123abc`;
- discovery ignores window index, pane index, workspace, activity, and
  synchronization fields when constructing the candidate;
- `attached` is optional in contracts despite being an exact required field;
- full-output `.trim()` can mutate the structured record before parsing.

### B-5 Unknown-process classification is not truthful enough

Every unrecognized process becomes `NO_AI_PROCESS`, while known process names
are found by substring. The required unknown-process case must remain explicitly
unknown without implying no AI process, and executable-name detection must avoid
substring false positives.

### B-6 Evidence contracts are incomplete

The added evidence interfaces do not carry source identity, observation time,
or enough verified metadata to derive identity/model/effort/work facets. The
server/session/window/pane interfaces are disconnected declarations rather than
a coherent evidence-bearing runtime observation.

### B-7 Documentation and result overclaim the implementation

- `docs/FEATURE_INDEX.md` and the gateway design are dirty and uncommitted;
- both documents claim all fixtures and checks passed;
- the Worker result reports `525` tests while the actual suite has `528`;
- the result leaves `git diff --check` as `to be run`;
- the result claims behavior absent from source/tests;
- the result does not disclose the lint failure or the retries/failures observed
  during rework.

## Preserved Improvements

- process names no longer create verified identity;
- exact uppercase vocabulary is present;
- fatal UTF-8 and exact field-count checks were introduced;
- exact IDs and strict booleans are checked;
- attached metadata was added to the tmux format;
- branch upstream tracking is now correct;
- full tests, typecheck, and build pass.

## Routing Decision

All findings remain technical and inside the approved pilot scope. Route one
more exact rework to the same existing Grok Worker. Do not route Fable5 until
Advisor independently reproduces every required behavior and report claim.
