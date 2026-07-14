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
- [Founder static mockup rejection and Designer routing](23_FOUNDER_STATIC_MOCKUP_REJECTION_AND_DESIGNER_ROUTING.md)
- [Founder visual-design recovery decision V2](24_FOUNDER_VISUAL_DESIGN_RECOVERY_DECISION_V2.md)
- [Advisor Phase 1 Designer brief](25_ADVISOR_PHASE1_DESIGNER_BRIEF.md)
- [Designer Phase 1 handoff](26_DESIGNER_PHASE1_HANDOFF_PROMPT.md)
- [Designer Phase 1 launcher](26_DESIGNER_PHASE1_RUN_PROMPT.md)
- [Designer Phase 1 timebox correction](26A_DESIGNER_PHASE1_TIMEBOX_ADDENDUM.md)
- [Designer Phase 1 timebox launcher](26A_DESIGNER_PHASE1_TIMEBOX_RUN_PROMPT.md)
- [Designer Phase 1 result pointer](27_DESIGNER_PHASE1_RESULT_POINTER.md)
- [Advisor Phase 1 Founder direction selection](28_ADVISOR_PHASE1_FOUNDER_DIRECTION_SELECTION.md)
- [Founder modular Team Strip layout decision](29_FOUNDER_MODULAR_TEAM_STRIP_LAYOUT_DECISION.md)
- [Advisor modular Team Strip design brief](30_ADVISOR_MODULAR_TEAM_STRIP_DESIGN_BRIEF.md)
- [Designer modular Team Strip handoff](31_DESIGNER_MODULAR_TEAM_STRIP_HANDOFF_PROMPT.md)
- [Designer modular Team Strip launcher](31_DESIGNER_MODULAR_TEAM_STRIP_RUN_PROMPT.md)
- [Designer modular Team Strip result pointer](32_DESIGNER_MODULAR_TEAM_STRIP_RESULT_POINTER.md)
- [Designer modular Team Strip result publication handoff](32A_DESIGNER_RESULT_PUBLISH_HANDOFF_PROMPT.md)
- [Designer modular Team Strip result publication launcher](32A_DESIGNER_RESULT_PUBLISH_RUN_PROMPT.md)
- [Advisor modular Team Strip preflight](33_ADVISOR_MODULAR_TEAM_STRIP_PREFLIGHT.md)
- [Founder modular system review pointer](34_FOUNDER_MODULAR_SYSTEM_REVIEW_POINTER.md)
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
`A1R-SDR-03`, but Leo subsequently rejected the visual product direction after
direct full-size inspection. That `PASS` is contract evidence only and cannot
authorize implementation. `agent-office-designer` is now the designated A-1R
product-experience Designer; Control is excluded from further A-1R visual/UX
design. The mission remains on hold and Worker implementation remains forbidden.

V2 recovery supersedes that hold only for Phase 1 visual-direction exploration.
The dedicated Designer may create exactly three compact high-fidelity product
scenes on the isolated recovery branch. Advisor must inspect each scene at full
size and return only surviving directions to Leo/GPT. Control, Worker, and
Reviewer remain undispatched.

Phase 1 is now complete at candidate `870ffe9`. The Advisor inspected all three
full-size scenes and passed A, B, and C to Founder direction selection. The
mission is waiting on Leo/GPT; no Phase 2, Worker, Control, or Reviewer task has
started.

The Founder then superseded the single generated-scene assumption. The active
design direction is a vertically extensible management-game canvas composed of
fixed reusable Team Strips and canonical modules. The Designer completed the
static construction system at candidate `99beac3`; the Advisor directly passed
the canonical source, deterministic exports, full-size visual proof, reuse,
geometry, corridor, Git, and publication checks. The package is waiting for
Leo/GPT modular-system direction review. Implementation and independent review
remain unauthorized.
