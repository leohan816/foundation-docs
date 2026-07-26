# Worker result — M4 E2 diagnostic

OUTCOME: single failure fully identified. Diagnostic only; no file changed, nothing committed or pushed.
HANDOFF: docs `2676827ae427615374765b8e01c3e1a8a193c517`, blob `de72d016103fcb6bc3a705f804cbc7bb2e45e44c`, SHA256 `b937d16e8f9dfdf1e1083760400b7a3dbe57b47274210cd5766f58700dc3938c` — verified.
COMMAND: the exact two-file verbose command, run once, unfiltered and unpiped.

## Failing suite and test

- Suite: `scripts/o1_core_dashboard_inventory.vitest.ts`
- Describe: `M4 inventory — pure service bounds and one aggregate call`
- Test: `derives no available-to-sell arithmetic anywhere in the service`
- Location: `scripts/o1_core_dashboard_inventory.vitest.ts:128:62`

## Exact assertion, category and token

- Assertion: `expect(src, "service must not derive: available").not.toContain("available")`
- Message: `service must not derive: available: expected '\nexport type InventoryEligibleItem =…' not to contain 'available'`
- Category: negated substring containment. Expected = absence of the token; Received = the comment-stripped source of `src/lib/operator/inventoryRead.ts`.
- Token named by the assertion: `available`
- Occurrence in the received text, on an executable line carrying a trailing comment:
  `if (fact === undefined) return { kind: "repository_error" }; // unavailable never becomes zero`
  The substring sits inside `unavailable`; the suite's `code()` helper drops only lines whose trimmed text begins with `//`, so a trailing comment on a code line survives. Direct output only; no interpretation added.

## Exit status and counts

- Exit status: `1`
- Test Files: 1 failed | 1 passed (2)
- Tests: 1 failed | 24 passed (25); skipped 0
- The 24 passes include every bounds, unique-identity, one-call-only, zero-read-on-empty, closed-repository-error, missing/unknown/duplicate/malformed/over-capacity fail-closed, repository field and no-write, gate-order, no-mock, baseline-label, identity/provenance, five-column/zero-body, and D04-retired/D07-retained assertion.

## No-change confirmation

No source or test file was created, edited or deleted during this diagnostic. The preserved eight-path M4 delta and the three E1 test-oracle corrections are byte-unchanged; `capability.ts` untouched and `inventory.read` not added. No install, build, typecheck, DB, schema, migration, grant, runtime, browser, provider, economic action, commit, push, or M5 work occurred. Only `175`/`176` were written.

RETURN_TO: foundation-advisor
STOP
