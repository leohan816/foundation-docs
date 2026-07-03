# Architecture Constitution — Preservation Plan (보존 운영 설계) · 2026-06-30

> 작성: 샤슈(SIASIU) · ★이번 미션 = *초안만*. 실제 repo 파일/CLAUDE.md 수정 0 · 코드 수정 0.
> 기준: `/home/leo/Project/SIASIU/설계문서/`의 FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md · SIASIU_COSMILE_RUNTIME_BRAIN_AUDIT_20260630.md · ROUTING_02_REVIEW_FINDINGS_20260630.md

---

## 1. 목적
- Architecture Constitution(역할 경계 헌법)을 **모든 구성원(각 repo의 Claude/컨트롤/샤슈)이 잊지 않도록 보존**.
- **모든 미션/리뷰/구현 *전에* 역할 경계를 확인**하게 만든다("이 변경이 경계를 넘나?"를 첫 체크로).
- 각 repo의 `CLAUDE.md`에 **핵심 규칙을 삽입**하는 계획을 세운다(세션마다 자동 로드되어 강제됨).
- ★공통 헌법을 *그대로 복붙하지 않는다* — repo마다 역할이 다르므로 *역할 맞춤 요약*을 둔다.

## 2. 공통 원칙 (모든 repo 동일)
- **Service owns**: input understanding · output voice · service data · service actions.
- **Foundation owns**: search · ingredient/product judgment · safety · evidence · reasoning · decision · verify/repair · trace/eval.
- **Full semantic is the north star** (keyword mapping은 다국어/자연어 채팅을 감당 못 함).
- **LLM may understand and massage, but Foundation owns decision/safety/evidence.**
- **Safety cannot be lowered by service semantic or output adapter** (risk는 올림만·MAX·fail-closed floor).

---

## 3. Foundation용 요약 초안
**대상 파일**: `/home/leo/Project/foundation-control/ARCHITECTURE_CONSTITUTION.md` (신규) · `/home/leo/Project/foundation-control/CLAUDE.md` 삽입

### 3-A. `foundation-control/ARCHITECTURE_CONSTITUTION.md` 초안 내용
```markdown
# Foundation — Architecture Constitution (역할 요약)
> 전체 헌법: /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md

## Foundation의 역할
- Common Brain — 전 서비스(Shashu/Cosmile)가 *같은 contract*로 호출하는 공통 판단 코어.
- Service-facing contract owner — Foundation Semantic Contract(in) / Foundation Response Contract(out) 소유.
- decision / safety / evidence owner — decision_type·safety_gate_result·evidence는 Foundation이 정한다.
- request-level stateless reasoning. canonical registry(ingredient/product core/brand/claim/safety metadata) 소유 가능.

## Foundation이 하면 안 되는 것
- ❌ service voice(persona/tone/CTA/localized copy) 작성 — 그건 서비스 Response AI Adapter.
- ❌ core 안에 service-owned data(price/stock/cart/order/customer memory) 박기 — 주입만.
- ❌ 최종 고객 메시지 직접 작성 — answer_substance(판단 substance)만 만든다.
- ❌ 플랫폼별 판단 코어를 서비스마다 복붙/재구현.

## Safety (1급)
- safety = MAX(service semantic, Foundation guard, product/ingredient policy). semantic은 올림만.
- 현재 semantic risk MAX는 gap-only(ROUTING-01B) → safety-MAX-always는 ROUTING-03에서 완성.
- LLM이 유일 안전 게이트가 되면 안 됨(규칙 fail-closed 백업 유지).
```

### 3-B. `foundation-control/CLAUDE.md` 삽입 문구 (§7 참조)

---

## 4. Shashu용 요약 초안
**대상 파일**: `/home/leo/Project/SIASIU/설계문서/SHASHU_ARCHITECTURE_CONSTITUTION_SUMMARY.md` (신규) · `/home/leo/Project/SIASIU/CLAUDE.md` 삽입

### 4-A. `SHASHU_ARCHITECTURE_CONSTITUTION_SUMMARY.md` 초안 내용
```markdown
# Shashu(SIASIU) — Architecture Constitution (역할 요약)
> 전체 헌법: /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md

## Shashu의 역할
- Shashu Semantic AI Adapter — 피부/성분 도메인으로 고객 발화를 이해 → Foundation Semantic Contract 작성.
- Shashu Response AI Adapter — Foundation Response Contract를 따뜻한 상담사 문장·언어로 마사지.
- service data: memory.db(고객 사실)·session facts는 Shashu 소유.

## 현재 상태 → 목표
- 현재: brain.chat이 understanding+reasoning+voice가 뭉친 원본 monolith.
- 목표: Semantic AI Adapter / Foundation Common Brain / Response AI Adapter로 lift-and-split.
  (Foundation으로 이식해온 회로 = 이 split의 가운데 조각)

## Shashu가 하면 안 되는 것
- ❌ Foundation decision/safety/evidence 전복.
- ❌ 판단 코어(검색/성분/안전)를 Shashu 안에서 재구현(→ Foundation 호출).
- ❌ Shashu voice/memory를 Foundation core에 박기(service-owned).
```

### 4-B. `SIASIU/CLAUDE.md` 삽입 문구 (§7 참조)

---

## 5. Cosmile용 요약 초안
**대상 파일**: `/home/leo/Project/Cosmile/ARCHITECTURE_CONSTITUTION.md` (신규) · `/home/leo/Project/Cosmile/CLAUDE.md` 삽입

### 5-A. `Cosmile/ARCHITECTURE_CONSTITUTION.md` 초안 내용
```markdown
# Cosmile — Architecture Constitution (역할 요약)
> 전체 헌법: /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md

## Cosmile의 역할
- Commerce Service Semantic AI Adapter — 커머스 포함 도메인으로 고객 발화 이해 → Foundation Semantic Contract.
- Commerce Response AI Adapter — Foundation Response Contract를 커머스 문장·상품 카드·CTA·주의문구로 마사지.
- Commerce Data provider(★AI 아님): 카탈로그·가격·재고·장바구니·주문·배송 상태 제공.

## 현재 상태 → 목표
- 현재: MOCK BRAIN (ShadowBanner "SHADOW · mock purchase · no real write" · real brain 미연결).
- 목표: mockBrain → Foundation real brain contract 연결(COSMILE-CONNECT: read-only/shadow부터).

## Cosmile이 하면 안 되는 것
- ❌ Foundation decision/safety/evidence 전복.
- ❌ 제품명/효능/안전 claim 임의 생성(근거는 Foundation evidence 안에서만).
- ❌ Commerce Data(가격/재고)로 Foundation 판단을 대체.
```

### 5-B. `Cosmile/CLAUDE.md` 삽입 문구 (§7 참조)

---

## 6. CLAUDE.md 공통 삽입 블록 (3 repo 동일 헤더)
```markdown
## Architecture Constitution (역할 경계 — 모든 미션 전 확인)
전체 헌법: /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md
- Service = 입력 이해 · 출력 목소리 · service data · service actions.
- Foundation = 검색·성분/제품/안전 판단·evidence·reasoning·decision·verify.
- LLM은 이해/마사지 담당, Foundation은 decision/safety/evidence 담당.
- ★Safety는 service semantic/output adapter가 낮출 수 없다(MAX·fail-closed).
- ★모든 변경 전 "이게 역할 경계를 넘나?"를 먼저 확인한다.
```

## 7. CLAUDE.md repo별 삽입 블록 (공통 블록 + 아래 repo별 1줄)
**Foundation (`foundation-control/CLAUDE.md`)**
```markdown
### 이 repo = Foundation Common Brain
- decision/safety/evidence/contract 소유. service voice·price/stock/cart/order/customer memory를 core에 넣지 않는다.
- 참조: foundation-control/ARCHITECTURE_CONSTITUTION.md
```
**Shashu (`SIASIU/CLAUDE.md`)**
```markdown
### 이 repo = Shashu Service Adapter(+ 원본 brain monolith)
- Semantic/Response AI Adapter 소유. brain.chat monolith → Foundation core로 lift-and-split.
- Foundation decision/safety/evidence 전복 금지. Shashu voice/memory는 service-owned.
- 참조: SIASIU/설계문서/SHASHU_ARCHITECTURE_CONSTITUTION_SUMMARY.md
```
**Cosmile (`Cosmile/CLAUDE.md`)**
```markdown
### 이 repo = Cosmile Commerce Service Adapter (현재 MOCK BRAIN)
- Semantic/Response AI Adapter + Commerce Data provider. 목표 = Foundation real brain 연결.
- Foundation decision/safety/evidence 전복 금지. 제품명/claim 임의 생성 금지.
- 참조: Cosmile/ARCHITECTURE_CONSTITUTION.md
```

## 8. 적용 순서
1. **이번**: 위 초안(§3~7) 작성 = *문서만*. (완료 시점)
2. **Leo 승인**.
3. **별도 미션(PRESERVE-APPLY)**: 승인 후 각 repo에 실제 파일 추가 + CLAUDE.md 수정.
   - ★각 repo 수정 *전* `git status` 확인(기존 WIP 보호 — 특히 Cosmile은 미커밋 7건 존재).
   - repo별 순서: foundation-control → SIASIU → Cosmile.
   - CLAUDE.md는 *삽입*(기존 내용 보존·append), 덮어쓰기 금지.
4. **검증**: 각 CLAUDE.md에 블록이 들어갔는지 + 참조 파일 경로 유효한지.

## 9. 금지 (이번 미션)
- ❌ 실제 repo 파일 수정 · ❌ CLAUDE.md 직접 수정 · ❌ 코드 수정.
- ❌ 각 repo에 파일 추가(그건 PRESERVE-APPLY 미션·Leo 승인 후).
- ✅ 이번 산출물 = *이 preservation plan 문서 하나*(초안 포함).

---

## 한계 / 주의
- 이 문서는 보존 *계획 + 초안* — 실제 배치는 별도 승인 미션.
- Cosmile repo는 미커밋 WIP 있음 → PRESERVE-APPLY 시 git status 먼저.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Foundation/foundation-control/Cosmile 무수정(이 문서 저장 외).
