# P0 Admission — COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1

INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`

## Pinned subject

- Product repository: `/home/leo/Project/Cosmile`
- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
- Product branch: `implementation/cosmile-o1-storefront-customer-account-v1-20260724`
- Base: `51ef5f2b4d576979f4b432f114151755f02f3385`
- Base branch/upstream: `integration/cosmile-o1-reviewed-candidate-baseline-v1-20260724`, clean and upstream-equal at admission
- Docs worktree: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
- Docs branch: `advisor/cosmile-o1-storefront-customer-account-v1-20260724`
- Agent Office authority: `f66a55b390b69d34bab388ebbd9bcd42e6fa4b52`

## Scope ceiling

- Reuse the existing Cosmile storefront and reviewed O1 routes.
- Make only home, catalog, product detail, cart, checkout pending/failure/recovery, customer account order history/detail/timeline, cancellation/support status, mobile, accessibility, and empty/error states coherent.
- Preserve Google-only auth, Toss TEST-only payment, ELT eight-product/KRW truth, customer ownership, and existing Golden Commerce economics.
- No schema/migration, new economic semantics, operator-console expansion, broad redesign/rewrite, new identity/PSP, provider/live/production/PII/payment, AI/Memory/NOVA, merge, or deploy.

## Actors and collisions

- Designer: existing `foundation-designer:codex.0`; current process `gpt-5.6-sol/max`; previous mission idle. `/frontend-design` applies, constrained to existing Cosmile visual identity and no redesign.
- Worker: existing `cosmile:claude.0`; current process `Claude Opus 4.8/xhigh`; previous mission idle.
- Preserved fallback: existing `cosmile:codex-m1d-recovery.0`, idle; not selected.
- Reviewer: existing `foundation-reviewer-fable5:claude.0`, idle on a previous result. It will be rebound in-place only when a committed review launcher exists; no session clear/restart/exit.
- P1 Designer and Worker are read-only against product source and write only separate exact result paths in the docs worktree.

## Admission limits

- No product implementation before the as-built census, Designer candidate, independent design review, and Advisor module freeze.
- P1 runs no test, build, typecheck, DB, runtime, browser, provider, auth, credential, or network action.
- Runtime screenshots are not claimed in P1; source/spec evidence must be labeled as such.
- Every implementation module later receives its own exact path, behavior, focused-test, side-effect, and STOP ceiling.

NEXT_ACTION: dispatch the committed P1 Worker technical census and Designer screen census; return both to `foundation-advisor`.
