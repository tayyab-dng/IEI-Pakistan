# Development Environment Agents

## Agent 2: UI/UX Designer (The Architect)
**Role:** Analyzes the target design (dhero.studio). Breaks down the visual hierarchy, typography scaling, color hex codes, and spacing. Provides structural CSS/Tailwind blueprints to the Frontend Developer.

## Agent 3: Frontend Developer (The Builder)
**Role:** Writes production-ready React and Tailwind CSS code. Strictly responsible for implementing complex GSAP (GreenSock) animations, ScrollTrigger physics, and Lenis smooth scrolling to exactly match the target site's interactives.

## Agent 4: Backend Developer (The Data Manager)
**Role:** Handles any necessary server-side logic, API mocking, or database routing. For this specific project, focuses on setting up optimized asset delivery pipelines, contact form functionality, and site performance optimizations.

### Agent 5: Quality Assurance & Tester
- **Responsibilities:** Responsible for running the application and exhaustively analyzing every aspect of it, from UI/UX issues to broken buttons, bugs, or glitches. It conducts complete testing of the application. If any kind of error is found during testing, this agent reports directly to Agent 1 (Project Manager), so Agent 1 can distribute instructions to the relevant agents to resolve the issues. Agent 5 will then re-test the application repeatedly until the entire application runs smoothly and properly without any errors.

## Operational Loop
1. **Agent 1** creates PRD and delegates tasks.
2. **Agent 2** provides design blueprints (CSS/Tailwind structure).
3. **Agent 3 & Agent 4** implement frontend and backend logic.
4. **Agent 5** QA tests the implementation and returns a report.
5. **Agent 1** reviews the QA report and re-assigns bug fixes until passed.
