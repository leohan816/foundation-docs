# Advisor classification — M4 first GREEN HOLD

VERDICT: TEST_ORACLE_HOLD; M4 product delta not yet admitted.

- PRESERVED COMMAND: Vitest did load from `cwd=.../app`; `2 failed / 2 passed` files, `5 failed / 50 passed / 1 skipped`, exit `1`. This is not the root-CWD exit-127 class.
- MODEL: live `/model` UI = Claude Opus 5, xHigh; same `cosmile:claude.0`, role/CWD/context preserved.
- FAILURE 1: inventory gate-order test scans the full page; an implementation comment contains `catalog.read`/`inventory_hold.read` before executable gates.
- FAILURE 2: inventory claim test scans the full page; a negating comment contains `창고`.
- FAILURE 3: table test searches literal Korean inside `<thead>` while the accepted JSX places the same pinned labels through constants.
- FAILURES 4–5: inventory and core-reads tests ban `집계 조회 계약 없음` over the entire home source, colliding with the generic state legend and a negating comment; contract `167` retires only the D04 `EVIDENCE_GAPS` entry.
- PRODUCT FINDING: no source-contract contradiction found in the preserved eight-path delta; no mock, write, schema, grant, provider, DB execution, runtime, or economic effect.
- CARRIED: `app/scripts/o1_dashboard_reads.vitest.ts` is outside the eight-path M4 ceiling and still has a stale D04 oracle; zero verdict weight here and must be rebased only under a later exact freeze.

