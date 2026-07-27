# 140 — Pointer: independent order line + provenance review

| Field | Value |
|---|---|
| Artifact / verdict | `139_INDEPENDENT_ORDER_LINE_PROVENANCE_REVIEW.md` · `IMPLEMENTATION_REVIEW` · TIER `HARD_IMPORTANT_SAFETY`(Advisor 재분류) · **`PASS_WITH_RISK`** |
| Sole risk driver | F1 evidence-coverage: 수용 GREEN(`-t` 필터)이 fail-closed malformed(882)·leakage sweep(864)·정확 라인집합(837)·authorization-first(911)·129 정정 oracle을 미실행 — 무필터 RED에선 실패-선행 성립, 통과만 미증명. 코드 결함 아님 |
| Handoff / pins | 137 @ docs `8a9b28c` sha256 `d6a097a1…` · product `76497d6..48939e8` = 1 commit·정확 8경로·+270/−7·clean/upstream-equal·schema/lock 무변경 |
| Contract verdicts | Q1 권한선행·5컬럼 한정·검증(무복구) fail-closed ✔ · Q2 UI 순수 +31행·검증값만·PII 0·기존 surface 불변 ✔ · Q3 sha는 verified item→유일 실 create의 unique connect만·주문번호/재생/예약/intent/provider/경제 불변·스키마·fallback 0 ✔ · Q4 계약 충족·기존 단언 약화 0(단 F1) |
| Residuals | R1 미실행 4 oracle(무필터 1회로 폐쇄) · R2 lines↔lineCount 비트랜잭션 · R3 connect 실패가 catch-all로 붕괴(진단비용) · R4 컴포넌트 `lines?:` 선택적 표면 · R5 typecheck/build/DB/runtime 미실행·M3F 하네스 미수리 유지 |
| Actual binding | `claude-fable-5` · max · `/fable-sentinel` · exact mission CWD · Worker 독립 — ★137의 `claude-opus-5` 표기와 불일치(101A와 동일 클래스, 139에 기록) |
| Boundaries | read-only · 테스트/빌드/DB/runtime/provider/browser/경제행위 0 · 광역 감사 0 · **commit/push 미수행(137 금지 준수)** · 139/140 작성만 |
| `RETURN_TO` | `foundation-advisor` — R1 폐쇄(무필터 재실행) 또는 Leo/GPT 위험 수용 라우팅 |
