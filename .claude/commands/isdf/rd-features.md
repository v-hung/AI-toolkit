---
description: Deterministic Feature List generator.
---

## Objective

Generate `./01_Requirements_Document/02_features.md` from `./01_Requirements_Document/01_project-overview.md`.

Features must represent **system capabilities only** — what the system does, not how it does it.

---

## Execution Steps

### Step 1 — Pre-Flight Check

- Read `./01_Requirements_Document/01_project-overview.md`.
- If file is missing or empty → **STOP**. Output: `ERROR: project-overview.md not found.`
- If a required section (Core Objectives, In-Scope, Key Features) is missing:
  - **Skip it silently.**
  - **Do NOT infer, speculate, or fabricate** missing sections.
  - If "Core Objectives" is missing, prepend: ``

---

### Step 2 — Feature Extraction

Extract features **only** from the following sections, in this priority order:

- **Core Objectives** — always extract; primary signal
- **In-Scope items** — extract as-is; trim duplicates from step 1
- **Key Features** — only if adds new capability not already covered
- **Target User Interactions** — only if the capability:
  - Is directly inferable from repeated or core user interactions
  - Does not introduce domain concepts absent elsewhere in the overview
  - Represents an essential system action, not a one-off user step

**Feature criteria — all three must hold:**

- **Independent:** No feature description relies on reading another
- **Non-overlapping:** Each feature covers a unique system action
- **Measurable:** A developer knows exactly when the feature is "Done"

**Conflict resolution:** If two sections contradict each other, follow the higher-priority source and note inline:

<!-- CONFLICT: "Core Objectives" and "In-Scope" differ on X. Using Core Objectives. -->

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
- Features describe the same capability with different wording (e.g., "User Login" and "Account Authentication" → merge)

**Purge when:**

- Feature name contains any of: `manage, handle, process, system, general, support`
- Feature describes an implementation detail, not a capability (e.g., "Use PostgreSQL", "REST API")
- Feature is a duplicate after semantic check

---

### Step 4 — Dependency & Priority

**Dependency rules:**

- A dependency exists ONLY if Feature A requires the **data** or **execution** output of Feature B to function
- Record as: `F[NN] depends on F[NN]`
- Circular dependencies → flag with:

```
  <!-- CIRCULAR DEPENDENCY: FXX ↔ FYY — review scope split -->
```

**Priority logic:**

- Core Objectives → **MVP**
- In-Scope items:
  - **MVP** if required for basic system operation
  - **Phase 2** if it enhances usability but is not required for core operation
- User Interaction derivatives → **Phase 2**

---

### Step 5 — Module Grouping

Group related features into logical modules.

Rules:

- A module must contain at least 2 features
- Module names use noun phrases: `User Management`, `Reporting`, `Notifications`
- If a feature doesn't fit any group, place it in module `General`
- Number modules sequentially: Module 1, Module 2…

---

### Step 5 — Output Generation

**ID Format:** Sequential `F[Module-Number].[Feature-Number]` (e.g., F01.01, F01.02).
**Module Grouping:**

- Group by primary Data Object or Actor.
- Each feature must belong to **exactly one** module.
- Module names must be Noun Phrases (e.g., `User Management`, `Project Tracking`).

---

## Output Format

```markdown
# Feature List

## Module [N] — [Module Name]

### F[MM].[NN] — [Feature Name]

**Description**
One concise sentence. Must state the system action and the primary data object involved. Avoid vague verbs.

**Actors**

- [Role 1]

**Includes**

- [Sub-capability 1 - NOT a step-by-step flow]
- [Sub-capability 2]

**Excludes** _(Omit if no boundary needed)_

- [Specific boundary to prevent scope creep]

**Depends On** _(Omit if no real dependency)_

- F[MM].[NN] — [Reason: Data or Execution requirement]

**Priority**
MVP | Phase 2 | Future
```

---

## Output Format Rules

**ID:** Sequential `F[Module-Number].[Feature-Number]`, two-digit zero-padded.

- ✅ F01.01, F01.02, F02.01
- ❌ F1.1, F02 (not zero-padded)

**Module grouping:**

- Group by primary Data Object or Actor
- Each feature must belong to exactly one module
- Module names must be noun phrases (e.g., `User Management`, `Project Tracking`)

**Fields:**

- **Description:** One concise sentence. State the system action and its data object. Avoid vague verbs.
- **Excludes:** Omit entirely if no specific boundary needs clarifying. Do not write "N/A".
- **Depends On:** Omit if no real functional or data dependency exists.

**Priority defaults:**

- Core Objectives → MVP
- In-Scope → MVP if required for core operation, Phase 2 if enhances usability only
- User Interaction derivatives → Phase 2

---

## Constraints

DO NOT include:

- **Step-by-step flows:** Save for Use Cases.
- **Validation rules/Error conditions:** Save for Business Rules.
- **UI layout/Button names:** Save for Screen List.
- **Technical specifications:** Save for Design/Tech Stack documents.

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Extract only from the overview — no assumptions beyond what is written
- Omit optional fields (`Excludes`, `Depends On`) when they add no information
- IDs are sequential and unique across the full document
- If fewer than 3 features are extracted after normalization, output what is found and append:
  ```
  <!-- WARNING: Only [N] features extracted. Review project-overview.md for completeness. -->
  ```
