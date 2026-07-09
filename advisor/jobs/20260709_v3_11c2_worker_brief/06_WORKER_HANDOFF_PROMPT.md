# 06 Worker Handoff Prompt - V3-11C2 Organic RecOutcomeEvent MVI

Copy and paste the prompt below into a separate Worker session. Do not run it inside the Advisor session.

```text
Worker 확인.

Required skill: fable-builder.

You are the Worker for V3-11C2 Organic RecOutcomeEvent MVI.

You are not the Advisor.
You are not the Sentinel Reviewer.
You are not the Service Reviewer.
You are not the final approver.

This is an implementation task in Cosmile only, using the approved Advisor Worker brief.

Read first:
- ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md
- ../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/01_ADVISOR_BRIEF.md
- ../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/01_ADVISOR_BRIEF.md
- ../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md
- ../Cosmile/app/CLAUDE.md

Exact task:
Implement V3-11C2 Organic RecOutcomeEvent MVI in Cosmile.

When mock checkout completes an order and completeMockOrder returns justPaid=true, emit one organic RecOutcomeEvent per OrderItem behind a default-OFF feature flag.

Approved behavior:
- scope: organic checkout MVI only
- hook: mock-complete after completeMockOrder returns justPaid=true
- per line: one event per OrderItem
- recommendationId: null
- attributionMode: organic
- ID format: rec_out_v3_ + ULID(26)
- idempotency: code-level existing-check by orderItemId
- feature flag: COSMILE_REC_OUTCOME_ENABLED, default OFF
- failure mode: fail-open for checkout with observable result

Repo and branch:
- Repo: ../Cosmile
- App root: ../Cosmile/app
- Target branch: current approved shadow branch. Advisor observed shadow/m4-cosmile-memory, but verify before editing.

Before any change:
cd ../Cosmile
git branch --show-current
git status --short

STOP if the branch is main, a prod/live branch, or any branch not explicitly approved by Leo/GPT.

Allowed files only:
- ../Cosmile/app/src/lib/ids.ts
- ../Cosmile/app/src/lib/recOutcomeEventService.ts (new)
- ../Cosmile/app/src/app/api/checkout/mock-complete/route.ts
- ../Cosmile/app/scripts/v3_11c2_rec_outcome.vitest.ts (new)
- ../Cosmile/app/scripts/v3_11c2_rec_outcome.dbtest.py (optional, only if you add a safe non-prod DB-shape test)

Forbidden files and areas:
- ../Cosmile/app/prisma/schema.prisma
- ../Cosmile/app/prisma/migrations/**
- ../Cosmile/app/src/lib/checkout.ts
- ../Cosmile/app/src/types/recOutcome.ts
- ../Cosmile/app/src/lib/memoryCandidate.ts
- ../Cosmile/app/src/lib/adverse.ts
- ../Cosmile/app/src/adapters/**
- ../Cosmile/app/src/lib/foundation/**
- ../SIASIU/**
- ../foundation-control/**
- ../skill/**
- ../foundation-advisor/**
- prod/live/main/secret/env files

Do not create, change, or run schema migrations.
Do not access prod/live DBs or secrets.
Do not implement direct/session/refund/reorder/semantic feedback/V3-11D.
Do not modify SIASIU or foundation-control.

Implementation requirements:
1. Add a dedicated RecOutcomeEvent ID generator in src/lib/ids.ts:
   - function name clearly indicates RecOutcomeEvent, for example recOutcomeEventId()
   - format: rec_out_v3_ + ULID(26)
   - add a regex constant for tests, for example REC_OUTCOME_ID_RE
   - do not reuse recommendationId()
   - do not hand-roll IDs at callsites

2. Create src/lib/recOutcomeEventService.ts:
   - feature flag constant: COSMILE_REC_OUTCOME_ENABLED
   - default OFF
   - lazy import Prisma only in default write path
   - dependency injection for tests
   - fail-open: never throw to checkout caller
   - observable result object for written/skipped/error
   - flag OFF -> no write, skipped flag_off
   - flag ON + valid owner/order item -> write organic RecOutcomeEvent
   - code-level existing-check by orderItemId
   - userId -> subjectRef
   - guestId -> anonymousRef
   - exactly one of subjectRef / anonymousRef
   - neither or both -> observable xor_violation, no write
   - recommendationId = null
   - attributionMode = organic
   - orderId, orderItemId, productId, skuId from the paid order item
   - no refund fields
   - no raw text, PII, full order/customer/payment IDs, or secrets in logs or evidence

3. Update src/app/api/checkout/mock-complete/route.ts:
   - call the RecOutcomeEvent service only when justPaid=true
   - keep existing purchase_complete CommerceEvent behavior intact
   - pass current shopper identity and returned order.items
   - do not block checkout response if RecOutcomeEvent write fails
   - do not emit RecOutcomeEvent when justPaid=false

Tests required:
cd ../Cosmile/app
npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts
npx vitest run scripts/v3_11c_rec_event.vitest.ts
npm run lint

Required test coverage:
1. recOutcomeEventId() format is rec_out_v3_ + ULID(26).
2. flag OFF -> no create/find write path, skipped flag_off.
3. flag ON + userId -> one organic event with subjectRef, anonymousRef=null, recommendationId=null, attributionMode=organic.
4. flag ON + guestId -> one organic event with anonymousRef, subjectRef=null.
5. both userId and guestId -> xor_violation, no create.
6. neither userId nor guestId -> xor_violation, no create.
7. existing event for orderItemId -> skip duplicate, no create.
8. create failure -> fail-open result such as write_failed, no throw.
9. order helper with two order items -> two write attempts when both are new.
10. route hook behavior is covered directly or through an order-level helper: no call when justPaid=false; call only for paid order items when justPaid=true.

Completion criteria:
- Feature flag default OFF means no write attempt.
- Flag ON writes organic RecOutcomeEvent shape in tests.
- Existing purchase_complete CommerceEvent remains intact.
- Checkout response is not blocked by RecOutcomeEvent write failure.
- Idempotency by orderItemId is enforced in code.
- No schema/migration changes are made.
- No SIASIU/foundation-control changes are made.
- No direct/session/refund/reorder/semantic feedback behavior is added.
- Required tests pass or failures are clearly reported with cause.

STOP and report if:
- Current branch is main or a prod/live branch.
- You need to modify a file outside the allowed list.
- You need schema or migration changes.
- You need DB/prod/live/main/secret access.
- You need to implement direct/session/refund/reorder/semantic feedback.
- You need SIASIU or foundation-control changes.
- Existing purchase_complete behavior cannot be preserved.
- The approved Worker brief conflicts with actual code in a way that cannot be resolved inside the allowed scope.

Final Worker report format:
1. Branch name and commit hash if committed; if not committed, state not committed.
2. Files changed.
3. Summary of behavior implemented.
4. Feature flag behavior, including default OFF.
5. Idempotency behavior.
6. Fail-open behavior.
7. Test commands run and results.
8. Explicit confirmation that schema/migrations were not modified.
9. Explicit confirmation that SIASIU/foundation-control were not modified.
10. Explicit confirmation that direct/session/refund/reorder/semantic feedback/V3-11D were not implemented.
11. Any residual risks or skipped tests.

Return the Worker result to Advisor for orchestration. Do not ask Leo/GPT for final approval and do not mark the work finally approved.
```
