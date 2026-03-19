# Screen List

<!-- source: usecases/*.md, business_rules.md, data_model.md -->
<!-- total: 28 screens -->

---

## Module M01 — User Management

### SCR01 — User List

**Actor:** Admin
**Trigger:** UC01.01.01 step 02 — System displays user list after Admin navigates to User Management; UC01.01.02 step 02 — System displays user list; UC01.02.01 step 02 — System displays user list

**Navigates From**

- Entry point

**Navigates To**

- SCR02 — Account Creation Form — Admin selects option to create a new account
- SCR03 — Account Detail — Admin selects a user from the list

**Data Displayed**

- E01 — User: name, email, role, status

**Constraints**

- BR14 — Account creation and deactivation options visible to Admin only
- BR04 — Inactive accounts are not eligible for modification actions

**States**

- Default — User list loaded with all registered accounts
- Empty — No user accounts exist in the system
- Restricted — Non-Admin actor cannot access account management functions

---

### SCR02 — Account Creation Form

**Actor:** Admin
**Trigger:** UC01.01.01 step 04 — System displays the account creation form with fields for name, email, and initial role

**Navigates From**

- SCR01 — User List

**Navigates To**

- SCR01 — User List — account created successfully or actor cancels

**Data Displayed**

- E01 — User: name, email, role (input fields)

**Constraints**

- BR01 — Duplicate email for an active account blocks submission
- BR02 — Name, email, and role are all required
- BR03 — Email must conform to valid format
- BR33 — Role selector presents exactly three values: Admin, Project Manager, Employee

**States**

- Default — Empty form ready for input
- Error — Inline field-level errors shown on invalid or duplicate-email submission

---

### SCR03 — Account Detail

**Actor:** Admin
**Trigger:** UC01.01.02 step 04 — System displays account details with deactivate option; UC01.02.01 step 04 — System displays account details showing current role; UC01.02.01 step 08 — System displays account details with updated role reflected

**Navigates From**

- SCR01 — User List

**Navigates To**

- SCR04 — Deactivation Confirmation Dialog — Admin selects deactivate action
- SCR01 — User List — after successful deactivation

**Data Displayed**

- E01 — User: name, email, role, status

**Constraints**

- BR04 — Deactivate and role-change actions available only for active accounts
- BR15 — Role assignment controls accessible to Admin only
- BR27 — Role change takes effect on user's next session
- BR33 — Role selector presents exactly three values

**States**

- Default — Account detail showing current name, email, role, and status
- Success — Role updated; page reflects new role value
- Error — Role update could not be saved (UC01.02.01 EF01)

---

### SCR04 — Deactivation Confirmation Dialog

**Actor:** Admin
**Trigger:** UC01.01.02 step 06 — System displays confirmation dialog requesting Admin to confirm the deactivation

**Navigates From**

- SCR03 — Account Detail

**Navigates To**

- SCR03 — Account Detail — Admin confirms or cancels deactivation

**Data Displayed**

- E01 — User: name

**Constraints**

- BR14 — Only Admin role can reach this dialog

**States**

- Default — Dialog shown requesting confirmation of account deactivation

---

## Module M02 — Skill Administration

### SCR05 — Skill Taxonomy

**Actor:** Admin
**Trigger:** UC02.01.01 step 02 — System displays list of all skill categories each showing its associated named skills; UC02.01.01 step 09 — System displays updated skill list for selected category; UC02.01.01 AF03 step 06 — System displays updated skill list and summary of flagged profiles

**Navigates From**

- Entry point

**Navigates To**

- SCR06 — Skill Category Form — Admin initiates creation or rename of a category
- SCR07 — Skill Form — Admin initiates addition of a new named skill to a category
- SCR08 — Skill Removal Confirmation Dialog — Admin initiates removal of a named skill

**Data Displayed**

- E02 — SkillCategory: name
- E03 — Skill: name

**Constraints**

- BR16 — Taxonomy modification controls visible to Admin only
- BR24 — After skill removal, count of flagged employee profiles is displayed

**States**

- Default — All categories with associated named skills listed
- Empty — No skill categories exist in the taxonomy
- Restricted — Non-Admin actor cannot access taxonomy management controls

---

### SCR06 — Skill Category Form

**Actor:** Admin
**Trigger:** UC02.01.01 AF01 step 02 — System displays form to enter new category name; UC02.01.01 AF02 step 02 — System displays form pre-filled with current category name for rename

**Navigates From**

- SCR05 — Skill Taxonomy

**Navigates To**

- SCR05 — Skill Taxonomy — category saved or operation cancelled

**Data Displayed**

- E02 — SkillCategory: name (input field)

**Constraints**

- BR06 — Category name must be unique across the entire taxonomy
- BR16 — Admin only

**States**

- Default — Empty form (create mode) or pre-filled form (rename mode)
- Error — Duplicate category name error displayed on submission

---

### SCR07 — Skill Form

**Actor:** Admin
**Trigger:** UC02.01.01 step 06 — System displays form to enter the new skill name

**Navigates From**

- SCR05 — Skill Taxonomy

**Navigates To**

- SCR05 — Skill Taxonomy — skill saved or operation cancelled

**Data Displayed**

- E02 — SkillCategory: name (context label for selected category)
- E03 — Skill: name (input field)

**Constraints**

- BR05 — Skill name must be unique within the selected category
- BR16 — Admin only

**States**

- Default — Empty form for entering a new skill name
- Error — Duplicate skill name within category error displayed on submission

---

### SCR08 — Skill Removal Confirmation Dialog

**Actor:** Admin
**Trigger:** UC02.01.01 AF03 step 02 — System displays confirmation prompt indicating the number of employee profiles that currently contain this skill

**Navigates From**

- SCR05 — Skill Taxonomy

**Navigates To**

- SCR05 — Skill Taxonomy — Admin confirms or cancels removal

**Data Displayed**

- E03 — Skill: name
- E04 — SkillEntry: count of affected employee profiles (derived)

**Constraints**

- BR24 — Affected profile count must be shown; flagging is automatic on confirm
- BR16 — Admin only

**States**

- Default — Dialog showing skill name and count of affected employee profiles

---

### SCR09 — Employee Skill Profile

**Actor:** Employee, Admin
**Trigger:** UC02.02.01 step 02 — System displays employee's current skill entries grouped by category; UC02.02.02 step 04 — System displays selected employee's skill profile grouped by category; UC02.02.01 step 11 — System displays updated skill profile with new entry visible

**Navigates From**

- Entry point (Employee navigating to own profile)
- SCR01 — User List (Admin selecting an employee)

**Navigates To**

- SCR10 — Skill Entry Form — Actor initiates add or edit of a skill entry
- SCR11 — Skill Entry Removal Confirmation Dialog — Actor initiates removal of a skill entry

**Data Displayed**

- E01 — User: name
- E02 — SkillCategory: name (grouping header)
- E03 — Skill: name
- E04 — SkillEntry: proficiency_level, years_of_experience, is_flagged_for_review

**Constraints**

- BR17 — Employee may only view and edit own profile; Admin may access any profile
- BR24 — Flagged entries (skill removed from taxonomy) are visually indicated
- BR30 — Proficiency displayed on fixed 1–5 scale

**States**

- Default — Skill entries grouped by category with proficiency and experience shown
- Empty — No skill entries on profile yet
- Restricted — Employee cannot access another employee's profile

---

### SCR10 — Skill Entry Form

**Actor:** Employee, Admin
**Trigger:** UC02.02.01 step 04 — System displays form with skill category, skill name, proficiency level, years of experience; UC02.02.01 AF01 step 02 — System displays edit form pre-filled with current values; UC02.02.02 step 06 — System displays same form for Admin adding to employee profile

**Navigates From**

- SCR09 — Employee Skill Profile

**Navigates To**

- SCR09 — Employee Skill Profile — entry saved or cancelled

**Data Displayed**

- E02 — SkillCategory: name (selector)
- E03 — Skill: name (selector filtered by selected category)
- E04 — SkillEntry: proficiency_level, years_of_experience (input fields)

**Constraints**

- BR07 — Proficiency level must be an integer between 1 and 5
- BR08 — Selected skill must exist in the current taxonomy at submission time
- BR30 — Proficiency scale is fixed at 1–5

**States**

- Default — Empty form (add mode) or pre-filled form (edit mode)
- Error — Proficiency out of range or selected skill no longer in taxonomy

---

### SCR11 — Skill Entry Removal Confirmation Dialog

**Actor:** Employee, Admin
**Trigger:** UC02.02.01 AF02 step 02 — System displays confirmation prompt for skill entry removal; UC02.02.02 AF02 step 02 — System displays confirmation prompt (Admin acting on behalf)

**Navigates From**

- SCR09 — Employee Skill Profile

**Navigates To**

- SCR09 — Employee Skill Profile — Actor confirms or cancels removal

**Data Displayed**

- E03 — Skill: name
- E04 — SkillEntry: proficiency_level

**Constraints**

- BR17 — Employee may only remove entries from own profile

**States**

- Default — Dialog requesting confirmation of skill entry removal

---

## Module M03 — Project Registry

### SCR12 — Project Registry

**Actor:** Project Manager, Admin
**Trigger:** UC03.01.01 step 02 — System displays the Project Registry page listing existing projects with an option to create a new project

**Navigates From**

- Entry point

**Navigates To**

- SCR13 — Project Form — Actor selects option to create a new project
- SCR14 — Project Detail — Actor opens an existing project record

**Data Displayed**

- E06 — Project: name, status, start_date, end_date

**Constraints**

- BR18 — Create project option visible to Project Manager and Admin only

**States**

- Default — List of all projects in the registry
- Empty — No projects have been created yet
- Restricted — Employee actor cannot access project creation or modification

---

### SCR13 — Project Form

**Actor:** Project Manager, Admin
**Trigger:** UC03.01.01 step 04 — System displays project creation form; UC03.01.02 step 04 — System displays project metadata edit form pre-filled with current values

**Navigates From**

- SCR12 — Project Registry (create flow)
- SCR14 — Project Detail (edit flow)

**Navigates To**

- SCR14 — Project Detail — project created or saved successfully
- SCR12 — Project Registry — Actor cancels during creation

**Data Displayed**

- E06 — Project: name, description, status, start_date, end_date (input fields)

**Constraints**

- BR09 — Name, status, and start date are required fields
- BR18 — Accessible to Project Manager and Admin only

**States**

- Default — Empty form (create mode) or pre-filled form (edit mode)
- Error — Required field missing; inline errors displayed on submission

---

### SCR14 — Project Detail

**Actor:** Project Manager, Admin
**Trigger:** UC03.01.01 step 07 — System displays new project detail page; UC03.01.02 step 02 — System displays project detail page with current metadata; UC03.02.01 step 05 — System displays updated skill requirements list; UC03.02.02 step 06 — System displays refreshed skill requirements list; UC03.02.03 step 06 — System displays updated skill requirements list

**Navigates From**

- SCR12 — Project Registry
- SCR13 — Project Form (after create or edit)

**Navigates To**

- SCR13 — Project Form — Actor initiates edit of project metadata
- SCR15 — Skill Requirement Form — Actor initiates add or edit of a skill requirement
- SCR16 — Skill Requirement Removal Confirmation Dialog — Actor initiates removal of a skill requirement

**Data Displayed**

- E06 — Project: name, description, status, start_date, end_date
- E07 — ProjectSkillRequirement: minimum_proficiency_level
- E03 — Skill: name (linked from skill requirement)

**Constraints**

- BR18 — Edit and skill requirement management controls visible to Project Manager and Admin only
- BR10 — Skill requirements reference only taxonomy-valid skills
- BR11 — Each skill appears at most once in the requirements list
- BR09 — Required fields enforced on metadata edit

**States**

- Default — Project metadata and skill requirements list loaded
- Empty — No skill requirements defined; skill requirements section shows empty state

---

### SCR15 — Skill Requirement Form

**Actor:** Project Manager, Admin
**Trigger:** UC03.02.01 step 02 — System displays skill requirement form with skill selector and minimum proficiency level selector; UC03.02.02 step 04 — System displays skill requirement edit form pre-filled with current minimum proficiency level

**Navigates From**

- SCR14 — Project Detail

**Navigates To**

- SCR14 — Project Detail — requirement saved or cancelled

**Data Displayed**

- E02 — SkillCategory: name (selector for filtering skills)
- E03 — Skill: name (selector populated from taxonomy)
- E07 — ProjectSkillRequirement: minimum_proficiency_level (input field)

**Constraints**

- BR10 — Skill selector only includes taxonomy-valid skills
- BR11 — Duplicate skill requirement blocked on submission
- BR07 — Proficiency level must be between 1 and 5
- BR30 — Proficiency scale fixed at 1–5

**States**

- Default — Empty form (add mode) or pre-filled form (edit mode)
- Error — Duplicate skill requirement or invalid proficiency level

---

### SCR16 — Skill Requirement Removal Confirmation Dialog

**Actor:** Project Manager, Admin
**Trigger:** UC03.02.03 step 04 — System displays confirmation prompt asking actor to confirm the removal

**Navigates From**

- SCR14 — Project Detail

**Navigates To**

- SCR14 — Project Detail — Actor confirms or cancels

**Data Displayed**

- E03 — Skill: name
- E07 — ProjectSkillRequirement: minimum_proficiency_level

**Constraints**

- BR18 — Accessible to Project Manager and Admin only

**States**

- Default — Dialog requesting confirmation of skill requirement removal

---

## Module M04 — Staffing

### SCR17 — Talent Pool

**Actor:** Project Manager
**Trigger:** UC04.01.01 step 02 — System displays skill-based search interface with skill name and optional proficiency filter fields; UC04.01.01 step 07 — System displays ranked or filtered list of matching employees with skill entries and residual availability

**Navigates From**

- Entry point

**Navigates To**

- SCR18 — Project Staffing — Project Manager selects a candidate employee and initiates an assignment

**Data Displayed**

- E01 — User: name
- E03 — Skill: name (search filter input and result display)
- E04 — SkillEntry: proficiency_level
- E08 — Assignment: capacity_percentage (used to derive residual availability)

**Constraints**

- BR19 — Accessible to Project Manager only
- BR28 — Residual availability displayed as 100% minus sum of active allocation percentages
- BR30 — Proficiency filter uses fixed 1–5 scale

**States**

- Default — Search form displayed with no results (initial state before first search)
- Empty — No employees match the specified criteria (UC04.01.01 EF01)
- Restricted — Non-Project Manager cannot access Talent Pool

---

### SCR18 — Project Staffing

**Actor:** Project Manager
**Trigger:** UC04.02.01 step 02 — System displays project's current active assignments and option to add a new assignment; UC04.02.02 step 02 — System displays list of active assignments on the project; UC04.02.01 step 07 — System displays refreshed staffing view including new assignment; UC04.02.02 step 06 — System displays refreshed staffing view with assignment removed

**Navigates From**

- SCR17 — Talent Pool (selecting a candidate employee)
- Entry point

**Navigates To**

- SCR19 — Assignment Form — Project Manager initiates a new assignment
- SCR21 — Unassignment Confirmation Dialog — Project Manager initiates removal of an assignment

**Data Displayed**

- E06 — Project: name
- E01 — User: name (assigned employee)
- E08 — Assignment: start_date, end_date, capacity_percentage, project_role, status

**Constraints**

- BR19 — Accessible to Project Manager only
- BR26 — Over-allocation warning triggered during assignment creation when total exceeds 100%

**States**

- Default — Active assignment list for the project
- Empty — No active assignments on this project yet
- Restricted — Non-Project Manager cannot manage assignments

---

### SCR19 — Assignment Form

**Actor:** Project Manager
**Trigger:** UC04.02.01 step 04 — System displays assignment creation form with fields for start date, optional end date, capacity percentage, and project role

**Navigates From**

- SCR18 — Project Staffing

**Navigates To**

- SCR20 — Over-Allocation Warning Dialog — submitted assignment would cause over-allocation (UC04.02.01 AF01)
- SCR18 — Project Staffing — assignment created successfully or actor cancels

**Data Displayed**

- E01 — User: name (employee being assigned)
- E08 — Assignment: start_date, end_date, capacity_percentage, project_role (input fields)

**Constraints**

- BR12 — Start date, capacity percentage, and project role are required
- BR13 — End date must be after start date when provided
- BR26 — System checks total allocation against 100% threshold before creating assignment

**States**

- Default — Empty form ready for input
- Error — Required fields missing, invalid date range, or capacity value out of range

---

### SCR20 — Over-Allocation Warning Dialog

**Actor:** Project Manager
**Trigger:** UC04.02.01 AF01 step 02 — System displays warning indicating employee would be over-allocated, showing current and resulting allocation percentages

**Navigates From**

- SCR19 — Assignment Form

**Navigates To**

- SCR18 — Project Staffing — Project Manager acknowledges warning and confirms assignment
- SCR19 — Assignment Form — Project Manager cancels

**Data Displayed**

- E01 — User: name
- E08 — Assignment: capacity_percentage (current total and projected total after new assignment)

**Constraints**

- BR26 — Both current and resulting allocation percentages must be shown; PM may confirm or cancel

**States**

- Default — Warning dialog showing over-allocation with current and projected allocation percentages

---

### SCR21 — Unassignment Confirmation Dialog

**Actor:** Project Manager
**Trigger:** UC04.02.02 step 04 — System displays confirmation prompt asking Project Manager to confirm the unassignment

**Navigates From**

- SCR18 — Project Staffing

**Navigates To**

- SCR18 — Project Staffing — Project Manager confirms or cancels

**Data Displayed**

- E01 — User: name
- E06 — Project: name
- E08 — Assignment: project_role, start_date

**Constraints**

- BR19 — Accessible to Project Manager only

**States**

- Default — Dialog requesting confirmation of assignment removal
- Error — Assignment no longer active at time of removal (UC04.02.02 EF01); staffing view refreshed

---

## Module M05 — Reporting

### SCR22 — Resource Utilization Report

**Actor:** Admin, Project Manager
**Trigger:** UC05.01.01 step 02 — System displays report listing all employees with active assignments, combined allocation percentage, and residual availability

**Navigates From**

- Entry point

**Navigates To**

- SCR23 — Employee Utilization Detail — Actor selects an employee entry to view breakdown

**Data Displayed**

- E01 — User: name
- E08 — Assignment: capacity_percentage (aggregated per employee)
- E06 — Project: name (for filter options)

**Constraints**

- BR20 — Accessible to Admin and Project Manager only
- BR28 — Residual availability = 100% minus sum of active assignment capacity percentages

**States**

- Default — Full report listing all employees with allocation summary and residual availability
- Empty — No assignment records exist in the system (UC05.01.01 EF01)
- Restricted — Employee role cannot access this report

---

### SCR23 — Employee Utilization Detail

**Actor:** Admin, Project Manager
**Trigger:** UC05.01.01 step 06 — System displays selected employee's active assignments with project name, assignment period, capacity percentage, and role

**Navigates From**

- SCR22 — Resource Utilization Report

**Data Displayed**

- E01 — User: name
- E08 — Assignment: start_date, end_date, capacity_percentage, project_role
- E06 — Project: name

**Constraints**

- BR20 — Accessible to Admin and Project Manager only
- BR28 — Total allocation and residual availability derived from listed assignments

**States**

- Default — All active assignments for the selected employee listed with period, capacity, and role

---

### SCR24 — Skill Distribution Report

**Actor:** Admin
**Trigger:** UC05.02.01 step 02 — System displays aggregated skill coverage grouped by category, showing number of distinct skills and employees per category

**Navigates From**

- Entry point

**Navigates To**

- SCR25 — Skill Distribution Category Detail — Admin selects a skill category to drill down

**Data Displayed**

- E02 — SkillCategory: name
- E03 — Skill: name, count per category
- E01 — User: employee count per category
- E04 — SkillEntry: proficiency_level (aggregated counts)

**Constraints**

- BR21 — Accessible to Admin only
- BR30 — Proficiency displayed on fixed 1–5 scale

**States**

- Default — Aggregated category list with skill and employee counts
- Empty — No employee skill entries exist in the system (UC05.02.01 EF01)
- Restricted — Project Manager and Employee cannot access this report

---

### SCR25 — Skill Distribution Category Detail

**Actor:** Admin
**Trigger:** UC05.02.01 step 04 — System displays proficiency level distribution (1–5) for each skill within the selected category, including employee count per level

**Navigates From**

- SCR24 — Skill Distribution Report

**Data Displayed**

- E02 — SkillCategory: name
- E03 — Skill: name
- E04 — SkillEntry: proficiency_level (employee count per level)

**Constraints**

- BR21 — Accessible to Admin only
- BR30 — Proficiency distribution displayed across fixed 1–5 scale

**States**

- Default — Proficiency distribution per skill shown for the selected category

---

### SCR26 — Skill Gap Analysis

**Actor:** Admin, Project Manager
**Trigger:** UC05.03.01 step 02 — System displays a list of available projects for gap analysis selection

**Navigates From**

- Entry point

**Navigates To**

- SCR27 — Skill Gap Analysis Detail — Actor selects a project to analyze

**Data Displayed**

- E06 — Project: name, status

**Constraints**

- BR22 — Accessible to Admin and Project Manager only

**States**

- Default — List of projects available for gap analysis selection
- Restricted — Employee cannot access Skill Gap Analysis

---

### SCR27 — Skill Gap Analysis Detail

**Actor:** Admin, Project Manager
**Trigger:** UC05.03.01 step 04 — System displays gap analysis listing each required skill with minimum proficiency required, coverage status, and proficiency shortfall where applicable

**Navigates From**

- SCR26 — Skill Gap Analysis

**Data Displayed**

- E06 — Project: name
- E07 — ProjectSkillRequirement: minimum_proficiency_level
- E03 — Skill: name
- E04 — SkillEntry: proficiency_level (used in gap comparison)

**Constraints**

- BR22 — Accessible to Admin and Project Manager only
- BR29 — Skill gap identified when no employee meets minimum proficiency threshold per required skill
- BR30 — Proficiency comparison uses fixed 1–5 scale

**States**

- Default — Gap analysis showing each required skill with met/unmet coverage status and shortfall
- Empty — Selected project has no skill requirements defined (UC05.03.01 EF01); message displayed
- Success — All skill requirements are fully covered (UC05.03.01 AF01); all requirements shown as covered

---

### SCR28 — Assignment History Report

**Actor:** Admin, Project Manager
**Trigger:** UC05.04.01 step 02 — System displays chronological list of all assignment records showing employee name, project name, assignment period, capacity percentage, and project role

**Navigates From**

- Entry point

**Data Displayed**

- E08 — Assignment: start_date, end_date, capacity_percentage, project_role, status
- E01 — User: name
- E06 — Project: name

**Constraints**

- BR23 — Accessible to Admin and Project Manager only

**States**

- Default — Full chronological list of assignment records with optional filter applied
- Empty — No assignment records exist or no records match the applied filter (UC05.04.01 EF01, EF02)
- Restricted — Employee cannot access Assignment History Report
