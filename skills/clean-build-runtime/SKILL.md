---
name: clean-build-runtime
description: Build and repair APIs, backends, bots, scripts, and command-line tools without guessed library calls, unsafe live actions, hidden failures, or careless dependency and secret handling.
version: 1.0.0
---

# Clean Build Runtime

## Use when

- building or changing an API, backend service, messaging bot, worker, automation, script, or command-line tool;
- library behavior, platform identifiers, permissions, external side effects, native dependencies, or secrets create material risk;
- a runtime defect needs reproduction and causal repair.

Do not use it for a browser-only visual change.

## Verify the runtime contract

Before implementation, identify:

- runtime and target version;
- package manager and lockfile;
- start, build, syntax, lint, and test commands;
- deployment environment and native build limits;
- external services, permissions, rate limits, and side effects;
- data that can be safely used for testing.

Read installed source, generated types, built-in help, or current official documentation before relying on a library call that is not already proven in the project.

## Dependency safety

- Add a dependency only when the requested behavior justifies it.
- Verify the exact package name, maintained version, license, and runtime compatibility before installation.
- Pin versions through the project's lock mechanism.
- Treat packages with native compilation as deployment risks and test installation in a clean environment when they are necessary.
- Keep optional non-core integrations lazy or isolated so their failure does not stop the primary process.
- Do not execute installers from unknown sources or pipe remote scripts directly into a shell.

## Bot and messaging boundaries

- Treat account, chat, participant, and message identifiers as opaque platform values.
- Resolve identity through the project's existing helper or platform contract instead of raw string assumptions.
- Check permissions, target validity, self-targeting, owner protection, and chat type before destructive moderation or messaging actions.
- Do not test against real accounts, groups, phone numbers, or recipients without explicit permission.
- Use mocked events and sockets for routine behavior tests.
- Keep response format and persona consistent without exposing implementation details.

## API and backend boundaries

- Validate and normalize input at the boundary.
- Enforce authentication and authorization separately.
- Use parameterized data access and bounded queries.
- Return deliberate status codes and stable error shapes.
- Keep migrations reversible when possible and test them against a copy of data.
- Protect retries, queues, and webhooks from duplicate side effects.
- Do not log credentials, session material, personal data, or full sensitive payloads.

## Secrets and configuration

- Load secrets from the approved environment or ignored credential store.
- Never place tokens, keys, session material, or passwords in source, examples, logs, screenshots, or reports.
- Fail clearly when required configuration is absent.
- Keep safe defaults explicit and separate from secret values.
- Ask before rotating, deleting, or transmitting credentials.

## Defect repair

1. Read the exact error and relevant logs.
2. Reproduce the failure under controlled input.
3. Trace the failure to a boundary, state transition, dependency, or contract.
4. Apply the smallest causal repair.
5. Repeat the original reproduction.
6. Exercise a nearby success and failure path for regression risk.

After two failed fixes, stop speculative changes and identify the evidence still needed.

## Failure integrity

- Do not swallow exceptions or convert every failure into success.
- Distinguish expected input errors, external service errors, and internal defects.
- Keep retry behavior bounded and observable.
- Remove temporary logs and debug switches before delivery.
- Preserve process health when an optional feature fails, but do not hide the failure.

## Evidence

A valid runtime report includes:

```text
Runtime and version:
Installed contract inspected:
Inputs and side effects tested:
Permission and destructive guards:
Success and failure paths:
Clean installation or build result:
Known environmental limits:
```

Human documentation: `../../docs/guides/clean-build-runtime.md`.
