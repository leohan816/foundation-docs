# Memory V1 — M6-F FOUNDATION/Schema Design Review (read-only)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 기록: foundation-control(Control) · 2026-07-05 · **성격: Control-invoke 독립 design review(Claude 검수 에이전트·read-only·adversarial·fresh context·1회).**
> ★정직 라벨: Control-invoke 독립 Claude review(외부 Fable5 GPT/ChatGPT와 별개). ★**handoff = local filesystem 직독만**(GitHub URL/remote fetch/web/pasted 0·HEAD는 provenance).
> ★read-only: 코드/DB/실행 0 · schema migration · FOUNDATION-side 구현 · M6-F execution = **미승인·미수행.** Restricted Actions List = source report 참조.
> 대상(local): design gate(`.../M6_F_FOUNDATION_SCHEMA_DESIGN_GATE_20260705.md`) + context 4 + M2 계약 + 코드(subject_identity/_factory/api/gate·SIASIU adapter/p3·Cosmile de-anon).

---

## 1. Verdict: **APPROVE_WITH_WATCH**
설계가 delta-review 핵심 우려(`secret_version` 컬럼 단독은 zero-orphan 아님)를 **실질적으로 close**: read-side union(§3.3)·rolling no-rewrite(§3.4)·retirement re-key(§3.5)·zero-orphan 불변식(§3.6) 명시. 전 경계 유지(Foundation-only secret·no-broker·SubjectRefMap service-write)·FOUNDATION 4항 별도 impl gate로 올바르게 연기. 잔여 gap은 실재하나 bounded·downstream(write-side atomicity 미명세·§3 zero-orphan이 §5 canonical+stable furef에 암묵 의존·stable_id/furef 획득 named-not-defined·R8-2 enum-guard 범위 누락 1). ★live/write/leak 경로 0·"column-alone magic fix" 재도입 0. → **additive schema migration gate 진행 충분**(watch 이월 조건).

## 2. Source integrity
- ★**Linux local filesystem만 직독**(remote/web/pasted 0). primary + context 5 + 코드(`FOUNDATION/foundation/shared_memory/{subject_identity,_factory,api,gate}.py`·`SIASIU .../{foundation_memory_candidate_adapter,foundation_p3_auth_shadow}.py`·`Cosmile .../foundation-memory-deanon.mjs`).
- HEAD(provenance only·전부 handoff과 **MATCH**): foundation-docs `24b3014`·FOUNDATION `c9bb996`·SIASIU `dd2c631`·Cosmile `91bd803`. **MISSING_LOCAL_FILE 없음.** working tree = 미추적/수정 docs·CLAUDE.md만(schema/FOUNDATION source/execution 변경 0).
- 코드 교차확인(설계 뒷받침): `resolve_subject`(L67-89)=순수 함수·`subject_ref_from_foundation_user_ref`(L92-95)=furef mint(require_furef_v2=True)→"core는 furef 수용·call-site가 gap" 정확 · `_factory` L30 raw local_user_ref·L32/L58 echo(⑧·R9-1 확인) · `api.py` L40 `reason_codes:[str(e)]`(R8-2 확인) · adapter `_furef_v2`(L104-108)=`SIASIU_MEMORY_CANDIDATE_SECRET`·candidate `subject_ref: None`(W-d·P-1 확인) · M2 §3.9 SubjectRefMap **secret_version 없음**·§3.5 COALESCE 확인.
- 하드코딩 dev-fallback secret = 존재/위치만(전부 비-prod placeholder·`_is_production` guard 뒤): subject_identity L24·adapter L26·p3 L25·de-anon L19.

## 3. secret_version zero-orphan review
- **Credit:** map이 version 소유(memory row는 opaque 값만·subj_v2_ 포맷 불변)·union+no-rewrite+retirement(drop 전 re-key)+§3.6 불변식이 **column 단독 의존 아닌** 정합적 zero-orphan 서사. denorm은 올바르게 optional(D-1).
- **★WATCH(최예리) W1 — write-side atomicity 미명세:** §3.4 lazy 생성 + §4.3 SubjectRefMap write가 service-side(mint 후) → "memory row(vN) write"와 "vN SubjectRefMap 행 insert" 사이 crash/interleave 시 **map에 없는 live memory row=orphan**. §3.6 절대 불변식은 **명시 ordering/atomicity 규칙 없이 미증명** → **vN map 행은 첫 vN memory row와 동일 tx 또는 그 이전 commit** 규칙 필요. §3.6을 "보장 단언"→"필수 구현 불변식"으로 완화.
- **WATCH W2 — union은 per-furef·furef 발산은 다른 orphan 축:** §3.3 union은 단일 furef 기준·secret_version rotation만 방어·**furef 자체 발산(§5/W-d)은 미방어**(memory가 furef 값별 분리·union이 다른 쪽 miss). → §3 zero-orphan은 **§5 canonical+stable furef에 조건부**임을 명시 불변식으로.
- retirement 부분실패(R-1)=EXEC-1 패턴으로 올바르게 연기(구 map 행은 re-key tx full commit 후에만 drop→orphan 0·설계 수준 adequate). retirement quiescence(rotation 전 mint한 in-flight 요청이 drop 후 commit)=minor·retirement runbook·exec-gate watch.
- guest-only(subject_ref NULL·COALESCE)=backfill 제외(③)·rotation 무영향→orphan 미도입.

## 4. identity-touch API review
- **경계 유지:** `FOUNDATION_SUBJECT_REF_SECRET`은 subject_identity.py만 read·서비스는 furef 전송·(subject_ref, secret_version) 수신. resolve_subject 순수 함수→stateless mint 진짜(DB 0). **no-broker 명시·정확**(§4.3: Foundation durable furef↔subject_ref 저장/로깅 0·audit=count/meta만·SubjectRefMap service-write). = 핵심 통제·명확.
- **oracle:** 결정론 mint(같은 furef→같은 subject_ref)=본질 oracle·올바르게 인정(§4.5/D-2). 가정하 **adequately contained**: 침해 서비스는 자기 namespace·이미 보유/매핑한 furef만 mint·API가 Foundation secret 보유 없이 계산 가능한 것만 부여(경계가 withhold하는 바로 그것). 잔여=furef+API 자격 탈취·rate-limit+per-service auth+namespace+furef 기밀성+count audit로 bulk probing bound. **proof-of-derivation은 hardening으로 연기 합당(D-2)·지금 필수 아님.** → 설계 목적상 oracle contained 판정.
- **impl gate 추가 요구(W5):** mint 응답 Foundation 캐시 금지·rate-limit/audit 카운터가 암묵 furef store 되지 않게(값 제외를 assertable 불변식으로).

## 5. canonical furef derivation review
- W-d 정확 진단·실코드 grounding: adapter가 `SIASIU_MEMORY_CANDIDATE_SECRET`로 furef 파생 → canonical `SIASIU_FUREF_SECRET`로 이전. canonical formula `"furef_v2_"+HMAC(FUREF_SECRET_<svc>,"<svc>:<type>:<id>")[:32]`가 adapter 기존 `"siasiu:local_user:"+ref` namespacing과 구조 일치→candidate는 secret swap로 수렴·shadow-only 영향(R-2) 타당.
- **관찰 1(W3-a):** adapter가 **한 secret을 3용도**(`_sha` content_hash·`_hex` mc_id AND furef 전부 `_SECRET`). §5.2 "furef secret을 content_hash/candidate_id secret과 분리"는 단순 rename 아닌 **신규 분리 요구**(두 변경: 생산자 걸쳐 furef secret canonical화 AND content-hash secret과 분리)·schema/impl gate가 혼동 금지.
- **★관찰 2(W3·§5 최예리):** "candidate·auth·backfill 수렴"은 **절반만 명세.** §5는 furef **secret+formula** canonical화하나 **입력 `stable_id`/local_user_ref canonicality 미정의.** p3 auth 모듈은 email/name→`phash_v2_`(다른 secret)·**furef 미생산** → 인증 복귀 사용자가 furef feed하는 동일 `stable_id`로 resolve하는 방법 미정의(=⑦ "furef 획득 named-not-defined"). furef 수렴 = secret+formula AND stable_id 입력 수렴 필요·전자만 설계. → backfill/exec gate 연기 맞으나 **FOUNDATION impl gate 선결로 명명** 필요(backfill만 아님).
- per-service 값 분리(2a): 값 기준(env명 아님) 올바르게 요구·shadow dev-fallback 리터럴 이미 3모듈 상이·prod 값-분리 집행=신규 요구.

## 6. FOUNDATION deferred items review
- 4항 전부 grounding·**FUTURE FOUNDATION impl gate로 올바르게 분리**(코드 `c9bb996` 미실행 확인):
  - ⑧ _factory/entrypoint furef 수용=정확(core는 furef 가능·gap=L30 call-site require_furef_v2 미설정)·scope 정확.
  - R9-1 legacy local_user_ref echo(L32·L58)=실재·_factory는 test-only synthetic·경계 위생 제거·scope 정확.
  - R8-2 reason_codes enum guard=api.py L40 확인. **현재는 값-leak 아님**(예외가 고정 문자열 `pii_in_local_user_ref`·`local_user_ref_not_furef_v2`만 운반)·future-proofing·올바른 framing. **완전성 gap(W4):** `gate.py` L64 `reason_codes:[raw]`=2번째 passthrough(`has_raw_or_pii`가 field-NAME 반환 `pii_field_present:email` 등·raw 값 아닌 flagged key leak·저위험)·enum-guard가 이것도 커버해야 structural 완결. R8-2가 api.py만 명명.
- 분리 정직·미변경 코드+HEAD 일치로 확인.

## 7. Boundary / gate separation review
- **design-only 유지.** 무결성 블록=schema migration 0·FOUNDATION 구현 0·M6-F execution 0·prod secret 0·backfill 0·main merge 0·코드/HEAD 증거가 corroborate(M2 secret_version 없음·_factory/api 미변경·FOUNDATION HEAD 불변).
- §9 clean gate 순서(재검수→additive schema migration gate→FOUNDATION impl gate→M6-F execution gate)·각 별도 Leo 승인·execution 명시 hold.
- **design/execution blur 없음.** `POST /identity/subject-ref`(§4.1)="(설계)" 라벨·secret_version 컬럼=additive·실 마이그레이션 migration gate로 명시 연기. schema/FOUNDATION/execution/prod secret/backfill 전부 미승인·later gate 뒤. 경계 온전.

## 8. Required patches / watch items
additive schema migration gate를 **block하는 것 없음.** schema/FOUNDATION gate로 이월(분실 금지):
- **W1(설계 불변식):** §3.6을 "보장 단언"→"필수 구현 불변식"으로·**write-side atomicity 추가**(vN SubjectRefMap 행은 첫 vN memory row와 동일 tx 또는 그 이전 commit). 없으면 lazy-생성 crash에 zero-orphan 미증명.
- **W2(설계 coupling):** §3 zero-orphan이 §5 canonical+stable furef에 **조건부**임 명시(per-furef union은 furef-입력 발산 미커버).
- **W3(§5 선결):** ⑦ stable_id/furef 획득(인증 복귀 identity가 furef feed 동일 stable_id로 resolve하는 방법)을 **FOUNDATION impl gate 선결**로 격상(backfill만 아님). furef-secret canonical화=두 변경(생산자 수렴 AND content-hash secret 분리).
- **W4(enum guard 범위):** R8-2를 `gate.py` L64 `reason_codes:[raw]`(오늘 field-name만·저위험)까지 확장·structural 완결.
- **W5(impl-gate assertion):** identity-touch mint 응답 Foundation 비캐시·rate-limit/audit 카운터 count/meta만(furef store 금지)·prod per-service secret 값 분리 집행.
- **W6(delta review 이월·미결):** W-a — 3 shadow 모듈 `_is_production`가 unset/unknown env를 **비-production**(dev fallback)으로 처리(fail-permissive)·FOUNDATION subject_identity(unknown→production·fail-safe)와 반대. critical secret gate면 shadow도 FOUNDATION fail-safe default 채택.

## 9. Final recommendation
**Proceed to the additive schema migration gate**(design 재검수 PASS=본 review)·W1~W6 이월. 설계가 delta-review 1차 우려 close·전 secret/identity 경계 유지·write/live/promotion/backfill/main-merge 0(HEAD 확인)·FOUNDATION 항목 later impl gate로 격리. schema migration gate=DDL-only(secret_version 추가·optional denorm)·진행 가능. **FOUNDATION impl gate는 W1(write-side atomicity)·W3(canonical stable_id 획득)·W4/W5(enum guard+mint no-retention) 못박기 전 미개방.** M6-F execution(prod secret·backfill)=자체 별도 Leo 승인 뒤 hold.

## 무결성(기록)
Control-invoke 독립 design review verdict faithful 기록 · read-only(코드/DB/실행 0) · local filesystem 직독만(remote/web/GitHub URL 0) · schema migration 0 · FOUNDATION 구현 0 · M6-F execution 0 · prod secret 0 · backfill 0 · main merge 0(siasiu dd2c631·cosmile 91bd803·FOUNDATION c9bb996) · 실 secret 값/raw/PII 출력 0 · 본 review만 foundation-docs commit/push · **schema migration gate·FOUNDATION impl gate·execution은 각 별도 Leo 승인.**
