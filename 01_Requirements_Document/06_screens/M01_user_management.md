# M01 — User Management

<!-- source: 03_usecases/M01_user_management.md, 04_business_rules.md, 05_data_model.md -->
<!-- module: M01 -->
<!-- screens: SCR01, SCR02, SCR03, SCR04, SCR05 -->

---

### SCR01 — User List `screen`

**Actor:** Admin
**Trigger:**
- UC01.01.01 step 02 — System displays the user list with an option to add a new account
- UC01.01.02 step 02 — System displays the user list
- UC01.02.01 step 02 — System displays the user list

**Navigates From**
- Entry point

**Navigates To**
- SCR02 — New Account Form — Admin selects option to create a new account
- SCR03 — User Account Detail — Admin selects a user from the list

**Data Displayed**
- E01 — User: name, email, role, status

**Constraints**
- BR14 — Account creation option is visible to Admin role only; non-Admin actors do not see this control
- BR04 — Deactivation action is only presented for accounts whose status is active

**States**
- Default — User list loaded with one or more accounts
- Empty — No user accounts exist in the system
- Loading — User list is being fetched from the system
- Error — System or network failure prevents loading the user list
- Restricted — Non-Admin actor accesses the section; account creation and deactivation controls are not shown

---

### SCR02 — New Account Form `screen`

**Actor:** Admin
**Trigger:** UC01.01.01 step 04 — System displays the new account form requesting name, email address, and initial role

**Navigates From**
- SCR01 — User List

**Navigates To**
- SCR03 — User Account Detail — System creates account successfully and displays account detail
- SCR01 — User List — Admin cancels account creation (AF01)

**Data Displayed**
- E01 — User: name, email, role (input fields; no pre-populated entity data)

**Constraints**
- BR01 — Email address must not already be associated with an active account; form blocks submission on duplicate
- BR02 — Name, email, and initial role are all required; form blocks submission if any field is missing
- BR03 — Email address must conform to valid email format; form blocks submission on invalid format
- BR14 — Only Admin actors may access this form
- BR33 — Role selection is limited to exactly three values: Admin, Project Manager, Employee

**States**
- Default — Empty form ready for Admin input
- Error — Validation failure: one or more fields are highlighted with inline error messages; no account created
- Restricted — Non-Admin actor; form is not accessible

---

### SCR03 — User Account Detail `screen`

**Actor:** Admin
**Trigger:**
- UC01.01.01 step 07 — System creates the new account and displays account detail confirming the account is active
- UC01.01.02 step 04 — System displays the user account detail including current status and role
- UC01.01.02 step 08 — System deactivates the account and displays the updated account detail with status shown as inactive
- UC01.02.01 step 04 — System displays the user account detail including the current assigned role
- UC01.02.01 step 08 — System updates the role and displays the account detail with the newly assigned role applied

**Navigates From**
- SCR02 — New Account Form
- SCR01 — User List
- SCR04 — Deactivate Account Confirmation
- SCR05 — Role Selection

**Navigates To**
- SCR04 — Deactivate Account Confirmation — Admin initiates deactivation action
- SCR05 — Role Selection — Admin initiates role change action
- SCR10 — Employee Skill Profile — Admin navigates to skill profile section from user account detail

**Data Displayed**
- E01 — User: name, email, role, status

**Constraints**
- BR04 — Deactivation and role-change actions are only shown when the account status is active
- BR14 — Deactivation action is visible to Admin role only
- BR15 — Role-change action is visible to Admin role only
- BR27 — Screen reflects that updated role takes effect on the user's next session, not the current one

**States**
- Default — Account detail displayed; status is active; management actions available
- Loading — Account data is being fetched
- Error — System or network failure prevents loading account detail
- Restricted — Non-Admin actor; deactivation and role-change controls are not shown

---

### SCR04 — Deactivate Account Confirmation `dialog`

**Actor:** Admin
**Trigger:** UC01.01.02 step 06 — System displays a confirmation prompt describing the consequence of deactivation

**Navigates From**
- SCR03 — User Account Detail

**Navigates To**
- SCR03 — User Account Detail — Admin confirms deactivation or cancels the prompt

**Data Displayed**
- E01 — User: name, status (current active status shown as context for the action)

**Constraints**
- BR14 — Only Admin actors may initiate this dialog
- BR04 — Dialog is only reachable from an account whose current status is active

**States**
- Default — Confirmation dialog displayed with account identity and consequence description

---

### SCR05 — Role Selection `screen`

**Actor:** Admin
**Trigger:** UC01.02.01 step 06 — System displays the role selection with the three available roles and the current role pre-selected

**Navigates From**
- SCR03 — User Account Detail

**Navigates To**
- SCR03 — User Account Detail — Admin confirms role selection or cancels

**Data Displayed**
- E01 — User: role (current role pre-selected)

**Constraints**
- BR15 — Only Admin actors may access this screen
- BR33 — Selection is limited to exactly three roles: Admin, Project Manager, Employee
- BR27 — Role change takes effect on the affected user's next authenticated session

**States**
- Default — Role selection displayed with current role pre-selected
- Restricted — Non-Admin actor; this screen is not accessible
