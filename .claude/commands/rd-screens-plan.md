---
description: Generate a Screen Plan from all Use Case files. No clarification, direct generation.
argument-hint: "No arguments — reads all generated UC files automatically."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate `./01_Requirements_Document/06_screens/plan.md` from all generated Use Case files.

This file is consumed by LLM to generate individual Screen files, one per module. It pre-computes screen names, assigns global `SCR[SS]` IDs, and maps cross-module navigation so all screen files are consistent.

---

## Execution Steps

### Step 1 — Pre-Flight Check

- Read `./.spec/docs/convention.md`. If missing → STOP. Output:
  ```
  ERROR: convention.md not found.
  ```
- Read `./01_Requirements_Document/03_usecases/plan.md` — to identify which UC files exist (`[x]` entries). If missing → STOP. Output:
  ```
  ERROR: 03_usecases/plan.md not found. Run /rd-usecase-plan first.
  ```
- Read all UC files marked `[x]` in 03_usecases/plan.md. If none exist → STOP. Output:
  ```
  ERROR: No generated UC files found. Run /rd-usecase-generate first.
  ```
- Read `./01_Requirements_Document/02_features.md` — for Module Relationships table.

---

### Step 2 — Screen Extraction

Scan all UC files and extract screens from system steps.

**A screen is created when a system step:**
- Displays new information: `System displays [X]`
- Shows a dialog or overlay: `System shows [X] dialog`
- Navigates to a different view: `System redirects to [X]`
- A postcondition implies a visible end state

**Classification:**
| Type | When |
|---|---|
| `screen` | Full-page view, independent viewport |
| `dialog` | Overlay with limited content, confirmation or simple form |
| `drawer` | Slide-in panel for detail or secondary actions |

**Rule:** `dialog` and `drawer` only if UC step explicitly implies overlay behavior. Default to `screen`.

**For each screen, record:**
- Candidate name — short noun phrase
- Type — `screen`, `dialog`, `drawer`
- Source UC steps — `UC[MM].[NN].[PP] step FF`
- Module it primarily belongs to (from source UC)

---

### Step 3 — Deduplication

Merge screens that represent the same view triggered from different UC steps or modules.

- Keep the most descriptive name
- Record all source UC steps
- Assign to the module of the earliest source UC
- Note if screen is shared across modules

---

### Step 4 — Cross-Module Navigation Mapping

Read `## Module Relationships` from `02_features.md`.

For each `context` or `flow` relationship:
- Identify the screen in the context module that serves as the entry point
- Identify the screen in the dependent module that is reached from it
- Record as a directed navigation edge

This ensures cross-module navigation is explicit in the plan before screen files are generated.

---

### Step 5 — ID Assignment

Assign `SCR[SS]` sequentially after deduplication, ordered by:
1. Module order from `02_features.md`
2. First appearance within each module's UC file

---

### Step 6 — Output Generation

Write to: `./01_Requirements_Document/06_screens/plan.md`

---

## Output Format

```markdown
# Screen Plan

<!-- source: 03_usecases/*.md, 02_features.md -->
<!-- total: [N] screens -->

## Generation Checklist

- [ ] M[MM] — [Module Name] → `M[MM]_[slug].md`
- [ ] M[MM] — [Module Name] → `M[MM]_[slug].md`

---

## Screen Index

| SCR | Screen Name | Type | Module |
|---|---|---|---|
| SCR[SS] | [Screen Name] | [type] | M[MM] — [Module Name] |

---

## M[MM] — [Module Name]

**Output file:** `./01_Requirements_Document/06_screens/M[MM]_[slug].md`

**Screens**
- SCR[SS] — [Screen Name] `[type]`
- SCR[SS] — [Screen Name] `[type]`

**Navigation**
- SCR[SS] → SCR[SS] — [condition or action]
- SCR[SS] → SCR[SS] — [condition or action]

**Cross-Module Navigation** *(omit if none)*
- SCR[SS] (M[MM]) → SCR[SS] (M[MM]) — [condition or action]

---
```

---

## Output Format Rules

**Generation Checklist:** One line per module, all start as `[ ]`. Updated to `[x]` when screen file is generated.

**Screen Index:** Single global table. All screens across all modules. Ordered by SCR ID. This is the canonical reference for SCR IDs — all screen files must use IDs from this table.

**Screens per module:** List only screens belonging to this module. Use exact SCR IDs from Screen Index.

**Navigation:** Intra-module navigation only. Format: `SCR[SS] → SCR[SS] — [trigger condition]`.

**Cross-Module Navigation:** Only navigation edges that cross module boundaries. Derived from `Module Relationships` table in 02_features.md. Format: `SCR[SS] (M[MM]) → SCR[SS] (M[MM]) — [trigger condition]`.

**SCR ID:** Once assigned in Screen Index, must not change. All downstream documents reference these IDs.

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Derive screen names from UC system steps — do not fabricate
- Deduplicate before assigning IDs
- Cross-module navigation must be derived from Module Relationships — do not infer independently
- Do not create screens not implied by UC flows