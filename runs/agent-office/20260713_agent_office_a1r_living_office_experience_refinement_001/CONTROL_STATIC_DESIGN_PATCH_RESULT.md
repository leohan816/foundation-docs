# Control Static Design Patch Result — A-1R (A1R-ADV-01 + A1R-ADV-02)

Result: `CONTROL_STATIC_DESIGN_NARROW_PATCH_APPLIED__PENDING_INDEPENDENT_DESIGN_REVIEW_THEN_LEO_MOCKUP_APPROVAL`
Actor: existing `foundation-control` · Mode: `PRODUCT_EXPERIENCE_DESIGN_MODE__NARROW_PRE_REVIEW_PATCH`. Control remains Control.
Mission: `AGENT_OFFICE_A1R_LIVING_OFFICE_EXPERIENCE_REFINEMENT_001` · Base design commit `d33dfc97a04077ded1a19c26d9806cb745166d73`
Target repo: `/home/leo/Project/agent-office-a1r-001` · Branch `a1r/living-office-experience-refinement-001`
Patch commit: `b966c6a98752558ad0db66fa2b79e42d9e9dcd24` (non-force push; not `main`/protected)
Model/effort: Opus 4.8 (1M) xhigh · Scope: the two committed Advisor validation findings only (docs/mockups)

## A1R-ADV-01 — deferred-batch mapping corrected to the Founder activation table

The register/design/index mapping now exactly matches the Founder activation table:

- **A-1R scope = DCR-01 basic presentation + DCR-02 basic role animation** — the latter designed for the later A-1R Worker implementation using **only accepted fixture/evidence state**, with **neutral/reduced/static equivalents**; **not** live runtime-state integration.
- **Real runtime-state-driven animation = Batch B** (DCR-03).
- **Dynamic Team/actor admission = Batch C** (DCR-04).
- **Real Advisor delivery = Batch D** (unless proven unchanged reuse; A1R-U03), **live current-status response = D** (DCR-06), **Worker→Reviewer→Advisor movement = D** (DCR-07), **real completion/handoff choreography = D** (DCR-08).
- **Operational Channy watchdog + bounded retry = Batch E** (DCR-09/10). **Ambient sound = E-2** (DCR-11).
- **`DELIVERY_DISABLED` kept; the documentation correction creates no runtime or implementation authority.**

Files: `docs/operations/AGENT_OFFICE_A1R_DEFERRED_CAPABILITY_REGISTER.md` (intro, DCR-01/02/03/05/06/07/08 rows, summary table, closing), `docs/architecture/AGENT_OFFICE_A1R_LIVING_OFFICE_PRODUCT_EXPERIENCE_DESIGN.md` (§2 behavior mapping), `docs/FEATURE_INDEX.md` (register row + §2.2). No "activates only DCR-01" or DCR-06/07/08→Batch-B residue remains; the only "runtime-state → Batch B" statements are the correct DCR-03 live-integration distinction.

## A1R-ADV-02 — avoidable spatial collisions corrected in only the two affected mockups

- **`a1r-advisor-team-pod.svg` / `.png`** (re-laid-out; canvas 1040×760): three clear columns — ① Advisor coordination desk + Team Mission Board (left) with ④ Reviewer independent booth below; ② Control architecture surface + SIASIU Worker (centre); ③ Worker desks Agent Office/Cosmile with idle seat + Channy (right). Anchor tags (①②③④) now sit **above** their zones, not over characters; every actor label is distinct from actor/monitor/desk silhouettes and from neighbours; the Foundation Advisor label is clear of the Reviewer zone; the Foundation Control label is fully readable. Inspected at original size — no visible label/silhouette/furniture collision.
- **`a1r-full-office-mobile.svg` / `.png`** (390×844): member lists re-laid-out to **single-column full-width rows** with name (left) · role (mid) · critical state (right) separated — the previously colliding Foundation Control and Independent Reviewer rows are now clean; Channy moved to the empty lower floor (no longer overlapping the Cosmile row). Inspected at original size — no collision.

**Preserved in both:** all registry actors (8), Team memberships (Foundation 6 incl. Agent Office as a member, VibeNews 2), role anchors, Team Mission Boards, Korean labels, information hierarchy, and truthful state examples. **Unaffected mockups untouched:** `a1r-full-office-desktop`, `a1r-information-interaction-states`, `a1r-channy-character-poses` (SVG + PNG unchanged). Spec dims for the pod updated to 1040×760 / 2080×1520.

## Verification

- **Exact file scope:** 8 changed paths, all `docs/**`; `git diff --cached` non-docs = **0**; source/test/config/dependency/package = **0**.
- **Only affected PNGs re-exported:** pod + mobile re-rendered from the corrected SVGs (chromium via scratchpad-only script; no repo tooling/config added) and **directly inspected at original size**; desktop/info-states/channy PNGs byte-unchanged.
- **SVG validity:** all 5 parse as well-formed XML.
- **Branch/push:** committed `b966c6a`; **non-force** push to `origin/a1r/living-office-experience-refinement-001`; `main`/protected untouched; prior reviewed Batch A branch untouched.
- **No redesign of unaffected mockups; no source/test/config/dependency/runtime change; no Worker/Reviewer invocation; no self-review; no delivery activation; no authority/Team change; no Batch B–E.** Findings closed, not erased.

## Return and next

`RETURN_TO: Advisor`. Advisor inspects the exact delta (`b966c6a`), then dispatches **one independent design-contract review** (SOL Reviewer, A1R-U09); a routine finding is patched only in the affected section with a narrow same-Reviewer delta review. Then return to Leo/GPT for **static mockup approval** (aesthetic decision Leo's alone). Worker implementation is forbidden before both design-review `PASS` and Leo approval. Control has stopped; it did not implement, review, self-review, accept risk, grant approval, or enter Batch B–E.
