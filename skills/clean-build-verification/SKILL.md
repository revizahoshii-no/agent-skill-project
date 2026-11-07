---
name: clean-build-verification
description: Prove software behavior through proportionate executable checks for websites, APIs, backends, bots, scripts, and command-line tools before making completion claims.
version: 1.0.0
---

# Clean Build Verification

## Use when

- a software change is ready for acceptance or a completion claim;
- the project has no clear test plan for the changed behavior;
- a bug fix must be reproduced before and after repair;
- browser, API, bot, script, or command-line behavior needs direct evidence.

Do not use source inspection as a substitute for executable verification.

## Verification contract

Define:

- changed behavior and protected behavior;
- environment, runtime, and start command;
- representative success, failure, empty, and boundary inputs;
- external effects that must be mocked or explicitly authorized;
- evidence needed for a pass;
- checks that cannot run and why.

Scale the matrix to the change. A one-line repair does not need a full release audit, but it still needs a direct reproduction and a nearby regression check.

## Universal sequence

1. Start from a clean or understood state.
2. Run project-wide syntax, build, lint, or type checks that apply.
3. Reproduce the target behavior through its real entrypoint.
4. Exercise one normal path, one failure path, and relevant boundary input.
5. Inspect output, logs, exit status, side effects, and persisted state.
6. Remove temporary test files and debug instrumentation.
7. Record exact commands and observed results.

Never weaken a test only to obtain a pass. Never mock the behavior that the test is meant to prove.

## Website matrix

When browser behavior changes:

- load the page with console and failed-request capture;
- check 360, 768, and 1280 CSS pixels unless the project defines other targets;
- compare document width with viewport width to detect accidental horizontal overflow;
- activate every changed button, link, tab, menu, dialog, toggle, and form;
- submit relevant forms with empty, invalid, and valid input;
- exercise Tab, Enter, and Escape with visible focus;
- force relevant loading, empty, error, disabled, success, and permission states;
- test reduced motion and each supported theme;
- capture screenshots and inspect them visually before reporting quality.

If a browser cannot run, state that browser behavior remains unverified and report only the static checks actually performed.

## API and backend matrix

- Call every changed endpoint or handler through the normal interface.
- Verify status, response shape, persistence, authorization, and failure behavior.
- Test malformed, missing, unauthorized, duplicate, and boundary input when relevant.
- Run migrations only against a disposable or copied data set during verification.
- Confirm repeated requests do not duplicate protected side effects.

## Bot and messaging matrix

Use mocked events and connections unless live testing is explicitly approved.

Exercise relevant combinations of:

- empty, malformed, normal, and very long arguments;
- direct and group context;
- owner, administrator, member, and unauthorized actor;
- quoted content, mentions, and unknown message types;
- self-target, protected target, and missing target;
- dependency or network failure.

Confirm that invalid input and external failure do not terminate the primary process.

## Script and command-line matrix

- Run built-in help and the default invocation.
- Test missing, invalid, normal, and boundary arguments.
- Verify exit codes, standard output, standard error, created files, and idempotence where applicable.
- Run from a path containing spaces when path handling changed.
- Test non-interactive behavior if the tool will run in automation.

## Pass criteria

A pass requires observed behavior that matches the contract. A build pass alone does not prove runtime behavior. A screenshot alone does not prove interaction. A mocked success does not prove a live integration.

## Evidence

Report:

```text
Environment:
Commands executed:
Paths and inputs exercised:
Observed passes:
Observed failures and repairs:
Artifacts inspected:
Not verified and why:
```

Human documentation: `../../docs/guides/clean-build-verification.md`.
