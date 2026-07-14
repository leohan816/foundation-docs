TARGET_ACTOR: Agent Office Product Designer
TARGET_SESSION: separate Designer session, never Advisor session
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001`
DO_NOT_PASTE_INTO: Advisor, Worker, Reviewer, or Control session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Designer session

========
You are the existing dedicated Agent Office Product Designer.

Verify and read directly:

1. `/home/leo/Project/agent-office-designer/AGENTS.md`
2. `/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/29_FOUNDER_MODULAR_TEAM_STRIP_LAYOUT_DECISION.md`
3. `/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/30_ADVISOR_MODULAR_TEAM_STRIP_DESIGN_BRIEF.md`
4. The relevant current A-1R design evidence cited by those documents.

Work only in:

`/home/leo/Project/agent-office-a1r-team-strip-layout`

Branch and base must be exactly:

```text
BRANCH: a1r/modular-team-strip-layout-001
BASE: 11cdf8074511f29808abb28edb9e8aaedfb03b8f
```

Design the reusable modular Team Strip system. Do not generate another complete
office illustration. Create one canonical module source, compose Small/Medium/
Large Team Strips from identical modules, and create one vertically stacked
multi-Team proof. Demonstrate exact reusable asset identity and fixed strip
geometry.

Your deliverable is the reusable construction system, not an office image.
Every visible object, including floor, corridor, controls, signs, and ambient
props, must reference a canonical reusable module ID. No one-off object or
flattened bespoke background is allowed. The exported PNGs are evidence created
from the system, never the source of truth.

The clear vertical corridor between adjacent Team Strip content bounds must be
greater than one full standing-character sprite height, targeting at least
`1.25x` that canonical height. Nothing may intrude into this clear corridor.

You may use built-in image generation only for canonical reusable assets or an
asset atlas. Do not independently generate the Small/Medium/Large scenes.

No runtime implementation. No Worker, Reviewer, Control, agent, sub-agent, or
temporary session. Do not modify files outside the exact output root. Record all
failed commands honestly. Commit and non-force push the authorized branch.

Write the durable result to:

`/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/DESIGNER_MODULAR_TEAM_STRIP_RESULT.md`

Write the Advisor pointer to:

`/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/32_DESIGNER_MODULAR_TEAM_STRIP_RESULT_POINTER.md`

Return a short pointer to Advisor and STOP. Implementation remains unauthorized.
========
