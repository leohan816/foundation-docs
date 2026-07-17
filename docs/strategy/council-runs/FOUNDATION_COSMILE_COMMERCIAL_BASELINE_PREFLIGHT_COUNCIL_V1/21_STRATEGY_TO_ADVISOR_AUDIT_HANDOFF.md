# Strategy-to-Advisor Commercial Baseline Audit Handoff

MISSION_ID: `FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1`

HANDOFF_ID: `FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1_STRATEGY_HANDOFF_V1`

DATE_UTC: `2026-07-17`

DOCUMENT_TYPE: `STRATEGY_TO_ADVISOR_MISSION_HANDOFF`

HANDOFF_STATUS: `EXECUTABLE_FOR_ADVISOR_ADMISSION_AND_ORCHESTRATION`

REPORTS_TO: `foundation-advisor`

COMMAND_PATH: `Leo -> foundation-strategy-sol -> foundation-advisor -> selected Foundation Team Actors -> foundation-advisor -> foundation-strategy-sol -> Leo`

## Authority and interpretation

LEO_AUTHORIZATION: `YES`

AUTHORIZATION_EVENT: Leo instructed Strategy to continue after publication of the Council-corrected Preflight and Founder timebox correction.

AUTHORIZATION_INTERPRETATION: Start the bounded read-only commercial baseline audit through `foundation-advisor`. This does not authorize product implementation, E3/E4 execution, risk acceptance, release approval, or an automatic next mission.

COUNCIL_CORRECTED_STRATEGY_RECOMMENDATION_ACCEPTED: `YES`

AUDIT_AUTHORIZED: `YES`

## Exact Strategy subject pins

REPOSITORY: `leohan816/foundation-docs`

BRANCH: `strategy/foundation-cosmile-commercial-baseline-preflight-20260717`

STRATEGY_PACKAGE_COMMIT: `25fadd1e15569a3722b5e3172cf30a85b4888f81`

PREFLIGHT_FILE: `docs/strategy/20260717_FOUNDATION_COSMILE_COMMERCIAL_BASELINE_STRATEGY_PREFLIGHT_KO.md`

PREFLIGHT_BLOB: `f850d11b6c6669253cf488447b1e732656cc7f03`

PREFLIGHT_SHA256: `1056f9c802e574b48ff2139e1ffc857316d6e5d65cdf128000d621246b17db8f`

FINAL_SYNTHESIS_FILE: `docs/strategy/council-runs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1/17_STRATEGIST_FINAL_SYNTHESIS_EN.md`

FINAL_SYNTHESIS_BLOB: `6d7eddb9335299646c2b04807c040ed65fa35346`

LEO_DECISION_BRIEF_FILE: `docs/strategy/council-runs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1/18_LEO_DECISION_BRIEF_KO.md`

LEO_DECISION_BRIEF_BLOB: `b3862537090567cf376f58fca51f03c45b19e3ed`

TIMEBOX_CORRECTION_FILE: `docs/strategy/council-runs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1/20_FOUNDER_TIMEBOX_CORRECTION.md`

TIMEBOX_CORRECTION_BLOB: `0da29eddf0d96f2863474cb07802fd783ebc3aec`

COUNCIL_FINAL_VERDICT: `PROCEED_WITH_CORRECTIONS`

The Advisor must verify the delivery commit containing this handoff before admission. The delivery message supplies that self-external commit pin.

## Mission objective

Reconstruct one current, evidence-grounded commercial baseline for Cosmile and the Foundation commercial core so Leo can choose the shortest safe path to Paid Beta without reopening Memory V3 or confusing source presence with runtime readiness.

The audit must determine:

1. the current as-built state of the selected Cosmile paid-commerce critical flow;
2. the current as-built state of the Foundation capabilities actually required by the selected beta option or options;
3. the exact Foundation/Cosmile contract and the boundary-only role of SIASIU;
4. which capabilities are evidenced, partial, mock, shadow, dead, absent, or unverified;
5. Paid Beta blockers versus Public Launch blockers versus ordinary technical debt;
6. bounded parallel Tracks C, F, X, and P;
7. commercial branch-baseline options and evidence, without selecting or moving a branch;
8. engineering workdays, external calendar dependencies, and estimate confidence; and
9. the exact Founder, owner, vendor, Legal, privacy, security, payment, fulfillment, and operational decisions that remain.

## Primary decision question

What is the smallest evidence-backed implementation sequence that can make Cosmile ready for a bounded Paid Beta while preserving Foundation/SIASIU ownership, commerce continuity, and explicit high-risk decision boundaries?

## Founder-fixed mission decisions

```text
AUDIT_EVIDENCE_CEILING: E2_STATIC_ONLY
BETA_OPTION_ENVELOPE: COMPARE_UP_TO_3_PROVISIONAL_OPTIONS
PUBLIC_LAUNCH_SEPARATE_GATE: YES
OUTPUTS_NON_AUTHORIZING: YES
INTERNAL_ESCALATION_OWNER: foundation-strategy-sol
RETURN_ROUTE: foundation-advisor -> foundation-strategy-sol -> Leo
TARGET_DURATION: APPROXIMATELY_3_WORKING_DAYS
DAY_3_CHECKPOINT: REQUIRED
HARD_STOP_AT_DAY_3: NO
CONTINUE_AFTER_DAY_3: YES_WHEN_NECESSARY_BOUNDED_AND_WITHIN_APPROVED_SCOPE
```

Known non-negotiables:

- Ordinary catalog, cart, checkout, payment, and order behavior must not become dependent on Foundation, SIASIU, or AI availability.
- Unavailable or unverified AI consultation must close safely or remain hidden; the audit does not redesign that behavior.
- Paid Beta and Public Launch remain separate gates.
- Audit evidence and recommendations grant no implementation, branch, risk, release, or public-exposure authority.
- Memory V3 remains paused at the reviewed pre-runtime boundary, does not auto-resume, and is outside this audit except as a no-build boundary.
- Unknown demand, operational, vendor, Legal, and owner facts remain `UNVERIFIED` or `EXTERNAL_PENDING`; actors must not invent them.

## Advisor admission gate

Before dispatching any subordinate, `foundation-advisor` must:

1. read the exact committed handoff and all pinned Strategy subjects;
2. read the current Agent Office Team Operating Model and Advisor role;
3. classify this instruction as `PROCEED | PROCEED_WITH_LIMITS | NEEDS_DECISION | HOLD | FAIL` against actual repository and runtime state;
4. verify actual repository paths, branches, HEADs, upstream references, dirty state, and relevant ancestry without moving a branch;
5. verify live actor identity, responsible Advisor binding, session, model, effort, CWD, role reads, capacity, and absence of a conflicting mission;
6. select the smallest sufficient Foundation Team composition;
7. create exact committed subordinate handoffs before any actor dispatch;
8. define one docs-only Advisor output branch/worktree and durable job folder without modifying dirty `foundation-docs/main` or any product working tree;
9. record Day 1, Day 3, Reviewer, and final Advisor return checkpoints; and
10. fail closed and return to Strategy on an exact authority, safety, actor-binding, or mission-scope conflict.

No subordinate may begin before this admission record is committed.

## Recommended actor composition

The Advisor owns final selection and routing under current authority. Strategy recommends:

- `cosmile` Worker: Cosmile repo-local commercial evidence.
- `foundation` Worker: Foundation repo-local commercial-core evidence.
- `foundation-control`: bounded cross-project ownership, adapter, contract, dependency, and failure-boundary evidence.
- `siasiu` Worker: only if the Advisor selects an exact unresolved boundary question that cannot safely remain `UNVERIFIED`; never a full SIASIU audit.
- assigned Independent Foundation Reviewer: immutable final P1–P4 review only.

The Advisor must not implement, act as Control or Worker, or independently review its own Team's work.

## Evidence and runtime safety envelope

### Allowed

- Git metadata, local branches, HEADs, upstream references, relevant ancestry, and exact file history.
- Static source, configuration, schema-definition, script-definition, documentation, and stored artifact inspection.
- Targeted static tracing needed to establish physical ownership and selected commercial flows.
- Existing test/build/runtime evidence only when its exact commit, command, environment, timestamp, and provenance are directly verifiable.
- GET-only GitHub metadata and exact artifact reads for the named repositories and pinned PRs, using read-only operations such as `git ls-remote`, `gh api` GET, or `gh pr view`.
- Docs-only mission artifacts under the Advisor's isolated `foundation-docs` branch/worktree.

### Not authorized

- Build, lint, test, smoke, runtime, DB, migration, endpoint, browser-flow, or vendor execution.
- E3 or E4 evidence generation.
- `git fetch`, `git pull`, `git push`, checkout, reset, merge, rebase, branch movement, commit, or file modification in any product repository.
- Product source, schema, dependency, generated-file, configuration, or documentation modification.
- Production, staging, shared DB, real vendor, real customer, PII, secret, payment, fulfillment, email, SMS, or public-exposure access.
- Dependency installation or upgrade.
- Architecture redesign, bug fixing, implementation planning that silently becomes implementation, or security/code-quality audit.
- Any non-GitHub network access or write operation to a remote service.

If E2 cannot support a material conclusion, record the item as `UNVERIFIED` and state the exact later E3/E4 evidence request. Do not execute it in this mission.

## Investigation method

### Day 0 / admission

- Freeze exact authority, repo, actor, role, runtime, workspace, evidence-ceiling, question-ID, output, and return-route pins.
- Preserve all pre-existing dirty/untracked product files; do not inspect them as current committed evidence unless provenance is separately established.
- Create the selected-slice authoritative row schema and P1–P5 mapping.

### Day 1 / option and decision gate

- Form one to three provisional Paid Beta options without inventing demand or operational facts.
- Map the smallest commercial slice for each option.
- Return exactly `CONTINUE | EARLY_COMPLETE | HOLD` with evidence and reasoning.
- Continue only questions capable of changing the Paid Beta option, blocker set, sequencing, branch recommendation, estimate, or required Founder decision.

### Evidence collection

- Cosmile: trace the selected customer/operator critical slice statically from UI through API/service/data/external-boundary definitions.
- Foundation: trace only selected-beta commercial judgment/data capabilities from canonical source through judgment/API/display/failure definitions.
- Cross-project: identify physical ownership, adapters, contracts, identifier mappings, coupling, and degraded behavior.
- SIASIU: boundary-only check; do not convert it into a commerce runtime dependency or full audit.
- External/operations: separate code facts from owner/vendor/Legal/operational facts and calendar dependencies.
- Stop each trace at the first decision-relevant or blocking boundary; do not perform exhaustive line review.

### Day 3 checkpoint

The Advisor must freeze:

```text
COMPLETED_EVIDENCE: <exact pinned snapshot>
EXACT_REMAINING_QUESTIONS: <bounded list with decision impact>
SCOPE_EXPANDED: NO
REMAINING_WORK_NECESSARY: YES | NO
REMAINING_WORK_BOUNDED: YES | NO
WITHIN_ALREADY_APPROVED_SCOPE: YES | NO
REVISED_BOUNDED_COMPLETION_ESTIMATE: <workdays, assumptions, confidence>
CHECKPOINT_DECISION: CONTINUE_WITHIN_SCOPE | COMPLETE_AND_FREEZE_FINAL_PACKAGE | RETURN_TO_LEO
```

Day 3 is not a hard stop. Continue without a new Leo approval only when remaining work is necessary, bounded, and inside this approved scope.

## Required final outputs

Produce one authoritative evidence row set with these P1–P5 views:

1. `P1_AUDIT_MANIFEST_AND_CLOSURE_RECORD`
   - exact pins, authority, actors, routes, evidence ceiling, checkpoints, drift, product diff zero, and non-authorization.
2. `P2_CAPABILITY_EVIDENCE_MATRIX`
   - current Cosmile as-built state, Foundation commercial-core state, SIASIU boundary, contract/identifier/failure evidence, and mock/real/partial/shadow/dead/absent/unverified classification.
3. `P3_RELEASE_GATE_AND_BLOCKER_MATRIX`
   - Commercial MVP Feature Complete, Paid Beta Ready, Paid Beta Exit, and Public Launch Ready criteria; confirmed blockers, gate-holding unknowns, ordinary debt, workarounds, and deferrals.
4. `P4_DELIVERY_AND_DECISION_PACKAGE`
   - bounded Paid Beta option cards, recommended option for Leo's consideration, Tracks C/F/X/P, commercial branch-baseline options, explicit no-build list, engineering workdays, elapsed external dependencies, confidence, and exact Founder/external decisions.
5. `P5_INDEPENDENT_REVIEW_AND_ADVISOR_CLOSURE`
   - immutable P1–P4 pins, Independent Reviewer verdict, correction loop evidence if needed, Advisor final audit, unresolved issues, and exact return pointer.

The final package must answer the intended decision or return `HOLD` with the exact missing evidence/decision. It must not claim product readiness or approval beyond its evidence.

## Return and STOP conditions

Return immediately through `foundation-advisor -> foundation-strategy-sol -> Leo` when any is true:

- material scope expansion is required;
- a new production, payment, DB/schema/migration, PII, secret, security, Legal, public-exposure, canonical-ownership, or other high-risk decision is required;
- the bounded remaining duration materially exceeds the original estimate;
- the audit can no longer answer the intended decision;
- actor authority, role binding, workspace safety, product dirty-state preservation, or committed-handoff prerequisites conflict;
- product repository modification or prohibited execution is detected.

Do not return merely because Day 3 elapsed or a bounded in-scope question remains.

## Closure authority

```text
COMMERCIAL_AUDIT_ACTIVATION: AUTHORIZED_THROUGH_ADVISOR_ADMISSION
PRODUCT_IMPLEMENTATION: NOT_AUTHORIZED
PRODUCT_REPOSITORY_WRITE: NOT_AUTHORIZED
RISK_ACCEPTANCE: NOT_AUTHORIZED
PAID_BETA_APPROVAL: NOT_AUTHORIZED
PUBLIC_LAUNCH_APPROVAL: NOT_AUTHORIZED
MEMORY_V3_RESUMPTION: NOT_AUTHORIZED
NEXT_MISSION_AUTO_START: NO
FINAL_DECISION_OWNER: Leo
```

The Advisor must return the audited result to `foundation-strategy-sol`. Strategy will explain the result and remaining decisions to Leo. No follow-up mission starts automatically.

STOP: `AWAIT_COMMITTED_DELIVERY_TO_FOUNDATION_ADVISOR`
