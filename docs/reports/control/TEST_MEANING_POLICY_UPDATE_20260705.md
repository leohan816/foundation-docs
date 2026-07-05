# Test Meaning Policy Update (2026-07-05)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: 각 repo에 TEST_MEANING_POLICY.md + CLAUDE.md 짧은 pointer.**
> ★문서/guardrail 작업. 코드 수정 0 · 테스트 수정 0 · skip/xfail 0 · snapshot 갱신 0 · 실 secret 0 · prod DB 0 · live 0 · main merge 0.

---

## 1. Files changed
| repo | TEST_MEANING_POLICY.md | CLAUDE.md pointer |
|---|---|---|
| foundation-control | **신규**(docs/testing·12섹션) | **추가** |
| Cosmile | **신규**(docs/testing·12섹션) | **추가**(shadow/m4-cosmile-memory) |
| FOUNDATION | ★**이미 존재**(concurrent 세션·12섹션·scoreboard 원칙) | 이미 있음 |
| SIASIU | ★**이미 존재**(concurrent 세션·12섹션·scoreboard 원칙) | 이미 있음 |
| foundation-docs | mirror(docs/testing) + 본 report | — |
- ★FOUNDATION/SIASIU는 concurrent 세션이 이미 완비 → **중복 생성 안 함**(정직). foundation-control/Cosmile만 신규.

## 2. CLAUDE.md pointer summary
- 테스트/snapshot/assertion/fixture/mock/runner/expected output 변경 전 `docs/testing/TEST_MEANING_POLICY.md` 필독.
- 통과 테스트는 보호 계약/경계/위험 증명 시만 의미. 실패는 고치기 전 해석.
- assertion 약화·skip·snapshot 갱신으로 초록 좇지 않음(계약 변경 설명 없이).
- 보고는 통과/실패/드러난 위험/숨기면 안 되는 것 설명. 불확실하면 STOP·Leo.

## 3. TEST_MEANING_POLICY summary
- **§1 Core principle**: 테스트는 scoreboard 아님·계약/경계/위험 보호 여부 확인.
- **§2 보호 대상**: product/security/privacy/data/API contract·architectural invariant·user behavior·regression workflow·impossible failure mode·operational safety.
- **§3 Passing / §4 Failing**: pass/fail 의미 질문 목록.
- **§5 Failure classification**: REAL_BUG_FOUND·CONTRACT_DRIFT_FOUND·WEAK_TEST_FOUND·MEANINGFUL_FAILURE_KEEP·REQUIRES_ARCHITECTURE_DECISION.
- **§6 Success classification**: MEANINGFUL/WEAK/ACCIDENTAL/OBSOLETE_PASS.
- **§7 Forbidden**: assertion 약화·skip/xfail·snapshot 갱신·기대값만 조작·실패 삭제·약한 테스트 대체·trivial 테스트·숫자만 보고. "Passing by avoiding the problem is failure."
- **§8 기대값 변경 조건 / §9 코드 변경 조건 / §10 stop and ask / §11 보고 format / §12 Final rule**(진실을 보게 하는 테스트만 가치).

## 4. Self-review result
- [x] code changes: 0 · [x] test changes: 0 · [x] skip/xfail added: 0 · [x] snapshots updated: 0
- [x] real secret output: 0 · [x] prod DB/live/main merge: 0
- [x] CLAUDE.md 짧게 유지(pointer만·docs/testing 참조) · [x] docs/testing/TEST_MEANING_POLICY.md 존재(4 repo)
- [x] FOUNDATION/SIASIU 기존 완비 확인·중복 0(정직)

## 5. Commit hash
- (아래 commit 참조): foundation-control·Cosmile·foundation-docs push 결과 포함.

## 무결성
Test Meaning Policy 문서화 only · 코드/테스트/skip/snapshot 수정 0 · 실 secret 0 · prod DB 0 · live 0 · **main merge 0** · CLAUDE.md pointer만(장문 0) · FOUNDATION/SIASIU 기존 완비(중복 0) · foundation-control/Cosmile 신규 · 본 report + mirror만 foundation-docs commit/push.
