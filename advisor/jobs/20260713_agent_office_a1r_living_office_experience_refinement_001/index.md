# Agent Office A-1R Advisor Job

- [Founder mission](00_FOUNDER_MISSION.md)
- [Intake](00_INTAKE.md)
- [Advisor brief and unknown gate](01_ADVISOR_BRIEF.md)
- [Control static design brief](02_CONTROL_STATIC_DESIGN_BRIEF.md)
- [Sentinel design-contract review brief](03_SENTINEL_DESIGN_CONTRACT_REVIEW_BRIEF.md)
- [Advisor validation of Control candidate](04_ADVISOR_CONTROL_DESIGN_VALIDATION.md)
- [Advisor candidate acceptance for review](05_ADVISOR_DESIGN_CANDIDATE_ACCEPTANCE.md)
- [Advisor final static-design candidate acceptance](05B_ADVISOR_FINAL_STATIC_DESIGN_ACCEPTANCE.md)
- [Reviewer routing decision](05A_REVIEWER_ROUTING_DECISION.md)
- [Control handoff](06_CONTROL_STATIC_DESIGN_HANDOFF_PROMPT.md)
- [Control launcher](06_CONTROL_STATIC_DESIGN_RUN_PROMPT.md)
- [Sentinel handoff](07_SENTINEL_DESIGN_CONTRACT_REVIEW_HANDOFF_PROMPT.md)
- [Sentinel launcher](07_SENTINEL_DESIGN_CONTRACT_REVIEW_RUN_PROMPT.md)
- [Sentinel finding-specific delta re-review handoff](07B_SENTINEL_DESIGN_DELTA_REREVIEW_HANDOFF_PROMPT.md)
- [Sentinel finding-specific delta re-review launcher](07B_SENTINEL_DESIGN_DELTA_REREVIEW_RUN_PROMPT.md)
- [Advisor classification of delta geometry finding](17A_ADVISOR_DELTA_FINDING_CLASSIFICATION.md)
- [Control information-geometry patch handoff](09D_CONTROL_INFORMATION_GEOMETRY_PATCH_HANDOFF_PROMPT.md)
- [Control information-geometry patch launcher](09D_CONTROL_INFORMATION_GEOMETRY_PATCH_RUN_PROMPT.md)
- [Advisor validation of geometry patch](18A_ADVISOR_GEOMETRY_PATCH_VALIDATION.md)
- [Control PNG export correction handoff](09E_CONTROL_PNG_EXPORT_CORRECTION_HANDOFF_PROMPT.md)
- [Control PNG export correction launcher](09E_CONTROL_PNG_EXPORT_CORRECTION_RUN_PROMPT.md)
- [Advisor final visual-patch acceptance](18B_ADVISOR_FINAL_VISUAL_PATCH_ACCEPTANCE.md)
- [Sentinel SDR-03 re-check handoff](07C_SENTINEL_SDR03_RECHECK_HANDOFF_PROMPT.md)
- [Sentinel SDR-03 re-check launcher](07C_SENTINEL_SDR03_RECHECK_RUN_PROMPT.md)
- [Founder static mockup approval package](21_FOUNDER_STATIC_MOCKUP_APPROVAL_PACKAGE.md)
- [Advisor static design return pointer](22_ADVISOR_STATIC_DESIGN_RETURN_POINTER.md)
- [Control narrow patch handoff](09_CONTROL_DESIGN_PATCH_HANDOFF_PROMPT.md)
- [Control narrow patch launcher](09_CONTROL_DESIGN_PATCH_RUN_PROMPT.md)
- [Advisor classification of Sentinel findings](13_ADVISOR_SENTINEL_FINDING_CLASSIFICATION.md)
- [Control Sentinel-finding patch handoff](09B_CONTROL_SENTINEL_PATCH_HANDOFF_PROMPT.md)
- [Control Sentinel-finding patch launcher](09B_CONTROL_SENTINEL_PATCH_RUN_PROMPT.md)
- [Advisor post-patch metadata validation](13A_ADVISOR_POST_PATCH_METADATA_VALIDATION.md)
- [Control metadata correction handoff](09C_CONTROL_METADATA_CORRECTION_HANDOFF_PROMPT.md)
- [Control metadata correction launcher](09C_CONTROL_METADATA_CORRECTION_RUN_PROMPT.md)
- [Control patch result pointer](14_CONTROL_STATIC_DESIGN_PATCH_RESULT_POINTER.md)
- [Sentinel design review result pointer](12_SENTINEL_DESIGN_CONTRACT_REVIEW_RESULT_POINTER.md)
- [Loop state](10_LOOP_STATE.md)

Current state: Control published initial design `d33dfc9` and narrow correction
`b966c6a`. The independent product-first Sentinel review returned `NEEDS_PATCH`
with six bounded design/static-evidence findings. Advisor classified all six as
patchable without a new product or authority decision. Control published exact
finding patch `8522f3c` and text-only metadata correction `1ab8ad2`. Advisor
verified the exact scope, contracts, all four changed PNGs at original size,
Git/upstream state, and the four metadata closures. The same-Sentinel delta
review closed five findings but directly reproduced one information-state
layout regression under `A1R-SDR-03`. Advisor classified it as a two-file
static correction for the same Control. Control fixed its three geometry
measures in `ad147ec`; Advisor accepted the reflow but caught a 1x PNG export
where the contract requires 2x, so a PNG-only export correction precedes the
same Reviewer focused re-check. The final candidate is `11cdf80`, with a
byte-identical final SVG and corrected `2400×1840` PNG. Worker implementation
remains forbidden. The same Reviewer returned final `PASS` and closed
`A1R-SDR-03`; the reviewed package now waits for Leo/GPT static mockup approval.
