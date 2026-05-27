---
name: failure-to-runbook-loop
description: Use when a local agent, automation, toolchain, or integration failure has occurred more than once, required a non-obvious workaround, or should be converted from ad hoc debugging into a reusable check, script, memory entry, or skill.
---

# Failure To Runbook Loop

## Overview

Use this skill to convert repeated failures into reusable operating knowledge. The principle is: a failure is not fully handled until the next occurrence is cheaper to diagnose.

## Loop

1. Capture the symptom exactly.
2. Identify the failing layer.
3. Record the evidence that proved it.
4. Write the minimal repair.
5. Add a verification step.
6. Decide whether it belongs in memory, a script, a runbook, or a skill.
7. Keep only stable guidance in always-on rules.

## Classification

| Pattern | Artifact |
| --- | --- |
| one-off noisy error | no persistent artifact |
| reusable observation | learning entry |
| unexpected failure signature | error entry |
| repeated manual command sequence | script |
| repeated judgment workflow | skill |
| cross-session default rule | active memory |
| project-specific convention | project instructions |

## What To Capture

Capture:

- exact error text
- affected layer
- false lead avoided
- command or log that proved the cause
- repair command or patch
- verification command
- when not to apply the fix

Do not capture:

- full private chats
- secrets
- giant logs
- speculation without evidence
- machine-specific paths unless required for local operation

## Promotion Rules

Promote slowly:

1. Raw note first.
2. Repeated note becomes a runbook section.
3. Fragile sequence becomes a script.
4. Broad reusable workflow becomes a skill.
5. Only stable cross-task defaults become active policy.

## Completion Criteria

Finish when:

- the failure can be recognized by a future agent
- the first diagnostic probe is clear
- the repair has a verification step
- the artifact level is appropriate to recurrence and risk

