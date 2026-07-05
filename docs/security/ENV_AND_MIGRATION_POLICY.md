# ENV AND MIGRATION POLICY

> env/secret 주입·서버 마이그레이션·rotation 정책 상세. CLAUDE.md는 짧은 pointer만.
> 관련: [SECURITY_AND_SECRET_GUARDRAILS.md](SECURITY_AND_SECRET_GUARDRAILS.md) · [CONTROL_SECURITY_REVIEW_POLICY.md](CONTROL_SECURITY_REVIEW_POLICY.md)

---

## 1. Production identity secret = 서비스 자산 (서버 설정값 아님)
- production identity/subject secret은 **서버(호스트) 설정값이 아니라 서비스의 자산**이다. 서버가 바뀌어도 서비스 secret은 동일 자산으로 유지된다.
- 따라서 secret은 서버 config가 아니라 **서비스 secret manager/Vault**에 속한다.

## 2. Server migration 시 기존 production secret 재사용
- 서버를 옮길 때(host migration)는 **기존 production secret을 그대로 재사용**한다 (새 값 생성 아님).
- 서버 이전 ≠ secret 교체. 동일 secret을 새 환경에 **주입**한다 (subject_ref/식별자 안정성 유지·orphan 방지).

## 3. Secret 교체 = rotation/migration (server migration 아님)
- secret 값을 실제로 바꾸는 것은 **rotation/migration**이며 별도 절차다.
- Option B에서 subject secret rotation = **service-local rotation**(SubjectRefMap `secret_version`·version당 map row·read-side union·retirement re-key). Foundation rotation 없음.
- rotation은 orphan/re-key 영향이 있으므로 **별도 gate·backup·검증** 후 진행.

## 4. .env.example = key 이름 + 설명만
- `.env.example`에는 **key 이름과 설명만** 기록한다. **실 값 0.**
- 예:
  ```
  # SIASIU service-local subject_ref mint secret (서비스 자산·Vault 주입·실 값 미기재)
  SIASIU_SUBJECT_SECRET=
  # SIASIU furef 내부 ref secret
  SIASIU_FUREF_SECRET=
  # SIASIU content-hash secret
  SIASIU_MEMORY_CANDIDATE_SECRET=
  # SIASIU login de-id secret
  SIASIU_P3_AUTH_SECRET=
  # Cosmile de-anon secret
  COSMILE_MEMORY_SECRET=
  ```
- ★값은 절대 채우지 않는다.

## 5. Production env 주입 방식
- production env는 **Vault / secret manager / Docker secret / systemd / PM2 / env file**(배포 환경) 중 하나로 주입한다.
- 주입은 **ops/deploy 환경**에서 수행 (control workspace는 실 vault write 안 함).
- 하드코딩/커밋 금지·주입 후 secret 값 로그/출력 0.

## 6. Option B 기준 secret 소유
- ★**Foundation에는 subject_ref 생성용 secret 없음** (`FOUNDATION_SUBJECT_REF_SECRET` 폐기).
- ★**SIASIU/Cosmile에 service-local subject secret 존재** (`SIASIU_SUBJECT_SECRET`·`COSMILE_SUBJECT_SECRET`(필요 시)).
- per-service secret은 **값이 서로 다름**(cross-service correlation 방지)·서비스간 미공유.

## 7. Verification runner = boolean/count only
- 주입/분리/fail-closed 검증 runner는 **boolean/count**만 출력한다 (secret 값·raw hash 0).
- 허용: `*_from_env`·`all_secrets_distinct`·`distinct_count`·`*_unset_prod_failclosed`·`identity_touch_flag_off` 등 boolean/count.
- 금지: secret 값·secret hash 원문·full env dump.

## 8. dev/staging secret vs production secret 분리
- dev/staging secret과 production secret은 **분리**한다 (dev 값이 prod에 도달 0).
- W6 fail-safe: unknown/unset env → production 취급 → dev fallback 미도달(fail-closed).
- dev fallback placeholder는 **비-prod 전용**(명시 dev/test/local/shadow env에서만)·실 prod secret 아님.
