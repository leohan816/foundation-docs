# M5-E5 Final Browser Evidence — Worker Handoff

MISSION_ID: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
VERDICT: PROCEED_WITH_LIMITS
ROUND: 5_OF_5_FINAL
ACTOR: existing Cosmile Claude Worker
SESSION: cosmile:claude.0
MODEL_EFFORT: Claude Opus 4.8 / xhigh
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
BASE: 6486019e0968de5671e43521e5cfb40d03b0bdca
SKILL: /fable-builder; implementation-execution and implementation-report-template
PRODUCT_AND_DOCS_SOURCE_WRITE: PROHIBITED

PRESERVED_EVIDENCE:
- Typecheck, focused Vitest/contracts, four disposable DB gates, and prior build PASS.
- M5 HOLD at docs `5a7659a`; first browser attempt invalid from shell grouping, not a candidate verdict.
- Do not rerun any preserved test, typecheck, or DB gate.

EXACT_COMMAND_CEILING:
1. Rebuild once only to recreate `.next`:
   `NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run build`
2. Create one owner-only temporary root/profile/DOM/stderr area.
3. Start the built candidate as its own process group on 127.0.0.1:31081 with O1 variables unset/disabled and the same closed-loopback DB value. Keep variable assignments and backgrounding in separate shell statements.
4. Wait for authoritative TCP LISTEN readiness while confirming the process group remains alive. Do not issue an HTTP page request for readiness.
5. Execute exactly one Chromium request:
   `/home/leo/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome --headless=new --no-sandbox --disable-gpu --window-size=390,844 --user-data-dir=<profile> --dump-dom http://127.0.0.1:31081/lab`
6. From that single DOM, prove categorically: Korean Lab heading present; exactly 31 distinct `/lab/<capabilityId>` anchor hrefs; no button, form, or executable command control.
7. Unconditionally stop only the 31081 process group; remove `.next` and all M5-E5 temporary files; verify 31081/process/temp/build residue absent and Git clean/upstream-equal.

FORBIDDEN:
- No product/docs source edit, typecheck, test, DB, provider/economic/public-preview action, port 3000/3001/3002 touch, second Chromium/HTTP request, retry, correction, or sixth round.

RETURN:
- First failure: write `125_M5_E5_RESULT.md` and `126_M5_E5_POINTER.md` as FINAL HOLD, cleanup, STOP.
- Success: write the same paths as PASS with exact categorical evidence, cleanup, effects 0, Git state; RETURN_TO foundation-advisor and STOP before Reviewer.
