# Foundation — Learning / Memory / Reuse Hardening Loop v0.2

> **2026-06-28 · v0.1을 "Foundation 이전 전 운영 기준선"까지 강화.** 지금 이전/ API화/실승격 하지 않음 — SIASIU 안에서 구현·테스트·버그수정 완료.
> 신규: `foundation_file_intake`·`source_provenance_adapter`·`conflict_detector`·`supersede_policy`·`learning_dryrun_promotion` + 확장 하니스(53). v0.1 테스트·하니스 **전부 보존**.
> ★canonical write 0 · learned/canonical 실승격 0(dry-run) · Vault write 0 · memory.db 0 · ssbrain.sqlite 무변경 · raw/teacher raw 저장 0 · live 0.

## A. DB vs File System 원칙
| 구분 | 원칙 |
|---|---|
| **Canonical 지식 정본** | file/Vault — 사람 리뷰·git diff·source_ref/provenance_ref 추적 가능 |
| **DB** | search/vector index·runtime cache·audit/event log·임시 eval store·customer/session memory(Trust Gate 통제). **정본 아님** |
| **코드 가드** | `memory.db`/`ssbrain.sqlite` write 금지(가드 예외) · canonical Vault write 금지 · test/eval **JSONL만** 허용 · `verify_app_data_clean`(app/data=ssbrain.sqlite 단독 검증) |

## B. 재검토한 v0.1 결과 (Stage 0)
통과: 22/22·상태머신·reuse_gate·승인 워크플로·candidate 재사용 0·고위험 승인 0. 부족(→v0.2 해결): conflict 수동·source_tier/provenance 인입 없음·supersede 기본·dry-run promotion 없음·file canonical mock 없음.

## C. 구현한 파일
`foundation_file_intake.py`·`source_provenance_adapter.py`·`conflict_detector.py`·`supersede_policy.py`·`learning_dryrun_promotion.py`·`tools/learning_memory_reuse_hardening_eval.py` + 5 테스트 + fixtures(`test_fixtures/knowledge/*`).

## D. File-based intake mock (Stage 2)
fixture(md frontmatter/json)→metadata + **content_hash**만 읽어 record 생성. ★raw 본문 미저장·file_path는 trace/internal(외부 미노출). source_ref 없으면 approved 불가·provenance_ref 없으면 high confidence 불가.

## E. Source Tier / Provenance Adapter (Stage 3)
tier(tier1_regulatory…unknown)·provenance·review_status로 `max_answer_mode`·`can_high_risk`·`can_global_learned` 추론. **고위험은 Tier1+provenance+reviewed만 충분 · 브랜드/commerce/unknown 불가 · unknown tier=uncertain only.**

## F. Conflict Detector (Stage 4)
자동 감지: 같은 subject 반대 claim·tier 차이·safety 충돌·brand vs independent·version·stale source. ★**high-risk conflict는 manual review·자동 preferred 없음 · tier 높아도 자동 canonical 승격 금지 · resolution dry-run · 기존 approved는 recheck_required(삭제 아님).**

## G. Supersede Policy (Stage 5)
new는 **approved_for_reuse 이상**이어야 old supersede 가능·superseded_by 필수·high-risk는 extra review·audit 기록·**old 삭제 금지·rollback dry-run**. superseded는 기본 재사용 불가(internal audit는 allow_superseded).

## H. Learned/Canonical Dry-run Promotion (Stage 6)
`dryrun_promote_to_learned/canonical` — **would_promote만·status 무변경·Vault write 0·승격 0**. approved_for_reuse만 후보·tier/provenance 충분·conflict 미해결 불가·privacy/customer/internal_only는 global learned 불가·high-risk는 canonical/Tier1+extra review.

## I. evaluation 케이스 수 → **53** (v0.1 22 regression + 신규 31)
## J. pass/fail → **53 / 0**
## K. 1차 실패와 수정
1차 실행 **0 fail**(모듈에 게이트 내장). Stage 9 요구대로 **2회 반복 실행** — 동일 결과(idempotent·hardening_loop test #6). v0.1처럼 누출을 숨기는 수정 없음. (참고: v0.1 하니스 기대치 버그는 v0.1에서 이미 수정됨.)

## L. Failure taxonomy
v0.1 21종 **유지** + 신규 21종(file_intake_missing_metadata·provenance_missing/wrong_tier·unknown_tier_overtrusted·brand_claim_overtrusted·conflict_not_detected·conflict_auto_resolved_unsafely·unresolved_conflict_approved·superseded/deprecated_source_reused·supersede_without_approved_new·dryrun_changed_real_status·learned_promotion_occurred·canonical_write_occurred·vault_write_occurred·db_path_guard_failed·ssbrain_sqlite_modified·memory_db_created·test_harness_deleted·regression_suite_missing·audit_missing_hash_or_ref). **발생 0.**

## M. memory/judgment 결과
user memory·customer memory → 자동 승인 0·재사용 0(privacy/customer). internal_only → external 차단. memory.db 미접근·고객 원문 미read.

## N. DB/file guard 결과
memory.db/ssbrain.sqlite path → 예외 ✅ · `verify_app_data_clean` ok(ssbrain 단독·memory.db 없음) ✅ · 전 file record raw/teacher raw 미저장 ✅.

## O. Vault / canonical write 결과 → **0** (실 Vault 미수정·canonical write 0·fixture는 test_fixtures/ 한정)
## P. learned/canonical 실제 승격 → **0** (dry-run만·status_changed=false·learned_promoted/canonical_written=false)
## Q. test harness retention → **보존**(v0.1 테스트/하니스/eval JSON 삭제 0·regression suite JSON export·retention plan 작성)
## R. 총 assertions / FAIL → **389 / 0** (신규 5스위트 40: provenance 10·conflict 8·supersede 8·dryrun 8·hardening_loop 6)
## S. full-loop → **100/100**
## T. 남은 위험
| # | 위험 | 등급 |
|---|---|---|
| 1 | conflict 감지는 키워드 polarity 기반(미묘한 모순 누락 가능) | medium |
| 2 | tier→constraint 매핑 보정 전(실 source 분포 미반영) | medium |
| 3 | file intake는 fixture 한정(실 Vault 리더 미연동) | (의도) |
| 4 | dry-run만 — 실 승격 경로는 미구현(별도 승인) | (의도) |

## U. Foundation 이전 가능성 판단
- **로직층(상태/게이트/승인/충돌/supersede/dry-run/provenance/file intake)은 순수 로직 → 이전 준비됨.** Response Brain/ssbrain 미참조.
- ⚠ 선결: 실 Vault 리더(file intake를 실 정본에 연결)·tier 캘리브레이션·conflict polarity 정교화.
- **판단: v0.2는 *이전 전 운영 기준선*으로 충분(상태/게이트/승인/충돌/dry-run/guard 검증 완료). "완성" 아님 — 실 Vault 연동·tier 보정·conflict 정교화가 다음.**

## V. 최종 판단
- v0.2 = **이전 전 기준선 OK** — Foundation으로 옮길 *준비된 로직층 + 보존된 regression suite*.
- 다음 loop: (1) 실 Vault read-only 리더 어댑터, (2) tier/conflict 캘리브레이션, (3) 평가 케이스 80+로 확장, (4) Memory Trust Gate(M6) 통합. **지금 이전·실승격은 하지 않음.**
