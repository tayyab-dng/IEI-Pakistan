# Agent 2: UI/UX Spatial Blueprints (Sprint 11: Featured Work Reference Clone)

## 1. The Global Header
- **Layout:** Flex row with space-between. 
- **Left Side:** 
  - A small, pill-shaped label: `FEATURED PROJECTS` (dark gray pill, small uppercase text).
  - Massive Headline: `How we helped\nother succeed` (White, very large, `tracking-tight`).
- **Right Side:**
  - `See all projects` button (White pill, black text, positioned near the bottom alignment of the headline).

## 2. The Slider Display (Split Layout)
- **Grid Structure:** A 2-column layout (e.g., `grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12`) focusing on a SINGLE active project at a time.
- **Left Column (The Visual):**
  - A massive, `rounded-3xl` card acting as the project image container.
  - A dark gradient overlay at the bottom (`bg-gradient-to-t from-black/80 to-transparent`).
  - Overlay Text (Bottom Left): Massive KPI text (e.g., `+60%`) and subtext (`Conversion Increases`) sitting inside the card on top of the gradient.
- **Right Column (The Details):**
  - **Top:** A pill badge for the industry (e.g., `HUMAN RESOURCES`).
  - **Center:** The project title (e.g., `RecruiterOne`) in massive, bold typography.
  - **Bottom Left:** Category (`DEVELOPMENT`) and description (`Transforming Recruitment...`).
  - **Bottom Right:** Slider navigation buttons (Round circular buttons with `<` and `>`).

## 3. Data Structure Updates
To support this layout, the projects array needs new data fields:
- `kpi` (e.g., "+60%")
- `kpiLabel` (e.g., "Conversion Increases")
- `industry` (e.g., "HUMAN RESOURCES")
- `description`
