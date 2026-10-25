# Gaurav Patel — AI/ML Engineer Portfolio

A modern, high-performance portfolio website built with React, Tailwind CSS, GSAP, and WebGL2. Reconstructed to match the visual kinetics, typography, and interactive depth of the Code & Chill showcase while presenting the verified credentials, projects, and capabilities of **Gaurav Patel** (AI/ML Engineer).

---

## Features

- **Interactive WebGL2 Photomosaic:** Real-time particle point cloud shader reacting to cursor movement and scroll velocity, sampling Gaurav Patel's approved portrait.
- **Scroll-Linked Kinetic Typography:** Split chrome header (`PORTFOLIO`) with matrix cypher unscrambling and word-by-word opacity scrubbing in the bio section.
- **Dynamic Scroll-Spy Navigation:** Floating header with responsive active underline indicator that dynamically syncs as sections scroll into view.
- **Interactive Component Showcase:** Pinned desktop horizontal card track with live video previews (`.mp4`), zero dependencies, and fullscreen modal dialogue.
- **Classic Breakout Arcade Game:** 60FPS canvas recreation with smooth delta-time normalization, touchscreen drag support, and HUD life tracking.
- **Production AI/ML Projects:** Deep-dive showcases for *LifeOS Healthcare Platform*, *AI Resume Intelligence*, *RAG-Based Study Assistant*, and *Agentic Pulse Workflow Studio*.
- **Accessible & Responsive:** 100% WCAG AAA color contrast compliance, keyboard Escape key modal/drawer dismissal, and 0px horizontal overflow across mobile, tablet, and desktop viewports.

---

## Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations:** [GSAP 3.12](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Graphics:** WebGL2 custom vertex & fragment shaders
- **Icons:** [Lucide React](https://lucide.dev/) & optimized inline SVGs

---

## Prerequisites

- **Node.js:** $\ge 18.0.0$
- **npm:** $\ge 9.0.0$

---

## Quick Start

### 1. Installation
```bash
# Clone the repository and navigate to portfolio-app
cd portfolio-app

# Install project dependencies
npm install
```

### 2. Development Server
```bash
# Starts the local development server with Hot Module Replacement (HMR)
npm run dev
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

### 3. Automated Test Suite
```bash
# Runs the automated regression suite (35 assertions covering routes, assets, and handlers)
npm test
```

### 4. Production Build
```bash
# Compiles the production bundle to the dist/ directory
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```text
portfolio-app/
├── dist/                      # Compiled production distribution assets
├── public/                    # Static public assets
│   ├── assets/                # Images, videos, icons, and downloadable PDF resume
│   │   ├── hero_center.png    # Approved transparent portrait cutout
│   │   ├── Gaurav_Resume.pdf  # Verified resume document
│   │   ├── contact_bg.mp4     # Ambient contact video loop
│   │   └── reels/             # Component showcase video clips
│   ├── robots.txt             # Search crawler directives
│   └── sitemap.xml            # Canonical search engine sitemap
├── src/
│   ├── components/            # Reusable UI sections and interactive components
│   │   ├── Navbar.jsx         # Fixed header, brand, and mobile drawer
│   │   ├── Hero.jsx           # Display typography and cypher matrix reveal
│   │   ├── HeroMosaicCanvas.jsx # WebGL2 interactive particle shader
│   │   ├── About.jsx          # Bio section, word scrub, and stack marquees
│   │   ├── Services.jsx       # Numbered expandable accordion capabilities
│   │   ├── Projects.jsx       # Alternating two-column project showcases
│   │   ├── ComponentsShelf.jsx# Horizontal pinned card carousel
│   │   ├── BreakoutGame.jsx   # 60FPS playable arcade canvas game
│   │   ├── Contact.jsx        # Availability badge, email copy, and footer
│   │   └── ComingSoonModal.jsx# Accessible overlay with focus trap
│   ├── data/
│   │   └── profile.json       # Centralized personal credentials configuration
│   ├── utils/
│   │   └── animations.js      # Scroll reveal animation hooks
│   ├── App.jsx                # Layout orchestrator and dynamic scroll-spy
│   ├── index.css              # Design system tokens and custom keyframes
│   └── main.jsx               # React application entry point
├── tests/
│   └── functional-suite.js    # Automated regression test runner
└── package.json
```

---

## Centralized Content Configuration

Personal credentials, titles, projects, and social links are decoupled from layout code and configured in [`src/data/profile.json`](src/data/profile.json):

```json
{
  "personal": {
    "name": "Gaurav B Patel",
    "wordmark": "GAURAV",
    "role": {
      "bold": "AI/ML",
      "light": "Engineer"
    },
    "location": "Ahmedabad, Gujarat, India",
    "email": "gaurav.patel.1008.2006@gmail.com",
    "links": {
      "github": "https://github.com/gauravpatel007",
      "linkedin": "https://linkedin.com/in/gaurav-patel"
    }
  }
}
```

---

## Deployment Instructions

The application compiles to a purely static single-page application (SPA) requiring zero server-side runtimes.

### Vercel / Netlify / Cloudflare Pages
1. Connect repository.
2. Set **Build Command:** `npm run build` (or `cd portfolio-app && npm run build`).
3. Set **Publish Directory:** `dist` (or `portfolio-app/dist`).
4. Ensure single-page routing rewrite:
   - *Netlify (`_redirects`):* `/* /index.html 200`
   - *Vercel (`vercel.json`):* `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`

---

## License

Personal Portfolio code & assets © 2026 Gaurav B Patel. All rights reserved.
