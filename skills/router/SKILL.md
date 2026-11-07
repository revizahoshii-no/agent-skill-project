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
| Existing UI change | design-direction or interface-craft | accessibility |
| Frontend implementation | interface-craft | responsive-mobile |
| Mobile defect | responsive-mobile | accessibility |
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
- Do not load browser-acceptance when the user asks for source review only.
- Do not load release-delivery before the implementation is ready to ship.
- Do not load product-copy for utility labels unless wording is part of the task.
- Do not load asset-image when no asset will be created or changed.
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
