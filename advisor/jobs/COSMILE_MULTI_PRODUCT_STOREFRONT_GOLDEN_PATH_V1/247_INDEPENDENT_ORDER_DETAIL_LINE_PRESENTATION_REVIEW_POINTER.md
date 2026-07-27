# 247 — Pointer: order-detail line presentation review

| Field | Value |
|---|---|
| Artifact / verdict | `246_INDEPENDENT_ORDER_DETAIL_LINE_PRESENTATION_REVIEW.md` · TIER `NORMAL_BOUNDED_UI` · **`PASS`** · 차단 결함 0 |
| Handoff / pins | 244 @ docs `66e946d` sha256 `afb84df4…` · product `52343f5c..b652a8b2` = 1 commit · **정확 6경로** · +205/−42 · clean/upstream-equal |
| Source of truth | `createdAt`·`optionNameSnapshot` 모두 **이미 쓰던 SELECT에 컬럼 1개씩** 추가 — 새 쿼리/조인/스키마/진실원 0 |
| Time | 증명된 순간만 `KST (UTC+9)` 벽시계, 그 외(null·Invalid Date·문자열·숫자) 전부 `확인 없음` · 현재 시각 대체 0 |
| Option | 바이트 보존(정규화·trim 0) · null은 null로 통과, 부재 문구는 UI에서만 · 공백/빈 문자열은 `repository_error`로 전체 fail-closed |
| Cards | `<ul>/<li>` 카드로 5필드 보존 · 라벨 순서 SKU → **옵션** → 수량 → 단가 → 합계 위치 단언 · 제목이 라벨보다 앞섬 |
| Image | `저장된 상품 이미지 없음`만 표기 · `<img>`/next-image/URL/외부 소스 도입 0 |
| Boundaries | 공개 뷰 키는 `createdAt`, 라인 키는 `option` 하나만 증가(키 집합 전수 단언) · 신원/권한/mutation/경제 의미/상태 현지화 확장 0 |
| Harness | UI 테스트의 `authorizeConsoleOperator` mock은 원 계약(거부·downstream 0 호출) 보존용이며 denied 케이스가 실제 lever를 당김 — 제품 권한 무변경 |
| Residuals | R1 `>상품<` 헤더 단언 은퇴→위치 단언 대체 · **R2** stale `sku_private` 단언 제거는 139-F1(필터 미실행 구간)의 지연 효과 표면화 · R3 typecheck/build/runtime 미실행 · R4 포매터 export |
| Binding | 확인된 `claude-opus-5`/max · `/fable-sentinel` · exact CWD · idle 독립 Reviewer |
| Output state | **미커밋**(244 "Do not commit or push" 준수) — 두 파일은 foundation-docs 워크트리에 untracked |
| `RETURN_TO` | `foundation-advisor` — 커밋/푸시 라우팅과 R2 후속(139-F1 무필터 재실행)은 Advisor 소관 |
