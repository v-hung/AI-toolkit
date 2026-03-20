# RD Convention

Shared ID convention for all prompts and generated documents in `01_Requirements_Document/`.

---

## ID Symbols

| Symbol | Meaning                           | Format                | Example    |
| ------ | --------------------------------- | --------------------- | ---------- |
| `MM`   | Module index                      | Two-digit zero-padded | `01`, `02` |
| `NN`   | Feature index within module       | Two-digit zero-padded | `01`, `02` |
| `PP`   | Use case index within feature     | Two-digit zero-padded | `01`, `02` |
| `FF`   | Flow step index within a use case | Two-digit zero-padded | `01`, `03` |
| `RR`   | Business Rule index, global       | Two-digit zero-padded | `01`, `12` |
| `EE`   | Entity index, global              | Two-digit zero-padded | `01`, `05` |
| `SS`   | Screen index, global              | Two-digit zero-padded | `01`, `12` |

---

## Composite IDs

| ID             | Pattern            | Example          |
| -------------- | ------------------ | ---------------- |
| Feature        | `F[MM].[NN]`       | `F01.02`         |
| Module         | `M[MM]`            | `M01`            |
| Use Case       | `UC[MM].[NN].[PP]` | `UC01.02.01`     |
| Alternate Flow | `AF[NN]`           | `AF01`           |
| Exception Flow | `EF[NN]`           | `EF01`           |
| Business Rule  | `BR[RR]`           | `BR01`, `BR12`   |
| Entity         | `E[EE]`            | `E01`, `E05`     |
| Screen         | `SCR[SS]`          | `SCR01`, `SCR12` |

---

## Scope Rules

| ID                 | Scope        | Meaning                                              |
| ------------------ | ------------ | ---------------------------------------------------- |
| `F[MM].[NN]`       | Per module   | `NN` resets to `01` for each new module              |
| `UC[MM].[NN].[PP]` | Per feature  | `PP` resets to `01` for each new feature             |
| `AF[NN]`, `EF[NN]` | Per use case | Reset to `01` for each new UC                        |
| `FF`               | Per flow     | Reset to `01` for each Main/Alternate/Exception Flow |
| `BR[RR]`           | Global       | Sequential across entire `04_business_rules.md`         |
| `E[EE]`            | Global       | Sequential across entire `05_data_model.md`             |
| `SCR[SS]`          | Global       | Sequential across entire `screen_list.md`            |

---

## General Rules

- All indices are two-digit zero-padded — `01` not `1`
- Do not skip indices
- Once assigned, IDs must not change — downstream documents reference them
- Global IDs (`BR`, `E`, `SCR`) are assigned after deduplication
