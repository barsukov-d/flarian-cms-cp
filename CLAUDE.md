# flarian-cms-cp

## Stack & conventions

TypeScript/Node. Keep tests next to the source file they cover. Follow the
existing style of the file you're editing rather than introducing a new one.

## Constraints

- Never commit secrets or credentials.
- Stay within the scope of the requested task — no unrelated refactors.
- Work inside your working directory — it is your working copy of the project,
  and every relative path is resolved from it.
- Never step outside /workspace: it is the outer boundary of the machine you run on.
