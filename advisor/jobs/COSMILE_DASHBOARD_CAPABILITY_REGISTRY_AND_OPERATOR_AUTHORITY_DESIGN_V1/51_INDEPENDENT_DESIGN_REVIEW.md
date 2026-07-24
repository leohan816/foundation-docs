# 51 — Independent Design Review (HARD_IMPORTANT_SAFETY)

MISSION: `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1` · PASS `DESIGN_REVIEW` · TIER `HARD_IMPORTANT_SAFETY`
MODEL/EFFORT/BINDING: dispatch+handoff bind Fable 5 / max; I cannot self-verify the serving model from runtime (last session directive observed = Opus 4.8) — Advisor UI binding is authority. Independent Reviewer; no Worker/Designer/Control authorship; read-only.
SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md` (verified byte-identical to loaded) + `contract-review`, `safety-review`, `provenance-review`, `review-classification`. Current Agent Office authority controls over the skill's historical V2 pointer.
HANDOFF 50 VERIFIED: docs HEAD = dispatch commit `f69890bc` (docs worktree hosts this job under a differently-named worktree — folder≠mission), blob `a1e791e9` ✓, sha256 `4e4590cb` ✓.
SUBJECT: package resolved by `40_` over `11_/21_/22_/31_`, index `41_`; product pin `3dc5129b` (verified clean; PRODUCT_CHANGED_PATHS NONE). Prior-session context given zero evidence weight; safety-critical current-behavior claims re-verified at pin, not trusted from summaries.

## Ten questions — verdicts (grounded)
1. **YES** — 22_§1 enumerates 12 direct-source `/console` page files (R01–R12), correcting the Worker's 11 (root omitted); 106 rows map route/nav/screen/card/API (12+9+21+10+18+9+5+22=106) each with file:line.
2. **YES** — 11_ uses 8 separate axes (source/build/test/runtime/integration/data/authority/surface); 21_§3.2 closed vocabulary + 40_§4 make failed/unavailable never zero, `CONFIRMED_ZERO` only after a successful read, `SYNTHETIC`/`UNVERIFIED` additive; 14_ ZERO RULE binds synthetic-nonprod.
3. **YES** — 40_§3 MAIN_NOW 26 / MAIN_LATER 27 / LAB 31 / RETIRE 22 with PB19/CL13/SB9/OG27/DP38 timing; 22_ per-row dispo+timing; M03=`LAB` correction applied (range phrase does not override table dispo).
4. **YES** — 40_§2/§9 + 21_§7 keep Console(대화/mock) / Dashboard(evidence-bounded facts) / Lab(read-only registry) separate; Lab ceiling = inspect/filter/copy/navigate only, no approve/promote/dry-run/AI/O1-command/mutate.
5. **YES (target) + honest current gap** — 40_§5/31_C1 define a provider-neutral `OperatorPrincipal` distinct from customer account/AuthIdentity/Console session/capability; the design correctly flags that the current operator is *derived from the customer session* (`o1CommerceRuntime.ts:537-547`) as a non-permanent compatibility boundary, routed to UD1/UD2, not claimed as separation.
6. **YES** — catalog = closed definitions only (40_§6: "membership does not grant authority"); grant = separate runtime fact under default-deny. Git-never-grants **verified at pin**: allowlist+secret are env (`o1Operator.ts:19`), nonce in-memory (`:80-88`), ConsoleUser/session in DB — source holds only definitions/validators (31_C7).
7. **YES** — single-use step-up consumed *before* mutation (`refund/route.ts:30`), timing-safe compare (`o1Operator.ts:12`), default-deny unconfigured (`:57`), restart-dropped fail-closed nonce (`:71`); replay/stale→deny w/ zero economic effect. Durable freshness (R4/UD5), immediate revocation (UD4), operator-subject audit attribution (C5/UD6) honestly deferred as Controlled-Live blockers.
8. **YES** — current O1 command boundary preserved & **verified at pin**: full-only refund, `inventoryRestored:false`, reservation stays committed/HOLD (`refund/route.ts:8,61`), nonce-before-provider (`:30`), "byte-semantically unchanged" (`:55-56`); count-only reconciliation, transactional fail-closed audit (`order/repository.ts`); screen access never substitutes for command authority (31_C6).
9. **YES** — 40_§3 + 21_ D04/D07: missing aggregate inventory and recent-activity reads render `UNAVAILABLE · 조회 계약 없음`, never a synthesized count/zero; no `/dashboard/inventory` or `/dashboard/customers` route until a read contract exists.
10. **YES** — `PRODUCT_IMPLEMENTATION_AUTHORITY: NONE`, `NO_SCHEMA_CHANGE`, implementation gates retained (40_§10), HARD STOP before implementation; 41_ scope exclusions; every doc documentation-only.

## Safety-review procedures
- P1 (weakening-path intersection): **no safety-weakening path found** — default-deny authority chain (principal+active grant+scope+step-up+server enforcement+audit) is consistent across 40_/31_/21_; no Console session, customer identity, or catalog membership can mint O1 authority. No STOP condition.
- P2 (same-trigger effect): refund/recovery effect identical across docs (step-up+grant, full-only, no restore, count-only, transactional audit).
- P3 (inheritance completeness): "preserve" claims are grounded in verified pinned source, not merely declared.
- P4 (lifecycle transition): principal/grant `active|suspended|revoked|expired`, revocation "effective before next command"; current coarse env+restart revocation honestly flagged (UD4).

## Blocking findings
None.

## Residual risks (require Leo/GPT acceptance before Controlled-Live implementation; correctly deferred, not design defects)
- UD1–UD7 (canonical principal + structural customer separation; A/B plane unification without Console-login sufficiency; catalog granularity/least-privilege vs fixed-`admin`; durable grant lifecycle + immediate revocation; durable step-up freshness + real production step-up; durable operator-**subject** audit attribution; per-route screen-guard hardening, R1). R2/R3/R5 legacy-visibility/dual-authority/mock-mixing carried.
- Provenance/evidence: build+test axes are `UNVERIFIED@3dc5129` (the P6 build PASS was at predecessor `71e05266`) — honestly recorded in 11_; a later implementation mission must re-establish build/test at its own pin. The 11→12 page count is resolved by 40_§1 (direct source primary) and preserved for audit (21_ R6).

## Verdict
`PASS_WITH_RISK` — the package is a coherent, safety-honest design **contract** that maps 106 current surfaces, freezes a provider-neutral authority model, and preserves every current O1 economic invariant (verified at pin) while weakening nothing; no blocking finding and no safety-weakening path exist. It is not plain PASS because, at this HARD_IMPORTANT_SAFETY tier, it explicitly carries unresolved Founder decisions (UD1–UD7) and real security gaps (durable freshness, immediate revocation, operator-subject attribution) that are Controlled-Live blockers requiring Leo/GPT risk acceptance before any implementation. Per V2, PASS_WITH_RISK does not auto-advance; the design authorizes no implementation. Reviewer performed no patch and grants no approval.
RETURN_TO: `foundation-advisor`
STOP.
