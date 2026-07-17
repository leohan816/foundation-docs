# AS1 Phase B R2 Recovery Design Patch Coordinate Correction

The `governance patch authority` line in handoff 91 names its parent commit,
`5711729fd06d2f0a589fed7934fc4ac0136256ff`, which contains independent review
result 90 but cannot contain handoff 91 itself.

The exact committed dispatch containing handoff 91 and run prompt 91A is:

`b0c76339803a6e77e931786816af0ef670671657`

Its parent remains:

`5711729fd06d2f0a589fed7934fc4ac0136256ff`

This correction changes no scope, finding, allowed path, profile, authority, or
acceptance criterion. The Designer must record any failed read caused by the
incorrect coordinate honestly and continue against the exact handoff at
`b0c76339803a6e77e931786816af0ef670671657`.
