# Advisor handoff — M2-E2 Customers focused correction

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
BASE: product `9bd0c7785ff49850010b021c75d765cd45a6a166` with the exact uncommitted nine-path M2-E1 delta preserved
ACTOR: existing `cosmile:claude.0` Worker, Opus 5/xhigh, exact mission CWD
SKILL: `/fable-builder`; already-loaded `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`

## Exact correction boundary

Keep the existing nine-path ceiling unchanged. Preserve the first RED and failed GREEN evidence in `154`.

1. Correct only the known stale oracle in `app/scripts/o1_core_dashboard_reads.vitest.ts:177`: bounded navigation count and wording `7` → `8`.
2. Run the same four focused files once with `--reporter=verbose` solely to identify the two previously hidden failures.
3. Classify each visible failure against the frozen M2 contract. Correct only a demonstrated test-oracle defect or implementation defect inside the same nine paths. Do not weaken an assertion, hide a failure, invent data, or change the ownership/privacy/authority contract.
4. Run the original four-file focused command once as the final GREEN.
5. On PASS: inspect exact nine-path containment and `git diff --check`; commit and non-force push once; write only `157_M2_E2_CUSTOMERS_WORKER_RESULT.md` and `158_M2_E2_CUSTOMERS_WORKER_POINTER.md`; STOP.

Diagnostic command:

```bash
cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_customers.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/operator_authority_contract.vitest.ts --config vitest.config.ts --reporter=verbose
```

Final command: the same command without `--reporter=verbose`.

STOP on any required tenth path, schema/migration, grant or DB write, PII/identity exposure, new read source, behavior expansion, provider/economic/runtime/browser action, or another failed final GREEN. No install, generate, build, typecheck, broad test, public-preview action, or Reviewer.
