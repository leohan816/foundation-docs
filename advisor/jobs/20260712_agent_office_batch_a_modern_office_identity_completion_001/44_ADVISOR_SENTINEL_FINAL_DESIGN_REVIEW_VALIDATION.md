# Advisor Validation - Sentinel Final Design Delta Review

## Verdict

`ACCEPT_NEEDS_PATCH__ROUTE_THREE_EVIDENCE_BACKED_CORRECTIONS_TO_SAME_CONTROL`

The same independent Sentinel returned `NEEDS_PATCH` after reproducing the exact
Vite/Rolldown build in memory and comparing the current documents to source.
The findings are direct, technical, and patchable inside the approved design
scope. No Founder decision is required.

## Accepted Findings

1. **FDR-1 / PRC-5 regression:** `FIT_ALL` is not a `PixelCameraState.mode`.
   The actual full-office camera is `fullOfficeCamera(...)` with mode
   `FULL_OFFICE`. A renderable pod lane must also use non-sentinel `AdvisorTeam`,
   never actor-level `UNASSIGNED`.
2. **FDR-2 / PRC-6 partial:** raw and wrapper shapes are separated, but the raw
   untrusted-boundary contract lacks exact frame/actor/envelope/diagnostic keys,
   enum rules, revision equality, and canonical UTC validation.
3. **FDR-3 / PRC-8 partial:** the exact Vite invocation returns absolute
   `index.html` as the eager `facadeModuleId`; `src/ui/main.tsx` is a module in
   that chunk, not its facade.

## Preserved Closures

- PRC-1, PRC-2, PRC-3, PRC-4, and PRC-7 are closed.
- Project key, actor priority, pod omission, selection, viewport/time, wrapper,
  structural projection, and stale-text corrections remain preserved.
- No source/test/config/package/media change occurred.
- Product, accessibility, security, authority, fallback, Channy, rollback,
  no-Grok, excluded-session, and Batch B-E boundaries remain unchanged.

## Routing

- next actor: same `foundation-control` session;
- patch scope: the exact three findings only in the four canonical docs;
- after patch: Advisor diff validation and same Sentinel narrow re-review;
- Worker: remains stopped clean;
- Leo/GPT: no action.

