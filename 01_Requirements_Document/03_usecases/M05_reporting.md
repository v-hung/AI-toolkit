# M05 — Reporting

<!-- source: 02_features.md, plan.md, project-overview.md -->
<!-- module: M05 -->
<!-- features: F05.01, F05.02, F05.03, F05.04 -->

---

## UC05.01.01 — View Resource Utilization Report

<!-- feature: F05.01 -->

**Actor:** Admin, Project Manager
**Goal:** View the current allocation of all employees across active projects and their remaining availability.
**Trigger:** Actor navigates to the Reports section and selects the Resource Utilization Report.

**Preconditions**
- Actor is authenticated and holds the Admin or Project Manager role.
- At least one assignment record exists in the system.

**Postconditions**
- The Resource Utilization Report is displayed showing each employee's active assignments, combined capacity percentage, and residual availability.
- If no assignment data is available, the system displays an empty state message.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Navigates to the Reports section. |
| 02 | System | Displays the Reports dashboard listing all available report types. |
| 03 | Actor | Selects Resource Utilization Report. |
| 04 | System | Loads all active assignment records and computes each employee's combined capacity percentage. |
| 05 | System | Displays the Resource Utilization Report: a list of employees, each showing their active assignments and combined allocation percentage, and residual availability (100% minus total active allocation). |
| 06 | Actor | Reviews the displayed data. |

---

### Exception Flow

#### EF01 — Report data fails to load

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects failure to retrieve assignment data. |
| 02 | System | Displays an error message indicating the report could not be loaded and prompts the actor to retry. |
| 03 | Actor | Chooses to retry or navigates away. |

> Ends with: error message visible; report data not shown.

---

## UC05.02.01 — View Skill Distribution Report

<!-- feature: F05.02 -->

**Actor:** Admin
**Goal:** View the aggregated distribution of skills and proficiency levels across all employee profiles in the organization.
**Trigger:** Admin navigates to the Reports section and selects the Skill Distribution Report.

**Preconditions**
- Actor is authenticated and holds the Admin role.
- At least one employee skill profile entry exists in the system.

**Postconditions**
- The Skill Distribution Report is displayed showing aggregated skill coverage by category and proficiency level distribution per skill.
- If no skill profile data is available, the system displays an empty state message.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Navigates to the Reports section. |
| 02 | System | Displays the Reports dashboard listing all available report types. |
| 03 | Admin | Selects Skill Distribution Report. |
| 04 | System | Aggregates skill entries across all employee profiles. |
| 05 | System | Displays the Skill Distribution Report: aggregated skill coverage grouped by category and a breakdown of proficiency level distribution per skill. |
| 06 | Admin | Reviews the displayed data. |

---

### Exception Flow

#### EF01 — Report data fails to load

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects failure to retrieve skill profile data. |
| 02 | System | Displays an error message indicating the report could not be loaded and prompts the Admin to retry. |
| 03 | Admin | Chooses to retry or navigates away. |

> Ends with: error message visible; report data not shown.

---

## UC05.03.01 — View Skill Gap Analysis for a Project

<!-- feature: F05.03 -->

**Actor:** Admin, Project Manager
**Goal:** Identify the difference between a project's required skill set and the skills available among its assigned or candidate employees.
**Trigger:** Actor navigates to the Reports section and selects Skill Gap Analysis.

**Preconditions**
- Actor is authenticated and holds the Admin or Project Manager role.
- At least one project with defined skill requirements exists in the system.
- At least one employee skill profile exists in the system.

**Postconditions**
- The Skill Gap Analysis is displayed for the selected project, identifying unfilled skill requirements by name and proficiency shortfall.
- If no gap exists, the system indicates that all skill requirements are covered.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Navigates to the Reports section. |
| 02 | System | Displays the Reports dashboard listing all available report types. |
| 03 | Actor | Selects Skill Gap Analysis. |
| 04 | System | Displays the Skill Gap Analysis screen with a project selection list. |
| 05 | Actor | Selects a project from the list. |
| 06 | System | Compares the selected project's required skills (name and minimum proficiency) against the skill profiles of its assigned employees. |
| 07 | System | Displays the gap analysis results: unfilled skill requirements identified by skill name and proficiency shortfall, or a confirmation that all requirements are covered. |
| 08 | Actor | Reviews the gap analysis results. |

---

### Exception Flow

#### EF01 — Selected project has no skill requirements defined

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects that the selected project has no skill requirements recorded. |
| 02 | System | Displays a message indicating that no skill requirements are defined for this project; gap analysis cannot be performed. |

> Ends with: informational message displayed; no gap analysis results shown.

#### EF02 — Gap analysis data fails to load

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects failure to retrieve project requirements or employee skill data. |
| 02 | System | Displays an error message indicating the analysis could not be completed and prompts the actor to retry. |
| 03 | Actor | Chooses to retry or selects a different project. |

> Ends with: error message visible; gap analysis results not shown.

---

## UC05.04.01 — View Assignment History Report

<!-- feature: F05.04 -->

**Actor:** Admin, Project Manager
**Goal:** View a chronological history of project assignments across the organization, with the ability to filter by employee, project, or date range.
**Trigger:** Actor navigates to the Reports section and selects the Assignment History Report.

**Preconditions**
- Actor is authenticated and holds the Admin or Project Manager role.
- At least one assignment record (past or active) exists in the system.

**Postconditions**
- The Assignment History Report is displayed with a chronological list of assignments including period, capacity, and role details.
- Applied filters, if any, are reflected in the displayed results.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Navigates to the Reports section. |
| 02 | System | Displays the Reports dashboard listing all available report types. |
| 03 | Actor | Selects Assignment History Report. |
| 04 | System | Loads all assignment records (past and active). |
| 05 | System | Displays the Assignment History Report: a chronological list of all assignments showing employee, project, assignment period, capacity percentage, and project role; filter controls are visible. |
| 06 | Actor | Reviews the unfiltered report data. |

---

### Alternate Flow

#### AF01 — Actor filters the report

> Branches from step 05 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Actor | Applies one or more filters: by employee, by project, or by date range. |
| 02 | System | Refreshes the report to display only assignments matching all applied filters. |
| 03 | Actor | Reviews the filtered results. |

> Ends with: filtered assignment history displayed.

---

### Exception Flow

#### EF01 — Report data fails to load

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects failure to retrieve assignment records. |
| 02 | System | Displays an error message indicating the report could not be loaded and prompts the actor to retry. |
| 03 | Actor | Chooses to retry or navigates away. |

> Ends with: error message visible; report data not shown.
