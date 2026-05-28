---
name: capability-registry-maintenance
description: Use when an agent, bridge, companion app, automation, or local runtime claims to support features that must be reflected in a capability registry, status report, health file, or user-visible readiness surface.
---

# Capability Registry Maintenance

## Overview

Use this skill when a system has more abilities than its status surface shows, or when status claims do not match implementation. The rule is: capability registration must be updated with the code that creates the capability.

## Registry Uses

Capability registries help future agents answer:

- what features are available
- which transport or model backs a feature
- whether a feature is enabled
- what verification proves it works
- which fallback exists when it fails

## Workflow

1. Identify the new or changed capability.
2. Find the status or registry surface that future agents read.
3. Add fields that describe availability, backing layer, and verification state.
4. Update the maintenance check that proves the fields remain true.
5. Avoid exposing internal errors directly to end users.
6. Re-run the status command or health report.
7. Record stale fields as failures, not as documentation debt.

## Capability Fields

Useful fields include:

- `enabled`
- `backingProvider`
- `transport`
- `lastVerifiedAt`
- `lastErrorCategory`
- `fallbackAvailable`
- `requiresUserAction`
- `outputPath` or `artifactRoot`

Use implementation-specific names when the codebase already has a convention.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Shipping code without registry update | Update status with the feature |
| Adding status text only | Add machine-readable fields |
| Reporting feature existence as health | Include last verification |
| Exposing raw bridge errors to users | Map to channel-appropriate messages |

## Completion Criteria

Finish when:

- the capability exists in code and registry
- health checks validate the registry
- user-facing status is accurate and not overly technical
- stale or missing registry fields are fixed
