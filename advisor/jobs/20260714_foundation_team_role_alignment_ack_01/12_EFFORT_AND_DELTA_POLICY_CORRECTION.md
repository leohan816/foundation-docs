# Leo/GPT Correction — Effort and Delta Policy

Status: `ACTIVE_DIRECT_INSTRUCTION`

Recorded after the initial role-alignment audit.

## Effort

Effort is not optimized for the cheapest label. The Advisor selects effort from
the work unit's difficulty, uncertainty, failure cost, risk, and responsibility.

```text
IMPLEMENTATION: ultracode
TEST / VERIFICATION / TEST INTERPRETATION: max
OTHER WORK: select by proven difficulty and risk; raise whenever needed
```

Do not downshift solely to save tokens. Cache invalidation and history re-read
cost are relevant only when the existing effort is already sufficient. Required
capability wins over cache savings.

## Delta scope

Effort depth and verification breadth are different decisions:

- a narrow patch receives narrow affected tests at `max` effort;
- the same Reviewer performs narrow delta re-review;
- shared infrastructure, security/data/contract boundaries, cross-project
  consumers, or direct evidence of broader impact expand the test/review set;
- full suites are not automatic merely because test effort is `max`.

If the proper delta or rerun threshold remains uncertain,
`foundation-advisor` may ask `agent-office-advisor` for clarification under the
direct Leo/GPT authorization in this correction. Historical Actor identity and
evidence remain separate; consultation does not merge the two Advisors.
