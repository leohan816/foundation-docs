TARGET_ACTOR: Sentinel
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Sentinel
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# 07 Sentinel Handoff Prompt - V3-11C2 Organic RecOutcomeEvent MVI

## REVIEWER ROUTING DECISION

- Target actor:
  Sentinel

- Selected reviewer:
  fable5 Sentinel

- Target session:
  fable5 Sentinel session

- Required skill:
  `/fable-sentinel`

- Reason:
  V3-11C2 touches Cosmile checkout/order outcome event wiring and uncommitted runtime code. It is default-OFF and has no schema/prod/live change, but it still needs a strict independent diff/test/code/evidence review before any Service Review or final audit.

- Not selected:
  Control Reviewer: too broad for a direct implementation diff review.
  Opus 4.8 Sentinel: acceptable for Level 2, but this touches checkout/order learning behavior.
  Codex SOL / Codex 5.6 SOL Sentinel: reserved for DB/schema/payment/prod-live/security/Foundation contract escalation or if fable5 finds unresolved risk.
  Multi-reviewer: not required yet because scope is narrow, flag default OFF, and no schema/prod/live changes are approved.

- Review level:
  Level 3

- Return result to:
  Advisor

- Status:
  READY_TO_USE

## Prompt

Sentinel 확인.

Required skill: `/fable-sentinel`.

You are the independent Sentinel reviewer for V3-11C2 Organic RecOutcomeEvent MVI.

You are not the Advisor.
You are not the Worker.
You are not the Service Reviewer.
You are not the final approver.

This is a read-only review. Do not implement fixes. Do not patch files. Do not stage, commit, or push runtime repo changes. Do not approve final release.

## Review Target

Review the uncommitted Cosmile Worker implementation for V3-11C2 against:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/03_SENTINEL_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/01_ADVISOR_BRIEF.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md`
- actual Cosmile git diff, changed code, and tests

Do not trust the Worker report. Verify directly.

## Expected Read-Only Inspection

Use read-only commands such as:

```bash
cd ../Cosmile
git branch --show-current
git status --short
git diff --name-status
git diff -- app/src/lib/ids.ts app/src/app/api/checkout/mock-complete/route.ts
sed -n '1,260p' app/src/lib/recOutcomeEventService.ts
sed -n '1,340p' app/scripts/v3_11c2_rec_outcome.vitest.ts
```

If local/non-prod test execution is safe, rerun:

```bash
cd ../Cosmile/app
npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts
npx vitest run scripts/v3_11c_rec_event.vitest.ts
npm run lint
```

If broad lint fails from unrelated pre-existing files, report exact unrelated failures and whether the V3-11C2 files are clean.

Do not connect to prod/live DB. Do not access secrets. Do not run schema migrations. Do not write DB data.

## Technical Checklist

Verify:

- Diff is limited to allowed files.
- Untracked V3-11C2 files are intentional and within allowed files.
- No schema/migration changes.
- No SIASIU changes.
- No foundation-control changes.
- No prod/live/main/secret access.
- Feature flag is `COSMILE_REC_OUTCOME_ENABLED`.
- Feature flag default is OFF.
- Flag OFF makes no write/find attempt.
- RecOutcomeEvent ID uses dedicated `rec_out_v3_` + ULID(26), not `recommendationId()`.
- Service is fail-open and returns observable result.
- Service uses dependency injection or equivalent provider-independent test seam.
- Prisma is lazy-loaded only in default write/find path.
- Organic event shape has `recommendationId=null`.
- Organic event shape has `attributionMode="organic"`.
- Subject/anonymous XOR is enforced.
- Anonymous refs stay in commerce outcome only and do not enter memory layer.
- Idempotency is code-level existing-check by `orderItemId`.
- No unique index or migration was added.
- Existing `purchase_complete` CommerceEvent remains intact.
- Hook runs only when `justPaid=true`.
- No RecOutcomeEvent emit on already-paid duplicate completion.
- No direct/session/refund/reorder attribution was added.
- No semantic feedback or V3-11D behavior was added.
- No raw text, PII, full customer/order/payment IDs, or secrets are logged or included in evidence.
- Tests cover the required cases from the Worker brief.
- Tests are meaningful and not weakened to pass.

## Verdict Options

Use one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

## Result Storage

Write the long Sentinel result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SENTINEL_REVIEW_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/12_SENTINEL_RESULT_POINTER.md`

Commit/push only foundation-docs result/pointer files. Do not stage or commit runtime repo files.

## Required Sentinel Result Format

Findings first, ordered by severity.

Include:

1. Verdict.
2. Files inspected.
3. Diff scope result.
4. Tests inspected/rerun and results.
5. Findings with file/line references.
6. Open questions.
7. Residual risks.
8. Explicit statement whether Worker report claims were independently verified.

## Chat Output

Do not paste the long review into chat. Chat output must contain only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`

The `NEXT ACTION ROUTING` must return the result to Advisor.
