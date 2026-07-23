# Advisor Handoff — P2 Single Console Design Candidate

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P2_DESIGN_CANDIDATE`
ACTOR: existing Foundation Designer
MODEL/EFFORT: `gpt-5.6-sol/max`
SKILL: `/frontend-design`

## Exact workspace, base, and write ceiling

- Product worktree:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch/base:
  `implementation/cosmile-o1-operator-dashboard-core-v1-20260723` /
  `1e2475a02b9210e382efde7740777684d0cb4dba`
- Exact product design paths:
  1. `설계자료/COSMILE_O1_독립운영콘솔_통합설계서.md`
  2. `설계자료/COSMILE_O1_독립운영콘솔_데스크톱.svg`
  3. `설계자료/COSMILE_O1_독립운영콘솔_모바일.svg`
- Docs result path only:
  `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/31_P2_DESIGNER_CANDIDATE_RESULT.md`

## Binding design direction

Design one Korean-first independent Console as the sole permanent operational
control plane. Reuse the existing Console shell, neutral cards, orange action
token, type scale, spacing, and O1 truthful state/action copy. Do not create a
storefront-embedded operator shell, a Nova clone, or a new visual system.

Top-level information architecture:

1. 실시간 운영
2. 주문·고객 지원
3. 재고·구매·출고
4. 카탈로그·상품 운영
5. 재무·정합성
6. 분석·전략
7. 마케팅·리뷰
8. Agent Control Center
9. 운영 설정

Only the reviewed O1 order, payment, full TEST refund, shipment record,
inventory reservation/commit/HOLD, cancellation/support queue, reconciliation,
operator authorization, and audit evidence may look connected or actionable.
Price/listing/event-planning/human-AI/Agent Control Center and all other future
mutations are visible placement seams only, labeled `준비 중`/`읽기 전용`, and
nonfunctional.

## Required two-pass design

Pass 1 — structure:

- Define desktop navigation, overview, work queue, detail, truthful status
  badges, error/empty/HOLD/recovery states, and mapping of all 87 Designer census
  rows plus every Worker technical row into `retain | repair | deferred |
  transition | retire_candidate`.
- Preserve O1 allowlist, step-up, nonce, audit, idempotency, full-only TEST
  refund, committed inventory/HOLD, and lane isolation at every high-risk action.
- Treat `/o1/operator` and legacy write/chat as transition evidence, not
  permanent destinations. No deletion is approved.

Pass 2 — visual critique/refinement:

- Produce full-size desktop `1440×1024` and mobile `390×844` SVG candidates.
- Open both at original size and record a concise screenshot/visual critique,
  then refine once.
- Use subject-specific tokens derived from current Console/O1 assets; no
  gradients, decorative dashboard clutter, or fabricated live metrics.
- Desktop is configuration-capable; mobile is overview/work-queue triage only.
- Accessibility floor: keyboard order, visible focus, 44px mobile targets,
  `aria-current`, live/alert semantics, 200% text behavior, no color-only state,
  reduced-motion/static equivalence, and no required horizontal scroll for core
  triage.

The design document must include:

- IA and navigation labels;
- exact screen/state/action model;
- capability badge vocabulary distinguishing connected, read-only, TEST,
  record-only, HOLD, and deferred;
- responsive/accessibility rules;
- complete census-to-destination mapping;
- component/asset reuse map;
- nonfunctional/deferred seams;
- acceptance criteria and implementation non-goals.

## Boundaries and return

No runtime/source/component/API/config/schema/migration/test/DB/provider/secret
write, browser app start, package command, implementation, or approval. The
design artifacts are the only product writes. Stage only those three paths,
commit once with truthful Codex attribution or no co-author trailer, and
non-force push the mission product branch. Write the exact docs result file
without committing it. Return a compact pointer to Advisor and STOP for
independent design review.
