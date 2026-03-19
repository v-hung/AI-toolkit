# M02 — Skill Administration

<!-- source: features.md, plan.md, project-overview.md -->
<!-- module: M02 -->
<!-- features: F02.01, F02.02 -->

---

## UC02.01.01 — Configure Skill Taxonomy

<!-- feature: F02.01 -->

**Actor:** Admin
**Goal:** Admin wants to define or update the organization-wide skill taxonomy by adding, renaming, or removing skill categories and named skills.
**Trigger:** Admin navigates to the Skill Taxonomy management section.

**Preconditions**

- Admin is authenticated and holds the Admin role.

**Postconditions**

- Taxonomy reflects all changes made by the Admin.
- If a named skill was removed, all employee skill profiles that contained that skill are flagged for review.

---

### Main Flow

| Step | Actor / System | Action                                                                                   |
| ---- | -------------- | ---------------------------------------------------------------------------------------- |
| 01   | Admin          | Navigates to the Skill Taxonomy management section.                                      |
| 02   | System         | Displays the list of all skill categories, each showing its associated named skills.     |
| 03   | Admin          | Selects a skill category to manage.                                                      |
| 04   | System         | Displays the selected category with its full list of named skills.                       |
| 05   | Admin          | Initiates addition of a new named skill to the selected category.                        |
| 06   | System         | Displays a form to enter the new skill name.                                             |
| 07   | Admin          | Submits the new skill name.                                                              |
| 08   | System         | Validates the skill name is unique within the category.                                  |
| 09   | System         | Saves the new named skill and displays the updated skill list for the selected category. |

---

### Alternate Flow

#### AF01 — Create a new skill category

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action                                                                               |
| ---- | -------------- | ------------------------------------------------------------------------------------ |
| 01   | Admin          | Initiates creation of a new skill category.                                          |
| 02   | System         | Displays a form to enter the new category name.                                      |
| 03   | Admin          | Submits the new category name.                                                       |
| 04   | System         | Validates the category name is unique across all categories.                         |
| 05   | System         | Saves the new category and displays it in the category list with an empty skill set. |

> Rejoins Main Flow at step 02.

---

#### AF02 — Rename an existing skill category

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                        |
| ---- | -------------- | ----------------------------------------------------------------------------- |
| 01   | Admin          | Initiates rename of the selected category.                                    |
| 02   | System         | Displays a form pre-filled with the current category name.                    |
| 03   | Admin          | Submits the updated category name.                                            |
| 04   | System         | Validates the new name is unique across all categories.                       |
| 05   | System         | Saves the updated name and displays the category list with the renamed entry. |

> Rejoins Main Flow at step 02.

---

#### AF03 — Remove a named skill from a category

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                                                        |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| 01   | Admin          | Selects a named skill and initiates its removal.                                                              |
| 02   | System         | Displays a confirmation prompt, indicating the number of employee profiles that currently contain this skill. |
| 03   | Admin          | Confirms the removal.                                                                                         |
| 04   | System         | Removes the named skill from the taxonomy.                                                                    |
| 05   | System         | Flags all employee skill profiles that contained the removed skill for review.                                |
| 06   | System         | Displays the updated skill list for the category and a summary of the number of flagged profiles.             |

> Ends with: named skill removed from taxonomy; affected employee profiles flagged for review.

---

### Exception Flow

#### EF01 — Duplicate skill name within category

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action                                                                                   |
| ---- | -------------- | ---------------------------------------------------------------------------------------- |
| 01   | System         | Detects that the submitted skill name already exists within the selected category.       |
| 02   | System         | Displays an error message indicating the skill name is already present in this category. |
| 03   | Admin          | Corrects the skill name or cancels the operation.                                        |

> Ends with: no changes saved; Admin remains on the add-skill form.

---

#### EF02 — Duplicate category name

> Branches from step 04 of AF01 or step 04 of AF02.

| Step | Actor / System | Action                                                                    |
| ---- | -------------- | ------------------------------------------------------------------------- |
| 01   | System         | Detects that the submitted category name already exists.                  |
| 02   | System         | Displays an error message indicating the category name is already in use. |
| 03   | Admin          | Corrects the name or cancels the operation.                               |

> Ends with: no changes saved; Admin remains on the category name form.

---

## UC02.02.01 — Update Own Skill Profile

<!-- feature: F02.02 -->

**Actor:** Employee
**Goal:** Employee wants to add, edit, or remove a skill entry on their own skill profile.
**Trigger:** Employee navigates to their own skill profile page.

**Preconditions**

- Employee is authenticated and holds the Employee role.
- At least one skill category and one named skill exist in the taxonomy (to add a new entry).

**Postconditions**

- Employee's skill profile reflects the changes made.
- A versioned history entry is recorded with the timestamp and the acting employee's identity.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                                                              |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Employee       | Navigates to their own skill profile.                                                                                                                               |
| 02   | System         | Displays the employee's current skill entries grouped by category, including proficiency level and years of experience for each entry.                              |
| 03   | Employee       | Initiates addition of a new skill entry.                                                                                                                            |
| 04   | System         | Displays a form with fields: skill category (from taxonomy), skill name (filtered by selected category), proficiency level (1–5), and optional years of experience. |
| 05   | Employee       | Selects a skill category.                                                                                                                                           |
| 06   | System         | Populates the skill name list with named skills belonging to the selected category.                                                                                 |
| 07   | Employee       | Selects a skill name, sets a proficiency level, optionally enters years of experience, and submits the form.                                                        |
| 08   | System         | Validates the submission (proficiency level within 1–5, skill name exists in taxonomy).                                                                             |
| 09   | System         | Saves the new skill entry to the profile.                                                                                                                           |
| 10   | System         | Records a versioned history entry with the timestamp and actor.                                                                                                     |
| 11   | System         | Displays the updated skill profile with the new entry visible.                                                                                                      |

---

### Alternate Flow

#### AF01 — Edit an existing skill entry

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action                                                                                                                     |
| ---- | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 01   | Employee       | Selects an existing skill entry to edit.                                                                                   |
| 02   | System         | Displays the edit form pre-filled with the current proficiency level and years of experience for that entry.               |
| 03   | Employee       | Modifies the proficiency level and/or years of experience and submits.                                                     |
| 04   | System         | Validates the updated values.                                                                                              |
| 05   | System         | Saves the changes, records a versioned history entry with the timestamp and actor, and displays the updated skill profile. |

> Ends with: skill entry updated; history entry recorded.

---

#### AF02 — Remove an existing skill entry

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action                                                                                                                                            |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Employee       | Selects an existing skill entry and initiates its removal.                                                                                        |
| 02   | System         | Displays a confirmation prompt.                                                                                                                   |
| 03   | Employee       | Confirms the removal.                                                                                                                             |
| 04   | System         | Removes the skill entry from the profile, records a versioned history entry with the timestamp and actor, and displays the updated skill profile. |

> Ends with: skill entry removed; history entry recorded.

---

### Exception Flow

#### EF01 — Invalid proficiency level

> Branches from step 08 of Main Flow or step 04 of AF01.

| Step | Actor / System | Action                                                                              |
| ---- | -------------- | ----------------------------------------------------------------------------------- |
| 01   | System         | Detects that the submitted proficiency level is outside the valid range (1–5).      |
| 02   | System         | Displays an error message indicating the proficiency level must be between 1 and 5. |
| 03   | Employee       | Corrects the value and resubmits.                                                   |

> Ends with: no changes saved; Employee remains on the form.

---

#### EF02 — Selected skill no longer in taxonomy

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action                                                                                             |
| ---- | -------------- | -------------------------------------------------------------------------------------------------- |
| 01   | System         | Detects that the selected skill name has been removed from the taxonomy since the form was loaded. |
| 02   | System         | Displays an error message indicating the selected skill is no longer available in the taxonomy.    |
| 03   | System         | Refreshes the skill name list to reflect the current taxonomy.                                     |
| 04   | Employee       | Selects a valid skill name and resubmits.                                                          |

> Ends with: no changes saved; Employee selects from the updated skill list.

---

## UC02.02.02 — Update Employee Skill Profile on Behalf

<!-- feature: F02.02 -->

**Actor:** Admin
**Goal:** Admin wants to add, edit, or remove a skill entry on any employee's skill profile.
**Trigger:** Admin navigates to a specific employee's skill profile from the user management or employee directory section.

**Preconditions**

- Admin is authenticated and holds the Admin role.
- The target employee account exists and is active.
- At least one skill category and one named skill exist in the taxonomy (to add a new entry).

**Postconditions**

- The target employee's skill profile reflects the changes made by the Admin.
- A versioned history entry is recorded with the timestamp and the Admin's identity as the acting user.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                                                              |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Admin          | Navigates to the employee directory or user management section.                                                                                                     |
| 02   | System         | Displays the list of registered user accounts.                                                                                                                      |
| 03   | Admin          | Selects a specific employee to view their profile.                                                                                                                  |
| 04   | System         | Displays the selected employee's skill profile with current skill entries grouped by category.                                                                      |
| 05   | Admin          | Initiates addition of a new skill entry on the employee's profile.                                                                                                  |
| 06   | System         | Displays a form with fields: skill category (from taxonomy), skill name (filtered by selected category), proficiency level (1–5), and optional years of experience. |
| 07   | Admin          | Selects a skill category.                                                                                                                                           |
| 08   | System         | Populates the skill name list with named skills belonging to the selected category.                                                                                 |
| 09   | Admin          | Selects a skill name, sets a proficiency level, optionally enters years of experience, and submits the form.                                                        |
| 10   | System         | Validates the submission (proficiency level within 1–5, skill name exists in taxonomy).                                                                             |
| 11   | System         | Saves the new skill entry to the employee's profile.                                                                                                                |
| 12   | System         | Records a versioned history entry with the timestamp and the Admin's identity as actor.                                                                             |
| 13   | System         | Displays the updated employee skill profile with the new entry visible.                                                                                             |

---

### Alternate Flow

#### AF01 — Edit an existing skill entry on the employee's profile

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                                                                                         |
| ---- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Admin          | Selects an existing skill entry on the employee's profile to edit.                                                                             |
| 02   | System         | Displays the edit form pre-filled with the current proficiency level and years of experience for that entry.                                   |
| 03   | Admin          | Modifies the values and submits.                                                                                                               |
| 04   | System         | Validates the updated values.                                                                                                                  |
| 05   | System         | Saves the changes, records a versioned history entry with the timestamp and Admin's identity, and displays the updated employee skill profile. |

> Ends with: skill entry updated; history entry recorded with Admin as actor.

---

#### AF02 — Remove an existing skill entry from the employee's profile

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                                                                                                            |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Admin          | Selects an existing skill entry and initiates its removal.                                                                                                        |
| 02   | System         | Displays a confirmation prompt.                                                                                                                                   |
| 03   | Admin          | Confirms the removal.                                                                                                                                             |
| 04   | System         | Removes the skill entry from the employee's profile, records a versioned history entry with the timestamp and Admin's identity, and displays the updated profile. |

> Ends with: skill entry removed; history entry recorded with Admin as actor.

---

### Exception Flow

#### EF01 — Invalid proficiency level

> Branches from step 10 of Main Flow or step 04 of AF01.

| Step | Actor / System | Action                                                                              |
| ---- | -------------- | ----------------------------------------------------------------------------------- |
| 01   | System         | Detects that the submitted proficiency level is outside the valid range (1–5).      |
| 02   | System         | Displays an error message indicating the proficiency level must be between 1 and 5. |
| 03   | Admin          | Corrects the value and resubmits.                                                   |

> Ends with: no changes saved; Admin remains on the form.

---

#### EF02 — Selected skill no longer in taxonomy

> Branches from step 10 of Main Flow.

| Step | Actor / System | Action                                                                                             |
| ---- | -------------- | -------------------------------------------------------------------------------------------------- |
| 01   | System         | Detects that the selected skill name has been removed from the taxonomy since the form was loaded. |
| 02   | System         | Displays an error message indicating the selected skill is no longer available in the taxonomy.    |
| 03   | System         | Refreshes the skill name list to reflect the current taxonomy.                                     |
| 04   | Admin          | Selects a valid skill name and resubmits.                                                          |

> Ends with: no changes saved; Admin selects from the updated skill list.
