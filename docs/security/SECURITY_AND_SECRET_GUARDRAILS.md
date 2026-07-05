# SECURITY AND SECRET GUARDRAILS

> foundation-control 보안·secret·customer-memory guardrail 상세. CLAUDE.md는 짧은 pointer만·상세는 이 문서.
> 적용: auth·identity·customer data·memory·subject_ref·secret·env·prod DB·live flag·hard reject·main merge 관련 작업 전 필독.
> 관련: [ENV_AND_MIGRATION_POLICY.md](ENV_AND_MIGRATION_POLICY.md) · [CONTROL_SECURITY_REVIEW_POLICY.md](CONTROL_SECURITY_REVIEW_POLICY.md)

---

## 1. Secret 값 금지 위치 (절대 실 secret 값을 두지 않는다)
실 secret 값(prod/dev/staging 불문 **실제 값**)을 다음 어디에도 넣지·출력하지·붙여넣지 않는다:
- **code** (소스·주석·상수·default 값)
- **git history** (commit·diff·stash)
- **markdown / reports / 설계서 / audit** (foundation-docs 포함)
- **logs / trace / stdout / stderr**
- **tests / fixtures / snapshots**
- **ChatGPT / Claude / Control 대화** (프롬프트·응답·붙여넣기)
- **.env** (실 값)·**config 파일**·**CI 로그**
> ★dev/shadow placeholder 문자열(`*_dev_shadow_*_secret_v2` 등)은 secret이 **아님**(공개 placeholder·비-prod)이나, 실 prod secret은 위 어디에도 0.

## 2. 허용 evidence (검증·보고에 사용 가능)
- **boolean** (True/False·pass/fail)
- **count** (개수·row count·distinct count)
- **status** (PASS/HOLD/WAITING_FOR_OPS/BLOCKED_BY_HARD_STOP 등)
- **file path** · **commit hash** · **branch name**
- **test name** · **redacted key name** (예: `SIASIU_SUBJECT_SECRET`, 값 없이 이름만)
- **format/shape 설명** (예: "subj_v2_ + 32hex", 실제 값 아님)

## 3. 금지 evidence (검증·보고에 절대 포함 금지)
- **real secret values** · **raw secret hashes** (실 secret의 hash도 금지)
- **customer_id / email / phone / OAuth provider id**
- **order_id / cart_id / payment_id**
- **trace_id** (실 값) · **full env dump** (`env`·`printenv` 전체)
- **production DB row dump** · raw query/body/PII
> ★secret 분리 검증은 "값"이 아니라 **내부 hash 비교 결과의 boolean/count**(예: `all_secrets_distinct=True`·`distinct_count=5`)만 보고한다.

## 4. Foundation boundary
- Foundation은 **durable customer memory DB 아님** (고객 장기기억을 저장하지 않는다).
- Foundation은 **customer identity broker 아님** (furef↔subject_ref durable 매핑을 보관/중개하지 않는다).
- Foundation은 **service DB reader 아님** (subject_ref로 서비스 DB를 직접 조회하지 않는다).
- Foundation은 **request-scoped memory_context validation / gate / knowledge 판단만** 수행 (검증·결정 후 durable 저장 0).

## 5. Option B subject_ref boundary (현행 정본)
- subject_ref **generation / storage / SubjectRefMap = service-local.**
- SIASIU / Cosmile은 **common contract**(format/validation/gate)를 따르되 **secret / mint / storage는 per-service.**
- Foundation은 **subject_ref format / validation / gate만** 담당 (mint·secret·저장 0).
- subject_ref = `subj_v2_ + <32hex>` (서비스가 자기 `<SERVICE>_SUBJECT_SECRET`로 mint). Foundation-side mint·`FOUNDATION_SUBJECT_REF_SECRET`·identity-touch = **폐기(Option A)**.

## 6. Hard Stops (Leo 별도 승인 전 절대 미수행)
1. **real prod secret creation / view / print / vault write**
2. **prod DB write / backfill**
3. **live enable**
4. **hard reject activation**
5. **main merge / production promotion**
6. **production secret rotation**
7. **cross-service customer identity linkage** (subject_ref cross-service 연결)
> Hard Stop에 닿으면 **즉시 STOP·Leo 승인 요청.**

## 7. Self-review checklist (문서/작업 완료 전)
- [ ] 실 secret 값 0 (§1·§3)
- [ ] raw/PII/customer id/order id/trace id/full env dump 0 (§3)
- [ ] evidence = boolean/count/status/path/hash(commit)/test name만 (§2)
- [ ] Foundation durable memory / broker / service DB reader 표현 0 (§4·부정만 허용)
- [ ] Option B service-local subject_ref 원칙 유지 (§5)
- [ ] Hard Stop 미수행 (§6)
- [ ] 불확실하면 STOP·Leo 확인
