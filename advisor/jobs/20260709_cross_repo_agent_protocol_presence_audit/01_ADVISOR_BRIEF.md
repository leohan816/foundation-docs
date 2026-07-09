# 01 Advisor Brief - Cross-Repo Agent Protocol Presence Audit

## Verdict

`PROTOCOLS_MISSING_NEEDS_PATCH`

## Publish Status

`HELD_NOT_COMMITTED`

Reason: `../Cosmile` has tracked runtime diffs at audit time. Advisor publish rule says foundation-docs Advisor publishing should stop when runtime repo changes are present unless Leo/GPT grants an exception. This report was written locally but not committed or pushed.

## Executive Summary

None of the four checked repo areas currently has the requested `docs/agent/RUN_PROTOCOL.md` or `docs/agent/RESULT_REPORTING_PROTOCOL.md` files.

Existing entry documents are present for Cosmile, SIASIU, and foundation-control as `CLAUDE.md`; foundation-docs has `README.md` but no `CLAUDE.md`. None of those entry documents references both required protocol paths.

Repo boundary guidance exists in the current entry files, especially for Cosmile, SIASIU, and foundation-control, but the new Agent Run / Result Reporting Protocol layer is missing across all checked repos.

## Files Checked

Cosmile:

- `../Cosmile/CLAUDE.md` exists.
- `../Cosmile/docs/agent/RUN_PROTOCOL.md` missing.
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md` missing.

SIASIU:

- `../SIASIU/CLAUDE.md` exists.
- `../SIASIU/docs/agent/RUN_PROTOCOL.md` missing.
- `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md` missing.

foundation-control:

- `../foundation-control/CLAUDE.md` exists.
- `../foundation-control/docs/agent/RUN_PROTOCOL.md` missing.
- `../foundation-control/docs/agent/RESULT_REPORTING_PROTOCOL.md` missing.

foundation-docs / Foundation coordination:

- `../foundation-docs/CLAUDE.md` missing.
- `../foundation-docs/README.md` exists.
- `../foundation-docs/docs/agent/RUN_PROTOCOL.md` missing.
- `../foundation-docs/docs/agent/RESULT_REPORTING_PROTOCOL.md` missing.

## Presence Table

| Repo area | Entry file checked | Protocol reference present? | RUN_PROTOCOL present? | RESULT_REPORTING present? | Content sufficient? |
|---|---|---:|---:|---:|---:|
| Cosmile | `../Cosmile/CLAUDE.md` | No | No | No | No |
| SIASIU | `../SIASIU/CLAUDE.md` | No | No | No | No |
| foundation-control | `../foundation-control/CLAUDE.md` | No | No | No | No |
| foundation-docs / Foundation coordination | `../foundation-docs/README.md` | No | No | No | No |

## Missing Files

Cosmile:

- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

SIASIU:

- `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-control:

- `../foundation-control/docs/agent/RUN_PROTOCOL.md`
- `../foundation-control/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-docs / Foundation coordination:

- `../foundation-docs/CLAUDE.md`
- `../foundation-docs/docs/agent/RUN_PROTOCOL.md`
- `../foundation-docs/docs/agent/RESULT_REPORTING_PROTOCOL.md`

## Insufficient Files

All checked entry files are insufficient for the requested protocol layer because none references both:

- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`

All `RUN_PROTOCOL.md` and `RESULT_REPORTING_PROTOCOL.md` content checks fail because the files are missing.

## Required RUN_PROTOCOL Content Gap

Each missing `RUN_PROTOCOL.md` should include at least:

- `TARGET_PROJECT`
- `TARGET_REPO`
- role boundary
- Advisor as orchestration controller
- Worker/Sentinel/Service Reviewer results return to Advisor
- final approval remains Leo/GPT only
- launcher/run prompt first
- direct `READ_AND_EXECUTE`
- `DO_NOT_EXECUTE_FROM_MEMORY`
- `DO_NOT_BROADEN_SCOPE`
- skill prefix rules:
  - Worker implementation: `/fable-builder`
  - Sentinel review: `/fable-sentinel`
  - Debugger: `/fable-debugger`
  - `shared-reasoning-core` is not an active launcher skill prefix
- STOP conditions

## Required RESULT_REPORTING_PROTOCOL Content Gap

Each missing `RESULT_REPORTING_PROTOCOL.md` should include at least:

- Do not print long results in chat.
- Store results under `../foundation-docs/runs/<target-project>/<job-id>/`.
- Store Advisor pointers under `../foundation-docs/advisor/jobs/<job-id>/`.
- Chat output should contain only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK`.
- `NEXT ACTION ROUTING` includes target actor, target session, Leo action, return result to, do not send to, and status.
- Standard `POINTER BLOCK`.
- foundation-docs commit hash.
- runtime repo commit status.
- No secrets, PII, raw customer/order/payment IDs, or prod-live details.

## Repo Boundary Correctness

### Cosmile

Status: `PARTIAL_PRESENT_BUT_NEEDS_PROTOCOL_PATCH`

Existing `CLAUDE.md` correctly frames Cosmile as a Foundation-based commerce shell and assigns storefront, price, stock, SKU, sales status, cart, checkout, order, payment later, shipping, and admin sales fields to Cosmile. It also says Cosmile must not create Foundation verdicts or own suitability/product judgment.

Gap: the requested Agent Run / Result Reporting Protocol files and short references are missing.

### SIASIU

Status: `PARTIAL_PRESENT_BUT_NEEDS_PROTOCOL_PATCH`

Existing `CLAUDE.md` correctly frames SIASIU as the consultation/service adapter side, with semantic/response adapter ownership and service-owned voice/memory. It states Foundation decision/safety/evidence must not be overturned.

Gap: the requested Agent Run / Result Reporting Protocol files and short references are missing. The entry file does not currently provide the new launcher/result reporting contract.

### foundation-control

Status: `PARTIAL_PRESENT_BUT_NEEDS_PROTOCOL_PATCH`

Existing `CLAUDE.md` correctly frames foundation-control as control tower, not product runtime, and identifies Foundation as core owner for contracts, safety, Trust Core, adapters, internal API, and decision/evidence boundaries. It also states foundation-control is for cross-project contract, integration, regression, and release safety.

Gap: the requested Agent Run / Result Reporting Protocol files and short references are missing.

### foundation-docs / Foundation coordination

Status: `PARTIAL_PRESENT_BUT_NEEDS_PROTOCOL_PATCH`

Existing `README.md` frames foundation-docs as a documentation-only central mirror for Foundation / SIASIU / Cosmile reports and design artifacts. This supports the boundary that foundation-docs is not runtime code.

Gap: no `CLAUDE.md` exists, the requested `docs/agent` protocol files are missing, and README does not explicitly say runtime behavior must be verified in runtime code when docs conflict with code.

## Files Needing Creation Or Update

Required creation:

- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-control/docs/agent/RUN_PROTOCOL.md`
- `../foundation-control/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-docs/docs/agent/RUN_PROTOCOL.md`
- `../foundation-docs/docs/agent/RESULT_REPORTING_PROTOCOL.md`

Required entry-file updates:

- `../Cosmile/CLAUDE.md`
- `../SIASIU/CLAUDE.md`
- `../foundation-control/CLAUDE.md`
- `../foundation-docs/README.md` or new `../foundation-docs/CLAUDE.md`

## Git Status Summary

Cosmile:

- branch: `shadow/m4-cosmile-memory`
- tracked runtime diffs present:
  - `app/src/app/api/checkout/mock-complete/route.ts`
  - `app/src/lib/ids.ts`
- untracked V3-11C2-related files are also present:
  - `app/scripts/v3_11c2_rec_outcome.vitest.ts`
  - `app/src/lib/recOutcomeEventService.ts`
- additional untracked docs are present.

SIASIU:

- branch: `shadow/m4-siasiu-memory`
- tracked diff: none observed
- untracked docs present.

foundation-control:

- branch: `shadow/m5-ingress-gate`
- tracked diff: none observed
- many untracked docs present.

foundation-docs:

- branch: `main`
- uncommitted Advisor changes were already present before this audit:
  - role result storage protocol files/updates
  - reviewer selection protocol files/updates
- this audit added:
  - `advisor/jobs/20260709_cross_repo_agent_protocol_presence_audit/00_INTAKE.md`
  - `advisor/jobs/20260709_cross_repo_agent_protocol_presence_audit/01_ADVISOR_BRIEF.md`
  - `advisor/jobs/20260709_cross_repo_agent_protocol_presence_audit/index.md`

## Commit / Push Status

This audit report was not committed or pushed.

Reason:

- `../Cosmile` has tracked runtime diffs.
- Advisor publish rule requires stopping when runtime repo changes are present unless Leo/GPT grants an exception.
- Runtime repo files were not staged or committed.

## Recommended Next Step

Leo/GPT should decide whether to allow an Advisor-only foundation-docs commit/push despite the existing `../Cosmile` runtime diff, or first resolve/publish the Worker result state.
