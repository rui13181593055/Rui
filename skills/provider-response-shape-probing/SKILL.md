---
name: provider-response-shape-probing
description: Use when an OpenAI-compatible proxy, model provider, gateway, or local router reports success while requests still fail, return HTML, return empty content, expose misleading model lists, or disagree across health checks and real completions.
---

# Provider Response Shape Probing

## Overview

Use this skill when provider health is ambiguous. The rule is: validate the response shape that the caller needs, not just the HTTP status or provider label.

## Evidence Order

Prefer evidence in this order:

1. real endpoint used by the application
2. response content type and JSON shape
3. model/provider request logs
4. provider health table or dashboard
5. generic `/models` probes
6. provider names or UI labels

## Probe Matrix

| Symptom | Probe |
| --- | --- |
| `/v1/models` returns 404 | test the actual completion or responses endpoint |
| HTTP 200 but app fails | parse body as expected JSON |
| response is HTML | treat as provider/proxy failure |
| empty assistant output | inspect raw choices/output items |
| provider named for one modality | verify API surface, not name |
| fallback did not run | inspect fallback config and request logs |

## Workflow

1. Identify the exact endpoint, method, model, and payload the app uses.
2. Send the smallest non-destructive request that exercises the same path.
3. Check status, headers, body shape, and whether usable text/tool output exists.
4. Compare the result with router/provider logs for the same timestamp.
5. Test fallback only after the primary failure shape is clear.
6. Mark a provider healthy only when the target caller can consume the response.

## Response Shape Checks

For OpenAI-compatible chat completions, require:

- JSON body
- `choices` array
- non-empty message content or expected tool call
- no HTML login, quota, captcha, or upstream error page

For Responses-style calls, require:

- JSON body
- output items or tool results in the expected field
- no text-only prompt rewrite when image/tool output was required
- terminal status that matches the generated artifact

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Trusting HTTP 200 | Validate body shape |
| Trusting `/models` | Probe the endpoint actually used |
| Trusting provider name | Verify the supported API surface |
| Treating empty output as success | Require usable content |
| Switching providers blindly | Preserve logs and compare failure shapes |

## Completion Criteria

Finish when:

- the caller's actual endpoint has been probed
- the response shape is classified as usable or unusable
- fallback behavior is verified or explicitly absent
- the next action names the failing layer
