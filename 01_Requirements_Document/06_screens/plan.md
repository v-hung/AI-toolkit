# Screen Plan

<!-- source: 03_usecases/*.md, 02_features.md -->
<!-- total: 28 screens -->

## Generation Checklist

- [x] M01 — User Management → `M01_user_management.md`
- [x] M02 — Skill Administration → `M02_skill_administration.md`
- [x] M03 — Project Registry → `M03_project_registry.md`
- [x] M04 — Staffing → `M04_staffing.md`
- [x] M05 — Reporting → `M05_reporting.md`

---

## Screen Index

| SCR | Screen Name | Type | Module |
|---|---|---|---|
| SCR01 | User List | screen | M01 — User Management |
| SCR02 | New Account Form | screen | M01 — User Management |
| SCR03 | User Account Detail | screen | M01 — User Management |
| SCR04 | Deactivate Account Confirmation | dialog | M01 — User Management |
| SCR05 | Role Selection | screen | M01 — User Management |
| SCR06 | Taxonomy Configuration | screen | M02 — Skill Administration |
| SCR07 | Category Form | screen | M02 — Skill Administration |
| SCR08 | Skill Taxonomy Form | screen | M02 — Skill Administration |
| SCR09 | Remove Skill Confirmation | dialog | M02 — Skill Administration |
| SCR10 | Employee Skill Profile | screen | M02 — Skill Administration |
| SCR11 | Skill Entry Form | screen | M02 — Skill Administration |
| SCR12 | Remove Skill Entry Confirmation | dialog | M02 — Skill Administration |
| SCR13 | Skill Profile Change History | screen | M02 — Skill Administration |
| SCR14 | Project List | screen | M03 — Project Registry |
| SCR15 | New Project Form | screen | M03 — Project Registry |
| SCR16 | Project Detail | screen | M03 — Project Registry |
| SCR17 | Project Edit Form | screen | M03 — Project Registry |
| SCR18 | Skill Requirement Form | screen | M03 — Project Registry |
| SCR19 | Remove Skill Requirement Confirmation | dialog | M03 — Project Registry |
| SCR20 | Talent Search | screen | M04 — Staffing |
| SCR21 | Assignment Creation | screen | M04 — Staffing |
| SCR22 | Assignment Confirmation | screen | M04 — Staffing |
| SCR23 | Unassignment Confirmation | dialog | M04 — Staffing |
| SCR24 | Reports Dashboard | screen | M05 — Reporting |
| SCR25 | Resource Utilization Report | screen | M05 — Reporting |
| SCR26 | Skill Distribution Report | screen | M05 — Reporting |
| SCR27 | Skill Gap Analysis | screen | M05 — Reporting |
| SCR28 | Assignment History Report | screen | M05 — Reporting |

---

## M01 — User Management

**Output file:** `./01_Requirements_Document/06_screens/M01_user_management.md`

**Screens**
- SCR01 — User List `screen`
- SCR02 — New Account Form `screen`
- SCR03 — User Account Detail `screen`
- SCR04 — Deactivate Account Confirmation `dialog`
- SCR05 — Role Selection `screen`

**Navigation**
- SCR01 → SCR02 — Admin selects option to create a new account
- SCR01 → SCR03 — Admin selects a user from the list
- SCR02 → SCR03 — System creates account and displays account detail
- SCR02 → SCR01 — Admin cancels account creation (AF01)
- SCR03 → SCR04 — Admin initiates deactivation action
- SCR04 → SCR03 — Admin confirms or cancels deactivation
- SCR03 → SCR05 — Admin initiates role change action
- SCR05 → SCR03 — Admin confirms or cancels role selection

**Cross-Module Navigation**
- SCR03 (M01) → SCR10 (M02) — Admin navigates to skill profile section from user account detail

---

## M02 — Skill Administration

**Output file:** `./01_Requirements_Document/06_screens/M02_skill_administration.md`

**Screens**
- SCR06 — Taxonomy Configuration `screen`
- SCR07 — Category Form `screen`
- SCR08 — Skill Taxonomy Form `screen`
- SCR09 — Remove Skill Confirmation `dialog`
- SCR10 — Employee Skill Profile `screen`
- SCR11 — Skill Entry Form `screen`
- SCR12 — Remove Skill Entry Confirmation `dialog`
- SCR13 — Skill Profile Change History `screen`

**Navigation**
- SCR06 → SCR07 — Admin initiates category creation or edit action
- SCR07 → SCR06 — Admin submits or cancels category form
- SCR06 → SCR08 — Admin initiates add skill action under a category
- SCR08 → SCR06 — Admin submits or cancels skill form
- SCR06 → SCR09 — Admin initiates skill removal action
- SCR09 → SCR06 — Admin confirms or cancels skill removal
- SCR10 → SCR11 — Employee or Admin initiates add or modify skill entry
- SCR11 → SCR10 — Actor submits or cancels skill entry form
- SCR10 → SCR12 — Employee or Admin initiates remove skill entry action
- SCR12 → SCR10 — Actor confirms or cancels skill entry removal
- SCR10 → SCR13 — Actor navigates to change history section of skill profile

---

## M03 — Project Registry

**Output file:** `./01_Requirements_Document/06_screens/M03_project_registry.md`

**Screens**
- SCR14 — Project List `screen`
- SCR15 — New Project Form `screen`
- SCR16 — Project Detail `screen`
- SCR17 — Project Edit Form `screen`
- SCR18 — Skill Requirement Form `screen`
- SCR19 — Remove Skill Requirement Confirmation `dialog`

**Navigation**
- SCR14 → SCR15 — Actor initiates creation of a new project
- SCR15 → SCR16 — System creates project record and displays project detail
- SCR14 → SCR16 — Actor selects an existing project from the list
- SCR16 → SCR17 — Actor initiates editing of project metadata
- SCR17 → SCR16 — Actor submits or cancels project edit form
- SCR16 → SCR18 — Actor initiates add or modify skill requirement
- SCR18 → SCR16 — Actor submits or cancels skill requirement form
- SCR16 → SCR19 — Actor initiates remove skill requirement action
- SCR19 → SCR16 — Actor confirms or cancels skill requirement removal

**Cross-Module Navigation**
- SCR16 (M03) → SCR23 (M04) — Project Manager selects an active assignment to remove from project detail

---

## M04 — Staffing

**Output file:** `./01_Requirements_Document/06_screens/M04_staffing.md`

**Screens**
- SCR20 — Talent Search `screen`
- SCR21 — Assignment Creation `screen`
- SCR22 — Assignment Confirmation `screen`
- SCR23 — Unassignment Confirmation `dialog`

**Navigation**
- SCR20 → SCR21 — Project Manager selects candidate and initiates assignment creation
- SCR21 → SCR22 — System creates assignment record and displays confirmation
- SCR21 → SCR20 — Project Manager cancels assignment creation

---

## M05 — Reporting

**Output file:** `./01_Requirements_Document/06_screens/M05_reporting.md`

**Screens**
- SCR24 — Reports Dashboard `screen`
- SCR25 — Resource Utilization Report `screen`
- SCR26 — Skill Distribution Report `screen`
- SCR27 — Skill Gap Analysis `screen`
- SCR28 — Assignment History Report `screen`

**Navigation**
- SCR24 → SCR25 — Actor selects Resource Utilization Report
- SCR24 → SCR26 — Admin selects Skill Distribution Report
- SCR24 → SCR27 — Actor selects Skill Gap Analysis
- SCR24 → SCR28 — Actor selects Assignment History Report

---
