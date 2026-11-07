---
name: performance
description: Measure and improve loading, responsiveness, layout stability, resource delivery, and runtime behavior using evidence from field data, browser traces, audits, and source inspection.
version: 1.0.0
---

# Web Performance

## Use when

- auditing page speed or Core Web Vitals;
- diagnosing slow loading or interaction;
- reducing JavaScript, CSS, image, or font cost;
- validating a redesign before release.

## Evidence model

Keep evidence types separate:

1. field data from real users;
2. first-party monitoring;
3. controlled browser trace or lab audit;
4. source inspection as a hypothesis.

Do not report source inspection as measured performance. Do not treat a lab score as proof of field performance.

## Baseline

Record:

- URL, route, state, and authentication condition;
- viewport, device profile, network, and browser;
- tool and version;
- request count and transferred bytes;
- key timings and layout shifts;
- console and network failures;
- largest assets and long tasks.

Compare before and after under equivalent conditions.

## Field targets

Common 75th-percentile targets:

- LCP below 2.5 seconds;
- INP below 200 milliseconds;
- CLS below 0.1.

These are field targets. Label lab observations accurately.

## Diagnostic order

1. Confirm the regression or failure.
2. Identify the dominant element, request, or task.
3. Trace it to source.
4. Apply the smallest causal repair.
5. Rerun the equivalent measurement.
6. Check a nearby interaction for regression.

## Loading rules

- Remove unused scripts and dependencies.
- Avoid render-blocking third-party code.
- Defer non-critical scripts or load them on interaction.
- Compress and correctly size images.
- Give media explicit dimensions or aspect ratio.
- Reserve space for late content.
- Keep the hero image eager and prioritized when appropriate.
- Lazy-load below-fold images and embeds.
- Define an intentional font-loading strategy.
- Use caching appropriate to the deployment model.

## Runtime rules

- Break up long tasks.
- Keep event handlers small.
- Batch DOM reads and writes.
- Avoid layout measurement during render.
- Use transform and opacity for animation when possible.
- Virtualize or apply content visibility to large lists when justified.
- Avoid heavy libraries for behavior available in the platform.

## Layout stability

- Set media dimensions.
- Reserve async regions.
- Avoid inserting content above existing content without space.
- Keep font swaps from changing layout excessively.
- Verify responsive images and embeds at each layout state.

## Output contract

Report:

```text
Scope and conditions:
Baseline evidence:
Primary bottleneck:
Source cause:
Repair:
Equivalent rerun:
Remaining field validation:
```

Human documentation: `../../docs/guides/performance.md`.
