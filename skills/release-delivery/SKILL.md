---
name: release-delivery
description: Prepare, commit, push, deploy, verify, and report a release while protecting credentials, preserving scope, and requiring a production smoke test.
version: 1.0.0
---

# Release and Delivery

## Use when

- preparing a repository for handoff;
- committing or pushing approved work;
- deploying a website or application;
- verifying production readiness;
- writing the final evidence-based delivery report.

## Preconditions

- Scope is complete and approved.
- Relevant implementation and acceptance work has passed.
- Deployment target and authorization are known.
- Secrets are available through protected mechanisms and will not be printed.

## Repository gate

Check:

- build and tests;
- syntax and static validation;
- dependency audit;
- credential scan;
- diff check;
- intended file list;
- temporary screenshots, logs, and artifacts removed;
- generated dependencies and caches excluded;
- documentation matches the shipped behavior;
- working tree clean after commit.

Never stage credentials or unrelated workspace files.

## Commit and push

- Confirm the branch and remote.
- Use an accurate commit message.
- Push without embedding credentials in the remote URL or logs.
- Verify local and remote commit identifiers match.
- Do not force-push unless the user explicitly requests and understands it.

## Deployment

- Use the project's established deployment path.
- Avoid unnecessary account or login changes.
- Wait for the deployment to reach its final state.
- Record the deployment identifier and public URL when available.
- Confirm the intended alias or domain points to the new release.

## Production smoke test

Verify from the public URL:

- successful response;
- expected title and primary content;
- critical assets;
- primary navigation and interaction;
- no console errors or failed primary requests;
- no horizontal overflow at the main mobile target;
- expected robots and sitemap behavior;
- actual security headers;
- release-specific behavior.

A ready deployment without a smoke test is not a completed delivery.

## Failure handling

- If build or deployment fails, inspect the actual event or log.
- Fix the causal issue, not a symptom.
- Redeploy through the same supported path.
- Repeat the smoke test.
- Report blockers without claiming completion.

## Final report

Keep it concise:

```text
Delivered:
Repository and branch:
Commit:
Deployment state:
Production URL:
Measured checks:
Repaired failures:
Remaining issues:
```

Include only measured results. Do not repeat a long development diary.

Human documentation: `../../docs/guides/release-delivery.md`.
