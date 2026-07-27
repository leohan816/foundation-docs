# WORKER RESULT — OWNED RUNTIME RESTART AND LIVENESS

Status: **PASS** — one owned restart, both routes live, product untouched.

- Handoff `222` at docs `fc16294551b2887448328e85d975c8cdc1ed5a10`; computed sha256
  `f4fbb88cbb83e68d4da60d3d9e34769460a98851a90e2d6a2210804f76caf55e` — matched before acting.
- Product HEAD `52343f5c6633558ac6ec489b201e5d7746762ab5` — exact pin, clean and upstream-equal both before and after.
- Docs tree was clean at the pinned commit before this write; **not committed or pushed**, per the handoff.

## 1. Preflight reverification (read-only)

| Check | Result |
|---|---|
| Product HEAD / clean / upstream-equal | matched pin · 0 changed paths · equal |
| Listener on `127.0.0.1:3000` | present, in the pinned owned process group |
| Owned group membership | leader + dev server + one worker, all `leo` |
| Listener process CWD | the mission `app` directory |
| Wrapper ownership / mode | `leo:leo` · `0700` |
| Wrapper static contract | `O1_TOSS_MODE=test` ×1 · `O1_TOSS_SANDBOX_ONESHOT=0` ×1 · `unset O1_TOSS_LOCAL_SUBSTITUTE` ×1 |
| Wrapper env surface | read as **names only** (16 names); no value was printed, persisted, hashed or copied |
| Pre-stop runtime env | mode exactly `test` · one-shot exactly `0` · local substitute **absent** |
| My own shell process group | different from the owned group (self-signal impossible) |

## 2. Stop (single TERM to the owned group only)

- `TERM` sent to the pinned process group alone. No tmux, agent, DB, browser or other service was touched.
- Port `3000` observed closed; all three group members confirmed gone (no survivor, no zombie).

## 3. Start (exactly once)

- The existing owner-safe wrapper started once, detached, on port `3000`, in a **new** session/process group whose
  leader is parented to init — trackable and separate from every agent shell.
- Only the two existing owner-safe artifacts were used: `candidate.pid` and `candidate-dev.log`, both `leo:leo 0600`.
- `candidate.pid` records the **true** group leader: the launcher's immediate child exited into the wrapper's own
  session, so the recorded value was corrected to the real group id after readiness rather than left stale.

## 4. Readiness and runtime status (booleans/counts only)

| Check | Result |
|---|---|
| TCP readiness on `127.0.0.1:3000` | reached within the wait bound |
| New group shape | leader + dev server + one worker, all `leo` |
| Listener CWD | the mission `app` directory |
| Served product HEAD | the exact pin |
| `O1_TOSS_MODE` | exactly `test` |
| `O1_TOSS_SANDBOX_ONESHOT` | exactly `0` (one-shot OFF) |
| `O1_TOSS_LOCAL_SUBSTITUTE` | **absent** (0 occurrences) |
| `COSMILE_O1_RUNTIME_ENABLED` | exactly `true` |
| `DATABASE_URL` | name present; value never read out, printed, hashed or copied |

## 5. Route liveness (status class only)

| Route | Status class |
|---|---|
| `/dashboard` | `2xx` |
| `/dashboard/orders` | `2xx` |

- Plain local HTTP GETs with the body discarded and **redirect following disabled**, so no outbound hop could occur.
- No authentication, browser, Google/Toss/provider call, mutation, command or economic action of any kind.
- Compile health over the current run's log tail, counts only: `Failed to compile` 0 · `Unhandled Runtime Error` 0 ·
  `Module not found` 0.

## 6. Final state

- The healthy preview runtime is **left running** on `127.0.0.1:3000`.
- Product `52343f5`, clean and upstream-equal. Schema 0, DB writes 0, product delta 0.

## Not proven

- Status class only: no response body, DOM, rendered value or screenshot was inspected, so the two pages are proven
  to **serve**, not to display any particular content.
- No authenticated operator view was exercised; whichever surface an unauthenticated request reaches is what returned
  `2xx`.
- No build, typecheck, test suite, DB or provider verification was run under this handoff.

RETURN_TO: foundation-advisor
