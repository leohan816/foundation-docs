# Independent Design Review Handoff

MISSION_ID: COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1
ACTOR: independent Foundation Reviewer
SESSION: foundation-reviewer-fable5
REQUIRED_BINDING: actual Claude Opus 5 / max
SKILL: `/fable-sentinel`
CLASSIFICATION: NORMAL_COMPLEX_BOUNDED_DESIGN
RETURN_TO: foundation-advisor

## Subject

- Product base, read-only:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
  at `8d4a3272c6baced193be4f9ed88710c39c90d739`
- Docs candidate:
  `/home/leo/Project/.worktrees/foundation-docs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
- Review exact Designer artifacts `11`–`16` and Advisor gate `17`.
- Use `10_DESIGNER_HANDOFF.md` as the authority and `02_ADVISOR_ADMISSION_CORRECTION.md`
  for the seven-now/eight-capacity disposition.

The preserved Reviewer pane may have a different root. Every command must use
one of the two exact workdirs above; do not read or write a predecessor mission.

## Minimum source correspondence

Inspect only the directly load-bearing customer files named in handoff `10`:
layout/globals, Home, Shop, product detail, Wishlist, Cart, Account, customer
Orders/detail, the shared layout components, O1 card/cart/wishlist/checkout/order
status/request components. No Dashboard/Console/Lab, schema, provider internals,
Foundation internals, DB, runtime, browser mutation, or historical mission reread.

## Review questions

1. Does the candidate remove the desktop phone mock while preserving a truthful
   real mobile viewport and the existing customer route/action IA?
2. Does it bind dynamically to the full admitted dataset: seven now, natural
   eight capacity, with no eighth ghost/fabrication or alternate product source?
3. Are product media, Korean copy, KRW price, non-production notice, wishlist,
   cart, checkout, account, order, service-request, loading/empty/error/recovery,
   and ownership boundaries truthful to source?
4. Does any proposed component or copy add promotion, claim, KPI, image,
   recommendation, route, data contract, commerce behavior, or deletion beyond
   authority?
5. Is the desktop/mobile hierarchy professional and implementable, with adequate
   focus, contrast, target size, reduced motion, text zoom, and no hidden state?
6. Are the parity matrix and two representative visuals sufficient to freeze a
   bounded implementation without Worker UX invention? Name any exact missing
   design contract as a finding rather than exploring new product scope.

## Render evidence

Inspect `13` and `14` at original size using the already-present local Noto CJK
font environment recorded in `17`. No font installation, subsetting, embedding,
product write, browser/runtime request, or alternate rendering experiment.

## Output

Write only:

1. `21_INDEPENDENT_DESIGN_REVIEW.md`
2. `22_INDEPENDENT_DESIGN_REVIEW_POINTER.md`

Result ≤80 lines. State actual live model/effort/skill, verdict
`PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`, blocking findings, exact bounded
corrections, and residual limits. Read-only: do not edit candidate, commit, push,
dispatch, or accept risk. Return to foundation-advisor and STOP.
