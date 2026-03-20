---
description: Deterministic Feature List generator.
argument-hint: "No arguments — reads project overview file automatically."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate `./01_Requirements_Document/02_features.md` from `./01_Requirements_Document/01_project_overview.md`.

Features must represent **system capabilities only** — what the system does, not how it does it.

---

## Execution Steps

### Step 1 — Pre-Flight Check

- Read `./.spec/docs/convention.md` — ID convention for all symbols. If missing → STOP. Output:
  ```
  ERROR: convention.md not found.
  ```
- Read `./01_Requirements_Document/01_project_overview.md`. If missing or empty → STOP. Output:
  ```
  ERROR: project-overview.md not found.
  ```
- If a required section (Core Objectives, In-Scope, Key Features) is missing:
  - Skip it silently
  - Do NOT infer, speculate, or fabricate missing sections
  - If "Core Objectives" is missing, prepend:
    ```
    <!-- WARNING: Core Objectives missing — feature extraction may be incomplete. -->
    ```

---

### Step 2 — Feature Extraction

Extract features **only** from the following sections, in this priority order:

| Priority | Source | Notes |
|---|---|---|
| 1 | Core Objectives | Always extract; primary signal |
| 2 | In-Scope items | Extract as-is; trim duplicates from step 1 |
| 3 | Key Features | Only if adds new capability not already covered |
| 4 | Target User Interactions | Only if directly inferable, not a one-off user step |

**Feature criteria — all three must hold:**

- **Independent:** Feature description is self-contained — does not require reading another feature to understand what it does. Dependencies are captured in `Depends On`, not embedded in the description.
- **Non-overlapping:** Each feature covers a unique system action
- **Measurable:** A developer knows exactly when the feature is "Done"

**Conflict resolution:** If two sections contradict each other, follow the higher-priority source and note inline:
```
<!-- CONFLICT: "Core Objectives" and "In-Scope" differ on X. Using Core Objectives. -->
```

---

### Step 3 — Normalization

**Naming convention:** Format `[Noun] [Action Noun]`, singular.

- ✅ `Identity Verification`, `Report Export`, `Notification Delivery`
- ❌ `Verify Identity` (verb-first), `Reports Exports` (plural), `System Management` (vague)

**Split when:**
- A feature spans more than 2 distinct data entities
- A feature involves more than 2 user roles with different permissions

**Merge when:**
- Features share the same Actor, same Data Object, same Trigger, and same Outcome
- Features describe the same capability with different wording

**Purge when:**
- Feature name contains any of: `manage, handle, process, system, general, support`
- Feature describes an implementation detail (e.g., "Use PostgreSQL", "REST API")
- Feature is a duplicate after semantic check

---

### Step 4 — Dependency & Priority

**Dependency rules:**
- A dependency exists if Feature A requires the data or execution output of Feature B to function
- Cross-module dependencies are valid and expected — do not avoid them
- Circular dependencies → flag with:
  ```
  <!-- CIRCULAR DEPENDENCY: F[MM].[NN] ↔ F[MM].[NN] — review scope split -->
  ```

**Priority logic:**
- Core Objectives → MVP
- In-Scope items → MVP if required for core operation, Phase 2 if enhances usability only
- User Interaction derivatives → Phase 2

---

### Step 5 — Module Grouping

Group related features into logical modules.

- A module must contain at least 2 features
- Module names use noun phrases: `User Management`, `Reporting`, `Notifications`
- If a feature doesn't fit any group, place it in module `General`
- Number modules sequentially starting from `M01`
- **Modules are organizational groupings, not isolation boundaries** — cross-module dependencies and navigation are expected

---

### Step 6 — Module Relationship Analysis

After grouping, analyze how modules relate to each other based on `Depends On` fields.

For each cross-module dependency found:
- Identify the **relationship type**:
  - `context` — Module B provides the entity context that Module A operates within (e.g., Skill operates within User context)
  - `data` — Module A reads or writes data owned by Module B
  - `flow` — Module A is typically reached by navigating through Module B
- Infer the **natural entry point**: given the dependency, what is the most logical way a user reaches Module A from Module B?

This analysis is written to the output file as a `## Module Relationships` section — it is consumed by Use Case and Screen List generators to construct cross-module flows correctly.

---

### Step 7 — Output Generation

Write to: `./01_Requirements_Document/02_features.md`

---

## Output Format

````markdown
# Feature List

<!-- source: 01_project_overview.md -->

## Module Relationships

| From | To | Relationship | Entry Point |
|---|---|---|---|
| M02 — Skill Management | M01 — User Management | context | Skill Entry is accessed from within User context |
| M03 — Assignment | M01 — User Management | context | Assignment is accessed from within User context |
| M03 — Assignment | M02 — Skill Management | data | Assignment reads Skill data to match requirements |

---

## Module [MM] — [Module Name]

### F[MM].[NN] — [Feature Name]

**Description**
One concise sentence. Must state the system action and the primary data object involved.

**Actors**
- [Role 1]

**Includes**
- [Sub-capability 1]
- [Sub-capability 2]

**Excludes** _(omit if no boundary needed)_
- [Specific boundary to prevent scope creep]

**Depends On** _(omit if no real dependency)_
- F[MM].[NN] — [Reason: data or execution requirement]

**Priority**
MVP | Phase 2 | Future
````

---

## Output Format Rules

**ID:** `F[MM].[NN]` — two-digit zero-padded for both module and feature index.
- ✅ F01.01, F01.02, F02.01
- ❌ F1.1, F01 (missing feature index)

**Module Relationships table:**
- Only include cross-module relationships — skip if no cross-module `Depends On` exists
- `Entry Point` column describes how a user naturally navigates from the dependency module into this module — infer from the relationship type, do not fabricate specific UI patterns
- This table is the primary input for Use Case and Screen generators to construct cross-module flows

**Description:** One sentence. State system action + data object. No vague verbs.

**Excludes:** Omit entirely if no boundary needs clarifying. Do not write "N/A".

**Depends On:** Cross-module references are valid — use full `F[MM].[NN]` ID.

---

## Constraints

DO NOT include in any feature:

| What | Belongs in |
|---|---|
| Step-by-step flows | Use Cases |
| Validation rules, error conditions | Business Rules |
| UI layout, button names | Screen List |
| Technical specifications | Design Phase |

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Extract only from the overview — no assumptions beyond what is written
- Cross-module dependencies are valid — do not merge features into the same module just to avoid cross-module references
- Omit optional fields (`Excludes`, `Depends On`) when they add no information
- IDs are sequential and unique across the full document
- If fewer than 3 features are extracted after normalization, output what is found and append:
  ```
  <!-- WARNING: Only [N] features extracted. Review project-overview.md for completeness. -->
  ```