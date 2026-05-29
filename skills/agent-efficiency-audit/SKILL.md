---
name: agent-efficiency-audit
description: Use when auditing agent workflows, skills, prompts, local instructions, or repository docs for token cost, response-time risk, over-reading, compatibility risk, validation gaps, or unsupported efficiency claims.
---

# Agent Efficiency Audit

## Purpose

Turn efficiency claims into measurable checks. This skill audits whether an agent workflow loads too much context, triggers too broadly, verifies too weakly, or claims speed improvements without evidence.

## Input

- target skill, workflow, prompt, instruction file, or repository area
- claimed improvement or user complaint
- validation command if known
- before/after files or expected workflow if available

## Workflow

1. Identify the target and success condition.
2. Measure before judging: file size, default context surface, trigger specificity, references, scripts, TODOs, and validation status.
3. Classify risks:
   - context risk: large text loaded by default
   - trigger risk: vague or accidental invocation
   - compatibility risk: encoding, path, shell, or validator fragility
   - speed risk: repeated manual steps that should be scripted
   - verification risk: completion claim without an executable check
4. Patch the smallest issue that blocks measurable efficiency.
5. Re-run the audit or validation.
6. Report concrete deltas and residual limits.

## Tool Routing

- `filesystem`: inspect target files and apply scoped edits.
- `ripgrep`: find duplicate instructions, TODOs, broad trigger words, and repeated commands.
- `python` or `node`: calculate size, parse metadata, or run validators.
- `git`: compare before/after diffs and avoid unrelated churn.
- `codegraph`: use for large codebases when symbol impact matters.

## Constraints

- Do not claim universal speedups without a baseline.
- Do not optimize by removing required safety or verification.
- Do not replace specific workflows with vague principles.
- Do not create background automation unless explicitly requested.
- Do not audit private logs for public output without sanitizing results.

## Failure Recovery

| Failure | Recovery |
| --- | --- |
| no baseline exists | report structural metrics and avoid numeric speed claims |
| validator unavailable | record the exact missing dependency and run static checks |
| target is too broad | narrow to the first loaded file or highest-cost repeated step |
| fixes increase ambiguity | revert or split the capability into clearer pieces |
| audit finds repeated failure | propose a small rule, script, or skill update |

## Examples

### Skill Context Audit

Input: a `SKILL.md` that loads a long policy and multiple examples by default.

Expected action:

- move bulky material into `references/`
- keep only execution-critical workflow in the body
- update trigger description
- run skill validation

### Repository Homepage Audit

Input: a README that claims a platform is measurable.

Expected action:

- add a validation command
- link to validator docs
- avoid unsupported performance numbers
- check local links and generated visuals

## Evaluation

The skill succeeds when it reports measured evidence, patches only scoped efficiency issues, validates the result, and states remaining limits without inflated claims.
