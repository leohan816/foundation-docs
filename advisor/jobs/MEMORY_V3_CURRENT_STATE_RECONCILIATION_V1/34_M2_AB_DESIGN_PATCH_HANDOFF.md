# M2 A/B — Designer Bounded Patch Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-DESIGN-PATCH-001
TARGET_ACTOR: foundation-designer
TARGET_SESSION: foundation-designer
TARGET_WINDOW_ID: @29
TARGET_PANE_ID: %29
ROLE: Designer
MODE: BOUNDED_DESIGN_PATCH
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_PROJECT: Cosmile
TARGET_WORKSPACE: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_BASELINE_HEAD: 6e44aa40ffb2960573839a01424761dc5e98d610
PREVIOUS_SUBJECT_HEAD: 35cc5591456566ccdb02324974956b0c5ec7ce3a
REVIEW_RESULT_COMMIT: 481a718e30bd060de365076225c3ca972180da9c
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714

ACTUAL_MODEL_REQUIRED: gpt-5.6-sol
EFFORT_REQUIRED: max
REQUIRED_SKILL: /fable-builder

ALLOWED_WRITE:
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT_POINTER.md

FORBIDDEN_WRITE:
- /home/leo/Project/Cosmile/**
- /home/leo/Project/FOUNDATION/**
- /home/leo/Project/SIASIU/**
- /home/leo/Project/foundation-control/**
- Reviewer result or pointer
- every foundation-docs path not listed in ALLOWED_WRITE

COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
TEST_EXECUTION: NO
DB_ACCESS: NO
SECRET_OR_ENV_ACCESS: NO
NETWORK_OR_PROVIDER_ACCESS: NO
BRANCH_CREATE_SWITCH_MERGE: NO
ACTOR_OR_SUBAGENT_CREATION: NO
```

## Required reads

Read directly and do not patch from memory:

1. Current Agent Office operating model and `roles/designer.md`
2. Current Cosmile `AGENTS.md`, `CLAUDE.md`, `app/AGENTS.md`, and `app/CLAUDE.md`
3. Founder decision `24_M2_FOUNDER_D1_D3_DECISION.md`
4. The immutable prior design at subject commit
   `35cc5591456566ccdb02324974956b0c5ec7ce3a`
5. Reviewer result and pointer at commit
    `481a718e30bd060de365076225c3ca972180da9c`
6. Exact source anchors cited by findings REV-F1..REV-F3 and REV-N1..REV-N5;
   read-only
7. `/home/leo/Project/skill/fable-builder/SKILL.md` and routed references needed
   for bounded design correction

The Reviewer verdict is `NEEDS_PATCH`. Keep every unaffected design clause
unchanged. Do not redesign, broaden the Worker allowlist, or implement.

## Required bounded changes

Apply only stable findings `REV-F1`, `REV-F2`, `REV-F3`, and `REV-N1..REV-N5`.

### REV-F1 — adverse safe enqueue and retention

- Valid identified + cross-service-consented `skin_reaction`/`other` evidence
  with selected low/moderate/severe severity and certainty `reported` is eligible
  for the same contained producer-only outbox as other valid B evidence.
- `severe` additionally retains the local raise-only
  `human_safety_review_required` state; it does not block enqueue because no
  consumer or delivery exists.
- Unknown severity remains fail-closed to human review with no outbox.
- Outbox rows with `evidenceRetentionClass=adverse_regulatory_hold` have
  `queueExpiresAt=null` and `retentionState=duration_unconfigured`; the 30-day
  queue expiry applies only to non-adverse evidence.
- Invent no duration, purge, release workflow, delivery, or production policy.
- Replace the stale local-hold/cross-service-blocked copy and reason-code path
  with honest queued-not-sent behavior. Update all affected tables, flows,
  assertions, traceability, residual risks, and pointer summary consistently.

### REV-F2 — eliminate client/server ledger double counting

Add an exact emission contract:

- canonical recommendation cards: server-mapped CommerceEvent rows only;
  remove client-direct `/api/events` emissions for `product_card_view` and
  `product_card_click` in the planned Worker change to the already allowlisted
  `ConsultFoundationResult.tsx`;
- generic/non-canonical cards: preserve existing client emission behavior except
  `recommendation_view` must not emit when `showRecommendation=false` because no
  recommendation was presented;
- add direct tests proving canonical cards post no direct view/click ledger event,
  generic behavior remains stable, and producer-time mapping yields one ledger
  row per canonical stage.

Do not change `/api/events` or broaden the allowlist unless direct evidence proves
the existing allowlist cannot implement this exact correction; if so, return
HOLD rather than expanding scope.

### REV-F3 — consent checkbox and revocation semantics

- The cross-service checkbox is a per-evidence election and starts unchecked.
- Checked means: append a grant if the durable purpose state is not currently
  granted, then this evidence may be outbox-eligible if every other gate passes.
- Unchecked means: this evidence remains local-only even if a prior durable grant
  exists; it does not append a revocation and must not claim cross-service use.
- Pin `consent.state` and the visible confirmation copy to the actual election.
- For this bounded A/B pilot, durable purpose revocation is exercised through the
  already-allowlisted authenticated consents API plus contract/API tests only;
  no new account UI is added. Record that a user-facing account revocation
  surface remains deferred and no production/live activation is permitted until
  that surface receives separate approval and design.
- Retraction of evidence remains distinct from consent revocation.

### REV-N1..REV-N5 — exact pins

- `REV-N1`: use `recommendationSessionId` consistently in schema/prose.
- `REV-N2`: canonical paired CommerceEvent + RecommendationEvent stage evidence
  is written in one DB transaction; the already-successful cart/wishlist product
  mutation is outside that evidence transaction and is never rolled back by a
  ledger/evidence failure. Define the fail-closed evidence status and tests.
- `REV-N3`: scope `clientRequestId` uniqueness by `orderItemId` and define the
  same-owner replay versus cross-owner generic-not-found behavior.
- `REV-N4`: explicitly keep refunded paid lines feedback-eligible so adverse
  reporting remains possible.
- `REV-N5`: flags-OFF/generic rendering retains the current read-only card with
  no new cart/wishlist/dismiss CTAs; all new consult CTAs exist only for canonical
  cards under the A flag.

`REV-N6` is an Advisor Control-record note only. Do not edit Control or Reviewer
artifacts and do not add it as a product change.

## Integrity and completion

- Preserve the R-Q1 ruling and all binding zero-row/disposable-DB/rollback
  preconditions verbatim.
- Re-read the full patched result and pointer for internal contradictions,
  especially every occurrence of `LOCAL_HOLD_ONLY`,
  `retention_hold_unconfigured`, `queueExpiresAt`, adverse enqueue, consent,
  client emissions, and load-bearing stops.
- Record a compact delta map from each REV ID to exact changed design sections.
- Product repository writes, tests, DB/env/secret/network, commit/push, and actor
  dispatch remain zero.
- Return `DESIGN_PATCH_READY_FOR_DELTA_REVIEW` only when every finding is resolved
  without new policy or scope; otherwise return the exact unresolved finding.

Return only the pointer to `foundation-advisor` and STOP. The same
`foundation-reviewer-fable5` must perform the delta-only re-review.
