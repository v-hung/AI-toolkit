---
description: Generate database design files from logical data model. No clarification, direct generation.
argument-hint: "No arguments — reads data model automatically."
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate three files from the logical data model:

1. `./02_Basic_Design/010_Database_Design/01_table_list.md` — table inventory
2. `./02_Basic_Design/010_Database_Design/02_schema.md` — detailed schema per table
3. `./02_Basic_Design/010_Database_Design/03_relationships.md` — ERD diagram

---

## Execution Steps

### Step 1 — Pre-Flight Check

Read the following files. If any is missing → STOP and report:

- `./.spec/docs/convention.md`
- `./.spec/docs/dotnet-identity.md` — managed tables and base entity
- `./.spec/docs/dotnet-ef.md` — column type mapping conventions
- `./01_Requirements_Document/05_data_model.md`
- `./01_Requirements_Document/04_business_rules.md`

---

### Step 2 — Table Derivation

For each entity `E[EE]` in `05_data_model.md`:

- Derive table name from entity name — plural form
- Skip entities listed as framework-managed in `./.spec/docs/dotnet-identity.md`
- Add base entity fields per `./.spec/docs/dotnet-identity.md` unless entity extends the auth model
- Add UI-appropriate fields where conventionally expected:
  - `User` entity → `AvatarUrl`, `DisplayName`
  - Any entity with soft-delete behavior implied by UC (deactivate, archive) → `DeletedAt`

**UI field rules:**
- Only add fields that are stateless display data
- Do not add fields that introduce new business logic not in `04_business_rules.md`
- Do not add fields that create new relationships not in `05_data_model.md`

---

### Step 3 — Column Type Mapping

Use type mapping from `./.spec/docs/dotnet-ef.md`.

---

### Step 4 — Constraint Mapping

For each table, apply constraints from `04_business_rules.md`:

- `VAL` rules → column constraints (NOT NULL, UNIQUE, CHECK)
- `PRM` rules → note as access constraint, not DB constraint
- `BIZ` rules → note as application-level constraint if not enforceable in DB

---

### Step 5 — Output Generation

Write all three files.

---

## Output Format

### File 1 — Table List

```markdown
# Table List

<!-- source: 05_data_model.md -->
<!-- total: [N] tables -->

| No | Table | Entity | Description |
|---|---|---|---|
| [N] | [TableName] | E[EE] | [One-line description] |
```

---

### File 2 — Schema

```markdown
# Database Schema

<!-- source: 05_data_model.md, 04_business_rules.md -->

---

## [TableName]

**Entity:** E[EE] — [Entity Name]
**Extends:** BaseEntity | IdentityUser *(pick one, omit if neither)*

| Column | Type | Nullable | Constraints | Notes |
|---|---|---|---|---|
| Id | Guid | NO | PK | From BaseEntity |
| [Column] | [Type] | YES/NO | [UNIQUE/FK/CHECK...] | BR[RR] |
| CreatedAt | DateTime | NO | | From BaseEntity |
| UpdatedAt | DateTime | NO | | From BaseEntity |
| DeletedAt | DateTime | YES | | Soft delete |

---

## [NextTable]

(repeat)
```

---

### File 3 — Relationships

````markdown
# Entity Relationships

<!-- source: 05_data_model.md -->

```mermaid
erDiagram
  [TableName] ||--o{ [TableName] : "[relationship label]"

  [TableName] {
    uuid Id
    string [Column]
  }
```
````

---

## Output Format Rules

**Table List:**
- One row per table, sorted by entity ID `E[EE]`
- Framework-managed tables not listed — see `./.spec/docs/dotnet-identity.md`

**Schema:**
- One section per table
- Columns from BaseEntity (`Id`, `CreatedAt`, `UpdatedAt`) listed last with note "From BaseEntity"
- `DeletedAt` only if entity has deactivation/soft-delete behavior in UC
- Constraints column: `PK`, `FK → [Table]`, `UNIQUE`, `NOT NULL`, `CHECK(...)` — use BR[RR] in Notes when constraint comes from a rule
- `PRM` rules noted in Notes column, not as DB constraint

**ERD:**
- Use Mermaid `erDiagram`
- Entity names in ERD match table names
- Only include attributes that are non-BaseEntity, non-obvious columns
- Relationship labels are short verbs from `05_data_model.md`

---

## Behavioral Rules

- Generate immediately — no clarification questions
- Do not create tables for framework-managed entities — see `./.spec/docs/dotnet-identity.md`
- Only list entities from data_model.md — do not include framework-managed tables
- User entity listed as `Users`, not by framework table name
- UI fields added only when stateless and conventionally expected
- New fields must not introduce relationships or business logic not in `05_data_model.md`
- Write File 1, then File 2, then File 3