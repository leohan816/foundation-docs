# Council Mission Protocol v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
CURRENT_COUNCIL_MISSION: NONE
```

This protocol governs future Council missions. It authorizes no current mission.

## 1. Admission gate

The Strategist first records the trigger decision. When Council is required, Leo or the
Strategy Decision Architect must still provide a bounded mission brief. No Challenger
self-assigns a subject.

## 2. Required mission brief fields

Every brief fixes:

- mission ID and exact decision question;
- subject and excluded scope;
- exact evidence pins and allowed reads;
- facts already verified versus assumptions and unknowns;
- `COUNCIL_COMPOSITION` with exact selected roles;
- each selected role's category: `CORE | SPECIALIST`;
- timebox;
- role-specific questions without changing canonical roles;
- report path and report schema;
- report language: `ENGLISH`;
- whether a mediated disagreement round is allowed;
- no-patch, no-dispatch, no-risk-acceptance boundary;
- stop and return conditions.

## 3. Composition and delivery

- Only selected roles receive the brief, subject, another Challenger's findings, debate
  questions, or report-writing authority.
- Unselected sessions remain `READY_IDLE` with mission `NONE` and may not inspect the
  subject or selected-role output.
- The Strategist selects the smallest sufficient composition; all nine roles are not the
  default composition.
- Every selected role receives the same subject/evidence baseline plus its own lens
  questions.
- No role receives another role's initial output.

## 4. Independent initial pass

Each selected Challenger:

1. re-ACKs its role and mission pin;
2. stays within its primary lens;
3. separates facts, inference, assumptions, and unknowns;
4. records overlap without taking over another lens;
5. writes its report in English only to its authorized file in the shared run directory;
6. returns to the Strategy Decision Architect and stops.

## 5. Optional mediated disagreement

There is no direct inter-session communication. If the brief authorizes mediation, the
Strategist may provide bounded finding excerpts and explicit questions in a later round.
Original opinions remain unchanged. No pressure toward agreement is allowed.

## 6. Strategist disposition

The Strategy Decision Architect records each material finding as `ACCEPTED`, `REJECTED`,
or `UNRESOLVED`, including rationale and any minority view. This is strategic synthesis,
not Founder approval or independent review.

## 7. Storage and write boundary

Reports may be written only to:

```text
/home/leo/Project/council/runs/<MISSION_ID>/
```

Role homes, other role directories, product repositories, reviewed subjects, and PRs are
read-only and may not receive generated Council artifacts.

## 8. Closure

Council closure returns to the Strategist and then Leo. It does not dispatch the Advisor,
activate implementation, accept risk, or begin a next mission. With no mission brief,
all sessions remain `CURRENT_COUNCIL_MISSION: NONE`; unselected Specialists additionally
remain `CURRENT_SPECIALIST_MISSION: NONE` and `READINESS: READY_IDLE`.
