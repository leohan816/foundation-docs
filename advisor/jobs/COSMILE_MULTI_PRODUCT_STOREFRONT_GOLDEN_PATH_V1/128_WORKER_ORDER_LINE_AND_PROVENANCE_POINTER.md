POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
RESULT_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/127_WORKER_ORDER_LINE_AND_PROVENANCE_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/128_WORKER_ORDER_LINE_AND_PROVENANCE_POINTER.md
FOUNDATION_DOCS_COMMIT: 36b9de4caa1c67e960eb06193de04f2eeaf85fb1 (handoff) — this result committed separately
RUNTIME_REPO: ../Cosmile
RUNTIME_COMMIT_STATUS: not committed
RETURN_TO: Advisor
NEXT_ACTOR: Advisor

## Status

**HOLD** — stopped at the single RED run on four failures outside the intended RED set; no source edit, no diagnosis, no retry.

- Handoff `125` at docs `36b9de4`; computed sha256 `5b6f5629df78fe7c96c076613ff18a0b42007710617692f8c1b6bbd06250dbea` (none was pinned in the dispatch).
- Base `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`, clean/upstream-equal at start.
- RED, exactly the frozen command, run once: `3 failed (3)` files, `12 failed | 91 passed (103)`, exit `1`.
- **8 intended** RED failures across the three focused suites (line projection, Korean line table, snapshot provenance).
- **4 unexpected** failures, all in `o1_operator_request_detail_ui.vitest.ts`, in cases I neither authored nor modified: three `M3F …` cases failing with `Error: cookies was called outside a request scope`, and `WU-1 default legacy behavior …` failing with `expected '"use client";…' to contain 'operatorActionSurface(mode, legacyActionsEnabled)'`.
- Whether those four pre-exist at base is **undetermined** — establishing it needs a command this handoff forbids.
- Product delta is **test-only and uncommitted**; the five authorized source paths are byte-identical to base; no ninth path; no commit or push to the runtime repo.
- No DB, runtime, browser, provider, build, typecheck, schema, migration, config, manifest, lockfile, refund or economic action.

## Blocker

Advisor decision required: (a) confirm the four failures pre-exist at base and authorize one re-run plus the source phase, or (b) authorize a bounded diagnosis of `o1_operator_request_detail_ui.vitest.ts`. No case was weakened or skipped to get past them.
