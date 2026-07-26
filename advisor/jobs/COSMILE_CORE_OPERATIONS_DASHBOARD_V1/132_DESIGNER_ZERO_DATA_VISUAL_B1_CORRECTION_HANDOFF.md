# Designer correction handoff — zero-data visual B1

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `VISUAL_B1_CORRECTION`
DECISION: `PROCEED_WITH_LIMITS`
RETURN_TO: `foundation-advisor`

## Exact input

- Review: `129_INDEPENDENT_ZERO_DATA_VISUAL_REVIEW.md`
- Disposition: `131_ADVISOR_ZERO_DATA_VISUAL_REVIEW_DISPOSITION.md`
- Product stays read-only at `96b363c7f545da5b3d1b22178fc25313a749e143`.
- Preserve Strategy's layout/hierarchy visual PASS.

## Exact correction paths

1. `122_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CONTRACT.md`
2. `123_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CANDIDATE.html`
3. `124_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CANDIDATE.png`
4. `133_DESIGNER_ZERO_DATA_VISUAL_B1_CORRECTION_RESULT.md`
5. `134_DESIGNER_ZERO_DATA_VISUAL_B1_CORRECTION_POINTER.md`

Change only:

- Add one contract statement that shell-owned inert labels remain:
  - Customer, Product, Payments & Refunds → `아직 구현되지 않음`.
  - Inventory → `집계 조회 계약 없음`.
- In both HTML and embedded SVG, replace the six exact `준비 중` occurrences with `아직 구현되지 않음`.
- Replace the two exact `집계 준비 중` occurrences with `집계 조회 계약 없음`.
- Do not change any other copy, position, dimension, color, token, field, interaction, or route mapping.

Render `124` exactly once with the already-proven local Chromium binary and no network.
View once at original 1440×900 and confirm the four labels are legible without overlap.
Do not use npx, ffmpeg, package resolution, product browser, or another renderer.
No product/runtime/DB/provider action, commit, or push.
Result ≤40 lines. `STOP`.
