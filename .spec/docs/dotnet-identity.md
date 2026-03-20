# .NET Identity

## Managed Tables

ASP.NET Core Identity manages the following tables automatically. Do not define or modify these in schema generation:

| Table | Purpose |
|---|---|
| `AspNetUsers` | User accounts |
| `AspNetRoles` | Role definitions |
| `AspNetUserRoles` | User-role assignments |
| `AspNetUserClaims` | User claims |
| `AspNetRoleClaims` | Role claims |
| `AspNetUserLogins` | External login providers |
| `AspNetUserTokens` | Auth tokens |

## Extending IdentityUser

Custom `User` entity extends `IdentityUser`. The following fields are already provided by `IdentityUser` — do not add them:

- `Id` (string, GUID)
- `UserName`
- `NormalizedUserName`
- `Email`
- `NormalizedEmail`
- `EmailConfirmed`
- `PasswordHash`
- `SecurityStamp`
- `ConcurrencyStamp`
- `PhoneNumber`
- `PhoneNumberConfirmed`
- `TwoFactorEnabled`
- `LockoutEnd`
- `LockoutEnabled`
- `AccessFailedCount`

Only add fields not in this list when extending `IdentityUser`.

## Base Entity

All non-Identity entities should include:

- `Id` — Guid, primary key
- `CreatedAt` — datetime, set on insert
- `UpdatedAt` — datetime, set on update

These are inherited from a shared `BaseEntity` class — do not repeat in schema unless entity does not extend `BaseEntity`.

## Naming Convention

- Entity class names: PascalCase, singular (e.g., `SkillEntry`, `Project`)
- Property names: PascalCase (e.g., `FirstName`, `StartDate`)
- Foreign key properties: `[EntityName]Id` (e.g., `UserId`, `ProjectId`)
- DB naming handled by EF Core naming convention config — do not specify table/column names manually