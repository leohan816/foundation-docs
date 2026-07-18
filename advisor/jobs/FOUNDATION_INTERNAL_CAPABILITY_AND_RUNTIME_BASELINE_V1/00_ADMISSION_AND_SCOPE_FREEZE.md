# P0 Admission and Scope Freeze

MISSION_ID: `FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1`

RECORDED_AT_KST: `2026-07-18T22:48:15+09:00`

INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`

## Canonical authority

| Artifact | Git blob | SHA-256 | Verification |
|---|---|---|---|
| `docs/strategy/council-runs/FOUNDATION_INTERNAL_CAPABILITY_BASELINE_FOUNDATION_ONLY_CORRECTION_COUNCIL_V1/27_APPROVED_P0_P1_ADVISOR_DISPATCH_INSTRUCTION_EN.md` | `d2cacc28e9e59fa6b274942d83dbdf611b0d3b89` | `b394e2758d4e3cdb6e296cbb01305a9bbd6f9d6aa0d0744215dbb4503dfb6544` | PASS |
| `docs/strategy/council-runs/FOUNDATION_INTERNAL_CAPABILITY_BASELINE_FOUNDATION_ONLY_CORRECTION_COUNCIL_V1/28_LEO_P0_P1_APPROVAL_RECORD.md` | `0bd8aa5add5265f608a162700a1bd2d06e206ac7` | `4977d570aac362e3abc8bcb93d341fc469a18909a34e3c8cc1cbda0da98cb805` | PASS |

Authority source commit: `17f456241ce396b447f6ae68e2b1eb0b04c0f005` on `agent/publish-foundation-internal-baseline-council-preflight-20260718`, verified upstream-equal before the Advisor branch was created.

## Current role authority

Current role authority is `/home/leo/Project/agent-office/docs/agent` at commit `c837af565052119862ae5524656080b47974452d`. The Advisor read the current Team Operating Model, Advisor, Worker, and Reviewer role definitions, Worker run and result-reporting protocols, and the Foundation-local `AGENTS.md` and `CLAUDE.md`. Pre-existing untracked Agent Office files were not touched and are not mission evidence.

## Repository admission

Foundation repository: `/home/leo/Project/FOUNDATION`

- branch: `shadow/foundation-shared-memory-v0`
- HEAD: `33570b9d7db79c991bb216b6a2dc80880ba1f2d6`
- upstream: `origin/shadow/foundation-shared-memory-v0`
- ahead/behind: `0/0`
- tracked changes: none
- pre-existing untracked files to preserve untouched:
  - `docs/FOUNDATION_DOCS_SYNC_POLICY.md`
  - `설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html`

The untracked inventory does not obstruct a source-only census because no product-repository output or mutation is authorized. Any new or changed product-repository path stops the mission.

## Collision disposition

The pre-existing `COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1` mission remains frozen at its owner-credential gate. This mission does not read, write, dispatch, test, or advance that work. The `cosmile` session and its worktree are not selected. Reusing idle Foundation Worker and Reviewer sessions for this Foundation-only mission does not grant access to the Cosmile mission or its artifacts.

## Frozen authorized scope

Authorized only:

1. P0 admission, evidence-policy freeze, actor plan, and estimate.
2. P1 shallow, static, Foundation-local source census.
3. A static Independent Reviewer protocol/package challenge.
4. Documentation-only evidence, bounded named corrections, publication, and Advisor audit.

Hard exclusions:

- P2, P3, P4 or any probe execution;
- build, lint, tests, imports that execute product code, runtime, API, retrieval, indexing, model/provider, DB, endpoint, or network execution;
- Foundation product or canonical-data changes;
- inspection of foundation-control, SIASIU, or Cosmile repositories;
- credentials, spending, implementation, risk acceptance, release approval, or later-phase auto-start.

The census must keep these axes independent: `SOURCE`, `BUILD`, `TEST`, `RUNTIME`, `INTEGRATION`, `AUTHORITY`, and `TARGET_FIT`. Source presence alone must not be reported as runtime or integration readiness.

## Selected actors

- Foundation Worker: session `foundation`, separate pane, Fable 5 (1M), effort `max`, required `/fable-builder`, Foundation repository only, read-only.
- Independent Reviewer: session `foundation-reviewer-fable5`, Fable 5 (1M), effort `max`, required `/fable-sentinel`, separate and non-overlapping, read-only.
- Foundation Advisor: orchestration, evidence integration, exact-path publication, and final audit only.

No Control, Designer, Cosmile Worker, or SIASIU Worker is selected.

## Stop line

`HARD_STOP_BEFORE_P2: ACTIVE`
