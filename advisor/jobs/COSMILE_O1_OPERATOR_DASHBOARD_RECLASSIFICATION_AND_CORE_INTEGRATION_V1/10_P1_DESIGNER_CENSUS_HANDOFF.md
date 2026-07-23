# Advisor Handoff — P1 Designer Dashboard Census

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P1_READ_ONLY_CENSUS`
ACTOR: existing Foundation Designer
MODEL/EFFORT: `gpt-5.6-sol/max`
SKILL: `/frontend-design`
PRODUCT_WRITE: `PROHIBITED`

## Exact workspace and output

- Product worktree:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch/base:
  `implementation/cosmile-o1-operator-dashboard-core-v1-20260723` /
  `1e2475a02b9210e382efde7740777684d0cb4dba`
- Docs worktree:
  `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Result path only:
  `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/20_P1_DESIGNER_CENSUS_RESULT.md`

## Read ceiling and task

Read only:

- `app/src/app/console/**`
- `app/src/components/console/**`
- `app/src/app/o1/operator/**`
- `app/src/components/commerce/O1OperatorPanel.tsx`
- `app/src/app/admin/intelligence/page.tsx`
- `app/src/app/{layout.tsx,globals.css}`
- `app/src/components/layout/**`
- `설계자료/COSMILE_O1_고객취소_최소운영큐_설계서.md`

Using `/frontend-design`, inspect the current UI at source level and classify
every menu, screen, card, component, visible action, state, and navigation edge
as exactly one of:

`CONNECTED | PARTIAL | MOCK | DUPLICATE | DEFERRED | RETIRE_CANDIDATE | UNVERIFIED`.

Return a compact exhaustive matrix with:

`surface_id | kind | current_path/component | visible_label | current_truth/source | action_authority | classification | reuse_decision | target_category | evidence_path`.

Also record current visual/token assets, responsive behavior, accessibility
surface, Korean-language quality, duplicate navigation, misleading live-looking
mock states, and exact retained/repaired/deferred/retire counts. Map every row to
one Founder target category or `outside_live_default`.

This is census only. Do not create the P2 IA, mockups, product design file,
code, CSS, assets, screenshots, browser/runtime state, or implementation
recommendation beyond row-level reuse disposition. No redesign and no Nova
comparison. Report <=80 lines plus the matrix.

Read current Agent Office common rules and Designer role first. Return only the
result pointer to Advisor and STOP.
