# Codex Skill Lab

This directory contains public Codex skill drafts distilled from local agent maintenance work. The skills focus on reliability problems that usually do not show up in clean API examples: mixed Windows/WSL execution, stale bridge state, media delivery failures, plugin visibility in API-key mode, local memory hygiene, and recovery from noisy toolchain drift.

They are written as reusable agent procedures. Each skill tells a future assistant when to use it, what evidence to inspect, what mistakes to avoid, and what counts as completion.

## Skills

### Operational Runbooks

- `windows-agent-interop-health`: diagnose Windows, WSL, and local agent boundary failures with executable health checks.
- `chat-media-delivery-runbook`: debug chat-platform media delivery by separating generation, upload, send, and context-refresh stages.
- `local-agent-memory-loop`: maintain explicit local memory files for agent preferences, lessons, active rules, and promotion.
- `codex-plugin-recovery-api-mode`: recover local plugin/skill routing when a Codex-style app is running in API-key mode or the UI does not expose plugins.
- `codex-identity-portability`: migrate local Codex identity assets without copying secrets or active account state.
- `windows-ai-devtool-repair`: repair Windows AI development toolchains when Python, Node, PowerShell, WSL, or local proxies drift.
- `codex-desktop-runtime-maintenance`: maintain a Codex-style desktop runtime across CLI, sandbox, plugin, database, proxy, and UI extension layers.
- `hermes-gateway-recovery`: recover Hermes-style WSL gateways, bot connectors, fallback providers, proxy bridges, and stale sessions.
- `mobile-agent-session-bridge`: diagnose mobile/web control surfaces connected to local coding agents when sessions are online but turns stall.
- `mcp-oauth-session-freshness`: handle OAuth-backed MCP tools when CLI login succeeds but the active desktop session still has stale auth.

### Operating Philosophy

- `evidence-first-local-ops`: debug by ranking logs, process state, probes, config, UI status, and prior assumptions as evidence.
- `state-layered-agent-design`: design agent systems with separate layers for memory, sessions, runtime, tools, credentials, artifacts, and external state.
- `failure-to-runbook-loop`: convert repeated failures into memory entries, scripts, runbooks, or skills with explicit verification.

## Why These Are Different

Most skills explain a clean happy path. These focus on operational edge cases:

- a lock file exists but the process is dead
- upload succeeds but final chat delivery fails
- `wsl.exe` resolves through the wrong Windows view
- a local proxy returns HTTP 200 with HTML instead of model JSON
- a diagnostic command silently rewrites configuration
- a shell profile emits unrelated Python errors after successful commands
- a gateway state file says running while the PID is dead
- CLI OAuth succeeds but the active desktop session still cannot use the MCP tool
- a mobile session receives the message but the local agent never emits a final reply

The intended user is an agent or developer maintaining local AI workflows where correctness depends on logs, state, process ownership, and explicit verification.

## Public Safety

These drafts intentionally exclude user names, machine-specific absolute paths, private workspace names, API keys, account tokens, cookies, auth files, provider secrets, private chat details, and copied proprietary code.

## Usage

Copy a skill folder into a Codex-compatible skills directory, or read the relevant `SKILL.md` directly when doing a similar repair. Adapt placeholder paths and commands to the target machine before running any operation.

Ask before using credentials, spending credits, posting externally, sending messages, or changing live services.
