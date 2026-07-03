# Foundation — LMR v0.8: API Contract Dry-run / Shadow

> **2026-06-28 · v0.8 PASS.** Foundation 실 이전·live API 없이 **API contract만 dry-run/shadow로 정의·검증**. "어떤 API가 필요하고 어떤 응답/에러/권한/스코프가 안전한가"를 테스트.
> ★실 네트워크 0 · write endpoint 0 · dry_run=false 거부 · raw payload 거부 · user_text/write/promotion 0 · Vault/canonical/memory.db 0.

## A. 버전 목표
read-only/dry-run endpoint contract + scope guard + error model + shadow client(네트워크 없음). 안전한 API 표면을 계약으로 고정.

## B. 구현한 파일
- `foundation_api_contracts.py` — READ_ONLY_ENDPOINTS(9)·REQUEST/RESPONSE_FIELDS·`validate_response_contract`(raw/write/promotion/user_text=false 강제).
- `foundation_api_scope_guard.py` — actor/audience/scope·dry_run/no_write·raw payload·memory.db·forbidden endpoint 감지(fail-closed).
- `foundation_api_error_model.py` — 13 error code·`make_error`(fail-closed·rejected).
- `foundation_api_shadow_client.py` — ★네트워크 0. request(refs)→scope guard→dry-run 로직(reuse/m6/conflict/promotion)→계약 응답.
- `tools/lmr_api_contract_eval.py` — API latency·계약 불변식 집계.
- 테스트: `test_foundation_api_contracts`(9)·`test_foundation_api_scope_guard`(10)·`test_foundation_api_shadow_client`(10)·`test_lmr_api_contract_loop`(8).

## API 표면
- **Read-only/dry-run(9)**: GET records·records/:id·audit/:id·health·version + POST evaluate-reuse-dryrun·m6-shadow-dryrun·conflict-check-dryrun·promotion-check-dryrun.
- **금지(거부)**: /canonical/write·/learned/promote·/memory/migrate·/customer-memory/import·/records/delete·/records/patch + 모든 write/live endpoint.
- **request**: record_refs/source_refs/provenance_refs만(raw 본문 금지)·dry_run=true·no_write=true 필수.
- **response**: raw_text_included=false·user_text_modified=false·write_performed=false·promotion_performed=false·trace_ref(id/hash/ref)만.

## C/D. 테스트 수 → 총 eval **362**(신규 api_contract **52** cases) · 내 스위트 assertions **496**(459↑·41/41 GREEN).
## E. regression 보존 → v0.1~v0.7 310 전부 포함·삭제 0.
## F. 비율 → v0.1~v0.7(310) + api_contract(52).
## G. pass/fail → **362 / 0** · ## H. false_allow/false_block → **0 / 0**
## I. high-risk/privacy/customer → API m6-shadow가 고위험 비-Tier1·customer memory·candidate·deprecated 차단.
## J. speed → API 단일 p95 **0.18ms**·batch1000 22.6ms(목표 충족). ## K. throughput 高. ## L. slowest: batch1000 단일 호출.
## M. failure taxonomy → 누적 + API 13 error code. 발생 0.
## N. 1차 실패와 수정(1건) → API request에 full record(claim) 전달 시 raw payload 가드 발동 → **계약상 request는 refs만·records는 서버측 resolve**로 정정(올바른 계약 설계).
## O. 최종 재실행 → 362/362 · api 52/52 · contract 불변식 0.
## P. write guard → forbidden_write 100% 거부·dry_run=false 100% 거부·Vault diff 0.
## Q. raw/teacher raw → 0·응답 raw_text_included=false·records read-only는 refs만.
## R. regression retention → 보존(delete_forbidden). ## S. assertions/FAIL → **496 / 0**. ## T. full-loop → **100/100**.

## 금지 확인
실 Foundation API 서버 0·write endpoint 0·운영 데이터 변경 0·Vault write 0·canonical write 0·실승격 0·user_text 변경 0·**live API call 0**(클라이언트 네트워크 라이브러리 미사용).

## U. 다음 → gate PASS → **v0.9(Migration Rehearsal/RC)** 자동 진행
## V. commit/push → 본 v0.8 커밋 · force push 0
## 감사 → 8차원 독립 워크플로(forbidden_write·dry_run/no_write/raw·contract 불변식·live_call·api_false_allow·vault/memory.db·algorithm leak·regression) → 위반 0.
