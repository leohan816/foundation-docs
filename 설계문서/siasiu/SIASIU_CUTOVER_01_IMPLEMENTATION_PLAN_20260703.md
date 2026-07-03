# SIASIU CUTOVER-01 — Foundation-only Runtime (Clean Adapter Path) — Implementation Plan (PLAN ONLY) · 2026-07-03

> 작성: 샤슈(SIASIU) · ★구현 전 계획 — 코드 수정 0 · git/migration 0 · Foundation contract 변경 0
> ★명칭: SIASIU / 샤슈 · `Shashu` 금지.
> 기준: `foundation-control/docs/SIASIU_FOUNDATION_CUTOVER_SPEC_20260703.md` (§3 CUTOVER-01)
> ★2026-07-03 최종 정책 PATCH: **SIASIU runtime 상담 = Foundation-only.** brain.chat은 runtime primary/fallback에서 retire(소스 삭제 X) · Foundation 실패 = **fail-closed friendly**(brain/mock/fake 0). Cosmile Foundation-only/mock-retirement 패턴 참조(코드 재발명 금지).
> Cosmile 참조: `Cosmile/app/docs/COSMILE_FOUNDATION_ONLY_CONSULTATION.md` — bridgeMode 기본 http · 실패 502 `foundation_unavailable` + friendly · runtime mock importer 0 · legacy route는 debug-only 잔존.

---

## A. Current code path audit (실측)
- **live 진입**: `app/server.py:118` `POST /api/chat` → `brain.chat(...)` (server.py:120-122). 반환 `{"reply","memory","used_deepseek"}`.
- **config 패턴**: 전용 flags 모듈 없음 · env 직접(`os.environ.get`) · prod 감지 없음.
- **기존 어댑터(02A)**: `consult_via_foundation.consult()` → SSC→Foundation→FRC→render · `foundation_client`(call/health) · `siasiu_response_adapter.render`(suppression 보유).
- **★retire 대상(런타임 brain.chat 호출점)**:
  - `server.py:120` `/api/chat` → brain.chat (**primary — Foundation로 대체**).
  - `consult_via_foundation.py::_fallback` → `import brain; brain.chat(...)` (**fallback — fail-closed friendly로 대체**).
  - `siasiu_semantic_adapter.py:20` `service_context.user_ref = user_id` (**raw PII — foundation_user_ref로 교체**).
- **★brain.chat 유지되는 비상담 용도**(retire 대상 아님): `server.py`의 `/api/reset`(brain.reset)·`/api/checkins`(brain.checkins)·`/api/pitch`(brain.pitch)는 brain 모듈의 *다른 함수* — 상담(brain.chat) retire와 무관. → retire 범위 = **상담 경로의 brain.chat 자동 호출**뿐.
- **결론**: CUTOVER-01 = `/api/chat`을 Foundation-only로 배선 + adapter fallback을 fail-closed friendly로 교체 + foundation_user_ref + trace_id. brain.chat 소스는 **삭제 0**(런타임 상담 경로에서 호출 0).

## B. Provider policy (Foundation-only)
- env **`SIASIU_CONSULTATION_PROVIDER`**: runtime 기본 = **`foundation_contract`**.
  - 미설정/unknown → **`foundation_contract`**(brain으로 fallback 금지·Cosmile bridgeMode 기본 http와 동형).
  - `legacy`/`brain` 값 → **runtime route에서 사용 금지**. dev/debug 전용(별도 debug 스크립트/route에서만·기본 상담 경로 아님).
  - ★환경변수로 brain.chat runtime fallback을 되살리는 경로 **금지**.
- helper: `adapters/provider_flag.py::consultation_provider() -> "foundation_contract"` (runtime은 항상 foundation. legacy는 dev 전용 gate).
```
def consultation_provider():
    prov = os.environ.get("SIASIU_CONSULTATION_PROVIDER", "foundation_contract")
    # runtime: foundation-only. legacy/brain은 명시적 DEV 게이트에서만(기본 상담 route에서는 무시).
    if prov == "legacy" and os.environ.get("SIASIU_DEV_LEGACY_CONSULT") == "1":
        return "legacy_dev_only"      # ★기본 /api/chat route에서는 사용 안 함(debug 전용)
    return "foundation_contract"
```
- ★기본/production = Foundation. brain provider는 기본값이 될 수 없음.

## C. Input Adapter design
- **foundation_user_ref (opaque·PII 0)**: `"furef_" + sha256(("siasiu:"+str(user_id)).encode()).hexdigest()[:16]` — 결정론·역산 불가.
- **SSC(최소)**: `raw_text` · `locale`(system_lang→normalize) · `service_id="siasiu"` · `service_context={"surface":"consult","channel":"chat","foundation_user_ref":<opaque>}` · `service_mode_requested="auto"`.
- **금지**: memory.db → SSC bridge · raw PII(user_id/name) 전송 · **local brain 판단값 주입**.

## D. Foundation call design
- **재사용**: `foundation_client.call_foundation_contract(ssc)` (POST `/v1/consult_contract`).
- 오류(timeout/URLError/HTTPError 5xx/404/network) → **None** → §F **fail-closed foundation_unavailable**(brain fallback 아님).
- FRC 사용 필드: `trace_id·final_strategy·decision_type·safety_gate_result·products_allowed·recommendation_allowed·product_candidates·forbidden_expressions·suppression_reason·answer_substance·evidence`.

## E. Minimal Response Adapter design
- CUTOVER-01은 full re-voicing 보류(CUTOVER-02). **최소 안전 변환 + suppression 강제**:
  - `render(frc)` 재사용 — answer_substance → reply(경량) + `products_allowed=false`→제품/CTA 0 · `recommendation_allowed=false`→추천 0 · `safety_first/block`→계속사용 허가 0 · `forbidden_expressions` 재출현 0.
  - **Foundation 판단 완화 금지**.
- **/api/chat 응답 shape**: `{"reply","memory":{},"used_deepseek":true,"provider":"foundation_contract","source":"foundation_http","trace_id",...}` (기존 shape + additive). 성공 label = **`foundation_http`**(Cosmile 동형).

## F. Foundation down policy (★fail-closed only — brain/mock/fake 0)
Foundation None/timeout/5xx/404/network error →
- **HTTP 502** + `{"error":"foundation_unavailable","source":"foundation_error", "reason":<technical·payload/log만>}`.
- **user-facing friendly message**(고정):
  > "죄송해요. 지금 상담 연결이 잠시 불안정해요. 정확한 안내를 위해 임시 답변은 제공하지 않을게요. 잠시 후 다시 시도해 주세요."
- **products 0 · CTA 0 · recommendation 0 · continue-use permission 0**.
- **brain.chat 호출 0 · mock_fallback 0 · fake success 0**.
- ★adapter의 기존 `_fallback`(real brain.chat)은 **이 fail-closed friendly로 교체**. `import brain` 제거.

## D-2. Retired brain.chat policy
- 기존 `brain.py` / `brain.chat` **소스 삭제 0**.
- **런타임 상담 경로에서 호출 0**이 되어야 하는 위치:
  - `/api/chat` production/default path · Foundation down fallback path · provider unknown fallback path · adapter fallback path.
- brain.chat이 남을 수 있는 용도: **retired legacy source** · **explicit dev-only script/route**(예: `SIASIU_DEV_LEGACY_CONSULT=1` 게이트·기본 아님) · **archived comparison/eval**. → 실사용 route에서 **자동 호출 금지**.
- Cosmile 동형: legacy `/api/slice/consult`는 삭제 안 하고 DEBUG-ONLY 잔존 · 기본은 Foundation route. SIASIU도 동일(brain 상담은 dev 게이트 뒤로).

## G. Trace/log policy
- FRC `trace_id` → `/api/chat` 응답 + 서버 로그 전파. trace_id 없으면 null(정직).
- 실패 시 `foundation_error` + technical reason은 payload/log만(사용자엔 friendly만).
- raw PII/secret/raw_text durable 로그 0. foundation_user_ref(opaque)는 로그 가능.

## H. Test plan (수정·Foundation-only)
`app/tests/test_cutover_01.py`(신규). ★삭제: "기본 legacy" · "Foundation OFF→brain.chat fallback" · "production 강제 legacy".
1. **/api/chat 기본값 = Foundation path**(provider 미설정 → foundation_contract).
2. **Foundation ON**: `/api/chat` → Foundation → FRC 수신 · source=`foundation_http`.
3. **trace_id 전파**(non-null).
4. **Foundation OFF**: **502 `foundation_unavailable` + friendly message**.
5. **Foundation OFF 시 brain.chat 호출 0**(monkeypatch spy로 brain.chat 미호출 assert).
6. **Foundation OFF 시 mock_fallback 0**(source에 mock/fake 없음).
7. **unknown provider → brain.chat fallback 0**(foundation 또는 fail-closed).
8. **runtime route에서 brain.chat import/call 0**(상담 경로 코드 정적/동적 검사).
9. **products_allowed=false → 제품/CTA 0**.
10. **recommendation_allowed=false → 추천 문구 0**.
11. **safety_first/block → 계속사용 허가 0**.
12. **memory.db 주입 0**(SSC blob 검사).
13. **PII 전송 0**(SSC blob에 raw user_id/이름 0·foundation_user_ref만).
14. **Foundation contract 변경 0** · **기존 brain.chat 소스 파일 삭제 0**(파일 존재 assert).
- Foundation 미기동 시 ON 계열은 SKIP≠PASS(exit code green 위장 방지·02A 방식).

## I. Expected file changes
**수정(SIASIU repo만)**:
- `app/server.py` — `/api/chat`을 Foundation-only로(consult 어댑터 호출·brain.chat 상담 호출 제거). 다른 brain 엔드포인트(reset/checkins/pitch) 무변경.
- `app/adapters/consult_via_foundation.py` — `_fallback`을 **fail-closed foundation_unavailable friendly**로 교체(`import brain`/brain.chat 제거)·user_id→foundation_user_ref·trace_id 반환.
- `app/adapters/siasiu_semantic_adapter.py` — build_ssc foundation_user_ref(raw user_id 제거).
- `app/adapters/siasiu_response_adapter.py` — trace_id 출력·source=foundation_http.
**신규**: `app/adapters/provider_flag.py` · `app/tests/test_cutover_01.py`.
**수정/삭제 금지**: `brain.py`(소스)·`answer.py`·brain.chat 로직·`/api/reset|checkins|pitch` brain 사용·Foundation 코드/contract·Cosmile·memory.db.
**expected diff scope**: server.py ~15줄(상담 분기 교체)·consult_via_foundation ~25줄(fallback 교체)·adapters ~20줄·provider_flag ~20줄·test ~150줄. 기존 상담 소스(brain.py) 수정 0.
**rollback**: ★Foundation-only라 brain fallback 복귀 경로는 *의도적으로 없음*. 롤백 = server.py 상담 분기 revert(어댑터 additive)·brain.chat 소스는 그대로 남아 dev 게이트로 복구 가능.

## J. Risks (Foundation-only)
| 위험 | 완화 |
|---|---|
| **Foundation down = 상담 실패**(brain 안전망 제거·cross-project 결합↑) | fail-closed friendly·502·제품/CTA 0·Cosmile와 동일 정책(의도됨·WATCH) |
| `/api/chat` prod 진입점 파손 | 어댑터 재사용·상담 분기만 교체·test 14 |
| 응답 shape 불일치 | additive 매핑·test |
| **raw user_id PII** | foundation_user_ref 필수 |
| brain.chat이 우회로 다시 호출될 위험 | 상담 route에서 import/call 0 정적·동적 test(H-5,8) |
| Foundation latency(단일 경로) | CUTOVER-02 최적화·모니터 |

## K. Implementation prompt for CUTOVER-01
```
[CUTOVER-01] SIASIU Foundation-only Runtime — Clean Adapter Path

목표: /api/chat 상담을 Foundation-only로. brain.chat은 runtime 상담 경로에서 retire(소스 삭제 X). Foundation 실패 = fail-closed friendly(brain/mock/fake 0). Cosmile Foundation-only 패턴 참조(재발명 금지).
기준: SIASIU_FOUNDATION_CUTOVER_SPEC_20260703.md §3 + 본 계획 · Cosmile/app/docs/COSMILE_FOUNDATION_ONLY_CONSULTATION.md

허용 파일(SIASIU repo만): app/server.py(/api/chat 상담 분기만) · app/adapters/{provider_flag(신규),siasiu_semantic_adapter,consult_via_foundation,siasiu_response_adapter}.py · app/tests/test_cutover_01.py(신규)

금지:
- brain.py/answer.py 소스 수정·삭제 · brain.chat runtime 상담 호출(0이어야) · /api/reset|checkins|pitch 변경
- brain.chat/mock/fake runtime fallback · memory.db→SSC 주입 · raw PII 전송
- Foundation 코드/contract 변경 · Foundation Memory API 구현 · Cosmile 수정 · push

해야 할 일:
1) provider_flag.py: consultation_provider()(runtime 기본 foundation_contract·legacy는 dev 게이트만) + foundation_user_ref(sha256 opaque).
2) build_ssc: raw user_id 제거 → foundation_user_ref. SSC=raw_text+locale+service_id+minimal context.
3) server.py /api/chat: Foundation-only — consult_via_foundation.consult() 사용. 상담 brain.chat 호출 제거.
4) consult_via_foundation: Foundation None → ★_fallback을 fail-closed friendly로 교체(import brain 제거·502 foundation_unavailable·friendly 문구·products/CTA/reco/continue-use 0). render에 trace_id·source=foundation_http.
5) trace/log: FRC trace_id 전파(null 정직)·technical reason은 payload/log만·raw PII/secret 0.

테스트(test_cutover_01.py): H의 14케이스(기본 Foundation·502 friendly·brain 호출 0·mock 0·runtime import 0·suppression·PII 0·memory 0·brain 소스 삭제 0). Foundation down 시 ON 계열 SKIP≠PASS.

완료 기준: /api/chat 기본 Foundation·success=foundation_http·trace_id 전파·Foundation down=502 friendly(brain/mock/fake 0)·suppression·PII 0·memory 0·contract 0·brain.chat 소스 존재·상담 route brain 호출 0·push 0.
완료 보고: 변경 파일·provider 설계·SSC(PII 0)·live 결과·Foundation down(502/friendly·brain 호출 0 spy 증거)·trace_id·brain retire 증거·금지범위 0·commit(로컬)·push 0.
STOP.
```

## 한계
- 구현 전 계획 — 실제 구현은 Leo 승인 후. 코드 0 · Foundation contract 0 · migration 0 · brain.chat 소스 삭제 0 · push 0.
