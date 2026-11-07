---
name: responsive-mobile
description: Design and verify mobile-first layouts that reflow across continuous widths without overflow, clipping, inaccessible targets, or desktop-only interaction assumptions.
version: 1.0.0
---

# Responsive Mobile

## Use when

- building or changing a responsive layout;
- repairing overflow or cramped content;
- designing mobile navigation;
- verifying touch targets and safe areas;
- supporting phones, tablets, laptops, and desktops.

## Core principle

Mobile is a distinct layout state, not a scaled desktop layout. Reflow content according to available space and task priority.

## Workflow

1. Start at the narrow target.
2. Establish content order and critical actions.
3. Define fluid type, spacing, and media behavior.
4. Add layout states where content stops working.
5. Test the entire width range.
6. Repair the element causing overflow instead of hiding it.

## Breakpoints

- Place breakpoints where content fails, not at named device widths.
- Use as many states as the content needs.
- Prevent the common two-state gap where tablets inherit either a stretched phone layout or a cramped desktop grid.
- Keep source order meaningful across every state.

## Scale

- Use fluid or deliberately stepped typography.
- Reduce section spacing and gaps on narrow screens.
- Let sections size to content unless a real full-viewport composition is required.
- Prefer dynamic viewport units when browser chrome affects height.
- Keep readable line lengths and avoid single-word columns.

## Reflow

- Collapse multi-column layouts before they become unreadable.
- Use flexible tracks and wrapping.
- Apply `min-width: 0` where children must shrink.
- Give tables and code blocks a deliberate narrow-screen strategy.
- Keep images within their containers.
- Wrap or break long user content safely.

## Overflow

A page must not leak horizontal scroll. Find the offender:

- fixed-width child;
- unbroken string;
- table or code block;
- translated text;
- media without constraints;
- transform outside the viewport;
- fixed navigation without reserved space.

Do not use hidden overflow to conceal lost content or controls.

## Touch and navigation

- Minimum target area: 44 by 44 CSS pixels.
- Separate adjacent targets enough to prevent accidental activation.
- Every hover interaction needs tap and keyboard alternatives.
- Mobile navigation must be discoverable and labeled.
- Sticky or fixed navigation must remain compact and reserve space.
- Respect safe-area insets.
- Keep focused form fields above the on-screen keyboard.

## Verification

Check at minimum:

- a narrow phone around 320 CSS pixels;
- a common phone around 400 CSS pixels;
- tablet width;
- small laptop width;
- desktop width;
- 200 percent text zoom where applicable.

Drag through intermediate widths. Sample screenshots alone do not prove continuous responsiveness.

## Completion check

- No horizontal overflow.
- No clipped text or controls.
- No desktop row forced onto a phone.
- No hover-only task.
- No target below minimum size.
- No fixed UI covering the final content.
- Navigation and forms remain usable with touch and keyboard.

Human documentation: `../../docs/guides/responsive-mobile.md`.
