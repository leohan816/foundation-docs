# Ops HOLD L1–L6 Corrective — 독립 경량 재검수

> 상태: **FINAL · INDEPENDENT_REVERIFY · 판정 HOLD_RELEASE** · 작성: 독립 검수자(Claude Fable 5·세션 96e9ce91) · 2026-07-06
> 대상: foundation-docs `130049f` · SIASIU `fe90d99` · Cosmile `6c6aa7f`(무변경). read-only — 코드/DB/volume 수정 0 · prod 접근 0 · 실 secret 출력 0 · main merge 0.
> 방법: 전 항목 **실행 증거** 기반 직접 검증(문서 신뢰 아님). 부수효과: in-memory python probe(파일/DB 무접촉)·pure 테스트 1회·prisma validate 1회·runner 1회(tree 무변화 확인) 뿐.

---

## 판정: **HOLD_RELEASE**

L1~L6 전부 실행 증거로 시정 확인. B1/B2/H1(직전 재검수)과 합쳐 원 HOLD의 blocker/limit 전 항목이 해소됨. Hard Stop 위반 0. **Ops HOLD 해제 — Fable review·Memory V1 closure 진행 가능.** 잔여 항목은 HOLD 조건이 아닌 pre-prod/pre-live gate로 이월(하단).

## 검증 결과 (전 항목 실행 증거)

| # | 항목 | 판정 | 증거(직접 실행) |
|---|---|---|---|
| L1 | prod fail-closed | **PASS** | `crypto._secret()`: APP_ENV=production에서 mint → **RuntimeError raise** 실행 확인 · unknown/unset env → raise 확인(`_is_production()` unknown→prod) · APP_ENV=dev → fallback 정상 · 예외 메시지에 secret 값 미포함(fallback 값 대조 False) · dev/test/local/shadow만 non-prod(crypto.py:26) |
| L2 | furef canonical | **PASS** | `crypto.furef == candidate_adapter.canonical_furef_v2 == p3_auth.canonical_furef_v2` **3자 동일 = True 실행 확인**(한글 uid 포함) · prefix `furef_v2_`·input `siasiu:local_user:`·`[:32]` 3파일 문자 동일 · `subject_ref` crypto==candidate **True** · dev fallback 값도 adapter와 통일(`siasiu_dev_shadow_*_v2`) · repository.local_user_ref_hash=이 furef(repository.py:58) · env secret 변경 시 furef 변경 확인 |
| L3 | tests | **PASS** | W6: 테스트가 **실 `crypto._is_production`** 검증(인라인 제거·test:98-100) · W1: **실 `repository.write_subject_and_fact_atomic`**(repository.py:81) 성공+강제실패(중복 fid)→예외+rollback·orphan 불변(test:108-131) · cross-producer 테스트 신설(test:40-48) · postgres part infra-gate **명시 라벨+보고서 명시** · env try/finally 복원 추가 · skip/xfail/기대값 조작 0 · **pure 8/8 실행 재현** |
| L4 | README | **PASS** | §6.5 실재: "0.0.0.0 바인딩 금지"(:43) · "server.py=127.0.0.1 정본"(:42) · "/api/reset 등 write route 무인증 노출 위험"(:44) · SSH 터널 대안(:45) |
| L5 | prisma validate | **PASS** | 문서화된 export(dev/mock URL·실값 0)로 **`valid 🚀` 재현 성공** · P1012 재발 0 · shell env 우연성 제거 |
| L6 | tmp secret backup | **PASS** | /tmp `env_local_backup` **제거 확인** · `ops-artifacts/.../env_local_backup.SENSITIVE`(499B) 실재 · MANIFEST 등재(**SENSITIVE_REAL_SECRET_POSSIBLE**·raw 출력/커밋 금지 명기) · sha256 `f10d4064646e28b4` 보고서와 일치 · git 커밋 0(130049f는 보고서 2건만) |

## 추가 확인

- **runner 89/89·651·{}clean 재현**(실행)·working tree 무변화·app/data=allowlist 3파일.
- fe90d99는 정확히 주장된 4파일만 수정(crypto·repository·test·README) — guard/runner 무접촉. diff에 secret 리터럴 0.
- **hardcoded real secret 0**(dev/mock fallback 4개는 비-secret·cross-producer 정합용·prod에서 도달 불가로 격리됨).
- **Foundation service DB access 0**(psycopg2 언급은 _core boundary 금지 guard 파일뿐).
- **prod/live/main/M6-G activation 미수행**: main 3본 무변경(580093c/3cd068d/3ba91e0)·hard_reject는 자기 모듈+테스트만 import(미배선)·flag OFF.
- **원본 DB 삭제 0**(memory.db 118784B·dev.db 1097728B 실재)·**docker volume 삭제 0**.

## 관찰 (판정에 영향 없음·기록)

- docker 익명 volume이 4→5→**6**으로 누적(각 batch의 disposable postgres가 `-v` 없이 정리됨). 삭제는 없었으나(준수) 고아 volume 누적 패턴 — Leo 승인 정리 시 일괄 처리 권장.
- crypto의 `_is_production`은 FDN_ENV|APP_ENV|NODE_ENV 순 참조 — 배포 환경에서 이 셋 중 하나가 반드시 설정된다는 전제(unknown→prod fail-closed라 안전 방향).

## 이월 항목 (HOLD 조건 아님 — pre-prod/pre-live gate·Control 잔여 목록과 일치)

1. sqlite migration `20260624181637_commerce_intelligence` 활성 dir 잔존 + baseline public-schema/제약 3종 — **postgres `migrate deploy` 수행 전** 필수 정리(현재 deploy 미수행·Hard Stop이라 즉시 위험 아님).
2. Cosmile 실 DB-integration 테스트 부재(정직 공개됨).
3. docker volume 6개 정리·`env_local_backup.SENSITIVE` 최종 처분·/tmp scratchpad(6458b6f8) 청소 — Leo 승인.
4. M6-G 정의 확정(ingress-gate vs memory-reuse)·memory.db 실데이터 성격 — Leo 미결 질문 유지.
5. secret_version의 파생 결합(진짜 rotation 메커니즘)·SIASIU postgres dev default 승격 — M6-F prod path 설계 시.

## 결론

corrective 2라운드에 걸쳐 원 감사의 blocker 2·high 8·limit 6이 전부 실물 정정 또는 정직한 이월로 처리됐다. 이번 라운드는 "주장-실물 불일치" 재발 0 — 모든 주장이 실행 가능한 증거와 일치했다. **HOLD 해제.** Fable review는 본 보고서와 원 감사·정오표(5ea2957·ad3b2fc·f267a12·130049f 체인)를 컨텍스트로 진행할 것을 권장한다.
