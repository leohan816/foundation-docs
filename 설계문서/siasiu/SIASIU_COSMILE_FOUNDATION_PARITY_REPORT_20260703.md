# SIASIU ↔ Cosmile Foundation-only Parity — Report — 상태: **PASS_WITH_WATCH**

> 작성: 샤슈(SIASIU) · 2026-07-03 · ★코드 수정 0 · SIASIU push 0 · read-only 대조.
> SIASIU HEAD `a538c68`(CUTOVER-01 `72295a2`·frontend `b3e8274`) · Cosmile HEAD `a5547e1`.
> 목적: commerce를 제외하면 SIASIU·Cosmile이 동일 Foundation-only lifecycle을 따르는지 확인.

## A. Verdict: **PASS_WITH_WATCH**
핵심 Foundation-only lifecycle(계약 엔드포인트·fail-closed 502/friendly·source label·mock/local retire·suppression·fail-closed)은 **양 서비스 parity 일치**. SIASIU **PATCH_REQUIRED 없음**. WATCH = Cosmile 측 교차검증 항목 + SIASIU 미배포(push 0).

## B. SIASIU HEAD
`a538c68` · CUTOVER-01 구현 `72295a2` · frontend 502 fix `b3e8274` · docs `a538c68`.

## C. Cosmile 기준
HEAD `a5547e1`(Foundation-only runtime·mock retirement 완료). 메인 상담 = `/api/slice/consult-foundation` → `callFoundationContract(ssc)` → `POST /v1/consult_contract`.

## D. Lifecycle parity 표
공통: `User → Service UI/API → Input Adapter → SSC → Foundation POST /v1/consult_contract → FRC → Response Adapter → User`

| # | 원칙 | SIASIU | Cosmile | parity |
|---|---|---|---|---|
| 1 | runtime = Foundation-only | ✅ `/api/chat` → CVF.consult(기본 foundation_contract) | ✅ consult-foundation → callFoundationContract | **일치** |
| 2 | brain/local/mock/fake runtime 호출 0 | ✅ consult_via_foundation `import brain/brain.chat( ` = **0**(주석만)·mock/fake 0 | ✅ mockBrain.ts/mockFoundationBridge.ts **삭제**·runtime mock import 0 | **일치** |
| 3 | Foundation down → 502 foundation_unavailable + friendly + source=foundation_error | ✅ `foundation_unavailable()`: http_status 502·"죄송…"·source=foundation_error | ✅ route.ts:77·81 error=foundation_unavailable·source=foundation_error·status 502 | **일치** |
| 4 | 성공 → source=foundation_http + trace_id | ✅ render source=foundation_http·trace_id 전파 | ✅ route.ts:56 source=foundation_http (trace_id는 Cosmile 측 확인 WATCH) | **일치**(trace_id WATCH) |
| 5 | products_allowed=false → 제품/CTA 0 | ✅ enforce_response_suppression(show_product_card/cta) | ✅ (commerce 렌더가 FRC 허용값 종속) | **일치** |
| 6 | recommendation_allowed=false → 추천 0 | ✅ show_recommendation | ✅ | **일치** |
| 7 | safety_first/block → 계속사용 허가 0 | ✅ allow_continue_use_permission=not safety | ✅(safety 시 상품/CTA 숨김) | **일치** |
| 8 | raw PII(user_id/name/phone/email) 미전송 | ✅ SSC에 raw user_id 미포함 | ❓ Cosmile ref/PII 코드 미확인 | **WATCH** |
| 9 | opaque foundation_user_ref | ✅ `furef_ + sha256("siasiu:"+user_id)[:16]` | ❓ Cosmile foundation_user_ref 미발견 | **WATCH** |
| 10 | memory.db → SSC injection 0 | ✅ session_context 빈 dict·memory 주입 0(주석만) | ✅(Cosmile은 Prisma·memory.db 없음) | **일치** |

## E. brain/local/mock retire 확인
- **SIASIU**: brain.chat runtime 상담 호출 **0**(consult_via_foundation import/call 0·`legacy_dev_only` 명시 dev 게이트에서만 도달). brain.py 소스 삭제 0(reset/checkins/pitch는 brain 다른 함수 사용). mock/fake 0.
- **Cosmile**: `mockBrain.ts`·`mockFoundationBridge.ts` **삭제**·runtime src mock import **0**·fixture는 test/eval 전용 격리. legacy `/api/slice/consult`는 debug-only 잔존.
→ **retire 완료 parity 일치.**

## F. Foundation-only 위반 가능성
- SIASIU: **위반 없음**(default/unknown/down 전부 Foundation·brain은 dev 게이트만·env로 brain fallback 복구 경로 없음).
- Cosmile: 메인 consult는 consult_contract·fail-closed. ★단 **별도 클라이언트 `httpFoundationConsultation.ts` → `/v1/consult/judge`** 존재(메인 consult 라우트 아님) — judge 플로우/legacy 용도 추정. 상담 우회 아닌지 **교차검증 WATCH**.

## G. SIASIU-specific 허용 차이 (commerce only 제외)
- SIASIU: 말투(PERSONA/TALK_STYLE)·다국어·상담 UI·환대·greeting. (Cosmile: 상품/장바구니/주문/commerce event)
- 공통 Foundation 판단축(safety/decision/products_allowed/forbidden/suppression/trace_id)은 동일 소비.
- ★SIASIU Response Adapter는 **경량 프레이밍**(full re-voicing·다국어 현지화 = CUTOVER-02) — 현재 en/zh도 한국어 응답(parity 무관·UX WATCH).

## H. PATCH_REQUIRED 여부
- **SIASIU: PATCH_REQUIRED 없음**(10원칙 코드 준수·CUTOVER-01 정합).
- Cosmile: 코드 수정 금지 대상(read-only) — #8/#9(PII/ref)·F(judge 클라이언트)는 **Cosmile 담당 교차검증 WATCH**(SIASIU가 PATCH 지시 대상 아님).

## I. foundation-docs 보고서 경로
- 원본: `/home/leo/Project/SIASIU/docs/SIASIU_COSMILE_FOUNDATION_PARITY_REPORT_20260703.md`
- mirror: `foundation-docs/설계문서/siasiu/SIASIU_COSMILE_FOUNDATION_PARITY_REPORT_20260703.md`

## J. foundation-docs commit hash
(실행 결과 기재)

## K. SIASIU 코드 push 여부: **0**

## L. 남은 WATCH
1. **Cosmile PII/opaque-ref**(#8·#9): SIASIU는 foundation_user_ref 명시, Cosmile은 코드에 미발견 → Cosmile 측 raw PII 전송 여부 교차검증.
2. **Cosmile `/v1/consult/judge` 별도 클라이언트**(F): 메인 consult 아니나 상담 우회 아닌지 확인.
3. **Cosmile trace_id 전파**(#4): 성공 응답 trace_id 확인.
4. **SIASIU 미배포**: parity는 코드상 일치·SIASIU 코드 push 0(Leo 승인 대기) — 실런타임 parity는 배포 후.
5. **SIASIU 다국어/페르소나**(CUTOVER-02) · Foundation 가용성=상담 SLA(OPS/HA).
6. 중복 문서/미러(설계문서 137 대량 미러) — 삭제 금지·WATCH만.
