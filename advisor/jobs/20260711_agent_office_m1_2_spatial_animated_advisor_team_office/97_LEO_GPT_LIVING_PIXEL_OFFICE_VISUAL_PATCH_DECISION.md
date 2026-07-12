# Leo/GPT Living Pixel-Office Visual Patch Decision

Status: `REQUEST_VISUAL_PATCH__IMPLEMENTATION_AND_NARROW_REVIEW_AUTHORIZED`

## Exact subject

- Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- Reviewed candidate: `c535877b61ad8a1e3d74dca5c6fec0ada4cac3f8`
- Prior Fable5 verdict: clean technical prototype `PASS`
- Founder decision: `REQUEST_VISUAL_PATCH`
- Full integration authorization: `NOT_GRANTED`

## Required bounded patch

### Actor session visibility

Every visible actor must expose role, model, session, and operational state in a
compact always-visible label near the actor. Text, icon/glyph, and state ring
must be combined; color alone is insufficient.

Click and keyboard activation must open a full detail drawer containing:

- role;
- project;
- Advisor Team;
- reports-to Advisor;
- session name;
- model;
- current state;
- mission;
- WorkUnit; and
- latest evidence freshness.

Unknown information remains literal `UNKNOWN`. It must not be inferred from
terminal prose, visual proximity, timestamps, session names, or project colors.

### Channy motion and appearance

Reduce Channy route and animation speed substantially. Add longer pauses and a
natural deterministic sequence covering walk, stop, sniff, sit, eat, drink,
sleep, and play. Avoid constant roaming, abrupt turns, and rapid route changes.
Use bounded smooth easing and slower path transitions.

Redraw Channy as an original pixel-art Bedlington Terrier with a rounded
wool-like head, narrow muzzle, arched back, slim legs, cream/light-gray coat,
and subtle darker ear accents.

### Modern office palette

Replace the heavy brown/dark-terminal presentation with light oak, warm gray,
sand, ivory, glass-blue, and muted charcoal. Project colors remain accents on
clothing, signs, and desks rather than full-room fills. Reduce harsh outlines
and HUD dominance while keeping the office world primary.

## Required evidence

- updated WebM and MP4;
- updated GIF;
- `team-activity.png` visibly demonstrating actor session labels;
- `channy.png` as a readable Channy close-up;
- `full-office.png` demonstrating the modern palette;
- updated mobile and lounge evidence;
- exact hashes, dimensions, durations, and reproduction commands;
- direct tests for unknown handling, keyboard drawer access, label semantics,
  Channy sequence/speed/easing, modern palette, and preserved boundaries;
- same-session Fable5 narrow visual/accessibility delta review.

The existing eight ignored media filenames remain the delivery contract. No
large media is committed. The exact 26 reconciled historical baselines must
remain byte-identical to the reviewed candidate. Only the exact 13 living
prototype baselines may be updated by this patch.

## Preserved boundaries

- current animation architecture;
- structured-evidence-only behavior;
- Single Advisor Team Principle;
- no actor cloning;
- security and authority boundaries;
- accessibility and static/M1 fallback;
- prototype-only scope;
- no public/remote/DB/Hermes/external asset scope;
- no full integration or another mission.
