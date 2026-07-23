# WU-4 Finance Reconciliation Result

MISSION_ID: COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1
WORK_UNIT: WU-4_FINANCE_RECONCILIATION
HANDOFF: advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/51_WU4_FINANCE_RECONCILIATION_HANDOFF.md
DOCS_COMMIT: ff5efa7b5966d423060df547720359e3dda615c2
HANDOFF_BLOB: c3d99ab94decb13d666729721f57c31c4d0df364
HANDOFF_SHA256: effdabb957489338c86d0439073c1f2709ea42f8b62bdf2329005ad965ffa7a6
PRODUCT_BASE: eda422a327f37026f2227238b294b8f6fa47e38b
PRODUCT_COMMIT: 372c1fa41eb71ce2d34da298cd1fb7e6e872c00c
R1_BASE: 372c1fa41eb71ce2d34da298cd1fb7e6e872c00c
R1_COMMIT: c8cf7f471fdf0e1606df7e7888fe3a7926455e7a
R2_BASE: c8cf7f471fdf0e1606df7e7888fe3a7926455e7a
R2_COMMIT: afe59d4970af97bb79c381c1764ecceb5052909b
PRODUCT_HEAD: afe59d4970af97bb79c381c1764ecceb5052909b
PRODUCT_BRANCH: implementation/cosmile-o1-operator-dashboard-core-v1-20260723
PUSH: origin/implementation/cosmile-o1-operator-dashboard-core-v1-20260723
STATUS: IMPLEMENTED_AND_PUSHED
RESULT_RECORD: UNCOMMITTED_BY_INSTRUCTION

## R1 exact response-shape correction

- Blocking finding corrected: GET now parses only `{ok:true,reconciliation,stepUpNonce}` and POST only `{ok:true,recovery}`.
- Exact product paths: `app/scripts/o1_console_finance_ui.vitest.ts`, `app/src/components/console/O1ConsoleFinance.tsx`.
- RED: 4 parser cases failed and 7 existing cases passed, exit 1.
- GREEN: identical focused command, 11/11 passed, exit 0.
- Direct pure cases prove three/eight nonnegative-count closure, extra raw-field dropping, alias rejection, and malformed-value rejection.
- `refreshProjection` and recovery summary handling now call the exported exact-envelope parsers.
- No route, authority, UI contract, schema, provider, payment/refund, DB, or economic change.

## R2 dead-parser removal

- Exact product paths remained the WU-4 test and `O1ConsoleFinance.tsx`.
- RED: obsolete `closedCounts` helper remained; 1/12 failed, exit 1.
- GREEN: identical focused command, 12/12 passed, exit 0.
- Removed only `closedCounts` and `closedRecoverySummary`; `asClosedEnvelope` now explicitly rejects arrays.
- Direct parsers reject top-level/nested arrays; no route, UI, authority, schema, provider, DB, or economic change.

1. 구현 범위: handoff 51의 WU-4 finance count projection, desktop-only protected recovery, closed response presentation만 이행했다. WU-5와 route/runtime/schema/provider/economic 변경은 이행하지 않았다.

2. 수정 파일:
   - `app/scripts/o1_console_finance_ui.vitest.ts`: WU-4의 7개 source-contract와 5개 exact-envelope/fail-closed 테스트를 추가했다.
   - `app/src/app/console/finance/page.tsx`: 서버 gate 순서, 단일 projection read, fail-closed 화면, 세 count 전달을 추가했다.
   - `app/src/components/console/O1ConsoleFinance.tsx`: 세 count, exact GET/POST route, one-shot secret/nonce, eight-key summary, closed labels, desktop/mobile 경계를 추가했다.

3. 수정하지 않은 파일: route/runtime/auth/payment/refund/provider/DB/schema/root/nav 및 다른 UI 파일 전체. 선언한 exact three-path scope와 일치한다.

4. 계약 매핑:

| 계약 | 코드/테스트 |
|---|---|
| server gate + one projection read | `finance/page.tsx`; test 1-2 |
| exact route/body + closed recovery | `O1ConsoleFinance.tsx`; test 3-5 |
| desktop controls/mobile count-only | `O1ConsoleFinance.tsx`; test 6 |
| no alternate authority/action/polling | test 7 |

5. 계약 이탈(deviation): 없음. 새 테스트의 broad substring sentinel `"refund"`는 frozen success key `refundConverged`와 모순되어, RED 후 명시적 alternate-action token 목록으로 좁혔다. 이는 frozen contract를 약화하지 않는 test-oracle 정정이다.

6. 테스트 결과:
   - pure: RED 0/7, exit 1; GREEN 7/7, exit 0.
   - R1 parser correction: RED 4 failed/7 passed, exit 1; GREEN 11/11, exit 0.
   - R2 obsolete-parser correction: RED 1 failed/11 passed, exit 1; GREEN 12/12, exit 0.
   - 재현: `./node_modules/.bin/vitest run scripts/o1_console_finance_ui.vitest.ts -t 'WU-4 finance reconciliation counts and protected recovery' --config vitest.config.ts --reporter=verbose --cache=false`
   - env: 승인된 canonical `app/node_modules` 임시 symlink; 실행 직후 제거. package/lock/Vitest hashes 전후 동일.
   - db-touch: 미실행(금지된 DB 범위).
   - safety invariant: focused 7/7에 exact route/body, closed labels, mobile action-free, alternate-action 부재 포함.
   - regression: 미실행(frozen scope가 broad test를 금지).
   - 테스트 diff 기대값/oracle 변경: 위 §5의 모순 sentinel 정정 1건.

7. 무엇을 증명했는가: frozen source-contract 수준에서 세 count-only projection, exact two-field POST, eight-key success summary, one-shot credential clearing, closed recovery categories, desktop/mobile 경계를 증명했다.

8. 무엇을 증명하지 않았는가: browser rendering, live route/runtime integration, backend authorization, provider/economic behavior, build/typecheck, full regression은 증명하지 않았다.

9. 남은 risk: source-contract 테스트이므로 framework/runtime에서의 실제 hydration 및 endpoint response integration은 후속 독립 검수 대상이다.

10. 다음 검수 질문:
   - nonce와 secret이 DOM 또는 success summary에 노출되는 우회 경로가 있는가?
   - malformed/non-integer count가 fail-closed 범주 밖으로 통과하는가?
   - mobile breakpoint에서 POST control이 실제 렌더링되는 경로가 있는가?

11. rollback: product branch에서 `git revert afe59d4970af97bb79c381c1764ecceb5052909b c8cf7f471fdf0e1606df7e7888fe3a7926455e7a 372c1fa41eb71ce2d34da298cd1fb7e6e872c00c` 후 non-force push한다.
