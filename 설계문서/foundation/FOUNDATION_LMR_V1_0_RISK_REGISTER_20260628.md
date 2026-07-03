# Foundation LMR — v1.0 Risk Register (2026-06-28)

| ID | 위험 | 등급 | 현재 완화 | 잔여 | 대응 |
|---|---|---|---|---|---|
| R1 | conflict 감지 키워드 polarity 한계(의미 모순 일부 누락) | medium | 키워드 보강·safety 충돌은 manual review·tier 높아도 자동 승격 0 | 의미론 미세 누락 | SF1 임베딩/규칙 하이브리드 |
| R2 | 성능 synthetic 기준(실 운영 분포 미측정) | medium | 1k+ batch·percentile·memory 실측 | 실 데이터 분포 미반영 | SF2/SF4 실데이터 재측정 |
| R3 | 실 Vault 메타 부재 파일 tier unknown 다수 | medium | unknown=cautious only·고위험 차단·read-only | 실 정본 커버리지 낮음 | MF2 메타 정합 어댑터 |
| R4 | retrieval/runtime 어댑터 SIASIU 결합 | high | 순수 로직 boundary clean·shadow only | 실 retrieval 인터페이스 부재 | MF1 어댑터 정의 |
| R5 | Foundation namespace simulate만(실 패키지 미생성) | medium | import adapter·boundary·circular 검증 | 실 빌드 미검증 | MF3 실 namespace 빌드 |
| R6 | M6/API는 shadow/contract만(실 runtime/서버 미연동) | low(의도) | user_text/write/promotion 0·live 0 | 실 효과 미측정 | 이전 후 단계적 연동(별도 승인) |
| R7 | learned/canonical 실승격 미구현(dry-run only) | low(의도) | would_promote만·status 무변경·Vault write 0 | 실 승격 정책 미정 | NH2 사람 결정 |
| R8 | 레거시 brain.py memory.db(LMR scope 밖) | low | LMR/Foundation은 memory.db REFUSED·현재 부재 | 레거시 분리 유지 필요 | 경계 유지·문서화 |

## 중대 안전 위험(critical) → **현재 0건**
candidate reused·unreviewed approved·high-risk false_allow·privacy/customer leak·raw/teacher raw stored·user_text 변경·write·Vault write·canonical write·실승격·memory.db·ssbrain 수정·live call = **전부 0(전 버전·8차원 감사 확인)**.
