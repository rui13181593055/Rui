---
name: decision-record-architecture
description: Use when a project needs lightweight decision records, decision history, supersession tracking, rationale capture, or an index of engineering, research, product, design, operations, or workflow decisions.
---

# Decision Record Architecture

## Purpose

Maintain decisions as small, reviewable files instead of burying rationale in chat history. This skill creates a durable decision trail with status, options, rationale, expected outcome, and supersession links.

## Input

- decision statement or conversation segment
- project directory
- domain or area if known
- options considered and rationale when available
- whether this decision supersedes an older record

## Workflow

1. Check whether a `decisions/` directory already exists.
2. Read the existing decision index if present.
3. Identify the decision boundary: one broad decision is better than overlapping fragments.
4. Assign the next ID such as `DEC-0001`.
5. Write one markdown file per decision with YAML frontmatter.
6. Include status, domain, date, tags, decision, options, rationale, expected outcome, and related records.
7. If superseding a prior decision, mark the old record as superseded and link both files.
8. Regenerate `decisions/_index.md` from disk.
9. Summarize only the logged records and changed files.

## Tool Routing

- `filesystem`: read and write decision records.
- `markdown`: maintain human-readable rationale and index tables.
- `git`: review decision history and keep changes auditable.
- `json` or `yaml`: parse frontmatter when indexes are generated mechanically.

## Constraints

- Do not log secrets, credentials, private identifiers, or raw chat content.
- Do not treat general notes, meeting minutes, or journals as decisions.
- Do not fabricate options considered when none are known.
- Do not overwrite malformed existing records; skip and report them.
- Prefer fewer, clearer decisions over many tiny overlapping records.

## Failure Recovery

| Failure | Recovery |
| --- | --- |
| no decision is present | report that no loggable decision was found |
| existing index is stale | rebuild it from `DEC-*.md` files |
| frontmatter is malformed | skip the record and report the file |
| superseded file is missing | write the reference and add an open question |
| rationale contains sensitive context | redact the sensitive detail and keep the public reason |

## Examples

### New Decision

Input: "Record that we will use a local smoke validator before publishing capabilities."

Expected record:

- status: active
- domain: platform
- decision: use local smoke validation as a release gate
- options: manual review only, CI-only validation, local smoke validation
- rationale: catches metadata and safety issues before publishing

### Supersession

Input: "DEC-0003 is superseded; use CodeGraph before broad manual reads."

Expected action:

- create a new decision file
- update DEC-0003 status to `Superseded`
- regenerate `_index.md`

## Evaluation

The skill succeeds when every logged decision has a unique ID, readable rationale, status, options, and expected outcome; the index matches disk state; sensitive details are absent; and supersession links are explicit.
