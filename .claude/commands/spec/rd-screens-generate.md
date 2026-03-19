---
description: Generate a global Screen List from Use Case files, Business Rules, and Data Model. No clarification, direct generation.
argument-hint: "No arguments — reads all generated UC files automatically."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate `./01_Requirements_Definition/screen_list.md` from Use Case files, Business Rules, and Data Model.

This document defines **what screens exist** — name, actor, trigger, navigation, data, constraints, and states. It does not describe layout, components, or visual design. This file is consumed by LLM to generate wireframes, design specs, and test cases.

---

## Execution Steps

### Step 1 — Pre-Flight Check

Read the following files. If UC files are missing → STOP and report which file is missing:

- `./.spec/docs/convention.md` — ID convention for all symbols
- `./01_Requirements_Definition/usecases/plan.md` — to identify which UC files exist
- `./01_Requirements_Definition/usecases/M[MM]_[slug].md` — all files marked `[x]` in plan
- `./01_Requirements_Definition/business_rules.md` — for constraints affecting screen display
- `./01_Requirements_Definition/data_model.md` — for entities displayed on each screen

---

### Step 2 — Screen Extraction

Scan all UC files and extract screens from flow steps.

**A screen is generated when:**

- A system step displays new information: `System displays [X]`
- A system step shows a new dialog or modal: `System shows confirmation dialog`
- A system step navigates to a different view: `System redirects to [X]`
- A postcondition implies a visible end state: `User is redirected to dashboard`

**One screen per distinct view** — do not create separate screens for:

- Same view with different data (e.g., Edit User and Edit Product use the same Edit form pattern — these are different screens)
- Loading state of an existing screen (captured as a state, not a separate screen)

**For each screen, record:**

- Name — short noun phrase
- Source steps — `UC[MM].[NN].[PP] step FF`
- Actor who sees it
- Module it primarily belongs to (based on source UC)

---

### Step 3 — Deduplication

Merge screens that represent the same view triggered from different UC flows.

- Keep the most complete definition
- Record all source UC steps in the `Trigger` field
- Assign the module of the primary (first appearing) UC

---

### Step 4 — Navigation Mapping

For each screen, identify:

- **Navigates from** — which screens lead to this screen (based on UC flow order)
- **Navigates to** — which screens this screen leads to

Use screen IDs once assigned. If IDs not yet assigned, use screen names temporarily then replace.

---

### Step 5 — Constraint & Data Mapping

For each screen:

- Match displayed entities from `data_model.md` — which `E[EE]` appear on this screen
- Match applicable BR from `business_rules.md` — which `BR[RR]` affect what this screen shows or allows

---

### Step 6 — State Identification

For each screen, identify applicable states:

| State      | When                                             |
| ---------- | ------------------------------------------------ |
| Default    | Normal loaded state with data                    |
| Empty      | No data to display                               |
| Loading    | Data is being fetched                            |
| Error      | System or network failure                        |
| Success    | Action completed successfully                    |
| Restricted | Actor lacks permission (BR[RR] PRM rule applies) |

Only list states that are explicitly implied by UC flows or BR — do not fabricate states.

---

### Step 7 — ID Assignment

Assign `SCR[SS]` sequentially after deduplication, ordered by first appearance across UC files (module order from `plan.md`).

---

### Step 8 — Output Generation

Write to: `./01_Requirements_Definition/screen_list.md`

---

## Output Format

```markdown
# Screen List

<!-- source: usecases/*.md, business_rules.md, data_model.md -->
<!-- total: [N] screens -->

---

## Module M[MM] — [Module Name]

### SCR[SS] — [Screen Name]

**Actor:** [Role], [Role]
**Trigger:** UC[MM].[NN].[PP] step [FF] — [brief description of what triggers this screen]

**Navigates From**

- SCR[SS] — [Screen Name]

**Navigates To**

- SCR[SS] — [Screen Name] — [condition or action that triggers navigation]

**Data Displayed**

- E[EE] — [Entity Name]: [which attributes are shown]

**Constraints**

- BR[RR] — [one-line summary of how this rule affects the screen]

**States**

- Default — [brief description]
- Empty — [brief description] _(omit if not applicable)_
- Loading — [brief description] _(omit if not applicable)_
- Error — [brief description] _(omit if not applicable)_
- Success — [brief description] _(omit if not applicable)_
- Restricted — [brief description] _(omit if not applicable)_

---

### SCR[SS] — [Next Screen Name]

(repeat structure)

---

## Module M[MM] — [Next Module Name]

(repeat structure)
```

---

## Output Format Rules

**SCR ID:** Global sequential. `SS` starts at `01` and increments across the entire document regardless of module.

**Screen Name:** Short noun phrase describing the view — not the action. `User Profile` not `View User Profile`. `Order Detail` not `Show Order`.

**Trigger:** Cite exact UC step — `UC01.02.01 step 04`. Multiple triggers allowed if screen appears in multiple UC flows — list all.

**Navigates From / To:** Use SCR IDs. If a screen has no inbound navigation (entry point) → write `Entry point`. If no outbound navigation (terminal screen) → omit `Navigates To`.

**Data Displayed:** List entity and relevant attributes shown — not all attributes, only those visible on this screen. Reference `E[EE]` from data model.

**Constraints:** Reference `BR[RR]` only — one line summary of how the rule manifests on this screen. Do not copy full rule text.

**States:** Omit states not implied by UC or BR. Do not write empty state entries.

**Module grouping:** Screen belongs to the module of its primary UC trigger. If a screen is triggered by UCs from multiple modules, assign to the module with the earliest UC.

---

## Constraints

DO NOT include in screen list:

| What                             | Belongs in       |
| -------------------------------- | ---------------- |
| UI layout, component names       | Wireframe / BD   |
| Button labels, field labels      | Design Spec / DD |
| Visual style, colors, typography | Design System    |
| Validation logic detail          | Business Rules   |
| Test scenarios                   | Test Cases       |

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Extract screens from UC observable system steps only — do not infer screens from feature names or entity names
- Deduplicate before assigning IDs
- Constraint and Data fields reference IDs only — never copy full text from BR or Data Model
- States must be grounded in UC flows or BR — do not fabricate
