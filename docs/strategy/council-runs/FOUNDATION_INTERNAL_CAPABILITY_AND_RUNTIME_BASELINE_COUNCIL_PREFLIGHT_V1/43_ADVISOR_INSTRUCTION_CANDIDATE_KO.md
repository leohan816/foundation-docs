# Advisor 지시 후보 — 한국어

```text
TITLE: FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1
ROLE: FOUNDATION_ADVISOR
MISSION_TYPE: EVIDENCE_BASELINE_ONLY
STATUS: CANDIDATE_NOT_APPROVED_NOT_DISPATCHED
PRODUCT_IMPLEMENTATION_AUTHORIZED: NO
MEMORY_V3_STATUS: PAUSED
```

## 목적과 정확한 결정 계약

Foundation이 SIASIU, Cosmile 및 미래 서비스에 제공할 공통 canonical AI·지식·근거·판단·안전 core로서 현재 어느 상태인지 근거로 확정한다.

검수된 결과는 Leo가 다음을 결정할 수 있어야 한다.

> 현재 Foundation 기능 중 무엇이 신뢰할 수 있고 재사용 가능한지, 어떤 정확한 결손을 다음 bounded 구현 우선순위로 삼아야 하는지, 그리고 SIASIU와 선택적 Cosmile AI surface에 근거 기반 AI·지식·판단 core를 제공하되 일반 상거래를 Foundation에 결합하지 않기 위해 어떤 기능을 유지·수리·제한 이전·교체·폐기·연기 또는 미확인으로 둘 것인지 결정한다.

근거 우선순위는 다음 승인된 근접 결과 범위와 연결한다.

- SIASIU의 근거 기반 상담 및 판단 소비;
- 선택적 Cosmile AI 상담과 Foundation 상품 snapshot 경계. 일반 상거래는 Foundation과 독립;
- Foundation의 canonical product·brand·ingredient·claim·warning·safety·provenance 제공 능력;
- 원자 단위 상품과 governed learning은 미래의 구조·통제 준비도 질문일 뿐, 현재 구현·활성화 권한이 아님.

P1에서 이 소비자와 경로가 현재·부분·역사적·dead·absent·unverified 중 무엇인지 확인한다. TARGET_FIT이나 source 존재만으로 구현 우선순위를 만들지 않는다.

## 권한

Leo 승인 후 허용:

- repository metadata, Git history, branch/HEAD/upstream 및 관련 ancestry 확인;
- Foundation과 정확히 관련된 historical foundation-control source의 read-only 검사;
- provenance와 version pin을 포함한 canonical Vault/knowledge read-only 검사;
- P1 승인 후 SIASIU·Cosmile adapter/consumption의 targeted read-only 검사;
- 해당 probe gate 통과 후 mission-owned isolated non-production build·test·API·retrieval·index·synthetic-question 실행;
- 정확한 증거 수집, Independent Review, Advisor final audit, docs-only branch 문서 commit/push.

금지:

- product code, canonical Vault, tracked configuration, lockfile, schema, migration 변경;
- shared·staging·production·customer data/resource 사용;
- 실제 또는 재식별 가능한 PII;
- secret 생성·노출·증거 복사 또는 승인되지 않은 credential 사용;
- 승인되지 않은 provider/network call, public listener, live flag, production behavior;
- Memory V3, sender/intake, scheduler/watcher, autonomous job, persistent candidate store,
  promotion endpoint, serving-index mutation, canonical write 활성화;
- Foundation을 Cosmile 일반 상거래의 synchronous dependency로 만드는 것;
- architecture·ownership 이전, risk acceptance, implementation, merge, deployment, 자동 후속 미션.

## 필수 상태 및 증거 모델

다음 7개 canonical axis를 서로 독립적으로 유지한다.

```text
SOURCE
BUILD
TEST
RUNTIME
INTEGRATION
AUTHORITY
TARGET_FIT
```

각 cell에는 최소한 `CAPABILITY_ID`, `AXIS`, `RESULT`, `EVIDENCE_CLASS`, `EXACT_PIN`, `SUBJECT_SCOPE_OR_POPULATION`, `ENVIRONMENT_CONFIG_DATA_AND_OBSERVED_AT`, `OWNER`, `RELATED_UNKNOWN_IDS`, `CLAIM_CEILING`, `DECISION_IMPACT`, `MISMATCH_OR_DEPENDENCY`, 필요한 경우 `CLEANUP_REFERENCE`를 기록한다.

공통 결과는 `NOT_ASSESSED | NOT_APPLICABLE | ABSENT_AT_PIN | PRESENT_UNVERIFIED | VERIFIED_PASS | VERIFIED_FAIL | BLOCKED`를 사용한다. AUTHORITY와 TARGET_FIT에는 제한된 axis-specific subvalue를 둘 수 있다. 어떤 axis도 다른 axis 상태를 상속하지 않는다. 합성 또는 무조건적 `READY`, `SAFE`, `COMPLIANT`, `OPERATIONAL`, `APPROVED`, AI-readiness verdict를 금지한다.

해당 경로에만 다음 adjunct record를 붙인다.

- `DECISION_AND_DOWNSTREAM_VALUE_CONTEXT`
- `SOURCE_AUTHORITY_AND_TRANSFORMATION_LINEAGE`
- `LEGAL_POLICY_AND_PROVIDER_DEPENDENCY`
- `SECURITY_CONTROL_EFFECTIVENESS`
- `BEHAVIOR_EVALUATION_STATUS`
- `PROBE_ADMISSION_EVIDENCE_ARTIFACT_AND_CLEANUP`

Adjunct는 claim을 좁힐 수 있지만 실패하거나 실행하지 않은 axis를 통과 상태로 올릴 수 없다.

## 사실·가정·미확인 항목

동결된 U-001~U-015를 해결됐다고 주장하지 않고 admission package에 복사한다. 하나의 parent가 서로 다른 해결 경로를 포함하면 lossless child result로 분리한다.

허용 final disposition은 `RESOLVED_BY_COUNCIL_ANALYSIS`(전략·범위·architecture·우선순위·risk reasoning에만 사용), `RESOLVED_BY_REPOSITORY_EVIDENCE`, `RESOLVED_BY_AUTHORITATIVE_SOURCE`, `LEO_DECISION_REQUIRED`, `VENDOR_CONFIRMATION_REQUIRED`, `LEGAL_OR_ACCOUNTING_COUNSEL_REQUIRED`, `IMPLEMENTATION_VALIDATION_REQUIRED`, `OUT_OF_SCOPE`뿐이다.

Repository evidence로 rights, provider, runtime, future policy, ownership 또는 Leo decision subclaim을 닫지 않는다. 다음을 분리 보존한다.

- physical/provenance와 rights/claim authority;
- configured path와 bounded observed behavior;
- 내부 credential/network permission과 provider contract/content-use 및 account/security/data-handling fact;
- 현재 learning mechanism과 미래 promotion/activation authority;
- 현재 구조적 상품 표현과 U-010에 종속된 미래 matching policy;
- actor capacity/collision과 baseline estimate;
- 현재 AI behavior contract와 evaluation scope.

## Actor routing과 effort

필수 경로:

```text
foundation-strategy-sol
-> foundation-advisor
-> selected actors
-> Independent Reviewer
-> foundation-advisor
-> foundation-strategy-sol
-> Leo
```

Advisor는 orchestration, admission, sequencing, collision control, evidence integration, phase gate, correction routing, final audit 및 return을 담당한다. 책임 repository actor를 대신해 조사하거나 구현하거나 self-review하면 안 된다.

- Foundation Worker: Foundation-local map과 승인된 probe의 primary owner.
- Control: P1이 exact unresolved question을 기록한 후 historical/cross-project contract evidence만 targeted 조사. 구현·ownership decision 금지.
- SIASIU Worker: P1 이후 targeted adapter/consumption evidence만 조사.
- Cosmile Worker: P1 이후 current no-collision 확인을 거쳐 targeted boundary/consumption evidence만 조사. Cosmile O1은 변경하지 않는다.
- Independent Reviewer: 동결된 P1 evidence protocol을 공동작성하지 않고 challenge하며, 이후 actual code·command·test·runtime probe·trace·preserved failure·cleanup·final claim ceiling을 독립 검사.
- Designer: 미선정.

모든 runtime/model/effort binding을 live verify한다. 승인된 binding만 사용하고 Leo 승인 없이 model을 변경하지 않는다. 권고 effort는 primary Foundation Worker와 Independent Reviewer `maximum`, targeted actor 최소 `xhigh`다. Binding 검증과 안전한 할당은 Advisor 책임이다.

## P0 — Admission과 bounded estimate

Product repository 실행 전에 다음을 수행한다.

- exact repository, branch, HEAD, upstream, worktree, current role authority, actor capacity, active mission, collision 확인;
- 관련 없는 기존 변경 보존;
- decision contract, exclusion, evidence vocabulary, no-build boundary 동결;
- candidate command inventory 및 risk tier 분류;
- temporary resource, data, network, provider, credential-name-only, cost, cleanup authority 확인;
- finite engineering-workday/elapsed-time range, confidence, critical path, actor sequence, external dependency 반환.

권고 material-deviation rule:

```text
P0 upper estimate 안에서만 자동 계속한다.
이후 예상 완료가 P0 upper bound를 max(1 working day, 25%)보다 더 초과하거나,
새 repository·actor class·provider authority·data class·product/canonical write·
architecture/ownership decision·risk class가 필요하면 Strategy/Leo에게 반환한다.
```

P0 결과: `CONTINUE | NARROW | HOLD`.

## P1 — Foundation-wide shallow census와 scope freeze

Deep probe 전에 broad shallow coverage를 수행한다.

- current Foundation 및 relevant foundation-control physical capability map;
- canonical/implementation/runtime/contract/steward/decision ownership ledger;
- current consumer, API, adapter 및 explicit non-consumption;
- exact identity, origin, declared authority basis, provenance, version, rights status, correction, retraction, stewardship, derived index를 포함한 Vault/knowledge source ledger;
- grain, stable ID/alias, semantics, unit, locale/market/time, relationship, missingness, conflict, duplication, freshness, provenance, correction, coverage denominator를 포함한 non-normative atomic-product rubric;
- current retrieval/index, reasoning/judgment/safety, model/provider/routing, memory, feedback/candidate, API/runtime, observability, downstream surface;
- input, output consequence, deterministic/model/provider responsibility, prompt/context source, route, fallback, hard verdict, tool authority, limit, stop behavior를 포함한 current AI behavior contract;
- inventory-derived trace equivalence class, scenario, claim ceiling, expansion trigger;
- exact P2/P3 actor, probe, collision state.

P1 protocol과 scope를 동결한다. Foundation Worker/Advisor가 작성하고 Independent Reviewer는 공동작성하지 않는다. Reviewer는 `SUFFICIENT_FOR_DECLARED_CLAIM | CORRECTION_REQUIRED | INCONCLUSIVE`를 반환할 수 있지만 sample을 설계하거나 probe를 실행하거나 architecture/risk를 승인하면 안 된다.

각 selected slice가 decision-relevant하고 안전하게 admissible하며 P0 envelope 안에 있고 승인된 결정을 바꿀 수 있을 때만 P2/P3으로 간다. Current 또는 approved near-term consumer가 없으면 `NO_CONSUMER_IDENTIFIED`로 반환하고 target architecture 자체를 위해 deepening하지 않는다.

## P2 — 선택된 Foundation-local 검증

P1에서 선택되고 안전하게 승인된 slice만 실행한다. Build, test, local API, retrieval/index, reasoning/judgment/safety, 별도 승인된 model/provider, memory-boundary, synthetic-question trace가 포함될 수 있다.

각 probe는 risk tier에 맞춰 exact pin/command, intended claim, principal, allowed read/write, temporary path, dependency, listener/port, network, provider/account/environment, 값 없는 credential reference, synthetic input, resource/request/token/time/cost cap, evidence capture, abort owner, teardown, before/after process/resource inventory를 기록한다.

Static read-only check는 최소 record, local build/test/index는 filesystem/resource/cleanup field, network/provider/mutation-capable probe는 full deny-by-default record를 사용한다.

실행 전 전제 부족은 `NOT_RUN`, `UNVERIFIED`, `PROVIDER_EXECUTION_NOT_RUN`으로 종료한다. 실제 boundary breach, unexpected external/canonical write, secret·PII 노출, shared/production 접촉, public listener, Memory/promotion 활성화, resource/cost 초과 또는 cleanup 실패는 해당 phase를 즉시 중단하고 증거와 함께 `HOLD`를 반환한다.

## Knowledge-to-response 및 AI evidence

선택된 trace는 다음을 기록한다.

```text
canonical source와 exact version/digest
-> normalization/atomic representation 및 transformation pin
-> 존재하는 index/graph/lexical/vector inclusion과 build identity
-> retrieval result/rank/score/exclusion/truncation
-> 실제 제공된 redacted context
-> deterministic logic, prompt/template, route, model/provider/configuration
-> 안전하게 보존 가능한 raw model output
-> parsed/validated judgment와 hard safety/verdict handling
-> final response evidence
-> downstream preservation/transformation 또는 explicit non-consumption
```

미리 선언한 ordinary, missing, conflicting, stale/retracted, unsafe, degraded/fallback 및 decision-relevant adversarial case를 사용한다. Context에 citation이 존재한다고 response를 제약했다는 증거가 되지 않는다. Controlled ablation/conflict case는 synthetic mission-owned isolation에서만 허용한다.

선택된 stochastic scenario는 critical 5회, routine 3회를 기본값으로 한다. P1은 consequence, stochasticity, oracle, cost/time, claim rationale를 문서화하고 Reviewer challenge를 거쳐 회수를 바꿀 수 있다. 모든 failure를 보존한다. 적은 회수는 exact observation 또는 `INCONCLUSIVE`로 claim을 좁힌다. 어떤 회수도 statistical reliability, production safety, SLA, general model capability를 증명하지 않는다.

## Atomic matching 및 governed learning

Atomic matching claim ceiling: `STRUCTURAL_READINESS_ONLY`.

- synthetic profile만 사용;
- real PII 금지;
- final schema, person taxonomy, matching rule/score, consent model, retention rule, product recommendation 결정 금지;
- U-010 및 Legal/privacy/security dependency 유지.

Learning claim ceiling: `SOURCE_AND_CONTROL_READINESS_ONLY`.

- raw evidence, candidate, derived/model proposal, conflict, human review, promotion authority, correction, retraction, rollback, audit, serving effect를 서로 다른 상태로 map;
- Memory V3, sender/intake, persistent candidate store, autonomous job, promotion, serving/index mutation, canonical write 금지;
- existing mutation-capable test는 no-effect isolation이 증명된 뒤에만 실행하며 `PROMOTION_NOT_EXECUTED`, `MEMORY_V3_NOT_ACTIVATED` 기록.

## P3 — 조건부 historical 및 downstream boundary check

P1에서 Leo 결정을 바꿀 수 있고 Foundation-local evidence만으로 해결할 수 없는 exact physical·contract·authority·dependency·consumption question을 기록한 경우에만 Control, SIASIU, Cosmile 작업을 승인한다.

각 작업은 read-only이며 그 질문으로 제한한다. 현재 capacity와 collision을 먼저 확인한다. 그 외에는 `NOT_REQUIRED_FOR_DECISION`, `DEFERRED`, `UNVERIFIED`로 기록한다.

Historical foundation-control code는 증거일 뿐이다. retain·repair·transfer·replace·retire 또는 ownership 결론은 실행 권한이 아니다.

## P4 — Evidence freeze, Independent Review, option, closure

1. Content-addressed current-state evidence snapshot을 동결한다.
2. Independent Reviewer가 실제 relevant code·command·test·runtime probe·trace·failure·unknown route·boundary compliance·cleanup을 검사한다. Reviewer는 architecture·ownership·Legal status·security risk·provider choice·implementation을 승인하지 않는다.
3. 책임 evidence owner가 bounded factual/document correction만 적용하고 필요 시 재동결·재검수한다.
4. Evidence가 review를 통과한 후에만 별도 `EVIDENCE_DERIVED_OPTIONS` artifact를 만든다. 새 조사를 하거나 사실을 다시 쓰지 않는다. 각 option에는 exact evidence/unknown ID, consumer/decision effect, no-build/defer alternative, assumption, dependency, reversibility/rollback, estimate/confidence, affected owner, external/Leo decision을 포함하고 `IMPLEMENTATION_AUTHORIZED: NO`로 표시한다.
5. Advisor가 final targeted audit 후 Strategy에 반환한다.

## 필수 통합 산출물

하나의 evidence index와 최대 6개 logical artifact만 사용한다.

1. `BASELINE_MANIFEST_AND_ADMISSION`
2. `CAPABILITY_STATE_AND_SOURCE_AUTHORITY_MAP`
3. `KNOWLEDGE_RUNTIME_AND_BEHAVIOR_TRACE_INDEX`
4. `PHYSICAL_AUTHORITY_INTEGRATION_AND_UNKNOWN_MAP`
5. `EVIDENCE_DERIVED_OPTIONS_AND_BOUNDED_SCOPE_PROPOSAL`
6. `INDEPENDENT_REVIEW_AND_ADVISOR_CLOSURE`

이 안에 exact pin, actor/collision, P0 estimate, seven-axis matrix, adjunct, Vault/source/lineage map, atomicity, retrieval/index, reasoning/judgment/safety, model/provider/runtime, Memory, API/downstream trace, retain/repair/bounded-transfer/replace/retire/defer/unverified recommendation, no-build, workday/calendar estimate, external/Founder decision, evidence artifact disposition, shutdown/cleanup, Independent Review, Advisor audit을 모두 포함한다.

## 최대 claim과 최종 STOP

최대 결과:

```text
REVIEWED_FOUNDATION_CURRENT_STATE_AND_BOUNDED_OPTIONS
AT_EXACT_NON_PRODUCTION_EVIDENCE_CEILINGS
```

정확한 증거를 넘어 production·operational·general AI·corpus·language·matching·learning·Legal·security·privacy·provider·implementation readiness를 주장하지 않는다.

Material scope/authority/risk/estimate expansion, 실제 boundary breach/cleanup failure, 승인 envelope 안에서 결정을 답할 수 없는 경우에만 조기 반환한다. Routine unknown은 개별 질문하지 않고 package에 보존한다.

Independent Review 및 Advisor audit 후 complete result를 Strategy에 반환하고 STOP한다. 구현·활성화·후속 미션 dispatch·post-evidence Council 자동 시작을 금지한다.

