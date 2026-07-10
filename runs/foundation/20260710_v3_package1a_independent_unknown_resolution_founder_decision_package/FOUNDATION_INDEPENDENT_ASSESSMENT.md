# FOUNDATION INDEPENDENT ASSESSMENT — V3 Package 1A Frozen Unknown Register (U-01..U-09)

Status: `BLIND_FIRST_PASS_COMPLETE`
Date: 2026-07-10
Actor: Foundation Worker (existing session; DISCOVERY_ONLY_READ_ONLY)
Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`
Return to: Advisor

## 0. Register verification and independence

- Register: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/V3_PACKAGE1A_UNKNOWN_REGISTER.md`
- Freeze commit `fab82c45f7e92ed2652dc6de9db55532fabb661b` verified present ("docs(advisor): freeze V3 Package 1A unknown register").
- Register blob at freeze commit = `0eac3e290269c5154029d79864b99c9235807013` = current working-tree blob (unchanged since freeze).
- Register SHA-256 verified: `dab0ffa15452db860d3ba6f71b58401d4447e81b811c22c3c4a87a379f26e0cb` (match).
- Register NOT edited. New findings recorded only in Addenda (Appendix C).
- Blind independence: `ADVISOR_INDEPENDENT_ASSESSMENT.md`, `runs/cosmile/20260710_v3_package1a_*`, `runs/shared/20260710_v3_package1a_*`, any `ACTOR_COMPARISON_MATRIX.md` / `FOUNDER_DECISION_PACKAGE.md` / `FOUNDER_ACCEPTANCE_SHEET.md` were NOT opened — by this session or by any of its 5 read-only evidence collectors (collector tool-call transcripts audited: non-output forbidden-path tool calls = 0). `12_COSMILE_RESULT_POINTER.md` also not opened (points at a forbidden result).
- Repo state pins at assessment time: FOUNDATION `shadow/foundation-shared-memory-v0 @ f240867`; foundation-control `shadow/m5-ingress-gate @ c89b792`; foundation-docs `main @ 1b44760`. All line numbers cite these working trees.
- Constraints honored: code/contract/API/design modification 0; DB access 0; secret/env-value access 0 (paths cited only); live model calls 0; production/live access 0; canonical product policy decided 0; Package 1B design 0.

Evidence layers used throughout: `current_code` | `current_canonical_contract` | `historical_report` | `test_evidence` | `unverified_runtime`. Assumptions are labeled explicitly. Nothing below claims production/deployed behavior from code or tests alone.

---

## U-01 FEEDBACK INPUT REALITY

FOUNDATION_POSITION:
From the Foundation side there is no feedback input path, no feedback storage target, and no concept that could attribute user text to a purchase. `foundation_http_service` is consultation-only: a repo-wide grep for feedback/outcome/order_item/orderItem/RecOutcome/semantic_label/adverse_certainty returns zero matches. The FOUNDATION repo likewise has zero RecOutcomeFeedback/OrderItem concepts; the only feedback-shaped constructs are (a) `outcome_feedback` as a memory kind + `feedback` as a created_from value in the standalone, flag-OFF, in-memory shared-memory shadow module, (b) `outcome_feedback` as a CDM type in a policy module whose rule is that it can never upgrade evidence, and (c) a null `reaction_placeholder` in a vision document. Consultation `raw_text` enters Foundation request-scoped, optional, and explicitly not used for final semantic judgment; order/payment identifiers are forbidden ingress keys deleted on sight, so Foundation structurally cannot link consultation text to an order even if asked to. Whether consultation text can ever be valid outcome evidence is not answerable from Foundation evidence: the SSC has no field distinguishing pre-purchase from post-use context. What users will actually provide is a product decision plus experiment, outside Foundation's evidence reach.

DIRECT_EVIDENCE:
- grep zero-hits for the feedback vocabulary across `foundation-control/foundation_http_service/*.py` and the whole FOUNDATION repo (executed 2026-07-10). [current_code]
- `foundation-control/foundation_http_service/contracts.py:52` — `raw_text` optional, "의미 최종판단엔 안 씀"; `core.py:1615` — forwarded only as `query`. [current_code]
- `ingress_gate.py:48` ORDER_PAYMENT_KEYS = {order, payment, shipping, order_id, payment_id, shipping_address}; `:96-97,163-164,237-238` deleted on sight with `GATE_REJECT_ORDER_PAYMENT`. [current_code]
- `FOUNDATION/foundation/shared_memory/contract.py:21,28` — MEMORY_KINDS incl. `outcome_feedback`; CREATED_FROM incl. `feedback`; flag `shared_memory_v0_shadow` default OFF (`contract.py:38-39`), module standalone (zero importers outside itself; zero references from foundation_http_service). [current_code]
- `FOUNDATION/foundation/_core/foundation_customer_decision_memory.py:9-11` — CDM_TYPES incl. outcome_feedback; NEVER_UPGRADE_EVIDENCE=("preference","outcome_feedback"). [current_code]
- `FOUNDATION/foundation_learning_strategy_kr.html:333-339` — `reaction_placeholder` with clicked/bought/feedback all null (planned, unimplemented). [historical_report]
- V3-11D gate plan G-D1: "post-order feedback 입력 경로 부재" (`foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11D_SEMANTIC_EXTRACTION_GATE_PLAN_20260707.md:69`); doc's own verdict: implementation NO. [historical_report]

FACTS:
- No feedback/rating/review input route exists in either Foundation runtime repo (grep-verified). [current_code]
- The shadow module's `outcome_feedback` allow-path is exercised only by synthetic factory candidates in tests/eval; it persists nothing (`written=False`, in-memory). [test_evidence]
- Canonical V1 memory contract (M2 v1.2, status DESIGN) lists `outcome_feedback` as a FactTypeRegistry type — vocabulary exists at design level, not runtime. `foundation-docs/설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:114`. [current_canonical_contract]
- V3-11C2 canonical design (APPROVED_WITH_ACCEPTED_RISKS) authorizes nothing operational and excludes V3-11D from scope. [current_canonical_contract]

ASSUMPTIONS (labeled):
- That current consultation text is predominantly pre-purchase intent is an assumption from flow shape (consultation intents, no post-use marker), not measured user data.

MISSING_EVIDENCE:
- Founder-selected input mode/timing; user willingness per signal type; an approved provenance rule; any marker separating post-use outcome from pre-purchase intent in text inputs.

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
Foundation's current semantic authority is consultation-safety recognition, not feedback classification, and it emits no feedback tuple. Input side (SSC): a structured adverse tuple exists — `symptom_or_discomfort` (13-enum), `semantic_adverse_severity` (5-enum), red_flag/visible booleans, and `semantic_safety_confidence` which is a DeepSeek self-reported 0-1 number passed through unvalidated. Output side (FRC): `final_severity_class` (mild|breakout|visible|red_flag) + `severity_class_basis` (provenance enum) and NO `semantic_label`, NO `adverse_certainty`, NO numeric confidence of any kind — independently re-confirming V3-11D's G-D2 from the Foundation side. The 10-label `semantic_label` vocabulary lives only in the Cosmile V3 data dictionary. On mixed statements ("slightly stinging but effective"): the existing consultation architecture already separates the adverse axis from everything else and merges raise-only — any non-unknown symptom raises `safety_signal`; escalation forces `safety_first`; the single softening path is deterministic-gated (AI can prevent but never cause it); `assert_frc_invariants` blocks basis disguising. This is structural support for the register's multi-axis assumption, but it is a safety router, not a calibrated classifier. Confidence/calibration: three constructs exist and none is calibrated — heuristic constants (0.7/0.55/0.4 by match level), LLM self-reported passthrough, and fixed consumption thresholds (0.75 intent adoption; 0.6 severity-primary and backstop trigger). No corpus, no annotation policy, no inter-rater data, no calibration code exist anywhere. Multilingual: prompts are Korean-domain; SSC `locale` is validated but not propagated into judgment (core echo hardcodes ko); the ingress raw-text heuristic keys on Hangul. A feedback semantic contract is structurally feasible by the same SSC/FRC pattern (enum + per-field provenance + fail-closed promotion + invariant asserts + unclear-fallback), but its reliability on mixed/multilingual/sarcastic real input is unmeasurable before a labeled corpus and pilot.

DIRECT_EVIDENCE:
- `contracts.py:14-22` SSC/FRC enums; `:52,65-66` raw_text/confidence intake; `:167-223` build_frc exact output (no semantic_label/adverse_certainty/confidence). [current_canonical_contract]
- `contracts.py:133-149` fail-closed promotion (any non-unknown symptom, provided-but-invalid safety enums → safety_signal; promotion recorded honestly as `foundation_fallback`). [current_code]
- `core.py:538-550` raise-only rank merges; `:1276-1283,1303` the only softening path (deterministic-gated, semantic risk can only veto it); `:578-593` severity synthesis with `uncertainty_backstop` (pass impossible for escalated adverse). [current_code]
- `core.py:193` `_CONF_BY_LEVEL` heuristic constants; `core.py:25-26` ROUTING_CONF_USE=0.75/CLAR=0.45; `:591` ai_conf>=0.6; `:1294` <0.6 backstop; `semantic_router.py:108-129` passthrough with enum guards. [current_code]
- `core.py:1577` SSC echo hardcodes locale='ko'; `ingress_gate.py:79-80` Hangul-based `_is_raw_text`. [current_code]
- `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` §2.12 — 10-value semantic_label enum with `unclear` fail-safe (self-declared CANONICAL; located in a reports directory — status/location inconsistency noted). [current_canonical_contract]
- Contract-behavior tests exist (fixtures): candidate-override adversarial 180 cases, invariant asserts, golden-20 with enum-leak regex; none test mixed-feedback/sarcasm/multilingual calibration. [test_evidence]

FACTS:
- FRC emits severity class + basis enums, not numbers; consuming services cannot receive a confidence value today. [current_code]
- `semantic_router` is declared a TRANSITIONAL scaffold; long-term raw-utterance recognition ownership = service semantic adapters; Foundation long-term role = consume/validate structured semantics + policy/safety gates (`semantic_router.py:2-22`). [current_canonical_contract]
- Existing repo-wide keyword tables ('따가','부작용' etc.) are triggers/floors/backstops by declared policy, not final semantic judges; reusing them as feedback semantic labels would collide with the no-heuristics constitution (`FOUNDATION/foundation/_core/answer_type_classifier.py:16`; CLAUDE.md §0.4). [current_code]
- Untracked draft `FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html` supplies the composition rule: safety = MAX(service semantic, Foundation guard, policy); semantic may raise, never lower. [historical_report]

ASSUMPTIONS (labeled):
- That the SSC/FRC pattern would transfer to a feedback tuple is an architectural extrapolation, not evidence.

MISSING_EVIDENCE:
- Labeled multilingual feedback corpus + annotation policy; mixed-signal precedence contract; calibration/inter-rater/false-negative-cost data; sarcasm/contradiction/late-correction handling; thresholds proven for any automatic action.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (capability/gap inventory — done) + EXPERIMENT_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — contract shape, fail-closed behavior, output gap: YES (done); real-input reliability/calibration: NO.
REQUIRES_EXPERIMENT: YES (observation-only pilot with explicit unclear/mixed fallback and human escalation).
REQUIRES_LEGAL_OR_POLICY_REVIEW: NO (for classification itself; adjacent consent issues live in U-03/U-04).
REQUIRES_LEO_PRODUCT_DECISION: YES (input mode first — corpus definition depends on it).
SAFE_DEFAULT: Agree with register. Foundation-side addition: any future tuple must keep adverse and positive axes as separate fields with raise-only merge and a non-learning `unclear` state; self-reported LLM confidence must not be exposed as calibrated confidence in any contract field.
REVERSIBILITY: MEDIUM observation-only/versioned; LOW after driving ranking/suppression/durable memory.
COST_IF_WRONG: per register; Foundation-specific worst case is a plausible-but-uncalibrated confidence field becoming a cross-repo contract surface.
CONFIDENCE: HIGH that calibration evidence is insufficient (none exists); LOW on achievable production accuracy.

---

## U-03 RETENTION / ERASURE / DATA LINEAGE

FOUNDATION_POSITION:
For Foundation-derived data the deletion problem decomposes into four surfaces with very different states. (1) Foundation durable customer stores: none exist — INVARIANTS stamp `write_performed/raw_text_stored/pii_stored/memory_write=false` on every response; the HTTP service has zero file-write surfaces; the shared-memory module is in-memory, flag OFF, standalone; canonical M2 V1 §6 states erasure = service-local only and "Foundation은 고객기억 미저장 → erasure 대상 아님". (2) Request-scoped traces: the trace ring is volatile (200 entries, path/status/trace_id/decision only, no content). (3) Service-side derivatives of Foundation outputs (persisted FRC decisions, trace_id correlation): deletion propagation there is service-local per M2; M2 §9 bans trace_id and raw identity in the same row; M2 §15 defines un-learning (erasure covers learning outputs). None of this is implemented — it is DESIGN-status contract text. (4) External provider: raw text sent to DeepSeek has no repo-controllable deletion path at all; requests carry no retention headers and no DPA artifact exists — deletion there is a legal/ops question, not a code question. Shadow deletion semantics that do exist are simulation-grade: `delete/expire` set in-instance flags; `must_not_reappear` holds only within one store instance; gate deleted/expired branches depend entirely on caller-supplied `memory_state`; re-proposal of a deleted candidate gates `allow` again (reappearance possible, untested). Retention TTLs are enum labels without any time enforcement. R-2 remains canonically unresolved and is a hard blocker before operational use/flag ON. Jurisdictional/legal retention obligations cannot be derived from any repository evidence.

DIRECT_EVIDENCE:
- `core.py:50-51` INVARIANTS; `server.py:18,35-38` trace ring; zero write-mode open()/json.dump/logging in `foundation_http_service` (grep). [current_code]
- `FOUNDATION/foundation/shared_memory/store.py:20-23,36-43,75-84` in-memory store, unconditional delete return, expire-all; `gate.py:73-77` caller-supplied memory_state dependency; ingest performs no prior-deletion lookup → re-proposal reappearance. [current_code]
- `gate.py:90-91` + `store.py` — only `retention_policy=='session'` changes behavior; short_ttl/standard_ttl/revocable identical; no timestamps anywhere. [current_code]
- `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:138,142,196` — 3-state must_not_reappear; erasure service-local only, Foundation not an erasure target; un-learning included in erasure derivatives (status: DESIGN). [current_canonical_contract]
- `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md:75-96,375-381` — R-2 unresolved; hard blocker before production/operational/flag-ON/retention claims; gate `REC_OUTCOME_RETENTION_ERASURE_POLICY_GATE`. [current_canonical_contract]
- `llm_guard.py:55-57` / `deepseek_composer.py:38-40` — Authorization+Content-Type only; no retention controls. [current_code → provider side unverified_runtime]

FACTS:
- Foundation-side "deletion propagation" today has no durable object to propagate to; the risk mass sits in (a) service-side persistence of Foundation outputs and (b) provider-side copies of raw text. [current_code + unverified_runtime]
- Eval/test artifacts on disk (`FOUNDATION/reports/*.json`, foundation-control `reports/*`) contain synthetic/fixture data and booleans/counts; they are still disk artifacts a lineage inventory must include. [historical_report]
- foundation_trust evidence log persists hash+metadata JSONL with raw excerpt default-OFF (`foundation_trust/evidence_log.py:20-42`; policy.yaml store_raw_input:false), test-asserted. [current_code, test_evidence]

ASSUMPTIONS (labeled):
- That services persist FRC-derived rows (P1 `foundation_decision_received` etc.) is taken from canonical/plan documents, not verified service DB state (service DBs not read — forbidden and out of scope).

MISSING_EVIDENCE:
- Full cross-repo data-flow/processor inventory (service-side persistence of FRC outputs; provider retention terms); jurisdiction/legal basis/retention authority; backup/log deletion capabilities; aggregate recomputation and model un-learning policy; auditable no-reappearance proof end to end.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (technical lineage inventory) + LEGAL_OR_POLICY_REVIEW_REQUIRED + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — Foundation-side surface inventory: YES (this document, Appendix E); service-side + backup/queue/provider capabilities: NO (needs ops/legal evidence).
REQUIRES_EXPERIMENT: YES (future propagation/no-reappearance tests, synthetic canary only).
REQUIRES_LEGAL_OR_POLICY_REVIEW: YES (jurisdiction, retention periods, provider processing).
REQUIRES_LEO_PRODUCT_DECISION: YES (product promises; tombstone/reuse-block acceptability).
SAFE_DEFAULT: Agree with register. Foundation-side addition: keep Foundation stateless (no new durable derivative), and treat provider egress as the dominant unresolved lineage edge — do not send live customer feedback text externally before U-05/legal resolution.
REVERSIBILITY: HIGH while writes remain disabled Foundation-side; LOW after service-side derivatives/aggregates proliferate; effectively IRREVERSIBLE for anything already sent to a provider.
COST_IF_WRONG: per register (incl. PII/security incident).
CONFIDENCE: HIGH that policy/lineage are incomplete; UNKNOWN on legal obligations (no jurisdiction evidence in repos).

---

## U-04 GUEST-TO-LOGIN IDENTITY SAFETY

FOUNDATION_POSITION:
Under Option B, Foundation has no identity-linkage capability at all, so guest-to-login stitching risk cannot originate inside Foundation — and equally cannot be policed by Foundation. Facts: Foundation mint functions unconditionally raise `SubjectMintDeprecated`; there is no SubjectRefMap, no furef↔subject map, no identity store anywhere in Foundation; `validate_subject_ref` checks format (`subj_v2_<32hex>`) + PII-free only and never resolves identity; the ingress gate silently strips `subject_ref` from session_context as unconsumed. All stitching mechanics, threat surfaces, and wrong-account risk live service-side (canonical M2: guest→subject merge service-local only; SIASIU↔Cosmile merge banned; `allow_link` single-purpose; R-3 leaves commerce-row re-keying after login undecided). Foundation's residual exposure: subject_ref is opaque to Foundation, so a service-side wrong link is invisible to Foundation gates — `cross_subject_isolation` only compares refs given within one request. Foundation-side cost of a no-linking default is zero because Foundation consumes no subject_ref today. Consent sufficiency of a login event and the user-facing default are product/legal decisions.

DIRECT_EVIDENCE:
- `FOUNDATION/foundation/shared_memory/subject_identity.py:48-50,68-76` SubjectMintDeprecated raisers; `:57-65` validate (format+PII only, value never echoed); `:38-41` `_is_production` now dead code (Option A relic; `FOUNDATION_SUBJECT_REF_DEV_FALLBACK` never read by module code). [current_code]
- `ingress_gate.py:49,165-166` subject_ref STRIP_KEYS (not a violation; Foundation 미소비). [current_code]
- `gate.py:70-71` cross_subject_isolation = same-request comparison only. [current_code]
- `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` §1-§4 — canonical Option B roles (service-local mint/secret/SubjectRefMap; Foundation format/validation/gate only). [current_canonical_contract]
- `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:101,104,143,149` service-local merge only, allow_link single-purpose, cross-service out of scope; `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md:98-117` R-3 open, gate `IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE`, "do not infer or implement re-key/stitch/link". [current_canonical_contract]
- Option B behavior test-covered on synthetic inputs (`tests/test_subject_ref_v2_hard_gate.py`: mint raises; PII/format reject enums; no mint API attr). [test_evidence]

FACTS:
- PII-in-ref rejection uses 3 regexes (email/KR-mobile/RRN) — one fewer than gate.py's 4 (no card pattern) — a minor asymmetry worth aligning whenever identity work resumes (observation only). [current_code]
- Foundation ENV reality per canonical env policy: Foundation must hold no subject secret; presence would signal an Option B violation (`FOUNDATION/docs/security/ENV_AND_MIGRATION_POLICY.md` §6). [current_canonical_contract]

ASSUMPTIONS (labeled):
- Service-side identity mechanics (anonymousRef/XOR writer, allowLink=false) are taken from the frozen register's KNOWN_FACTS and canonical docs; Cosmile code was not read (other actor's scope, independence preserved).

MISSING_EVIDENCE:
- Shared-device/account-switch threat model; consent language/revocation; proven identity signals and false-link rate; unlink/correction audit; legal basis for linking health-adjacent feedback. None derivable from Foundation repos.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (mechanics documentation — service-side actor) + LEGAL_OR_POLICY_REVIEW_REQUIRED + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — Foundation's non-capability: YES (verified); safe automatic linkage: NO (threat model + pilot needed, service-side).
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
Request-scoped processing without application-layer persistence is real and is the best-evidenced claim in this assessment — but end-to-end non-persistence CANNOT be claimed, and the dominant unresolved edge is external model egress. Verified at code layer: the HTTP service has zero file-write surfaces; stdlib server access logging is explicitly disabled; the only cross-request state is a volatile 200-entry in-memory ring holding path (query-string stripped)/status/trace_id/decision — no content; error paths emit exception class names only; the raw query is reduced to `query_hash = sha256(PII-masked)[:16]` + `pii_detected` boolean in outputs; FRC trace hardcodes `raw_pii_included: False`; KB sqlite is opened `mode=ro`; there is no queue/retry/dead-letter/backoff infrastructure anywhere (single-shot transports, timeout 40s, no automatic re-send on transport failure); no logging/faulthandler/traceback-to-file exists. However: raw user text leaves the process to `https://api.deepseek.com/chat/completions` on up to 3 sends per request (semantic router `[발화]`, guard classify `[발화]`, one-shot repair carrying the prior user message), plus derived content on up to 3 more (composer brief — verified to exclude raw query; verify x2 carries the generated answer); requests carry no retention-control headers; egress is gated per-request by `compose` + key-file presence (path constant into the SIASIU repo), not by env flag. Unverifiable from repos: provider retention/training use, process supervision capture of stdout/stderr (journald/nohup), reverse proxy logging, OS crash-dump policy, whether the key file exists right now, SIASIU-side writes to the shared KB, and anything inside cross-repo symlink imports. Dormant write-capable code exists (lifted ssbrain ingest/schema including `search_logs`/`think_logs` DDL) with no runtime importer — a latent surface, not an active one. Verification must therefore be layered: code-layer (done, boolean/count), then deployment/ops evidence, then provider terms — with synthetic canaries only, per existing guardrails. Do not claim non-persistence; do not send live customer feedback externally.

DIRECT_EVIDENCE (repo-local, all current_code unless noted):
- `server.py:84-86` log_message disabled; `:18,35-38` trace ring; `:40-48` in-memory body read; `:96-97` fixed startup banner only.
- `core.py:90-107` trace_id/mask_pii/_hash; `:879,991-992` masked hash + boolean; `contracts.py:221` raw_pii_included:False.
- grep zero write-mode open()/json.dump/logging/pickle/tempfile in `foundation_http_service`; only file opens are DeepSeek key reads.
- `llm_guard.py:12-14,53-60` transport (endpoint/model/key path; single urlopen, timeout 40, no retry); `semantic_router.py:96-100` raw send; `core.py:1259` classify(norm); `:1394-1402` one-shot repair then deterministic fallback; `deepseek_composer.py:69-117` prompt built from derived brief fields only (`brief["context"]` is a fixed label — verified `core.py:1073-1112`; `user_text` in patha briefs affects only the input hash).
- `retrieval_provider.py:13,25,36` KB `mode=ro`; `:33,46,88` stderr lines embed `str(e)[:120]` (worst repo-local leak channel — exception text could carry query fragments). 
- `ingress_gate.py:333-345` FDN_INGRESS_GATE_SHADOW default OFF, judgment-only, codes+count output; `SHADOW_MODE=True` hard reject forbidden.
- FOUNDATION shared_memory: `gate.py:16-27,40-55` raw/PII default-deny with category-only reasons; `store.py:13-14,72` read projects summary fields only. Nuance: key-name checks are top-level only — nested raw text that matches no PII regex can transiently sit in process memory (never disk, never read-exposed) (`gate.py:44` vs `:50-54`; `store.py:36`). 
- Env-var surface of runtime code (complete): FDSH_HOST/FDSH_PORT/FDSH_STARTED_AT + FDN_INGRESS_GATE_SHADOW. External-LLM calling is not env-gated.
- Dormant: `foundation_http_service/ssbrain/schema.py:106-129` search_logs/think_logs DDL + connect/commit; `ingest.py:172-198` INSERT/DELETE — zero runtime importers (only engine/bm25/bridge imported; SELECT-only).
- Eval scripts write fixture utterances + truncated answers to argv paths when run (e.g. `scripts/foundation_brain_v1_golden_test.py:36,99`) — synthetic, but a real raw-text-to-disk surface. [current_code]
- Cosmile-side masking before send (maskPii email/phone) — from register KNOWN_FACTS/canonical docs; not re-verified here (Cosmile repo out of scope). [current_canonical_contract]
- Unverified gaps (all [unverified_runtime]): provider retention (no headers/DPA — `llm_guard.py:55-57`); supervision/journald; reverse proxy (FDSH_HOST env-overridable); OS core dumps/PYTHONFAULTHANDLER; key presence; SIASIU-side KB writes; cross-repo symlink imports (`repos/` → Cosmile/FOUNDATION/SIASIU; `cosmile_loop/_bootstrap.py:17-30`); whether any fixture-text report was mirrored elsewhere.
- Test evidence: `tests/test_no_live_no_write_consultation.py:11-29` (11 write/live keys False across 140 fixtures; memory.db/ssbrain.sqlite non-creation in workspace); trace-redaction key allowlist test; ingress-gate flag tests. These check workspace file non-creation and response fields — they are not runtime storage audits. [test_evidence]

FACTS: (consolidated in Appendix E persistence-surface inventory.)

ASSUMPTIONS (labeled):
- "Raw text sent at most 3 times per request" assumes the inspected call sites are exhaustive for this repo (grep-based; cross-repo in-process imports excluded and flagged).

MISSING_EVIDENCE:
- Deployment data-flow/processor inventory; access/error/trace log configs + retention; provider data-use terms; crash/core-dump policy; an auditable synthetic-canary verification procedure run against the real deployment.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (code layer — done; ops layer — pending) + LEGAL_OR_POLICY_REVIEW_REQUIRED (provider/processor) + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — application layer: YES (done, boolean/count); infrastructure + provider: NO (ops/legal evidence).
REQUIRES_EXPERIMENT: YES (synthetic canary end-to-end; never real customer text).
REQUIRES_LEGAL_OR_POLICY_REVIEW: YES (provider processing/retention; processor obligations).
REQUIRES_LEO_PRODUCT_DECISION: YES (whether feedback text may go to an external provider at all, and which provider).
SAFE_DEFAULT: Agree with register. Foundation-side sharpening: the register's "do not send live customer feedback to Foundation or a model provider" is currently structurally supported — the only external egress is DeepSeek behind compose+key; keep repair/classify/router raw-sends out of any feedback path until provider terms are resolved.
REVERSIBILITY: MEDIUM before live data; effectively IRREVERSIBLE for text already sent to an uncontrolled provider.
COST_IF_WRONG: PII/security incident; trust damage; contract rewrite.
CONFIDENCE: HIGH that repo-local dev persistence is minimized (verified); LOW for end-to-end non-persistence outside inspected code.

---

## U-06 PRODUCT VALUE / LEARNING VALUE

FOUNDATION_POSITION:
No learning loop consumes feedback anywhere in Foundation, and — decisively for this unknown — existing Foundation policy already hard-bounds what feedback learning would be allowed to do even if a perfect classifier existed: CDM policy sets `evidence_contribution = 0.0` for preference/outcome_feedback (NEVER_UPGRADE_EVIDENCE) and `overrides_safety = False` unconditionally; knowledge-learning machinery (LMR) is approval-gated with an explicit no-auto-approve rule; `learned_promotion`, `canonical_write`, `vault_write` are HARD_OFF feature flags (code-forced False). So the permissible value envelope Foundation-side is: (a) adverse detection may raise caution (consistent with raise-only architecture), (b) observation-only signals — and NOT truth-upgrading or safety-relaxing learning. No KPI, baseline, uplift, calibration, or stop-threshold instrumentation exists in Foundation runtime (the closest artifacts are design docs: answer satisfaction score V1, closed-loop evaluation V0.1 — design layer only). Selection-bias and effect-size questions are experiment territory; the value hypothesis (safety detection vs personalization vs recommendation quality) is Leo's product decision. Foundation can contribute instrumentation surfaces (severity/decision distributions, trace fields) without choosing business thresholds.

DIRECT_EVIDENCE:
- `FOUNDATION/foundation/_core/foundation_customer_decision_memory.py:11,49-55` NEVER_UPGRADE_EVIDENCE / evidence_contribution 0.0 / overrides_safety False. [current_code]
- `FOUNDATION/foundation/feature_flags.py:5-8` HARD_OFF incl. learned_promotion/canonical_write/vault_write; get() forced False. [current_code]
- `FOUNDATION/foundation/_core/learning_approval_workflow.py:18-84` candidate→review→approved lifecycle, "자동 승인 금지". [current_code]
- grep: no KPI/uplift/calibration code in either repo; C2 organic outcome ≠ recommendation performance (register KNOWN_FACTS, consistent with zero Foundation-side attribution code). [current_code]
- Design-layer value artifacts only: `foundation-docs/설계문서/foundation/FOUNDATION_ANSWER_SATISFACTION_SCORE_V1.md`, `FOUNDATION_BRAIN_CLOSED_LOOP_EVALUATION_V0_1.md` (not runtime). [historical_report]

FACTS / ASSUMPTIONS / MISSING_EVIDENCE: per register (Foundation adds no contrary evidence); assumption labeled: that adverse feedback has safety value is plausible under the raise-only architecture but unquantified.

RESOLUTION_TYPE: EXPERIMENT_REQUIRED + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: NO for value itself; YES for the policy envelope (done — feedback cannot upgrade evidence or relax safety under current policy).
REQUIRES_EXPERIMENT: YES (observation-only pilot, predefined KPI/bias/stop rules).
REQUIRES_LEGAL_OR_POLICY_REVIEW: NO (primary); consent purpose separation (M2 §15 `purpose` axis) becomes relevant if learning input is pursued.
REQUIRES_LEO_PRODUCT_DECISION: YES (primary value hypothesis; stop condition ownership).
SAFE_DEFAULT: Agree with register (observation-only, kill switch, no ranking/durable change). Foundation-side addition: keep CDM NEVER_UPGRADE_EVIDENCE and overrides_safety=False as non-negotiable invariants of any future feedback-learning contract.
REVERSIBILITY: HIGH for isolated observation-only pilot; LOW after automated ranking/promotion.
COST_IF_WRONG: per register (dominantly low-value investment + trust damage).
CONFIDENCE: HIGH that value is currently unproven; LOW on effect size/pilot sizing.

---

## U-07 FOUNDATION SIGNAL WHITELIST OWNERSHIP AND VERSIONING

FOUNDATION_POSITION:
Ownership is definitively unresolved (R-1: the gate name `FOUNDATION_SIGNAL_WHITELIST_CONTRACT_OWNER_GATE` appears in exactly one document repo-wide — the V3-11C2 design doc that declares it missing), and the concrete Foundation-side reality demonstrates why the register's "silently interpret the same signal differently" risk is already live at the vocabulary level: at least three divergent signal vocabularies coexist today with no canonical owner — (1) FOUNDATION shared_memory `EVENT_KINDS` = (product_view, wishlist, cart, purchase, consultation_session_meta) inherited from the SUPERSEDED v0 contract; (2) foundation-control ingress `SIGNAL_KIND` = (view, add_to_cart, checkout, purchase, wishlist, alert, coupon, ai_verdict) from the M3 memory_context contract (enum-validated only; never consumed by consult logic); (3) the Cosmile-side event whitelist described in audit reports (product_viewed, cart_add, ...). No two match. The old v0 "single source of truth" that fixed EVENT_KINDS is formally SUPERSEDED with its ownership model repudiated; its successor (M2 V1) is DESIGN-status; the register's mapper/consent facts are Cosmile-side and were not re-verified here (independence). De-facto boundary today: Foundation's ingress gate is the acceptance/validation enforcing surface (whitelist keys, enums, size caps, default-deny unknown keys, version gate mctx-1.0 strict/compat) — i.e., Foundation already implements acceptance-side enforcement machinery a canonical contract could bind to; raw-event mapping is service-side. Consent enforcement: Foundation-side consent checking in the shadow gate is caller-asserted (a candidate self-declaring consent_scope gates allow; no consent registry exists), so consent authority is currently declared, not enforced. Canonical owner/location/approval model = Leo decision; joint approval (service maps, Foundation accepts) matches the observed code boundary but choosing it is not Foundation's call.

DIRECT_EVIDENCE:
- Gate-name single-occurrence grep across foundation-docs + foundation-control; `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md:54-73` (R-1 text; blocks future Foundation-facing signal expansion until resolved). [current_canonical_contract]
- `FOUNDATION/foundation/shared_memory/contract.py:29` EVENT_KINDS vs `foundation-control/foundation_http_service/ingress_gate.py:27` SIGNAL_KIND — divergent enums, both currently Foundation-side. [current_code]
- `CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md:3-5` SUPERSEDED header (ownership model repudiated; enums reference-only; no freeze commit recorded in-file); `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:177-181` §12 formal retirement. [current_canonical_contract]
- `ingress_gate.py:40-43,147-154,238-252` whitelist keys/version gate/unknown-key deny incl. catalog `match_reason` ban. [current_code]
- `FOUNDATION/foundation/shared_memory/gate.py:82` consent_ok = caller-asserted scope OR consent_record (no registry). [current_code]
- Cosmile whitelist artifacts (mapper subset, outbox, no flush worker; logged-in-assumed-consent) — register KNOWN_FACTS + `foundation-control/docs/COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702.md:59,86`; the doc defers to a Cosmile-repo file (`COSMILE_Foundation_Signal_Contract.md`) as prior 정본 — outside allowed roots, unresolved as canonical location. [historical_report]

FACTS / ASSUMPTIONS: assumption labeled — that Foundation should own acceptance constraints is an inference from where enforcement code already lives, not a decided policy.

MISSING_EVIDENCE: canonical contract path + decision owner; producer/consumer version compatibility policy; consent/privacy enforcement authority (registry, not self-declaration); allowed feedback fields + traceability identifiers; deletion/withdrawal propagation across outbox and consumer.

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
Foundation-side provenance reality: Foundation has no OrderItem/order concept anywhere, and order/payment identifiers are default-deny ingress keys deleted on sight. Under the approved boundary (raw commerce evidence stays in Cosmile; Foundation receives refined/whitelisted refs only), feedback→product/order/OrderItem linkage must be established, authorized, and stored service-side; Foundation can only ever see opaque refs. The minimum non-raw provenance Foundation would need for semantic processing and later correction — stated as discovery of what existing contract surfaces already support, NOT as a design: (1) request-scoped content (raw_text optional, as in SSC) or service-provided structured semantics; (2) product identity as a `product_id` ref — Foundation's PRISM identity is strong here: `product_id` is immutable and name-independent, with `formula_version`/`name_history`, so feedback pinned to a product_id ref can survive renames and be formula-version-aware; (3) a stable opaque correlation ref for dedup/correction/retraction — the keyed-hash pattern M2 §15 fixes for attribution (raw trace_id stored next to identity is banned by M2 §9); (4) a source-type enum (consultation/feedback/etc. — CREATED_FROM already models this); (5) NO customer/order/payment identity — Foundation must stay attribution-blind. When linkage is absent or ambiguous: consistent with every existing Foundation default-deny surface, the correct behavior is no learning write and a non-learning review state — silently attaching by recency/session heuristics would also violate the no-heuristics constitution. Which minimum fields `RecOutcomeFeedback` itself needs (orderItemId cardinality, selection UX, dedup identity) is Cosmile-side reality plus Leo decision; the cross-repo contract may only be designed after those decisions (per register HOW_TO_RESOLVE; Package 1B not designed here).

DIRECT_EVIDENCE:
- `ingress_gate.py:47-48,95-97` IDENTIFIER_KEYS + ORDER_PAYMENT_KEYS default-deny; `contracts.py:37-73` SSC has no order/subject fields; `contracts.py:186` product_candidates = product_id refs only. [current_code]
- PRISM identity: `FOUNDATION/CLAUDE.md` §3 and `FOUNDATION/설계문서/FOUNDATION_제품레코드_PRISM_설계서.md` (product_id = {brand}-{type}-{line_key}-{seq} 불변, formula_version, name_history); vault records read via `foundation_core/_read.py:76 parse_product_prism`. [current_canonical_contract / current_code]
- `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md:159` (§9 trace_id↔raw identity same-row ban; payload_refs only), `:197` (§15 keyed-hash attribution join key; FRC memory_reuse_decision W15 prerequisite). [current_canonical_contract]
- `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md:119-134` official decisions #7-#10 (raw evidence stays in Cosmile; refined signals only; traceability anchors). [current_canonical_contract]
- Register KNOWN_FACTS on RecOutcomeFeedback schema/V3-04 fields — accepted as given; Cosmile prisma not read (independence/scope). [current_canonical_contract per register]

FACTS / ASSUMPTIONS: assumption labeled — that product_id refs would be the product anchor presumes services pass Foundation product_ids (Cosmile catalog_candidates already carry `product_id` through the ingress whitelist: `ingress_gate.py:43`).

MISSING_EVIDENCE: user-visible selection/authorization flow; source-event/dedup identity; correction/retraction linkage; product/SKU/OrderItem cardinality; which source types become product features.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (Foundation minimum stated here; Cosmile surface mapping = other actor) + LEO_PRODUCT_DECISION_REQUIRED + EXPERIMENT_REQUIRED.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — Foundation-side boundary + supportable refs: YES (done); linkage UX/authorization: NO.
REQUIRES_EXPERIMENT: YES (explicit-linkage completion/quality, after product decision).
REQUIRES_LEGAL_OR_POLICY_REVIEW: NOT PRIMARY.
REQUIRES_LEO_PRODUCT_DECISION: YES (source types as product features; linkage UX).
SAFE_DEFAULT: Agree with register (no RecOutcomeFeedback writes; reject ambiguous linkage; no inference from recency/consultation context). Foundation-side addition: any future contract must keep Foundation attribution-blind (opaque refs only; order/payment/customer identity remains ingress-rejected).
REVERSIBILITY: HIGH before writes; LOW after mislabeled feedback propagates.
COST_IF_WRONG: per register (identity/data corruption dominant).
CONFIDENCE: HIGH that Foundation-side provenance surface is as stated (verified); HIGH that provenance implementation is absent (register + zero-hit greps).

---

## U-09 SAFETY RESPONSE, LEARNING, AND CORRECTION BOUNDARY

FOUNDATION_POSITION:
The separation the register asks for — immediate safety response vs durable learning with different evidence thresholds — is already structurally encoded in Foundation at three layers, and what is missing is exactly the feedback-specific connective tissue. Layer 1, immediate response (request-scoped, never writes): deterministic raise-only gates (`_max_gate/_max_decision`), fail-closed promotion of any safety-shaped signal (including provided-but-invalid enums), an uncertainty backstop that makes `pass` impossible for escalated adverse cases, a contract-level pass→caution floor, block suppression zeroing product exposure, and `forbidden_expressions` banning `continue_use_permission`/`efficacy_overclaim` — this machinery already delivers "conservative immediate guidance without proving causality". Layer 2, learning boundary (policy modules): CDM — outcome_feedback/preference contribute 0.0 evidence and never override safety; shadow gate — sensitive kinds (concern/reaction/safety_note) force ask_consent without consent, high sensitivity blocks without reconfirmation; deleted/expired must_not_reappear (with the U-03 caveats). Layer 3, promotion: LMR approval workflow (no auto-approve; supersede/block/deprecate lifecycle) + HARD_OFF learned_promotion. What does NOT exist: a feedback semantic contract (U-02), human-review ownership/SLA, calibration thresholds for automatic vs manual action, and any correction/retraction propagation path — within Foundation there is no durable object to correct (nothing persists), so correction is a service-side memory question plus a contract question about how a later contradiction may or may not relax a safety state. On that last point the current architecture is instructive: within a request, safety is raise-only by construction (a positive/corrective clause cannot lower it); across requests Foundation is stateless, so any "safety downgrade on contradiction" rule would have to be an explicit new contract — the register's assumption that contradiction must not auto-erase a safety block is aligned with every existing Foundation invariant. Product workflow, escalation path, and human-review promise = Leo decision; thresholds = evidence-driven after pilot.

DIRECT_EVIDENCE:
- Layer 1: `core.py:538-550,1452,1456-1457` raise-only merges; `contracts.py:133-149` fail-closed promotion + honest provenance; `core.py:578-593,530-531` severity gate + uncertainty_backstop; `core.py:1624-1634` contract fail-closed floor; `contracts.py:176-197,226-279` block suppression + invariant asserts. [current_code]
- Layer 2: `foundation_customer_decision_memory.py:11,49-55`; `shared_memory/gate.py:80-88` sensitive/ask_consent/high-block; `:73-77` must_not_reappear (caveats in U-03). [current_code]
- Layer 3: `learning_approval_workflow.py:18-84` (no auto-approve; supersede linkage); `feature_flags.py:5-8` HARD_OFF. [current_code]
- V0 §3 note (inherited policy line, superseded doc but mirrored in CDM code): preference/outcome_feedback must not upgrade evidence or override safety. [historical_report → enforced in current_code]
- No correction/retraction path: grep zero-hits for retraction/tombstone in both repos; nothing to propagate to Foundation-side. [current_code]
- Escalation behavior fixture-tested (adversarial override suite, golden-20); no real-user calibration. [test_evidence]

FACTS / ASSUMPTIONS: assumption labeled — that layer-1 conservative guidance is an acceptable immediate product behavior is a product question; Foundation evidence only shows it is what the code does today.

MISSING_EVIDENCE: product-approved immediate behavior + escalation path; contract separating observed report / semantic proposal / policy decision / durable learning; human-review ownership/SLA; correction/contradiction/no-reappearance propagation; auto-vs-manual calibration evidence.

RESOLUTION_TYPE: EVIDENCE_RESOLVABLE (current authority documented here) + EXPERIMENT_REQUIRED + LEGAL_OR_POLICY_REVIEW_REQUIRED (health-adjacent adverse handling/escalation duty) + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION: PARTIAL — current safety authority + feasible structured outputs: YES (done); thresholds/workflow: NO.
REQUIRES_EXPERIMENT: YES (calibration for any automatic action).
REQUIRES_LEGAL_OR_POLICY_REVIEW: YES (adverse-event escalation obligations).
REQUIRES_LEO_PRODUCT_DECISION: YES (immediate behavior, human-review promise, contradiction rule).
SAFE_DEFAULT: Agree with register verbatim. Foundation-side addition: encode the existing three-layer separation as explicit invariants of any feedback contract — adverse signals may raise request-scoped caution; they may never auto-produce positive learning, causal claims, permanent promotion, or safety downgrade; contradiction resolution requires an explicit rule + review, never automatic erasure.
REVERSIBILITY: MEDIUM for request-scoped caution (already the architecture); LOW for durable memory/suppression/causal claims.
COST_IF_WRONG: per register (full list).
CONFIDENCE: HIGH that safety and learning must remain separate (already enforced by code/policy); LOW on final product workflow.

---

## Appendix A. Exact files read

Directly by Foundation Worker (this session):
- Register + briefs: `V3_PACKAGE1A_UNKNOWN_REGISTER.md` (freeze-verified), `02_FOUNDATION_DISCOVERY_BRIEF.md`, `06_FOUNDATION_DISCOVERY_HANDOFF_PROMPT.md`.
- foundation-control: `foundation_http_service/contracts.py` (full), `server.py` (full), `core.py` (lines 40-100, 538-560, 1073-1112, 1164-1255 targeted, 1584-1646, 1717-1724 + greps), `semantic_router.py` (1-120), `llm_guard.py` (full), `deepseek_composer.py` (full), `ingress_gate.py` (full), `retrieval_provider.py` (1-30 + greps); `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` (full).
- FOUNDATION: `foundation/shared_memory/{contract,gate,store,api,subject_identity,reason_codes,_factory,eval}.py` (full), `tests/` (structure + heads), `foundation/_core/foundation_customer_decision_memory.py` (head+greps), `foundation/_core/learning_memory_state.py` (greps), `foundation/lmr/state.py`, dir listings of `foundation/{_core,lmr,brain,trust_core}`, `foundation/feature_flags.py` (via collector cross-check), `CLAUDE.md`, `docs/security/*` (this session's earlier reads), `docs/testing/TEST_MEANING_POLICY.md`.
- foundation-docs canonical: `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md` (full), `설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` (targeted: header, R-1/2/3, decisions), `docs/reports/control/COSMILE_MEMORY_V3_11D_SEMANTIC_EXTRACTION_GATE_PLAN_20260707.md` (targeted), `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` (header+§1-6), `설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md` (full, role reload).

Via 5 read-only evidence collectors (full lists embedded in their structured outputs; highlights):
- foundation-control: `foundation_http_service/{core.py remaining regions, patha_reasoning.py, profiles.py, __init__.py, ssbrain/schema.py+ingest.py+engine.py (write-path greps)}`, `cosmile_loop/{_bootstrap.py, cosmile_feature_flags.py}`, `foundation_consultation/_found_bootstrap.py`, `memory_sim/mock_foundation_gate.py`, `caller_intake/intent_risk_classifier.py`, `tests/{_harness, test_no_live_no_write_consultation, test_cross_project_consultation_trace_redaction, test_ingress_gate}.py`, `scripts/*` (docstrings + write-sink greps), `CLAUDE.md`, `docs/security/*`, sampled `reports/integrated/*`.
- FOUNDATION: `foundation_core/{config,_read,registry,__init__}.py`, `foundation_intake/{intake_plan,__main__,llm_adapter,prism_writer}.py`, `foundation_trust/{evidence_log,engine,policy.yaml,tests}`, `foundation/_core/{learning_approval_workflow, foundation_file_intake, foundation_api_scope_guard, answer_type_classifier, foundation_brain_runtime_pipeline, guards}`, `foundation/api/foundation_core_service.py`, `foundation/README_MATERIALIZATION.md`, `설계문서/{README, FOUNDATION_지식_설계서, FOUNDATION_INTAKE_ENGINE_설계서, FOUNDATION_VAULT_INGEST_DESIGN}.md`, `docs/FOUNDATION_SHARED_MEMORY_V0_SHADOW_20260629.md`, `reports/FOUNDATION_SHARED_MEMORY_V0_SHADOW_EVAL_20260629.json`, `HANDOFF.md`, `foundation_learning_strategy_kr.html` (targeted).
- Vault (read-only): `/home/leo/data/vaults/SIASIU_COSMILE_VAULT/_dashboard/dashboard.py` (targeted), `knowledge/ingredients/cosmetic/retinol.md` (safety block sample), knowledge dir listings.
- foundation-docs canonical (collector): `MEMORY_CONTEXT_CONTRACT_V1_20260704.md` (§8/§9), `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` (§2.12/§2.13), `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md` (header/owns), `COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md` (header), Phase 2A plan headers, `foundation-control/docs/{CROSS_PLATFORM_SHARED_MEMORY_V0_RELEASE_TRAIN_20260629, COSMILE_EVENT_TRACKING_SPEC_20260702, COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702}.md` (targeted), `foundation-control/docs/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md` (header).

## Appendix B. Files not read (relevant, with reason)

- FORBIDDEN (blind independence; verified untouched): `ADVISOR_INDEPENDENT_ASSESSMENT.md`; `runs/cosmile/20260710_v3_package1a_*`; `runs/shared/20260710_v3_package1a_*`; any `ACTOR_COMPARISON_MATRIX.md`/`FOUNDER_DECISION_PACKAGE.md`/`FOUNDER_ACCEPTANCE_SHEET.md`; `12_COSMILE_RESULT_POINTER.md`.
- Cosmile repo (`/home/leo/Project/Cosmile`) — other actor's discovery scope; register KNOWN_FACTS accepted as given for Cosmile-side claims (labeled where used).
- SIASIU repo runtime — out of scope except cited path constants (KB sqlite path, DeepSeek key path — key value never read).
- `/home/leo/Project/SIASIU/.secrets/deepseek_key`, any `.env` — secret values (paths cited only).
- Service DBs / prisma / memory.db / live environments / provider dashboards — forbidden (no DB access, no live access).
- `foundation-control/foundation_http_service/core.py` lines 110-537, 605-870, 1001-1058 full-read (lexicon/planner bodies) — grep-verified no transport/write/feedback symbols; `ssbrain/{bm25,bridge,graph,text}.py` full-read — SELECT-only verified by grep.
- `FOUNDATION/설계문서/{FOUNDATION_제품레코드_PRISM, 데이터코어, 검색아키텍처, TRUST_CORE}` full-read — code read directly instead; `SECURITY_ARCHITECTURE_V1_BLUEPRINT.html` (FROZEN, cited from index).
- Cosmile-repo `COSMILE_Foundation_Signal_Contract.md` — cited by control docs as prior 정본 but lives outside allowed roots; its acceptance as canonical whitelist location is exactly part of open R-1.
- Other jobs' advisor briefs/assessments in foundation-docs — assessments, not canonical contracts.

## Appendix C. Unknown addenda (register NOT edited)

ADD-F1 — VAULT DASHBOARD UNAUTHENTICATED WRITE PATH (new unknown; outside the nine frozen unknowns' feedback scope but inside this mission's persistence-surface focus)
- Source: `/home/leo/data/vaults/SIASIU_COSMILE_VAULT/_dashboard/dashboard.py:270-272` (POST `/api/ingest/products`), `:116-143` (`ingest_products` writes `products/{brand}/{rid}.md` into the vault and moves raw files to `_done/`), `:280` (binds 127.0.0.1:8810), `:275` (request logging disabled). Discovered 2026-07-10 during the U-05 repo-local persistence sweep. [current_code; runtime status unverified]
- Unknown: is this localhost, unauthenticated, canonical-vault write path within approved write governance? It bypasses the foundation_intake plan/draft/commit approval flow (which refuses overwrites and requires `approved_by`) and coexists with the HARD_OFF `vault_write` flag in `foundation/feature_flags.py` (different process — the flag does not bind the dashboard). Content is brand product intake (not customer data), so no PII exposure is implied; the issue is write-governance consistency.
- Why it matters here: U-03/U-05 lineage and persistence claims assume vault writes are approval-gated; this path is an exception candidate.
- Proposed resolution type: EVIDENCE_RESOLVABLE (runtime status: is 8810 live?) + LEO_PRODUCT_DECISION (whether the path stays, gets approval-gated, or is retired). No register edit made.

Evidence-freshness note (not a new unknown): the on-disk shared-memory eval JSON (`FOUNDATION/reports/FOUNDATION_SHARED_MEMORY_V0_SHADOW_EVAL_20260629.json`) and the in-repo design doc predate W4 (category-only reason codes) and Option B — e.g. the stored report contains field-suffixed reason codes current code cannot emit. No on-disk runtime evidence exists for the CURRENT shared-memory code state (tests/eval not executed in this read-only pass). Any actor citing 16/16 shadow eval evidence should re-run it against current code before relying on it.

## Appendix D. Current semantic output gap summary (U-02/V3-11D G-D2, Foundation-side measurement)

FRC emits today (`contracts.py:198-223`): contract_version, trace_id, final_strategy (6-enum), decision_type (6-enum), safety_gate_result (pass|caution|block), final_severity_class (mild|breakout|visible|red_flag | null), severity_class_basis (4-enum provenance | null), policy_rule_applied, products_allowed, recommendation_allowed, product_candidates (product_id refs), suppression_reason, forbidden_expressions, answer_substance, evidence, repair_or_verify_result, trace (+ consult_contract adds ssc_valid/ssc_errors/semantic_source/semantic_provenance/contract_safety_signal/contract_fail_closed_floor/frc_invariant).

FRC does NOT emit: `semantic_label` (10-enum lives only in the Cosmile V3 data dictionary), `adverse_severity` in the feedback-tuple sense, `adverse_certainty`, any numeric/calibrated confidence (self-reported LLM confidences stay in internal trace fields). SSC's adverse tuple is input-direction (service→Foundation) about the current utterance, not an outcome label. Therefore: `RecOutcomeFeedback.semanticLabel` has no Foundation source field today — emitting one would be a new cross-repo contract (greenfield in both repos; zero grep hits), feasible via the existing SSC/FRC pattern (enum + provenance + fail-closed unclear + invariant asserts) but blocked on U-01 (input), U-02 (calibration), U-07 (ownership), and Leo decisions. Deterministic partial mapping from existing FRC fields (safety_gate_result/severity class → adverse-family labels only) is the only non-greenfield option and cannot produce satisfied/repurchase-family labels — consistent with V3-11D G-D2 option (b).

## Appendix E. Raw-text persistence-surface inventory (Foundation + foundation-control)

Volatile / in-process (current_code):
1. HTTP request JSON in memory (`server.py:40-48`); raw query vars through consult pipeline (norm0/norm); Content-Length bounded.
2. `_TRACE_RING` — in-memory, 200 cap, {path w/o query string, status, trace_id, decision}; no content (`server.py:18,35-38`).
3. shared_memory in-memory store — summary fields + full candidate dict in RAM (nested-key gap nuance; never disk, never read-exposed) (`store.py:36`, `gate.py:44`).

Non-raw derivatives (current_code):
4. `query_hash` = sha256(PII-masked)[:16] + `pii_detected` boolean (`core.py:879,991-992`).
5. `content_hash` sha256 (shared_memory factory); `composer_input_hash` sha256[:16] of brief (`deepseek_composer.py:48-49`).
6. foundation_trust evidence JSONL — input_sha256 + matches/decisions; raw excerpt default OFF (160-char cap when enabled) (`evidence_log.py:20-42`; policy.yaml store_raw_input:false) [test-asserted].

Disk, repo-controlled (current_code):
7. foundation_http_service: ZERO write surfaces (grep-verified).
8. Eval/test scripts: JSON reports to argv paths; several persist FIXTURE utterances + truncated answers when run (synthetic only) (`scripts/foundation_brain_v1_golden_test.py:36,99` et al.).
9. LearningStore JSONL (raw_text_stored must be False; memory.db/ssbrain.sqlite path refusal) (`learning_approval_workflow.py:88-111`).
10. foundation_intake: vault product YAML via approval-gated draft/commit (no customer text; `llm_used: False` hardcoded; runtime LLM 0 verified).
11. Vault dashboard write path — see ADD-F1 (product intake md; approval-flow bypass candidate).

Dormant write-capable code (current_code, no runtime importer):
12. `foundation_http_service/ssbrain/{schema,ingest}.py` — search_logs/think_logs DDL, INSERT/DELETE/commit; zero importers (only SELECT-only engine/bm25/bridge imported).

External egress (current_code → provider side unverified_runtime):
13. DeepSeek `https://api.deepseek.com/chat/completions` — raw user text ≤3 sends/request (route_shadow `[발화]`, semantic_classify `[발화]`, one-shot repair); derived content ≤3 more (composer brief — raw query excluded, verified; semantic_verify x2 with generated answer + avoid-vocabulary tokens); KB snippets (≤480 chars, knowledge text) inside composer brief. Single-shot transports, timeout 40s, NO retry/queue/dead-letter (no retry amplification of raw text). Error paths return exception class names only. Gating: per-request `compose` + key-file presence (`/home/leo/Project/SIASIU/.secrets/deepseek_key` — path constant, value never read) + SHADOW_ON constant; NOT env-gated. No retention-control headers.

Unverifiable from repos (unverified_runtime — the non-persistence claim boundary):
14. Provider retention/training use; 15. process supervision capture of stdout/stderr (startup banner; `retrieval_provider` stderr `str(e)[:120]` — worst repo-local leak channel); 16. reverse proxy/access logs (FDSH_HOST env-overridable); 17. OS core dumps / PYTHONFAULTHANDLER; 18. current key-file presence (whether egress fires at all); 19. SIASIU-side writes to shared KB sqlite; 20. cross-repo symlink imports executing in-process (`repos/` → Cosmile/FOUNDATION/SIASIU); 21. mirroring of fixture-text eval reports to other repos.

## Appendix F. Affected repo-local surfaces for future work (inventory only — no implementation instructions)

foundation-control (`foundation_http_service`): `contracts.py` (SSC/FRC schema+invariants), `core.py` (consult pipeline, severity/policy gates, session boundary), `ingress_gate.py` (whitelists/enums/version gate), `semantic_router.py` (transitional scaffold), `llm_guard.py` + `deepseek_composer.py` (external transports), `server.py` (endpoints/trace ring), `profiles.py` (service vocab), plus contract tests under `tests/` and `scripts/`.

FOUNDATION: `foundation/shared_memory/*` (kind/created_from enums, gate, store, api — currently standalone/flag-OFF), `foundation/_core/foundation_customer_decision_memory.py` (+ wrapper `foundation/brain/runtime/customer_decision_memory.py`), `learning_memory_state.py`/`learning_approval_workflow.py`/`reuse_gate.py` (label lifecycle machinery), `answer_type_classifier.py` + `foundation_brain_runtime_pipeline.py` (keyword tables — constitution-sensitive), safety/medical guard modules, `foundation/api/foundation_core_service.py` + `foundation_core_contract.py`, `foundation/cosmile/*` + `foundation/siasiu/*` adapters, `foundation/feature_flags.py` (HARD_OFF), `foundation_trust/evidence_log.py` (evidence pattern), `foundation_core/registry.py` (by_conc safety vocabulary read), docs: `설계문서/FOUNDATION_지식_설계서.md`, `FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html` (untracked draft), `docs/security/*`.

Cross-repo contract surfaces (design-level): `COMMON_SERVICE_MEMORY_CONTRACT_V1` (DESIGN), `MEMORY_CONTEXT_CONTRACT_V1` (DESIGN), Option B subject_ref contract (canonical), V3 data dictionary §2.12/§2.13 (vocabulary), R-1/R-2/R-3 carry-forward gates (undecided; owner = Leo/GPT).

---

END OF ASSESSMENT. Return to: Advisor. Foundation Worker made no runtime, contract, API, or design modification; committed/pushed only this result and its pointer in foundation-docs.
