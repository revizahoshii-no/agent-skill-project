---
name: clean-build-web
description: Prevent generic, fabricated, inaccessible, or mechanically templated web output. Use for website and interface work where content, visual direction, responsive behavior, and interaction completeness must remain specific.
version: 1.0.0
---

# Clean Build Web

## Use when

- creating or revising a website, landing page, web application, dashboard, form, or browser interface;
- the output risks generic copy, invented proof, decorative filler, dead controls, or template-like composition;
- mobile behavior, accessibility, media loading, or interaction states are part of the requested result;
- the user says a page looks or sounds machine-generated.

Do not use it for a backend-only change with no browser output.

## Direction before decoration

Read the approved direction or project design record before implementation. If direction is genuinely missing and the choice would materially change the result, ask one focused question or label the first version as a draft direction.

Record one internal design read:

```text
Artifact and audience:
Visual language:
ENERGY: 1 to 3
RHYTHM: 1 to 3
MOTION: 1 to 3
```

Every score must change a real decision. Do not mix visual styles only to create variety.

## Content truth

- Use facts provided by the user or confirmed from a reliable project source.
- Do not invent users, clients, team members, addresses, prices, testimonials, uptime, security claims, or performance claims.
- Ask for missing content when it controls the design. If asking is impossible, omit the unsupported section or use an unmistakable input marker.
- Write specific headings, labels, instructions, errors, and actions that belong to the product.
- Remove generic welcome language, inflated value claims, interface narration, and calls to action that do not name an action.
- Test specificity by replacing the product subject mentally. If the sentence still fits an unrelated product, rewrite it.

## Composition

- Let content determine sections instead of applying a default landing-page sequence.
- Give every section one job and vary composition according to information importance.
- Use cards only when content needs a boundary, comparison, or interaction surface.
- Avoid decorative statistics, fake terminals, generic step rows, logo strips, repeated badges, and empty promotional sections.
- Keep one visual focal point per screen and one coherent identity motif across the artifact.
- Use imagery only when it explains, establishes, or makes something relevant memorable.

## Interaction completeness

- Use native buttons for actions and anchors with real destinations for navigation.
- Remove controls that have no working behavior.
- Provide relevant default, hover, focus, active, loading, empty, error, success, disabled, and permission states.
- Keep errors near their cause and state the next useful action.
- Ensure keyboard operation, visible focus, reduced motion, and touch equivalents for hover-dependent behavior.

## Responsive behavior

Treat mobile as a composed layout, not a scaled desktop page.

- Start verification at 360 CSS pixels unless the project sets another minimum.
- Place breakpoints where content fails rather than at arbitrary device labels.
- Preserve source order, reading order, primary actions, and visible labels during reflow.
- Use touch targets of at least 44 CSS pixels when practical.
- Prevent accidental horizontal scrolling and fixed controls that cover content.
- Prefer dynamic viewport units or content-driven height over blind `100vh` assumptions.

## Accessibility and loading

- Use one primary heading, meaningful landmarks, visible form labels, useful alternative text, and an accurate page title and language.
- Calculate contrast for text and component boundaries instead of estimating it.
- Keep zoom available.
- Give images and video intrinsic dimensions. Prioritize the main visual and defer non-critical media.
- Do not claim a performance score that was not measured.
- Keep third-party scripts from blocking the primary experience when architecture allows.

## Evidence

A complete web result includes:

```text
Direction used:
Real content and known placeholders:
Routes and controls exercised:
Narrow and wide viewports checked:
Keyboard and state checks:
Console and failed request result:
Screenshots inspected:
Remaining limits:
```

Human documentation: `../../docs/guides/clean-build-web.md`.
