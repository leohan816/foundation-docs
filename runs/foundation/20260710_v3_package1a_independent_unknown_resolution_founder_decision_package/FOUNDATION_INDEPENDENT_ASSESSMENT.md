# FOUNDATION INDEPENDENT ASSESSMENT — V3 Package 1A Frozen Unknown Register (U-01..U-09)

Status: `BLIND_FIRST_PASS_CORRECTED` (rework closing F-P1, F-F1, F-S1, F-V1 per `16_FOUNDATION_RESULT_VALIDATION.md`)
Date: 2026-07-10 (first pass); corrected same day
Actor: Foundation Worker (same existing session; DISCOVERY_ONLY_READ_ONLY)
Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`
Return to: Advisor

## 0. Register verification, process disclosure, and independence

### 0.1 Register verification
- Register: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/V3_PACKAGE1A_UNKNOWN_REGISTER.md`
- Freeze commit `fab82c45f7e92ed2652dc6de9db55532fabb661b` verified present ("docs(advisor): freeze V3 Package 1A unknown register").
- Register blob at freeze commit = `0eac3e290269c5154029d79864b99c9235807013` = current working-tree blob (unchanged since freeze).
- Register SHA-256 verified: `dab0ffa15452db860d3ba6f71b58401d4447e81b811c22c3c4a87a379f26e0cb` (match).
- Register NOT edited. Findings beyond the nine unknowns appear only in Appendix C.

### 0.2 Process disclosure (F-P1)
- The first pass used five spawned sub-agents (delegated model contexts launched through an orchestration tool) as read-only evidence collectors. Each could independently inspect files with its own tool access and returned synthesized structured findings. This violated the mission prohibition on new agents/sub-agents/delegated model contexts/temporary sessions. **The original pass is process-noncompliant on that prohibition, and no compliance is claimed for it.**
- Correction performed in this same existing Foundation Worker session with **no agent, sub-agent, delegated model context, or temporary session**: every load-bearing Foundation position below was directly re-verified by this session's own Read/grep tool calls against the actual files (a substantial share had already been read directly in the first pass; every remaining load-bearing citation was re-read or re-grepped directly during the rework). Appendix A lists the directly verified evidence. Claims that could not be directly re-verified were removed or rephrased onto directly verified evidence.
- Containment note (fact, not a compliance claim): the sub-agents' recorded tool calls were audited — zero accesses to the forbidden first-pass artifacts — so blind independence was preserved despite the process violation.

### 0.3 Blind independence
- `ADVISOR_INDEPENDENT_ASSESSMENT.md`, `runs/cosmile/20260710_v3_package1a_*`, `runs/shared/20260710_v3_package1a_*`, any `ACTOR_COMPARISON_MATRIX.md` / `FOUNDER_DECISION_PACKAGE.md` / `FOUNDER_ACCEPTANCE_SHEET.md`, and `12_COSMILE_RESULT_POINTER.md` were NOT opened at any point (first pass, sub-agents, or rework). The rework read only: the validation file `16_FOUNDATION_RESULT_VALIDATION.md`, the rework handoff, this assessment, the frozen register, and previously cited repo/canonical files.
- Repo state pins: FOUNDATION `shadow/foundation-shared-memory-v0 @ f240867`; foundation-control `shadow/m5-ingress-gate @ c89b792`. All line numbers cite these working trees.
- Constraints honored (both passes and rework): code/contract/API/design modification 0; DB access 0; secret/env-value access 0 (paths cited only); live model calls 0; production/live access 0; vault data re-investigation in rework 0 (F-S1); canonical product policy decided 0; Package 1B design 0.

Evidence layers: `current_code` | `current_canonical_contract` | `historical_report` | `test_evidence` | `unverified_runtime`. Assumptions are labeled. Nothing below claims production/deployed behavior from code or tests alone.

---

## U-01 FEEDBACK INPUT REALITY

FOUNDATION_POSITION:
From the Foundation side there is no feedback input path, no feedback storage target, and no concept that could attribute user text to a purchase. `foundation_http_service` is consultation-only: a repo grep for feedback/outcome/order_item/orderItem/RecOutcome/semantic_label/adverse_certainty returns zero matches. The FOUNDATION repo likewise has zero RecOutcomeFeedback/OrderItem concepts; the only feedback-shaped constructs are (a) `outcome_feedback` as a memory kind + `feedback` as a created_from value in the standalone, flag-OFF, in-memory shared-memory shadow module, (b) `outcome_feedback` as a CDM type in a policy module whose rule is that it can never upgrade evidence, and (c) a null `reaction_placeholder` in a vision document. Consultation `raw_text` enters Foundation request-scoped, optional, and explicitly not used for final semantic judgment; order/payment identifiers are forbidden ingress keys deleted on sight, so Foundation structurally cannot link consultation text to an order even if asked to. Whether consultation text can ever be valid outcome evidence is not answerable from Foundation evidence: the SSC has no field distinguishing pre-purchase from post-use context. What users will actually provide is a product decision plus experiment, outside Foundation's evidence reach.

DIRECT_EVIDENCE:
- grep `feedback|outcome|order_item|orderitem|recoutcome|semantic_label|adverse_certainty` over `foundation-control/foundation_http_service/*.py` = 0 hits; grep `recoutcomefeedback|semanticlabel|semantic_label|adverse_severity|adverse_certainty|order_item|orderitem|tombstone|v3-11d` over FOUNDATION repo (*.py/*.md) = 0 hits (re-run directly 2026-07-10). [current_code]
- `foundation-control/foundation_http_service/contracts.py:52` — `raw_text` optional, "의미 최종판단엔 안 씀"; `core.py:1615` — forwarded only as `query`. [current_code]
- `ingress_gate.py:48` ORDER_PAYMENT_KEYS; `:96-97,163-164,237-238` deleted on sight with `GATE_REJECT_ORDER_PAYMENT`. [current_code]
- `FOUNDATION/foundation/shared_memory/contract.py:21,28` MEMORY_KINDS incl. `outcome_feedback`, CREATED_FROM incl. `feedback`; `:38-39` flag `shared_memory_v0_shadow` default OFF; module standalone — grep `shared_memory` importers outside the module in FOUNDATION repo = 0; grep `shared_memory` in `foundation_http_service` = 0 (re-run directly). [current_code]
- `FOUNDATION/foundation/_core/foundation_customer_decision_memory.py:9-11` CDM_TYPES incl. outcome_feedback; NEVER_UPGRADE_EVIDENCE=("preference","outcome_feedback"). [current_code]
- `FOUNDATION/foundation_learning_strategy_kr.html:333-339` `reaction_placeholder` (clicked/bought/feedback/followup_after_days null). [historical_report]
- V3-11D gate plan G-D1 "post-order feedback 입력 경로 부재" (`foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11D_SEMANTIC_EXTRACTION_GATE_PLAN_20260707.md:69`); the plan's own implementation verdict is NO (`:74-75`). [historical_report]

FACTS:
- No feedback/rating/review input route exists in either Foundation runtime repo (zero-hit greps above). [current_code]
- The shadow module's `outcome_feedback` allow path is exercised only by synthetic factory candidates and persists nothing (`written=False`, in-memory; `store.py:30-43`). [current_code / test_evidence]
- Canonical V1 memory contract (M2 v1.2, status DESIGN) lists `outcome_feedback` as a FactTypeRegistry type — vocabulary at design level, not runtime (`COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:114`). [current_canonical_contract]
- V3-11C2 canonical design (APPROVED_WITH_ACCEPTED_RISKS) authorizes nothing operational (doc line 15) and lists V3-11D under Out Of Scope. [current_canonical_contract]

ASSUMPTIONS:
- That current consultation text is predominantly pre-purchase intent is an assumption from flow shape (consultation intents, no post-use marker in SSC), not measured user data.

MISSING_EVIDENCE:
- Founder-selected input mode and user-visible timing; evidence of user willingness per signal type; an approved provenance rule from input to product/order/OrderItem; any marker separating post-use outcome from pre-purchase intent in text inputs.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (input-path absence — resolved Foundation-side by this assessment) + LEO_PRODUCT_DECISION_REQUIRED + EXPERIMENT_REQUIRED.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — path absence and boundary behavior: YES (done); source identity strength and user behavior: NO.
REQUIRES_EXPERIMENT: YES (completion rate, signal quality, selection bias — after product decision).
REQUIRES_LEGAL_OR_POLICY_REVIEW: NOT PRIMARY (consent language review once a mode is chosen).
REQUIRES_LEO_PRODUCT_DECISION: YES (feedback mode, timing, whether consultation text may ever count as outcome evidence).
SAFE_DEFAULT: Agree with register verbatim. Foundation-side addition: do not extend FRC/SSC with feedback semantics and do not reinterpret consultation SSC traffic as outcome evidence before the product decision.
REVERSIBILITY: HIGH Foundation-side (nothing exists to roll back); falls per register once collection begins.
COST_IF_WRONG: cross-repo contract rewrite; customer trust damage if consultation intent text is silently treated as outcome evidence; low-value investment.
CONFIDENCE: HIGH for current-path absence (grep + contract verified); LOW for future user behavior/value.

---

## U-02 SEMANTIC CLASSIFICATION RELIABILITY

FOUNDATION_POSITION:
Foundation's current semantic authority is consultation-safety recognition, not feedback classification, and it emits no feedback tuple. Input side (SSC): a structured adverse tuple exists — `symptom_or_discomfort` (13-enum), `semantic_adverse_severity` (5-enum), red_flag/visible booleans, and `semantic_safety_confidence`, a DeepSeek self-reported 0-1 number passed through unvalidated. Output side (FRC): `final_severity_class` (mild|breakout|visible|red_flag) + `severity_class_basis` (provenance enum) and NO `semantic_label`, NO `adverse_certainty`, NO numeric confidence of any kind — independently re-confirming V3-11D's G-D2 from the Foundation side. The 10-label `semantic_label` vocabulary lives only in the Cosmile V3 data dictionary. On mixed statements ("slightly stinging but effective"): the existing consultation architecture already separates the adverse axis and merges raise-only — any non-unknown symptom raises `safety_signal`; escalation forces `safety_first`; the single softening path is deterministic-gated (AI can prevent but never cause it); `assert_frc_invariants` blocks basis disguising. This structurally supports the register's multi-axis assumption but is a safety router, not a calibrated classifier. Confidence/calibration: three constructs exist, none calibrated — heuristic constants (0.7/0.55/0.4 by grounding match level), LLM self-reported passthrough, and fixed consumption thresholds (0.75 intent adoption; 0.6 severity-primary and backstop trigger). No corpus, no annotation policy, no inter-rater data, no calibration code exist anywhere. Multilingual: prompts are Korean-domain; SSC `locale` is validated but not propagated into judgment (the SSC echo hardcodes ko); the ingress raw-text heuristic keys on Hangul. A feedback semantic contract is structurally feasible by the same SSC/FRC pattern (enum + per-field provenance + fail-closed promotion + invariant asserts + unclear-fallback), but its reliability on mixed/multilingual/sarcastic real input is unmeasurable before a labeled corpus and pilot.

DIRECT_EVIDENCE:
- `contracts.py:14-22` SSC/FRC enums; `:52,65-66` raw_text/confidence intake; `:167-223` build_frc exact output (no semantic_label/adverse_certainty/confidence key). [current_canonical_contract]
- `contracts.py:133-149` fail-closed promotion (any non-unknown symptom, provided-but-invalid safety enums → safety_signal; promotion recorded as `foundation_fallback`, never disguised as service_provided). [current_code]
- `core.py:538-550` raise-only rank merges; `:1276-1283` softening path — `_general_suitability(norm0) AND not concrete_risk_signal` where `concrete_risk_signal = deterministic OR semantic risk high/medium` (AI can only prevent the downgrade); `:1303` `suitability_aligned=False` on adverse escalation; `:1457` pass→caution when suitability-aligned. [current_code]
- `core.py:578-595` `_adverse_severity_class` — lexical anchor stabilizes, AI raises only to red_flag; no anchor → AI primary if `ai_conf is None or >= 0.6`; else `("mild","uncertainty_backstop")`; `:530-531` `_SEVERITY_GATE` maps mild/breakout→(caution,hold), visible/red_flag→(block,do_not_buy) — pass impossible for escalated adverse. [current_code]
- `core.py:193` `_CONF_BY_LEVEL = {high:(high,0.7), medium:(medium,0.55), low:(low,0.4)}`; `:25-26` ROUTING_CONF_USE=0.75 / ROUTING_CONF_CLAR=0.45; `:1294` backstop trigger `semantic_safety_confidence < 0.6`. [current_code]
- `core.py:1577` SSC echo hardcodes `locale="ko", channel="chat"`; `ingress_gate.py:79-80` Hangul-based `_is_raw_text`. [current_code]
- `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md:3` (status: CANONICAL — 유일 어휘 정본) + §2.12 10-value semantic_label with `unclear`. Location note: this CANONICAL-status doc sits in a reports directory (status/location inconsistency, observation only). [current_canonical_contract]
- `semantic_router.py:2-22` TRANSITIONAL scaffold declaration (long-term owner = service semantic adapters; since ROUTING-02.7 the adverse fields are consumed by the policy gate); `:96-131` route_shadow enum guards + fail-open `{semantic_shadow_error}`. [current_code / current_canonical_contract]
- Test evidence: adversarial candidate-override regression "180 cases" (script docstring, `scripts/foundation_candidate_override_adversarial_test.py:2-4`); golden-20 internal-enum leak regex (`scripts/foundation_brain_v1_golden_test.py:15,48`). None test mixed-feedback/sarcasm/multilingual calibration. [test_evidence]

FACTS:
- FRC emits severity class + basis enums, not numbers; consuming services cannot receive a confidence value today (`contracts.py:198-223`). [current_code]
- Self-reported confidences surface only in internal trace fields (`core.py:1523` shadow_confidence, `:1539` semantic_safety_confidence). [current_code]
- Existing keyword tables (e.g. '따가','부작용' in `FOUNDATION/foundation/_core/answer_type_classifier.py:10-17`) are triggers/floors by declared policy; reusing them as feedback semantic labels would collide with the no-heuristics constitution (FOUNDATION CLAUDE.md §0.4). [current_code]
- Untracked draft `FOUNDATION/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html` supplies the composition rule: safety = MAX(service semantic, Foundation guard, policy); semantic may raise, never lower. [historical_report]

ASSUMPTIONS:
- That the SSC/FRC pattern would transfer to a feedback tuple is an architectural extrapolation, not evidence.

MISSING_EVIDENCE:
- Labeled multilingual feedback corpus + annotation policy; mixed-signal representation/precedence contract; calibration, inter-rater agreement, false-negative/false-positive costs; safe handling of sarcasm/ambiguity/contradiction/late correction; proven thresholds for any automatic action.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (capability/gap inventory — done) + EXPERIMENT_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — contract shape, fail-closed behavior, output gap: YES (done); real-input reliability/calibration: NO.
REQUIRES_EXPERIMENT: YES (observation-only pilot with explicit unclear/mixed fallback and human escalation for safety-relevant uncertainty).
REQUIRES_LEGAL_OR_POLICY_REVIEW: NO for classification itself (adjacent consent issues under U-03/U-04).
REQUIRES_LEO_PRODUCT_DECISION: YES (input mode first — corpus definition depends on it).
SAFE_DEFAULT: Agree with register. Foundation-side addition: any future tuple must keep adverse and positive axes as separate fields with raise-only merge and a non-learning `unclear` state; self-reported LLM confidence must not be exposed as calibrated confidence in any contract field.
REVERSIBILITY: MEDIUM observation-only/versioned; LOW after driving ranking/suppression/durable memory.
COST_IF_WRONG: per register; Foundation-specific worst case is a plausible-but-uncalibrated confidence field becoming a cross-repo contract surface.
CONFIDENCE: HIGH that current calibration evidence is insufficient (none exists); LOW on achievable production accuracy.

---

## U-03 RETENTION / ERASURE / DATA LINEAGE

FOUNDATION_POSITION:
For Foundation-derived data the deletion problem decomposes into four surfaces in very different states. (1) Foundation durable customer stores: none exist — INVARIANTS stamp `write_performed/raw_text_stored/pii_stored/memory_write=false` on every response; the HTTP service has zero file-write surfaces; the shared-memory module is in-memory, flag OFF, standalone; canonical M2 V1 §6 states erasure = service-local only and Foundation is not an erasure target because it stores nothing. (2) Request-scoped traces: the trace ring is volatile (200 entries; path/status/trace_id/decision only; no content). (3) Service-side derivatives of Foundation outputs (persisted FRC decisions, trace_id correlation): deletion propagation there is service-local per M2; M2 §9 bans trace_id and raw identity in the same row; M2 §15 includes learning outputs (un-learning) in erasure derivatives. This is DESIGN-status contract text, not implementation. (4) External provider: raw text sent to DeepSeek has no repo-controllable deletion path; requests carry no retention headers and no DPA artifact exists — deletion there is a legal/ops question. Shadow deletion semantics that do exist are simulation-grade: `delete/expire` set in-instance flags; `must_not_reappear` holds only within one store instance; gate deleted/expired branches depend entirely on caller-supplied `memory_state`; re-proposal of a deleted candidate gates `allow` again (reappearance possible, untested). Retention TTLs are enum labels without time enforcement. R-2 remains canonically unresolved and is a hard blocker before operational use/flag ON. Jurisdictional/legal retention obligations cannot be derived from repository evidence.

DIRECT_EVIDENCE:
- `core.py:50-51` INVARIANTS; `server.py:18,35-38` trace ring; zero write-mode file operations in `foundation_http_service` (grep re-run). [current_code]
- `FOUNDATION/foundation/shared_memory/store.py:20-23` in-memory only, `memory_db_created=False` constant; `:36-43` ingest (`written=False`; no prior-deletion lookup); `:75-79` delete (unconditional `must_not_reappear:true` return, in-instance flag); `:81-84` expire-all; `gate.py:73-77` caller-supplied memory_state dependency. [current_code]
- `gate.py:90-91` only `retention_policy=='session'` changes behavior; no timestamps anywhere in the module. [current_code]
- `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:138` 3-state must_not_reappear; `:142` erasure service-local only, Foundation not an erasure target; `:196` un-learning in erasure derivatives (status header `:3`: DESIGN v1.2). [current_canonical_contract]
- `MEMORY_CONTEXT_CONTRACT_V1_20260704.md:3` (DESIGN) + §8 (`:121-126`): must_not_reappear, service-side filter first, FRC `memory_reuse_decision` unwired (W15, shadow/default OFF). [current_canonical_contract]
- `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md:75-96,375-381` R-2 unresolved; hard blocker list; gate `REC_OUTCOME_RETENTION_ERASURE_POLICY_GATE`. [current_canonical_contract]
- `llm_guard.py:55-57` / `deepseek_composer.py:38-40` — Authorization+Content-Type headers only. [current_code; provider side unverified_runtime]

FACTS:
- Foundation-side "deletion propagation" currently has no durable object to propagate to; the risk mass sits in service-side persistence of Foundation outputs and provider-side copies of raw text. [current_code + unverified_runtime]
- Eval scripts write report artifacts (fixture text and booleans/counts) to disk when run (`scripts/foundation_brain_v1_golden_test.py:36,99`); such artifacts belong in any lineage inventory. [current_code]
- foundation_trust evidence log persists hash+metadata JSONL with raw excerpt default OFF (`foundation_trust/evidence_log.py:28-31`; `config/policy.yaml:124-125` store_raw_input:false/excerpt_chars:160; `engine.py:19,50` store_raw=False default) — test-asserted (`tests/test_evidence_log.py:28-33`). [current_code / test_evidence]

ASSUMPTIONS:
- That services persist FRC-derived rows (e.g. P1 `foundation_decision_received`) is taken from canonical/plan documents, not verified service DB state (service DBs not read — forbidden and out of scope).

MISSING_EVIDENCE:
- Cross-repo data-flow/processor inventory (service-side persistence of FRC outputs; provider retention terms); jurisdiction, legal basis, consent purpose, retention authority; backup/log/queue deletion capabilities and guarantees; aggregate re-computation and model un-learning policy; auditable end-to-end no-reappearance proof.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (technical lineage inventory) + LEGAL_OR_POLICY_REVIEW_REQUIRED + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — Foundation-side surface inventory: YES (Appendix E); service-side + backup/queue/provider capabilities: NO (ops/legal evidence).
REQUIRES_EXPERIMENT: YES (future propagation/no-reappearance tests, synthetic canary only).
REQUIRES_LEGAL_OR_POLICY_REVIEW: YES (jurisdiction, retention periods, provider processing).
REQUIRES_LEO_PRODUCT_DECISION: YES (product promises; tombstone/reuse-block acceptability).
SAFE_DEFAULT: Agree with register. Foundation-side addition: keep Foundation stateless (no new durable derivative); treat provider egress as the dominant unresolved lineage edge — do not send live customer feedback text externally before U-05/legal resolution.
REVERSIBILITY: HIGH while writes remain disabled Foundation-side; LOW after service-side derivatives/aggregates proliferate; effectively IRREVERSIBLE for anything already sent to a provider.
COST_IF_WRONG: per register (incl. PII/security incident).
CONFIDENCE: HIGH that policy/lineage are incomplete; UNKNOWN on legal requirements (no jurisdiction evidence in repos).

---

## U-04 GUEST-TO-LOGIN IDENTITY SAFETY

FOUNDATION_POSITION:
Under Option B, Foundation has no identity-linkage capability at all, so guest-to-login stitching risk cannot originate inside Foundation — and equally cannot be policed by Foundation. Foundation mint functions unconditionally raise `SubjectMintDeprecated`; there is no SubjectRefMap, no furef↔subject map, no identity store anywhere in Foundation; `validate_subject_ref` checks format (`subj_v2_<32hex>`) + PII-free only and never resolves identity; the ingress gate silently strips `subject_ref` from session_context as unconsumed. All stitching mechanics, threat surfaces, and wrong-account risk live service-side (canonical M2: guest→subject merge service-local only; SIASIU↔Cosmile merge banned; `allow_link` single-purpose; R-3 leaves commerce-row re-keying after login undecided). Foundation's residual exposure: subject_ref is opaque to Foundation, so a service-side wrong link is invisible to Foundation gates — `cross_subject_isolation` only compares refs within one request. Foundation-side cost of a no-linking default is zero because Foundation consumes no subject_ref today. Consent sufficiency of a login event and the user-facing default are product/legal decisions.

DIRECT_EVIDENCE:
- `FOUNDATION/foundation/shared_memory/subject_identity.py:48-50,68-76` SubjectMintDeprecated raisers; `:57-65` validate (format+PII only, value never echoed); `:38-41` `_is_production` dead code (Option A relic; `FOUNDATION_SUBJECT_REF_DEV_FALLBACK` set only by test/eval harnesses, never read by module code). [current_code]
- `ingress_gate.py:49,165-166` subject_ref STRIP_KEYS (not a violation; Foundation 미소비). [current_code]
- `gate.py:70-71` cross_subject_isolation = same-request comparison only. [current_code]
- `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` §1-§4 — canonical Option B roles (service-local mint/secret/SubjectRefMap; Foundation format/validation/gate only). [current_canonical_contract]
- `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:101,104,143,149` service-local merge only, allow_link single-purpose, cross-service out of scope; `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md:98-117` R-3 open; gate `IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE`; "Do not infer or implement re-key/stitch/link". [current_canonical_contract]
- `tests/test_subject_ref_v2_hard_gate.py:32-37,82` — mint raises SubjectMintDeprecated; no `mint_subject_ref` API attribute (synthetic inputs; not executed in this pass). [test_evidence]

FACTS:
- PII-in-ref rejection uses 3 regexes (email/KR-mobile/RRN; `subject_identity.py:22-26`) versus gate.py's 4 (adds card-like; `gate.py:19-24`) — a minor asymmetry to align whenever identity work resumes (observation only). [current_code]
- Canonical env policy: Foundation must hold no subject secret; presence would signal an Option B violation (`FOUNDATION/docs/security/ENV_AND_MIGRATION_POLICY.md` §6). [current_canonical_contract]

ASSUMPTIONS:
- Service-side identity mechanics (anonymousRef/XOR writer, `SubjectRefMap.allowLink=false`) are accepted from the frozen register's KNOWN_FACTS and canonical docs; Cosmile code was not read (other actor's scope; independence preserved).

MISSING_EVIDENCE:
- Shared-device/account-switch/device-reset/cookie-reuse/household threat model; product consent language and revocation behavior; proven identity signals and false-link rate; correction/unlink procedure and audit trail; legal/policy basis for linking health-adjacent feedback. None derivable from Foundation repos.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (mechanics documentation — service-side actor) + LEGAL_OR_POLICY_REVIEW_REQUIRED + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — Foundation's non-capability: YES (verified); safe automatic linkage: NO (threat model + pilot, service-side).
REQUIRES_EXPERIMENT: YES (reversible-link pilot with wrong-account recovery, if ever pursued).
REQUIRES_LEGAL_OR_POLICY_REVIEW: YES (consent for linkage of sensitive feedback).
REQUIRES_LEO_PRODUCT_DECISION: YES (no-link vs additive-link default).
SAFE_DEFAULT: Agree with register (no stitch/re-key/infer; ambiguous dual-identity input produces no learning write). Foundation-side addition: keep Foundation subject_ref-blind (validate-and-strip) — do not give Foundation identity-resolution duties as a side effect of feedback work.
REVERSIBILITY: HIGH with no linking; LOW after destructive re-keying (service-side).
COST_IF_WRONG: per register.
CONFIDENCE: HIGH that policy is unresolved and Foundation holds no linkage capability; LOW that safe automatic linkage is provable without threat model + pilot.

---

## U-05 RAW-TEXT NON-PERSISTENCE REALITY

FOUNDATION_POSITION:
Request-scoped processing without application-layer persistence is real and is the best-evidenced claim in this assessment — but end-to-end non-persistence CANNOT be claimed, and the dominant unresolved edge is external model egress. Verified at code layer: the HTTP service has zero file-write surfaces; stdlib server access logging is explicitly disabled; the only cross-request state is a volatile 200-entry in-memory ring holding path (query string stripped)/status/trace_id/decision — no content; error paths emit exception class names only; the raw query is reduced to `query_hash = sha256(PII-masked)[:16]` + `pii_detected` boolean in outputs; the FRC trace hardcodes `raw_pii_included: False`; KB sqlite is opened `mode=ro`; there is no queue/retry/dead-letter/backoff infrastructure (single-shot transports, timeout 40s, no automatic re-send on transport failure); no logging/faulthandler/traceback-to-file exists. However: raw user text leaves the process to `https://api.deepseek.com/chat/completions` on up to 3 sends per request (semantic router, guard classify, one-shot repair carrying the prior user message), plus derived content on up to 3 more (composer brief — verified to exclude the raw query; verify x2 carrying the generated answer plus user-derived avoid-ingredient vocabulary); requests carry no retention-control headers; egress is gated per-request by `compose` + key-file presence, not by env flag. Unverifiable from repos: provider retention/training use, process-supervision capture of stdout/stderr, reverse-proxy logging, OS crash-dump policy, current key-file presence, SIASIU-side writes to the shared KB, and anything inside cross-repo symlink imports. Dormant write-capable code exists (lifted ssbrain ingest/schema including `search_logs`/`think_logs` DDL) with no runtime importer — latent, not active. Verification must be layered: code-layer (done, boolean/count), then deployment/ops evidence, then provider terms — synthetic canaries only, per existing guardrails. Do not claim non-persistence; do not send live customer feedback externally.

DIRECT_EVIDENCE:
- `server.py:84-86` log_message disabled; `:18,35-38` trace ring (query string stripped via `split("?")[0]`); `:40-48` in-memory body read; `:96-97` fixed startup banner; `:81-82` 500 body = exception class name only. [current_code]
- `core.py:875-879` `masked, pii_found = mask_pii(norm)` ("원문 미저장"); `:991-992` `query_hash=_hash(masked)` + `pii_detected`; `contracts.py:221` raw_pii_included:False. [current_code]
- grep re-run: zero write-mode open()/json.dump/logging/pickle/tempfile in `foundation_http_service`; only file opens are DeepSeek key reads. [current_code]
- Egress call sites re-verified: `core.py:22` SHADOW_ON=True; `:1182` route_shadow(norm0) when compose_on AND SHADOW_ON and no semantic_override; `:1259` `llm_guard.semantic_classify(norm, enabled=compose_on)`; `:1390-1396` verify → one-shot `llm_guard.repair(..., [{"role":"user","content":norm}], ...)` → re-verify → else `answer_text=None` → `_rule_compose` fallback (`:1408-1411`). [current_code]
- `llm_guard.py:12-14,53-60` transport (endpoint/model/key path constant `/home/leo/Project/SIASIU/.secrets/deepseek_key` — path only; single urlopen, timeout=40, no retry; headers Authorization+Content-Type only); `:30-31` `_verify_sys` embeds avoid list; `deepseek_composer.py:36-43` same transport shape; `:69-117` prompt built from derived brief fields only — `brief["context"]` is a fixed label (`core.py:1073-1112`), `brief["safety"].avoid_ingredient = avoid_atoms` (`core.py:1342-1344`), avoid atoms extracted deterministically with no LLM and no write (`core.py:1135-1137`). [current_code]
- `retrieval_provider.py:13,25,36` KB `mode=ro`; `:33,46,88` stderr embeds `str(e)[:120]` (worst repo-local leak channel — exception text could carry query fragments); `:55` search(query,k). [current_code]
- `ingress_gate.py:17` SHADOW_MODE=True (hard reject forbidden); `:333-345` FDN_INGRESS_GATE_SHADOW default OFF, judgment-only, codes+count output. [current_code]
- Env surface re-grep: FDSH_HOST/FDSH_PORT/FDSH_STARTED_AT (`server.py:15-17`) + FDN_INGRESS_GATE_SHADOW (`ingress_gate.py:341`) — external-LLM calling is not env-gated. [current_code]
- Dormant write code: `ssbrain/schema.py:106-134` search_logs/think_logs DDL; `ssbrain/ingest.py:175-182` INSERT OR REPLACE; importers re-grep = engine/bm25/bridge only (`retrieval_provider.py:24,35,76`; `core.py:1144`). [current_code]
- No queue/retry/dead-letter/backoff and no logging/faulthandler/traceback/excepthook in runtime packages (greps re-run, 0 hits). [current_code]
- FOUNDATION shared_memory: `gate.py:16-27,40-55` raw/PII default-deny with category-only reason codes; `store.py:13-14,72` read projects summary fields only. Nuance: key-name checks are top-level only (`gate.py:44` loop) while nested values are caught only by 4 PII regexes (`:50-54`) — nested raw text matching no pattern can transiently sit in process memory inside the stored candidate dict (`store.py:36`); never disk, never read-exposed. [current_code]
- `repos/` symlinks → /home/leo/Project/{Cosmile,FOUNDATION,SIASIU} (ls re-run) — cross-repo in-process import surface. [current_code]

FACTS:
- Per consult request with compose=true and key present: raw text ≤3 external sends; derived/answer content ≤3 more; with `semantic_override` present the router send is skipped (≤2 raw sends). [current_code]
- Key-absent behavior is deterministic degradation: composer→rule fallback, guardrail→lexicon-only, router→keyword fallback; nuance: `semantic_verify` returns ok=True/called=False (verify step skipped) when key/compose absent (`llm_guard.py:80-81`). [current_code]
- Eval scripts persist fixture utterances + truncated answers when run (`foundation_brain_v1_golden_test.py:36` traces q/answer[:120]; `:99` json.dump) — synthetic only, but a real raw-text-to-disk surface. [current_code]
- No-write invariants are test-asserted on synthetic fixtures: 11 write/live keys False across 140 cases (60+40+20+20) + memory.db/ssbrain.sqlite non-creation in the control workspace (`tests/test_no_live_no_write_consultation.py:11-13,18-19,27-29`); trace keys restricted to an allowlist (`tests/test_cross_project_consultation_trace_redaction.py:13-20`). These check response fields and workspace file non-creation — they are not runtime storage audits. [test_evidence]

ASSUMPTIONS:
- The egress call-site enumeration is exhaustive for this repo (grep-based); cross-repo in-process imports are excluded and flagged as unverifiable.

MISSING_EVIDENCE:
- Deployment data-flow/processor inventory; access/error/trace log configuration + retention evidence; provider data-use/retention terms; crash/core-dump/debug capture policy; an auditable synthetic-canary verification procedure run against the real deployment.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (code layer — done; ops layer — pending) + LEGAL_OR_POLICY_REVIEW_REQUIRED (provider/processor) + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — application layer: YES (done, boolean/count); infrastructure + provider: NO (ops/legal evidence).
REQUIRES_EXPERIMENT: YES (synthetic canary end-to-end; never real customer text).
REQUIRES_LEGAL_OR_POLICY_REVIEW: YES (provider processing/retention; processor obligations).
REQUIRES_LEO_PRODUCT_DECISION: YES (whether feedback text may go to an external provider at all, and which provider).
SAFE_DEFAULT: Agree with register. Foundation-side sharpening: the only external egress today is DeepSeek behind compose+key; keep router/classify/repair raw-sends out of any feedback path until provider terms are resolved.
REVERSIBILITY: MEDIUM before live data; effectively IRREVERSIBLE for text already sent to an uncontrolled provider.
COST_IF_WRONG: PII/security incident; trust damage; contract rewrite.
CONFIDENCE: HIGH that repo-local dev persistence is minimized (verified); LOW for end-to-end non-persistence outside inspected code.

---

## U-06 PRODUCT VALUE / LEARNING VALUE

FOUNDATION_POSITION:
No learning loop consumes feedback anywhere in Foundation, and — decisively for this unknown — existing Foundation policy already hard-bounds what feedback learning would be allowed to do even with a perfect classifier: CDM policy sets `evidence_contribution = 0.0` for preference/outcome_feedback (NEVER_UPGRADE_EVIDENCE) and `overrides_safety = False` unconditionally; knowledge-learning machinery (LMR) is approval-gated with an explicit no-auto-approve rule; `learned_promotion`, `canonical_write`, `vault_write` are HARD_OFF feature flags (code-forced False). The permissible value envelope Foundation-side is therefore: (a) adverse detection may raise caution (consistent with the raise-only architecture), (b) observation-only signals — and NOT truth-upgrading or safety-relaxing learning. No KPI, baseline, uplift, calibration, or stop-threshold instrumentation exists in Foundation runtime (value artifacts exist only at design layer). Selection-bias and effect-size questions are experiment territory; the value hypothesis (safety detection vs personalization vs recommendation quality) is Leo's product decision. Foundation can contribute instrumentation surfaces (severity/decision distributions, trace fields) without choosing business thresholds.

DIRECT_EVIDENCE:
- `FOUNDATION/foundation/_core/foundation_customer_decision_memory.py:49-51` `evidence_contribution` returns 0.0 for NEVER_UPGRADE_EVIDENCE types; `:54-55` `overrides_safety` returns False; `:44-46` can_use returns overrides_safety:False. [current_code]
- `FOUNDATION/foundation/feature_flags.py:5-8` HARD_OFF incl. learned_promotion/canonical_write/vault_write; get() forced False. [current_code]
- `FOUNDATION/foundation/_core/learning_approval_workflow.py:4-6,40-41` "자동 승인 금지"; approve_for_reuse requires reviewed + reviewed_by; JSONL/in-memory store with memory.db/ssbrain.sqlite ban. [current_code]
- grep `uplift|calibrat|kpi` over FOUNDATION repo runtime code = 0 hits (re-run). [current_code]
- Design-layer value artifacts only: `foundation-docs/설계문서/foundation/FOUNDATION_ANSWER_SATISFACTION_SCORE_V1.md`, `FOUNDATION_BRAIN_CLOSED_LOOP_EVALUATION_V0_1.md` (filenames in the canonical index; not runtime). [historical_report]

FACTS:
- Under current Foundation policy, feedback cannot raise evidence strength or relax safety regardless of classifier quality (CDM lines above). [current_code]
- No feedback-consuming learning code exists in either Foundation repo (U-01 zero-hit greps). [current_code]
- No pilot corpus, baseline metric, uplift result, calibration result, or stop-threshold evidence exists in the inspected Foundation sources (zero-hit greps; consistent with the register's KNOWN_FACTS). [current_code]

ASSUMPTIONS:
- That adverse feedback has safety value is plausible under the raise-only architecture but unquantified.
- That C2 organic purchase outcome cannot be read as recommendation performance is accepted from the register (Cosmile-side; not re-verified here).

MISSING_EVIDENCE:
- Baseline KPI and causal attribution plan; expected feedback rate and sample composition; selection-bias analysis and missing-not-at-random handling; minimum useful effect and stopping rule; evidence that a learning loop improves outcomes without suppressing safety signals.

RESOLUTION_TYPE: EXPERIMENT_REQUIRED + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: NO for value itself; YES for the policy envelope (done — feedback cannot upgrade evidence or relax safety under current policy).
REQUIRES_EXPERIMENT: YES (observation-only pilot with predefined KPI, bias reporting, stop conditions).
REQUIRES_LEGAL_OR_POLICY_REVIEW: NOT PRIMARY (consent `purpose` separation per M2 §15 becomes relevant if learning input is pursued).
REQUIRES_LEO_PRODUCT_DECISION: YES (primary value hypothesis; stop-condition ownership).
SAFE_DEFAULT: Agree with register (observation-only, kill switch, no ranking/durable change). Foundation-side addition: keep CDM NEVER_UPGRADE_EVIDENCE and overrides_safety=False as non-negotiable invariants of any future feedback-learning contract.
REVERSIBILITY: HIGH for isolated observation-only pilot; LOW after automated ranking/promotion/customer-facing claims.
COST_IF_WRONG: per register (dominantly low-value investment + trust damage).
CONFIDENCE: HIGH that value is currently unproven; LOW on effect size/pilot sizing.

---

## U-07 FOUNDATION SIGNAL WHITELIST OWNERSHIP AND VERSIONING

FOUNDATION_POSITION:
Ownership is definitively unresolved (R-1: the gate name `FOUNDATION_SIGNAL_WHITELIST_CONTRACT_OWNER_GATE` occurs in exactly one canonical document — the V3-11C2 design doc that declares it missing), and the concrete Foundation-side reality demonstrates why the register's "silently interpret the same signal differently" risk is already live at the vocabulary level: at least three divergent signal vocabularies coexist with no canonical owner — (1) FOUNDATION shared_memory `EVENT_KINDS` (product_view, wishlist, cart, purchase, consultation_session_meta) inherited from the SUPERSEDED v0 contract; (2) foundation-control ingress `SIGNAL_KIND` (view, add_to_cart, checkout, purchase, wishlist, alert, coupon, ai_verdict) from the M3 memory_context contract (enum-validated only, never consumed by consult logic); (3) a Cosmile-side event whitelist with different naming (product_viewed, cart_add, ...) described in the control audit report. No two match. The v0 "single source of truth" that fixed EVENT_KINDS is formally SUPERSEDED with its ownership model repudiated; its successor (M2 V1) is DESIGN-status. De-facto boundary today: Foundation's ingress gate is the acceptance/validation enforcing surface (whitelist keys, enums, size caps, unknown-key default-deny, version gate mctx-1.0 strict/compat) — Foundation already implements acceptance-side enforcement machinery a canonical contract could bind to; raw-event mapping is service-side. Consent enforcement: Foundation-side consent checking in the shadow gate is caller-asserted (a candidate self-declaring consent_scope gates allow; no consent registry exists), so consent authority is currently declared, not enforced. Canonical owner/location/approval model = Leo decision; joint approval (service maps, Foundation accepts) matches the observed code boundary, but choosing it is not Foundation's call.

DIRECT_EVIDENCE:
- Gate-name grep re-run across foundation-docs (설계문서 + docs) and foundation-control, excluding this job's advisor dir: single file — `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` (R-1 at `:54-73`; blocks future Foundation-facing commerce signal expansion until resolved). [current_canonical_contract]
- `FOUNDATION/foundation/shared_memory/contract.py:29` EVENT_KINDS vs `foundation-control/foundation_http_service/ingress_gate.py:27` SIGNAL_KIND — divergent enums, both Foundation-side. [current_code]
- `CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md:3-5` SUPERSEDED header (ownership model repudiated; enums reference-only; no freeze commit recorded in-file); `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:177-181` §12 formal retirement. [current_canonical_contract]
- `ingress_gate.py:40-44,147-154,238-252` whitelist keys, version gate, unknown-key deny incl. catalog `match_reason` ban. [current_code]
- `FOUNDATION/foundation/shared_memory/gate.py:82` consent_ok = caller-asserted scope OR consent_record (no registry). [current_code]
- `foundation-control/docs/COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702.md:59` (whitelist events product_viewed·wishlist·cart_add·purchase·refund·ai_*·category_viewed; outbox status=pending, 실발신 0; consent "가정" — assumed when userId present, unverified) and `:86`; `docs/COSMILE_EVENT_TRACKING_SPEC_20260702.md:4` defers to Cosmile-repo files (`COSMILE_Foundation_Signal_Contract.md` 등) as prior 정본 — a candidate canonical location outside the allowed roots, undecided. [historical_report]

FACTS:
- The three vocabularies differ in both membership and naming convention; any future canonical whitelist must supersede at least two of them. [current_code / historical_report]
- Foundation consumes none of the commerce_signal_refs content in consult logic today (enum validation only). [current_code]
- Versioning machinery exists as a working pattern: `request_memory_context_version` strict/compat gate (`ingress_gate.py:147-154`). [current_code]

ASSUMPTIONS:
- That Foundation should own acceptance constraints is an inference from where enforcement code already lives, not decided policy.
- Cosmile mapper subset / assumed-consent / no-flush-worker facts are accepted from the register and the control audit report; Cosmile code was not read.

MISSING_EVIDENCE:
- Canonical contract path and decision owner; producer/consumer version compatibility policy; consent and privacy enforcement authority (registry, not self-declaration); allowed feedback fields and traceability identifiers; deletion/withdrawal propagation across outbox and consumer.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (producer/consumer reality documentation — Foundation side done here) + LEO_PRODUCT_DECISION_REQUIRED.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — current-vocabulary divergence and enforcement surfaces: YES (done); ownership/approval model: NO (decision).
REQUIRES_EXPERIMENT: NO (contract tests come after the decision).
REQUIRES_LEGAL_OR_POLICY_REVIEW: PARTIAL (consent enforcement authority if signals carry consent semantics).
REQUIRES_LEO_PRODUCT_DECISION: YES (owner, location, approval model).
SAFE_DEFAULT: Agree with register (no Foundation-facing feedback signal expansion; no outbox flush). Foundation-side addition: treat the EVENT_KINDS/SIGNAL_KIND divergence as frozen — do not "fix" either enum before the R-1 owner decision, since either choice would silently pre-decide the canonical vocabulary.
REVERSIBILITY: HIGH while expansion disabled; LOW after incompatible versions persist on both sides.
COST_IF_WRONG: per register.
CONFIDENCE: HIGH that ownership is unresolved and vocabularies diverge (verified).

---

## U-08 FEEDBACK PROVENANCE, ORDER-ITEM LINKAGE, AND CONTRACT SHAPE

FOUNDATION_POSITION:
Foundation-side provenance reality: Foundation has no OrderItem/order concept anywhere, and order/payment identifiers are default-deny ingress keys deleted on sight. Under the approved boundary (raw commerce evidence stays in Cosmile; Foundation receives refined/whitelisted refs only), feedback→product/order/OrderItem linkage must be established, authorized, and stored service-side; Foundation can only ever see opaque refs. The minimum non-raw provenance Foundation would need for semantic processing and later correction — stated as discovery of what existing contract surfaces already support, NOT as a design: (1) request-scoped content (raw_text optional, as in SSC) or service-provided structured semantics; (2) product identity as a `product_id` ref — Foundation's PRISM identity is strong here: `product_id` is immutable and name-independent, with `formula_version`/`name_history`, so feedback pinned to a product_id ref can survive renames and be formula-version-aware; (3) a stable opaque correlation ref for dedup/correction/retraction — the keyed-hash pattern M2 §15 fixes for attribution (raw trace_id stored next to identity is banned by M2 §9); (4) a source-type enum (CREATED_FROM already models this shape); (5) NO customer/order/payment identity — Foundation must stay attribution-blind. When linkage is absent or ambiguous: consistent with every existing Foundation default-deny surface, the correct behavior is no learning write and a non-learning review state — silently attaching by recency/session heuristics would also violate the no-heuristics constitution. Which minimum fields `RecOutcomeFeedback` itself needs (orderItemId cardinality, selection UX, dedup identity) is Cosmile-side reality plus Leo decision; the cross-repo contract may only be designed after those decisions (Package 1B not designed here).

DIRECT_EVIDENCE:
- `ingress_gate.py:47-48,95-97` IDENTIFIER_KEYS + ORDER_PAYMENT_KEYS default-deny; `contracts.py:37-73` SSC has no order/subject fields; `contracts.py:186` product_candidates = product_id refs only; `ingress_gate.py:43` catalog item whitelist admits `product_id`. [current_code]
- PRISM identity: `FOUNDATION/CLAUDE.md` §3 (`product_id = {brand}-{type}-{line_key}-{seq}` 불변 · formula_version · name_history; 정본 PRISM 설계서); parsed by `foundation_core/_read.py:76 parse_product_prism` (re-verified). [current_canonical_contract / current_code]
- `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:159` (§9 trace_id↔raw identity same-row ban; payload_refs only) and `:197` (§15 keyed-hash attribution join key; FRC memory_reuse_decision W15 prerequisite) — re-verified together with `MEMORY_CONTEXT_CONTRACT_V1_20260704.md:121-126` (§8: memory_reuse_decision unwired, W15, shadow/default OFF). [current_canonical_contract]
- `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md:119-134` official decisions #7-#10 (raw evidence stays in Cosmile; refined signals only; Foundation does not own raw order/payment/customer data; traceability anchors). [current_canonical_contract]

FACTS:
- Foundation cannot receive an orderItemId today even if sent: the key is deleted at ingress with `GATE_REJECT_ORDER_PAYMENT`. [current_code]
- CREATED_FROM already enumerates source types (consultation | commerce_event | profile_update | feedback) — an existing enum shape a provenance contract could version. [current_code]
- The feedback semantic extraction contract is owned at design level by V3-04 §9.5 (design-only header; owns list re-verified at `COSMILE_MEMORY_V3_04_..._20260706.md:3-5`). [historical_report]

ASSUMPTIONS:
- That services would pass Foundation product_ids as the product anchor is supported by the ingress whitelist but not contractually decided.
- The current `RecOutcomeFeedback` schema shape (required orderItemId, optional recommendationId, etc.) is accepted from the register's KNOWN_FACTS; Cosmile prisma was not read.

MISSING_EVIDENCE:
- User-visible selection and authorization flow; source-event and dedup identity; correction/retraction linkage; required product/SKU/order-item cardinality; contract decision on consultation follow-up, CS, survey, and return-reason sources.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (Foundation minimum stated here; Cosmile surface mapping = other actor) + LEO_PRODUCT_DECISION_REQUIRED + EXPERIMENT_REQUIRED.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — Foundation-side boundary + supportable refs: YES (done); linkage UX/authorization: NO.
REQUIRES_EXPERIMENT: YES (explicit-linkage completion/quality, after product decision).
REQUIRES_LEGAL_OR_POLICY_REVIEW: NOT PRIMARY.
REQUIRES_LEO_PRODUCT_DECISION: YES (source types as product features; linkage UX).
SAFE_DEFAULT: Agree with register (no RecOutcomeFeedback writes; reject ambiguous product/order linkage; no inference from recency or consultation context). Foundation-side addition: any future contract must keep Foundation attribution-blind (opaque refs only; order/payment/customer identity remains ingress-rejected).
REVERSIBILITY: HIGH before writes; LOW after mislabeled feedback propagates to memory or Foundation signals.
COST_IF_WRONG: per register (identity/data corruption dominant).
CONFIDENCE: HIGH that the Foundation-side provenance surface is as stated (verified); HIGH that provenance implementation is absent (register + zero-hit greps).

---

## U-09 SAFETY RESPONSE, LEARNING, AND CORRECTION BOUNDARY

FOUNDATION_POSITION:
The separation the register asks for — immediate safety response vs durable learning with different evidence thresholds — is already structurally encoded in Foundation at three layers, and what is missing is exactly the feedback-specific connective tissue. Layer 1, immediate response (request-scoped, never writes): deterministic raise-only gates, fail-closed promotion of any safety-shaped signal (including provided-but-invalid enums), an uncertainty backstop that makes `pass` impossible for escalated adverse cases, a contract-level pass→caution floor, block suppression zeroing product exposure, and `forbidden_expressions` banning `continue_use_permission`/`efficacy_overclaim` — this machinery already delivers conservative immediate guidance without causality claims. Layer 2, learning boundary (policy modules): CDM — outcome_feedback/preference contribute 0.0 evidence and never override safety; the shadow gate forces ask_consent for sensitive kinds without consent and blocks high sensitivity without reconfirmation; deleted/expired must_not_reappear (with U-03 caveats). Layer 3, promotion: LMR approval workflow (no auto-approve; supersede/block/deprecate lifecycle) + HARD_OFF learned_promotion. What does NOT exist: a feedback semantic contract (U-02), human-review ownership/SLA, calibration thresholds for automatic vs manual action, and any correction/retraction propagation path — within Foundation there is no durable object to correct (nothing persists), so correction is a service-side memory question plus a contract question about whether a later contradiction may relax a safety state. The current architecture is instructive on that point: within a request, safety is raise-only by construction (a positive or corrective clause cannot lower it); across requests Foundation is stateless, so any "safety downgrade on contradiction" rule would have to be an explicit new contract — the register's assumption that contradiction must not auto-erase a safety block aligns with every existing Foundation invariant. Product workflow, escalation path, and human-review promise = Leo decision; thresholds = evidence-driven after pilot.

DIRECT_EVIDENCE:
- Layer 1: `core.py:538-550,1452,1456-1457` raise-only merges; `contracts.py:133-149` fail-closed promotion with honest provenance; `core.py:578-595,530-531` severity synthesis + uncertainty_backstop + severity gate; `core.py:1624-1634` contract fail-closed floor; `contracts.py:176-197,226-279` block suppression + invariant asserts (incl. forbidden_expressions). [current_code]
- Layer 2: `foundation_customer_decision_memory.py:49-55` (0.0 / False — re-verified lines); `shared_memory/gate.py:80-88` sensitive→ask_consent, high→block without reconfirm; `:73-77` must_not_reappear branches (caveats in U-03). [current_code]
- Layer 3: `learning_approval_workflow.py:4-6,40-41` no-auto-approve; `feature_flags.py:5-8` HARD_OFF learned_promotion. [current_code]
- Escalation raise-only application: `core.py:1292-1315` — `_ai_escalate`/`_backstop_escalate` force strategy=safety_first, never touch refuse, and set severity-gated caution/block via `_SEVERITY_GATE`. [current_code]
- No correction/retraction concept: grep `retraction`/`tombstone` over FOUNDATION repo = 0 hits (re-run). [current_code]

FACTS:
- The CDM rule "preference/outcome_feedback never upgrade evidence, never override safety" exists in enforced code (0.0 / False returns), mirroring the policy line inherited from the superseded v0 contract §3 — the policy survived the contract supersession as code. [current_code]
- Escalation behavior is fixture-tested (adversarial 180-case override suite docstring; golden-20 with internal-enum leak regex at `foundation_brain_v1_golden_test.py:15`); no real-user calibration exists. [test_evidence]
- Within-request safety downgrade is impossible by construction (raise-only merges + invariant asserts); cross-request state does not exist in Foundation. [current_code]

ASSUMPTIONS:
- That layer-1 conservative guidance is an acceptable immediate product behavior is a product question; Foundation evidence only shows it is what the code does today.

MISSING_EVIDENCE:
- Product-approved immediate user behavior and escalation path; a contract separating observed report / semantic proposal / policy decision / durable learning; human-review ownership and service-level expectations; correction, contradiction, and no-reappearance propagation; calibration evidence for automatic vs manual action.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (current authority documented here) + EXPERIMENT_REQUIRED + LEGAL_OR_POLICY_REVIEW_REQUIRED (health-adjacent adverse handling/escalation duty) + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — current safety authority + feasible structured outputs: YES (done); thresholds/workflow: NO.
REQUIRES_EXPERIMENT: YES (calibration for any automatic action).
REQUIRES_LEGAL_OR_POLICY_REVIEW: YES (adverse-event escalation obligations).
REQUIRES_LEO_PRODUCT_DECISION: YES (immediate behavior, human-review promise, contradiction rule).
SAFE_DEFAULT: Agree with register verbatim. Foundation-side addition: encode the existing three-layer separation as explicit invariants of any feedback contract — adverse signals may raise request-scoped caution; they may never auto-produce positive learning, causal claims, permanent promotion, or safety downgrade; contradiction resolution requires an explicit rule + review, never automatic erasure.
REVERSIBILITY: MEDIUM for request-scoped caution (already the architecture); LOW for durable memory, suppression, or customer-facing causal claims.
COST_IF_WRONG: per register (full list).
CONFIDENCE: HIGH that safety and learning must remain separate (already enforced by code/policy); LOW on final product workflow.

---

## Appendix A. Exact files read (all directly, by this Foundation Worker session)

All load-bearing evidence below was read or grep-verified directly by this session (first pass direct reads + rework direct re-verification; no claim rests on sub-agent-only reading).

Register/briefs/validation:
- `V3_PACKAGE1A_UNKNOWN_REGISTER.md` (freeze-verified), `02_FOUNDATION_DISCOVERY_BRIEF.md`, `06_FOUNDATION_DISCOVERY_HANDOFF_PROMPT.md`, `09_FOUNDATION_DISCOVERY_COMPLIANCE_REWORK_HANDOFF_PROMPT.md`, `16_FOUNDATION_RESULT_VALIDATION.md`.

foundation-control (`shadow/m5-ingress-gate @ c89b792`):
- `foundation_http_service/contracts.py` (full), `server.py` (full), `llm_guard.py` (full), `deepseek_composer.py` (full), `ingress_gate.py` (full), `semantic_router.py` (lines 1-131), `retrieval_provider.py` (lines 1-30 + :33,46,55,88), `core.py` (regions :22-26, :40-110, :190-195, :505-600, :871-1000 targeted, :1073-1112, :1135-1161 targeted, :1164-1345, :1377-1411, :1440-1480, :1520-1545, :1570-1646, :1694-1724 + repo greps for feedback-vocab / write-ops / env / queue / logging / ssbrain importers).
- `foundation_http_service/ssbrain/schema.py` (:106-134) and `ingest.py` (:175-182) — dormant write code lines; importer grep.
- `tests/test_no_live_no_write_consultation.py` (:11-29), `tests/test_cross_project_consultation_trace_redaction.py` (:13-20), `scripts/foundation_brain_v1_golden_test.py` (:15,36,48,52-53,99), `scripts/foundation_candidate_override_adversarial_test.py` (docstring), `foundation_consultation/consultation_fixtures.py` (:2).
- `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` (full), `docs/COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702.md` (:59,86), `docs/COSMILE_EVENT_TRACKING_SPEC_20260702.md` (:3-5), `docs/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md` (:3-4), `repos/` symlink listing.

FOUNDATION (`shadow/foundation-shared-memory-v0 @ f240867`):
- `foundation/shared_memory/{contract,gate,store,api,subject_identity,reason_codes,_factory,eval}.py` (full), `tests/test_shared_memory_v0.py` (head + structure), `tests/test_subject_ref_v2_hard_gate.py` (:32-37,82).
- `foundation/_core/foundation_customer_decision_memory.py` (:1-31 + :44-56), `foundation/_core/learning_approval_workflow.py` (:4-6,40-41,88), `foundation/_core/learning_memory_state.py` (:35,59,84-85), `foundation/_core/answer_type_classifier.py` (:10-17), `foundation/_core/foundation_api_scope_guard.py` (:9,31,38), `foundation/_core/foundation_brain_controlled_apply_policy.py` (:7,20), `foundation/brain/runtime/customer_decision_memory.py` (wrapper head), `foundation/api/foundation_core_service.py` (existence), `foundation/feature_flags.py` (full), `foundation/lmr/state.py` (wrapper head).
- `foundation_core/_read.py` (:76), `foundation_core/registry.py` (:36-37), `foundation_intake/llm_adapter.py` (:7,20-22), `foundation_intake/intake_plan.py` (:185-186,197-201).
- `foundation_trust/evidence_log.py` (:20-42), `foundation_trust/config/policy.yaml` (:124-125), `foundation_trust/engine.py` (:19,50), `foundation_trust/tests/test_evidence_log.py` (:28-33).
- `foundation_learning_strategy_kr.html` (:333-339,491), `docs/FOUNDATION_SHARED_MEMORY_V0_SHADOW_20260629.md` (:23,32,39 staleness lines), `reports/FOUNDATION_SHARED_MEMORY_V0_SHADOW_EVAL_20260629.json` (:80,92,136 staleness lines), `CLAUDE.md`, `docs/security/{SECURITY_AND_SECRET_GUARDRAILS,ENV_AND_MIGRATION_POLICY}.md`, `설계문서/` index listing.
- Repo greps: feedback-vocab, outbox/whitelist, retraction/tombstone, uplift/calibrate/kpi, shared_memory importers.

foundation-docs canonical (main):
- `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md` (full), `설계문서/foundation/MEMORY_CONTEXT_CONTRACT_V1_20260704.md` (:3,121-126), `설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` (header, R-1/R-2/R-3, decisions, out-of-scope, next-gate sections), `docs/reports/control/COSMILE_MEMORY_V3_11D_SEMANTIC_EXTRACTION_GATE_PLAN_20260707.md` (targeted), `docs/reports/control/COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` (:3-6,130-136), `docs/reports/control/COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md` (:3-5), `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` (header + §1-6), `설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md` (full), gate-name grep across 설계문서/docs.

## Appendix B. Files not read (relevant, with reason)

- FORBIDDEN (blind independence; untouched in both passes and rework): `ADVISOR_INDEPENDENT_ASSESSMENT.md`; `runs/cosmile/20260710_v3_package1a_*`; `runs/shared/20260710_v3_package1a_*`; any `ACTOR_COMPARISON_MATRIX.md`/`FOUNDER_DECISION_PACKAGE.md`/`FOUNDER_ACCEPTANCE_SHEET.md`; `12_COSMILE_RESULT_POINTER.md`.
- Cosmile repo (`/home/leo/Project/Cosmile`) — other actor's discovery scope; register KNOWN_FACTS accepted for Cosmile-side claims (labeled where used).
- SIASIU repo runtime — out of scope except cited path constants (KB sqlite path; DeepSeek key path — value never read).
- `/home/leo/Project/SIASIU/.secrets/deepseek_key`, any `.env` — secret values (paths cited only).
- Service DBs / prisma / memory.db / live environments / provider dashboards — forbidden (no DB access, no live access).
- Vault-resident materials (dashboard/knowledge files) — first-pass reads of these were ruled outside this mission's repository evidence boundary (validation F-S1); the dependent addendum and claims were removed, the materials were NOT re-read in the rework, and no Package 1A claim rests on them.
- `foundation-control/foundation_http_service/core.py` lines 110-189, 196-504, 605-870, 1001-1058 full-read (lexicon/planner/judge-helper bodies) — grep-verified free of transport/write/feedback symbols.
- `ssbrain/{bm25,bridge,graph,text}.py` full-read — grep-verified SELECT-only; no write path.
- `FOUNDATION/설계문서/{FOUNDATION_제품레코드_PRISM, 데이터코어, 검색아키텍처, TRUST_CORE}` full-read — the underlying code was read directly instead; `SECURITY_ARCHITECTURE_V1_BLUEPRINT.html` (FROZEN, cited from index only).
- Cosmile-repo `COSMILE_Foundation_Signal_Contract.md` — cited by control docs as prior 정본 but outside allowed roots; whether it becomes the canonical whitelist location is exactly part of open R-1.
- Other jobs' advisor briefs/assessments in foundation-docs — assessments, not canonical contracts.

## Appendix C. Unknown addenda (register NOT edited)

No in-scope addenda. (A first-pass addendum concerning a vault-resident write path was removed per Advisor validation F-S1 as out of scope for the Package 1A customer-feedback decision package; it is not part of this result, and the topic was not re-investigated in the rework.)

Evidence-freshness note (not a new unknown; in-scope because it concerns the shared-memory evidence used for feedback-kind claims): the on-disk shared-memory eval JSON (`FOUNDATION/reports/FOUNDATION_SHARED_MEMORY_V0_SHADOW_EVAL_20260629.json`) and the in-repo design doc (`FOUNDATION/docs/FOUNDATION_SHARED_MEMORY_V0_SHADOW_20260629.md`) predate W4 (category-only reason codes) and Option B — the stored report contains field-suffixed reason codes current code cannot emit (report `:80,92`; scenario name drift `:136` vs `eval.py:80`; doc `:23,32,39` still describe active resolve_subject/local_user_ref). No on-disk runtime evidence exists for the CURRENT shared-memory code state (tests/eval were not executed in this read-only pass). Any actor citing the 16/16 shadow eval should re-run it against current code before relying on it.

## Appendix D. Current semantic output gap summary (U-02 / V3-11D G-D2, Foundation-side measurement)

FRC emits today (`contracts.py:198-223`): contract_version, trace_id, final_strategy (6-enum), decision_type (6-enum), safety_gate_result (pass|caution|block), final_severity_class (mild|breakout|visible|red_flag | null), severity_class_basis (4-enum provenance | null), policy_rule_applied, products_allowed, recommendation_allowed, product_candidates (product_id refs), suppression_reason, forbidden_expressions, answer_substance, evidence, repair_or_verify_result, trace (+ consult_contract adds ssc_valid/ssc_errors/semantic_source/semantic_provenance/contract_safety_signal/contract_fail_closed_floor/frc_invariant — `core.py:1635-1643`).

FRC does NOT emit: `semantic_label` (the 10-enum lives only in the Cosmile V3 data dictionary §2.12), `adverse_severity` in the feedback-tuple sense, `adverse_certainty`, or any numeric/calibrated confidence (self-reported LLM confidences stay in internal trace fields). SSC's adverse tuple is input-direction (service→Foundation) about the current utterance, not an outcome label. Therefore `RecOutcomeFeedback.semanticLabel` has no Foundation source field today — emitting one would be a new cross-repo contract (greenfield in both repos; zero grep hits), feasible via the existing SSC/FRC pattern (enum + provenance + fail-closed unclear + invariant asserts) but blocked on U-01 (input), U-02 (calibration), U-07 (ownership), and Leo decisions. Deterministic partial mapping from existing FRC fields (safety_gate_result / severity class → adverse-family labels only) is the only non-greenfield option and cannot produce satisfied/repurchase-family labels — consistent with V3-11D G-D2 option (b).

## Appendix E. Raw-text persistence-surface inventory (Foundation + foundation-control)

Volatile / in-process (current_code):
1. HTTP request JSON in memory (`server.py:40-48`); raw query vars through consult pipeline; Content-Length bounded.
2. `_TRACE_RING` — in-memory, 200 cap, {path w/o query string, status, trace_id, decision}; no content (`server.py:18,35-38`).
3. shared_memory in-memory store — summary projection on read; full candidate dict in RAM (nested-key gap nuance; never disk, never read-exposed) (`store.py:36`, `gate.py:44`).

Non-raw derivatives (current_code):
4. `query_hash` = sha256(PII-masked)[:16] + `pii_detected` boolean (`core.py:879,991-992`).
5. `content_hash` sha256 (shared_memory factory); `composer_input_hash` sha256[:16] of brief (`deepseek_composer.py:48-49`).
6. foundation_trust evidence JSONL — input_sha256 + matches/decisions; raw excerpt default OFF (160-char cap when enabled) (`evidence_log.py:28-31`; policy.yaml:124-125) [test-asserted].

Disk, repo-controlled (current_code):
7. foundation_http_service: ZERO write surfaces (grep re-run).
8. Eval/test scripts: JSON reports to argv paths; several persist FIXTURE utterances + truncated answers when run (synthetic only) (`scripts/foundation_brain_v1_golden_test.py:36,99`).
9. LearningStore JSONL (raw_text_stored must be False; memory.db/ssbrain.sqlite path refusal) (`learning_approval_workflow.py:88`; `learning_memory_state.py:59,84-85`).
10. foundation_intake: vault product YAML via approval-gated draft/commit (`intake_plan.py:197-201` approved_by gate; `llm_used: False` at `:185`; runtime LLM disabled — `llm_adapter.py:7,20-22`); brand product metadata, no customer text.

Dormant write-capable code (current_code, no runtime importer):
11. `foundation_http_service/ssbrain/{schema,ingest}.py` — search_logs/think_logs DDL (schema.py:106-134), INSERT OR REPLACE (ingest.py:175-182); importer grep = engine/bm25/bridge only.

External egress (current_code → provider side unverified_runtime):
12. DeepSeek `https://api.deepseek.com/chat/completions` — raw user text ≤3 sends/request (route_shadow `core.py:1182`, semantic_classify `:1259`, one-shot repair `:1394-1396`); derived content ≤3 more (composer brief — raw query excluded, verified `deepseek_composer.py:69-117` + `core.py:1073-1112`; semantic_verify x2 with generated answer + avoid-ingredient vocabulary `core.py:1382-1396`, `llm_guard.py:30-31`); KB snippets (≤480 chars, knowledge text) inside composer brief. Single-shot transports, timeout 40s, NO retry/queue/dead-letter. Error paths return exception class names only. Gating: per-request `compose` + key-file presence + SHADOW_ON constant; NOT env-gated. No retention-control headers (`llm_guard.py:55-57`).

Unverifiable from repos (unverified_runtime — the non-persistence claim boundary):
13. Provider retention/training use; 14. process supervision capture of stdout/stderr (startup banner; `retrieval_provider` stderr `str(e)[:120]` at :33,46,88 — worst repo-local leak channel); 15. reverse proxy/access logs (FDSH_HOST env-overridable); 16. OS core dumps / PYTHONFAULTHANDLER; 17. current key-file presence (whether egress fires at all); 18. SIASIU-side writes to shared KB sqlite; 19. cross-repo symlink imports executing in-process (`repos/` → Cosmile/FOUNDATION/SIASIU); 20. mirroring of fixture-text eval reports to other repos.

## Appendix F. Affected repo-local surfaces for future work (inventory only — no implementation instructions)

foundation-control (`foundation_http_service`): `contracts.py` (SSC/FRC schema+invariants), `core.py` (consult pipeline, severity/policy gates, session boundary), `ingress_gate.py` (whitelists/enums/version gate), `semantic_router.py` (transitional scaffold), `llm_guard.py` + `deepseek_composer.py` (external transports), `server.py` (endpoints/trace ring), `profiles.py` (service vocab), plus contract tests under `tests/` and `scripts/`.

FOUNDATION: `foundation/shared_memory/*` (kind/created_from enums, gate, store, api — currently standalone/flag-OFF), `foundation/_core/foundation_customer_decision_memory.py` (+ wrapper `foundation/brain/runtime/customer_decision_memory.py`), `learning_memory_state.py`/`learning_approval_workflow.py`/`reuse_gate.py` (label lifecycle machinery), `answer_type_classifier.py` + `foundation_brain_runtime_pipeline.py` (keyword tables — constitution-sensitive), safety/medical guard modules, `foundation/api/foundation_core_service.py` + `foundation_core_contract.py`, `foundation/cosmile/*` + `foundation/siasiu/*` adapters, `foundation/feature_flags.py` (HARD_OFF), `foundation_trust/evidence_log.py` (evidence pattern), `foundation_core/registry.py` (safety vocabulary read), docs: `설계문서/FOUNDATION_지식_설계서.md`, `FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html` (untracked draft), `docs/security/*`.

Cross-repo contract surfaces (design-level): `COMMON_SERVICE_MEMORY_CONTRACT_V1` (DESIGN), `MEMORY_CONTEXT_CONTRACT_V1` (DESIGN), Option B subject_ref contract (canonical), V3 data dictionary §2.12/§2.13 (vocabulary), R-1/R-2/R-3 carry-forward gates (undecided; owner = Leo/GPT).

---

END OF ASSESSMENT (corrected). Return to: Advisor. Foundation Worker made no runtime, contract, API, or design modification; committed/pushed only this result and its pointer in foundation-docs.
