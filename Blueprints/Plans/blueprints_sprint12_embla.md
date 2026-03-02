# Agent 2: UI/UX Spatial Blueprints (Sprint 12: Embla Carousel & 65/35 Layout)

## 1. The Embla Viewport Configuration
- **Container:** The slider will be powered by `embla-carousel-react`. The master wrapper must hide overflow (`overflow-hidden`), containing a flex track (`flex`).
- **Slide Width Constraint:** Each project card must NOT take up 100% of the screen. Setting `flex-[0_0_85%] min-w-0 pr-6` ensures the currently active card dominates, while the next card peeks in from the right edge, intuitively soliciting a horizontal drag interaction.

## 2. Card Layout (The 65 / 35 Split)
- **The Box:** Each individual slide unit acts as a massive container `h-[600px] flex flex-col lg:flex-row gap-10 bg-[#121212] p-2`.
- **Left Column (Visual - 65%):**
  - Strict width: `w-full lg:w-[65%] h-full`.
  - UI constraints: `rounded-3xl relative overflow-hidden bg-neutral-900`.
  - The KPI overlay (`+60%`) must abandon the main flex line and be absolutely pinned (`absolute bottom-8 left-8`) on top of a dark gradient to guarantee contrast against the background image.
- **Right Column (Details - 35%):**
  - Strict width: `w-full lg:w-[35%] h-full`.
  - Structural constraint: MUST use `flex flex-col justify-between`. This forces the Industry badge and massive Title to snap to the absolute top of the column, while pushing the category, description, and Slider Navigation arrows to the absolute bottom floor, aligning perfectly with the bottom edge of the image column.

## 3. Typography Hierarchy
- **Title:** The project name must command the space (`text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]`).
- **Category Tags:** De-emphasized metadata must use strong caps tracking (`uppercase tracking-widest text-primary-fg/50 text-sm font-semibold`).

## 4. Hardware Physics
- **Drag Mechanics:** `embla-carousel` configured with `{ align: 'start', dragFree: false, loop: false }`. This provides that heavy, agency-tier kinetic scroll momentum vs native CSS snap scrolling.
- **Arrows:** The previous buttons must be preserved and wired directly into the Embla `scrollPrev()` / `scrollNext()` APIs.
