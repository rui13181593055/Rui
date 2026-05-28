---
name: cross-runtime-path-resolution
description: Use when Windows, WSL, Node, Python, PowerShell, desktop apps, sandbox helpers, or local bridges disagree about executable paths, user profiles, filesystem views, or command availability.
---

# Cross-Runtime Path Resolution

## Overview

Use this skill when a command exists in one runtime but not another. The rule is: resolve paths from the runtime that will execute them, not from the runtime that is diagnosing them.

## Boundary Types

Common boundaries:

- Windows user profile vs WSL home
- PowerShell vs cmd vs Node child process
- 32-bit vs 64-bit Windows filesystem view
- desktop app sandbox vs normal terminal
- global npm shim vs real package binary
- Python launcher vs virtual environment
- local bridge process vs interactive shell

## Workflow

1. Identify the process that will execute the command.
2. Print or inspect its current working directory and environment view.
3. Resolve the executable using that runtime's lookup rules.
4. Prefer absolute paths for fragile bridge and maintenance tasks.
5. Test the executable with a harmless version or status command.
6. Avoid copying paths across Windows and WSL without conversion.
7. Record the resolved path in the runbook only if it is stable for that host.

## Windows/WSL Checks

For WSL launched from a Windows desktop process:

- prefer the real system WSL binary over store shims when needed
- check which Windows path view the process can see
- confirm the intended distro exists from that caller
- translate paths only at the boundary
- run Linux commands inside WSL, not by string-splicing shell layers

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Trusting interactive PATH | Check PATH from the service process |
| Passing Windows paths into WSL commands raw | Convert or mount correctly |
| Using store shim errors as WSL truth | Resolve the system executable |
| Testing a command in PowerShell but running from Node | Test from Node or the final caller |
| Assuming global npm shim is healthy | Run the underlying binary or reinstall |

## Completion Criteria

Finish when:

- the executing runtime is named
- the executable path is resolved in that runtime
- a harmless probe succeeds from the same boundary
- path conversion rules are documented for the next run
