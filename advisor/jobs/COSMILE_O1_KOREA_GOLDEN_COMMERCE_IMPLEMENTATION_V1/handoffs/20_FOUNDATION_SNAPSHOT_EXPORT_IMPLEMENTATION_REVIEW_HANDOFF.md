# Independent Reviewer Handoff — Foundation Snapshot Export Candidate

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID: FOUNDATION-O1-SNAPSHOT-EXPORT-FULL-REVIEW-1
REVIEW_TYPE: INDEPENDENT_IMPLEMENTATION_FULL_REVIEW
ACTOR: foundation-reviewer-fable5
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
ROLE: Independent Foundation Reviewer
RETURN_TO: foundation-advisor
```

## Live binding and independence gate

Immediately before review, independently verify and record the exact session, pane, live model,
max effort, CWD, `/fable-sentinel` load, current Reviewer role authority, synchronization OFF,
idle/readiness, and independence from the Foundation Worker and Advisor. Stop without reviewing
if any binding fails. This review must not overlap another Reviewer subject.

## Exact pinned subject

```text
REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-foundation-snapshot-v1-20260717
DECLARED_BASE: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
CANDIDATE_HEAD: 99885ded9927de092d660fe09ef3418891bb1291
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: UNSET_BEFORE_REVIEW

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
EVIDENCE_COMMIT: 5a4ba11981b3a369691445a3524328e07304b149
RESULT_BLOB: b962831c32ccfe1548bc949ba26260be993a5d8b
RESULT_SHA256: ca8a673b0a4c73eb011cf7fc5a9fb909a5e85be52f9c426ba637d47a1e7359d2
POINTER_BLOB: c86d0e98a7e354ca0673eaa2ac74e6e066957dcb
POINTER_SHA256: 85d9ceeee054b8864f046fd409a4c29f848432db5bad1e1cc7758ec7477ec6cb
```

Verify every pin directly from Git before relying on the evidence. Review only the exact
`DECLARED_BASE..CANDIDATE_HEAD` subject; do not infer later changes.

## Authority and design sources

Read current Agent Office operating model, Reviewer role, run/result protocols, FOUNDATION
`AGENTS.md` and `CLAUDE.md`, the committed implementation job package at `5a4ba119...`, and the
pinned reviewed design artifacts named by the Worker handoff. Apply the Founder closure exactly:

- Foundation delivery is a deterministic versioned non-production local file bundle;
- Foundation exports and Cosmile later imports/verifies a local copy;
- optional acknowledgement is category-only operational evidence;
- production transport or a new service is not authorized;
- no vault write or real product sellability claim is authorized.

## Required review

Directly inspect the complete diff and rerun safe local verification needed to determine:

1. exact seven-path allowlist containment, clean candidate, base ancestry, no unauthorized vault,
   endpoint, network, DB, service, runtime, secret, PII, AI, Memory, or SIASIU behavior;
2. conformance to the reviewed `fsnap-1.0` identity, seven-field pin, canonical serialization,
   content hash, manifest and notice contracts;
3. default-deny approval/gate behavior and zero deliverable output for unapproved or withdrawn
   fixtures;
4. correction, supersession, withdrawal, historical-pin, replay, duplicate, immutability, gap,
   and optional category-only acknowledgement behavior;
5. file-bundle write/verify/import safety, including tamper, path traversal/symlink, partial-write,
   overwrite, stray-file, malformed-input, and cross-entry consistency failure modes;
6. deterministic and atomic behavior under the declared one-process boundary, with no broader
   concurrency or production-durability claim;
7. test oracle quality and the truth of the reported focused and regression evidence;
8. documentation accuracy, including that the approved local file bundle is implemented while
   any production transport/ack channel remains unresolved and unauthorized;
9. no raw product/customer/payment identifiers, PII, secrets, payloads, or unsafe rollback command
   are introduced into runtime output or review evidence;
10. whether the candidate honestly satisfies only the approved non-production snapshot/export
    claim ceiling and preserves all exclusions.

Do not accept the Worker report as proof. Reproduce load-bearing facts directly. Safe tests must
use `python3 -B`, synthetic fixtures, local temp directories only, and must not mutate tracked
files. Capture pre/post Git state. Do not install dependencies or access network, DB, provider,
secret, PII, live, or production resources.

## Verdict and correction routing

Return exactly one:

```text
PASS
PASS_WITH_CORRECTIONS
HOLD
FAIL
```

`PASS_WITH_CORRECTIONS` must list bounded finding IDs, exact affected paths, required behavior,
and adjacent-negative regression expectations. It authorizes no patch by the Reviewer. The same
Foundation Worker owns any correction; the same Reviewer later reviews only the declared old
candidate to new-candidate delta. `HOLD` or `FAIL` must identify the exact authority, safety, or
claim-ceiling conflict.

## Output and stop

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/20_FOUNDATION_SNAPSHOT_EXPORT_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/20_FOUNDATION_SNAPSHOT_EXPORT_IMPLEMENTATION_REVIEW_POINTER.md`

Do not patch, stage, commit, push, accept risk, select policy, dispatch another actor, or begin a
later WorkUnit. Return the pointer to `foundation-advisor` and STOP.
