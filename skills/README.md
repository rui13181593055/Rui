# GitHub-Ready Skill Drafts

These skill drafts are adapted from local Codex skills plus maintenance and work logs. They are written as public, reusable skills rather than personal runbooks.

## Included Skills

- `windows-agent-interop-health`: diagnose Windows, WSL, and local agent boundary failures with executable health checks.
- `chat-media-delivery-runbook`: debug chat-platform media delivery by separating generation, upload, send, and context-refresh stages.
- `local-agent-memory-loop`: maintain explicit local memory files for agent preferences, lessons, active rules, and promotion.
- `codex-plugin-recovery-api-mode`: recover local plugin/skill routing when a Codex-style app is running in API-key mode or the UI does not expose plugins.
- `codex-identity-portability`: migrate local Codex identity assets without copying secrets or active account state.
- `windows-ai-devtool-repair`: repair Windows AI development toolchains when Python, Node, PowerShell, WSL, or local proxies drift.

## Public-Release Notes

These drafts intentionally avoid:

- user names, machine-specific absolute paths, and private workspace names
- API keys, account tokens, cookies, auth files, and model-provider secrets
- private chat/persona details
- exact proprietary APK contents or copied code

They keep the reusable engineering lessons:

- verify real process state instead of trusting stale locks
- separate upload success from final message delivery
- use Windows PowerShell 5.1-safe encodings for maintenance scripts
- treat `wsl.exe` resolution as a diagnostic surface
- keep local memory promotion conservative and file-backed
- ask before credentials, spending credits, posting externally, or changing live services

