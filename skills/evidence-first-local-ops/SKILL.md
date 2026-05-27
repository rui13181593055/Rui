---
name: evidence-first-local-ops
description: Use when debugging, repairing, or improving a local AI/devtool system where intuition, UI status, stale locks, green health checks, or prior assumptions may conflict with logs, process state, filesystem state, or reproducible probes.
---

# Evidence-First Local Ops

## Overview

Use this skill when local systems are ambiguous. The principle is: believe the most direct evidence from the layer that owns the behavior.

This is an operating philosophy, but it is executable: every conclusion must point to a log line, process state, file state, probe result, or reproduced command.

## Evidence Hierarchy

Prefer evidence in this order:

1. direct command output from the failing layer
2. process and port state
3. recent logs
4. persisted state files
5. configuration files
6. UI status
7. memory of what worked before
8. naming or labels

Names are weak evidence. A provider named "image" may route text. A state file named "running" may describe a dead process.

## Workflow

1. State the hypothesis.
2. Identify the owning layer.
3. Choose the smallest probe that can falsify the hypothesis.
4. Run or inspect that probe.
5. Update the hypothesis.
6. Repair only after evidence points to one layer.
7. Verify with the same kind of evidence that found the problem.

## Useful Questions

- Which layer actually produced the error?
- Is this state current or stale?
- Is this a status code success but response-shape failure?
- Did the user-visible operation complete, or only an intermediate stage?
- Is this session using the refreshed config/auth/tool list?
- What would prove this explanation wrong?

## Common Violations

| Violation | Correction |
| --- | --- |
| Restarting before inspecting logs | Read the owning log first |
| Trusting lock files | Verify the PID or process |
| Trusting HTTP status only | Validate response shape |
| Trusting CLI auth for desktop tools | Test in the active session |
| Treating prior success as current truth | Re-check live state |

## Completion Criteria

Finish when:

- the conclusion is backed by direct evidence
- the repair is verified at the same layer
- or remaining uncertainty is explicitly named with the next probe

