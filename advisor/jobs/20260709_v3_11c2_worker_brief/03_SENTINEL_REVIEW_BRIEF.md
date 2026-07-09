# 03 Sentinel Review Brief - V3-11C2 Organic RecOutcomeEvent MVI

## Required Skill

Required skill: `fable-sentinel`

## Role

You are the independent technical Reviewer / Sentinel.

This must be a separate session from the Advisor and the Worker.

You are read-only. Do not implement fixes. Do not approve as final.

## Review Target

Review the Worker result for V3-11C2 Organic RecOutcomeEvent MVI against:

- `02_WORKER_BRIEF.md`
- approved decision package
- actual code diff
- actual tests and test output

Do not trust the Worker report. Verify directly.

## Required Read

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/01_ADVISOR_BRIEF.md`
- Worker final report
- Cosmile git diff
- Changed source and test files

## Read-Only Commands Expected

Use read-only inspection such as:

```bash
cd ../Cosmile
git status --short
git diff --name-status
git diff -- app/src/lib/ids.ts app/src/lib/recOutcomeEventService.ts app/src/app/api/checkout/mock-complete/route.ts app/scripts/v3_11c2_rec_outcome.vitest.ts
```

If Worker claims tests passed, inspect test files and test output. Rerun tests only if safe and local/non-prod:

```bash
cd ../Cosmile/app
npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts
npx vitest run scripts/v3_11c_rec_event.vitest.ts
npm run lint
```

Do not connect to prod/live DB. Do not access secrets.

## Technical Checklist

Verify:

- Diff is limited to allowed files.
- No schema/migration changes.
- No SIASIU changes.
- No foundation-control changes.
- No prod/live/main/secret access.
- Feature flag is `COSMILE_REC_OUTCOME_ENABLED`.
- Feature flag default is OFF.
- Flag OFF makes no write attempt.
- RecOutcomeEvent ID uses dedicated `rec_out_v3_` + ULID(26), not `recommendationId()`.
- Service is fail-open and returns observable result.
- Service uses dependency injection or equivalent provider-independent test seam.
- Prisma is lazy-loaded only in default write path.
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

## Pass/Fail Verdict Options

Use one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

## Required Reviewer Report Format

Report findings first, ordered by severity.

Include:

1. Verdict.
2. Files inspected.
3. Diff scope result.
4. Tests inspected/rerun and results.
5. Findings with file/line references.
6. Open questions.
7. Residual risks.
8. Explicit statement whether Worker report claims were independently verified.

Do not provide implementation patches.
