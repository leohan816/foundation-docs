# foundation-docs

Foundation 생태계(Foundation / SIASIU / Cosmile)의 **문서 전용 중앙 미러 repo**.
각 소스 프로젝트에서 작성한 설계서·리포트·상태문서를 **원문 그대로** 이곳에 복사해 한곳에서 본다.

## 원칙
1. 원래 프로젝트에 문서를 **먼저 작성**한다.
2. 그 문서를 **요약/재작성하지 않는다** — 원문 파일을 그대로 복사한다.
3. foundation-docs는 소스 프로젝트와 **별도 git repo** — 문서 미러는 별도로 commit/push.
4. 문서 생성/수정 시 원문 그대로 복사·commit·push를 **기본값**으로 한다.
5. **소스코드/DB/secret/env/PII/고객 원문 로그/서버 접속정보는 절대 복사 금지.**

## Agent Run / Result Protocol

Before executing Advisor handoff prompts, read:

- `설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`

The V2 protocol is canonical for actor authority, review separation, return-to-Advisor routing, and release-train sequencing. This repository remains a documentation/evidence archive and is not runtime behavior source-of-truth.

Long role results must not be pasted into chat by default. Store role results under `../foundation-docs/runs/<target-project>/<job-id>/` and return only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK`, unless Advisor/Leo explicitly requests full text.

## 구조 / 분류 규칙
```
설계문서/
  foundation/   ← Foundation 설계서 (FOUNDATION_*)
  siasiu/       ← SIASIU 설계서 (SIASIU_*)
  cosmile/      ← Cosmile 설계서 (COSMILE_*)
  shared/       ← 공통 정책/아키텍처 (ARCHITECTURE_*, CONTRACT_*, DUAL_*, *SEMANTIC_ADAPTER*)
  archived/     ← 폐기/구버전
docs/
  reports/
    control/    ← Control 보고서 (CONTROL_*)
    fable5/     ← Fable5 보고서 (FABLE5_*)
    recovery/   ← Recovery/Canonical 보고서 (RECOVERY_*)
    audits/     ← 감사/검증 보고서 (*AUDIT*)
  decisions/    ← 의사결정 기록
  status/       ← 현재 상태 요약 (*STATUS*)
  feature-index/← 기능 인덱스
scripts/
  sync-docs.sh  ← 문서 미러 도구 (원문 복사 전용·소스 mirror 아님)
```

## 사용
```
./scripts/sync-docs.sh --dry-run   # 복사 대상/차단 목록만 출력
./scripts/sync-docs.sh             # 실제 복사(copied/skipped/blocked 요약)
# 이후 이 repo에서 git add <자기 mirror 파일만> && commit && push (★git add -A 금지)
```

## 보안
- 문서에 secret/API key/DB/PII/고객 원문 로그/접속정보가 있으면 **복사하지 말고 BLOCKED로 보고**한다.
- secret만 지우고 조용히 push 금지 · 민감정보 의심 시 Leo 확인.
- 초안은 파일명/상단에 **DRAFT** 표시.
