# 설계문서 vs 검증결과 — 파일 분류 규칙

판정 기준(단순):
- **설계문서/** = 사람이 쓴 **설계·스펙·체크리스트·구조 설명**. 확장자 무관하나 실제로는 `.md` + 소수 구조설명 `.html`(architecture·plan·전체구조·워크플로).
- **검증결과/** = harness가 **생성·렌더한 출력물**(단일 폴더 평탄). `.json`(eval/performance/audit/matrix/index/suite) + `*_REPORT.html`(렌더 리포트).

규칙:
- `.json`(eval 결과·성능·matrix·index·regression suite)·`*_REPORT.html`·`*_AUDIT.html` → **검증결과/** (설계 아님).
- `architecture.html`·`siasiu_plan.html`·`SIASIU_전체구조_설명.html`·`SIASIU_메모리_워크플로.html` → 설계/구조 설명 → **설계문서 보존**.
- 코드 참조: `foundation_lmr_artifact_integrity`·`foundation_lmr_doc_consistency`는 matrix/suite/index를 `검증결과/`에서 찾는다. suite `verification_results_dir`=`검증결과`.
