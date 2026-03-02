# Agent 2: UI/UX Spatial Blueprints (Sprint 10: Featured Projects Grid)

## 1. Global Section Constraints
- **The Wrapper:** The projects list will be confined to `max-w-7xl mx-auto px-4 md:px-8`. This will prevent the images from touching the edge of the browser window and enforce premium negative space alongside the content column.

## 2. The Grid Architecture
- **Columns:** Standard 1-column on mobile, dropping into `grid-cols-1 md:grid-cols-2` on larger breakpoints.
- **Spacing:** The massive gap between blocks will be implemented using `gap-12 md:gap-16` to ensure cards breathe.

## 3. Card UI & Cropping (The 'Window' Effect)
- **The Mask:** The wrapper holding the image will have `rounded-3xl overflow-hidden`. This massive border-radius creates a soft, modern container.
- **The Ratio:** To prevent landscape/portrait mismatches, the wrapper forces a strict `aspect-[4/3]`. The image inside will use `object-cover` to fill the window without distortion.

## 4. Interaction Physics
- **Hover Scale:** A slow, luxurious image scale will trigger on card hover. Transition physics: `transition-transform duration-[1.5s] ease-out group-hover:scale-105`. This creates a premium, heavy parallax sensation compared to quick, snappy animations.

## 5. Typography Placement
- **Structure:** `flex justify-between items-center mt-6`. The text sits *outside* and *below* the image mask.
- **Hierarchy:** Project Title (`font-bold text-h3` or similar large size). Category tag (`text-muted text-sm uppercase tracking-widest`).
