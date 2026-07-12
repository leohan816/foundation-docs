# Leo/GPT Media Tool Authority Decision

```text
MISSION_ID: AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE
REQUEST_ID: AO12-PWU-07-MEDIA-TOOL-AUTHORITY
DECISION: APPROVE_UBUNTU_FFMPEG_TOOL_INSTALL_FOR_AO12_PROTOTYPE_ONLY
RECORDED_AT_UTC: 2026-07-12

AUTHORIZED:
- Install only the official Ubuntu ffmpeg package from the currently configured Ubuntu package mirror.
- Verify ffmpeg and ffprobe paths, versions, package source, libx264, MP4, GIF, palettegen, and paletteuse capabilities.
- Use the verified tools only for ignored local M1.2 visual-prototype media.

NOT_AUTHORIZED:
- Unrelated package installation or external binary/vendor/npm video tool.
- Public, remote, production, DB, authentication, transport, Hermes, or full integration changes.
- Codec or evidence-format substitution.
- Prototype mutation if installation or capability verification fails.

RETURN_TO: Advisor
DO_NOT_START_ANOTHER_MISSION_AUTOMATICALLY: true
```
