# Security / Control Guardrail Update (2026-07-05)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: 보안·secret·customer-memory guardrail 문서화 + CLAUDE.md 짧은 pointer.**
> ★문서/guardrail 작업. 코드 로직 수정 0 · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · main merge 0.
> ★canonical = foundation-control/docs/security/(Control이 CLAUDE.md pointer로 읽음) · mirror = foundation-docs/docs/security/.

---

## 1. Fact
- Control workspace에 보안 guardrail 문서 3종 + CLAUDE.md 짧은 pointer 추가. 상세 규칙은 `docs/security/`로 분리(CLAUDE.md 장문화 0).
- Option B(service-local subject_ref·Foundation contract/gate only) 원칙을 guardrail에 반영. Hard Stop·evidence 정책·Control 전용 규칙 명문화.

## 2. Files changed
| 파일 | 위치 | 성격 |
|---|---|---|
| `SECURITY_AND_SECRET_GUARDRAILS.md` | foundation-control/docs/security/ (+ foundation-docs mirror) | secret 금지 위치·허용/금지 evidence·Foundation boundary·Option B·Hard Stops·self-review |
| `ENV_AND_MIGRATION_POLICY.md` | 〃 | secret=서비스 자산·server migration secret 재사용·rotation·`.env.example` key-only·주입 방식·Option B secret 소유·dev/prod 분리 |
| `CONTROL_SECURITY_REVIEW_POLICY.md` | 〃 | Control 전용 9규칙(실 secret 미취급·prod backfill 승인·self-review·직접 read·drift 정정·local handoff·real vs synthetic·PASS 조작 금지·Hard Stop STOP) |
| `CLAUDE.md` | foundation-control/ | 짧은 "Security and privacy rules" pointer 추가(상세는 docs/security 참조) |
- ★코드 로직 변경 0(문서만). CLAUDE.md는 pointer만(장문 0).

## 3. CLAUDE.md pointer summary
- auth/identity/customer data/memory/subject_ref/secret/env/prod DB/live/hard reject/main merge 전 3문서 필독.
- 실 secret print/commit/log/paste/문서화 0·`.env.example` key-only.
- Foundation = durable memory/broker/service-DB-reader 아님. subject_ref = **Option B service-local**.
- Control은 Leo 승인 없이 real Vault write·prod secret view·prod DB backfill·live·hard reject·main merge 0.
- evidence = boolean/count/status만·raw/PII/id/env dump 금지. 불확실하면 STOP.

## 4. docs/security summary
- **SECURITY_AND_SECRET_GUARDRAILS**: §1 secret 금지 위치(code/git/md/logs/tests/대화) · §2 허용 evidence(boolean/count/status/path/commit/test name) · §3 금지 evidence(real secret·raw hash·customer/order/OAuth/trace id·env dump·DB row dump) · §4 Foundation boundary(durable/broker/DB-reader 아님) · §5 Option B subject_ref · §6 Hard Stops(7종) · §7 self-review.
- **ENV_AND_MIGRATION_POLICY**: secret=서비스 자산·server migration 시 재사용·교체=rotation(service-local)·`.env.example` key-only·Vault/secret manager 주입·Option B(Foundation subject secret 없음·서비스 subject secret 존재)·runner boolean/count·dev/prod 분리.
- **CONTROL_SECURITY_REVIEW_POLICY**: Control 9규칙 + Option B boundary + Control self-review checklist.

## 5. Control-specific policy summary
Control 9규칙: ① 실 secret 미생성/미출력/미커밋/미-vault-write ② prod DB backfill Leo 승인 ③ 보고 secret/PII self-review ④ 새 산출물 직접 read ⑤ Option A drift → Option B supersede ⑥ external/Fable handoff local path only ⑦ real vs synthetic 구분 ⑧ synthetic을 real로 미표현 ⑨ Hard Stop STOP + Leo 요청.

## 6. Self-review result
- [x] 실 secret 값 0 · [x] raw/PII 0 · [x] 코드 로직 변경 0 · [x] prod DB 접근 0 · [x] live/main merge 0
- [x] CLAUDE.md 과도한 장문화 0(pointer만) · [x] docs/security 상세 문서 3종 존재 · [x] Option B 원칙 반영 · [x] self-review 완료

## 7. Remaining hard stops
- real prod secret creation/view/print/**vault write** · prod DB write/backfill · live enable · hard reject activation · main merge/promotion · production secret rotation · cross-service identity linkage = 미수행(Hard Stop).

## 8. Commit hash
- foundation-docs mirror + 본 report: (아래 commit 참조·push 결과 포함).
- canonical(foundation-control/docs/security/·CLAUDE.md): 파일 갱신(foundation-control은 별도 git repo 아님·운영 파일).

## 무결성
guardrail 문서화 only · 코드 로직 0 · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · CLAUDE.md pointer만(장문 0) · Option B 원칙 반영 · docs/security 3종 + report만 foundation-docs commit/push.
