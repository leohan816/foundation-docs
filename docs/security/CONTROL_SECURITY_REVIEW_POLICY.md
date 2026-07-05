# CONTROL SECURITY REVIEW POLICY

> foundation-control(Control) 전용 보안 규칙. Control은 매 identity/memory/secret/prod gate 작업 전 참조.
> 관련: [SECURITY_AND_SECRET_GUARDRAILS.md](SECURITY_AND_SECRET_GUARDRAILS.md) · [ENV_AND_MIGRATION_POLICY.md](ENV_AND_MIGRATION_POLICY.md)

---

## Control 전용 규칙

1. **Control은 실 secret 값을 생성/보관/출력/커밋/Vault write하지 않는다.** 실 secret 취급은 ops/deploy. Control은 boolean/count evidence만 review.

2. **Control은 prod DB write/backfill을 Leo 승인 없이 실행하지 않는다.** prod DB 접근·write·backfill = Hard Stop.

3. **Control은 보고서 작성 시 secret/raw/PII 미포함을 self-review한다.** 커밋/푸시 전 secret·PII·customer id·order id·trace id·full env dump 스캔.

4. **Control은 새 문서/새 파일/새 commit을 보고만 믿지 않고 직접 읽는다.** 산출물이 생기면 실제 파일을 read하여 내용·evidence를 확인.

5. **Control은 Option A 문서 drift를 발견하면 Option B supersede pointer로 정정한다.** 원문 삭제 없이(clean-not-compress) supersede pointer + Option B 정본 연결.

6. **Control은 external/Fable reviewer handoff에서 local filesystem path만 사용한다.** GitHub URL·remote fetch·web link·pasted-summary-only review 금지. HEAD hash는 provenance로만. (ChatGPT/Leo-side verification 보고에는 repo·commit hash·file path 제공.)

7. **Control은 PASS를 만들기 전에 evidence가 real인지 synthetic인지 구분한다.** synthetic dry-run은 harness 작동 확인일 뿐·real ops evidence 아님.

8. **Control은 synthetic verification을 real ops evidence처럼 표현하지 않는다.** real ops evidence 미수신 시 결과 = HOLD/WAITING_FOR_OPS_EVIDENCE (PASS 조작 금지·행동 진실).

9. **Hard Stop에 도달하면 STOP하고 Leo 승인을 요청한다.** (real Vault write·prod DB write/backfill·live enable·hard reject activation·main merge·prod secret rotation·cross-service identity linkage.)

---

## Boundary 재확인 (Option B)
- Foundation = subject_ref format/validation/gate/contract + request-scoped memory_context 판단만. **durable customer memory·broker·service DB reader 아님.**
- subject_ref generation/storage/SubjectRefMap = **service-local**. Foundation secret 없음.

## Control self-review checklist (매 작업 완료 전)
- [ ] 실 secret 값 0 · raw/PII/customer·order·trace id 0 · full env dump 0
- [ ] evidence = boolean/count/status/path/commit/test name만
- [ ] Foundation durable/broker/service-DB-reader 표현 0(부정만)
- [ ] Option B service-local subject_ref 유지
- [ ] real vs synthetic evidence 구분·synthetic을 real로 표현 0
- [ ] 새 산출물 직접 read 확인
- [ ] external/Fable handoff = local path only
- [ ] Hard Stop 미수행·닿으면 STOP + Leo 요청
