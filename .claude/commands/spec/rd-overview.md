---
description: Generate project-overview.md as the foundation for downstream RD files.
handoffs:
  - label: Build Feature List
    agent: rd-features-generate
---

## Language

Follow language settings in `claude.md`. Default to English if not specified.

## Objective

Generate `./01_requirements/project_overview.md` by analyzing
`./00_input/project_brief.md`.

This file will be used as primary input for generating:

- features.md

## Execution Steps

### Step 1 - Pre-Flight Check

- Read `./00_input/project_brief.md`
- If missing or empty → STOP and ask the user to provide the project brief first

### Step 2 - Ambiguity Scan

Scan for gaps across these pillars (RD-relevant only):

- **Problem & Objectives:** Is the problem statement clear? Are the objectives measurable?
- **Scope Boundaries:** Are in-scope and out-of-scope boundaries clearly defined?
- **User Roles & Permissions:** Are all roles and their permissions fully identified?
- **Constraints & Assumptions:** Are external integrations, environment constraints, and limitations clear?
- **Domain Glossary:** Are there domain-specific terms that need explicit Documents?

### Step 3 - Clarification Loop (0–5 questions)

- Ask at most 5 questions, one at a time
- **CRITICAL**: You must start with a clear, direct question (e.g., "What is the primary deployment environment?").
- Format for each question:
  - Question [N]/5: [Clear Question Title]
  - The Question: [Explicitly ask the user for missing info]
  - Context: State clearly why this information affects downstream files
  - Recommendation: Provide your recommendation first with a brief justification
  - Choice table: with columns: [Option | Description | Impact]
  - Accept answers: "A/B/C", "yes", "recommended", or a short phrase (≤ 5 words)
- Stop if the user says "done", "skip", "proceed", or 5 questions have been reached

### Step 4 - Output Generation

Generate the file with the following structure (no sections added or removed):

```markdown
# Project Overview — {Project Name}

## 1. Background

## 2. Objectives

## 3. Scope

### In Scope

### Out of Scope

## 4. Stakeholders

| Role | Description | System Permissions |

## 5. Constraints & Assumptions

## 6. Glossary

| Term | Document |

## 7. Non-Functional Requirements

| Type | Requirement |
```

## Behavioral Rules

- Do NOT include a feature list — that belongs in `features.md`
- Do NOT mention tech stack or architecture — those belong in BD
- Glossary must define all domain-specific terms so that LLMs reading downstream files interpret them correctly
- NFR entries must be specific and measurable (include numbers) to serve as valid input for System Architecture in BD — avoid vague statements
- Use technical, practical language — no marketing fluff

$ARGUMENTS
