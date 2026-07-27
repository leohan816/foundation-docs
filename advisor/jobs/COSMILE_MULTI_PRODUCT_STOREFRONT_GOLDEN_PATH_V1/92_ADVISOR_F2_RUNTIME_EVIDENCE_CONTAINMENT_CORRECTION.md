# Advisor correction — F2 runtime evidence containment

VERDICT: `PROCEED_WITH_LIMITS` · this addendum supersedes only the temporary
evidence-path and result-number clauses of handoff 91.

## Preserved facts

- First attempt stopped before bundle or DB mutation.
- Its sole DB access was a read-only count transaction; product/Foundation/vault
  remain clean at `91ded449` / `966db208` / `70c39e0e`.
- Three out-of-ceiling scratchpad files were removed; older unrelated
  scratchpad content was untouched.
- Foundation source path is exactly
  `/home/leo/Project/.worktrees/FOUNDATION/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`.

## Corrected temporary ceiling

Handoff 91 remains authoritative. In addition to its preserved bundle root, the
Worker may create only these owner-only, real/non-symlink transient files:

- `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/f2/evidence/counts.mjs`
- `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/f2/evidence/before.json`
- `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/f2/evidence/after.json`

The directory is `leo:leo` mode `0700`; files are mode `0600`. The driver may
perform only the frozen count/status-category reads. JSON may contain only
table/category/count/boolean fields, never URL, identifier, timestamp, hash,
raw row, env value, secret, or PII. Load `DATABASE_URL` only in process memory.
After byte-for-byte protected-table comparison and result capture, remove the
three transient files and the empty `evidence/` directory. Preserve only the
reviewed Foundation bundle.

Do not use Claude scratchpad, `/tmp`, a log, PID file, shell history file, or
another output path. No source reread is needed: resume at bundle generation,
then run the exact two one-shots and checks from handoff 91.

Write only:

- `93_WORKER_F2_ISOLATED_CATALOG_RUNTIME_RESULT.md`
- `94_WORKER_F2_ISOLATED_CATALOG_RUNTIME_POINTER.md`

Commit/push only those docs and STOP at Advisor gate. All other authority,
failure, no-provider/no-browser/no-economic, and protected-row boundaries in
handoff 91 remain unchanged.
