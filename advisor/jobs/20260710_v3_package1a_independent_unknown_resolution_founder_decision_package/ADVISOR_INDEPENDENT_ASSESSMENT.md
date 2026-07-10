# Advisor Independent Assessment

Date: 2026-07-10

Mode: `BLIND_FIRST_PASS__REPO_GROUNDED__DISCOVERY_ONLY`

Assessed before reading other actor results: `true`

## Independence Statement

At the time of writing, Advisor had not received or read a Foundation Worker, Cosmile Worker, or Fable5 assessment for this mission. This assessment uses repository code, approved canonical records, and historical evidence only. It does not select final architecture or product policy.

## Overall Position

Package 1B is not design-ready. The missing pieces are not one implementation detail; they span product input, semantic contract, provenance, identity, retention, infrastructure privacy, safety correction, contract ownership, and measurable value.

The safest dependency order is:

1. freeze what is unknown;
2. independently verify current producer, authority, and adversarial perspectives;
3. make only the minimum founder product/policy decisions;
4. then allow Control to design Package 1B against explicit decisions and unresolved experimental gates.

## U-01 - Feedback Input Reality

ADVISOR_POSITION: Current reality is storage skeleton without a feedback product. `RecOutcomeFeedback` exists in schema and tests, but no user input path or writer exists. Consultation is real user text but is not proven post-use outcome evidence and lacks an approved OrderItem provenance path.

EVIDENCE:
- `../Cosmile/app/prisma/schema.prisma` model `RecOutcomeFeedback`
- no `RecOutcomeFeedback` runtime reference beyond schema/types/tests in inspected source search
- order UI/API files contain display-only order behavior
- V3-11D G-D1 gate

RESOLVABLE_NOW: Current path absence and technical UX options can be resolved now. Actual user behavior, completion rate, and signal value require a pilot.

DELEGATE_TO_TECHNICAL_VERIFICATION: Inventory all current input surfaces and explicit product/order linkage options.

LEO_GPT_DECISION_REQUIRED: Choose the first user-facing feedback mode and when it appears. Do not ask Leo/GPT for route names or table fields.

SAFE_DEFAULT: No semantic feedback writes; consultation is not outcome evidence.

CONFIDENCE: HIGH.

## U-02 - Semantic Classification Reliability

ADVISOR_POSITION: Existing consultation semantics demonstrate components, not a validated post-order feedback classifier. One exclusive `semanticLabel` plus separate adverse fields can technically represent some mixed statements, but no approved contract says how to encode multiple simultaneous meanings, sarcasm, multilingual ambiguity, or correction. No confidence threshold should be selected without calibration data.

EVIDENCE:
- current Cosmile label and adverse schema fields
- foundation-control SSC/FRC and semantic router
- absence of feedback-specific output tuple and calibration corpus

RESOLVABLE_NOW: Contract capabilities, test gaps, and safe fallbacks can be defined now. Production reliability and thresholds cannot be proven before representative evaluation and pilot evidence.

DELEGATE_TO_TECHNICAL_VERIFICATION: Foundation Worker should identify feasible output shapes, current semantic ownership, raw-text surfaces, and calibration limitations.

LEO_GPT_DECISION_REQUIRED: Decide whether the initial product accepts free text, structured choices, or both, and whether ambiguous feedback may produce any user-visible or learning action.

SAFE_DEFAULT: Multi-axis preservation, adverse-first, unclear/non-learning fallback, no auto-promotion.

CONFIDENCE: HIGH that current evidence is insufficient; LOW on future model quality.

## U-03 - Retention / Erasure / Data Lineage

ADVISOR_POSITION: R-2 is a hard pre-operational blocker. Historical documents propose deletion states, but current canonical approval explicitly says the policy is missing, and current runtime lacks complete feedback lineage. Legal periods and backup duties cannot be inferred.

EVIDENCE:
- approved Commerce Memory R-2 gate
- historical data dictionary conflict
- current schema and outbox shapes
- no inspected end-to-end propagation implementation

RESOLVABLE_NOW: Technical lineage and capability inventory can be resolved now. Legal obligations require external review after jurisdiction, data category, and product promise are known.

DELEGATE_TO_TECHNICAL_VERIFICATION: Map raw input, derived label, candidate, signal, logs, queues, aggregates, and deletion/reuse-block capabilities.

LEO_GPT_DECISION_REQUIRED: Choose the product promise for deletion, correction, and reuse blocking after legal/policy inputs exist.

SAFE_DEFAULT: No operational persistence or learning; no retention claim.

CONFIDENCE: HIGH that current policy is incomplete.

## U-04 - Guest-To-Login Identity Safety

ADVISOR_POSITION: No-linking must remain the default until threat analysis and founder policy exist. Current strict XOR behavior is conservative but loses data. That loss is preferable to cross-account contamination during discovery.

EVIDENCE:
- `subjectRef`/`anonymousRef` generators and XOR constraints
- C2 writer `xor_violation`
- `SubjectRefMap.allowLink=false`
- approved R-3 gate

RESOLVABLE_NOW: Current identity/session mechanics and threat cases can be documented now. Safe automatic linkage accuracy is unlikely to be fully proven before controlled use.

DELEGATE_TO_TECHNICAL_VERIFICATION: Cosmile Worker should map cookie/session/account transitions and reversible linkage options without accessing customer data.

LEO_GPT_DECISION_REQUIRED: Choose no linking versus explicit-consent additive linking as the product default after threat review. Do not ask Leo/GPT to select an algorithm.

SAFE_DEFAULT: No stitch, no re-key, no inference.

CONFIDENCE: HIGH.

## U-05 - Raw-Text Non-Persistence Reality

ADVISOR_POSITION: The repository supports a narrower statement: the dev server does not intentionally durably write raw consultation text and minimizes its own logs. It does not support an end-to-end non-persistence claim. Raw content enters process memory and may enter external model transport; deployment and provider surfaces are unverified.

EVIDENCE:
- foundation-control `server.py`, `core.py`, `semantic_router.py`, `llm_guard.py`, and composer
- Cosmile masking adapter
- no deployment/observability/provider evidence accessed

RESOLVABLE_NOW: Repo-local surfaces and configuration requirements can be inventoried. Production proof requires an approved environment, operations evidence, provider policy, and synthetic canary verification.

DELEGATE_TO_TECHNICAL_VERIFICATION: Foundation Worker maps repo-local and external surfaces; later security/operations mission verifies configuration without secrets.

LEO_GPT_DECISION_REQUIRED: Choose whether raw free-text processing by an external provider is acceptable at all and what user disclosure/consent promise applies.

SAFE_DEFAULT: No live feedback text to Foundation/provider; no non-persistence claim.

CONFIDENCE: HIGH for inspected code, LOW end to end.

## U-06 - Product / Learning Value

ADVISOR_POSITION: Value is unproven and cannot be resolved through architecture review. The initial pilot must separate safety-detection value from recommendation-uplift value and define a stop condition before collection. Voluntary feedback is predictably selected, but the size and direction of bias are unknown.

EVIDENCE:
- proposed analytics in V3 reports
- absent runtime input and pilot evidence
- organic C2 attribution cannot measure recommendation performance

RESOLVABLE_NOW: Instrumentation possibilities and candidate KPIs can be documented. Effect size, sample size, and learning value require experiment design and data.

DELEGATE_TO_TECHNICAL_VERIFICATION: Workers identify measurable signals and instrumentation constraints; they do not select business success thresholds.

LEO_GPT_DECISION_REQUIRED: Select one primary value hypothesis and acceptable pilot burden. Exact numeric thresholds should follow measurement design, not intuition.

SAFE_DEFAULT: Observation-only pilot; no ranking/memory effect; kill switch.

CONFIDENCE: HIGH that value is unproven.

## U-07 - Foundation Signal Whitelist Ownership And Versioning

ADVISOR_POSITION: R-1 is genuinely unresolved despite an older Cosmile file calling itself canonical. Current mapper implementation, consent assumption, and newer approved carry-forward gate show that producer documentation alone is not a cross-repo authority contract.

EVIDENCE:
- approved R-1 gate
- Cosmile signal contract and mapper
- mapper subset, pending-only behavior, no flush worker found

RESOLVABLE_NOW: Producer and consumer surfaces can be inventoried. Final authority and approval model require Leo/GPT before Control designs the contract.

DELEGATE_TO_TECHNICAL_VERIFICATION: Foundation and Cosmile Workers independently describe what each side can safely produce/consume.

LEO_GPT_DECISION_REQUIRED: Choose whether ownership is Foundation, Cosmile, or jointly governed with a named final authority.

SAFE_DEFAULT: No feedback signal expansion or sending.

CONFIDENCE: HIGH.

## U-08 - Feedback Provenance, Order-Item Linkage, And Contract Shape

ADVISOR_POSITION: Provenance is a prerequisite, not an implementation afterthought. Current schema requires an `orderItemId` but does not itself prove user authorization, source type, dedup identity, correction path, or trace lineage. Historical richer fields are proposals and cannot be silently imported.

EVIDENCE:
- current schema versus V3-04 proposed feedback fields
- no writer or explicit order-item selection flow
- current consultation lacks deterministic order-item linkage

RESOLVABLE_NOW: Technical linkage options and minimal evidence requirements can be compared now. The product-supported source types require Leo/GPT.

DELEGATE_TO_TECHNICAL_VERIFICATION: Cosmile maps order/product identity UX; Foundation states minimum non-raw provenance for semantic correction.

LEO_GPT_DECISION_REQUIRED: Select which source types count as feedback and whether explicit line-item selection is required.

SAFE_DEFAULT: No writes on ambiguous linkage; never infer by recency.

CONFIDENCE: HIGH.

## U-09 - Safety Response, Learning, And Correction Boundary

ADVISOR_POSITION: Immediate conservative safety handling may use lower evidence than durable learning, but Package 1 must encode that separation explicitly. Mixed positive/adverse text must not produce positive learning that cancels safety. Correction must be traceable and must not silently downgrade safety.

EVIDENCE:
- current Foundation consultation safety pattern
- V3 adverse severity/certainty helpers and historical rules
- absence of Package 1 feedback/correction pipeline

RESOLVABLE_NOW: Current authority and technical separation can be described. Human-review promise, automatic action policy, and evidence thresholds require founder and later calibration decisions.

DELEGATE_TO_TECHNICAL_VERIFICATION: Foundation assesses safety output feasibility; Cosmile assesses user-visible action and commerce consequences; Fable5 challenges optimism.

LEO_GPT_DECISION_REQUIRED: Define the user-visible minimum response to an adverse report and whether any feedback can automatically change durable memory before human/repeated evidence.

SAFE_DEFAULT: Conservative non-diagnostic response, review path, no positive learning, no permanent promotion.

CONFIDENCE: HIGH on separation principle; LOW on final workflow.

## Dependency Ordering

1. U-01 product input choice constrains U-02 semantics, U-05 raw-text exposure, U-06 pilot, and U-08 provenance.
2. U-08 provenance and U-04 identity are prerequisites for trustworthy user-linked data.
3. U-03 deletion lineage and U-05 non-persistence are prerequisites for operational collection.
4. U-07 contract ownership is prerequisite for any Foundation signal expansion.
5. U-09 safety/learning separation is prerequisite for using adverse feedback.
6. U-06 requires a pilot and cannot be closed by design review alone.

## Minimum Founder Decisions Expected After Comparison

Advisor expects the final package to need no more than five founder decisions, likely in these business terms:

1. Initial feedback experience and timing.
2. Primary value hypothesis and pilot posture.
3. Default identity-linking behavior.
4. Raw-text/provider acceptance and deletion promise.
5. Foundation signal governance and safety-action boundary.

The exact final questions must wait for independent actor comparison and Fable5 challenge.

## Advisor First-Pass Verdict

`DISCOVERY_REQUIRED__PACKAGE1B_NOT_READY`
