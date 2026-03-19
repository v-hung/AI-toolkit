# M04 — Staffing

<!-- source: features.md, plan.md, project-overview.md -->
<!-- module: M04 -->
<!-- features: F04.01, F04.02 -->

---

## UC04.01.01 — Search employees by skill criteria

<!-- feature: F04.01 -->

**Actor:** Project Manager
**Goal:** Find employees whose skill profiles meet one or more skill criteria in order to identify qualified staffing candidates.
**Trigger:** Project Manager navigates to the Talent Pool search screen to begin a candidate search.

**Preconditions**

- Project Manager is authenticated and authorized
- At least one employee skill profile exists in the system
- Skill taxonomy is defined with at least one skill entry

**Postconditions**

- A list of employees matching the specified skill criteria is displayed, showing each candidate's skill entries and current resource availability
- If no employees match, the system displays an empty result state

---

### Main Flow

| Step | Actor / System | Action                                                                                                                                 |
| ---- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Project Manager navigates to the Talent Pool screen                                                                                    |
| 02   | System         | System displays the skill-based search interface with skill name and optional proficiency filter fields                                |
| 03   | Actor          | Project Manager enters one or more skill names as search criteria                                                                      |
| 04   | Actor          | Project Manager optionally sets a minimum proficiency level for each entered skill                                                     |
| 05   | Actor          | Project Manager submits the search                                                                                                     |
| 06   | System         | System queries all employee skill profiles against the specified criteria                                                              |
| 07   | System         | System displays a ranked or filtered list of matching employees, each showing current skill entries and residual resource availability |

---

### Alternate Flow

#### AF01 — Refine search with additional skill criteria

> Branches from step 03 of Main Flow.

| Step | Actor / System | Action                                                                         |
| ---- | -------------- | ------------------------------------------------------------------------------ |
| 01   | Actor          | Project Manager adds one or more additional skill names to the search criteria |
| 02   | Actor          | Project Manager adjusts or removes proficiency filters as needed               |

> Rejoins Main Flow at step 05.

---

### Exception Flow

#### EF01 — No employees match the specified criteria

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action                                                                                                        |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| 01   | System         | System finds no employee skill profiles that satisfy all specified criteria                                   |
| 02   | System         | System displays the Talent Pool screen in an empty state with a notification indicating no results were found |

> Ends with: Talent Pool screen showing an empty result; Project Manager may modify the search criteria and resubmit.

---

## UC04.02.01 — Assign employee to project

<!-- feature: F04.02 -->

**Actor:** Project Manager
**Goal:** Create a formal assignment record that links a selected employee to a project, capturing the assignment period, allocated capacity, and role.
**Trigger:** Project Manager selects a candidate employee from search results or the project staffing screen and initiates a new assignment.

**Preconditions**

- Project Manager is authenticated and authorized
- A target project record exists in the Project Registry
- A candidate employee has been identified (via Talent Pool search or direct selection)

**Postconditions**

- An assignment record is created linking the employee to the project with the specified start date, optional end date, capacity percentage, and project role
- The employee's resource availability is updated to reflect the new allocation
- If cancelled at the confirmation step, no assignment record is created

---

### Main Flow

| Step | Actor / System | Action                                                                                                                              |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Project Manager navigates to the project's staffing section or selects an employee from Talent Pool results                         |
| 02   | System         | System displays the project's current active assignments and an option to add a new assignment                                      |
| 03   | Actor          | Project Manager initiates a new assignment for the selected employee                                                                |
| 04   | System         | System displays the assignment creation form with fields for start date, optional end date, capacity percentage, and project role   |
| 05   | Actor          | Project Manager fills in all required assignment fields and submits                                                                 |
| 06   | System         | System validates the submitted assignment data                                                                                      |
| 07   | System         | System creates the assignment record and displays a confirmation; the project staffing view refreshes to include the new assignment |

---

### Alternate Flow

#### AF01 — Employee is at or near full capacity

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action                                                                                                                              |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 01   | System         | System detects that the employee's total active allocation including the new assignment would exceed 100%                           |
| 02   | System         | System displays a warning indicating the employee would be over-allocated, showing the current and resulting allocation percentages |
| 03   | Actor          | Project Manager acknowledges the warning and confirms the assignment                                                                |

> Rejoins Main Flow at step 07.

---

### Exception Flow

#### EF01 — Required assignment data is missing or invalid

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action                                                                                                                                          |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | System         | System detects that one or more required fields are missing or contain invalid values (e.g., end date before start date, capacity out of range) |
| 02   | System         | System displays the assignment form with inline validation errors highlighting the affected fields                                              |

> Ends with: Assignment form displayed with validation errors; Project Manager may correct the data and resubmit.

---

## UC04.02.02 — Unassign employee from project

<!-- feature: F04.02 -->

**Actor:** Project Manager
**Goal:** Close an active assignment record for an employee on a specific project, releasing the allocated capacity.
**Trigger:** Project Manager navigates to a project's staffing section and selects an active assignment to remove.

**Preconditions**

- Project Manager is authenticated and authorized
- At least one active assignment record exists for an employee on the target project

**Postconditions**

- The selected assignment record is closed; the employee is no longer listed as assigned to the project
- The employee's resource availability is updated to reflect the freed capacity
- If cancelled at the confirmation step, the assignment record remains active

---

### Main Flow

| Step | Actor / System | Action                                                                                                                   |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 01   | Actor          | Project Manager navigates to the project's staffing section                                                              |
| 02   | System         | System displays the list of active assignments on the project, including employee name, role, period, and capacity       |
| 03   | Actor          | Project Manager selects an active assignment and initiates removal                                                       |
| 04   | System         | System displays a confirmation prompt asking the Project Manager to confirm the unassignment                             |
| 05   | Actor          | Project Manager confirms the unassignment                                                                                |
| 06   | System         | System closes the assignment record and displays a confirmation; the staffing view refreshes with the assignment removed |

---

### Alternate Flow

#### AF01 — Project Manager cancels unassignment

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                         |
| ---- | -------------- | ------------------------------------------------------------------------------ |
| 01   | Actor          | Project Manager dismisses or cancels the confirmation prompt                   |
| 02   | System         | System closes the confirmation prompt and returns to the project staffing view |

> Ends with: Assignment remains active; no changes made to any record.

---

### Exception Flow

#### EF01 — Assignment no longer active at time of removal

> Branches from step 05 of Main Flow.

| Step | Actor / System | Action                                                                                                                 |
| ---- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 01   | System         | System detects that the selected assignment record is no longer active (e.g., removed concurrently by another session) |
| 02   | System         | System displays an error notification and refreshes the staffing view to reflect the current assignment state          |

> Ends with: Project staffing view showing the current state; selected assignment is no longer present.
