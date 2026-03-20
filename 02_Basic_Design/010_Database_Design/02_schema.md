# Database Schema

<!-- source: data_model.md, 04_business_rules.md -->

---

## Users

**Entity:** E01 — User
**Extends:** IdentityUser

> Custom columns only. The following fields are inherited from `IdentityUser` and must not be redefined:
> `Id`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`.

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| FullName | nvarchar(255) | NO | NOT NULL | BR02 — Name required on account creation |
| Role | nvarchar(50) | NO | NOT NULL | BR02, BR33 — One of: Admin, ProjectManager, Employee |
| Status | nvarchar(50) | NO | NOT NULL | BR04 — One of: Active, Inactive |
| AvatarUrl | nvarchar(500) | YES | | UI display field |
| DisplayName | nvarchar(255) | YES | | UI display field |

---

## SkillCategories

**Entity:** E02 — SkillCategory
**Extends:** BaseEntity

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| Name | nvarchar(255) | NO | NOT NULL, UNIQUE | BR06 — Category name must be unique across taxonomy |
| Id | uniqueidentifier | NO | PK | From BaseEntity |
| CreatedAt | datetime2 | NO | | From BaseEntity |
| UpdatedAt | datetime2 | NO | | From BaseEntity |

---

## Skills

**Entity:** E03 — Skill
**Extends:** BaseEntity

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| Name | nvarchar(255) | NO | NOT NULL | BR05 — Unique within category; enforced via composite UNIQUE(SkillCategoryId, Name) |
| SkillCategoryId | uniqueidentifier | NO | NOT NULL, FK → SkillCategories | — |
| DeletedAt | datetime2 | YES | | Soft delete — BR24: profiles must be flagged when a skill is removed from taxonomy |
| Id | uniqueidentifier | NO | PK | From BaseEntity |
| CreatedAt | datetime2 | NO | | From BaseEntity |
| UpdatedAt | datetime2 | NO | | From BaseEntity |

**Additional Constraints:**
- `UNIQUE (SkillCategoryId, Name)` — BR05

---

## SkillEntries

**Entity:** E04 — SkillEntry
**Extends:** BaseEntity

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| UserId | nvarchar(450) | NO | NOT NULL, FK → Users | — |
| SkillId | uniqueidentifier | NO | NOT NULL, FK → Skills | BR08 — Skill must exist in current taxonomy |
| ProficiencyLevel | int | NO | NOT NULL, CHECK(1 <= ProficiencyLevel AND ProficiencyLevel <= 5) | BR07, BR30 — Fixed 1–5 scale |
| YearsOfExperience | int | YES | | Optional self-reported value |
| IsFlaggedForReview | bit | NO | NOT NULL | BR24 — Set to 1 when referenced skill is removed from taxonomy |
| Id | uniqueidentifier | NO | PK | From BaseEntity |
| CreatedAt | datetime2 | NO | | From BaseEntity |
| UpdatedAt | datetime2 | NO | | From BaseEntity |

---

## SkillProfileHistories

**Entity:** E05 — SkillProfileHistory
**Extends:** BaseEntity

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| ProfileOwnerId | nvarchar(450) | NO | NOT NULL, FK → Users | The employee whose profile was modified |
| ChangeType | nvarchar(50) | NO | NOT NULL | Values: Add, Edit, Remove |
| Timestamp | datetime2 | NO | NOT NULL | BR25 — Date and time the change occurred |
| ChangedById | nvarchar(450) | NO | NOT NULL, FK → Users | BR25 — Identity of the actor who performed the change |
| Id | uniqueidentifier | NO | PK | From BaseEntity |
| CreatedAt | datetime2 | NO | | From BaseEntity |
| UpdatedAt | datetime2 | NO | | From BaseEntity |

---

## Projects

**Entity:** E06 — Project
**Extends:** BaseEntity

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| Name | nvarchar(255) | NO | NOT NULL | BR09 — Required on project creation |
| Description | nvarchar(max) | YES | | Optional narrative description |
| Status | nvarchar(50) | NO | NOT NULL | BR09 — Required; e.g. Active, Completed, On Hold |
| StartDate | date | NO | NOT NULL | BR09 — Required on project creation |
| EndDate | date | YES | | Optional planned end date |
| Id | uniqueidentifier | NO | PK | From BaseEntity |
| CreatedAt | datetime2 | NO | | From BaseEntity |
| UpdatedAt | datetime2 | NO | | From BaseEntity |

---

## ProjectSkillRequirements

**Entity:** E07 — ProjectSkillRequirement
**Extends:** BaseEntity

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| ProjectId | uniqueidentifier | NO | NOT NULL, FK → Projects | — |
| SkillId | uniqueidentifier | NO | NOT NULL, FK → Skills | BR10 — Skill must exist in taxonomy |
| MinimumProficiencyLevel | int | NO | NOT NULL, CHECK(1 <= MinimumProficiencyLevel AND MinimumProficiencyLevel <= 5) | BR07 — Fixed 1–5 scale |
| Id | uniqueidentifier | NO | PK | From BaseEntity |
| CreatedAt | datetime2 | NO | | From BaseEntity |
| UpdatedAt | datetime2 | NO | | From BaseEntity |

**Additional Constraints:**
- `UNIQUE (ProjectId, SkillId)` — BR11 — Each skill may appear at most once per project's requirements

---

## Assignments

**Entity:** E08 — Assignment
**Extends:** BaseEntity

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| UserId | nvarchar(450) | NO | NOT NULL, FK → Users | The assigned employee |
| ProjectId | uniqueidentifier | NO | NOT NULL, FK → Projects | — |
| StartDate | date | NO | NOT NULL | BR12 — Required on assignment creation |
| EndDate | date | YES | | BR13 — If provided, must be after StartDate (application-level) |
| CapacityPercentage | int | NO | NOT NULL, CHECK(CapacityPercentage > 0) | BR12 — Must be positive numeric value |
| ProjectRole | nvarchar(255) | NO | NOT NULL | BR12 — Required on assignment creation |
| Status | nvarchar(50) | NO | NOT NULL | Values: Active, Closed |
| Id | uniqueidentifier | NO | PK | From BaseEntity |
| CreatedAt | datetime2 | NO | | From BaseEntity |
| UpdatedAt | datetime2 | NO | | From BaseEntity |

**Application-Level Constraints:**
- BR13 — EndDate must be after StartDate when both are provided
- BR26 — Over-allocation warning when total active CapacityPercentage for a user exceeds 100% (PRM: application-level check, not DB constraint)
