---
description: Generate a Use Case execution plan from features.md. No clarification, direct generation.
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate `./01_Requirements_Definition/usecases/plan.md` from `./01_Requirements_Definition/features.md`.

This file is consumed by LLM to generate individual Use Case files, one per module. It is also used to track generation progress.

---

## Execution Steps

### Step 1 — Pre-Flight Check

- Read `./.spec/docs/convention.md` — ID convention for all symbols. If missing → STOP. Output:
  ```
  ERROR: convention.md not found.
  ```
- Read `./01_Requirements_Definition/features.md`. If missing or empty → STOP. Output:
  ```
  ERROR: features.md not found or empty. Run `/rd-features-generate` first.
  ```

---

### Step 2 — Module Extraction

Parse `features.md` structure:

- Each `## Module [MM] — [Name]` heading = one module entry
- Each `### F[MM].[NN] — [Name]` heading under it = one feature belonging to that module
- For each feature, extract: full ID `F[MM].[NN]`, name, actors, `Depends On` list

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

Scan all `Depends On` fields for cross-module references — a reference is cross-module when the `MM` part of the referenced feature ID differs from the current module's `MM`.

Order module entries so that if `F[AA].[NN]` depends on `F[BB].[NN]` and `AA ≠ BB`, then `M[BB]` appears before `M[AA]` in the output.

If circular dependency detected → flag inline:

```
<!-- CIRCULAR MODULE DEPENDENCY: M[AA] ↔ M[BB] — review feature split -->
```

---

### Step 5 — Output Generation

Write to: `./01_Requirements_Definition/usecases/plan.md`

---

## Output Format

```markdown
# Use Case Plan

<!-- source: features.md -->
<!-- total: [N] files to generate -->

## Generation Checklist

- [ ] M[MM] — [Module Name] → `M[MM]_[slug].md`
- [ ] M[MM] — [Module Name] → `M[MM]_[slug].md`

---

## M[MM] — [Module Name]

**Output file:** `./01_Requirements_Definition/usecases/M[MM]_[slug].md`

**Features**

- F[MM].[NN] — [Feature Name]
- F[MM].[NN] — [Feature Name]

**Actors by Feature**

- F[MM].[NN] → [Actor1], [Actor2]
- F[MM].[NN] → [Actor1]

**Depends On** _(omit if no cross-module dependency)_

- F[MM].[NN] → F[BB].[NN] — [reason]

---
```

---

## Output Format Rules

**Generation Checklist:** One line per module, all start as `[ ]`. Updated to `[x]` when the corresponding UC file is generated. This is the only place tracking status.

**Output file:** Filename = `M[MM]_[slug].md`. Feature IDs are listed inside the file, not in the filename.

**Depends On:** Cross-module dependencies only. Format: `F[MM].[NN] → F[BB].[NN] — [reason]`. Intra-module dependencies are already in `features.md` and must not be repeated here.

**Total comment:** `<!-- total: N -->` must equal the number of module entries in the file.

---

## Behavioral Rules

- Generate immediately — no clarification questions
- One entry per module — do not split or merge modules
- Preserve module order from `features.md` after dependency sort
- Do not add, infer, or expand features beyond what is in `features.md`
