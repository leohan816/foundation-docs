# Foundation Docs Sync Policy

문서·설계서·감사보고서·상태보고서를 각 소스 프로젝트에 먼저 작성하고, **원문 그대로** 중앙 문서 repo `foundation-docs`에 복사·commit·push하는 규칙. (Leo가 수동 복사하지 않도록)

- 중앙 repo: https://github.com/leohan816/foundation-docs · 로컬: `~/Project/foundation-docs`

## 원칙
1. 원래 프로젝트에 문서를 **먼저 작성**한다.
2. 문서를 **요약/재작성하지 않는다** — 원문 파일 그대로 복사.
3. 원문을 foundation-docs의 대응 폴더에 복사한다(분류 규칙 아래).
4. foundation-docs는 소스 프로젝트와 **별도 git repo**.
5. 소스 프로젝트의 commit/push 여부와 **별개로** 문서 미러는 별도 commit/push.
6. 문서 생성/수정 시 원문 그대로 복사·commit·push를 **기본값**으로 한다.
7. **소스코드/DB/secret/env/PII/고객 원문 로그/서버 접속정보는 절대 복사 금지.**
8. 완료 보고에 **원본 경로 · mirror 경로 · foundation-docs commit hash · push 결과**를 포함한다.

## 분류 규칙
| 문서 | 대상 |
|---|---|
| SIASIU 설계서 (SIASIU_*) | `설계문서/siasiu/` |
| Cosmile 설계서 (COSMILE_*) | `설계문서/cosmile/` |
| Foundation 설계서 (FOUNDATION_*) | `설계문서/foundation/` |
| 공통 정책/아키텍처 (ARCHITECTURE_/CONTRACT_/DUAL_/*SEMANTIC_ADAPTER*) | `설계문서/shared/` |
| Control 보고서 (CONTROL_*) | `docs/reports/control/` |
| Fable5 보고서 (FABLE5_*) | `docs/reports/fable5/` |
| Recovery/Canonical 보고서 (RECOVERY_/CANONICAL_*) | `docs/reports/recovery/` |
| 감사/검증 보고서 (*AUDIT*) | `docs/reports/audits/` |
| 현재 상태 요약 (*STATUS*) | `docs/status/` |
| 기능 인덱스 (*FEATURE_INDEX*) | `docs/feature-index/` |

## 절대 복사 금지
소스코드 전체 · `.env`/`.env.*` · API key/secret/token · SSH key/pem · DB(`*.db`,`*.sqlite`,`*.sqlite3`,`memory.db`,`dev.db`) · `node_modules`/`.next`/`.venv`/`venv` · 실제 고객 PII · 고객 원문 상담 로그 · 결제/주문/주소 데이터 · 서버 접속정보 · 원본 로그 · private key/certificate/credential.

## 문서 보안
- 문서에 secret/API key/DB/PII/고객 원문 로그/접속정보가 있으면 **복사하지 말고 BLOCKED로 보고**.
- secret만 지우고 조용히 push **금지**. 민감정보 의심 시 **Leo 확인**.
- 초안이면 파일명/상단에 **DRAFT** 표시.

## 실행
```
cd ~/Project/foundation-docs
./scripts/sync-docs.sh --dry-run   # 대상/차단 목록
./scripts/sync-docs.sh             # 실제 복사(copied/skipped/blocked)
git add -A && git commit -m "docs: sync <scope>" && git push
```
★`sync-docs.sh`는 **문서 미러 전용**(소스코드 전체 mirror 도구 아님). 대량 미검토 문서 일괄 push 전에는 사람이 대상 목록을 검토한다.
