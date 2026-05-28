---
name: local-model-routing-evaluation
description: Use when a local router, proxy, provider table, fallback list, model alias, or multi-model setup needs to decide which models are actually usable for text, coding, images, tool calls, or cheap fallback.
---

# Local Model Routing Evaluation

## Overview

Use this skill when model availability is uncertain. The rule is: evaluate models by task-shaped probes and failure categories, not by provider catalog names.

## Evaluation Dimensions

Check each candidate for:

- endpoint surface: chat completions, responses, images, tools
- output shape: text, tool call, image artifact, or streaming chunk
- latency and timeout behavior
- quota or billing failure
- provider HTML/login/captcha failure
- fallback compatibility
- cost or role suitability

## Workflow

1. List models or aliases that the router exposes.
2. Group them by intended task type.
3. Run a minimal probe per task type.
4. Parse and classify the response shape.
5. Record failure categories separately from model names.
6. Select primary, fallback, and do-not-use sets.
7. Keep old or pinned models unchanged unless the user asks for migration.

## Classification

| Result | Meaning |
| --- | --- |
| usable | returns expected output shape within tolerance |
| route-exists | endpoint exists but not enough proof for real use |
| surface-mismatch | model works on a different API surface |
| quota-blocked | provider or account limit blocks use |
| upstream-html | provider returned a web page, not API JSON |
| timeout-prone | simple probe works but real task often hangs |
| unavailable | hard failure on minimal probe |

## Routing Rules

- Keep a cheap text fallback separate from the strongest model.
- Do not route images through a model until image output is proven.
- Do not treat a text rewrite of an image prompt as image generation.
- Prefer response-shape logs over dashboard labels.
- Re-test after provider switches or account changes.

## Completion Criteria

Finish when:

- each candidate has a task-shaped classification
- primary and fallback routes are explicit
- unusable models are not hidden inside generic aliases
- the router decision is backed by probe evidence
