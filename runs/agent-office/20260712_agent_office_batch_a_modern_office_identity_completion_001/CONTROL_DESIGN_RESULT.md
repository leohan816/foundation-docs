# Control Design Result — Agent Office Batch A Application-Integration Design Delta

Result: `CONTROL_MASTER_DESIGN_DELTA_PUBLISHED__PENDING_ADVISOR_VALIDATION_AND_FABLE5_DESIGN_REVIEW`

Actor: Control (`foundation-control` session). Mode: `CONTROL_MASTER_DESIGN_MODE` (design coordination only — no implementation, no review, no risk acceptance, no final approval, no agents/sub-agents).

Return to: Advisor.

## Model / effort

- Actual: Claude Code, Opus 4.8 (1M context), session effort `xhigh` (Leo set `/effort xhigh` locally during this pass).
- Launcher requested `MODEL_EFFORT: <Opus 4.8:Medium>`. Honest note: the pass actually ran at `xhigh`, not Medium. No behavior/scope change resulted; flagged for Advisor record.

## Task and anchor

- Task: `AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA`.
- Source Advisor job: `advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001`.
- Corrected brief with the authoritative 17 items: `02_CONTROL_DESIGN_BRIEF.md` at `99e3e4109fd8d77cf64e58d3892541a4dacad947`.
- Product base: `batch-a/modern-office-identity-001` at `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2` (isolated worktree, clean, upstream equal).

## Deliverables (Agent Office worktree commit `604dfad537e557191a84f0ecfc000461d86cfca9`)

Documentation only — the four approved paths:

1. `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md` (new, 172 lines) — architecture/component map, data contract, state model, routes/navigation, organization model, 17-item design-resolution table, 17-item requirement matrix, proposed source scope, acceptance gates, rollback, unknowns, explicit Batch B–E exclusion.
2. `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md` (new, 88 lines) — identity vs mutable assignment, ten-field fact + provenance, fail-closed local/static registry + `UNASSIGNED`/`UNKNOWN`, Advisor Team organization, symbolic-surface and Channy non-operational boundaries, contract test obligations.
3. `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md` (new, 123 lines) — `BA-WU-01..09` dependency order, per-unit source/tests/gate/rollback, gate set, exact completion criteria.
4. `docs/FEATURE_INDEX.md` (pointer/status update only, +8 lines) — three canonical-design rows + `### 2.0` Batch A design pointer/status; no rewrite of existing content.

Foundation Docs result/pointer (this repo):

- `runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/CONTROL_DESIGN_RESULT.md` (this file).
- `advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/11_CONTROL_DESIGN_RESULT_POINTER.md`.

## 17 Founder items — coverage

All 17 authoritative items from the corrected `02_CONTROL_DESIGN_BRIEF.md` (items 1–17) are covered with a design resolution + a per-item requirement matrix (current evidence at `ac8ba75` → Batch A gap) and mapped to WorkUnits `BA-WU-01..09`. Earlier confusion about the item source is resolved: the corrected brief is the single authoritative list; no other historical list was used.

## Direct reads (evidence grounding, no agents)

Read directly this pass: `00_INTAKE.md`, `01_ADVISOR_BRIEF.md`, `02_CONTROL_DESIGN_BRIEF.md` (corrected), `03_WORKER_BRIEF.md`, `14_REQUIREMENT_CURRENT_EVIDENCE_MATRIX.md`, job `index.md`; Agent Office `CLAUDE.md`; `docs/FEATURE_INDEX.md` §2/§2.1; `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md` §18; `docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md` (structure/headers); `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md` §1–§5; source `src/ui/demo-entry.tsx`, `src/runtime/projection.ts`, `src/application/spatial-office/*` (listing), `index.html`, `package.json` scripts, `src/` tree; prior visual review `runs/.../FABLE5_LIVING_PIXEL_OFFICE_VISUAL_PATCH_DELTA_REVIEW_RESULT.md` (13-check PASS at `ac8ba75`).
- Relied on by reference (role/subject taken from FEATURE_INDEX §2 and headers, not fully re-read this pass): `AGENTS.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`, `AGENT_OFFICE_MASTER_DESIGN.md`, `AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`, `AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`, `AGENT_OFFICE_M1_2_PIXEL_WORLD_SPRITE_ANIMATION_SYSTEM.md`, `AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md`. The Grok stop audit was treated only as an exclusion warning; no Grok code/behavior was used.

## Checks / boundary confirmation

- No implementation, and no source/test/package/config/media change: the Agent Office commit contains only the four `docs/` paths (`git diff --cached` non-`docs/` count = 0).
- No DB/schema/migration/secret/env, no auth/transport change, no remote/public/production, no protected-branch/`main` merge, no force push (branch pushed with `-u`, new branch, non-force).
- No agents, sub-agents, delegated contexts, or new sessions were created.
- Batch B–E untouched; excluded historical Grok artifacts untouched.
- Design constraints honored: no re-derivation of accepted M1/M1.2 foundations; Pixi=visual world / DOM=navigation-labels-drawer-semantic-fallback-secondary-control; one validated frame source; identity independent from mutable assignment; M1 auth/delivery/communication/PWA/security/fallback preserved.
- Self-review not performed; final approval not granted (Control has neither authority).

## Unresolved questions (for Advisor / Leo/GPT)

- U-1: exact required coverage of the 14-value operational-state enum for the integrated shell (in-scope vs deferred members).
- U-2: whether the integrated Office shell is selected by an authenticated runtime capability (not a `surface=` demo param) and the default-vs-opt-in policy for the first private run — a product/policy decision reserved to Leo/GPT.
- U-3: the exact production-bundle isolation mechanism the Worker must reuse so a default build stays zero-Pixi-marker while the authenticated shell can load the renderer.
- U-4: exact local/static registry fixture source and its staleness policy (Batch A is static; no live discovery).
- Effort discrepancy: launcher requested Medium; pass ran at `xhigh`.

## Next actor

`RETURN_TO: Advisor`. Proposed next step: Advisor validates the committed Control design, then (per V2 release train) an independent-Sentinel `DESIGN_REVIEW`, Leo/GPT design/risk approval, then the exact Worker implementation handoff. Control stops here and does not implement, review, or enter Batch B–E.

---

## Rework — CD-1..CD-8 (Agent Office design commit `6e41006ff14a941403ea08caba024bec48f9b5f9`)

Driver: Advisor validation `15_ADVISOR_CONTROL_DESIGN_VALIDATION.md` = `NEEDS_IN_SCOPE_CONTROL_DESIGN_PATCH`. Patched in the same branch and the same four approved documentation paths; no new Founder decision; no source/test/package/config/media change (staged non-`docs/` = 0); non-force push.

### CD closure

- **CD-1** reviewer authority: all reviewer references now name the **independent Sentinel** (`foundation-reviewer-sol`, currently GPT-5.6 SOL xhigh); Fable5 = possible secondary/fallback runtime only; model names framed as evidence not authority (master design §4). Applied across delta header/§10/§13, contract header, WorkUnit plan, and `FEATURE_INDEX` §2.0.
- **CD-2** U-2 Founder-decided: delta §1/§5 make Office-first the **default** when the authenticated projection is ready; no new capability; **no `surface=` in the real app**; degrade to static semantic Office → M1. U-2 removed from unknowns.
- **CD-3** bundle gate: delta §2.2/§10 + plan §3 replace whole-`dist` zero-Pixi with **eager-shell isolation** (Pixi only in a separately emitted lazy Office chunk; eager shell + fallback graph import/execute no Pixi; fixture markers still rejected; tests assert chunk separation, fallback independence, no eager renderer startup).
- **CD-4** runtime vs work state: delta §4 + contract §2.3/§2.4 define **separate fields and closed vocabularies** (session/process, AI identity, model, effort, AI-runtime state) distinct from the operational work-state enum; required visible values preserved; `AI_WORKING` requires structured evidence.
- **CD-5** detail contract: delta §3 + contract §2 expand beyond the historical ten fields (adds `stableDisplayName`, `assignedBy`, `returnsResultTo`, AI-runtime identity, `effort`, explicit per-field evidence source).
- **CD-6** identity vs session: contract §1 + delta §3/§6 make `roleInstanceId` the stable key; `sessionName` is a current binding, not identity (removed from stable-identity fields).
- **CD-7** U-1/U-4 resolvable: U-1 via the separated state vocabularies (§4); U-4 via a new committed local/static organization registry under `src/application/organization/` (provenance + evidence timestamp/status, no auto-refresh, no time-only freshness, unverified→`UNKNOWN`, invalid→`UNASSIGNED`, changes via reviewed commit).
- **CD-8** direct reads completed this rework pass (same Control session, no agents): `AGENTS.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`, `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md` (§1–§5 incl. §4 authority precedence + §11 batch context), `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md` (§1 + Batch A/C/D boundaries), `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md` (structure + cue vocabulary §2–§8), `docs/ui/AGENT_OFFICE_M1_2_PIXEL_WORLD_SPRITE_ANIMATION_SYSTEM.md` (§1–§7 incl. §5.2 actor states, §7 Channy), `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md` (§6.2 production surfaces + §6.3 integration behavior). The Grok stop audit remains an exclusion warning only; no Grok code/behavior used.

### Rework checks / boundaries

- Agent Office rework commit `6e41006` contains only the four `docs/` paths (staged non-`docs/` = 0); no runtime/source/test/package/config/media change; non-force push; branch `batch-a/modern-office-identity-001`.
- Accepted architecture direction and 17-item traceability preserved; all scope/authority exclusions and Batch B–E exclusion preserved.
- No implementation, no self-review, no final approval, no agents/sub-agents/new sessions, no DB/secret/auth/transport/remote/prod, no `main`/force push.
- Residual: **U-3** (exact `vite.config.ts` chunk-emission config for eager-shell isolation) — an implementation detail within the approved isolation rule, not a product/authority decision.

`RETURN_TO: Advisor`. Implementation remains unauthorized until a clean independent-Sentinel `DESIGN_REVIEW`.
