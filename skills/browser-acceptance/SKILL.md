---
name: browser-acceptance
description: Run evidence-based browser acceptance across runtime, layout, interaction, accessibility, motion preferences, and visual quality, then repair and retest failures.
version: 1.1.0
---

# Browser Acceptance

## Use when

- the user requests browser QA, responsive testing, interaction testing, or visual acceptance;
- a release gate requires executable verification;
- a defect appears only in the rendered interface.

Source inspection alone is not browser acceptance.

## Acceptance contract

Resolve before testing:

- entry URL or local command;
- critical routes and states;
- primary user journey;
- target viewports and browsers;
- authentication and test data;
- report-only or repair permission;
- required screenshots or other evidence.

Reuse the project's intended server and dependencies. Do not change production data.

## Automated pass

### Runtime

- Page loads without fatal errors.
- Console has no actionable errors.
- Primary requests and assets succeed.
- No hydration mismatch or uncaught exception.

### Layout

- No horizontal overflow.
- No clipped, colliding, or unreadably narrow content.
- Navigation and primary actions remain reachable.
- Images keep the intended crop and focal point.
- Fixed stages scale without distortion.

### Interaction

- Click every enabled control.
- Verify links reach real destinations.
- Verify menus, tabs, dialogs, toggles, forms, and accordions change state correctly.
- Verify validation, submission feedback, and recovery.
- Verify keyboard order, activation, focus, and Escape behavior.
- For blocking overlays, verify background scroll lock, inert content, focus containment, scroll restoration, and focus return.
- Verify accidental-selection shielding affects only intended interface chrome and never blocks input, paste, code, or explicit copy targets.
- Exercise empty, loading, error, disabled, and permission states when in scope.

### Motion

- Interaction is never blocked by animation.
- Direction-aware reveal enters from the expected side while scrolling down and up.
- Scroll reveal does not hide focused content or replay continuously near an observer boundary.
- Native wheel and touch scrolling remain intact unless inertial scrolling was explicitly approved.
- Animation ends in the correct state after interruption or rapid input.
- Reduced motion preserves content and task completion without long-running animations.
- Long autoplay motion has controls.

## Viewports

Choose targets from the contract. For responsive acceptance without specified targets, include a narrow phone, common phone, tablet, small laptop, and desktop. Drag through intermediate widths to detect breakpoint gaps.

## Visual pass

Capture relevant states and inspect:

- focal order;
- hierarchy;
- alignment;
- spacing rhythm;
- token drift;
- repeated layout formulas;
- contrast and legibility;
- accidental voids;
- awkward folds;
- reference differences.

Call this visual acceptance unless a formal baseline exists.

## Repair loop

1. Record failure, viewport, state, and reproduction.
2. Make the smallest causal repair.
3. Rerun the failed check under the same conditions.
4. Run a nearby smoke path when regression is possible.
5. Continue until the contract passes or a concrete blocker remains.

## Evidence

A valid report includes:

```text
Scope:
Environment and URL:
Viewports and browsers:
Paths and controls exercised:
Passed:
Repaired:
Remaining issues:
Evidence:
```

Do not claim a pass without executable evidence.

Human documentation: `../../docs/guides/browser-acceptance.md`.
