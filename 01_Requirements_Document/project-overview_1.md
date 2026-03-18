# Project Overview — Skill-Matching Hub (SMH)

| Field        | Value                          |
|--------------|--------------------------------|
| Project Name | Skill-Matching Hub (SMH)       |
| Status       | Requirements Definition        |
| Date         | 2026-03-17                     |
| Version      | 1.0                            |

## Summary

Skill-Matching Hub (SMH) is an internal HR skill management ecosystem that centralizes employee skill profiles and automates personnel-to-project matching. The system replaces manual, intuition-based staffing with a data-driven, rule-based query model. Core capabilities include skill profile management, project skill-requirement definition, availability tracking, and automated candidate recommendation.

---

## Core Objectives

1. Centralize employee skill data into a single, queryable source of truth.
2. Enable accurate, rule-based matching of personnel to project requirements.
3. Track real-time availability and allocation of employees across projects.
4. Reduce time-to-staff by providing ranked candidate lists based on skill fit.
5. Enforce role-based access control with HR/Admin override capability.

---

## Target Users

| Role                   | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **Employee**           | Manages and updates own skill profile; views personal allocation status      |
| **Project Manager**    | Defines project skill requirements; views recommended candidates; requests staffing |
| **HR / Resource Manager** | Manages staffing assignments; approves/rejects staffing requests; overrides role actions when needed |
| **System Admin**       | Full system access; manages users, roles, skill taxonomy, and system config |

---

## Scope Definition

### In-Scope (MVP)

- Employee skill profile CRUD (skills + proficiency level 1–5)
- Skill taxonomy management (categories, skill definitions)
- Project creation with skill requirement definition (skill + minimum proficiency level)
- Rule-based personnel recommendation engine (filter by skill match, proficiency threshold)
- Employee availability tracking (project allocation, % effort, available-from date)
- Staffing request workflow (PM requests → HR approves/rejects)
- Role-based access control with HR/Admin override
- Standalone authentication (username/password, JWT)
- Search & filter personnel by skill, proficiency level, and availability

### Out-of-Scope

- AI/ML-based recommendation or ranking
- SSO / Active Directory / OAuth2 integration
- Payroll, performance review, or compensation management
- Mobile application
- External candidate / recruitment pipeline management
- Integration with third-party HR systems (SAP, Workday, etc.)

---

## Key Features

### Priority 1 — MVP Core

| Feature | Description |
|---------|-------------|
| **Skill Profile Management** | Employees create and maintain profiles with skills rated on a 1–5 numeric proficiency scale |
| **Skill Taxonomy** | Admin-managed catalog of skill categories and individual skills used system-wide |
| **Project Skill Requirements** | PMs define required skills and minimum proficiency levels per project |
| **Rule-Based Recommendation** | System filters and ranks employees by skill match against project requirements |
| **Availability Tracking** | Records employee allocation: current project(s), % effort committed, and available-from date |
| **Staffing Workflow** | PM submits staffing request → HR reviews and approves/rejects |
| **Authentication & Authorization** | JWT-based standalone auth; role-based permissions with HR/Admin override capability |

### Priority 2 — Post-MVP Enhancements

| Feature | Description |
|---------|-------------|
| **Skill Gap Analysis** | Identify skill shortfalls across teams or for specific projects |
| **Audit Log** | Track changes to skill profiles and staffing decisions |
| **Dashboard & Reports** | Utilization rates, skill distribution, availability forecasts |
| **Notification System** | Email/in-app alerts for staffing requests and assignment changes |

---

## Technical Stack

| Layer              | Technology                              |
|--------------------|-----------------------------------------|
| **Frontend**       | React 19+, Shadcn UI                    |
| **State Management** | Zustand (global), React Context (local/scoped) |
| **Backend**        | ASP.NET Core 10 (REST API)              |
| **Database**       | PostgreSQL                              |
| **Authentication** | Standalone — Username/Password + JWT    |
| **Recommendation** | Rule-based engine (server-side, no AI)  |

---

## Key Business Rules

1. **Skill Proficiency Scale:** Integer values 1–5 (1 = Beginner, 5 = Expert).
2. **Recommendation Logic:** A candidate is eligible if their proficiency for each required skill meets or exceeds the project's minimum threshold.
3. **Allocation Tracking:** An employee's total allocated effort across active projects cannot exceed 100%.
4. **Permission Model:** Each role operates within defined boundaries; HR and System Admin may perform override actions on behalf of other roles.
5. **Staffing Approval:** No employee can be assigned to a project without HR/Resource Manager approval.
