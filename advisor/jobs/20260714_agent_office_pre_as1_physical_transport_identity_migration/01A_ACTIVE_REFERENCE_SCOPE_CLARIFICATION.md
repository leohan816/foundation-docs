# Active reference scope clarification

This is an in-scope completion clarification, not a new mission or restart.

For every current and future Agent Office operation, replace every active
delivery, routing, preflight, allowlist, session, workspace, and fallback
reference to the historical physical destination with the verified current
destination:

```text
session: agent-office-advisor
sessionId: $26
windowId: @26
paneId: %26
windowIndex: 0
paneIndex: 0
workspace: /home/leo/Project/agent-office
currentCommand: codex
```

After the patch, no active code or configuration may resolve, deliver, or fall
back to:

- session `foundation-advisor`;
- workspace `/home/leo/Project/foundation-advisor`;
- historical fixed session/window/pane IDs.

Historical immutable evidence and audit artifacts remain byte-for-byte,
non-routable, and non-authoritative. The immutable historical
`roleInstanceId: foundation-advisor` may remain only where it is explicitly the
evidence join key for the continuing Actor. It must never be interpreted as a
current physical destination or authority subject.

Required proof includes a targeted active-surface search. Any remaining legacy
token must be classified as one of:

1. immutable historical artifact/evidence;
2. explicit historical-only compatibility fixture that cannot route; or
3. defect to remove before review.

Do not change VibeNews, activate Slack/AS1, send tmux input, or restart the
mission.
