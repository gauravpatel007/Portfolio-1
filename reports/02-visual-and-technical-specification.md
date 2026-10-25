# Phase 2: Visual and Structural Specification

**Date & Time:** October 24, 2026  
**Reference Site:** [https://demo.codeandchill.store/portfolio/](https://demo.codeandchill.store/portfolio/) (`https://hasib.site/`)  
**Specification Purpose:** Precise translation of reconnaissance findings into a complete, evidence-based visual and technical architecture specification for reconstructing the portfolio.

---

## 1. Page Structure Map

The reference portfolio is organized in a strict single-page sequential hierarchy:

```
┌──────────────────────────────────────────────────────────────┐
│ Fixed Navigation Bar (Navbar)                                │
├──────────────────────────────────────────────────────────────┤
│ 1. Hero Section (#home)                                      │
│    - WebGL2 Dynamic Photomosaic Portrait                     │
│    - Cypher Text Unscrambler                                 │
│    - GSAP Split "PORT" / "FOLIO" Metallic Heading            │
│    - Role Subtitle + Down-Arrow / Contact Action Pills       │
├──────────────────────────────────────────────────────────────┤
│ 2. About Me & Tech Stack (#about)                            │
│    - Section Label "ABOUT ME" + Metallic "Intro"             │
│    - Frosted Glass Bio Summary Card                          │
│    - "THE STACK" 3-Tier Technology Badge Cloud               │
├──────────────────────────────────────────────────────────────┤
│ 3. Services / Capabilities (#service)                        │
│    - Top-Right Aligned Metallic "WHAT WE CAN DO"             │
│    - 5-Tier Interactive Expanding Accordion (01 – 05)        │
├──────────────────────────────────────────────────────────────┤
│ 4. Selected Projects (#project)                              │
│    - 4 Asymmetric Alternating Project Showcases              │
│    - 3D Device Mockups (Phone & Laptop) with Spotlight       │
│    - Hybrid Sans-Bold + Serif-Italic Typography              │
│    - Action Pills: Live Demo / Google Play ↗ & GitHub ⎇      │
├──────────────────────────────────────────────────────────────┤
│ 5. Components Showcase Shelf (#components)                   │
│    - Sticky Pinned Left Column ("Interface parts...")        │
│    - Horizontal Scrolling Shelf of UI Cards                  │
│    - Scroll-Progress Indicator ("SCROLL = SHELF  P 0.xx")    │
├──────────────────────────────────────────────────────────────┤
│ 6. Interactive Breakout Arcade Game (#play)                  │
│    - "Break it if you can. It still ships."                  │
│    - Playable Canvas Breakout Game with "HELLO WORLD" Bricks │
├──────────────────────────────────────────────────────────────┤
│ 7. Contact & Footer (#contact)                               │
│    - Ambient Fluid Video Background (contact_bg.mp4)         │
│    - Pulsing Green "AVAILABLE FOR WORK" Badge                │
│    - Giant Metallic "Get in touch" Heading                   │
│    - WhatsApp, Email, Location & Social Action Cards         │
│    - Copyright & Secondary Legal / Section Links             │
└──────────────────────────────────────────────────────────────┘
```

### Detailed Section Specifications

#### 1.1 Fixed Navigation Header (`Navbar`)
- **Identifier:** `header` / `nav`
- **Height:** 64px (`h-16`)
- **Positioning:** Fixed top (`fixed top-0 left-0 right-0 z-40`)
- **Background:** `bg-[#050505]/70` with `backdrop-blur-md` and `border-b border-white/[0.08]`
- **Content Alignment:** Flex row with `justify-between items-center`
- **Max Width:** `max-w-7xl mx-auto px-6 md:px-16`
- **Left Element:** Wordmark/logo in bold uppercase sans (`text-white font-bold tracking-wider text-base md:text-lg`).
- **Right Elements (Desktop):** Horizontal link list (`flex items-center gap-6 md:gap-8`): `HOME`, `ABOUT`, `SERVICE`, `PROJECT`, `COMPONENTS`, `CONTACT` (`text-xs tracking-[0.2em] font-medium text-gray-400 hover:text-white transition-colors duration-200 uppercase`). Active link has a glowing underline indicator (`border-b-2 border-white pb-1`).
- **Right Element (Mobile):** Hamburger toggle button (`md:hidden`, two horizontal strokes with smooth cross transition).
- **Mobile Menu Drawer:** Full-viewport overlay (`fixed inset-0 z-50 bg-[#050505] flex flex-col justify-center items-center gap-8`), displaying large bold links (`text-3xl font-black tracking-widest uppercase`).

---

#### 1.2 Hero Section (`#home`)
- **Identifier:** `section#home`
- **Height:** `min-h-screen h-[100vh]` (full viewport)
- **Background:** `radial-gradient(circle, #222222 0%, #000000 80%)` with dark overlay `bg-black/40 backdrop-blur-[2px]`.
- **Z-Index Layering:**
  1. Base background layer (`z-0`)
  2. WebGL2 Photomosaic Portrait Canvas (`z-10`)
  3. Oversized Metallic Headline `PORTFOLIO` (`z-20`)
  4. Floating Role Subtitle and Action Pills (`z-30`)
- **Portrait Presentation:**
  - Hidden reference anchor image: `invisible w-auto max-w-none h-[110vh] md:h-[143vh]` positioned at `top-[30vh] md:top-[2vh]`.
  - Live WebGL2 Canvas: Centered in hero viewport. Renders the subject's portrait using a grid of mosaic tiles sampled from project thumbnails.
  - Interactive Behavior: When mouse moves over the canvas, tiles within radius scatter and drift dynamically (`uMouse`). On scroll, tiles disperse upward (`uScatter`).
- **Headline Layer:**
  - Position: `absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none flex flex-col items-start w-max`
  - Heading: `h1` styled with `text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800`
  - Horizontal Split: Contains two inner spans: left word `PORT` and right word `FOLIO`. Animate apart horizontally by `n/2` (`window.innerWidth * 0.2`) to frame the neck and face.
- **Subtitle & Actions:**
  - Subtitle: `absolute -bottom-8 md:-bottom-12 md:left-8 text-white text-base md:text-2xl lg:text-4xl drop-shadow-md w-max`. Contains `font-bold` primary role + `font-light italic text-gray-300` secondary role.
  - Action Controls: `absolute -bottom-20 md:-bottom-12 md:right-20 flex items-center gap-3`. Circular pill with diagonal arrow (`↙` rotating `45deg` on hover) + pill button `Contact`.

---

#### 1.3 About Section (`#about`)
- **Identifier:** `section#about`
- **Padding:** `py-24 md:py-32 px-6 md:px-16`
- **Max Width:** `max-w-7xl mx-auto`
- **Grid Layout:** 2 columns on desktop (`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start`), stacked on mobile.
- **Left Column (Col 1–5):**
  - Tracking label: `text-xs uppercase tracking-[0.3em] text-gray-400 mb-4` (`ABOUT ME`).
  - Giant metallic title: `Intro` in `text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-none`.
- **Right Column (Col 6–12):**
  - Bio card: `rounded-3xl border border-white/10 bg-[#0a0a0c]/60 p-8 md:p-10 backdrop-blur-md shadow-2xl`.
  - Body text: `text-gray-300 text-base md:text-lg leading-relaxed` with highlighted white bold keywords for roles, apps, and core technologies.
- **The Stack Sub-section:**
  - Positioned below bio card with a horizontal divider `border-t border-white/[0.08] pt-10 mt-12`.
  - Label: `THE STACK` (`text-xs uppercase tracking-[0.25em] text-gray-400 mb-6`).
  - Badge Grid: `flex flex-wrap gap-2.5 md:gap-3`. Each badge: `px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs md:text-sm text-gray-300 hover:border-white/30 hover:bg-white/[0.06] transition-colors flex items-center gap-2`. Includes bullet indicator `•`.

---

#### 1.4 Services Section (`#service`)
- **Identifier:** `section#service`
- **Padding:** `py-24 md:py-32 px-6 md:px-16`
- **Max Width:** `max-w-7xl mx-auto`
- **Heading:** Right-aligned giant title `WHAT WE CAN DO` in `text-5xl md:text-7xl lg:text-8xl font-black text-right text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 mb-16 uppercase leading-tight`.
- **Accordion List:** 5 stacked full-width rows with top border `border-t border-white/[0.08]`.
  - Item Structure: `group flex items-center justify-between py-8 md:py-10 px-4 md:px-8 border-b border-white/[0.08] transition-all duration-300 cursor-pointer`.
  - Left content: Index number (`01`, `02`, etc.) in `text-gray-500 font-mono text-lg md:text-2xl mr-8` + Title in `text-xl md:text-3xl lg:text-4xl font-bold uppercase text-white group-hover:text-black transition-colors`.
  - Right content: Diagonal arrow icon `↘` (`w-6 h-6 text-gray-500 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all`).
  - Hover State: Entire row background transitions to lit surface `bg-[#cfc9bc]` with dark ink typography (`text-[#16150f]`).

---

#### 1.5 Projects Section (`#project`)
- **Identifier:** `section#project`
- **Padding:** `py-24 md:py-32 px-6 md:px-16`
- **Max Width:** `max-w-7xl mx-auto`
- **Showcase Items:** 4 featured projects rendered in an alternating layout:
  - **Odd Projects (1 & 3):** Mockup Left (Col 1–6) | Details Right (Col 7–12)
  - **Even Projects (2 & 4):** Details Left (Col 1–6) | Mockup Right (Col 7–12)
- **Mockup Presentation:**
  - High-resolution photorealistic 3D hardware mockup (mobile device or laptop) sitting on a dark textured surface with dramatic top-down spotlight.
  - Mockup wrapper: `relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center bg-[#070707]`.
- **Details Content:**
  - Index number: `text-sm font-mono text-gray-400 mb-3` (`01`, `02`, etc.).
  - Title: Oversized hybrid title: bold uppercase sans + elegant italic serif accent word (e.g. `HABIT flow TRACKER APP`, `MIND pixel INNOVATION STUDIO`).
  - Description: Concise 2–3 sentence paragraph (`text-gray-400 text-sm md:text-base leading-relaxed mb-8`).
  - Button Row: `flex items-center gap-4`.
    - Primary CTA: Light pill `bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide flex items-center gap-2`.
    - Secondary CTA: Outline pill `border border-white/20 text-white hover:border-white/50 px-6 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide flex items-center gap-2`.

---

#### 1.6 Components Showcase Shelf (`#components`)
- **Identifier:** `section#components`
- **Layout:** Pinned split scroll experience.
- **Left Sticky Column:**
  - Pinned on desktop (`sticky top-32 w-full lg:w-1/3 flex flex-col items-start`).
  - Heading: `Interface parts that behave under pressure.` (`text-4xl md:text-5xl font-black text-white leading-tight mb-6`).
  - Subtitle: `text-gray-400 text-sm md:text-base mb-8`.
  - CTAs: `BROWSE THE SHOP ↗` (filled white button with glow) and `MESSAGE ME` (outline button).
- **Right Horizontal Shelf:**
  - Width: `w-full lg:w-2/3 overflow-hidden`.
  - Shelf Cards: Horizontally aligned carousel cards with red `REEL` tag, component preview frame, metadata (`KB`, `0 DEPS`, price or badge), and `Enquire on WhatsApp` button.
- **Scroll Hijacking Mechanism:**
  - Pinned container height is set to `300vh`. Vertical page scroll translates the horizontal cards from `translateX(0%)` to `translateX(-65%)`.
  - Bottom indicator: Monospace progress text `SCROLL = SHELF` with horizontal progress line and `P 0.xx`.

---

#### 1.7 Interactive Mini-Game (`#play`)
- **Identifier:** `section#play`
- **Padding:** `py-24 md:py-32 px-4 md:px-16 bg-[#050505]`
- **Max Width:** `max-w-5xl mx-auto`
- **Header:** Caption: `"Break it if you can. It still ships."` (`text-xs font-mono uppercase tracking-[0.3em] text-gray-400 text-center mb-6`).
- **Arcade Panel:**
  - Canvas container: `relative aspect-[5/6] sm:aspect-[4/3] lg:aspect-[16/9] border border-white/10 rounded-2xl bg-black overflow-hidden shadow-2xl`.
  - Bricks Layout: Square pixel matrix bricks spelling out `HELLO WORLD`.
  - Game Controls: Mouse or touch paddle steering at bottom of canvas. Ball bounces off paddle, walls, and destroys bricks.
  - HUD: Lives indicator dots (`w-2 h-2 rounded-full`), score counter, and `Play / Again` button.

---

#### 1.8 Contact & Footer (`#contact`)
- **Identifier:** `section#contact`
- **Height:** `min-h-[85vh]`
- **Background:** Looping HTML5 background video ([`contact_bg.mp4`](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/contact_bg.mp4)) with dark gradient overlay `bg-black/70 backdrop-blur-[1px]`.
- **Left Column:**
  - Availability pill: `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] mb-8`. Contains pulsing emerald dot (`w-2 h-2 rounded-full bg-emerald-400 animate-pulse`) + `text-[11px] uppercase tracking-[0.2em] font-medium text-white` (`AVAILABLE FOR WORK`).
  - Title: Giant metallic `Get in touch` (`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-none mb-6`).
  - Subtext: `text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-md`.
  - Action Buttons: `Message on WhatsApp` (light pill with WhatsApp icon) + `Send an email` (outline pill with mail icon).
- **Right Column:**
  - Dark glass card (`border border-white/10 rounded-3xl bg-[#0a0a0c]/70 p-8 md:p-10 backdrop-blur-md`):
    - `EMAIL`: Tracked uppercase label + clickable mailto link.
    - `PHONE`: Tracked uppercase label + phone number.
    - `BASED IN`: Tracked uppercase label + location string.
    - `ELSEWHERE`: Row of circular social buttons (Play Store, LinkedIn, GitHub).
- **Footer Bar:** Bottom border `border-t border-white/[0.08] pt-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500`.

---

## 2. Design Token Specification

Derived directly from `index-V1mGLk2S.css`:

### 2.1 Color Palette
```css
:root {
  /* Core Backgrounds */
  --bg-primary: #050505;              /* Dominant dark charcoal black */
  --bg-card: #0a0a0c;                 /* Glass card background */
  --bg-card-subtle: rgba(255, 255, 255, 0.03);

  /* Brand Accents */
  --accent: #e8e4dc;                  /* Platinum warm bone white */
  --accent-hover: #d6d1c6;            /* Hover tint */
  --accent-contrast: #050505;         /* Deep black for button text */
  --surface-lit: #cfc9bc;             /* Highlighted service row background */
  --surface-lit-ink: #16150f;         /* Ink black text on lit surface */
  --surface-lit-ink-soft: #2c2a22;    /* Secondary ink text */

  /* Semantic Colors */
  --status-available: #34d399;        /* Tailwind emerald-400 */
  --tag-reel: #ff5c3d;                /* Bright coral tag for REEL */

  /* Text Colors */
  --text-primary: #ffffff;            /* Pure white */
  --text-secondary: #d1d5db;          /* Neutral gray-300 */
  --text-muted: #9ca3af;              /* Neutral gray-400 */
  --text-dim: #6b7280;                /* Neutral gray-500 */

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-card: rgba(255, 255, 255, 0.10);
  --border-highlight: rgba(255, 255, 255, 0.30);
}
```

### 2.2 Gradients
- **Chrome Metallic Gradient:**  
  `linear-gradient(to bottom, #ffffff 0%, #d1d5db 50%, #1f2937 100%)`  
  Applied via: `bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-800`
- **Hero Radial Gradient:**  
  `radial-gradient(circle at center, #222222 0%, #000000 80%)`

### 2.3 Typography System
- **Sans-Serif Font:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - Weights: `400` (normal), `500` (medium), `700` (bold), `900` (black).
- **Serif Font (Accent Word Styling):** `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`
  - Style: `italic font-light`.
- **Monospace Font:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace`
  - Used for index numbers (`01`), code metrics (`12.2 KB`, `0 DEPS`), and status indicators.

### 2.4 Spacing & Sizing Scale
- Spacing unit: `0.25rem` (4px).
- Containers:
  - `max-w-5xl`: 64rem (1024px) — arcade game container.
  - `max-w-7xl`: 80rem (1280px) — standard content container.
- Radii:
  - `rounded-sm`: 4px
  - `rounded-2xl`: 16px (game canvas, preview cards)
  - `rounded-3xl`: 24px (bio card, contact card)
  - `rounded-full`: 9999px (all pill buttons, badge tags)

### 2.5 Breakpoints
- `sm`: 640px
- `md`: 768px (Mobile navigation activates below 768px)
- `lg`: 1024px (Two-column desktop grid activates)
- `xl`: 1280px

---

## 3. Component Inventory

The reconstructed portfolio will be organized into focused, modular components:

| Component | Responsibility | Props / Inputs | State & Interactions |
| :--- | :--- | :--- | :--- |
| **`Navbar`** | Header bar with brand logo & section navigation | `activeSection`, `onNavigate` | Desktop hover underlines; mobile hamburger toggle & full-screen drawer |
| **`Hero`** | Full-height hero with WebGL2 portrait and metallic typography | `profileData`, `onPreloadComplete` | Cypher text unscramble, GSAP split word animation, mouse tile reaction |
| **`HeroMosaicCanvas`** | WebGL2 canvas rendering photo-mosaic tiles | `portraitUrl`, `thumbnailUrls`, `isRevealed` | Mouse hover scatter (`uMouse`), scroll scatter (`uScatter`), fallback handling |
| **`AboutSection`** | Personal bio introduction and tech stack | `summary`, `skills` | Frosted glass card, hover glow on skill pill tags |
| **`ServicesSection`** | Interactive capabilities accordion | `servicesList` | Row hover highlight (`bg-[#cfc9bc]`), arrow translation `↘` -> `→` |
| **`ProjectsSection`** | Alternating asymmetric project showcases | `projectsList` | Alternating left/right layout, hover tilt on 3D mockups, direct repo/demo links |
| **`ComponentsShelf`** | Pinned horizontal scrolling shelf | `componentsList` | Sticky left column, vertical scroll driving horizontal card track, progress bar |
| **`BreakoutGame`** | Interactive arcade Easter egg game | `lines: ["Hello", "World"]` | Paddle control, ball bounce physics, brick collision, game win/loss states |
| **`ContactSection`** | Ambient video background, availability badge & cards | `contactData` | Background video autoplay/loop, WhatsApp/email click triggers, social link circles |
| **`Footer`** | Copyright notice & secondary anchor links | `authorName`, `links` | Subtle hover transitions |
| **`ComingSoonModal`** | Fullscreen placeholder for unlinked sub-features | `isOpen`, `onBack` | Animated slide-up overlay with escape/back action |

---

## 4. Interaction & Motion Specification

### 4.1 Initial Page Load Sequence
1. Viewport loads with `body { overflow: hidden }` at scroll position `(0, 0)`.
2. Cypher text generator runs in hero, cycling through characters every `50ms`.
3. Once resolved to `PORTFOLIO`, the GSAP timeline executes:
   - `PORTFOLIO` animates from `top: 50%` down to `top: 74%` (`duration: 1.5s`, `ease: "power3.inOut"`).
   - Left half `PORT` moves left by `-n/2`; right half `FOLIO` moves right by `+n/2`.
   - Sub-headline and action pills fade in and slide up (`y: 50 -> 0`, `opacity: 0 -> 1`, `duration: 1.2s`, `stagger: 0.2s`).
   - WebGL2 mosaic tiles assemble from scattered state into the portrait face position.
   - Page scroll is unlocked (`body { overflow: auto }`).

### 4.2 WebGL2 Photomosaic Interactions
- **Mouse Hover:** As the user moves the cursor across the portrait, tiles within proximity disperse outward away from the cursor coordinate and smoothly spring back into place.
- **Scroll Dispersion:** As the user scrolls down, `uScatter` increases, gracefully dispersing the mosaic tiles upward into the background.

### 4.3 Pinned Shelf Scroll Hijack
- When the Components section enters the viewport, the container pins vertically for `300vh` equivalent scroll.
- Native vertical scrolling is mapped linearly (`0.00` to `1.00`) to the horizontal `translateX` of the card track.
- The indicator bar updates in real time: `SCROLL = SHELF  P 0.xx`.

### 4.4 Services Accordion Hover
- Default: Transparent background with `border-white/[0.08]` dividers and white bold text.
- Hover: Instantaneous background fill with warm bone surface `#cfc9bc`, text turns to ink black `#16150f`, and diagonal arrow translates `4px` down and right.

---

## 5. Technical Architecture Proposal

### Framework Decision: React 19 + Vite
- **Recommendation:** Build the application using **React 19 with Vite** and **Tailwind CSS**.
- **Justification:**
  1. *Identical Runtime Environment:* The reference website is compiled from a React + Vite codebase. Rebuilding in the same environment ensures zero behavioral drift.
  2. *WebGL2 Canvas Lifecycle:* The dynamic photomosaic shader relies on React ref lifecycle hooks (`useRef`, `useEffect`) and performance timer loops.
  3. *GSAP Timeline Integration:* Synchronized split-text animations require GSAP context management (`gsap.context()`) which natively pairs with React component mounting.
  4. *Portability & Maintenance:* A modular React project with a clean `/src` architecture keeps data completely separated in `data/profile.json`, allowing instant personalization updates.

### Core Dependencies
- `react`, `react-dom` (UI structure)
- `vite` (fast dev server & production bundler)
- `tailwindcss` (utility-first design tokens matching the reference's Tailwind v4 styling)
- `gsap` (GreenSock timeline and easing engine)
- `lucide-react` or lightweight inline SVGs (for arrow, play, github, and whatsapp icons)

---

## 6. Personalization Mapping: Adapting to Gaurav Patel

All identified sections will be mapped to Gaurav Patel's verified professional profile without altering the reference layout:

| Reference Section | Original Reference Content | Gaurav Patel Profile Mapping |
| :--- | :--- | :--- |
| **Hero Title** | `PORTFOLIO` | `PORTFOLIO` |
| **Hero Subtitle** | `React Native` `Developer` | `AI/ML` `Engineer` |
| **Hero Portrait** | Hasibul Hasan WebGL2 mosaic | Gaurav Patel WebGL2 mosaic using *LifeOS*, *AI Resume*, *RAG Study* tiles |
| **About Bio** | Hasibul's 4 Google Play apps & QA | Gaurav's B.Tech CSE, Ativeg Technologies internship, and Hackathon finalist bio |
| **The Stack** | Expo, React Native, Supabase, Playwright | Python, PyTorch, LangChain, RAG, Ollama, spaCy, PostgreSQL, FastAPI |
| **Services (01–05)** | Mobile App Dev, UI & Animation, Backend, QA, Web | Generative AI & LLMs, RAG Pipelines, AI Agents & APIs, NLP & Embeddings, ML Models |
| **Project 01** | HabitFlow (Phone Mockup) | **LifeOS — AI Healthcare Platform** (3D Mockup) |
| **Project 02** | Kessler Storefront (Laptop Mockup) | **AI Resume Intelligence** (Full-Stack Screening Platform Mockup) |
| **Project 03** | MindPixel Studio (Laptop Mockup) | **RAG-Based Study Assistant** (Local Semantic Q&A Mockup) |
| **Project 04** | BudgetFlow (Phone Mockup) | **Agentic Workflow / Hackathon Project** |
| **Components Shelf**| 6 Plain HTML/JS UI parts ($5–$10) | Gaurav's Open-Source AI / NLP Components & Notebooks |
| **Contact Section** | Khulna, Bangladesh / WhatsApp | Ahmedabad, Gujarat, India / Email & LinkedIn |

---

## 7. Implementation Priorities & Next Steps

1. **Phase 3 (Project Foundation):** Initialize the React + Vite application in a dedicated directory (`portfolio-app/`), configure Tailwind CSS with all identified tokens, and import asset references.
2. **Phase 4 (Hero & WebGL Mosaic):** Implement the WebGL2 canvas shader, GSAP wordmark unscrambler, and split `PORT` / `FOLIO` typography animation.
3. **Phase 5 (Content Sections):** Build the About/Stack, Services Accordion, Project Showcases, and Contact/Footer sections.
4. **Phase 6 (Interactive Polish):** Build the horizontal pinned components shelf and the Breakout arcade game.
5. **Phase 7 (Responsive & Final Validation):** Verify desktop, tablet, and mobile breakpoints against reference screenshots.
