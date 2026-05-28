---
name: agent-publication-readiness-review
description: Use when a public GitHub profile, skill library, README, runbook collection, or agent workflow repo needs a final pass for coherence, polish, taxonomy, verification, and sensitive-information exposure before pushing.
---

# Agent Publication Readiness Review

## Overview

Use this skill before publishing an agent workflow repo. The rule is: a public collection should read as a coherent system, not a folder of useful fragments.

## Review Axes

Check:

- taxonomy: clear groups and progression
- trigger clarity: users know when each skill applies
- distinctiveness: skills do not collapse into duplicates
- verification: each skill defines done
- safety: no secrets or private raw state
- polish: README explains the collection's point of view
- navigation: names and summaries are scannable

## Workflow

1. List all public artifacts.
2. Group them by user problem, not by creation order.
3. Identify overlaps and split or rename if needed.
4. Check each frontmatter description for trigger-only wording.
5. Check each skill for workflow, mistakes, and completion criteria.
6. Run validation.
7. Run sensitive-text scan.
8. Review README as a first-time visitor.
9. Commit and push only after verification is recorded.

## Quality Bar

High-quality public skills:

- are specific enough to change behavior
- include failure signatures from real work
- contain evidence-based checks
- avoid private dependencies
- name when not to trust misleading signals
- end with observable completion

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Listing many skills without a thesis | Add a compact system narrative |
| Publishing similar skills | Separate by trigger and evidence |
| Hiding safety in prose | Add explicit public-safety section |
| Pushing without validation | Validate and scan before commit |
| Making README too generic | Show the operational philosophy |

## Completion Criteria

Finish when:

- the collection has a clear taxonomy
- all skills validate
- sensitive scans are clean
- README and source notes explain why the library is distinctive
- remote push is confirmed when publishing was requested
