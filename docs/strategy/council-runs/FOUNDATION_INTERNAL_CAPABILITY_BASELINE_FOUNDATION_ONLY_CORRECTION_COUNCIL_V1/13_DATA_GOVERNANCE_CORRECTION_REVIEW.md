COUNCIL_MISSION_ID:
FOUNDATION_INTERNAL_CAPABILITY_BASELINE_FOUNDATION_ONLY_CORRECTION_COUNCIL_V1
ROLE:
DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER
ROLE_CATEGORY:
SPECIALIST
SUBJECT_SHA256:
d7c2f77c8f76986bda222ad926e7994267d7641dca964c65130d7af2ffc748b8
COUNCIL_COMPOSITION:
- PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER | CORE
- SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER | CORE
- DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER | CORE
- DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER | SPECIALIST
- AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER | SPECIALIST
AUTHORITY: RECOMMENDATION_ONLY
OTHER_CURRENT_CHALLENGER_REPORTS_READ: NO

VERDICT:
SUFFICIENT_WITH_CORRECTIONS

EXECUTIVE_CHALLENGE:
The revised contract correctly makes Foundation itself the decision subject, confines SIASIU and Cosmile to auditable evidence exceptions, separates seven evidence axes, limits matching and learning claims, and makes P4 non-executable behind mandatory post-evidence Council and Leo decisions. It is close to sufficient. Five bounded data-governance corrections are still required before return to Leo: define how canonical mission and source precedence is pinned when current documents conflict; add an explicit hop-by-hop knowledge-use trace from source identity through transformation and index membership to final response evidence; govern retained evidence artifacts separately from temporary-resource cleanup; correct the closure structure for composite and misclassified unknowns; and state that P4 cannot silently decide canonical identity, ownership, schema, migration, correction, retraction, rights, or stewardship. These corrections strengthen evidence meaning without designing a future schema or performing the baseline.
VERIFIED_CONTRACT_FACTS:
- Mission/runtime re-ACK: mission `FOUNDATION_INTERNAL_CAPABILITY_BASELINE_FOUNDATION_ONLY_CORRECTION_COUNCIL_V1`; session `foundation-council-data-governance`; role `DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER`; CWD live-verified as `/home/leo/Project/council/rules/data-quality-lineage-governance`; Codex CLI runtime `0.144.5`; persistent session binding re-ACKed as model `gpt-5.6-sol`, effort `xhigh`; subject SHA-256 live-verified as `d7c2f77c8f76986bda222ad926e7994267d7641dca964c65130d7af2ffc748b8`; blind independence preserved with no other current Challenger prompt or report read.
- CF-001 through CF-004 make Foundation itself the priority and allow SIASIU/Cosmile only as targeted read-only evidence for an exact Foundation question.
- The contract forbids Foundation implementation, product-code or canonical-knowledge changes, schema/shared-data changes, PII, Memory V3, promotion, downstream feature design, and automatic follow-up.
- Each material capability has separate `SOURCE`, `BUILD`, `TEST`, `RUNTIME`, `INTEGRATION`, `AUTHORITY`, and `TARGET_FIT` axes, a common evidence envelope, explicit failures, claim ceilings, and no composite `READY` score.
- P1 requires canonical identity, provenance, version, rights, correction, retraction, stewardship, transformations, derived indexes, atomicity, semantic quality, missingness, conflict, duplication, freshness, and coverage denominators.
- P2 limits execution to P1-selected isolated slices and uses exact pins, synthetic inputs, bounded resources, teardown, and safe `NOT_RUN`, `UNVERIFIED`, `PROVIDER_EXECUTION_NOT_RUN`, or affected-phase `HOLD` outcomes.
- P4 freezes content-addressed evidence, requires Independent Review, permits one non-executable candidate, and mandates post-evidence Council, Strategy, and Leo handling before any implementation.
INFERENCES:
- The downstream drift is corrected: downstream products cannot define Foundation's target architecture or justify deepening; they can only supply missing integration evidence for an exact Foundation question.
- The broad shallow census plus selected probes can answer current Foundation progress without an exhaustive audit if P1 enforces declared populations, evidence classes, and no-generalization claim ceilings.
- The evidence model prevents cross-axis promotion, but its common fields do not by themselves prove that a particular canonical record and version caused an indexed, retrieved, reasoned, and response-level result.
- “Pin the current canonical mission and exact canonical sources” is unsafe when candidate records conflict unless the pin records precedence authority and preserves unresolved conflict rather than choosing the newest or most convenient document.
- P4's non-executable status prevents immediate implementation but does not alone prevent the candidate from presenting a proposed canonical-data or stewardship choice as already decided.
MATERIAL_UNKNOWNS_LEFT_FOR_BASELINE:
- CU-001 through CU-007 remain factual baseline unknowns. This Council review resolves none of their repository, canonical, rights, runtime, downstream, provider, resource, or duration facts.
- CU-002 remains open until current mission-document identity, effective state, declared authority, precedence basis, supersession, and unresolved conflict are reproducibly pinned.
- CU-003 remains open across distinct subclaims: physical source and version; declared canonical authority; provenance and transformation lineage; rights/permitted use; correction/retraction; and stewardship. One evidence class must not close all subclaims.
- CU-004 remains open. Source or test presence cannot establish runtime retrieval, judgment use, safety behavior, response evidence, or operations.
- CU-006 remains open and may be investigated downstream only through the contract's exact evidence gate.
- CU-007 remains composite: safe local probe feasibility, external provider authority, temporary-resource and evidence-artifact governance, and duration have different owners and resolution routes.
- CU-008 is not a factual unknown as labeled. Evidence can support one candidate, but the next implementation priority remains a Strategy recommendation and `LEO_DECISION_REQUIRED`; P4 cannot resolve it as fact.

FINDINGS:
- FINDING_ID: DG-CORR-01
  SEVERITY: MATERIAL
  CLAIM: P0/P1 requires a canonical Foundation mission and source pin but does not define how authority and precedence are established when current candidate documents or sources conflict.
  CONTRACT_EVIDENCE: `01_REVISED_FOUNDATION_ONLY_DECISION_CONTRACT.md`, Current outcome envelope and P0, requires current canonical mission documents and exact canonical sources; `02_CORRECTION_FACTS_ASSUMPTIONS_UNKNOWNS_REGISTER.md` CU-002 explicitly leaves exact precedence unknown and CU-003 leaves canonical sources and stewardship unknown.
  LENS_BASIS: Canonical identity, provenance, version, supersession, authority, and preservation of conflict.
  RECOMMENDATION: Add a `CANONICAL_MISSION_AND_SOURCE_PIN_RECORD` containing candidate path or authoritative record, commit/blob/digest, declared owner and steward, authority basis, effective date, supersession/retraction state, precedence rule and its authoritative source, conflicts, and exact claim ceiling. If precedence or authority remains unresolved, record `CANONICAL_AUTHORITY_CONFLICT` or `UNVERIFIED`; do not select by filename, recency, physical use, or historical location. Unresolved mission precedence blocks broad `TARGET_FIT` grading but need not block the physical/source census.

- FINDING_ID: DG-CORR-02
  SEVERITY: MATERIAL
  CLAIM: The contract names provenance, transformations, derived indexes, retrieval, judgment, and final evidence, but lacks one mandatory record that proves hop-by-hop lineage for each decision-critical knowledge-use claim.
  CONTRACT_EVIDENCE: P1 inventories transformations and derived indexes and freezes probes; P2 captures exact probe context; the common evidence envelope has `EXACT_GIT_OR_SOURCE_PIN` and observed output but no required input/output identity, transformation version, index-membership decision, actual retrieved evidence, reasoning/judgment input, or final response linkage.
  LENS_BASIS: Distinction among raw source, canonical record, normalized fact, derived index, retrieval result, reasoning/model input, judgment output, and response evidence.
  RECOMMENDATION: Add a `KNOWLEDGE_USE_TRACE` adjunct for each selected response-affecting path. Pin source record IDs and digests; canonical status and authority basis; provenance, rights status, version and effective/retracted state; normalization/transformation code, rules, configuration and output identity; derived index/build identity and inclusion/exclusion decision; retrieved IDs, rank and truncation; actual reasoning/judgment/model context; structured and final outputs; cited evidence; downstream use or explicit non-use; and every missing link. A trace proves only its exact pinned path and population; an absent link remains `UNVERIFIED`.

- FINDING_ID: DG-CORR-03
  SEVERITY: MATERIAL
  CLAIM: Temporary-resource cleanup does not fully govern the content-addressed evidence retained after P4, which may contain copied canonical content, provider output, derived claims, paths, logs, or sensitive operational metadata.
  CONTRACT_EVIDENCE: P0/P2 requires temporary-resource and cleanup controls, while P4 freezes content-addressed current-state evidence. The contract does not explicitly state evidence-artifact purpose, copying rights, minimization, access, retention, deletion, redaction, or steward.
  LENS_BASIS: Purpose limitation, evidence provenance, rights, access, retention, deletion, and stewardship.
  RECOMMENDATION: Add a P0 `EVIDENCE_ARTIFACT_POLICY` and P4 artifact manifest. For each retained class, record purpose, source, classification, rights/permitted-copy basis, whether only a digest or metadata may be retained, minimization/redaction, access owner, storage boundary, retention/deletion rule, steward, content digest, related claim, and cleanup disposition. Never retain secrets, real PII, customer data, or unapproved protected payloads. Cleanup may pass while an authorized minimal evidence record remains; both outcomes must be explicit.

- FINDING_ID: DG-CORR-04
  SEVERITY: MATERIAL
  CLAIM: The correction register lists CU-001 through CU-008 without the complete unknown fields required by the contract, and it labels CU-008 as factual even though selecting the next implementation priority is a recommendation and Leo decision.
  CONTRACT_EVIDENCE: The contract requires every unknown to record ID, question, classification, significance, evidence, owner, method, timing, blocking effect, and final disposition. The frozen correction register supplies only short questions. CU-003 and CU-007 contain materially different evidence routes, while CU-008 is “Evidence-derived next implementation priority.”
  LENS_BASIS: Unknown preservation, evidence-route integrity, closure authority, and prevention of decision output being mislabeled as fact.
  RECOMMENDATION: Preserve the frozen register but require a complete admission unknown ledger before baseline claims. Use lossless child subresults for CU-003 and CU-007 with their own owners, evidence classes, timing, blocking effects, and approved dispositions; a parent closes only when each decision-material child closes by its proper route. Reclassify CU-008 as a nonfactual decision record: P4 may produce evidence and one candidate, Strategy may recommend, and Leo decides. Do not use `RESOLVED_BY_REPOSITORY_EVIDENCE` for that priority decision.

- FINDING_ID: DG-CORR-05
  SEVERITY: MATERIAL
  CLAIM: P4 is explicitly non-executable, but the candidate fields do not expressly forbid it from silently presenting a new canonical owner, source, schema, identifier rule, merge, migration, correction, retraction, rights treatment, or stewardship assignment as decided.
  CONTRACT_EVIDENCE: P4 allows one evidence-derived bounded Foundation implementation candidate with scope, owner, dependencies, alternatives, and unresolved decisions. Earlier non-objectives prohibit modifying canonical knowledge and schema, but the candidate's decision semantics are not explicit.
  LENS_BASIS: Canonical ownership, schema and semantic authority, correction/retraction governance, stewardship, and decision-output boundaries.
  RECOMMENDATION: State that P4 may describe a canonical-data or governance change only as `PROPOSED_PENDING_POST_EVIDENCE_COUNCIL_AND_LEO_DECISION`. It may not redefine canonical status or owner, approve a schema/identifier/merge/migration, resolve a rights conflict, suppress missing or conflicting values, or assign stewardship. Any such element must cite exact evidence and unknown IDs, preserve alternatives and rollback implications, name the authorized future decision owner, and remain outside implementation authority. Clarify that P4 bounded factual/document corrections apply only to mission evidence artifacts, never product code, canonical knowledge, or schema.

- FINDING_ID: DG-CORR-06
  SEVERITY: ADVISORY
  CLAIM: The atomic-product and retrieval coverage is appropriately non-normative, but P1 should make field/record grain and modality-specific evidence explicit so a global structural score cannot conceal localized gaps.
  CONTRACT_EVIDENCE: P1 already requires identifiers, semantics, units, locale/market/time, relationships, missingness, conflict, duplication, freshness, coverage denominators, retrieval modalities, and `STRUCTURAL_READINESS_ONLY`.
  LENS_BASIS: Semantic consistency, record grain, cardinality, duplication, freshness, coverage, and index lineage.
  RECOMMENDATION: Report structural observations by source family, entity/record grain, field or relation, locale/market/effective version, and retrieval modality. Pin identifier aliases/collisions, relation cardinality, field/record provenance, correction/retraction propagation, index corpus/build/configuration, inclusion/exclusion, and denominators. Do not produce one atomicity, corpus-quality, or retrieval-readiness score and do not infer a target schema.

FOUNDATION_ONLY_BOUNDARY:
SUFFICIENT. Foundation itself is unambiguously the subject. SIASIU and Cosmile are explicit non-objectives and cannot define target architecture, future demand, or deepening. The Foundation synchronous-commerce exclusion and Memory V3 pause are preserved. No data-governance correction requires reopening downstream goals.
DOWNSTREAM_EVIDENCE_GATE:
SUFFICIENT. The gate requires an exact Foundation question, local-evidence insufficiency, decision impact, repository/path boundary, actor, timebox, collision state, prohibited depth, and stop condition. Downstream observations may prove consumption, non-consumption, contract reality, or degraded behavior only; they must not become canonical-source authority or product requirements. An unsatisfied gate closes narrowly without automatic deepening.
EVIDENCE_AND_CLAIM_CEILINGS:
SUFFICIENT_WITH_CORRECTIONS. The seven axes, common results, evidence fields, negative/degraded probes, no-adjacent-layer inference, structural/matching/learning ceilings, and maximum non-production claim are sound. Add DG-CORR-01 through DG-CORR-04 so canonicality, rights, lineage, coverage, retained artifacts, and unknown closure cannot be inferred from physical use or successful output. `VERIFIED_PASS` always applies only to one declared axis, subject population, context, and claim ceiling.
P0_P4_BOUNDING:
SUFFICIENT. P0 admission and estimate, P1 shallow census and probe freeze, P2 selected isolated verification, P3 conditional historical/downstream evidence, and P4 evidence freeze/review/candidate form a bounded sequence. The explicit deviation rule, safe lower-evidence outcomes, immediate affected-phase HOLD conditions, no target-completeness deepening, and final stop prevent automatic expansion. Exact estimates and probe selection remain later factual work.
P4_NON_EXECUTABLE_GATE:
SUFFICIENT_WITH_CORRECTION. The status pins and post-evidence routing prevent execution, but DG-CORR-05 is required so the candidate cannot silently decide canonical data or governance while remaining nominally non-executable.
POST_EVIDENCE_COUNCIL_AND_LEO_GATE:
SUFFICIENT AND NON-BYPASSABLE AS WRITTEN. The contract requires Advisor return, the previously approved post-evidence Council challenge, Strategy synthesis, and Leo decision. No implementation, activation, dispatch, or next mission starts automatically.
REQUIRED_CORRECTIONS:
1. Add the canonical mission/source authority, precedence, supersession, and conflict record from DG-CORR-01.
2. Add the hop-by-hop `KNOWLEDGE_USE_TRACE` and exact no-generalization ceiling from DG-CORR-02.
3. Add the retained evidence-artifact policy and manifest from DG-CORR-03.
4. Require the complete unknown ledger, lossless CU-003/CU-007 subresults, and nonfactual `LEO_DECISION_REQUIRED` treatment of CU-008 from DG-CORR-04.
5. Add the explicit P4 canonical-data/governance non-decision wording and evidence-artifact-only correction scope from DG-CORR-05.
OPTIONAL_IMPROVEMENTS:
- Apply DG-CORR-06 to keep atomicity and retrieval findings localized, modality-specific, and non-normative.
- Give each correction/retraction probe a propagation check across canonical record, normalized derivative, index, cache, response evidence, and any authorized downstream consumption.
- Maintain one canonical evidence index so content, digests, claims, failures, unknowns, review, and cleanup are referenced rather than copied into inconsistent dossiers.
WHAT_WOULD_CHANGE_MY_VERDICT:
- Change to `SUFFICIENT` when all five required textual corrections are incorporated without broadening the mission, selecting a schema, or changing its authority.
- Change to `HOLD` if canonical mission/source conflict can be silently resolved by location or recency; response-use claims lack hop-by-hop lineage; retained evidence has no rights/access/retention governance; CU-008 remains a factual closure; P4 can decide canonical data or stewardship; or downstream evidence becomes a product objective.
CONFIDENCE:
HIGH

BOUNDARY_CONFIRMATION:
PRODUCT_REPOSITORY_INSPECTED: NO
PRODUCT_DECISION_MADE: NO
RISK_ACCEPTED: NO
SUBJECT_PATCHED: NO
ADVISOR_DISPATCHED: NO
IMPLEMENTATION_STARTED: NO
INDEPENDENT_REVIEW_CLAIMED: NO

RETURN_TO: STRATEGY_DECISION_ARCHITECT
STOP.
