# Council Admission and Runtime Record

```text
COUNCIL_MISSION_ID: COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1
ADMISSION_TIME_UTC: 2026-07-17T14:47:30Z
COUNCIL_STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
RUNTIME: OpenAI Codex CLI 0.144.5
MODEL: gpt-5.6-sol
EFFORT: xhigh
PLAN_GATE: PASS
SUBJECT_PIN_GATE: PASS
REGISTER_FREEZE_GATE: PASS
FROZEN_REGISTER_SHA256: dcc4889489056da0e62639c3ce42df5db671a133085f5c877e526e775877054d
SESSION_BINDING_GATE: PASS
```

## Council ruleset pins

```text
AGENTS.md: bc4c6fa9fae5509c009ec39740886cd117dc8479a962fffe333a108d3ce7a47b
CLAUDE.md: 9eb0f99a5053670e4db6ff88cd91eaf6f9c1febe1cfc692453dc62ca717c4191
COUNCIL_OPERATING_MODEL_V0.md: eddecbf78c8cff945a146e58dd4e2f417c7e2e5d9edc008c83b974c27df142e9
COUNCIL_TRIGGER_POLICY_V0.md: 42d759d872fe80d2d121108933ea943e173b1eac228af51f703d2df97b17c05f
COUNCIL_MISSION_PROTOCOL_V0.md: 44e0ad022a742628f63c43a477c91bf5930f244fbead4e31c6f0138b8efa144d
COUNCIL_REPORT_SCHEMA_V0.md: 5581ce75466cec8614ff4ff955bb1797f5091e0105b5153302f14e4586b0fc98
CHALLENGER_REGISTRY_V0.md: 36e12984975520a04fb708eb9dbe755662caa694b2765c92c465658643d92044
```

## Live-selected session bindings

| Session | Role | Category | CWD | Model/effort | State before dispatch |
|---|---|---|---|---|---|
| `foundation-council-product-value` | `PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER` | Core | `rules/product-user-business-value` | `gpt-5.6-sol/xhigh` | idle after prior mission |
| `foundation-council-systems-risk` | `SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER` | Core | `rules/systems-architecture-safety-governance` | `gpt-5.6-sol/xhigh` | idle after prior mission |
| `foundation-council-delivery-evidence` | `DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER` | Core | `rules/delivery-scope-evidence-operations` | `gpt-5.6-sol/xhigh` | idle after prior mission |
| `foundation-council-legal-policy` | `LEGAL_REGULATORY_AND_POLICY_CHALLENGER` | Specialist | `rules/legal-regulatory-policy` | `gpt-5.6-sol/xhigh` | `READY_IDLE` |
| `foundation-council-security-threat` | `SECURITY_THREAT_AND_ABUSE_CHALLENGER` | Specialist | `rules/security-threat-abuse` | `gpt-5.6-sol/xhigh` | `READY_IDLE` |
| `foundation-council-ux-human` | `UX_HUMAN_FACTORS_AND_ACCESSIBILITY_CHALLENGER` | Specialist | `rules/ux-human-factors-accessibility` | `gpt-5.6-sol/xhigh` | `READY_IDLE` |
| `foundation-council-data-governance` | `DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER` | Specialist | `rules/data-quality-lineage-governance` | `gpt-5.6-sol/xhigh` | `READY_IDLE` |
| `foundation-council-adversarial` | `ADVERSARIAL_ASSUMPTION_AND_FAILURE_CHALLENGER` | Specialist | `rules/adversarial-assumption-failure` | `gpt-5.6-sol/xhigh` | `READY_IDLE` |

Process arguments and live tmux metadata confirmed each exact session, role-home CWD,
`gpt-5.6-sol`, `model_reasoning_effort=xhigh`, workspace-write, approval never, and the
shared Council runs directory as the only additional writable path.

## Unselected session

```text
SESSION: foundation-council-ai-behavior
ROLE: AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER
MODEL_EFFORT: gpt-5.6-sol/xhigh
CURRENT_MISSION: NONE
READINESS: READY_IDLE
SUBJECT_VISIBLE: NO
```

## Admission outcome

```text
COMMON_BASELINE_IDENTICAL: YES
ROLE_SPECIFIC_QUESTIONS_DISTINCT: YES
BLIND_REVIEW_PRESERVABLE: YES
MAXIMUM_ROUNDS_DEFINED: YES
UNKNOWN_TAXONOMY_DEFINED: YES
ROUTINE_LEO_INTERRUPTION: NO
PRODUCT_REPOSITORY_ACCESS_AUTHORIZED: NO
ADVISOR_DISPATCH_AUTHORIZED: NO
IMPLEMENTATION_AUTHORIZED: NO
ADMISSION_GATE: PASS
```
