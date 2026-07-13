# Control Static Design Result — A-1R Living Office Experience Refinement

Result: `CONTROL_STATIC_PRODUCT_EXPERIENCE_DESIGN_PACKAGE_PUBLISHED__PENDING_INDEPENDENT_DESIGN_REVIEW_THEN_LEO_MOCKUP_APPROVAL`
Actor: existing `foundation-control` · Mode: `PRODUCT_EXPERIENCE_DESIGN_MODE` (label `제품 설계·아키텍처`). Control remains Control — not Designer/Worker/Reviewer/approver.
Mission: `AGENT_OFFICE_A1R_LIVING_OFFICE_EXPERIENCE_REFINEMENT_001`
Target repo: `/home/leo/Project/agent-office-a1r-001` · Branch `a1r/living-office-experience-refinement-001` · Base `58a484b088b4e57e7b3ee6e582f54c7f3ce6dc85`
Design commit: `d33dfc97a04077ded1a19c26d9806cb745166d73` (non-force push to new feature branch; not `main`/protected)
Model/effort: Opus 4.8 (1M) xhigh

## What was produced (exact 15 authorized paths; 0 non-doc changes)

- **Design docs (4):** `docs/architecture/AGENT_OFFICE_A1R_LIVING_OFFICE_PRODUCT_EXPERIENCE_DESIGN.md`, `docs/contracts/AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md`, `docs/operations/AGENT_OFFICE_A1R_DEFERRED_CAPABILITY_REGISTER.md`, `docs/ui/a1r/AGENT_OFFICE_A1R_STATIC_MOCKUP_SPEC.md`.
- **Mockups (5 SVG design sources + 5 full-size PNG evidence):** `a1r-full-office-desktop` (1440×900 + Leo 1512×619 reflow inset), `a1r-full-office-mobile` (390×844), `a1r-advisor-team-pod` (1000×720), `a1r-information-interaction-states` (1200×880), `a1r-channy-character-poses` (960×620) under `docs/ui/a1r/mockups/`.
- **Index:** `docs/FEATURE_INDEX.md` (canonical design table rows + §2.2 A-1R pointer).

## Real product inspected first (not from tests)

Leo capture `/home/leo/uploads/clip-20260713-223828.png` (1512×619) inspected at original size and confirmed against source: `living-office-actor-overlay.tsx:34-35` (`PRODUCTION_LABEL_WIDTH=244` × `PRODUCTION_LABEL_HEIGHT=180`) and `:55-65` (seven always-visible facts advisorTeam/sessionProcess/aiIdentity/model/effort/aiRuntimeState/operationalState). Registry `src/application/organization/registry.ts` (8 actors, 2 Teams; `agent-office-worker.advisorTeam = FOUNDATION_ADVISOR_TEAM`) and `office-layout-config.ts` (`pod:foundation`/`pod:vibenews`) grounded the mockups; no memory or test-only design.

## Design summary (Space → Behavior → Information → Technology)

One shared 45°/diamond floor; registry-derived, spatially separated **Foundation** (6 members incl. Agent Office) and **VibeNews** (2) Advisor Team Pods — two Teams only, no Team inference, **Agent Office is a Foundation member with no Pod**. Role anchors: Advisor coordination desk + Mission Board, Control architecture surface, per-Worker individual desks, Reviewer independent booth, idle peripheral seat. **Compact default label** (name/role/Team accent+short text/one critical state) replaces the 244×180 seven-fact card; **layered disclosure** = hover quick card → exactly-one pinned card → full 17-field drawer (mobile: bottom sheet). **Relationship lines hidden by default.** Korean-first UI with exact technical IDs/SHAs/model names. Team Mission Boards show KST-from-verified-UTC (no fabrication; unknown stays unknown). Advisor selection/transcript/notification shell in the Living Office is **`DELIVERY_DISABLED`, input-locked** (A1R-U03; no browser→agent dispatch). Recognizable **non-operational Channy** Bedlington with ambient poses. Collapsed ordinary `접근 가능한 에이전트 목록 (N)` with preserved screen-reader parity; semantic list becomes primary for static/no-canvas/high-text/renderer-failure/accessibility; reduced-motion + non-color meaning mandatory. Deferred-capability register DCR-01..11 — **A-1R activates only DCR-01** (role-specific basic presentation). Prior always-visible seven/nine-field first-layer + five test reworks **SUPERSEDED**; registry truth/identity separation/fail-closed/provenance/full-drawer/Technical-Dashboard-secondary **preserved**.

## Verification

- **Exact file scope:** 15 authorized paths staged; `git diff --cached` non-docs = **0**; source/test/config/package = **0**.
- **Image dimensions/readability:** PNGs rendered at deviceScaleFactor 2 → 2880×1800 / 780×1688 / 2000×1440 / 2400×1760 / 1920×1240; Korean renders as Korean (Noto Sans CJK KR); legible at full size (desktop, info-states, and Channy directly reviewed).
- **SVG validity:** all 5 parse as well-formed XML.
- **PNG existence:** all 5 present and non-empty (99–432 KiB).
- **Diff hygiene:** only the 15 paths; `docs/ui/a1r/` newly created under `docs/`; FEATURE_INDEX is additive (new table rows + §2.2).
- **Branch/push:** committed `d33dfc9`; **non-force** push to `origin/a1r/living-office-experience-refinement-001` (new feature branch; `main`/protected untouched; prior reviewed branch untouched).
- **Rendering method (no repo change):** a scratchpad-only Node script used the batch-a repo's `playwright-core` + the cached Chromium binary + a scratchpad fontconfig to rasterize the committed SVGs; no tooling/config/dependency was added to the target repo.

## Forbidden confirmed not done

No runtime/source/test/config/package/dependency edit; no clickable prototype or duplicate product; no Worker/Reviewer invocation; no self-review; no Team inference/new Team/delivery activation/authority/auth/security change; no Batch B–E; no DB/Hermes/remote/public/protected-branch/merge/force-push; no asset purchase/import; no ambient sound; no aesthetic approval (Leo's alone); accepted registry/provenance/fail-closed/full-drawer boundaries not rewritten.

## Return and next

`RETURN_TO: Advisor`. Next: **independent design-contract review** (contract/readability/clarity/spatial-conflict/truth/accessibility/authority/implementability — not final aesthetic), then **Leo static mockup approval** (aesthetic decision Leo's alone). Worker implementation is forbidden before both design-review `PASS` and Leo approval. Control has stopped; it did not implement, review, self-review, accept risk, grant approval, or enter Batch B–E.
