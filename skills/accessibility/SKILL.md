---
name: accessibility
description: Build and review accessible web interfaces covering semantics, contrast, keyboard use, focus, forms, motion preferences, zoom, and assistive-technology feedback.
version: 1.0.0
---

# Accessibility

## Use when

- building or reviewing any interactive UI;
- checking WCAG-related behavior;
- repairing contrast, keyboard, focus, form, or screen-reader issues;
- validating reduced motion and zoom behavior.

## Principles

- Accessibility is part of implementation, not a final add-on.
- Prefer native semantics over custom ARIA.
- Automated checks find defects but do not prove complete conformance.
- Verify behavior with keyboard and rendered output.

## Semantics

- Set document language and a unique title.
- Use header, nav, main, and footer landmarks where appropriate.
- Keep a logical heading order and one clear primary heading.
- Provide a skip link for long documents.
- Use buttons for actions and anchors for destinations.
- Give every form field a visible label.
- Give icon-only controls an accessible name.
- Mark decorative icons and images appropriately.
- Avoid ARIA that contradicts native behavior.

## Contrast

Minimum ratios:

- normal text: 4.5 to 1;
- large text: 3 to 1;
- control boundaries, focus indicators, and meaningful non-text graphics: 3 to 1.

Calculate contrast. Do not estimate by eye. For text over imagery, verify the worst point or use a solid text surface or scrim.

## Keyboard and focus

- Tab order follows the visual and reading order.
- Enter and Space operate controls as expected.
- Escape closes overlays.
- Focus remains visible in every theme and state.
- No keyboard traps.
- Dialogs move focus inside, contain it while open, and restore it on close.
- Avoid positive tabindex values.

## Forms and feedback

- Associate errors with their fields.
- Explain what happened and how to recover.
- Focus the first invalid field after submission.
- Announce important async changes through an appropriate live region.
- Never rely on color alone for status.
- Do not block paste.
- Keep focused fields visible above the mobile keyboard.

## Motion and zoom

- Stop non-essential motion when reduced motion is requested.
- Provide controls for autoplay motion lasting longer than five seconds.
- Do not disable browser zoom.
- Verify content at 200 percent text zoom.
- Avoid clipping containers that hide enlarged text.

## Media

- Meaningful images need useful alternative text.
- Decorative images use empty alternative text.
- Meaningful audio and video need captions, transcripts, or descriptions as appropriate.
- Media controls must be keyboard accessible.

## Manual review

Check:

1. keyboard-only journey;
2. visible focus in all themes;
3. zoom and reflow;
4. labels and error recovery;
5. accessibility tree names, roles, values, and states;
6. reduced motion;
7. status without color;
8. contrast for text and controls.

## Reporting

Separate:

- automated findings;
- manually verified behavior;
- items requiring assistive-technology or user testing;
- claims that remain unverified.

Human documentation: `../../docs/guides/accessibility.md`.
