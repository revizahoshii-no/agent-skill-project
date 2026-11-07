---
name: interface-craft
description: Build or refine production-ready browser interfaces with semantic structure, complete states, deliberate hierarchy, and working interactions.
version: 1.1.0
---

# Interface Craft

## Use when

- implementing a visual design in HTML, CSS, JavaScript, or a frontend framework;
- refining hierarchy, spacing, typography, transition choreography, or interaction feedback;
- building drawers, dialogs, overlays, scroll locking, focus return, or direction-aware reveals;
- preventing accidental mobile selection, touch callouts, tap flashes, or image dragging on interface chrome;
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

## Motion choreography

Motion must explain state, direction, hierarchy, or continuity. Do not animate merely because an element exists.

Use a small token set:

```css
:root {
  --ease-premium: cubic-bezier(.16, 1, .3, 1);
  --motion-fast: 180ms;
  --motion-state: 380ms;
  --motion-reveal: 700ms;
}
```

Preferred patterns:

- state change: opacity and a 4 to 12 pixel translation over 180 to 380 milliseconds;
- section reveal: opacity plus a 24 to 48 pixel directional translation over 500 to 800 milliseconds;
- stagger: 40 to 90 milliseconds between related children, capped so the last item does not feel delayed;
- shared continuity: FLIP-style translation from measured origin to final position only when the two states represent the same object;
- icon or label morph: overlap old and new states, then transition opacity, translation, scale, or rotation;
- scroll reveal: use `IntersectionObserver`; do not run layout work on every scroll event;
- direction-aware reveal: enter from below while scrolling down and from above while scrolling up;
- replay: default to once; replay only after the element has fully left for a meaningful interval or when repetition explains navigation.

Keep native wheel and touch scrolling. Do not add inertial scrolling or lerp over the page unless the user explicitly requests it and accessibility has been evaluated.

Implementation rules:

- Prefer `transform` and `opacity`.
- Do not use `transition: all`.
- Do not leave broad `will-change` declarations active.
- Do not delay ready content for an entrance sequence.
- Cancel or replace stale animations when state changes.
- Preserve final state when animation is interrupted.
- Under reduced motion, render the final state immediately or use one short opacity transition.

## Overlay and scroll-lock contract

Classify an overlay before locking the page:

- modal dialog, blocking drawer, and lightbox lock background scroll;
- non-modal inspector, popover, tooltip, and toast do not lock the page by default.

A blocking overlay must:

1. record the current page scroll position;
2. compensate for scrollbar removal so the layout does not shift;
3. lock the document without losing the recorded position, including mobile Safari behavior;
4. mark background content inert;
5. place focus inside the overlay;
6. keep Tab and Shift+Tab within the overlay;
7. close with Escape when closure is safe;
8. restore the previous scroll position and trigger focus;
9. remove every temporary style and inert state on close, route change, or unmount;
10. contain touch overscroll inside scrollable overlay content.

Do not apply `overflow: hidden` without testing scroll restoration, layout shift, nested scroll, and iOS touch behavior.

## Accidental-selection shielding

This is interaction shielding, not security. It prevents unintended blue selection, mobile touch callouts, tap flashes, and image dragging on interface chrome.

Apply shielding selectively to:

- buttons, tabs, navigation labels, icon controls, drag handles, badges, and compact control cards;
- decorative images and illustrations that are not intended for drag or save behavior;
- labels whose long press would expose a browser copy or search callout instead of a useful action.

Keep selection and callouts available for:

- articles, descriptions, addresses, reference values, code, logs, generated output, and other useful text;
- inputs, textareas, contenteditable regions, and explicit copy targets;
- any content whose selection is needed for accessibility or the primary task.

Use scoped CSS rather than global JavaScript blockers:

```css
[data-ui-shield] {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

[data-copyable],
input,
textarea,
[contenteditable="true"] {
  -webkit-user-select: text;
  user-select: text;
  -webkit-touch-callout: default;
}
```

Do not block `copy`, `contextmenu`, keyboard shortcuts, or paste globally. Do not describe this as copy protection.

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
- Blocking overlays preserve scroll, contain focus, and restore both on close.
- Interface chrome resists accidental selection without blocking useful text, input, copy, or paste.
- Direction-aware reveals use bounded transforms and preserve their final state.
- Reduced motion keeps every interaction complete and understandable.
- No layout that depends on hidden overflow.
- No visual decision that lacks a reason.

Human documentation: `../../docs/guides/interface-craft.md`.
