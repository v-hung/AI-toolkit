# Project Overview — Skill-Matching Hub (SMH)

## 1. Background

Organizations managing large employee pools face significant friction when assigning personnel to projects. Skill data is typically scattered across spreadsheets or HR systems with no structured way to query, compare, or match employee competencies against project requirements. This leads to suboptimal staffing decisions, delays in project kick-off, and underutilization of available talent.

Skill-Matching Hub (SMH) is an internal web-based system designed for a single organization (~500 employees) to centralize skill data and streamline the project staffing process through structured skill profiles, searchable talent pools, and assignment tracking.

## 2. Objectives

1. **Centralize skill data** — Provide a single source of truth for employee skill profiles, replacing ad-hoc spreadsheets.
2. **Accelerate staffing decisions** — Enable Project Managers to find qualified candidates within minutes using skill-based search and filters.
3. **Improve assignment accuracy** — Reduce skill-mismatch assignments by ≥30% compared to manual processes within 6 months of go-live.
4. **Provide staffing visibility** — Give Admins and PMs real-time reports on resource availability and skill distribution across the organization.
5. **Support data-driven decisions** — Enable management to identify skill gaps across teams and plan workforce development accordingly.

## 3. Scope

### In Scope

- Employee skill profile management (create, update, version skill entries)
- Skill taxonomy management (skill categories, proficiency levels)
- Project registry (create and manage projects with required skill sets)
- Skill-based employee search and filtering
- Project assignment management (assign/unassign employees to projects, track assignment periods)
- Basic reporting: resource utilization, skill distribution, assignment history
- Role-based access control (Admin, Project Manager, Employee)
- User account management (Admin-managed accounts)

### Out of Scope

- Payroll and compensation management
- Performance review and appraisal workflows
- Training and learning management
- Recruitment and onboarding
- External integrations (no Active Directory, SSO, or third-party HR systems)
- Mobile native applications
- Multi-organization / multi-tenant support

## 4. Stakeholders

| Role | Description | System Permissions |
|------|-------------|-------------------|
| Admin | System administrator responsible for user management, skill taxonomy, and system configuration | Full access: manage users, roles, skill taxonomy, projects, assignments, reports, system settings |
| Project Manager (PM) | Manages projects and is responsible for staffing decisions | Create/edit projects; search and view employee profiles; create/manage assignments for own projects; view reports |
| Employee | Individual contributor whose skill profile is maintained in the system | View and update own skill profile; view own assignment history; read-only access to own project information |

## 5. Constraints & Assumptions

**Constraints:**

- The system is deployed on-premise within the organization's own infrastructure with no dependency on external cloud services or third-party APIs.
- No integration with external systems (Active Directory, SSO, ERP, or other HR platforms); user accounts are managed directly within SMH.
- The system must support up to 500 registered users with a maximum of 200 concurrent sessions.
- Development must adhere to a standard web application stack (to be defined in BD); no proprietary or exotic dependencies.

**Assumptions:**

- All users access the system via a modern web browser (Chrome, Edge, Firefox — latest 2 major versions); no legacy browser support required.
- Skill taxonomy (categories and proficiency scale) is defined by the Admin before employee onboarding begins.
- An employee has exactly one active account; account provisioning is performed exclusively by Admins.
- Proficiency levels follow a fixed 5-point scale (1 = Beginner → 5 = Expert) applicable uniformly across all skill categories.
- Project Managers are responsible for the accuracy of project skill requirements they enter.
- Initial data migration (if any) from existing spreadsheets is out of scope for the system itself; it is a manual one-time operational task.

## 6. Glossary

| Term | Definition |
|------|------------|
| Skill Profile | A structured record of an employee's competencies, each entry containing a skill name, category, proficiency level, and optional years of experience. |
| Skill Taxonomy | The organization-wide classification system for skills, consisting of skill categories (e.g., Backend, Frontend, DevOps) and the standardized list of skills within each category. |
| Proficiency Level | A numeric rating from 1 to 5 indicating an employee's expertise in a skill: 1 = Beginner, 2 = Elementary, 3 = Intermediate, 4 = Advanced, 5 = Expert. |
| Assignment | A formal record linking one Employee to one Project for a defined period, including start date, optional end date, allocated capacity (%), and role on the project. |
| Resource Availability | The remaining allocatable capacity of an employee, calculated as 100% minus the sum of all active assignment capacities for that employee. |
| Skill Gap | The difference between the skill requirements defined for a project and the skills available among currently assigned or candidate employees. |
| Talent Pool | The full set of employees whose skill profiles match a defined set of search criteria; used by PMs during the staffing search process. |
| Project Registry | The centralized list of all projects within the system, each with metadata (name, description, status, timeline) and a defined set of required skills. |
| Staffing | The process of identifying, selecting, and assigning employees to a project based on skill requirements and availability. |

## 7. Non-Functional Requirements

| Type | Requirement |
|------|-------------|
| Performance | Page load and search query response time ≤ 2 seconds under normal load (≤ 200 concurrent users). |
| Scalability | System must support up to 500 registered user accounts and up to 10,000 skill profile entries without architectural changes. |
| Availability | System uptime ≥ 99.5% during business hours (08:00–18:00, Monday–Friday); scheduled maintenance windows permitted outside these hours. |
| Security | All data transmitted between client and server must use TLS 1.2 or higher; passwords must be stored as salted hashes (bcrypt, min cost factor 12). |
| Authorization | Access control must enforce role-based permissions; unauthorized access to any resource must return HTTP 403 and be logged. |
| Auditability | All create, update, and delete operations on skill profiles, assignments, and user accounts must be logged with timestamp, actor, and change summary; logs retained for ≥ 12 months. |
| Usability | Core workflows (skill search → view profile → create assignment) must be completable in ≤ 5 user interactions without documentation. |
| Data Integrity | Deleting a skill from the taxonomy must not silently remove it from existing employee profiles; the system must flag affected profiles for review. |
| Backup & Recovery | Daily automated backups; Recovery Point Objective (RPO) ≤ 24 hours; Recovery Time Objective (RTO) ≤ 4 hours. |
| Browser Compatibility | Full functionality on Chrome, Edge, and Firefox (latest 2 major versions each); no Internet Explorer support required. |
