# Batch C Visual Rework Clarification

TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same active `agent-office` session
RETURN_RESULT_TO: Advisor

The isolated-HOME diagnostic is sufficient reproduction evidence for the
font/runtime-dependent three-snapshot failure. Advisor directly inspected the
earlier failed images and confirmed the dominant divergence was fallback font
metrics, not an accepted final cue baseline.

Do not spend more time reverse-engineering Playwright internals. Continue the
already authorized rework as follows:

1. Keep product code, config, dependency, and test logic unchanged.
2. Under the current authorized local runtime from `playwright.config.ts`, run
   the explicit all-snapshot update for the three tests.
3. Require exactly the three authorized PNG paths to change; STOP if another
   path changes.
4. Directly inspect the new images against the final effective cue code.
5. Run the complete sequential verification from the handoff and require 10/10.
6. Record the isolated-HOME failure as a local browser/font runtime prerequisite
   and Batch E operations/portability verification item. Do not claim portable
   visual determinism outside the configured runtime.
7. Commit/push only the three baseline images, then update the exact result and
   pointer as already instructed.

This clarification does not authorize a source/config patch or Batch D.
