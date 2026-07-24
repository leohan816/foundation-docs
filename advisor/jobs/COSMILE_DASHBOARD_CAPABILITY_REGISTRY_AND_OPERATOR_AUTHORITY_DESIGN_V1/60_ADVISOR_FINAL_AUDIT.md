# Advisor Final Audit — COSMILE Dashboard Capability Registry and Operator Authority Design

```text
MISSION_STATUS: COMPLETE_DESIGN_ONLY
FINAL_VERDICT: PASS_WITH_RISK
BLOCKING_FINDINGS: 0
PRODUCT_IMPLEMENTATION: NONE
NEXT_MISSION: NOT_STARTED
```

## Pins and Git

- Product repository/branch: `leohan816/Cosmile` / `implementation/cosmile-o1-storefront-customer-account-v1-20260724`.
- Product HEAD: `3dc5129b573237a85f34bfa65a329a299d31fef2`, clean/upstream-equal.
- Reviewed storefront base: `71e05266086639b4b1ff1f5a277a7f836dc3e5ab`, verified ancestor.
- Foundation-docs branch: `advisor/cosmile-o1-existing-domain-preview-v1-20260724`, existing Draft PR 7 only.
- Prior Strategy evidence: `6b55b69e0150f76680ef26e8ec70bd86c4cb86f7`.
- Product changed paths: NONE.
- Preview/runtime/session state: preserved; no mutation by this mission.

## Delivered and verified

- As-built registry separates `source/build/test/runtime/integration/data/authority/surface`.
- Direct-source surface map: 106 rows = routes 12, nav 9, Main screens/actions 21, Console 10, legacy observations 18, admin 9, traffic 5, endpoints/actions 22.
- Disposition counts: Main Now 26, Main Later 27, Lab 31, Retire Candidate 22.
- Timing counts: Paid Beta blocker 19, Controlled Live blocker 13, soon after beta 9, optional growth 27, deferred program 38.
- Korean-first route contract: Console=conversation/control; Dashboard=evidence-bounded operations; Lab=read-only promotion registry.
- Every Main datum has an operator question, read/source contract, truthful state, authority, allowed/prohibited action and failure/recovery behavior.
- Missing aggregate inventory-risk and recent-sensitive-activity reads are `UNAVAILABLE`, never zero.
- Current preview counts/zeroes are synthetic non-production evidence only.
- Legacy/current O1/partial/mock/dry-run/deferred/unverified surfaces and bypass risks are retained, not patched.

## Frozen authority contract

- Permanent authority root: provider-neutral internal `OperatorPrincipal`, structurally separate from customer identity/account/session.
- Console authentication alone grants no O1 capability.
- Source Capability Catalog defines closed names only; Git never grants runtime authority.
- Persistent runtime grants require exact principal/capability/scope/source/lifecycle/revocation evidence and default-deny evaluation.
- Sensitive refund/stock/recovery preserves action/scope/role/reason-bound single-use step-up, expiry/replay denial and zero-effect failure.
- Current O1 command boundary remains authoritative: exact allowlist, nonce-before-mutation, full-only refund, no inventory restoration, count-only reconciliation, idempotency and transactional audit.
- Screen access never substitutes for command authority.

## Evidence corrections and process record

- Worker 11-page count corrected to 12 (root `/console` omitted).
- Worker `ConsoleSession=0` corrected to current categorical 2; current ConsoleUser/Session/AuditLog counts are 1/2/2, synthetic non-production.
- `/console/login` excluded from protected-page guard claims.
- Designer range prose corrected by individual canonical row: M03 is Lab.
- Worker performed one unnecessary Git fetch before local docs path clarification; no product/runtime effect and zero evidence weight.
- First docs push after P1 failed once on SSH public-key authentication; identical non-force retry succeeded.

## Actor bindings

- Cosmile Worker: existing Claude Opus 4.8 `[1m]`, xhigh, exact product worktree; `/fable-builder` with contract-to-code mapping/report reference; read-only.
- Designer: existing gpt-5.6-sol process, actual argv effort max; stale CWD contained by exact per-command absolute binding; documentation only.
- Control: existing Claude Opus 4.8 `[1m]`, max shown by live UI; targeted authority analysis only.
- Independent Reviewer: existing independent Fable 5 `[1m]` / max process, exact product CWD, no authoring overlap; `/fable-sentinel` with contract/safety/provenance/classification references.
- No Actor/session/process was added, removed, restarted, cleared, exited or reconfigured.

## Independent review

- Pass/tier: `DESIGN_REVIEW / HARD_IMPORTANT_SAFETY`.
- Actual verdict: `PASS_WITH_RISK`; blocking findings 0; no safety-weakening path.
- Reviewer re-verified source at the product pin, including nonce-before-mutation, full-only refund, `inventoryRestored:false`, committed/HOLD reservation, default-deny allowlist and restart-dropped single-use nonce.
- Build/test remain honestly `UNVERIFIED@3dc5129`; this documentation-only mission did not run them.

## Residual gates — not silently accepted

Before any implementation/Controlled Live:

1. finalize OperatorPrincipal persistence and structural customer separation;
2. define Console credential binding without Console-login capability minting;
3. freeze least-privilege capability granularity;
4. provide durable grant lifecycle and immediate revocation;
5. provide durable/multi-instance freshness and real production step-up;
6. attribute sensitive audit durably to the OperatorPrincipal;
7. harden screen guards without weakening command gates;
8. re-establish build/test and Korean-font/mobile/accessibility evidence at the implementation pin.

These gates are the review's UD1–UD7 plus provenance evidence. They require explicit later authority; this mission neither accepts nor implements them.

## Exclusions attested

No product/config/schema/migration/DB/env/runtime/route/auth/preview/provider change; no grant/seed/browser mutation; no AI/Memory/automation; no production/live/PII/economic action; no merge/deploy; no second PR; no next mission.

## Claim

`REVIEWED_COSMILE_CONSOLE_DASHBOARD_LAB_OPERATOR_AUTHORITY_DESIGN_WITH_RISK`

HARD STOP before implementation.
