---
name: web-presentation
description: Build a click-driven, recordable web presentation with a stable 16:9 stage, script-led scenes, chapter and step navigation, optional narration, and presentation acceptance.
version: 1.0.0
---

# Web Presentation

## Use when

- creating a browser-based slide deck;
- turning a script, lesson, article, or demo into a recordable presentation;
- building chapter and step navigation;
- synchronizing optional narration with visual beats.

Do not use for an ordinary website or a free-running motion film.

## Plan

Confirm:

- audience and purpose;
- duration;
- source material;
- target language;
- aspect ratio;
- interaction model;
- recording requirements;
- narration and audio permissions.

Write the script and outline before implementing scenes.

## Content model

- Divide the story into chapters.
- Divide chapters into visual steps.
- Map one narration beat to one visual step.
- Give each step one primary idea.
- Keep visual content stronger than supporting text.
- Use labels that match human slide numbering.

## Stage

- Use a fixed internal 16:9 canvas.
- Scale it to the viewport without distortion.
- Keep navigation controls outside the scaled stage when practical.
- Preserve legible type at the intended recording size.
- Avoid content that depends on hover.

## Controls

Provide:

- previous and next;
- keyboard navigation;
- chapter and step progress;
- restart;
- optional presenter notes;
- position persistence when useful;
- reduced-motion behavior.

Controls may hide during recording but must remain discoverable.

## Visual system

- Use one theme across the deck.
- Let each scene vary by narrative role while preserving tokens.
- Avoid slide layouts that only move a title and bullets.
- Use diagrams, images, interface states, or type composition when they explain the beat.
- Keep transitions short and deterministic.

## Audio

Audio is optional. Approve the final narration text before synthesis or recording. Keep narration, music, and effects on separate tracks. Speech remains dominant in the mix.

## Acceptance

Verify:

- every chapter and step;
- keyboard and pointer controls;
- stage scaling at large and small viewports;
- position persistence;
- text overflow;
- transition determinism;
- reduced motion;
- recording cleanliness;
- audio timing when present.

## Delivery

Provide editable source, run instructions, recording guidance, and exported media only when requested.

Human documentation: `../../docs/guides/web-presentation.md`.
