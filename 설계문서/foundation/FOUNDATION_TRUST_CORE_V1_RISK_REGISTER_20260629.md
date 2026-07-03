# Foundation Trust Core v1.0 — Risk Register (2026-06-29)

| ID | 위험 | 등급 | 완화 |
|---|---|---|---|
| TC1 | 의료/internal 가드 키워드 한계 | medium | 다층 게이트·고위험 cautious 캡·trust runtime 종합 |
| TC2 | CDM/draft는 정책만(실 데이터/LLM 미연동) | low(의도) | shadow·격리/consent/고위험 가드·evidence upgrade 0 |
| TC3 | trace redaction은 키+패턴 기반(신규 PII 형식 누락 가능) | low | 키 제거+secret/PII 정규식+값 누출 시 차단 |

## critical 0
medical/procedure overreach·customer leak·cross-customer·deleted reuse·internal disclosure·raw persisted·trace leak·write·live = 전부 0.
