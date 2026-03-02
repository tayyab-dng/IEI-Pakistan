# Product Requirements Document (PRD): dhero.studio Clone

## 1. Project Overview
**Objective:** Build a 1:1 pixel-perfect and animation-perfect technical clone of the high-end digital agency website "dhero.studio" for a senior portfolio piece.
**Target Output:** A highly performant, accessible, and visually stunning web application mirroring the target site's exact design and interactive behaviors.

## 2. Tech Stack
- **Framework:** React
- **Styling:** Tailwind CSS (for structure and layout blueprints)
- **Animations:** GSAP (GreenSock) for complex, timeline-based UI animations and ScrollTrigger physics.
- **Smooth Scrolling:** Lenis (for premium, physics-based smooth scrolling).

## 3. Homepage Modular Breakdown

### 3.1 Global Components
- **Custom Cursor / Loader:** Custom interactive cursor depending on hover states, and an initial full-screen loading sequence utilizing GSAP to reveal the site.
- **Navigation (Header):** Fixed or hiding-on-scroll navigation bar with logo and menu trigger. Menu expands with a staggered animation overlay.
- **Footer:** Large typography footer with contact links, social links, and an animated hover state.

### 3.2 Page Sections (In order of scroll)
1. **Hero Section:**
   - Giant, impactful typography.
   - Parallax image/video background or dynamic visual elements.
   - GSAP text-reveal animations on load.
2. **About / Intro Section:**
   - Typography-driven narrative section.
   - ScrollTrigger-based text highlighting or masking as the user scrolls.
3. **Featured Projects (Work / Showcase):**
   - Horizontal scroll or pinned-scroll gallery.
   - Hover effects on project cards (images scaling inside containers, text revealing).
   - Driven by GSAP ScrollTrigger pinning.
4. **Services / Capabilities Section:**
   - Accordion or list view representing agency capabilities.
   - Smooth expand/collapse mechanics and staggered entrance animations.
5. **Client Roster / Marquee:**
   - Infinite scrolling marquee of client logos or names using GSAP `xPercent`.

## 4. Performance & Asset Delivery (Agent 4 Focus)
- All images/videos must be optimized (e.g., WebP delivery).
- Lenis must be integrated at the root level and configured to synchronize properly with GSAP ScrollTrigger (`ScrollTrigger.update`).

## 5. QA Guidelines (Agent 5 Focus)
- **Visuals:** Ensure layout strictly matches dhero.studio's pixel dimensions and spacing.
- **Animation Jank:** GSAP animations must run at 60fps without layout thrashing. Use `transform` and `opacity` exclusively for animations.
- **Responsiveness:** Ensure mobile, tablet, and desktop breakpoints are fully handled via Tailwind.
