---
name: router
description: Select the smallest relevant skill set for a task without loading the entire repository. Use at the start of work or when the task changes phase.
version: 1.0.0
---

# Skill Router

## Purpose

Choose only the context required for the current phase. This skill routes work. It does not contain domain instructions and must not trigger recursive loading.

## Hard limits

- Load at most two primary skills.
- Load at most one supporting skill.
- Never load all skills.
- Never recursively read `skills/**`.
- Never preload human guides, screenshots, examples, or optional references.
- Route again when the task changes phase.

## Routing procedure

1. Read the user request and project constraints.
2. Identify the current phase: research, planning, content, implementation, review, acceptance, or release.
3. Read `../registry.json`.
4. Match explicit trigger phrases and intended output.
5. Remove candidates whose exclusions match the task.
6. Select one primary skill.
7. Add a second primary skill only when both domains are necessary in the same phase.
8. Add one supporting skill only when it prevents a concrete risk.
9. State the selected paths in one short line.
10. Load only those files.

## Default routes

| Task | Primary | Optional support |
|---|---|---|
| New visual website | design-direction | product-copy |
| Palette, theme, or brand-color system | color-systems | accessibility |
| Existing UI color or contrast change | color-systems | accessibility |
| Existing UI change | design-direction or interface-craft | accessibility |
| Frontend implementation | interface-craft | responsive-mobile |
| Generic or machine-like web output | clean-build-web | interface-craft |
| Mobile defect | responsive-mobile | accessibility |
| Scope, honesty, or code-hygiene risk | clean-build-core | relevant domain skill |
| API, backend, bot, script, or CLI | clean-build-runtime | clean-build-core |
| Non-browser verification | clean-build-verification | clean-build-core |
| Accessibility review | accessibility | browser-acceptance |
| New marketing copy | product-copy | design-direction |
| Image work | asset-image | design-direction |
| Speed investigation | performance | browser-acceptance |
| Metadata or headers | seo-security | release-delivery |
| Browser QA | browser-acceptance | accessibility |
| Deployment | release-delivery | seo-security |
| Local document research | knowledge-retrieval | none |
| Long-form HTML article | editorial-article | asset-image |
| Recordable slide experience | web-presentation | asset-image |
| Timed motion film | motion-showreel | asset-image |

## Selection rules

- Prefer a task-specific skill over a broad skill.
- Do not load design-direction for a small code repair with no visual decision.
- Prefer color-systems over design-direction when palette roles, theme pairing, or contrast are the main decision.
- Do not load color-systems for photo grading or when every color token is already fixed.
- Do not load browser-acceptance when the user asks for source review only.
- Do not load release-delivery before the implementation is ready to ship.
- Do not load product-copy for utility labels unless wording is part of the task.
- Do not load asset-image when no asset will be created or changed.
- Treat the four Clean Build modules as alternatives selected by risk, not as a bundle.
- Select clean-build-core only when cross-cutting scope, truth, code hygiene, or context continuity materially changes execution.
- Select clean-build-web for content and interface cleanup, clean-build-runtime for non-browser software, and clean-build-verification for executable acceptance beyond a browser-only path.
- Prefer browser-acceptance over clean-build-verification when the entire acceptance scope is a rendered website.
- Never load the four Clean Build modules together.
- Do not load both web-presentation and motion-showreel unless the deliverable explicitly combines click-driven and timed output.

## Phase handoff

Use a short handoff when moving phases:

```text
Completed phase: planning
Evidence retained: approved direction and constraints
Next phase: implementation
Load: interface-craft, responsive-mobile
Unload from active reasoning: design exploration alternatives
```

The handoff preserves decisions without carrying full prior skill text into the next phase.

## Ambiguity

Ask one focused question only when two routes would produce materially different work. Otherwise choose the narrowest safe route and proceed.

## Output contract

Return:

```text
Phase: <phase>
Primary: <one or two skill paths>
Support: <zero or one skill path>
Reason: <one sentence>
```

Human documentation: `../../docs/guides/router.md`.
