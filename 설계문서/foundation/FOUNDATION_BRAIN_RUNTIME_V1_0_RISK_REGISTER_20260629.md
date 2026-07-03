# Foundation Brain Runtime v1.0 — Risk Register (2026-06-29)

| ID | 위험 | 등급 | 완화 | 잔여 |
|---|---|---|---|---|
| BR1 | 고위험/draft 키워드 분류 한계 | medium | 쿼리 키워드+ALWAYS_FORBIDDEN+trust 다층·고위험 cautious 캡 | 표현 변형 누락 |
| BR2 | LLM draft는 test-only synthetic(실 LLM 미연동) | medium(의도) | shadow·raw 미저장·hash만·evidence upgrade 0 | 실 LLM 운영 연동 시 재검증 |
| BR3 | retrieval 실 분포 unknown tier 0.96(메타 부재) | medium | unknown→uncertain·fail-closed·grounded 0 | 실 Vault 메타 보강 필요 |
| BR4 | controlled_apply/canary 실 노출 미검증(offline만) | low(의도) | flag OFF·노출 0·blocklist | 실 canary 승인 필요 |
| BR5 | CDM 실 고객 데이터 미연동(정책만) | low(의도) | 격리/삭제/consent/고위험 가드 | 실 데이터 연동 재검증 |

## critical 위험 → **0건**
high-risk false_allow·privacy/customer leak·unsupported claim/recommendation·safety caveat removal·medical overreach·internal disclosure·raw draft persisted·user_text·write·Vault/canonical/learned·memory.db·live = **전부 0**.
