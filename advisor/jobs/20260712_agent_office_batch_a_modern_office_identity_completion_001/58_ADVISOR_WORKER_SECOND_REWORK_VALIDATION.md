# Advisor Worker Second-Rework Validation

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Validated candidate: `1187b9ae37077f22e697680bf531f9e475f005bf`
- Base: `74d586660c8fc55c04bcaca6f7442cd14218eb33`
- Worker result: `../../../runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_SECOND_REWORK_RESULT.md`
- Validated at: `2026-07-13T07:48:38Z`
- Verdict: `REJECT_FOR_REVIEW__ROUTINE_FOCUSED_THIRD_REWORK_REQUIRED`

## Direct Evidence

- Candidate branch is clean and local HEAD equals its upstream at `1187b9a`.
- Focused contract/UI validation passed: 5 files, 71 tests.
- Dedicated authenticated Living Office browser gate passed: 3/3.
- Fresh unmasked captures were generated from the running current candidate:
  - desktop `1440x900`, 317487 bytes, SHA-256 `0439d492cd84d8754013f3aa586d44a65b6e538e9b350afb1e214eb8cedb92cb`;
  - mobile `390x844`, 104691 bytes, SHA-256 `93e0e3694fa5fb95a25611f34169644b4b0e0c5ddcc7c2c8b083f19dbd2aa626`.
- I2-1 is technically closed: the parent starts `PENDING` and adopts a renderer backend only after child initialization.
- I2-3 is technically closed: exact selection shape, canonical default, cross-pod uniqueness, and responsible-Advisor membership fail closed before assembly.
- I2-4 is technically closed: production copy is no longer prototype/tour copy and semantic Channy state updates only at bounded ambient-state transitions.

## Blocking Findings

### A3-1 — Required current Team fact is absent from the first information layer

The Founder authorization requires every visible actor's compact first layer to expose the current Team or `UNASSIGNED`. The current contract section 2.7 and `ORGANIZATION_COMPACT_FIELDS` omit `advisorTeam`; the visible roster uses the same incomplete list. The 17-field drawer contains it, but the second layer cannot substitute for the required first layer.

Classification: `CODE_AND_AS_BUILT_CONTRACT_DEFECT`, routine and patchable inside approved Batch A.

### A3-2 — Desktop labels dominate and obscure the Office world

Direct inspection of the fresh `1440x900` capture shows eight `196px` cards covering much of the shared office, characters, and symbolic work surfaces. The cards are mechanically non-overlapping but are not compact, and most long values remain visibly truncated. This fails the explicit requirements that the Office world remain the visual protagonist and that labels/technical details remain secondary. Passing Axe, font-size, and rectangle-overlap assertions is not sufficient visual evidence.

Classification: `VISUAL_PRODUCT_DEFECT`, routine and patchable inside approved Batch A.

## Required Narrow Correction

1. Add `advisorTeam` to the compact first-layer contract, production label/accessible name, always-visible roster, and exact tests.
2. Recompose production labels into a genuinely compact readable layout. Keep every required fact and source represented, but reduce permanent canvas coverage and preserve clear actor association.
3. Add a deterministic Office-occlusion/coverage gate in addition to the existing label-to-label and label-to-actor checks. Do not satisfy it by hiding desktop actors/facts or by weakening the test.
4. Preserve the mobile full-roster equivalent and explicitly include Team there.
5. Preserve I2-1, I2-3, I2-4, the 17-field drawer, strict CSP, accessibility, static/reduced-motion behavior, M1 fallback, and all authority boundaries unchanged.
6. Use focused tests during iteration. Run the affected browser integration gate after stabilization and the required complete candidate gate once before returning the candidate.

No new Founder decision, Control redesign, security decision, or Batch B scope is required.

## Decision

Do not spend an independent Reviewer pass on this known-defective visual candidate. Route one narrow third rework to the same `agent-office-opus` Worker, then perform Advisor focused validation and same-Sentinel delta re-review.
