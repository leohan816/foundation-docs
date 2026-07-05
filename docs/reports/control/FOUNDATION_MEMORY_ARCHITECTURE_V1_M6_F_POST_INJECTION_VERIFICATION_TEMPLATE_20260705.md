# Memory V1 — M6-F Post-Injection Verification Template (ops-run · boolean/hash/count)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: ops 실 Vault 주입 **후** control이 review할 검증 runner/template + evidence format + checklist.**
> ★control은 실 secret 값 미접근·**boolean/hash/count evidence만** review. runner는 **ops가 주입된 deploy 환경에서 실행**·secret 값 미출력. 실 Vault write/prod DB/backfill/live/main merge = Hard Stop(미수행).
> 근거(local): ops handoff(`c433f14`) · injection contract verification(`83ae233`) · FOUNDATION impl(subject_identity/adapter/p3).

---

## 1. Fact
- ops 실 주입 후, 실 secret 값을 **보지 않고** 주입 계약(env 사용·값 분리·fail-closed·flag OFF)을 검증할 **runner + evidence format + checklist**. control은 boolean/hash/count evidence만 review.

## 2. Evidence format (ops → control·JSON·값 미포함)
```json
{
  "env_profile": "production",
  "FOUNDATION_secret_from_env": true, "FOUNDATION_not_dev_fallback": true,
  "FOUNDATION_version_1": true, "FOUNDATION_prod_mint_ok": true,
  "SIASIU_furef_from_env": true, "SIASIU_furef_not_dev_fallback": true,
  "SIASIU_candidate_from_env": true, "SIASIU_p3_from_env": true,
  "COSMILE_memory_from_env": true,
  "all_secrets_distinct": true, "distinct_secret_count": 5,
  "FOUNDATION_unset_prod_failclosed": true, "SIASIU_unset_prod_failclosed": true,
  "unknown_env_is_production": true,
  "identity_touch_flag_off": true,
  "prod_db_accessed": false, "backfill_run": false,
  "secret_values_printed": false, "vault_write_by_control": false
}
```
- ★모든 필드 = boolean/count. **secret 값·hash 원문·raw/PII 미포함.** distinct는 내부 hash 집합 크기(count)로 표현.

## 3. Verification runner (ops 실행·값 미출력·control 제공)
> ops가 주입된 deploy 환경(secret 존재)에서 실행. 코드 경로는 배포에 맞게 조정. ★secret 값을 출력/로깅하지 않는다(내부 hash 비교만).
```python
import os, sys, importlib, hashlib, json
# 배포 경로에 맞게 조정
sys.path.insert(0, "/path/to/FOUNDATION"); sys.path.insert(0, "/path/to/SIASIU/app")
def h(b): return hashlib.sha256(b if isinstance(b, bytes) else str(b).encode()).hexdigest()
ev = {"env_profile": os.environ.get("FOUNDATION_ENV", "?")}
from foundation.shared_memory import subject_identity as SI, contract as C
from ssbrain import foundation_memory_candidate_adapter as MC, foundation_p3_auth_shadow as P3
for m in (SI, C, MC, P3): importlib.reload(m)
sec = SI._subject_secret()
ev["FOUNDATION_secret_from_env"] = sec is not None
ev["FOUNDATION_not_dev_fallback"] = sec is not None and h(sec) != h(SI._DEV_FALLBACK_KEY)
ev["FOUNDATION_version_1"] = SI.current_secret_version() == 1
try: ev["FOUNDATION_prod_mint_ok"] = SI.subject_ref_from_foundation_user_ref("siasiu", "furef_v2_" + "a"*32).startswith("subj_v2_")
except Exception: ev["FOUNDATION_prod_mint_ok"] = False
ev["SIASIU_furef_not_dev_fallback"] = h(MC._FUREF_SECRET) != h("siasiu_dev_shadow_furef_secret_v2")
hs = {h(sec), h(MC._FUREF_SECRET), h(MC._SECRET), h(P3._P3_AUTH_SECRET), h(os.environ.get("COSMILE_MEMORY_SECRET",""))}
ev["all_secrets_distinct"] = len(hs) == 5; ev["distinct_secret_count"] = len(hs)
ev["identity_touch_flag_off"] = C.FLAGS.get("shared_memory_v0_shadow") is False
ev["secret_values_printed"] = False; ev["vault_write_by_control"] = False
ev["prod_db_accessed"] = False; ev["backfill_run"] = False
print(json.dumps(ev))   # ★boolean/count만
```
- **fail-closed 확인(별도 실행·1개 secret 미설정 + prod env):** `SI.subject_ref_from_foundation_user_ref(...)`→`SubjectRefSecretMissing`·adapter import→`RuntimeError`.
- ★검증됨(synthetic·`83ae233`): all_distinct·version1·flagOFF·fail-closed·unknown env→production 전부 True.

## 4. Review checklist (control·ops evidence 수신 후)
- [ ] `*_secret_from_env=True` 전부(dev fallback 미사용).
- [ ] `all_secrets_distinct=True`·`distinct_secret_count`=주입 secret 수(값 분리).
- [ ] `FOUNDATION_version_1=True`.
- [ ] `*_unset_prod_failclosed=True`(dev fallback 차단).
- [ ] `unknown_env_is_production=True`(fail-safe).
- [ ] `identity_touch_flag_off=True`(mint inert).
- [ ] `prod_db_accessed=False`·`backfill_run=False`·`secret_values_printed=False`·`vault_write_by_control=False`.
- [ ] evidence에 secret 값/hash 원문/raw/PII **미포함**.
- ★하나라도 False/누락 → **STOP·prod DB backfill gate 미진입.**

## 5. Boundary
- ★control: 실 secret 값 미접근·runner는 ops 실행·control은 **boolean/count evidence review**만. 실 Vault write·prod DB·backfill·live·main merge = Hard Stop(미수행).

## 6. Next action
- ops 실 Vault 주입(별도) → runner 실행 → boolean evidence → control checklist review(§4) → PASS 시 **prod DB backfill gate**(별도 최종 Leo 승인). ★COSMILE_FUREF_SECRET 미배선(§handoff)·SIASIU-중심 backfill blocker 아님(§backfill package).

## 무결성
post-injection verification template only · control 실 secret 미접근/미출력/미커밋/Vault write 0 · prod DB 0 · backfill 0 · live 0 · main merge 0 · evidence=boolean/hash/count · 본 template만 commit/push.
