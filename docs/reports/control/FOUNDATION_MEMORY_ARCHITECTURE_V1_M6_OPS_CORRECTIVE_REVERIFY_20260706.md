# Ops HOLD Corrective Batch — 독립 재검수 (B1/B2/H1/H2)

> 상태: **FINAL · INDEPENDENT_REVERIFY · 판정 HOLD_WITH_LIMITS** · 작성: 독립 검수자(Claude Fable 5·세션 96e9ce91) · 2026-07-06
> 대상: foundation-docs `f267a12`(corrective batch + errata) · SIASIU `938c44c` · Cosmile `6c6aa7f`. read-only(코드/DB/프로세스 수정 0).
> 방법: 인라인 직접 검증 + 독립 검증 에이전트 3 + 반박 검증(high 1건 UPHELD). 검수 부수효과: runner 1회 재실행(89/89·tree 무변화)·prisma validate 1회 실행(read-only)뿐.

---

## 판정: **HOLD_WITH_LIMITS**

B1·B2·H1은 실물로 시정 확인. H2는 3개 요구 중 2개(하드코딩 제거·keyed HMAC) 시정, **prod fail-closed는 여전히 부재이며 corrective/errata 어디에도 미공개**. corrective batch 안에서도 주장-실물 불일치 소형 3건이 재발(README 예방 문구·validate 재현·신규 /tmp secret backup). Hard Stop 위반 0·데이터 손실 0 — BLOCKER 아님. dev/shadow 작업 계속 가능하되 아래 Limits 정정 후 Fable review 진행 권고.

## 11개 검수 항목 결과

| # | 항목 | 판정 | 증거 |
|---|---|---|---|
| 1 | B1 stale server 종료 | **PASS** | pid 475200 부재(ps) |
| 2 | 0.0.0.0:8000 리스너 소멸 | **PASS** | ss -ltnp에 :8000 없음 |
| 3 | app/data/memory.db 미재생성 | **PASS** | app/data = allowlist 3파일뿐 |
| 4 | runner 89/89·guard 무완화 | **PASS** | 재실행 89/89·651·{}clean·working tree 무변화·938c44c는 runner/guard 무접촉 |
| 5 | B2 provider가 6c6aa7f에 포함 | **PASS** | schema.prisma(postgresql)+lock+baseline(40 CREATE TABLE)+.env.example(key-only) 4파일·diff에 secret 0·working tree 클린 |
| 6 | P1012 재발 없음 | **PARTIAL** | schema↔.env.local 프로토콜 정합(postgresql:). 그러나 `prisma validate` **지금 실패**(Validation Error 1·getConfig) — CLI는 .env.local을 읽지 않고 app/.env 부재. "valid 🚀"는 shell env 의존·재현 불가 |
| 7 | H1 /tmp → durable archive | **PASS** | `/home/leo/ops-artifacts/memory_v1/20260706/` 8항목·**sha256 전수 일치**(40d8083bc7c9… 포함)·/tmp 원본 보존(copy) |
| 8 | MANIFEST·민감내용 Git 미유입 | **PASS(+lows)** | MANIFEST 실재·git repo 밖·foundation-docs엔 summary만·신규 커밋 3건 secret/PII 스캔 clean. lows: PII 파일 mode 644·logins.txt(PII)가 non-PII 버킷·**corrective batch가 /tmp에 `env_local_backup`(실값 FISH_AUDIO_KEY 포함) 신규 생성·MANIFEST 미등재** |
| 9 | H2 하드코딩/unkeyed 제거 | **PARTIAL** | `_DEV_SUBJECT_SECRET` 리터럴 제거·subject_ref/furef keyed HMAC 확인·raw ref 대상 unkeyed sha256 잔존 0. **그러나 prod fail-closed 부재**(아래 L1) |
| 10 | env HMAC·secret_version·key-only | **PARTIAL** | env 참조·key-only 확인(Vault 주입이 이제 유효). secret_version은 라벨뿐(파생에 미결합·furef 무버전)·furef "통일"은 사실과 다름(아래 L2) |
| 11 | prod/live/main/secret/M6-G 미수행 | **PASS** | main 3본 무변경(580093c/3cd068d/3ba91e0)·hard_reject import=테스트뿐·flag OFF·5432/55432 닫힘·prod/Vault 흔적 0 |

## Limits (HOLD 해제 전 정정 필요)

- **L1 (high·refuter UPHELD·미공개)**: `crypto.py _secret()`이 env 미설정 시 **커밋된 dev/mock secret으로 무음 fallback — 어떤 환경에서든**(prod 가드·raise 없음·주석뿐). 같은 repo에 올바른 패턴 3개가 이미 존재(candidate_adapter L26-27·p3_auth_shadow L25-26·provider_flag L36-38: prod raise·unknown env→production). prod에서 secret 누락 시 예측 가능한 subject_ref가 발행되고, 이후 실 secret 주입 시 identity가 무음 fork. corrective 보고서 §5는 "dev/mock fallback"이라고만 쓰고 가드 부재를 미공개. **M6-F prod path 전 필수 수정.**
- **L2 (medium)**: "furef 통일" 부정확 — `crypto.furef`(`furef_`+HMAC('siasiu:furef:')[:24]) ≠ canonical `furef_v2`(`furef_v2_`+HMAC('siasiu:local_user:')[:32]). 같은 env key를 쓰면서 파생식·prefix·절단·dev fallback이 달라 **제3의 furef가 생겼고**, p3_auth_shadow가 요구하는 cross-producer 동일 furef가 깨짐. dev fallback도 producer마다 달라 env 미설정 시 같은 user가 다른 subject_ref를 받음. 통일 or 명시적 별개 선언(+env key 분리) 필요.
- **L3 (medium)**: W6 "실제 코드 경로 검증" 주장과 달리 W6 테스트는 **테스트 내 인라인 `is_production()`**을 검증(실 코드에 해당 함수 자체가 없음 — L1을 가림). W1 atomic도 실제 원자성 미검증·postgres part는 infra-gated(코드 내 라벨은 정직·보고서 6/6 줄은 게이트 조건 누락).
- **L4 (medium)**: B1 예방 조치 주장 미이행 — "README_POSTGRES_DEV에 0.0.0.0 override 금지 명시"가 실제 README에 **없음**(grep 0건). server.py 127.0.0.1 bind는 확인.
- **L5 (medium)**: "prisma validate valid(P1012 0)" 재현 불가(#6). `.env`(CLI가 읽는 파일) 부재 — 검증을 환경 독립적으로 재현 가능하게(문서화된 export 또는 gitignored .env) 정리.
- **L6 (low)**: corrective batch 자신이 `/tmp/...scratchpad/env_local_backup`(실 API key 포함)을 신규 생성 — H1이 고친 "휘발성 /tmp 증거" 패턴 재발·MANIFEST 미등재. 삭제 또는 durable+manifest 처리.
- **L7 (기존 잔여·정오표로 인정됨·유지)**: sqlite migration `20260624181637_commerce_intelligence` 활성 dir 잔존(fresh postgres deploy 파손)·baseline public-schema/제약 3종 공백·Cosmile DB-touch 테스트 부재·docker volume 5개(4 기존+corrective가 1개 추가 고아화) Leo 결정 대기·M6-G 정의 확정 대기·archive 권한 강화(600/700)·볼륨/보고서 카운트 표기 정정(4↔5)·:3000 Cosmile wildcard 청취(보고서는 :3001로 오귀속).

## 긍정 확인(명시)

- Errata 7건은 원 감사 지적과 정확 대응·정직. B2는 rollback이 아닌 정식 커밋으로 시정(정오 표기 포함). H1 archive는 sha256 전수 일치·원본 보존·git-free로 모범적. 신규 커밋 diff에 secret/PII 0. `test_m6f_identity_substrate.py` 6개 중 4개는 실 코드 경로를 검증(env→ref 변화·keyed vs unkeyed 구분 포함). ssbrain WAL archive 사본이 0 bytes로 확인되어 원 감사의 "데이터 손실 0 증명 불가"가 "물증 지지"로 상향.

## 다음 조치

- **Control 가능(dev/shadow)**: L1(기존 패턴 3개 중 하나 재사용한 prod fail-closed)·L2(furef 정합)·L3(테스트 정직화)·L4(README 문구)·L5(validate 재현화)·L6(/tmp backup 처리) — 전부 소형·승인 불요 범위로 판단(단 L1·L2는 identity 계약이므로 설계 노트 1장 선행 권장).
- **Leo 결정 유지**: docker volume 5개 처리·M6-G 정의·memory.db 실데이터 성격·/tmp scratchpad(6458b6f8) 청소 시점(archive 완료로 이제 청소 가능하나 env_local_backup 처리 후).
- L1~L6 정정 + 재검수 1회(경량) 후 **HOLD 해제·Fable review 진행** 권고.
