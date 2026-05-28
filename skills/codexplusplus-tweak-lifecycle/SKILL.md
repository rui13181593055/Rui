---
name: codexplusplus-tweak-lifecycle
description: Use when Codex++ tweaks, renderer preload code, local UI extensions, safe mode, tweak discovery, settings injection, or plugin-entry surfaces appear installed but are invisible, disabled, stale, or only partly loaded.
---

# Codex++ Tweak Lifecycle

## Overview

Use this skill when UI extensions are installed but behavior is missing or partial. The rule is: distinguish installation, discovery, preload registration, renderer injection, and visible UI separately.

## Lifecycle Layers

1. installer and patched app entry
2. runtime process and safe mode
3. tweak manifest and config
4. file watcher and discovery logs
5. main-process tweak start/stop
6. preload registration
7. renderer host injection
8. visible UI affordance

## Diagnostic Workflow

1. Confirm the running app is the patched/runtime entry expected.
2. Check safe mode before debugging tweak code.
3. Read main runtime logs for discovery and start events.
4. Read preload logs for renderer injection failures.
5. Verify manifest scope matches the behavior expected.
6. Trigger a hot reload only after the failing layer is known.
7. Use a minimal visible-check tweak when UI injection is uncertain.

## Failure Patterns

| Symptom | Likely Layer |
| --- | --- |
| installed but no tweak behavior | safe mode or wrong app entry |
| discovered but no UI | renderer injection or DOM heuristic |
| settings page missing | settings injector compatibility |
| floating manager visible but custom UI missing | runtime manager loaded, tweak failed |
| hot reload logs appear but behavior stale | renderer session not refreshed |
| main tweak starts but renderer tweak fails | scope or preload boundary |

## Repair Rules

- Turn off safe mode only when the installed runtime is trusted.
- Keep a backup before editing tweak config.
- Prefer hot reload for tweak edits; use full restart for runtime entry changes.
- Do not treat visible UI as proof that all tweak scopes are healthy.
- Do not treat hidden UI as proof that runtime patching failed.

## Completion Criteria

Finish when:

- each lifecycle layer has been classified
- the failing layer has direct log or behavior evidence
- reload or restart scope matches that layer
- the visible user-facing behavior has been checked
