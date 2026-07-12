# Grok Pilot Entry Effort Conflict Decision Request

Status: `DESIGN_ENTRY_GATE_NEEDS_LEO_DECISION`

## Confirmed Facts

- Existing `agent-office-grok/$16/@16/%16` is a real authenticated Grok Build
  process: `grok 0.2.93 (f00f96316d)`.
- `grok models` reports authenticated `grok.com` access and exact selected model
  slug `grok-build`.
- The process was originally launched with `--reasoning-effort high`, but the
  existing TUI does not treat that as enforceable evidence.
- Advisor sent the exact committed `/effort medium` control to the verified pane.
- Grok returned: `current model does not support reasoning effort`.
- Therefore the actual effort is `NOT_CONFIGURABLE_FOR_GROK_BUILD`, not `medium`,
  `high`, or another inferred value.
- No qualification launcher, implementation launcher, code change, test, Worker
  result, or Reviewer dispatch occurred.

## Conflict

Leo/GPT specified intended model `Grok 4.5` through `grok-build` and intended
effort `medium`. The selected model is available, but its authenticated CLI route
does not support the requested effort control. Switching to another exposed model
would violate the intended model and the explicit no-model-switching boundary.

## Options

### Option A - Recommended

Authorize this one pilot with:

```text
MODEL: grok-build
EFFORT: NOT_CONFIGURABLE_BY_MODEL__USE_PROVIDER_DEFAULT
```

The evaluation must preserve that exact label and must not compare cost/quality
as if a medium tier were proven.

### Option B

Hold the pilot until xAI exposes a supported model/effort combination matching
the intended configuration.

## Safe Default

`HOLD_BEFORE_QUALIFICATION_AND_IMPLEMENTATION`

## Exact Decision Requested

Return one of:

- `APPROVE_GROK_BUILD_PROVIDER_DEFAULT_FOR_PILOT_001`
- `HOLD_GROK_PILOT_UNTIL_MEDIUM_EFFORT_IS_SUPPORTED`

No larger Worker promotion is requested or implied.
