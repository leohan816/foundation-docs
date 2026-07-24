# FOUNDATION ADVISOR HANDOFF — INDEPENDENT DESIGN REVIEW

- MISSION: `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1`
- PASS: `DESIGN_REVIEW`
- REVIEW_NEEDED: YES
- REVIEW_TIER: `HARD_IMPORTANT_SAFETY`
- MODEL: Fable 5
- EFFORT: max
- WHY_SELECTED: operator identity, authorization, step-up, refund/recovery command boundaries and audit attribution are security/economic-integrity critical.
- ROLE: existing independent Reviewer; no implementation or patch.
- PRODUCT: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1` at `3dc5129b573237a85f34bfa65a329a299d31fef2`.
- DOCS: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1`.

Load `/home/leo/Project/skill/fable-sentinel/SKILL.md` and only:

- `references/contract-review.md`;
- `references/safety-review.md`;
- `references/provenance-review.md`;
- `references/review-classification.md`.

Current Agent Office authority overrides the skill's historical V2 pointer.

Review the exact package in `41_ADVISOR_DESIGN_PACKAGE_INDEX.md`, with `40_ADVISOR_INTEGRATED_DESIGN_CONTRACT.md` as the resolved contract. Inspect actual pinned source only where needed to verify:

1. 12 current routes and complete route/nav/screen/card/API mapping;
2. separate evidence axes and synthetic/non-production zero handling;
3. Main Now/Main Later/Lab/Retire and release-timing correspondence;
4. Console/Dashboard/Lab separation and Lab read-only ceiling;
5. provider-neutral OperatorPrincipal structurally separate from customer identity;
6. source capability catalog versus persistent/runtime grant and Git-never-grants invariant;
7. exact step-up/nonce/replay/expiry/revocation/audit contract;
8. current O1 command boundary, full-only refund, no inventory restore, reconciliation and idempotency preservation;
9. missing inventory/activity reads remain unavailable;
10. no implementation/schema/runtime authority is implied.

Use snapshot-fixed `git show`/read-only source inspection. Do not run tests/build/runtime/browser/DB/provider/network, modify files, commit, push, or broaden into implementation design.

Write only:

- `51_INDEPENDENT_DESIGN_REVIEW.md` (<=80 lines; `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`, blocking findings first);
- `52_INDEPENDENT_DESIGN_REVIEW_POINTER.md`.

Report actual model/effort/skill/live binding with verdict. STOP and return to foundation-advisor.
