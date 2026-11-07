# Agent loading rules

This repository is intentionally modular. Context efficiency is a functional requirement.

## Start here

1. Read only `skills/router/SKILL.md`.
2. Use `skills/registry.json` to select the task-specific skill.
3. Load at most two primary skills and one supporting skill for the current phase.
4. Load references or human guides only when the selected skill explicitly requires them.
5. When the task moves to a new phase, stop expanding the previous skill and route again.

## Prohibited loading patterns

- Do not read every `SKILL.md` at startup.
- Do not recursively load `skills/**`.
- Do not create or use a load-all command.
- Do not preload screenshots, guides, examples, or references.
- Do not treat human documentation as runtime instructions.

## Priority

1. User instructions
2. Project-specific requirements
3. Selected skill
4. Supporting skill
5. General repository guidance

If instructions conflict, follow the higher priority and record the decision briefly.

## Quality rules

- Use facts and real assets. Never fabricate claims, people, numbers, or product behavior.
- Ask before creating identity assets or user-representing imagery.
- Keep generated code free of comments unless the user explicitly requests comments.
- Run the relevant checks before claiming completion.
- Report measured evidence separately from source-based hypotheses.
