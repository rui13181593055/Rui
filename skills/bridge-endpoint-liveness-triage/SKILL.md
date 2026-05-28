---
name: bridge-endpoint-liveness-triage
description: Use when a local bridge, app-server, endpoint file, lock file, websocket, polling loop, or chat control plane says ready or idle while messages stop moving, sessions stall, or state timestamps stop updating.
---

# Bridge Endpoint Liveness Triage

## Overview

Use this skill when a bridge looks green but work is not moving. The rule is: liveness requires fresh movement through the whole path, not only an idle endpoint.

## Liveness Evidence

Check these separately:

- process exists and matches the expected command
- endpoint file exists and has a fresh startup time
- health endpoint responds
- bridge log timestamp advances
- state file `lastActivityAt` or equivalent advances
- inbound claim or queue files appear for new input
- local app-server accepts the forwarded turn
- final outbound delivery is recorded

## Triage Workflow

1. Ask what operation should have moved through the bridge.
2. Check endpoint status and startup time.
3. Check process age and command line.
4. Compare bridge log time against the user's latest action.
5. Check inbound queue or claim artifacts.
6. Check local agent turn start and final reply.
7. Restart only the stale layer, or do a full bridge reset if ingress is frozen.
8. Verify by sending or receiving a fresh test event.

## False-Green Patterns

| Green Signal | Missing Evidence |
| --- | --- |
| endpoint says `idle` | no new inbound claim |
| health endpoint passes | log timestamps stale |
| lock file exists | process is dead |
| websocket connected | no completed turn |
| app-server ready | outbound send fails |
| maintenance loop alive | bridge target is stale |

## Restart Scope

- refresh context when only outbound send context is stale
- restart app-server when endpoint is absent or wrong
- restart bridge ingress when inbound logs stop
- restart maintenance loop after a bridge reset
- avoid killing unrelated proactive or companion loops

## Completion Criteria

Finish when:

- readiness and liveness have both been checked
- the stale segment is named
- a fresh event proves movement through the bridge
- old locks or stale warnings are not used as final evidence
