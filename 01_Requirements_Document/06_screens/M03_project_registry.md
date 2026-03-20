# M03 — Project Registry

<!-- source: 03_usecases/M03_project_registry.md, 04_business_rules.md, 05_data_model.md -->
<!-- module: M03 -->
<!-- screens: SCR14, SCR15, SCR16, SCR17, SCR18, SCR19 -->

---

### SCR14 — Project List `screen`

**Actor:** Project Manager, Admin
**Trigger:** UC03.01.01 step 02 — System displays the project list screen showing all existing project records
**Trigger:** UC03.01.02 step 02 — System displays the project list screen

**Navigates From**
- Entry point

**Navigates To**
- SCR15 — New Project Form — Actor initiates creation of a new project
- SCR16 — Project Detail — Actor selects an existing project from the list

**Data Displayed**
- E06 — Project: name, status, start_date, end_date

**Constraints**
- BR18 — only Project Manager and Admin actors may access project registry screens; Employee role is restricted

**States**
- Default — project list shown with existing records
- Empty — no projects exist in the system
- Loading — project records are being fetched
- Restricted — Employee actor has no access to this screen

---

### SCR15 — New Project Form `screen`

**Actor:** Project Manager, Admin
**Trigger:** UC03.01.01 step 04 — System displays the new project creation form with fields for name, description, status, and timeline

**Navigates From**
- SCR14 — Project List

**Navigates To**
- SCR16 — Project Detail — System creates project record and displays project detail after successful submission

**Data Displayed**
- E06 — Project: name, description, status, start_date, end_date (input fields)

**Constraints**
- BR09 — name, status, and start_date must be provided before submission is accepted
- BR18 — only Project Manager and Admin may access this screen

**States**
- Default — empty form ready for input
- Error — inline error indicators shown after validation failure (EF01 of UC03.01.01)
- Restricted — Employee actor has no access to this screen

---

### SCR16 — Project Detail `screen`

**Actor:** Project Manager, Admin
**Trigger:** UC03.01.01 step 08 — System creates the project record and displays the project detail screen with a confirmation notice
**Trigger:** UC03.01.02 step 04 — System displays the project detail screen showing the current metadata
**Trigger:** UC03.02.01 step 02 — System displays the project detail screen including the skill requirements section
**Trigger:** UC03.02.02 step 02 — System displays the project detail screen with the current skill requirements list

**Navigates From**
- SCR14 — Project List
- SCR15 — New Project Form
- SCR17 — Project Edit Form
- SCR18 — Skill Requirement Form
- SCR19 — Remove Skill Requirement Confirmation

**Navigates To**
- SCR17 — Project Edit Form — Actor initiates editing of project metadata
- SCR18 — Skill Requirement Form — Actor initiates add or modify skill requirement
- SCR19 — Remove Skill Requirement Confirmation — Actor initiates remove skill requirement action
- SCR23 (M04) — Unassignment Confirmation — Project Manager selects an active assignment to remove from project detail

**Data Displayed**
- E06 — Project: name, description, status, start_date, end_date
- E07 — ProjectSkillRequirement: minimum_proficiency_level
- E03 — Skill: name (for each skill requirement entry)
- E08 — Assignment: start_date, end_date, capacity_percentage, project_role, status

**Constraints**
- BR18 — create, update, and skill requirement management actions are exposed only to Project Manager and Admin
- BR07 — proficiency levels displayed on skill requirements are within the 1–5 range
- BR30 — proficiency scale is fixed at 1–5; not configurable

**States**
- Default — project metadata, skill requirements list, and assignments list shown
- Loading — project data is being fetched
- Success — confirmation notice shown after metadata update (UC03.01.02) or skill requirement change (UC03.02.01, UC03.02.02)
- Restricted — Employee actor cannot access modification actions

---

### SCR17 — Project Edit Form `screen`

**Actor:** Project Manager, Admin
**Trigger:** UC03.01.02 step 06 — System displays the project metadata edit form pre-filled with the current values

**Navigates From**
- SCR16 — Project Detail

**Navigates To**
- SCR16 — Project Detail — Actor submits or cancels the project edit form

**Data Displayed**
- E06 — Project: name, description, status, start_date, end_date (pre-filled with current values)

**Constraints**
- BR09 — name, status, and start_date must remain non-empty on submission
- BR18 — only Project Manager and Admin may access this screen

**States**
- Default — form pre-filled with current project metadata
- Error — inline error indicators shown after validation failure (EF01 of UC03.01.02)
- Restricted — Employee actor has no access to this screen

---

### SCR18 — Skill Requirement Form `screen`

**Actor:** Project Manager, Admin
**Trigger:** UC03.02.01 step 04 — System displays the skill requirement entry form with a skill selector and a minimum proficiency level selector
**Trigger:** UC03.02.02 step 04 — System displays the skill requirement edit form pre-filled with the current skill name and minimum proficiency level

**Navigates From**
- SCR16 — Project Detail

**Navigates To**
- SCR16 — Project Detail — Actor submits or cancels the skill requirement form

**Data Displayed**
- E03 — Skill: name (selector populated from current taxonomy)
- E07 — ProjectSkillRequirement: minimum_proficiency_level

**Constraints**
- BR07 — submitted proficiency level must be an integer between 1 and 5
- BR10 — selected skill must exist in the current taxonomy at time of submission
- BR11 — each skill may appear at most once in the project's skill requirements list
- BR30 — proficiency scale is fixed at 1–5

**States**
- Default — form with skill selector and proficiency level selector (add mode: empty; edit mode: pre-filled)
- Error — inline error shown when taxonomy validation fails (EF01 of UC03.02.01) or proficiency is out of range (EF01 of UC03.02.02)
- Restricted — Employee actor has no access to this screen

---

### SCR19 — Remove Skill Requirement Confirmation `dialog`

**Actor:** Project Manager, Admin
**Trigger:** UC03.02.02 AF01 step 02 — System displays a confirmation dialog identifying the skill requirement to be removed

**Navigates From**
- SCR16 — Project Detail

**Navigates To**
- SCR16 — Project Detail — Actor confirms or cancels the skill requirement removal

**Data Displayed**
- E03 — Skill: name (identifying the skill requirement to be removed)
- E07 — ProjectSkillRequirement: minimum_proficiency_level (identifying the entry to be removed)

**Constraints**
- BR18 — only Project Manager and Admin actors may initiate this action

**States**
- Default — confirmation dialog shown with the identified skill requirement
- Restricted — Employee actor has no access to this dialog
