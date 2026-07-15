# FOUNDATION TEAM MISSION HANDOFF

## Mission

```text
MISSION_ID:
MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1

MISSION_TYPE:
READ_ONLY_AUDIT

AUTHORIZED_SCOPE:
M1 ONLY

M2:
NOT_AUTHORIZED

PACKAGE_1B:
NOT_AUTHORIZED

NEXT_MISSION:
NOT_AUTHORIZED
```

## 1. Mission 목적

Memory V3의 원래 범위인 `V3-00~V3-12`를 현재 Git·코드·schema·migration·tests·기존 evidence와 대조하여 다음을 증거 기반으로 확정하라.

```text
ALREADY_COMPLETE
PARTIALLY_COMPLETE
NOT_IMPLEMENTED
SUPERSEDED
UNKNOWN
BLOCKED
NEEDS_FOUNDER_DECISION
NOT_APPLICABLE
```

`REMAINING_DELTA`는 상태값으로 사용하지 말고 각 항목의 별도 필드로 기록한다.

이 Mission은 구현 미션이 아니다.

목표는 다음 구현을 시작하는 것이 아니라:

```text
문서상 V3 상태
→ 실제 현재 repository 상태와 대조
→ 남은 정확한 delta 확정
→ 독립 Reviewer가 기준선 검증
→ Leo + Strategy GPT에게 복귀
```

하는 것이다.

---

# 2. 현재 Authority

작업 시작 전 현재 Agent Office의 active authority를 직접 확인하라.

우선순위:

```text
1. Leo/GPT의 현재 명시적 결정
2. Agent Office TEAM_OPERATING_MODEL 및 matching role document
3. 이 exact Mission handoff
4. 각 프로젝트 AGENTS.md / CLAUDE.md / domain rules
5. foundation-docs의 과거 V3 mission·review·audit artifact
```

과거 protocol이나 session 이름만으로 현재 권한·모델·역할을 추정하지 마라.

모든 Actor dispatch 전에 실제 다음을 확인하라.

```text
ACTOR
SESSION
ACTUAL_MODEL
EFFORT
WORKSPACE
ROLE
REQUIRED_SKILL
INDEPENDENCE
CURRENT_AUTHORITY
```

---

# 3. Responsible Advisor

```text
RESPONSIBLE_ADVISOR:
foundation-advisor
```

Advisor가 전체 감사를 통솔한다.

Advisor 책임:

* 현재 authority 확인
* 각 repo의 정확한 read-only 조사 범위 설정
* 각 제품 전용 Worker에게만 해당 repo 조사 배정
* Foundation Control에는 cross-project 계약·역사 분석만 배정
* 결과 artifact와 pointer 회수
* 서로 충돌하는 증거 조정
* Independent Reviewer 배정
* Reviewer finding 처리
* 최종 Advisor audit
* Leo/GPT에게 결과 반환

Advisor는 제품 코드를 수정하지 않는다.

---

# 4. Actor Routing

## FOUNDATION 조사

```text
TARGET_ACTOR:
foundation Worker

TARGET_PROJECT:
FOUNDATION

TARGET_WORKSPACE:
/home/leo/Project/FOUNDATION

REQUIRED_SKILL:
/fable-builder

MODE:
READ_ONLY_AUDIT
```

## SIASIU 조사

```text
TARGET_ACTOR:
siasiu Worker

TARGET_PROJECT:
SIASIU

TARGET_WORKSPACE:
/home/leo/Project/SIASIU

REQUIRED_SKILL:
/fable-builder

MODE:
READ_ONLY_AUDIT
```

## Cosmile 조사

```text
TARGET_ACTOR:
cosmile Worker

TARGET_PROJECT:
Cosmile

TARGET_WORKSPACE:
/home/leo/Project/Cosmile

REQUIRED_SKILL:
/fable-builder

MODE:
READ_ONLY_AUDIT
```

## Cross-project 계약·역사 조사

```text
TARGET_ACTOR:
foundation-control

TARGET_WORKSPACE:
/home/leo/Project/foundation-control

MODE:
READ_ONLY_CONTROL_ANALYSIS
```

Foundation Control은 코드를 구현하거나 제품 repo를 수정하지 않는다.

Control의 범위:

* V3 cross-project ownership
* Foundation·SIASIU·Cosmile 계약 관계
* V3-00~V3-12 문서와 현재 구조의 정합성
* legacy runtime/code 존재 여부
* obsolete·duplicate·superseded 계약
* Package 1A/1B와 원래 V3의 관계
* outbox·candidate·memory 경계

Control 결과는 반드시 Advisor에게 반환한다.

## Independent Reviewer

```text
TARGET_ACTOR:
현재 live 검증된 독립 Foundation Reviewer
또는 승인된 SOL Reviewer

REQUIRED_SKILL:
/fable-sentinel

REVIEW_PASS:
CURRENT_STATE_AUDIT_REVIEW
```

세션 이름으로 모델을 추정하지 말고 실제 runtime을 확인한다.

Reviewer는 조사·작성 Actor와 별도 세션이어야 한다.

---

# 5. Actor 간 통신 제한

다음은 금지한다.

```text
Worker → 다른 Worker 직접 전달
Worker → Reviewer 직접 호출
Reviewer → Worker 직접 patch 지시
Control → Worker 직접 전달
Designer/Control/Worker 간 직접 미션 handoff
Actor의 자동 다음 작업 시작
```

모든 결과 흐름:

```text
Actor
→ durable result file
→ compact pointer
→ foundation-advisor
```

Reviewer finding도 Advisor를 통해 같은 조사 Actor에게 돌아간다.

---

# 6. Effort 운영

모든 Actor를 무조건 최고 effort로 실행하지 마라.

Advisor가 작업 특성에 따라 실제 effort를 조절한다.

권장 원칙:

```text
단순 Git·파일 inventory:
필요 충분한 중간~높은 effort

복잡한 legacy·cross-project 계약 분석:
높은 effort

독립 기준선 검수:
xhigh 권장

증거 충돌·중요 보안/identity 문제:
필요한 경우에만 max

좁은 artifact patch 재검수:
delta 중심으로 effort 하향 가능
```

단, effort를 낮춰 정확한 Git·계약·보안 증거 확인을 생략해서는 안 된다.

---

# 7. 허용되는 쓰기

제품 저장소와 Control workspace는 완전 read-only다.

```text
ALLOWED_WRITE:
foundation-docs의 본 M1 전용 job/result/review/pointer artifact만
```

권장 Mission artifact root:

```text
/home/leo/Project/foundation-docs/advisor/jobs/
MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/
```

정확한 path와 안전한 non-protected branch는 Advisor가 현재 Git 상태를 확인하여 handoff에 고정한다.

commit/push는 다음 조건에서만 허용한다.

```text
- foundation-docs의 M1 artifact만
- exact approved branch
- explicit path staging
- staged diff 검증
- non-force
- main/protected branch 아님
- 기존 unrelated dirt 포함 금지
```

안전한 branch 또는 push 권한이 불명확하면 자동 commit/push하지 말고 사실대로 보고한다.

```text
FORBIDDEN_WRITE:
/home/leo/Project/FOUNDATION
/home/leo/Project/SIASIU
/home/leo/Project/Cosmile
/home/leo/Project/foundation-control
```

금지 대상:

* source
* 설계문서
* fixture
* snapshot
* seed
* schema
* migration
* generated file
* lockfile
* config
* feature flag
* runtime state

---

# 8. 금지 행동

```text
코드 수정
DB query
DB connection
schema/migration 실행
secret·credential 접근
실제 provider/network 호출
feature flag 변경
Package 1B 시작
Routing 02.7 구현
Slack write delivery
production/live/main 접근
git fetch 자동 실행
branch 생성·변경
자동 cleanup
자동 backfill
자동 next mission
```

M1 실행은 다음을 의미하지 않는다.

```text
M1
≠ Package 1B 승인
≠ M2 승인
≠ outbox flush 승인
≠ DB 조회 승인
≠ V3 구현 승인
```

---

# 9. 필수 Git Baseline

다음 workspace마다 작업 전후 정확한 Git 상태를 기록한다.

```text
/home/leo/Project/FOUNDATION
/home/leo/Project/SIASIU
/home/leo/Project/Cosmile
/home/leo/Project/foundation-control
/home/leo/Project/foundation-docs
```

필수 필드:

```text
REPO_OR_WORKSPACE
IS_GIT_REPOSITORY
BRANCH
HEAD
DIRTY_STATE
STAGED_FILES
UNSTAGED_FILES
UNTRACKED_FILES
UPSTREAM
AHEAD
BEHIND
UPSTREAM_INFORMATION_FRESHNESS
RELEVANT_LOCAL_BRANCHES
RELEVANT_REMOTE_TRACKING_BRANCHES
LAST_RELEVANT_V3_COMMIT
PRE_AUDIT_GIT_STATUS
POST_AUDIT_GIT_STATUS
```

`git fetch`는 실행하지 않는다.

현재 local ref가 언제 갱신됐는지 확인 가능하면 freshness를 기록하고, 확인할 수 없으면 `UNKNOWN`으로 남긴다.

---

# 10. V3-00~V3-12 감사 범위

## V3-00 Problem Definition

확인:

* 원래 Memory V3 목적
* 현재 제품 경계와 정렬 여부
* superseded 범위
* 실제 closure artifact

## V3-01 Existing Cosmile 5 Mission Reconciliation

확인:

* 기존 5개 mission 목록
* 재사용된 결과
* 충돌·중복
* 미해결 범위
* reconciliation closure

## V3-02 Learning Commerce Memory Contract

확인:

* 상담 맥락
* 추천 이유
* recommendation evidence
* purchase outcome
* feedback
* product/ingredient mapping
* memory candidate

## V3-03 Recommendation Event Contract

확인:

* recommendation creation
* exposure
* click
* product view
* cart
* context/reason references
* schema/version/idempotency

## V3-04 Order / Revenue / Feedback Outcome Contract

확인:

* purchase
* order/orderItem
* revenue
* satisfaction
* adverse
* feedback
* repurchase
* refund/use-stop
* 실제 구현·deferred 범위

## V3-05 Product / Ingredient Intelligence Mapping

확인 가능한 것:

```text
PRODUCT_INGREDIENT_CODE_STATE
CONFIGURED_SOURCE_STATE
SCHEMA_MAPPING_STATE
FIXTURE_OR_SEED_STATE
INGESTION_CODE_STATE
DOCUMENTED_COUNTS
```

실제 DB row 수는 다음으로 기록한다.

```text
PERSISTED_ROW_COUNTS:
UNKNOWN — DB_QUERY_NOT_AUTHORIZED
```

## V3-06 MemoryFactCandidate Promotion Rules

확인:

* raw outcome → candidate
* reject/reviewed/stable 상태
* automatic promotion 여부
* current active code
* safety asymmetry
* Foundation authority

자동 durable promotion이나 ranking 변경이 없음을 확인한다.

## V3-07 Safety & Adverse Reaction Guardrail

확인:

* satisfaction와 adverse 분리
* adverse candidate
* safety 우선 처리
* 추천 억제·review 상태
* 일반 만족도와 safety signal 혼합 여부

## V3-08 DB Integration & Invariant Design

확인:

* Prisma/schema
* migration
* rollback
* non-prod/ephemeral rehearsal
* D-O1
* `orderItemId` uniqueness
* duplicate handling
* legacy SQLite quarantine
* Phase 2A 상태

실제 target DB 조회·migration은 금지한다.

## V3-09 Analytics Report Minimum

확인:

* recommendation exposure
* click
* purchase
* satisfaction/adverse
* repurchase
* product/ingredient reference
* duplicate/missing/rejection
* report·CLI·structured alert event

Slack Gateway 구현은 V3 범위로 포함하지 않는다.

## V3-10 Pre-Implementation Ops/Fable Review

확인:

* review artifact
* verdict
* 검수 범위
* 제외 범위
* 이후 변경으로 review가 stale해졌는지

## V3-11A Core Logic

확인:

* 순수 TypeScript logic
* provider-independent tests
* candidate/adverse rules
* 현재 active source
* test coverage

## V3-11B DB Integration

확인:

* Prisma/schema/migration
* rollback
* ephemeral PostgreSQL rehearsal
* invariant
* D-O1 current location

## V3-11C Event Wiring

다음의 실제 상태를 개별적으로 분류한다.

```text
recommendation generated
recommendation exposed
recommendation clicked
product viewed
added to cart
purchased
RecOutcomeEvent generated
feedback captured
repurchased
refund/use-stop captured
```

추가 확인:

```text
RecommendationEvent
RecOutcomeEvent
RecOutcomeFeedback
recommendationId
sessionId
orderId
orderItemId
subject/user reference
feature flag
producer
consumer
```

`sessionId=null`은 자동으로 버그라고 단정하지 않는다.

```text
CURRENT_BEHAVIOR
INTENDED_CONTRACT
PRIVACY_IMPACT
ATTRIBUTION_IMPACT
FOUNDER_DECISION_REQUIRED
```

로 구분한다.

## V3-11D Signal Extraction

원래 free-text semantic extraction과 최신 Founder 결정의 차이를 확인한다.

현재 허용된 방향:

```text
structured feedback
→ provider-independent normalization
→ satisfaction candidate / adverse candidate
```

확인:

* free-text path
* external provider path
* structured mapping
* normalized labels
* adverse signal
* deferred/superseded 상태

## V3-11E Analytics & Alert

확인:

* minimum report
* CLI
* anomaly detection preparation
* structured alert event
* test
* 실제 Slack과의 분리

## V3-12 Post-Implementation Review

확인:

* 기존 review artifact
* review가 V3 전체를 포괄하는지
* 구현 후 변경이 있었는지
* cross-project 검수 여부
* closure 누락 항목

---

# 11. Outbox와 Package 1B 상태

M1에서 반드시 code/schema/contract 수준으로 확인한다.

```text
OUTBOX_OR_TRANSPORT_PATH
PRODUCER
CONSUMER
PAYLOAD
PURCHASE_ITEM_REFERENCE
USER_OR_GUEST_IDENTIFIER
CONSENT_FIELD
PROVENANCE_FIELD
FLUSH_DEFAULT
RETRY
REPLAY_AND_IDEMPOTENCY
RETENTION_REPRESENTATION
CLEANUP_PATH
ERROR_OR_DEAD_LETTER_PATH
FOUNDATION_INTAKE_PATH
CURRENT_CONTAINMENT_STATUS
```

실제 DB row는 조회하지 않는다.

Package 1B 관련 항목은 다음처럼 보고한다.

```text
PACKAGE_1B_AUTHORIZATION:
NO

UNAUTHORIZED_CODE_OR_STUB:
OBSERVED / NOT_OBSERVED / UNKNOWN

STRUCTURED_PURCHASED_ITEM_IMPLEMENTATION:
<status>

FOUNDATION_SIGNAL_DELIVERY:
<status>

OUTBOX_CONTAINMENT:
<status>
```

M1 실행은 Package 1B 승인이 아니다.

```text
M1
≠ Package 1B authorization
≠ M2 authorization
≠ outbox flush authorization
≠ DB query authorization
≠ V3 implementation authorization
```

---

# 12. 테스트 실행 안전 조건

테스트 명령과 테스트 파일을 발견하고 기록하는 것은 허용한다.

실제 테스트 실행은 다음 조건이 실행 전에 증명된 경우에만 허용한다.

```text
외부 DB 접근 없음
실제 secret 접근 없음
network/provider 호출 없음
source 변경 없음
fixture/snapshot 자동 업데이트 없음
persistent Docker volume 변경 없음
ephemeral artifact만 사용
실행 후 Git 상태 불변
```

테스트 실행 전후 정확한 `git status` evidence를 기록한다.

안전성을 증명할 수 없으면 다음과 같이 기록한다.

```text
TEST_COMMAND:
<observed command>

TEST_EXECUTION:
NOT_RUN_SAFETY_UNPROVEN

REASON:
<exact reason>
```

테스트 수치 확보를 위해 안전 경계를 완화하거나 추측하지 않는다.

---

# 13. 각 Actor Result 요구사항

각 조사 Actor는 Advisor가 지정한 exact result path와 pointer path에 durable result를 작성한다.

채팅·tmux pane 출력만으로는 evidence가 아니다.

필수 result 내용:

```text
MISSION_ID
ACTOR
PROJECT
REPOSITORY
BRANCH
STARTING_HEAD
ENDING_HEAD
ACTUAL_MODEL
EFFORT
REQUIRED_SKILL
AUTHORIZED_SCOPE
OBSERVED_FILES
GIT_BASELINE
STATUS_MATRIX
REMAINING_DELTA
TEST_COMMANDS
TEST_EXECUTION
FAILURES_AND_SKIPS
UNKNOWN
BLOCKED
FOUNDER_DECISIONS
PRODUCT_REPO_WRITE_STATUS: ZERO
DB_QUERY_STATUS: ZERO
FLAG_CHANGE_STATUS: ZERO
RESULT_PATH
POINTER_PATH
RETURN_TO: foundation-advisor
STOP
```

각 Actor는 다음을 지킨다.

```text
Actor
→ durable result file
→ compact pointer
→ foundation-advisor
→ STOP
```

금지:

* 다른 Worker에게 직접 전달
* Reviewer 직접 호출
* Control이 Worker에게 직접 전달
* 다음 WorkUnit 자동 시작
* M2·M3 또는 Package 1B 시작

---

# 14. Advisor 통합 산출물

최종 M1 통합 artifact는 최소 다음 구조를 가진다.

```text
01_CURRENT_GIT_BASELINE
02_V3_00_TO_V3_12_STATUS_MATRIX
03_V3_11A_TO_V3_11E_CODE_INVENTORY
04_EVENT_AND_OUTCOME_FLOW_MAP
05_PRODUCT_INGREDIENT_MAPPING_STATE
06_MEMORY_CANDIDATE_AND_SAFETY_STATE
07_OUTBOX_AND_PACKAGE1B_STATE
08_ANALYTICS_AND_ALERT_STATE
09_STALE_DUPLICATE_SUPERSEDED_MAP
10_UNKNOWN_BLOCKED_FOUNDER_DECISIONS
11_REMAINING_DELTA
12_LIKELY_M2_SCOPE_NOT_PREAUTHORIZED
13_EVIDENCE_POINTERS
14_INDEPENDENT_REVIEW
15_ADVISOR_FINAL_AUDIT
```

각 V3 항목은 다음 형식을 사용한다.

```text
V3_ITEM:
STATUS:
EVIDENCE:
CURRENT_IMPLEMENTATION:
CONTRACT_ALIGNMENT:
REMAINING_DELTA:
UNKNOWN:
BLOCKER:
FOUNDER_DECISION_REQUIRED:
```

허용되는 `STATUS`는 다음뿐이다.

```text
ALREADY_COMPLETE
PARTIALLY_COMPLETE
NOT_IMPLEMENTED
SUPERSEDED
UNKNOWN
BLOCKED
NEEDS_FOUNDER_DECISION
NOT_APPLICABLE
```

`REMAINING_DELTA`는 상태값이 아니라 별도 필드다.

Advisor는 likely next scope를 제안할 수 있지만 다음을 명시한다.

```text
LIKELY_M2_SCOPE:
<evidence-based proposal>

M2_AUTHORIZATION:
NO

NEXT_MISSION:
NOT_PREAUTHORIZED
```

---

# 15. Independent Review

독립 Reviewer 검수는 필수다.

Reviewer는 dispatch 직전에 다음을 live verification한다.

```text
SESSION
ACTUAL_MODEL
EFFORT
WORKSPACE
ROLE
REQUIRED_SKILL
INDEPENDENCE
```

Reviewer required skill:

```text
/fable-sentinel
```

Reviewer는 다음을 직접 확인한다.

* Git baseline 정확성
* product repo write 0
* foundation-control write 0
* DB query 0
* feature flag change 0
* evidence pointer 무결성
* status 분류 정확성
* UNKNOWN이 추측으로 채워지지 않았는지
* stale/duplicate/superseded 분류
* 테스트 실행 안전 조건
* outbox와 Package 1B 상태
* remaining delta가 실제 evidence와 일치하는지
* proposed M2 scope가 과장되지 않았는지
* M2·M3·Package 1B가 시작되지 않았는지

Reviewer verdict:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

`NEEDS_PATCH`이면:

```text
같은 작성 Actor
→ 감사 artifact의 좁은 delta 수정
→ 같은 Reviewer
→ delta 중심 재검수
```

를 사용한다.

`PASS_WITH_RISK`이면 Leo/GPT가 위험을 수용하기 전에는 M1 기준선을 final로 닫지 않는다.

Reviewer는 제품 코드를 수정하거나 직접 patch하지 않는다.

---

# 16. STOP 조건

다음이 발생하면 즉시 멈추고 evidence와 함께 foundation-advisor에게 반환한다.

```text
현재 authority 충돌
actor/session/model/workspace 불일치
required skill 확인 실패
제품 repo 또는 foundation-control에 write 필요
DB 조회 또는 DB 연결 필요
secret/provider/network 접근 필요
테스트 안전성 증명 실패
unrelated dirty state와 조사 범위 충돌
Package 1B 결정을 요구
retention/consent/identity 정책 결정 필요
M2 구현이 필요
새 branch 생성·변경이 필요
git fetch가 필요
현재 Mission 범위를 넘어서는 조사 필요
result 또는 pointer evidence를 검증할 수 없음
```

STOP은 실패가 아니라 권한 경계 유지다.

---

# 17. Mission 종료

M1 완료 후 반드시 다음 상태로 종료한다.

```text
RETURN_TO:
Leo + Strategy GPT

M1:
REVIEWED_BASELINE_READY
또는 Reviewer verdict와 Advisor audit에 따른 정확한 상태

M2:
NOT_AUTHORIZED

M3:
NOT_AUTHORIZED

PACKAGE_1B:
NOT_AUTHORIZED

NEXT_MISSION:
NOT_AUTHORIZED
```

Advisor는 likely next scope를 제안할 수 있지만 자동으로 실행하지 않는다.

M1 최종 결과는 독립 Reviewer verdict와 Advisor final audit를 포함하여 Leo/GPT에게 반환하고 멈춘다.
