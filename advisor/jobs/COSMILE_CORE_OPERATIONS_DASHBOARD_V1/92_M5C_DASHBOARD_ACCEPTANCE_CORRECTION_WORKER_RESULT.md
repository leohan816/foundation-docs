# M5C Dashboard acceptance correction — Worker result

OUTCOME: `GREEN` — focused pair 16/16. Committed and pushed once.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M5C_DASHBOARD_ACCEPTANCE_CORRECTION`
ACTOR: existing Cosmile Worker · Opus 5/xhigh · SKILL `/fable-builder`, refs read: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` at return.
HANDOFF: docs `b3619da25ca0d14efbc11dca86120dab96694923`, blob `c69b95a5be6ed169675a8874499dc082dfe8090c`, SHA256 `86ef91134276a262127e2311319ae7ba61d2d25be55bb15d16708a2c768d21f4` — verified.
DESIGN: docs `8e4f8cd77abdf72753a209d0752c970180a739cb` `87_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION_CONTRACT.md`.
BASE `c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9` → HEAD `fa90003d0ca84b01bbfe0bfa7206b447b6c8d546`; base is ancestor, upstream equal, worktree clean.

## Exact four-path delta (no fifth path, `git diff --check` clean)

`OperatorShell.tsx`, `dashboard/page.tsx`, `o1_core_dashboard_shell.vitest.ts`, `o1_core_dashboard_reads.vitest.ts`. Untracked `0`.

## Contract landing

| Contract | Landing |
|---|---|
| Desktop rail persistent 250px left | shell root is `fixed inset-0 flex flex-col`; switcher + truth warning stay above; content region `flex min-h-0 flex-1 ... lg:flex-row`; nav `lg:h-full lg:w-[250px] lg:overflow-y-auto`; only `<main className="min-w-0 flex-1 overflow-y-auto">` scrolls; the centered `max-w-6xl` container is removed |
| Horizontal access only below desktop | `<lg` strip, 44px targets, focus ring + offset, reduced-motion floor all unchanged |
| Unsupported states truthful | inert rows carry their own state: Inventory `UNAVAILABLE`, Customers/Products/Payments & Refunds `NOT_IMPLEMENTED`, each rendered as code + exact Korean label, still `aria-disabled`, no href, no handler |
| Action queue precedes summary | home = heading `오늘 처리할 일`, one scope sentence, three-row queue (requests → orders → reconciliation), then summary, recent orders, legend |
| Existing reads only | same three reads, same capability order, same-principal checks, one call each |
| Recent orders bounded | one `o1OperatorOrderList(50)`, `slice(0, 3)`, only `orderNo` + already-returned `dbStatus`, rows only when `orders.state.kind === "confirmed"` |
| Gaps never become zero | D04/D07 remain static evidence-gap entries with the exact frozen copy; `count: 0` absent |

The verbose seven-field ledger presentation is removed; `운영 질문 / 필요 권한 / 허용된 다음 단계 / 금지된 작업` no longer appear on the home surface and are asserted absent.

## Tests

- Command run per handoff: `./node_modules/.bin/vitest run scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts`.
- RED **6 failed / 10 passed (16)**, exit 1. GREEN **16 passed (16)**, exit 0.
- **Run-count disclosure:** the command ran three times, not twice. One RED; a first GREEN attempt returned **1 failed / 15 passed** because an assertion I had written still pinned D04/D07 to the removed M4 `CardState` shape; I re-encoded that oracle onto the new static evidence-gap entries — pinning `id`, `name` and the exact frozen copy together, which is strictly stronger — and the identical command then returned 16/16. No product source was touched between those two runs, and no expected value was lowered. A fourth run (`cd app` from a shell already in `app/`) produced a shell error and executed no tests.
- No prior boundary assertion was deleted and no oracle weakened. Test-side contract changes, each with a design citation: inert-row entries now assert `state`; the home ledger-row oracle became the three-row action-queue oracle (§4.3 removes the repetition); the D04/D07 oracle was re-encoded as above.
- No install, generate, typecheck, build, DB, browser, runtime, network, provider or broad test ran.

## Preserved by construction, not by execution

`scripts/o1_dashboard_reads.vitest.ts` is outside both the path ceiling and the permitted command, yet it asserts against `dashboard/page.tsx`. Every string it depends on was verified present after the rewrite by direct inspection: both exact D04/D07 copies, `합성 비프로덕션 데이터`, all three read calls, `operatorRef !==` (4 occurrences), `D01/D03/D04/D05/D07` present and `D02/D06` absent, canonical imports, flag-before-authority order. That is static verification, not a run.

## Not proven

No browser acceptance: the §7 checks — rail 250px starting below the 88px chrome and stationary at 1440×900, 200% zoom, 390px no-horizontal-overflow, keyboard focus order, Korean glyph rendering — are unverified here. No typecheck or build ran, so type-level regressions in the two rewritten sources are unverified. The ungated suite was not executed. `orderStatusLabel` is newly imported into the home from the existing console component; it adds no read and no field, but that import path is only source-verified.

## Boundaries

Economic/provider/DB effect `0`. No route, API, repository, schema, migration, auth, capability, command, mutation, provider, Console, Lab or Storefront behavior change. One commit, one non-force push, no deployment, no other module started. No agent/sub-agent/delegation, self-review, risk acceptance or approval.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
