# M4 Core Operations Reads — Worker Result

OUTCOME: `STOP_BEFORE_IMPLEMENTATION` — handoff item 7 cannot be satisfied inside the four-path write ceiling without breaking the compatibility gate the same handoff requires to pass. No product path was touched.

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M4_CORE_OPERATIONS_READ_SURFACES`
ACTOR: existing Cosmile Worker · `claude-opus-5/xhigh` · SKILL `/fable-builder` (`implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`)
HANDOFF PIN: `50_...WORKER_HANDOFF.md` blob `e959391ea781c80ace132e9f694c80b9230f0bd9`, SHA256 `acc8f8f6...7362fb1a`, docs `145292b904553c3a7f708c23f8025c8c8a5d3879` — verified byte-exact.
PRODUCT: branch `implementation/cosmile-core-operations-dashboard-v1-20260725`, HEAD `1ee8df08c95f2ef295881807faa3f4990e21c20b` (unchanged), worktree clean, staged/unstaged/untracked 0. No commit, no push.

## The collision

Handoff item 7 requires the operations nav to make **Orders newly active at `/dashboard/orders`**. The handoff also requires the compatibility gate `./node_modules/.bin/vitest run scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_dashboard_reads.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts` to pass, and its write ceiling excludes `app/scripts/o1_core_dashboard_shell.vitest.ts`.

That M3 test, committed at `1ee8df0` under the M3 handoff's own instruction that M3 "must not implement that page", asserts the opposite of item 7:

| M3 test | Assertion | Effect of item 7 |
|---|---|---|
| `o1_core_dashboard_shell.vitest.ts:124` | `block` contains `{ label: "Orders", m4: "/dashboard/orders" }` | fails — the entry must become an `href` row |
| `:125` | `block` does **not** contain `href: "/dashboard/orders"` | fails — item 7 requires exactly that string |
| `:129` | operations-nav href count is exactly `6` | fails — becomes `7` |

Source side: `OperatorShell.tsx:54` is `{ label: "Orders", m4: "/dashboard/orders" }`. No formulation of the nav entry satisfies both documents at once: item 7 requires the href, `:125` forbids it. Satisfying item 7 requires editing a fifth path; not satisfying it silently drops a required item; dropping the test from the gate would hide a currently-true contract. Each of those three is an explicit STOP condition or a forbidden pattern, so the choice belongs to the Advisor, not to me.

## Assessment (not a decision)

Frozen design `5c23125` §4 row 2 defines Orders as the "entry to current request/order facts **when routed**". M4 routes it. So the M4 behavior is contract-correct and the three M3 assertions are a milestone-scoped snapshot that M4 legitimately supersedes — this is a re-base, not a weakening. Under `test-design-before-code` §5 the contract, not the failing side, decides; and §7 warns that deleting or de-scoping the assertion instead of re-basing it is the reward-hacking path.

## Options for the Advisor

1. **Recommended.** Extend the M4 ceiling to a fifth path, `app/scripts/o1_core_dashboard_shell.vitest.ts`, authorizing exactly lines 124/125/129 to be re-based on the M4 contract (Orders becomes a bounded active row, href count 6 → 7, the `m4:` declaration key retired). Everything else in M4 is unaffected.
2. Defer item 7: land only the home ledger and `/dashboard/orders`, leaving the nav row inert, so the new page is reachable by direct URL until a later module activates it. This is a declared scope reduction and needs explicit approval.
3. Remove `o1_core_dashboard_shell.vitest.ts` from the gate command. **Not recommended** — it hides a true contract rather than re-basing it.

Handoff items 1–6 and 8 (home ledger, `/dashboard/orders` gates/read/error/empty, legend, D04/D07 wording, boundary absences) collide with nothing and are ready to execute in one clean pass under any option; only item 7 and the M3 test are blocked.

## Work performed

Read-only, within the named context: the pinned handoff, frozen design `5c23125`, and the four named sources needed to anchor the contract — `dashboard/page.tsx` (rewrite target and its exact capability/read order), `dashboard/fulfillment/page.tsx` (the canonical flag → root → `orders.read` + `fulfillment.read` same-principal → `o1OperatorOrderList(50)` implementation the orders page must reuse rather than retype), `O1ConsoleFulfillment.tsx` (props contract), `o1_dashboard_reads.vitest.ts` (the M3A assertions the home rewrite must preserve). No file was created or modified; the M4 test was not written, so no RED exists yet.

## Boundaries

No product path touched; no fifth path; no test, fixture or assertion changed. No dependency command, install, generate, build, typecheck, test run, DB, runtime, provider, browser, economic, public-host or Golden Commerce action. No new read model, endpoint, capability, grant, authority or customer projection. No agent/sub-agent/delegation, no self-review, no risk acceptance, no approval. Stopped before M5 and before any M4 implementation.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
