# M02 — Skill Administration

<!-- source: 02_features.md, plan.md, 01_project_overview.md -->
<!-- module: M02 -->
<!-- features: F02.01, F02.02 -->

---

## UC02.01.01 — Manage skill categories

<!-- feature: F02.01 -->

**Actor:** Admin
**Goal:** Define and maintain the list of skill categories in the organization-wide taxonomy.
**Trigger:** Admin navigates to the Taxonomy Configuration section.

**Preconditions**
- Admin is authenticated with the Admin role.

**Postconditions**
- Skill category is created or its name is updated in the taxonomy.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin navigates to the Taxonomy Configuration section |
| 02 | System | System displays the Taxonomy Configuration page showing the current list of skill categories and their associated skills |
| 03 | Actor | Admin initiates creation of a new skill category |
| 04 | System | System displays a form to enter the new category name |
| 05 | Actor | Admin enters the category name and submits |
| 06 | System | System validates the category name (non-empty, unique across existing categories) |
| 07 | System | System saves the new category and displays the updated category list with the new entry |

---

### Alternate Flow

#### AF01 — Update an existing category name

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin selects an existing category and initiates the edit action |
| 02 | System | System displays an edit form pre-populated with the current category name |
| 03 | Actor | Admin modifies the category name and submits |
| 04 | System | System validates the updated name (non-empty, unique) |
| 05 | System | System saves the updated category name and displays the refreshed category list |

> Ends with: category name updated in the taxonomy.

---

### Exception Flow

#### EF01 — Category name is empty or already exists

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | System detects the submitted category name is empty or already exists in the taxonomy |
| 02 | System | System displays a validation error message on the form indicating the conflict |
| 03 | Actor | Admin corrects the name or cancels the operation |

> Ends with: no category is saved; form remains open with the error message visible.

---

## UC02.01.02 — Add a skill to a category

<!-- feature: F02.01 -->

**Actor:** Admin
**Goal:** Add a new named skill entry under a specific skill category in the taxonomy.
**Trigger:** Admin selects a category and initiates the add skill action on the Taxonomy Configuration page.

**Preconditions**
- Admin is authenticated with the Admin role.
- At least one skill category exists in the taxonomy.

**Postconditions**
- The new skill name appears under the selected category in the taxonomy and is available for use in skill profiles and project requirements.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin navigates to the Taxonomy Configuration page |
| 02 | System | System displays the taxonomy showing all categories and their current skills |
| 03 | Actor | Admin selects a category and initiates adding a new skill |
| 04 | System | System displays a form to enter the skill name under the selected category |
| 05 | Actor | Admin enters the skill name and submits |
| 06 | System | System validates the skill name (non-empty, unique within the selected category) |
| 07 | System | System saves the new skill and displays the updated skill list under the selected category |

---

### Exception Flow

#### EF01 — Skill name is empty or already exists in the category

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | System detects the skill name is empty or a skill with that name already exists in the selected category |
| 02 | System | System displays a validation error on the form indicating the issue |
| 03 | Actor | Admin corrects the skill name or cancels the operation |

> Ends with: no skill is saved; form remains open with the error message visible.

---

## UC02.01.03 — Remove a skill from a category

<!-- feature: F02.01 -->

**Actor:** Admin
**Goal:** Delete a named skill entry from a category, with awareness that existing employee skill profiles referencing the skill will be flagged for review.
**Trigger:** Admin selects a skill entry and initiates the remove action on the Taxonomy Configuration page.

**Preconditions**
- Admin is authenticated with the Admin role.
- The target skill exists in the taxonomy.

**Postconditions**
- Success: The skill is removed from the taxonomy. All employee skill profile entries that referenced the removed skill are flagged for review.
- Cancellation: The taxonomy and all employee skill profiles remain unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin navigates to the Taxonomy Configuration page |
| 02 | System | System displays the taxonomy with all categories and their skills |
| 03 | Actor | Admin selects a skill entry and initiates the remove action |
| 04 | System | System counts the number of employee skill profile entries that reference the selected skill |
| 05 | System | System displays a confirmation dialog showing the skill name and the number of employee profiles that will be flagged |
| 06 | Actor | Admin confirms the removal |
| 07 | System | System removes the skill from the taxonomy |
| 08 | System | System flags all employee skill profile entries that referenced the removed skill |
| 09 | System | System displays the updated taxonomy with the skill removed and a notification showing the count of profiles flagged |

---

### Alternate Flow

#### AF01 — Admin cancels the removal

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin dismisses the confirmation dialog without confirming |
| 02 | System | System closes the dialog and returns to the Taxonomy Configuration page with no changes applied |

> Ends with: taxonomy unchanged; no profiles flagged.

---

## UC02.02.01 — Maintain own skill profile

<!-- feature: F02.02 -->

**Actor:** Employee
**Goal:** Add, modify, or remove skill entries on their own skill profile.
**Trigger:** Employee navigates to their own skill profile page.

**Preconditions**
- Employee is authenticated.
- Employee has an active user account.
- The skill taxonomy has at least one category with at least one skill defined.

**Postconditions**
- Success: The employee's skill profile reflects the added, modified, or removed skill entry. A versioned history entry is recorded with the timestamp and the Employee as actor.
- Cancellation: The employee's skill profile is unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Employee navigates to their own skill profile page |
| 02 | System | System displays the skill profile page showing current skill entries grouped by category, with each entry showing skill name, proficiency level, and years of experience |
| 03 | Actor | Employee initiates adding a new skill entry |
| 04 | System | System displays a form with fields: skill category (dropdown), skill name (dropdown filtered by selected category), proficiency level (1–5 scale), and optional years of experience |
| 05 | Actor | Employee selects the category, skill name, and proficiency level, optionally enters years of experience, and submits |
| 06 | System | System validates the submission (selected skill does not already exist in the employee's profile) |
| 07 | System | System saves the new skill entry and records a versioned history entry with timestamp and Employee as actor |
| 08 | System | System displays the updated skill profile with the new entry visible |

---

### Alternate Flow

#### AF01 — Modify an existing skill entry

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Employee selects an existing skill entry and initiates the modify action |
| 02 | System | System displays an edit form pre-populated with the current proficiency level and years of experience |
| 03 | Actor | Employee updates the proficiency level and/or years of experience and submits |
| 04 | System | System saves the updated entry and records a versioned history entry with timestamp and Employee as actor |
| 05 | System | System displays the updated skill profile |

> Ends with: skill entry updated; history record created.

#### AF02 — Remove a skill entry

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Employee selects an existing skill entry and initiates the remove action |
| 02 | System | System displays a confirmation prompt |
| 03 | Actor | Employee confirms the removal |
| 04 | System | System removes the skill entry and records a versioned history entry with timestamp and Employee as actor |
| 05 | System | System displays the updated skill profile with the entry removed |

> Ends with: skill entry removed; history record created.

#### AF03 — View skill profile change history

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Employee navigates to the change history section of their skill profile page |
| 02 | System | System displays a chronological list of all changes to the profile, each entry showing timestamp, actor, change type (add / modify / remove), and the affected skill entry details |

> Ends with: change history displayed; profile unchanged.

---

### Exception Flow

#### EF01 — Duplicate skill entry submission

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | System detects that the selected skill already exists as an active entry in the employee's profile |
| 02 | System | System displays a validation error message indicating the skill is already in the profile |
| 03 | Actor | Employee selects a different skill or cancels the form |

> Ends with: no skill entry saved; form remains open with the error message visible.

---

## UC02.02.02 — Maintain an employee's skill profile

<!-- feature: F02.02 -->

**Actor:** Admin
**Goal:** Add, modify, or remove skill entries on any employee's skill profile on behalf of the organization.
**Trigger:** Admin navigates to a specific employee's profile and opens the skill profile section.

**Preconditions**
- Admin is authenticated with the Admin role.
- The target employee has an active user account.
- The skill taxonomy has at least one category with at least one skill defined.

**Postconditions**
- Success: The target employee's skill profile reflects the added, modified, or removed skill entry. A versioned history entry is recorded with the timestamp and Admin as actor.
- Cancellation: The target employee's skill profile is unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin navigates to the user list or employee search area |
| 02 | System | System displays the user list showing all registered user accounts |
| 03 | Actor | Admin selects a specific employee |
| 04 | System | System displays the selected employee's profile page |
| 05 | Actor | Admin navigates to the skill profile section of the employee's profile |
| 06 | System | System displays the employee's skill profile showing current skill entries grouped by category |
| 07 | Actor | Admin initiates adding a new skill entry |
| 08 | System | System displays a form with fields: skill category (dropdown), skill name (dropdown filtered by selected category), proficiency level (1–5 scale), and optional years of experience |
| 09 | Actor | Admin selects the category, skill name, and proficiency level, optionally enters years of experience, and submits |
| 10 | System | System validates the submission (selected skill does not already exist in the employee's profile) |
| 11 | System | System saves the new skill entry and records a versioned history entry with timestamp and Admin as actor |
| 12 | System | System displays the updated employee skill profile with the new entry visible |

---

### Alternate Flow

#### AF01 — Modify an existing skill entry on the employee's profile

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin selects an existing skill entry and initiates the modify action |
| 02 | System | System displays an edit form pre-populated with the current proficiency level and years of experience |
| 03 | Actor | Admin updates the values and submits |
| 04 | System | System saves the updated entry and records a versioned history entry with timestamp and Admin as actor |
| 05 | System | System displays the updated employee skill profile |

> Ends with: skill entry updated; history record with Admin as actor created.

#### AF02 — Remove a skill entry from the employee's profile

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin selects an existing skill entry and initiates the remove action |
| 02 | System | System displays a confirmation prompt |
| 03 | Actor | Admin confirms the removal |
| 04 | System | System removes the skill entry and records a versioned history entry with timestamp and Admin as actor |
| 05 | System | System displays the updated employee skill profile with the entry removed |

> Ends with: skill entry removed; history record with Admin as actor created.

#### AF03 — View change history for the employee's skill profile

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Admin navigates to the change history section of the employee's skill profile |
| 02 | System | System displays a chronological list of all changes to the profile, each entry showing timestamp, actor, change type (add / modify / remove), and the affected skill entry details |

> Ends with: change history displayed; profile unchanged.

---

### Exception Flow

#### EF01 — Duplicate skill entry submission

> Branches from step 10 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | System detects that the selected skill already exists as an active entry in the employee's profile |
| 02 | System | System displays a validation error message indicating the skill is already in the profile |
| 03 | Actor | Admin selects a different skill or cancels the form |

> Ends with: no skill entry saved; form remains open with the error message visible.
