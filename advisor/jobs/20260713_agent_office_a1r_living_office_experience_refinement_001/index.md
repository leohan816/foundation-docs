# Agent Office A-1R Advisor Job

- [Founder mission](00_FOUNDER_MISSION.md)
- [Intake](00_INTAKE.md)
- [Advisor brief and unknown gate](01_ADVISOR_BRIEF.md)
- [Control static design brief](02_CONTROL_STATIC_DESIGN_BRIEF.md)
- [Sentinel design-contract review brief](03_SENTINEL_DESIGN_CONTRACT_REVIEW_BRIEF.md)
- [Advisor validation of Control candidate](04_ADVISOR_CONTROL_DESIGN_VALIDATION.md)
- [Advisor candidate acceptance for review](05_ADVISOR_DESIGN_CANDIDATE_ACCEPTANCE.md)
- [Reviewer routing decision](05A_REVIEWER_ROUTING_DECISION.md)
- [Control handoff](06_CONTROL_STATIC_DESIGN_HANDOFF_PROMPT.md)
- [Control launcher](06_CONTROL_STATIC_DESIGN_RUN_PROMPT.md)
- [Sentinel handoff](07_SENTINEL_DESIGN_CONTRACT_REVIEW_HANDOFF_PROMPT.md)
- [Sentinel launcher](07_SENTINEL_DESIGN_CONTRACT_REVIEW_RUN_PROMPT.md)
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
finding patch `8522f3c`; Advisor verified its scope, contracts, and four changed
PNGs, then found four text-only metadata inconsistencies to correct before the
same-Sentinel delta re-review. Worker implementation remains forbidden until the
same Reviewer returns a clean design delta `PASS` and Leo approves the static
mockups.
