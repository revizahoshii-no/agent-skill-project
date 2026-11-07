---
name: asset-image
description: Inventory, source, generate, edit, and document visual assets without replacing real identity, fabricating people, or creating unapproved final imagery.
version: 1.0.0
---

# Asset and Image Workflow

## Use when

- a design depends on photography, screenshots, illustration, diagrams, or identity assets;
- generating or editing an image;
- auditing missing or weak assets;
- creating a visual brief.

## Approval gate

Before creating a new final asset, confirm that asset creation is approved. Approval is required for logos, avatars, people, team imagery, identity illustrations, and statistics rendered as graphics.

If approval is unavailable, use an honest placeholder or continue with an asset requirement list.

## Asset authority

1. official identity and source code;
2. user-provided assets;
3. current product screenshots and real media;
4. appropriately licensed material;
5. approved generated assets;
6. honest placeholders.

Never replace a real logo, product, or interface with a generic CSS drawing.

## Inventory

Record:

- file path and role;
- source and license when relevant;
- dimensions, format, and file size;
- light and dark variants;
- crop and focal point;
- accessibility text;
- status: approved, temporary, missing, or replace.

## Choose a mode

- Generate: create a new image.
- Edit: modify a supplied image.
- Advisor: write a prompt and visual brief only.
- Source: locate a legitimate existing asset.

Use the least destructive mode that solves the need.

## Visual brief

Define:

- the image's job in the interface;
- subject and environment;
- composition and aspect ratio;
- light, color, material, and texture;
- relationship to the design tokens;
- focal area and text-safe area;
- prohibited content;
- realism and finish level.

Generate one standalone image per output. Do not place several variants or a collage inside one canvas.

## Review

Check:

- subject accuracy;
- identity consistency;
- text-safe area;
- unwanted text, logos, or watermark;
- anatomy and object integrity;
- crop at target viewports;
- contrast around overlay text;
- compression and format;
- alternative text;
- whether the image genuinely improves recognition or explanation.

## Web delivery

- Store assets locally.
- Use correct dimensions and aspect ratio.
- Keep the hero image eager and below-fold images lazy.
- Use responsive sizes when the design serves multiple widths.
- Avoid oversized source files.
- Preserve originals when editing.
- Record prompts and selected versions for generated assets.

## Boundaries

- Do not fabricate a real person's likeness or identity.
- Do not imply an unofficial image is official.
- Do not hide missing assets with decorative noise.
- Do not generate imagery for every section by default.
- Source code and approved identity always override generated pixels.

Human documentation: `../../docs/guides/asset-image.md`.
