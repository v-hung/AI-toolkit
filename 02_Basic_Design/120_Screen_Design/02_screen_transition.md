# Screen Transition

<!-- source: 06_screens/plan.md -->

---

## M01 — User Management

```mermaid
flowchart TD
  SCR01["SCR01<br>User List"]
  SCR02["SCR02<br>New Account Form"]
  SCR03["SCR03<br>User Account Detail"]
  SCR04["SCR04<br>Deactivate Account Confirmation<br>«dialog»"]
  SCR05["SCR05<br>Role Selection"]
  SCR10["SCR10<br>Employee Skill Profile<br>‹M02›"]

  SCR01 -->|push| SCR02
  SCR01 -->|push| SCR03
  SCR02 -->|replace| SCR03
  SCR02 -->|back| SCR01
  SCR03 -->|modal| SCR04
  SCR04 -->|back| SCR03
  SCR03 -->|push| SCR05
  SCR05 -->|back| SCR03
  SCR03 -->|"push → ‹M02›"| SCR10
```

---

## M02 — Skill Administration

```mermaid
flowchart TD
  SCR06["SCR06<br>Taxonomy Configuration"]
  SCR07["SCR07<br>Category Form"]
  SCR08["SCR08<br>Skill Taxonomy Form"]
  SCR09["SCR09<br>Remove Skill Confirmation<br>«dialog»"]
  SCR10["SCR10<br>Employee Skill Profile"]
  SCR11["SCR11<br>Skill Entry Form"]
  SCR12["SCR12<br>Remove Skill Entry Confirmation<br>«dialog»"]
  SCR13["SCR13<br>Skill Profile Change History"]

  SCR06 -->|push| SCR07
  SCR07 -->|back| SCR06
  SCR06 -->|push| SCR08
  SCR08 -->|back| SCR06
  SCR06 -->|modal| SCR09
  SCR09 -->|back| SCR06
  SCR10 -->|push| SCR11
  SCR11 -->|back| SCR10
  SCR10 -->|modal| SCR12
  SCR12 -->|back| SCR10
  SCR10 -->|push| SCR13
```

---

## M03 — Project Registry

```mermaid
flowchart TD
  SCR14(["SCR14<br>Project List"])
  SCR15["SCR15<br>New Project Form"]
  SCR16["SCR16<br>Project Detail"]
  SCR17["SCR17<br>Project Edit Form"]
  SCR18["SCR18<br>Skill Requirement Form"]
  SCR19["SCR19<br>Remove Skill Requirement Confirmation<br>«dialog»"]
  SCR23["SCR23<br>Unassignment Confirmation<br>‹M04›"]

  SCR14 -->|push| SCR15
  SCR15 -->|replace| SCR16
  SCR14 -->|push| SCR16
  SCR16 -->|push| SCR17
  SCR17 -->|back| SCR16
  SCR16 -->|push| SCR18
  SCR18 -->|back| SCR16
  SCR16 -->|modal| SCR19
  SCR19 -->|back| SCR16
  SCR16 -->|"modal → ‹M04›"| SCR23
```

---

## M04 — Staffing

```mermaid
flowchart TD
  SCR20["SCR20<br>Talent Search"]
  SCR21["SCR21<br>Assignment Creation"]
  SCR22["SCR22<br>Assignment Confirmation"]
  SCR23(["SCR23<br>Unassignment Confirmation<br>«dialog»"])

  SCR20 -->|push| SCR21
  SCR21 -->|replace| SCR22
  SCR21 -->|back| SCR20
```

---

## M05 — Reporting

```mermaid
flowchart TD
  SCR24(["SCR24<br>Reports Dashboard"])
  SCR25["SCR25<br>Resource Utilization Report"]
  SCR26["SCR26<br>Skill Distribution Report"]
  SCR27["SCR27<br>Skill Gap Analysis"]
  SCR28["SCR28<br>Assignment History Report"]

  SCR24 -->|push| SCR25
  SCR24 -->|push| SCR26
  SCR24 -->|push| SCR27
  SCR24 -->|push| SCR28
```
