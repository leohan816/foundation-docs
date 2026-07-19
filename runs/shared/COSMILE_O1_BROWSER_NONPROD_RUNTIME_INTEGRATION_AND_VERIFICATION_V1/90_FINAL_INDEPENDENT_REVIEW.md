# Final Independent Review — O1 Browser Non-Production Runtime

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_TYPE: FINAL_INDEPENDENT_IMPLEMENTATION_REVIEW
REVIEW_TIER: HARD_IMPORTANT_SAFETY
REVIEWER: foundation-reviewer-fable5
RETURN_TO: foundation-advisor
RESULT_RECORDED_AT_UTC: 2026-07-19T08:32:32Z
VERDICT: PASS
```

## 1. Live binding, skill, and independence (actual)

tmux session `foundation-reviewer-fable5` (live-verified; synchronize-panes off) · model `claude-fable-5` (Fable 5 family) · effort `max` (env `CLAUDE_EFFORT=max`) · CWD `/home/leo/Project/FOUNDATION` operating on the subject by absolute path · `/fable-sentinel` loaded with the delta-review reference · CLI session `4d976816-aff1-480b-824f-2ae8f382c759`. Current authority re-read at agent-office `docs/agent` commit `c837af5` (unchanged): operating model, `roles/README.md`, `roles/reviewer.md`; plus Cosmile `AGENTS.md`/`CLAUDE.md`. No overlapping review (prior 34_ delta review completed and returned). This session authored none of the candidate commits or Advisor artifacts. No patch, stage, commit, push, dispatch, cleanup, shutdown, or risk acceptance was performed.

## 2. Launcher and subject integrity (direct Git objects — all PASS)

- Handoff `90_FINAL_INDEPENDENT_REVIEW_HANDOFF.md` at foundation-docs commit `d52aee404a8739b89d6788b06ef1cf9b3512420c` (= mission worktree HEAD, clean): blob `928ff380c626db67acd5a3e792fa426019c72a91` MATCH · SHA-256 `3391893790ddadb2a18b7e98993ca97e67f78baabd6bad6a1cd5618dc1c041a3` MATCH · working-tree byte-identical.
- Pinned context read at that snapshot: `20_INDEPENDENT_CANDIDATE_REVIEW.md` (predecessor PASS at `00feea3`), `34_PREVIEW_HYDRATION_FIX_DELTA_REVIEW.md` (published byte-identical to my own temp artifact, SHA-256 `8d6a9263…`), `00_ADMISSION_AND_AUTHORITY_RECORD.md`, `01_SCOPE_AND_PATH_ALLOWLIST.md`. Commit 1 of the delta additionally carries `22_RUNTIME_SETUP_DELTA_REVIEW.md` PASS (verified: its NEW_HEAD = `d5c762f`).
- Subject: worktree `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1`, branch `implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718`, HEAD = `94693d26cec3c2e9ac830e9d2c2f6235dcf4c011`, upstream `0/0`, tree CLEAN before, during, and after review. `00feea3` is the direct ancestor; the delta is exactly the 12 listed commits in the listed order, and `git diff --name-status` reproduces exactly the 20 declared paths (16 M · 3 D · 1 A).
- Handoff nit (documentation only): delta list entry 4 prints a 39-character hash; the actual commit is `64d9fd99bdab58cc65d26cb8a5bcc0734b7411fa` (one character dropped mid-string). Unambiguous — the range endpoints are exact and fully determine the list.

## 3. Required review questions — criterion by criterion

### Containment and claim

**Q1 — PASS.** Branch clean, upstream-equal (0/0), exactly at the final candidate; re-verified after all review commands.

**Q2 — PASS.** Delta = exactly the listed commits/paths. No schema/migration (prisma untouched), no dependency (package.json/lockfile untouched), no Foundation/SIASIU/foundation-control path (everything under `app/`), no live/production change: `o1NonprodConfig.ts` (production refusal, TEST-key enforcement) is byte-identical across the whole range; the only config change is `allowedDevOrigins` (dev-origin policy, commit 7). `.env.example` net delta removes one name (`COSMILE_O1_PREVIEW_ACCESS_SECRET`) and adds none (`COSMILE_O1_PUBLIC_BASE_URL` predates the range). Commits 1–2 carry prior independent PASS artifacts (22_, my 34_); commits 3–12 were reviewed here in full.

**Q3 — PASS.** All evidence is TEST/sandbox, tunnel-fronted `next dev`, synthetic catalog, disposable tmpfs DB. Nothing claims production readiness; the claim ceiling `REVIEWED_BROWSER_BASED_NON_PRODUCTION_GOLDEN_ORDER_AND_GOLDEN_REVERSAL_EVIDENCE` is supported and not exceeded.

### Identity and authorization

**Q4 — PASS.** Commit 5 changed ONLY the post-login destination composition: `resolvePostLoginRedirect` → (commit 6) delegates to the single canonical `resolvePublicRedirect` in `publicOrigin.ts`. Origin comes solely from server-only `COSMILE_O1_PUBLIC_BASE_URL` (never Host/X-Forwarded-Host/header/query); unconfigured/malformed/non-http(s)/non-same-site path fail closed as bounded 503 BEFORE the session cookie is set. State/nonce/PKCE/ID-token verification and cookie attributes untouched (diff-verified). Tests cover loopback-impossibility, hostile schemes, `//evil`, and query-based host injection.

**Q5 — PASS.** Operator authority path untouched in this delta (`o1Operator.ts` not in the changed set); route still requires `o1OperatorForCustomer(...).kind === "operator"` (immutable Google subject vs server-only allowlist, digits-only both sides, per predecessor review). Email is never an authority key.

**Q6 — PASS.** Refund route at final head: default-deny; the server-minted nonce is consumed FIRST (`consumeO1StepUpNonce` at route boundary, line 30) so an identical replayed request never reaches the provider; both verifiers are bound to exact {action=refund, operator, role, order scope, reason, freshness}; wrong/blank/whitespace/absent/unconfigured secret denies before any provider work (tests).

**Q7 — PASS.** Commit 12: the matcher is single-use PER INSTANCE, and a full refund legitimately verifies twice (WU-B provider lane, WU-E finalization). One shared instance self-collided — provider cancel authorized, finalization denied `stale_or_replayed`, money reversed with the order stranded `paid` (found by source inspection; never reached at runtime). `makeO1RefundVerifiers` builds two instances from identical protected arguments, one per lane; each lane remains single-use (repeat-in-lane denied); cross-request replay remains blocked by the untouched route nonce. Nothing weakened: grant, constant-time comparison, and all bindings identical per lane; six focused tests cover both-lanes-once, per-lane repeat refusal, secret/binding mutations, and nonce single-use. The executed refund's straight-through durable state (§5: reconciliation 0, order refunded) confirms the fixed two-lane path ran live.

### Payment, order, cart, inventory, refund

**Q8 — PASS.** Commit 6 converts all five measured Toss return sites to `ret(path)` on the configured origin with 503 fail-closed; the browser return still contributes only the opaque `paymentKey` plus our internal orderId; amount/order/intent are re-read from durable state and confirmed server-side (`confirmO1Payment` — unchanged semantics; payment service/adapter/repository/webhook files are outside the changed-path set for the entire range).

**Q9 — PASS.** Commit 8 adds only the officially documented V2 `sandbox: { paymentResult: "SUCCESS" }` field (SDK-enforced TEST-key-only, on top of the runtime's live-key refusal and production structural refusal, both byte-identical across the range). Tests pin the exact enum, unchanged money binding (KRW 30000/orderNo/successUrl/failUrl/method/card settings), and absence of any card/wallet/account credential.

**Q10 — PASS.** Capture/refund truth unchanged: server confirmation binds internal order, opaque public orderNo, exact positive-integer KRW, paymentKey, currency, durable state (predecessor-reviewed lanes untouched). Durable evidence: `refund_amount_eq_order_total_eq_capture_all_krw = true`.

**Q11 — PASS (no second effect possible or observed).** Replay defenses unchanged (idempotency keys, partial-unique one-succeeded-capture/one-active-refund, route nonce, ledger discipline) and the new cart finalizer is idempotent (closed cart → `noop`; empty re-presented cart → zero deletions, no close). Durable state: capture=1, refund=1, cancel=0, history transition=1, audit rows 1+1, reconciliation=0 — exactly one economic effect per direction.

**Q12 — PASS.** Commits 10+11: `decideCartFinalization` is pure and default-deny (owner null-refusal both-null-refusal, durably-paid only, exact capture coherence, per-sku committed-inventory equality, stable-tuple-only line selection — unrelated lines survive, re-quantified lines survive, post-checkout-touched lines survive); `applyCartFinalization` deletes by full-tuple compare-and-swap (id+cartId+skuId+quantity+updatedAt) in one transaction; a CAS miss preserves the line and blocks the close; the close itself is CAS-guarded on `status='active'`; the transaction's honest scope note replaces an earlier overclaim. Consumption is exactly-once by construction and empirically (`carts: checked_out:1, active:0`).

**Q13 — PASS.** Commit 11 upgraded the inventory gate from a count to exact bidirectional sku+quantity equality (aggregating split rows). Refund preserves HOLD: durable state shows committed=1, released=0, expired=0, reserved=0 — zero automatic sellable restoration; route responds `inventoryRestored: false`.

**Q14 — PASS.** Full-refund-only unchanged: the WU-B lane never sends `cancelAmount` (predecessor grep-verified; payment lane untouched this range); refund amount equals the full capture (durable boolean true); partial refund has no reachable code path in the O1 routes.

**Q15 — PASS.** Commits 9–11: customer detail derives every row from the reviewed sanitized WU-E projection (`deriveO1DetailRows`): purchase time, order state, payment status, shipping status incl. tracking when shipped, and a truthful refund label (`환불 완료` only for ORDER_REFUNDED, otherwise `환불 완료 전` — the absolute "환불 없음" was removed as unprovable); confirmation heading/celebration render only on the `?o1=1` immediate return; customer 주문번호 shows the opaque `orderNo` (internal-id slice only as legacy null fallback); no internal id, payment reference, provider body, or PII in the projection (predecessor-verified surface unchanged).

### Evidence and cleanup readiness

**Q16 — PASS.** Every §5 categorical expectation matches the isolated mission database exactly (see §5 below) and is consistent with the accepted human evidence: GOLDEN_ORDER_COMPLETE ↔ 1 succeeded capture + bind audit; CART_EMPTY_AND_ORDER_DETAIL_OK ↔ 0 active carts (single checked_out cart); REFUND_OK with inventory-committed statement ↔ refund tx 1 + committed=1/released=0; CUSTOMER_REFUND_VIEW_OK ↔ order refunded + shipped shipment + paid→refunded history; the superseded ORDER_HISTORY_EMPTY is consistent with the single order existing now. Limits: human evidence remains declared-categorical (no identifiers were requested or received), and projection-level UI facts are supported by durable state rather than re-observed in a browser.

**Q17 — PASS.** The preview-key feature was REMOVED (not bypassed) by founder correction in commit 4: page/route/library deleted, middleware restored to pure x-pathname passthrough, env name removed, tests/scripts stripped; semantic scan at final head finds only explanatory comments (plus the unrelated legacy console "FoundationBridgePreview" naming). No preview-observer or diagnostic artifact exists in the product tree (worktree clean, zero untracked).

**Q18 — PASS (readiness).** The 01_ runbook cleanup plan plus live inspection: every runtime element is mission-attributable — `next dev` on loopback :37083 running from this mission worktree, `cloudflared` quick tunnel (PID up since 18:31, spans the whole fix/evidence window → registered hostname unchanged), mode-700 mission runtime directory under `.mission-tmp/.../runtime`, disposable `o1mission_db_2834183` (postgres:16-alpine, tmpfs — synthetic data only, all counted above), and mission env/temp files. Nothing shared or production-adjacent is in the removal set. I performed no cleanup or shutdown.

## 4. Commands actually run, and why

Read-only throughout: git (`status/log/diff/show/ls-tree/rev-parse/rev-list/merge-base/cat-file`, sha256sum) over the launcher, context, and `00feea3..94693d2`; bounded `rg`/`sed`/`grep` source inspection of every commit 3–12 diff and the final states of `middleware.ts`, `publicOrigin.ts`, toss success/fail routes, refund route, `cart.ts`, `o1CommerceRuntime.ts` seams, schema, and audit writer; read-only `ps`/`docker ps` for runtime attribution.

Executable steps (each with reason):

1. Categorical durable-state verification — `docker exec -i o1mission_db_2834183 psql -U postgres -d postgres -At` with labeled SELECT counts/booleans only (no connection string, no owner.env, no values/identifiers; one category string `actorRole=admin`). Required by handoff §5; results in §5.
2. The single permitted focused test — `cd app && npx vitest run scripts/o1_browser_runtime_contract.vitest.ts` → **1 file, 79 passed** at the final candidate. Load-bearing reason recorded before running: commits 11 and 12 executed only name-filtered subsets (21 and 6 cases), so whole-file consistency of the contract suite (including the interface changes `cartItemIds`→`lines` and the `o1RefundOrder` signature) had never been demonstrated at `94693d2`. The property suite was checked statically instead (zero references to changed interfaces — not stale) and was not run.

Not run (prohibited and not needed): full suite, build, typecheck, lint, prisma generate, browser automation, any Google/Toss/provider call, refund replay, shipment mutation, DB write, fixture reset. Worktree re-verified clean after all commands.

## 5. Categorical durable-state findings (exact, labeled)

```text
refund_rows_total 1 · refund_rows_status_refunded 1
refund_tx_succeeded 1 · cancel_tx_total 0 · capture_tx_succeeded 1
orders_total 1 · orders_refunded 1 · orders_paid 0 · orders_not_refunded 0
history_paid_to_refunded 1
refund_amount_eq_order_total_eq_capture_all_krw true
inventory_committed 1 · inventory_released_or_expired 0 · inventory_still_reserved 0
shipments_total 1 · shipment_status_shipped 1 · shipment_tracking_nonblank true (value not returned)
reconciliation_tasks_total 0
audit_refund_finalize_rows 1 (actorRole category: admin; targets the refunded order: true)
audit_bind_captured_rows 1
carts_by_status checked_out:1 · active_carts 0
customer_accounts 2 · auth_identities 2 · auth_identities_distinct 2
order_owner_has_auth_identity true · two_distinct_accounts_each_with_identity true
webhook_inbox_rows 0 (informational) · payment_intents 1 (informational)
```

Every §5 handoff expectation is met exactly. Operator-allowlist membership is not directly queryable without reading `owner.env` (not needed, not read); it is established structurally: the refund exists and is audited, and the refund route reaches the lanes only through `o1OperatorForCustomer` allowlist resolution — so the executing operator identity was allowlisted at execution time, and the purchasing customer is a distinct second identity (counts above).

## 6. Residual risks / limitations (none blocking; no risk acceptance requested)

- R1 (handoff nit): delta-commit list entry 4 is a 39-char hash in `90_…HANDOFF.md`; full value recorded in §2.
- R2 (cosmetic): the ephemeral trycloudflare hostname literal is committed in test constants and `allowedDevOrigins`. It is not a secret and dies with the tunnel; the `allowedDevOrigins` entry becomes dead config after shutdown — candidate for removal in a future authorized change, and the two contract-suite `PUB` constants could use a generic example host.
- R3 (evidence shape): browser/UI-level facts rest on accepted categorical human evidence + durable state + source; no reviewer browser re-observation was performed (prohibited). The projection surfaces are the predecessor-reviewed sanitized lanes.
- R4 (informational): `webhook_inbox_rows 0` — the TEST capture/refund completed straight-through without webhook traffic; the webhook lane (untrusted inbox + pull verification) is unchanged and was predecessor-reviewed.
- R5 (carried, per handoff): known open observations outside this delta remain open — the guest-cart orphan defect (flagged, unfixed, out of scope; no guest cart exists in the final evidence DB) and the add-to-cart label-flip timing note from commit 7.

## 7. Verdict rationale

Every containment pin reproduced exactly (commits, paths, upstream, clean tree, no forbidden surface). All ten new commits were reviewed at diff level against their stated intent, and the three highest-risk mechanisms — public-origin composition, cart finalization with exact inventory binding and CAS consume, and the two-lane step-up separation — are correct at the mechanism level with meaningful oracles that pin the failure modes they fix. Provider/payment/webhook/operator/step-up secret surfaces are byte-identical across the range wherever claimed. The whole contract file passes at the final candidate (79/79), and every one of the sixteen expected durable-state categories matches the isolated mission database exactly, mutually consistent with the accepted human evidence. No secret, identifier, PII, or provider payload was read or emitted by this review.

```text
VERDICT: PASS

MAXIMUM_SUPPORTED_CLAIM:
REVIEWED_BROWSER_BASED_NON_PRODUCTION_GOLDEN_ORDER_AND_GOLDEN_REVERSAL_EVIDENCE
(official Google test identities and official Toss TEST capture + full refund, on the
isolated tunnel-fronted non-production runtime, with straight-through durable state)

EXCLUDED_CLAIMS (not supported, not made):
PRODUCTION_READINESS · CONTROLLED_LIVE · PAID_BETA · PUBLIC_LAUNCH
GENERAL_PROVIDER_RELIABILITY · REAL_CUSTOMER_OR_REAL_PII_HANDLING
PRODUCTION_STEP_UP_OR_MFA · WEBHOOK_PATH_RUNTIME_EXECUTION
LOAD/SCALE/SECURITY-PENETRATION ASSURANCE · LEGACY(NON-O1) COMMERCE CHANGES

GOOGLE_LOGIN: COMPLETE_FOR_MISSION_EVIDENCE_ONLY · TOSS: TEST_ONLY_COMPLETE
CLEANUP: READY (plan attributable and bounded; NOT executed by the Reviewer)
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
CONTROLLED_LIVE: NOT_AUTHORIZED
PAID_BETA: NOT_AUTHORIZED
PUBLIC_LAUNCH: NOT_AUTHORIZED
AUTOMATIC_NEXT_MISSION: NO
RETURN_TO: foundation-advisor
```
