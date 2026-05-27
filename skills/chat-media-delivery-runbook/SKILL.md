---
name: chat-media-delivery-runbook
description: Use when generated images, stickers, voice clips, videos, or attachments fail to reach a chat app even though local generation or upload appears successful, especially with stale send contexts, batch sends, format conversion, captions, or bridge state files.
---

# Chat Media Delivery Runbook

## Overview

Use this skill to debug media delivery as a staged pipeline: generation, normalization, upload, final send, caption, and user-visible confirmation. Never infer delivery from an earlier stage.

## Delivery Pipeline

Track each media item through these stages:

1. `generate`: file exists locally and opens correctly.
2. `normalize`: format, dimensions, and size are acceptable for the target chat platform.
3. `upload`: CDN or platform media upload succeeded.
4. `send`: final message API returned success.
5. `caption`: text caption sent, if separate from media.
6. `visible`: the chat user can reasonably see or request the result.

If a later stage fails, do not call the whole generation failed.

## Format Rules

Prefer widely supported media formats:

- images: JPG or normal PNG
- animated images: GIF or WebP only when the platform confirms support
- avoid BMP for chat upload paths
- avoid tiny or unusual PNG files for delivery tests
- convert risky images to JPG before retrying

For avatar or icon quality:

1. Generate at high resolution, such as 1536x1536.
2. Downsample to final size with high-quality interpolation.
3. Inspect the final image, not only the contact sheet.
4. Avoid prompts that request pixel art, jagged outlines, or heavy black strokes unless desired.

## Stale Send Context

Some chat platforms use a short-lived send context. A media upload can succeed while the final message send fails.

When final send returns a stale-context style error:

1. Stop the batch immediately.
2. Do not retry ten files in a tight loop.
3. Ask for or wait for a fresh inbound message/context refresh.
4. Retry the remaining media after refresh.
5. Report which files uploaded, which sent, and which still need retry.

## Batch Strategy

For multiple images:

- send one preview/contact sheet first
- send a small number of selected full-size images
- avoid alternating many images and captions quickly
- store a per-file state record so partial success is not lost

## Prompt Guard Handling

Local image tools may use simple text guards. If a safe word is blocked because it contains a risky substring, rewrite the positive prompt instead of weakening the guard.

Example pattern:

- replace ambiguous words in the positive prompt
- move quality exclusions to a negative prompt
- keep hard safety boundaries for minors, non-consent, real-person sexualization, explicit sexual acts, and explicit nudity

## Debug Checklist

- Does the generated file actually show the requested content?
- Is the path a real file, not a placeholder?
- Did the upload succeed but final send fail?
- Did the caption fail separately?
- Did the batch continue after the first stale-context error?
- Are state records and logs describing each stage?

## Completion Criteria

Finish when one is true:

- final send returned success for the requested media
- local generation succeeded and the output path is known
- the failed stage is identified and the next required user/platform action is explicit
- a tool edit was validated with syntax checks or a dry-run send

