# Exact Handoff — Cosmile Static Commercial Audit

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
WORKUNIT_ID: DAY1_COSMILE_STATIC_COMMERCIAL_AUDIT
DISPATCH_OWNER: foundation-advisor
TARGET_ACTOR: cosmile
TARGET_ROLE: Cosmile repository-owner Worker
TARGET_WORKSPACE: /home/leo/Project/Cosmile
REQUIRED_SKILL: /fable-builder
REQUIRED_EFFORT: high
MODE: READ_ONLY_E2_STATIC
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Committed authority pins

```text
STRATEGY_HANDOFF_COMMIT: c94c122ebcbe8d9acfbc76566ada85021ad95f6a
STRATEGY_HANDOFF_BLOB: 3d9f38b36b8b101a12b853f0f794f0d459a8f28a
ADVISOR_ADMISSION_COMMIT: 2759d923a6605f30f7c8091214036ef1878628b8
ADVISOR_BRANCH: advisor/foundation-cosmile-commercial-baseline-v1-20260717
```

Read the current Agent Office operating model, Worker role, result protocol, and the Cosmile `AGENTS.md` and `CLAUDE.md` directly before investigation. Current Agent Office authority controls role behavior; historical foundation-docs role material is evidence only.

## Exact subject

```text
REPOSITORY: /home/leo/Project/Cosmile
BRANCH: shadow/m4-cosmile-memory
PINNED_HEAD: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
TRACKED_STATE_AT_ADMISSION: CLEAN
PREEXISTING_UNTRACKED_ENTRY_COUNT: 6
```

Use committed Git objects at `PINNED_HEAD` as the source. Inventory with `git ls-tree`/`git ls-files` and read tracked content with `git show PINNED_HEAD:path`. Do not open, modify, delete, move, stage, or rely on pre-existing untracked files.

## Task

Produce a decision-focused static audit of the smallest plausible paid-commerce slice. Stop each trace at the first material decision or blocking boundary; do not perform exhaustive line review.

1. Build a lightweight tracked surface index for customer/operator commerce entry points: catalog/product detail, identity/guest/account, cart/checkout, payment request/webhook/idempotency, order creation/history, inventory reserve/deduct/restore, shipping/tracking, cancellation/refund, and admin/operator controls.
2. For each material slice, trace only what committed source can establish across UI → route/API → service → schema/migration definition → external adapter/config boundary.
3. Separate actual source wiring from mock, shadow, dead/unreachable, source-only, missing, and unverified states.
4. Identify static authorization, failure, retry/idempotency, data-ownership, provider, deployment, logging, monitoring, backup, and legal/policy surfaces only where they change Paid Beta or Public Launch decisions.
5. Identify which ordinary-commerce flows statically depend on Foundation or SIASIU and what source-defined behavior exists when AI/Foundation is unavailable. Do not inspect SIASIU beyond a referenced boundary.
6. Provide evidence usable to frame one to three provisional Paid Beta options without selecting product policy or asserting operational/vendor facts.
7. Record exact later E3/E4 evidence requests for every material conclusion that E2 cannot support. Do not execute them.
8. Record pre/post branch, HEAD, staged, tracked, and untracked-count evidence proving product write zero.

## Evidence constraints

```text
MAX_NEW_EVIDENCE: E2_STATIC_CONNECTED
BUILD: PROHIBITED
LINT: PROHIBITED
TEST: PROHIBITED
RUNTIME: PROHIBITED
DB_OR_MIGRATION_EXECUTION: PROHIBITED
ENDPOINT_OR_BROWSER_EXECUTION: PROHIBITED
NETWORK_OR_VENDOR_ACCESS: PROHIBITED
PRODUCT_REPOSITORY_WRITE: ZERO
BRANCH_OR_REF_MOVEMENT: ZERO
```

Existing historical test/build/runtime claims may be indexed only as E0/E1 unless their exact current-commit provenance is statically verifiable; they never become newly generated E3/E4 evidence.

## Required durable outputs

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/runs/cosmile/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_COSMILE_STATIC_AUDIT_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/runs/cosmile/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_COSMILE_STATIC_AUDIT_POINTER.md
ALLOWED_WRITE: RESULT_PATH and POINTER_PATH only
COMMIT_OR_PUSH: NO
```

The result must include:

- actor/session/model/effort/skill/workspace and files read;
- exact Git baseline and post-state;
- tracked surface index and decision-relevant flow traces;
- evidence rows using the schema in `02_P1_ROW_SCHEMA_AND_VIEW_MAP.md`;
- provisional-option implications, not an option selection;
- Paid Beta blockers, Public Launch blockers, ordinary debt, workarounds, and deferrals;
- external/operations questions with required owners and calendar consequences;
- `UNKNOWN`, `UNVERIFIED`, exact later E3/E4 requests, and scope stops;
- `PRODUCT_REPOSITORY_WRITE_STATUS: ZERO`;
- `RETURN_TO: foundation-advisor` and `STOP`.

The pointer must contain only mission/workunit, result path, subject HEAD, result SHA-256, product write status, blocker summary, return target, and `STOP`.

Do not dispatch another actor, call the Reviewer, implement, redesign, accept risk, approve release, resume Memory V3, or begin a next mission.
