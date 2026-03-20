# Use Case Plan

<!-- source: 02_features.md -->
<!-- total: 5 files to generate -->

## Generation Checklist

- [x] M01 — User Management → `M01_user_management.md`
- [x] M02 — Skill Administration → `M02_skill_administration.md`
- [x] M03 — Project Registry → `M03_project_registry.md`
- [x] M04 — Staffing → `M04_staffing.md`
- [x] M05 — Reporting → `M05_reporting.md`

---

## M01 — User Management

**Output file:** `./01_Requirements_Document/03_usecases/M01_user_management.md`

**Features**
- F01.01 — Account Provisioning
- F01.02 — Role Assignment

**Actors by Feature**
- F01.01 → Admin
- F01.02 → Admin

---

## M02 — Skill Administration

**Output file:** `./01_Requirements_Document/03_usecases/M02_skill_administration.md`

**Features**
- F02.01 — Taxonomy Configuration
- F02.02 — Skill Profile Maintenance

**Actors by Feature**
- F02.01 → Admin
- F02.02 → Employee, Admin

**Context From**
- M01 — User Management — Skill profiles are accessed within the context of a user account

**Depends On**
- F02.02 → F01.01 — Requires an existing user account as the subject of the skill profile

---

## M03 — Project Registry

**Output file:** `./01_Requirements_Document/03_usecases/M03_project_registry.md`

**Features**
- F03.01 — Project Record Management
- F03.02 — Project Skill Requirement Definition

**Actors by Feature**
- F03.01 → Project Manager, Admin
- F03.02 → Project Manager, Admin

**Depends On**
- F03.02 → F02.01 — Requires the taxonomy to be defined in order to select valid skill names

---

## M04 — Staffing

**Output file:** `./01_Requirements_Document/03_usecases/M04_staffing.md`

**Features**
- F04.01 — Talent Search
- F04.02 — Assignment Management

**Actors by Feature**
- F04.01 → Project Manager
- F04.02 → Project Manager

**Context From**
- M03 — Project Registry — Assignments are created and linked within a registered project

**Depends On**
- F04.01 → F02.02 — Requires populated employee skill profiles as the searchable data set
- F04.01 → F02.01 — Requires taxonomy definitions to support skill-name filtering
- F04.02 → F03.01 — Requires an existing project record as the assignment target

---

## M05 — Reporting

**Output file:** `./01_Requirements_Document/03_usecases/M05_reporting.md`

**Features**
- F05.01 — Resource Utilization Report
- F05.02 — Skill Distribution Report
- F05.03 — Skill Gap Analysis
- F05.04 — Assignment History Report

**Actors by Feature**
- F05.01 → Admin, Project Manager
- F05.02 → Admin
- F05.03 → Admin, Project Manager
- F05.04 → Admin, Project Manager

**Depends On**
- F05.01 → F04.02 — Requires assignment records as the source of allocation data
- F05.02 → F02.02 — Requires populated skill profiles as the source data
- F05.03 → F03.02 — Requires defined project skill requirements as the baseline
- F05.03 → F02.02 — Requires employee skill profiles as the comparison data set
- F05.04 → F04.02 — Requires assignment records as the source of history data

---
