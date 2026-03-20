# M05 — Reporting

<!-- source: 03_usecases/M05_reporting.md, 04_business_rules.md, 05_data_model.md -->
<!-- module: M05 -->
<!-- screens: SCR24, SCR25, SCR26, SCR27, SCR28 -->

---

### SCR24 — Reports Dashboard `screen`

**Actor:** Admin, Project Manager
**Trigger:**
- UC05.01.01 step 02 — System displays the Reports dashboard listing all available report types
- UC05.02.01 step 02 — System displays the Reports dashboard listing all available report types
- UC05.03.01 step 02 — System displays the Reports dashboard listing all available report types
- UC05.04.01 step 02 — System displays the Reports dashboard listing all available report types

**Navigates From**
- Entry point

**Navigates To**
- SCR25 — Resource Utilization Report — Actor selects Resource Utilization Report
- SCR26 — Skill Distribution Report — Admin selects Skill Distribution Report
- SCR27 — Skill Gap Analysis — Actor selects Skill Gap Analysis
- SCR28 — Assignment History Report — Actor selects Assignment History Report

**Data Displayed**
- *(No entity data; displays list of available report types determined by actor role)*

**Constraints**
- BR20 — Resource Utilization Report entry is visible only to Admin and Project Manager actors
- BR21 — Skill Distribution Report entry is visible only to Admin actors
- BR22 — Skill Gap Analysis entry is visible only to Admin and Project Manager actors
- BR23 — Assignment History Report entry is visible only to Admin and Project Manager actors

**States**
- Default — Dashboard loaded; available report types listed according to actor's role
- Restricted — Employee actors have no accessible report entries on this screen

---

### SCR25 — Resource Utilization Report `screen`

**Actor:** Admin, Project Manager
**Trigger:** UC05.01.01 step 05 — System displays the Resource Utilization Report showing employees with active assignments, combined allocation percentage, and residual availability

**Navigates From**
- SCR24 — Reports Dashboard

**Data Displayed**
- E01 — User: name
- E06 — Project: name
- E08 — Assignment: capacity_percentage, project_role, status (active assignments per employee)
- *(Computed)* Residual availability per employee (derived from BR28)

**Constraints**
- BR20 — Only Admin and Project Manager may access this screen; Employee role is blocked
- BR28 — Residual availability displayed as 100% minus sum of all active assignment capacity percentages

**States**
- Default — Report loaded; list of employees each showing active assignments, combined allocation, and residual availability
- Empty — No active assignment records exist; empty state message displayed
- Loading — Assignment records being fetched and computed
- Error — Failure to retrieve assignment data; error message displayed with retry prompt (EF01)
- Restricted — Employee actors cannot access this screen

---

### SCR26 — Skill Distribution Report `screen`

**Actor:** Admin
**Trigger:** UC05.02.01 step 05 — System displays the Skill Distribution Report showing aggregated skill coverage by category and proficiency level distribution per skill

**Navigates From**
- SCR24 — Reports Dashboard

**Data Displayed**
- E02 — SkillCategory: name
- E03 — Skill: name
- E04 — SkillEntry: proficiency_level (aggregated across all employee profiles)

**Constraints**
- BR21 — Only Admin may access this screen; Project Manager and Employee roles are blocked
- BR30 — Proficiency distribution displayed on the fixed 1–5 integer scale

**States**
- Default — Report loaded; skills grouped by category with proficiency level distribution per skill
- Empty — No employee skill profile entries exist; empty state message displayed
- Loading — Skill entries being aggregated across all profiles
- Error — Failure to retrieve skill profile data; error message displayed with retry prompt (EF01)
- Restricted — Project Manager and Employee actors cannot access this screen

---

### SCR27 — Skill Gap Analysis `screen`

**Actor:** Admin, Project Manager
**Trigger:**
- UC05.03.01 step 04 — System displays the Skill Gap Analysis screen with a project selection list
- UC05.03.01 step 07 — System displays gap analysis results for the selected project

**Navigates From**
- SCR24 — Reports Dashboard

**Data Displayed**
- E06 — Project: name, status (project selection list)
- E07 — ProjectSkillRequirement: minimum_proficiency_level
- E03 — Skill: name (required skills and gap identification)
- E04 — SkillEntry: proficiency_level (compared against project requirements)

**Constraints**
- BR22 — Only Admin and Project Manager may access this screen; Employee role is blocked
- BR29 — Gap results show unmet skill requirements with proficiency shortfall per requirement
- BR30 — Proficiency shortfall computed and displayed on the fixed 1–5 scale

**States**
- Default — Project selection list shown; after selection, gap analysis results displayed (covered or unfilled requirements per skill)
- Empty — Selected project has no skill requirements defined; informational message displayed (EF01)
- Loading — Gap analysis data being computed after project selection
- Error — Failure to retrieve project requirements or employee skill data; error message displayed with retry prompt (EF02)
- Restricted — Employee actors cannot access this screen

---

### SCR28 — Assignment History Report `screen`

**Actor:** Admin, Project Manager
**Trigger:** UC05.04.01 step 05 — System displays the Assignment History Report as a chronological list of all assignments with filter controls visible

**Navigates From**
- SCR24 — Reports Dashboard

**Data Displayed**
- E01 — User: name
- E06 — Project: name
- E08 — Assignment: start_date, end_date, capacity_percentage, project_role, status

**Constraints**
- BR23 — Only Admin and Project Manager may access this screen; Employee role is blocked

**States**
- Default — Full chronological assignment list displayed; filter controls (by employee, project, date range) visible
- Empty — No assignment records match the applied filters; empty state displayed
- Loading — Assignment records being fetched
- Error — Failure to retrieve assignment records; error message displayed with retry prompt (EF01)
- Restricted — Employee actors cannot access this screen
