# SIASIU CUTOVER-01 Frontend Fix — Status Update — 상태: **CLOSED (local commit·push 0)**

> 작성: 샤슈(SIASIU) · 2026-07-03 · ★SIASIU 코드 push 0(Leo 승인 대기) · foundation-docs mirror만 push.

## 요약
CUTOVER-01 FOLLOW-UP에서 적용한 `app/pages/consult.html`의 /api/chat 502 파서 1줄 수정을 **별도 local commit**으로 정리.

## 세부
- **변경 파일**: `app/pages/consult.html` (1개·explicit add).
- **diff**: `/api/chat` fetch에서 `if(!r.ok) throw 0;` 제거 → `return r.json()`로 **502 foundation_unavailable body(friendly reply) 파싱·표시**. 제품/CTA는 이 콜백에서 렌더 안 함(reply 텍스트만) → products_allowed=false 노출 0.
- **범위 밖 미접촉**: `/api/recall`의 `if(!r.ok) throw 0` 잔존(CUTOVER-01 무관).
- **local commit**: `b3e8274` — message "fix: handle Foundation unavailable response in SIASIU chat UI".
- **SIASIU 코드 push**: **0**(미push·Leo 승인 대기).
- **무변경**: brain.py/answer.py/adapters/server/Foundation/Cosmile/DB.

## 관계
- CUTOVER-01 구현: `72295a2`
- FOLLOW-UP 보고서(foundation-docs): `a4400c2`
- 본 프론트 fix: `b3e8274`(local only)

## 남은 WATCH
- 프론트 502 표시 **브라우저 런타임 검증**(배포/QA 시).
- 다국어 현지화·페르소나 = CUTOVER-02.
- Foundation 가용성 = 상담 SLA(OPS/HA·별도 train).
- SIASIU 코드 push 대기(Leo 승인).
