# DAY1 — Cross-Project Static Contract & Dependency Audit (E2 Static, Read-Only)

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
WORKUNIT_ID: DAY1_CROSS_PROJECT_STATIC_DEPENDENCY_AUDIT
DISPATCH_OWNER: foundation-advisor
TARGET_ACTOR: foundation-control  (Control role — architecture/contract coordination)
MODE: READ_ONLY_E2_STATIC_CROSS_PROJECT
EVIDENCE_CEILING: E2_STATIC_CONNECTED  (no build/lint/test/runtime; no DB/endpoint/network/vendor)
RETURN_TO: foundation-advisor
VERDICT_AUTHORITY: NONE (evidence only — no policy/architecture/risk/release decision)
```

## Correction Note — CONTROL_PRE_REVIEW_EVIDENCE_CORRECTION_1

```text
CORRECTION_ID: CONTROL_PRE_REVIEW_EVIDENCE_CORRECTION_1
MODE: SAME_AUTHOR_BOUNDED_E2_CORRECTION  (original author foundation-control)
ORIGINAL_RESULT_SHA256 (frozen, pre-correction): e9dc6adc78429a98784200ea8db7419b427da6e43dbfd021f2c4240a92afff21
CORRECTIONS_APPLIED:
  1. §0 Actor/Runtime Identity completed with live model/effort/skill(NONE)/tmux session·window·pane/workspace (live evidence, not name-inferred).
  2. §4.1 added — structured C1–C7 impact projection (PAID_BETA_IMPACT/PUBLIC_LAUNCH_IMPACT/BLOCKING/REQUIRED_OWNER/REQUIRED_FOLLOWUP); underlying findings unchanged, no policy selected.
  3. §12 contract-diff harness reclassified E4-1 → E3-4 (local execution); E4 reserved for integration evidence.
NO_UNRELATED_CHANGES: YES  (no finding, pin, verdict, or evidence value altered; edits limited to items 1–3)
NEW_RESULT_SHA256: recorded in the pointer file (a file cannot embed its own post-write hash).
SUBJECT_PINS: unchanged (same four committed pins). REPO_WRITES: none. BRANCH/REF MOVEMENT: none.
```

## Completion Note — CONTROL_COMMERCIAL_FOUNDATION_OWNERSHIP_COMPLETION_1

```text
COMPLETION_ID: CONTROL_COMMERCIAL_FOUNDATION_OWNERSHIP_COMPLETION_1
MODE: SAME_ACTOR_BOUNDED_E2_OWNERSHIP_COMPLETION (original author foundation-control)
PRE_COMPLETION_RESULT_SHA256 (frozen): d6d850f3bcbfb9372a8a1f1c8801b689adda3e468c27410f55a10733d45d7610
ADDED: §A Commercial Foundation Ownership Map (A.0 inventory, A.1 two-stack fact, A.2 CAP-01..CAP-10 records, A.3 classification, A.4 P0/P1/P2 decision list, A.5 scope statement).
FOUNDER_DIRECTION_APPLIED: FUTURE_RESPONSIBLE_ACTOR=foundation for future Foundation product impl; historical Control authorship not relabeled.
NO_UNRELATED_CHANGES: YES except for this named ownership completion (no prior finding/pin/verdict/evidence value in §0–§13 altered).
NEW_RESULT_SHA256: recorded in the pointer file.
SUBJECT_PINS: unchanged (same four). REPO_WRITES: none. BUILD/TEST/RUNTIME/DB/NET: none. MIGRATION/REDESIGN/DISPATCH: none.
```

## 0. Actor / Runtime Identity

- Actor: `foundation-control` (internal Control actor of the Foundation Team; reports to `foundation-advisor`).
- Live model: `claude-opus-4-8[1m]` (Opus 4.8, 1M context) — verified from live session runtime, not inferred from session name.
- Live effort: `high` (session default set via `/effort high`).
- Required skill: `NONE` for this WorkUnit (no `/fable-*` skill loaded; read-only static evidence task).
- tmux runtime (live `display-message`): socket `/tmp/tmux-1000/default` · session `foundation-control` · window `0:claude` · pane `0` (pane_id `%4`, pane_pid `298059`).
- Workspace: `/home/leo/Project/foundation-control` (pane_current_path == cwd) · OS user `leo` · live branch `shadow/m5-ingress-gate`.
- Mode executed: read-only static, committed-object inspection only (`git show`/`git grep`/`ls-tree` at each pin). No subagent, no dispatch, no write to any product/control repo.

## 1. Current Role Reads (authority applied)

Read directly, in precedence order:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md` — Status `ACTIVE`. Current authority for Team/Actor/role/routing. `foundation-control` = internal Control actor under `foundation-advisor`; a subordinate never routes to another subordinate; results return to the responsible Advisor.
- `/home/leo/Project/agent-office/docs/agent/roles/control.md` — Status `ACTIVE`. Control = design/contract coordination only; **no** runtime/schema/DB/impl; no self-assignment, dispatch, self-review, or approval; returns a bounded design/contract evidence artifact + pointer to Advisor.
- `/home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md` — durable evidence at exact result/pointer paths; chat is not evidence.
- `/home/leo/Project/foundation-control/docs/agent/RUN_PROTOCOL.md` + `RESULT_REPORTING_PROTOCOL.md` — repo-local launcher-first + 3-block chat rule (`RESULT SUMMARY` / `NEXT ACTION ROUTING` / `POINTER BLOCK`).
- `AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md` — header `SUPERSEDED_HISTORICAL_EVIDENCE` (2026-07-14); treated as evidence only, not authority.

Boundary honored: this WorkUnit is Control-mode evidence coordination. No implementation, no review verdict, no branch/ref movement, no cross-project dispatch.

## 2. Exact Git Pre/Post State — Write Zero

All four subjects were inspected at their pinned commits. Each pin was verified as a valid commit object and equal to its branch tip and HEAD. Working trees carry **untracked** files only (pre-existing dirt, disclosed, untouched); zero tracked modifications.

| Repo | Path | Branch | Pin (== HEAD pre & post) | Tracked-modified | Untracked (pre-existing, untouched) |
|---|---|---|---|---|---|
| COSMILE | /home/leo/Project/Cosmile | shadow/m4-cosmile-memory | `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` | 0 | 6 |
| FOUNDATION | /home/leo/Project/FOUNDATION | shadow/foundation-shared-memory-v0 | `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` | 0 | 2 |
| SIASIU (boundary-only) | /home/leo/Project/SIASIU | shadow/m4-siasiu-memory | `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602` | 0 | 3 |
| CONTROL | /home/leo/Project/foundation-control | shadow/m5-ingress-gate | `c89b792bed177aad9322e09debecc76caab0c8a0` | 0 | 33 |

- `PRODUCT_OR_CONTROL_REPOSITORY_WRITE = ZERO` (verified: post HEAD == pin, tracked-modified == 0 for all four).
- `BRANCH_OR_REF_MOVEMENT = ZERO`. `BUILD_LINT_TEST_RUNTIME = NONE`. `DB_ENDPOINT_NETWORK_VENDOR = NONE`.
- Writes performed: only `RESULT_PATH` and `POINTER_PATH` under the foundation-docs runs worktree (the sole `ALLOWED_WRITE`). No commit/push.

## 3. Ownership / Source-of-Truth Map (committed evidence)

### 3.1 The "Foundation brain" on the commercial path is a CONTROL-owned service

- Cosmile calls a single brain HTTP surface: `POST ${FOUNDATION_API_URL:-http://127.0.0.1:8731}/v1/consult_contract`
  (`Cosmile app/src/adapters/foundationClient.ts:5,9,76`).
- That endpoint is **served by foundation-control**, not the FOUNDATION repo:
  - `foundation-control/foundation_http_service/server.py:16,65,77` (binds `FDSH_PORT` default `8731`; routes `/v1/consult/judge` and `/v1/consult_contract`).
  - `foundation-control/foundation_http_service/core.py:1584 consult_contract(ssc)` → `1622 consult_chat(payload)` (judge/policy/severity/retrieval/enforcement/verify core) → `contracts.build_frc` → `assert_frc_invariants`.
  - `consult_chat` (the decision/safety core) is **defined in the control service itself** (`core.py:1164`); `core.py` imports only sibling control modules (`profiles`, `retrieval_provider`, `deepseek_composer`, `llm_guard`, `patha_reasoning`, `semantic_router`, `contracts`, local `ssbrain/`) — **no import from the FOUNDATION repo**.
- Search of the pinned **FOUNDATION** repo (`33570b9…`) for `consult_contract` / `consult/judge` / `ssc-1.0` / `build_frc` in runtime code → **no matches**. The pinned FOUNDATION repo does not physically serve the commercial consult contract.
- The service self-labels this as transitional: `semantic_router` import comment — "transitional scaffold … 장기 소유는 Service Semantic Adapter; Foundation은 구조화 semantic contract 소비/검증 + policy/safety gate."

> Evidence statement (no redesign): For the commercial critical path, decision/safety/evidence is **currently produced by the control-owned `foundation_http_service`**, which contains its own judgment core, and does **not** invoke the pinned FOUNDATION repo. Whether this matches the intended long-term Foundation-owns-decision constitution is a decision for Leo/GPT, not this audit → status **`CONTRADICTION_CANDIDATE` / to-confirm**, reported as evidence only.

### 3.2 Identifier / data ownership

| Identifier / data | Owner (source of truth) | Where seen (committed) | Notes |
|---|---|---|---|
| `canonicalProductId`, `canonicalBrandId` | Foundation product core (today **local mock** in Cosmile) | `Cosmile app/src/lib/foundationProductClient.ts` | "Cosmile이 canonical 상품을 읽는 유일한 통로. 지금 = mock." Swap impl only when real. |
| `commerceProductId`, `sku`, `price`, `listPrice`, `stock`, `salesStatus` | **Cosmile** commerce | `foundationProductClient.ts toCosmileView()` (mockCommerce → Cosmile DB `ProductCommerce`) | Commerce-owned sale fields, distinct from canonical identity. |
| SSC `product_context.catalog_candidates[].product_id` | Cosmile supplies **refs only**; Foundation reads | `foundationClient.ts` Ssc type; `consult-foundation/route.ts` | "refs만 · Foundation top-level read." |
| FRC `product_candidates`, `products_allowed`, `recommendation_allowed`, `safety_gate_result`, `final_strategy` | **Foundation/decision service** (Cosmile consumes, never re-derives) | `foundationClient.ts` Frc type | "Foundation 소유(재파생 금지)." |
| `foundation_user_ref` (`furef_…`) | **Service-local** generation (Option B); Foundation gets opaque ref only | `Cosmile app/src/lib/foundation/foundationUserRef.ts`; `consult-foundation/route.ts:41` | Opaque deterministic ref; raw userId/guestId never sent; SIASIU parity. |
| Consultation session / question / explanation flow | **SIASIU** (ontology owner); Cosmile access = `forbidden` | `Cosmile app/src/types/ontology.ts:50-53` | Type-level boundary only; no runtime call. |

## 4. Contract & Dependency Evidence Rows

| # | Subject | Evidence (committed) | Finding |
|---|---|---|---|
| C1 | Cosmile→brain transport | `foundationClient.ts` | HTTP POST `/v1/consult_contract`; `TIMEOUT_MS` default **60000** (env `FOUNDATION_HTTP_TIMEOUT_MS`), `RETRY` default **1**. Fail/timeout/5xx/404/`error_code` → `{ok:false}`. |
| C2 | SSC contract version | Cosmile `contract_version:"ssc-1.0"`; control `contracts.py:10 SSC_VERSION="ssc-1.0"` | **Parity.** Service normalizes any other version to `ssc-1.0` and records an error note (`contracts.py:43-45`). |
| C3 | FRC contract | Cosmile `Frc` type; control `contracts.py:167 build_frc`, `199 contract_version=FRC_VERSION`, `226 assert_frc_invariants` | FRC fields align; Cosmile consumes/echoes, never re-derives. Invariants asserted service-side. |
| C4 | Canonical vs judge endpoint | `foundationClient.ts:2` ("judge 사용 금지"); `server.py:65,71` | Canonical = `/v1/consult_contract`. `/v1/consult/judge` exists but blocks `semantic_override` injection (safety: scaffold/bypass prevention). |
| C5 | **Stale control contract doc** | `foundation-control/contracts/COSMILE_FOUNDATION_HTTP_CONTRACT_V0.json` (dated 2026-06-30) | Documents only `/v1/consult/judge` + `/v1/recommend` and `FOUNDATION_HTTP_TIMEOUT_MS: 3000`. Does **not** describe the current canonical `/v1/consult_contract` (SSC/FRC) surface, nor the corrected 60s client timeout. **Contract-truth drift** vs CONTRACT-01. |
| C6 | Duplicate/parallel consult paths | routes below | See §5. One canonical + one quarantined-legacy consult path; one evidence bridge. |
| C7 | Ingress gate (current branch WIP) | `foundation_http_service/ingress_gate.py:17 SHADOW_MODE=True` | `shadow/m5-ingress-gate`: judgment-only, **no hard reject** (default-OFF). Self-noted `★BUG-1` scrub-gap comment present (control-owned WIP; not in this audit's scope to fix). |

### 4.1 Impact Projection for C1–C7 (structured; findings unchanged, no policy selected)

Projection only — derived from the §4 evidence rows. `BLOCKING` = would this, as-is, block that stage on a strict reading of the evidence. Owner/followup are routing suggestions for Advisor/Leo, not decisions.

```text
C1  Cosmile→brain transport (60s timeout, retry 1, fail→ok:false fail-closed)
    PAID_BETA_IMPACT:    LOW  — fail-closed is safe; 60s worst-case latency is a UX risk, not a safety risk
    PUBLIC_LAUNCH_IMPACT: MEDIUM — 60s tail latency + single retry needs load/timeout tuning before public scale
    BLOCKING:            NO (paid beta) / NO-with-tuning (public)
    REQUIRED_OWNER:      foundation-control (service) + Cosmile (client env)
    REQUIRED_FOLLOWUP:   E3 latency/timeout characterization under dev/shadow load

C2  SSC version parity ssc-1.0 (both sides; service normalizes+notes mismatch)
    PAID_BETA_IMPACT:    LOW  — parity holds today
    PUBLIC_LAUNCH_IMPACT: LOW
    BLOCKING:            NO
    REQUIRED_OWNER:      foundation-control (contracts.py) + Cosmile (foundationClient types)
    REQUIRED_FOLLOWUP:   keep under the C-diff harness (see §12 E3-4) to catch future drift

C3  FRC contract + assert_frc_invariants (Cosmile consumes, never re-derives)
    PAID_BETA_IMPACT:    LOW
    PUBLIC_LAUNCH_IMPACT: LOW
    BLOCKING:            NO
    REQUIRED_OWNER:      foundation-control (service) as FRC producer
    REQUIRED_FOLLOWUP:   confirm invariant coverage empirically at E3

C4  Canonical /v1/consult_contract vs /v1/consult/judge (judge blocks semantic_override)
    PAID_BETA_IMPACT:    LOW  — canonical path is the live one; judge injection guarded
    PUBLIC_LAUNCH_IMPACT: MEDIUM — dual endpoint on one port is a surface-area/retirement risk
    BLOCKING:            NO
    REQUIRED_OWNER:      foundation-control (endpoint surface) + Cosmile (path B retirement)
    REQUIRED_FOLLOWUP:   plan Path B retirement (ties to C6)

C5  Stale V0 HTTP contract doc (/v1/consult/judge + 3000ms) vs canonical CONTRACT-01
    PAID_BETA_IMPACT:    MEDIUM — only committed cross-project HTTP contract artifact is misleading; can misdirect sequencing
    PUBLIC_LAUNCH_IMPACT: MEDIUM
    BLOCKING:            NO (runtime) — but recommended fix-first (doc truth), see §8
    REQUIRED_OWNER:      foundation-control (contracts/ doc)
    REQUIRED_FOLLOWUP:   supersede/update V0 → CONTRACT-01 (doc-only, no runtime change)

C6  Duplicate consult paths A(live) vs B(debug-only, slice+NODE_ENV gated)
    PAID_BETA_IMPACT:    LOW  — B is prod-gated off; A is the only production-regime path
    PUBLIC_LAUNCH_IMPACT: MEDIUM — B must be provably unreachable in prod before public launch
    BLOCKING:            NO (paid beta) / verify-before (public)
    REQUIRED_OWNER:      Cosmile (route retirement) + foundation-control (endpoint)
    REQUIRED_FOLLOWUP:   E3 assert B disabled when NODE_ENV=production / slice OFF

C7  Ingress gate SHADOW_MODE=True (default-OFF, no hard reject) + self-noted BUG-1 scrub gap
    PAID_BETA_IMPACT:    LOW  — inert by default; no live blocking effect
    PUBLIC_LAUNCH_IMPACT: MEDIUM — if M6 activates hard reject, BUG-1 scrub gap must be closed+reviewed first
    BLOCKING:            NO while shadow/OFF; BLOCKING for any M6 hard-reject activation
    REQUIRED_OWNER:      foundation-control (foundation_http_service/ingress_gate.py)
    REQUIRED_FOLLOWUP:   separate M6 activation train w/ independent review (out of this WorkUnit's scope)
```

## 5. Call-Path Topology — Duplicate / Conflicting vs Contained

- **Path A — Canonical (live commercial path):** `Cosmile /api/slice/consult-foundation` → `callFoundationContract` → `POST /v1/consult_contract` (SSC→FRC). Single import site of `callFoundationContract` (`consult-foundation/route.ts:5,52`).
- **Path B — Legacy judge (quarantined):** `Cosmile /api/slice/consult` (`route.ts` header: "DEBUG-ONLY 잔존", slice-gated, `NODE_ENV!=='production'`) and `/api/consultation/foundation-dev` → `foundationConsultationClient` → `httpFoundationJudge` → `POST /v1/consult/judge`. Explicitly marked debug-only, separate retirement plan, not deleted.
- **Path C — Evidence bridge (console/admin only):** `Cosmile foundationBridge.ts` → `makeHttpBridge()`; mode `http|disabled` (mock **retired** → unavailable, never mock-served); `guarded()` isolates failures so **checkout/cart/order/admin are non-blocking**. Consumed by `/api/console/foundation/*`.

> Duplicate/conflicting path = **A vs B** (two consult endpoints, both defaulting to `:8731`). The conflict is **contained** by a slice flag + `NODE_ENV!=='production'` gate on B. Retirement of B is deferred, not done. No conflicting path is active in a production regime by static reading.

## 6. Continuity / Failure Semantics (degraded behavior)

- **Safety-dependent path fails closed, does not guess:** on `{ok:false}` the consult route returns HTTP 502 `foundation_unavailable`, `catalog.products=[]`, **no mock fallback, no fabricated recommendation** (`consult-foundation/route.ts`, tail block; comment: "실패 시 mock으로 대체하지 않는다 … 가짜 추천 0"). `foundation_user_ref` fail-closed → 503, no silent anonymous.
- **Service can only raise safety, never lower it:** `cosmileResponseAdapter.decideResponseMode` — `hardStop = block ∨ final_strategy==safety_first ∨ serviceSafetyDetector`; even if FRC abnormally returns `products_allowed=true` under `block`, service forces products/reco = 0 (defense-in-depth, stricter than Foundation, never relaxes). `enforceResponseSuppression`: `products_allowed=false`→refs/cards/CTA 0; `recommendation_allowed=false`→reco 0; suppression applied to FRC echo (suppressed refs never leak in payload).
- **Ordinary commerce is independent of the brain service:** `checkout/start`, `orders`, `wishlist` routes import **zero** Foundation code. `cart/route.ts` uses `foundationProductClient.getProduct()` which is **local mock**, not a network call, and tolerates `null`. Evidence bridge (Path C) is failure-isolated.

> **Architecture guardrail (Task 5): SUPPORTED by static evidence.** Foundation/AI unavailable is not guessed around for safety-dependent answers (fail-closed 502, zero products). Ordinary catalog/wishlist/cart/checkout/order remain operable with the brain service down. No source-defined rule was found that blocks ordinary commerce on brain availability.

## 7. Independent / Joint Task Map

- **Cosmile independent:** commerce runtime (cart, checkout, orders, wishlist, coupons, group-deal), commerce events, semantic/response adapters, local product catalog (mock today). No live brain dependency.
- **Foundation (repo) independent:** canonical judgment/safety/evidence logic — **but note §3.1**: the live commercial judgment currently runs in the control-owned service, not the pinned FOUNDATION repo. Reconciling repo ownership of `consult_chat` is a Foundation/Leo decision, not commerce-blocking.
- **foundation-control owns (integration surface):** `foundation_http_service` (`/v1/consult_contract`, `/v1/consult/judge`, SSC/FRC `contracts.py`, `ingress_gate.py`), the HTTP contract docs. This is the actual seam between Cosmile and the brain.
- **Joint / integration (needs both):** SSC/FRC version parity upkeep; canonicalProductId ↔ catalog_candidates ref mapping; timeout/failure semantics; **V0 doc → CONTRACT-01 sync** (C5).
- **Optional / deferred:** retire Path B (`/v1/consult/judge` + `/api/slice/consult` debug route); swap `foundationProductClient` mock → real Foundation product core; ingress-gate M6 activation (currently shadow/OFF).

## 8. Shared Contract to Fix First (evidence-backed recommendation — not a decision)

Recommended first fix: **reconcile the control-side HTTP contract source-of-truth** — either (a) update/replace `contracts/COSMILE_FOUNDATION_HTTP_CONTRACT_V0.json` to describe the canonical `/v1/consult_contract` SSC(`ssc-1.0`)/FRC surface and the 60s timeout, or (b) publish a CONTRACT-01 doc that supersedes V0 with a visible pointer. Rationale: V0 is the only committed cross-project HTTP contract artifact and it currently describes a non-canonical endpoint set and a stale (3000ms) timeout, which can misdirect Paid Beta sequencing. This is a documentation/contract-truth fix with no runtime behavior change. **Recommendation only; Advisor/Leo owns the decision.**

## 9. SIASIU-Dispatch Recommendation

- Static committed evidence: Cosmile has **zero runtime call into SIASIU**. All 61 `siasiu` hits are docs/comments/ontology-owner enum/type boundaries (`ontology.ts`, `types.ts`, `foundationBridge.ts` facade comment, `foundationUserRef.ts` "SIASIU parity" note). The brain seam is Foundation HTTP (control-served).
- **Recommendation: SIASIU Worker dispatch is NOT required for this commercial baseline.** No load-bearing SIASIU fact changes the intended commercial decision. Boundary-only inspection stopped at the first sufficient answer, as instructed. Deeper SIASIU internals → **`UNVERIFIED` (intentionally not opened)**; opening them would not change the commercial decision.

## 10. Branch-Option Evidence (no selection, no movement)

- All four pins sit on `shadow/*` milestone branches (Cosmile `m4-cosmile-memory`, FOUNDATION `foundation-shared-memory-v0`, SIASIU `m4-siasiu-memory`, control `m5-ingress-gate`); **none on `main`/prod/live**. `api_live=false` and write-disabled flags observed service-side (`foundation_http_service` label "api_live=false · no real write"; `feature_flags.py` HARD_OFF list).
- The full commercial critical path (consult_contract client + adapters + commerce routes) **is present on the Cosmile `shadow/m4-cosmile-memory` pin**; the serving contract is present on control `shadow/m5-ingress-gate` (with ingress gate default-OFF/shadow).
- Evidence for a commercial branch-baseline: the current Cosmile m4 pin is self-consistent for commerce + fail-closed consult. The control m5 branch adds shadow ingress scrubbing (inert by default) plus a self-noted WIP scrub gap. Provided as evidence for Advisor/Leo branch selection — **this audit selects/moves nothing.**

## 11. Blockers / Unknowns (UNVERIFIED — static ceiling)

- U1: Actual process bound to `:8731` at runtime is **UNVERIFIED** (runtime/network prohibited). Static evidence: control `foundation_http_service/server.py` is the implementer; both `/v1/consult_contract` and `/v1/consult/judge` share the port.
- U2: Whether long-term ownership of `consult_chat`/judgment moves from the control service into the FOUNDATION repo — **UNVERIFIED / decision-pending** (see §3.1). Reported as contradiction-candidate vs constitution, not resolved.
- U3: `ingress_gate.py` self-noted `★BUG-1` scrub-gap — observed as a control-owned WIP comment; **not evaluated or fixed** (out of scope; SHADOW_MODE OFF means no live effect).
- U4: SIASIU internals beyond the Cosmile boundary — **UNVERIFIED by design.**

## 12. Exact Later E3 / E4 Requests (for Advisor to authorize if desired)

- E3-1 (dynamic, still no prod): with Foundation/`foundation_http_service` up on `:8731` in a dev/shadow sandbox, run the existing Cosmile `app/scripts/dual-adapter-eval.mjs` (asserts `source=foundation_http`, `endpoint=/v1/consult_contract`) and `dual-adapter-fallback-eval.mjs` (fail-closed) to confirm §6 continuity empirically. `BUILD/TEST/RUNTIME` currently PROHIBITED at E2 — request E3 authorization.
- E3-2: confirm which server binds `:8731` (resolve U1) via a local health probe in an isolated sandbox.
- E3-4 (local execution — reclassified from E4-1 per CORRECTION_1): cross-repo contract-diff harness comparing control `contracts.py` SSC/FRC ↔ Cosmile `foundationClient.ts` types ↔ V0 doc, to mechanically detect drift (would formalize C5/C2/C3). This is static-file comparison runnable locally in a sandbox — no integration/network — so it belongs at E3, not E4.
- E4 remains reserved for genuine cross-service **integration** evidence (live Cosmile↔service request/response over the wire); no E4 item is proposed by this WorkUnit.

## A. Commercial Foundation Ownership Map — COMPLETION_1

Founder direction applied (`06_STRATEGY_FOUNDER_DIRECTION_CLARIFICATION.md`, 2026-07-17): historical Control location is **evidence, not current authority**; future Foundation product implementation belongs to the `foundation` actor + Foundation repo under separately approved missions. Authorship is not retroactively relabeled.

### A.0 Top-level tracked surface inventory at Control pin `c89b792`

`foundation_http_service/`(19) · `foundation_consultation/`(6) · `caller_intake/`(5) · `cosmile_loop/`(11) · `contracts/`(5) · `repos/`(3 symlinks) · `scripts/`(22) · `tests/`(25) · `memory_sim/`(2) · plus `docs/ reports/ 설계자료/ ARCHITECTURE_CONSTITUTION.md CLAUDE.md README.md` (doc/report — boundary-only).

### A.1 Load-bearing structural fact — TWO parallel Foundation-integration stacks physically in Control

- **Stack A — HTTP service (`foundation_http_service/`).** Self-contained; judgment core `consult_chat` defined in-repo; **imports nothing from the FOUNDATION repo**. This is the **only** surface Cosmile's commercial path calls (`:8731 /v1/consult_contract`).
- **Stack B — in-process Python (`foundation_consultation/` + `caller_intake/` + `cosmile_loop/`).** These **do** import the FOUNDATION repo via a sys.path bootstrap (`foundation_consultation/foundation_api_client.py`: `from foundation.api import foundation_core_adapter/_contract`, `import foundation_knowledge_runtime`; `cosmile_loop/..consultation_adapter.py`: `from foundation.cosmile import cosmile_b2b_inquiry_adapter`). They are **read-only/mock/shadow eval harnesses driven by 5 scripts + 21 tests**, are **not** imported by the live server (Stack A), and are **not** callable by the Cosmile Next.js product. Stack B is a parallel/reference integration mechanism, not the live commercial provider.

> Decision-relevant consequence: the surface that is *live for commerce* (Stack A) does **not** use the FOUNDATION repo, while the surface that *does* use the FOUNDATION repo (Stack B) is **not** live for commerce. This is the central ownership-truth item for Advisor/Leo.

### A.2 Capability ownership records

```text
CAP-01  Commercial consult decision endpoint (/v1/consult_contract · SSC ssc-1.0 → FRC)
  CURRENT_PHYSICAL_LOCATION: foundation-control/foundation_http_service/ (server.py, core.py:consult_contract→consult_chat, contracts.py)
  CURRENT_RUNTIME_PROVIDER: foundation-control (self-contained; no FOUNDATION-repo import)
  CANONICAL_PRODUCT_OWNER: Foundation (decision/safety/evidence per constitution)
  FUTURE_RESPONSIBLE_ACTOR: foundation
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: CURRENT_PROVIDER (self-labeled transitional scaffold)
  CURRENT_CALLER_OR_CONSUMER: Cosmile /api/slice/consult-foundation (live commercial path)
  LOAD_BEARING_FOR_PAID_BETA: YES
  EVIDENCE: server.py:16,77 · core.py:1164,1584,1622 · contracts.py:10 · DAY1 §3.1
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: decide whether judgment core is owned/served by Foundation repo vs remains a control service surface
  PRIORITY: P0

CAP-02  SSC/FRC contract schema (validate_ssc / build_frc / assert_frc_invariants)
  CURRENT_PHYSICAL_LOCATION: foundation-control/foundation_http_service/contracts.py
  CURRENT_RUNTIME_PROVIDER: foundation-control
  CANONICAL_PRODUCT_OWNER: Foundation (contract authority)
  FUTURE_RESPONSIBLE_ACTOR: foundation
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: CURRENT_PROVIDER
  CURRENT_CALLER_OR_CONSUMER: core.py (producer) + Cosmile foundationClient.ts (mirror types)
  LOAD_BEARING_FOR_PAID_BETA: YES
  EVIDENCE: contracts.py:10,167,199,226 · DAY1 C2/C3
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: fix canonical location of SSC/FRC contract-of-record
  PRIORITY: P0

CAP-03  Judgment sub-core (semantic_router, patha_reasoning, retrieval_provider, llm_guard, deepseek_composer, profiles, ssbrain/)
  CURRENT_PHYSICAL_LOCATION: foundation-control/foundation_http_service/*
  CURRENT_RUNTIME_PROVIDER: foundation-control (self-contained)
  CANONICAL_PRODUCT_OWNER: Foundation (reasoning/retrieval/safety); raw-utterance semantic long-term = Service Semantic Adapter
  FUTURE_RESPONSIBLE_ACTOR: foundation (+ service adapter for input semantics, per constitution)
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: CURRENT_PROVIDER / transitional scaffold (semantic_router self-labeled)
  CURRENT_CALLER_OR_CONSUMER: core.consult_chat
  LOAD_BEARING_FOR_PAID_BETA: YES
  EVIDENCE: core.py:13-18 imports · semantic_router import comment
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: which reasoning/retrieval pieces belong in Foundation repo vs service adapter
  PRIORITY: P0

CAP-04  HTTP contract-of-record document
  CURRENT_PHYSICAL_LOCATION: foundation-control/contracts/COSMILE_FOUNDATION_HTTP_CONTRACT_V0.json
  CURRENT_RUNTIME_PROVIDER: N/A (doc artifact)
  CANONICAL_PRODUCT_OWNER: Foundation (contract authority) · Control coordinates
  FUTURE_RESPONSIBLE_ACTOR: foundation (+ control coordination)
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: STALE (documents /v1/consult/judge + 3000ms; not canonical /v1/consult_contract). CONTRACT_V1.md is the *cosmile_loop* decision contract (Stack B), not the HTTP surface.
  CURRENT_CALLER_OR_CONSUMER: human/Advisor reference
  LOAD_BEARING_FOR_PAID_BETA: CONDITIONAL (doc truth; misdirects sequencing if trusted)
  EVIDENCE: HTTP_CONTRACT_V0.json:16 · CONTRACT_V1.md:5 · DAY1 C5/§8
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: supersede/update V0 → canonical CONTRACT-01 (doc-only)
  PRIORITY: P0

CAP-05  Legacy/secondary HTTP endpoints (/v1/consult/judge, /v1/consult/chat, /v1/recommend, /v1/schema/validate, /foundation/brain/chat)
  CURRENT_PHYSICAL_LOCATION: foundation-control/foundation_http_service/server.py, core.py
  CURRENT_RUNTIME_PROVIDER: foundation-control
  CANONICAL_PRODUCT_OWNER: Foundation
  FUTURE_RESPONSIBLE_ACTOR: foundation
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: SECONDARY/LEGACY (judge consumed only by Cosmile debug-only Path B; semantic_override injection blocked on judge)
  CURRENT_CALLER_OR_CONSUMER: Cosmile /api/slice/consult + /api/consultation/foundation-dev (slice + NODE_ENV!=production gated)
  LOAD_BEARING_FOR_PAID_BETA: NO (CONDITIONAL — prod-gated off; verify unreachable before public)
  EVIDENCE: server.py:65,71 · core.py:1722-1723 · DAY1 C4/C6/§5
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: retirement plan for judge/Path B
  PRIORITY: P1

CAP-06  Ingress default-deny gate (M6-C shadow)
  CURRENT_PHYSICAL_LOCATION: foundation-control/foundation_http_service/ingress_gate.py
  CURRENT_RUNTIME_PROVIDER: foundation-control (SHADOW_MODE=True → inert, no hard reject)
  CANONICAL_PRODUCT_OWNER: Foundation (safety/ingress gate)
  FUTURE_RESPONSIBLE_ACTOR: foundation
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: CURRENT_SHADOW_SCAFFOLD (default-OFF; self-noted BUG-1 scrub gap)
  CURRENT_CALLER_OR_CONSUMER: consult_contract entrypoint (inert wiring)
  LOAD_BEARING_FOR_PAID_BETA: NO while shadow/OFF; BLOCKING for any M6 hard-reject activation
  EVIDENCE: ingress_gate.py:2-4,17,228 · DAY1 C7
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: M6 activation train (separate, independent review) + close BUG-1 first
  PRIORITY: P1

CAP-07  In-process Foundation consultation client (Stack B core)
  CURRENT_PHYSICAL_LOCATION: foundation-control/foundation_consultation/ (foundation_api_client.py, harness, eval_core, fixtures)
  CURRENT_RUNTIME_PROVIDER: foundation-control harness → imports FOUNDATION repo (foundation.api.*, foundation_knowledge_runtime, foundation_retrieval_hit_contract, foundation_trace_redaction_guard) via _found_bootstrap sys.path
  CANONICAL_PRODUCT_OWNER: Foundation
  FUTURE_RESPONSIBLE_ACTOR: foundation
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: REFERENCE/EVAL (parallel integration mechanism; NOT the live HTTP provider; NOT called by Cosmile product)
  CURRENT_CALLER_OR_CONSUMER: caller_intake bridge + foundation_consultation harness + scripts/tests
  LOAD_BEARING_FOR_PAID_BETA: NO (control-internal read-only/shadow eval)
  EVIDENCE: foundation_api_client.py:10-14,71 · usage 5 scripts/21 tests · A.1
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: decide if the real Foundation-repo-backed path (Stack B) or the self-contained service (Stack A) is the intended commercial provider
  PRIORITY: P1

CAP-08  Caller intake — intent/risk classification + Foundation routing
  CURRENT_PHYSICAL_LOCATION: foundation-control/caller_intake/ (intent_risk_classifier.py, intent_risk_contract.py, intake_foundation_bridge.py, fixtures)
  CURRENT_RUNTIME_PROVIDER: foundation-control (read-only/mock/shadow; routes through Stack B foundation_api_client)
  CANONICAL_PRODUCT_OWNER: Foundation (risk classification) · Service Semantic Adapter (input intent) per constitution
  FUTURE_RESPONSIBLE_ACTOR: foundation (+ service intake adapter)
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: REFERENCE/EVAL harness
  CURRENT_CALLER_OR_CONSUMER: tests/scripts/eval (no live Cosmile wiring found; Cosmile uses its own cosmileSemanticAdapter)
  LOAD_BEARING_FOR_PAID_BETA: NO (UNVERIFIED any live commercial wiring; static = none)
  EVIDENCE: intake_foundation_bridge.py:4,7,11,22
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: whether intent/risk intake belongs to Foundation vs service adapter for commerce
  PRIORITY: P2

CAP-09  Cosmile AI Commerce Decision Loop (v0.1 harness) + decision adapters
  CURRENT_PHYSICAL_LOCATION: foundation-control/cosmile_loop/ (loop + product_judgment/recommendation/do_not_buy/memory_reuse/trust_trace adapters, decision_schema, feature_flags)
  CURRENT_RUNTIME_PROVIDER: foundation-control (read-only/mock/shadow; consultation adapter imports foundation.cosmile)
  CANONICAL_PRODUCT_OWNER: decision/safety = Foundation; commerce loop application = Cosmile
  FUTURE_RESPONSIBLE_ACTOR: foundation (decision) + cosmile (commerce loop application)
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: REFERENCE/EVAL harness — NOT the live Cosmile product (Cosmile = Next.js; cannot import these Python adapters)
  CURRENT_CALLER_OR_CONSUMER: scripts/cosmile_ai_commerce_loop_eval + tests (per CLAUDE.md v0.1 112/112)
  LOAD_BEARING_FOR_PAID_BETA: NO (eval harness, not product runtime)
  EVIDENCE: consultation_adapter.py:9,31,55 · contracts/CONTRACT_V1.md:5 · A.1
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: whether the loop contract (V1) governs the real Cosmile+Foundation commercial path or stays a control model
  PRIORITY: P2

CAP-10  Mock foundation memory gate (simulation)
  CURRENT_PHYSICAL_LOCATION: foundation-control/memory_sim/mock_foundation_gate.py
  CURRENT_RUNTIME_PROVIDER: foundation-control (explicit control mock — "Foundation repo 구현이 아니다")
  CANONICAL_PRODUCT_OWNER: Foundation (memory reuse decision / gate)
  FUTURE_RESPONSIBLE_ACTOR: foundation
  LEGACY_DUPLICATE_DEAD_OR_UNVERIFIED: MOCK / BOUNDARY-ONLY
  CURRENT_CALLER_OR_CONSUMER: memory simulation tests
  LOAD_BEARING_FOR_PAID_BETA: NO
  EVIDENCE: mock_foundation_gate.py:4,28,62
  LATER_OWNERSHIP_OR_MIGRATION_DECISION: none for commercial baseline (mock)
  PRIORITY: P2

BOUNDARY-ONLY (not commercial capabilities): repos/{cosmile,foundation,siasiu} symlinks (reference); docs/ reports/ 설계자료/ (history/design); contracts/{CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md, SIASIU_FOUNDATION_CONTRACT_BASELINE_...} (memory/SIASIU scope, not commercial critical path).
```

### A.3 Classification summary of Control-located surfaces

- **CURRENT RUNTIME PROVIDERS (live commercial):** CAP-01, CAP-02, CAP-03 (all Stack A, `foundation_http_service`). CAP-05 is a live-but-secondary endpoint set (prod-gated consumer).
- **CURRENT SHADOW/SCAFFOLD (inert, default-OFF):** CAP-06 (ingress gate).
- **DUPLICATE / REFERENCE / EVAL (not live commercial):** CAP-07, CAP-08, CAP-09 (Stack B + loop harness).
- **MOCK / BOUNDARY-ONLY:** CAP-10, plus `repos/` symlinks and doc/report trees.
- **DEAD/UNREACHABLE:** none positively identified as dead; Path B (CAP-05 consumer) is quarantined, not dead. **TEST-ONLY drivers:** the 5 scripts + 21 tests that exercise Stack B/loop.

### A.4 Prioritized later ownership/decision list (evidence-backed; NOT authorization to move/patch/migrate)

- **P0-1 (CAP-01/03):** Decide the contract-of-record location and future owner of the live judgment/safety core — it is physically control-owned and self-contained, but canonical owner + future actor = Foundation. Must be decided before any paid-beta implementation depends on it.
- **P0-2 (CAP-02/04):** Fix SSC/FRC contract truth: designate canonical SSC/FRC source and supersede/update the stale HTTP V0 doc to the canonical `/v1/consult_contract` surface.
- **P0-3 (A.1):** Resolve the two-stack ambiguity — which of Stack A (self-contained service) or Stack B (FOUNDATION-repo-backed) is the intended commercial provider. Decision-blocking for ownership truth.
- **P1-1 (CAP-05):** Path B / judge retirement plan and prod-unreachability verification.
- **P1-2 (CAP-06):** M6 ingress activation as a separate reviewed train; close self-noted BUG-1 first.
- **P1-3 (CAP-07/08):** Ownership split for intent/risk intake (Foundation vs service adapter).
- **P2 (CAP-09/10):** Clarify whether the cosmile_loop V1 contract governs the real commercial path or remains a control model; mock gate needs no commercial action.

`P0` = ownership/contract truth to decide before affected paid-beta implementation; it does **not** authorize migration.

### A.5 Scope statement

The completion stayed **within the approved commercial audit**. Only commercial-relevant Foundation surfaces were inspected to their first sufficient ownership/call boundary; `memory_sim`, `repos/`, docs/reports, and memory/SIASIU contract artifacts were treated as boundary-only. No every-file line review. No product/Control write, build, test, runtime, DB, network, migration, deprecation, redesign, dispatch, or next mission. No gap requiring a stop was encountered.

## 13. Close

```text
WRITE_ZERO: product/control repos unchanged (HEAD==pin, tracked-modified=0, all four)
BRANCH_OR_REF_MOVEMENT: ZERO
ALLOWED_WRITE_USED: RESULT_PATH + POINTER_PATH only (foundation-docs runs worktree)
COMMIT_OR_PUSH: NO
NEW_AGENT_OR_SUBAGENT: NONE
SCOPE: not broadened; no dispatch, no review verdict, no policy/architecture/risk/release decision, no Memory V3 resume
RETURN_TO: foundation-advisor
STOP
```
