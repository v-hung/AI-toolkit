# Table List

<!-- source: data_model.md -->
<!-- total: 8 tables -->

| No | Table | Entity | Description |
|---|---|---|---|
| 1 | Users | E01 | User accounts with extended profile and role fields (extends IdentityUser) |
| 2 | SkillCategories | E02 | Taxonomy categories that group named skills |
| 3 | Skills | E03 | Named skills belonging to a skill category |
| 4 | SkillEntries | E04 | Employee skill proficiency records on a user profile |
| 5 | SkillProfileHistories | E05 | Versioned history of employee skill profile changes |
| 6 | Projects | E06 | Project registry records |
| 7 | ProjectSkillRequirements | E07 | Skill requirements associated with a project |
| 8 | Assignments | E08 | Employee project assignment records |

---

> **Note:** Framework-managed ASP.NET Identity tables (`AspNetRoles`, `AspNetUserRoles`, `AspNetUserClaims`, `AspNetRoleClaims`, `AspNetUserLogins`, `AspNetUserTokens`) are excluded — managed automatically by ASP.NET Core Identity.
