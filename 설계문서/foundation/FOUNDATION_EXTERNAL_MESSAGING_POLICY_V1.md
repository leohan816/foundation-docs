# Foundation External Disclosure / Messaging Policy v1

> **2026-06-28** · 대상(고객/파트너/투자자/내부)에 따라 설명 수준을 분리하는 정책.
> 구현: `app/disclosure_policy.py` · 테스트: `app/tests/test_disclosure_policy.py` (18 assertions, 0 FAIL).
>
> ★원칙: 고객=신뢰·안전(알고리즘 내부 ❌) · 파트너=연동·검증(내부 ❌) · 투자자=차별화/검증철학(점수식·라우팅·가중치·reranker·safety rule ❌) · 내부=전체. **never_disclose는 어떤 외부 메시지에도 등장 금지. API key/secret은 어디에도 평문 금지.**

## 1. 청중 등급 (AUDIENCE_LEVEL)
| 청중 | level | 공개 범위 |
|---|---|---|
| customer | 1 | 신뢰·안전성·태도(단정 안 함·전문가 안내·출처 근거). 알고리즘 내부 ❌ |
| partner | 2 | + 연동/검증 단계·데이터 계약(스키마). 내부 규칙 ❌ |
| investor | 3 | + 차별화된 지식 시스템·검증 철학(layered·traceable·human-in-the-loop·LLM은 final judge 아님). **점수식/가중치/라우팅/reranker/safety rule ❌** |
| internal | 4 | 전체 알고리즘·테스트·실패 사례·정책 |

## 2. 민감도 등급 (SENSITIVITY_LEVEL)
`customer_safe(1) < partner_safe(2) < investor_safe(3) < internal_only(4) < secret(5)`
- 공개 가능 조건: `content_sensitivity ≤ audience_level` **AND** `sensitivity ≠ secret`.
- **secret(API key 등)은 internal에게도 평문 노출 금지.**

## 3. never_disclose 카테고리 (9)
| 카테고리 | 민감도 | 예시 탐지 패턴 |
|---|---|---|
| scoring_formula | internal_only | `0.30 *`, `final_confidence_score`, 가중합, 점수 공식 |
| source_weight | internal_only | source weight, 가중치, `SOURCE_QUALITY` |
| reranker_routing_rule | internal_only | reranker, RRF, k=60, bge-reranker, routing rule |
| safety_gate_rule_detail | internal_only | safety_words, FORBIDDEN, `_SAFE_ASSERT`, co-occurrence, verify_output |
| learned_promotion_internals | internal_only | promotion_ready, reviewed_by, `_GOV_FIELDS`, candidate governance |
| benchmark_raw_failures | internal_only | Hit@1, nDCG, MRR, FAIL case, 실패 케이스 |
| **api_key_secret** | **secret** | `sk-`, deepseek_key, `.secrets`, api key, BEGIN PRIVATE |
| model_orchestration_rules | internal_only | `_llm router`, model routing, DeepSeek→Opus, 오케스트레이션 |
| anti_abuse_bypass | internal_only | bypass, jailbreak, 안전 우회, abuse vector |

→ internal_only 9개 중 8개는 **외부(customer/partner/investor) 노출 금지·internal 허용**, `api_key_secret`은 **어디에도 평문 금지**.

## 4. 승인 메시지 (message_for)
- **customer_safe_message**: 안전 최우선·민감 주제 단정 안 함·전문가 안내·출처 근거·모르면 솔직히.
- **partner_safe_message**: 공식 자료 우선·검증 단계·규제 표현 보수적·스키마 기반 연동.
- **investor_summary**: 검증 가능한(traceable) 지식 시스템·다층 근거 종합·출처 추적·**AI는 최종 판단자가 아님**·불확실은 확신 낮춰 표시·주기 재검증. *(구체적 점수 산식·가중치·라우팅은 비공개 명시.)*
- **internal_only**: 전체 구현/정책/테스트/실패 사례는 코드·내부 문서에서 관리.
- 외부 청중 메시지는 반환 전 `redact`로 자기검증(never_disclose 자동 마스킹).

## 5. API (disclosure_policy.py)
| 함수 | 역할 |
|---|---|
| `classify_sensitivity(text)` | 텍스트의 never_disclose 카테고리 + 최고 민감도 |
| `can_disclose(text, audience)` | 이 청중에 공개 가능 여부(secret은 전원 ❌) |
| `redact(text, audience)` | 등급 초과 내부 용어를 `[비공개]`로 마스킹 |
| `message_for(audience)` | 대상별 승인 안전 메시지 |
| `external_guard(text)` | 외부 노출 전 최종 게이트(internal_only/secret 적발) |

## 6. 검증 결과 (18/18)
고객 메시지 내부 미노출 · 투자자는 traceable 언급하되 scoring formula 불가 · internal_only는 고객/파트너/투자자 차단·internal 허용 · never_disclose 8종 전 외부청중 차단 · secret 전원(internal 포함) 차단 · redact 마스킹 · 고객 메시지는 전 청중 공개 가능.

## 7. 남은 위험 / 다음
- 패턴 기반 탐지는 새로운 내부 용어가 생기면 패턴 추가 필요(누락 시 fail-open 위험) → 정기 패턴 리뷰.
- 자유 서술 답변(LLM 생성)은 외부 노출 전 `external_guard`를 **반드시** 통과시키도록 답변 파이프라인에 배선 필요(다음 단계).
- 다국어(영문/중문) 패턴 확장.
