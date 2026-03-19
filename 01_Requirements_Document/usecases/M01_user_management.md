# M01 — User Management

<!-- source: features.md, plan.md, project-overview.md -->
<!-- module: M01 -->
<!-- features: F01.01, F01.02 -->

---

## UC01.01.01 — Create User Account

<!-- feature: F01.01 -->

**Actor:** Admin
**Goal:** Admin wants to create a new user account for an employee in the organization.
**Trigger:** Admin navigates to the user management section and initiates new account creation.

**Preconditions**
- Admin is authenticated and has Admin role.
- No active account already exists for the target employee's email address.

**Postconditions**
- A new user account is created with the provided name, email, and initial role.
- The new account appears in the user list and is accessible by the assigned user.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Navigates to the User Management section. |
| 02 | System | Displays the user list with an option to create a new account. |
| 03 | Admin | Selects the option to create a new account. |
| 04 | System | Displays the account creation form with fields for name, email, and initial role. |
| 05 | Admin | Enters the employee's name and email, selects an initial role, and submits the form. |
| 06 | System | Validates the submitted input. |
| 07 | System | Creates the account and displays the updated user list with the new account visible. |

---

### Alternate Flow

#### AF01 — Account already exists for this email

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects that an active account with the submitted email already exists. |
| 02 | System | Displays a notification that an account already exists for this email address. |
| 03 | Admin | Reviews the notification; the form remains open for correction. |

> Ends with: Account creation is blocked; Admin may correct the email or cancel.

---

### Exception Flow

#### EF01 — Invalid or incomplete form input

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects missing required fields or invalid input (e.g., malformed email). |
| 02 | System | Displays field-level error messages indicating which fields require correction. |
| 03 | Admin | Corrects the indicated fields. |

> Ends with: Admin is returned to the form with errors highlighted; no account is created.

---

## UC01.01.02 — Deactivate User Account

<!-- feature: F01.01 -->

**Actor:** Admin
**Goal:** Admin wants to deactivate an existing employee account so the user can no longer access the system.
**Trigger:** Admin selects a target user account and initiates the deactivation action.

**Preconditions**
- Admin is authenticated and has Admin role.
- The target account exists and is currently active.

**Postconditions**
- Success: The target account is deactivated and the user can no longer log in.
- Cancellation: The account remains active and unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Navigates to the User Management section. |
| 02 | System | Displays the user list. |
| 03 | Admin | Selects the target user account from the list. |
| 04 | System | Displays the account details page for the selected user with a deactivate option. |
| 05 | Admin | Selects the deactivate action. |
| 06 | System | Displays a confirmation dialog requesting Admin to confirm the deactivation. |
| 07 | Admin | Confirms the deactivation. |
| 08 | System | Deactivates the account and displays the account details with status updated to inactive. |

---

### Alternate Flow

#### AF01 — Admin cancels deactivation

> Branches from step 07 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Cancels the confirmation dialog. |
| 02 | System | Closes the dialog and returns to the account details page; account remains active. |

> Ends with: Account remains active; no changes are made.

---

## UC01.02.01 — Assign or Change User Role

<!-- feature: F01.02 -->

**Actor:** Admin
**Goal:** Admin wants to assign an access role to a user account or update an existing role assignment.
**Trigger:** Admin selects a user account and initiates the role edit action.

**Preconditions**
- Admin is authenticated and has Admin role.
- The target account exists and is currently active.

**Postconditions**
- The user account's role is updated to the newly selected value.
- The updated role and its associated permissions take effect on the user's next session.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Navigates to the User Management section. |
| 02 | System | Displays the user list. |
| 03 | Admin | Selects the target user account from the list. |
| 04 | System | Displays the account details page showing the user's current role. |
| 05 | Admin | Selects the option to edit the role. |
| 06 | System | Displays a role selection control with the three available roles (Admin, Project Manager, Employee); the current role is pre-selected. |
| 07 | Admin | Selects the new role and confirms the change. |
| 08 | System | Saves the updated role and displays the account details page with the new role reflected. |

---

### Exception Flow

#### EF01 — Role update fails due to system error

> Branches from step 08 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Fails to persist the role change due to an internal error. |
| 02 | System | Displays an error message indicating the update could not be saved. |
| 03 | Admin | Is presented with an option to retry or cancel. |

> Ends with: Role remains unchanged at its previous value; error message is visible to Admin.
