# SIASIU — Security & Secret Guardrails

> 성격: 보안·프라이버시 상세 규칙(정본). CLAUDE.md는 이 문서를 **짧게 pointer로만** 참조한다.
> 원칙: 코드 로직 수정 없이도 준수 가능한 규약. ★실 secret 값은 이 문서에도 절대 쓰지 않는다(key 이름만).
> 정합: Control M6-F Option B pivot과 **충돌 없음**(SIASIU service-local identity/memory boundary를 문서화할 뿐 live/broker/cross-service를 열지 않음).
> 관련: `docs/security/ENV_AND_MIGRATION_POLICY.md` · `docs/SIASIU_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md` · `FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md`.

## 1. Secret 값 금지 위치 (절대 등장 금지)
실 secret/API key/token/OAuth client secret/DB 비밀번호/subject secret 값은 **아래 어디에도** 평문으로 두지 않는다:
- **code** (소스·config 상수·기본값 fallback으로도 금지)
- **git history** (commit·diff·과거 revision — 유출 시 rotation 필요)
- **markdown / 설계문서 / 보고서** (본 문서 포함)
- **logs / *.jsonl / trace / _TRACE_RING**
- **tests / fixtures / snapshots** (테스트용은 `test-only-*` 더미만·실값 금지)
- **ChatGPT / Claude / Control / Fable5 대화 · foundation-docs mirror**
- **.env 파일 자체를 커밋** (오직 `.env.example`에 key 이름만)
→ 의심되면 **STOP + Leo 확인**. 이미 노출되었으면 값 삭제가 아니라 **rotation**(ENV_POLICY §3).

## 2. SIASIU Option B Identity Boundary
- **subject_ref 생성(mint)·저장·SubjectRefMap = SIASIU service-local.** SIASIU 내부에서만 `subject_ref ↔ furef_local_ref ↔ (guest_ref/anonymousId)` 매핑을 보유한다. Cosmile subject_ref와 **연결하지 않는다**(cross-service linkage = v1 범위 밖).
- **Foundation에 전송 금지**: raw `user_id` · email · OAuth provider id · `customer_id` · `order_id` · **`trace_id`를 identity 옆에 저장**(de-anon 벡터·P1). raw 상담원문·주문/결제/배송 원문도 금지.
- **Foundation에는 request-scoped `memory_context`만 전달**: opaque refs·enum·atom·consent flags만(원문/PII 제외). 착지점 = SSC.session_context(+known_allergies/avoid_ingredients/product_context).
- **Foundation은 고객 장기기억 저장소가 아니다**: request-stateless·`memory_write=false`·고객 memory 미조회·요청 후 memory_context 폐기. Foundation은 판단/검색/decision(ssbrain KB read-only) 소유.
- subject_ref/furef_local_ref = **가명(pseudonymous) 개인정보**(익명 아님) — 삭제·보존·동의 lifecycle 대상. secretless 절단 SHA256은 열거 가능 → **HMAC(secret)/per-service salt** 필수.

## 3. SIASIU 최종 메모리 소유
SIASIU는 최종적으로 **service-local memory DB(상담 + 커머스)**를 소유한다:
- **상담(consultation) memory**: ConversationSession·ConversationMessage(원문 정본)·EpisodeSummary — SIASIU 발생 원문은 SIASIU DB에 저장(opt-B).
- **long-term memory**: LongTermMemoryFact(memory_fact 확장)·MemoryFactCandidate·CustomerProfile.
- **commerce memory**: CommerceMemory 계약을 **schema-available·populate-conditional**로 보유(SIASIU commerce 도입 시 populate·미populate는 위반 아님).
- **governance**: ConsentRecord ledger·SubjectRefMap·consent/retention/delete(3-state).
→ 정본은 **SIASIU 소유**. Foundation은 memory_context refs만 임시 소비.

## 4. 허용 evidence / 금지 evidence
검증 결과(보고·테스트 출력)에는:
- **허용**: boolean(true/false)·count(N/M)·status(PASS/FAIL/SKIP/BLOCKED)·enum·prefix 존재 여부(예: `furef_v2_` 시작 여부)·length 일치 여부.
- **금지**: 실 secret 값·raw hash 전문·PII(email/phone/name/address/RRN/card)·customer_id·OAuth provider id·order_id·full env dump·raw 상담원문·DB row 덤프.
- 예: "ref prefix furef_v2_ ✅·len 32 ✅·raw email in SSC = False" (값 없이 boolean).

## 5. Hard Stops (명시적 Leo 승인 전 불가)
- production secret 생성/교체(rotation) 실행 · **실 secret 값 출력/커밋**
- prod DB 접근/쓰기/backfill/migration 실행
- **live enable**(flag OFF→ON) · shared_memory/broker enable · cross-service linkage
- **hard reject activation**(subject_ref/ingress gate를 live로 fail-closed 강제)
- **main merge** · force push · public API live
- customer memory live migration · canonical/learned promotion
→ 위 항목은 설계/문서/shadow까지만. 실행은 별도 승인 + release train.

## 6. Self-review checklist (작업 전/후)
- [ ] 실 secret 값 등장 0(code/git/md/log/test/대화)?
- [ ] .env 커밋 0 · `.env.example`는 key 이름만?
- [ ] Foundation 전송 payload에 raw user_id/email/OAuth id/customer_id/order_id/trace_id 0?
- [ ] subject_ref는 HMAC(secret)/salt·평문 PII를 key로 안 씀?
- [ ] evidence가 boolean/count/status only(raw/PII/hash 전문 0)?
- [ ] 코드 로직 변경 0 · prod DB 접근 0 · live/main merge 0?
- [ ] Control M6-F Option B(service-local·cross-service v1 밖)와 충돌 0?
- [ ] 불확실하면 STOP + Leo 확인?
