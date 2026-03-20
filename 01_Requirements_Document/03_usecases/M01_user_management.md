# M01 — User Management

<!-- source: 02_features.md, plan.md, 01_project_overview.md -->
<!-- module: M01 -->
<!-- features: F01.01, F01.02 -->

---

## UC01.01.01 — Create a user account

<!-- feature: F01.01 -->

**Actor:** Admin
**Goal:** Admin wants to create a new user account for an employee so that the employee can access the system.
**Trigger:** Admin navigates to the User Management section and initiates account creation.

**Preconditions**
- Admin is authenticated and has full system access.
- No active account already exists for the target employee (one active account per employee enforced).

**Postconditions**
- (Success) A new user account is created and active; the employee can log in with the assigned credentials.
- (Cancellation / Failure) No account is created; the system state remains unchanged.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Navigates to the User Management section. |
| 02 | System | Displays the user list with an option to add a new account. |
| 03 | Admin | Selects the option to create a new account. |
| 04 | System | Displays the new account form requesting name, email address, and initial role. |
| 05 | Admin | Enters the employee's name, email address, and selects an initial role, then submits the form. |
| 06 | System | Validates the submitted data. |
| 07 | System | Creates the new user account and displays the account detail confirming the account is active. |

---

### Alternate Flow

#### AF01 — Admin cancels account creation

> Branches from step 04 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Cancels the creation form without submitting. |
| 02 | System | Dismisses the form and returns to the user list. |

> Rejoins Main Flow at step 02.

---

### Exception Flow

#### EF01 — Email address already in use

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects that the submitted email address already belongs to an existing account. |
| 02 | System | Displays an error message indicating the email is already in use and highlights the affected field. |
| 03 | Admin | Corrects the email address or cancels the form. |

> Ends with: The form remains open with the error message; no account is created.

#### EF02 — Required fields missing

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | System | Detects that one or more required fields are empty or invalid. |
| 02 | System | Highlights the missing or invalid fields and displays validation messages. |
| 03 | Admin | Corrects the highlighted fields. |

> Ends with: The form remains open with validation indicators; no account is created.

---

## UC01.01.02 — Deactivate a user account

<!-- feature: F01.01 -->

**Actor:** Admin
**Goal:** Admin wants to deactivate an existing user account to revoke that employee's access to the system.
**Trigger:** Admin selects a user account from the user list and initiates the deactivation action.

**Preconditions**
- Admin is authenticated and has full system access.
- The target user account exists and is currently active.

**Postconditions**
- (Success) The target account is deactivated; the employee can no longer log in.
- (Cancellation) The account remains active; no change is made.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Navigates to the User Management section. |
| 02 | System | Displays the user list. |
| 03 | Admin | Selects a user account from the list. |
| 04 | System | Displays the user account detail including current status and role. |
| 05 | Admin | Initiates the deactivation action on the account. |
| 06 | System | Displays a confirmation prompt describing the consequence of deactivation. |
| 07 | Admin | Confirms the deactivation. |
| 08 | System | Deactivates the account and displays the updated account detail with status shown as inactive. |

---

### Alternate Flow

#### AF01 — Admin cancels deactivation

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Cancels the confirmation prompt. |
| 02 | System | Dismisses the prompt and returns to the user account detail. |

> Rejoins Main Flow at step 04.

---

## UC01.02.01 — Assign or change a user's role

<!-- feature: F01.02 -->

**Actor:** Admin
**Goal:** Admin wants to assign or update the access role of a user account to control which system permissions apply to that user.
**Trigger:** Admin selects a user account and initiates a role change.

**Preconditions**
- Admin is authenticated and has full system access.
- The target user account exists and is currently active.

**Postconditions**
- (Success) The user account's role is updated; the new permissions apply on the user's next system interaction.
- (Cancellation) The role remains unchanged; no modification is recorded.

---

### Main Flow

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Navigates to the User Management section. |
| 02 | System | Displays the user list. |
| 03 | Admin | Selects a user account from the list. |
| 04 | System | Displays the user account detail including the current assigned role. |
| 05 | Admin | Initiates the role change action. |
| 06 | System | Displays the role selection with the three available roles (Admin, Project Manager, Employee) and the current role pre-selected. |
| 07 | Admin | Selects the new role and confirms the change. |
| 08 | System | Updates the role and displays the account detail with the newly assigned role applied. |

---

### Alternate Flow

#### AF01 — Admin cancels role change

> Branches from step 06 of Main Flow.

| Step | Actor / System | Action |
|---|---|---|
| 01 | Admin | Cancels the role selection without confirming. |
| 02 | System | Dismisses the selection and returns to the user account detail. |

> Rejoins Main Flow at step 04.
