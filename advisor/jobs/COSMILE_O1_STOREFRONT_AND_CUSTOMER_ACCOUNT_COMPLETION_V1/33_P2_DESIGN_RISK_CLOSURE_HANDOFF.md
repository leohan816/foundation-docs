# P2 Designer Correction — Close Review Residuals R1–R3

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
ACTOR: same existing Foundation Designer, `foundation-designer:codex.0`
BASE: `7c720f2e254e39bf275358c9d1d5460963d9382c`
MODE: one-file design clarification only

The independent design review result 31 returned `PASS_WITH_RISK`, blocking `0`, no redesign required. Close only these residuals:

1. R1 — State that the SVG is a supplemental structural flow map, not the product typography/aesthetic source of truth. Existing application tokens/components and the written contract are authoritative. Korean source text integrity is proven; actual Korean rendering remains a later implementation browser-evidence criterion, not accepted by this design artifact.
2. R2 — Mark `return-confirming` and `unknown` explicitly as `REPAIR` states to be implemented/tested fail-closed from existing server outcomes, not claimed as current `O1TossCheckout` behavior.
3. R3 — Name `o1EligibleCatalog(process.env)` as the exact existing server-side eligible catalog source reused by O1 home/catalog/detail.

Exact product write:

- `app/docs/COSMILE_O1_STOREFRONT_CUSTOMER_ACCOUNT_COMPLETION_DESIGN.md`

Exact docs writes:

- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/34_P2_DESIGN_RISK_CLOSURE_RESULT.md`
- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/35_P2_DESIGN_RISK_CLOSURE_POINTER.md`

No SVG change, new design, source/runtime/test/build/DB/provider/network, other path, or scope expansion. Inspect exact one-file diff, commit once, non-force push, write compact result <=40 lines, return to Advisor, STOP for same-Reviewer delta re-review.

RETURN_TO: `foundation-advisor`
STOP.
