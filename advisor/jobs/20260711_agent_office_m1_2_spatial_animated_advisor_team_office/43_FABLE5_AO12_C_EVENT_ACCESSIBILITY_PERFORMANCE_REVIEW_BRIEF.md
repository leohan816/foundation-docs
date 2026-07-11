# Fable5 AO12-C Event, Accessibility, And Performance Review Brief

## REVIEWER ROUTING DECISION

- Target actor: Sentinel.
- Selected reviewer: fable5 Sentinel.
- Target session: existing `reviewer-fable5` session only.
- Required skill: `/fable-sentinel`.
- Reason: AO12-C changes evidence-backed operational presentation, event
  provenance gates, accessibility semantics, route animation, and measured
  browser performance. This is a Level-3 independent implementation review.
- Not selected: Advisor cannot self-review; Worker cannot review its own work;
  no new session, agent, sub-agent, or temporary context is permitted.
- Review level: Level 3.
- Return result to: Advisor.
- Status: `READY_TO_USE` after exact committed launcher publication and live
  pane preflight.

## Exact Review Target

- Agent Office repository: `../agent-office`.
- Branch: `shadow/agent-office-m1-2-spatial-office`.
- Base: `4b751c6af5b7a1091251273776af3ee8cf1af316`.
- Target: `f9d0533437c0cf9efa7be76650ad79f0cb0d9353`.
- Worker result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_C_RESULT.md`.
- Advisor validation: `42_ADVISOR_AO12_C_VALIDATION.md`.

Do not trust Worker or Advisor conclusions. Read the actual diff, current files,
tests, screenshots, commits, and upstream state.

## Required Coverage

1. Verify all changed paths are within AO12-C and no AO12-D production
   integration is hidden.
2. Verify cue creation requires accepted structured evidence and exact source
   correspondence; terminal prose, timestamps alone, proximity, stale data,
   snapshots, and unverified fixtures cannot create task motion.
3. Verify deterministic cue IDs, deduplication, precedence, bounded queues,
   overflow behavior, full-snapshot reset, reload/tab/selection cancellation,
   and no delayed replay.
4. Verify assignment and Single Advisor Team failures suppress task motion and
   never clone an Advisor actor.
5. Verify positive visual motion never creates authority, assignment,
   communication, review, completion, or pass claims.
6. Verify operational state overrides ambient/verified-IDLE behavior.
7. Verify Channy remains a non-operational structured-state reflector and
   ambient companion only.
8. Verify routes are bounded, single-selected-Pod, cleaned up, and have a
   semantically equivalent STATIC representation.
9. Verify all seven AO12-C committed PNGs by direct visual inspection. Record a
   finding for each image, including overlap, clipping, page overflow, focus,
   forced colors, and 200 percent text.
10. Verify keyboard, screen-reader, live-region, 44-pixel target,
    reduced-motion, forced-colors, mobile/tablet/desktop, and no-external-request
    evidence.
11. Independently rerun the focused AO12-C tests and enough full regression,
    build, and composition tests to validate the Worker claims. Record exact
    commands and counts.
12. Inspect the performance fixture and methodology, including whether the
    declared 12 Pods, 64 assignments, 200 WorkUnits, browser pod-switch,
    active-frame, long-task, retained-heap, DOM/SVG, source-size, and teardown
    gates measure what the design claims. Reproduce measurements where safe.
13. Verify production `dist/dashboard` excludes AO12-C fixture/cue schema and
    default M1 plus explicit AO12-B static behavior remain unchanged.
14. Verify SIASIU current naming and no external asset/dependency addition.
15. Verify exact branch, commits, pushes, clean worktree, and Foundation Docs
    result/pointer scope.
16. Verify no DB, secret, auth, transport, remote/public/prod/live, browser
    dispatch, or persistent server change.

Pay particular attention to malformed activity expiry values, strict
full-snapshot behavior, cue timer lifecycle, route endpoint correspondence,
and whether the synthetic performance fixture provides meaningful coverage.

## Verdict Contract

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS_WITH_RISK` returns to Leo/GPT and never auto-advances. `NEEDS_PATCH`
returns to Advisor for a bounded Worker patch and same-Reviewer delta review.
Fable5 must not patch Agent Office, grant final approval, or authorize AO12-D.

## Required Result Artifacts

- Result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/FABLE5_AO12_C_EVENT_ACCESSIBILITY_PERFORMANCE_REVIEW_RESULT.md`
- Pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/44_FABLE5_AO12_C_EVENT_ACCESSIBILITY_PERFORMANCE_REVIEW_RESULT_POINTER.md`

Only those Foundation Docs result/pointer files may be committed and pushed.
Agent Office is read-only during review.
