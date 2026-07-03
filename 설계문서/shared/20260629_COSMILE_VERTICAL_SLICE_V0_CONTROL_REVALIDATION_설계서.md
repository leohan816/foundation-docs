# Cosmile Vertical Slice v0 — Control Revalidation (UX v1.1 + 100 Loop) — 설계서 — 2026-06-29

> ★design-first(`CLAUDE.md §2.6`). **이 설계서 APPROVED 후에만** revalidation 실행.
> Cosmile `5439c4e`의 Vertical Slice v0(UX v1.1) 구현을 foundation-control에서 **독립 재검증**한다(제품 repo 무수정).
> 검증이지 구현이 아니다. real write 0 · memory write 0 · raw/PII 0 · production OFF · push 0.

## 1. 목적
- Cosmile `5439c4e`(Chat→Recommendation UX v1.1→Cart→Checkout(mock)→Purchase Complete(mock)→Memory Shadow Read→Commerce Signal Outbox)를 control tower가 **독립적으로** 검증한다.
- 설계서 v1.1(graded UX) 정합, **real write 0**, role/data/safety boundary, 100-loop 불변식, 기존 regression 보존을 증거로 확인하고 **수요일 데모 가능 여부 + push 가능 여부**를 판정한다.

## 2. 현재 상태
- Cosmile `main@5439c4e` (dirty=1 = pre-existing `app/next.config.ts`, 본 작업 무관). slice 구현은 **순수 additive 17파일(+1003), 기존 파일 수정 0**.
- 구조: `lib/slice/{ports,mockAdapters,decisionMapping,flags,container}.ts` + `api/slice/{consult,memory,purchase,signal}/route.ts` + `components/slice/*` + `app/slice/page.tsx` + `scripts/vertical-slice-v0-loop100.mjs`.
- foundation-control `main@00185c7`. 설계서 UX v1.1 반영본 존재(`bf0023e` 계열). Foundation `b7cce1f` real gate revalidation **25/25 PASS**. answer.py fingerprint `d7f579443f8a110a`.
- 정적 인벤토리(read-only) 확인: decisionMapping(block=hardStop·override 게이트=safety_gate_result), mockAdapters(durableWriteCount=0·realWritePerformed=false·no prisma/DB/network), flags(default OFF + `NODE_ENV==production`이면 OFF), purchase route(서버측 hard-stop/consent 재검증), signal route(서버가 memory 플래그 false 강제).

## 3. 관련 repo / commit
| repo | ref | 본 작업에서 |
|---|---|---|
| Cosmile | `main@5439c4e` | 검증 대상(read-only) |
| Foundation | `shadow/foundation-shared-memory-v0@b7cce1f` | memory shadow(소비, 무수정) |
| SIASIU | `main@d0f8dc3` | regression baseline(무수정) |
| foundation-control | `main@00185c7` | 검증 주체·산출물 커밋 |

## 4. 작업 범위
1. 본 설계서(+JSON) → APPROVED.
2. 정적 검증(boundary/role/UX v1.1) + TypeScript build/typecheck + **loop100 독립 재실행** + 기존 cross-project regression.
3. reports(MD+JSON) + foundation-control 설계자료/reports 커밋(push 별도).

## 5. 하지 않을 것
- ❌ Cosmile/Foundation/SIASIU 코드 수정 · Foundation main merge.
- ❌ 실 결제/주문/고객 DB write · real memory write · raw 상담 원문 Foundation 저장 · PII 저장/전송.
- ❌ production live · push · force push.

## 6. Role boundary
- foundation-control = **독립 검증자**(read-only import/실행). Cosmile = 검증 대상. Foundation = memory/판단 owner(소비만).
- 확인 대상 role 불변식: **Cosmile은 memory 추출/candidate 생성 0**, commerce **signal만** emit(`interpretsCustomer=false`·`memoryCandidate=false`).

## 7. Data boundary
- 검증은 **synthetic fixture만**(loop100의 `resp()` synthetic, 실 PII 0). Foundation에 raw/PII 전송 0.
- memory read는 **summary/hash/refs만**(`rawTextIncluded=false`). report/trace에 raw/PII 0(스캔으로 확인).

## 8. Safety boundary
- `safety_gate_result=block` → **hard stop**(담기/checkout 차단, override 0) — UI(decisionMapping)와 **서버(purchase route) 양쪽**에서 강제. 은폐 0(showSafety).
- do_not_recommend/비-block do_not_buy → **confirm 모달 동의 필요**(서버 재검증). evidence 부족 → direct 추천 금지(weak/hold).
- mock adapter는 어떤 경로로도 real write로 승격 불가(container fail-closed).

## 9. UX v1.1 검증 기준
- `mapDecisionToView`: block→`addPolicy=blocked`/`hardStop=true`(decision_type 무관) · recommend+grounded+pass→`direct` · do_not_*→`confirm` · 그 외→`weak`. recommend인데 근거부족→`hold`.
- 서버 purchase route: block 라인 → 409 hard-stop(동의해도 차단) · do_not_* 미동의 → 409 consent 필요.
- 은폐 0: safety=block/caution이면 `showSafety=true`, 이유(reasons) 노출.

## 10. mock purchase 검증 기준
- `MockPurchaseAdapter.createOrder/pay`: `realWritePerformed=false`·`writePerformed=false`·`appliedToRealUser=false`·`isMock=true`.
- `InMemoryOrderRepo.durableWriteCount()===0` · `NoopCustomerRepo.durableWriteCount()===0`.
- `purchaseBackend()==="real"` → container **throw**(fail-closed). 실 order/payment/customer DB write 0 · schema 변경 0.

## 11. memory shadow read 검증 기준
- `FoundationShadowMemoryRead.readSummary`: `rawTextIncluded=false`·summary/hash/refs 배열·`source=foundation_shadow`·default `available=false`(미동의/만료/삭제 미노출).
- **memory write/extraction/candidate 생성 0**(read-only port만 존재).

## 12. commerce signal outbox 검증 기준
- `FoundationShadowSignalOutbox.emit`: `storedAsMemory=false`. signal route가 `interpretsCustomer/memoryCandidate/storedAsMemory=false`를 **서버에서 강제**. tampered(메모리인 척) signal → `accepted=false` 거부.
- aggregate 범주만(raw/PII 0). signal ≠ memory.

## 13. Test plan
1. **정적 검증:** 위 §9–§12 코드 불변식 read-only 확인(완료).
2. **build/typecheck:** Cosmile TypeScript 빌드 또는 `tsc --noEmit`(가능 시). 불가 시 사유 명시 + 정적 검증으로 대체.
3. **loop100 독립 재실행:** `node app/scripts/vertical-slice-v0-loop100.mjs` → 8 시나리오×100, 불변식 PASS.
4. **9 필수 시나리오 매핑:** recommend / do_not_recommend+confirm / do_not_buy caution+confirm / do_not_buy block hard-stop / hold·ask_more / Foundation failure fallback / memory read OFF·ON / signal failure·tamper / pregnancy block.
5. **per-loop 불변식:** no real order/payment/customer DB write · no memory write · no raw/PII · no production live · UI state consistent · safety 은폐 0 · do_not_buy block override 0.

## 14. Regression plan (기존 보존)
- Cosmile readiness **164/164** · Decision Loop v0.1 **112/112** · Foundation runner **89/89** · SIASIU integration **39/39** · workflow **119/119** · control loop tests **23/23** · **answer.py fingerprint `d7f579443f8a110a` 불변**.
- slice는 additive(flag OFF면 기존 동작 불변) → 기존 테스트 변경/삭제 0.

## 15. Rollback plan
- 본 train은 **문서/리포트만 추가** → 해당 foundation-control 커밋 revert로 충분. 제품 repo 영향 0.
- (Cosmile 측 rollback은 별개: slice는 flag OFF로 런타임 비활성 + 신규 모듈 revert — 본 검증 결과로 권고만, 실행 안 함.)

## 16. 승인 조건
- 설계서 16섹션 존재 · JSON valid · 제품 repo 변경 0 · secret/PII 0.
- ★승인 근거: **Leo go-ahead 2026-06-29 (본 작업 지시)** = APPROVED. 실행은 본 설계 검증 통과 후 진행.
