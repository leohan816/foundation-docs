# M5 Candidate Gate Resume — Worker Handoff

MISSION_ID: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
VERDICT: PROCEED_WITH_LIMITS
ACTOR: existing Cosmile Claude Worker
SESSION: cosmile:claude.0
MODEL_EFFORT: Claude Opus 4.8 / xhigh
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
BASE: cf92a7cb09eb9542376a815a0a1d008adeda3d20
SKILL: /fable-builder; implementation-execution and implementation-report-template
PRODUCT_WRITE: PROHIBITED

PRESERVED_GATE:
- Corrected candidate typecheck already PASS at this exact HEAD; do not rerun.
- Focused order-service DB correction file already 46/46 PASS; do not rerun.

EXACT_COMMAND_CEILING:
1. Run once, in one focused Vitest invocation:
   - scripts/o1_console_space_contract.vitest.ts
   - scripts/operator_authority_contract.vitest.ts
   - scripts/o1_operator_route_authority.vitest.ts
   - scripts/o1_dashboard_reads.vitest.ts
   - scripts/o1_dashboard_request_detail_authority.vitest.ts
   - scripts/o1_operator_transition_routes.vitest.ts
   - scripts/o1_lab_registry.vitest.ts
2. If PASS, run each once and stop at first failure:
   - python3 scripts/operator_authority_migration.dbtest.py
   - python3 scripts/operator_authority_repository.dbtest.py
   - python3 scripts/operator_audit_attribution.dbtest.py
3. If PASS, run once:
   `NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run build`
4. If PASS, start only the built candidate on 127.0.0.1:31081 with O1 disabled/unset and the same closed-loopback DB value; never touch port 3000 or the public preview.
5. After authoritative readiness, use exactly one existing Chromium invocation:
   `/home/leo/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome --headless=new --no-sandbox --disable-gpu --window-size=390,844 --user-data-dir=<owner-only mission temp profile> --dump-dom http://127.0.0.1:31081/lab`
6. Prove categorically: HTTP/browser path loaded; Korean Lab heading present; exactly 31 registry detail links; no actionable button/form/command surface.
7. Stop the full 31081 process tree; remove `.next`, browser profile, and mission temp output; verify 31081 closed, disposable DB/process absent, Git clean/upstream-equal.

FORBIDDEN:
- No typecheck repeat, product edit, install/generate, schema/migration write, broad test, provider/DB beyond the three disposable tests, preview/tmux mutation, economic effect, retry after first failure, or M5 correction.

RETURN:
- Write compact evidence only to the existing job paths:
  - 115_M5_CANDIDATE_GATE_RESULT.md
  - 116_M5_CANDIDATE_GATE_POINTER.md
- Include each command outcome, browser categories, cleanup, effects 0, and exact Git state.
- RETURN_TO foundation-advisor and STOP.
