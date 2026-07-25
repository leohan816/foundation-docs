# Lab Button Classification — Worker Result

DECISION: `ALL_HARMLESS_SHELL_OR_NAVIGATION`

MISSION_ID: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
ACTOR: existing Cosmile Worker · SESSION `cosmile` · Claude Opus 5 / xhigh · SKILL `/fable-builder`
HANDOFF PIN: `138_...WORKER_HANDOFF.md` blob `9f7dda32e972cd416c1fe9464449afe43f00a8f2`, SHA256 `68916f69...4d8a83d` in docs commit `c265cf0ec030eee6141460e205e621a799427f20` — verified byte-exact.
BASE `6486019e0968de5671e43521e5cfb40d03b0bdca` · read-only, 11 source paths + `134_M5_E7_WORKER_RESULT.md`, nothing else. No runtime/browser/build/test/DB/provider command. No write to source or configuration. Product delta 0.

## Branch reconciliation with the E7 count of 13

`app/src/app/layout.tsx:20-50` renders the storefront chrome for every non-`/console` path, so `/lab` mounts `AppHeader`, `MallTabs`, `ShippingPopup`, `CategoryDrawer`, `ProductCartFab` around the Lab page. Each receives the same single `o1` boolean decided once in that layout. The two possible branches give distinct totals:

- `o1 = true`: 3 buttons / 43 anchors.
- `o1 = false`: 13 buttons / 46 anchors.

E7 observed 13 buttons and 46 anchors, which matches the `o1 = false` branch exactly and the other branch on neither figure. Anchors decompose as 31 Lab candidate links + 3 space-switcher links + 3 header links + 4 drawer item links + 5 storefront tab links = 46. This is a deterministic count reconciliation; `o1RuntimeEnabled` was outside the read ceiling and was not read.

## Index of the 13 buttons

| # | Source | Count | `/lab` render condition | Interaction / handler | Classification | Violates contract |
|---|---|---|---|---|---|---|
| 1 | `AppHeader.tsx:69` | 1 | sub-header branch, `path !== "/"` | `router.back()` — history navigation | global navigation/shell | No |
| 2 | `AppHeader.tsx:70` | 1 | same | `open()` — drawer open, local UI state | global navigation/shell | No |
| 3 | `CategoryDrawer.tsx:123` | 1 | `LegacyCategoryDrawer` always mounted; overlay hidden until opened | `close()` — local UI state, `aria-label="닫기"` | harmless accessibility UI | No |
| 4 | `CategoryDrawer.tsx:136-144` | 10 | same; one per `CATEGORY_TREE` group (`categoryTree.ts:13-135` = 10 groups) | `setActive(i)` — local UI state selecting which group's `Link` list shows | global navigation/shell | No |

Total 13. Every handler is history navigation or component-local React state. None submits a form, calls a server action, mutates data, or reaches a provider.

Source branches that render zero buttons at `/lab`, confirming none of the 13 is Lab-local: `app/src/app/lab/layout.tsx` (frame only), `app/src/app/lab/page.tsx` (heading, static status list, and 31 read-only `Link` details — no `button`), `OperatorShell.tsx` (3 space `Link`s), `MallTabs.tsx` (`Link`s only), `CategoryNav.tsx` (`Link`s only, and mounted only on the `"/"` header branch, so absent at `/lab`), `ProductCartFab.tsx` (returns `null` unless the path starts with `/products/`).

## Contract judgment

The governing contract forbids Lab-local product, economic, operational, approval, mutation, promotion, or execution controls and permits ordinary global navigation and harmless shell controls. All 13 buttons are emitted by the global storefront chrome of the root layout, not by any Lab source file, and all are navigation or local UI state. Lab's own surface exposes navigation links only, and the mock/deferred capability registry stays read-only. No violation found; page-wide `button = 0` is a stricter oracle than the contract requires.

## Not proven / residual risk

- `ShippingPopup.tsx:44-47` mounts 2 further buttons ("오늘 하루 보지 않기", "닫기") once its `useEffect` runs; E7 measured at DOMContentLoaded (`readyState: interactive`) with the pre-effect state, so the page-wide total can legitimately become 15 after hydration. Both are shell dismissal controls writing only `localStorage`, so the classification is unchanged, but a corrected page-wide count assertion would be timing-brittle.
- A corrected assertion should therefore be scoped to Lab-local sources rather than to a page-wide button total. Choosing and landing that correction is an Advisor/design decision; no test, fixture, or source was changed here.
- The branch determination is a count reconciliation, not a direct read of the runtime flag; if the Advisor requires a direct read, `o1NonprodConfig` must be added to the read ceiling.
- Classification rests on the 11 permitted paths only; no unrelated source was inspected and no capability IDs are recorded.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
