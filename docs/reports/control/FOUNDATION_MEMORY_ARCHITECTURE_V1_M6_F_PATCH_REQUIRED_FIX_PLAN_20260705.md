# Memory V1 — M6-F PATCH_REQUIRED Fix Plan (P-1/P-2/P-3 + W-1/W-2/W-3)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: M6-F strict review(PATCH_REQUIRED) 대응 patch round — M6-F package 정정 + 필요 shadow code 정정.**
> ★M6-F execution · prod secret 주입 · subject_ref backfill · prod/live/main merge = **미수행·승인 아님.** shadow code만 정정(shadow 브랜치·main merge 0).
> ★검수 라벨 정정: 근거 review는 **Control-invoke 독립 Claude strict review**(외부 Fable5 GPT 아님). 외부 Fable5 답변 도착 시 별도 비교.
> 근거: strict review(`ca60b80`·PATCH_REQUIRED) · M6-F package(`20190fb`) · M2 §3.9 · M4 §6 R-2.

---

## 1. Fact
| 항목 | 결과 |
|---|---|
| P-1 chain formula divergence | ✅ 정정(SIASIU adapter shadow `dd2c631`) |
| P-3 prod fail-closed | ✅ 정정(SIASIU adapter/p3 `dd2c631`·Cosmile de-anon `91bd803`) |
| W-2 raw local_user_ref echo | ✅ 제거(`dd2c631`) |
| P-2 rotation-version 결정 | ✅ 문서화(권고·Leo 확인 필요·prod secret 전) |
| W-1 furef namespace 불변식 | ✅ 문서화(검증가능 불변식) |
| W-3 backfill idempotency | ✅ 문서화(skip/abort 기준) |
| 테스트 | adapter 28/28·p3 16/16·de-anon 14/14·vitest 10/10·회귀 0 |
| main merge / prod / live / backfill | **0** |

## 2. PATCH_REQUIRED 원인 요약
- **C-1(최고):** SIASIU adapter가 `subj_v2_ = HMAC(서비스 secret, "siasiu:local_user:"+ref)[:32]`로 subject_ref를 **서비스 secret 단일-레이어 local-mint** → package §2/§3 불변식("subject_ref는 Foundation secret으로만 생성")과 모순(dev→prod secret 교체만으로 미해결).
- **C-2:** subj_v2_에 key-version 없음 → FOUNDATION_SUBJECT_REF_SECRET rotation = 전 row orphan·설계가 fix deferred(backfill 후 비가역).
- **C-3:** 3개 서비스 shadow 모듈이 `env or "<dev_secret>"`(silent)·prod fail-closed 부재.

## 3. P-1 / P-2 / P-3 patch plan
### P-1 (chain formula divergence) — ★코드 정정 완료(shadow)
- **정정:** 서비스는 subject_ref를 **local-minting 하지 않는다.** SIASIU adapter `_subject_ref` → `_furef_v2`:
  - 서비스(layer-1): `furef_v2 = "furef_v2_" + HMAC(서비스 secret, "siasiu:local_user:"+ref)[:32]`.
  - Foundation(layer-2·위임): `subject_ref = "subj_v2_" + HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef_v2)[:32]` — `subject_identity.resolve_subject`(정본 생성기)가 mint.
- **candidate 변경:** `"furef_v2": furef_v2`(서비스 ref) + `"subject_ref": None`(Foundation-mint 위임). shadow store 키 = furef_v2(service-local).
- ★"secret swap"이 아니라 **"formula/routing 교체"**로 문서화(package §10).
- **경계:** 서비스는 `FOUNDATION_SUBJECT_REF_SECRET` **미보유**(Foundation-side mint)·M3 migrated candidate import 시 Foundation이 subject_ref 부여.

### P-2 (rotation-version decision) — ★설계 결정(코드 없음·prod secret 전 확정)
- **문제:** subj_v2_ key-version 없음 → Foundation secret rotation = 전 subject_ref 변경·orphan.
- **권고 결정(Leo 확인 필요):**
  - **(a) embedded key-version**(권고): `subj_v2_<keyver>_…`(또는 keyver 컬럼). `SubjectRefMap.furef_local_ref` 보존 → 신 secret으로 재계산·**old/new 공존(zero-orphan rolling rotation)**·rollback = keyver 되돌림.
  - **(b) full re-key runbook**(대안): `furef_local_ref` 기반 전 row `HMAC(new_secret, furef_local_ref)` 재계산 + 전 FK rewrite·**atomic cutover + backup + rollback**·rolling 불가(hard cutover).
- **orphan/re-keying/rollback:** (a)는 orphan 0(공존)·(b)는 cutover 중 orphan 위험 → backup+atomic 필수. ★**최종 선택은 prod secret 확정/backfill 전 Leo 승인.**

### P-3 (prod fail-closed) — ★코드 정정 완료(shadow)
- **정정:** 3개 shadow 모듈에 `_is_production()`(FDN_ENV/APP_ENV/NODE_ENV=production) + fail-closed:
  - prod + env secret 미설정 → **raise/throw**(실행 실패·silent dev fallback 금지).
  - dev/shadow(no prod env) → dev fallback 유지(기존 동작 불변).
- **실증:** prod+unset → raise(SIASIU)·throw(Cosmile)·dev → 정상.

## 4. W-1 / W-2 / W-3 handling
- **W-1(furef namespace 불변식):** ★**furef는 unique service namespace(`<service>:<type>:<id>`) 임베드 필수·furef space 서비스간 공유 금지**를 검증가능 불변식으로 문서화(package §10). subject_ref 격리가 이 불변식에 의존(resolve_subject가 source_service를 hash 제외)·신규 서비스 온보딩 시 검증. collision risk: service prefix 누락/충돌 시 subject_ref 서비스간 silent collision → 온보딩 체크 필수.
- **W-2(raw echo 제거):** ★코드 정정 완료 — candidate의 raw `local_user_ref` echo 제거(furef_v2 가명만·§7 output-0 정합).
- **W-3(backfill idempotency):** backfill 조건 추가(문서) — ① 이미 non-NULL subject_ref row는 **skip**(재계산 금지·재실행 안전) ② `furef_local_ref` 없는 row는 subject_ref 계산 불가 → **abort 또는 skip + 보고**(silent 진행 금지) ③ 전체 **idempotent**(재실행 동일 결과).

## 5. 코드 수정 필요 여부
| 항목 | 코드 수정 | 위치 |
|---|---|---|
| P-1 | **필요·완료** | SIASIU adapter(shadow `dd2c631`) — furef_v2 split·subject_ref=None·store 키 |
| P-3 | **필요·완료** | SIASIU adapter/p3 `dd2c631`·Cosmile de-anon `91bd803` — fail-closed |
| W-2 | **필요·완료** | SIASIU adapter `dd2c631` — echo 제거 |
| P-2 | 코드 없음(설계 결정) | package §10(권고)·prod secret 전 Leo 확정 |
| W-1 | 코드 없음(문서 불변식) | package §10·온보딩 체크 |
| W-3 | 코드 없음(backfill 조건 문서) | package §10·backfill gate에서 구현 |
- ★모든 코드 수정 = **shadow 브랜치**(main merge 0)·live/prod/backfill 미배선.

## 6. 테스트 계획 / 결과
| 테스트 | 결과 |
|---|---|
| SIASIU adapter test(furef_v2·subject_ref=None·echo 제거) | **28/28**(26→28) |
| P-3 fail-closed 실증(prod+unset → raise·dev → fallback) | **PASS**(SIASIU·Cosmile) |
| SIASIU p3 auth test | **16/16** |
| Cosmile de-anon(node)·vitest | **14/14 · 10/10** |
| SIASIU 회귀(fingerprint·integration·workflow) | **d7f579443f8a110a · 39/39 · 119/119**(무변경) |
| Cosmile 회귀(readiness·loop) | **164/164 · 112/112** |
| commerce checkout/order/payment .ts | **무변경(0)** |

## 7. Restricted Actions List 준수
prod secret 실주입 **0** · subject_ref backfill 실행 **0** · prod DB 0 · live auth 전환 0 · live emit 활성화 0 · hard reject 0 · repair/mapping/backfill 실행 0 · **product repo main merge 0**(siasiu 3cd068d·cosmile 3ba91e0) · schema code main merge 0 · raw/PII/raw identifier 출력 0 · Foundation durable customer memory 0 · cross-service 0 · V3 0.

## 8. 재검수 계획
- ★**P-1/P-3/W-2 코드 정정 + P-2/W-1/W-3 문서 정정 완료** → **재검수(독립 strict review 1회) 요청 후보**: (a) P-1 정정이 2-layer 경계를 올바르게 반영하는가(서비스 furef_v2만·subject_ref Foundation-mint·서비스 미mint) (b) P-3 fail-closed가 3모듈에 실제 적용됐는가 (c) P-2 rotation 결정이 orphan/rollback을 정확히 다루는가 (d) W-1/W-2/W-3 반영 확인.
- 재검수 = **read-only**·prod/live/backfill/main merge 0. 외부 Fable5 답변 도착 시 별도 비교.
- 재검수 APPROVE/APPROVE_WITH_WATCH 후에야 **M6-F execution gate(prod secret 주입·backfill)** 판단(각 별도 Leo 승인).

## 9. 다음 액션
- Leo 판단: ① **재검수 1회 호출**(P-1/P-3/W 반영 확인·P-2 rotation 결정 확정) ② P-2 rotation-version 최종 선택(권고 = embedded key-version) ③ (재검수 APPROVE 후) M6-F execution gate 각 별도 승인.
- ★**이번 patch round = package 정정 + shadow code 정정까지.** M6-F execution·prod secret·backfill·prod/live/main merge 승인 아님.

## 무결성
M6-F PATCH_REQUIRED fix plan + shadow code 정정 only · M6-F execution 0 · prod secret 실주입 0 · subject_ref backfill 0 · prod DB 0 · live 0 · hard reject 0 · repair/mapping/backfill 0 · **main merge 0**(siasiu 3cd068d·cosmile 3ba91e0) · schema code main merge 0 · raw/PII 출력 0 · durable/cross-service/V3 0 · shadow 브랜치 정정(SIASIU `dd2c631`·Cosmile `91bd803`) · 실 DB/logins 무접촉 · 본 fix plan + package 정정만 foundation-docs commit/push · **재검수·M6-F execution은 각 별도 Leo 승인.**
