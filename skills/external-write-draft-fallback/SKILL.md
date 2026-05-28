---
name: external-write-draft-fallback
description: Use when writing to Notion, GitHub, chat, CMS, cloud storage, or another external service may fail because auth, session freshness, permissions, network state, parent content rules, or live-service risk is uncertain.
---

# External Write Draft Fallback

## Overview

Use this skill when an external write is useful but not guaranteed. The rule is: preserve the intended write locally before depending on the remote service.

## When To Use

Use for:

- OAuth-backed tools with stale active sessions
- remote pages that may reject destructive updates
- chat sends where delivery can fail after generation
- GitHub or CMS publishes where network/auth may fail
- paid or irreversible actions that need confirmation

## Workflow

1. Prepare the content locally first.
2. Record the intended destination and write mode.
3. Check current-session auth with a read-only action.
4. Check whether the write could delete or replace existing remote content.
5. If the write fails, save the draft and exact failure category.
6. Retry only after auth/session/permission state is refreshed.
7. Verify the remote object after writing.

## Draft Contents

Each fallback draft should include:

- intended destination
- title or object identifier
- content body or artifact path
- created timestamp
- failure category
- next retry condition
- verification needed after retry

## Remote Write Risks

| Risk | Guard |
| --- | --- |
| stale OAuth | read-only current-session check |
| parent page rejects child deletion | preserve child/page references |
| send succeeds only halfway | verify final recipient-visible event |
| network reset | keep draft and retry later |
| live-service side effect | ask before performing |

## Completion Criteria

Finish when:

- the draft exists locally before or immediately after failure
- the remote write is verified if attempted
- stale auth and content-rule failures are classified
- no external side effect is claimed without evidence
