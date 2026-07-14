# Designer Modular Team Strip Result Publication Handoff

TARGET_ACTOR: Agent Office Product Designer
TARGET_SESSION: separate existing Designer session, never Advisor session
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001`
DO_NOT_PASTE_INTO: Advisor, Worker, Reviewer, or Control session
RETURN_RESULT_TO: Advisor

## Task

Publish the already-written, already-validated modular Team Strip result and
pointer. Do not edit their content and do not create another design commit.

Exact files:

1. `/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/DESIGNER_MODULAR_TEAM_STRIP_RESULT.md`
2. `/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/32_DESIGNER_MODULAR_TEAM_STRIP_RESULT_POINTER.md`

Required procedure:

1. Verify the two files still match the result you authored for candidate
   `99beac3e07138e11dadd839c6016cc9f2e08b5ba`.
2. Verify `foundation-docs` is on `main` and equals `origin/main` before the
   publication commit, except for existing unrelated dirty files.
3. Stage exactly the two paths above with path-specific `git add --`.
4. Verify the staged path list contains exactly those two files.
5. Run `git diff --cached --check`.
6. Commit with a documentation-only result-publication subject.
7. Push `main` without force.
8. Verify local `HEAD` equals `origin/main` and the two files are committed.
9. Leave every unrelated modified or untracked file untouched and unstaged.
10. Return the exact foundation-docs commit and stop.

Forbidden:

- Editing the Agent Office candidate or either result file.
- Staging any unrelated dirty file.
- Force push, reset, checkout, clean, stash, or destructive Git operation.
- Worker, Reviewer, Control, agent, or sub-agent dispatch.
- Runtime implementation or another design pass.
