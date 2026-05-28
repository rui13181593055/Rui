---
name: media-artifact-integrity-check
description: Use when generated images, videos, stickers, voice files, downloaded media, cached fallbacks, or chat attachments may be stale, mislabeled, corrupted, unsafe to reuse, or different from what the filename or prior send log suggests.
---

# Media Artifact Integrity Check

## Overview

Use this skill before reusing or sending media artifacts whose content was generated, cached, transformed, or selected from fallback paths. The rule is: filenames and previous send logs are weak evidence.

## Integrity Evidence

Prefer evidence in this order:

1. direct preview or metadata inspection
2. generation job status and prompt
3. file modification time and size
4. transform logs
5. upload/send logs
6. filename or title

## Workflow

1. Identify the requested media outcome.
2. Locate the candidate file and its generation record.
3. Preview or inspect the artifact before reuse.
4. Compare visible content against the request and failure notes.
5. Reject files marked failed, polluted, placeholder, fallback-only, or wrong subject.
6. Convert format only after content is verified.
7. Send or publish only the verified artifact.
8. Record the final artifact path or URL separately from intermediate files.

## Common Risk Patterns

| Pattern | Risk |
| --- | --- |
| descriptive filename | content may be unrelated |
| old fallback image | previously rejected result may leak through |
| upload succeeded | user-visible send may still fail |
| tiny image or placeholder | generation may have failed silently |
| cached path reused | stale content may replace new result |
| format conversion succeeded | source content may still be wrong |

## Media-Specific Checks

- Images: preview subject, composition, artifacts, text, and file dimensions.
- Stickers: check transparency or clean background when expected.
- Video: verify duration, playable container, first frame, and subject.
- Voice: verify duration, file format, and whether the audio is real output.
- Downloads: verify source metadata and final file path.

## Completion Criteria

Finish when:

- the artifact was directly inspected or rejected for lack of evidence
- intermediate and final files are not confused
- send/publish status refers to the verified artifact
- no failed or mismatched cached file is reused
