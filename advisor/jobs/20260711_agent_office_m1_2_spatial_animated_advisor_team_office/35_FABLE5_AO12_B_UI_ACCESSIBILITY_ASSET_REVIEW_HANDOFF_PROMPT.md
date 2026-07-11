TARGET_ACTOR: Fable5 Sentinel
TARGET_SESSION: same existing reviewer-fable5 session, never Advisor or Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session or agent-office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# Agent Office M1.2 AO12-B Independent UI, Accessibility, And Asset Review

Load `/fable-sentinel` and applicable implementation, UI, accessibility,
security, provenance, and delta-review references. Work in the same existing
independent `reviewer-fable5` session. Read directly:

1. `16_LEO_GPT_CHAINED_DECISION_RECORD.md`
2. `22_DESIGN_FREEZE_AND_IMPLEMENTATION_GATE.md`
3. `23_M1_2_IMPLEMENTATION_MANIFEST.json`
4. `32_AO12_B_WORKER_BRIEF.md`
5. `34_ADVISOR_AO12_B_VALIDATION.md`
6. `35_FABLE5_AO12_B_UI_ACCESSIBILITY_ASSET_REVIEW_BRIEF.md`
7. the AO12-B Worker result and pointer
8. the exact Agent Office diff
   `ecd2652501df55aba0aa0f55c236b1933c6dc1e3..4b751c6af5b7a1091251273776af3ee8cf1af316`
9. every changed source, test, PNG, asset inventory, and canonical-document file
10. the frozen M1.2 design documents and actual M1 code/tests/baselines they
    claim to preserve
11. current Git branches, upstreams, worktrees, commits, and result artifacts

Do not trust Worker or Advisor summaries. Answer all 18 review questions from
actual code, diff, tests, images, and evidence. Open and directly inspect every
new PNG at sufficient detail. Re-run proportionate focused and full checks,
including naming, lint, typecheck, tests, build, E2E, dependency audit, axe,
baseline/hash comparison, source/asset boundary scans, allowlist, upstream
state, and listener cleanup. Inspect responsive desktop, tablet, mobile,
320-pixel, short-landscape, 200-percent text, reduced/static, high-contrast,
forced-color, keyboard, focus, and semantic equivalents. Do not accept
snapshot equality as proof without visual inspection.

Classify each finding as `CODE_DEFECT`, `DESIGN_DEFECT`,
`DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or
`NEEDS_LEO_GPT_DECISION`. Return exactly one verdict: `PASS`,
`PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

This pass is read-only for Agent Office. Do not patch implementation or design,
do not alter Agent Office, do not access secrets/DB/private data, do not start a
persistent/private/public server, do not create sessions/agents/sub-agents or
delegate another model context, do not accept risk or grant final approval, and
do not start AO12-C.

Write only:

- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/FABLE5_AO12_B_UI_ACCESSIBILITY_ASSET_REVIEW_RESULT.md`
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/36_FABLE5_AO12_B_UI_ACCESSIBILITY_ASSET_REVIEW_RESULT_POINTER.md`

Commit/push only those two Foundation Docs files. Preserve unrelated dirt.
Terminal output must be ASCII-only. Return the exact pointer to Advisor and
STOP.
