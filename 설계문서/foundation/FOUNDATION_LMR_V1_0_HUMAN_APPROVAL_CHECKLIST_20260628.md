# Foundation LMR — v1.0 Human Approval Checklist (2026-06-28)

> 실제 Foundation 이전 전 **사람이 직접 확인·승인**해야 할 항목. 자동 통과 불가. 모든 항목 ✅ 전까지 이전 금지.

## 사전 조건(기술)
- [ ] eval 415/415 PASS·assertions 529/0·full-loop 100/100 재확인
- [ ] 8차원 독립 감사(v0.6~v0.9) 위반 0 재확인
- [ ] false_allow 0·high-risk false_allow 0·privacy/customer leak 0
- [ ] raw/teacher raw 저장 0·Vault write 0·canonical write 0·learned/canonical 실승격 0
- [ ] memory.db 0(LMR scope)·ssbrain.sqlite 무변경·live call 0
- [ ] 기존 v0.1~v0.9 테스트/하니스/eval 보존(삭제 0)

## must_fix 해소 확인
- [ ] MF1 retrieval/runtime 어댑터 인터페이스 완성·검증
- [ ] MF2 실 Vault 스키마 정합 어댑터 완성
- [ ] MF3 Foundation 실 namespace 빌드 후 import 검증

## 사람 결정
- [ ] NH1 이전 시점·범위 승인(누가·언제·무엇)
- [ ] NH2 learned/canonical 실승격 정책 개방 여부 결정(개방 시 승인 절차 포함)

## 거버넌스/인프라
- [ ] BX1 Foundation 패키지/배포 인프라 준비
- [ ] BX2 실 Vault canonical write 권한/거버넌스 합의

## 롤백 준비
- [ ] rollback checklist 검토(`FOUNDATION_LMR_ROLLBACK_CHECKLIST_V0_9.md`)
- [ ] SIASIU가 source of truth로 유지됨 확인(이전은 additive)

## 최종 승인
- [ ] 위 전 항목 ✅ + 책임자(heropapa.han@gmail.com) 명시적 승인 → v1.0 확정 별도 작업 착수
- [ ] **승인 전까지: 실 이전·API live·write·실승격 전부 금지 유지**
