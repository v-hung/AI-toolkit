# M03 — Project Registry

<!-- source: 02_features.md, plan.md, project-overview.md -->
<!-- module: M03 -->
<!-- features: F03.01, F03.02 -->

---

## UC03.01.01 — Register a new project

<!-- feature: F03.01 -->

**Actor:** Project Manager, Admin
**Goal:** Create a new project record in the system to establish the project's identity, status, and timeline.
**Trigger:** Actor navigates to the Project Registry and initiates creation of a new project.

**Preconditions**
- Actor is authenticated with a Project Manager or Admin role.

**Postconditions**
- A new project record exists in the system with name, description, status, and timeline.
- Success: Project is visible in the Project Registry list.
- Cancellation: No project record is created; system state is unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Navigates to the Project Registry section. |
| 02 | System | Displays the project list screen showing all existing project records. |
| 03 | Actor | Initiates creation of a new project. |
| 04 | System | Displays the new project creation form with fields for name, description, status, and timeline (start date, end date). |
| 05 | Actor | Enters the project name, description, selects a status, and specifies start and end dates. |
| 06 | Actor | Submits the form. |
| 07 | System | Validates the submitted data. |
| 08 | System | Creates the project record and displays the project detail screen for the newly created project with a confirmation notice. |

---

### Exception Flow

#### EF01 — Validation failure on submission

> Branches from step 07 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects one or more invalid or missing required fields. |
| 02 | System | Displays the creation form with inline error indicators identifying each invalid field. |
| 03 | Actor | Corrects the flagged fields. |

> Ends with: Actor resubmits; flow returns to step 07 of Main Flow.

---

## UC03.01.02 — Update project metadata

<!-- feature: F03.01 -->

**Actor:** Project Manager, Admin
**Goal:** Modify the metadata of an existing project record to reflect changes in project description, status, or timeline.
**Trigger:** Actor opens a project record and initiates editing of its metadata.

**Preconditions**
- Actor is authenticated with a Project Manager or Admin role.
- The target project record exists in the system.

**Postconditions**
- Success: The project record reflects the updated metadata.
- Cancellation: The project record is unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Navigates to the Project Registry section. |
| 02 | System | Displays the project list screen. |
| 03 | Actor | Selects a specific project from the list. |
| 04 | System | Displays the project detail screen showing the current metadata. |
| 05 | Actor | Initiates editing of the project metadata. |
| 06 | System | Displays the project metadata edit form pre-filled with the current values. |
| 07 | Actor | Modifies one or more fields and submits the form. |
| 08 | System | Validates the submitted changes. |
| 09 | System | Saves the updated metadata and returns to the project detail screen with a confirmation notice. |

---

### Exception Flow

#### EF01 — Validation failure on update submission

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects one or more invalid or missing required fields. |
| 02 | System | Displays the edit form with inline error indicators identifying each invalid field. |
| 03 | Actor | Corrects the flagged fields. |

> Ends with: Actor resubmits; flow returns to step 08 of Main Flow.

---

## UC03.02.01 — Add skill requirements to a project

<!-- feature: F03.02 -->

**Actor:** Project Manager, Admin
**Goal:** Specify the skill competencies required for a project by adding skill requirement entries.
**Trigger:** Actor views a project record and initiates addition of a new skill requirement.

**Preconditions**
- Actor is authenticated with a Project Manager or Admin role.
- The target project record exists in the system.
- The skill taxonomy is defined with at least one skill category and skill entry.

**Postconditions**
- Success: One or more skill requirement entries are attached to the project, each with a skill name and minimum proficiency level.
- Cancellation: No skill requirement is added; project skill requirements are unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Navigates to the Project Registry and selects a project. |
| 02 | System | Displays the project detail screen, including the skill requirements section. |
| 03 | Actor | Initiates addition of a new skill requirement. |
| 04 | System | Displays the skill requirement entry form with a skill selector (populated from the taxonomy) and a minimum proficiency level selector (1–5). |
| 05 | Actor | Selects a skill name from the taxonomy. |
| 06 | Actor | Sets the minimum required proficiency level. |
| 07 | Actor | Submits the skill requirement entry. |
| 08 | System | Validates that the selected skill exists in the taxonomy and the proficiency level is within the valid range. |
| 09 | System | Saves the skill requirement and updates the skill requirements list on the project detail screen. |

---

### Alternate Flow

#### AF01 — Add another skill requirement immediately

> Branches from step 09 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Initiates addition of another skill requirement without leaving the project detail screen. |

> Rejoins Main Flow at step 03.

---

### Exception Flow

#### EF01 — Skill not available in taxonomy

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects that the selected skill does not exist in the current taxonomy. |
| 02 | System | Displays an error on the entry form indicating the skill is not valid. |
| 03 | Actor | Selects a different skill from the taxonomy. |

> Ends with: Actor resubmits; flow returns to step 08 of Main Flow.

---

## UC03.02.02 — Modify or remove skill requirements from a project

<!-- feature: F03.02 -->

**Actor:** Project Manager, Admin
**Goal:** Update the minimum proficiency level of an existing skill requirement or remove it from the project.
**Trigger:** Actor views a project's skill requirements list and selects an entry to edit or remove.

**Preconditions**
- Actor is authenticated with a Project Manager or Admin role.
- The target project record exists with at least one defined skill requirement.

**Postconditions**
- Success (modify): The selected skill requirement reflects the updated minimum proficiency level.
- Success (remove): The selected skill requirement is no longer associated with the project.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Navigates to the Project Registry and selects a project. |
| 02 | System | Displays the project detail screen with the current skill requirements list. |
| 03 | Actor | Selects a skill requirement entry to modify. |
| 04 | System | Displays the skill requirement edit form pre-filled with the current skill name and minimum proficiency level. |
| 05 | Actor | Changes the minimum proficiency level and submits the form. |
| 06 | System | Validates the updated proficiency level. |
| 07 | System | Saves the change and updates the skill requirements list on the project detail screen with a confirmation notice. |

---

### Alternate Flow

#### AF01 — Remove a skill requirement

> Branches from step 03 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Selects the remove action for the chosen skill requirement entry. |
| 02 | System | Displays a confirmation dialog identifying the skill requirement to be removed. |
| 03 | Actor | Confirms the removal. |
| 04 | System | Removes the skill requirement entry and updates the skill requirements list on the project detail screen. |

> Ends with: Skill requirement is removed from the project.

---

### Exception Flow

#### EF01 — Validation failure on proficiency update

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects that the submitted proficiency level is outside the valid range (1–5). |
| 02 | System | Displays the edit form with an error indicating the invalid proficiency value. |
| 03 | Actor | Corrects the proficiency level. |

> Ends with: Actor resubmits; flow returns to step 06 of Main Flow.
