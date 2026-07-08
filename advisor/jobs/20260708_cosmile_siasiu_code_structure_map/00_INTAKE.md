# 00 Intake - Cosmile/SIASIU Code Structure Map

## Job

`20260708_cosmile_siasiu_code_structure_map`

## Leo/GPT Instruction Summary

Run a read-only Advisor audit of the actual Cosmile and SIASIU code structure, with limited Foundation boundary confirmation, so future Advisor briefs for V3-11C2 and later work can name the correct files, boundaries, review needs, and missing decisions.

This is not an implementation job. It is not a Worker brief job. It is not a runtime repo modification job.

## Task Goal

Map the current code structure and Foundation boundary for:

- Cosmile commerce, checkout, cart, order, memory, recommendation, and Foundation adapter code.
- SIASIU consultation request/response flow, Foundation adapter use, provider flag, and service memory boundary.
- Foundation SSC/FRC contract and role boundary needed to understand why V3-11D is HOLD and why V3-11C2 can be scoped without semantic extraction.
- Future V3-11C2 Worker/Reviewer brief preparation, without writing the Worker brief in this job.

## Non-Goals

- Do not implement V3-11C2.
- Do not write a Worker brief.
- Do not create implementation instructions.
- Do not modify runtime repos.
- Do not modify schema, migrations, DB data, secrets, prod/live/main, or service code.
- Do not read or use `../skill`.

## Allowed Read

- `./AGENTS.md`
- `./CLAUDE.md`
- `./README.md`
- `../foundation-docs/advisor/jobs/20260708_cross_repo_v1_to_v3_current_state_audit/**`
- `../foundation-docs/advisor/jobs/20260708_skill_role_boundary_delta_audit/**`
- `../Cosmile`
- `../SIASIU`
- `../foundation-control` only for Foundation boundary / FRC contract confirmation
- `../foundation-docs/docs/reports/control/**` only when needed to cross-check V3 status

## Allowed Write

- `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/**`

## Forbidden Actions

- Modify, commit, or push `../Cosmile`.
- Modify, commit, or push `../SIASIU`.
- Modify, commit, or push `../foundation-control`.
- Modify, commit, or push `../skill`.
- Modify, commit, or push `../foundation-advisor`.
- Modify runtime code.
- Modify schema or migrations.
- Write DB data.
- Access prod/live/main/secret.
- Create a Worker brief.
- Create implementation instructions.
- Start V3-11C2 implementation.

## Initial Assumptions

- Runtime behavior is determined by actual runtime repo code.
- `foundation-docs` is evidence/archive, not runtime source-of-truth.
- Foundation contracts/docs are canonical for reasoning, product, ingredient, safety, and structured semantic authority.
- Cosmile and SIASIU are service/runtime layers.
- This job may publish the Advisor report if runtime repo changes are zero and staged files are only under `../foundation-docs/advisor/`.

## Method

Two-pass method:

1. Inventory code/docs at repo and app level without deep-reading everything.
2. Deep-check only load-bearing files that determine current structure, V3-11C2 relevance, memory/commerce/consultation boundaries, and Foundation contract behavior.

No tests were run in this Advisor audit.
