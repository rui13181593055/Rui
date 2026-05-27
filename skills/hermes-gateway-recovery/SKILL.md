---
name: hermes-gateway-recovery
description: Use when a Hermes-style gateway, WSL bridge, bot connector, local OpenAI-compatible proxy, session store, or fallback provider path appears connected but produces empty responses, stale sessions, dead gateway PIDs, websocket timeouts, HTML proxy bodies, or no-fallback failures.
---

# Hermes Gateway Recovery

## Overview

Use this skill to recover Hermes-style gateway stacks that bridge WSL, local proxies, and chat bots. The core rule is: a gateway state file is not proof that the gateway is alive.

## Check Order

1. Windows host ports and proxy status
2. WSL process table and listening ports
3. gateway state file
4. gateway PID liveness
5. platform connector state
6. session token count and session freshness
7. provider route and fallback provider config
8. response body shape

Only after this should you restart the gateway or reset a session.

## Ground Truth Checks

Use process and network evidence:

```bash
ps -p <gateway-pid>
ss -ltnp
```

If a state file says `running` but the PID is dead, treat the state file as stale.

For session stores, inspect the specific channel/session entry:

- session id
- last prompt token count
- fresh reset marker
- recent error count

Large or polluted session context can cause empty replies even when transport and provider are healthy.

## Provider And Proxy Rules

For local proxy chains:

- check the Windows proxy, WSL bridge, and gateway-facing endpoint separately
- reject HTML returned on OpenAI API paths
- make fallback provider configuration explicit
- do not treat an empty response with exit code 0 as success
- probe with a tiny request before blaming the bot connector

If the bridge depends on the Windows host IP from WSL, avoid hard-coding stale gateway IPs. Prefer a local WSL listener or a bridge that resolves the current Windows gateway dynamically.

## Recovery Actions

Use the narrowest action:

- stale gateway state: restart gateway with replace semantics
- dead bridge process: restart bridge only
- HTML provider body: fix or switch upstream provider
- no fallback configured: add a safe fallback route
- polluted session: reset that session, not the whole gateway
- websocket timeout: diagnose network/proxy path before restarting loops

## Common Mistakes

| Mistake | Why It Fails |
| --- | --- |
| Trusting `gateway_state=running` | PID can be dead |
| Blaming bot connector first | provider or session may be the real issue |
| Accepting exit code 0 with no content | empty response is still failure |
| Reusing stale sessions | context pollution persists |
| Hard-coding WSL host IP | Windows gateway IP can change |

## Completion Criteria

Finish when:

- gateway PID, connector state, and provider probe are consistent
- empty response is traced to provider, fallback, or session state
- session reset or gateway restart is verified
- or the remaining blocker is external network, provider auth, or user-controlled live service state

