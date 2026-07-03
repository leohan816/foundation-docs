# SIASIU foundation_user_ref — Policy Alignment Audit — 상태: **PASS_WITH_WATCH**

> 작성: 샤슈(SIASIU) · 2026-07-03 · ★read-only audit · 코드 수정 0 · SIASIU push 0.
> SIASIU HEAD `a538c68` (CUTOVER-01 `72295a2`). 정책: Foundation엔 실제 고객정보 미전송·opaque deterministic foundation_user_ref만.

## A. Verdict: **PASS_WITH_WATCH**
핵심 정책(**Foundation에 raw PII 미전송·SSC는 opaque furef_만**)은 **충족**. **PATCH_REQUIRED 없음**. WATCH = ref 해시 *입력*(user_id)이 프론트에서 email/name 파생 가능(Foundation은 못 봄·output opaque) + Cosmile 미채택.

## B. 확인한 SIASIU HEAD
`a538c68`.

## C. foundation_user_ref 생성 방식
`adapters/provider_flag.py:23`:
```
foundation_user_ref(user_id) = "furef_" + sha256("siasiu:" + str(user_id)).hexdigest()[:16]
```
- ★**namespace 포함**: `"siasiu:"` prefix(+ SSC `service_id="siasiu"`). ③ ✅
- ★**deterministic**: sha256(동일 입력→동일 ref). ④ ✅
- ★**opaque·역산 불가**: sha256 one-way·16 hex. ✅
- 예: `user_id="leo_customer_001"` → `furef_23ecadb302eda288`(원문 미노출).

## D. raw PII 미전송 확인 (①②⑥⑦)
- **① SSC에 foundation_user_ref 포함**: `service_context.foundation_user_ref`. ✅
- **② raw PII 미포함**: SSC 실측 blob — top keys=`[contract_version,service_id,locale,channel,raw_text,service_mode_requested,service_context,session_context]` · service_context=`{audience,surface,foundation_user_ref}`. **user_id/name/email/phone/login/address/@ 전부 부재**(runtime assert False). ✅
- **⑥ server.py**: `/api/chat`이 raw user_id를 CVF.consult에 넘기지만 build_ssc가 **해시해서 opaque만** SSC에 넣음(raw 미포함). ✅
- **⑦ Foundation durable**: Foundation `INVARIANTS.raw_text_stored=False`·`pii_stored=False` → raw_text/PII 미저장. identity ref는 opaque. → **Foundation logs/events에 raw PII 안 남음**. ✅

## E. memory.db 미주입 확인 (⑩)
`build_ssc`의 `session_context` = 빈 dict(`{}`) · memory.db 읽기/주입 코드 **0**(주석만 "memory.db 주입 없음"). SSC에 allergy/avoid/memory 필드 0. ✅

## F. Cosmile과 통일 가능한 구조인지 (⑧)
- SIASIU 구조: `service_context.foundation_user_ref = furef_ + sha256("<service>:" + id)[:16]`.
- **필드명 `foundation_user_ref` + namespace prefix**는 서비스 불문 일관 적용 가능(Cosmile은 `"cosmile:"`).
- ★현재 **Cosmile은 foundation_user_ref 미채택**(grep 0건) → 통일 대상(WATCH). 구조 자체는 그대로 이식 가능.

## G. PATCH_REQUIRED 여부
- **없음(SIASIU 코어 정책 준수)**: Foundation에 raw PII 미전송·opaque·deterministic·namespace·memory 미주입 전부 충족.
- WATCH 항목은 *개선 권장*이지 위반 아님(아래 K).

## H. foundation-docs 보고서 경로
- 원본: `/home/leo/Project/SIASIU/docs/SIASIU_FOUNDATION_USER_REF_ALIGNMENT_20260703.md`
- mirror: `foundation-docs/설계문서/siasiu/SIASIU_FOUNDATION_USER_REF_ALIGNMENT_20260703.md`

## I. foundation-docs commit hash
(실행 결과 기재)

## J. SIASIU 코드 push 여부: **0**

## K. 남은 WATCH
1. **★ref 해시 입력의 안정성/PII성(⑤)**: 프론트 `userId()` = `s.userId || s.email || ("u_"+name)` → 해시 **입력**이 email/name 파생일 수 있음.
   - Foundation은 이 값을 **못 봄**(해시 output만 전송·one-way) → **PII leak 아님**.
   - 단 권장 기준(`hash("siasiu:" + stable_internal_user_or_guest_id)`) 대비: (a) email/name은 *안정 내부 id 아님*(세션별 ref 달라질 수 있음) (b) PII를 해시 입력으로 씀(출력은 안전하나 내부 id 권장).
   - → **권장(WATCH)**: 호출측이 *안정 내부 user/guest id*를 넘기도록(어댑터 코드 변경 아님·상위 세션/식별 정책). 지금은 PII 미전송이라 위반 아님.
2. **Cosmile foundation_user_ref 미채택**(⑧) → 필드명/namespace 통일 이식(Cosmile 담당).
3. **raw_text 자체 PII**: 사용자가 채팅에 PII를 타이핑하면 raw_text에 포함될 수 있으나 Foundation `raw_text_stored=False`로 미저장(inherent·Foundation invariant가 처리).
4. SIASIU 미배포(push 0) — 코드상 정합.
