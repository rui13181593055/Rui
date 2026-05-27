---
name: local-agent-memory-loop
description: Use when an AI coding assistant needs durable local memory across sessions, including user preferences, active operating rules, lessons learned, recurring errors, feature requests, or promotion from raw observations into concise always-on guidance.
---

# Local Agent Memory Loop

## Overview

Use explicit local files for durable memory instead of hidden chat context. The memory loop should make future work better without turning every observation into permanent policy.

## Memory Files

Use a small file set:

- `SOUL.md`: identity, operating principles, and completion standards
- `PROFILE.md`: stable user preferences and confirmed context
- `ACTIVE.md`: concise rules that should apply by default
- `LEARNINGS.md`: reusable discoveries, corrections, and best practices
- `ERRORS.md`: unexpected failures and debugging notes
- `FEATURE_REQUESTS.md`: missing capabilities the user wants

Keep secrets out of all memory files.

## Startup Routine

Before substantial work:

1. Read `SOUL.md`.
2. Read `PROFILE.md`.
3. Read `ACTIVE.md`.
4. Apply them as defaults for the current task.

Skip this only for tiny one-command answers.

## Logging Decision

Log a memory entry when the result is reusable, non-obvious, or likely to recur.

Good triggers:

- a tool fails unexpectedly
- the user corrects a wrong assumption
- an integration behaves differently than docs suggest
- a missing capability is discovered
- a workaround is better than the obvious path

Do not log:

- one-off typos
- private secrets
- low-value command noise
- raw chat transcripts

## Promotion Rules

Promote cautiously:

1. Raw observation goes to `LEARNINGS.md` or `ERRORS.md`.
2. Recurring or cross-task guidance moves to `ACTIVE.md`.
3. Only stable top-level rules move to project instructions.

Keep `ACTIVE.md` short. If it grows too long, it stops being active guidance and becomes another archive.

## Entry Shape

Use a compact entry:

```markdown
## YYYY-MM-DD - Short Title

- Symptom:
- Cause:
- Better future action:
- Source:
```

For errors, include the exact error text when it helps future search.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Logging everything | Log only reusable lessons |
| Promoting too early | Wait for recurrence or broad usefulness |
| Hiding secrets in memory | Store secrets only in proper auth stores |
| Treating stale memory as fact | Update or retire old guidance |
| Writing vague preferences | Record concrete behaviors and examples |

## Completion Criteria

Finish memory work when:

- the relevant boot files are read for substantial work
- new reusable lessons are logged in the right file
- promoted rules are concise and current
- no secret-bearing content was persisted

