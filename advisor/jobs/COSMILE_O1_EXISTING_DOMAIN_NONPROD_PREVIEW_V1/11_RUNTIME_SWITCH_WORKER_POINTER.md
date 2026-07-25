# 11 Runtime Switch Worker Pointer

```text
WORKER_RESULT_POINTER
MISSION_ID: COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1
PHASE: PREPARE_VERIFY_SWITCH_STOP
HANDOFF_VERIFIED: 00 SHA256 5efd6dd9, blob cc4fbd0e (docs a2c3cb96)
DECISION: PASS — verified non-production existing-domain preview cutover complete
RESULT_FILE: advisor/jobs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1/10_RUNTIME_SWITCH_WORKER_RESULT.md
CANDIDATE: 71e05266 (branch implementation/cosmile-o1-storefront-customer-account-v1-20260724) clean/upstream-equal, zero tracked change
CUTOVER: old group b8b61d74 stopped (TERM only); candidate live PGID 3489168 on loopback 3000; ingress cosmile.leohan.net->127.0.0.1:3000 intact
ROUTES: public HTTPS / /shop /cart /account /account/orders = HTTP 200 + nonprod markers; console /console + /console/orders present & live (307 auth-gate, not followed)
DB/FIXTURE: disposable postgres:16-alpine loopback 55450, 10/10 migrations; fixture one-shot PASS, bundle=3 files
CONTAINMENT: protected store 600 leo:leo names-only (both Toss keys SET); zero Google/Toss request; zero provider/economic effect; tmux untouched; other services untouched
PRESERVED: candidate proc + disposable DB + bundle + runtime scripts(0700)/pid+log(0600); staging residue removed; durable store untouched
ROLLBACK: preserved (stops candidate group, restarts old on 127.0.0.1:3000); NOT executed (PASS)
LIMITATIONS: R1 no Korean font on host (nonblocking); old dev flag unreconstructable; next dev/disposable/synthetic
RETURN_TO: foundation-advisor
STOP
```
