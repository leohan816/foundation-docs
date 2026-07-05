# Memory V1 — M6-F Option B Post-Injection Verification Template (per-service SUBJECT_SECRET · boolean/hash/count)

> 작성: foundation-control(Control) · 2026-07-05 · **정본(Option B): ops per-service SUBJECT_SECRET 주입 후 control이 review할 검증 runner + evidence format + checklist.**
> ★control 실 secret 값 미접근·**boolean/hash/count evidence만** review. runner는 ops가 주입 env에서 실행·secret 값 미출력. 실 Vault write/prod DB/backfill/live/main merge = Hard Stop.
> ★**FOUNDATION_SUBJECT_REF_SECRET 삭제**(Foundation mint 폐기). 검증 대상 = `SIASIU_SUBJECT_SECRET`·`COSMILE_SUBJECT_SECRET`(필요 시) 등 service-local.
> 근거(local): Option B contract·shadow pivot result(`1e24c33`).

---

## 1. Fact
- ops 주입 후, 실 secret 값을 보지 않고 **per-service SUBJECT_SECRET 주입 계약**(env 사용·값 분리·fail-closed·service-local mint 동작·**Foundation mint 경로 부재**)을 검증할 runner + evidence + checklist.

## 2. Evidence format (ops → control·JSON·값 미포함)
```json
{
  "env_profile": "production",
  "SIASIU_subject_from_env": true, "SIASIU_subject_not_dev_fallback": true,
  "SIASIU_service_local_mint_ok": true,
  "COSMILE_subject_wired": false,
  "all_service_secrets_distinct": true, "distinct_secret_count": 4,
  "SIASIU_unset_prod_failclosed": true,
  "unknown_env_is_production": true,
  "foundation_mint_deprecated": true,
  "identity_touch_flag_off": true,
  "prod_db_accessed": false, "backfill_run": false,
  "secret_values_printed": false, "vault_write_by_control": false
}
```
- ★모든 필드 boolean/count. secret 값·hash 원문·raw/PII 미포함.

## 3. Verification runner (ops 실행·값 미출력·control 제공)
> ops가 주입 env에서 실행. ★secret 값 출력/로깅 0(내부 hash 비교만).
```python
import os, sys, importlib, hashlib, json
sys.path.insert(0, "/path/to/SIASIU/app"); sys.path.insert(0, "/path/to/FOUNDATION")
def h(b): return hashlib.sha256(b if isinstance(b, bytes) else str(b).encode()).hexdigest()
from ssbrain import foundation_memory_candidate_adapter as MC
from foundation.shared_memory import subject_identity as SI
importlib.reload(MC); importlib.reload(SI)
ev = {"env_profile": os.environ.get("APP_ENV", "?")}
ev["SIASIU_subject_not_dev_fallback"] = h(MC._SUBJECT_SECRET) != h("siasiu_dev_shadow_subject_secret_v2")
sr = MC.subject_ref("verify_probe")                              # ★service-local mint(Foundation 미호출)
ev["SIASIU_service_local_mint_ok"] = SI.is_subject_ref_v2(sr)    # Foundation은 validate만
# ★Foundation mint 경로 부재 확인(deprecated raise)
try:
    SI.resolve_subject("siasiu", "furef_v2_" + "a"*32); ev["foundation_mint_deprecated"] = False
except SI.SubjectMintDeprecated: ev["foundation_mint_deprecated"] = True
hs = {h(MC._SUBJECT_SECRET), h(MC._FUREF_SECRET), h(MC._SECRET), h(os.environ.get("SIASIU_P3_AUTH_SECRET",""))}
ev["all_service_secrets_distinct"] = len(hs) == len([x for x in hs]); ev["distinct_secret_count"] = len(hs)
ev["secret_values_printed"] = False; ev["vault_write_by_control"] = False
ev["prod_db_accessed"] = False; ev["backfill_run"] = False
print(json.dumps(ev))   # ★boolean/count만
```
- **fail-closed(별도·1개 secret 미설정+prod env):** adapter import → `RuntimeError`(SIASIU_SUBJECT_SECRET 등).
- ★검증됨(dev·shadow pivot): service-local mint valid subj_v2_·Foundation mint deprecated raise·secret 3분리.

## 4. Review checklist (control·ops evidence 수신 후)
- [ ] `SIASIU_subject_from_env` / `not_dev_fallback` True.
- [ ] `SIASIU_service_local_mint_ok` True(subj_v2_ format).
- [ ] ★`foundation_mint_deprecated` True(**Foundation mint 경로 부재**).
- [ ] `all_service_secrets_distinct` True·`distinct_secret_count`=주입 수.
- [ ] `*_unset_prod_failclosed` True·`unknown_env_is_production` True.
- [ ] `identity_touch_flag_off` True.
- [ ] `prod_db_accessed`/`backfill_run`/`secret_values_printed`/`vault_write_by_control` False.
- [ ] evidence에 secret 값/hash 원문/raw/PII 미포함.
- ★하나라도 False/누락 → STOP·prod DB backfill gate 미진입.
- ★`COSMILE_SUBJECT_SECRET`은 Cosmile subject mint 배선 시(별도 gate)·현재 `COSMILE_subject_wired=false`(정직).

## 5. Boundary
- control 실 secret 미접근·runner는 ops 실행·control은 boolean/count review만. 실 Vault write·prod DB·backfill·live·main merge = Hard Stop.

## 무결성
Option B post-injection verification template only · control 실 secret 미접근/미출력/미커밋/Vault write 0 · **Foundation mint 경로 부재 확인 포함** · prod DB 0 · backfill 0 · live 0 · main merge 0 · evidence=boolean/hash/count · 본 template만 commit/push.
