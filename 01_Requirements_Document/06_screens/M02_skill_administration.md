# M02 — Skill Administration

<!-- source: 03_usecases/M02_skill_administration.md, 04_business_rules.md, 05_data_model.md -->
<!-- module: M02 -->
<!-- screens: SCR06, SCR07, SCR08, SCR09, SCR10, SCR11, SCR12, SCR13 -->

---

### SCR06 — Taxonomy Configuration `screen`

**Actor:** Admin
**Trigger:**
- UC02.01.01 Main Flow step 01–02 — Admin navigates to Taxonomy Configuration section; system displays current list of categories and their skills
- UC02.01.02 Main Flow step 01–02 — Admin navigates to Taxonomy Configuration page; system displays taxonomy
- UC02.01.03 Main Flow step 01–02 — Admin navigates to Taxonomy Configuration page; system displays taxonomy

**Navigates From**
- Entry point

**Navigates To**
- SCR07 — Category Form — Admin initiates category creation or edit action
- SCR08 — Skill Taxonomy Form — Admin initiates add skill action under a category
- SCR09 — Remove Skill Confirmation — Admin initiates skill removal action

**Data Displayed**
- E02 — SkillCategory: id, name
- E03 — Skill: id, name (grouped under parent category)

**Constraints**
- BR16 — Taxonomy management controls are not exposed to non-Admin actors

**States**
- Default — taxonomy displayed with all categories and their associated skills
- Empty — no skill categories exist in the taxonomy
- Loading — taxonomy data is being fetched
- Restricted — actor does not hold Admin role; taxonomy management controls not exposed

---

### SCR07 — Category Form `screen`

**Actor:** Admin
**Trigger:**
- UC02.01.01 Main Flow step 04 — Admin initiates category creation; system displays form to enter new category name
- UC02.01.01 AF01 step 02 — Admin selects existing category for edit; system displays edit form pre-populated with current category name

**Navigates From**
- SCR06 — Taxonomy Configuration

**Navigates To**
- SCR06 — Taxonomy Configuration — Admin submits or cancels category form

**Data Displayed**
- E02 — SkillCategory: name (pre-populated for edit mode; empty for create mode)

**Constraints**
- BR06 — Category name must be unique across the taxonomy; validation error displayed on duplicate or empty submission

**States**
- Default — empty form (create) or pre-populated form (edit)
- Error — submitted category name is empty or already exists (UC02.01.01 EF01)
- Success — category saved; form closes and taxonomy returns to SCR06

---

### SCR08 — Skill Taxonomy Form `screen`

**Actor:** Admin
**Trigger:**
- UC02.01.02 Main Flow step 04 — Admin initiates add skill action under a selected category; system displays form to enter skill name

**Navigates From**
- SCR06 — Taxonomy Configuration

**Navigates To**
- SCR06 — Taxonomy Configuration — Admin submits or cancels skill form

**Data Displayed**
- E02 — SkillCategory: name (selected category context)
- E03 — Skill: name (new entry input field)

**Constraints**
- BR05 — Skill name must be unique within the selected category; validation error displayed on duplicate or empty submission

**States**
- Default — empty form with selected category shown as context
- Error — submitted skill name is empty or already exists in the category (UC02.01.02 EF01)
- Success — skill saved; form closes and taxonomy returns to SCR06

---

### SCR09 — Remove Skill Confirmation `dialog`

**Actor:** Admin
**Trigger:**
- UC02.01.03 Main Flow step 05 — Admin initiates skill removal; system displays confirmation dialog showing skill name and count of employee profiles that will be flagged

**Navigates From**
- SCR06 — Taxonomy Configuration

**Navigates To**
- SCR06 — Taxonomy Configuration — Admin confirms or cancels skill removal

**Data Displayed**
- E03 — Skill: name (skill selected for removal)
- E04 — SkillEntry: count of entries referencing the selected skill (derived count)

**Constraints**
- BR24 — All employee skill profile entries referencing the removed skill will be automatically flagged for review; affected count must be displayed before confirmation

**States**
- Default — confirmation prompt showing skill name and number of affected employee profiles
- Success — skill removed; taxonomy updated; notification shown with count of flagged profiles

---

### SCR10 — Employee Skill Profile `screen`

**Actor:** Employee (own profile); Admin (any employee profile)
**Trigger:**
- UC02.02.01 Main Flow step 02 — Employee navigates to their own skill profile page; system displays skill entries grouped by category
- UC02.02.02 Main Flow step 06 — Admin navigates to skill profile section of a selected employee's profile; system displays employee skill entries

**Navigates From**
- Entry point (Employee navigating to own profile)
- SCR03 (M01) — User Account Detail — Admin navigates to skill profile section from user account detail

**Navigates To**
- SCR11 — Skill Entry Form — Employee or Admin initiates add or modify skill entry
- SCR12 — Remove Skill Entry Confirmation — Employee or Admin initiates remove skill entry action
- SCR13 — Skill Profile Change History — Actor navigates to change history section of the profile

**Data Displayed**
- E01 — User: name (profile owner context)
- E02 — SkillCategory: name (grouping header for skill entries)
- E03 — Skill: name (per skill entry)
- E04 — SkillEntry: proficiency_level, years_of_experience, is_flagged_for_review

**Constraints**
- BR17 — Employee may only view and modify their own profile; edit controls not exposed for other employees' profiles
- BR30 — Proficiency levels displayed on fixed 1–5 scale

**States**
- Default — skill entries displayed and grouped by category
- Empty — no skill entries exist on the profile
- Loading — skill profile data is being fetched
- Restricted — Employee actor attempting to access another user's profile; edit controls not exposed

---

### SCR11 — Skill Entry Form `screen`

**Actor:** Employee (own profile); Admin (any employee profile)
**Trigger:**
- UC02.02.01 Main Flow step 04 — Employee initiates adding a new skill entry; system displays form with category, skill name, proficiency level, and optional years of experience
- UC02.02.01 AF01 step 02 — Employee initiates modifying a skill entry; system displays edit form pre-populated with current proficiency level and years of experience
- UC02.02.02 Main Flow step 08 — Admin initiates adding a new skill entry on employee profile; system displays form
- UC02.02.02 AF01 step 02 — Admin initiates modifying an existing skill entry; system displays edit form pre-populated with current values

**Navigates From**
- SCR10 — Employee Skill Profile

**Navigates To**
- SCR10 — Employee Skill Profile — Actor submits or cancels skill entry form

**Data Displayed**
- E02 — SkillCategory: name (dropdown options for category selection)
- E03 — Skill: name (dropdown filtered by selected category)
- E04 — SkillEntry: proficiency_level, years_of_experience (pre-populated for modify mode)

**Constraints**
- BR07 — Proficiency level must be an integer between 1 and 5 inclusive
- BR08 — Selected skill must exist in the current taxonomy at time of submission
- BR30 — Proficiency scale is fixed at 1–5; not configurable

**States**
- Default — empty form (add mode) or pre-populated form (modify mode)
- Error — duplicate skill entry detected (UC02.02.01 EF01 / UC02.02.02 EF01); proficiency level out of range (BR07); skill not found in taxonomy (BR08)
- Success — skill entry saved; profile updated; form closes and returns to SCR10

---

### SCR12 — Remove Skill Entry Confirmation `dialog`

**Actor:** Employee (own profile); Admin (any employee profile)
**Trigger:**
- UC02.02.01 AF02 step 02 — Employee initiates skill entry removal; system displays confirmation prompt
- UC02.02.02 AF02 step 02 — Admin initiates skill entry removal on employee profile; system displays confirmation prompt

**Navigates From**
- SCR10 — Employee Skill Profile

**Navigates To**
- SCR10 — Employee Skill Profile — Actor confirms or cancels skill entry removal

**Data Displayed**
- E03 — Skill: name (skill entry selected for removal)
- E04 — SkillEntry: proficiency_level (context of the entry being removed)

**Constraints**
- BR25 — Confirmed removal will generate a versioned history entry with timestamp and actor identity

**States**
- Default — confirmation prompt showing the skill entry details

---

### SCR13 — Skill Profile Change History `screen`

**Actor:** Employee (own profile); Admin (any employee profile)
**Trigger:**
- UC02.02.01 AF03 step 02 — Employee navigates to change history section; system displays chronological list of all profile changes
- UC02.02.02 AF03 step 02 — Admin navigates to change history section of employee profile; system displays chronological list of all changes

**Navigates From**
- SCR10 — Employee Skill Profile

**Data Displayed**
- E05 — SkillProfileHistory: timestamp, changed_by, change_type
- E03 — Skill: name (affected skill referenced per history entry)
- E04 — SkillEntry: proficiency_level, years_of_experience (snapshot values per history entry)

**Constraints**
- BR25 — Every successful skill profile modification generates a history entry; entries include timestamp and actor identity

**States**
- Default — chronological list of all profile change history entries
- Empty — no changes have been made to the profile
- Loading — history data is being fetched
