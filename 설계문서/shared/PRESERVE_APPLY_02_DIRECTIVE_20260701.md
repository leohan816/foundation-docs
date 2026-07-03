# PRESERVE-APPLY-02 — Semantic Recognition / Deterministic Policy Gate 전파 · 지시문 초안

> 작성: 샤슈(SIASIU) · ★구현 지시문 *초안* (Leo 승인 후 발송) · 이번 미션 = 초안만·코드/repo/CLAUDE.md 수정 0
> 목적: 헌법 부칙(Semantic Recognition / Deterministic Policy Gate Principle)을 3 repo에 보존 반영.
> 정본: `/home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md`
> 기준: PRESERVE_APPLY_01_DIRECTIVE(동일 패턴·append·dedup·WIP 보호)

---

## 지시문 (control용)

```
[PRESERVE-APPLY-02] Semantic Recognition / Deterministic Policy Gate 원칙 전파

목표:
헌법 부칙(의미=AI semantic judgment · 정책=deterministic rule · 최종=Foundation safety gate)을
3 repo의 헌법 요약 + CLAUDE.md에 append하여 모든 세션이 자동 참조하게 한다. ★코드 수정 0.

정본 문서: /home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md

── STEP 0. 수정 전 git status (필수·먼저) ──
- git -C /home/leo/Project/foundation-control status --porcelain
- git -C /home/leo/Project/SIASIU status --porcelain
- git -C /home/leo/Project/Cosmile status --porcelain
- ★Cosmile 미커밋 WIP(app/*.tsx·next.config.ts·seed-*.mjs 등) 절대 미접촉. 이번 대상(CLAUDE.md append)만.
- WIP와 대상이 겹치면 STOP 후 보고.

── STEP 1. foundation-control/ARCHITECTURE_CONSTITUTION.md 에 §A append ──
- 대상: /home/leo/Project/foundation-control/ARCHITECTURE_CONSTITUTION.md (기존 파일 끝에 append·덮어쓰기 금지)
- 이미 "## Semantic Recognition" 섹션 있으면 skip+보고(dedup).

── STEP 2. 3개 CLAUDE.md 에 §B 공통 블록 append ──
- 대상: foundation-control/CLAUDE.md · SIASIU/CLAUDE.md · Cosmile/CLAUDE.md
- 각 파일 끝에 §B 블록 append(기존 보존). ★이미 "### Semantic Recognition / Deterministic Policy Gate" 있으면 skip+보고.
- append 시 기존 내용과 블록 사이 빈 줄 1개(구분자는 append 로직이 넣음·블록은 헤더로 바로 시작).

── STEP 3. (선택) 상위 헌법에 참조 1줄 추가 ──
- 대상: /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md
- §11 Safety Contract 근처에 참조 1줄 append: "> 부칙: ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md (의미=AI·정책=규칙·최종=Foundation gate)."
- 이미 있으면 skip.

── 금지 ──
- 코드 수정 · ROUTING-02.7 구현 착수 · ROUTING-03 착수 · CONTRACT-01 착수 · Cosmile connector 착수 · 기존 WIP 수정 · push.
- 대상 문서 append 외 어떤 파일도 건드리지 않는다.

── 검증 (완료 시) ──
1. foundation-control/ARCHITECTURE_CONSTITUTION.md 에 Semantic Recognition 섹션 존재(grep).
2. 3 CLAUDE.md 에 "Semantic Recognition / Deterministic Policy Gate" 블록 존재(grep·중복 0).
3. 상위 헌법 참조 1줄(선택) 존재.
4. 참조 경로(정본 addendum) 실존 확인.
5. git -C <repo> diff --stat (repo별) · 변경 파일 목록.
6. ★Cosmile WIP 미접촉 증거(status로 그대로).

── 완료 보고 ──
1. STEP0 git status 3 repo
2. append된 파일 목록 + 중복 skip 여부
3. 참조 경로 유효성
4. git diff --stat (repo별)
5. Cosmile WIP 미접촉 증거
6. 코드/금지항목 미위반 증거(코드 0·구현 0)
7. PRESERVE-APPLY-02 상태: CLOSED / PARTIAL / OPEN
8. commit(각 repo·문서만) · push 0

완료 후 STOP.
```

---

## §A. `foundation-control/ARCHITECTURE_CONSTITUTION.md` append 내용
```markdown

## Semantic Recognition / Deterministic Policy Gate (의미=AI · 정책=규칙)
> 정본: /home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md
- 원문 발화의 *의미 인식*(intent/safety/adverse/suitability/contraindication)은 **AI semantic judgment**가 한다.
  키워드/정규식/휴리스틱이 raw text 의미를 *최종 확정*하면 안 된다.
- AI가 구조화한 의미에 대한 *정책 집행*(products=0·safety_gate≥caution·strategy·veto·suppression)은 **deterministic rule/gate**가 한다.
- 휴리스틱은 *적극 사용*하되 위치가 규칙: trigger · escalation candidate · fail-closed backstop · trace stabilization · policy execution 전용(최종 의미 판단자 금지).
- Safety = AI semantic judgment + deterministic policy gate + Foundation safety gate (raise-only).
- Trace는 semantic judgment / heuristic candidate / policy rule / final safety basis를 분리 기록.
```

## §B. CLAUDE.md 공통 블록 (3 repo 동일·append)
```markdown
## Semantic Recognition / Deterministic Policy Gate (의미=AI · 정책=규칙)
- 원문 발화의 *의미 인식*(intent/safety/adverse/suitability)은 **AI semantic judgment**가 한다. 키워드/정규식이 raw text 의미를 *최종 확정*하면 안 된다.
- AI가 구조화한 의미에 대한 *정책 집행*(products=0·safety_gate≥caution·strategy 등)은 **deterministic rule/gate**가 한다.
- 휴리스틱은 *적극 사용*하되: trigger · escalation candidate · fail-closed backstop · trace stabilization · policy execution 전용(최종 의미 판단자 금지).
- 최종 safety/decision = AI semantic + deterministic gate + Foundation safety gate.
- 참조: /home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md
```

---

## 설계 메모
- **PRESERVE-APPLY-01과 동일 안전 패턴**: git status 먼저 · append(덮어쓰기 금지) · dedup skip(idempotent) · Cosmile WIP 보호 · 문서 commit만·push 0.
- **정본은 SIASIU addendum 1개**, 나머지는 *요약+참조*(drift 방지·단일 진실원).
- **블록은 헤더로 바로 시작**(선행 빈 줄 없이·구분자는 append 로직) — dedup grep 안전(PRESERVE-APPLY-01 교훈).

## 한계 / 주의
- 이 문서는 지시문 초안 — 실제 실행은 Leo 승인 후. 코드 수정 0·commit 0·push 0.
