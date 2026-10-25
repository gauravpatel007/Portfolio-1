# Phase 4: Asset Inventory and Reconstruction Report

**Date & Time:** October 24, 2026  
**Target Application:** `portfolio-app/`  
**Reference Asset Base:** `https://demo.codeandchill.store/portfolio/`  
**Local Asset Storage:** [`portfolio-app/public/assets/`](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/portfolio-app/public/assets/)  

---

## 1. Structured Asset Inventory

All required assets have been identified, downloaded, categorized, and placed in the production application directory.

| Asset Filename | Format | Dimensions | Original Remote Source | Intended Usage | Permission / Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`hero_center.png`** | PNG (RGBA) | `1122 × 1402` (4:5) | `/portfolio/assets/hero_center-BLC76ir0.png` | Hero section WebGL2 photomosaic portrait texture | Reference Original; will be replaced by Gaurav's photo once uploaded |
| **`habitflow.jpg`** | JPEG | `1600 × 1000` (16:10) | `/portfolio/assets/habitflow-BhEplUHh.jpg` | Project 01 showcase (3D Mobile Habit App Mockup) & WebGL Atlas | Reference Original (staged for LifeOS AI Healthcare mapping) |
| **`ecommerce.jpg`** | JPEG | `1600 × 1000` (16:10) | `/portfolio/assets/ecommerce-DVISmkX7.jpg` | Project 02 showcase (3D Laptop Storefront Mockup) & WebGL Atlas | Reference Original (staged for AI Resume Intelligence mapping) |
| **`mindpixel.jpg`** | JPEG | `1600 × 1000` (16:10) | `/portfolio/assets/mindpixel-Bx0qpjdU.jpg` | Project 03 showcase (3D Laptop Studio Mockup) & WebGL Atlas | Reference Original (staged for RAG Study Assistant mapping) |
| **`expense.jpg`** | JPEG | `1600 × 1000` (16:10) | `/portfolio/assets/expense-sbI4i9tg.jpg` | Project 04 showcase (3D Phone Mockup) & WebGL Atlas | Reference Original |
| **`contact_bg.mp4`** | MP4 (H.264) | `1920 × 1080` (709 KB) | `/portfolio/assets/contact_bg-BZTj-iD6.mp4` | Looping ambient fluid background video for Contact section | Reference Original |
| **`reels/sigil.mp4`** | MP4 (H.264) | `720 × 1280` (130 KB) | `/photos/154-portfolio/reels/sigil.mp4` | Component Shelf Card 1 animated video preview | Reference Original |
| **`reels/quarto.mp4`** | MP4 (H.264) | `720 × 1280` (147 KB) | `/photos/154-portfolio/reels/quarto.mp4` | Component Shelf Card 2 animated video preview | Reference Original |
| **`reels/parachute.mp4`**| MP4 (H.264) | `720 × 1280` (56 KB) | `/photos/154-portfolio/reels/parachute.mp4` | Component Shelf Card 3 animated video preview | Reference Original |
| **`reels/quench.mp4`** | MP4 (H.264) | `720 × 1280` (69 KB) | `/photos/154-portfolio/reels/quench.mp4` | Component Shelf Card 4 animated video preview | Reference Original |
| **`reels/lucid.mp4`** | MP4 (H.264) | `720 × 1280` (85 KB) | `/photos/154-portfolio/reels/lucid.mp4` | Component Shelf Card 5 animated video preview | Reference Original |
| **`favicon.svg`** | SVG | Vector (`32 × 32`) | Local Creation | Browser tab icon and bookmark thumbnail | Recreated Minimal Geometric Brand Icon |

---

## 2. Image Presentation & Sizing Specifications

### 2.1 Hero Portrait Presentation
- **Asset Requirement:** Transparent background RGBA PNG, aspect ratio `4:5` (optimal resolution: `1122 × 1402` or `1200 × 1500`).
- **Rendering Method:**
  - Hidden DOM anchor: `<img src="/assets/hero_center.png" className="invisible w-auto max-w-none h-[110vh] md:h-[143vh]" />`
  - Rendered via WebGL2 `<canvas>`: Slices the image into square mosaic tiles, texture-mapped with project screenshots.
  - Loading Strategy: **Eagerly preloaded** via `new Image().src` inside `useMemo` before hero intro animation triggers, ensuring zero pop-in.

### 2.2 Featured Project Mockups
- **Aspect Ratio:** Fixed `16:10` (or `4:3` on compact viewports).
- **Styling Rules:**
  - Border radius: `rounded-2xl` (`16px`).
  - Container background: `#070707` with subtle inner border `border border-white/10`.
  - Object Fit: `object-cover`.
  - Hover Effect: Subtle `scale-105` smooth transition (`transition-transform duration-500 ease-out`).
- **Loading Strategy:** `loading="lazy"` for project 2, 3, and 4; eager for project 1.

### 2.3 Ambient Contact Background Video
- **Format:** H.264 MP4, 30fps, 709 KB, highly optimized dark fluid animation.
- **Attributes:** `autoPlay`, `loop`, `muted`, `playsInline`.
- **Styling:** `absolute inset-0 w-full h-full object-cover pointer-events-none`.
- **Overlay:** `bg-black/70 backdrop-blur-[1px]` ensuring high text contrast and legibility for contact text and action cards.

---

## 3. Font System & Typography Rules

### 3.1 Font Stacks
1. **Primary Sans-Serif:**
   ```css
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
   ```
   - Matches the reference's modern, crisp native feel.
   - Eliminates external Google Font roundtrips and Flash of Unstyled Text (FOUT).
   - Weights Used:
     - `font-black` (900): `PORTFOLIO`, `Intro`, `WHAT WE CAN DO`, `Get in touch`
     - `font-bold` (700): Sub-role `AI/ML Engineer`, Section subheadings
     - `font-medium` (500): Navigation links, button labels
     - `font-light` (300): Secondary body descriptions
2. **Serif Accent Font:**
   ```css
   font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
   ```
   - Style: `italic font-light`.
   - Used for editorial contrast words: `"Engineer"` in subtitle, `"flow"` in `HABIT flow TRACKER`, `"pixel"` in `MIND pixel STUDIO`.
3. **Monospace Font:**
   ```css
   font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
   ```
   - Used for section numbers (`01`, `02`), technical metrics (`12.2 KB`, `0 DEPS`), and arcade HUD.

### 3.2 Spacing & Letter Tracking
- Display Headlines: `tracking-tighter` (`-0.05em`) with `leading-none`.
- Navigation & Action Labels: `tracking-[0.2em]` or `tracking-[0.3em]` uppercase.

---

## 4. Personalization Strategy for Gaurav Patel

1. **Hero Portrait:**
   - Currently staged with `hero_center.png` to verify WebGL2 shader parity.
   - When Gaurav provides his photograph, it will simply replace `public/assets/hero_center.png` without any code changes.
2. **Project Mockups:**
   - The reference mockups (`habitflow.jpg`, `ecommerce.jpg`, `mindpixel.jpg`, `expense.jpg`) provide the photorealistic 3D hardware framing.
   - For final delivery, the screen insets within these mockups are mapped to Gaurav's actual projects:
     - Project 01: *LifeOS* (AI Healthcare)
     - Project 02: *AI Resume Intelligence* (Full-Stack Screening)
     - Project 03: *RAG Study Assistant* (Local Semantic Q&A)
3. **Components Shelf:**
   - Uses the downloaded component reel videos (`sigil.mp4`, `quarto.mp4`, etc.) demonstrating authentic animated UI micro-interactions.
