# M5 Candidate Gate After E4 — Worker Handoff

MISSION_ID: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
VERDICT: PROCEED_WITH_LIMITS
ACTOR: existing Cosmile Claude Worker
SESSION: cosmile:claude.0
MODEL_EFFORT: Claude Opus 4.8 / xhigh
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
BASE: 6486019e0968de5671e43521e5cfb40d03b0bdca
SKILL: /fable-builder; implementation-execution and implementation-report-template
PRODUCT_WRITE: PROHIBITED

PRESERVED_COMPLETE_EVIDENCE:
- Typecheck PASS and order-service correction DB file 46/46 PASS at predecessor `cf92a7c`.
- Seven-file gate: 147 PASS / 1 skipped / 1 stale-contract FAIL; exact corrected dashboard-root test then 1 PASS / 6 skipped at `6486019`.
- Together these cover the focused Vitest set; do not rerun typecheck, the seven-file invocation, the corrected test, or the order-service DB file.

EXACT_COMMAND_CEILING:
1. Run each once, stop at first failure:
   - python3 scripts/operator_authority_migration.dbtest.py
   - python3 scripts/operator_authority_repository.dbtest.py
   - python3 scripts/operator_audit_attribution.dbtest.py
2. If PASS, run once:
   `NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run build`
3. If PASS, start only the built candidate on 127.0.0.1:31081 with O1 disabled/unset and the same closed-loopback DB value; never touch port 3000 or the public preview.
4. After authoritative readiness, use exactly one existing Chromium invocation:
   `/home/leo/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome --headless=new --no-sandbox --disable-gpu --window-size=390,844 --user-data-dir=<owner-only mission temp profile> --dump-dom http://127.0.0.1:31081/lab`
5. Prove categorically: path loaded; Korean Lab heading present; exactly 31 registry detail links; no actionable button/form/command surface.
6. Stop full 31081 process tree; remove `.next`, browser profile, mission temp output, and test residue; verify 31081 closed, disposable DB/process absent, Git clean/upstream-equal.

FORBIDDEN:
- No repeated prior test/typecheck, product edit, install/generate outside the existing build script, schema/migration write, broad test, provider/economic/preview/tmux mutation, second browser invocation, or correction after first failure.

RETURN:
- Compact evidence to existing job paths `121_M5_FINAL_GATE_RESULT.md` and `122_M5_FINAL_GATE_POINTER.md`.
- Include DB/build/browser categories, cleanup, effects 0, exact Git state.
- RETURN_TO foundation-advisor and STOP.
