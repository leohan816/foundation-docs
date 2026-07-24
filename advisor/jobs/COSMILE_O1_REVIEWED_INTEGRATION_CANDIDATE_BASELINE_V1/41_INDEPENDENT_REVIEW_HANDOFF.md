# Independent review handoff

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`

REVIEW_NEEDED: `YES`

REVIEW_TIER: `NORMAL_COMPLEX_BOUNDED`

MODEL: `Claude Opus 4.8`

EFFORT: `max`

WHY_SELECTED: one test-only fixture-order/isolation correction and integration-evidence reconciliation; no product runtime, payment, authorization, schema, provider, or economic behavior changed. Fable 5 would be disproportionate.

SKILL: `/fable-sentinel`; references: `review-classification`, `delta-review`, `provenance-review`.

## Exact subject

- Product base: `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80`
- Product candidate: `51ef5f2b4d576979f4b432f114151755f02f3385`
- Exact changed path: `app/scripts/o1_order_service_request.dbtest.vitest.ts`
- Evidence index: docs files `11`, `12`, `30`, `31`, and `40` in this mission directory

## Questions

1. Do the actual failure output, test order, implementation contracts, and introduction history support classifying M2B and M3A as stale shared-fixture expectations rather than product defects?
2. Does relocating the three M2B tests preserve their assertions and test the initial eligible state without weakening a contract?
3. Does deleting only the two earlier-test synthetic request artifacts before M3A isolate the exact queue fixture without masking a product query defect?
4. Does the candidate retain meaningful RED and focused `46/46` GREEN evidence without asserting that the earlier full gate itself passed?
5. Is the one-path delta contained, truthfully attributed, and free of product/schema/provider/economic effects?

## Limits

Read-only exact delta and evidence only. No test, build, typecheck, full suite, broad repository audit, provider/DB/runtime action, patch, commit, or push. Return `PASS | PASS_WITH_CORRECTIONS | HOLD`, blocking findings only, then STOP.
