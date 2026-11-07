---
name: interface-craft
description: Build or refine production-ready browser interfaces with semantic structure, complete states, deliberate hierarchy, and working interactions.
version: 1.0.0
---

# Interface Craft

## Use when

- implementing a visual design in HTML, CSS, JavaScript, or a frontend framework;
- refining hierarchy, spacing, typography, or interaction feedback;
- completing component states and behavior;
- replacing template-like UI with content-driven composition.

## Required input

- approved direction or a clearly labeled draft direction;
- real content or honest placeholders;
- target stack and viewport range;
- known routes, interactions, and protected contracts.

## Implementation order

1. Build semantic structure and source order.
2. Apply design tokens.
3. Establish layout and responsive reflow.
4. Add real interactions.
5. Add complete states.
6. Add purposeful motion.
7. Verify keyboard, focus, touch, and reduced motion.
8. Run browser checks.

## Structure

- Use native elements before custom roles.
- Use buttons for actions and anchors for navigation.
- Give each page a language, unique title, landmarks, primary heading, and logical heading order.
- Keep DOM order aligned with reading and focus order.
- Use cards only when grouping or interaction requires a boundary.
- Remove sections and controls that have no real job.

## Interaction completeness

Every enabled control must perform a real action. Valid actions include navigation, state change, form submission, dialog operation, download, or an external destination.

Every relevant control needs:

- default state;
- hover state;
- visible focus state;
- active state;
- disabled state when applicable;
- accessible name;
- pointer and touch affordance;
- keyboard operation.

Dialogs must manage focus and close with Escape. Destructive actions need confirmation or undo.

## Data and async states

A data view is incomplete without:

- empty state that explains what to do next;
- loading state that communicates progress;
- error state that explains recovery;
- success or ready state;
- disabled or permission state when the workflow requires it.

Do not communicate status by color alone.

## Visual discipline

- One focal point per screen.
- Use whitespace to group and separate content.
- Keep the active palette restricted.
- Use typography for hierarchy, not decoration.
- Avoid uniform card grids when content importance differs.
- Avoid decorative badges, repeated arrows, fake terminals, generic gradients, and default three-step sections.
- Use shadow, glow, glass, patterns, and texture only with a written purpose.
- Keep one repeated identity motif.

## Forms

- Visible label for every field.
- Correct name, type, inputmode, and autocomplete.
- Never block paste.
- Keep checkbox and radio labels within the hit area.
- Show errors near fields and focus the first invalid field.
- Keep submit available until the request begins.
- Preserve unsaved work or warn before navigation.

## Code quality

- Keep tokens in one source of truth.
- Prefer grid and flex over layout measurement.
- Avoid transition on all properties.
- Avoid unnecessary libraries.
- Do not patch source or CSS through string-replacement scripts.
- Do not add code comments unless the user explicitly requests them.
- Keep files and component names descriptive.

## Completion check

- No dead controls.
- No fabricated content or claims.
- No broken theme or state.
- No inaccessible custom control.
- No layout that depends on hidden overflow.
- No visual decision that lacks a reason.

Human documentation: `../../docs/guides/interface-craft.md`.
