---
name: token-frugal-skill-authoring
description: Use when creating, revising, or auditing Codex-compatible skills so repeated work becomes concise, triggerable, validator-safe, low-token, and progressively disclosed through references or scripts.
---

# Token Frugal Skill Authoring

## Purpose

Convert repeated work into compact, reusable agent capabilities. The goal is not to write an essay about a workflow; it is to make a capability trigger reliably, load cheaply, execute concretely, and validate cleanly.

## Input

- repeated user requests or local incidents that should trigger the capability
- target skill name or capability area
- required tools, files, or validation commands
- known boundaries, non-goals, and privacy risks
- examples of success and failure when available

## Workflow

1. Extract three to five realistic trigger phrases from the user requests or incident pattern.
2. Name the smallest reusable capability, not the broad worldview behind it.
3. Write frontmatter first with only `name` and `description`.
4. Put every important trigger condition in `description`; assume the body is loaded only after trigger.
5. Keep `SKILL.md` as the execution path: purpose, input, workflow, tool routing, constraints, recovery, examples, evaluation.
6. Move bulky examples, schemas, provider variants, policies, or philosophy into one-level `references/` files only when needed.
7. Add `scripts/` only for repeated deterministic operations that save context or prevent mistakes.
8. Register the capability in `registry/index.json`.
9. Run repository and Codex validation before publishing.

## Tool Routing

- `filesystem`: create or edit skill files, references, scripts, and registry entries.
- `ripgrep`: find existing related skills and avoid duplicated capability names.
- `python` or `node`: validate frontmatter, metadata, and generated indexes.
- `git`: review diffs and keep generated/private artifacts unstaged.

## Constraints

- Keep `SKILL.md` frontmatter compatible with strict Codex validators.
- Do not create a skill that only says "be good at this"; encode a repeatable workflow.
- Do not duplicate long content between `SKILL.md` and references.
- Do not publish private paths, raw logs, credentials, chat context, or account state.
- Do not add scripts unless their deterministic value is clear.

## Failure Recovery

| Failure | Recovery |
| --- | --- |
| trigger is vague | rewrite `description` with concrete user phrases and task contexts |
| body is too long | split examples or variants into `references/` |
| skill overlaps an existing one | merge, rename, or narrow the new capability |
| validation fails | fix frontmatter, metadata, path, or YAML formatting first |
| privacy risk appears | replace raw incident detail with a generalized pattern |
| no evaluation gate exists | add observable success criteria before publishing |

## Examples

### Local Repair Pattern

Input: repeated debugging of a desktop runtime failure.

Expected output:

- one skill with trigger phrases for that failure mode
- recovery table for known false positives
- validation command that proves the repair or names the blocker
- registry entry with tools and difficulty

### Philosophy-To-Workflow Pattern

Input: a broad principle such as "reduce wasted context."

Expected output:

- a concrete workflow for scoped reads, smallest action, and narrow verification
- no long quotations
- examples tied to agent execution rather than abstract doctrine

## Evaluation

The skill succeeds when its description can trigger without body context, the body tells an agent exactly what to do and when to stop, large context is progressively disclosed, validation passes, and the resulting capability is meaningfully different from existing skills.
