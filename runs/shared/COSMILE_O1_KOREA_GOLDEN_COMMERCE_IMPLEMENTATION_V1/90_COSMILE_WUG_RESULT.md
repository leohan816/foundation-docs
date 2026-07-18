# 90 — COSMILE WU-G Implementation RESULT (Worker)

- Mission: `COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1`
- Role: Cosmile repository-owner Worker (Opus 4.8 1M, max effort, /fable-builder)
- Handoff executed: `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/handoffs/90_COSMILE_WUG_IMPLEMENTATION_HANDOFF.md`
- Handoff foundation-docs commit pin: `e003d41bc25aec0caa684977acc654138ef5d72a` (byte-identical at read, sha256 `6a426726341093f9233590182b56b4b58469f932b22d8ceeac85065a14609743`)
- Status: **CANDIDATE READY — additive, script-only, non-production, unpushed. Returned to foundation-advisor. STOP.**
- Reviewer NOT dispatched. Integrated review NOT started. No next WorkUnit started. No secrets requested/printed.

## 1. Admission verification (all PASS immediately before editing)

| Check | Required | Observed | Result |
|---|---|---|---|
| Repository / branch | worktree / implementation/cosmile-o1-korea-golden-commerce-v1-20260717 | same | PASS |
| HEAD | c6e793d3459bc16c520bd09dbe739bf4306bdb40 | c6e793d… | PASS |
| Upstream HEAD | c6e793d… | c6e793d… (origin) | PASS |
| Ahead/behind | 0/0 | 0/0 | PASS |
| Tracked state | CLEAN | clean | PASS |
| WU-F review | commit dc4ebaf508be56bf2da5a1a2ff856939a00b6798 / PASS | reachable in foundation-docs | PASS |
| Role/model/effort/skill | Cosmile Worker / Opus 4.8 1M / max / /fable-builder | same | PASS |
| Foundation snapshot lane | worktree `.worktrees/FOUNDATION/…`, HEAD==upstream==`73ff00361d9fa88ab57c17858210c1e080dfde1a`, clean | HEAD==upstream==`73ff0036…`, 0 tracked changed | PASS |

Foundation not modified (read-only verify of the dedicated worktree).

## 2. Candidate commit + path/numstat ledger

- Candidate SHA: `63fdd2d` (full: `63fdd2d…` on parent `c6e793d3459bc16c520bd09dbe739bf4306bdb40`)
- Push status: **NOT pushed** — `origin/<branch>` still at `c6e793d…`; candidate is exactly 1 commit ahead. No amend/rebase/squash/force.
- Working tree after commit: clean. Gitignored `app/node_modules` symlink used only to run vitest, then removed before staging; ignored and absent from the candidate.

Additive-only ledger (`git diff --numstat c6e793d..63fdd2d`):

| Path | +add | -del | kind |
|---|---:|---:|---|
| app/scripts/o1_golden_reversal_harness.ts | 328 | 0 | A |
| app/scripts/o1_golden_reversal.vitest.ts | 234 | 0 | A |
| app/scripts/o1_golden_reversal.dbtest.py | 340 | 0 | A |
| app/scripts/o1_golden_reversal.sandbox.vitest.ts | 82 | 0 | A |
| **Total** | **984** | **0** | 4 paths = exact allowlist |

No existing file changed (WU-F files intact; 0 modified/deleted/renamed). No route/page/UI/component, schema/migration, package/lockfile, generated client, environment file, provider config, Foundation file, or unrelated path touched.

## 3. What was composed (not redefined)

- Fresh SEPARATE WU-F Golden Order via `runGoldenOrder` (o1_golden_order_harness) on a fresh synthetic world + distinct payment key → verified succeeded capture / paid order / committed reservation / paid history.
- WU-B `refundFullCapture` (`@/lib/payment/service`) with the existing full-only Toss cancel adapter (`cancelPaymentFull`, NO `cancelAmount`), exact durable capture binding, idempotency, server response verification (`isCompleteReversal`), and reconciliation.
- WU-E `finalizeRefundToOrder` (`@/lib/order/service`) with its exact durable-refund re-read, order projection, committed-inventory HOLD, operator step-up boundary, history, audit, and customer/operator projection. WU-F stubbed `OrderRepository.finalizeRefund`; WU-G supplies the faithful in-memory mirror of the reviewed WU-E `repository.finalizeRefund` (the twin) over the world's public tables and delegates bind/projections to the WU-F world unchanged.
- WU-E `makeTestOnlyExplicitStepUpVerifier` / `refundAuthorizationAdapter` / `unconfiguredStepUpVerifier` (`@/lib/order/stepUp`) — TEST/HARNESS-only single-use grants; runtime default deny-all.
- WU-F `o1_toss_sandbox_transport.ts` reused EXACTLY for the official layer (imported, unmodified).

Harness owns only bounded orchestration/test state + category-safe evidence DTOs. It creates NO competing money / inventory / refund / order / identity / catalog / audit / shipment / operator / provider truth. None of the imported modules reach `@/lib/prisma`.

## 4. Commands / counts / status

| Command | Result | Exit |
|---|---|---|
| `npx vitest run scripts/o1_golden_reversal.vitest.ts` | **22 passed / 22** | 0 |
| `python3 scripts/o1_golden_reversal.dbtest.py` | **13 passed / 0 failed** | 0 |
| `npx vitest run` (full, 22 files) | **529 passed / 2 skipped** (WU-F + WU-G official sandbox blocks) | 0 |
| `npx vitest run scripts/o1_golden_reversal.sandbox.vitest.ts` (credential-gated) | **1 passed / 1 skipped** — official block SKIPPED = **NOT_RUN_CREDENTIAL_GATE** (no flag/secret/separate-captured-payment/identity/no-live/no-PII proof); NO network call | 0 |

No install, no Prisma generation, no real/shared/target DB, no production/live key/payment, no provider commitment, no customer data, no public exposure, no vendor contact, no unrelated network.

## 5. Disposable database identity + cleanup

- Instance: already-local `postgres:16-alpine`, tmpfs data, **no host/public port** (`docker exec` unix socket only), synthetic rows + transient trust creds, no image pull/network, no shared volume, no real data/credential.
- Applied the exact committed migrations: WU-0 baseline + WU-E ShipmentRecord.
- Cleanup: container removed in a `finally`, post-removal absence asserted (non-absent forces nonzero exit). Reported `container removed=True, post-cleanup absent=True, data-dir=tmpfs(vanished), host-port=none, transient-cred=removed`. Git pre/post captured (4 additive paths, stable).
- **Generated-client boundary (recorded honestly, same as WU-F):** the actual `@/lib` WU-B/WU-E TypeScript repositories are NOT executed against the disposable DB (pre-WU-0 generated Prisma client + no-host-port containment). The DB-level composition is proven by the parity-true plpgsql twin; the actual-TS composition by the deterministic vitest. Effective DB/provider/credential variables inspected by NAME only (values never read/printed).

## 6. State / reconciliation / inventory / replay matrices (proven)

Ordered reversal (deterministic vitest + plpgsql twin):
1. fresh separate captured/paid/committed golden order via the reviewed WU-F composition.
2. reversal bound to the EXACT order / capture transaction / payment key / full captured amount / KRW.
3. explicit TEST-only step-up bound to action=refund + operator role/ref + order scope + reason category + one-use freshness; runtime default `unconfiguredStepUpVerifier` deny-all.
4. WU-B full refund called exactly once; provider effect = Toss V2 full cancel only (no `cancelAmount`, partial, pre-capture void, alternate provider, retry, or client/webhook money truth).
5. durable refund credited ONLY after the WU-B adapter verifies CANCELED + zero balance + exact payment key + a distinct nonblank cancel transaction reference; timeout / partial / missing-ref / wrong-key / unknown / provider-error / provider-success+internal-write-failure all HOLD (`confirming`) + reconcile — never a false `refunded` and never a false terminal failure.
6. SEPARATE TEST-only step-up (distinct freshness) for WU-E finalization; consumed freshness never reused (single-use verified: replay → `stale_or_replayed`).
7. WU-E re-reads the exact durable full-refund truth before projecting one `refunded` order / history / audit.
8. customer + operator projections agree `ORDER_REFUNDED` / `refunded`.
9. inventory remains committed/HOLD — no release / stock increment / sellable restoration / return receipt / restock (asserted: committed=1, released|expired=0, before and after).
10. replay of the same refund + finalization → **zero** second provider cancel (0), refund truth, order/history/audit, inventory, or reconciliation effect (effectDelta=0; WU-B replay=`idempotent_existing` before any provider call; WU-E replay=`idempotent`).
11. every attempted deterministic reversal reconciled to a bounded terminal (`refunded`) or explicit HOLD (`confirming`/`hold`/`refund_not_complete`/`not_eligible`/`not_authorized`) category.

Adjacent-negative fail-closed (all proven): no refund against absent/wrong capture (`not_eligible` capture_not_found / amount_not_full / paymentkey_mismatch / order_mismatch), zero provider cancel; default-deny step-up + wrong action/scope + consumed-freshness replay; every non-complete cancel (partial / missing-ref / wrong-key / unknown / timeout / provider 5xx) → HOLD + reconcile with order still paid and inventory committed; provider-success + internal-record failure → HOLD, refund stays un-refunded, reconcile opened; finalize before a durable full refund → `refund_not_complete`/`hold`; wrong-amount finalize → `refund_not_complete`; one active refund per capture (`already_active`); restart/replay from durable rows → idempotent, zero provider call; a HOLD is recoverable (durable refund completes → finalize `refunded`).

## 7. Step-up + leak containment

- Step-up is fail-closed: the runtime default is `unconfiguredStepUpVerifier` (deny-all). Test-only explicit grants are single-use, exactly bound (action + operator ref/role + order scope + reason + freshness). Two distinct freshness values gate the WU-B refund and the WU-E finalization; consumed freshness is never reused. These grants are **already-decided bounded TEST verdicts only — not MFA, OIDC, session currentness, dual approval, credential, or production authorization**; the absence of a live step-up mechanism is NOT claimed resolved.
- Leak: the evidence DTO serializes only layer/mode, bounded status categories/counts/booleans, state agreement, exact-zero replay counts, inventory disposition `committed_hold`, and the flags. Tests assert no payment key / order number / refund reference / freshness / world id / operator ref appears in a serialized happy OR failed evidence value; no provider body/error, auth header, secret, SQL, digest, or filesystem path is emitted.

## 8. Credential-gate + official-sandbox evidence status

- **OFFICIAL_PROVIDER_SANDBOX_EXECUTION = NOT_RUN_CREDENTIAL_GATE.** Fail-closed by default; requires a one-shot flag + Toss TEST secret + a **separate CAPTURED** test payment key + amount + synthetic identity + no-live + no-PII, all opted in. The official block reuses the WU-F sandbox transport unchanged and would full-cancel a separately captured sandbox payment (never a pre-capture void); it never manufactures or reuses a capture. No official sandbox refund evidence is claimed.

## 9. Claim ceiling / product-repository status / residual unknowns

- **Claim ceiling:** even an official sandbox PASS would prove ONE bounded captured-payment refund walking skeleton only. It does NOT prove live payment, merchant eligibility, production, legal/returns policy, Controlled Live, Paid Beta, public sale, general reliability, or operational safety. Flags carried: NOT_LIVE_SALE_EVIDENCE, REAL_PAYMENT: NO, REAL_CUSTOMER_PII: NO, PRODUCTION: NO, PARTIAL_REFUND: NO, AUTO_STOCK_RESTORATION: NO.
- **Product-repository status:** no foundation-vault / product-repository write; no Foundation canonical authority change; both Foundation worktrees untouched. `foundation-docs` receives only these two Worker evidence artifacts (docs), not committed by the Worker.
- **Residual unknowns:** `tsc`/`next build` NOT_RUN (pre-WU-0 generated client; `prisma generate` out of scope) — the WU-G files are pure (no `@/lib/prisma` import) and runtime-proven by vitest; a full typecheck is a deploy-time step. Official sandbox refund is NOT_RUN_CREDENTIAL_GATE pending Leo's console/environment process (a separate captured sandbox payment).

## 10. Explicit stop confirmation

Reviewer NOT dispatched. Integrated review NOT started. Controlled Live, Paid Beta, public sale, and any next WorkUnit did NOT start. No push. No amend/rebase/squash/force. No secret requested or printed. Returned to `foundation-advisor` and STOPPED.
