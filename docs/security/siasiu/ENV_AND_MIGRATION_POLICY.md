# SIASIU — Env & Migration Policy

> 성격: 환경변수·secret 주입·서버이전/rotation 정책(정본). CLAUDE.md는 짧게 pointer로만 참조.
> ★실 secret 값은 이 문서에 쓰지 않는다(key 이름·설명만). 관련: `docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`.
> 정합: Control M6-F Option B(SIASIU service-local identity/memory)와 충돌 없음.

## 1. Production identity secret = SIASIU 서비스 자산 (서버 설정값 아님)
- `SIASIU_SUBJECT_SECRET` 등 identity/memory secret은 **특정 서버 인스턴스의 config가 아니라 SIASIU 서비스가 소유하는 자산**이다.
- 이유: subject_ref/furef는 이 secret으로 keyed(HMAC). secret이 바뀌면 **기존 subject_ref가 전부 무효화**(고객 memory 매핑 단절) → secret은 서비스 정체성의 일부.

## 2. Production 서버 이전 시 기존 secret 재사용
- 서버 하드웨어/호스트/리전 이전(server migration) 시 **기존 SIASIU production secret을 그대로 재사용**한다(새로 생성 ❌).
- 새 secret 생성 = subject_ref 전량 재계산 필요 = 사실상 memory 마이그레이션. 서버만 옮길 때는 **secret 이관**이 원칙.

## 3. Secret 교체 = server migration이 아니라 rotation/migration
- secret을 *바꿔야* 할 때(유출 의심 등)는 "서버 설정 변경"이 아니라 **secret rotation + memory migration 절차**로 다룬다:
  - `SIASIU_SUBJECT_SECRET_VERSION`으로 버전 관리(구/신 secret 병존 기간).
  - 신 version으로 subject_ref 재-mint + SubjectRefMap 재키잉(dual-read → switch).
  - ★rotation은 **Hard Stop**(Leo 승인 + release train·prod DB 쓰기 수반).

## 4. .env.example = key 이름 + 설명만
- `.env.example`에는 **key 이름과 한 줄 설명만** 기록한다. **실값·예시값(진짜처럼 보이는 것 포함) 금지.**
- 형식 예(값 없음):
  ```
  # SIASIU subject_ref HMAC secret (identity 자산·서버간 재사용·rotation은 Hard Stop)
  SIASIU_SUBJECT_SECRET=
  # 위 secret의 버전(rotation dual-read용)
  SIASIU_SUBJECT_SECRET_VERSION=
  # memory candidate hash secret
  SIASIU_MEMORY_CANDIDATE_SECRET=
  # P3 auth log(email) keyed-hash secret
  SIASIU_P3_AUTH_SECRET=
  # furef 내부 ref secret (SubjectRefMap.local_user_ref_hash·Option B adapter·subject secret과 분리)
  SIASIU_FUREF_SECRET=
  ```

## 5. Production env 주입 경로
- production secret은 **코드/repo가 아니라 런타임 주입**: Vault/secret manager · Docker secret · systemd `EnvironmentFile` · PM2 ecosystem env · `.env` file(서버 로컬·gitignore).
- 어떤 경로든 **repo·git·로그·문서에 실값이 남지 않는다.**

## 6. Option B 기준 SIASIU env key 초안 (이름만·값 0)
| key | 용도 | 성격 |
|---|---|---|
| `SIASIU_SUBJECT_SECRET` | subject_ref HMAC keying(가명 PII·service-local) | 서비스 자산·서버간 재사용·rotation Hard Stop |
| `SIASIU_SUBJECT_SECRET_VERSION` | rotation dual-read 버전 | 구/신 병존 |
| `SIASIU_MEMORY_CANDIDATE_SECRET` | memory candidate/content_hash keyed hash | per-service salt 대체 |
| `SIASIU_P3_AUTH_SECRET` | logins.txt raw email → keyed-hash(P3 fix) | PII-in-log 제거용 |
| `SIASIU_FUREF_SECRET` | furef 내부 ref(SubjectRefMap.local_user_ref_hash·Option B adapter) | service-local·subject/content-hash secret과 분리 |
| (기존) `FOUNDATION_USER_REF_SECRET` | CUTOVER-01 furef_v2_ HMAC | prod 부재 시 fail-closed(이미 배선) |
→ 위 key는 **초안**(설계). 실 배선/값 주입은 별도 승인·구현.
> ★watch(reconciliation): Option B adapter 코드는 furef를 `SIASIU_FUREF_SECRET`으로 파생하고, 기존 문서는 furef를 `FOUNDATION_USER_REF_SECRET`(CUTOVER-01)로 표기 — **두 furef secret 이름 정합은 별도 확정**(코드↔env 정본화·별도 승인). 현재 adapter 정본 = `SIASIU_FUREF_SECRET`.

## 7. Verification runner = boolean/count only
- env/secret 검증 스크립트는 **존재 여부·형식 boolean·count만** 출력한다: `SIASIU_SUBJECT_SECRET present? true` · `len>=32? true` · `furef_v2_ prefix? true`.
- ★실 secret 값·raw hash·PII·env dump **출력 금지**. 미설정 시 fail-closed(값 노출 없이 "missing").

## 검증 원칙
- 실 secret 값 0 · raw/PII 0 · 코드 로직 변경 0 · prod DB 접근 0 · live/main merge 0.
