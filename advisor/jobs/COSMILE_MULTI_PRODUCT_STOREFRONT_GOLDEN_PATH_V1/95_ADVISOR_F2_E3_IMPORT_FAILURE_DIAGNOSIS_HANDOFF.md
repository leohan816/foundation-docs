# Advisor handoff — F2 E3 import failure diagnosis only

VERDICT: `PROCEED_WITH_LIMITS` · no product correction in this WorkUnit.

## Preserved evidence

- Product `91ded449`, Foundation `966db208`, vault `70c39e0e`, docs
  `898dfa2`; all clean/upstream as applicable.
- Reviewed bundle PASS remains owner-only at the exact handoff-91 root.
- One-shot #1 failed before any committed write with
  `stage:import/repository_error`; every protected and candidate count remained
  identical/zero as recorded in 93. No retry occurred.

## Exact diagnostic

Use the same `cosmile:claude.0` Opus 5/xhigh Worker and exact CWD. Create only:

`/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/f2/evidence/import-diagnosis.mjs`

The directory is real `leo:leo` `0700`; file `0600`. No scratchpad, `/tmp`,
log, PID, source, config, schema, package, lock, DB fixture, or other path.

The driver may load only the already verified bundle plan, the exact candidate
constants/decisions, Prisma, and the current process-memory `DATABASE_URL`.
Inside exactly one Prisma transaction:

1. execute the candidate import stages in source order for the first entry:
   advisory lock, by-SHA read, structural-head read, predecessor decision,
   candidate INSERT, and predecessor UPDATE only if applicable;
2. classify the first failure to a closed result:
   `advisory_lock`, `by_sha`, `heads`, `predecessor`, `insert`,
   `supersede_update`, or `no_stage_failure`;
3. retain only Prisma error class/code or SQLSTATE category when present;
   never retain/print message, query, parameter, identifier, hash, row,
   timestamp, URL, env value, secret, or PII;
4. always throw a private rollback sentinel before transaction completion.

The sentinel must be observed and the transaction rolled back. Run this driver
exactly once. Then run the same count/status-category-only reader once and
require byte-for-byte equality with result 93: protected rows unchanged and
candidate snapshot/binding/SKU counts still zero. Do not execute the one-shot,
another diagnostic, a variant, provider, browser, build, typecheck, test,
checkout, order, or refund.

Remove the driver and empty evidence directory. Preserve the bundle. Verify all
Git pins and listener state unchanged.

Write only:

- `96_WORKER_F2_E3_IMPORT_FAILURE_DIAGNOSIS_RESULT.md`
- `97_WORKER_F2_E3_IMPORT_FAILURE_DIAGNOSIS_POINTER.md`

Report at most the closed stage/category, rollback boolean, count-equality
boolean, containment, and exact smallest correction candidate without
executing it. Commit/push only those docs and STOP. HOLD if the exact category
cannot be obtained without a committed DB write or broader access.
