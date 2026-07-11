# Fable5 AO12-B UI, Accessibility, And Asset Review Brief

Status: `READY_FOR_EXISTING_REVIEWER_FABLE5`

## REVIEWER ROUTING DECISION

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Target session: `reviewer-fable5`
- Required skill: `/fable-sentinel`
- Model/effort: Fable5 Max, Level 3
- Reason: AO12-B adds a security-bounded visual projection, original local
  assets, accessibility behavior, identity semantics, canonical as-built
  claims, and browser baselines. Independent direct visual and code-to-design
  review is required before any motion batch.
- Not selected: Control Reviewer and Opus 4.8 are insufficient for the combined
  provenance/accessibility/authority boundary; Codex SOL fallback is
  unnecessary while the existing independent Fable5 session is available;
  dual review is not required for this synthetic test-demo-only batch.
- Review level: Level 3
- Return result to: Advisor
- Status: READY_TO_USE

## Exact Subject

- base: `ecd2652501df55aba0aa0f55c236b1933c6dc1e3`
- implementation: `4b751c6af5b7a1091251273776af3ee8cf1af316`
- Worker result: `WORKER_AO12_B_RESULT.md`
- Advisor validation: `34_ADVISOR_AO12_B_VALIDATION.md`

## Required Review Questions

1. Does the 28-path delta exactly match the authorized AO12-B scope?
2. Is project identity deterministic, collision-visible, non-color-only, and
   subordinate to severity, freshness, authority, focus, and accessibility?
3. Are fixed project colors and current `SIASIU` naming exact, with no forbidden
   current alias or identity reinterpretation?
4. Are all placeholder assets original, repository-local, hash/inventory/
   license-backed, script-free, external-reference-free, and explicitly not
   production art?
5. Is Channy static and non-operational, without actor, authority, inspection,
   routing, status-inference, or alert-replacement behavior?
6. On wide desktop, do all registered Advisor Team Pods remain recognizable on
   one shared office floor while only the selected Pod expands detail?
7. Do non-selected Pods preserve Team, Advisor, mission, actor, state,
   gate/blocker, progress, and evidence meaning rather than become ordinary
   dashboard cards?
8. Does the selected mission board show only accepted structured facts and
   explicit unknown/stale/conflict states without terminal-prose inference or
   private locator/credential leakage?
9. Is each role instance rendered once, with one global Advisor character per
   verified Advisor instance and Pod references rather than clones?
10. Are Reviewer independence, Advisor authority, and visual-proximity
    non-authority represented correctly?
11. Do responsive desktop/tablet/mobile/320/short-landscape/200-percent layouts
    avoid incoherent overlap, clipping, unreadable controls, and horizontal
    loss while preserving identical operational meaning?
12. Do keyboard, focus, skip-link, dialog, screen-reader semantic list, 44px,
    axe A/AA, reduced-motion, static, high-contrast, and forced-color behaviors
    satisfy the frozen design and tests?
13. Do all six committed baseline images support the claims when opened
    directly, without snapshot laundering or hidden layout defects?
14. Does the exact test-demo gate leave the default M1 and production dashboard
    unchanged and exclude AO12-B from operational runtime selection?
15. Are package/lockfile, existing M1 baselines, authority, auth, delivery,
    transport, persistence, DB, network, and external asset boundaries
    unchanged?
16. Are tests load-bearing rather than tautological, and do focused/full tests,
    build, E2E, audit, hashes, allowlist, Git, and listener cleanup reproduce?
17. Are the five canonical-document updates factual, with AO12-C/D and
    production selection still explicitly unauthorized?
18. Is AO12-B precise and safe enough for Advisor to accept it and prepare the
    already-frozen AO12-C batch without a new Founder decision?

## Verdict Contract

Return exactly one: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

- `PASS_WITH_RISK` returns to Leo/GPT and does not advance.
- `NEEDS_PATCH` returns to Advisor for the same-Worker/same-Reviewer bounded
  patch loop.
- `FAIL` stops.
- A clean `PASS` closes only AO12-B review. It does not grant final approval or
  authorize scope outside the already frozen serial manifest.
