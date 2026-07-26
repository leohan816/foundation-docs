# Independent visual review — zero-data operations pages

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `ZERO_DATA_VISUAL_REVIEW`
REVIEW_TIER: `HARD_IMPORTANT_SAFETY`
MODEL: `Fable 5`
EFFORT: `max`
RETURN_TO: `foundation-advisor`

## Exact subject

- Docs: `advisor/cosmile-core-operations-dashboard-v1-20260725@59e671e58cf2b37ddd12275fec4d685e425784c6`
- Product: `implementation/cosmile-core-operations-dashboard-v1-20260725@96b363c7f545da5b3d1b22178fc25313a749e143`
- Strategy visual verdict: `STRATEGY_VISUAL_PASS_ZERO_DATA_PAGES`
- Contract: `122_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CONTRACT.md`
- Image: `124_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CANDIDATE.png`
  - 1440×900
  - blob `d4d3529241b3b096c7a115c6a2adbfe8a718eede`
  - SHA-256 `63bc7d15f462e827f743ec969e0482e67e96181739ea5c5c0e9460a6106bc9f4`

Review tier is hard/safety because the visual contract freezes which authenticated
operational fields may be exposed and must reject internal ID, PII, economic, and
unavailable-read invention. The existing Fable binding remains unchanged.

## Skill and evidence

Load `/home/leo/Project/skill/fable-sentinel/SKILL.md` and only:

- `references/contract-review.md`
- `references/safety-review.md`
- `references/provenance-review.md`
- `references/review-classification.md`

Current Agent Office role authority controls; historical V2 text named by the skill is evidence only.

Inspect only the contract/image above and these exact product files read-only:

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/app/dashboard/fulfillment/page.tsx`
3. `app/src/app/dashboard/requests/page.tsx`
4. `app/src/components/console/O1ConsoleFulfillment.tsx`
5. `app/src/components/console/O1ConsoleQueue.tsx`

## Required questions

1. Does the image preserve the accepted shell and make a successful zero result look like a professional operations page rather than a raw message or fabricated KPI?
2. Are title, provenance, bounded summary, stable headers, and the empty panel truthful for the exact existing fields?
3. Is the optional order-status filter strictly local to the returned `dbStatus` array and safely omittable if implementation would require another read?
4. Can the same grammar map to fulfillment without inventing tracking/shipment data and to requests without exposing customer, text, payment, provider, refund, or internal identifiers?
5. Are zero, denied, unavailable, and repository failure still distinct?
6. Are non-empty rows, responsive behavior, keyboard/screen-reader semantics, and Korean copy implementable without a new route/read/schema/command/capability?

## Boundaries and outputs

Read-only. No patch, test, browser/runtime, network, DB, provider, commit, push, or broad audit.
Write only:

1. `129_INDEPENDENT_ZERO_DATA_VISUAL_REVIEW.md`
2. `130_INDEPENDENT_ZERO_DATA_VISUAL_REVIEW_POINTER.md`

Result ≤60 lines. Verdict `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`.
Report actual session/model/effort/CWD/skill references. `STOP`.
