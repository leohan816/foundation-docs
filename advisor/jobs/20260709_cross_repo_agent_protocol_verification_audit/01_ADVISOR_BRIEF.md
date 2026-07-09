# Cross-Repo Agent Protocol Verification Audit

Date: 2026-07-09

## Final Verdict

`CROSS_REPO_PROTOCOL_VERIFIED_WITH_LIMITS`

The Cross-Repo Agent Protocol Patch is present and content-sufficient across Cosmile, SIASIU, foundation-control, and foundation-docs. Entry files reference the protocol docs, both protocol docs exist in each repo, required run/result reporting fields are present, and repo boundaries are correctly stated.

Limit: this audit report was not committed/pushed because `../Cosmile` still has an expected uncommitted V3-11C2 runtime diff and the current instruction says to stop and request Leo/GPT decision if that conflicts with Advisor publish rules. Runtime repo files were not staged or committed.

## Files Directly Checked

Cosmile:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

SIASIU:

- `../SIASIU/CLAUDE.md`
- `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-control:

- `../foundation-control/CLAUDE.md`
- `../foundation-control/docs/agent/RUN_PROTOCOL.md`
- `../foundation-control/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-docs:

- `../foundation-docs/README.md`
- `../foundation-docs/docs/agent/RUN_PROTOCOL.md`
- `../foundation-docs/docs/agent/RESULT_REPORTING_PROTOCOL.md`

## Per-Repo Verification Table

| Repo | Entry reference | RUN_PROTOCOL exists | RUN sufficient | RESULT_PROTOCOL exists | RESULT sufficient | Boundary correct | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| Cosmile | Yes | Yes | Yes | Yes | Yes | Yes | Verified |
| SIASIU | Yes | Yes | Yes | Yes | Yes | Yes | Verified |
| foundation-control | Yes | Yes | Yes | Yes | Yes | Yes | Verified |
| foundation-docs | Yes | Yes | Yes | Yes | Yes | Yes | Verified |

## Entry Reference Status

All entry files contain a short `Agent Run / Result Protocol` reference section and point to:

- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`

The entry files also state that long role results should not be pasted into chat by default and should be stored under `../foundation-docs/runs/<target-project>/<job-id>/`, with chat limited to `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` unless Advisor/Leo explicitly requests full text.

## RUN_PROTOCOL Sufficiency

All four `RUN_PROTOCOL.md` files include:

- `TARGET_PROJECT`
- `TARGET_REPO`
- `TARGET_APP_ROOT` where applicable
- role boundary
- Advisor as orchestration controller
- Worker/Sentinel/Service Reviewer sessions execute only assigned roles
- role results return to Advisor
- final approval remains Leo/GPT only
- launcher/run prompt first
- `READ_AND_EXECUTE`
- `DO_NOT_EXECUTE_FROM_MEMORY`
- `DO_NOT_BROADEN_SCOPE`
- skill prefix rules:
  - Worker implementation: `/fable-builder`
  - Sentinel review: `/fable-sentinel`
  - Debugger: `/fable-debugger`
  - `shared-reasoning-core` is not an active launcher skill prefix
- STOP conditions

## RESULT_REPORTING_PROTOCOL Sufficiency

All four `RESULT_REPORTING_PROTOCOL.md` files include:

- long role results should not be printed in chat by default
- result storage under `../foundation-docs/runs/<target-project>/<job-id>/`
- Advisor pointer storage under `../foundation-docs/advisor/jobs/<job-id>/`
- standard Worker/Sentinel/Service Reviewer result file names
- standard pointer file names
- chat output limited to:
  - `RESULT SUMMARY`
  - `NEXT ACTION ROUTING`
  - `POINTER BLOCK`
- required `NEXT ACTION ROUTING` fields:
  - Target actor
  - Target session
  - Leo action
  - Return result to
  - Do not send to
  - Status
- `POINTER BLOCK` standard
- `FOUNDATION_DOCS_COMMIT`
- `RUNTIME_COMMIT_STATUS`
- no secrets, PII, raw customer/order/payment IDs, prod/live details, full env dumps, or real customer data

## Boundary Correctness

Cosmile boundary is correct:

- Owns shop/cart/checkout/order, commerce events, RecommendationEvent/RecOutcomeEvent wiring, and commerce memory/event learning.
- Must not own Foundation semantic contract, product/ingredient/safety canonical judgment, SIASIU consultation response, or foundation-control runtime.

SIASIU boundary is correct:

- Owns consultation API, chat route, `consult_via_foundation`, SIASIU semantic/response adapter, and service memory for consultation.
- Must not own Cosmile checkout/order, commerce outcome event wiring, or Foundation canonical judgment.

foundation-control boundary is correct:

- Owns Foundation HTTP service, SSC/FRC contract, safety gate, semantic router, and canonical reasoning/product/safety output.
- Must not own Cosmile commerce implementation, SIASIU UI/chat rendering, or order/payment/checkout logic.

foundation-docs boundary is correct:

- Owns advisor artifacts, evidence reports, architecture docs, run result archives, and mirrored operating rules.
- Must not be treated as runtime behavior source when runtime code differs.

## Protocol Patch Commit Verification

Latest protocol patch commits checked:

| Repo | Branch | Latest commit checked | Files in commit |
|---|---|---|---|
| `../Cosmile` | `shadow/m4-cosmile-memory` | `caba8c6035309fff5b6b5870b6993535f4375dda` | `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` |
| `../SIASIU` | `shadow/m4-siasiu-memory` | `ed30f6504ecfdf88336c82b8f19d9ab24d97af02` | `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` |
| `../foundation-control` | `shadow/m5-ingress-gate` | `0183ec2bb72014f4b2e8402a1e13dfe3cec5bc0f` | `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` |
| `../foundation-docs` | `main` | `cb9f3b4005b55bce6a97e5a0ec98b4302a9daf08` | `README.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`, Advisor patch report files |

The protocol patch commits did not include runtime source code, schema, migration, DB, prod/live, or secret changes.

## Runtime Source Code Diff Confirmation

`../Cosmile` still has expected uncommitted V3-11C2 runtime diff:

- Modified: `app/src/app/api/checkout/mock-complete/route.ts`
- Modified: `app/src/lib/ids.ts`
- Untracked: `app/scripts/v3_11c2_rec_outcome.vitest.ts`
- Untracked: `app/src/lib/recOutcomeEventService.ts`
- Additional untracked docs under `app/docs/`

This diff was not staged or committed by the protocol patch. It remains outside this verification audit.

Other repos also contain unrelated untracked docs, but the protocol patch commits only included the intended entry/protocol/report files.

## Commit/Push Status

Held. This Advisor audit report was written locally but not committed/pushed because:

1. `../Cosmile` has an existing runtime diff.
2. The user explicitly instructed that if this conflicts with Advisor publish rules, Advisor must STOP and request Leo/GPT decision.
3. No runtime repo files were staged or committed.

If Leo/GPT grants an explicit exception, only these three files should be staged/committed/pushed:

- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_verification_audit/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_verification_audit/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_verification_audit/index.md`

Suggested commit message if approved:

`docs(advisor): add cross-repo agent protocol verification audit`

## Remaining Gaps

No content gaps were found in the protocol patch itself.

Operational gaps:

- The verification audit report needs Leo/GPT exception approval before foundation-docs commit/push because `../Cosmile` has expected uncommitted runtime diff.
- `../foundation-docs` has other pre-existing uncommitted Advisor operating-rule files. They must not be staged with this verification audit unless separately approved.

## Recommended Next Step

Leo/GPT should decide whether to allow an exception commit/push for only this Advisor verification audit report while preserving the uncommitted `../Cosmile` V3-11C2 runtime diff.
