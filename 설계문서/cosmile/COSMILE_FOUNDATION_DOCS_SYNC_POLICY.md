# FOUNDATION DOCS SYNC POLICY (Cosmile)

> 각 프로젝트에서 작성한 **설계서·리포트·상태·기능 인덱스** 문서를 Leo가 수동 복사하지 않도록,
> 문서 전용 중앙 repo **`~/Project/foundation-docs`** (github.com/leohan816/foundation-docs)에 **원문 그대로** 미러한다.

## 핵심 원칙
1. 원래 프로젝트(여기 = Cosmile)에 문서를 **먼저 작성**한다.
2. 그 문서를 **요약/재작성/변환하지 않는다** — 원문 파일 그대로 복사.
3. 원문 파일을 foundation-docs의 대응 폴더에 그대로 복사한다.
4. foundation-docs는 소스 프로젝트와 **별도 git repo**다.
5. 소스 프로젝트의 코드/문서 commit/push 여부와 **별개로**, foundation-docs mirror는 **별도로 commit/push**한다.
6. 문서 생성/수정 시 원문 그대로 복사·commit·push를 **기본값**으로 한다.
7. 아래 "복사 금지"는 **절대** 복사하지 않는다.

## 복사 금지 (절대)
소스코드 전체 · `.env`/`.env.*` · API key/secret/token · SSH key/`.pem` · DB(`*.db`/`*.sqlite`/`*.sqlite3`, `memory.db`/`dev.db`) ·
`node_modules`/`.next`/`.venv`/`venv` · 실제 고객 개인정보(PII) · 실제 고객 원문 상담 로그 · 결제/주문/주소 데이터 ·
서버 접속정보 · 원본 로그 파일 · private key/certificate/credential.

## 문서 보안 규칙
- 문서 안에 secret/API key/DB/PII/고객 원문 로그/접속정보가 있으면 **복사하지 말고 BLOCKED로 보고**한다.
- **secret만 지우고 조용히 push 금지.** 민감정보 의심 시 Leo에게 확인받는다.
- 초안이면 파일명 또는 문서 상단에 **DRAFT** 표시.

## 분류 규칙 (원문 파일명 유지)
| 원본 | foundation-docs 대상 |
|---|---|
| Cosmile 설계서 `COSMILE_*` | `설계문서/cosmile/` |
| Foundation 설계서 `FOUNDATION_*` | `설계문서/foundation/` |
| SIASIU 설계서 `SIASIU_*` | `설계문서/siasiu/` |
| 공통 정책/아키텍처 | `설계문서/shared/` |
| Control 보고서 | `docs/reports/control/` |
| Fable5 보고서 | `docs/reports/fable5/` |
| Recovery/Canonical 보고서 | `docs/reports/recovery/` |
| 감사/검증 보고서 | `docs/reports/audits/` |
| 현재 상태 요약 `*STATUS*` | `docs/status/` |
| 기능 인덱스 | `docs/feature-index/` |

## 도구
```bash
cd ~/Project/foundation-docs
./scripts/sync-docs.sh --dry-run   # 복사 대상/차단 목록만
./scripts/sync-docs.sh             # 실제 복사(copied/skipped/blocked 요약)
git add <복사된 문서> && git -c commit.gpgsign=false commit --no-verify -m "docs(sync): ..." && git push origin main
```
- `sync-docs.sh`는 **문서 mirror 전용**(소스코드 전체 mirror 도구 아님). 원문 그대로 복사·재작성 금지.
- 금지 확장자/파일명(위 목록)은 **복사 차단**. 같은 파일명은 덮어쓰되 내용이 다르면 diff 표시.

## Cosmile 미러 매니페스트(현재)
- `app/docs/COSMILE_FOUNDATION_ONLY_CONSULTATION.md` → `설계문서/cosmile/`
- `app/docs/COSMILE_ANALYTICS_PIPELINE_MVP.md` → `설계문서/cosmile/`
- `app/docs/FOUNDATION_DOCS_SYNC_POLICY.md` → `설계문서/shared/`
- `app/docs/FEATURE_INDEX.md` → `docs/feature-index/COSMILE_FEATURE_INDEX.md`

## 완료 보고에 포함
원본 문서 경로 · foundation-docs mirror 경로 · foundation-docs commit hash · push 결과.
