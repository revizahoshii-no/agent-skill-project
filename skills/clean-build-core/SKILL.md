---
name: clean-build-core
description: Keep software work scoped, truthful, maintainable, and evidence-based. Use when implementation quality, context continuity, unsupported claims, unnecessary output, or completion honesty is a material risk.
version: 1.0.0
---

# Clean Build Core

## Use when

- creating, changing, repairing, or reviewing a software project;
- the requested change is vulnerable to scope drift, fabricated facts, noisy code, or unverified completion claims;
- the user says the result feels generic, contains unnecessary explanation, or was declared complete without testing;
- work spans sessions and needs a compact verified context record.

Do not add this skill only as ceremony. A specific domain skill may already cover the risk. Use it when the cross-cutting quality contract changes how the work must be executed.

## Working contract

1. Read the project and restate the requested outcome internally.
2. Resolve ambiguity only when a wrong assumption would create material rework or risk.
3. Change the smallest coherent surface that satisfies the request.
4. Verify facts from source, installed tools, executable output, or current documentation.
5. Run checks that match the changed behavior.
6. Report results, limits, assumptions, and unresolved decisions without exaggeration.

## Scope discipline

- Do not add features, pages, dependencies, documents, refactors, or abstractions that the task does not require.
- Follow the existing project style unless the user asks to replace it.
- Search all relevant import, alias, dynamic import, route, configuration, and string references before removing or renaming shared behavior.
- Put optional improvements in the report instead of silently expanding the implementation.
- Preserve user data, protected contracts, and external behavior unless the requested change requires otherwise.

## Questions and risk

Ask one focused group of questions before:

- destructive or difficult-to-reverse operations;
- production data, deployments, payments, live messages, authentication, permissions, or personal data changes;
- adding an uncertain dependency or executing an untrusted installer;
- inventing identity, contact, price, testimonial, address, or product evidence;
- choosing between interpretations that lead to materially different builds.

Do not ask for information that can be obtained safely from the project, installed tools, or verified documentation.

## Code hygiene

- Keep generated code free of explanatory comments unless the user explicitly requests comments.
- Preserve required license headers, build directives, compatibility annotations, and existing comments outside the requested cleanup scope.
- Remove temporary debug output, commented-out code, stale TODO markers, and patch notes introduced during the task.
- Prefer clear names, small functions, explicit state, and direct control flow over prose embedded in source.
- Do not hide failures with empty handlers, broad exception swallowing, or tests weakened to accept broken behavior.

## Truth and evidence

- Do not claim to have read, run, measured, deployed, or verified anything that was not actually inspected or executed.
- Confirm fast-changing APIs, package versions, flags, and signatures from current authoritative material or installed source.
- Separate observed evidence, source-based reasoning, assumptions, and unknowns.
- Do not fabricate URLs, people, numbers, performance results, security posture, causes, or customer outcomes.
- After two failed repair attempts for the same defect, stop speculative patching and identify the missing evidence or design decision.

## Context continuity

Use existing `.agent/` notes when present. Treat them as orientation, not proof. Recheck critical facts against the current project.

When the project already uses persistent agent notes, keep them short:

- current goal and status;
- stack and verified commands;
- important structure and protected contracts;
- decisions with one-line reasons;
- evidence locations and dates;
- unanswered questions.

Never store credentials in context notes. Keep private notes out of deployment output and source control unless the user explicitly wants them tracked.

## Completion gate

A change is complete only when:

- the requested behavior exists;
- relevant build, syntax, lint, test, or runtime checks were executed;
- the result was observed through its real interface when possible;
- temporary files and debug artifacts were removed;
- remaining limitations are named directly.

Scale the depth of testing to the change, but do not replace testing with source inspection.

## Output contract

Report four compact sections:

```text
Result:
Run:
Verified:
Not verified, assumptions, and decisions needed:
```

List exact commands and observed outcomes. Omit a section only when it truly has no content.

Human documentation: `../../docs/guides/clean-build-core.md`.
