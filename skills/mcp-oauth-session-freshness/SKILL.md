---
name: mcp-oauth-session-freshness
description: Use when a remote MCP server or OAuth-backed integration is configured and CLI login succeeds, but the current desktop agent session still returns Auth required, missing tools, stale credentials, failed writes, or inconsistent access to external services.
---

# MCP OAuth Session Freshness

## Overview

Use this skill when remote MCP or OAuth-backed tools behave differently in CLI diagnostics and the active desktop session. The core rule is: configuration correctness and current-session credential freshness are separate states.

## State Layers

Check these independently:

1. MCP server configured
2. feature flag or remote MCP client enabled
3. OAuth login completed in CLI
4. current desktop session has loaded the refreshed auth state
5. tools are visible in the active turn
6. read call succeeds
7. write call succeeds

Do not assume layer 3 implies layer 4.

## Workflow

1. Verify the MCP server appears in CLI list/status.
2. Verify OAuth login status.
3. In the active desktop session, run a cheap read-only tool call.
4. If the current session still returns `Auth required`, stop retrying writes.
5. Save pending write content locally.
6. Restart or refresh the desktop session.
7. Re-run the read-only tool call before retrying writes.

## Long Write Strategy

For long Notion-like writes:

- split content into child pages or smaller units
- preserve existing child page/database blocks when replacing parent content
- keep a local draft before remote writes
- avoid destructive replacement when auth state is uncertain

If a write fails after partial success, fetch the current remote page before retrying.

## Common Misdiagnoses

| Symptom | Better Interpretation |
| --- | --- |
| CLI login succeeded but tool says Auth required | active session has stale auth |
| config file looks correct | session may still need reload |
| long write fails midway | split content and preserve child blocks |
| tool unavailable this turn | current session did not hot-load MCP tools |

## Completion Criteria

Finish when:

- a read-only MCP call works in the current session
- pending write content is saved locally for retry
- remote write succeeds after session refresh
- or the next required action is a desktop/session restart

