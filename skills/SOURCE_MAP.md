# Source Map

This file records how the public drafts relate to the local skill and maintenance work that inspired them. It avoids private paths and sensitive details.

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

