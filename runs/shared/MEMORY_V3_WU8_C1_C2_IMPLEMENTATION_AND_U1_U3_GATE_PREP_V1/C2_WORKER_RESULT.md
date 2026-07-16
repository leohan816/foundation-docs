# WU8-C2 — Pure Cosmile Delivery Contracts and State Machine — Worker Result

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
WORK_UNIT_ID: WU8-C2
ROLE: Cosmile repository-owner Worker  ·  RESPONSIBLE_ADVISOR: foundation-advisor  ·  RETURN_TO: foundation-advisor
ACTUAL_MODEL: Opus 4.8 (1M context)  ·  EFFORT: high  ·  SKILL: /fable-builder
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b  ·  DESIGN_SHA256 VERIFIED: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
BASE (C1 PASS): ad172db403065fc8e498a1e80cdd347034ea7c48  ·  upstream ahead 0 / behind 0 (verified, no fetch)
CANDIDATE_COMMIT (LOCAL, NOT PUSHED): b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6  (parent ad172db)
```

## 1. Summary

Implemented only the pure WU8-C2 delivery contracts and state machine around the existing envelope: the frozen
`CommerceEvidenceCarrierV1` projection, the `CommerceEvidenceDeliveryAckV1` matrix, and the section-4 eight-state
source delivery machine (transitions, generic status mapping, lease/version/expiry, retry schedule, injected
clock/jitter, compare-and-set acknowledgement, retraction ordering, limits, poison/DLQ categorization). Every
function is pure and deterministic — no sender, consumer, I/O, DB, network, timer, scheduler, process, route,
provider, broker, credential, flag activation, or actual delivery. No envelope/carrier field was added, removed,
reshaped, enriched, normalized, or reinterpreted; `source_hash` is never recomputed or repaired. One local candidate
commit; NOT pushed. Design SHA-256 re-verified before any code. No independent PASS / final approval claimed.

## 2. Exact path delta (4 — all ∈ ALLOWED_PRODUCT_PATHS)

```text
app/src/types/commerceEvidenceDelivery.ts                            (new)  frozen constants + contract types + envelope key shape
app/src/lib/commerceEvidenceDeliveryState.ts                         (new)  pure carrier/ack/state-machine functions
app/scripts/wu8_commerce_evidence_delivery_contract.vitest.ts        (new)  contract oracles
app/scripts/wu8_commerce_evidence_delivery_property.vitest.ts        (new)  property / malicious-input oracles
```
Working tree otherwise carries only the six pre-existing preserve docs (untracked, byte-untouched, unstaged).
Zero unauthorized path changed; no existing M2 file changed.

## 3. What was implemented (anchored to the frozen design)

- **§3.1 carrier**: `projectCarrier(envelope)` performs exact-key structural validation (top + every nested object;
  rejects extra/missing keys and arbitrary extension maps → `payload_malformed`), enforces `schema_version`,
  serializes the SAME object as UTF-8 JSON (identity serialization — no reorder/transform), enforces the 32,768-byte
  ceiling (`payload_too_large`), and never recomputes/substitutes/repairs `source_hash`. `CarrierV1` = `{ envelope,
  ingressContextHandle }` (handle rides outside the payload).
- **§3.4 acknowledgement**: `interpretAck(raw)` validates the exact contract version, the five outcomes, the closed
  reason/disposition matrix (committed/exact_replay: null + acknowledge; terminal_rejected: one guarded C category +
  acknowledge; retryable_unavailable: `cannot_determine` + retry; disabled: null + contain), rejects extra keys, and
  maps every malformed/unknown acknowledgement to `ack_malformed` (retries, never acknowledges). `ackEffect` gives
  the §3.4 final source action.
- **§4.1 state machine**: closed `TRANSITIONS` for the eight states (four terminal, no outgoing), `isAllowedTransition`,
  and `genericStatusFor` (pending/sent/failed/blocked).
- **§4.2 claim/lease/retry/ack**: `claim` (earliest unfinished, no overtake, per-root single lease, `attemptCount`++,
  `leaseVersion`++, `leaseExpiresAt = now + 30s`), `reapExpiredLease`, `retryDelayMs` (attempts 1–4 → 1/2/4/8 s +
  clamped jitter [0,250] ms; attempt 5 → null dead letter), and `applyAck` compare-and-set that mutates only when the
  row is still `leased` at the recorded lease version and not expired (stale/late/not-leased → no mutation).
- **§4.1 retraction**: `retractionEffect` blocks every earlier unfinished row in the root, keeps the retraction row
  eligible, and leaves an acknowledged predecessor untouched; `isEarliestUnfinished` enforces per-root ordering.
- **§4.3/§4.4 limits/DLQ**: `admitNewEvidenceRow` (depth 1000 → backpressure), `canLease` (global 4 / per-root 1),
  `containmentDecision` (contained→ready only with flag+consent+eligible+no-backpressure), `attemptBucket`, and
  `buildDlqObservation` (category-only shape, count 1, no raw values). All frozen limits are exported constants.

## 4. Tests-first note and coverage

- Ordering deviation (declared, per fable-builder §5): for this pure contract module the types + lib were authored
  from the frozen design before the two test files. No oracle was weakened to fit code; the oracles independently
  assert the frozen design constants (exact byte counts, the eight-state matrix, backoff `[1,2,4,8]`s, the limits
  object, and the exact 6 accepted rows of the outcome×reason×disposition cross-product), so they meaningfully
  constrain the implementation. The tsc cast fixes in the test files did not change any assertion.
- REQUIRED_TEST_MEANING coverage: exact carrier keys/serialization/byte count and zero extra fields; full ack matrix
  + adjacent-invalid; every allowed transition and forbidden/unknown transitions; lease version, expiry, stale
  acknowledgement, attempt-5 exhaustion, backoff/jitter boundaries with injected clock/jitter; per-root ordering,
  retraction no-overtake with earlier-unfinished blocked and retraction row eligible; poison, oversize, malformed
  acknowledgement, category-only DLQ, backpressure/limits, flag/consent containment; no raw values in DLQ output or
  fixtures; existing M2 A/B suites and no-transport scan unchanged and passing.

## 5. Exact test commands and results

```text
npx vitest run scripts/wu8_commerce_evidence_delivery_contract.vitest.ts scripts/wu8_commerce_evidence_delivery_property.vitest.ts   -> PASS (33)
npx vitest run scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts                                       -> PASS (57, unchanged)
node scripts/m2_ab_no_transport.mjs                                                                                                   -> PASS (unchanged, exit 0)
npx tsc --noEmit                                                                                                                      -> 0 errors in the four allowlist paths (7 remaining are the pre-existing, unrelated foundation-memory-deanon test)
```

## 6. Zero forbidden access / boundary

```text
SENDER/CONSUMER/POLLING/IO/DB/TIMER/SCHEDULER/PROCESS/ROUTE/ENDPOINT/PROVIDER/BROKER/NETWORK/CREDENTIAL: NONE (module is pure; no fetch/prisma/fs/net/Date.now/Math.random/process.env/setTimeout)
CARRIER/ENVELOPE SEMANTIC CHANGE · NEW/RENAMED PAYLOAD FIELD · WEAKENED VALIDATION · PERMISSIVE UNKNOWN: NONE
SCHEMA/MIGRATION/DB CHANGE: NONE (C2 is pure application contracts only)
FLAG ACTIVATION / ACTUAL DELIVERY / ACTIVATED INTAKE: NONE
FOUNDATION/SIASIU/FOUNDATION-CONTROL / UNRELATED FOUNDATION-DOCS WRITES: NONE
NEW AGENT/SUB-AGENT · REVIEWER DISPATCH · SELF-REVIEW · NEXT WORKUNIT: NONE
EXISTING M2 FILE CHANGED: NONE   ·   RAW VALUES IN FIXTURES/DECISIONS/DLQ: NONE (opaque-ref/prefix scan asserted empty)
COMMIT: LOCAL CANDIDATE b8b61d7 (NOT pushed; origin/shadow still ad172db)  ·  HISTORY REWRITE / FORCE PUSH / AMEND: NONE
```

## 7. Proved / not proved · residual

- Proved: exact carrier key/byte closure and identity serialization; full ack matrix and adjacent-invalid rejection;
  complete transition closure; deterministic lease/version/retry/compare-and-set; retraction ordering; limits/DLQ
  category-only shape with no raw-value leakage; determinism; M2 suites + no-transport unchanged.
- Not proved (out of scope by design): any live sending, scheduling, or Foundation intake; wall-clock timing (clock/
  jitter injected). No runtime behavior is exercised — this is pure logic only.
- Residual: none within scope. The module is inert until a separately-authorized sender WorkUnit (not started).

## 8. Independent-review attack questions

1. Can any extra key at any envelope nesting level, or a mutated `schema_version`, pass `projectCarrier`, or is every
   structural deviation classified poison without touching `source_hash`?
2. Does any acknowledgement outside the six exact matrix rows validate, and does a malformed/unknown acknowledgement
   ever acknowledge instead of retry?
3. Can `applyAck` mutate a row at a stale lease version, after lease expiry, or when not leased; and does attempt 5
   deterministically dead-letter while 1–4 schedule `retry_wait`?
4. Can a retraction overtake an earlier unfinished predecessor, block an already-acknowledged predecessor, or leave
   an earlier unfinished row unblocked; and does any DLQ output carry an id/hash/opaque-ref?

## 9. Completion status

```text
FOUR ALLOWED PRODUCT PATHS CHANGED: YES (exactly 4)   ·   NO EXISTING M2 FILE CHANGED: YES
C2 CONTRACT+PROPERTY: PASS (33)   ·   M2 A/B SUITES: PASS (57, unchanged)   ·   NO-TRANSPORT SCAN: PASS (unchanged)   ·   TSC: 0 in allowlist
CANDIDATE COMMIT RECORDED (NOT PUSHED): b8b61d7
RETURN_TO: foundation-advisor   ·   PROPOSED_NEXT_ACTOR: foundation-advisor (independent PASS + push routing; then U1–U3 gate prep)   ·   STOP_AFTER_RETURN: true
```

Not an independent PASS or final approval. Return only the compact pointer to foundation-advisor and STOP.
