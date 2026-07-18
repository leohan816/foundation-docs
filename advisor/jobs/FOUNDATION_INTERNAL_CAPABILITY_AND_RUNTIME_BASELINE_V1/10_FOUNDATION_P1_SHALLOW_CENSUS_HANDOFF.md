# Foundation Worker Handoff — P1 Shallow Static Census

MISSION_ID: `FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1`

WORKUNIT: `P1_FOUNDATION_LOCAL_SHALLOW_CENSUS`

RETURN_TO: `foundation-advisor`

## Exact authority

Read these committed files from the Advisor job package before any census action:

- `advisor/jobs/FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1/00_ADMISSION_AND_SCOPE_FREEZE.md`
- `advisor/jobs/FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1/01_P0_ESTIMATE_AND_EVIDENCE_POLICY.md`
- this handoff.

The handoff commit, blobs, and SHA-256 values will be supplied in the dispatch message. Do not infer authority from chat or prior missions.

## Live binding

- actor: `foundation`
- role: Foundation repository-owner Worker
- workspace: `/home/leo/Project/FOUNDATION`
- model: live-verified Fable 5 (1M)
- effort: `max`
- required skill: `/fable-builder`
- authority: static read-only Foundation-local investigation only

Read current Agent Office Worker authority and Foundation `AGENTS.md`/`CLAUDE.md`. If the live binding, role, exact repo, branch, HEAD, upstream, tracked state, or preserved untracked inventory differs, return `BLOCKED` without modifying anything.

## Pinned Foundation state

- repository: `/home/leo/Project/FOUNDATION`
- branch: `shadow/foundation-shared-memory-v0`
- HEAD: `33570b9d7db79c991bb216b6a2dc80880ba1f2d6`
- upstream: `origin/shadow/foundation-shared-memory-v0`
- ahead/behind: `0/0`
- tracked changes: none
- preserve untouched:
  - `docs/FOUNDATION_DOCS_SYNC_POLICY.md`
  - `설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html`

## Allowed actions

Static reads inside `/home/leo/Project/FOUNDATION` only:

- `git status`, `branch`, `rev-parse`, `log`, `show`, `diff`, `ls-tree`, and ancestry inspection without fetch;
- `rg --files`, bounded `rg`, `find` without following symlinks, `ls`, `stat`, `file`, `wc`, `sed`, `head`, `tail`, `sha256sum`, and read-only text viewing;
- inspection of source, test source, fixtures, manifests, configuration templates, schemas/migrations, documentation, and versioned data artifacts;
- shallow classification and static proposal of later P2/P3 probes.

No command may build, lint, test, import/execute product code, start a service, access a DB, query an endpoint, use a provider/model, install a dependency, fetch network content, or change any filesystem path in the Foundation repository.

Do not inspect foundation-control, SIASIU, or Cosmile repositories. A path or claim referring to them may be recorded as an unresolved string from Foundation-local source only; do not follow it.

## Required census method

1. Re-verify the pin and preserved-dirt inventory.
2. Inventory major Foundation-local surfaces without an every-file quality audit.
3. Group capabilities by domain and identify exact representative load-bearing paths.
4. For every capability, keep `SOURCE`, `BUILD`, `TEST`, `RUNTIME`, `INTEGRATION`, `AUTHORITY`, and `TARGET_FIT` separate using the frozen enums.
5. Treat tests, fixtures, and docs only as source evidence. Do not infer that they ran.
6. Identify contradictions, duplicates, shadows, dead/obsolete candidates, and unknown ownership without silently resolving them.
7. Produce a selected later P2/P3 probe proposal only; run none.

## Required result content

- preflight evidence and preserved-untracked confirmation;
- repository/surface map;
- capability census table with exact Foundation-local evidence paths;
- evidence-axis rationale per capability group;
- physical location/current apparent provider/canonical owner/future responsible actor/legacy-duplicate-dead-or-unverified distinctions where source evidence permits;
- current blockers and material unknowns;
- selected P2/P3 probe proposal with exact bounded estimates and risks;
- actor plan for later probes;
- recommended P2–P4 outer envelope, explicitly not authorized;
- explicit statement that no non-Foundation repo was inspected;
- exact command log (read-only commands only);
- final Git status showing no mission change and the two preserved untracked files untouched.

## Result paths

Write only mission-created temporary artifacts outside every repository:

- `/home/leo/Project/.mission-tmp/FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1/foundation/10_P1_FOUNDATION_SHALLOW_CENSUS_RESULT.md`
- `/home/leo/Project/.mission-tmp/FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1/foundation/11_P1_FOUNDATION_SHALLOW_CENSUS_POINTER.md`

Do not write a report into Foundation or foundation-docs. The Advisor will verify and publish the temporary artifacts byte-identically.

## Stop conditions

Stop and return immediately on any pin/binding mismatch, product-repository change, need to execute code, need to inspect another repository, credential/DB/network/runtime requirement, inability to preserve pre-existing files, scope ambiguity that changes the census, or request to perform P2/P3/P4.

Final line: `HARD_STOP_BEFORE_P2: ACTIVE`
