# 76 — Advisor Build Nullable-Test Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `CUMULATIVE_BUILD_CORRECTION_2`
BASE: product `ce0268505550c26cc9072201c7ccc50558f3942c`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

The corrected build compiled successfully and stopped in TypeScript at
`o1_core_dashboard_reads.vitest.ts:226`: `createdAt` is contractually nullable,
while this valid-row fixture supplies a real date. The file is byte-identical
to base `8d4a327`; this is a pre-existing test narrowing defect.

## Exact one-path ceiling

`app/scripts/o1_core_dashboard_reads.vitest.ts`

Preserve and strengthen the assertion: first require `r.createdAt` not to be
null, then compare `r.createdAt?.toISOString()` with the same exact timestamp.
Do not use a non-null cast, change the nullable product contract, weaken the
timestamp expectation, or edit any source file.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_core_dashboard_reads.vitest.ts
```

One focused GREEN only; the preserved build failure is the RED. On PASS:
`git diff --check`, exact one-path containment, commit without co-author,
non-force push, compact return, STOP. Do not rerun build, typecheck, another
test, runtime, browser, DB, provider, or economic action; Advisor owns the
corrected cumulative build.
