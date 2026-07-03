# FOUNDATION-FRC-TRACE-ID — Control Review (read-only)

> 작성: foundation-control (control tower) · 2026-07-02 · read-only(코드 수정 0 · 문서 외 수정 0 · push 0)
> 대상: commit **7cf53e8** · 기준 `docs/FOUNDATION_FRC_TRACE_ID_PLAN_20260702.md`

## 최종 판정: **FOUNDATION_TRACE_ID_CONTROL_PASS**
FRC top-level `trace_id`가 설계대로 **1필드 additive**(기존 request_id 재사용)로만 구현. 판단 로직·기존 FRC 값·raw/PII 정책 **불변**·회귀 전부 PASS·Cosmile 자동 populate 구조 확인.

---

## 1. 변경 범위
- commit 7cf53e8: `FRC top-level trace_id (additive, reuse request_id)`. **2 파일**: **M** `foundation_http_service/contracts.py` · **A** `scripts/foundation_frc_trace_id_test.py`.
- **contracts.py diff = 정확히 1줄**: `"trace_id": r.get("request_id"),`(build_frc 반환 dict). ✅ trace_id 1필드만.
- **판단 로직 변경 0**: core.py / semantic_router / deepseek / llm_guard 미포함(commit 0). consult_contract / consult_chat / safety gate / decision / strategy / product permission **무변경**. ✅
- **SIASIU / Cosmile 코드 변경 0** ✅.
- push 0(foundation-control ahead·미push).

## 2. trace_id 구현
- **FRC top-level `trace_id` 존재** ✅ (build_frc 반환 dict).
- **값 = `r.get("request_id")` 기존 request_id 재사용** ✅ (in-process: `build_frc({request_id:"fdsh_abc123def4567890",…}).trace_id == request_id` = True).
- **새 trace 생성기(trace_id()/uuid/random) build_frc 내부 추가 = 0** ✅ (diff grep 0).
- **request_id 부재 → None(정직)** ✅ (in-process: `build_frc({…no request_id…}).trace_id == None`).

## 3. 형식 / 안정성
- **형식 `fdsh_[0-9a-f]{16}`** ✅ (런타임 curl: `fdsh_bb1e87a7f5e84c7c`·`fdsh_1581cb63376c4f40`).
- **한 요청 내 stable** ✅ (단일 request_id → 단일 trace_id).
- **요청 간 unique** ✅ (런타임 2회 curl → 서로 다른 trace_id).
- **기존 request_id와 동일 값** ✅ (build_frc가 request_id 그대로 복사).

## 4. 기존 FRC 값 불변 (trace_id 제외)
- in-process build_frc: 기존 필드 **전부 존재+정상** · additive(trace_id만 신규·나머지 키셋 동일).
- 런타임: final_strategy=recommend_with_caution 정상.
- 검증 대상 전부 불변: final_strategy · decision_type · safety_gate_result · products_allowed · recommendation_allowed · product_candidates · suppression_reason · forbidden_expressions · **trace.raw_pii_included=False**. ✅
- ★신규 test `foundation_frc_trace_id_test`에 "trace_id 제외 시 결정 필드 동일(full 비교 안정)" 케이스 포함(H8 PASS).

## 5. raw / PII
- **trace_id = random hex(fdsh_+uuid16)** — raw_text / user message / PII **미포함** ✅.
- **raw_pii_included = False 유지** ✅ · Foundation write/live invariant(api_live=false·write 0) 불변(trace_id는 저장 아닌 응답 필드).
- **원문 echo 0** ✅ (trace_id에 발화/식별정보 없음). server 로그 원칙(trace_id/decision만) 불변.

## 6. 회귀 테스트
| 테스트 | 결과 |
|---|---|
| foundation_frc_trace_id_test | **14/14 PASS** |
| dual_service_adapter_foundation_patch_test | **26/26** |
| foundation_http_service_test (golden) | **40/40** |
| candidate override adversarial | **safety_viol=0 · false_rec=0 · decision_integrity=1.0** |
| brain golden | **21/21 all_pass** |
- ★**full-dict 비교로 깨지는 테스트 0**: trace_id는 random이나 비교 대상 필드 목록에 미포함 · 신규 test가 trace_id 제외 안정성 명시 검증.

## 7. Cosmile 연결 관점
- **구조 확인**: `/v1/consult_contract` 응답 FRC에 top-level `trace_id`(non-null·런타임 확인) → Cosmile `foundationDecisionEvent`가 `frc.trace_id ?? null` 읽음 → **foundation_trace_id가 non-null(foundation_http)로 자동 채워짐**. ★**Cosmile 코드 변경 0**.
- **실제 Cosmile eval**: 별도(E2E·DB write·:3000/:8731 필요) — control 미실행(read-only·write 원칙). 구현 후 Cosmile 팀/후속 eval에서 foundation_trace_id non-null 실증 권장(WATCH).

## 무결성
- Control foundation-control 코드 **0**(문서 외) · SIASIU/Cosmile 미접촉 · 문서 = 본 검수 보고서 1건 · **push 0**.
- 검수 수단: git show + in-process build_frc/test + 회귀 + 임시 :8731 curl 2회(**작업 후 종료**·잔여 0).
- 서버: `:8731`=0 · `:8732`=0 · foundation 프로세스=0 · `:3000`(Cosmile 팀·미접촉).

## 요약
commit `7cf53e8` = FRC top-level `trace_id` **1필드 additive**(build_frc·기존 request_id 재사용·새 생성기 0·부재 None 정직) · 판단/기존 FRC 값/raw·PII 정책 **불변** · 런타임 fdsh_16·요청간 unique · 회귀(14/14·26/26·40/40·golden 21/21·adversarial 0) 전부 PASS · **Cosmile 코드 변경 0으로 foundation_trace_id 자동 populate**. → **FOUNDATION_TRACE_ID_CONTROL_PASS**. Control 코드 0·push 0·서버 잔여 0.
