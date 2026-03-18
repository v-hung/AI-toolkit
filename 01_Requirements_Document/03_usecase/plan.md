# Use Case Plan

<!-- source: 02_features.md -->
<!-- total: 5 files to generate -->

## Generation Checklist

- [ ] M01 — User Management → `M01_user_management.md`
- [ ] M02 — Skill Administration → `M02_skill_administration.md`
- [ ] M03 — Project Registry → `M03_project_registry.md`
- [ ] M04 — Staffing → `M04_staffing.md`
- [ ] M05 — Reporting → `M05_reporting.md`

---

## M01 — User Management

**Output file:** `./01_Requirements_Document/03_usecase/M01_user_management.md`

**Features**

- F01.01 — Account Provisioning
- F01.02 — Role Assignment

**Actors by Feature**

- F01.01 → Admin
- F01.02 → Admin

---

## M02 — Skill Administration

**Output file:** `./01_Requirements_Document/03_usecase/M02_skill_administration.md`

**Features**

- F02.01 — Taxonomy Configuration
- F02.02 — Skill Profile Update

**Actors by Feature**

- F02.01 → Admin
- F02.02 → Employee, Admin

---

## M03 — Project Registry

**Output file:** `./01_Requirements_Document/03_usecase/M03_project_registry.md`

**Features**

- F03.01 — Project Creation
- F03.02 — Project Skill Requirement Definition

**Actors by Feature**

- F03.01 → Project Manager, Admin
- F03.02 → Project Manager, Admin

**Depends On**

- M02 — Skill Administration

---

## M04 — Staffing

**Output file:** `./01_Requirements_Document/03_usecase/M04_staffing.md`

**Features**

- F04.01 — Skill-Based Employee Search
- F04.02 — Project Staffing

**Actors by Feature**

- F04.01 → Project Manager
- F04.02 → Project Manager

**Depends On**

- M02 — Skill Administration
- M03 — Project Registry

---

## M05 — Reporting

**Output file:** `./01_Requirements_Document/03_usecase/M05_reporting.md`

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

- M02 — Skill Administration
- M03 — Project Registry
- M04 — Staffing

---
