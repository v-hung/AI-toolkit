# Business Rules

<!-- source: 03_usecases/*.md, 02_features.md -->
<!-- total: 34 rules -->

---

## Validation Rules

### BR01 — Unique email per active account

**Category:** VAL
**Applies To:** F01.01
**Source:** UC01.01.01 AF01, UC01.01.01 Preconditions

**Condition**
When Admin submits the account creation form with an email address.

**Constraint**
The submitted email address must not already be associated with an active account in the system.

**Violation Response**
System blocks account creation and notifies Admin that an account already exists for the submitted email address.

---

### BR02 — Account creation required fields

**Category:** VAL
**Applies To:** F01.01
**Source:** UC01.01.01 EF01

**Condition**
When Admin submits the account creation form.

**Constraint**
Name, email address, and initial role must all be provided and non-empty.

**Violation Response**
System displays field-level error messages indicating which required fields are missing; no account is created.

---

### BR03 — Valid email format

**Category:** VAL
**Applies To:** F01.01
**Source:** UC01.01.01 EF01

**Condition**
When Admin submits an email address in the account creation form.

**Constraint**
The submitted email address must conform to a valid email format.

**Violation Response**
System displays a field-level error on the email field indicating the value is not a valid email address; no account is created.

---

### BR04 — Target account must be active for modification

**Category:** VAL
**Applies To:** F01.01, F01.02
**Source:** UC01.01.02 Preconditions, UC01.02.01 Preconditions

**Condition**
When Admin initiates a deactivation or role-change action on a user account.

**Constraint**
The target user account must currently be in an active state.

**Violation Response**
System does not present the deactivation or role-change option for inactive accounts; inactive accounts are not eligible for these operations.

---

### BR05 — Skill name unique within category

**Category:** VAL
**Applies To:** F02.01
**Source:** UC02.01.01 EF01, UC02.01.01 Main Flow step 08

**Condition**
When Admin submits a new named skill to be added to a skill category.

**Constraint**
The submitted skill name must not already exist within the selected category.

**Violation Response**
System displays an error message indicating the skill name is already present in the category; no new skill entry is saved.

---

### BR06 — Category name unique across taxonomy

**Category:** VAL
**Applies To:** F02.01
**Source:** UC02.01.01 EF02, UC02.01.01 AF01 step 04, UC02.01.01 AF02 step 04

**Condition**
When Admin submits a new category name (creation or rename).

**Constraint**
The submitted category name must not already exist in the taxonomy.

**Violation Response**
System displays an error message indicating the category name is already in use; no category is created or renamed.

---

### BR07 — Proficiency level within 1–5 range

**Category:** VAL
**Applies To:** F02.02, F03.02
**Source:** UC02.02.01 EF01, UC02.02.02 EF01, UC02.02.01 Main Flow step 08, UC02.02.02 Main Flow step 10

**Condition**
When an actor submits a proficiency level value on a skill entry form (profile update or project skill requirement).

**Constraint**
The proficiency level must be an integer value between 1 and 5 inclusive.

**Violation Response**
System displays an error message indicating the proficiency level must be between 1 and 5; no changes are saved.

---

### BR08 — Skill must exist in current taxonomy

**Category:** VAL
**Applies To:** F02.02
**Source:** UC02.02.01 EF02, UC02.02.02 EF02, UC02.02.01 Main Flow step 08

**Condition**
When an actor submits a skill entry for addition or modification on an employee skill profile.

**Constraint**
The selected skill name must exist in the current taxonomy at the time of submission.

**Violation Response**
System displays an error message indicating the selected skill is no longer available in the taxonomy and refreshes the available skill list; no changes are saved.

---

### BR09 — Project creation required fields

**Category:** VAL
**Applies To:** F03.01
**Source:** UC03.01.01 EF01, UC03.01.02 EF01, UC03.01.01 Main Flow step 06

**Condition**
When an actor submits the project creation or metadata update form.

**Constraint**
Project name, status, and start date must all be provided and non-empty.

**Violation Response**
System displays the form again with inline error messages identifying each missing required field; no record is created or updated.

---

### BR10 — Project skill requirement must exist in taxonomy

**Category:** VAL
**Applies To:** F03.02
**Source:** UC03.02.01 Main Flow step 04, UC03.02.01 Preconditions

**Condition**
When an actor selects a skill to attach as a requirement to a project.

**Constraint**
The selected skill must exist in the current organization skill taxonomy.

**Violation Response**
System prevents submission of a skill requirement referencing a skill not present in the taxonomy.

---

### BR11 — Skill requirement unique per project

**Category:** VAL
**Applies To:** F03.02
**Source:** UC03.02.01 EF01

**Condition**
When an actor attempts to add a skill as a requirement to a project.

**Constraint**
Each skill may appear at most once in a project's skill requirements list.

**Violation Response**
System displays an error message indicating the skill is already defined as a requirement for this project; prompts actor to select a different skill or cancel.

---

### BR12 — Assignment required fields

**Category:** VAL
**Applies To:** F04.02
**Source:** UC04.02.01 EF01

**Condition**
When Project Manager submits the assignment creation form.

**Constraint**
Start date, capacity percentage, and project role must all be provided and non-empty. Capacity percentage must be a positive numeric value.

**Violation Response**
System displays the assignment form with inline validation errors on all affected fields; no assignment record is created.

---

### BR13 — Assignment date range validity

**Category:** VAL
**Applies To:** F04.02
**Source:** UC04.02.01 EF01

**Condition**
When Project Manager submits an assignment creation form with both a start date and an end date.

**Constraint**
The end date must be after the start date.

**Violation Response**
System displays an inline validation error on the end date field; no assignment record is created.

---

## Permission Rules

### BR14 — Account management restricted to Admin

**Category:** PRM
**Applies To:** F01.01
**Source:** UC01.01.01 Preconditions, UC01.01.02 Preconditions

**Condition**
When any actor attempts to create or deactivate a user account.

**Constraint**
Only actors holding the Admin role may create or deactivate user accounts.

**Violation Response**
System does not expose account creation or deactivation functionality to non-Admin actors.

---

### BR15 — Role management restricted to Admin

**Category:** PRM
**Applies To:** F01.02
**Source:** UC01.02.01 Preconditions

**Condition**
When any actor attempts to assign or change a user's role.

**Constraint**
Only actors holding the Admin role may assign or modify user roles.

**Violation Response**
System does not expose the role assignment interface to non-Admin actors.

---

### BR16 — Taxonomy configuration restricted to Admin

**Category:** PRM
**Applies To:** F02.01
**Source:** UC02.01.01 Preconditions

**Condition**
When any actor attempts to create, rename, or remove skill categories or named skills.

**Constraint**
Only actors holding the Admin role may modify the skill taxonomy.

**Violation Response**
System does not expose taxonomy management controls to non-Admin actors.

---

### BR17 — Skill profile update scope by role

**Category:** PRM
**Applies To:** F02.02
**Source:** UC02.02.01 Preconditions, UC02.02.02 Preconditions, 02_features.md F02.02

**Condition**
When any actor attempts to add, edit, or remove a skill entry on an employee profile.

**Constraint**
An Employee may only modify their own skill profile. An Admin may modify any employee's skill profile.

**Violation Response**
System restricts skill profile edit controls to the authenticated user's own profile for Employee role actors; Admin actors may access any profile.

---

### BR18 — Project registry management restricted to Project Manager and Admin

**Category:** PRM
**Applies To:** F03.01, F03.02
**Source:** UC03.01.01 Preconditions, UC03.01.02 Preconditions, UC03.02.01 Preconditions, UC03.02.02 Preconditions, UC03.02.03 Preconditions

**Condition**
When any actor attempts to create, update, or manage project records and their skill requirements.

**Constraint**
Only actors holding the Project Manager or Admin role may create, update project records, or manage project skill requirements.

**Violation Response**
System does not expose project creation, update, or skill requirement management to Employee role actors.

---

### BR19 — Staffing actions restricted to Project Manager

**Category:** PRM
**Applies To:** F04.01, F04.02
**Source:** UC04.01.01 Preconditions, UC04.02.01 Preconditions, UC04.02.02 Preconditions

**Condition**
When any actor attempts to search employees by skill criteria or manage project assignments.

**Constraint**
Only actors holding the Project Manager role may perform talent pool searches and create or remove project assignments.

**Violation Response**
System does not expose the Talent Pool search or assignment management interface to Admin or Employee role actors.

---

### BR20 — Resource Utilization Report access restricted to Admin and Project Manager

**Category:** PRM
**Applies To:** F05.01
**Source:** UC05.01.01 Preconditions

**Condition**
When any actor attempts to access the Resource Utilization Report.

**Constraint**
Only actors holding the Admin or Project Manager role may view the Resource Utilization Report.

**Violation Response**
System does not expose the Resource Utilization Report to Employee role actors.

---

### BR21 — Skill Distribution Report access restricted to Admin

**Category:** PRM
**Applies To:** F05.02
**Source:** UC05.02.01 Preconditions

**Condition**
When any actor attempts to access the Skill Distribution Report.

**Constraint**
Only actors holding the Admin role may view the Skill Distribution Report.

**Violation Response**
System does not expose the Skill Distribution Report to Project Manager or Employee role actors.

---

### BR22 — Skill Gap Analysis access restricted to Admin and Project Manager

**Category:** PRM
**Applies To:** F05.03
**Source:** UC05.03.01 Preconditions

**Condition**
When any actor attempts to access the Skill Gap Analysis.

**Constraint**
Only actors holding the Admin or Project Manager role may view the Skill Gap Analysis.

**Violation Response**
System does not expose the Skill Gap Analysis to Employee role actors.

---

### BR23 — Assignment History Report access restricted to Admin and Project Manager

**Category:** PRM
**Applies To:** F05.04
**Source:** UC05.04.01 Preconditions

**Condition**
When any actor attempts to access the Assignment History Report.

**Constraint**
Only actors holding the Admin or Project Manager role may view the Assignment History Report.

**Violation Response**
System does not expose the Assignment History Report to Employee role actors.

---

## Business Logic Rules

### BR24 — Employee profiles flagged when taxonomy skill removed

**Category:** BIZ
**Applies To:** F02.01
**Source:** UC02.01.01 AF03, UC02.01.01 Postconditions

**Condition**
When Admin confirms the removal of a named skill from the taxonomy.

**Constraint**
All employee skill profiles that contain the removed skill must be automatically flagged for review. The system must display a summary of the number of affected profiles after the removal.

**Violation Response**
N/A — this is a mandatory side-effect of a successful operation.

---

### BR25 — Skill profile changes versioned with timestamp and actor

**Category:** BIZ
**Applies To:** F02.02
**Source:** UC02.02.01 Main Flow steps 09–10, UC02.02.01 AF01 step 05, UC02.02.01 AF02 step 04, UC02.02.02 Main Flow steps 11–12

**Condition**
When any actor successfully adds, edits, or removes a skill entry on any employee skill profile.

**Constraint**
A versioned history entry must be recorded for every change, capturing the timestamp and the identity of the actor who made the change.

**Violation Response**
N/A — this is a mandatory side-effect of every successful skill profile modification.

---

### BR26 — Over-allocation warning on assignment creation

**Category:** BIZ
**Applies To:** F04.02
**Source:** UC04.02.01 AF01

**Condition**
When Project Manager submits an assignment and the employee's total active allocation including the new assignment would exceed 100%.

**Constraint**
The system must warn the Project Manager of the over-allocation condition, displaying current and projected allocation percentages. The assignment may still be confirmed by the Project Manager after acknowledging the warning.

**Violation Response**
System displays an over-allocation warning with current and resulting allocation percentages; Project Manager may acknowledge and proceed or cancel.

---

### BR27 — Role changes take effect on next session

**Category:** BIZ
**Applies To:** F01.02
**Source:** UC01.02.01 Postconditions

**Condition**
When Admin successfully updates a user's role.

**Constraint**
The updated role and its associated permissions become effective on the affected user's next authenticated session; the current session is not interrupted.

**Violation Response**
N/A — this is a defined timing behavior of role propagation.

---

### BR28 — Residual availability = 100% minus total active allocation

**Category:** BIZ
**Applies To:** F05.01
**Source:** UC05.01.01 Main Flow step 02, 02_features.md F05.01

**Condition**
When the Resource Utilization Report is generated for any employee.

**Constraint**
Residual availability for each employee is calculated as 100% minus the sum of all active assignment capacity percentages for that employee.

**Violation Response**
N/A — this is a computation rule.

---

### BR29 — Skill gap = unmet project skill requirements

**Category:** BIZ
**Applies To:** F05.03
**Source:** UC05.03.01 Main Flow step 04, 02_features.md F05.03

**Condition**
When the Skill Gap Analysis is executed for a selected project.

**Constraint**
The analysis must compare each project skill requirement (skill name and minimum proficiency level) against all available employee skill profiles and report requirements as unmet when no employee meets the minimum proficiency threshold. Proficiency shortfall must be identified per unmet requirement.

**Violation Response**
N/A — this is a computation rule.

---

## System Constraints

### BR30 — Proficiency scale is fixed at 1–5

**Category:** SYS
**Applies To:** F02.01, F02.02, F03.02, F04.01, F05.02, F05.03
**Source:** 02_features.md F02.01 Excludes

**Condition**
Across all system functions that involve proficiency levels.

**Constraint**
The proficiency scale is fixed as a 5-point integer scale (1 = Beginner, 5 = Expert). This scale is not configurable by any user role.

---

### BR31 — No self-registration by employees

**Category:** SYS
**Applies To:** F01.01
**Source:** 02_features.md F01.01 Excludes

**Condition**
When the system is accessed by an unauthenticated user.

**Constraint**
The system does not provide a self-registration flow. All user accounts must be created by an Admin.

---

### BR32 — No external identity provider integration

**Category:** SYS
**Applies To:** F01.01
**Source:** 02_features.md F01.01 Excludes

**Condition**
Across all authentication flows.

**Constraint**
The system does not integrate with external identity providers such as Active Directory or SSO. Authentication is managed internally.

---

### BR33 — Three user roles only

**Category:** SYS
**Applies To:** F01.02
**Source:** UC01.02.01 Main Flow step 06, 02_features.md F01.02

**Condition**
When any role is assigned or enforced within the system.

**Constraint**
The system recognizes exactly three user roles: Admin, Project Manager, and Employee. No other roles exist or can be created.

---
