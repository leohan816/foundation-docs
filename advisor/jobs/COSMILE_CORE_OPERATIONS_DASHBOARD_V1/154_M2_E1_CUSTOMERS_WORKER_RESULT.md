# Worker result — M2-E1 CUSTOMERS

OUTCOME: `HOLD` — the single GREEN run failed (**3 failed / 48 passed / 1 skipped**, 2 of 4 suites). Per the handoff, first GREEN failure returns HOLD without rerun. Not committed, not pushed.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M2_CUSTOMERS_E1`
ACTOR: same `cosmile:claude.0` Worker · Opus 5/xhigh · `/fable-builder` (`implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`).
CLARIFICATION: docs `ca3b16d3d0c5bacf53fab8c43091cc81cef5d16e`, blob `3bf02a4db8666e9c95a6a6e2e6ef39a397c8cec3`, SHA256 `46c8ff4d13ee4638c90487c12d2b36756ce36b44ae75b57c778cf2a42b70913c` — verified. Handoff `150` resumed unchanged.
BASE: product `9bd0c7785ff49850010b021c75d765cd45a6a166`; the pre-existing single test edit was preserved as authorized.

## Ownership binding — accepted, schema objection withdrawn

I confirmed the reviewed boundary before implementing: `src/lib/order/service.ts:229` reads `data.owner.userId !== null && data.owner.userId === owner.ownerRef`, with `customerOrderData` at `repository.ts:288` and `ownerRef` declared at `contracts.ts:88`. The repository therefore joins `o."userId" = c."id"` with `orderNo LIKE 'O1-%'`. No schema, FK, relation or identity inference was introduced, and no further schema/history exploration was performed.

## Commands

- RED, exactly as specified, run once: **4 failed / 37 passed / 1 skipped (42)**, exit 1. Meaningful: the new customers suite could not even resolve `@/lib/operator/customerRead`, and the catalog/nav oracles were red against unchanged sources.
- GREEN, the identical command, run once: **3 failed / 48 passed / 1 skipped (52)**, exit 1, 2 of 4 suites failing. No rerun, no diagnostic pass.

## Failure evidence held

Only the last of the three failures was visible in the captured output, and no rerun or diagnosis is authorized, so I am reporting exactly what I hold:

- **Identified — `o1_core_dashboard_reads.vitest.ts:177`**: `expect(hrefs.length, "exactly the seven bounded destinations").toBe(7)`. Activating `고객` makes the bounded nav total `8`. This is my own oracle miss: I updated the parallel count in `o1_core_dashboard_shell.vitest.ts` from `7` to `8` and added the `고객` bounded-row assertion to the reads suite, but left this second count in the reads suite pinned at `7`. It is a stale oracle, not a product defect — the handoff itself sets the bounded total at `8`.
- **Not identified — 2 further failures.** Their names and files are not in the evidence I hold. I will not rerun or infer them.

## Delta — exactly the nine ceiling paths, all uncommitted

`capability.ts` (added `customers.read`, catalog now 15) · `customerRead.ts` (new pure port/service: integer bounds 1–100, default 50, one repository call, `ok | invalid_bounds | repository_error`, whole-projection fail-closed on malformed row, negative or non-integer count, incoherent latest tuple) · `customerReadRepository.ts` (new; one `$queryRaw`, `CustomerAccount` + O1 `Order` only, newest customers first, no identity/session/contact/money/provider column, no write path) · `dashboard/customers/page.tsx` (new; flag → `dashboard.operations.read` → `customers.read` same-principal → one bounded read; visible `고객` H1, description, provenance, three derived summaries, four-column stable table with a spanning zero body) · `OperatorShell.tsx` (`고객` becomes a bounded active route) · the four test paths.

No tenth path. Git state is asserted from the edit record — `git diff --check` and a status inspection were **not** run, since those belong to the PASS path.

## Effects

`0` — no DB read or write, grant, seed, identity value, schema, migration, runtime, browser, provider, economic or public-preview action; no install, generate, build, typecheck or full suite; the listening preview was untouched. No commit, push, stage or branch change. No agent/sub-agent/delegation, self-review, risk acceptance or approval.

## What I need to resume

Authorization to correct the stale `7` → `8` count at `o1_core_dashboard_reads.vitest.ts:177`, plus one diagnostic or GREEN run to surface the two unidentified failures. All of that sits inside the existing nine-path ceiling; no contract, boundary or scope change is implied.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
