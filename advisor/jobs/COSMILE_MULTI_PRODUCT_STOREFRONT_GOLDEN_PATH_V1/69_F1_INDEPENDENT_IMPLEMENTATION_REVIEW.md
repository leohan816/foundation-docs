# 69 — F1 HARD_IMPORTANT_SAFETY independent implementation review

PASS: `IMPLEMENTATION_REVIEW` · VERDICT: **`NEEDS_PATCH`** · `RETURN_TO: foundation-advisor`

## Reviewed pins (직접 검증; "보고됨" 표기 항목만 예외)

- Handoff 68: foundation-docs `95d7777` HEAD 일치 · blob `7cafe96783d7039653f04ff21a0f1a7b74548f11` · sha256 `86b9506d…1e39ce` — 3중 일치.
- Contract 65 sha256 `c42a0bf1…0347fb18` 일치 · corrected 66/67은 `51bcad4a` 고정 인용(`git show`)으로 검토.
- Candidate delta `73ff0036..4362c272` = 정확 1 commit · name-status 정확 6경로(M contract/exporter/__init__ · A vault_candidate/test · M 설계서) · product HEAD=candidate · clean tree · upstream-equal.
- Actor: `claude-fable-5` · `/fable-sentinel` + contract/safety/provenance/classification/delta 5 reference 로드 · effort: 디스패치 바인딩 max(세션 내 독립 계측 불가).
- 증거 기준: 6경로 diff/소스 = 직접 검토(clean tree+HEAD=candidate 확인 후 작업본=핀 내용). RED/GREEN 수치·vault writes 0·push 상태·Worker STOP = 66/67 **보고됨**(핸드오프 지시로 테스트 미재실행 — 재현 아님).

## Finding (P목록 — 델타 재검수 가능)

- **F1 [evidence-integrity · 기준 8 위반 · NEEDS_PATCH 동인]** 설계서 v0.3 §7.1: "구현 전 동일 명령 **29 tests / 0 PASS(17 FAIL + 10 ERROR)**" — 기준 8이 "사실로 반복 금지(zero evidence weight)"로 못박은 폐기 산술을 **정본 설계서가 사실로 반복**. 실제(정정 66): **2 PASS + 17 FAIL + 10 ERROR = 29**. 인용문은 내적으로도 모순(17+10=27≠29·"0 PASS" 불성립). 불변 commit message의 동일 결함은 기지·zero-weight(66 편차 8 선언)이나 설계서는 살아있는 정본 지도(CLAUDE.md §0.7)라 미래 독자가 사실로 읽는다. **패치**: 설계서(6경로 천장 내 경로) §7.1 해당 행을 정정 산술로 교체 + 집중 프로세스 7회 사실 참조. 문서 1행 수정 — 승인 범위 내.

## Required criteria 1–9

1. **PASS** 후보≠상업승인 구조 분리 — `TEST_ONLY_CANDIDATE` 별개 토큰·`DELIVERABLE_APPROVAL_STATUS`="APPROVED_FOR_COMMERCE_DISPLAY" 불변; normal `publish`는 `unapproved` 거절 · `deliverable_for_display` 비승인→None · `status_of`→`TEST_ONLY_CANDIDATE`(≠CURRENT_APPROVED) · `publish_correction`→`test_candidate_not_correctable` — 각각 전용 테스트로 증명.
2. **PASS** 실 7 active identity/content 보존·8번째는 완전성 상태로만 제외 — 제외 로직은 `status==active` 필터 + active 7/incomplete 1 프로파일 강제뿐(이름 블랙리스트 0); 테스트 oracle이 실 product_id 7종·실 한국어 short_name 고정 literal·독립 재읽기·canonical UTF-8 byte 포함을 단언(GREEN 31/31 skip 0 = 보고됨).
3. **PASS** 게이트 정확 `NOT_RECORDED` — 빌더가 6 카테고리 전부 상수 emit; lane은 그 외 값 전부 `gate_status_not_recorded_required` 거절(6 카테고리 각각 "PASS" 변조 → delivery 0·manifest 0); PASS 상수 부재(死상수 제거·금지값은 테스트에만 문자 등장); checksum은 기록값 `pending` 원문 운반(해시 계산 코드 0); approved_by/at은 rehearsal 기록으로만 명시.
4. **PASS** 빌더 read-only·caller-rooted·clean-pin·경로 안전·3파일 한정 — 열기 모드 `"rb"` 유일·git `status --porcelain`/`rev-parse` 조회 2종뿐·생성/삭제/이동 경로 0(소스 직접 확인+정적 테스트); vault root 호출자 주입(모듈 내 경로 리터럴 0 — `VAULT_ROOT`는 테스트 앵커에만); 비git/dirty fail-closed·hex40 pin 검증; 최상위 symlink 항목 거절; `ALLOWED_PRODUCT_FILES` 3종 닫힌 allow-list·`offers` 문자열 모듈 내 0회(`forbidden_source_file` 구조 차단). 잔여 R1.
5. **PASS** price/stock/sale status/mock·legacy/provider/DB/runtime/canonical 변이 부재 — 커머스 토큰은 기존 `EXCLUDED_CONTENT_KEYS` 선언(차단 계약)에만 존재; content = `{identity, provenance}` 2키 고정; network/DB/endpoint/live 토큰 정적 봉쇄 + banned-token(mock/sample/demo/fixture/dummy/legacy) 테스트; file_bundle.py 무변경(델타 외).
6. **PASS** 공유 리팩터 등가·기존 승인 lane 보존 — `_admit`/`_commit_batch` 추출은 구 `publish` 본문과 검사 순서·reason 토큰·ledger 이벤트("PUBLISH")·원자성이 라인 단위 등가(diff 직접 대조; approved lane `require_unrecorded_gates=False`로 행동 불변); 후보 lane은 additive·3 가드는 상업 전용 스트림에서 도달 불가; 차단은 전부 명시 refuse(무음 경로 0). 잔여 R2.
7. **PASS** 테스트 적대성·사실 비약화 — 31 = 22 pure + 9 vault-touch 구조를 소스로 확인(66 보고와 일치); 게이트 6 변조·깊이 3 제외 키 9종·합성 프로파일·dirty·symlink·dir/id 불일치·offers 요청 전부 거절-경로 검증; 승인 대조 문서는 합성 id `zzz-cream-control-01`(실 제품 승인 날조 0 — 실 pid 승인 doc은 correction 거절 증명용 in-memory 한정·미배달); skip은 pin 부재 infra-gate로 명시 분리(은폐 없음).
8. **FAIL → F1** 증거 무결성 — 정정 66/67은 올바른 산술(29 = 2+17+10 · 집중 프로세스 7회)을 보유하나, 설계서 §7.1이 zero-weight 수치를 사실로 반복(F1). 이 1건으로 기준 8 미충족.
9. **PASS** 봉쇄 — 정확 6경로·1 commit(직접) · product clean/upstream-equal(직접) · docs 정정 66/67 존재(직접); vault writes 0 = 구조적(쓰기 경로 부재) + 보고(66 "clean before and after"); F2 미착수 = 델타에 Cosmile 경로 0(직접) + Worker STOPPED(67 보고).

## Founder product-scope correction 적용

- 6경로 전체 sweep: "판매 비의도/not for sale"류 단정 0. "비상업" 표기는 전부 승인-증거 상태 의미로 앵커됨(설계서 v0.3: "상업 승인·전시권·안전/인체 검수 승인이 아니다" · 모듈 docstring 동일) — TEST_ONLY_CANDIDATE를 비판매 사업 분류로 읽게 만드는 서술 없음. 게이트/승인 사실 발명 0. 오도 문구 flag 대상 없음.

## Residuals (비차단 · 후속 추적)

- **R1** vault_candidate: 제품 dir 내부 파일-레벨 symlink는 no-follow 미적용(`open`이 따라감) · 읽기는 clean 검증 후 working tree(엄밀 TOCTOU 창) — 악용에는 canonical vault 자체의 오염/경합이 필요하고 tree-hash pin+독립 재읽기로 완화됨. 저심각 강화 후보(SNAP-R2의 no-follow 패턴 이식 가능).
- **R2** 두 lane이 in-memory 레지스트리 공유 — 혼합 스트림에서 배달된 후보가 동일 pid의 후속 승인 publish를 `supersession_required`로 명시 거절하고 correction은 닫혀 있음(무음 아님·비영속·F1 동결 경계와 일치). Founder 정정상 전 제품이 판매 의도이므로 **후보→승인 승격 전이는 후속 설계에서 명시 정의 필요**(현재 미정의·이번 권한 밖).
- **R3** vault-touch 9 테스트는 pin 이탈 환경에서 skip — 미래 GREEN의 증거력이 pin 유지+skip 카운트 감시에 의존.
- **R4** 설계서 v0.3 foundation-docs mirror 미수행(66 편차 6 선언·Advisor 라우팅 대기) — F1 패치 후 패치본을 mirror 권고.

## Process deviations

- **D1 (reviewer·본 세션)** 리뷰 중 canonical vault에 read-only git 조회(status/rev-parse/ls-tree/show)를 실행 — 핸드오프 68 정확-델타 천장 밖. Advisor 정정 수령 즉시 중단 · 해당 출력 **verdict 가중치 0** · 변이 0(조회 명령만·vault clean 유지). 본 verdict는 6경로 델타 + 65 + 정정 66/67 + sentinel reference만으로 성립하며 D1 출력에 의존하는 판정 없음.
- Worker 선언 편차 1–8(66): 선언대로 검토 — 추출 등가(편차 2)·추가 3 가드(편차 3)·死상수 제거(편차 5)는 diff로 직접 확인; RED 산술 정정(편차 8)은 66/67에서 정본이나 설계서 내 반복이 F1로 잔존.

## Verdict rationale

기준 1–7·9는 직접 구조 증거(+명시 라벨된 보고 증거)로 충족. 기준 8은 6경로 중 하나(설계서)가 zero-weight 수치를 사실로 반복해 미충족 — 결함은 승인 범위 내 문서 1행 패치로 해소 가능하므로 V2 정의상 **NEEDS_PATCH**(구조/경계/safety 붕괴 아님 → FAIL 아님 · 수용할 잔여 위험이 아니라 패치 대상 → PASS_WITH_RISK 아님). 패치 후 재검수 범위: 설계서 델타 + F1 1:1(delta-review · CLOSED 기준: §7.1 산술 = "2 PASS + 17 FAIL + 10 ERROR = 29" · "0 PASS" 문자열 0 · 프로세스 7회 참조).

`RETURN_TO: foundation-advisor` · Reviewer STOP · F2 미개시.
