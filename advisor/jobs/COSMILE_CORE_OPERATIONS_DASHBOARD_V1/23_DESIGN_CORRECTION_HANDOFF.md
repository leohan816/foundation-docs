# DESIGN CORRECTION HANDOFF

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `M1_DESIGN_CORRECTION`
ACTOR: existing `foundation-designer`
MODEL/EFFORT: `gpt-5.6-sol/max`
SKILL: existing loaded `frontend-design`
BASE_DOCS_HEAD: `bc6c695a861657eaa204bb3fe520f881aa72f068`
REVIEW: `21_INDEPENDENT_DESIGN_REVIEW.md` — `PASS_WITH_RISK`, blocking 0

## Exact correction

Read only the current `11_`, `12_`, and `21_` files. Make these three corrections:

1. In `11_` §5, state the exact operational precedence:
   `DENIED → HOLD → NOT_CONFIGURED → UNAVAILABLE → NOT_IMPLEMENTED → CONFIRMED/CONFIRMED_ZERO`.
   `HOLD` is a cross-cutting operational command-blocking condition, not a fabricated datum. It dominates actions while the underlying datum truth remains visible; no mutation control appears.
2. In `11_`, add one explicit relationship line: this Core Operations Dashboard contract supersedes the predecessor seven-state presentation vocabulary only for this Dashboard view. The predecessor capability-registry evidence states remain authoritative as provenance qualifiers; `NOT_COLLECTED`, `STALE`, `SYNTHETIC`, and `UNVERIFIED` must map to honest Dashboard unavailable/provenance presentation and never to confirmed zero.
3. In `12_`, align exact copy with `11_`:
   - `UNAVAILABLE · 현재 조회할 수 없음`
   - `모바일에서는 운영 사실만 확인할 수 있습니다.`
   - `보호된 작업은 데스크톱에서 진행합니다.`

## Exact path ceiling

Modify only:

- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/11_DESIGNER_DESKTOP_OPERATIONS_CONTRACT.md`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/12_DESIGNER_DESKTOP_OPERATIONS_MOCKUP.svg`

Create only:

- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/24_DESIGN_CORRECTION_RESULT.md`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/25_DESIGN_CORRECTION_POINTER.md`

No product write, source/browser/font exploration, mockup redesign, runtime/DB/provider action, test/build, commit, push, self-review, or scope expansion. Preserve all other design content byte-for-byte where possible. Validate SVG syntax and report the exact lines changed. Return <=50 lines to `foundation-advisor` and `STOP`.
