# FOUNDATION ADVISOR HANDOFF — WORKER AS-BUILT INVENTORY

- MISSION: `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1`
- ROLE: existing Cosmile Worker; return only to `foundation-advisor`.
- MODE: read-only source/evidence inspection. Product, runtime, DB, env, auth, preview, and provider writes are prohibited.
- PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
- PRODUCT_BRANCH: `implementation/cosmile-o1-storefront-customer-account-v1-20260724`
- PRODUCT_HEAD: `3dc5129b573237a85f34bfa65a329a299d31fef2`
- DOCS_WORKTREE: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1`
- STRATEGY_EVIDENCE: `advisor/jobs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1/30_STRATEGY_CONSOLE_DASHBOARD_AUTHORITY_CONFLICT_EN.md`

## Required authority and skill

Read current Agent Office common rules, product `AGENTS.md`/`CLAUDE.md` and app rules. Load `/home/leo/Project/skill/fable-builder/SKILL.md`; use only `references/contract-to-code-mapping.md` and `references/implementation-report-template.md` as applicable. Current Agent Office authority overrides historical foundation-docs role text. Do not implement or test.

## Exact work

Inspect the current routes, menus, screens, cards, components, APIs, services, Prisma schema, command boundaries, and existing focused tests/evidence relevant to Console, Dashboard, Lab, and operator authority. Inspect actual source directly; do not rely on the Strategy summary alone.

Build an evidence-indexed registry whose rows include:

1. surface/capability and exact evidence `path:line` at the pinned HEAD;
2. current route/component/service/data source and owning boundary;
3. action and command boundary, if any;
4. separate states for `source`, `build`, `test`, `runtime`, `integration`, `data`, `authority`, and `surface`—never one collapsed VERIFIED label;
5. current truth classification: `CURRENT_O1 | LEGACY | PARTIAL | MOCK | DRY_RUN | DEFERRED | DEAD | UNVERIFIED`;
6. disposition candidate: `MAIN_NOW | MAIN_LATER | LAB | RETIRE_CANDIDATE`;
7. reuse decision and release timing: `PAID_BETA_BLOCKER | CONTROLLED_LIVE_BLOCKER | SOON_AFTER_BETA | OPTIONAL_GROWTH | DEFERRED_PROGRAM | OUT_OF_SCOPE`;
8. legacy/mock/admin bypass risk, without patching it.

For every current Dashboard datum, record the operator question, exact system of record/read contract, truthful empty/unavailable/not-configured/not-collected/stale/synthetic/unverified state, required authority, permitted action, prohibited action, and failure/recovery presentation evidence. Classify preview zeroes only as confirmed empty synthetic non-production state.

Inventory operator identity/auth paths, allowlists, Console sessions, action-bound step-up, nonce/expiry, audit, revocation behavior, and reviewed O1 commands. Record evidence and unresolved contradictions; do not decide canonical policy for Control.

## Output ceiling

Write only:

- `11_WORKER_AS_BUILT_REGISTRY.md` — compact row-based evidence registry;
- `12_WORKER_AS_BUILT_RESULT.md` — <=80 lines, material counts/findings/risks;
- `13_WORKER_AS_BUILT_POINTER.md` — exact pins, changed docs paths, Git state, return route.

These three paths must be under this mission directory in the docs worktree. No other file write, commit, push, command that mutates state, build, test, network research, browser action, or runtime/DB query. STOP and return if direct evidence cannot bound a claim.
