# Phase 1: Reference Website Reconnaissance Report

**Date & Time:** October 24, 2026  
**Reference Website:** [https://demo.codeandchill.store/portfolio/](https://demo.codeandchill.store/portfolio/)  
**Canonical Domain:** `https://hasib.site/`  
**Inspected Assets:** Desktop & mobile live captures, production JS bundle (`index-BJNuUqxu.js`), stylesheet (`index-V1mGLk2S.css`), raw DOM, WebGL2 shaders, and media assets.

---

## 1. Access & Initial Viewport Status

- **HTTP Status:** 200 OK (Accessible directly with TLS 1.2+).
- **Page Title:** `Hasibul Hasan — React Native Developer`
- **Meta Description:** `"React Native developer with 4 apps published on Google Play. Building production cross-platform mobile apps end to end — UI, Firebase/Supabase backends, in-app purchases and Play Store release."`
- **Initial Viewport Dimensions:** Desktop baseline `1440 × 900` (tested across desktop, tablet `768 × 1024`, and mobile `390 × 844`). Device Pixel Ratio: 1.0–2.0 supported.
- **Initial Visible Elements:**
  - Fixed top navigation header with name/logo and anchor links.
  - Dramatic radial gradient background (`radial-gradient(circle, #222222 0%, #000000 80%)`) with faint dot/star field and deep blue vignette borders.
  - Large central hero portrait rendered via interactive WebGL2 photomosaic tiles.
  - Oversized chrome-gradient headline (`PORTFOLIO`) positioned across the chest and chin, which animates and splits horizontally.
  - Sub-headline at bottom left: `React Native Developer` (`React Native` in bold sans, `Developer` in light italic serif).
  - Action buttons at bottom right: circular button with diagonal arrow (`↙`), and pill outline button `Contact`.
  - Floating preview pill on bottom right (`Buy this template →`) injected by the template store.

---

## 2. Visual Reference Captures

All screenshots are stored locally in the [`reference/`](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/) directory:

| Viewport / Section | File Link | Description |
| :--- | :--- | :--- |
| **Desktop Hero** | [desktop-initial.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-initial.png) | Hero section with WebGL photomosaic portrait and metallic `PORTFOLIO` typography |
| **About Section** | [desktop-about.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-about.png) | Giant metallic `Intro` heading, frosted glass bio card, and `THE STACK` pill tags |
| **Services Section** | [desktop-services.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-services.png) | Metallic `WHAT WE CAN DO` heading with 5 interactive service accordion rows |
| **Project 1 & 2** | [desktop-projects-1.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-projects-1.png) | `01 HABIT flow TRACKER APP` with 3D phone mockup and `Google Play`/`GitHub` buttons |
| **Project 3 & 4** | [desktop-projects-2.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-projects-2.png) | `02 E-COMMERCE STOREFRONT` & `03 MIND pixel INNOVATION STUDIO` laptop mockups |
| **Components Shelf** | [desktop-components.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-components.png) | Pinned left column + horizontal scrolling shelf with `SCROLL = SHELF` progress bar |
| **Mini-Game** | [desktop-contact-final.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-contact-final.png) | Interactive Breakout brick game with square pixel grid `HELLO WORLD` bricks |
| **Contact & Footer** | [desktop-footer.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/desktop-footer.png) | Video background, `Get in touch`, pulsing green availability badge, WhatsApp/email cards |
| **Mobile Initial** | [mobile-initial.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/mobile-initial.png) | 390px mobile hero with stacked layout and hamburger icon |
| **Mobile Menu** | [mobile-menu.png](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/mobile-menu.png) | Fullscreen overlay drawer with centered bold links and close button |

---

## 3. Section Hierarchy & Content Inventory

The website is a highly polished Single-Page Application (SPA) structured into 7 distinct sections:

### 1. Hero Section (`#home`)
- **Background:** `radial-gradient(circle, #222222 0%, #000000 80%)` with dark overlay `bg-black/40 backdrop-blur-[2px]`.
- **Portrait Presentation:** A clean, unpixelated cut-out PNG ([`hero_center.png`](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/hero_center.png)) is fed into a custom **WebGL2 shader canvas**. The shader decomposes the portrait into a dynamic mosaic of tiny tiles sampled from a texture atlas of project thumbnails.
- **Intro Animation:**
  - Page scroll locked (`overflow: hidden`).
  - Text unscrambler cyphers characters every 50ms until resolving to `PORTFOLIO`.
  - GSAP timeline triggers: `PORTFOLIO` drops down from vertical center (`top: 50%`) to `top: 74%` (or `20%` on mobile).
  - The word splits into `PORT` (slides left by `n/2`) and `FOLIO` (slides right by `n/2`) to create a frame around the neck/chin.
  - Sub-headline and action buttons fade and slide up (`y: 50 -> 0`, `opacity: 0 -> 1`).
  - Body scroll unlocked.

### 2. About & Tech Stack (`#about`)
- **Heading:** Small tracking label `ABOUT ME`, followed by massive metallic gradient `Intro`.
- **Bio Card:** Dark frosted glass card (`border border-white/10 rounded-3xl bg-[#0a0a0a]/50 p-8 md:p-10`).
- **Tech Stack:** Label `THE STACK` with a subtle divider, followed by 3 rows of rounded pill badges (`• React Native`, `• Expo`, `• Firebase`, `• Supabase`, `• TypeScript`, `• Playwright`, etc.).

### 3. Services / Capabilities (`#service`)
- **Heading:** Giant metallic gradient `WHAT WE CAN DO` aligned right.
- **Accordion List:** 5 full-width rows with numbers `01` to `05`, uppercase bold titles, and angled down-right arrows (`↘`):
  1. `01 REACT NATIVE APP DEVELOPMENT`
  2. `02 MOBILE UI & ANIMATION`
  3. `03 APP SERVICES & BACKEND`
  4. `04 QA AUTOMATION & CI/CD`
  5. `05 WEB DEVELOPMENT`
- **Interactivity:** Hovering/clicking a row expands details or activates the highlighted background state.

### 4. Selected Projects (`#project`)
Alternating asymmetric card presentations with dramatic 3D product mockups:
- **Project 01 — HabitFlow:** Left side 3D phone mockup standing on dark surface with spotlight; right side `01 HABIT flow TRACKER APP` (mix of bold sans and serif italic), description, `Google Play ↗` (filled) and `GitHub` (outline) buttons.
- **Project 02 — Kessler Storefront:** Right side laptop mockup; left side `02 E-COMMERCE STOREFRONT`, description, `Live Demo ↗` and `GitHub` buttons.
- **Project 03 — MindPixel:** Left side laptop mockup; right side `03 MIND pixel INNOVATION STUDIO`, description, `Live Demo ↗` and `GitHub` buttons.
- **Project 04 — BudgetFlow:** 3D phone mockup; description, `Google Play ↗` and `GitHub` buttons.

### 5. Components Showcase (`#components`)
- **Pinned Split Layout:**
  - Left column is sticky: `Interface parts that behave under pressure. 6 components, 66.1 KB in total...` with buttons `BROWSE THE SHOP ↗` and `MESSAGE ME`.
  - Right area: Horizontal card shelf (`Sigil`, `Quarto`, `Parachute`, `Quench`, `Full Catalogue`).
- **Scroll Hijacking / Pinned Horizon:** Vertical scrolling drives the horizontal shelf translation (`SCROLL = SHELF` progress indicator `P 0.00` to `P 1.00`).

### 6. Interactive Easter Egg / Mini-Game (`#play`)
- **Container:** Dark canvas panel with caption: `"Break it if you can. It still ships."`
- **Interactive Element:** A fully playable Breakout-style paddle and ball game where the bricks spell out `HELLO WORLD` in square pixel typography!
- **Game Controls:** Mouse paddle movement, ball bounce physics, brick collision, game over / win states with score and `Play / Again` buttons.

### 7. Contact & Footer (`#contact`)
- **Background:** Looping ambient fluid motion video ([`contact_bg.mp4`](file:///g:/Languages/Projects/Portfolio/portfolio%20code%20and%20chill/reference/contact_bg.mp4)).
- **Left Column:**
  - Status pill: `• AVAILABLE FOR WORK` with a glowing green pulsing indicator.
  - Heading: Huge metallic gradient `Get in touch`.
  - Buttons: `Message on WhatsApp` (with icon) and `Send an email` (outline pill).
- **Right Column:**
  - Dark glass card displaying Email, Phone, Location (`Khulna, Bangladesh`), and social link icon circles (Play Store, LinkedIn, GitHub).
- **Footer Bar:** Copyright notice and bottom anchor links (`Home`, `About`, `Services`, `Projects`, `Privacy Policy`, `Terms`).

---

## 4. Navigation & Routing Architecture

- **Primary Navigation Type:** Single-Page Smooth Scrolling.
- **Anchor Targets:** `#home`, `#about`, `#service`, `#project`, `#components`, `#contact`.
- **Navigation Behavior:**
  - Desktop: Fixed top header with active link underline and backdrop blur.
  - Mobile: Collapses into a hamburger icon (`☰`). Clicking opens a full-viewport modal drawer with large centered navigation links and a close button (`✕`).
- **Modal / Sub-route:** Clicking secondary shop links triggers an internal React state toggle displaying a full-screen `Coming Soon` overlay with a back button (`onBack`).

---

## 5. Technology Stack & Architecture Identification

| Dimension | Observed Technology | Evidence |
| :--- | :--- | :--- |
| **Framework** | **React 19** | `react.dev` error links, `createRoot`, React hooks in bundle |
| **Build Tool** | **Vite** | Asset hashing convention (`index-BJNuUqxu.js`, `index-V1mGLk2S.css`) |
| **Styling** | **Tailwind CSS v4.3.3** | Explicit comment banner: `/*! tailwindcss v4.3.3 | MIT License */` |
| **Animation Engine** | **GSAP (GreenSock)** | `https://gsap.com`, `gsap.timeline`, `power3.inOut`, `power3.out` |
| **Hero Shader** | **WebGL2 (Canvas)** | `r.getContext("webgl2")`, custom vertex/fragment shaders |
| **Fonts** | **System Sans + Serif Italic** | `-apple-system, BlinkMacSystemFont, "Segoe UI"` + `ui-serif, Georgia` |
| **Video Playback** | **HTML5 `<video>`** | Autoplaying, muted, looping background video in Contact section |

---

## 6. Color Palette & Typography Specifications

### Color Tokens
```css
:root {
  --background: #050505;          /* Dominant page background */
  --card-bg: #0a0a0c;             /* Glass container background */
  --accent: #e8e4dc;              /* Metallic platinum / warm bone white */
  --accent-hover: #d6d1c6;        /* Subtle hover transition */
  --accent-contrast: #050505;     /* Dark text on light accent pills */
  --surface-lit: #cfc9bc;         /* Highlighted surface */
  --surface-lit-ink: #16150f;     /* High-contrast ink border */
  --status-green: #34d399;        /* Pulsing available-for-work green */
  --text-primary: #ffffff;        /* Pure white headings & bold text */
  --text-muted: #9ca3af;          /* Neutral gray body text */
}
```

### Metallic Chrome Gradient
- Gradient formula: `bg-gradient-to-b from-white via-gray-300 to-gray-800 bg-clip-text text-transparent`
- Used on: `PORTFOLIO`, `Intro`, `WHAT WE CAN DO`, and `Get in touch`.

### Typography Style Combinations
- **High-Impact Contrast:** Combining heavy black sans-serif (`font-black tracking-tighter uppercase`) with refined, light italic serif (`font-light italic text-gray-300`).
  - Example: `React Native` (Bold Sans) + `Developer` (Light Italic Serif).
  - Example: `HABIT` (Bold Sans) + `flow` (Italic Serif) + `TRACKER APP` (Bold Sans).
  - Example: `MIND` (Bold Sans) + `pixel` (Italic Serif) + `INNOVATION STUDIO` (Bold Sans).

---

## 7. Hero Portrait Reconstruction Strategy for Gaurav Patel

The most critical finding from this reconnaissance is that **the source image is a clean cut-out portrait of the person, while the pixelation and photomosaic are generated dynamically via WebGL2**:

1. **Source Asset Requirement:** Gaurav Patel only needs to provide a clear, standard cut-out portrait photograph (head and shoulders, looking forward, neutral lighting) on a transparent background.
2. **Photomosaic Tiles:** The tiny mosaic tiles in the portrait are constructed from screenshots of Gaurav's actual projects (*LifeOS*, *AI Resume Intelligence*, *RAG Study Assistant*).
3. **Shader Capabilities:**
   - Assembles tiles smoothly on load.
   - Interactive mouse scatter effect when the cursor moves over the face.
   - Dynamic upward dispersion as the user scrolls down into the About section.
   - Seamless fallback to standard stylized image if WebGL2 is not supported.

---

## 8. Reconstruction Risks & Mitigation

| Potential Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Complex WebGL2 Photomosaic** | High complexity | We have extracted the exact shader parameters (`uRes`, `uRect`, `uCell`, `uAtlas`, `uScatter`, `uMouse`) and will implement the WebGL2 shader component with a rock-solid canvas/CSS fallback. |
| **Horizontal Shelf Scroll Hijacking** | Can feel clunky if uncalibrated | Calibrate pinned vertical height to match scroll distance cleanly using native intersection observer and sticky container. |
| **Performance on Low-End Devices** | WebGL canvas battery drain | Limit pixel density to `Math.min(devicePixelRatio, 2)`, pause WebGL render loop when hero is out of viewport. |
| **Missing User Photograph** | Blocks hero personalization | User notified; temporary high-fidelity silhouette/placeholder will be staged until Gaurav uploads his portrait. |
