# 01 Advisor Brief - V3-11C2 Phase 2A Approval Fields Options

Date: 2026-07-09

## Verdict

`PHASE2A_DECISION_PREP_READY_NEEDS_LEO_DECISION`

Phase 2A remains not approved for execution.

This artifact translates the Phase 2A approval fields into plain language and compares practical options. It does not authorize DB access, query execution, migration deploy, runtime edits, Worker handoff, flag ON, or operational use.

## Current Decision State

Leo/GPT has approved the architecture direction:

- `RecOutcomeEvent` is the current purchase outcome summary/current row, not append-only event history.
- `@@unique([orderItemId])` is the hard invariant.
- Future refund/cancel/reorder/attribution-change history belongs in a separate additive event log table.
- Phase 2A, if approved later, is read-only and checks whether a selected target DB is compatible with the current invariant.

Leo/GPT has not approved:

- target DB identity;
- DB access method;
- DB permissions;
- secret handling path;
- reviewer gate;
- Phase 2A execution.

## Plain-Language Approval Fields Leo Must Fill

Before Advisor can write any Phase 2A Worker handoff, Leo/GPT must answer these in plain language:

1. Which DB are we checking?
   - A non-secret name for the exact database, such as "local dev DB", "new non-prod rehearsal DB", or another approved alias.

2. Is this DB definitely not production/live/customer-facing?
   - If there is any doubt, do not use it.

3. How will the Worker connect without exposing secrets?
   - The Worker can use an already configured secure local environment, but must not print the raw `DATABASE_URL`, password, token, or credential-bearing host string.

4. Is the connection read-only?
   - Best answer: yes, read-only DB role.
   - If not, Leo/GPT must explicitly approve the limitation and require transaction-level read-only protection where possible.

5. What exactly may Worker check?
   - Duplicate count for `RecOutcomeEvent.orderItemId`.
   - Whether the D-O1 unique index/migration appears applied/pending/unknown.
   - No row dumps. Counts and status only.

6. What must make Worker stop?
   - Wrong DB, prod/live signal, secret exposure risk, duplicate count greater than 0, unexpected migration state, or any command that would write.

7. Who reviews the result?
   - Advisor recommendation: Sentinel review is required after Phase 2A because DB boundary and secret handling are involved, even if read-only.

8. Which design doc is the source?
   - At minimum, use the Advisor schema design review and Phase 2A package listed below.
   - Before merge or implementation beyond read-only preflight, promote the decision into a durable design doc or architecture record.

## Required Design Sources Before Execution

Minimum current design sources:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_commerce_memory_schema_design_review/01_SCHEMA_DESIGN_REVIEW.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase2a_readonly_preflight_approval_package/01_ADVISOR_BRIEF.md`

Current limitation:

These are Advisor artifacts, not runtime source-of-truth and not necessarily canonical product architecture docs.

Advisor recommendation:

Before any merge or implementation beyond read-only preflight, create or promote a canonical design record that captures:

- `RecOutcomeEvent` summary-row role;
- future event log direction;
- raw commerce event ownership in Cosmile;
- refined signal boundary for Foundation;
- Phase 2A/2B reviewer gates.

## Reviewer Gate Requirement

Recommended gate:

`SENTINEL_REVIEW_REQUIRED_AFTER_PHASE2A`

Reason:

Phase 2A is read-only, but it still touches DB identity, permission, secret handling, and migration-state evidence. A separate Sentinel session should verify:

- the DB target matched Leo/GPT approval;
- no write/deploy occurred;
- no raw secret or raw `DATABASE_URL` was exposed;
- only aggregate counts/status were reported;
- no runtime repo files were modified.

No Design Review, No Merge:

Any later runtime merge or Phase 2B migration rehearsal must have a design review record and Sentinel review before merge or operational claim.

## Option A - Use Current Cosmile Development DB As Read-Only Target

### Meaning

Use the currently available Cosmile development database as the Phase 2A target, but only for read-only checks.

### Advantages

- Fastest path if the DB is already configured.
- Low setup cost.
- Can quickly reveal whether duplicate `orderItemId` groups exist in the current development data.

### Risks

- "Current development DB" may be ambiguous.
- It may not match the intended target for future migration rehearsal.
- It may not have a true read-only role.
- It may contain messy local data that is not representative.
- Secret handling can be risky if the connection is stored in a local env file and Worker is not tightly instructed.

### Required Preparation

- Leo/GPT names the DB alias without secrets.
- Confirm it is not prod/live/customer-facing.
- Confirm whether it is local/dev only.
- Confirm whether read-only credentials exist.
- Confirm no raw customer/order/payment IDs may be output.

### Secret Exposure Prevention

- Worker must not print `DATABASE_URL`.
- Worker reports only: `connection source: approved local dev env`, not the value.
- If a tool echoes the URL, Worker must STOP before running it.

### Rollback / Stop Conditions

Rollback is not relevant if truly read-only.

STOP if:

- DB identity is unclear;
- DB might be prod/live/staging without explicit approval;
- read-only behavior cannot be guaranteed;
- duplicate count is greater than 0;
- migration state is unexpected;
- any command would write.

### Leo Must Decide

- Is the current development DB safe and meaningful enough for Phase 2A?
- Is there a read-only access path?
- Is messy dev data acceptable as preflight evidence?

## Option B - Configure A Separate Non-Prod Target DB First

### Meaning

Create or identify a dedicated non-prod database for this gate, then run Phase 2A read-only preflight against that exact DB after approval.

### Advantages

- Cleanest safety boundary.
- Easier to name and document the target.
- Easier to grant read-only permissions.
- Better foundation for later Phase 2B migration rehearsal.
- Reduces risk of accidentally touching prod/live or unrelated dev data.

### Risks

- Requires setup work before Phase 2A.
- Takes longer.
- If the DB is empty/fresh, it may not prove compatibility with any existing data.
- If copied from another environment, copy/sanitization policy must be designed first.

### Required Preparation

- Choose the exact non-prod DB alias.
- Decide whether it is empty/fresh, sanitized copy, or existing non-prod data.
- Create read-only access for Phase 2A.
- Define secret delivery without printing values.
- Define whether Phase 2B may later use the same DB.

### Secret Exposure Prevention

- Use a secure local env or secret manager reference only.
- Worker reports secret source label only, not values.
- If credential printing is required by a tool, STOP.

### Rollback / Stop Conditions

Rollback is not relevant for Phase 2A read-only.

STOP if:

- target DB is not the approved alias;
- role is not read-only and no exception exists;
- duplicate count is greater than 0;
- migration state is unexpected;
- secret exposure risk appears;
- any command would write.

### Leo Must Decide

- Should we invest time to create a safer dedicated non-prod target?
- Should the target be empty/fresh or representative data?
- Who owns the DB setup and access boundary?

## Option C - Hold Phase 2A And Clean Up Design / Review Gates First

### Meaning

Do not pick a DB yet. First create the design-doc/reviewer-gate structure needed for DB, migration, order, payment, refund, security, privacy, and cross-service boundary work.

### Advantages

- Safest for non-expert decision-making.
- Avoids rushing into DB access without clear ownership.
- Aligns with the new operating principle:
  - No Design Doc, No Implementation.
  - No Design Review, No Merge.
- Creates a reusable pattern for future DB/migration gates.

### Risks

- Slower.
- Phase 2A remains blocked.
- Does not produce DB evidence yet.

### Required Preparation

- Decide canonical design doc location.
- Decide who reviews DB/migration design.
- Define minimum reviewer gates for Phase 2A and Phase 2B.
- Decide whether current Advisor artifacts are enough for read-only Phase 2A or need promotion to canonical docs first.

### Secret Exposure Prevention

- No DB access happens, so no secret exposure risk in this step.
- Future handoffs must include masking and no-raw-URL rules.

### Rollback / Stop Conditions

Rollback is not relevant because no DB action occurs.

STOP if anyone tries to route Worker to DB before the design/review gate is approved.

### Leo Must Decide

- Where should the canonical design record live?
- Is Advisor artifact enough for Phase 2A, or should a formal design doc be created first?
- Which reviewer must review DB/migration boundary work before merge?

## Option Comparison

| Option | Best for | Main advantage | Main risk | Advisor view |
|---|---|---|---|---|
| A. Current development DB | Quick local signal | Fastest | DB identity/permissions may be ambiguous | Use only if Leo can clearly identify it as non-prod and read-only safe |
| B. Separate non-prod target DB | Safer DB gate | Clean boundary and better Phase 2B path | Requires setup | Best execution path once Leo is ready to proceed |
| C. Hold and clean design/review gate | Non-expert safety | Avoids premature DB access | Slower | Recommended immediate next step if DB identity is not obvious |

## Advisor Recommendation For Leo

Recommended now:

`OPTION_C_THEN_OPTION_B`

Plain meaning:

1. Do not run Phase 2A yet.
2. First lock the design-doc source and reviewer gate.
3. Then prepare a separate non-prod target DB for Phase 2A if DB evidence is still needed.

Reason:

Leo/GPT currently does not have a finalized target DB identity or access method. Choosing the current development DB now is only safe if everyone can clearly say what it is, prove it is not prod/live/customer-facing, and provide read-only access without exposing secrets.

If that is not immediately clear, Option C is safer than guessing.

## No Design Doc / No Design Review Rule

For DB, migration, order, payment, refund, security, permission, privacy, and Foundation-Cosmile-SIASIU boundary work:

- No Design Doc, No Implementation.
- No Design Review, No Merge.

For this V3-11C2 path, the minimum design package before execution should include:

- current summary-row invariant;
- future event-log boundary;
- exact target DB identity;
- read-only command boundary;
- secret masking policy;
- stop conditions;
- reviewer route.

## Next Gate

`LEO_DECISION_ON_PHASE2A_PATH`

Leo/GPT should choose one:

1. `CHOOSE_OPTION_A_CURRENT_DEV_DB`
2. `CHOOSE_OPTION_B_SEPARATE_NON_PROD_DB`
3. `CHOOSE_OPTION_C_HOLD_FOR_DESIGN_REVIEW_GATE`

Until one is chosen, Advisor must not write a Phase 2A Worker handoff.

## Prohibited Actions Confirmed

Advisor did not:

- access DB;
- run query;
- run migration;
- modify runtime repo;
- stage/commit/push runtime repo;
- enable flag;
- access secrets;
- print raw `DATABASE_URL`;
- create Worker handoff;
- send anything to Worker, Sentinel, or Service Reviewer.
