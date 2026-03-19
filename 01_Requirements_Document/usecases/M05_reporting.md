# M05 — Reporting

<!-- source: features.md, plan.md, project-overview.md -->
<!-- module: M05 -->
<!-- features: F05.01, F05.02, F05.03, F05.04 -->

---

## UC05.01.01 — View Resource Utilization Report

<!-- feature: F05.01 -->

**Actor:** Admin, Project Manager
**Goal:** Review each employee's current allocation across active projects and assess remaining availability.
**Trigger:** Actor navigates to the Reporting section and selects the Resource Utilization Report.

**Preconditions**

- Actor is authenticated with Admin or Project Manager role.
- At least one active assignment record exists in the system.

**Postconditions**

- Resource utilization report is displayed; no system data is modified.
- If no data exists, an empty state is shown.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                              |
| ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Navigates to the Reporting section and selects Resource Utilization Report.                                                         |
| 02   | System         | Displays the report listing all employees with their active assignments, combined allocation percentage, and residual availability. |
| 03   | Actor          | Optionally selects filter options (e.g., by project or minimum availability threshold).                                             |
| 04   | System         | Refreshes the report to show only entries matching the applied filter.                                                              |
| 05   | Actor          | Selects an employee entry to view detailed allocation breakdown.                                                                    |
| 06   | System         | Displays the selected employee's active assignments with project name, assignment period, capacity percentage, and role.            |

---

### Alternate Flow

#### AF01 — View without applying a filter

> Branches from step 03 of Main Flow.

| Step | Actor / System | Action                                        |
| ---- | -------------- | --------------------------------------------- |
| 01   | Actor          | Proceeds without selecting any filter option. |
| 02   | System         | Maintains the full unfiltered report view.    |

> Rejoins Main Flow at step 05.

---

### Exception Flow

#### EF01 — No assignment records exist

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action                                                                         |
| ---- | -------------- | ------------------------------------------------------------------------------ |
| 01   | System         | Detects no assignment records present in the system.                           |
| 02   | System         | Displays an empty state indicating no utilization data is currently available. |

> Ends with: Empty state displayed; actor may navigate elsewhere.

---

## UC05.02.01 — View Skill Distribution Report

<!-- feature: F05.02 -->

**Actor:** Admin
**Goal:** Understand the distribution of skills and proficiency levels across all employee profiles in the organization.
**Trigger:** Actor navigates to the Reporting section and selects the Skill Distribution Report.

**Preconditions**

- Actor is authenticated with Admin role.
- At least one employee skill entry exists in the system.

**Postconditions**

- Skill distribution report is displayed; no system data is modified.
- If no skill data exists, an empty state is shown.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                             |
| ---- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Navigates to the Reporting section and selects Skill Distribution Report.                                                          |
| 02   | System         | Displays aggregated skill coverage grouped by category, showing the number of distinct skills and employees per category.          |
| 03   | Actor          | Selects a skill category to drill down.                                                                                            |
| 04   | System         | Displays the proficiency level distribution (1–5) for each skill within the selected category, including employee count per level. |
| 05   | Actor          | Reviews the proficiency breakdown for individual skills within the category.                                                       |

---

### Exception Flow

#### EF01 — No employee skill profiles exist

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action                                                                       |
| ---- | -------------- | ---------------------------------------------------------------------------- |
| 01   | System         | Detects no skill entries in any employee profile.                            |
| 02   | System         | Displays an empty state indicating no skill data is available for reporting. |

> Ends with: Empty state displayed; actor may navigate elsewhere.

---

## UC05.03.01 — Analyze Skill Gap for a Project

<!-- feature: F05.03 -->

**Actor:** Admin, Project Manager
**Goal:** Identify which required skills for a project are not covered by available employee profiles, including any proficiency shortfall.
**Trigger:** Actor navigates to the Reporting section and selects Skill Gap Analysis, then chooses a project to analyze.

**Preconditions**

- Actor is authenticated with Admin or Project Manager role.
- At least one project with defined skill requirements exists.
- At least one employee skill profile exists.

**Postconditions**

- Skill gap analysis results are displayed for the selected project; no system data is modified.
- If no gaps exist, all requirements are shown as covered.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                                                                                                                                               |
| ---- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01   | Actor          | Navigates to the Reporting section and selects Skill Gap Analysis.                                                                                                                                                                                   |
| 02   | System         | Displays a list of available projects for gap analysis.                                                                                                                                                                                              |
| 03   | Actor          | Selects a project to analyze.                                                                                                                                                                                                                        |
| 04   | System         | Compares the project's required skills against all employee skill profiles and displays the gap analysis, listing each required skill with minimum proficiency required, coverage status (met or unmet), and proficiency shortfall where applicable. |
| 05   | Actor          | Reviews identified unfilled skill requirements and proficiency shortfalls.                                                                                                                                                                           |

---

### Alternate Flow

#### AF01 — All skill requirements are fully covered

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                                                   |
| ---- | -------------- | -------------------------------------------------------------------------------------------------------- |
| 01   | System         | Determines all required skills are met at or above the minimum proficiency by at least one employee.     |
| 02   | System         | Displays the analysis result with all skill requirements marked as covered and no shortfalls identified. |

> Ends with: Report displayed showing no skill gaps for the selected project.

---

### Exception Flow

#### EF01 — Selected project has no skill requirements defined

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                          |
| ---- | -------------- | ------------------------------------------------------------------------------- |
| 01   | System         | Detects no skill requirements are defined for the selected project.             |
| 02   | System         | Displays a message indicating the project has no skill requirements to analyze. |

> Ends with: Message displayed; actor may select a different project or navigate elsewhere.

---

## UC05.04.01 — View Assignment History Report

<!-- feature: F05.04 -->

**Actor:** Admin, Project Manager
**Goal:** Review a chronological record of all project assignments, optionally filtered by employee, project, or date range.
**Trigger:** Actor navigates to the Reporting section and selects the Assignment History Report.

**Preconditions**

- Actor is authenticated with Admin or Project Manager role.
- At least one assignment record exists in the system.

**Postconditions**

- Assignment history report is displayed with optional filter applied; no system data is modified.
- If no records match the filter, an empty state is shown.

---

### Main Flow

| Step | Actor / System | Action                                                                                                                                                 |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01   | Actor          | Navigates to the Reporting section and selects Assignment History Report.                                                                              |
| 02   | System         | Displays a chronological list of all assignment records showing employee name, project name, assignment period, capacity percentage, and project role. |
| 03   | Actor          | Selects one or more filter criteria (employee, project, or date range).                                                                                |
| 04   | System         | Refreshes the report displaying only assignment records matching the selected filter criteria.                                                         |
| 05   | Actor          | Reviews the filtered assignment history.                                                                                                               |

---

### Alternate Flow

#### AF01 — View without applying any filter

> Branches from step 03 of Main Flow.

| Step | Actor / System | Action                                                 |
| ---- | -------------- | ------------------------------------------------------ |
| 01   | Actor          | Proceeds without selecting any filter criteria.        |
| 02   | System         | Maintains the full unfiltered assignment history list. |

> Rejoins Main Flow at step 05.

---

### Exception Flow

#### EF01 — No assignment records match the applied filter

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action                                                                              |
| ---- | -------------- | ----------------------------------------------------------------------------------- |
| 01   | System         | Detects no assignment records match the selected filter criteria.                   |
| 02   | System         | Displays an empty state indicating no assignments found for the specified criteria. |

> Ends with: Empty state displayed; actor may adjust filter criteria or clear the filter.

#### EF02 — No assignment history exists in the system

> Branches from step 02 of Main Flow.

| Step | Actor / System | Action                                                                           |
| ---- | -------------- | -------------------------------------------------------------------------------- |
| 01   | System         | Detects no assignment records present in the system.                             |
| 02   | System         | Displays an empty state indicating no assignment history is currently available. |

> Ends with: Empty state displayed; actor may navigate elsewhere.
