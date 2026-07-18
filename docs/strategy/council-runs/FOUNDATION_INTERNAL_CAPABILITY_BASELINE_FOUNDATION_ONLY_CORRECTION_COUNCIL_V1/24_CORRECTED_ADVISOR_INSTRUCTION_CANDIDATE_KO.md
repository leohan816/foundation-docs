# 수정된 Advisor 지시 후보 — Foundation 단독 Baseline

```text
제목: FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_V1
역할: FOUNDATION_ADVISOR
미션 유형: 사실 baseline 및 격리 검증 전용
상태: LEO 승인 전 비실행 문서
현재 우선순위: FOUNDATION 자체 우선
구현 권한: 없음
MEMORY_V3: PAUSED
```

## 목적과 핵심 결정 질문

현재 Foundation 자체가 실제로 어느 정도 구현되었고, build 가능하며, test되었고,
runtime에서 입증되었으며, integration·authority·governance가 어떤 상태인지 확인한다.

다음을 정확한 증거로 반환한다.

- 실제 동작하는 Foundation capability;
- source-only, mock, shadow, partial, historical, dead, blocked, unverified 상태;
- canonical knowledge, retrieval, model, judgment, safety, evidence, API, runtime, memory
  구성요소;
- Foundation의 현재 canonical mission 대비 실제 진행 상태;
- retain, repair, bounded transfer, replace, retire, defer, further investigation 분류;
- evidence 기반 다음 Foundation 우선순위 후보, no-build/defer, 추가 증거 필요 또는 hold.

## Foundation 단독 결과 범위

다음 Foundation 자체의 상태만 평가한다.

- canonical mission·knowledge·provenance·version·rights·correction·retraction·stewardship;
- product·brand·ingredient·claim·warning·safety·evidence·source 구조;
- `STRUCTURAL_READINESS_ONLY` ceiling의 atomic product 표현;
- lexical·vector·graph·hybrid·embedding·index·retrieval·reranking;
- deterministic logic, model/provider 책임, routing, prompt/context, fallback, judgment,
  verdict, safety, evidence composition;
- API packaging, runtime entry point, failure/degraded behavior, restart, observability;
- 활성화 없는 memory 및 learning-control 상태;
- physical·implementation·runtime·canonical·steward·contract·decision authority;
- 정확한 evidence ceiling의 운영·governance 상태.

미래 architecture를 임의로 만들고 현재 코드를 평가하면 안 된다. P0/P1에서 현재
Foundation canonical mission을 pin하고 다음을 구분한다.

```text
CURRENT_OPERATIVE_REQUIREMENT
CURRENT_PRINCIPLE
FUTURE_DIRECTION
SUPERSEDED
CONFLICT
UNVERIFIED
```

P2 depth는 현재 operative requirement와 principle만 정당화할 수 있다. Future
direction은 제한된 `TARGET_FIT`으로만 기록한다.

## 명시적 비목표 및 금지사항

SIASIU 개발은 현재 근접 목표가 아니다. Cosmile AI 개발도 현재 목표가 아니다.
두 제품은 Foundation target architecture·consumer requirement·evaluation success·
deepening 이유가 될 수 없다.

금지:

- SIASIU 구현 또는 기능 설계;
- Cosmile AI 구현 또는 기능 설계;
- Cosmile Golden Commerce 변경;
- Foundation을 ordinary commerce의 synchronous dependency로 만드는 것;
- Foundation product code 또는 canonical knowledge 변경;
- schema·migration 적용;
- shared·staging·production data 또는 infrastructure;
- real PII·customer data·live flag·public exposure·production deployment;
- secret 생성·노출 또는 미승인 provider 사용;
- Memory V3·sender/intake·autonomous job·promotion·serving mutation·canonical write;
- real-person matching·consent·recommendation policy 결정;
- Foundation 구현·ownership transfer·merge·deployment·risk acceptance·자동 후속 작업.

## 경로와 Actor

```text
foundation-strategy-sol
-> foundation-advisor
-> exact selected actors
-> Independent Reviewer
-> foundation-advisor
-> foundation-strategy-sol
-> Leo
```

Advisor는 admission·orchestration·sequencing·collision control·evidence integration·
phase gate·bounded correction routing·final targeted audit·return을 담당한다. 책임
repository actor를 대신하거나 구현하거나 self-review하지 않는다.

- Foundation Worker: Foundation-local census와 선택된 검증의 primary owner.
- Independent Reviewer: protocol challenge와 actual evidence 독립 검사.
- Control: 기본 미선정. P3 historical gate를 통과한 exact evidence만 조사.
- SIASIU Worker: 기본 미선정. exact downstream gate를 통과한 증거만 조사.
- Cosmile Worker: 기본 미선정. gate와 collision 확인을 통과한 exact 증거만 조사.
  Cosmile O1은 변경하지 않는다.
- Designer: 미선정.

Advisor가 runtime·model·effort·session·CWD·role·capacity·collision을 live verify한다.
Leo 승인 binding만 사용하고 승인 없이 model을 변경하지 않는다. Primary Foundation
Worker와 Independent Reviewer는 승인된 maximum effort, 조건부 targeted actor는 최소
xhigh를 권고한다.

## Capability state model

다음 axis를 분리한다.

```text
SOURCE
BUILD
TEST
RUNTIME
INTEGRATION
AUTHORITY
TARGET_FIT
```

일반 axis 결과:

```text
NOT_ASSESSED
NOT_APPLICABLE
ABSENT_AT_PIN
PRESENT_UNVERIFIED
VERIFIED_PASS
VERIFIED_FAIL
BLOCKED
```

`AUTHORITY`:

```text
CURRENT_CONFIRMED
HISTORICAL_ONLY
CONFLICT
LEO_DECISION_REQUIRED
UNVERIFIED
NOT_APPLICABLE
```

`TARGET_FIT`:

```text
SUFFICIENT
PARTIAL
GAP
UNVERIFIED
NOT_APPLICABLE
```

`INTEGRATION_SCOPE`:

```text
FOUNDATION_INTERNAL
GATED_DOWNSTREAM_EVIDENCE
NOT_APPLICABLE
```

Probe execution disposition:

```text
NOT_PLANNED
NOT_RUN
EXECUTED
PROVIDER_EXECUTION_NOT_RUN
ABORTED_BOUNDARY
CLEANUP_FAILED
```

Historical/downstream gate disposition:

```text
NOT_REQUIRED_FOR_DECISION
NOT_ADMITTED
ADMITTED_BOUNDED_READ_ONLY
DEFERRED
UNVERIFIED
OUT_OF_SCOPE
```

한 상태가 다른 axis를 승격하지 않는다. Composite `READY`, `SAFE`, `COMPLIANT`,
`OPERATIONAL`, AI-readiness score를 금지한다.

Capability 분류:

```text
WORKING_EVIDENCED
SOURCE_ONLY
MOCK
SHADOW
PARTIAL
HISTORICAL
DEAD
BLOCKED
UNVERIFIED
```

각 claim은 capability ID, axis/result, evidence class, exact Git/source pin, population
또는 equivalence class, command/inspection method, environment/config/synthetic data,
observed output, preserved failure, owner/authority, unknown ID, claim ceiling, decision
impact, mismatch/dependency, cleanup reference를 기록한다.

파일·record count·test source·historical report·config name·session name·인접 layer 성공은
runtime 증거가 아니다.

## Unknown 처리

Baseline claim 전에 frozen register를 complete unknown ledger로 확장한다. 각 unknown은
ID, question, classification, significance, current evidence, owner, resolution method,
required timing, blocking effect, final disposition을 기록한다. Composite unknown은
lossless child로 분리한다.

허용 disposition:

```text
RESOLVED_BY_COUNCIL_ANALYSIS
RESOLVED_BY_REPOSITORY_EVIDENCE
RESOLVED_BY_AUTHORITATIVE_SOURCE
LEO_DECISION_REQUIRED
VENDOR_CONFIRMATION_REQUIRED
LEGAL_OR_ACCOUNTING_COUNSEL_REQUIRED
IMPLEMENTATION_VALIDATION_REQUIRED
OUT_OF_SCOPE
```

Council reasoning은 factual unknown을 닫을 수 없다. 다음 implementation priority는
fact가 아니라 evidence를 기반으로 Strategy가 권고하고 Leo가 결정한다.

## P0 — Admission, mission pin, estimate

Product repository 실행 전에:

- exact repo·branch·HEAD·upstream·worktree·authority·actor capacity·active mission·
  collision·unrelated change 확인;
- exact source/pin, owner, steward, authority basis, effective status, supersession,
  precedence basis/source, conflict, claim ceiling을 가진
  `CANONICAL_MISSION_AND_SOURCE_PIN_RECORD` 작성;
- exclusion·evidence vocabulary·risk tier·claim ceiling·no-build boundary 동결;
- candidate command·listener·network·provider·credential name only·temporary resource·
  data class·cost cap·abort owner·cleanup 목록;
- purpose, source, classification, copy/right basis, digest-only rule, redaction, access,
  storage, retention/deletion, steward, claim link, cleanup을 가진
  `EVIDENCE_ARTIFACT_POLICY` 작성;
- phase별 engineering workday와 elapsed lower/upper estimate, confidence, evidence volume,
  Reviewer/correction allowance, external dependency/cost, critical path 반환.

P0 결과: `CONTINUE | NARROW | HOLD`.

```text
OUTER_CONTINUATION_ENVELOPE: LEO_DECISION_REQUIRED_BEFORE_P2
```

P0는 estimate를 만들 수 있지만 자기 execution authority를 만들 수 없다. Leo의 향후
dispatch 승인에 numeric continuation envelope가 없으면 P0/P1까지만 진행하고 P2 전에
estimate를 반환한다. Leo가 estimate를 승인한 후 reforecast가 upper bound를
`max(1 working day, 25%)`보다 초과하거나 새 repository·actor class·provider authority·
data/risk class·product/canonical write·ownership decision·material scope가 필요하면
Strategy/Leo에게 반환한다.

## P1 — Foundation-wide shallow census와 protocol freeze

Deep probe 전에 Foundation-local을 얕고 넓게 조사한다.

- repository·package·dependency·config·test·CI·runtime·ownership;
- canonical knowledge identity·provenance·version·rights·correction·retraction·
  stewardship·transformation·derived index;
- atomicity·ID/alias·semantics·unit·locale/market/time·relationship·missingness·conflict·
  duplication·freshness·coverage denominator;
- retrieval/index·deterministic logic·model/routing·judgment·safety·evidence·API·
  memory/learning control·runtime·operation·observability;
- Foundation-local historical/downstream reference만 기록하고 다른 repo를 기본으로 열지 않음;
- current consumer와 non-consumption은 Foundation integration evidence로만 기록.

각 selected slice에 content-addressed `P1_PROBE_FREEZE`를 작성한다.

- current mission requirement ID;
- exact unresolved capability/axis;
- population/equivalence class;
- 바꿀 수 있는 priority 또는 분류 결정;
- static evidence 부족 이유;
- selection/omission rationale;
- exact case 또는 deterministic selection rule;
- normal·negative·degraded·failure case;
- oracle·acceptance rule;
- pins·fixtures·risk tier·stochastic repetition rationale;
- maximum claim·effort/time/cost cap·no-probe consequence·expansion trigger·stop.

Contradiction, duplicate path, failed invariant, equivalence-class inconsistent result,
new material risk 또는 Foundation priority 결정을 바꿀 수 있는 finding만 expansion을
허용한다. Expansion은 승인된 envelope를 소비하며 자동 연장하지 않는다.

Independent Reviewer protocol도 P1에서 동결한다. Reviewer는 sample이나 product
priority를 공동작성하지 않는다.

## Knowledge 및 AI trace

선택된 response-affecting path마다 `KNOWLEDGE_USE_TRACE`를 작성한다.

```text
source identity/digest/version/effective state
-> canonical authority/provenance/rights
-> normalization/transformation pin and output identity
-> index/build and inclusion/exclusion
-> retrieved IDs/rank/score/truncation
-> actual redacted context
-> safe raw model output
-> parsed judgment
-> deterministic validation/rejection/override
-> final Foundation verdict/evidence
-> gated downstream preservation/transformation or non-consumption
```

누락 hop은 `UNVERIFIED`다. Citation 존재는 causal use 증거가 아니다.

각 material AI path에는 `AI_BEHAVIOR_CONTRACT_AND_EVALUATION_MANIFEST`를 작성한다.
Behavior/consequence, input/language, deterministic control, actual model/provider ID,
prompt/context pin, generation setting, route/fallback, memory/tool boundary, step/retry/
time/token/cost/call limit, stop behavior, scenario/oracle/repetition/regression/claim ceiling을
포함한다. P2는 actual route·fallback·tool attempt·stop reason·latency·token·cost·raw output·
parsed judgment·override·final verdict·모든 실패를 기록한다. 실패를 재실행으로 제거하지
않는다. 작은 sample은 exact observation일 뿐 general reliability 증거가 아니다.

## P2 — 선택된 격리 Foundation 검증

P1에서 선택한 slice만 mission-owned isolated non-production에서 실행한다.

- Tier 0: deterministic read-only;
- Tier 1: isolated local execution과 resource/cleanup;
- Tier 2: network/provider/credential/sensitive/mutation-capable, deny-by-default full record.

허용된 기존 build/test, local API, retrieval/index, synthetic question, synthetic
conflict/ablation, 별도 승인된 provider/model 실행만 가능하다. Memory/learning은 no-effect
검사만 가능하다.

전제 부족은 `NOT_RUN`, `UNVERIFIED`, `PROVIDER_EXECUTION_NOT_RUN`으로 종료한다.
Secret/PII, shared/production, public listener, canonical mutation, Memory/promotion,
cost overrun, cleanup failure는 해당 phase 즉시 `HOLD`다.

## P3 — Historical 및 downstream exact-question gate

P1은 Foundation-local indication만 기록한다. `foundation-control`, SIASIU, Cosmile을
기본으로 열지 않는다.

Historical 또는 downstream inspection 전에 exact Foundation question, local evidence
부족, decision impact, exact repo/path, allowed evidence class, expected evidence, pin,
inspection method, maximum claim, owner/gate decision, timebox/collision, prohibited depth,
stop/closure disposition, `NO_EXECUTION_OR_DISCOVERY_SWEEP: YES`를 기록한다.

허용 evidence는 pinned source·configuration·contract·existing evidence artifact뿐이다.
Historical/downstream build·test·runtime·provider·credential·data·write·full audit·consumer
discovery sweep·feature design·implementation은 금지한다.

Historical location과 과거 동작은 현재 Worker authority·canonical ownership·transfer·
deprecation·implementation authority를 부여하지 않는다.

## P4 — Evidence freeze, Independent Review, priority result

1. 하나의 content-addressed evidence index와 manifest 동결.
2. Reviewer가 admission·boundary·authority·failed/blocked·claim ceiling·candidate-support·
   cleanup evidence를 전부 보고 passing row는 risk-based reproducibility sample 검사.
3. 승인 envelope 안에서 한 번의 bounded factual mission-evidence correction/refreeze/
   rereview만 허용. 추가 material change 또는 반복 실패는 `HOLD`/`UNVERIFIED` 반환.
4. Advisor final audit 후 evidence 반환.
5. 하나의 `P4_PRIORITY_RESULT` 작성:

```text
BOUNDED_IMPLEMENTATION_CANDIDATE
NO_BUILD_OR_DEFER
FURTHER_EVIDENCE_REQUIRED
HOLD
```

Candidate는 evidence/unknown ID, outcome·acceptance measure·why now·scope/exclusion·
`PROPOSED_OWNER`·dependency·reversibility·rollback·test·estimate/confidence·no-build 및
next-best alternative 비교·waiting consequence·Leo/external decision을 포함한다.

P4는 canonical identity/source/owner/schema/identifier/merge/migration/correction/
retraction/rights/stewardship/ownership/API/AI behavior/canonical write/ordinary-commerce
dependency를 결정할 수 없다. 모두
`PROPOSED_PENDING_POST_EVIDENCE_COUNCIL_AND_LEO_DECISION`이다. Factual correction은
mission evidence artifact에만 적용한다.

모든 P4 결과:

```text
STATUS: NON_EXECUTABLE
IMPLEMENTATION_AUTHORIZED: NO
OWNERSHIP_AUTHORITY_CHANGED: NO
PENDING_POST_EVIDENCE_COUNCIL_AND_LEO_DECISION: YES
ADVISOR_IMPLEMENTATION_DISPATCHED: NO
MEMORY_V3: PAUSED
```

Advisor closure 후 Strategy에 반환한다. Strategy가 post-evidence Council challenge,
final synthesis, Leo decision으로 routing한다. 구현이나 다음 미션은 자동 시작하지 않는다.

## 필수 6개 logical output

1. `BASELINE_MANIFEST_ADMISSION_ESTIMATE_AND_EVIDENCE_POLICY`
2. `CAPABILITY_AXIS_CANONICAL_SOURCE_AND_AUTHORITY_MAP`
3. `KNOWLEDGE_AI_RUNTIME_AND_PROBE_TRACE_INDEX`
4. `PHYSICAL_HISTORICAL_INTEGRATION_AND_UNKNOWN_MAP`
5. `NON_EXECUTABLE_P4_PRIORITY_RESULT`
6. `INDEPENDENT_REVIEW_AND_ADVISOR_CLOSURE`

## 최대 claim 및 STOP

```text
MAXIMUM_CLAIM:
REVIEWED_FOUNDATION_CURRENT_STATE_AT_EXACT_NON_PRODUCTION_EVIDENCE_CEILINGS

NO_CLAIM_OF:
PRODUCTION_READINESS
GENERAL_AI_RELIABILITY
CORPUS_COMPLETENESS
SECURITY_OR_LEGAL_APPROVAL
REAL_PERSON_MATCHING_READINESS
GOVERNED_LEARNING_ACTIVATION
IMPLEMENTATION_READINESS_OR_AUTHORITY

FINAL_ACTION:
RETURN_TO_STRATEGY
STOP
```
