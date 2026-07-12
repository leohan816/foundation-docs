# Media Tool Authority Decision Request

```text
TARGET_ACTOR: Leo/GPT
MISSION_ID: AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE
REQUEST_ID: AO12-PWU-07-MEDIA-TOOL-AUTHORITY
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
CURRENT_STATE: AO12-PWU-06 Fable5 design review PASS accepted; prototype source changes have not started

CONFIRMED_FACTS:
- Required delivery includes WebM, MP4, GIF, and five PNG files.
- Host PATH has no full ffmpeg or ffprobe installation.
- Playwright's bundled ffmpeg can record WebM but cannot produce required MP4/GIF or probe duration.
- Ubuntu 26.04 configured repositories offer official package ffmpeg 7:8.0.1-3ubuntu2.
- The reviewed design requires a separately approved converter installation and fails closed without it.

QUESTION:
Authorize installation of the official Ubuntu ffmpeg package solely as the local prototype media conversion/probe tool?

RECOMMENDED_OPTION:
APPROVE_UBUNTU_FFMPEG_TOOL_INSTALL_FOR_AO12_PROTOTYPE_ONLY

EXACT_ALLOWED_ACTION:
- Install official Ubuntu package ffmpeg through apt from the currently configured Ubuntu mirror.
- Record installed package version, executable paths, package source, and capabilities for ffprobe, libx264, MP4, GIF, palettegen, and paletteuse.
- Use it only for the ignored local M1.2 prototype media artifacts.

FORBIDDEN:
- No unrelated package installation.
- No external binary download, vendor installer, npm video package, or codec substitution.
- No credential/secret read or output.
- No public/remote/production listener.
- No runtime authority, DB, auth, transport, Hermes, or full integration authorization.
- No prototype source mutation if installation or capability verification fails.

SAFE_DEFAULT:
Keep AO12-PWU-07 BLOCKED and make no source/package/artifact mutation.

RETURN_RESULT_TO: Advisor
DO_NOT_START_ANOTHER_MISSION_AUTOMATICALLY: true
```
