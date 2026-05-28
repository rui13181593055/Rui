---
name: chat-empty-turn-recovery
description: Use when a chat bridge, messaging agent, Codex turn, Hermes session, or gateway reports task completion, exit code zero, or request success but produces no user-visible assistant message.
---

# Chat Empty Turn Recovery

## Overview

Use this skill when a system claims a turn completed but the user sees silence. The rule is: completion without visible content is a delivery failure until proven otherwise.

## Empty-Turn Signals

- task marked complete with no assistant text
- exit code zero with empty stdout
- gateway returns no content or reasoning
- send pipeline has no final message event
- upstream response has empty choices or output items
- user reports no reply despite bridge success logs

## Workflow

1. Locate the turn boundary: inbound message, model request, final reply, outbound send.
2. Check whether assistant content exists in the local session.
3. If content exists, debug outbound delivery.
4. If content is absent, debug model/provider/session state.
5. Check context size and session freshness.
6. Trigger a minimal same-session probe if safe.
7. If session state is polluted, reset or fork the session rather than restarting everything.
8. Provide a natural fallback message only when the user-facing channel would otherwise stay silent.

## Diagnosis Matrix

| Evidence | Interpretation |
| --- | --- |
| final reply exists, send failed | transport problem |
| final reply absent, model output empty | provider or session problem |
| retries produce empty content | context/session pollution likely |
| fallback unavailable | routing config problem |
| only task_complete event exists | agent turn ended without content |

## User-Facing Fallback

Fallback text should be:

- short
- natural for the channel
- non-technical unless the user asked for diagnostics
- clear that the request was received
- not a false claim that work completed

## Completion Criteria

Finish when:

- the missing segment is identified
- the system either sends a real reply or records a deliberate fallback
- provider/session/transport evidence is separated
- silence is not treated as success
