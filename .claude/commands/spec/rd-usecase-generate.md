---
description: Generate one Use Case file for a given module. No clarification, direct generation.
argument-hint: "[M01] — optional. If omitted, picks the first pending module from plan.md."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## User Input

```text
$ARGUMENTS
```

You **MUST** read the user input above before proceeding. If not empty, treat it as the target module ID. If empty, fall back to plan.md.

## Objective

Generate `./01_Requirements_Definition/usecases/M[MM]_[slug].md` for the specified module.

This file is consumed by LLM to generate Screen List. Each step in flows must carry enough information for the LLM to derive screen names, states, and navigation paths — without needing to read any other document.

---

## Execution Steps

### Step 1 — Identify Target Module

If `M[MM]` is passed as argument → use it.

If no argument → read `./01_Requirements_Definition/usecases/plan.md` and find the first entry where status is `[ ]`.

If all entries are `[x]` → STOP. Output:

```
All use case files already generated.
```

Read the following files. If any is missing → STOP and report which file is missing:

- `./.spec/docs/convention.md` — ID convention for all symbols.
- `./01_Requirements_Definition/usecases/plan.md`
- `./01_Requirements_Definition/features.md`
- `./01_Requirements_Definition/project-overview.md`

Extract for the target module:

- Module ID `M[MM]` and name
- All `F[MM].[NN]` features with name, actors, `Depends On`
- Cross-module `Depends On`

---

### Step 2 — Use Case Derivation

For each feature `F[MM].[NN]` in the module, derive one or more use cases.

**Split into multiple UCs when:**

- Different actors use the same feature with different goals or flows
- Same actor has distinct goals that cannot share a Main Flow

**Keep as one UC when:**

- Multiple actors share the same goal and flow (list all actors in Actor field)
- Differences are minor and fit as Alternate Flows within the same UC

**Derivation rules:**

- UC name describes the actor's goal, not the feature name
- Example: `F01.03 — User Authentication` → `UC01.03.01 — Sign in with email`, `UC01.03.02 — Sign in with SSO`
- Actor from `plan.md` Actors by Feature
- Scope from `features.md` Includes field
- Business goal from `project-overview.md` Core Objectives — do not fabricate

---

### Step 3 — Flow Construction

**Main Flow:**

- Number steps starting from `01`
- Each step = one atomic actor action OR one system response
- Every step resulting in a new screen, dialog, or state change must be explicit
- End with a postcondition-confirming system step

**Alternate Flow:**

- Valid non-primary paths only (not errors)
- Reference the Main Flow step it branches from: `Branches from step FF`
- End by rejoining Main Flow or its own postcondition

**Exception Flow:**

- Errors, failed validations, system failures only
- Reference the Main Flow step it branches from: `Branches from step FF`
- Must end with a user-visible system response — never silent failure

---

### Step 4 — Update Plan

After writing the file, update `plan.md`:

- Change `[ ]` to `[x]` for this module entry

---

### Step 5 — Output Generation

Write to: `./01_Requirements_Definition/usecases/M[MM]_[slug].md`

---

## Output Format

```markdown
# M[MM] — [Module Name]

<!-- source: features.md, plan.md, project-overview.md -->
<!-- module: M[MM] -->
<!-- features: F[MM].01, F[MM].02, … -->

---

## UC[MM].[NN].[PP] — [Use Case Name]

<!-- feature: F[MM].[NN] -->

**Actor:** [Role]
**Goal:** One sentence — what the actor wants to achieve.
**Trigger:** What initiates this use case (actor action or system event).

**Preconditions**

- [Condition that must be true before this use case starts]

**Postconditions**

- [State of the system after successful completion]
- [State of the system after exception/cancellation — if different]

---

### Main Flow

| Step | Actor / System | Action                         |
| ---- | -------------- | ------------------------------ |
| 01   | Actor          | [What actor does]              |
| 02   | System         | [What system does or displays] |
| 03   | Actor          | [What actor does]              |
| 04   | System         | [What system does or displays] |

---

### Alternate Flow

#### AF01 — [Name of alternate path]

> Branches from step [FF] of Main Flow.

| Step | Actor / System | Action             |
| ---- | -------------- | ------------------ |
| 01   | Actor          | [What actor does]  |
| 02   | System         | [What system does] |

> Rejoins Main Flow at step [FF] / Ends with: [postcondition].

---

### Exception Flow

#### EF01 — [Name of exception]

> Branches from step [FF] of Main Flow.

| Step | Actor / System | Action                                     |
| ---- | -------------- | ------------------------------------------ |
| 01   | System         | [Error condition detected]                 |
| 02   | System         | [What system displays or does in response] |
| 03   | Actor          | [Optional: actor response]                 |

> Ends with: [system state after exception].

---

## UC[MM].[NN].[PP] — [Next Use Case Name]

(repeat structure)
```

---

## Output Format Rules

**UC ID:** `PP` starts at `01` per feature, increments per UC derived from that feature.

**Feature comment:** Each UC must include `<!-- feature: F[MM].[NN] -->` for traceability.

**Goal:** Actor intent, not system behavior. "User wants to reset password" not "System resets password".

**Trigger:** Be specific — actor navigates to screen / submits form / system detects event / scheduled job fires.

**Main Flow:** Every step where system displays something new = potential screen. Do not collapse multiple screens into one step.

**Alternate Flow:** Valid paths only. Do not use for errors.

**Exception Flow:** Every EF must end with a user-visible response — never silent failure.

**Postconditions:** Write two when success and failure lead to different system states.

**Omit AF/EF sections entirely** when a use case has no alternate or exception paths.

---

## Constraints

DO NOT include in any use case:

| What                                          | Belongs in     |
| --------------------------------------------- | -------------- |
| UI element names (button labels, field names) | Screen List    |
| Validation logic and rules                    | Business Rules |
| API calls, data schema                        | Design Phase   |
| Acceptance criteria                           | Test Cases     |

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Use `project-overview.md` for business context only — do not extract new features from it
- Flows describe observable behavior only — what actor does, what system shows
- After generating, update `plan.md` checklist
