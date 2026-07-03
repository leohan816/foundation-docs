# Cosmile Wednesday Vertical Slice — Chat + Recommendation + Safe Purchase Flow — 설계서 — 2026-06-29

> ★design-first 규칙(`CLAUDE.md §2.6`). **설계자료 작성 단계** — 아직 Cosmile 코드는 수정하지 않는다.
> 이 vertical slice는 **버릴 목업이 아니라 실제 제품 구조로 이어질 첫 end-to-end slice**다.
> 상담 채팅 → 상품 판단/추천 → 장바구니 → checkout → purchase complete. 단, 실제 결제/주문/고객 DB write/real memory write는
> 하지 않고 **위험 write boundary만 mock/shadow adapter로 격리**한다.
>
> **변경이력**
> - v1.1 (2026-06-29) — recommendation UX 정책 개정(§11·§13·§14·§20·§25 + JSON): do_not_recommend/do_not_buy를 *무조건 담기 비활성화하지 않는다.* **차단보다 설명·강제보다 경고·판매보다 신뢰·고위험은 확실히 멈춤·저위험/선호불일치는 사용자 선택권 보존.** override 게이트를 `safety_gate_result`로 키잉(block=hard stop, 그 외=확인 모달).
> - v1.0 (2026-06-29) — 최초 설계(APPROVED).

## 1. 목적
- Cosmile에서 **고객 상담 → Foundation 상품 판단 → 추천/비추천/보류 → cart → checkout → purchase complete**까지 한 번에 흐르는 첫 vertical slice를 **실제 제품 아키텍처로** 설계한다.
- 위험한 부분(결제·주문·고객 DB·memory write)은 **interface/adapter boundary 뒤로 격리**하여, 나중에 real backend를 끼울 때 **화면·흐름을 그대로 유지**할 수 있게 한다.

## 2. 왜 "데모 전용"이 아니라 "vertical slice"인지
- **throwaway 데모 금지.** 화면/컴포넌트/도메인 인터페이스는 향후 real cart/checkout/order 연동으로 **확장 가능**하게 만든다.
- mock purchase는 "가짜 완성 화면"이 아니라 **실제 purchase flow의 safe adapter/mock backend**다(같은 인터페이스, 다른 구현).
- 따라서 수요일 이후에도 코드를 버리지 않고, **adapter 교체(mock→real)** 만으로 실제 제품 단계로 진행한다.

## 3. 코파운더에게 보여줄 핵심 메시지
1. "상담이 곧 commerce가 된다" — Foundation 판단이 **추천/비추천/보류/사지마세요**로 화면에 직접 반영.
2. "안전이 먼저다" — 근거 없는 추천 차단, do_not_recommend/do_not_buy를 **숨기지 않고** 보여줌(safety_gate_result 반영).
3. "구조가 실제다" — 결제/주문은 mock이지만 **실제 흐름과 동일한 adapter boundary**라 그대로 제품으로 이어진다.
4. "기억은 경계가 있다" — Foundation memory는 **요약/shadow read만**, Cosmile은 고객 성향을 추출/저장하지 않는다.

## 4. 현재 상태
- foundation-control `main@11093cf` (pushed, in sync). design-first 규칙(§2.6) 발효.
- Cosmile `main@b048e55` — **consultation dev wiring 존재**, commerce signal outbox·vertical slice UI는 **미구현**.
- Foundation `shadow/foundation-shared-memory-v0@b7cce1f` — shared memory v0 shadow(real gate, flag OFF), revalidation **25/25 PASS**(`11093cf`).
- 기존 자산: Cosmile readiness adapter `1ce099e`(164/164) · AI Commerce Decision Loop v0.1(112/112) — **재사용/확장**(삭제·갈아엎기 금지).
- `03f33cb` v0 contract freeze · `76ca035` mock sim 16/16.

## 5. 관련 repo / commit
| repo | ref | 역할 |
|---|---|---|
| Cosmile | `main@b048e55` | vertical slice 구현 대상(이번엔 설계만) |
| Foundation | `shadow/foundation-shared-memory-v0@b7cce1f` | consultation 판단 + memory shadow gate(read-only 소비) |
| SIASIU | `main@d0f8dc3` | 본 slice 직접 미사용(상담 vertical 별개) |
| foundation-control | `main@11093cf` | 설계·계약·검증 |

## 6. 작업 범위
- **이번(설계):** 본 설계서(+JSON)만. Cosmile 코드 변경 0.
- **다음(구현, 별도 승인):** Cosmile repo-local로 §24 phases·§25 prompt에 따라 vertical slice 구현(mock/shadow boundary).

## 7. 하지 않을 것 (이번 vertical slice 전체에서)
- ❌ 실제 결제 · 실제 주문 생성 · 실제 고객 DB write · real payment provider 연동
- ❌ 실고객 memory write · raw 상담 원문 Foundation 저장 · PII 저장/전송
- ❌ production live · Foundation main merge · memory flag default ON
- ❌ **Cosmile에서 customer memory extraction** · Cosmile memory candidate 생성
- ❌ checkout/order/customer DB schema 변경
- (이번 단계는 추가로) Cosmile 코드 수정 자체를 하지 않음(설계만).

## 8. Role boundary
- **Foundation:** 상품 판단(recommend/do_not_recommend/hold/do_not_buy/ask_more) + safety gate + memory shadow gate/store의 **owner**. Cosmile은 이를 **소비만** 한다.
- **Cosmile:** commerce shell. 상담 결과·commerce event signal을 **화면/흐름에 반영**. **고객 성향을 직접 해석해 Foundation memory로 저장하지 않는다**(memory candidate 생성 금지). commerce **signal outbox**만 emit.
- **SIASIU:** 본 slice 미관여(상담 vertical 별개; Cosmile 상담은 Cosmile→Foundation consultation dev wiring).
- **foundation-control:** 계약/설계/검증. 구현은 Cosmile repo-local(승인 후).

## 9. Data boundary
- Foundation으로 가는 데이터: **구조화된 consultation 입력 + distilled commerce signal(요약/범주/hash/refs)** 만. **raw 상담 원문·PII 0.**
- Foundation에서 읽는 데이터: **요약/content_hash/evidence_refs/범주만**(scoped read). 원문 0.
- subject 식별: Foundation `resolve_subject`(salted hash) — **평문 PII 0**. Cosmile은 평문 고객 식별자를 Foundation에 보내지 않는다(opaque local_user_ref).
- mock purchase: **고객 DB·payment·order 영속 저장 0**(in-memory/shadow). **memory.db 0.**

## 10. Safety boundary
- Foundation `decision_type` + `safety_gate_result`(pass/caution/block)가 UI를 **지배**한다. block/do_not_recommend/do_not_buy는 **그대로 노출**(override·은폐 금지).
- 근거 부족(`evidence_mode` ∈ cannot_determine/uncertain) → 추천 대신 **ask_more/hold** 표시.
- memory shadow read는 **flag-gated·summary-only·scoped**. 미동의·만료·삭제 memory는 노출 안 함.
- **write boundary는 fail-closed**: mock adapter는 어떤 경우에도 real write로 승격되지 않는다(별도 flag + 미구현).
- Cosmile은 memory를 추출/저장하지 않는다(role boundary = safety boundary).

## 11. 화면 흐름 (screen flow)
```
[Chat] ─질문→ [Consultation Result + Decision Badge]
   │                         │ recommend / ask_more / hold / do_not_recommend / do_not_buy
   ▼                         ▼
[Recommendation Cards] ──담기──▶ [Cart] ──checkout──▶ [Checkout(mock)] ──pay(mock)──▶ [Purchase Complete(mock)]
   ├ recommend            : "담기" 활성(기본 CTA)
   ├ hold/ask_more/cannot : "추가 확인 필요"/"정보 부족" · "상담 계속" 우선 · 담기는 *약하게*(부차) — 강한 구매유도 ❌
   ├ do_not_recommend     : 경고색 카드 + 이유 명확 · 기본 CTA "다른 제품 보기"/"상담 계속하기"
   │                        · "그래도 담기" 가능 → **확인 모달**(이유·주의사항·대안 안내) 후 담기
   └ do_not_buy           : 더 강한 경고 "구매를 권하지 않습니다" + 이유 · 기본 CTA 대안/상담 계속
                            · safety_gate_result=block(의료/임신/이상반응/금기/고위험) → **담기·checkout 차단(override ❌, hard stop)**
                            · 비-block(단순 부적합/선호 불일치) → **확인 모달**로 사용자 선택권 보존(별도 confirm 정책)
   (상단 상시: dev/staging banner — "SHADOW · mock purchase · no real write")
```
- **핵심 원칙: 차단보다 설명 · 강제보다 경고 · 판매보다 신뢰 · 고위험은 확실히 멈춤 · 저위험/선호 불일치는 사용자 선택권 보존.**
- 모든 화면 상단에 **dev/staging indicator**. do_not_recommend/do_not_buy도 **무조건 담기 비활성화하지 않는다** — 이유·주의·대안을 충분히 보여주고, **고위험(safety block)만 hard stop**, 그 외엔 **확인 모달**로 사용자가 선택하게 한다(은폐·강제 금지).

## 12. 상담 채팅 흐름 (consultation chat)
1. 고객이 질문 입력 → Cosmile consultation client가 **Foundation consultation(dev wiring)** 호출.
2. Foundation 응답: `decision_type`·`evidence_mode`·`safety_gate_result`·`reason_codes`·`trace_id`(+ 답변 텍스트).
3. Cosmile은 답변 + **decision badge**를 표시. raw 원문/PII는 Foundation에 저장하지 않음(요청은 dev wiring 경유, write 0).
4. `ask_more`면 추가 질문 유도, `cannot_determine`이면 단정 금지 문구.

## 13. 상품 추천/비추천/보류 판단 흐름 (★graded UX — 차단보다 설명)
Foundation `judge_product`/`recommend_or_hold`/`do_not_buy_decision` 결과를 카드/배지로 매핑한다. **무조건 담기 비활성화하지 않고**, 위험도에 따라 *설명·경고·선택권*을 차등한다.

| decision_type | UI | 기본 CTA | 담기 |
|---|---|---|---|
| `recommend` | 일반 추천 카드 | **담기** | 활성 (단, evidence_mode=grounded ∧ safety=pass일 때만) |
| `hold` / `ask_more` / `cannot_determine` | "추가 확인 필요"/"정보가 부족해요" | **상담 계속하기** | *약하게*(부차 버튼) — 강한 구매유도 ❌ |
| `do_not_recommend` | 경고색 카드 + **이유 명확** + 대안 | **다른 제품 보기**/**상담 계속하기** | 기본 비활성, **"그래도 담기" → 확인 모달**(이유·주의·대안) 후 허용 |
| `do_not_buy` (비-block) | 더 강한 경고 "구매를 권하지 않습니다" + 이유 | **대안/상담 계속** | 기본 비활성, **확인 모달**로 선택권 보존(별도 confirm 정책) |
| `do_not_buy` + `safety_gate_result=block` | 고위험(의료/임신/이상반응/금기) 경고 | **상담 계속/전문가 안내** | **담기·checkout 차단(override ❌ · hard stop)** |

- **override 게이트 = `safety_gate_result`.** `block` → 강제 멈춤(사용자도 우회 불가). `caution`/`pass` → 확인 모달로 사용자 선택 보존.
- `do_not_recommend` vs `do_not_buy` 차이: **do_not_buy가 더 강한 경고**(구매 비권유를 전면에)이고, do_not_buy + safety block은 **유일한 hard stop**. do_not_recommend·비-block do_not_buy는 *설명 후 사용자 선택* 보존.
- `safety_gate_result`·이유·주의는 **은폐 금지**(override 시에도 모달에 그대로 표기).
- 기존 **readiness adapter `1ce099e`·Decision Loop v0.1** 출력 스키마(`decision_type`/`evidence_mode`/`safety_gate_result`/`memory_reuse_decision`/`reason_codes`/`trace_id`)를 **재사용**.

## 14. cart / checkout / purchase complete 흐름
- **Cart:** `recommend`는 바로 담기. `do_not_recommend`/`do_not_buy`(비-block)는 **"그래도 담기" 확인 모달**을 통과해야 담긴다(이유·주의·대안 표시 후 사용자 동의). `hold`/`ask_more`는 약한 담기(상담 계속 우선). in-memory cart state(영속 0). 수량/삭제 UI.
  - ★**override 게이트(=safety_gate_result):** `block`이면 담기·checkout **차단(hard stop, 우회 불가)**. `caution`/`pass`이면 확인 모달로 사용자 선택 보존.
  - cart에 담긴 항목은 **decision snapshot**(decision_type·safety_gate_result·override_consented)을 함께 보관 → checkout에서 block 항목 재검증(있으면 차단).
- **Checkout(mock):** 진입 시 cart 내 **safety block 항목 재검증**(있으면 checkout 차단·사유 노출). 주소/결제수단 **입력 폼은 UI만**(저장·전송 0 / PII 미보관). `PurchaseGateway.createOrder(cart)` 호출.
- **Purchase complete(mock):** `PurchaseGateway.pay(order)` → 결정론적 성공 응답(가짜 화면 아님 — 실제 흐름의 mock backend). 주문번호는 mock id. **실 주문/결제/DB write 0.**
- 각 단계는 **interface 호출**(아래 §단 boundary)이므로 real adapter로 교체 시 화면 불변.

### Adapter / write boundary (핵심 — 교체 지점 명확화)
| interface (불변) | mock/shadow 구현(이번) | 향후 real 구현(미구현) |
|---|---|---|
| `PurchaseGateway.createOrder/pay` | `MockPurchaseAdapter`(in-memory, 성공 결정론) | `RealOrderAdapter`(payment provider + order DB) |
| `OrderRepository` | `InMemoryOrderRepo`(휘발성) | `SqlOrderRepo` |
| `CustomerRepository` | `NoopCustomerRepo`(write 무시) | `RealCustomerRepo` |
| `CommerceSignalOutbox.emit` | `FoundationShadowSignalOutbox`(→ `ingest_event_signal`, shadow) | 동일 인터페이스, real 환경 |
| `MemoryReadPort.readSummary` | `FoundationShadowMemoryRead`(scoped, summary) | 동일(권한·consent 강화) |
> **real write가 필요한 모든 위치 = 위 interface 뒤.** 교체는 DI 바인딩/flag 한 곳에서. 화면·흐름 코드는 interface만 의존.

## 15. Foundation consultation/dev wiring 사용 방식
- Cosmile consultation client → Foundation consultation(dev wiring, `b048e55` 기존) → decision 스키마 수신. **read-only 소비**, write/live 0.
- 호출 trace에 raw query/PII 미저장. dev/shadow 모드.

## 16. Foundation memory shadow 사용 방식
- **읽기 전용 표시만.** `MemoryReadPort.readSummary(subject_ref, scope)` → Foundation `read_memory`(shadow, **summary/hash/refs/범주만**).
- flag `foundation_memory_shadow_read_enabled`(default OFF). 미동의/만료/삭제 memory 미노출. **Cosmile은 memory write/extraction 0.**
- subject_ref는 Foundation `resolve_subject` 발급(평문 PII 0).

## 17. SIASIU candidate 사용 여부
- **사용하지 않음.** SIASIU candidate adapter(`d0f8dc3`)는 상담 vertical용. Cosmile slice는 Cosmile 상담 dev wiring을 쓴다.
- cross-vertical 기억이 필요해도 Cosmile은 **Foundation `read_memory`(shadow, 요약)** 만 소비. candidate 생성/추출 0.

## 18. Cosmile commerce signal/outbox와의 관계
- Cosmile은 cart/purchase 등 commerce event를 **`PlatformEventSignal`**(`event_kind`·aggregate·`interprets_customer=false`·`memory_candidate=false`)로 **signal outbox**를 통해 Foundation `ingest_event_signal`(shadow)로 보낼 수 있다.
- **signal ≠ memory.** Foundation이 memory 도출 여부를 별도 gate로 결정(v0 미도출). Cosmile은 signal만 emit, 해석/저장 0.
- 이 outbox는 `IMPL_PROMPT_COSMILE_MEMORY_V0`(role-corrected) 기준이며, vertical slice의 `CommerceSignalOutbox` interface로 통합.

## 19. Feature flag
| flag | default | 역할 |
|---|---|---|
| `cosmile_vertical_slice_enabled` | **OFF** | slice 전체 게이트 |
| `cosmile_purchase_backend` | `"mock"` | mock/real 선택(real 미구현) |
| `foundation_memory_shadow_read_enabled` | **OFF** | 요약 memory read 표시 |
| `shared_memory_v0_shadow` (Foundation) | **OFF** | Foundation memory shadow |
| `COSMILE_ENV` | `dev` | dev/staging banner |
- flag OFF면 기존 Cosmile 동작 100% 동일(safe-additive).

## 20. Test plan
- **UI/flow:** chat→decision badge→cards→cart→checkout→purchase complete 각 화면 렌더 + 전이 테스트.
- **decision 매핑(graded UX):**
  - `recommend`(+grounded+pass) → 담기 **활성**.
  - `hold`/`ask_more`/`cannot_determine` → 약한 담기/상담 계속 우선, **강한 구매유도 0**.
  - `do_not_recommend` → 경고 카드+이유, 기본 담기 비활성, **"그래도 담기"→확인 모달**(이유·주의·대안) 동의 후 담기 가능.
  - `do_not_buy`(비-block) → 더 강한 경고+이유, **확인 모달** 통과 시 담기 가능.
  - `do_not_buy` + `safety_gate_result=block` → **담기·checkout 차단(override 불가, hard stop, 모달도 없음)**.
- **override 게이트(=safety_gate_result):** `block`=우회 0 · `caution`/`pass`=모달 동의 후 허용. 모달에 이유·주의·대안 표시(**은폐 0**).
- **boundary:** `MockPurchaseAdapter` real write 0(OrderRepo/CustomerRepo no persistence). `cosmile_purchase_backend=real` 미구현→차단.
- **memory/signal:** `read_memory` summary-only·scoped, 미동의/만료/삭제 미노출. signal `stored_as_memory=false`.
- **safety(불변):** safety `block`은 절대 override 불가 · evidence 부족 시 **기본 담기 활성(직접 추천) 금지** · `safety_gate_result`/이유 은폐 0.
- control-side: foundation-control이 mock backend + Foundation shadow를 묶은 e2e 시나리오로 검증(별도 harness).

## 21. Regression plan
- 기존 보존: Cosmile readiness **164/164** · Decision Loop v0.1 **112/112** · Foundation runner **89/89** · SIASIU **39/39+119/119** · Cosmile loop e2e · **answer.py fingerprint `d7f579443f8a110a` 불변**.
- vertical slice는 **additive**(flag OFF면 기존 동작 불변) → 기존 regression 변경/삭제 0.

## 22. Fallback plan
- Foundation consultation 호출 실패 → Cosmile은 **안전 fallback 문구**(단정 금지·재시도 안내), 추천 카드 미표시.
- memory shadow read 실패/flag OFF → **memory 영역 숨김**(없는 듯 동작, 흐름 유지).
- signal outbox 실패 → 화면 흐름은 계속(신호는 best-effort, 사용자 경험 차단 안 함).
- mock purchase 실패 → checkout 단계에서 **명확한 오류 + 재시도**, 주문 미생성.

## 23. Rollback plan
- vertical slice는 **flag 게이트 + 신규 모듈**: `cosmile_vertical_slice_enabled=OFF`로 즉시 비활성(런타임 롤백).
- 코드 롤백: 해당 Cosmile 커밋 normal revert(기존 파일 수정 최소화·신규 파일 위주 설계 → revert 안전). 기존 readiness/loop 자산은 **건드리지 않으므로** 영향 0.
- foundation-control 설계 문서 롤백은 해당 커밋 revert.

## 24. Implementation phases (다음, 승인 후 Cosmile repo-local)
- **P0(완료):** 본 설계서 APPROVED.
- **P1:** boundary 인터페이스 정의(`PurchaseGateway`/`OrderRepository`/`CustomerRepository`/`CommerceSignalOutbox`/`MemoryReadPort`) + mock/shadow 구현. flag 도입(전부 OFF).
- **P2:** consultation chat 화면 + Foundation dev wiring 연결(decision badge).
- **P3:** recommendation cards + decision 매핑(담기 활/비활).
- **P4:** cart → checkout(mock) → purchase complete(mock) — MockPurchaseAdapter.
- **P5:** memory shadow read 표시(요약, flag OFF default) + commerce signal outbox emit(shadow).
- **P6:** dev/staging banner + test(§20) + control e2e regression(§21).

## 25. Implementation prompt for Cosmile (초안)
> **작업명: Cosmile Vertical Slice v0 (shadow/mock) — repo-local 구현**
> 전제: 본 설계서(APPROVED) 기준. Cosmile repo-local only. dev/shadow·flag default OFF·Leo 승인.
> 구현:
> 1. 도메인 boundary 인터페이스 + mock/shadow 구현(§14 표). **real write 절대 없음**(OrderRepo/CustomerRepo no persistence).
> 2. consultation chat → Foundation consultation dev wiring → decision badge(§12·§13). raw/PII Foundation 저장 0.
> 3. recommendation cards(**graded UX**, §13 표) → cart → checkout(mock) → purchase complete(mock). 가짜 화면 아님 = MockPurchaseAdapter.
>    - recommend=담기 활성 · hold/ask_more/cannot=약한 담기+상담 계속(강한 구매유도 ❌).
>    - do_not_recommend/do_not_buy(비-block)=**무조건 비활성화 금지** → 경고 카드+이유+대안, **"그래도 담기"→확인 모달**(이유·주의·대안) 후 담기.
>    - **do_not_buy + safety_gate_result=block(고위험)=담기·checkout hard stop(override 불가)**. override 게이트는 safety_gate_result로 키잉. 이유/safety 은폐 0.
> 4. memory shadow **read만**(요약/scoped, flag OFF) — **memory write/extraction/candidate 생성 0**(role boundary).
> 5. commerce signal outbox emit(`PlatformEventSignal`, `interprets_customer=false`·`memory_candidate=false`) → Foundation `ingest_event_signal`(shadow).
> 6. flag(§19) 전부 default OFF · dev/staging banner · test(§20).
> **금지:** 실 결제/주문/고객 DB write · real payment provider · memory write · raw/PII Foundation 저장 · schema 변경 · Foundation main merge · production live · 기존 readiness/loop 자산 갈아엎기.
> **검증:** flag OFF시 기존 동작 불변 · mock purchase real write 0 · memory write 0 · 기존 regression(readiness 164·loop 112) 유지 · answer.py fingerprint 불변 · secret/PII 0.
> **완료 후:** foundation-control이 control e2e regression으로 정합 검증.
