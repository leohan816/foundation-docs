# Lab Button Classification — Worker Handoff

MISSION_ID: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
INSTRUCTION_CLASS: `PROCEED_WITH_LIMITS`
ACTOR: existing Cosmile Worker
SESSION: `cosmile`
MODEL_EFFORT: Claude Opus 5 / xhigh
SKILL: `/fable-builder`
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
BASE: `6486019e0968de5671e43521e5cfb40d03b0bdca`
PRODUCT_WRITE: PROHIBITED

## Question

Classify every one of the 13 `button` elements observed in E7 as exactly one:

- global navigation/shell;
- harmless accessibility UI;
- Lab-local navigation;
- Lab-local executable or mutation;
- unknown.

The governing contract is not page-wide `button=0`. It is:

> Lab exposes no Lab-local product, economic, operational, approval, mutation,
> promotion, or execution control. Ordinary global navigation and harmless
> shell controls may remain. Mock/deferred capabilities remain read-only.

## Exact read ceiling

Read only:

1. `app/src/app/layout.tsx`
2. `app/src/app/lab/layout.tsx`
3. `app/src/app/lab/page.tsx`
4. `app/src/components/operator/OperatorShell.tsx`
5. `app/src/components/layout/AppHeader.tsx`
6. `app/src/components/layout/CategoryNav.tsx`
7. `app/src/components/category/CategoryDrawer.tsx`
8. `app/src/components/ShippingPopup.tsx`
9. `app/src/components/product/ProductCartFab.tsx`
10. `app/src/components/layout/MallTabs.tsx`
11. `app/src/lib/categoryTree.ts`
12. `134_M5_E7_WORKER_RESULT.md` in the existing mission docs job

No runtime/browser/build/test/DB/provider command. No source or configuration write.

## Required result

- Reconcile the directly rendered source branches with the E7 count of 13.
- Index each source button group by source path, source occurrence/count,
  actual `/lab` render condition, interaction/handler, classification, and
  whether it violates the governing contract.
- Do not list capability IDs or inspect unrelated source.
- Decide only:
  - `ALL_HARMLESS_SHELL_OR_NAVIGATION`, permitting a test/evidence assertion correction; or
  - `LAB_LOCAL_EXECUTABLE_FOUND`, requiring exact source evidence; or
  - `UNKNOWN`, with the exact missing fact.

Write only:

- `139_LAB_BUTTON_CLASSIFICATION_RESULT.md`
- `140_LAB_BUTTON_CLASSIFICATION_POINTER.md`

under the existing mission job. Maximum 80 lines total. Return to foundation-advisor and STOP.
