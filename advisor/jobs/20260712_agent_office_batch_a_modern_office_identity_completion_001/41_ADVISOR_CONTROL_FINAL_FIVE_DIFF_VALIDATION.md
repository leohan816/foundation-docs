# Advisor Validation - Control Final-Five Diff

## Verdict

`NEEDS_EXACT_TEXTUAL_CONSISTENCY_PATCH_BEFORE_SENTINEL`

Control commit `8c5d0c25c8b91fbe2bf47ac25dde46494c4a982c` is clean,
upstream-equal, and changes only the four authorized canonical documents.
The intended final-five rules are present, but direct diff validation found five
stale sentences that still contradict those rules. Sending this candidate to
Sentinel now would waste an independent review cycle.

## Exact Residuals

1. Delta line 65 still defines `LivingOfficeProductionRenderInputV1` without
   `logicalTimeMs` and `cues`, while lines 106-112 and contract section 3.1.1
   define both fields.
2. Delta line 75 still says invalid responsible Advisor becomes `UNASSIGNED`;
   the current rule is pod omission with a diagnostic and M1 fallback when no
   valid pod remains.
3. Delta line 76 still keys project identity by registry `project`; the current
   sole key is `CommittedPodConfig.projectKey`.
4. Delta line 110 still says invalid responsible Advisor becomes `UNASSIGNED`;
   it must cite the pod-omission rule.
5. Contract interface comments at lines 178 and 184 still say registry project
   and `null/empty/multiple -> UNASSIGNED`; these comments must match the sole
   `projectKey` rule and pod omission. The nullable config input may remain if
   null is an invalid value that causes omission, but it must never normalize to
   an authority-looking role-instance sentinel.

## Preserved Evidence

- PRC-1, PRC-5, PRC-6, PRC-7, and PRC-8 substantive corrections are present.
- PRC-2, PRC-3, and PRC-4 remain closed.
- Source, tests, package/config, prototype entry, and fixtures are untouched.
- Worker remains stopped cleanly; no Batch B-E work is authorized.

## Routing

- next actor: same `foundation-control` session;
- patch scope: exact stale phrases only in the same four authorized docs;
- after patch: Advisor diff validation, then same SOL Sentinel narrow re-review;
- Leo/GPT action: none.

