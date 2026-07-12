# Media Tool Install and Prototype Preflight Evidence

Status: `PASS_TO_EXACT_AO12_PWU_07_THROUGH_09_PROTOTYPE_HANDOFF`

## Authority

Leo/GPT approved
`APPROVE_UBUNTU_FFMPEG_TOOL_INSTALL_FOR_AO12_PROTOTYPE_ONLY` in
`68_LEO_GPT_MEDIA_TOOL_AUTHORITY_DECISION.md`.

The first non-interactive Advisor attempt correctly stopped because `sudo`
required interactive authentication. Leo then completed the official package
installation manually. No password or authentication material was requested,
read, stored, or transported by Advisor.

## Verified Toolchain

```text
PACKAGE: ffmpeg
PACKAGE_STATUS: install ok installed
PACKAGE_VERSION: 7:8.0.1-3ubuntu2
SOURCE_CLASS: configured official Ubuntu 26.04 package repository
FFMPEG_PATH: /usr/bin/ffmpeg
FFPROBE_PATH: /usr/bin/ffprobe
FFMPEG_VERSION: 8.0.1-3ubuntu2
FFPROBE_VERSION: 8.0.1-3ubuntu2
LIBX264_ENCODER: present
GIF_ENCODER_AND_MUXER: present
MP4_MUXER: present
WEBM_MUXER: present
PALETTEGEN_FILTER: present
PALETTEUSE_FILTER: present
SCALE_FILTER: present
```

The Playwright-bundled minimal FFmpeg remains unselected because it lacks the
required MP4/H.264, GIF palette, and probe capabilities.

## Other Entry Evidence

- Agent Office branch: `shadow/agent-office-m1-2-spatial-office`
- Exact base/upstream: `9611d0da1479ca5e7a9677641fe767a6b39b4a38`
- Agent Office worktree: clean
- Playwright: `1.61.1`
- Configured Chromium executable: present and executable
- IPv4 `127.0.0.1:4173`: no listener
- Existing user SSH listener: IPv6 loopback `[::1]:4173`; do not terminate or
  modify it; the prototype may use IPv4 `127.0.0.1:4173` only if bind succeeds
- Artifact root ignore rule: not present yet, as expected at the design base

## Sequenced Entry Rule

The Worker's first and only initial mutation is the exact `.gitignore` line:

```text
/artifacts/m1-2-visual-prototype/
```

The Worker must then prove `git check-ignore` succeeds and no tracked artifact
exists before installing Pixi dependencies or changing source. If this
checkpoint fails, it stops. This resolves the otherwise circular requirement
that an ignore rule exist before its own authorized addition.

No full integration, production selection, public/remote access, DB, auth,
transport, Hermes, or external asset authority is granted.
