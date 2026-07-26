# M5B operations-menu usability diagnosis — Pointer

```text
WORKER_RESULT_POINTER
MISSION: COSMILE_CORE_OPERATIONS_DASHBOARD_V1
MODULE: M5B_OPERATIONS_MENU_USABILITY_DIAGNOSIS
ACTOR: existing Cosmile Worker (cosmile:claude.0), Opus 5/xhigh, /fable-builder
RESULT_FILE: advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/84_M5B_OPERATIONS_MENU_USABILITY_DIAGNOSIS_RESULT.md
HANDOFF: 83_M5B_OPERATIONS_MENU_USABILITY_DIAGNOSIS_HANDOFF.md (docs e2e27d59, blob 53d81df7, SHA256 5f3d1465)
VERDICT: USABLE_AT_FROZEN_DESKTOP_VIEWPORT — no product correction proposed
BASIS: captured 1440x900 geometry — nav present, list block, rail 250x484 (11 rows x 44px), 11/11 fully visible, no horizontal overflow
MECHANISM: rail rules key off Tailwind lg (1024px); sub-lg is the designed bounded strip (intrinsic 1336px), matching the captured 980 (7/11) and 390 (3/11) cases. Separately, SpaceSwitcher is sticky while OperationsNav is not, so any downward scroll leaves only the switcher visible.
INSTRUCTION_1_VIEWPORT: minimum 1024 CSS px; captured proof at 1440x900; 1024-1439 derived from the breakpoint, not captured
INSTRUCTION_2_ZOOM: 100% page zoom, no device emulation/responsive mode; side-docked DevTools reduces the CSS viewport
INSTRUCTION_3_SCROLL: operations frame at scrollTop 0 (Home) — the rail is not sticky, only the switcher is
SEPARATE_OBSERVATION: 768-1023 band ships the mobile strip rather than design §8's 72px tablet rail — divergence already declared in the M3 result; not the cause here; nothing proposed or changed
NOT_PROVEN: no browser rerun; which of width/zoom/scroll applied to Leo's session is not determinable from the supplied evidence
PRODUCT: untouched — no write, commit or push
DOCS: only 84 and 85 authored and committed
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
```
