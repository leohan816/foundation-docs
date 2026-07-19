# Cosmile Worker — O1 Legacy Lane Isolation, Bounded Correction Result

STATUS: `CORRECTION_APPLIED_AND_GATE_PASSED` (committed and pushed on the mission branch)

```text
MISSION_ID: COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
CORRECTION_CLASS: O1_LEGACY_LANE_ISOLATION_AND_BASELINE_GATE
ACTOR: Cosmile Worker (repository-owner Worker)
PROJECT: Cosmile (Foundation Team project scope)
TARGET_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
TARGET_BRANCH: integration/cosmile-o1-commerce-spine-baseline-v1-20260719
START_HEAD: 94693d26cec3c2e9ac830e9d2c2f6235dcf4c011
RESULT_HEAD: 02bb064cf24da568dc83be53afb8afe1e984acea
SESSION: cosmile:0.0 (verified live)
MODEL: Opus 4.8 (1M context) — matches EXPECTED_MODEL
EFFORT: claimed max; not independently verifiable from inside the session
```

## 1. Handoff verification (cryptographic)

| Check | Expected | Observed | Verdict |
|---|---|---|---|
| commit | `071f2880b812e687be4c11ec891d718a27d94914` | type `commit`, Leo Han, 2026-07-19 15:12:32 +0000, `docs(o1-spine): authorize bounded lane isolation` | MATCH |
| blob at path | `b3f2b459f88896e5e2025b85de088500e50324aa` | identical | MATCH |
| SHA256 | `07180c4fff80a17984e6fa8ff54cf801dfc7365b7a8636874b6c7a807a61a850` | identical | MATCH |
| ancestry | committed | is HEAD of `advisor/cosmile-o1-commerce-spine-baseline-v1-20260719` | MATCH |

Pre-state: target worktree CLEAN at `94693d2`, no unrelated dirt, nothing preserved or staged from elsewhere.

## 2. Dependency provisioning (blocker `O1SPINE-DEPS-ABSENT-IN-TARGET-WORKTREE` resolved)

Preconditions reverified **before** copying — all three byte-identical between the authorized sibling source and the target:

```text
package.json       a486716043eda96a51fe0ef1817c023dd81588ebf1b2e61f8e43d0ed20ae66c4   MATCH
package-lock.json  36dfa1a40fc8c10a3283e3871f248bf52e9add41bee16b624911a10d7ed8ab79   MATCH
prisma/schema.prisma 379a047beb88e772facd089fa713dd55f435ba0442607f3422f84c6dbd68c22c MATCH
destination app/node_modules                                                          ABSENT (as required)
```

`cp -a --reflink=auto` from
`…/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/app/node_modules` → target `app/node_modules`
(exit 0, 731M). The root Cosmile tree was **not** used. No install, no fetch, no registry contact. The destination is
ignored by `app/.gitignore:4:/node_modules` (verified with `git check-ignore -v`) and produced **zero** tracked drift.
It is retained for the independent review, pending Advisor cleanup authorization.

## 3. Tests-first sequence (as ordered)

**Step 2 — test added first, run before any implementation. Recorded failure:**

```text
$ npx vitest run scripts/o1_legacy_lane_isolation.vitest.ts
FAIL scripts/o1_legacy_lane_isolation.vitest.ts [ 0 test ]
Error: Cannot find package '@/lib/runtime/o1LegacyLaneIsolation'
Test Files 1 failed (1) | Tests: no tests
```

The suite could not even collect, because the pure decision module did not exist. That is the intended
pre-implementation state: the test names the contract before the code exists.

**Step 4 — after implementation:**

```text
$ npx vitest run scripts/o1_legacy_lane_isolation.vitest.ts
Test Files 1 passed (1) | Tests 22 passed (22)
```

**Why this is not a vacuous green.** The file pins the decision in *both* directions. Six cases assert refusal
(`order.update` never called); two assert that genuine legacy behaviour still *succeeds* (`order.update` called with
`status: "paid"`, admin transition returns 200). An over-blocking implementation fails the second pair; an
under-blocking one fails the first six. The admin case additionally mocks `canTransitionOrder` to be **permissive**,
so a refusal there can only originate from the new lane guard, not from the pre-existing transition table.

## 4. Contract → code mapping (fable-builder required artifact)

| Handoff contract clause | Code landing | Test case |
|---|---|---|
| exact `mintOrderNo()` namespace arm | `O1_ORDER_NO_PATTERN = /^O1-[0-9A-F]{20}$/`, `isO1OrderNamespace` | "accepts exactly the mintOrderNo() shape"; "rejects near-misses" (9 near-miss inputs) |
| structural `PaymentIntent` arm | `hasBoundPaymentIntent`, `isO1OwnedOrder` | "owns an intent-backed order (structural arm)" |
| conservative **union** of the two | `isO1OwnedOrder` = namespace OR structural | "owns a pre-intent O1 order"; "does NOT own a genuine legacy order" |
| never classify by runtime flag alone | flag appears only in `decideLegacyLaneAvailability`, never in `isO1OwnedOrder` | "refuses a PERSISTED O1-owned order even when the runtime flag is OFF" |
| never classify by status | no `status` read in the module | "never classifies by order status" |
| no permissive fallback | unusable count (NaN/∞/negative) ⇒ owned | "fails CLOSED on an unusable intent count" |
| O1-enabled ⇒ legacy checkout start unavailable globally | `decideLegacyCheckoutStart` in `api/checkout/start/route.ts`, before cart validation | route test: 404 `o1_runtime_active`, `order.create` never called |
| O1-enabled ⇒ mock completion unavailable globally | `decideLegacyLaneAvailability` in `api/checkout/mock-complete/route.ts`, before shopper + lookup | route test: 404, `order.findUnique` never called |
| persisted O1-owned order protected with flag OFF | `decideLegacyMockCompletion` inside `completeMockOrder` (`lib/checkout.ts`) | route tests: 409 `o1_owned_order` (namespace arm and structural arm separately) |
| admin status mutation refuses O1-owned before update | `decideLegacyAdminStatusMutation` in `admin/orders/[orderId]/status/route.ts` | route test: 409, `order.update` never called |
| legacy preserved outside the O1 lane | both routes fall through unchanged | two "legacy preserved" route tests |
| no order-not-found information leak | global gate evaluated **before** any lookup; order-level refusal only after the existing ownership check | route test asserts `findUnique` not called under the global gate |
| stable categorical errors, no identifiers | `legacyLaneRefusalStatus`, bodies are `{error:"o1_runtime_active"\|"o1_owned_order"}` | every route test asserts the exact body |

Two placement decisions, declared rather than silent:

1. The **order-level** guard lives in `completeMockOrder` (the mutation point), not only in the route, so it holds for
   any future caller. The route gate exists specifically to avoid an order-existence oracle.
2. `completeMockOrder` evaluates the lane **before** the existing `status === "paid"` shortcut, so order status can
   never route around the guard. Its return type became a discriminated union
   (`not_found` | `refused` | `completed`); the single caller was updated. No other caller exists (verified).

## 5. The one authorized complete gate (run exactly once, on the corrected candidate)

```text
$ npx prisma generate    exit 0   Generated Prisma Client v6.19.3 to ./node_modules/@prisma/client
$ npx tsc --noEmit       exit 0   0 errors, 0 files with errors
$ npm run build          exit 0   next build completed; all routes compiled (ƒ dynamic)
$ npx vitest run         exit 0   Test Files 26 passed (26) | Tests 650 passed | 7 skipped (657)
```

Suite size moved 25 → 26 files because this correction adds one test file. **No baseline delta is claimed**: the
25-file suite was never executed in this worktree before (it was blocked), so there is no prior local count of mine to
compare against, and I do not adopt another mission's numbers as my own.

The 7 skipped tests are attributable by source inspection to the three explicitly gated files —
`o1_golden_order.sandbox.vitest.ts` and `o1_golden_reversal.sandbox.vitest.ts` (`describe.skipIf` on the full
credential gate) and `o1_nonprod_fixture_setup.vitest.ts` (one-shot flag). No credential, provider or DB path ran.

### 5.1 D-2 correction — a documented blocker that did not reproduce

`docs/…INTEGRATION.md` §5 D-2 recorded **19 pre-existing `tsc --noEmit` errors across 7 files** at START_HEAD. On the
corrected candidate, in the provisioned environment and immediately after `npx prisma generate`, `npx tsc --noEmit`
exits **0 with 0 errors**.

Stated precisely: the **fact** is that typecheck is clean once the Prisma client is generated. The **hypothesis** —
that the original 19 errors were downstream of a missing generated `@prisma/client` — is plausible but **unverified**;
I ran no controlled comparison, because doing so would mean re-running gates outside this authorization. The document
has been updated to record both the correction and the fact that the cause remains a hypothesis.

## 6. Changed paths — exactly the seven authorized, nothing else

```text
A  app/src/lib/runtime/o1LegacyLaneIsolation.ts        (new, pure: no prisma/next/fs/network/env)
A  app/scripts/o1_legacy_lane_isolation.vitest.ts      (new, 22 cases)
M  app/src/lib/checkout.ts                             (+23 −4)
M  app/src/app/api/checkout/mock-complete/route.ts     (+14 −3)
M  app/src/app/api/checkout/start/route.ts             (+8 −0)
M  app/src/app/api/admin/orders/[orderId]/status/route.ts (+15 −0)
M  app/docs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md (v1.0 → v1.1: 변경이력, 불변식 13, §5.3, D-2 정정)
```

Every entry in `git status --untracked-files=all` was checked against the authorized list; all seven matched, none
outside. No other product path was touched. `app/node_modules` remained ignored and never appeared as drift.

**Disclosed ordering detail:** the documentation edit (path 7) was made *after* the gate ran. It is
documentation-only and materially affects no type, build or test check, so per
`FULL_BUILD_AFTER_CORRECTION: PROHIBITED_UNLESS_CHANGED_PATH_MATERIALLY_REQUIRES_IT` no command was re-run. All
**code** edits preceded the gate.

## 7. Git / push / ancestry

```text
commit           02bb064cf24da568dc83be53afb8afe1e984acea (1 commit, additive)
files changed    7 (+558 −9)
ancestry         START_HEAD 94693d2 IS an ancestor of HEAD — additive, no rewrite
push             non-force, --set-upstream, origin/integration/cosmile-o1-commerce-spine-baseline-v1-20260719
upstream         local HEAD == upstream HEAD == 02bb064  (verified equal)
worktree after   CLEAN (no staged, unstaged or untracked residue)
branch           mission branch only; main NOT touched, no merge, no force push
```

## 8. Boundary and exclusion compliance

```text
schema / migration change                  NONE (prisma/schema.prisma untouched)
DB runtime access                          NONE — prisma replaced by a recording stub in tests; no connection opened
provider / sandbox / live payment          NONE — no network call; credential-gated blocks stayed skipped
secret / credential / env value            NONE read, written, printed or documented
PII / customer data                        NONE
production / public exposure / deployment  NONE
payment or refund execution                NONE
storefront work, broad rewrite, refactor   NONE
unrelated type-debt cleanup                NONE (D-2 files untouched; nothing to fix — see §5.1)
test weakening / snapshot laundering       NONE — one test file ADDED; no existing test, fixture or assertion altered
full-suite repetition                      NONE — focused test twice (pre/post), complete gate exactly once
agent / sub-agent / delegated context      NONE — all work performed in this session
browser dispatch / arbitrary terminal exec NONE
Reviewer dispatch / self-review            NONE — this is evidence, not a verdict
merge / force push / main                  NONE
next mission started or inferred           NONE
```

## 9. What is proven, and what is NOT

**Proven.** The classifier behaves as the Advisor's contract specifies across 22 cases including 9 near-miss
namespace inputs and both fail-closed paths; the classifier is genuinely *wired into the three routes* and refuses
**before** any mutating call; genuine legacy behaviour still succeeds; the corrected candidate passes the complete
repository gate (generate, typecheck, build, 26-file suite).

**Not proven — and it should not be claimed.**

- **No runtime, browser, or real-database execution occurred.** The route tests substitute a recording stub for
  `@/lib/prisma`. They prove the decision and the wiring order; they do **not** prove behaviour against a live
  Postgres, nor that a real O1 order in a real database is refused end-to-end. That evidence needs a runtime lane the
  handoff excluded.
- **No real O1 order was created, paid, or refunded.** F-1/F-2 were never reproduced live, before or after the fix;
  both the finding and its correction rest on source-level reasoning plus stubbed route execution.
- **The D-2 cause remains a hypothesis** (§5.1).
- **Other legacy surfaces were not swept.** `/api/group-deal/team/[teamId]/mock-complete` and `/api/slice/purchase`
  were noted in the baseline audit as adjacent; they were **outside** the seven authorized paths and were neither
  modified nor re-examined here. Whether they can reach an O1-owned order is **open** and returns to Advisor as a
  candidate scope item — I did not expand into it.
- Finding **F-3** is addressed only in the sense the contract specified (legacy checkout start refused while O1 is
  enabled). Legacy orders created while O1 is OFF still exist outside the O1 spine by design.

## 10. STOP conditions encountered

None that blocked execution. Every action stayed inside the seven authorized paths; the one contract question raised
in the baseline result (namespace vs structural marker) was resolved by the Advisor before implementation and
implemented as the union, not chosen by me.

```text
RESULT_PATH: runs/cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/30_WORKER_CORRECTION_RESULT.md
POINTER_PATH: runs/cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/31_WORKER_CORRECTION_POINTER.md
FOUNDATION_DOCS_COMMIT: NOT_APPLICABLE (Worker authors only; Advisor stages, commits, pushes)
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP_AFTER_RESULT: YES
```
