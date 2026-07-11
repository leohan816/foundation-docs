# Advisor AO12-C Direct Validation

Status: `PASS_TO_FABLE5_LEVEL3_REVIEW`

## Scope

Advisor independently validated AO12-C (`AO12-IWU-09..11`) against the frozen
M1.2 design, the chained Leo/GPT authorization, the AO12-C Worker brief, the
actual Agent Office delta, and the Worker result artifacts. This validation is
not an independent Reviewer verdict and does not authorize AO12-D.

## Git And Artifact Evidence

- Agent Office branch: `shadow/agent-office-m1-2-spatial-office`.
- Exact base: `4b751c6af5b7a1091251273776af3ee8cf1af316`.
- Exact target: `f9d0533437c0cf9efa7be76650ad79f0cb0d9353`.
- Target equals `origin/shadow/agent-office-m1-2-spatial-office` and the
  worktree is clean after removal of Advisor-created test output.
- Exact delta: 30 allowlisted paths, `+4035/-106`.
- Worker result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_C_RESULT.md`.
- Worker result commit: `eed8ad72681bad6e12870b8e97b15374e4968582`.
- Result pointer:
  `41_WORKER_AO12_C_RESULT_POINTER.md` at Foundation Docs commit
  `108b579491b252f3997cce262c1d06f731748bdd`.
- Unrelated pre-existing Foundation Docs modifications and untracked job
  folders were not staged or modified by this validation.

## Source Validation

Advisor directly read the cue projector, cue reducer, route presentation,
actor-zone presentation, verified-idle lounge, Channy presentation, spatial
office composition, demo entry, changed tests, and changed canonical M1.2
documents.

The implementation establishes:

1. an explicit `agent-office.spatial-cue.v1` envelope and deterministic cue ID;
2. accepted structured source, manifest, assignment, Advisor responsibility,
   evidence, selected-Pod, revision, freshness, connection, critical-alert,
   activity/source-correspondence, and expiry gates;
3. snapshot/reload/tab-resume/selection suppression with no delayed replay;
4. bounded precedence, deduplication, overflow, and fail-closed reset behavior;
5. bounded route and pose presentation with cleanup and one selected-Pod
   choreography boundary;
6. verified-IDLE and Channy behavior that remains presentation-only and cannot
   create evidence, authority, assignment, communication, or commands;
7. FULL, RESTRAINED, and STATIC semantic equivalents;
8. unchanged default M1 and explicit AO12-B static demo selection;
9. no production mount of the AO12-C cue implementation.

## Direct Visual Inspection

Advisor directly opened all seven committed AO12-C PNG baselines:

- full desktop;
- restrained desktop;
- reduced-motion static desktop;
- tablet;
- mobile static;
- forced colors;
- 200 percent text at mobile width.

Observed result: the selected and non-selected Team areas remain recognizable,
operational facts remain visible without motion, forced-colors focus and state
shapes remain distinguishable, and 200 percent text does not overlap or escape
its containers. Mobile Team navigation uses an intentional internal horizontal
viewport while the page itself remains free of horizontal overflow.

## Advisor-Rerun Verification

All commands were executed from the exact target commit:

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm test -- --run`: PASS.
- `npm run build`: PASS.
- focused AO12-C Playwright: 15/15 PASS.
- full configured test/demo Playwright: 43/43 PASS.
- composed authenticated Playwright: 3/3 PASS.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- current-source forbidden legacy-name gate: 0 hits outside excluded historical docs.
- production bundle AO12-C cue/schema/fixture marker scan: 0 hits.
- `git diff --check`: PASS.

The configured-browser performance test passed the declared active-frame,
long-task, pod-switch, retained-heap, DOM, SVG, and teardown budgets. The
Worker's exact performance values remain claims for Fable5 to reproduce or
independently inspect; Advisor does not elevate them beyond the passing command
and captured Worker artifact.

## Boundaries Preserved

- No browser-to-Worker or browser-to-Reviewer dispatch.
- No M1 authority, exact delivery, authentication, transport, or security
  boundary change.
- No DB, secret, remote/public/prod/live access.
- No external assets or dependency additions.
- No persistent server left running.
- AO12-D remains dependency-gated and not authorized by this validation.

## Advisor Verdict

`PASS_TO_FABLE5_LEVEL3_EVENT_ACCESSIBILITY_PERFORMANCE_REVIEW`

No Advisor-found defect currently requires Worker rework. Fable5 must distrust
this conclusion and directly inspect the exact implementation, tests, visual
artifacts, performance methodology, Git evidence, and design conformance.
