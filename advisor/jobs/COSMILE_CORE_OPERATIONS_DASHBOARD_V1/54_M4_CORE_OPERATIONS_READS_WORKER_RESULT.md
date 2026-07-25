# M4 Core Operations Reads — Worker Result (corrected run)

OUTCOME: `GREEN` — focused M4 contract 9/9 and full compatibility gate 62/62. Committed and pushed once.

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M4_CORE_OPERATIONS_READ_SURFACES`
ACTOR: existing Cosmile Worker · `claude-opus-5/xhigh` · SKILL `/fable-builder` (`implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`)
AUTHORITY: `50_...HANDOFF.md` (blob `e959391e`, SHA256 verified) + additive `53_M4_E1_MILESTONE_TEST_REBASE_HANDOFF.md` (blob `69700ad5fd36e461da2e5c7d1ce9774128a40525`, SHA256 `1a14da4b...41f0cb5`, docs `faf2993d11d6be8378907c798d99e815f4fda050`) — both verified byte-exact. DECISION `APPROVE_OPTION_1`.
FROZEN DESIGN: docs `5c2312572f6438a7301b6e824e4907398b25bd00`.
BASE `1ee8df08c95f2ef295881807faa3f4990e21c20b` → HEAD `c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9`; base is ancestor, upstream equal, worktree clean.

## Diff — exactly the five authorized paths

Modified `app/src/app/dashboard/page.tsx` (ledger), `app/src/components/operator/OperatorShell.tsx` (Orders active), `app/scripts/o1_core_dashboard_shell.vitest.ts` (three approved rebases); created `app/src/app/dashboard/orders/page.tsx`, `app/scripts/o1_core_dashboard_reads.vitest.ts`. `git diff --check` clean. No sixth path; request/fulfillment/finance/activity/settings/detail/runtime/repository/component/API/schema/migration/config/manifest/lock all untouched.

## M3 rebase — exactly the three approved assertions

`:124` `{ label: "Orders", m4: ... }` → `{ label: "Orders", href: "/dashboard/orders" }`; `:125` the forbidden-href assertion became a required one; `:129` href count `6` → `7`. Their two accompanying comments were updated so the file does not state "six" while asserting seven. Every other M3 assertion is byte-unchanged, verified by reading the full diff of that file.

## Contract mapping

| Frozen contract / handoff item | Code landing | Test case |
|---|---|---|
| §4 action-first ledger, thesis | `PAGE_THESIS`, work rows before summary facts | ledger-order case |
| §4 seven row facts | `question/authority/nextStep/prohibited/recovery` per row + `<dt>` labels | row-fields case |
| §5 six-state token + Korean label | single `STATE_LABEL` map | row-fields + legend cases |
| §4 legend `표현 규칙 · 운영 데이터 아님` | legend section rendered from the same map | legend case |
| D04/D07 exact wording, never zero | fixed `kind: "unavailable"` literals | D04/D07 case |
| item 5 gates → one bounded read | `orders/page.tsx` flag → root → `orders.read`+`fulfillment.read` same-principal → `o1OperatorOrderList(50)` ×1 | orders-gate case |
| item 6 failure/empty/rows | `repository_error` → UNAVAILABLE, `[]` → CONFIRMED_ZERO, rows → `O1ConsoleFulfillment` | orders-state case |
| item 7 nav | Orders href; four rows still inert | nav case |
| item 8 absences | both read surfaces | boundary case |

No blank row.

## Tests

- Focused M4 (`./node_modules/.bin/vitest run scripts/o1_core_dashboard_reads.vitest.ts`): RED **6 failed / 3 passed (9)**, exit 1 → GREEN **9 passed (9)**, exit 0. The three green at RED were the frozen-reads, D04/D07-wording and boundary cases — pre-existing guarantees this batch had to preserve, not new claims.
- Compatibility gate (exact three-suite command): **62 passed (62)**, exit 0.
- One oracle correction inside the new M4 test, declared: the "every row declares this field" count was scoped to the row data after it counted the shared `LedgerEntry` **type declaration** as a sixth row. The expected value stayed `5` and the meaning stayed "5 rows × 5 fields" — the count was not raised to match the code, which would have been the reward-hacking path.
- No existing assertion, fixture, snapshot or mock was weakened, skipped or deleted. No build, typecheck, generate, DB, provider, browser or dependency command ran; `app/node_modules` was reused as-is.

## Declared duplication

`orders/page.tsx` re-declares the local `record`/`authorized`/`orderRows`/`State` helpers that `fulfillment/page.tsx` also declares, because that file is read-only in this ceiling and exports nothing. This duplicates *shape*, not an identifier mint or a read: both pages call the same canonical `o1OperatorOrderList(50)` and render the same `O1ConsoleFulfillment`. Extracting a shared module would need a sixth path.

## Proven / not proven

Proven at source level: ledger ordering and per-row fact completeness, the closed six-state vocabulary from one map, D04/D07 remaining textual and never numeric, the orders page's flag→authority→same-principal→single-bounded-read chain and its three outcome states, Orders as the only newly active nav row, and the absence of customer authority, direct data access, control surfaces, mutation, provider and economic/identifying display.
Not proven: any rendered or runtime behavior — no browser, server or DB was touched; typecheck and build were not run (ceiling), so type-level regressions in the two rewritten files are unverified; suites outside the three-suite gate were not run; `/dashboard/orders` has never been requested against a live runtime.

## Next review questions

1. Does `npm run typecheck` pass on the rewritten `dashboard/page.tsx` and the new orders page?
2. Does the full vitest suite stay green outside the three gated suites?
3. Is the `orders/page.tsx` helper duplication acceptable, or should a shared read-surface module be authorized?
4. Should D07's next step link to `/dashboard/activity` at all, given that page is itself `UNAVAILABLE`?

## Rollback

`git revert c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9` (M3 at `1ee8df0` remains intact). No schema, data or external state to undo.

## Boundaries

Staged/unstaged/untracked after push: 0. Push non-force, once, upstream equal. No `main`/protected-branch change or force push. Economic/provider/DB/runtime effect 0. No new read model, endpoint, capability, grant, authority, action or customer projection; no write control on either surface; HOLD/denied never became zero or actionable; Console, Lab and Storefront behavior unchanged. No agent/sub-agent/delegation, no self-review, no risk acceptance, no approval. STOP conditions encountered: none in this corrected run. Stopped before M5.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
