TARGET_ACTOR: Fable5 Sentinel-ReReview
TARGET_SESSION: same existing reviewer-fable5 session that wrote the AO12-B PASS
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session or agent-office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# AO12-B Review Visual-Coverage Correction

Load `/fable-sentinel` and the applicable visual/delta-review reference. Read
directly:

1. `35_FABLE5_AO12_B_UI_ACCESSIBILITY_ASSET_REVIEW_HANDOFF_PROMPT.md`
2. `37_ADVISOR_FABLE5_AO12_B_RESULT_VALIDATION.md`
3. your committed AO12-B result and pointer at commit `3e29df7`
4. the actual five remaining PNGs under
   `../agent-office/tests/e2e/baselines/spatial-office-static.spec.ts/`

Your result says only desktop was directly inspected. The handoff required all
six images to be opened and directly inspected. Correct that coverage defect in
this same Reviewer session.

Directly open at sufficient detail and inspect tablet, mobile, reduced-motion,
forced-colors, and 200-percent-text PNGs. For each, record:

- legibility and text fit;
- spatial/operational meaning preservation;
- clipping, horizontal loss, or incoherent overlap;
- responsive or mode-specific behavior visibly supported; and
- whether the image is acceptable under the frozen design.

Do not substitute checksum, Playwright, or Worker/Advisor summaries for visual
inspection. You may compare images mechanically in addition to direct viewing.
Reconcile all six visual findings with review question 13 and the final verdict.

If all coverage passes, update the existing result and pointer in place with an
explicit `VISUAL_COVERAGE_CORRECTION` log and a corrected verdict basis. If a
visual defect exists, report and classify it. Commit/push only the corrected
result and pointer.

Agent Office is read-only. Do not patch code/design, create sessions/agents/
sub-agents, delegate another context, access secrets/DB/private data, keep a
server running, accept risk, grant final approval, or start AO12-C. Terminal
output must be ASCII-only. Return the exact pointer to Advisor and STOP.
