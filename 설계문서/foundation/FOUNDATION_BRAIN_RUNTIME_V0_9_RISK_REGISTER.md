# Foundation Brain Runtime — v0.9 Risk Register (2026-06-29)

| ID | 위험 | 등급 | 완화 | 잔여 |
|---|---|---|---|---|
| BR1 | 고위험 분류가 키워드 기반(미묘한 의료/시술 표현 누락 가능) | medium | 쿼리 키워드+atc·trust 게이트 다층·고위험→cautious 캡 | 표현 변형 누락 |
| BR2 | LLM draft 미연동(shadow는 hits/계약만) — 실 답변 텍스트 평가 미수행 | medium(의도) | shadow trace는 결정/계약만·user_text 0 | 실 텍스트 품질 미검증 |
| BR3 | retrieval hits가 synthetic(실 분포 미반영) | medium | tier/provenance 보수적·근거없음→cannot_determine | 실 분포 캘리브 필요 |
| BR4 | controlled_apply 실 적용 미검증(offline canary만) | low(의도) | flag OFF·실 노출 0·blocklist | 실 canary 승인 필요 |
| BR5 | Customer Decision Memory는 정책만(실 고객 데이터 미연동) | low(의도) | cross-scope/삭제/consent/고위험 가드 | 실 데이터 연동 시 재검증 |

## critical 위험 → **0건**
high-risk false_allow·privacy/customer leak·unsupported recommendation·safety caveat removal·medical overreach·internal disclosure·user_text(shadow/canary)·write·Vault/canonical/learned·memory.db·live = **전부 0**.
