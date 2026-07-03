# SIASIU CUTOVER-01 FOLLOW-UP — Pre-Fable5 Stabilization — 상태: **PASS_WITH_WATCH**

> 작성: 샤슈(SIASIU) · 2026-07-03 · ★코드 push 0(Leo 승인 대기) · foundation-docs mirror만 push.
> 기준: CUTOVER-01 구현(local commit `72295a2`) · Foundation baseline `7cf53e8`.
> 성격: Fable5 종합 리뷰 전, 남은 WATCH 처리/문서화. Fable5 단건 호출 안 함.

## A. 변경 여부: **코드 변경 있음(프론트 최소 1줄)**
- item1(502 프론트 소비)에서 friendly message 미표시 버그 발견 → `app/pages/consult.html` 1줄 최소 수정.
- 나머지 WATCH(2·3·4)는 문서화/재확인(코드 변경 0).

## B. 변경 파일
- `app/pages/consult.html` (apiChat 응답 파서 1줄) — ★brain.py/answer.py/adapters/server 무변경.

## C. /api/chat 502 프론트 소비 확인 결과
- **버그(수정 전)**: `apiChat`가 `if(!r.ok) throw 0`로 **502 body를 버림** → 콜백 d=null → line 533 else의 *"지금은 미리보기 화면이에요… python3 server.py로 켜면"* 메시지 표시. → **friendly message 미표시 + 서버 꺼진 것처럼 오해**(실제는 서버 ON·Foundation만 down).
- **수정**: `.then(r => r.json())`로 **502 body도 파싱**해 콜백에 전달 → `d.reply`(friendly) 표시. 네트워크/파싱 실패만 cb(null)→기존 preview.
- ★기존 UI는 콜백에서 `d.reply` 텍스트만 렌더(제품/CTA 렌더 안 함) → 502에서 제품/추천/CTA 노출 **0**. additive 필드(error/source/trace_id/products_allowed)는 UI가 무시(안전).

## D. friendly message 표시 확인
수정 후 502 → `bubbleAIsequence("죄송해요. 지금 상담 연결이 잠시 불안정해요. …잠시 후 다시 시도해 주세요.")` 표시. 실패를 성공/미리보기로 감추지 않음. (★프론트 smoke는 서버 실행 필요 — 코드 경로상 확인·런타임 브라우저 검증은 배포 시 WATCH)

## E. 제품/추천/CTA 실패 상태 처리
consult 채팅 콜백은 **reply 텍스트만** 렌더(제품 카드/CTA는 별도 검색 플로우) → 502·products_allowed=false에서 채팅 경로 제품/CTA **0**. FRC products_allowed=false는 Response Adapter가 이미 강제(제품 카드 0).

## F. Response Adapter 현재 범위 (경량 프레이밍)
**하는 것**: FRC answer_substance → reply(safety면 opener/closer 프레이밍) · `enforce_response_suppression`(products/CTA/추천/계속사용 허가 강제) · trace_id/source=foundation_http.
**안 하는 것(★한계)**: **다국어 현지화 안 함**. ko/zh/en smoke 결과:
- [ko] "나이아신아마이드가 뭐야?" → 한국어 ✅
- [en] "What is niacinamide?" → **한국어 응답**(현지화 X) ⚠
- [zh] "烟酰胺是什么?" → **한국어 응답**(현지화 X) ⚠
→ brain.chat이 하던 *native 재생성·7언어 보장*이 CUTOVER-01엔 없음. 페르소나(따뜻한 상담사 톤)도 경량 프레이밍뿐(풀 페르소나 아님).
- ★부수 관찰: products_allowed=false인데 answer_substance 산문이 "제품들을 살펴보고 있어요"처럼 제품을 *언급*할 수 있음(카드/CTA는 0). → CUTOVER-02 prose guard 대상.

## G. CUTOVER-02로 넘길 re-voicing 범위
- FRC answer_substance+evidence → **SIASIU PERSONA+TALK_STYLE로 LLM 재보이싱**.
- **다국어**: 사용자 locale로 현지화 + native 재생성(`_reply_in_lang` 수준·7언어).
- **anti-relaxation guard(필수)**: 재보이싱 후 forbidden_expressions 재출현 0 · products_allowed=false인데 제품/CTA/제품명 산문 언급 0 · safety_first인데 계속사용 허가 0 → 위반 시 conservative 재생성. **Foundation 판단 완화 금지**.
- 제품/CTA 노출 = FRC 허용값 종속.

## H. Foundation down 운영 WATCH
- **fail-closed 코드 재확인 ✅**: `consult()` `if frc is None: return foundation_unavailable()`(502·brain/mock/fake 0). test_cutover_01 DET + 02A FALLBK 실증.
- **모니터링 항목(OPS 문서/CUTOVER-03로 이관)**: Foundation `/health` up rate · timeout rate · 5xx count · **502(foundation_unavailable) count** · average latency · **trace_id missing rate**.
- ★brain 안전망 제거로 Foundation 가용성 = SIASIU 상담 SLA. **지금 HA 구현 안 함**(OPS train).

## I. 02A 테스트 갱신 정합성
- 변경 = **Foundation-only 정책 전환의 직접 귀결**(broken test 방치 아님):
  - `shadow_compare` 폐기 → Foundation-only엔 비교할 standalone runtime 없음.
  - `source=foundation_contract` → `foundation_http`(성공 label 통일·Cosmile 동형).
  - brain fallback tier → **502 foundation_unavailable**(brain 호출 0 spy로 검증).
- ★테스트명/주석 오해 방지: run_fallback 헤더를 "Foundation-down (Foundation-only·fail-closed·brain 호출 0)"로 변경. 구 "fallback brain" 뉘앙스 제거. (섹션 라벨 [FALLBACK]은 "Foundation-down 케이스"를 뜻함·brain fallback 아님 — 주석 명시)

## J. 추가 테스트 결과
- `test_cutover_01`: DET 16/16 + LIVE 5/5 = ALL_PASS (재확인).
- `test_dual_adapter_02a`(갱신): LIVE 24/24 + FALLBK 9/9 = ALL_PASS.
- ko/zh/en smoke: source=foundation_http·products=false 확인(단 언어 현지화 X — F 참조).

## K. Fable5 종합 리뷰 패키지 목록
1. CUTOVER-01 구현 보고서(`SIASIU_CUTOVER_01_IMPLEMENTATION_REPORT_20260703.md`)
2. 본 FOLLOW-UP 보고서
3. 테스트 결과(test_cutover_01·02A)
4. 남은 WATCH(P)
5. push 전 코드 상태(local commit 72295a2 + consult.html 미커밋 1줄)
6. 변경 파일 목록(구현 7 + 프론트 1)
7. Foundation ON/OFF 결과(LIVE5+5·502 fail-closed)
8. 프론트 502 소비 확인 결과(본 보고 C·D·E)
9. Response Adapter 한계 + CUTOVER-02 범위(F·G)
10. OPS/HA WATCH(H)
11. 설계 정본: CUTOVER_01_IMPLEMENTATION_PLAN·CUTOVER_SPEC(Foundation-only)

## L. foundation-docs 보고서 경로
- 원본: `/home/leo/Project/SIASIU/docs/SIASIU_CUTOVER_01_FOLLOWUP_REPORT_20260703.md`
- mirror: `foundation-docs/설계문서/siasiu/SIASIU_CUTOVER_01_FOLLOWUP_REPORT_20260703.md`

## M. foundation-docs commit hash
(실행 결과 기재)

## N. SIASIU repo local 상태
- local commit `72295a2`(CUTOVER-01) + **consult.html 1줄 미커밋**(프론트 502 fix·이번 FOLLOW-UP).
- 프론트 fix는 Leo 승인 후 코드 commit/push(현재 미커밋·미push).

## O. SIASIU 코드 push 여부: **0** (반드시)
- 코드 push 0. consult.html fix도 미push. foundation-docs 문서 mirror만 push.

## P. 남은 WATCH
1. **다국어 현지화 부재**(en/zh→한국어) → CUTOVER-02 필수(최우선 UX).
2. **페르소나 경량**(full re-voicing = CUTOVER-02).
3. **products_allowed=false 산문 제품 언급** → CUTOVER-02 prose guard.
4. **Foundation 가용성 = 상담 SLA**(brain 안전망 없음) → OPS 모니터링/HA(별도 train).
5. **프론트 502 fix 런타임 검증**(브라우저 실표시) → 배포/QA 시.
6. 프론트 fix 코드 push 대기(Leo 승인).
