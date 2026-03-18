---
description: Generate a Use Case execution plan from feature-list.md. No clarification, direct generation.
---

## Objective

Generate `./01_Requirements_Definition/03_usecase_plan.md` from `./01_Requirements_Definition/02_features.md`.

This file is consumed by LLM to generate individual Use Case files, one per module. It is also used to track generation progress.

---

## Execution Steps

### Step 1 — Pre-Flight Check

- Read `./01_Requirements_Definition/02_features.md`
- If missing or empty → STOP. Output:
  ```
  ERROR: feature_list.md not found or empty. Run `/rd-features` first.
  ```

---

### Step 2 — Module Extraction

For each module in feature-list.md, extract:

- Module number and name
- All feature IDs and names belonging to the module
- All unique actors across those features (deduplicated)
- All `Depends On` references that cross module boundaries (external dependencies)

---

### Step 3 — File Naming

Derive output filename for each module using this rule:

```
M[NN]_[module-name-slug].md
```

- `M[NN]` = two-digit zero-padded module number (M01, M02…)
- slug = module name lowercased, spaces replaced with `_`, special characters removed
- Examples:
  - Module 1 "User Management" → `M01_user_management.md`
  - Module 3 "Notification" → `M03_notification.md`

---

### Step 4 — Dependency Ordering

Order entries by dependency: if Module A has a feature that depends on a feature in Module B, Module B must appear first.

If circular dependency detected across modules → flag:

```
<!-- CIRCULAR MODULE DEPENDENCY: Module X ↔ Module Y — review feature split -->
```

---

### Step 5 — Output Generation

Write to: `./01_Requirements_Definition/03_usecase/plan.md`

---

## Output Format

```markdown
# Use Case Plan

<!-- source: feature_list.md -->
<!-- total: [N] files to generate -->

## Generation Checklist

- [ ] M[NN] — [Module Name] → `M[NN]_[slug].md`
- [ ] M[NN] — [Module Name] → `M[NN]_[slug].md`

---

## M[NN] — [Module Name]

**Output file:** `./01_Requirements_Definition/03_usecase/M[NN]_[slug].md`

**Features**

- F[MM].[NN] — [Feature Name]
- F[MM].[NN] — [Feature Name]

**Actors by Feature**

- F01.01 → Admin
- F01.02 → Admin, Manager

**Depends On** _(omit if no cross-module dependency)_

- M[NN] — [Module Name]

---
```

---

## Output Format Rules

**Generation Checklist:** Listed at the top of the file — one line per module, all start as `[ ]`. When a UC file is generated, the corresponding line is updated to `[x]`. This is the only place tracking status — no `Status` field inside each module entry.

**Output file:** Filename = `M[NN]_[slug].md` where slug is the module name lowercased with spaces as `_`. Feature IDs are listed inside the file, not in the filename.

**Depends On:** Only cross-module dependencies. Intra-module feature dependencies are already captured in feature_list.md and do not need repeating here.

**Total comment:** `<!-- total: N files to generate -->` must reflect the actual count of UC entries in the file.

---

## Behavioral Rules

- Generate immediately — no clarification questions
- One entry per module — do not split or merge modules
- Actors are deduplicated across all features in the module
- Preserve module order from feature_list.md after dependency sort
- Do not add, infer, or expand features beyond what is in feature_list.md
