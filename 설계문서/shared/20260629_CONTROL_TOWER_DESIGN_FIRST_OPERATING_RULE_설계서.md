# Control Tower Design-First Operating Rule — 설계서 — 2026-06-29

> foundation-control(control tower)은 단순 실행 workspace가 아니라 Foundation / SIASIU / Cosmile를 조율하는 관제소다.
> 따라서 **코딩·implementation prompt 발행 전에 설계·경계·계약·위험·테스트 기준을 먼저 문서로 고정**한다.
> 이 문서는 그 "구현 전 설계(design-first)" 운영 규칙 자체의 설계서이며, **앞으로 모든 설계서의 본보기(template)** 다.

## 1. 목적
- cross-project 작업을 **바로 구현**하지 않고, `설계자료/`에 **설계문서를 먼저 완성·승인**한 뒤에만 구현/코딩/repo 작업 지시를 진행하도록 운영 규칙을 고정한다.
- 설계서가 곧 gate가 되어, role/data/safety boundary·contract·test·rollback이 구현 전에 명시되게 한다.

## 2. 현재 상태
- foundation-control `main@accc331` (clean). `설계자료/` 폴더는 본 작업으로 신규 생성.
- 기존 산출물 위치: 설계/계약 일부가 `docs/`·`contracts/`·`reports/integrated/`에 분산되어 있었음(예: 메모리 v0 계약·role boundary·release train·control simulation).
- 운영 모델 정본: `docs/OPERATING_MODEL_20260629.md`. control tower 권한: `CLAUDE.md §2.5`.
- 이 작업 이전엔 "구현 전 설계"의 **canonical 위치가 명시되어 있지 않았다.**

## 3. 관련 repo / 관련 commit
- foundation-control: `main@accc331` (이 작업이 커밋되는 대상).
- 제품 repo(읽기 전용 참조, **무수정**): FOUNDATION `shadow/foundation-shared-memory-v0@b7cce1f`, SIASIU `main@d0f8dc3`, Cosmile `main@b048e55`.
- 본 작업은 **운영 규칙·문서 추가만** 한다(제품 repo·코드 변경 0).

## 4. 작업 범위
1. foundation-control 루트에 `설계자료/` 폴더 생성.
2. 본 설계서(`20260629_CONTROL_TOWER_DESIGN_FIRST_OPERATING_RULE_설계서.md`) + JSON companion 작성.
3. `CLAUDE.md`에 짧은 규칙 섹션(§2.6) 추가 + `docs/OPERATING_MODEL_20260629.md`에 링크 한 줄 추가.
4. 기존 `reports/`·`docs/`·`contracts/` 구조는 **유지**하되, **"구현 전 설계"의 canonical 위치 = `설계자료/`** 로 명시.

## 5. 하지 않을 것
- 제품 repo(FOUNDATION/SIASIU/Cosmile) 코드 수정 ❌.
- 현재 진행 중인 memory implementation 신규 착수 ❌.
- answer.py / safety guard / memory gate / product code 변경 ❌.
- real customer memory write ❌ · production live ❌ · force push ❌.
- 기존 `docs/`·`contracts/`·`reports/` 문서 이동/삭제(이번엔 위치만 명시, 마이그레이션 안 함) ❌.

## 6. Role boundary
- **foundation-control = 설계·gate·검증의 주체.** 설계서를 작성·승인 관리하고, 승인 후에만 implementation prompt를 발행.
- **개별 repo Claude Code = 설계서/계약 기반 repo-local 구현만.** 설계서 없이 repo 경계를 넘는 의존을 스스로 만들지 않음(CLAUDE.md §2.5 상속).
- **Leo = 승인자.** 설계서 PASS/APPROVED 판단 및 live/위험 작업 승인.

## 7. Data boundary
- 설계서에는 **raw 상담 원문·customer PII·secret을 적지 않는다**(요약/hash/refs/구조만).
- 설계서는 control workspace 내부 문서이며, 제품 데이터·memory.db·canonical store를 생성/접근하지 않는다.

## 8. Safety boundary
- 설계서 작성·폴더 추가는 **safety/guard/gate 코드와 무관**(문서만). 본 작업은 live/write/promotion 경로를 열지 않는다.
- design-first 규칙 자체가 safety 장치다: 설계 없는 구현 지시·코드 수정 금지 → boundary 누락·휴리스틱 도입을 사전 차단.

## 9. Contract / schema
**설계자료/ 명명 규칙**
- `설계자료/YYYYMMDD_<작업명>_설계서.md` (필수)
- `설계자료/YYYYMMDD_<작업명>_설계서.json` (선택 — 기계가독 companion)

**설계문서 유형(설계자료/에 둠):** 아키텍처 설계 · role boundary 설계 · contract 설계 · API 설계 · memory/identity/consent 설계 · release train plan · risk/gap 분석 · test plan · rollback plan · implementation prompt 초안 · decision record.

**설계서 필수 16 섹션:** ①목적 ②현재 상태 ③관련 repo/commit ④작업 범위 ⑤하지 않을 것 ⑥role boundary ⑦data boundary ⑧safety boundary ⑨contract/schema ⑩expected behavior ⑪test plan ⑫regression plan ⑬rollback plan ⑭implementation phases ⑮승인 조건 ⑯다음 implementation prompt.

## 10. Expected behavior
- 새 cross-project / memory / consultation / commerce / identity / migration / live 전환 / safety 작업을 시작할 때:
  1. 먼저 `설계자료/`에 16섹션 설계서를 작성한다(구현 전, 사후 기록 대체 금지).
  2. 설계서가 **PASS/APPROVED** 되기 전에는 implementation prompt를 발행하지 않고, 제품 repo 코드를 수정하지 않는다.
  3. 승인 후에만 §16의 implementation prompt를 발행한다.
- 긴급 수정(hotfix)도 **최소 decision record 또는 hotfix design note를 `설계자료/`에 먼저** 남긴다.

## 11. Test plan
- `설계자료/` 폴더 생성 확인.
- 본 설계서 파일 존재 + 16 섹션 포함 확인.
- JSON companion 존재 시 `python3 -c "import json; json.load(...)"` valid 확인.
- `CLAUDE.md §2.6` 추가 + `OPERATING_MODEL`에 링크 한 줄 추가 확인.
- 제품 repo 변경 0 · secret/PII 0 · git status(foundation-control만 staged) 확인.

## 12. Regression plan
- 본 작업은 문서/규칙만 추가 → **코드 regression 없음.**
- 단, 기존 cross-project regression baseline은 **불변**임을 재확인(Foundation 89/89 · SIASIU 39/39+119/119 · Cosmile readiness 164/164 · loop 112/112 · answer.py fingerprint `d7f579443f8a110a`). 이 작업으로 어떤 테스트도 변경/삭제하지 않는다.

## 13. Rollback plan
- 문서 추가만이므로 rollback은 **해당 커밋 normal revert** 또는 추가 파일 삭제로 충분(코드 영향 0).
- `CLAUDE.md §2.6` 추가분은 한 섹션이라 단독 revert 가능. 제품 repo 영향 없음.

## 14. Implementation phases
- **Phase 0(본 작업):** `설계자료/` 생성 + 본 설계서 + JSON + CLAUDE.md §2.6 + OPERATING_MODEL 링크. → 커밋(push 별도 승인).
- **Phase 1(이후 상시):** 모든 신규 cross-project 작업은 본 규칙을 따른다(설계서 먼저 → 승인 → 구현).

## 15. 승인 조건 (이 설계서의 PASS 기준)
- `설계자료/` 폴더 + 본 설계서(16섹션) 존재.
- JSON valid · 제품 repo 변경 0 · secret/PII 0 · foundation-control만 커밋.
- CLAUDE.md/OPERATING_MODEL에 규칙·링크 반영.
- Leo가 운영 규칙으로 채택(APPROVED) 시 효력 발생.

## 16. 다음 implementation prompt
> 본 작업은 운영 규칙 도입이므로 별도 제품 구현 prompt 없음. **다음 cross-project 작업부터** 다음 순서를 강제한다:
>
> 1. `설계자료/YYYYMMDD_<작업명>_설계서.md`(16섹션) 작성 → 2. Leo APPROVED → 3. (필요 시)`설계자료/`에 implementation prompt 초안 → 4. 제품 repo repo-local 구현 지시 발행 → 5. control regression/simulation → 6. report.

---

### 운영 규칙 요약 (한 줄)
**설계자료/에 설계서 먼저 → 승인(PASS) → 그 다음에만 구현·코딩·repo 지시.** 설계 없는 구현/코드 수정 금지. 긴급도 design note 먼저.
