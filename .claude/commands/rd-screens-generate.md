---
description: Generate one Screen file for a given module. No clarification, direct generation.
argument-hint: "[M01] — optional. If omitted, picks the first pending module from screen plan."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## User Input

```text
$ARGUMENTS
```

You **MUST** read the user input above before proceeding. If not empty, treat it as the target module ID. If empty, fall back to plan.md.

## Objective

Generate `./01_Requirements_Document/06_screens/M[MM]_[slug].md` for the specified module.

This file defines what each screen contains — actor, trigger, navigation, data, constraints, and states. It does not describe layout or visual design. Consumed by LLM to generate wireframes, design specs, and test cases.

---

## Execution Steps

### Step 1 — Identify Target Module

If `M[MM]` is passed as argument → use it.

If no argument → read `./01_Requirements_Document/06_screens/plan.md` and find the first entry where status is `[ ]`.

If all entries are `[x]` → STOP. Output:
```
All screen files already generated.
```

Read the following files. If any is missing → STOP and report:

- `./.spec/docs/convention.md`
- `./01_Requirements_Document/06_screens/plan.md` — Screen Index, navigation, SCR IDs
- `./01_Requirements_Document/03_usecases/M[MM]_[slug].md` — UC file for this module
- `./01_Requirements_Document/04_business_rules.md` — for constraints
- `./01_Requirements_Document/05_data_model.md` — for entities

Extract for the target module from `06_screens/plan.md`:
- All `SCR[SS]` belonging to this module (from Screen Index)
- Intra-module navigation edges
- Cross-module navigation edges involving this module

---

### Step 2 — Screen Detail Derivation

For each `SCR[SS]` in this module, derive detail from UC file:

**Actor:** Who sees this screen — from UC Actor field of the source UC step.

**Trigger:** Exact UC step that causes this screen to appear — `UC[MM].[NN].[PP] step FF`. If multiple UC steps trigger the same screen, list all.

**Navigates From / To:** Use SCR IDs from Screen Index in plan.md — do not create new IDs. Cross-module navigation edges come from `Cross-Module Navigation` in plan.md.

**Data Displayed:** Match entities from `05_data_model.md` that are shown on this screen based on UC system steps. List entity `E[EE]` and relevant attributes only — not all attributes.

**Constraints:** Match `BR[RR]` from `04_business_rules.md` that affect what this screen shows or allows.

**States:** Only states implied by UC flows or BR:

| State | When |
|---|---|
| Default | Normal loaded state with data |
| Empty | No data to display |
| Loading | Data is being fetched |
| Error | System or network failure |
| Success | Action completed successfully |
| Restricted | Actor lacks permission — PRM rule applies |

---

### Step 3 — Update Plan

After writing the file, update `06_screens/plan.md`:
- Change `[ ]` to `[x]` for this module entry

---

### Step 4 — Output Generation

Write to: `./01_Requirements_Document/06_screens/M[MM]_[slug].md`

---

## Output Format

```markdown
# M[MM] — [Module Name]

<!-- source: 03_usecases/M[MM]_[slug].md, 04_business_rules.md, 05_data_model.md -->
<!-- module: M[MM] -->
<!-- screens: SCR[SS], SCR[SS], … -->

---

### SCR[SS] — [Screen Name] `[type]`

**Actor:** [Role]
**Trigger:** UC[MM].[NN].[PP] step [FF] — [brief description]

**Navigates From**
- SCR[SS] — [Screen Name]

**Navigates To**
- SCR[SS] — [Screen Name] — [condition or action]

**Data Displayed**
- E[EE] — [Entity Name]: [visible attributes]

**Constraints**
- BR[RR] — [one-line summary of how this rule affects the screen]

**States**
- Default — [brief description]
- Empty — [brief description] *(omit if not applicable)*
- Loading — [brief description] *(omit if not applicable)*
- Error — [brief description] *(omit if not applicable)*
- Success — [brief description] *(omit if not applicable)*
- Restricted — [brief description] *(omit if not applicable)*

---

### SCR[SS] — [Next Screen Name] `[type]`

(repeat structure)
```

---

## Output Format Rules

**SCR IDs:** Use IDs from Screen Index in `06_screens/plan.md` — never create new IDs or renumber.

**Screen Name and type:** Carry over exactly from Screen Index — do not rename.

**Trigger:** Cite exact UC step. Multiple triggers allowed — list all on separate lines.

**Navigates From / To:** Entry point screens write `Entry point` in Navigates From. Terminal screens omit Navigates To. Cross-module navigation uses SCR IDs from plan.md.

**Data Displayed:** Attributes visible on this screen only — not full entity. Reference `E[EE]`.

**Constraints:** Reference `BR[RR]` only — one-line summary of how rule manifests. Do not copy rule text.

**States:** Omit states not implied by UC or BR. Do not write empty entries.

---

## Constraints

DO NOT include:

| What | Belongs in |
|---|---|
| UI layout, component names | Wireframe / BD |
| Button labels, field labels | Design Spec / DD |
| Visual style, colors | Design System |
| Validation logic detail | Business Rules |
| Test scenarios | Test Cases |

---

## Behavioral Rules

- Generate immediately — no clarification questions
- SCR IDs come from plan.md Screen Index — never derive independently
- Navigation edges come from plan.md — never derive independently
- States grounded in UC flows or BR only — do not fabricate
- After generating, update `06_screens/plan.md` checklist