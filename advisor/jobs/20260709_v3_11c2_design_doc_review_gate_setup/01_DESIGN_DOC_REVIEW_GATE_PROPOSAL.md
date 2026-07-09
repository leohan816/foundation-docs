# 01 Design Doc Review Gate Proposal - V3-11C2 Phase 2A Option C

Date: 2026-07-09

## Verdict

`OPTION_C_DESIGN_REVIEW_GATE_PROPOSAL_READY_NEEDS_LEO_DECISION`

Leo/GPT selected:

`OPTION_C_HOLD_FOR_DESIGN_REVIEW_GATE`

Phase 2A read-only preflight remains not approved. No DB access, query execution, migration execution, runtime edit, Worker handoff, flag ON, main merge, or secret access is authorized by this artifact.

## Executive Summary

Before V3-11C2 Phase 2A can proceed, the design-doc source and design-review gate should be fixed.

Operating rule for this area:

- No Design Doc, No Implementation.
- No Design Review, No Merge.

This applies to DB, migration, order, payment, refund, security, permission, privacy, and Foundation-Cosmile-SIASIU boundary work.

## Repo Convention Inventory

Advisor checked repo folder conventions read-only.

| Repo | Existing design-like locations observed | `docs/design/` observed? | `설계문서/` observed? | Notes |
|---|---|---:|---:|---|
| `../Cosmile` | `설계자료/`, `문서/`, `비전/`, `docs/`, `app/docs/` | No | No | Existing convention is mixed; `설계자료/` exists, but Leo prefers `설계문서/`. |
| `../SIASIU` | `설계문서/`, `docs/`, `memory_migration/` | No | Yes | Strongest repo-local match for Leo preference. |
| `../foundation-control` | `설계자료/`, `docs/`, `contracts/`, `reports/` | No | No | Existing convention is `설계자료/`; canonical Foundation contract files also live in runtime/code paths. |
| `../foundation-advisor` | `AGENTS.md`, `CLAUDE.md`, `README.md`, `templates/` | No | No | This is an Advisor cockpit, not runtime. Operating rules are files at repo root and mirrored to foundation-docs. |
| `../foundation-docs` | `설계문서/`, `설계문서/cosmile/`, `설계문서/foundation/`, `설계문서/siasiu/`, `설계문서/shared/`, `docs/decisions/`, `advisor/jobs/` | No | Yes | Best current central cross-repo design archive location. |

No target repo showed an established `docs/design/` convention in this read-only inventory.

## Canonical Design Doc Location Proposal

### Recommended Standard

Use `설계문서/` as the canonical design-doc folder name going forward, matching Leo preference and the existing SIASIU/foundation-docs convention.

For cross-repo architecture, use `../foundation-docs/설계문서/<project-or-shared>/` as the GitHub-visible canonical archive.

For repo-local runtime implementation details, allow repo-local `설계문서/` where the repo already has or needs local design ownership.

### Per-Repo Proposal

| Repo | Proposed canonical location | Existing convention compatibility | Recommendation |
|---|---|---|---|
| `../Cosmile` | `../Cosmile/설계문서/` for repo-local runtime design; mirror durable cross-repo record to `../foundation-docs/설계문서/cosmile/` | `../Cosmile/설계자료/` exists; `설계문서/` does not | Prefer new `설계문서/` going forward. Treat `설계자료/` as legacy/historical unless Leo wants a migration. |
| `../SIASIU` | `../SIASIU/설계문서/`; mirror shared/cross-repo records to `../foundation-docs/설계문서/siasiu/` | Already has `설계문서/` | Keep existing convention. |
| `../foundation-control` | `../foundation-control/설계문서/` for new design docs; mirror Foundation-wide decisions to `../foundation-docs/설계문서/foundation/` or `shared/` | `../foundation-control/설계자료/` exists; `설계문서/` does not | Prefer new `설계문서/` going forward. Treat `설계자료/` as legacy/historical unless migrated deliberately. |
| `../foundation-advisor` | Advisor operating rules remain `AGENTS.md`, `CLAUDE.md`, `README.md`, `templates/`; durable design/process records should live in `../foundation-docs/설계문서/shared/` or `../foundation-docs/advisor/_system/` if they are operating-rule mirrors | No design folder | Do not create runtime-like design docs in Advisor cockpit unless needed. Use foundation-docs for durable published design/process records. |
| `../foundation-docs` | `../foundation-docs/설계문서/cosmile/`, `foundation/`, `siasiu/`, `shared/`; Advisor job evidence remains in `../foundation-docs/advisor/jobs/` | Already has `설계문서/` | Use as central GitHub-visible design archive and cross-repo coordination record. |

## Advisor Artifacts vs Canonical Design Docs

### Advisor Artifacts

Advisor artifacts under `../foundation-docs/advisor/jobs/<job-id>/` are:

- task evidence;
- briefs;
- routing records;
- review packets;
- final audits;
- loop state;
- decision packages for a specific orchestration loop.

They are durable and should be pushed, but they are not the long-term canonical design source by themselves.

### Canonical Design Docs

Canonical design docs under `설계문서/` should be:

- stable architecture/design records;
- source of intended invariants;
- reviewed design decisions;
- reusable by future Worker/Sentinel/Reviewer sessions;
- not tied to one Advisor job loop;
- referenced by implementation briefs and merge gates.

### Source-of-Truth Boundary

Runtime code still defines current behavior.

Canonical design docs define approved intent and invariants. If runtime code and canonical design conflict, Advisor must report the conflict instead of silently inferring.

Advisor job artifacts preserve how decisions were made and reviewed, but future implementation should link to canonical design docs for design authority.

## V3-11C2 Commerce Memory Design Record Promotion Proposal

Create or promote a canonical Cosmile design record:

Proposed central path:

`../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`

Optional repo-local path if Leo wants runtime repo-local design ownership:

`../Cosmile/설계문서/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`

Do not create either file until Leo/GPT approves the location.

### Required Content To Promote

The design record must include these approved decisions:

1. `RecOutcomeEvent` is not an append-only event log.
2. `RecOutcomeEvent` is one purchase outcome summary/current row per `OrderItem`.
3. `@@unique([orderItemId])` is the hard invariant.
4. One paid `OrderItem` can produce at most one purchase outcome summary row.
5. Future refund/cancel/reorder/attribution-change history will not be stored as multiple `RecOutcomeEvent` rows.
6. Future lifecycle history should use a separate additive event log table.
7. Raw commerce evidence remains in Cosmile.
8. Foundation receives only refined/whitelisted signals.
9. Foundation does not own raw order/payment/customer data.
10. Traceability is maintained through `CommerceEvent.id`, `FoundationSignalOutbox.sourceEventId`, future `sourceCommerceEventId`, or a dedicated trace id.
11. Event log table implementation is not yet approved.
12. Phase 2A is read-only only and does not approve Phase 2B migration rehearsal.

### Current Advisor Evidence To Link

The canonical design record should link back to:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_commerce_memory_schema_design_review/01_SCHEMA_DESIGN_REVIEW.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase2a_readonly_preflight_approval_package/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase2a_approval_fields_options/01_ADVISOR_BRIEF.md`

## Design Review Gate Proposal

Required gate for V3-11C2 Commerce Memory / RecOutcomeEvent / future EventLog / Foundation Signal Boundary design:

1. **Advisor Design Draft**
   - Advisor or assigned design author writes the canonical design doc draft.
   - No implementation, runtime edit, DB access, query execution, migration execution, or Worker handoff.

2. **Fable5 Design Review**
   - Independent design review for unknowns, business invariant clarity, architecture consistency, and future extensibility.
   - Read-only.
   - Must run in a separate Fable5 review session, never the Advisor or Worker session.

3. **Advisor Review Consolidation**
   - Advisor compares Fable5 findings against the design draft and Leo/GPT intent.
   - Advisor must not proceed if Fable5 returns `NEEDS_PATCH` or `FAIL`.
   - If Fable5 returns `PASS_WITH_RISK`, Advisor must classify whether the risk is explicitly acceptable or needs Leo/GPT decision.

4. **Leo/GPT Final Design Approval**
   - Leo/GPT accepts, rejects, or revises the consolidated design.
   - Final design approval remains with Leo/GPT.

5. **Only Then: Worker Implementation Or Phase 2A Execution Consideration**
   - Only after final design approval may Advisor consider writing a Worker implementation handoff or Phase 2A execution handoff.
   - Handoff must link the approved canonical design doc and the review consolidation.

6. **Implementation Review**
   - If implementation or DB execution later occurs, an appropriate implementation reviewer reviews the actual diff/result.
   - Reviewer must not trust Worker reports and must inspect diff/evidence directly.

7. **Final Closure**
   - Advisor compares original intent, design doc, Worker result, Reviewer findings, and evidence.
   - Leo/GPT remains final approver.

### Codex/SOL Availability Note

Codex/SOL design review is not part of the current required design gate because Codex 5.6 SOL reviewer is unavailable.

If Codex/SOL becomes available later, it should be considered as a retrospective review candidate before:

- production/main merge;
- `COSMILE_REC_OUTCOME_ENABLED` flag ON;
- Phase 2B migration rehearsal against a persistent target;
- operational use.

### Review Verdicts

Fable5 Design Reviewer must use one of these verdicts:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Blocking rule:

- Do not proceed to Phase 2A, Phase 2B, Worker implementation, runtime repo modification, DB access, query execution, or migration execution unless Fable5 Design Review returns `PASS` or a Leo/GPT-accepted `PASS_WITH_RISK` and Leo/GPT gives final design approval.
- `NEEDS_PATCH` means Advisor must route a design patch loop, not implementation.
- `FAIL` means stop and return to Leo/GPT.

## Reviewer Responsibilities

### Fable5 Design Review

Fable5 should focus on:

- whether the design doc accurately reflects Leo/GPT business decisions;
- whether the `RecOutcomeEvent` summary/current row interpretation is sound;
- whether a separate additive future event log is safer than multiple `RecOutcomeEvent` rows;
- whether raw commerce evidence remains in Cosmile and Foundation receives refined signals only;
- whether personal data, payment data, raw order/customer data, and secrets are blocked from Foundation signals;
- whether Phase 2A is sufficiently narrowed to read-only invariant checking;
- whether refund/cancel/reorder/direct/session attribution can be added later without replacing the current structure;
- unknowns, blindspots, and hidden assumptions;
- whether the design is clear enough to support future implementation.

Fable5 should not implement, patch, or approve final release.

## Draft Design Review Handoff Prompts

This is a prompt draft only. Do not use it until the canonical design doc is written and Leo/GPT authorizes Fable5 design review routing.

### Draft - Fable5 Design Review Prompt

```text
TARGET_ACTOR: Fable5 Design Reviewer
TARGET_SESSION: separate Fable5 review session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target reviewer session

Fable5 Design Reviewer 확인.

이 작업은 설계검수입니다.
구현 작업이 아닙니다.
DB 접속, query 실행, migration 실행, runtime repo 수정, Worker handoff 작성은 금지입니다.

Required skill/role:
/fable-sentinel if available, but use it as design review only.

Read:
- <canonical V3-11C2 Commerce Memory design doc path, to be filled after Leo/GPT approves location>
- ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/01_DESIGN_DOC_REVIEW_GATE_PROPOSAL.md
- Relevant linked Advisor evidence if needed

Review focus:
- 설계문서가 Leo/GPT business decision을 정확히 반영했는가
- RecOutcomeEvent summary/current row 해석이 타당한가
- future event log를 separate additive table로 두는 방향이 안전한가
- raw commerce evidence는 Cosmile에 남기고 Foundation에는 refined signal만 보내는 boundary가 명확한가
- 개인정보/결제/주문 raw data가 Foundation signal에 섞이지 않도록 설계되어 있는가
- Phase 2A가 read-only invariant check로 충분히 좁혀져 있는가
- 나중에 refund/cancel/reorder/direct/session attribution이 들어와도 현재 구조를 갈아엎지 않아도 되는가
- unknowns / blindspots / hidden assumptions가 남아 있는가
- 설계문서가 구현으로 넘어갈 만큼 명확한가

Do not:
- implement
- patch files
- access DB
- run queries
- run migrations
- inspect secrets
- print raw DATABASE_URL
- approve final release

Return verdict exactly one of:
- PASS
- PASS_WITH_RISK
- NEEDS_PATCH
- FAIL

Return result to Advisor with:
## RESULT SUMMARY
## FINDINGS
## REVIEWER VERDICT
## NEXT ACTION ROUTING
## POINTER BLOCK
```

## Conditions To Return To Phase 2A

Option C is complete enough to return to Phase 2A only when all of these are true:

1. Canonical design doc path is confirmed.
2. V3-11C2 Commerce Memory design record is written or promoted.
3. Design review route is confirmed.
4. Fable5 Design Review is complete with `PASS` or Leo/GPT-accepted `PASS_WITH_RISK`.
5. Advisor review consolidation is complete.
6. Leo/GPT gives final design approval.
7. Phase 2A target DB identity is separately decided.
8. Phase 2A read-only access method is separately decided.
9. Phase 2A secret masking policy is separately decided.
10. Phase 2A reviewer requirement is separately decided.
11. Advisor writes a fresh Phase 2A Worker brief/run prompt.

Until then, Advisor must not send any Phase 2A Worker handoff to Cosmile.

## Option B Preparation Criteria

If Option C later leads to Option B, the separate non-prod DB should satisfy:

- exact non-secret DB alias is named;
- confirmed not prod/live/customer-facing;
- purpose is documented: V3-11C2 Phase 2A read-only preflight and possibly later Phase 2B rehearsal if separately approved;
- read-only role exists for Phase 2A;
- write/deploy role is not used in Phase 2A;
- raw `DATABASE_URL` is never printed;
- secret source is a label/reference only;
- DB data source is defined: empty/fresh, synthetic, or sanitized non-prod copy;
- no raw customer/order/payment data is exposed in reports;
- duplicate preflight output is aggregate count only;
- migration status inspection method is proven read-only or explicitly bounded;
- Sentinel review is required after Phase 2A;
- Phase 2B has separate backup/rollback and deploy approval.

Do not create or connect to any DB in this proposal step.

## Recommended Next Decision

Advisor recommends:

`APPROVE_CANONICAL_DESIGN_DOC_LOCATION`

Recommended location:

`../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`

Reason:

- It is GitHub-visible.
- `foundation-docs/설계문서/cosmile/` already exists.
- It avoids runtime repo edits before design location approval.
- It can later be mirrored into `../Cosmile/설계문서/` if Leo/GPT wants repo-local canonical design docs.

## Prohibited Actions Confirmed

Advisor did not:

- execute Phase 2A;
- write Worker handoff;
- access DB;
- run query;
- run migration;
- modify runtime repo;
- stage/commit/push runtime repo;
- enable flag;
- merge main;
- access secrets;
- print raw `DATABASE_URL`;
- send anything to Worker, Sentinel, or Service Reviewer.
