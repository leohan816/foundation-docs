# SIASIU Nomenclature Correction

Leo corrected the official actor and project naming on 2026-07-11:

```text
CANONICAL_PROJECT_NAME: SIASIU
CANONICAL_ACTOR_NAME: SIASIU Worker
CANONICAL_NEW_ACTOR_ID: siasiu
LEGACY_INPUT_ALIAS_ONLY: shashu
```

Active instructions, canonical role documents, registry rows, Agent Office UI,
new manifests, and new result artifacts must use `SIASIU` / `SIASIU Worker`.
Agent Office may accept the legacy internal ID `shashu` only to read existing
historical manifests/events, must normalize it to `siasiu`, and must never render
the legacy name to users or emit it in new canonical data.

Historical reports, ledgers, commits, paths, and evidence are not rewritten.
Their original text remains historical evidence and does not define the active
actor name.
