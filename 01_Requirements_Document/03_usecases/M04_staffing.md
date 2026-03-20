# M04 — Staffing

<!-- source: 02_features.md, plan.md, 01_project_overview.md -->
<!-- module: M04 -->
<!-- features: F04.01, F04.02 -->

---

## UC04.01.01 — Search for Qualified Candidates by Skill

<!-- feature: F04.01 -->

**Actor:** Project Manager
**Goal:** Find employees whose skill profiles match specified skill criteria for staffing consideration.
**Trigger:** Project Manager navigates to the Talent Search screen and enters one or more skill criteria.

**Preconditions**
- Project Manager is authenticated with the Project Manager role.
- At least one skill category and skill name exist in the taxonomy.
- At least one employee has a populated skill profile.

**Postconditions**
- System displays a filterable Talent Pool list showing matching employees with their skill summaries and current resource availability.
- If no match: system displays an empty result state; no data is changed.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Project Manager | Navigates to the Talent Search screen. |
| 02 | System | Displays the Talent Search screen with a skill filter form and an empty results area. |
| 03 | Project Manager | Selects one or more skill names from the taxonomy dropdown, optionally setting a minimum proficiency level for each skill. |
| 04 | Project Manager | Submits the search. |
| 05 | System | Queries employee skill profiles against the specified criteria. |
| 06 | System | Displays the Talent Pool list showing each matching employee's name, matched skills with proficiency levels, and current resource availability percentage. |
| 07 | Project Manager | Selects an employee from the Talent Pool list to view their full profile. |
| 08 | System | Displays the selected employee's full skill profile with all skill entries and a summary of current active assignments. |

---

### Alternate Flow

#### AF01 — Refine search criteria after viewing initial results

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Project Manager | Modifies the skill filter (adds, removes, or adjusts proficiency thresholds). |
| 02 | System | Refreshes the Talent Pool list using the updated criteria. |

> Rejoins Main Flow at step 06.

#### AF02 — Return to Talent Pool from employee profile

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Project Manager | Navigates back to the Talent Pool list. |
| 02 | System | Redisplays the Talent Pool list with the previously applied filter still active. |

> Rejoins Main Flow at step 06.

---

### Exception Flow

#### EF01 — No candidates match the search criteria

> Branches from step 05 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Determines that no employee profiles satisfy the specified skill criteria. |
| 02 | System | Displays a "No results found" message on the Talent Search screen; the filter form remains accessible for modification. |

> Ends with: Talent Search screen visible with no results; system data unchanged.

---

## UC04.02.01 — Assign Employee to Project

<!-- feature: F04.02 -->

**Actor:** Project Manager
**Goal:** Create a formal assignment record linking a selected candidate employee to a target project with a defined period, capacity, and role.
**Trigger:** Project Manager selects a candidate from the Talent Pool and initiates assignment creation.

**Preconditions**
- Project Manager is authenticated with the Project Manager role.
- A target project record exists.
- A candidate employee has been identified via UC04.01.01 (Talent Search).

**Postconditions**
- A new assignment record is persisted, linking the employee to the project with the specified start date, optional end date, capacity percentage, and project role.
- The employee's resource availability is recalculated to reflect the new allocation.
- If cancelled: no assignment record is created; system state is unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Project Manager | Selects a candidate employee from the Talent Pool list. |
| 02 | System | Displays the employee's full skill profile and current assignment summary. |
| 03 | Project Manager | Initiates the assignment creation action. |
| 04 | System | Displays the Assignment Creation screen pre-populated with the selected employee, and a list of available projects for selection. |
| 05 | Project Manager | Selects the target project from the list. |
| 06 | Project Manager | Enters assignment details: start date, optional end date, capacity percentage, and project role. |
| 07 | Project Manager | Submits the assignment form. |
| 08 | System | Validates the submitted assignment details. |
| 09 | System | Creates the assignment record and displays the Assignment Confirmation screen showing the recorded details. |
| 10 | System | Updates the employee's resource availability to reflect the newly added allocation. |

---

### Alternate Flow

#### AF01 — Cancel assignment before submission

> Branches from step 04 or step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Project Manager | Cancels the assignment creation. |
| 02 | System | Returns to the employee skill profile screen without creating any record. |

> Ends with: No assignment created; system state unchanged.

---

### Exception Flow

#### EF01 — Conflicting active assignment detected

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects that the employee already has an active assignment to the selected project with an overlapping period. |
| 02 | System | Displays a conflict error message identifying the overlapping assignment. |
| 03 | Project Manager | Acknowledges the error message. |
| 04 | System | Returns to the Assignment Creation screen with the entered data preserved. |

> Ends with: Assignment Creation screen remains open for correction; no record created.

#### EF02 — Invalid assignment details submitted

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects missing required fields or invalid values (e.g., end date before start date, capacity value out of valid range). |
| 02 | System | Displays inline validation error messages on the Assignment Creation screen, identifying each invalid field. |
| 03 | Project Manager | Corrects the flagged fields. |

> Ends with: Assignment Creation screen remains open; no record created until resubmission.

---

## UC04.02.02 — Unassign Employee from Project

<!-- feature: F04.02 -->

**Actor:** Project Manager
**Goal:** Close an active assignment record for an employee on a project, releasing their allocated capacity.
**Trigger:** Project Manager selects an active assignment from the project detail screen or employee profile and initiates removal.

**Preconditions**
- Project Manager is authenticated with the Project Manager role.
- At least one active assignment record exists for the target employee on the target project.

**Postconditions**
- The assignment record is closed; the employee is no longer listed as actively assigned to the project.
- The employee's resource availability is recalculated to reflect the removed allocation.
- If cancelled: the assignment record remains active; system state is unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Project Manager | Navigates to the project detail screen or the employee's profile screen. |
| 02 | System | Displays the list of active assignments associated with the project or employee. |
| 03 | Project Manager | Selects an active assignment to remove. |
| 04 | System | Displays a confirmation dialog for the unassignment action, showing the employee name, project name, and assignment period. |
| 05 | Project Manager | Confirms the unassignment. |
| 06 | System | Closes the assignment record and returns to the previous screen, displaying a success notification. |
| 07 | System | Updates the employee's resource availability to reflect the removed allocation. |

---

### Alternate Flow

#### AF01 — Cancel unassignment at confirmation

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Project Manager | Cancels the unassignment action in the confirmation dialog. |
| 02 | System | Dismisses the dialog and returns to the previous screen without changes. |

> Ends with: Assignment remains active; system state unchanged.
