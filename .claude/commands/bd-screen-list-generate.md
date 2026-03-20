---
description: Generate BD Screen List and Screen Transition from RD Screen Plan. No clarification, direct generation.
argument-hint: "No arguments — reads RD screen plan automatically."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate two files from `./01_Requirements_Document/06_screens/plan.md`:

1. `./02_Basic_Design/120_Screen_Design/01_screen_list.md` — inventory table of all screens
2. `./02_Basic_Design/120_Screen_Design/02_screen_transition.md` — navigation diagrams per module

---

## Execution Steps

### Step 1 — Pre-Flight Check

- Read `./.spec/docs/convention.md`. If missing → STOP. Output:
  ```
  ERROR: convention.md not found.
  ```
- Read `./01_Requirements_Document/06_screens/plan.md`. If missing → STOP. Output:
  ```
  ERROR: 06_screens/plan.md not found. Run /rd-screen-plan first.
  ```

Extract from plan.md:
- `## Screen Index` table — all SCR[SS], names, types, modules
- `## M[MM]` entries — Navigation and Cross-Module Navigation per module

---

### Step 2 — Generate Screen List

Write to: `./02_Basic_Design/120_Screen_Design/01_screen_list.md`

Copy Screen Index from plan.md into a single table. No derivation, no classification.

---

### Step 3 — Generate Screen Transition

Write to: `./02_Basic_Design/120_Screen_Design/02_screen_transition.md`

For each module in plan.md:
- Build a Mermaid flowchart from `Navigation` and `Cross-Module Navigation` fields
- Node shape by type:
  - `screen` → rectangle: `SCR[SS]["SCR[SS]<br>[Name]"]`
  - `dialog` → rectangle with label: `SCR[SS]["SCR[SS]<br>[Name]<br>«dialog»"]`
  - `drawer` → rectangle with label: `SCR[SS]["SCR[SS]<br>[Name]<br>«drawer»"]`
  - Entry point (no inbound edges within module) → rounded: `SCR[SS](["SCR[SS]<br>[Name]"])`
- Cross-module nodes: include target screen as node, label with `‹M[MM]›`
- Edge label = transition type: `push`, `modal`, `replace`, `back`

---

## Output Format

### File 1 — Screen List

```markdown
# Screen List

<!-- source: 06_screens/plan.md -->
<!-- total: [N] screens -->

| No | Module | Screen ID | Screen Name | Type |
|---|---|---|---|---|
| [N] | M[MM] — [Module Name] | SCR[SS] | [Screen Name] | [type] |
```

### File 2 — Screen Transition

````markdown
# Screen Transition

<!-- source: 06_screens/plan.md -->

---

## M[MM] — [Module Name]

```mermaid
flowchart TD
  SCR[SS](["SCR[SS]<br>[Name]"])
  SCR[SS]["SCR[SS]<br>[Name]"]
  SCR[SS]["SCR[SS]<br>[Name]<br>«dialog»"]

  SCR[SS] -->|push| SCR[SS]
  SCR[SS] -->|modal| SCR[SS]
  SCR[SS] -->|replace| SCR[SS]
  SCR[SS] -->|"push → M[MM]"| SCR[SS]
  SCR[SS]["SCR[SS]<br>[Name]<br>‹M[MM]›"]
```

---

## M[MM] — [Next Module Name]

(repeat)
````

---

## Output Format Rules

**Screen List:**
- One table, sorted by SCR ID ascending
- Columns: No, Module, ID, Screen Name, Type
- Copy exactly from plan.md Screen Index — do not modify

**Screen Transition:**
- One diagram per module
- Entry points = screens with no inbound edges within the module → rounded shape
- Cross-module target nodes included in source module diagram, labeled `‹M[MM]›`
- Edge labels always present — never unlabeled edges

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Read plan.md once, use for both files
- Do not derive or infer — copy IDs, names, types, navigation from plan.md exactly
- Write File 1 first, then File 2