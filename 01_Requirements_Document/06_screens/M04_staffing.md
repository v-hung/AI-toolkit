# M04 — Staffing

<!-- source: 03_usecases/M04_staffing.md, 04_business_rules.md, 05_data_model.md -->
<!-- module: M04 -->
<!-- screens: SCR20, SCR21, SCR22, SCR23 -->

---

### SCR20 — Talent Search `screen`

**Actor:** Project Manager
**Trigger:**
- UC04.01.01 Main Flow step 01–02 — Project Manager navigates to Talent Search; system displays skill filter form and empty results area
- UC04.01.01 AF02 step 01–02 — Project Manager returns from selected employee profile view; system redisplays list with prior filter active
- UC04.02.01 AF01 step 01–02 — Project Manager cancels assignment creation; system returns to this screen without creating a record

**Navigates From**
- Entry point

**Navigates To**
- SCR21 — Assignment Creation — Project Manager selects a candidate and initiates assignment creation

**Data Displayed**
- E01 — User: name, resource availability percentage (computed from active assignments)
- E02 — SkillCategory: name (in filter dropdown)
- E03 — Skill: name (in filter dropdown, and matched skills on result rows)
- E04 — SkillEntry: proficiency_level (matched skills shown on result rows)
- E08 — Assignment: capacity_percentage, status (used to compute and display current availability; shown in employee profile summary when an employee is selected)

**Constraints**
- BR19 — Talent Pool search is accessible to Project Manager role only; Admin and Employee actors cannot access this screen
- BR30 — Proficiency filter values are constrained to the 1–5 integer scale; no other values are valid filter inputs

**States**
- Default — Filter form visible; Talent Pool list showing employees matching submitted criteria with skill summaries and availability percentages
- Empty — "No results found" message displayed when no employee profiles satisfy the submitted criteria (EF01); filter form remains editable
- Loading — System is querying employee skill profiles against submitted criteria (between step 04 and step 06 of Main Flow)
- Restricted — Screen is not exposed to actors without the Project Manager role (BR19)

---

### SCR21 — Assignment Creation `screen`

**Actor:** Project Manager
**Trigger:**
- UC04.02.01 Main Flow step 03–04 — Project Manager initiates assignment creation from the selected candidate's profile; system displays this screen pre-populated with the selected employee and a list of available projects

**Navigates From**
- SCR20 — Talent Search

**Navigates To**
- SCR22 — Assignment Confirmation — System successfully creates the assignment record (Main Flow step 09)
- SCR20 — Talent Search — Project Manager cancels assignment creation before submission (AF01)

**Data Displayed**
- E01 — User: name (pre-populated; identifies the selected candidate)
- E06 — Project: name, status (project selection list showing available projects)
- E08 — Assignment: start_date, end_date, capacity_percentage, project_role (editable form fields)

**Constraints**
- BR12 — Start date, capacity percentage, and project role are required; capacity must be a positive numeric value
- BR13 — End date, when provided, must be after the start date
- BR19 — Assignment creation is accessible to Project Manager role only
- BR26 — System must warn Project Manager when the submitted capacity would cause the employee's total active allocation to exceed 100%; warning shows current and projected percentages; Project Manager may still proceed after acknowledgment

**States**
- Default — Form displayed with selected employee pre-populated, project selection list visible, assignment detail fields empty
- Error — Inline validation error messages shown on affected fields when required fields are missing, date range is invalid, or a conflicting active assignment is detected (EF01, EF02); form remains open with entered data preserved
- Restricted — Screen is not exposed to actors without the Project Manager role (BR19)

---

### SCR22 — Assignment Confirmation `screen`

**Actor:** Project Manager
**Trigger:**
- UC04.02.01 Main Flow step 09 — System creates the assignment record and displays this screen with the recorded assignment details

**Navigates From**
- SCR21 — Assignment Creation

**Data Displayed**
- E01 — User: name (the assigned employee)
- E06 — Project: name (the target project)
- E08 — Assignment: start_date, end_date, capacity_percentage, project_role, status

**Constraints**
- BR19 — Screen is accessible to Project Manager role only

**States**
- Default — Confirmed assignment details displayed with a success notification; reflects the persisted record including updated employee availability

---

### SCR23 — Unassignment Confirmation `dialog`

**Actor:** Project Manager
**Trigger:**
- UC04.02.02 Main Flow step 03–04 — Project Manager selects an active assignment to remove; system displays this confirmation dialog showing employee name, project name, and assignment period

**Navigates From**
- SCR16 — Project Detail (cross-module: Project Manager selects an active assignment from project detail)

**Navigates To**
- SCR16 — Project Detail — Project Manager confirms unassignment (dialog closed; success notification shown) or cancels (dialog dismissed; assignment unchanged)

**Data Displayed**
- E01 — User: name (employee being unassigned)
- E06 — Project: name (project the employee is being removed from)
- E08 — Assignment: start_date, end_date (assignment period shown for identification)

**Constraints**
- BR19 — Unassignment action is accessible to Project Manager role only

**States**
- Default — Dialog shows employee name, project name, and assignment period awaiting confirmation or cancellation
- Success — Assignment record closed; dialog dismissed and previous screen reloaded with success notification (Main Flow step 06)
