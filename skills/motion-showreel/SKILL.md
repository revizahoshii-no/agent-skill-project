---
name: motion-showreel
description: Produce a deterministic code-rendered motion sequence with an approved brief, style frames, shared picture and sound timeline, editable source, and separate technical acceptance.
version: 1.0.0
---

# Motion Showreel

## Use when

- producing a timed motion film, title sequence, kinetic typography piece, interface showreel, or visual loop;
- the output requires frame-accurate rendering;
- picture and sound must share one timeline.

Do not use for an ordinary website or a click-driven presentation.

## Brief

Confirm:

- subject and message;
- duration and orientation;
- frame rate and resolution;
- audience and viewing context;
- visual direction;
- narration source;
- music and sound-effect source;
- loop requirements;
- delivery formats.

Do not start full production before the brief is stable.

## Style frames

Create a small set of distinct still directions when style is undecided. Each direction defines:

- composition;
- type behavior;
- palette and material;
- camera or spatial grammar;
- motion character;
- sound character.

Approve one direction before full animation.

## Deterministic timeline

- Render visuals from explicit time or frame input.
- Use one timeline for picture, narration, music, and effects.
- Keep previews and final renders driven by the same scene logic.
- Avoid random behavior without a fixed seed.
- Cache expensive chapters or assets when the film is long.
- Keep text stable at cuts and frame boundaries.

## Motion design

- Every movement serves emphasis, continuity, transformation, or rhythm.
- Use contrast between stillness and motion.
- Keep easing and timing coherent.
- Avoid constant motion in every layer.
- Design cuts and transitions around actual narration or music timing.
- Keep a safe fallback for reduced or static preview when useful.

## Sound

- Keep narration intelligible.
- Let music and effects yield to speech.
- Record source, license, timing, gain, and edit decisions.
- Use effects to reinforce events, not fill silence.

## Technical acceptance

Verify separately from taste:

- resolution and orientation;
- frame rate and frame count;
- exact duration;
- deterministic repeated render;
- missing or black frames;
- text integrity at cuts;
- audio sync;
- loudness and peak safety;
- file size and codec;
- loop seam when applicable.

## Delivery

Provide final render, editable source, asset list, timeline notes, and a concise acceptance report. Keep subjective review notes separate from technical pass or fail.

Human documentation: `../../docs/guides/motion-showreel.md`.
