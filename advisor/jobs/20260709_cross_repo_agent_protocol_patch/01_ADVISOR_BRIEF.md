# 01 Advisor Brief - Cross-Repo Agent Protocol Patch

## Verdict

`CROSS_REPO_PROTOCOL_PATCH_READY`

## Instruction Validation

Decision: `PROCEED_WITH_LIMITS`

Limits:

- Existing Cosmile V3-11C2 runtime diffs were not staged or committed.
- Existing unrelated untracked docs in SIASIU, foundation-control, and Cosmile were not staged.
- Existing unpublished Advisor operating-rule changes in foundation-docs were not staged for this task.
- V3-11C2 Worker result was not processed.
- Sentinel and Service Review handoffs were not created.

## Executive Summary

The missing cross-repo Agent Run / Result Reporting Protocol layer was added to Cosmile, SIASIU, foundation-control, and foundation-docs. Each repo now has a short entry-file reference and two protocol files:

- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`

The protocol files define target project/repo, role boundaries, Advisor orchestration, launcher-first execution, `READ_AND_EXECUTE`, no-memory/no-scope-broadening constraints, skill prefix rules, STOP conditions, standard result file locations, pointer blocks, foundation-docs commit hash reporting, runtime commit status reporting, and output safety rules.

## Repo Commits

Cosmile:

- commit: `caba8c6035309fff5b6b5870b6993535f4375dda`
- branch: `shadow/m4-cosmile-memory`
- pushed: yes

SIASIU:

- commit: `ed30f6504ecfdf88336c82b8f19d9ab24d97af02`
- branch: `shadow/m4-siasiu-memory`
- pushed: yes

foundation-control:

- commit: `0183ec2bb72014f4b2e8402a1e13dfe3cec5bc0f`
- branch: `shadow/m5-ingress-gate`
- pushed: yes

foundation-docs:

- commit: assigned on publish of this report
- branch: `main`

## Files Changed Per Repo

Cosmile:

- `CLAUDE.md`
- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`

SIASIU:

- `CLAUDE.md`
- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-control:

- `CLAUDE.md`
- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-docs:

- `README.md`
- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `advisor/jobs/20260709_cross_repo_agent_protocol_patch/00_INTAKE.md`
- `advisor/jobs/20260709_cross_repo_agent_protocol_patch/01_ADVISOR_BRIEF.md`
- `advisor/jobs/20260709_cross_repo_agent_protocol_patch/index.md`

## Entry Reference Status

| Repo area | Entry file | References `RUN_PROTOCOL.md`? | References `RESULT_REPORTING_PROTOCOL.md`? |
|---|---|---:|---:|
| Cosmile | `CLAUDE.md` | Yes | Yes |
| SIASIU | `CLAUDE.md` | Yes | Yes |
| foundation-control | `CLAUDE.md` | Yes | Yes |
| foundation-docs | `README.md` | Yes | Yes |

## Protocol File Status

| Repo area | `RUN_PROTOCOL.md` | `RESULT_REPORTING_PROTOCOL.md` |
|---|---:|---:|
| Cosmile | Present | Present |
| SIASIU | Present | Present |
| foundation-control | Present | Present |
| foundation-docs | Present | Present |

## Boundary Coverage

Cosmile protocol states that Cosmile owns shop/cart/checkout/order, commerce events, RecommendationEvent / RecOutcomeEvent wiring, and commerce memory/event learning. It also states Cosmile must not own Foundation semantic contract, product/ingredient/safety canonical judgment, SIASIU consultation response, or foundation-control runtime.

SIASIU protocol states that SIASIU owns consultation API, chat route, `consult_via_foundation`, SIASIU semantic/response adapter, and service memory for consultation. It also states SIASIU must not own Cosmile checkout/order, commerce outcome event wiring, or Foundation canonical judgment.

foundation-control protocol states that foundation-control owns Foundation HTTP service, SSC/FRC contract, safety gate, semantic router, and canonical reasoning/product/safety output. It also states foundation-control must not own Cosmile commerce implementation, SIASIU UI/chat rendering, or order/payment/checkout logic.

foundation-docs protocol states that foundation-docs owns Advisor artifacts, evidence reports, architecture docs, run result archives, and mirrored operating rules. It also states foundation-docs must not be treated as runtime behavior source when runtime code differs.

## Runtime Source Code Diff Confirmation

No runtime source code files were edited by this protocol patch.

Cosmile has pre-existing V3-11C2 runtime diffs that were preserved and not staged/committed:

- `app/src/app/api/checkout/mock-complete/route.ts`
- `app/src/lib/ids.ts`
- untracked V3-11C2 files remain uncommitted, including:
  - `app/scripts/v3_11c2_rec_outcome.vitest.ts`
  - `app/src/lib/recOutcomeEventService.ts`

## Skipped Repos

None.

## Residual Risk

foundation-docs still has unrelated unpublished Advisor operating-rule changes from earlier tasks. They were intentionally not staged in this task.

## Recommended Next Step

Run a separate Advisor task to inspect the officially returned V3-11C2 Worker result and select the Sentinel reviewer route.
