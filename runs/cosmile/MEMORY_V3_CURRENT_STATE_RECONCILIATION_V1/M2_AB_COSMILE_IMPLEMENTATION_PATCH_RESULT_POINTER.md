# M2 A/B — Cosmile Worker Bounded Patch (IR-F1/F2/F3) — POINTER

```text
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-PATCH-001   ROLE: cosmile Worker   RETURN_TO: foundation-advisor
STATUS: three blocking findings patched within the 8-path allowlist · product committed + pushed · evidence written (Advisor commits foundation-docs)
MODEL: Opus 4.8 (1M) — disclosed (Fable 5 exhausted); same Worker/session · EFFORT: max for final audit · SKILL: /fable-builder
```

## RESULT SUMMARY
Bounded, tests-first patch of the review's three blocking findings on `b8f1c57`:
IR-F1 actor-scoped consent reads (single non-null predicate — no OR/undefined `{}` global match, both routes);
IR-F2 envelope consent provenance (pre-existing grant → real grant-row captured_at/notice_version; now+constant
only for a freshly appended grant); IR-F3 feedback UI rewritten to the reviewed modal/bottom-sheet dialog with
full §6 a11y (dialog/aria-modal, focus-on-open, focus trap, Escape, origin-focus restore, fieldset/legend
radios, responsive/200%-no-clip, role=alert) + correction/retraction entry points + recommendation-dismiss
focus restoration. Flags OFF; no schema/dep/env/scope change. Non-blocking IR-N1..N5/INFO1 deferred.

## KEY EVIDENCE
```text
PRODUCT_HEAD_OLD (PATCH_BASE): b8f1c57502011dc7656ada91b3655432583be925
PRODUCT_HEAD_NEW:              68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd  (parent b8f1c57; non-force FF push verified, 0/0, no fetch)
DELTA (Reviewer scope):        b8f1c57..68cee5d  — 8 files, +415/-88
REVIEW_EVIDENCE:               ada898e0212d2f36381b7609f9c612b53d1fa952 (NEEDS_PATCH)
RED→GREEN:                     8 failing before code → affected suites 54 pass · 6-suite regression 134 pass
CHECKS:                        containment PASS · tsc 0-errors-in-allowlist · git diff --check clean · IR-F3 static a11y 23/23
EXCLUDED (honest):             BUILD NOT_RUN_SAFETY_UNPROVEN · EPHEMERAL_DB SKIP_INFRA_UNAVAILABLE
FORBIDDEN_ACCESS:              REAL_DB/SECRET_ENV_PII/PROD_LIVE/FLAG_ACTIVATION/OUTBOX_DELIVERY/FOUNDATION_INTAKE = ZERO
```

## POINTER BLOCK
```text
RESULT:  runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_PATCH_RESULT.md
POINTER: runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_PATCH_RESULT_POINTER.md
(foundation-docs paths relative to worktree FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714; Worker wrote but did NOT stage/commit/push them.)
```

## NEXT ACTION ROUTING
```text
RETURN_TO: foundation-advisor   PROPOSED_NEXT_ACTOR: foundation-advisor (delta re-review of IR-F1..F3)   STOP_AFTER_RETURN: true
Advisor: commit/push the two foundation-docs evidence files; dispatch delta-only re-review of b8f1c57..68cee5d;
adjudicate the honest BUILD/DB exclusions and the deferred non-blocking IR-N1..N5/INFO1. No Reviewer dispatched
by Worker. No next work unit auto-started. M2 C / delivery / Foundation intake remain unauthorized.
```
