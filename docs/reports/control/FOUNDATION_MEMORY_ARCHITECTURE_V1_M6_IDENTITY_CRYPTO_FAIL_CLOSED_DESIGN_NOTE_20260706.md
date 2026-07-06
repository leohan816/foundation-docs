# Memory V1 — Identity Crypto Fail-Closed Design Note (L1·L2)

> 작성: foundation-control(Control) · 2026-07-06 · **범위: SIASIU/Cosmile service-local identity crypto(subject_ref·furef) 계약 노트. 코드=`service_memory/crypto.py`.**
> ★실 secret 값 미기재(key 이름만). prod fail-closed·dev fallback 조건·canonical furef 파생식·secret_version·rotation 주의.

---

## 1. prod fail-closed 정책 (L1)
- `crypto._secret(env_name)`: env 값 우선. **미설정 시 — prod/unknown env → `RuntimeError`(fail-closed)·dev/test/local/shadow → dev/mock fallback**.
- `_is_production()`: `FDN_ENV|APP_ENV|NODE_ENV` ∉ {dev,development,test,local,shadow} → **production**(unknown/unset 포함). (p3_auth_shadow·candidate_adapter의 W6 패턴 상속.)
- ★prod에서 required secret 부재 = **즉시 실패**(무음 dev fallback 금지). secret 값은 예외 메시지에도 **미출력**.

## 2. dev fallback 허용 조건
- **오직** `FDN_ENV|APP_ENV|NODE_ENV` ∈ {dev,development,test,local,shadow}일 때만.
- dev/mock fallback 값은 실 secret이 아니며, **cross-producer 정합**을 위해 기존 adapter dev 값과 동일:
  - `SIASIU_SUBJECT_SECRET` → `siasiu_dev_shadow_subject_secret_v2`
  - `SIASIU_FUREF_SECRET` → `siasiu_dev_shadow_furef_secret_v2`
  - `COSMILE_SUBJECT_SECRET`/`COSMILE_FUREF_SECRET` → cosmile_dev_shadow_*(동일 패턴)
- `.env.example` = **key-only**(값 0). 실 secret은 배포 env/Vault(Hard Stop).

## 3. canonical furef 파생식 (L2 — 통일)
- **furef = canonical furef_v2** (candidate_adapter·p3_auth `canonical_furef_v2`와 **동일**):
  ```
  furef_v2_ + HMAC(<SVC>_FUREF_SECRET, "<svc>:local_user:" + local_user_ref)[:32]
  ```
- ★이전 crypto.furef(`furef_` + HMAC("siasiu:furef:"+ref)[:24])는 **불일치**였음 → **정정**(prefix furef_v2_·input siasiu:local_user:·길이 32).
- **cross-producer 동일 furef 보장**: 동일 `local_user_ref` → login 경로(p3_auth)·memory 경로(candidate_adapter)·service_memory.crypto가 **동일 furef 산출**(검증: 3자 동일 True). SubjectRefMap.local_user_ref_hash = 이 furef_v2.
- subject_ref = `subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, "<svc>:subject:"+ref)[:32]`(candidate_adapter subject_ref 정합·service-local mint·Option B).
- ★furef(내부 ref·SubjectRefMap 키) ≠ phash_v2_(login email de-id)·별개 contract.

## 4. secret_version 의미
- `<SVC>_SUBJECT_SECRET_VERSION`(default 1) → SubjectRefMap.secret_version에 기록.
- 목적: secret rotation 시 **dual-read**(구/신 version 공존)·zero-orphan 유지. version별 partial unique index(furef,version).

## 5. rotation 시 주의점
- ★secret 교체 시 **furef/subject_ref 값이 바뀐다**(HMAC key 변경) → 기존 매핑과 불일치.
- 안전 rotation: (a) 신 secret_version 도입·dual-read(구 version 매핑 유지) (b) 신규 write는 신 version (c) 점진 재매핑(별도 backfill·Hard Stop) (d) 구 version 폐기.
- ★rotation은 prod 데이터 영향 → **prod backfill(Hard Stop·Leo 승인)**. dev/shadow에서는 disposable이라 자유.
- cross-producer(login·memory)는 **동일 secret+version**을 공유해야 furef 정합 유지(분리 금지).

## 무결성
identity crypto 설계 노트 · 실 secret 값 0(key 이름만) · prod fail-closed(unknown→prod·raise) · dev fallback 조건 명시 · canonical furef_v2 통일(cross-producer 3자 동일) · secret_version/rotation 주의 · 코드=`service_memory/crypto.py` · **실 secret/Vault/prod rotation = Hard Stop**.
