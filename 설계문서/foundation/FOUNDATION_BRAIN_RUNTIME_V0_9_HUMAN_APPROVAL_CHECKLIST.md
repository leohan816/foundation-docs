# Foundation Brain Runtime — v0.9 Human Approval Checklist (2026-06-29)

> 실 적용(controlled_apply 실 트래픽)·실 canary 노출·v1.0 확정 전 사람이 확인.

## 기술 사전조건
- [ ] 통합 eval 707/707·LMR 514 보존·Brain v0.1~v0.8 regression 보존
- [ ] 안전 불변식 전부 0(high-risk false_allow·customer leak·unsupported·caveat 제거·overreach·internal·user_text·write·live)
- [ ] answer.py 소스 무변경·shadow trace raw/query 0
- [ ] doc consistency·secret scan·artifact integrity PASS
- [ ] 8차원 독립 감사 위반 0

## 사람 결정 (v1.0/실 적용 전)
- [ ] 실 LLM draft 연동 후 shadow 재검증 승인
- [ ] 실 retrieval 분포 캘리브레이션 승인
- [ ] controlled_apply 실 트래픽 적용 범위/allowlist 승인
- [ ] 실 canary 노출(소수 트래픽) 승인
- [ ] Customer Decision Memory 실 데이터 연동 승인

## 여전히 금지 (승인 전)
production live·API live·canonical write·learned/canonical real promotion·customer memory migration·실 user_text 변경·실 canary 노출·live LLM/web call.
