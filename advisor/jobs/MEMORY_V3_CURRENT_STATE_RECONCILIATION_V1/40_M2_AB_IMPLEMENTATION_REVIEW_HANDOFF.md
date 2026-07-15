# M2 A/B — Independent Cosmile Implementation Review Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-REVIEW-001
REVIEW_PASS: IMPLEMENTATION_REVIEW
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS

TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE: Independent Reviewer
REQUIRED_SKILL: /fable-sentinel
REVIEW_EFFORT: max
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

PRODUCT_REPOSITORY: /home/leo/Project/Cosmile
PRODUCT_BRANCH: shadow/m4-cosmile-memory
SUBJECT_BASE: 6e44aa40ffb2960573839a01424761dc5e98d610
VERDICT_TARGET_HEAD: b8f1c57502011dc7656ada91b3655432583be925
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git
EXPECTED_REMOTE_HEAD: b8f1c57502011dc7656ada91b3655432583be925

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
EVIDENCE_COMMIT: 588700691521beb32a7e0d79ff12ed9abb6c311a
REVIEWED_DESIGN_COMMIT: 9530b221d4430d29bfb545702390ebc9e6606d6a
DESIGN_DELTA_REVIEW_COMMIT: 5ebcb39b1ecfaaef8d9e5d35ef0268558944bd27

PRODUCT_WRITE: FORBIDDEN
FOUNDATION_DOCS_WRITE: EXACT RESULT AND POINTER ONLY
COMMIT_PUSH: FORBIDDEN — Advisor owns evidence publication
REAL_DB_OR_MIGRATION_EXECUTION: FORBIDDEN
SECRET_OR_ENV_CONTENT_ACCESS: FORBIDDEN
NETWORK_OR_PROVIDER_CALL: FORBIDDEN
PRODUCTION_LIVE_OR_FLAG_ACTIVATION: FORBIDDEN
NEW_AGENT_SUBAGENT_OR_DELEGATION: FORBIDDEN
```

## 1. Current authority and direct reads

Read directly before reviewing:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
3. `/home/leo/Project/Cosmile/AGENTS.md`
4. `/home/leo/Project/Cosmile/CLAUDE.md`
5. `/home/leo/Project/Cosmile/app/AGENTS.md`
6. `/home/leo/Project/Cosmile/app/CLAUDE.md`
7. Cosmile security, environment/migration, and test-meaning rules named by the Worker handoff.
8. `/home/leo/Project/skill/fable-sentinel/SKILL.md` and the routed references for contract, safety/consent, provenance, and review classification.
9. Founder decision `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/24_M2_FOUNDER_D1_D3_DECISION.md`.
10. Control contract, reviewed Designer result/pointer, initial design-review result, patched design at `9530b22`, and the same-Reviewer design delta-review PASS at `5ebcb39`.
11. Worker implementation handoff `38_M2_AB_COSMILE_IMPLEMENTATION_HANDOFF.md`.
12. Worker result, pointer, and design mirror committed at `5887006`.
13. Product design document and every product file in the immutable diff `6e44aa4..b8f1c57`.

The superseded Foundation V2 role protocol is historical review background only. Agent Office is the current role/routing authority.

## 2. Independence and immutable subject

This Reviewer session is separate from:

- `foundation-advisor` (`%27`);
- `cosmile` Worker (`%1`), which authored the product candidate;
- `foundation-designer` (`%29`), which authored the design;
- `foundation-control` (`%4`), which authored the cross-project contract.

Pin the verdict only to:

```text
VERDICT_TARGET_HEAD: b8f1c57502011dc7656ada91b3655432583be925
VERDICT_TARGET_PATHS: every path in git diff --name-only 6e44aa4..b8f1c57
REPORT_PATHS: the two exact Reviewer result paths below
```

Do not review a moving worktree in place of `git show`/the pinned commit. The six pre-existing untracked docs are excluded and must not be read as candidate evidence or modified.

## 3. Required direct review

Independently verify, without trusting the Worker report:

1. branch, origin, base/head ancestry, remote head, exact 39-file diff, and zero product writes after the candidate commit;
2. every Founder D1-A/D2-A/D3-A constraint and every reviewed A/B design requirement;
3. recommendation mint, canonical lifecycle pairs, producer-time idempotency, generic-vs-canonical separation, cart/wishlist mutation boundary, and paid-line attribution;
4. closed-choice normalization, satisfaction/adverse separation, static safety guidance, severe/unknown behavior, and zero free-text/provider path;
5. purpose-specific consent, per-evidence election, identity default-OFF, append-only correction/retraction, lineage, tombstone, retention, provenance, and outbox containment;
6. schema/migration/down parity, zero-row precondition, closed enums/CHECKs, rollback fail-closed behavior, and absence of historical-migration edits;
7. UI behavior and accessibility against the reviewed design, including 390x844 layout, keyboard semantics, focus restoration/trap, reduced motion, 200% text, correction/retraction, and truthful result states;
8. feature flags default OFF, production fail-closed, no persistent activation, no consumer/delivery/Foundation intake/candidate/memory/ranking/safety mutation;
9. test meaning and reward-hacking risk, especially the substantial `v3_11c_rec_event.vitest.ts` rewrite and the containment-scanner refinement;
10. Worker evidence accuracy, including honest separation of reproduced vs reported tests and the two non-PASS layers.

## 4. Advisor-observed attack hypotheses — verify independently

These are questions, not predetermined findings. Confirm or refute each from the pinned source and design:

1. **Identity-scoped consent reads:** do Prisma `OR` filters containing an `undefined` branch ever broaden `findConsents` or revocation lookup to unrelated actors? Does every current/effective grant resolution remain actor-scoped?
2. **Feedback transaction boundary:** are purchaseItemRef assignment, same-service grant, cross-service grant, evidence, outbox, tombstone, and retraction-time blocking atomic exactly where the design requires? Injected failure must not leave a false grant, an unblocked old outbox lineage, or an incorrect success/failure label.
3. **Consent provenance truth:** for an already-effective grant, do envelope `notice_version`, `captured_at`, and `consentRecordId` identify that actual row rather than current request time/constants? Can a stale/revoked/expired grant be selected by a `state=granted` query?
4. **Session attribution identity:** is a product+session match sufficient, or must identity also match to prevent cross-owner attribution when a session reference is present?
5. **Request contract closure:** are invalid `action` values rejected rather than silently becoming `submit`? Are replay IDs minted once and reused for a retry as designed?
6. **Retraction/correction completeness:** can users actually correct/retract through the implemented UI/API, and can a failed post-transaction block leave queued lineage eligible?
7. **Outbox DB invariants:** does the database layer enforce the reviewed matching-granted-consent/election invariant, not just application prose? Are consent/lineage references and conditional constraints sufficient under concurrency?
8. **UI contract:** does the simple client panel satisfy the reviewed modal/dialog, radio-group, focus, screen-reader, severe/unknown copy, correction/retraction, and responsive requirements, or is implementation materially incomplete?
9. **Lifecycle navigation and duplicates:** can click navigation cancel its lifecycle request, or can canonical paths also emit a generic ledger event? Does the rewritten legacy test retain all prior safety/regression meaning while adopting R2/R3/R5?
10. **Containment scanner:** can comment stripping hide executable transport/candidate code in regexes, template strings, or `://` lines? Verify negative controls are meaningful and scanner changes are not test-oracle weakening.
11. **Evidence honesty:** the Worker result says `SECRET_ENV_PII_ACCESS: ZERO`, while an attempted Next build was interrupted because `.env.local` autoload could not prove secret-access-zero. Determine the accurate label without opening `.env.local`.
12. **Hash framing:** verify the reviewed concatenated deterministic-key inputs cannot create an ambiguous boundary for the actual allowed identifier domains; if they can, require explicit framing.

## 5. Safe reproduction boundary

Reviewer may reproduce only read-only, provider-independent checks whose isolation is proven:

- the six exact Vitest suites from the Worker handoff with all feature flags unset/OFF;
- `node scripts/m2_ab_no_transport.mjs`, plus adversarial negative controls that do not edit the product tree;
- `npx tsc --noEmit`, with results classified by exact file ownership;
- `git diff --check`, source inspection, and static schema/migration comparison.

Do **not** run `npm run build`: `.env.local` autoload means secret-access-zero is unproven. Do **not** start Docker, connect to a DB, apply migration/down, install tools, open environment files, or make network/provider calls. Record these as excluded/unreproduced, never PASS.

## 6. Verdict and findings

Return exactly one verdict:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

For each finding assign a stable ID (`IR-F1`, `IR-F2`, ... for blocking; `IR-N1`, ... for non-blocking) and include:

```text
TYPE
SEVERITY
PINNED FILE:LINE / COMMIT EVIDENCE
FAILED SCENARIO
REQUIRED PATCH
ALLOWED PATCH PATHS
REQUIRED DELTA TEST
```

`NEEDS_PATCH` means the same `cosmile` Worker receives only the bounded finding IDs and the same Reviewer performs delta-only re-review. Reviewer does not patch. `PASS_WITH_RISK` requires Leo/GPT risk acceptance. `FAIL` stops.

## 7. Exact result paths

Reviewer may write only:

- `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_IMPLEMENTATION_REVIEW_RESULT.md`
- `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_IMPLEMENTATION_REVIEW_RESULT_POINTER.md`

Write the durable result and pointer, return the compact pointer to `foundation-advisor`, and STOP. Do not stage, commit, push, dispatch, patch, or start C design.

