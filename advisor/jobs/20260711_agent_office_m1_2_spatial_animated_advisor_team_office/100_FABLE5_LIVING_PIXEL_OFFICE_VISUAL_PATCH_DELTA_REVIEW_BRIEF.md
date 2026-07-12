# Fable5 Living Pixel-Office Visual Patch Delta Review Brief

## Reviewer routing decision

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Target session: existing `reviewer-fable5/%5`
- Model and effort: `<Fable5: MAX>`
- Required skill: `/fable-sentinel`
- Review level: Level 3 narrow visual/accessibility/security delta
- Reason: the patch changes identity presentation, accessibility surfaces,
  visual baselines, animation evidence, and security-relevant fail-closed fact
  handling; it requires the same independent Reviewer that reviewed the base.
- Not selected: Control and Worker cannot independently review their own train;
  a new session or substitute Reviewer is forbidden.
- Return result to: Advisor
- Status: `READY_TO_USE`

## Exact review target

- Base: `c535877b61ad8a1e3d74dca5c6fec0ada4cac3f8`
- Candidate: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Intermediate visual commit: `364f40722c6db5c515261b69fc8ebb538c5c33f6`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Pass: `DESIGN_REVIEW__M1_2_VISUAL_PATCH_DELTA_AND_ACCESSIBILITY`

Review the full two-commit final delta. Artifact 99 points to the intermediate
commit and must not be used as final candidate identity.

## Required direct checks

1. Every visible actor has a compact always-visible label with role, model,
   session, and operational state using text, role glyph, and state ring.
2. Exact session names match the committed registry-backed values; guessed
   aliases such as `foundation-worker`, `cosmile-worker`, or `siasiu-worker`
   do not appear in the living prototype fact source or its current tests.
3. Only Agent Office Worker and Fable5 Reviewer have proven model values;
   every other model is literal `UNKNOWN`.
4. Null, absent, blank, and unverified values fail closed to `UNKNOWN`, and the
   renderer does not infer facts from project, pod, position, proximity,
   terminal prose, or adjacent fields.
5. The keyboard/click detail drawer contains the exact ten required fields,
   has bounded focus, Escape close, and invoker focus restoration; semantic and
   static presentations preserve equivalent meaning.
6. Labels track pan, zoom, and focus, remain readable on desktop/mobile/static,
   avoid incoherent overlap, and do not obscure the office beyond an acceptable
   compact operational overlay.
7. Channy motion is substantially slower, eased, and includes long pauses and
   visible walk, stop, sniff, sit, eat, drink, sleep, and play states without
   constant roaming or operational authority.
8. Channy is recognizably an original pixel-art Bedlington Terrier: rounded
   wool head, narrow muzzle, arched back, slim legs, light coat, dark ears.
9. The modern office palette is materially lighter, project colors remain
   accents, contrast passes, and the office world remains primary over HUD.
10. Exact 13 living baselines changed and exact 26 historical baselines stayed
    byte-identical; baseline updates did not conceal a defect.
11. Updated WebM, MP4, GIF, and five PNGs are actual current-source evidence;
    inspect representative continuous-motion frames and current hashes.
12. Structured-evidence-only behavior, Single Advisor Team, no cloning,
    security/authority boundaries, accessibility, static fallback, M1 fallback,
    prototype isolation, and production exclusion remain intact.
13. No full integration, Founder acceptance, production authority, remote
    exposure, DB, Hermes, asset purchase, or next mission is hidden in the
    candidate.

## Evidence to reproduce

- inspect actual `c535877..ac8ba75` diff and both commits;
- inspect final source, tests, docs, baseline paths, and Git state directly;
- run focused tests, strict checks, browser gates, and verifier as needed;
- inspect all 13 current living baselines and representative media frames;
- verify current media file count, mode, hashes, durations, and ignored state;
- verify final branch/upstream equality and no listeners.

## Verdict contract

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS_WITH_RISK` returns to Leo/GPT and never auto-advances. `NEEDS_PATCH`
returns to Advisor for the same Worker and same-Reviewer loop. A clean `PASS`
closes only `AO12-PWU-11-R1` and routes the reviewed candidate to Leo/GPT for
`AO12-PWU-11-D2`; it does not authorize full integration.

## Output contract

Write only:

- `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/FABLE5_LIVING_PIXEL_OFFICE_VISUAL_PATCH_DELTA_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/101_FABLE5_LIVING_PIXEL_OFFICE_VISUAL_PATCH_DELTA_REVIEW_RESULT_POINTER.md`

Commit and non-force push only those two files. Do not patch Agent Office or
Advisor artifacts. Use no agent, sub-agent, delegated context, new session, or
substitute Reviewer.

