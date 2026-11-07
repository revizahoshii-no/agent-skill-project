---
name: loading-experience
description: Design lightweight, contextual, informative, responsive, and accessible loading feedback for page, region, control, transfer, and background-task states.
version: 1.0.0
---

# Loading Experience

## Use when

- designing a loader, spinner, progress bar, skeleton, staged reveal, or startup sequence;
- replacing generic loading feedback with product-specific but lightweight motion;
- deciding whether a wait needs no UI, local feedback, determinate progress, staged status, or recovery controls;
- implementing loading states for search, media, upload, export, fulfillment, document parsing, navigation, or data regions;
- reviewing loading motion for accessibility, responsiveness, and performance.

Do not use to hide a performance defect, force a brand intro after content is ready, or diagnose network and server performance without measurement.

## Core principle

Loading feedback exists to maintain trust during real work. Show the smallest truthful signal for the expected wait, keep the surrounding context stable, and reveal usable content as soon as it is ready.

Aesthetic motion is allowed only after scope, progress truth, status language, recovery, and reduced-motion behavior are defined.

## Step 1: classify the wait

Record:

```text
Task:
Scope: page, region, control, or background
Blocking or non-blocking:
Expected duration:
Maximum expected duration:
Progress model: none, staged, or determinate
Context retained during wait:
Result geometry known:
Cancelable:
Retryable:
Failure path:
Product motion language:
Reduced-motion state:
```

Use measured duration when available. Do not invent a percentage from elapsed time unless elapsed time is the real progress model.

## Step 2: choose feedback by duration

| Expected duration | Default feedback | Notes |
| --- | --- | --- |
| under 100 ms | none | avoid flashing a loader for immediate work |
| 100 ms to 1 s | local pressed, pending, or subtle indicator state | keep labels and layout stable |
| 1 s to 10 s | skeleton, staged label, or measured progress | show what is happening and reveal partial results |
| over 10 s | determinate or staged progress with expectation and recovery | support cancel, retry, or background continuation where possible |

Delay an indeterminate indicator briefly when a fast response is common, but never delay the real content to make the loader visible.

## Step 3: choose a pattern family

The observed motion reference groups visual ideas into circle, dots, fading circles, ball, time, signal, and task-icon families. Translate those families into product semantics rather than copying a decorative grid.

| Pattern | Appropriate use | Avoid when |
| --- | --- | --- |
| Orbital arc | local media, product preview, or compact processing | determinate progress is available |
| Sequenced dots | composing, searching, or conversational activity | the dots do not identify the active region |
| Radial pulse | discovery, scanning, or proximity | repeated pulsing could distract from readable content |
| Traveling bead | directional transfer with unknown byte progress | direction has no meaning |
| Time sweep | known refresh or polling window | duration is unpredictable or very long |
| Signal ladder | connection negotiation or hardware discovery | bars could be mistaken for real signal strength |
| Task icon | document parsing, delivery, export, search, mail, or download | the icon is decorative or unrelated to the task |
| Wordmark reveal | genuinely blocking application startup | content is already ready |
| Measured line | upload, export, install, or batch task with real progress | percentage is simulated |
| Staged tiles | collection or board results arriving incrementally | final item count and geometry are unknown without fallback |
| Structural skeleton | known content geometry | placeholder shapes do not map to real content |
| Staged reveal | page sections resolving independently | it forces sequential delay on ready sections |

## Step 4: define progress truth

Use one model:

### Indeterminate

The system knows that work is active but cannot estimate completion.

- Keep the motion compact and local.
- Provide a specific status such as `Searching saved reports` rather than `Please wait`.
- Escalate to timeout or recovery instead of looping forever.

### Staged

The task has named phases but no reliable percentage.

```text
Preparing files
Compressing archive
Verifying package
Ready to download
```

- Announce meaningful stage changes.
- Do not create fake micro-stages only to appear busy.
- Preserve completed stage evidence when useful.

### Determinate

The system has a real numerator and denominator or an equivalent measured value.

- Update a semantic progress bar.
- Keep percentage and label synchronized with actual work.
- Avoid rapid regressions or jumps without explanation.
- Switch to completion promptly at 100 percent.

## Step 5: design the motion signature

Choose one signature that belongs to the product:

```text
geometry: circle, line, tile, letter, or contextual icon
energy: quiet, measured, playful, technical, or cinematic
direction: clockwise, forward, upward, expanding, or staged
cycle duration:
easing:
color roles:
static reduced-motion state:
```

Motion rules:

- Prefer transforms and opacity.
- Animate a small visual region.
- Keep cycles legible rather than frantic.
- Use one main rhythm per loading state.
- Avoid motion on large text blocks or the entire viewport.
- Do not combine spin, bounce, shimmer, and scale in one component.
- Stop or replace motion immediately when the state resolves.

## Step 6: preserve context and layout

- Keep navigation, previous content, filters, and user input available when safe.
- Show local loading inside the region that will change.
- Reserve final geometry to avoid layout shift.
- Keep the control label visible unless a replacement communicates the same action.
- Replace skeleton pieces progressively when their real content arrives.
- Do not cover the whole page for a local request.
- Do not use a skeleton for content whose final geometry is unknown.

## Step 7: write status and recovery

Status should name real work:

```text
Searching 148 saved reports
Uploading 3 of 8 files
Preparing the print-ready archive
Reconnecting to the studio speaker
Indexing chapter 4 of 12
```

Avoid:

```text
Loading...
Working on magic...
Almost there...
Please be patient...
```

For waits that may fail, define:

- timeout threshold;
- visible error state;
- retry action;
- cancel action when cancellation is safe;
- preserved user input;
- background continuation or notification when supported.

## Step 8: implement semantics

For indeterminate status:

```html
<p role="status" aria-live="polite">Searching saved reports</p>
```

For determinate progress:

```html
<div role="progressbar" aria-label="Uploading files" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62"></div>
```

Implementation rules:

- Keep status text in the document and update it only when meaning changes.
- Use polite live updates for routine progress.
- Do not announce every animation frame or percentage tick.
- Label retry and cancel controls by action.
- Keep focus stable during normal progress.
- Move focus only when an error or completion flow requires it.
- Treat decorative loader geometry as hidden from assistive technology when an equivalent text status exists.

## Step 9: support reduced motion

Under `prefers-reduced-motion: reduce`:

- replace continuous rotation, bounce, pulse, and shimmer with a static indicator or a single short state change;
- keep status text, stage labels, and determinate values visible;
- preserve the same layout and completion behavior;
- avoid replacing an informative animation with an unexplained blank space.

A pause control is useful for a demonstration library, but product loading should normally end with the task rather than rely on the user to stop it.

## Step 10: verify performance and behavior

Check:

```text
no loader appears after content is ready
no forced minimum display duration
no horizontal overflow near 400 CSS pixels
no layout shift when content replaces the placeholder
no animation-driven layout thrashing
no hidden focus or trapped controls
no infinite loop after timeout
status copy matches the active task
progress value reflects real work
reduced-motion state remains understandable
error, retry, cancel, and completion states work
```

Use browser evidence at wide and narrow viewports. Where possible, test a fast path, slow path, error path, retry, and reduced-motion emulation.

## Failure patterns

Reject or revise:

- a full-page spinner for a local card update;
- a generic spinner added to every asynchronous action;
- a branded intro that delays ready content;
- fake percentages that climb to 99 and wait;
- shimmer across unrelated empty areas;
- loading text that does not describe the task;
- motion that continues behind completed content;
- a skeleton that changes the eventual reading order;
- animation of width, height, top, or left when a transform can express the same motion;
- no timeout or error recovery for a long wait;
- reduced motion that removes all feedback;
- status announcements on every visual frame.

## Output contract

Return:

```text
Task and scope:
Expected and maximum duration:
Blocking posture:
Progress model:
Selected pattern and reason:
Visible status language:
Context preserved:
Geometry reserved:
Animation properties:
Reduced-motion state:
Timeout:
Error and retry:
Cancel or background behavior:
Semantic markup:
Performance evidence:
Wide and narrow browser evidence:
Remaining uncertainty:
```

## Completion check

- The loader corresponds to real work and the correct region.
- The progress model is truthful.
- Status copy names the active task.
- Ready content is never delayed for animation.
- Layout remains stable while content resolves.
- Motion uses a small budget and stops on completion.
- Reduced motion preserves meaning.
- Timeout, error, retry, cancel, and preserved input are defined where relevant.
- Determinate values and semantic attributes stay synchronized.
- Wide and narrow browser behavior is verified.

Human documentation: `../../docs/guides/loading-experience.md`.
