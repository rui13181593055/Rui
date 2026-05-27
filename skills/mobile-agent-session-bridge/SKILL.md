---
name: mobile-agent-session-bridge
description: Use when a mobile or web control surface connected to a local coding agent appears online but messages time out, sessions go stale, daemon logs show websocket failures, dependencies are missing, or turns start without final assistant replies.
---

# Mobile Agent Session Bridge

## Overview

Use this skill to diagnose mobile-to-local-agent bridges. The core rule is: separate mobile reachability, daemon websocket health, local agent process health, and turn completion.

## Diagnostic Layers

1. mobile app can reach the cloud/control plane
2. daemon is connected to the control plane
3. session is active and mapped to a live process
4. local agent app-server is connected
5. incoming message reaches the session
6. turn starts
7. assistant message or final reply is produced

A bridge can pass layers 1-6 and still fail at layer 7.

## Healthy Markers

Look for markers equivalent to:

- daemon connected
- session created or loaded
- local app-server connected and initialized
- socket connected successfully
- message queue waiting for messages
- active session listed with a live PID

Do not treat a long-running "waiting for messages" state as failure by itself.

## Failure Markers

| Marker | Meaning |
| --- | --- |
| missing dependency in global package | reinstall or repair package before network diagnosis |
| websocket timeout to control plane | network/proxy/TUN issue, not necessarily local app failure |
| stale session cleanup | old session id should not be reused |
| mobile message received but no completion | inspect turn logs and local agent output |
| multiple launchers alive | sessions may be competing or stale |

## Recovery Workflow

1. Inspect daemon logs first.
2. Verify active sessions and PIDs.
3. Check whether the message reached the local session.
4. Check whether a turn started.
5. Check whether the turn emitted an assistant message.
6. Clear only stale bridge processes related to the mobile session.
7. Start a fresh session and verify all healthy markers.

## Dependency Repair

If the daemon fails due to missing Node package files, repair the package installation before changing network settings. A partial global install can mimic a connectivity failure.

Avoid chasing individual missing files if many modules are absent. Reinstall the package cleanly.

## Completion Criteria

Finish when:

- the bridge reaches a live local agent session
- a mobile message produces a completed turn
- the blocker is isolated to dependency, websocket, stale session, or local agent output
- or the remaining issue requires external network/proxy changes

