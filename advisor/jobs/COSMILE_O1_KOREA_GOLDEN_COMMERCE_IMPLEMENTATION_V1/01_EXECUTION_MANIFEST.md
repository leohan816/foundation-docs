# Advisor Execution Manifest

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
ADVISOR: foundation-advisor
ADVISOR_SESSION: foundation-advisor / pane %27
ADVISOR_MODEL_EFFORT: gpt-5.6-sol / xhigh
MISSION_MODE: BOUNDED_NON_PRODUCTION_IMPLEMENTATION
IMPLEMENTATION_AUTHORITY: WU-0_THROUGH_WU-G_AND_BOUNDED_FOUNDATION_SNAPSHOT_EXPORT_ONLY
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```

## Actor plan

| Actor | Existing session | Required runtime | Role | Initial dispatch |
|---|---|---|---|---|
| Foundation Worker | `foundation` pane `%3` | Fable 5, max, `/fable-builder` | Foundation repo-owner Worker | bounded snapshot/export file-bundle implementation |
| Cosmile Worker | `cosmile` pane `%1` | Opus 4.8 (1M), max, `/fable-builder` | Cosmile repo-owner Worker | WU-0 additive schema and disposable rehearsal |
| Independent Reviewer | `foundation-reviewer-fable5` pane `%5` | Fable 5, max, `/fable-sentinel` | separate read-only Reviewer | exact pinned candidate review, serialized |
| Designer | `foundation-designer` | gpt-5.6-sol, max | bounded design-defect support only | not initially dispatched |
| Control | `foundation-control` | Opus 4.8 (1M), max | exact contract/invariant support only | not initially dispatched |

Before each dispatch Advisor re-verifies session, pane, model, effort, CWD, role, loaded
skill, idle/readiness, synchronization OFF, and absence of conflicting work. No model or actor
substitution is allowed.

## Dependency sequence

1. Foundation snapshot/export lane and Cosmile WU-0 may run in parallel because repositories and
   write paths do not collide.
2. Each produces one local candidate commit and durable evidence; neither pushes before review.
3. Reviewer full-reviews each exact candidate subject in serialized dispatches.
4. `NEEDS_PATCH` returns to the same Worker. The same Reviewer performs delta-only re-review.
5. Only independently reviewed PASS heads are pushed and become next-stage bases.
6. Cosmile WU-A, WU-C, and WU-D follow WU-0. One repo-owner Worker means their commits are
   serialized even when their design dependencies are parallelizable.
7. WU-B begins only after the reviewed WU-C contract. WU-E begins after A-D. WU-F and WU-G are
   last and may claim only evidence actually achieved without secrets or live access.
8. Independent implementation review of the final integrated head, Advisor final audit,
   publication, Strategy return, then HARD STOP.

## Evidence root

```text
JOB_ROOT: advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/
RUN_ROOT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/
```

Every handoff names exact result and pointer paths. Worker result text is evidence, not review.
Advisor commits/pushes foundation-docs artifacts with exact-path staging. Product candidate
commits are reviewed before final non-force push.

## Runtime and testing safety

- No production/shared/staging/live DB. WU-0 uses only a disposable local PostgreSQL instance or
  an already-local image; no image pull and no external network.
- No dependency installation without a new exact Advisor decision. Existing dependencies only.
- Before every command, inspect its exact working directory, environment target names without
  printing values, expected writes, and cleanup. Capture pre/post Git state.
- Google/Toss tests use deterministic fakes until the consolidated credential gate. No fake is
  described as provider sandbox evidence.
- Evidence contains status/category/count/boolean and commit/file pointers only. No raw payload,
  PII, provider identity, order/payment/customer identifier, secret, credential, or full env dump.
- Unexpected tracked change, uncertain artifact ownership, cleanup failure, scope expansion,
  broad rewrite, or provider incompatibility triggers STOP.

## Review and correction

```text
FULL_REVIEW: exact pinned candidate HEAD and declared base
CORRECTION_OWNER: same original Worker
RE_REVIEW: same Reviewer, declared old-reviewed-HEAD..new-candidate-HEAD delta only
ORDINARY_MAX_CORRECTION_ATTEMPTS: 3
MATERIAL_MAX_CORRECTION_ATTEMPTS: 5
PASS_WITH_RISK_OR_FAIL: RETURN_TO_STRATEGY_LEO
```

Reviewer never patches, commits, pushes, accepts risk, or expands scope.

## Strict exclusions

No real customer PII, live credentials, real payment, public sale, production DB/migration,
provider contract/KYC/merchant activation, Controlled Live, Paid Beta, Public Launch, main or
protected merge, force push, Foundation AI, SIASIU AI, Memory V3, recommendation UI, US/USD,
B2B2C, influencer feature, advanced dashboard, AI pricing/CRM, full rewrite, unrelated cleanup,
or automatic next mission.
