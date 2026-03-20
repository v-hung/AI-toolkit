# Feature List

<!-- source: 01_project_overview.md -->

## Module Relationships

| From | To | Relationship | Entry Point |
|---|---|---|---|
| M02 — Skill Administration | M01 — User Management | context | Skill profiles are accessed within the context of a user account |
| M03 — Project Registry | M02 — Skill Administration | data | Project skill requirements reference the organization skill taxonomy |
| M04 — Staffing | M02 — Skill Administration | data | Staffing reads employee skill profiles to identify and match candidates |
| M04 — Staffing | M03 — Project Registry | context | Assignments are created and linked within a registered project |
| M05 — Reporting | M02 — Skill Administration | data | Reports read skill profile data for distribution and gap metrics |
| M05 — Reporting | M03 — Project Registry | data | Reports read project records for project-level staffing metrics |
| M05 — Reporting | M04 — Staffing | data | Reports read assignment records for utilization and history metrics |

---

## Module M01 — User Management

### F01.01 — Account Provisioning

**Description**
The system allows Admins to create and deactivate user accounts for all personnel within the organization.

**Actors**
- Admin

**Includes**
- Creation of a new user account with name, email, and initial role
- Deactivation of an existing user account
- Enforcement of the rule that each employee has exactly one active account

**Excludes**
- Self-registration by employees
- Integration with external identity providers (Active Directory, SSO)

**Priority**
MVP

---

### F01.02 — Role Assignment

**Description**
The system allows Admins to assign or change the access role of any user account, controlling which system permissions apply.

**Actors**
- Admin

**Includes**
- Assignment of one of three roles: Admin, Project Manager, Employee
- Role change for an existing active account

**Depends On**
- F01.01 — Requires an existing user account as the target of role assignment

**Priority**
MVP

---

## Module M02 — Skill Administration

### F02.01 — Taxonomy Configuration

**Description**
The system allows Admins to define and update the organization-wide skill taxonomy, including skill categories and the named skills within each category.

**Actors**
- Admin

**Includes**
- Creation and update of skill categories (e.g., Backend, Frontend, DevOps)
- Addition and removal of named skills within a category
- Flagging of employee skill profiles affected when a taxonomy skill entry is removed

**Excludes**
- Configuration of the proficiency scale (fixed 5-point scale: 1 = Beginner → 5 = Expert, not user-configurable)

**Priority**
MVP

---

### F02.02 — Skill Profile Maintenance

**Description**
The system allows Employees to record and modify their own skill entries, and Admins to record and modify skill entries on any employee's profile, with a versioned change history.

**Actors**
- Employee (own profile only)
- Admin (any employee's profile)

**Includes**
- Addition of a skill entry with skill name, category, proficiency level (1–5), and optional years of experience
- Modification and removal of existing skill entries
- Versioned history of all changes to a skill profile, including timestamp and actor

**Depends On**
- F01.01 — Requires an existing user account as the subject of the skill profile
- F02.01 — Requires the taxonomy to be defined in order to categorize and validate skill entries

**Priority**
MVP

---

## Module M03 — Project Registry

### F03.01 — Project Record Management

**Description**
The system allows Project Managers and Admins to create and manage project records with metadata defining the project's identity, status, and timeline.

**Actors**
- Project Manager
- Admin

**Includes**
- Entry of project name, description, status, and timeline (start/end dates)
- Update of project metadata after creation

**Priority**
MVP

---

### F03.02 — Project Skill Requirement Definition

**Description**
The system allows Project Managers and Admins to specify and update the set of skills required for a project, including minimum proficiency expectations.

**Actors**
- Project Manager
- Admin

**Includes**
- Addition of required skill entries (skill name, minimum proficiency level) to a project
- Modification and removal of existing skill requirements on a project

**Depends On**
- F03.01 — Requires an existing project record to attach skill requirements to
- F02.01 — Requires the taxonomy to be defined in order to select valid skill names

**Priority**
MVP

---

## Module M04 — Staffing

### F04.01 — Talent Search

**Description**
The system allows Project Managers to search and filter the employee pool using skill criteria to identify qualified staffing candidates.

**Actors**
- Project Manager

**Includes**
- Search by one or more skill names with optional minimum proficiency level filter
- Display of matching employees as a filterable Talent Pool list
- Display of each candidate's current skill entries and resource availability

**Depends On**
- F02.02 — Requires populated employee skill profiles as the searchable data set
- F02.01 — Requires taxonomy definitions to support skill-name filtering

**Priority**
MVP

---

### F04.02 — Assignment Management

**Description**
The system allows Project Managers to assign and unassign employees to and from a project, capturing the assignment period, capacity allocation, and project role.

**Actors**
- Project Manager

**Includes**
- Creation of an assignment record linking one employee to one project with start date, optional end date, capacity percentage, and project role
- Removal (unassignment) of an employee from a project, closing the active assignment record

**Depends On**
- F03.01 — Requires an existing project record as the assignment target
- F04.01 — Requires the search capability to identify and select the candidate employee

**Priority**
MVP

---

## Module M05 — Reporting

### F05.01 — Resource Utilization Report

**Description**
The system provides Admins and Project Managers with a report showing each employee's current allocation across active projects and remaining availability.

**Actors**
- Admin
- Project Manager

**Includes**
- Display of each employee's active assignments and their combined capacity percentage
- Calculation and display of residual availability (100% minus total active allocation)

**Depends On**
- F04.02 — Requires assignment records as the source of allocation data

**Priority**
MVP

---

### F05.02 — Skill Distribution Report

**Description**
The system provides Admins with a report showing the distribution of skills and proficiency levels across all employee profiles in the organization.

**Actors**
- Admin

**Includes**
- Aggregated view of skill coverage by category
- Breakdown of proficiency level distribution per skill

**Depends On**
- F02.02 — Requires populated skill profiles as the source data

**Priority**
MVP

---

### F05.03 — Skill Gap Analysis

**Description**
The system provides Admins and Project Managers with a view of the difference between a project's required skill set and the skills available among its assigned or candidate employees.

**Actors**
- Admin
- Project Manager

**Includes**
- Comparison of project skill requirements against employee skill profiles
- Identification of unfilled skill requirements by name and proficiency shortfall

**Depends On**
- F03.02 — Requires defined project skill requirements as the baseline
- F02.02 — Requires employee skill profiles as the comparison data set

**Priority**
MVP

---

### F05.04 — Assignment History Report

**Description**
The system provides Admins and Project Managers with a historical report of all project assignments across the organization, filterable by employee, project, or date range.

**Actors**
- Admin
- Project Manager

**Includes**
- Chronological list of past and active assignments with period, capacity, and role details
- Filtering by employee, project, or date range

**Depends On**
- F04.02 — Requires assignment records as the source of history data

**Priority**
MVP
