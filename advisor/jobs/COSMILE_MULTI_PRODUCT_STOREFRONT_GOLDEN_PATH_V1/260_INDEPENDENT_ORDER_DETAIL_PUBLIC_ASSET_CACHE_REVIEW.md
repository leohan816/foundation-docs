# 260 — Independent review: non-production preview asset cache policy

TIER `NORMAL_BOUNDED_PREVIEW_CONFIG` · VERDICT: **`PASS`** · 차단 결함 0 · `RETURN_TO: foundation-advisor`

**Binding.** 확인된 현행 `claude-opus-5` · effort max · `/fable-sentinel`(+ delta-review reference) · CWD 정확 · Advisor/Worker와 별개 독립 Reviewer. Docs `1585761` · 258 sha256 `e8ccb3db…` 일치. Product `b652a8b2..8d4a3272` = 1 commit · **정확 2경로**(`next.config.ts` 수정 · 집중 테스트 신규) · clean/upstream-equal. 테스트/빌드/typecheck/runtime/browser/DB/provider 0 · 산출물 미커밋(258 준수).

## 검증 항목

1. **PASS — `development` 정확 일치만.** `previewAssetCacheHeaders`는 `if (nodeEnv !== "development") return []` 단일 게이트로, 엄격 문자열 비교라 대소문자·부분일치·정규화 여지가 없다(`next.config.ts:10`).
2. **PASS — 그 외 전 환경 무규칙.** production·test·`undefined`·빈 문자열·공백만·`Development`·`DEVELOPMENT`·`dev`·`preview`·`staging` 10종이 각각 `[]`임을 단언 — 유사 표기와 미설정까지 닫힌 기본값으로 떨어지므로 운영이 비프로덕션 정책을 상속할 경로가 없다.
3. **PASS — 범위는 가변 dev 청크뿐.** `source`는 `/_next/static/chunks/:path*` 하나이며 규칙 배열 길이 1·헤더 1개를 단언. 페이지·API·이미지·정적 미디어·`/_next/static/css` 등 다른 경로에는 어떤 헤더도 추가되지 않는다.
4. **PASS — 양의 수명 불가.** 값은 `no-store, max-age=0, must-revalidate`이고 세 토큰 각각을 포함 단언한 뒤 `not.toMatch(/max-age=[1-9]/)`로 **양수 max-age 자체를 금지**한다. `no-store`가 이미 저장을 막고 `must-revalidate`가 재사용을 봉쇄하므로 다층 방어.
5. **PASS — 단일 순수 출처.** `nextConfig.headers`는 `async () => previewAssetCacheHeaders(process.env.NODE_ENV)`로 위임만 하고 규칙을 재선언하지 않으며, 테스트가 위임 형태를 정규식으로 고정하고 헤더 값·source 문자열이 파일 전체에서 **각각 정확히 1회**만 등장함을 카운트로 증명(재타이핑=split-brain 차단). 헬퍼는 부작용·조회·비동기 IO 0의 순수 함수.
6. **PASS — dev origin 무변경.** `allowedDevOrigins` 3종이 배열 동등성과 원문 라인 문자열 두 방식으로 바이트 보존 단언되며, diff에도 해당 라인 변경 없음.
7. **PASS — 그 외 동작 확장 0.** diff는 헬퍼 9줄 + `headers` 훅 1줄 + 주석뿐이고, 테스트가 `rewrites`·`redirects`·`middleware`·`env:`·`images:`·`experimental` 부재를 단언. 프록시·인증·제품·질의·스키마·DB·provider·경제 의미 변경 0.
8. **PASS — RED 4/2 · GREEN 6/6의 의미는 재실행 없이 충분.** 6개 케이스가 각각 (1)dev 정확 규칙 (2)비-dev 10종 무규칙 (3)토큰·양수 수명 금지·범위 (4)단일 출처·중복 선언 0 (5)dev origin 보존 (6)무관 설정 부재를 덮는다. 구현 전 실패 4건은 헬퍼·훅 부재로 자연 도출되고 통과 2건은 dev-origin 보존·무관 설정 부재(구현 무관 사전 성립)라 **RED 구성이 계약 공백과 정합**한다. 수치는 256 보고 인용이며 리뷰어는 실행하지 않았다.

## Residuals

- **R1(핸드오프 지정 잔여)** 이 검증은 **설정 계약 수준**이다. 실제 응답 헤더가 브라우저에 그렇게 도달하는지(Next dev 서버의 헤더 적용, 프록시·CDN·Cloudflare 터널의 재작성·재캐싱 여부)는 runtime/browser 금지로 미증명 — 다음 프리뷰 게이트에서 응답 헤더 실측이 필요하다.
- **R2** `no-store`는 **브라우저** 캐시만 다룬다. 중간 프록시가 이미 보관 중인 옛 청크나 Service Worker 캐시가 있으면 이 규칙만으로 즉시 해소되지 않는다(정책 도입 시점 이전 캐시).
- **R3** 규칙은 `chunks/*`에 한정되므로 같은 문제를 겪을 수 있는 다른 가변 dev 자산(예: `/_next/static/css`, HMR 매니페스트)은 범위 밖 — 현재 증상 대상만 최소 수술한 것으로 이해하며, 재발 시 범위 확장 여부는 Advisor 판단.
- **R4** typecheck/build 미실행 — `NextConfig.headers` 시그니처 적합성은 소스 계약 수준 증명.

**Rationale.** 8개 검증 항목 전부 직접 소스·diff 증거로 충족, default-deny가 엄격 일치로 구현됐고 운영 상속 경로 0, 잔여는 전부 선언된 미실행 범위 → **PASS**.
