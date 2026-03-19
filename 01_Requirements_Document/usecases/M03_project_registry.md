# M03 — Project Registry

<!-- source: features.md, plan.md, project-overview.md -->
<!-- module: M03 -->
<!-- features: F03.01, F03.02 -->

---

## UC03.01.01 — Create a new project record

<!-- feature: F03.01 -->

**Actor:** Project Manager, Admin
**Goal:** Create a new project record in the registry with descriptive metadata defining the project's identity and timeline.
**Trigger:** Actor navigates to the Project Registry and initiates the create project action.

**Preconditions**

- Actor is authenticated with a Project Manager or Admin role.

**Postconditions**

- A new project record exists in the registry with the submitted metadata and is accessible to other users.
- If actor cancels, no project record is created and the registry remains unchanged.

---

### Main Flow

| Step | Actor / System | Action                                                                                                  |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Navigates to the Project Registry section.                                                              |
| 02   | System         | Displays the Project Registry page listing existing projects with an option to create a new project.    |
| 03   | Actor          | Selects the option to create a new project.                                                             |
| 04   | System         | Displays the project creation form with fields for name, description, status, start date, and end date. |
| 05   | Actor          | Enters project name, description, status, start date, and optionally end date, then submits the form.   |
| 06   | System         | Validates that required fields (name, status, start date) are present.                                  |
| 07   | System         | Creates the project record and displays the new project's detail page with the saved metadata.          |

---

### Alternate Flow

#### AF01 — Actor cancels project creation

> Branches from step 05 of Main Flow.

| Step | Actor / System | Action                                                              |
| ---- | -------------- | ------------------------------------------------------------------- |
| 01   | Actor          | Chooses to cancel instead of submitting the form.                   |
| 02   | System         | Discards all entered data and returns to the Project Registry page. |

> Ends with: Project Registry page displayed; no new record created.

---

### Exception Flow

#### EF01 — Required field missing

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action                                                                                               |
| ---- | -------------- | ---------------------------------------------------------------------------------------------------- |
| 01   | System         | Detects that one or more required fields (name, status, or start date) are empty.                    |
| 02   | System         | Displays the creation form again with inline error messages identifying each missing required field. |
| 03   | Actor          | Corrects the missing fields and resubmits.                                                           |

> Ends with: Actor returns to step 06 of Main Flow.

---

## UC03.01.02 — Update project metadata

<!-- feature: F03.01 -->

**Actor:** Project Manager, Admin
**Goal:** Modify the descriptive metadata of an existing project record.
**Trigger:** Actor opens an existing project's detail page and initiates the edit action.

**Preconditions**

- Actor is authenticated with a Project Manager or Admin role.
- At least one project record exists in the registry.

**Postconditions**

- The project record reflects the updated metadata values.
- If actor cancels, the project record remains unchanged.

---

### Main Flow

| Step | Actor / System | Action                                                                                                       |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| 01   | Actor          | Navigates to the Project Registry and opens an existing project record.                                      |
| 02   | System         | Displays the project detail page showing current metadata (name, description, status, start date, end date). |
| 03   | Actor          | Selects the edit action for the project metadata.                                                            |
| 04   | System         | Displays the project metadata edit form pre-filled with current values.                                      |
| 05   | Actor          | Modifies one or more fields and submits the form.                                                            |
| 06   | System         | Validates that required fields (name, status, start date) are still present.                                 |
| 07   | System         | Saves the changes and displays the project detail page with the updated metadata.                            |

---

### Alternate Flow

#### AF01 — Actor cancels the edit

> Branches from step 05 of Main Flow.

| Step | Actor / System | Action                                                                                          |
| ---- | -------------- | ----------------------------------------------------------------------------------------------- |
| 01   | Actor          | Chooses to cancel instead of submitting.                                                        |
| 02   | System         | Discards any unsaved changes and returns to the project detail page with the original metadata. |

> Ends with: Project detail page displayed with original values unchanged.

---

### Exception Flow

#### EF01 — Required field cleared on submission

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action                                                                                           |
| ---- | -------------- | ------------------------------------------------------------------------------------------------ |
| 01   | System         | Detects that one or more required fields (name, status, or start date) have been left empty.     |
| 02   | System         | Displays the edit form again with inline error messages identifying each missing required field. |
| 03   | Actor          | Restores the missing fields and resubmits.                                                       |

> Ends with: Actor returns to step 06 of Main Flow.

---

## UC03.02.01 — Add a skill requirement to a project

<!-- feature: F03.02 -->

**Actor:** Project Manager, Admin
**Goal:** Attach a new required skill entry (with minimum proficiency expectation) to an existing project.
**Trigger:** Actor opens a project's detail page and initiates the add skill requirement action.

**Preconditions**

- Actor is authenticated with a Project Manager or Admin role.
- The target project record exists in the registry.
- At least one skill exists in the organization skill taxonomy (M02 — Skill Administration is configured).

**Postconditions**

- A new skill requirement entry (skill name and minimum proficiency level) is attached to the project and visible in its skill requirements list.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                                  |
| ---- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Navigates to the project detail page and selects the option to add a skill requirement.                                                 |
| 02   | System         | Displays the skill requirement form with a skill selector (populated from the taxonomy) and a minimum proficiency level selector (1–5). |
| 03   | Actor          | Selects a skill from the taxonomy, sets a minimum proficiency level, and submits.                                                       |
| 04   | System         | Validates that the selected skill exists in the current taxonomy.                                                                       |
| 05   | System         | Saves the skill requirement entry and displays the updated skill requirements list on the project detail page.                          |

---

### Exception Flow

#### EF01 — Duplicate skill requirement

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                                                                                 |
| ---- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | System         | Detects that the selected skill is already defined as a requirement for this project.                                                  |
| 02   | System         | Displays an error message indicating the skill requirement already exists and prompts the actor to select a different skill or cancel. |
| 03   | Actor          | Selects a different skill or cancels the action.                                                                                       |

> Ends with: If actor cancels, skill requirements list is unchanged. If actor selects a different skill, flow returns to step 03 of Main Flow.

---

## UC03.02.02 — Modify a project skill requirement

<!-- feature: F03.02 -->

**Actor:** Project Manager, Admin
**Goal:** Change the minimum proficiency level of an existing skill requirement on a project.
**Trigger:** Actor opens a project's skill requirements list and selects an entry to edit.

**Preconditions**

- Actor is authenticated with a Project Manager or Admin role.
- The target project record exists and has at least one skill requirement entry.

**Postconditions**

- The selected skill requirement reflects the updated minimum proficiency level.
- If actor cancels, the skill requirement is unchanged.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                  |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Navigates to the project detail page and views the skill requirements list.                                             |
| 02   | System         | Displays the list of skill requirements attached to the project, each showing skill name and minimum proficiency level. |
| 03   | Actor          | Selects a skill requirement entry and chooses to edit it.                                                               |
| 04   | System         | Displays the skill requirement edit form pre-filled with the current minimum proficiency level.                         |
| 05   | Actor          | Changes the minimum proficiency level and submits.                                                                      |
| 06   | System         | Saves the updated value and displays the refreshed skill requirements list on the project detail page.                  |

---

### Alternate Flow

#### AF01 — Actor cancels the edit

> Branches from step 05 of Main Flow.

| Step | Actor / System | Action                                                                                                 |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------ |
| 01   | Actor          | Chooses to cancel instead of submitting.                                                               |
| 02   | System         | Discards the change and returns to the project detail page with the skill requirements list unchanged. |

> Ends with: Skill requirements list displayed with original values.

---

## UC03.02.03 — Remove a skill requirement from a project

<!-- feature: F03.02 -->

**Actor:** Project Manager, Admin
**Goal:** Delete an existing skill requirement entry from a project's requirement set.
**Trigger:** Actor opens a project's skill requirements list and selects an entry to remove.

**Preconditions**

- Actor is authenticated with a Project Manager or Admin role.
- The target project record exists and has at least one skill requirement entry.

**Postconditions**

- The selected skill requirement entry is no longer attached to the project.
- If actor cancels, the skill requirements list is unchanged.

---

### Main Flow

| Step | Actor / System | Action                                                                                                           |
| ---- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Navigates to the project detail page and views the skill requirements list.                                      |
| 02   | System         | Displays the list of skill requirements with a remove option for each entry.                                     |
| 03   | Actor          | Selects the remove option for a specific skill requirement.                                                      |
| 04   | System         | Displays a confirmation prompt asking the actor to confirm the removal.                                          |
| 05   | Actor          | Confirms the removal.                                                                                            |
| 06   | System         | Deletes the skill requirement entry and displays the updated skill requirements list on the project detail page. |

---

### Alternate Flow

#### AF01 — Actor cancels the removal

> Branches from step 05 of Main Flow.

| Step | Actor / System | Action                                                                                                            |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Dismisses the confirmation prompt without confirming.                                                             |
| 02   | System         | Closes the confirmation prompt and returns to the project detail page with the skill requirements list unchanged. |

> Ends with: Skill requirements list unchanged.
