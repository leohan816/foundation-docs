# Cosmile Worker Result — O1 Browser Non-Production Runtime Integration

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
ROLE_ACTOR: Cosmile Worker
SKILL: /fable-builder
PHASE_EXECUTED: CREDENTIAL_INDEPENDENT_ONLY
STATUS: CANDIDATE_READY (correction 2 applied; prior blocker RESOLVED)
RETURN_TO: foundation-advisor
CANDIDATE_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1
PRIOR_CANDIDATE: 6a3b71856f6db0b75e4193f594d23cf0e82512b2 (preserved; not amended)
```

> **Revision note.** This result was updated after Advisor correction 2 and the Founder bounded reuse check.
> Sections 12 and 13 are new; sections 7, 8, and 11 are superseded where marked. The original blocker
> `O1BR-NO-TS-SCRIPT-RUNNER` is now **RESOLVED** — see §13.

## 1. Anchors verified from Git (not memory)

```text
HANDOFF_COMMIT: b3997f8e1fc77258553389ebf5ef5bbe69ce1471
HANDOFF_BLOB: 4f7df84249f19138c71efdf00aebb0def376d301
HANDOFF_SHA256: ee7ecc48e6dad194ec589eba74a98dfea04d90025f41da06b4dcbac3fad2d729   VERIFIED
CORRECTION_1_COMMIT: bc6908fb0da728742513a72542c083e22ef7e3b5
CORRECTION_1_BLOB: d353b49d09ec1eaacb8220fd51d4b3d8d0e2dd6a
CORRECTION_1_SHA256: d7cec19a8223f5c9a97aba6fcb6f74cb808e3b2e8974e1ac97d9a52cee6bf280  VERIFIED
ALSO_READ: 00_ADMISSION_AND_AUTHORITY_RECORD.md · 01_SCOPE_AND_PATH_ALLOWLIST.md ·
           11_CREDENTIAL_NAMES_ONLY_CHECKLIST.md · agent-office worker.md ·
           docs/agent/RUN_PROTOCOL.md · RESULT_REPORTING_PROTOCOL.md · AGENTS.md ·
           CLAUDE.md · app/CLAUDE.md · predecessor 119_FINAL_POINTER.md
```

## 2. Repository state

```text
REPOSITORY: /home/leo/Project/Cosmile
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
START_HEAD: 63fdd2d507357861aec582b980006baa7d7045a4   (verified clean at start)
FINAL_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1   (updated after correction 2)
  ├─ 6a3b71856f6db0b75e4193f594d23cf0e82512b2  candidate 1 — runtime composition + correction 1
  └─ 00feea3193a946963b15ded90d062db0ce1fdda1  candidate 2 — correction 2 bridge + reuse disposition (additive)
COMMITS_ADDED: 2
PUSHED: NO (no upstream configured; awaiting Advisor candidate pin)
AMEND_REBASE_SQUASH_FORCE_PUSH_MERGE: NONE (candidate 1 preserved byte-for-byte as the parent)
WORKTREE_STATUS_AT_END: CLEAN
UNTRACKED_USER_FILES_TOUCHED: NONE
```

Path ledger addendum (correction 2, +182 lines / 0 deletions):

```text
app/scripts/o1_nonprod_fixture_setup.vitest.ts   NEW — one-shot fixture execution bridge (correction-2 allowlist)
app/docs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md   §5.1 bridge + §5.2 reuse disposition
```

## 3. Exact path ledger (all within the combined allowlist)

Modified — original allowlist (5):

```text
app/.env.example                       names only, no values (11_ checklist names + one declared non-credential flag)
app/docs/FEATURE_INDEX.md              O1 section added
app/src/middleware.ts                  preview gate enforcement (edge-safe; gated by flag + configured secret)
app/src/app/shop/page.tsx              O1 eligible-catalog branch
app/src/app/products/[id]/page.tsx     O1 detail + FAIL-CLOSED notFound for non-eligible (correction)
app/src/app/cart/page.tsx              O1 display identity + bounded error surface
app/src/components/product/CartList.tsx O1 checkout branch (legacy mock button untouched when flag OFF)
app/src/app/orders/[orderId]/page.tsx  O1 sanitized projection + corrected non-mock label
```

Modified — correction-1 allowlist, TYPE-ONLY (7):

```text
app/scripts/foundation-memory-deanon.vitest.ts   explicit null assertions (STRENGTHENS: adds not-null asserts)
app/scripts/o1_payment_contract.vitest.ts        IntentRow.providerIntentRef in fake projection; unknown-bridge cast
app/scripts/o1_order_lifecycle.vitest.ts         canonical return-type annotations (BindCapturedOrderInput/FinalizeRefundInput)
app/scripts/o1_golden_order.vitest.ts            unsafe structural cast -> unknown bridge
app/scripts/o1_golden_reversal_harness.ts        ReservationStatus imported from its canonical owner (WU-C)
app/src/lib/foundation/snapshotRepository.ts     two transaction-callback return-type annotations
app/src/lib/payment/repository.ts                providerIntentRef added to SELECT + both IntentRow projections
```

New (19 + 6 scripts + 1 doc):

```text
app/src/lib/runtime/o1NonprodConfig.ts · o1CommerceRuntime.ts · o1FixtureSetup.ts
app/src/lib/auth/o1PreviewAccess.ts · o1Operator.ts
app/src/lib/payment/tossSandboxTransport.ts
app/src/components/commerce/O1TossCheckout.tsx · O1OrderStatus.tsx · O1OperatorPanel.tsx
app/src/app/preview/page.tsx · app/src/app/api/preview/access/route.ts
app/src/app/api/o1/checkout/start · checkout/toss/success · checkout/toss/fail
app/src/app/api/o1/webhooks/toss · orders/[orderId]
app/src/app/api/o1/operator/orders · operator/orders/[orderId] · .../shipment · .../refund
app/src/app/o1/operator/page.tsx · o1/operator/orders/[orderId]/page.tsx
app/scripts/o1_browser_runtime_contract.vitest.ts · o1_browser_runtime_property.vitest.ts
app/scripts/o1_browser_runtime.dbtest.py · o1_nonprod_fixture_setup.ts
app/scripts/o1_browser_golden_order.playwright.mjs · o1_browser_golden_reversal.playwright.mjs
app/docs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md
```

Allowlisted but intentionally UNCHANGED: `app/src/lib/slice/flags.ts`, `app/src/lib/checkout.ts`,
`app/src/lib/foundationProductClient.ts`, `app/src/app/account/orders/page.tsx`,
`app/src/app/api/auth/google/{start,callback}/route.ts`. No path outside the combined allowlist was written.

## 4. Correction 1 — type-only, behaviour-preserving

Baseline at START_HEAD, measured BEFORE any edit: `npx tsc --noEmit --pretty false` = **19 errors in 7 files**;
`npx vitest run` = **22 files / 529 passed / 2 skipped**. Mission-introduced errors at baseline: **zero**.

After the corrections: **0 typecheck errors**. Focused regression over every corrected file:
`vitest run` on the five corrected suites = **5 files / 188 tests PASS**.

Statement required by the correction: **runtime behaviour and persisted semantics are unchanged.** No
outcome category, state transition, persisted value, DEFAULT, CHECK, or authorization check was altered. No
test was deleted, skipped, or weakened; two null-assertions were ADDED (strictly strengthening). The one
repository-side data change is that `createActionableIntent` now SELECTs the already-existing
`providerIntentRef` column and includes it in the returned `IntentRow` projection (a read, mandated by the
correction text); it writes nothing and changes no transition.

One self-corrected misstep is disclosed: an initial `KRW as const` -> `KRW` substitution removed literal-type
preservation and produced 36 NEW errors. It was caught by the compiler and replaced with the correct fix
(the literal plus canonical return-type annotations). Final state adds zero errors.

## 5. Contract-to-code mapping

The full mapping table (handoff outcomes 1–11 -> code landing -> test), the key-tracing table for
`orderNo / paymentKey / intentId / captureTransactionId / operator sub`, and the safety-precedence ordering
are in `app/docs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md`. No mapping row is blank.

## 6. Invariants and how each is enforced

```text
browser return is not money truth   success route takes ONLY the opaque paymentKey; amount/orderNo/intent
                                    re-read from durable state; WU-B verifies against the provider + claim binding
webhook untrusted                   size-bounded before parse -> idempotent inbox -> server-pull-verify against the
                                    durable internal tuple; no signature invented for the general-payment class
no provider call before reservation code order enforced; PROPERTY-tested across a 9-case rejection matrix and a
                                    stock/quantity matrix: provider call count is 0 in every rejecting case
fail closed                         every ambiguity returns a closed category; a non-DONE provider result never
                                    commits, and never RELEASES the hold (property-tested over 9 scripts)
full refund only                    reviewed WU-B cancel lane; cancelAmount is never sent
refund never restocks               asserted in the disposable-PostgreSQL test: reservation remains 'committed',
                                    zero released/expired rows after a completed refund
separate identities                 operator authority = immutable Google sub vs server-only allowlist; email can
                                    never authorize (scope=openid only + non-subject-shaped entries cannot match)
test-only step-up                   non-production, action-bound, scope-bound, single-use; default deny;
                                    property-tested "authorizes at most once per minted nonce"
preview gate before tunnel          middleware enforces before any route/page; unconfigured secret denies all;
                                    exact-path exemptions only (traversal/extension tricks rejected)
no secret in evidence               config returns no secret (property-tested over generated secrets);
                                    transport never exposes the credential; scanned diff shows no real credential
default OFF, production refused     only the exact string "true" in non-production enables it; production refusal
                                    is evaluated FIRST and property-tested over generated flag values
```

## 7. Commands and evidence

Every command was run in `app/` with the pre-command Git status recorded; the tree was clean before and after
each, and no unexpected repository write occurred.

```text
prisma generate                 PASS   worktree-local client; O1 model types present; schema unchanged
tsc --noEmit --pretty false     PASS   0 errors (baseline 19 -> 0; this change adds 0)
next build (non-production)     PASS   all routes built incl. /o1/operator, /preview, middleware
vitest run (full)               PASS   24 files · 588 passed · 2 skipped (baseline 22 · 529 · 2)
  new contract suite                   42 tests
  new property suite                   17 tests
  corrected-file focused regression    5 files · 188 tests PASS
o1_browser_runtime.dbtest.py    PASS   33/33; disposable postgres:16-alpine, tmpfs, 127.0.0.1 random port;
                                       existing migration chain only; blocking cleanup verified (container removed)
eslint (new + changed paths)    PASS   0 errors
golden order / reversal browser SKIP   precondition gate not satisfiable in this phase (see §8) — SKIP != PASS
official Google execution       NOT_RUN credential gate (not authorized in this phase)
official Toss TEST execution    NOT_RUN credential gate (not authorized in this phase)
tunnel / cloudflared            NOT_STARTED
```

Test-layer labels (no mixing): the 588 are provider-independent pure tests; the 33 are DB-touch against a
disposable PostgreSQL; the 2 skips are the pre-existing official-provider credential gates, unchanged.

## 8. BLOCKING LIMITATION returned to the Advisor

```text
BLOCKER_ID: O1BR-NO-TS-SCRIPT-RUNNER
FACT: this repository has no TypeScript script runner. node_modules contains neither `tsx` nor `ts-node`, and
      Node cannot resolve the project's `@/*` path alias (package.json is not in the allowlist, so no
      `imports` map may be added).
CONSEQUENCE: `app/scripts/o1_nonprod_fixture_setup.ts` cannot be executed, so a runtime database cannot be
      seeded with the synthetic bundle + snapshot import + SKU binding. Without that seed the O1 catalog is
      correctly empty, so the local browser Golden Order and Golden Reversal cannot run and are reported
      SKIP on their precondition gates. NO browser evidence is claimed.
NOT_DONE_INSTEAD: no fake fixture, no bypass of the reviewed importer/binder, and no Python re-implementation
      of the canonical serializer (that would create a second hashing path — the exact split-brain failure
      this protocol forbids).
EXACT_NECESSITY (Advisor decision required), any ONE of:
  (a) authorize `tsx` (or `ts-node`) as a devDependency + the package.json write, or
  (b) authorize one additional allowlisted `scripts/*.vitest.ts` fixture-seeding entry point (vitest already
      resolves `@/*` and runs TypeScript), or
  (c) authorize an allowlisted non-production-only fixture route the dbtest can invoke over loopback.
COST IF DEFERRED: completion gates 7 and 8 (browser Golden Order / Golden Reversal) stay unmet, and the
      claim ceiling stays below "browser-verified".
```

## 9. Secondary observations (no action taken)

```text
OBS-1  The SHARED repository install /home/leo/Project/Cosmile/app/node_modules contains a self-referential
       symlink `node_modules/node_modules -> itself` (dated before this session). It breaks Turbopack builds.
       It was removed ONLY from this mission's local copy; the shared install was left byte-unmodified.
OBS-2  next.config.ts emits "the middleware file convention is deprecated; use proxy instead" on Next 16.2.9.
       Not addressed: next.config.ts is outside the allowlist and the change is not required by this mission.
```

## 10. Containment

```text
NODE_MODULES: reused from the shared install by COPY (no npm, no network, no dependency resolution);
              shared install verified byte-unmodified (.prisma/client fingerprint identical before/after)
DEPENDENCY_INSTALL: NONE
SCHEMA_OR_MIGRATION: NONE created, edited, or deleted
FOUNDATION_WRITE: NONE
DATABASE: one disposable container per dbtest run; tmpfs; loopback-only random port; removed on exit (verified)
SECRETS: none read, requested, printed, logged, committed, or placed in this result. `.env.example` carries
         names only. The one added name `O1_TOSS_LOCAL_SUBSTITUTE` is NOT a credential — it is a non-secret
         local-substitute switch, documented in the design doc and refused in production.
REAL_PII / REAL_PAYMENT / PRODUCTION / LIVE / PUBLIC EXPOSURE / TUNNEL: ZERO
```

## 11. Claim ceiling (precise)

```text
CLAIMED: a reviewed-lane-composing, non-production, default-OFF browser runtime that TYPECHECKS, BUILDS, and
         passes 588 pure tests plus 33 disposable-PostgreSQL assertions, with the frozen catalog, money-truth,
         reserve-before-provider, full-refund-no-restock, operator-subject, step-up, and preview-gate
         invariants each enforced in code and covered by a bidirectional or property test.
NOT CLAIMED: any browser execution; any official Google or Toss execution; any provider-sandbox evidence; any
         merchant eligibility; any production readiness; any Controlled Live or Paid Beta readiness. The
         deterministic local substitute is explicitly NOT official-provider evidence and is labelled as such
         in the UI, the code, and this result.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```

---

# ADDENDUM A — Advisor Correction 2 and Founder Reuse Check

```text
CORRECTION_2_COMMIT: 138db60681f6f35ce83129ea72d685732921ab25
CORRECTION_2_BLOB: 3e6904436eb7c2e3151a5ace677c66870fd97d4f
CORRECTION_2_SHA256: cb7439848912ab6ff5526ff0c212f520f66fc3a0ff7abb42cfef6b555cd69f05   VERIFIED
FOUNDER_CHECK_COMMIT: bb8ce5f3d68df4b385105403354de076ad280ea1
FOUNDER_CHECK_BLOB: c27bde6c67840b05ad3d35c4abea4a856d99d6b2
FOUNDER_CHECK_SHA256: 1a0939fda87e1e880a60a1b3755e6ba2983ef274f2e5816add105bd1dfd52fd7  VERIFIED
CORRECTION_COMMIT: 00feea3193a946963b15ded90d062db0ce1fdda1  (additive; parent 6a3b718; NOT amended, NOT pushed)
DELTA: 2 files, +182 lines, 0 deletions
```

## 12. Founder bounded operator reuse check — read-only inspection

`DISPOSITION: PRESERVE THE CURRENT MINIMAL O1 OPERATOR SURFACE.`
No unallowlisted path was modified. No bounded write was found to be justified, so no exact-necessity
return was required. Inspection was strictly read-only.

| EXISTING_SURFACE_OR_COMPONENT | CURRENT_PATH | CURRENT_AUTHORITY_MODEL | CURRENT_DATA_CONTRACT | REUSE_FIT | WRITE_REQUIRED | DISPOSITION | EVIDENCE |
|---|---|---|---|---|---|---|---|
| Admin order list (order view) | `src/app/api/admin/orders/route.ts` | `requireConsoleAdminWrite()` — local username/password `ConsoleUser` + `cosmile_console_session` cookie | `prisma.order.findMany({ include: { items: true } })` → FULL Order rows (userId, guestId, subtotal, discountTotal, total, couponCodeSnapshot) + full OrderItem rows | **UNSAFE** | NO | Not reused. O1 keeps its bounded 7-field projection | Source read at line 7–8; contrast: `OperatorOrderView` = orderNo, dbStatus, fulfillmentStatus, lineCount, hasSucceededCapture, hasActiveRefund, openReconciliationCount (categories/counts/booleans only) |
| Admin order console UI | `src/app/console/admin/page.tsx` + `src/components/console/AdminControls.tsx` | same console session | renders the raw admin order payload above | **UNSAFE** | NO | Not reused | consumes the raw list contract; also carries legacy mock framing |
| Admin order status mutation (refund experience) | `src/app/api/admin/orders/[orderId]/status/route.ts` | same console session | `prisma.order.update({ data: { status } })` over `pending\|paid\|fulfilled\|cancelled\|refunded` | **UNSAFE** | NO | Not reused. O1 refund goes through WU-B `refundFullCapture` + WU-E `finalizeRefundToOrder` | Sets `status='refunded'` with **no** capture verification, **no** step-up, **no** provider reversal, **no** inventory transition, **no** OrderStatusHistory, **no** reconciliation. Reusing it would make an admin field money truth — a direct violation of handoff invariant 1 |
| Console authority / session | `src/lib/console/{guard,session,adminWrite,permission}.ts` | local `ConsoleUser` password account, `CONSOLE_SESSION_TTL_HOURS`, role string | server session row + role check | **UNSAFE** | NO | Not reused | Different authority axis. O1 requires exact **immutable Google `sub`** allowlisting; email is never an authority key. Adopting the console model would replace a verified-OIDC boundary with a local password account |
| Record-only shipment / tracking | — | — | — | **NO SURFACE EXISTS** | NO | O1 surface retained | `grep` for `ShipmentRecord\|trackingRef\|carrier` across `src/app` + `src/components` returns nothing outside the new O1 files |
| Reconciliation experience | — | — | — | **NO SURFACE EXISTS** | NO | O1 surface retained (bounded `openReconciliationCount`) | `grep` for `ReconciliationTask\|reconcil` across `src/app` + `src/components` returns nothing outside the new O1 files |
| Commerce dashboard | `src/app/console/commerce/page.tsx` | console session | aggregate cards; self-labelled "★mock · 실 PG 아님" | **MATERIAL** | NO | Not reused; advanced-dashboard scope is not authorized | Aggregate/analytics surface, not an order-operations surface; integrating it would be materially larger and outside the founder's stated minimum |

**Conclusion.** Zero surfaces qualified as EXACT or BOUNDED reuse. Two of the four requested experiences
(record-only shipment, reconciliation) have no existing surface at all. The other two (order view, full refund)
exist only in forms that would either expose raw customer identity and amounts or bypass the entire money-truth
lane. Per the founder's own instruction — "if reuse is unsafe or materially larger, preserve the current minimal
O1 operator surface" — the O1 surface is preserved unchanged. Operator capability was **not** broadened, and the
identity, step-up, PII, payment, inventory, reconciliation, preview, and claim-ceiling boundaries are unchanged.

## 13. Correction 2 — fixture execution bridge (prior blocker RESOLVED)

`app/scripts/o1_nonprod_fixture_setup.vitest.ts` (the only added path) is a minimal test-execution bridge.

```text
IS:     a Vitest entrypoint that imports and invokes ONLY src/lib/runtime/o1FixtureSetup.ts (the canonical builder)
IS NOT: a product/runtime fixture endpoint, an API route, a runtime switch, or a second fixture implementation
GATES:  runs only on the exact one-shot flag O1_FIXTURE_ONESHOT=1 (non-secret execution switch, NOT a credential);
        refuses production; refuses a non-loopback DATABASE_URL; refuses a relative bundle root or one inside the
        repository — each fail-closed BEFORE any database work
PURITY: every runtime import is DYNAMIC. @/lib/prisma constructs a PrismaClient at import time, so a static import
        would pollute the ordinary pure suite; with the flag absent the suite is skipped AND imports nothing
TEARDOWN: the generated bundle tree is removed in afterAll; the disposable database dies with its container
NO:     dependency, package/lockfile, route, endpoint, schema, migration, credential, provider, or external network
```

Evidence:

```text
ordinary suite, flag ABSENT        2 passed + 4 skipped · no database connection opened
explicit one-shot, disposable DB   4 passed + 2 skipped
  database                         postgres:16-alpine · tmpfs · 127.0.0.1:<random> loopback only
  migrations                       existing repository chain only (none created/edited/deleted)
  canonical bundle                 written with the REVIEWED canonical serializer; embedded sha is hex64
  import                           reviewed importer admitted 1 snapshot (re-verifying every byte)
  binding                          reviewed binder created the SkuBinding
  post-run DB (bounded counts)     snapshots=1 · bindings=1 · skus_active=1 · catalog_join=1
  idempotent replay                second canonical run admitted 0 NEW snapshots (byte-reproducible bundle)
cleanup                            bundle directory removed = YES · container removed = YES · repo writes = 0
tsc --noEmit                       0 errors
next build                         PASS
eslint (new file)                  0 errors
focused (3 suites)                 61 passed + 4 skipped
full suite                         25 files · 590 passed · 6 skipped
                                   (prior candidate 24 · 588 · 2; the +4 skips are the one-shot block correctly
                                    skipping in the ordinary suite — no test count decreased)
secret scan on the delta           no credential-shaped literal, no connection string, no real subject, no env echo
```

**Blocker status:** `O1BR-NO-TS-SCRIPT-RUNNER` — **RESOLVED** by this correction. §8 of the original result is
superseded: the fixture can now be executed, and canonical bundle/import/binding evidence exists.

**Still NOT claimed.** Browser Golden Order and Golden Reversal remain **NOT EXECUTED** in this phase. The
fixture seeds a database, but a browser run additionally requires a running non-production server plus an
authenticated Google customer session and a separate allowlisted Google operator session — both of which are
credential-gated and not authorized here. The Playwright scripts therefore still SKIP on their precondition
gates, and no browser evidence is claimed.

## 14. Revised claim ceiling

```text
CLAIMED: a reviewed-lane-composing, non-production, default-OFF browser runtime that TYPECHECKS, BUILDS, passes
         590 tests (25 files) plus 33 disposable-PostgreSQL assertions, and whose synthetic Foundation fixture is
         now EXECUTED end-to-end through the reviewed canonical builder/importer/binder on a disposable database
         with verified cleanup. Operator-surface reuse was inspected read-only and the minimal O1 surface was
         deliberately preserved on recorded safety grounds.
NOT CLAIMED: any browser execution; any official Google or Toss execution; any provider-sandbox evidence; any
         merchant eligibility; any production readiness; any Controlled Live or Paid Beta readiness.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
