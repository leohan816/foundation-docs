# SIASIU 지식통합 — Web검색 · Learning Candidate 설계서

> **v0.1 · 2026-06-28** · 내부 Vault 검색 + Web 보조 + 안전출력(answer.py safety_gate) + learning candidate 생성/검수/승격을 *하나의 지식 시스템*으로. 구현: `app/retrieval_schema.py`·`app/web_adapter.py`·`app/learning_candidate.py`. 테스트 `app/tests/test_learning_candidate.py`(24 GREEN).
>
> ★핵심 불변(코드 강제): web 결과 자동 사실 승격 ❌ · 새 지식은 candidate로만 · canonical write는 Leo 승인 후 · health/의료 단정 ❌ · candidate는 기본 검색 index에 미포함 · raw_file/고객데이터 미사용.

## 1. 통일 RetrievalHit (vault/web/candidate 공통)
필드: `source_type`(vault|web|candidate) · `source_id` · `title` · `snippet` · `url` · `domain` · `retrieved_at` · `freshness` · `evidence_level` · `trust_tier` · `claim_type` · `language` · `score` · `citations` · `conflict_flags`. → 내부·web을 *같은 파이프라인*으로 융합(`make_hit`).

## 2. Source Trust Tier (결정론 도메인→tier)
| Tier | 대상 | safety/health 단정 | 의료 claim |
|---|---|---|---|
| **1** | 규제기관(MFDS·FDA·EMA)·논문/학술(PubMed·PMC)·전문기관·CIR/SCCS | 가능 | 가능(다중) |
| **2** | 브랜드/제조사 공식·제품 상세·공식 FAQ | ❌(단독) | ❌ |
| **3** | 커머스몰·블로그·SNS·광고 | ❌ | ❌ |
- 미상 도메인 = 보수적 **Tier3**. (`classify_trust`)

## 3. claim 지원 정책 (`policy_check`·`supports_claim`)
- **Tier3만으론 safety/health/pregnancy/lactation/medical 단정 금지.** 브랜드(Tier2)만으론 의료 claim 금지.
- web 결과는 **반드시 출처(url)** — 없으면 무효.
- safety/health claim = **Tier1 1개 또는 유효 다중근거** 요구.
- 내부 Vault ↔ web 상반 신호(회피 vs 안전) → **conflict flag**(`detect_conflicts`).

## 4. Web adapter (`web_adapter.WebSearchAdapter`)
- 기본 **dry-run(mock)**. 실제 web은 `search_fn` 주입 시에만(기본 OFF·승인 후). 결과는 RetrievalHit(web)·candidate일 뿐 canonical 아님.

## 5. Learning Candidate (검색 실패/web → candidate만)
3종 draft: **ingredient**(atom·name·inci·aliases·category·functions·safety_notes·pregnancy_lactation_notes·evidence_level·source_claims·source_urls) · **product**(brand·product_name·type·claims·ingredients_raw/normalized·matched_atoms·unmatched·source_urls) · **health**(topic·claim·claim_type·evidence_level·source_claims·source_urls·contraindications·uncertainty·`medical_review_needed=True`).
- 전부 `status=candidate`·`promotion_ready=False` **코드 강제**(자동 true 불가).
- 검증(`validate`): schema 필수필드 · **중복 atom** · **alias 충돌**(다른 atom으로 매핑) · 불변식.
- 저장(`write_review_queue`): **canonical 경로 write 거부 가드** + review queue(=NON-canonical)에만.
- ★권장 review 위치: `~/data/vaults/SIASIU_COSMILE_VAULT/_review/learning_candidates/` (또는 `intake/learning_candidates/`). **canonical folder 금지.** candidate index는 기본 검색 index에 섞지 않음(별도 mode).

## 6. Promotion dry-run (`promotion_dryrun` · write ❌)
- candidate → canonical md(frontmatter+body) **변환만**. `promotion_ready=True`(Leo 승인) 아니면 승격 불가 · 약한 근거(anecdote/commerce) lint 차단 · health는 medical_review 통과 전 불가 · slug/required-field/alias lint.
- **실제 canonical write는 Leo 승인 후 별도 단계.**

## 7. 안전출력 연결
- 모든 답변은 `answer.py safety_gate` 통과(임신/수유/의료/안전 단정 차단·cautious 낮춤). web 기반 답변도 동일 게이트 + 출처 표시 의무.

## 8. 미구현/승인 대기
- Phase 2 health 내부 색인(현재 forbidden·승인 필요) · Phase 4 internal+web hybrid 100 테스트(web 실검색 결정 후) · Phase 8 live 대화 · Phase 9 카테고리 100 확장(graded·holdout). 상세: `report/SIASIU_지식통합_2026-06-28.md`.
