---
name: codex-plugin-recovery-api-mode
description: Use when a Codex-style desktop or CLI app is running in API-key mode and plugins, tools, or skills appear disabled, unavailable, greyed out, or missing from the current conversation despite local plugin caches or manifests existing.
---

# Codex Plugin Recovery API Mode

## Overview

Use this skill to recover local plugin and skill routing without assuming the current conversation can hot-load every plugin. The goal is to distinguish UI exposure, config state, cached manifests, local skills, and actual tool availability.

## Rules

- Do not restart or kill the app unless the user asks or the recovery requires it.
- Do not run commands known to rewrite or minimize config unless you have a backup.
- Prefer tools already visible in the current session.
- If a native plugin tool is not visible, inspect local plugin manifests and route through local skills when possible.
- Ask before using credentials, posting externally, or changing live services.

## Recovery Workflow

1. Snapshot current config and plugin cache metadata.
2. List tools visible in the current session.
3. Inspect local plugin manifests and skill folders.
4. Identify whether the issue is:
   - UI button hidden or disabled
   - plugin configured but not hot-loaded
   - skill metadata invalid
   - auth required
   - config overwritten by a diagnostic command
   - plugin exists but exposes no safe local path
5. Route through the local skill if the plugin tool is unavailable.
6. Only recommend restart after local routing options are exhausted.

## Skill Fallback Pattern

When a plugin is cached but not exposed as a tool:

1. Find the plugin's local skill or workflow document.
2. Read its `SKILL.md`.
3. Treat it as an active local skill for the current turn.
4. Use scripts or references bundled with that skill.
5. If real API calls need auth, stop and ask.

This keeps the conversation useful even when the app UI is behind the local filesystem state.

## Config Safety

Before running diagnostics, know whether they mutate config. If unsure:

```powershell
Copy-Item "$HOME\.codex\config.toml" "$HOME\.codex\config.toml.bak-plugin-recovery"
```

After any diagnostic command, compare key fields such as provider, auth mode, plugin enablement, and feature flags.

## Common Failure Modes

| Symptom | Likely Cause | First Move |
| --- | --- | --- |
| Plugin button greyed out | UI assumes account-login mode | Inspect local cache and skills |
| Tool missing this turn | Current session did not hot-load it | Use local skill fallback |
| Skill skipped at startup | Invalid frontmatter or long description | Validate `SKILL.md` metadata |
| Config suddenly minimal | Diagnostic command rewrote config | Restore backup and avoid that command |
| OAuth fixed in CLI but tool still fails | Current desktop session did not reload MCP auth | Finish with restart guidance |

## Completion Criteria

Finish when:

- the user can proceed through a visible tool or local skill fallback
- the missing plugin is traced to config, auth, metadata, or session hot-load state
- the next action is a concrete restart, login, validation, or repair step

