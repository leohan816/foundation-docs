# 14 — Control Static Design Patch Result Pointer (A-1R · A1R-ADV-01 + A1R-ADV-02)

```text
RESULT_WRITTEN
TARGET_PROJECT: Agent Office A-1R Living Office
ROLE_ACTOR: Control-Rework (PRODUCT_EXPERIENCE_DESIGN_MODE__NARROW_PRE_REVIEW_PATCH)
RESULT: CONTROL_STATIC_DESIGN_NARROW_PATCH_APPLIED__PENDING_INDEPENDENT_DESIGN_REVIEW_THEN_LEO_MOCKUP_APPROVAL
MODEL_EFFORT_ACTUAL: Opus 4.8 (1M) xhigh
RESULT_FILE: ../foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/CONTROL_STATIC_DESIGN_PATCH_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/14_CONTROL_STATIC_DESIGN_PATCH_RESULT_POINTER.md
DESIGN_REPO: /home/leo/Project/agent-office-a1r-001
DESIGN_BRANCH: a1r/living-office-experience-refinement-001
BASE_DESIGN_COMMIT: d33dfc97a04077ded1a19c26d9806cb745166d73
PATCH_COMMIT: b966c6a98752558ad0db66fa2b79e42d9e9dcd24
PATCH_COMMIT_PUSHED: yes (origin/a1r/living-office-experience-refinement-001, non-force, not main/protected)
FILES_CHANGED: 8 (all docs/**) · NON_DOC_CHANGES: 0 · SOURCE/TEST/CONFIG/DEP: none
A1R-ADV-01 (deferred-batch mapping -> Founder activation table):
  - A-1R scope = DCR-01 basic presentation + DCR-02 basic role animation (fixture/evidence, neutral/reduced/static; NOT live)
  - real runtime-state-driven animation = B; dynamic admission = C
  - real Advisor delivery = D (unless proven unchanged reuse); live current-status = D; movement = D; completion/handoff choreography = D
  - watchdog + bounded retry = E; ambient sound = E-2
  - DELIVERY_DISABLED kept; no runtime/implementation authority created
  - files: DEFERRED_CAPABILITY_REGISTER (rows+summary+intro), PRODUCT_EXPERIENCE_DESIGN §2, FEATURE_INDEX (row+§2.2)
A1R-ADV-02 (spatial collisions, only affected mockups):
  - a1r-advisor-team-pod.svg/.png re-laid-out to 3 clear columns (1040x760); anchor tags above zones; labels distinct from silhouettes/desks/neighbours; Advisor clear of Reviewer zone
  - a1r-full-office-mobile.svg/.png member rows -> single-column full-width (name/role/state separated; Foundation Control + Independent Reviewer no longer collide); Channy moved to empty lower floor
  - re-rendered ONLY the two affected PNGs; inspected at original size; no collisions
  - preserved all actors/Team memberships/role anchors/Mission Boards/Korean labels/states
UNAFFECTED_MOCKUPS_UNTOUCHED: a1r-full-office-desktop, a1r-information-interaction-states, a1r-channy-character-poses (svg+png byte-unchanged)
SVG_VALIDITY: all 5 well-formed XML
FINDINGS_HANDLING: closed not erased
FORBIDDEN_CONFIRMED_NOT_DONE: source/test/config/dep/runtime edit; redesign of unaffected mockups; Worker/Reviewer invocation; self-review; delivery activation; authority/Team change; Batch B-E; force push; protected/main
RETURN_TO: Advisor
NEXT_ACTOR: Advisor (inspect exact delta b966c6a -> one independent design-contract review -> Leo static mockup approval)
```

Advisor next step: inspect the exact delta (`b966c6a`) confirming A1R-ADV-01 and A1R-ADV-02 are closed with no scope broadening, then dispatch **one independent design-contract review** (SOL Reviewer per A1R-U09; evaluates Founder UX Contract, clarity, accessibility, spatial conflict, truth, authority, implementability — not final aesthetic). A routine review finding is patched only in the affected section with a narrow same-Reviewer delta review. Then return to Leo/GPT for static mockup approval (aesthetic decision Leo's alone). Worker implementation is forbidden before both design-review `PASS` and Leo approval. Control has stopped; it did not implement, review, self-review, accept risk, grant approval, or enter Batch B–E.
