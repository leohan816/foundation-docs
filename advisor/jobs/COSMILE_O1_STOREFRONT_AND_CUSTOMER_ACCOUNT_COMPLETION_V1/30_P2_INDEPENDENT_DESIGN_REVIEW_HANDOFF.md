# P2 Independent Design Review Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
PASS: `DESIGN_REVIEW`
REVIEW_NEEDED: `YES`
REVIEW_TIER: `NORMAL_COMPLEX_BOUNDED`
MODEL: `Claude Opus 4.8`
EFFORT: `max`
WHY_SELECTED: two-file design-only candidate with no runtime, auth, payment, DB, schema, provider, or economic change; normal complex review is sufficient.
ACTOR: existing independent Foundation Reviewer, `foundation-reviewer-fable5:claude.0`

## Reviewed subject

- Base: `51ef5f2b4d576979f4b432f114151755f02f3385`
- Candidate: `7c720f2e254e39bf275358c9d1d5460963d9382c`
- Exact delta:
  - `app/docs/COSMILE_O1_STOREFRONT_CUSTOMER_ACCOUNT_COMPLETION_DESIGN.md`
  - `app/docs/COSMILE_O1_STOREFRONT_CUSTOMER_ACCOUNT_FLOW_BOARD.svg`
- P1 evidence: committed results 12, corrected 17, and fact supplement 20.
- Designer result: 23 and pointer 24.

Load `/fable-sentinel` with only `contract-review`, `provenance-review`, and `review-classification`. Confirm `DESIGN_REVIEW`.

## Review questions

1. Does the candidate reuse the existing Korean Cosmile shell/tokens/components without redesign?
2. Are home/catalog/detail/cart/account/order/request states O1-truthful, with legacy mock, unsupported AI/personalization, PII, and raw/internal/provider identifiers excluded?
3. Does checkout UI preserve the existing O1 Toss TEST lane and server money truth without creating new provider/economic behavior or a false success claim?
4. Is the proposed progress/timeline strictly calculable from current customer projection fields, with internal OrderHistory/event details explicitly deferred?
5. Do cancellation/support actions and states remain server-owned, one-action, fail-closed, and aligned with the reviewed request contract?
6. Are 320/390/768, 200% text, keyboard/focus, 44px target, reduced-motion, live/alert/busy, empty/error/not-found/HOLD criteria executable and internally consistent?
7. Are `CURRENT | REPAIR | DEFERRED | UNVERIFIED` dispositions and 30 acceptance criteria sufficient for an exact module freeze without Worker invention?
8. Does the 1600×1200 SVG match the written flow and remain structurally legible? The host raster lacks Korean fonts; verify Korean source text integrity and classify that environment limitation without inventing browser proof.

The Designer read `service.ts` and a route file outside handoff 22 before Advisor interruption. They produced no product delta and carry zero verdict weight; confirm candidate claims are independently grounded in the admitted P1 evidence and exact candidate files.

## Boundaries and output

Read-only exact delta/evidence review. No patch, commit, push, tests, build, typecheck, DB/runtime/browser/provider/network, broad repository audit, risk acceptance, or implementation.

Write only:

- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/31_P2_INDEPENDENT_DESIGN_REVIEW_RESULT.md`
- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/32_P2_INDEPENDENT_DESIGN_REVIEW_POINTER.md`

Result <=80 lines with `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`, exact findings, actual model/effort/skill, reviewed commit/delta, limitations, and return target. Leave results uncommitted.

RETURN_TO: `foundation-advisor`
STOP before implementation.
