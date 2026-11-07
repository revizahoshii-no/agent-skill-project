# Browser acceptance

Agent instruction: [`skills/browser-acceptance/SKILL.md`](../../skills/browser-acceptance/SKILL.md)

## Purpose

Exercise real user paths in the rendered interface and capture evidence across viewports, states, keyboard, console, and network.

## Route here when

Use after implementation, during bug reproduction, before release, or when source inspection cannot prove behavior.

## Do not route here when

Do not use screenshots alone as proof that an interaction or keyboard path works.

## What this skill owns

Acceptance scenarios, viewport coverage, interactions, keyboard paths, screenshots, console errors, failed requests, and observed results.

## Procedure

1. Write scenarios with starting state, action, expected result, and required viewport.
2. Load the real page and record console errors, failed requests, and broken resources.
3. Exercise the primary path with pointer and keyboard, including error and recovery states.
4. Inspect narrow and wide layouts for overflow, clipping, hidden actions, and unstable movement.
5. Capture evidence and classify failures by severity, scope, and reproducibility.

## Evidence of completion

A scenario table with expected and actual results, viewport, screenshot path, console and network notes, and a pass or fail decision.

## Pairing

Pair with accessibility for assistive behavior; release-delivery for final production smoke tests.

## Rendered examples

These images are screenshots from the browser-rendered demo pages in this repository.

![Desktop acceptance record](../images/quality-desktop.png)

The record ties each pass to a concrete browser check.

![Mobile acceptance record](../images/quality-mobile.png)

The same evidence remains complete at a narrow viewport.

## Human documentation boundary

This guide and its images are for people. The router does not load them automatically. Agent context uses only the selected `SKILL.md` files for the current phase.
