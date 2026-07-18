# POINTER — COSMILE WU-B Correction Cycle 1 (WUB-F1 + WUB-AF1/AF2/AF3)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-B-CORRECTION-1     ACTOR: cosmile (Cosmile repository-owner Worker)     MODEL/EFFORT: Opus 4.8 (1M) / max     SKILL: /fable-builder
RETURN_TO:    foundation-advisor
STATUS:       COMPLETE — 4/4 findings closed; additive candidate committed locally; NOT pushed; STOP

HANDOFF:      advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/handoffs/62_COSMILE_WUB_CORRECTION_1_HANDOFF.md @ foundation-docs 7ec0ebc
FULL_REVIEW:  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/61_COSMILE_WUB_IMPLEMENTATION_REVIEW.md @ cce4bb50 (NEEDS_PATCH)
RESULT:       runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/62_COSMILE_WUB_CORRECTION_1_RESULT.md   (this cycle; uncommitted mirror)

CANDIDATE (Cosmile repo, branch implementation/cosmile-o1-korea-golden-commerce-v1-20260717):
  OLD_REVIEWED_PARENT:  d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01
  NEW_CORRECTION_HEAD:  e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515   (parent == OLD; additive, no amend/rebase)
  UPSTREAM_BASE:        2733bfd (WU-D)   ahead/behind: 2 / 0 (WU-B + correction; BOTH unpushed)   PUSH: NOT_PUSHED

FINDINGS CLOSED:
  WUB-F1  durable stuck-state recovery (ensure capture_confirming on every ambiguous confirm; bounded restart-safe
          stuck queries + prepareStuckRecovery counts-only; active-task/null-order/starvation exclusion; deterministic order)
  WUB-AF1 deterministic provider Idempotency-Key from a DURABLE seed (PaymentIntent.id for confirm; Refund key for refund);
          captured-replay = existing proof, zero provider call
  WUB-AF2 recordVerifiedCapture requires the claimed providerIntentRef == providerTxnRef (direct-bypass fails closed)
  WUB-AF3 serverVerifyWebhook binds durable internal intent state (orderId/orderNo/amount/KRW/paymentKey + allowed state), persisted-only verified

SCOPE:        8 reviewed WU-B paths only (588+/101-); no schema/migration/route/runtime/provider/secret.
EVIDENCE:     focused vitest 57/57 · full vitest 390/390 · WU-B disposable-PG 53/53 (cleanup verified) ·
              WU-C concurrency 28/28 · WU-0 migration 54/54 · build/tsc NOT_RUN (pre-WU-0 client; declared deploy-time unknown).

RE_REVIEW:    same Reviewer, delta-only d17a0926..e1cfc4ad.
NEXT:         foundation-advisor routes re-review; Worker does NOT dispatch Reviewer or start WU-E/F/G.
```
