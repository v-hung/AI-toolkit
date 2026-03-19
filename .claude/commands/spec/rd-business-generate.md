---
description: Generate a global Business Rules document from Use Case files. No clarification, direct generation.
argument-hint: "No arguments — reads all generated UC files automatically."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate `./01_Requirements_Definition/business_rules.md` from all generated Use Case files and supporting documents.

This file is consumed by LLM to generate Screen List and Test Cases. Each rule must have a stable ID that downstream documents can reference precisely.

---

## Execution Steps

### Step 1 — Pre-Flight Check

Read the following files. If UC files are missing → STOP and report:

```
ERROR: No generated UC files found. Run `/rd-usecase` first.
```

- `./.spec/docs/convention.md` — ID convention for all symbols
- `./01_Requirements_Definition/usecases/plan.md` — to identify which UC files exist (`[x]` entries)
- `./01_Requirements_Definition/usecases/M[MM]_[slug].md` — all files marked `[x]` in plan
- `./01_Requirements_Definition/features.md` — for `Excludes` fields
- `./01_Requirements_Definition/project-overview.md` — for system-level constraints

---

### Step 2 — Rule Extraction

Extract rules from each source:

**From UC files (primary source):**

- Preconditions → permission or state rules
- Exception Flows → validation rules, failure conditions
- Implicit constraints in Main Flow steps (e.g., "System checks if user has permission") → permission rules

**From `features.md`:**

- `Excludes` fields → explicit out-of-scope constraints that bound behavior

**From `project-overview.md`:**

- System-level constraints (market, language, currency, compliance) → system constraint rules

---

### Step 3 — Rule Classification

Classify each extracted rule into one of four categories:

| Category          | Code  | Description                              | Example                       |
| ----------------- | ----- | ---------------------------------------- | ----------------------------- |
| Validation        | `VAL` | Input or state must meet a condition     | Email must be valid format    |
| Permission        | `PRM` | Actor must have rights to perform action | Only Admin can delete users   |
| Business Logic    | `BIZ` | Domain-specific computation or policy    | Order total must be ≥ minimum |
| System Constraint | `SYS` | Platform or environment boundary         | System supports VND only      |

---

### Step 4 — Deduplication

Before assigning IDs, merge rules that:

- Express the same constraint in different words
- Are derived from multiple UC flows but resolve to the same condition

Keep the most complete version. Note all sources in the `Source` field.

---

### Step 5 — ID Assignment

Assign `BR[RR]` sequentially after deduplication, ordered by category: `VAL` → `PRM` → `BIZ` → `SYS`.

---

### Step 6 — Output Generation

Write to: `./01_Requirements_Definition/business_rules.md`

---

## Output Format

```markdown
# Business Rules

<!-- source: usecases/*.md, features.md, project-overview.md -->
<!-- total: [N] rules -->

---

## Validation Rules

### BR[RR] — [Rule Name]

**Category:** VAL
**Applies To:** F[MM].[NN], F[MM].[NN]
**Source:** UC[MM].[NN].[PP] EF[NN] / UC[MM].[NN].[PP] Preconditions / features.md Excludes

**Condition**
When [situation in which this rule is evaluated].

**Constraint**
[What must be true / what is not allowed].

**Violation Response**
[What the system does when this rule is violated — visible to actor].

---

## Permission Rules

### BR[RR] — [Rule Name]

(same structure)

---

## Business Logic Rules

### BR[RR] — [Rule Name]

(same structure)

---

## System Constraints

### BR[RR] — [Rule Name]

(same structure)
```

---

## Output Format Rules

**BR ID:** Global sequential, assigned after deduplication. Never reuse or skip.

**Rule Name:** Short noun phrase describing the constraint. e.g., `Unique email per account`, `Admin-only deletion`.

**Applies To:** List all `F[MM].[NN]` where this rule is enforced. Helps screen list and test case generators scope the rule correctly.

**Source:** Cite exact location — `UC01.02.01 EF01`, `UC01.03.02 Preconditions`, `features.md F02.01 Excludes`, `project-overview.md`. Multiple sources allowed.

**Condition:** When is this rule evaluated — not what the rule says. e.g., "When user submits registration form."

**Constraint:** What must hold true. Written as a positive statement where possible. e.g., "Email address must not already exist in the system."

**Violation Response:** What the system shows or does — observable behavior only. No implementation detail.

**Omit Violation Response** only for System Constraints where no user-visible response applies.

---

## Constraints

DO NOT include in business rules:

| What                                 | Belongs in   |
| ------------------------------------ | ------------ |
| UI element names, error message copy | Screen List  |
| Step-by-step flows                   | Use Cases    |
| API implementation, data schema      | Design Phase |
| Test scenarios                       | Test Cases   |

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Extract only from listed sources — do not fabricate rules
- Deduplicate before assigning IDs
- Order within each category: rules derived from earlier UC files first
- Do not include rules already marked as out-of-scope in `features.md`
