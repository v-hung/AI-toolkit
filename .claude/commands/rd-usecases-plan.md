---
description: Generate a Use Case execution plan from 02_features.md. No clarification, direct generation.
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate `./01_Requirements_Document/03_usecases/plan.md` from `./01_Requirements_Document/02_features.md`.

This file is consumed by LLM to generate individual Use Case files, one per module. It is also used to track generation progress.

---

## Execution Steps

### Step 1 — Pre-Flight Check

- Read `./.spec/docs/convention.md` — ID convention for all symbols. If missing → STOP. Output:
  ```
  ERROR: convention.md not found.
  ```
- Read `./01_Requirements_Document/02_features.md`. If missing or empty → STOP. Output:
  ```
  ERROR: 02_features.md not found or empty. Run `/rd-features-generate` first.
  ```

---

### Step 2 — Module Extraction

Parse `02_features.md` structure:

- Each `## Module [MM] — [Name]` heading = one module entry
- Each `### F[MM].[NN] — [Name]` heading under it = one feature belonging to that module
- For each feature, extract: full ID `F[MM].[NN]`, name, actors, `Depends On` list
- Read `## Module Relationships` table — extract all cross-module relationships and entry points

---

### Step 3 — File Naming

Derive output filename for each module:

```
M[MM]_[module-name-slug].md
```

- `M[MM]` = two-digit zero-padded module number (M01, M02…)
- slug = module name lowercased, spaces replaced with `_`, special characters removed
- Examples:
  - Module 1 "User Management" → `M01_user_management.md`
  - Module 3 "Notification" → `M03_notification.md`

---

### Step 4 — Dependency Ordering

Scan all `Depends On` fields and `Module Relationships` table for cross-module references.

Order module entries so that if `M[AA]` depends on or has context from `M[BB]`, then `M[BB]` appears before `M[AA]` in the output.

If circular dependency detected → flag inline:
```
<!-- CIRCULAR MODULE DEPENDENCY: M[AA] ↔ M[BB] — review feature split -->
```

---

### Step 5 — Output Generation

Write to: `./01_Requirements_Document/03_usecases/plan.md`

---

## Output Format

```markdown
# Use Case Plan

<!-- source: 02_features.md -->
<!-- total: [N] files to generate -->

## Generation Checklist

- [ ] M[MM] — [Module Name] → `M[MM]_[slug].md`
- [ ] M[MM] — [Module Name] → `M[MM]_[slug].md`

---

## M[MM] — [Module Name]

**Output file:** `./01_Requirements_Document/03_usecases/M[MM]_[slug].md`

**Features**
- F[MM].[NN] — [Feature Name]
- F[MM].[NN] — [Feature Name]

**Actors by Feature**
- F[MM].[NN] → [Actor1], [Actor2]
- F[MM].[NN] → [Actor1]

**Context From** *(omit if this module has no context or flow dependency on another module)*
- M[MM] — [Module Name] — [entry point description from Module Relationships table]

**Depends On** *(omit if no cross-module data dependency)*
- F[MM].[NN] → F[BB].[NN] — [reason]

---
```

---

## Output Format Rules

**Generation Checklist:** One line per module, all start as `[ ]`. Updated to `[x]` when the corresponding UC file is generated.

**Context From:** Populated from `Module Relationships` table in 02_features.md where relationship type is `context` or `flow`. This tells UC generator that this module's flows do not start at an independent entry point — they are reached from the context module. Omit for modules with no such relationship.

**Depends On:** Cross-module `data` dependencies only. Format: `F[MM].[NN] → F[BB].[NN] — [reason]`. Intra-module dependencies are already in `02_features.md` and must not be repeated here.

**Total comment:** `<!-- total: N -->` must equal the number of module entries in the file.

---

## Behavioral Rules

- Generate immediately — no clarification questions
- One entry per module — do not split or merge modules
- Preserve module order from `02_features.md` after dependency sort
- Do not add, infer, or expand features beyond what is in `02_features.md`
- `Context From` must be derived strictly from `Module Relationships` table — do not infer independently