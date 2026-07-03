# PRESERVE-APPLY-01 — Architecture Constitution 배치 · 지시문 초안

> 작성: 샤슈(SIASIU) · ★구현 지시문 *초안* (Leo 승인 후 발송) · 이번 미션 = 초안만·코드/repo/CLAUDE.md 수정 0
> 기준: `/home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_PRESERVATION_PLAN_20260630.md` (ACCEPTED) · `.../FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md`
> 성격: **문서 추가 + CLAUDE.md append 전용.** 코드/routing/brain/mockBrain 일절 미접촉.

---

## 지시문 (control용)

```
[PRESERVE-APPLY-01] Architecture Constitution 요약 파일 배치 + CLAUDE.md 경계 블록 append

목표:
3개 repo에 Architecture Constitution 요약 파일을 추가하고, 각 CLAUDE.md에 역할 경계 블록을 append하여
모든 작업 세션이 헌법을 자동 참조하게 한다. ★코드/routing/brain/mockBrain 수정 0.

대상 repo: /home/leo/Project/foundation-control · /home/leo/Project/SIASIU · /home/leo/Project/Cosmile

기준 문서:
- /home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_PRESERVATION_PLAN_20260630.md
- /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md

── STEP 0. 수정 전 git status 확인 (필수·먼저) ──
- git -C /home/leo/Project/foundation-control status --porcelain
- git -C /home/leo/Project/SIASIU status --porcelain
- git -C /home/leo/Project/Cosmile status --porcelain
- ★Cosmile은 기존 미커밋 WIP 7건 존재 → 그 파일들 절대 미접촉. 이번 미션 대상 2개 파일(ARCHITECTURE_CONSTITUTION.md 신규 · CLAUDE.md append)만 건드린다.
- WIP 파일과 이번 대상이 겹치면 STOP 후 보고.

── STEP 1. 생성할 파일 3개 (신규·아래 내용 그대로) ──
1) /home/leo/Project/foundation-control/ARCHITECTURE_CONSTITUTION.md   ← §A 내용
2) /home/leo/Project/SIASIU/설계문서/SHASHU_ARCHITECTURE_CONSTITUTION_SUMMARY.md   ← §B 내용
3) /home/leo/Project/Cosmile/ARCHITECTURE_CONSTITUTION.md   ← §C 내용
- 파일이 이미 존재하면 덮어쓰지 말고 STOP 후 보고(내용 비교).

── STEP 2. CLAUDE.md append 3개 (기존 내용 보존·덮어쓰기 금지) ──
대상: foundation-control/CLAUDE.md · SIASIU/CLAUDE.md · Cosmile/CLAUDE.md
- 각 파일 *끝에* [공통 블록(§D)] + [repo별 블록(§E)] 을 append.
- ★이미 "## Architecture Constitution" 블록이 있으면 *중복 삽입 금지* → 그 repo는 skip하고 보고.
- CLAUDE.md가 없는 repo면 신규 생성(헤더 + 블록).

── CLAUDE.md 수정 규칙 ──
- 기존 내용 100% 보존 · 덮어쓰기 금지 · append만.
- 중복 블록 감지 시 삽입 안 함·보고.

── 금지 ──
- 코드 수정 · routing/core/brain/mockBrain 수정 · 기존 WIP 수정 · v1 완료/PASS 선언 · push.
- 이번 3파일 신규 + 3 CLAUDE.md append 외 어떤 파일도 건드리지 않는다.

── 검증 (완료 시) ──
1. 생성 파일 3개 존재 확인(ls).
2. 각 CLAUDE.md에 "Architecture Constitution" 블록 존재 확인(grep).
3. 각 참조 경로 유효성(전체 헌법 MD 경로가 실재하는지) 확인.
4. git -C <repo> diff --stat (각 repo) 출력.
5. 변경 파일 목록 출력(repo별).
6. ★Cosmile WIP 7건 미접촉 증거(git status로 그 7건이 그대로인지).

── 완료 보고 ──
1. STEP0 git status 3 repo 결과
2. 생성 3파일 경로·존재 확인
3. append된 3 CLAUDE.md + 중복 skip 여부
4. 참조 경로 유효성
5. git diff --stat (repo별)
6. Cosmile WIP 7건 미접촉 증거
7. 금지 항목 미위반 증거(코드/routing/brain 0)
8. PRESERVE-APPLY-01 상태: CLOSED / PARTIAL / OPEN
9. commit(각 repo·문서만) · push 0

완료 후 STOP.
```

---

## §A. `/home/leo/Project/foundation-control/ARCHITECTURE_CONSTITUTION.md` (신규 파일 내용)
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

## §B. `/home/leo/Project/SIASIU/설계문서/SHASHU_ARCHITECTURE_CONSTITUTION_SUMMARY.md` (신규 파일 내용)
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

## §C. `/home/leo/Project/Cosmile/ARCHITECTURE_CONSTITUTION.md` (신규 파일 내용)
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

## §D. CLAUDE.md 공통 삽입 블록 (3 repo 동일 — append)
> ★append 규칙: 블록은 아래 `## Architecture Constitution`로 *바로 시작*(앞 공백/빈 줄 없이). 기존 CLAUDE.md 내용과의 구분은 *append 로직이 빈 줄 1개*를 넣어서 처리(블록 자체에 선행 빈 줄을 포함하지 말 것).
```markdown
## Architecture Constitution (역할 경계 — 모든 미션 전 확인)
전체 헌법: /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md
- Service = 입력 이해 · 출력 목소리 · service data · service actions.
- Foundation = 검색·성분/제품/안전 판단·evidence·reasoning·decision·verify.
- LLM은 이해/마사지 담당, Foundation은 decision/safety/evidence 담당.
- ★Safety는 service semantic/output adapter가 낮출 수 없다(MAX·fail-closed).
- ★모든 변경 전 "이게 역할 경계를 넘나?"를 먼저 확인한다.
```

## §E. CLAUDE.md repo별 삽입 블록 (§D 다음에 append)
**foundation-control/CLAUDE.md**
```markdown
### 이 repo = Foundation Common Brain
- decision/safety/evidence/contract 소유. service voice·price/stock/cart/order/customer memory를 core에 넣지 않는다.
- 참조: /home/leo/Project/foundation-control/ARCHITECTURE_CONSTITUTION.md
```
**SIASIU/CLAUDE.md**
```markdown
### 이 repo = Shashu Service Adapter(+ 원본 brain monolith)
- Semantic/Response AI Adapter 소유. brain.chat monolith → Foundation core로 lift-and-split.
- Foundation decision/safety/evidence 전복 금지. Shashu voice/memory는 service-owned.
- 참조: /home/leo/Project/SIASIU/설계문서/SHASHU_ARCHITECTURE_CONSTITUTION_SUMMARY.md
```
**Cosmile/CLAUDE.md**
```markdown
### 이 repo = Cosmile Commerce Service Adapter (현재 MOCK BRAIN)
- Semantic/Response AI Adapter + Commerce Data provider. 목표 = Foundation real brain 연결.
- Foundation decision/safety/evidence 전복 금지. 제품명/claim 임의 생성 금지.
- 참조: /home/leo/Project/Cosmile/ARCHITECTURE_CONSTITUTION.md
```

---

## 설계 메모 (왜 이렇게)
- **전체 헌법은 경로 참조·요약만 배치** = 단일 진실원(SIASIU 원본 MD) 유지·drift 방지.
- **CLAUDE.md append + 중복 skip** = 기존 내용 보존·재실행 안전(idempotent).
- **Cosmile WIP 7건 보호** = STEP0 git status + 대상 2파일만·겹치면 STOP.
- **커밋은 repo별 문서만·push 0** = 헌법 배치가 코드 히스토리를 안 건드림.

## 한계 / 주의
- 이 문서는 지시문 초안 — 실제 실행은 Leo 승인 후. 코드 수정 0·commit 0·push 0.
