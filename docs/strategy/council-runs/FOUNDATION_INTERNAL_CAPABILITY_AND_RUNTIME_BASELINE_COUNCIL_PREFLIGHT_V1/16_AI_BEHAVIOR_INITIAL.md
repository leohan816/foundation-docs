# Council Challenger Initial Report — AI Model Behavior and Evaluation

```text
COUNCIL_MISSION_ID: FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_COUNCIL_PREFLIGHT_V1
ROUND: 1_BLIND
ROLE: AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER
ROLE_CATEGORY: SPECIALIST
CATEGORY: SPECIALIST
PRIMARY_LENS: AI_MODEL_BEHAVIOR_EVALUATION
SESSION_EXPECTED: foundation-council-ai-behavior
SESSION_LIVE_VERIFICATION: PARTIAL — TMUX pane %45 was observed, but the sandbox denied direct session-name lookup.
CWD: /home/leo/Project/council/rules/ai-model-behavior-evaluation (LIVE_VERIFIED)
RUNTIME: codex-cli 0.144.5; thread 019f6f76-02d2-7721-aa4e-6dd7289894c8 (LIVE_VERIFIED)
MODEL: UNVERIFIED — no model identifier was exposed by the allowed runtime evidence.
EFFORT: UNVERIFIED — no reasoning-effort value was exposed by the allowed runtime evidence.
SUBJECT_PIN:
- 00_STRATEGIST_COUNCIL_PLAN.md | SHA256 547113592e9676d034d4c21b0cdc913774d68e1641452db08f5187a0f3dcedb6
- 01_FACTS_ASSUMPTIONS_UNKNOWNS_REGISTER.md | SHA256 8fd0fcb0bd25998731e07c3e32d572fa70af081f58f45e2a3e224f18de47e01c
- 02_COMMON_MISSION_BRIEF.md | SHA256 293e26d04f0e5d1b76f9922f0c7c38c10b7c071dfec3a023485d41b5002d975b
- 03_ROLE_SPECIFIC_QUESTIONS_INDEX.md | SHA256 a4286e69dbab4474b378bb9542639fc38d5defca37126bd3050eeac805eeae10
- round1-prompts/AI_BEHAVIOR.md | SHA256 8895071118c008dc80a2882d5c72dea66fe73b18d06403dd5993dce3a211572a
COUNCIL_COMPOSITION:
- PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER | CORE
- SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER | CORE
- DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER | CORE
- LEGAL_REGULATORY_AND_POLICY_CHALLENGER | SPECIALIST
- SECURITY_THREAT_AND_ABUSE_CHALLENGER | SPECIALIST
- DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER | SPECIALIST
- AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER | SPECIALIST
SELECTION_PIN: Strategist plan Section 13, role-question index, and assigned AI_BEHAVIOR prompt at the hashes above.
TIMEBOX: ROUND_1_BLIND; no wall-clock timebox is specified in the frozen inputs.
AUTHORITY: RECOMMENDATION_ONLY
REPORT_LANGUAGE: ENGLISH
VERDICT: PROCEED_WITH_CORRECTIONS
```

## EXECUTIVE_CHALLENGE

The Foundation-wide baseline is necessary from this specialist lens because the frozen
register preserves material unknowns about reasoning and safety behavior, model/provider
execution, memory, integration, and runtime feasibility. The proposed coverage is broad
enough to avoid another AI-only partial snapshot, and its non-production/no-change
boundary is directionally sound.

The current method is not yet sufficient for approval as written. It names models,
providers, prompts, routing, fallback, evaluation, latency, cost, memory, and traces, but
does not define an enforceable per-behavior responsibility map, a repeated behavioral
evaluation protocol, or the maximum claim permitted from bounded synthetic execution.
The seven state axes are necessary, but `RUNTIME_STATE` cannot also stand for behavioral
quality, nondeterminism, evidence use, or safety. Without the corrections below, a small
number of successful traces could be reported as AI readiness even though the relevant
model, prompt, route, language, fallback, or authority path remains untested.

`PROCEED_WITH_CORRECTIONS` means Strategy may correct the proposed Advisor instruction
and return it to Leo. It does not authorize the baseline, provider execution, actor
dispatch, or implementation.

## VERIFIED_FACTS

- The five authorized frozen inputs were SHA-256 verified twice during this review. The
  plan, register, role index, and common-brief hashes match their cross-document pins. The
  assigned prompt hash was independently recorded above.
- The frozen plan explicitly includes model/provider responsibility, prompts, routing,
  fallback, evaluation, latency, cost, observability, Memory V1/V2/V3, isolated synthetic
  questions, degraded behavior, and a source-to-downstream evidence trace.
- The plan separates source, build, test, runtime, integration, authority, and target-fit
  states and prohibits product changes, canonical-data changes, real PII, Memory V3
  activation, autonomous promotion, unapproved provider calls, and automatic follow-up.
- The frozen register explicitly leaves current reasoning/safety behavior (U-006), model
  and provider operation (U-007), memory states (U-008), runtime feasibility (U-012),
  external runtime authority (U-013), and delivery estimate (U-015) unresolved.
- The frozen inputs specify no scenario catalogue, repeat count, language/locale coverage,
  pass/fail thresholds, failure taxonomy, per-behavior fallback oracle, or allowed
  behavioral-readiness claim.
- Live runtime checks verified the exact role CWD, Codex CLI version, thread identifier,
  and a tmux pane attachment. Direct tmux session-name lookup failed with a sandbox socket
  permission error; model and effort variables were not exposed. The expected session
  name is therefore an instruction pin, not live model evidence.

## INFERENCES

- Because U-006 through U-008 remain factual unknowns, source inspection and one successful
  response cannot establish Foundation AI readiness. Repeated, pinned behavior evidence is
  required in addition to the seven state axes.
- A representative trace can expose a failure or demonstrate one bounded path, but cannot
  by itself prove all material layers or general reliability. Assumption A-004 is tenable
  only if traces are combined with source/configuration evidence, explicit oracles,
  repeated trials, negative cases, and preserved unverified states.
- The proposed actors are sufficient without adding a new actor if the Advisor assigns one
  accountable Foundation owner to produce the evaluation manifest and the Independent
  Reviewer independently checks the actual traces, failures, claim ceiling, and cleanup.
  Actor identity alone is not evidence of evaluation competence or model behavior.
- Atomic matching and governed-learning readiness can be investigated without activation
  only through structural/source evidence, synthetic identities, isolated temporary state,
  and stubbed or deny-by-default tool paths. Real-profile quality and active-learning
  behavior must remain unverified.

## MATERIAL_UNKNOWNS

The Council does not resolve U-006, U-007, U-008, U-012, U-013, or U-015. In particular,
no current model, provider, prompt, route, runtime behavior, cost, latency, supported
language, memory activity, or external-call authority is established by this report.

The following new unknown should be recorded separately by Strategy rather than inserted
into the frozen register:

```text
ID: AI-U-016
QUESTION: What exact AI-assisted behaviors are currently intended or claimed, what input distributions and languages/locales do they cover, what decisions or downstream effects do they produce, and what deterministic contract and fallback applies to each?
CLASSIFICATION: AI_BEHAVIOR_CONTRACT_UNKNOWN
SIGNIFICANCE: A representative evaluation set and a bounded readiness claim cannot be defined without a behavior, input, consequence, and fallback inventory.
EVIDENCE: The frozen plan names capability families but contains no current per-behavior contract or support-claim inventory.
OWNER: Foundation Advisor with the Foundation Worker and authoritative product/domain owners.
RESOLUTION_METHOD: Read-only repository and contract evidence, reconciled with authoritative owner statements; conflicts remain explicit.
REQUIRED_TIMING: Baseline admission, before selecting or executing AI behavior scenarios.
BLOCKING_EFFECT: Blocks behavioral-readiness, supported-language, safety, and model-suitability claims; does not block source-level capability mapping.
FINAL_DISPOSITION: RESOLVED_BY_REPOSITORY_EVIDENCE
```

The incomplete Challenger runtime verification should also be preserved rather than
inferred away:

```text
ID: AI-U-RUNTIME-001
QUESTION: What exact live tmux session name, model identifier, and reasoning-effort setting produced this Challenger report?
CLASSIFICATION: COUNCIL_RUNTIME_IDENTITY_UNKNOWN
SIGNIFICANCE: Session labels and role assignments must not be treated as evidence of the actual model or effort.
EVIDENCE: CWD, codex-cli 0.144.5, thread ID, and tmux pane %45 were observed; session-name access was sandbox-denied and no model or effort value was exposed.
OWNER: Strategy runtime owner.
RESOLUTION_METHOD: Host-side live runtime attestation from an authoritative surface that exposes session, model, and effort without relying on the session label.
REQUIRED_TIMING: Before attributing this report to a specific model or effort level.
BLOCKING_EFFECT: Blocks model-specific or effort-specific claims about this review; does not convert subject unknowns into facts and does not block preservation of this recommendation-only report.
FINAL_DISPOSITION: RESOLVED_BY_AUTHORITATIVE_SOURCE
```

## FINDINGS

### AI-BEH-R1-001

```text
SEVERITY: BLOCKING
CLAIM: The current plan does not yet distinguish deterministic Foundation responsibility from model, provider, routing, fallback, and agent responsibility at the level needed to interpret runtime evidence safely.
EVIDENCE: Plan Sections 6–8 list the relevant surfaces but define no mandatory per-behavior responsibility record. The common seven-axis state model has no field for input contract, decision consequence, deterministic guard, model role, route-selection reason, fallback oracle, tool authority, or stopping limit.
LENS_BASIS: AI responsibility, routing, fallback, authority, and stopping behavior.
OVERLAP_WITH_OTHER_LENS: SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER — broad ownership and safety architecture overlap; this finding is limited to the evidence needed to attribute observed AI behavior correctly.
RECOMMENDATION: Before Advisor approval, require one behavior record per material AI path: behavior/task; intended inputs and distribution; output and decision consequence; deterministic preprocessing and validation; model/provider responsibility; prompt/context source; route-selection rule; fallback and degraded result; hard safety/verdict constraints; allowed tools and side effects; maximum steps/time/tokens/tool calls; stop/abort behavior; and current authority. Deterministic controls must own authority enforcement, secret/PII exclusion, tool allowlists, hard policy and verdict preservation, output-schema validation, fallback activation, and execution caps. The baseline must map deviations rather than silently redesign them.
```

### AI-BEH-R1-002

```text
SEVERITY: BLOCKING
CLAIM: The proposed runtime method lacks a predeclared evaluation protocol capable of detecting hallucination, inconsistency, overconfidence, ambiguity, refusal failure, nondeterminism, and regression without overclaiming.
EVIDENCE: The frozen inputs authorize representative traces and synthetic questions but specify no scenario classes, repetitions, languages, or acceptance criteria. ROLE.md forbids treating one successful response as system evidence.
LENS_BASIS: Evaluation coverage, nondeterminism, safety/refusal behavior, multilingual behavior, and regression evidence.
OVERLAP_WITH_OTHER_LENS: DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER — reproducibility and closure overlap; the behavioral scenario and repetition design belongs to this specialist lens.
RECOMMENDATION: Require a frozen evaluation manifest before each runtime slice. It must pin the code/commit, knowledge/index snapshot, behavior ID, model/provider/deployment identifier as exposed, prompt and context-template hashes, routing/tool configuration, generation settings, scenario ID, expected oracle, repetition count, evaluator, and evidence-capture fields. Cover ordinary, paraphrased, ambiguous, missing-evidence, conflicting, stale/retracted, unsafe or health-adjacent, long-context/truncation, provider-error/timeout, fallback, tool-failure/loop, and adversarial-context cases. Cover every explicitly claimed language/locale plus code-switch and source/answer-language mismatch; if competent evaluation or an authoritative oracle is unavailable, language quality remains UNVERIFIED. For stochastic paths, forbid single-run conclusions: use at least five repetitions for each selected critical scenario and at least three for routine scenarios at pinned settings, record every run, and never rerun away a failure. These counts support bounded variance discovery only, not statistical reliability. Predeclare groundedness, citation/evidence correctness, verdict agreement, qualification/deferral, correct refusal, incorrect refusal, fallback correctness, format validity, unauthorized-tool attempts, and stop-limit outcomes. Preserve failures in a taxonomy and define regression comparisons against the pinned baseline.
```

### AI-BEH-R1-003

```text
SEVERITY: MATERIAL
CLAIM: The current knowledge-use chain is necessary but cannot by itself demonstrate that retrieved knowledge caused or constrained the final response, or that a Foundation verdict survived model and downstream transformations.
EVIDENCE: The plan traces source through response-level evidence and downstream consumption, but it does not require capture of the actual model context, intermediate structured verdict, deterministic transformations, or a causal evidence-use check.
LENS_BASIS: Hallucination, prompt/context dependence, evidence use, and Foundation verdict preservation.
OVERLAP_WITH_OTHER_LENS: DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER — provenance and lineage overlap; this finding concerns model consumption and output behavior.
RECOMMENDATION: Extend each selected trace to record exact retrieved evidence IDs/versions, ranking and truncation, the redacted context actually supplied, prompt/template hashes, raw model output where safe, parsed structured output, deterministic validation or override, final Foundation verdict/evidence, fallback events, and downstream preservation or explicit non-consumption. In isolated synthetic fixtures only, add paired evidence-ablation or controlled-conflict cases to test whether the answer changes in the expected bounded way. A citation that was merely present is not proof of grounded use. Any model or downstream weakening, reversal, or omission of a pinned safety verdict is a failed trace.
```

### AI-BEH-R1-004

```text
SEVERITY: MATERIAL
CLAIM: Model/provider/prompt evidence, observability, cost, latency, and replacement evidence are named but not normalized enough for comparison or rollback.
EVIDENCE: U-007 preserves these facts as unknown, while the plan has no mandatory runtime manifest or evidence fields beyond broad capability coverage.
LENS_BASIS: Model suitability, routing, operational dependence, observability, economics, fallback, and replacement.
OVERLAP_WITH_OTHER_LENS: DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER — operational measurement overlaps; model-specific evidence interpretation remains here.
RECOMMENDATION: For every executed path record provider and endpoint class; exact model/deployment/version/date identifiers actually exposed; source of that identifier; prompt/system/context hashes and context assembly/truncation; route reason; retries, timeout, error, fallback, and cache behavior; input/output tokens; tool calls; per-run latency; cost formula, price-source date, and whether cost is measured or estimated; trace/correlation ID; refusal and safety outcome; and redacted logs that contain no secret or PII. Report individual results and observed ranges; do not infer an SLA or unit economics from a small sample. Use one route-neutral scenario set where authorized, preserve provider-unavailable states as PROVIDER_EXECUTION_NOT_RUN or UNVERIFIED, and define evidence-based replacement/rollback triggers such as contract failure, groundedness regression, verdict loss, unacceptable observed cost/latency, or loss of an authorized route. Source configuration is not official-provider behavior proof.
```

### AI-BEH-R1-005

```text
SEVERITY: MATERIAL
CLAIM: The non-activation prohibitions are sound, but the method needs explicit tests that memory, personalization, identity, tools, and future-learning paths remain bounded and stop safely.
EVIDENCE: The plan prohibits real PII, Memory V3 activation, sender/intake activation, autonomous promotion, and implementation, but it does not define negative evidence for persistence, cross-identity leakage, unauthorized tools, retry loops, or stop behavior.
LENS_BASIS: Memory and identity boundaries, tool authority, learning, refusal, and stopping behavior.
OVERLAP_WITH_OTHER_LENS: SECURITY_THREAT_AND_ABUSE_CHALLENGER — misuse and leakage overlap; this finding is limited to observable model/agent behavior and control evidence.
RECOMMENDATION: Restrict this slice to read-only source/config/test mapping plus isolated synthetic identities and mission-owned temporary state. Verify disabled-by-default and no-promotion boundaries, absence of cross-profile recall in the bounded fixture, explicit teardown/non-persistence, and separation of retrieval context from durable memory. Exercise tools only through existing isolated test doubles or deny-by-default stubs; record attempted calls, arguments in redacted form, authorization decision, side effects, retries, and final stop reason. Test tool denial, repeated failure, empty results, cancellation, and step/time/token/tool-call caps. Do not activate Memory V3, intake, sender, autonomous promotion, real personalization, or external writes to obtain evidence. Such paths remain source-level or UNVERIFIED.
```

### AI-BEH-R1-006

```text
SEVERITY: MATERIAL
CLAIM: U-007 and U-013 are composite unknowns whose single final dispositions could misstate what repository evidence or vendor confirmation can resolve.
EVIDENCE: U-007 combines repository configuration, actual execution, provider facts, evaluation, latency, cost, and observability but assigns RESOLVED_BY_REPOSITORY_EVIDENCE. U-013 combines local credential/network availability and Leo authority with provider constraints but assigns VENDOR_CONFIRMATION_REQUIRED.
LENS_BASIS: Model evidence versus configuration or naming assumptions; provider and execution authority.
OVERLAP_WITH_OTHER_LENS: SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER — authority classification overlaps; this finding concerns the evidence class for model/provider behavior.
RECOMMENDATION: Strategy should preserve the frozen register and record corrected child dispositions separately. Repository evidence may resolve configured paths and local source behavior; approved isolated execution may resolve bounded observed behavior under IMPLEMENTATION_VALIDATION_REQUIRED; authoritative provider sources or vendor confirmation may resolve model/version/price/service facts; Leo or an authorized runtime owner must resolve whether existing credentials and network use are permitted. No one evidence class should close the whole composite unknown.
```

### AI-BEH-R1-007

```text
SEVERITY: BLOCKING
CLAIM: The later baseline needs an explicit maximum AI-behavior claim; otherwise bounded execution can be summarized as operational, generally safe, or model-capability proof.
EVIDENCE: The plan correctly separates states and uses UNVERIFIED, but it does not prescribe the strongest permitted conclusion from repeated synthetic scenarios or provider-unavailable paths.
LENS_BASIS: Evidence calibration, nondeterminism, model identity, and readiness claims.
OVERLAP_WITH_OTHER_LENS: NONE
RECOMMENDATION: Add this claim ceiling to the Advisor instruction: “For the exact pinned code, data/index snapshot, prompt/context, route, tool configuration, model/provider identifier actually exposed, and bounded scenarios executed, the baseline may report only observed pass/fail outcomes, preserved failures, and observed variability, latency, and token/cost evidence. It may not claim general model capability, production reliability, safety certification, supported-language quality, real-person matching readiness, autonomous-learning readiness, SLA compliance, or operational readiness. Untested configurations, unavailable providers, unsupported evidence pins, real data, production load, and unexecuted fallback or tool paths remain UNVERIFIED.” If no official-provider execution is authorized, the maximum claim is source/config/test evidence plus local or stub behavior explicitly labeled as such.
```

## SIMPLER_OR_SAFER_ALTERNATIVE

Keep the Foundation-wide map, but make the AI portion a two-gate slice within the same
baseline:

1. **Gate A — read-only inventory and evaluation design:** map behavior contracts,
   deterministic/model/provider responsibility, prompts/context assembly, routes,
   fallbacks, tools, memory/learning boundaries, existing tests, observability, and
   authority. Freeze the evaluation manifest and label every runtime claim unverified.
2. **Gate B — capability-specific execution:** run only those isolated paths that Gate A
   proves executable, mission-relevant, and authorized. Separate deterministic/local/stub
   evidence from official-provider evidence, enforce per-slice cost/time/tool caps, and
   stop a slice on missing authority, unsafe setup, tracked-change need, or cleanup doubt.

This is smaller and safer than attempting every listed AI surface in one execution wave,
while still allowing the overall baseline to produce a Foundation-wide current-state map.

## TIMEBOX_OR_CLOSURE_IMPACT

- Correct AI-BEH-R1-001, AI-BEH-R1-002, and AI-BEH-R1-007 before the Advisor instruction
  is eligible for Leo approval.
- At baseline admission, close Gate A and return the repo-grounded estimate required by
  U-015 before Gate B. Do not invent an overall workday estimate in Council reasoning.
- Each runtime slice needs a predeclared scenario count, repetition cap, provider/tool
  authority gate, cost/token/time limit, failure-preservation rule, and cleanup proof.
- Closure must report the seven proposed state axes plus a separate
  `BEHAVIOR_EVALUATION_STATE` per behavior, with bounded values such as `NOT_APPLICABLE`,
  `NOT_DESIGNED`, `NOT_RUN`, `BOUNDED_PASS`, `BOUNDED_FAIL`, or `INCONCLUSIVE`. A bounded
  pass does not promote `RUNTIME_STATE`, `INTEGRATION_STATE`, or `TARGET_FIT` automatically.
- The baseline ends after the reviewed map and bounded proposal return to Strategy. No
  behavior correction, model replacement, prompt change, routing change, memory activation,
  or follow-up execution begins automatically.

## MINORITY_OR_DISSENT_NOTE

No other Challenger output was visible in this blind round. This is an independent
specialist position; absence of a Round 1 dissent is not evidence of Council agreement.

## BOUNDARY_CONFIRMATION

```text
PRODUCT_DECISION_MADE: NO
RISK_ACCEPTED: NO
SUBJECT_PATCHED: NO
ACTOR_DISPATCHED: NO
INDEPENDENT_REVIEW_CLAIMED: NO
PRODUCT_REPOSITORY_INSPECTED: NO
BASELINE_EXECUTED: NO
WEB_BROWSED: NO
OTHER_CHALLENGER_OUTPUT_VIEWED: NO
```

```text
RETURN_TO: STRATEGY_DECISION_ARCHITECT
STOP: YES
```
