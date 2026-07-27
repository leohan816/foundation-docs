# 89 — F2 HARD_IMPORTANT_SAFETY delta review

PASS: `IMPLEMENTATION_REVIEW` (F2 cumulative delta) · VERDICT: **`PASS`** · `RETURN_TO: foundation-advisor`

## Binding · independence · pins (직접 검증)

- Actor: `claude-fable-5` · effort max · `/fable-sentinel` + contract/provenance/classification/delta references(본 세션 기적재분 적용) · CWD = 정확한 Cosmile F2 worktree.
- 독립성: 본 세션은 F1 Foundation 리뷰만 수행(F2 델타 최초 열람) · F2 Worker는 별도 세션 `claude-opus-5`/xhigh — 자기검수 없음.
- Handoff 88 @ docs `3eeaf997` HEAD 일치 · SHA-256 `ed967f6d…d433df` 일치. 계약 79 + Worker 결과 80/83/86 + E-핸드오프 82/85를 dispatch 커밋 고정 인용으로 검토.
- Product `4dd56c12..91ded449` = 정확 3 commits(`bd265a7`→`7088e4e`→`91ded44`, 80/83/86과 일치) · name-status 정확 9경로 · +1276/−22 · HEAD=`91ded449`·clean·upstream-equal 직접 확인 · schema/package/lock 무변경.
- 증거 기준: 9경로 diff/전문 + 앵커 4종(o1NonprodConfig·o1FixtureSetup·snapshotBundle·schema CHECK) 직접 검토. RED/GREEN 수치(초기 2F/32P→50/50·E1 7F/36P→43/43·E2 6F/23P→29/29)는 **보고됨**(88 frozen evidence와 80/83/86 상호 일치; 실행 금지로 재현 아님).

## Review questions 1–10 (전부 충족 · 증거)

1. **승인 lane 불변** — `decideCatalog` 구 ladder가 `if (!candidateAdmitted)` 안으로 무변형 이동(diff 대조); price_authority 신규 매트릭스가 기존 10개 결과의 proof 유/무 동일성을 단언; 승인 binder 영역엔 후보 토큰 0·`current_approved` 요구 유지(영역 테스트). 유일한 공유 변경 `displayNameFromSnapshot`은 계약 #10이 명시 승인한 `display_short_name_ko` 우선이며, 기존 승인 fixture는 `display_name`만 보유(o1FixtureSetup 확인)라 표시 결과 불변.
2. **비승인 런타임/직접 호출 차단** — `candidateRuntimeProof` = `readO1RuntimeConfig` ready(production 구조적 선거절·flag 정확 "true"·Google·Toss TEST 전용) + bundleRoot 정확 일치; durable 4 진입점 전부 guard-first(`candidateGuard`가 Prisma/fs 접근 전 실행). 행동 증명: prisma를 `{}`로 mock한 실함수 호출 — 거절 런타임 6종×4 진입점 + 비정확 root 4종×4 진입점 전부 폐쇄 카테고리 반환(테스트 397–432행).
3. **정확-집합 fail-closed** — 7제품(`decideCandidateManifestSet`)·overlay 튜플 값 단위(`decideExactCandidateOverlay`, canonical JSON key)·제품→고정 SKU(`decideCandidateSkuForProduct`)·SKU 7집합(`decideExactCandidateSkuSet`)·approval 정확 `TEST_ONLY_CANDIDATE`+게이트 6종 정확 `NOT_RECORDED`(PASS/BLOCKED 각각 거절)·1-manifest/0-notice(`decideCandidateBundleShape`). 8번째 `elt-serum-triplecapsule-01`은 상수로 배제·overlay 부재·set 침입 거절. overlay 값은 79 동결표와 7행 전부 일치(가격 7종 유일).
4. **전임자 규칙·보존 기록 무접촉** — `decideCandidatePredecessor`: heads 0→initial·heads==[synthetic sha]∧동일 제품→supersede·그 외(foreign sha/split head/차용) 거절; synthetic sha는 fixture와 동일 생성기(`buildO1SnapshotDoc`) 단일 원천. 델타 SQL 표면에 DELETE 0·order/reservation/intent/transaction/orderItem 접촉 0(INSERT snapshot·구 head→'superseded'·후보 SKU upsert(강제 inactive/hidden)·SkuBinding INSERT·고정 7 UPDATE만).
5. **부분 노출 불가·원자 활성화** — 가시성 경계는 활성화 단일점: seed는 inactive/hidden, 판매성은 active SKU 요구; `activateCandidateSkus`는 guard→정확 7집합→트랜잭션 내 7-바인딩/lifecycle/제품 join 재검증(불일치→`candidate_precheck_failed` throw)→단일 UPDATE(count≠7→`partial_activation_refused` throw) — 두 불일치 클래스 모두 throw=rollback. 영역 테스트가 콜백 내 `return {ok:false}` 부재·양 가드 throw·정본 상수 사용(인라인 리터럴 금지)을 단언. 부분 import는 비가시 snapshot 행만 남기며 멱등 재실행으로 수렴.
6. **폐쇄 카테고리/카운트** — `CandidateRefusal` 닫힌 union; activation catch는 자기 토큰 2종만 통과·그 외 `activation_failed`로 붕괴(raw `e.message` 반환 부재를 테스트가 단언); driver-fault 행동 테스트가 결과 JSON에 prisma/$transaction/$executeRaw/"not a function"/undefined 부재 단언; one-shot은 category/count만 보고(root 미출력); config에 secret 값 0.
7. **양 지점 proof·단일 가격 경로** — `o1CatalogItem`(진열 admission)과 checkout 재검증 두 `catalogDecision` 호출 모두 `testCandidateProof(env, cfg.config.bundleRoot)` 지참(호출수==proof수 테스트); 후보 lane은 기존 공유 tail(active SKU·KRW 서버가·`price_reconfirmation_required`) 재사용 — 제2 가격/경제 경로 0·CommerceOffer 생성 0(`offersCreated: 0`).
8. **표시 정체성 = 검증 Foundation content만** — `candidateDisplayName`: verified doc의 `content.identity.display_short_name_ko`→레거시 `display_name`→null(발명/overlay 유래 0); price/stock/SKU는 Cosmile 동결 overlay 소유. 화면 누설 소탕: 화면/컴포넌트에 제품 id·후보 토큰·개수 하드코딩 0·`o1EligibleCatalog` 단일 공유 경로 유지.
9. **테스트 적대성·비약화** — 수정 2 스위트는 순수 추가(기존 단언 무접촉, diff 확인); 신규 스위트가 권한(런타임 6종×4)·게이트(6종×2값)·집합(결손/초과/중복/변조/재정렬+변조)·replay(admitted/inserted 분리)·부분 활성화(throw 형태)·production·공유 경로 회귀를 명시 겨냥. Worker 공개 oracle 정정 4건(F2 1·E1 3)은 전부 강화 방향·공개 선언·최종 형태가 델타에서 확인됨.
10. **컴파일/런타임 모순 없음(정적)** — 순환 import 0(repository→후보 모듈은 함수 내 dynamic import·fixture는 lazy require·타입 import는 소거형); `Prisma.join` import 추가 확인·`count(*)::int`/`$executeRaw` 반환수 비교/advisory lock 캐스트 유효; CommerceSku INSERT 17컬럼 = schema 모델과 정확 일치(직접 대조); `SnapshotLifecycleStatus` export 실재; `validateSnapshot`이 `non_production===true`+`NOT_LIVE_SALE_EVIDENCE` 강제(주석 주장 검증); one-shot은 `describe.skipIf`+env 게이트로 기본 불활성·skip 시 Prisma 무접촉. SQL은 미실행(선언됨) — 실행 증명은 격리 runtime gate 소관.

## Findings

- **차단/패치 요구 결함 0.** (심각도별 발견 없음 — 아래 잔여만.)

## Residuals (비차단 · 후속 추적)

- **R1** `TestCandidateProof`가 구조적 타입(비브랜드) — 순수 `decideCatalog` 층에선 `{kind:"ready"}` 리터럴로 위조 가능(테스트도 그렇게 구성). 실집행은 durable guard+런타임 mint에 있고 TS 타입은 컴파일 층 한정이나, unique-symbol 브랜드가 오용 표면을 줄임. 저심각 강화 후보.
- **R2** Prisma-backed SQL(성공 경로·in-tx precheck·rollback·seed upsert) 미실행 — 선언된 격리 runtime gate 이월. 컬럼 대조로 정적 위험은 축소됐으나 실 DB 증명은 미존재.
- **R3** source-contract 문자열 슬라이스 oracle의 취약성(Worker 자기 선언 반복 결함 클래스) — E1 정정으로 형태-단언화됐고 실패 방향은 소리 나는 쪽이나, 마커 리팩터 시 재점검 필요.
- **R4** typecheck/build 미실행(선언) — vitest(esbuild)는 타입 오류를 잡지 않음; 표적 export/컬럼 검증 외 전역 타입 회귀는 미증명.
- **R5** RED/GREEN 수치는 보고 증거(3소스 상호 일치)·재현 아님(리뷰어 실행 금지).
- **R6** 부분 import 시 비가시 후보 snapshot 행 잔존(판매성 0·멱등 수렴) — 운영상 정리 불요하나 runtime gate에서 확인 권장.

## Founder correction · 경계

- 9경로 전체에서 "판매 비의도"류 서술 0; 모듈/테스트 머리말·79/80/83/86이 일관되게 "intended sale products·temporary non-production technical disposition·never a not-for-sale classification" 명시. 게이트/권리/안전 PASS 발명 0(정확 `NOT_RECORDED`만). Cosmile 경계 준수: 판단 로직 0·표시는 verified Foundation content만·price/stock/SKU만 Cosmile 소유.

## Verdict rationale

10개 폐쇄 질문 전부 직접 구조 증거(+라벨된 보고 증거)로 충족·차단 결함 0·잔여는 전부 선언된 이월(runtime gate) 또는 저심각 강화 후보로 수용 요구 위험 아님 → V2 정의상 **PASS**. 다음 승인 게이트(격리 runtime gate: 후보 SQL 실행·실 DB 활성화 증명)는 R2/R4/R6을 닫는 자리다.

`RETURN_TO: foundation-advisor` · Reviewer STOP · runtime/DB/provider/browser 무접촉 · 테스트/빌드 미실행.
