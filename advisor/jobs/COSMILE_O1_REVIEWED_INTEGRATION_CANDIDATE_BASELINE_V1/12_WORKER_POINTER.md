# Worker Pointer — COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1

```text
WORKER_RESULT_POINTER
MISSION_ID: COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1
HANDOFFS_VERIFIED: 10 (38a6db40) ; 20 (e90df4d4) ; 21 focused supersession (06caa42f, blob 4e07280f, docs 8ce7c81b)
RESULT_FILE: advisor/jobs/COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1/11_WORKER_RESULT.md (UNCOMMITTED)
PRODUCT: e1a5f3f, integration branch, clean/upstream-equal, zero delta, PRODUCT_WRITE none
EVIDENCE_A (isolated full gate, --unshare-net): Test Files 1 failed | 42 passed (43); Tests 37 failed | 865 passed | 7 skipped (909); all 37 = disposable-pg unreachable under isolation (repository_error)
EVIDENCE_B (focused DB file, host-loopback): prerequisite postgres:16-alpine image present (not pulled); npm ci exit 0; generate-first client 6.19.3; test started own disposable pg on 127.0.0.1 + migrations + seed
EVIDENCE_B_RESULT: Test Files 1 failed (1); Tests 2 failed | 44 passed (46); 101.95s
FIRST_FAILURE: M2B actual runtime inspection projects all three eligible request kinds with zero write -> AssertionError expected { kind: 'terminal' } to deeply equal { kind: 'eligible', …(1) }
SECOND_FAILURE: M3A actual runtime returns all three categories with exact redacted keys and deterministic oldest-first order
BASELINE: pure suite (42 files/865 tests) green in isolation; actual-repository dbtest 44/46 pass with real DB, 2 genuine failures at e1a5f3f
CANONICAL_INTEGRITY: en_US.UTF-8 targeted hashes identical before/after (.prisma/client 0c29c3a7, @prisma/client 0b988dcb, prisma 6b6ba73b, package.json a486716, package-lock.json 36dfa1a); canonical untouched
CLEANUP: disposable container + port absent (test afterAll + verified); deps/mission cache/temp/build/test residue removed; zero residue; no lingering process; HEAD clean/upstream-equal
ACTIONS_NOT_TAKEN: no commit/push/patch/correction, no other file/full-suite/typecheck/build/lint/retry, no owner env/provider/runtime
INDEPENDENT_REVIEW: none asserted
RETURN_TO: foundation-advisor
STOP
```
