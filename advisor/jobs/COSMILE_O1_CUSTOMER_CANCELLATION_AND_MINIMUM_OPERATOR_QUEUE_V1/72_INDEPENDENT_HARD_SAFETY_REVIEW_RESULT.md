# Independent Hard/Safety Delta Review Result — COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1

REVIEW_PASS: `IMPLEMENTATION_REVIEW` · REVIEW_TIER: `HARD_IMPORTANT_SAFETY`
VERDICT: **`PASS_WITH_RISK`**
ACTOR: independent Foundation Reviewer (separate fresh session; not Advisor/Worker)
MODEL/EFFORT (actual runtime): `claude-fable-5` (Fable 5) / dispatch binding `max` (harness-controlled), interleaved reasoning active
SKILL: `/fable-sentinel` with exactly `delta-review`, `safety-review`, `provenance-review`, `contract-review`, `review-classification`
STATUS: uncommitted review artifact (Advisor owns commit/push)

## Handoff verification (cryptographic)

- Docs worktree HEAD `97b8605ea4ba7ab78e591b584d53067da4cdcb6f` = named commit; `git ls-tree` of
  `advisor/jobs/.../70_INDEPENDENT_HARD_SAFETY_REVIEW_HANDOFF.md` → blob `0aacd47921f8376926704db1991e892d1480f136`;
  blob SHA256 `7f96a2d2171c771e03670f530ef0349058a84baaff57f58890b3bd5126cbacad`. All three match the dispatch. Read from the blob.

## Reviewed subject (verified Git state)

- Product repo `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`,
  branch `implementation/cosmile-o1-cancellation-operator-queue-v1-20260721`, HEAD = candidate
  `1e2475a02b9210e382efde7740777684d0cb4dba`, clean (0 dirty), upstream-equal (`@{u}` = HEAD). Base `92331e75…` present.
- Delta: 21 commits, 31 files, +5,915/−76. All 31 files inspected (full read of the 6 production modules + migration pair +
  schema + design doc; diff-level read of routes/UI; assertion-level read of all 10 test files). Predecessor context read
  read-only where load-bearing: `o1RefundOrder`/`makeO1RefundVerifiers` lane, `o1Operator.ts` step-up/allowlist,
  `o1LegacyLaneIsolation.ts`, original `PaymentIntent_status_chk` (20260717180000). None of these predecessors changed in the delta.

## Question coverage (Q1–Q10, direct evidence unless labeled reported)

- **Q1 PASS** — `20260721120000_o1_order_service_request` creates exactly one empty table (closed kind/status CHECKs, total
  resolvedAt↔status partition CHECK, FK RESTRICT, unique orderId+idempotencyKey, `(status,requestedAt)` index) and widens the one
  named `PaymentIntent_status_chk` by `+cancelled` only; no backfill/rewrite; original six values verbatim in the base migration and
  restored verbatim by `down.sql`, which aborts fail-closed while any request row or cancelled intent exists. `dbtest.py` asserts both
  accept and reject sides of every constraint plus abort/pristine-down/re-forward (evidence read in source; runs reported only).
- **Q2 PASS** — `serviceRequestRepository.submitCustomerServiceRequest`: advisory lock first, all facts re-read under lock, sole
  policy `decideServiceRequest`; pre-capture writes are count-checked exactly-one (intent `created|action_required`→`cancelled`;
  release only the proven-exact `reserved` set; Order `pending`→`cancelled`) + history + fail-closed audit as last write; any
  mismatch throws → full rollback → `repository_error`. Zero Refund/PaymentTransaction/provider/`CommerceSku.stock` writes in the
  module. Replay → `existing_request`/`terminal` no-write; concurrency → lock + unique(orderId)+unique(`o1sr_<orderId>`); audit
  failure rollback and double-submit convergence asserted in `o1_order_service_request.dbtest.vitest.ts:528,540`.
- **Q3 PASS** — customer submission inserts only request(`requested`)+audit (dbtest asserts byte-equivalent order/payment/
  inventory/history). Operator processing: allowlist (`resolveOperatorFromIdentity`, default-deny, unchanged) + route-consumed
  single-use nonce + exact-bound verifier grant (unchanged) + M4A admission requiring `paid_unshipped_cancel/requested`, order
  `paid`, `captureExact`, no non-failed refund, `committedCoverage`, admissible shipment; refund only via unchanged `o1RefundOrder`
  (`o1rk_<orderId>` provider idempotency). Settle `completed` only on re-read `finalTruth` (Order `refunded` + exact matched Refund +
  committed coverage). No inventory writes anywhere in M4A/M4B; fulfillment now fail-closes `request_conflict` under the same
  order lock while a `paid_unshipped_cancel` request is active (`repository.ts:251`), closing the ship-during-cancel race.
- **Q4 PASS** — `o1ProcessPaidCancellationRefund` `already_completed` branch calls `input.stepUp.verify(stepUpRequest)` exactly
  once (same bound grant object; zero provider); denied/thrown → `not_authorized/step_up_denied` with zero settle/refund.
  Commit `1e2475a` + `o1_paid_cancellation_refund_runtime.vitest.ts:92-119` (authorized/denied/thrown, exact bound request).
- **Q5 PASS** — shipped-support create is request-only (M1C); M3D route parses no body; M3C ack mutates only
  `shipped_support/requested`→`accepted` + audit under lock; no refund/inventory/shipment/courier/step-up/provider path exists in
  the ack code; dbtest asserts zero economic write, idempotent replay, audit rollback, concurrency convergence.
- **Q6 PASS** — ownership `userId === ownerRef` with missing/non-O1/mismatch all `not_found` (indistinguishable; dbtest:417);
  boundary outcomes are category-only (no id/amount/provider/raw error/PII); `isBoundedId` zero-call rejection; queue/detail restrict
  to exact `^O1-[0-9A-F]{20}$` + ≥1 intent and expose only orderId/orderNo/kind/status/requestedAt/category to allowlisted
  operators; detail whitelists (kind,status,category) tuples and closes malformed/ambiguous/null to `repository_error`; UI classifiers
  fail unknown shapes to unavailable/HOLD; unknown facts → `recovery_hold` (never eligibility) in `decideServiceRequest` rule 3.
- **Q7 PASS** — active/unknown reconciliation → `recovery_hold` no-write in every port; ambiguous provider/order rejection → one
  bounded `ensureRefundHold` (≤1 active `refund_hold`, ambiguity throws) + request `recovery_hold`; settle-after-durable-refund
  failure → `repository_error`, recoverable via `already_completed` (never false success). Terminal rows: excluded from queue, detail
  `none`/settled UI non-actionable, degraded completed → `not_actionable`, step-up nonce withheld server-side (`[orderId]/route.ts`).
- **Q8 PASS** — only write sites for `OrderServiceRequest`/`PaymentIntent→'cancelled'` are in `serviceRequestRepository.ts`
  (repo-wide grep), reachable only through flag+auth-gated O1 routes → runtime; legacy/mock/admin lanes untouched in the delta and
  still refused by unchanged `o1LegacyLaneIsolation` (namespace OR structural arm, fail-closed count).
- **Q9 PASS** — customer UI renders one situational action from the closed server response with truthful consequence copy (no
  restock claim; request-only wording); badge map is closed, unknown → none. Operator UI: pure fail-closed mode classifier
  (`null→legacy`, exact refund/support, valid terminal→settled, everything else→HOLD), mutually exclusive action surfaces, support
  has no step-up, list→queue replacement is the design freeze (`설계서 §1`), no redesign; no client-side economic inference.
- **Q10 PASS** — all 31 changed paths are mission-scoped (schema/migration, request stack, O1 routes/UI, design doc, tests); only
  cross-cutting change is the mission-required `request_conflict` gate. Tests assert adversarial failures (priority matrix, cartesian
  transition sweep vs independent oracle, zero-write denials, audit rollback, concurrency, replay, redaction, opaque denials,
  restart step-up, fail-closed unknown/future kinds) rather than normalize them.

## Findings and residual risks

- **F1 [provenance/handoff-citation — residual, Advisor action]** Handoff names deviation commit
  `31825fdd756b886108a2724c1447b7bd18ff0c6a`; that object does not exist in the product repo (all refs searched: 0). The actual
  in-range commit is `31825fddf55eb187f8c816cb3ab9e2b8a01c5a45` ("feat(order): add customer request read projection") and it does
  carry the inaccurate `Co-Authored-By: Claude Opus 4.8 (1M context)` trailer — the deviation's substance is CONFIRMED; the
  handoff's 40-hex citation is defective (only the 8-hex prefix matches). Audit chain should record the corrected hash. No rewrite.
- **F2 [provenance/disclosed — residual, Leo/GPT acceptance]** 12/21 in-range commits carry the Opus trailer, 9/21 none; all author
  `Leo Han`. Per handoff, trailers carry zero authorship weight in this range; the inaccurate trailer(s) remain permanently in
  immutable history. Accepting that is a Leo/GPT decision, not the Reviewer's.
- **O1 [LOW]** Namespace-gate asymmetry: customer gate `isO1OwnedOrder` (namespace OR structural, `serviceRequestRepository.ts:142`)
  vs operator surfaces (exact regex AND ≥1 intent, `:337/:576/:657/:704`). A structural-arm-only order (non-O1 orderNo + bound
  intent) could hold a customer request invisible to the operator queue. Unreachable via any current mint path; fail direction is
  request-only/non-economic. Track for future lane work.
- **O2 [INFO]** `shipped_support` `requested→refused` edge is frozen in the contract graph and tolerated by read-side whitelists but
  has no runtime writer in this delta (M3D writes `accepted` only). A future refuse writer needs its own approved handoff.
- **O3 [INFO]** Design doc v0.1 §3 operator two-column layout/filter chips and §5.8 `layout.tsx` carve-out were not implemented;
  the shipped UI is a truthful subset of the freeze (no surface exceeds it).
- **O4 [INFO]** `already_completed` restart maps a settle `recovery_hold` to boundary `repository_error` (durable HOLD truth is still
  written by the port). Frozen by `o1_paid_cancellation_refund_runtime.vitest.ts:85-89`; no false-success path.

## Evidence discipline and boundary compliance

- Reported-only evidence (not re-run; runs forbidden by handoff): final gate "3 files, 54/0/0", M4B-R1 "1 passed / 9 filtered".
  Test SOURCE assertions were verified directly instead. The disallowed broader `-t 'M4B '` run was not repeated; zero weight.
- Read-only review: no tests/build/typecheck/Prisma/DB/container/provider/network/browser/credential/economic command; no patch,
  no product-repo write, no commit, no push, no dispatch, no agent/sub-agent, no risk acceptance, no final approval.
- Verdict rationale (review-classification): all ten hard/safety criteria hold on direct evidence; no safety-weakening path, no
  source-of-truth contamination, no join-key/enum drift, implementation-readiness satisfied → not `NEEDS_PATCH`/`FAIL`. F1/F2 are
  real, durable provenance risks requiring explicit acknowledgment → `PASS_WITH_RISK`, never auto-advance.

RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
STOP
