# .NET Entity Framework Core

## Column Type Mapping

| Logical | .NET Type | SQL Type |
|---|---|---|
| id / identifier | `Guid` | `uniqueidentifier` |
| name, title, label | `string` | `nvarchar(255)` |
| description, notes | `string` | `nvarchar(max)` |
| url | `string` | `nvarchar(500)` |
| status, type, role | `string` (enum-backed) | `nvarchar(50)` |
| level, count, percentage | `int` | `int` |
| flag, boolean | `bool` | `bit` |
| date | `DateOnly` | `date` |
| datetime, timestamp | `DateTime` | `datetime2` |