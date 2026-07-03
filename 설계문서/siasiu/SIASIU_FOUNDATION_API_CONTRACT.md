# Foundation Core API — 계약서 (정본)

> **버전 v0.1 · 2026-06-24** · Leo 결정 + Claude 구현
> 한 줄: **Foundation = 도메인 무관 *코어*(검색+판단+메모리+표현 통합 실행). SIASIU = 그 위에 도는 *화장품 vertical*. Cosmile = SIASIU를 HTTP로 호출하는 *Commerce Shell*.**
> ★**외부 = 통합 API 하나**(Cosmile은 내부 모듈 따로 호출 ❌) / **내부 = 모듈식**(judge·search·memory·presentation orchestrate).
>
> **변경이력**
> - **v0.1 (2026-06-24)** — 최초. `/v1/foundation/analyze-product`(통합 orchestration·구현) + compare-products·review-product-data(stub). engine=foundation_core/vertical=siasiu_cosmetic. 18 suite GREEN.

---

## 0. 계층 (Leo 2026-06-24)
```
[Foundation Core]  ← 도메인 무관: orchestration + 불변 원칙(Judge-Locked·no-heuristic·evidence grading·memory 상태)
      ↑ 그 위에서 돈다
[SIASIU vertical]  ← 화장품/건강: ingredient registry·judge 규칙(레티놀/임신)·intake — *오늘까지 만든 도메인 로직*
      ↑ HTTP 호출
[Cosmile Shell]    ← commerce: 몰·상품·결제·UI (AI 코어 재구현 ❌·결과 표시만)
```
※ *샤슈도 나중엔 Foundation 모델 위에서 돈다* — Foundation은 **Leo의 모든 프로젝트(여행·논문·뷰티…)의 코어**. SIASIU = vertical #1.

## 1. 엔드포인트
| Method · Path | 상태 | 역할 |
|---|---|---|
| `GET /health` | ✅ | 엔진·모듈 상태 |
| `POST /v1/foundation/analyze-product` | ✅ 구현 | ★통합 — 제품×고객 → 판단+근거+검색+메모리+표현 |
| `POST /v1/foundation/compare-products` | ⬜ stub | 제품 A vs B 비교 판단(설계만) |
| `POST /v1/foundation/review-product-data` | ⬜ stub | 관리자 상품 등록 검수(Phase 2·고객 비공개) |

## 2. analyze-product — 내부 orchestration (외부엔 안 보임)
```
intake normalize(성분→atom·mapping_meta)
 → judge_product_full          # ★verdict=judge_real·edge/claim 연결
 → search_triggers             # 언제 검색하나(판단 안 바꿈)
 → query_planner               # 다국어 검색어
 → [options.run_search=true]   # ★그때만 retrieval
     retrieval                 #   raw_search_results(used_for_judgment=false)
     evidence_grading          #   raw→graded(판단 전 검문·only S/A+high relevance만 evidence)
 → memory(stub)                # write_memory_candidates → candidate(stable ❌)
 → presentation(template)      # judge_result→고객 문장(Judge-Locked·DeepSeek은 나중)
```

## 3. Request schema
```json
{
  "product": { "ingredients": [{"atom":"ing:retinol","conc":0.3}], "claims":[{"type":"...","text":"..."}] },
  "customer_context": { "facts": {"life_stage":"pregnant","skin_type":"sensitive"} },
  "options": { "run_search": false, "use_memory": true, "write_memory_candidates": true, "presentation_language": "ko" }
}
```
※ product.ingredients는 atom 또는 raw 中文명(intake가 ALIAS로 매핑). options 기본: run_search=false.

## 4. Response schema
```json
{
  "ok": true, "engine": "foundation_core", "vertical": "siasiu_cosmetic", "version": "v0.1-local",
  "judgment": "caution", "confidence": "normal",
  "customer_message": "이 제품은 주의가 필요해 보여요. ...",
  "reasons": [], "cautions": [], "interactions": [], "claim_conflicts": [],
  "search_tasks": [], "query_plans": [], "raw_search_results": [], "graded_evidence": [],
  "memory_used": [], "memory_candidates": [], "warnings": [],
  "used_for_judgment": true
}
```

## 5. 불변 원칙 (계약)
- **verdict = judge_real이 결정.** 통합 orchestration이 *판단을 바꾸지 않는다*(테스트 13: 통합 verdict == judge_product_full verdict).
- **search 결과는 evidence grading 전까지 판단에 안 씀.** raw_search_results 각 항목 `used_for_judgment=false`. top-level `used_for_judgment=true`는 *판단이 judge_real 근거(raw 비오염)*라는 뜻.
- **memory 상태 구분: candidate / reviewed / stable.** grading 직후는 *candidate*(바로 stable ❌·rejected는 삭제 ❌).
- **external=통합 / internal=모듈식.** Cosmile은 `/v1/foundation/*`만. 내부 모듈(judge·search…) 직접 호출 ❌.
- **표현층=Judge-Locked.** template/LLM이 verdict·안전을 *바꾸면 안 됨*(DeepSeek 배선 후 `llm_integrity.check_integrity` 적용).

## 6. 실행
```bash
cd ~/Project/SIASIU
.venv-brain/bin/uvicorn app.api_server:app --host 127.0.0.1 --port 8000 --reload
# GET /health · POST /v1/foundation/analyze-product
```
테스트(서버 없이·순수함수): `python3 app/tests/test_foundation_api.py` (17/17).

## 7. v0.1 한계(정직)
- **memory = stub** — 고객 장기기억 read 미연결·candidate 적재만.
- **presentation = template**(결정론) — DeepSeek 표현자 배선은 다음(틀+integrity 준비됨).
- **retrieval live** — API 내부는 fake 기본(실제 WebSearch는 별도 backend·search_key 필요).
- **compare/review = stub.**
- ★**Foundation vs vertical 분리는 *논리적*** — 코드는 한 레포(app/). 진짜 도메인 분리(다른 vertical 추가)는 다음 단계.
