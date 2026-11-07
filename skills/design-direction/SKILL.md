---
name: design-direction
description: Establish a specific visual direction, redesign mode, design system, and implementation-ready decision record before substantial UI work.
version: 1.0.0
---

# Design Direction

## Use when

- creating a website, application surface, dashboard, or prototype;
- redesigning an existing visual product;
- selecting a design system or visual anchor;
- the request is visually ambiguous or asks for multiple directions.

Do not use for a small code repair with no visual consequence.

## Step 1: verify context

Confirm unstable facts before using them in the design. Inspect the codebase, real content, supplied assets, and current UI before proposing a new system.

Source priority:

1. user requirements;
2. existing source and real assets;
3. product documentation and verified facts;
4. supplied references;
5. general design patterns.

## Step 2: classify the work

- Greenfield: no established visual system.
- Extension: add a bounded element and match the current system.
- Preserve: improve craft while retaining identity and behavior.
- Overhaul: introduce a new visual language while preserving agreed contracts.

Protected contracts include routes, anchors, navigation meaning, forms, analytics, accessibility behavior, metadata, and real content. Do not change them silently.

## Step 3: write the Design Read

Record:

```text
Artifact:
Audience:
Visual language:
Mode:
Constraints:
ENERGY: 1-3
RHYTHM: 1-3
MOTION: 1-3
Visual variance: 1-10
Motion intensity: 1-10
Information density: 1-10
Asset dependence: 1-10
Brand fidelity: 1-10
```

Every dial must change a real decision. Remove scores that have no consequence.

## Step 4: position the composition

For each major screen, answer:

- Narrative role: what job does this screen perform?
- Viewing distance: where and how will it be read?
- Visual temperature: quiet, energized, warm, authoritative, playful, or severe?
- Capacity: does the intended content fit without cramming or empty filler?

## Step 5: declare the system

Define before coding:

- one-sentence visual thesis;
- content order and one job per section;
- palette by role;
- typography by role;
- spacing scale;
- radius, border, and shadow strategy;
- image treatment;
- motion behavior and reduced-motion fallback;
- one identity motif;
- one-line reason for each major choice.

Select one coherent visual anchor or declare a custom recipe. Do not mix unrelated styles without a clear conceptual reason.

## Step 6: resolve ambiguity

If no direction exists, offer three clearly different directions. Each direction needs:

- a descriptive name;
- why it fits the audience and content;
- concrete cues for type, color, layout, imagery, and motion;
- one risk or boundary.

Ask the user to choose only when the differences would materially affect the result.

## Step 7: early v0

Use a v0 when direction is uncertain or expensive to reverse. Include structure, tokens, key composition, honest placeholders, and assumptions. Exclude full content, complete states, and final motion.

Skip the checkpoint when the user has already approved a precise direction and ordered execution.

## Originality check

- The design must arise from its subject and audience.
- One memorable decision is stronger than many decorative effects.
- The result retains character without its name or logo.
- Sections follow content needs, not a landing-page template.
- References inform principles but do not transfer another identity.
- Every technique serves hierarchy, identity, readability, feedback, or narrative.

## Output contract

Create or update a compact decision record containing:

```text
Mode:
Preserve:
Improve:
Remove:
Protected contracts:
Design Read and dials:
Design system:
Highest-risk change:
Fallback:
```

Human documentation: `../../docs/guides/design-direction.md`.
