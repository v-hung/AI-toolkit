# PROJECT BRIEF: SKILL-MATCHING HUB (SMH)

## 1. Project Overview

- **Objective:** Develop a comprehensive platform to manage employee skill profiles and automatically recommend suitable candidates for projects based on technical requirements.
- **Problem Statement:** Leaders and PMs struggle to maintain visibility into detailed staff competencies (especially niche skills). This often leads to suboptimal resource allocation and misalignment between project needs and developer expertise.
- **Core Value:** Streamlining skill-based searches, managing skill roadmaps, and optimizing resource forecasting.

## 2. Target Audience

- **PM / Resource Manager:** Identify candidates with precise technical stacks (e.g., Senior Flutter with BLoC and WebRTC experience).
- **Employees (Developers):** Maintain individual skill portfolios, track certifications, and define professional growth paths.
- **HR / Admin:** Monitor workforce trends and identify organizational training needs.

## 3. Scope of Work

### Core Features (MVP)

- **Skill Inventory:** Hierarchical skill taxonomy (Frontend, Backend, Mobile, AI, DevOps, etc.) with proficiency levels (1-5).
- **Employee Profile:** Detailed records including existing skills, project history, certifications, and leadership assessments.
- **Project Matching:** Project requirement input (e.g., Next.js + Tailwind) returning a list of available candidates with matching skill sets.
- **Availability Calendar:** Real-time resource management, tracking project commitments and bandwidth availability.

### Extended Features

- **AI-Resume Parser:** Automated extraction of candidate data from PDF resumes using lightweight OCR.
- **Project History Visualization:** Timeline-based dashboard displaying an employee's project involvement and professional evolution.
- **AI-Conversational Assistant:** Integrated Chat UI allowing PMs to query, search, and summarize team competencies using natural language (e.g., _"Find a Senior Flutter developer with WebRTC experience who is currently available"_).

## 4. Technical Requirements

- **Web Framework:** **Next.js 14+** (App Router) with **Tailwind CSS**.
- **State Management:** **Zustand** or **React Context** (to handle complex filtering states).
- **Backend:** **Node.js (Fastify)** or **NestJS** for high-performance RESTful APIs.
- **Database:** **PostgreSQL** for managing complex relational data between Employees, Skills, and Projects.
- **Authentication:** **NextAuth.js** (supporting corporate Email/Google SSO).

## 5. Risks & Mitigations

- **Risk:** Skill data becomes outdated due to lack of regular updates.
- **Mitigation:** Implement automated reminders via Slack/Email upon project completion to encourage profile updates.
- **Risk:** Assessment subjectivity (self-bias).
- **Mitigation:** Require mandatory validation/approval from team leads or verified internal competency test results.
