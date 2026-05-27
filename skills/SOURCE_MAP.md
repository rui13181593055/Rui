# Design Notes

This file explains the engineering background behind the public skill drafts. It is not a private log dump; it records the reusable patterns that were extracted from local maintenance work while avoiding private paths, credentials, and sensitive details.

## windows-agent-interop-health

Inspired by:

- local Hermes/WSL/Codex bridge skill
- WSL health false-negative incidents
- bridge endpoint and stale lock maintenance
- local proxy probing lessons

Distinctive angle:

- focuses on mixed Windows/WSL/desktop/CLI boundary diagnosis
- includes `Sysnative` WSL resolution and process-vs-lock verification
- treats proxy response shape as part of health, not just HTTP status

## chat-media-delivery-runbook

Inspired by:

- local WeChat/ComfyUI/avatar maintenance skill
- media upload vs final send failures
- generated-image placeholder and batch-send incidents
- avatar anti-aliasing and prompt-guard lessons

Distinctive angle:

- models chat media as a staged delivery pipeline
- separates generation, upload, send, caption, and visibility
- documents stale send context as a first-class failure mode

## local-agent-memory-loop

Inspired by:

- local soul/profile/active memory files
- reusable learning and error logging workflow
- promotion rules from raw observations into active guidance

Distinctive angle:

- treats agent memory as explicit files with conservative promotion
- defines when not to log
- keeps secrets out of memory by design

## codex-plugin-recovery-api-mode

Inspired by:

- current-dialogue plugin routing skill
- plugin cache and local skill fallback work
- API-key mode UI/plugin visibility issues
- config mutation incidents from diagnostics

Distinctive angle:

- aims at current-session recovery rather than generic plugin setup
- uses local manifests and skills when native tools are not hot-loaded
- includes config safety checks before diagnostics

## codex-identity-portability

Inspired by:

- Codex inherit skill
- Codex shared records skill
- account migration and local record sharing work

Distinctive angle:

- separates portable identity from account secrets
- supports shared non-secret records across Windows accounts
- requires dry-run planning and backup before apply

## windows-ai-devtool-repair

Inspired by:

- Python/Conda corruption recovery
- PowerShell 5.1 encoding and parser failures
- npm workspace/runtime dependency repair
- Android build path and JDK/SDK fixes
- local provider/proxy diagnostic lessons

Distinctive angle:

- handles noisy Windows AI toolchains as layered systems
- distinguishes shell noise from command failure
- includes concrete anti-patterns from real repair sessions

## codex-desktop-runtime-maintenance

Inspired by:

- local Codex runtime repair work
- Codex++ safe-mode and tweak-loading diagnostics
- sandbox setup refresh failures
- corrupt logs database repair planning
- local proxy and provider-health false positives

Distinctive angle:

- treats desktop runtime, CLI, plugins, sandbox, databases, MCP, and provider proxy as separate layers
- distinguishes UI reload, hot-load, and full restart
- emphasizes readonly checks and backups before mutation

## hermes-gateway-recovery

Inspired by:

- Hermes/WSL gateway and QQBot repair sessions
- gateway state files with dead PIDs
- empty response failures from provider/session/fallback state
- WSL-to-Windows CC Switch bridge design

Distinctive angle:

- requires PID, port, session, provider, and response-body evidence
- treats empty output with exit code 0 as failure
- separates bridge restart, gateway restart, and session reset

## mobile-agent-session-bridge

Inspired by:

- Happy mobile to local Codex bridge debugging
- broken global npm dependency repair
- websocket timeout diagnosis
- stale session and turn-start-without-final-reply cases

Distinctive angle:

- separates mobile reachability, daemon control plane, local app-server, and turn completion
- defines healthy markers and failure markers for session bridges
- avoids reusing stale session ids after cleanup

## mcp-oauth-session-freshness

Inspired by:

- Notion MCP OAuth setup and stale active-session failures
- long Notion write fallback into local drafts
- child-page split and parent-page block preservation

Distinctive angle:

- separates config correctness, CLI OAuth login, active desktop auth freshness, and tool visibility
- requires read-only current-session verification before writes
- saves pending writes locally when auth is stale

## evidence-first-local-ops

Inspired by:

- recurring false positives from UI status, lock files, green health checks, and provider names
- repeated need to prove current state from logs, process state, ports, and probes

Distinctive angle:

- turns a local debugging philosophy into an executable agent workflow
- ranks evidence sources explicitly
- requires conclusions to point to falsifiable evidence

## state-layered-agent-design

Inspired by:

- Codex memory files, local skills, plugin caches, session stores, media artifacts, auth stores, and shared records
- account migration and non-secret record sharing work
- bridge state and capability registry patterns

Distinctive angle:

- separates identity, lessons, active rules, sessions, runtime, tools, credentials, artifacts, and external side effects
- gives each layer a distinct repair and migration policy
- prevents common overbroad fixes such as deleting auth for a log corruption

## failure-to-runbook-loop

Inspired by:

- repeated maintenance learnings promoted into memory
- bridge maintenance scripts created from recurring failures
- public skills distilled from local work logs

Distinctive angle:

- defines when a failure should become a note, error entry, script, runbook, skill, or active rule
- makes "next occurrence is cheaper to diagnose" the completion standard
- separates durable lessons from private raw logs
