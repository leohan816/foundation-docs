# FABLE5 DESIGN REVIEW — Agent Office M1.2 Spatial Advisor-Team Office

- Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE` · Actor: **Fable5 Reviewer** (`reviewer-fable5`) · Pass: `DESIGN_REVIEW__AGENT_OFFICE_M1_2_SPATIAL_ADVISOR_TEAM_OFFICE` · Level 3 · Skill: `/fable-sentinel` · Date: 2026-07-11
- Target: candidate `3ba65e00` on `shadow/agent-office-m1-2-spatial-office` (base `2f663304`, ancestry verified; candidate = origin ref) — **5 files, +2056, all documentation** (4 complete M1.2 documents + FEATURE_INDEX rows); no runtime/test/config/asset file touched.
- **VERDICT: `PASS`** — design only; no implementation, asset action, or WorkUnit is authorized. A-V1 answered below; one recommended non-blocking clarification.

## 1. A-V1 disposition (mandated challenge): **VALID — option 1** (initial single-Advisor projection, additively extensible)
Evidence, read directly: the authority/data layer is instance-keyed — every visible pod requires exactly one `responsibleAdvisorRoleInstanceId` with fail-closed `ADVISOR_RESPONSIBILITY_UNKNOWN`/`_CONFLICT` rendering and motion suppression (Master §8); pod headers reference "that exact `roleInstanceId`" (Identity §5.4); route resolution requires exactly one responsible Advisor per pod (Contract :216); and the design explicitly anticipates "a future configuration contains multiple Advisor role instances, every pod still requires one explicit responsible assignment" (Master :283-285). The frozen safe default (exactly one responsible Advisor per Team Pod) is therefore preserved verbatim at the layer where authority lives, and multiple future instances slot in additively (per-pod references already carry distinct instance IDs). The "one global Advisor character/identity" statements (Master :282, Identity :186/:211) are the single-instance RENDERING projection; the visual invariant prohibits duplicated/cloned characters for a given instance, not additional per-instance characters. No internal contradiction (option 2) and no product-authority reinterpretation (option 3) exists — authority semantics are untouched. **Recommended (non-blocking)**: at next touch, scope the three "one global character/canonical identity" sentences to the current single-instance configuration and add one sentence that a future multi-instance configuration renders one distinct Hub character per Advisor role instance (pods still referencing their exact instance). This is a wording clarification; the data model already supports it.

## 2. Coverage — the 18 mandated items
1. **AO12-U01..U14 visible and classified**: all 14 IDs present across the candidate (direct count 14/14) with per-unknown classifications in the Master register and a U -> section -> WorkUnit -> test -> gate table in the plan (:480+).
2. **Channy/production art remain Leo/GPT decisions**: explicit decision gate (Identity §7); "Channy disabled" safe default; plan blocks any WorkUnit needing the unresolved founder decision (:437,:527,:552). No asset purchase/license/import/generation is added (:12).
3. **Team Pod hierarchy scalable/evidence-grounded**: registry-driven pods with ten stable semantic zones (Master §9), each bound to verified projections and existing evidence surfaces.
4. **Single Advisor Team Principle**: preserved exactly (§8 invariant block); no duplication, collapse, or transfer of authority; proximity/route/selection/inbox "never creates Advisor authority".
5. A-V1: section 1.
6. **Reviewer independence**: spatially and logically separate (independent review desk; "never inside the Worker execution chain"; patch-return cue explicitly "not a new dispatch and does not imply approval" — Identity §5.4).
7. **Dynamic pods/assignments cannot clone actors or infer activity**: conflict overlay on ambiguous assignment; "Do not choose the visually nearest pod or the greatest timestamp"; no pod-local clones.
8. **Project identity supplemental**: color/pattern/glyph are "supplemental navigation aids" confined to bounded regions (:62,:130); severity/focus precedence retained from the M1 contract.
9. **Structured source/precedence/budgets/dedup/reload**: Contract §8 (dedup/reload/live-cursor), duration caps and cue-type budgets (:428), initial/reload/tab-resume suppression (:429) — no delayed replay.
10. **Lounge/idle non-implication**: verified `IDLE` only; "Two characters in the lounge do not imply conversation or shared context" (:281); U06 row states it never implies collaboration/availability/assignment.
11. **Rendering choice justified**: DOM/CSS/local SVG continues the evidenced M1 stack (actual `package.json` cited); Canvas/WebGL/Three.js/game-engine/physics/3D explicitly excluded as unneeded (:63,:91).
12. **Responsive/a11y equivalence**: light/dark/high-contrast/forced-colors/reduced-motion/320px/200%-text/keyboard/screen-reader/static tiers specified with wrapped-label fallbacks (:49,:384,:409); testable per plan suites.
13. **Performance budgets measurable**: "Measurable target budgets, which implementation must benchmark rather than claim" (:447); limits do not remove a11y or evidence truth (explicit).
14. **M1 compatibility additive**: existing M1 scene tests and six baselines are read-only compatibility evidence whose bytes remain unchanged (:104,:113); rollback deletes the additive `src/application/spatial-office/` consumer — no history rewrite (:169).
15. **Asset gates adequate**: inventory/`LICENSES.md`/SHA-256/replacement gates named; zero asset action authorized.
16. **14 future WorkUnits**: AO12-IWU-01..14 (direct count 14/14) with dependencies, per-WU review gates, reversibility notes, and explicit non-authorization ("founder decisions do not justify inventing product behavior").
17. **No hidden scope**: diff is five documentation files, all-additive; no runtime/authority/transport/auth/network/DB/Hermes/browser-dispatch/exposure/implementation authorization anywhere (greps + stat).
18. **Implementation-decision precision**: schemas, invariants, zone/pose/cue vocabularies, REQ/U/IWU traceability tables, and named test paths suffice without Worker product-policy invention.

## 3. Verdict rationale
All 18 items pass on direct evidence; the one mandated ambiguity (A-V1) resolves as a valid, additively extensible projection with the authority invariant intact, carrying only a wording-scope recommendation. Per V2: **PASS** — implementation remains a separate Leo/GPT-routed decision over the unauthorized IWU plan.

## 4. Self-review
All claims cite candidate text at line/section or my own git outputs (ancestry, stat, ID counts); Worker/Advisor conclusions were not trusted — A-V1 was decided from the original mission terms, the M1 authority model, and the candidate text as instructed. Read-only; no patch; only this result + pointer written. Not verified: rendering feasibility beyond the evidenced M1 stack (implementation review's job).

Return to: **Advisor**.
