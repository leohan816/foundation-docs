# Control Design Result — Agent Office Batch A Application-Integration Design Delta

Result: `CONTROL_MASTER_DESIGN_DELTA_U1_U3_PLUS_ACTOR_OVERLAY_SCOPE_GAP_CORRECTION__PENDING_INDEPENDENT_SENTINEL_REVIEW_OF_NARROW_DELTA`

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

`RETURN_TO: Advisor`. Proposed next step: Advisor validates the committed Control design, then (per V2 release train) an independent-Sentinel `DESIGN_REVIEW`. Under the current Founder authorization, a clean `DESIGN_REVIEW` plus Advisor acceptance opens the exact Worker implementation handoff — no separate intermediate Leo/GPT design/risk approval is required; only `PASS_WITH_RISK`, a new material decision, or another mandatory stop returns to Leo/GPT. Control stops here and does not implement, review, or enter Batch B–E.

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

### CD-9 / CD-10 residual closure (post-rework, `docs/FEATURE_INDEX.md` + result/pointer only)

- **CD-9**: the `FEATURE_INDEX` identity-contract row no longer describes a legacy "ten-field" contract; it now states the complete Batch A summary/detail fact contract (`roleInstanceId`-stable identity attributes vs mutable bindings, separated AI-runtime vocabularies distinct from operational work state, per-field evidence source).
- **CD-10**: `FEATURE_INDEX` §2.0 and this result/pointer no longer claim a required intermediate Leo/GPT design/risk decision before Worker implementation. Corrected flow: a clean independent-Sentinel `DESIGN_REVIEW` plus Advisor acceptance opens the exact Worker handoff under the current Founder authorization; only `PASS_WITH_RISK`, a new material decision, or another mandatory stop returns to Leo/GPT.
- Scope this pass: allowed Agent Office path `docs/FEATURE_INDEX.md` only; the other three design docs and all CD-1..CD-8 closures are preserved unchanged.

### Rework checks / boundaries

- Agent Office rework commit `6e41006` contains only the four `docs/` paths (staged non-`docs/` = 0); no runtime/source/test/package/config/media change; non-force push; branch `batch-a/modern-office-identity-001`.
- Accepted architecture direction and 17-item traceability preserved; all scope/authority exclusions and Batch B–E exclusion preserved.
- No implementation, no self-review, no final approval, no agents/sub-agents/new sessions, no DB/secret/auth/transport/remote/prod, no `main`/force push.
- Residual: **U-3** (exact `vite.config.ts` chunk-emission config for eager-shell isolation) — an implementation detail within the approved isolation rule, not a product/authority decision.

`RETURN_TO: Advisor`. Implementation remains unauthorized until a clean independent-Sentinel `DESIGN_REVIEW`.

---

## Sentinel P1–P4 rework (Agent Office design commit — see pointer; base `ac8ba75`)

Driver: independent-Sentinel `SENTINEL_DESIGN_REVIEW_RESULT.md` = `NEEDS_PATCH` (candidate `665b251`), validated by `17_ADVISOR_SENTINEL_DESIGN_REVIEW_VALIDATION.md`. Patched in the same four approved documentation paths; no runtime/source/test/package/config/media change; non-force push. The design is now implementation-deterministic; exact vocabularies are the inherited source vocabularies (cited), not invention.

### P1–P4 closure table

| Finding | Closure (exact) |
|---|---|
| **P1** contradictory fail-closed field vocabularies | Contract §2.3 = per-field type + normalization table with **exactly one sentinel per field**: `sessionProcess`→`SESSION_OFFLINE`, `aiIdentity`→`AI_IDENTITY_UNKNOWN`, `model`→`MODEL_UNKNOWN`, `effort`→`EFFORT_UNKNOWN`, `aiRuntimeState`→ new `AI_RUNTIME_UNKNOWN`; accepted-evidence rule for each of `AI_READY`/`AI_WORKING`/`AI_WAITING`/`AI_ERROR`; literal `UNKNOWN` scoped to free-text identity/binding fields only. Delta §3/§4 aligned. |
| **P2** operational-state not one owned vocabulary | Contract §2.4 + delta §4 name **`PixelOperationalState`** (14, `src/ui/pixel/contracts.ts:24-38`) as the owned display vocabulary and give a **total fail-closed mapping** from `WORK_UNIT_STATES` (16, `src/domain/state-machines/work-unit.ts:3-20`) + activity cues (`src/domain/activity/index.ts:21-41`), default `UNKNOWN`; no `e.g.`. |
| **P3** registry mint/merge/provenance incomplete | Contract §2.5/§3 give the exact fact envelope `{value, source, status, evidenceTimestamp}`, inherited **UPPER_SNAKE** discriminators (`contracts.ts:6-11`), field ownership (committed registry owns identity/bindings/AI-runtime because `authenticated-projection.ts:53-61` has no model/effort/session-process; `mission`/`workUnit`/`operationalState` joined from runtime on `roleInstanceId` and never stored), `mint→validate→join→project` flow, merge precedence + no-store-back rule, and the exact summary subset + drawer order/test matrix. |
| **P4** PWA/failure scope + gates omitted | Delta §9 adds the conditional exact `src/pwa/cache-policy.ts`/`public/sw.js`/`src/server/http/static-shell.ts` subset + exact test paths and removes broad `src/ui/*`; delta §10 + plan §3 add the inherited full-integration/PWA failure matrix (impl plan §6.4/§6.5). |

### Direct reads this pass (Sentinel-cited source, no agents)

`SENTINEL_DESIGN_REVIEW_RESULT.md`, `17_ADVISOR_SENTINEL_DESIGN_REVIEW_VALIDATION.md`, `src/ui/pixel/contracts.ts` (`:6-11` provenance, `:24-38` `PixelOperationalState`), `src/domain/state-machines/work-unit.ts` (`:3-20` 16 states), `src/domain/activity/index.ts` (`:21-41` observable names + `UNKNOWN_OR_STALE`), `src/application/spatial-office/authenticated-projection.ts` (`:53-68` actor input has no model/effort/session-process), `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md` (`:706-742` §6.4 verification + §6.5 rollback checkpoints).

### Non-blocking correction

- The stale `CONTROL_DESIGN_RESULT.md` header (`PENDING_ADVISOR_VALIDATION_AND_FABLE5_DESIGN_REVIEW`) is corrected to the independent-Sentinel route.

### Rework boundaries

Same four Agent Office documentation paths only; no runtime/source/test/package/config/media/DB/secret/auth/transport/PWA-code change; no `main`/force push; no agents/sub-agents/new sessions; no self-review; Batch B–E untouched; accepted architecture + 17-item traceability + CD-1..CD-10 closures preserved. `RETURN_TO: Advisor`; implementation unauthorized until a clean independent-Sentinel delta re-review.

---

## Sentinel delta re-review R1–R4 rework (Agent Office design commit — see pointer)

Driver: `SENTINEL_DESIGN_DELTA_REREVIEW_RESULT.md` = `NEEDS_PATCH` (candidate `60a5a72`; P1/P2/P3 `NOT_CLOSED`, P4 `PARTIAL__BLOCKING`), validated by `19_ADVISOR_SENTINEL_DELTA_REREVIEW_VALIDATION.md`. Patched in the same four design paths; semantics resolved from actual source, not from preserving the prior closure claim.

### R1–R4 closure table

| Finding | Closure (exact, from actual source) |
|---|---|
| **R1** missing/unverified process falsely labelled offline; `AI_READY` non-exact | Contract §2.3 adds a **distinct** `SESSION_PROCESS_UNKNOWN` sentinel; `SESSION_OFFLINE`/`NO_AI_PROCESS`/`AI_PROCESS_DETECTED` each require their own accepted process-fact; every runtime state names its exact accepted structured fact/cue; `AI_READY` needs an accepted `ai_ready` fact (attached-metadata removed as proof). Grounded in `src/runtime/observation-coordinator.ts:39-50` (no process/ready field). |
| **R2** mapping elevates and is incomplete | Contract §2.4 + delta §4: `operationalState` = **total function of `projectRequiredObservable(...).requiredObservableName`** (`src/domain/activity/index.ts:115-151`), not raw `WorkUnitState`; exhaustive `ObservableProjectionName`(16 + `UNKNOWN_OR_STALE`)→`PixelOperationalState` table, default `UNKNOWN`; un-evidenced `RUNNING`/`HOLD`/`WAITING_ADVISOR` → `UNKNOWN` (projector already returns `UNKNOWN_OR_STALE`, `:199-205`); all 11 `ROLE_ACTIVITIES` route through the existing compatibility gate (`:58-113,153-181`). |
| **R3** static ownership/join cannot implement runtime rules | Contract §2.5/§3: **(A)** immutable identity/organization registry (stable + allowed-token metadata) vs **(B)** accepted-evidence records; projector computes changing facts from (B) validated vs (A); **full outer join (union) on `roleInstanceId`** makes registry-only (→ sentinels) and evidence-only (→ `UNKNOWN`+`UNASSIGNED`) both producible; changing facts never stored in (A); reversed "registry derived from runtime" removed; broken §2.6→§2.5 pointer fixed. |
| **R4** source proposal still wildcarded | Delta §9 + WorkUnit plan §2 give a **closed enumerated** file list per area/WorkUnit (exact `src/ui/pixel/*` files, `src/application/organization/{index,types,registry,evidence,projector}.ts` + `fixtures/organization-registry.ts`, exact test paths, exact scripts); no `src/ui/*`/`tests/`/`scripts/ + docs`/`fixtures/` globs; any unnamed path returns to Advisor. Failure/PWA matrix (already closed) preserved. |

### Direct reads this pass (Sentinel-cited source, no agents)

`SENTINEL_DESIGN_DELTA_REREVIEW_RESULT.md`, `19_ADVISOR_SENTINEL_DELTA_REREVIEW_VALIDATION.md`, `src/domain/activity/index.ts` (`:1-18` `ROLE_ACTIVITIES`, `:21-41` observable names, `:58-207` compatibility gate + `projectRequiredObservable` + `deriveObservable`), `src/domain/state-machines/work-unit.ts` (`:3-20`), `src/ui/pixel/contracts.ts` (`:6-11`, `:24-38`), `src/runtime/observation-coordinator.ts` (`:39-50`), `src/application/spatial-office/authenticated-projection.ts` (`:53-68`), `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md` §6.2 (exact production file surfaces).

`RETURN_TO: Advisor`; implementation unauthorized until a clean independent-Sentinel delta re-review of the new candidate.

---

## Sentinel second delta re-review S1/S3/S4 rework (Agent Office design commit — see pointer)

Driver: `SENTINEL_DESIGN_SECOND_DELTA_REREVIEW_RESULT.md` = `NEEDS_PATCH` (candidate `77681d9`; R1 `PARTIAL__BLOCKING`, **R2 `CLOSED`**, R3 `REGRESSION`, R4 `NOT_CLOSED`), validated by `21_ADVISOR_SENTINEL_SECOND_DELTA_VALIDATION.md`. Patched S1/S3/S4 in the same four design paths; **R2/§2.4 preserved unchanged**; semantics resolved from actual source.

### S1/S3/S4 closure table

| Finding | Closure (exact, from actual source) |
|---|---|
| **S1** accepted-evidence not an implementable contract | Contract §2.3.1 defines one exact `AcceptedEvidenceRecord` (`kind`/`roleInstanceId`/`missionId?`/`workUnitId?`/`value?`/`provenance`/`acceptanceStatus`/`sourceEventIds`(UUIDv7)/`effectiveFrom`/`optionalExpiresAt?`), modeled on `CurrentActivity` (`src/domain/activity/index.ts:43-49`), plus the acceptance/validation rule (status/provenance/source-event/expiry/allowed-token). §2.3.2 gives the **deterministic total arbitration** for `aiRuntimeState` over every process/runtime combination: `P≠AI_PROCESS_DETECTED`→`AI_RUNTIME_UNKNOWN`; error surfaces (`AI_ERROR`); `work && wait`→`AI_RUNTIME_UNKNOWN`; else work/wait/ready in order; `ai_ready + ai_error`→`AI_ERROR`. |
| **S3** second work-truth store + stale unspecified (R3 regression) | Contract §2.5/§3 + delta §3 restore **(RT) the existing runtime projection/cue reducer as the sole truth** for `mission`/`workUnit`/activity/`operationalState` (`observation-coordinator.ts:269-320`); **(B)** is limited to facts genuinely absent from (RT) (process/identity/model/effort + `ai_ready`/`ai_error`), never a work-state store; the full-outer join and no-store-back are kept; (RT) wins conflicts over its own fields; **`STALE`/`INVALID`/`MISSING`/`UNVERIFIED` → each field's sentinel** (explicitly, per field). |
| **S4** unnamed asset/baseline/wildcard/result classes | Delta §9 enumerates the exact 8 `src/ui/pixel/assets/` files (`ASSET_INVENTORY.md`, `actor-base-atlas.source.ts`, `actor-identity-atlas.source.ts`, `atlas-builder.ts`, `atlas-manifest.ts`, `channy-atlas.source.ts`, `office-world-atlas.source.ts`, `palette.ts`) and the exact new baseline directories (`tests/e2e/baselines/living-pixel-office.spec.ts/`, `tests/e2e-composed/baselines/application-office-scene.spec.ts/<new-subdir>`); replaces `tests/acceptance/production-*-boundary.test.ts` with the two exact acceptance paths (WorkUnit plan §2/§3); uses the exact full Worker result/pointer paths. `src/ui/pixel/fixtures/` stays test-demo-only. |

### Direct reads this pass (Sentinel-cited source, no agents)

`SENTINEL_DESIGN_SECOND_DELTA_REREVIEW_RESULT.md`, `21_ADVISOR_SENTINEL_SECOND_DELTA_VALIDATION.md`, `src/domain/activity/index.ts:43-49` (`CurrentActivity`/`ObservableProjection`), `src/ui/pixel/assets/` (8 files), `tests/e2e/baselines/` + `tests/e2e-composed/baselines/`, `03_WORKER_BRIEF.md` (exact Worker result path). (RT) single-truth grounded in `src/runtime/observation-coordinator.ts:269-320`.

`RETURN_TO: Advisor`; R2 preserved; implementation unauthorized until a clean independent-Sentinel third delta re-review.

---

## Advisor pre-review correction T1–T3 (Agent Office design commit — see pointer)

Driver: `22_ADVISOR_CONTROL_THIRD_PATCH_VALIDATION.md` = `NEEDS_TARGETED_CONTROL_CORRECTION_BEFORE_SENTINEL` (candidate `a39634d`). Advisor held before spending another Sentinel pass. Corrected T1-T3 in the same four design paths; **closed R2, S3 RT-sole-truth, total arbitration, and STALE normalization preserved**.

### T1–T3 closure table

| Finding | Closure (exact) |
|---|---|
| **T1** accepted-evidence identity/dedup incomplete | Contract §2.3.1 now specifies `schemaVersion = 'agent-office.batch-a.accepted-evidence.v1'`, immutable `evidenceId` (UUIDv7) and `evidenceRef` (`sha256:<64 hex>`), `observedAt`/`effectiveFrom`/`optionalExpiresAt` validation (recency never proof; expired never contributes), **equality/idempotency by `evidenceId` with duplicate collapse**, and **deterministic same-`kind` selection** (greatest `effectiveFrom`; tie → greatest `evidenceId`; conflicting value/contradictory kind → field sentinel + diagnostic). §2.3.2 total runtime-state arbitration retained. |
| **T2** baseline/script placeholders/deferral | Delta §9 replaces the `<new-batch-a-subdir>` placeholder with the literal `tests/e2e-composed/baselines/application-office-scene.spec.ts/batch-a-living-office/`, and states `scripts/local-office-rehearsal.mjs` as one exact path with no "if named by the handoff" deferral (consistent with WorkUnit plan §2). |
| **T3** stale closure rows contradict final contract | Delta §14 now opens with a single **canonical current rule** (`SESSION_PROCESS_UNKNOWN` for missing/unverified process evidence; RT sole `mission`/`workUnit`/activity/`operationalState` truth; local attestations for absent facts only; no store-back) and marks the earlier P1 (`sessionProcess`→`SESSION_OFFLINE`), P3, and R3 (two-input) rows `[SUPERSEDED …]` as historical review provenance pointing to the current section. History retained, not erased. |

### Direct reads this pass (no agents)

`22_ADVISOR_CONTROL_THIRD_PATCH_VALIDATION.md`; the four `a39634d` after snapshots; `src/domain/activity/index.ts:43-49` (record discipline); `src/ui/pixel/assets/` and `tests/e2e*/baselines/` (literal paths).

`RETURN_TO: Advisor`; R2/S3 preserved; implementation and independent review unauthorized until this correction is validated and a clean Sentinel re-review passes.

---

## Sentinel third delta re-review U1–U3 final narrow correction (Agent Office design commit — see pointer)

Driver: `SENTINEL_DESIGN_THIRD_DELTA_REREVIEW_RESULT.md` = `NEEDS_PATCH` (candidate `5f8ffd1`; **S3 `CLOSED`, R2 `CLOSED__PRESERVED`, T3 `CLOSED`**; S1/T1 and S4/T2 `PARTIAL__BLOCKING`), validated by `25_ADVISOR_SENTINEL_THIRD_DELTA_VALIDATION.md`. Patched U1-U3 in the same four design paths; **closed S3/R2/T3, existing runtime-state arbitration, STALE behavior, and literal path scope preserved**.

### U1–U3 closure table

| Finding | Closure (exact) |
|---|---|
| **U1** `sessionProcess` no total cross-kind arbitration | Contract §2.3.1 adds an explicit **total conservative cross-kind** rule applied after same-kind selection: **zero** present kinds → `SESSION_PROCESS_UNKNOWN`; **exactly one** → its value (`process_detected`→`AI_PROCESS_DETECTED`, `process_absent`→`NO_AI_PROCESS`, `process_offline`→`SESSION_OFFLINE`); **two or more** contradictory → `SESSION_PROCESS_UNKNOWN` + diagnostic (the newest kind is not chosen). Total over missing/single/multi-unequal-time/tie/expired/contradictory; produces `P` for §2.3.2. |
| **U2** duplicate `evidenceId` with unequal content undefined | Contract §2.3.1 distinguishes **identical replay** (same `evidenceId`, all contract fields equal → idempotent collapse to one) from an **`evidenceId` collision** (same `evidenceId`, any unequal field → **all records of that id dropped** + diagnostic). Set-based / input-order independent. |
| **U3** documentation write class abbreviated | Delta §9 and WorkUnit WU-08 now list the **four literal** documentation write paths (`docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md`, `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md`, `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md`, `docs/FEATURE_INDEX.md`); anything else still requires an Advisor amendment. |

### Preserved (Sentinel-confirmed closed)

S3 (RT sole `mission`/`workUnit`/activity/`operationalState` truth; (B) absent facts only; no store-back), R2 (`projectRequiredObservable` total non-elevating display), T3 (canonical current rule + `[SUPERSEDED]` history), and all product/security/authority/transport/accessibility/fallback/Channy/rollback/no-Grok/excluded-session/Batch B–E boundaries — unchanged.

### Direct reads this pass (no agents)

`SENTINEL_DESIGN_THIRD_DELTA_REREVIEW_RESULT.md`, `25_ADVISOR_SENTINEL_THIRD_DELTA_VALIDATION.md`; the four `5f8ffd1` after snapshots; `src/domain/activity/index.ts`, `src/domain/state-machines/work-unit.ts`, `src/runtime/observation-coordinator.ts`, `src/application/spatial-office/authenticated-projection.ts`, `src/ui/pixel/contracts.ts`.

`RETURN_TO: Advisor`; S3/R2/T3 preserved; implementation unauthorized until a clean independent-Sentinel fourth delta re-review.

---

## Scope-gap correction — actor-overlay landing sites (Agent Office design commit — see pointer)

Driver: `29_ADVISOR_WORKER_SCOPE_EXCEPTION_VALIDATION.md` (with `28_ADVISOR_FINAL_DESIGN_ACCEPTANCE.md`). The accepted design under-specified the existing actor-overlay landing site. Docs-only correction in the same four design paths; **no architecture redesign; no new product decision**; U1-U3/S3/R2/T3 and all boundaries preserved.

### Correction (closed)

| Gap | Correction |
|---|---|
| Missing actor-overlay source | Delta §9 pixel-renderer list now includes `src/ui/pixel/living-office-actor-overlay.tsx` (verified: it renders the camera-tracked `living-office-actor-label` cards and the `living-office-actor-detail-heading` `role="dialog"`). |
| WU-03/WU-04 landing site wrong/under-specified | WorkUnit plan: **BA-WU-03** compact actor labels **and** **BA-WU-04** actor-specific complete 17-field detail dialog now land in `living-office-actor-overlay.tsx`; `living-office-detail-drawer.tsx` is preserved as the **separate frame/evidence technical panel** ("Secondary DOM technical panel"/frame contract/key/projection revision), not the actor drawer, non-duplicating. Contract §2.7 landing-site note added. |
| Coupled tests missing | Closed test list + WU-03/WU-04 tests now include `tests/ui/pixel-actor-overlay.test.tsx` and `tests/ui/pixel-world-semantic-parity.test.tsx`. |
| Recorded | Delta §14.4 records this as a closed scope-correction (not a new product decision); `prototype-entry.tsx` is composition evidence only and must not be edited; no wildcard authorized. |

### Direct reads this pass (no agents)

`29_ADVISOR_WORKER_SCOPE_EXCEPTION_VALIDATION.md`, `28_ADVISOR_FINAL_DESIGN_ACCEPTANCE.md`; the four canonical Batch A docs; `src/ui/pixel/living-office-actor-overlay.tsx` (labels + actor detail dialog), `src/ui/pixel/living-office-detail-drawer.tsx` (frame/evidence technical panel), `src/ui/pixel/actor-sprite.tsx`, `src/ui/pixel/prototype-entry.tsx` (read-only composition: composes both overlay + detail-drawer), `tests/ui/pixel-actor-overlay.test.tsx`, `tests/ui/pixel-world-semantic-parity.test.tsx`.

`RETURN_TO: Advisor`; U1-U3/S3/R2/T3 preserved; the same independent SOL Sentinel must review this narrow docs-only delta before Worker resume.
