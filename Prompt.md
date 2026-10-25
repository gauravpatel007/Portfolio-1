Do not implement all at once i will give my phases to you 
but here is the plan 
# PROJECT: Reverse Engineer and Reconstruct a Reference Portfolio Website

## 1. PROJECT OBJECTIVE

I want to recreate the reference portfolio website as closely as technically and legally appropriate, using a downloaded Reverse Engineering repository that I will provide in a local folder.

REFERENCE WEBSITE:
https://demo.codeandchill.store/portfolio/

REVERSE ENGINEERING REPOSITORY:
A downloaded repository will be available in a local folder within the workspace. You must locate it, inspect its documentation, understand its capabilities, and determine how to use it.

MY OBJECTIVE:

Reconstruct the reference website's observable design, layout, animations, interactions, responsive behavior, and overall user experience.

The final result should be a working website in my own project, not merely a screenshot, static mockup, or collection of disconnected components.

I want the closest achievable visual and behavioral match to the reference.

However:

* Do not claim that the website has been reverse-engineered until you have actually inspected it.
* Do not claim pixel-perfect accuracy without visual comparison and testing.
* Do not assume that the original source code is publicly available.
* Do not assume the reverse-engineering repository can perform every required task.
* Do not invent website features, animations, routes, or interactions that you have not observed.
* Do not blindly generate a generic developer portfolio.
* Do not start implementing the entire website before completing the initial analysis.
* Do not copy secrets, credentials, private information, or unrelated server-side resources.
* Respect the applicable licenses and permissions for source code, fonts, images, and other assets.

Your primary objective is to reconstruct the REFERENCE WEBSITE, not to design a different website inspired by it.

Personalization with my information will be handled separately after the reference structure and behavior have been understood.

---

# 2. EXECUTION RULES

You must follow a phased implementation process.

Do not skip phases.

Do not mark a phase complete simply because you generated code.

A phase is complete only when its deliverables exist and its completion criteria have been checked.

For every phase:

1. Inspect the existing state.
2. Identify the required work.
3. Perform the work.
4. Validate the results.
5. Document findings.
6. Record any unresolved issues.
7. Proceed to the next phase when dependencies are satisfied.

Work autonomously whenever the environment and available tools permit.

If something cannot be accessed or executed, explain the limitation, try a reasonable alternative, and continue with tasks that do not depend on the unavailable capability.

Do not repeatedly ask me for information that can be discovered from the repository, website, package files, or existing project.

Ask me a question only when a genuinely necessary decision cannot be resolved through inspection.

Never claim to have executed a command, tested a feature, inspected an element, or captured a screenshot unless you actually did so.

Maintain a clear distinction between:

* Confirmed findings.
* Reasonable inferences.
* Unverified assumptions.
* Blocked tasks.

---

# PHASE 0 — WORKSPACE DISCOVERY AND SAFETY

## Objective

Understand the workspace before modifying any files.

## Tasks

### 0.1 Inspect the workspace

Identify:

* Current working directory.
* Existing application directories.
* The downloaded Reverse Engineering repository.
* Any existing portfolio project.
* Existing Git repositories.
* Existing package managers and lockfiles.
* Existing browser automation configuration.
* Existing documentation.
* Existing environment files.
* Existing test suites.

Search likely workspace locations if the repository is not immediately visible.

Do not assume a particular directory name.

### 0.2 Determine the project structure

Inspect the available directories and files.

Determine whether the workspace contains:

A. Only the Reverse Engineering repository.

B. The Reverse Engineering repository and an existing portfolio.

C. Multiple unrelated projects.

D. A partially completed portfolio and supporting tools.

Record the findings.

### 0.3 Protect existing work

Before making modifications:

* Inspect Git status where applicable.
* Identify uncommitted changes.
* Preserve existing user files.
* Avoid overwriting existing projects.
* Do not delete files merely because they appear unnecessary.
* Do not replace existing package configuration without understanding its purpose.
* Do not expose environment variables, credentials, or private configuration in reports.

If the workspace contains an existing portfolio, determine whether it should be reused before creating a replacement.

If no portfolio exists, create a dedicated application directory without modifying unrelated projects.

### 0.4 Inspect the Reverse Engineering repository

Read its:

* README.
* Installation instructions.
* Package configuration.
* Dependencies.
* Source code.
* CLI entry points.
* Configuration files.
* Usage examples.
* Supported input and output formats.
* Known limitations.
* License.
* Existing tests.

Determine exactly what the repository does.

Investigate whether it supports:

* URL-based website analysis.
* Browser automation.
* DOM inspection.
* HTML extraction.
* CSS extraction.
* JavaScript asset inspection.
* Screenshot capture.
* Asset discovery.
* Font discovery.
* Network request inspection.
* Route discovery.
* Responsive viewport testing.
* Animation inspection.
* Component reconstruction.
* Code generation.
* Local file analysis.

Do not assume these features exist.

Classify each capability as:

* CONFIRMED SUPPORTED.
* PARTIALLY SUPPORTED.
* NOT SUPPORTED.
* NOT YET VERIFIED.

For every important capability, identify the relevant command, function, module, or documented workflow.

### 0.5 Understand the repository's runtime requirements

Determine:

* Required runtime version.
* Required package manager.
* Installation procedure.
* Required browser binaries.
* Required environment variables.
* Required external services.
* Whether network access is necessary.
* Whether the tool requires a particular operating system.
* Whether the repository can run in the current environment.

Inspect the existing dependencies before installing anything.

Avoid unnecessary global installations.

Do not execute unknown scripts blindly.

### 0.6 Produce the initial report

Create:

reports/00-workspace-and-tool-audit.md

Include:

1. Workspace structure.
2. Existing projects.
3. Reverse Engineering repository location.
4. Repository purpose.
5. Confirmed capabilities.
6. Unsupported capabilities.
7. Installation and execution instructions.
8. Important limitations.
9. Safety considerations.
10. Recommended implementation strategy.

Do not proceed as though the repository has capabilities that the audit did not confirm.

---
# (PHASE 0 - part 2) PHASE 0.2 — PERSONAL IDENTITY, CV ANALYSIS & HERO PORTRAIT

## Objective

Before reverse-engineering the reference website, establish my personal identity, professional information, and hero portrait requirements.

I want to recreate the reference portfolio using MY identity and professional details.

**Reference website:** https://demo.codeandchill.store/portfolio/

I will provide two important inputs:

1. **Reference image:** The uploaded screenshot showing a portfolio hero section with a large, pixelated portrait behind oversized typography.
2. **My CV/Resume:** I will upload my CV. Extract my actual professional information from it and use that information to personalize my portfolio.

These inputs have different purposes:

* The screenshot establishes the desired portrait presentation and visual direction.
* My CV establishes the source of truth for my professional information.

Do not confuse the person depicted in the reference screenshot with me.

The face in the final portfolio must be **MY FACE**, not the face shown in the reference image.

---

## 0.2.1 — Analyze My Uploaded CV

Locate and read my uploaded CV/Resume before generating portfolio content.

The CV may be a PDF, DOCX, or another supported document format.

Extract the following information wherever available:

* Full name.
* Professional title or target role.
* Professional summary.
* Technical skills.
* Programming languages.
* Frameworks and libraries.
* Development tools.
* Projects.
* Project descriptions.
* Technologies used in each project.
* Work experience.
* Internships.
* Education.
* Certifications.
* Achievements.
* GitHub profile.
* LinkedIn profile.
* Personal website.
* Email address.
* Other professional links.

### Rules for CV extraction

1. Treat my CV as the primary source of truth.
2. Do not invent qualifications, employment history, achievements, or experience.
3. Do not exaggerate my skills or project accomplishments.
4. Preserve the meaning of my actual experience while improving wording for portfolio presentation.
5. If information is missing, leave it as an unresolved field rather than fabricating it.
6. If the CV contains conflicting information, flag the conflict.
7. Do not expose private information that is unnecessary for a public portfolio, such as a home address, identification number, or other sensitive personal details.
8. Do not publish my email address, phone number, or other contact details unless they are appropriate for the portfolio and supported by the information I provide.

### Project analysis

For every project listed in my CV, identify:

* Project name.
* Problem it solves.
* Key features.
* Technologies used.
* My actual contribution.
* Available repository or live-demo links.
* Whether additional information is needed.

Do not invent project features based on the project name alone.

### Deliverable

Create:

`reports/00.2-personal-profile.md`

Organize the extracted information into clear sections and distinguish verified CV information from missing details.

Also create a structured content file for the portfolio, using a format appropriate for the selected frontend framework.

The structured content file must remain editable so I can update my information without rewriting the entire UI.

---

## 0.2.2 — Analyze the Uploaded Hero Reference Image

Inspect the uploaded screenshot carefully.

The screenshot contains:

* A dark, nearly black background.
* A large portrait rendered using a pixelated or mosaic-like visual treatment.
* Blue-white highlights across the portrait.
* Oversized, bold typography positioned across the lower portion of the face.
* A dramatic, high-contrast composition.

Use this screenshot to understand the intended portrait presentation.

Do not reproduce unrelated interface elements from the screenshot unless they are independently confirmed to exist in the reference website during Phase 1.

The objective is to recreate the portrait treatment using MY FACE.

### Visual requirements

The final hero portrait should preserve the intended visual characteristics:

* Pixelated or mosaic-like portrait rendering.
* High contrast against a dark background.
* Blue-white or similarly faithful highlights.
* Strong integration between the portrait and the oversized typography.
* Correct positioning and scaling.
* A premium, polished visual appearance.
* Responsive behavior across desktop and mobile.

These characteristics describe the portrait treatment, not permission to invent a completely different page layout.

Phase 1 must still determine the reference website's actual layout, typography, animations, and interactions.

---

## 0.2.3 — Obtain and Prepare My Face Image

My actual face must be used for the portfolio portrait.

If I provide a separate photograph of myself, use that photograph as the source image.

If the uploaded reference screenshot is the only image available, do not extract the depicted person's face and substitute it for mine.

Instead, identify that a genuine photograph of me is still required.

Do not search the internet for my face or select a random person's photograph.

Do not generate a different person's face and present it as mine.

### Image preparation

Once my photograph is available:

1. Inspect the image quality and orientation.
2. Determine whether the face is sufficiently visible.
3. Identify the appropriate crop.
4. Preserve my actual facial identity.
5. Prepare the image for the intended portrait effect.
6. Avoid unnecessary facial alterations.
7. Ensure the resulting image works against the dark hero background.

If the photograph is unsuitable, document what is missing and request a better photograph rather than fabricating a replacement.

### Important identity constraint

The objective is to transform the presentation of my real photograph, not replace my facial identity.

Stylization may change pixelation, lighting, contrast, texture, and color treatment while preserving the underlying identity.

---

## 0.2.4 — Investigate How to Reproduce the Portrait Effect

After inspecting the reference image, determine the most appropriate technical implementation.

Evaluate possible techniques, including:

* CSS-based image treatments.
* Canvas-based pixelation.
* JavaScript pixel sampling.
* SVG filters.
* WebGL or shader-based rendering, if justified.
* A preprocessed image with a suitable pixelated treatment.

Do not choose the most complicated technique automatically.

Prefer the simplest approach that reproduces the intended appearance with good performance and responsive behavior.

### If using a real-time pixelation effect

Investigate whether the effect can support:

* Adjustable pixel size.
* Image contrast.
* Color tinting.
* Highlight intensity.
* Background blending.
* Responsive scaling.
* Efficient rendering.
* Proper resource cleanup.

Do not introduce unnecessary animation if the reference only requires a static visual treatment.

If the reference contains an animated portrait effect, Phase 1 should determine its actual behavior before the animation is implemented.

### Image processing and privacy

Process the photograph locally where practical.

Do not upload my photograph to external image-processing services without my authorization.

Do not transmit it to unrelated APIs.

Do not commit my original photograph to a public repository without my explicit approval.

---

## 0.2.5 — Integrate the Portrait With the Hero Typography

The portrait and typography must be treated as a coordinated composition.

After Phase 1 identifies the reference website's actual hero layout, reproduce the appropriate relationship between:

* Portrait scale.
* Portrait position.
* Typography scale.
* Typography overlap.
* Text alignment.
* Background.
* Viewport dimensions.
* Responsive layout.

The large heading must not obscure the portrait so completely that the face becomes unrecognizable.

At the same time, do not arbitrarily shrink the typography if the reference uses oversized lettering.

Balance the two elements using the reference as the visual guide.

Test the composition at desktop, tablet, and mobile sizes.

Prevent clipping, unintended horizontal scrolling, and text overlapping important facial features inappropriately.

---

## 0.2.6 — Prepare My Portfolio Content

Use the information extracted from my CV to prepare a preliminary content map.

Map my actual information to the corresponding sections of the reference website.

Examples include:

* Hero introduction.
* About section.
* Skills.
* Projects.
* Experience.
* Education.
* Contact information.

These are potential mappings, not instructions to create sections that do not exist in the reference.

If the reference does not have a dedicated section for a particular item in my CV, determine whether the information can be integrated naturally into an existing section.

Preserve the reference's structure wherever possible.

Do not redesign the entire website simply because my CV contains additional information.

If important professional information has no appropriate place in the existing design, document the issue for later review.

---

## 0.2.7 — Create a Personalization Checklist

Create:

`reports/00.2-personalization-checklist.md`

Include:

* [ ] CV located and successfully read.
* [ ] Full name verified.
* [ ] Professional title verified or flagged as missing.
* [ ] Skills extracted.
* [ ] Projects extracted.
* [ ] Experience extracted.
* [ ] Education extracted.
* [ ] Professional links extracted where available.
* [ ] Missing information documented.
* [ ] Publicly unnecessary sensitive information excluded.
* [ ] Uploaded hero reference image inspected.
* [ ] Genuine photograph of me located.
* [ ] Photograph suitability evaluated.
* [ ] Portrait treatment implementation approach selected.
* [ ] Personal content mapped to the reference layout.
* [ ] Structured portfolio content created.

Mark unavailable items as BLOCKED rather than pretending they are complete.

---

## 0.2.8 — Phase Completion Criteria

Phase 0.2 is complete when:

1. My CV has been inspected and its relevant professional information extracted.
2. The hero reference image has been analyzed.
3. The requirements for using my actual face are documented.
4. The portrait treatment has a technically justified implementation plan.
5. My portfolio content has been mapped to the expected website structure.
6. Missing personal information and assets have been documented.
7. The required reports and structured content files have been created.

If my actual photograph or CV has not yet been uploaded, continue with the available analysis and clearly identify the missing input.

Do not invent my personal details or substitute another person's face.

Do not block unrelated repository inspection simply because my personal assets are missing.

---

## HANDOFF TO PHASE 1

Once Phase 0.2 is complete, proceed to Phase 1: Reference Website Reconnaissance.

Use the extracted personal information and portrait requirements as additional context during the reconstruction.

However, the reference website remains the primary source of truth for the original page structure, layout, interactions, and animations.

The final website must combine:

**The reference website's reconstructed visual experience + my actual face + my verified professional information.**

Do not begin the final personalization until the relevant layout and implementation decisions have been established.


# PHASE 1 — REFERENCE WEBSITE RECONNAISSANCE

## Objective

Build an evidence-based understanding of the reference website before writing the main implementation.

REFERENCE:
https://demo.codeandchill.store/portfolio/

## 1.1 Open the reference website

Use the available browser, browser automation tools, or the Reverse Engineering repository.

Verify whether the URL is accessible.

Record:

* Final URL after redirects.
* Page title.
* Loading behavior.
* Initial viewport.
* Main navigation.
* Visible content.
* Major page sections.
* Footer.
* Links to other pages.
* Any errors or access restrictions.

If access fails, investigate whether the problem is caused by:

* Network restrictions.
* Browser configuration.
* Website availability.
* Bot protection.
* Unsupported browser tooling.
* An invalid or redirected URL.

Do not report successful inspection if the page could not be accessed.

### 1.2 Capture the initial viewport

Capture a screenshot of the reference at a desktop viewport.

Use a consistent browser viewport for subsequent comparisons.

Record the viewport dimensions and device pixel ratio where available.

Capture the complete visible interface, including:

* Navigation.
* Main heading.
* Supporting text.
* Buttons.
* Background.
* Images.
* Decorative elements.
* Cursor effects, if present.

Save the screenshot to:

reference/desktop-initial.png

If the repository uses a different output structure, document the actual location.

### 1.3 Inspect the complete page

Scroll through the entire page in controlled increments.

Do not inspect only the hero section.

Capture screenshots at meaningful scroll positions.

Inspect:

* Every visible section.
* Section transitions.
* Sticky elements.
* Pinned content.
* Scroll-triggered animations.
* Cards and grids.
* Image galleries.
* Timelines.
* Contact sections.
* Footer behavior.
* Floating controls.
* Back-to-top controls.

Record the approximate scroll position of important transitions.

If the page contains horizontal scrolling or pinned sections, inspect those separately.

### 1.4 Inspect navigation and routes

Identify all visible navigation elements.

For each item, determine:

* Whether it navigates to a different URL.
* Whether it scrolls to a section.
* Whether it opens a menu.
* Whether it opens a modal.
* Whether it triggers an animation.
* Whether the URL changes.
* Whether the behavior differs on mobile.

Inspect all publicly accessible routes linked from the portfolio.

Do not assume that every button works as expected.

Test the actual behavior.

### 1.5 Inspect hover and click interactions

Interact with all important visible controls.

Examples include:

* Navigation links.
* Primary and secondary buttons.
* Project cards.
* Image thumbnails.
* Social links.
* Contact controls.
* Menus.
* Modal triggers.
* Theme controls.
* Floating action buttons.

For each interaction, record:

1. Initial state.
2. User action.
3. Resulting state.
4. Animation or transition.
5. URL change, if any.
6. Keyboard behavior, where relevant.

Use browser inspection to identify hover styles, active states, focus states, and cursor behavior.

Do not infer an interaction solely from the element's appearance.

### 1.6 Inspect responsive behavior

Capture and inspect the reference at these approximate CSS viewport sizes:

* Desktop: 1440 × 900.
* Laptop: 1280 × 800.
* Tablet: 768 × 1024.
* Mobile: 390 × 844.
* Narrow mobile: 360 × 800.

Adjust these dimensions when the reference's layout requires additional breakpoints.

Check:

* Navigation transformation.
* Typography scaling.
* Section stacking.
* Card widths.
* Image cropping.
* Horizontal overflow.
* Touch interaction.
* Sticky behavior.
* Animation changes.
* Mobile-specific content.

Do not merely shrink the desktop layout and assume it is responsive.

### 1.7 Inspect available resources

Using the Reverse Engineering repository and browser inspection, identify publicly accessible resources relevant to the rendered site.

Where accessible and permitted, inspect:

* Images.
* SVG files.
* Icon assets.
* Fonts.
* Stylesheets.
* Public JavaScript bundles.
* Publicly referenced media.
* Public source maps, if available.
* Asset dimensions.
* Image formats.
* Animation libraries referenced by the page.

Distinguish original source code from production bundles.

Do not attempt to bypass authentication, access controls, or server-side restrictions.

Do not scrape unrelated sites or collect resources unrelated to the requested reconstruction.

### 1.8 Inspect animation behavior

Record each important animation in an animation inventory.

Investigate:

* Initial page-load animation.
* Text reveal.
* Image reveal.
* Scroll-triggered transitions.
* Parallax.
* Sticky or pinned sections.
* Staggered card reveals.
* Hover transformations.
* Cursor effects.
* Page transitions.
* Loading transitions.
* Animated backgrounds.
* Scroll progress indicators.
* Horizontal movement.
* Infinite marquees.
* Counters.
* Any observed 3D effects.

For each animation, document:

* Element or section.
* Trigger.
* Start state.
* End state.
* Approximate duration.
* Easing behavior.
* Direction.
* Staggering.
* Whether it repeats.
* Whether it is tied to scroll progress.
* Whether it is disabled or modified on mobile.
* Confidence in the observation.

If timing cannot be measured reliably, label it as an estimate.

### 1.9 Determine the likely frontend architecture

Inspect available evidence to determine whether the website appears to use:

* Plain HTML, CSS, and JavaScript.
* React.
* Next.js.
* Vue.
* Another framework.
* GSAP.
* Framer Motion.
* CSS animations.
* Canvas or WebGL.
* A smooth-scrolling library.
* A custom animation system.

Use package metadata, public bundles, browser behavior, and repository output where available.

Do not assume that a library is used merely because it would be suitable for the observed effect.

### 1.10 Produce the reconnaissance report

Create:

reports/01-reference-reconnaissance.md

Include:

1. Access status.
2. Reference screenshots.
3. Page and route inventory.
4. Section inventory.
5. Navigation behavior.
6. Interaction inventory.
7. Animation inventory.
8. Responsive behavior.
9. Typography observations.
10. Color observations.
11. Layout observations.
12. Available assets.
13. Likely technology stack.
14. Uncertainties.
15. Technical reconstruction risks.

The report must separate observed facts from estimates and assumptions.

---

# PHASE 2 — VISUAL AND STRUCTURAL SPECIFICATION

## Objective

Translate the reconnaissance findings into a concrete implementation specification.

Do not begin by creating arbitrary sections or selecting a new visual theme.

Use the reference as the primary source of truth.

## 2.1 Build a page structure map

Document the exact observed order of sections.

For every section, record:

* Section identifier.
* Purpose.
* Approximate height.
* Background treatment.
* Content alignment.
* Maximum content width.
* Padding.
* Grid structure.
* Typography hierarchy.
* Images.
* Interactive elements.
* Animation behavior.
* Responsive changes.

Only include sections that exist in the reference or are necessary for equivalent behavior.

### 2.2 Create a design token specification

Document the observed design system.

Include:

* Primary colors.
* Secondary colors.
* Accent colors.
* Background colors.
* Text colors.
* Muted text colors.
* Border colors.
* Surface colors.
* Font families.
* Font weights.
* Font sizes.
* Line heights.
* Letter spacing.
* Spacing scale.
* Border radii.
* Shadows.
* Gradients.
* Container widths.
* Breakpoints.
* Transition durations.

Measure or estimate values from the reference.

Clearly label estimated values.

Where the original font or asset is accessible and appropriately licensed, prefer the original resource.

Otherwise, choose a visually compatible alternative and document the substitution.

Do not introduce an unrelated color palette or generic design system.

### 2.3 Create a component inventory

Identify the components required to reproduce the reference.

Potential examples include:

* Navigation.
* Mobile navigation.
* Hero section.
* Section heading.
* Project card.
* Image gallery.
* Experience timeline.
* Skills list.
* Contact section.
* Footer.
* Modal.
* Custom cursor.
* Scroll progress indicator.

These are examples only.

Create components based on the actual reference rather than forcing every possible portfolio feature into the project.

For each component, record:

* Responsibility.
* Inputs or props.
* Visual states.
* Interactions.
* Responsive behavior.
* Dependencies.
* Relevant animations.

### 2.4 Create an interaction specification

For each interactive component, document:

* Default state.
* Hover state.
* Focus state.
* Active state.
* Disabled state, if applicable.
* Open state.
* Closed state.
* Loading state, if applicable.
* Error state, if applicable.

Document the expected behavior for keyboard and touch interactions.

### 2.5 Create a technical architecture proposal

Recommend an architecture based on the actual repository findings.

Evaluate whether the existing project should use:

* Its current framework.
* The reference's likely framework.
* A lightweight implementation using native web technologies.
* A new framework, if there is a justified reason.

Prefer the simplest architecture that can reproduce the observed behavior accurately.

Avoid unnecessary dependencies.

Do not rewrite an existing application merely because a different framework is fashionable.

### 2.6 Produce the specification

Create:

reports/02-visual-and-technical-specification.md

Include:

* Page structure.
* Design tokens.
* Component inventory.
* Interaction specification.
* Animation specification.
* Responsive specification.
* Architecture decision.
* Dependency recommendations.
* Known uncertainties.
* Implementation priorities.

---

# PHASE 3 — PROJECT SETUP AND FOUNDATION

## Objective

Prepare a maintainable application structure before implementing the detailed interface.

## 3.1 Select the application directory

If an existing portfolio is available, inspect it and determine whether it can be extended safely.

If no portfolio exists, create a dedicated directory.

Do not place the final application inside the Reverse Engineering repository unless that repository explicitly supports this structure and there is a good reason to do so.

Keep the analysis tool and the final application logically separated.

A possible structure is:

workspace/
├── reverse-engineering-tool/
├── portfolio-app/
│   ├── src/
│   ├── public/
│   ├── tests/
│   ├── reports/
│   ├── package.json
│   └── README.md
└── reference/

Adapt this structure to the actual environment.

Do not create duplicate directories if equivalent ones already exist.

## 3.2 Establish the frontend foundation

Implement only the foundation needed by the selected architecture.

Potential requirements:

* Application entry point.
* Routing.
* Global styles.
* Design tokens.
* Font loading.
* Asset management.
* Responsive container system.
* Shared layout.
* Error handling.
* Development scripts.
* Build configuration.

Do not add every possible library.

Use the existing project dependencies when appropriate.

## 3.3 Choose animation technology deliberately

Use the least complex animation system capable of reproducing the reference.

Possible options include:

* CSS transitions and keyframes.
* Native browser APIs.
* Intersection Observer.
* GSAP and ScrollTrigger.
* Framer Motion.
* A smooth-scrolling library, if genuinely required.
* Canvas or WebGL, if the reference requires it.

Do not install multiple animation libraries that duplicate the same functionality.

If the reference uses complex scroll-linked or pinned animations, evaluate whether a dedicated animation library is justified.

If using a smooth-scrolling library, verify compatibility with scroll triggers, sticky positioning, navigation, and accessibility.

## 3.4 Establish quality checks

Before building the complete interface:

* Confirm the development server starts.
* Confirm the application renders.
* Confirm the production build works.
* Confirm there are no immediate console errors.
* Confirm the routing strategy works.
* Confirm asset paths resolve.
* Confirm the browser automation environment can access the application.

Create:

reports/03-foundation-validation.md

Do not proceed with a broken foundation.

---

# PHASE 4 — ASSET COLLECTION AND RECONSTRUCTION

## Objective

Identify the correct assets and reproduce the visual elements accurately.

## 4.1 Build an asset inventory

Record accessible assets in a structured inventory.

For each asset, include:

* Original URL or source location, when appropriate.
* Local filename.
* File format.
* Dimensions.
* Intended usage.
* License or permission status, if known.
* Whether the asset is original, substituted, or recreated.

Avoid downloading the same asset repeatedly.

Do not copy assets without checking their usage rights.

## 4.2 Reuse permitted assets

Where permitted, use the original publicly accessible assets that are necessary to reproduce the reference.

Preserve appropriate aspect ratios.

Avoid substituting generic stock images when the correct permitted assets are available.

If an original asset is unavailable or cannot be reused, create or source a suitable replacement and document the difference.

Do not silently replace distinctive assets with unrelated images.

## 4.3 Match image presentation

Reproduce the observed:

* Aspect ratios.
* Crop positions.
* Object-fit behavior.
* Border radii.
* Overlays.
* Masks.
* Filters.
* Gradients.
* Hover scaling.
* Reveal animations.

Use responsive image sizing and appropriate loading strategies.

Avoid lazy-loading critical above-the-fold content if doing so delays the initial visual experience.

## 4.4 Handle fonts correctly

Prefer the original font when accessible and appropriately licensed.

Otherwise, select the closest suitable alternative.

Verify:

* Font weights.
* Italic styles.
* Letter spacing.
* Line wrapping.
* Heading width.
* Navigation alignment.
* Fallback behavior.

Font differences can significantly affect visual similarity.

Create:

reports/04-asset-inventory.md

---

# PHASE 5 — IMPLEMENT THE PAGE STRUCTURE

## Objective

Reconstruct the complete page structure before fine-tuning advanced animations.

Implement the actual observed section order.

## 5.1 Navigation

Reproduce the reference's:

* Position.
* Height.
* Alignment.
* Logo or branding.
* Typography.
* Colors.
* Spacing.
* Background treatment.
* Border or shadow.
* Active states.
* Hover states.
* Scroll behavior.
* Mobile behavior.

If the navigation changes appearance after scrolling, reproduce the observed transition.

If a mobile menu exists, implement its complete open and closed states.

Verify that every navigation control reaches the correct destination.

## 5.2 Hero section

Reproduce the actual hero rather than using a generic portfolio template.

Match:

* Content position.
* Heading hierarchy.
* Typography.
* Line breaks.
* Supporting text.
* Buttons.
* Images.
* Background.
* Decorative elements.
* Initial animation.
* Responsive layout.

The first viewport should receive special attention because it strongly influences the overall impression.

## 5.3 Remaining sections

Implement every observed section in its actual order.

For each section:

1. Build the structure.
2. Apply the design tokens.
3. Match spacing and alignment.
4. Integrate the correct assets.
5. Implement interactive states.
6. Add section-specific responsive behavior.
7. Validate the result against the reference.

Do not invent a skills section, testimonial section, project filter, or other feature unless it exists in the reference or is explicitly required later.

## 5.4 Footer

Reconstruct the footer's:

* Layout.
* Typography.
* Background.
* Links.
* Social icons.
* Spacing.
* Decorative elements.
* Hover effects.
* Responsive behavior.

Verify all links.

## 5.5 Structural validation

After implementing the structure:

* Confirm every section exists.
* Confirm the order matches.
* Confirm all visible text fits.
* Confirm images load.
* Confirm no major overflow exists.
* Confirm the layout remains usable at desktop and mobile sizes.

Create:

reports/05-structural-implementation.md

---

# PHASE 6 — ADVANCED ANIMATION RECONSTRUCTION

## Objective

Reproduce the observed motion and interaction behavior as closely as practical.

Do not add animations merely to make the website look more impressive.

The reference determines the desired behavior.

## 6.1 Build an animation implementation map

Map every animation in the reconnaissance report to:

* The relevant component.
* The trigger.
* The implementation method.
* The expected result.
* The test procedure.

Prioritize the most visually significant animations.

## 6.2 Reproduce initial loading behavior

If the reference has a loading animation or initial reveal:

* Reconstruct the observed sequence.
* Avoid unnecessary delays.
* Avoid leaving content permanently invisible if JavaScript fails.
* Respect reduced-motion preferences.
* Ensure the website remains usable during loading.

Do not invent a full-screen loading animation if the reference does not have one.

## 6.3 Reproduce text animations

Where observed, reproduce:

* Word reveals.
* Character reveals.
* Line reveals.
* Staggered entrance.
* Clipping masks.
* Opacity changes.
* Vertical or horizontal movement.

Preserve correct reading order and accessible text.

Avoid splitting text into individual animated elements unless necessary.

## 6.4 Reproduce scroll-triggered reveals

Where observed:

* Identify the correct trigger position.
* Match the direction of movement.
* Match opacity changes.
* Match stagger timing.
* Match replay behavior.
* Prevent repeated event registration.
* Prevent layout shifts.

Test scrolling down and back up.

Do not assume all reveal animations should replay every time the element enters the viewport.

## 6.5 Reproduce pinned and scroll-linked sections

If the reference pins content during scrolling:

* Reconstruct the pinning behavior.
* Match the scroll distance.
* Match the transition between panels.
* Match element stacking.
* Match scale and opacity changes.
* Match any horizontal movement.
* Verify the final section releases correctly.

Test different viewport heights.

Test direct navigation to the section.

Test page refreshes.

Ensure the animation system recalculates correctly when images load or viewport dimensions change.

## 6.6 Reproduce hover and cursor effects

If present, reproduce:

* Hover scaling.
* Image movement.
* Color transitions.
* Text changes.
* Magnetic buttons.
* Custom cursor effects.
* Pointer-following elements.

Ensure the interface remains usable on touchscreens.

Do not make essential information available only through hover.

Disable or simplify pointer-dependent effects on devices that do not support the necessary interaction.

## 6.7 Reproduce page transitions

If the reference uses animated route transitions:

* Match the transition direction.
* Match timing and easing.
* Preserve navigation history.
* Ensure browser back and forward work.
* Avoid trapping the user on a loading screen.
* Respect reduced-motion settings.

Do not invent page transitions if the site only uses in-page scrolling.

## 6.8 Prevent animation conflicts

Audit the complete animation system for:

* Duplicate scroll listeners.
* Multiple animation loops.
* Incorrect cleanup.
* Conflicting transforms.
* Scroll-position jumps.
* Sticky-positioning failures.
* Layout shifts.
* Animation glitches after resize.
* Inconsistent refresh behavior.
* Excessive GPU usage.

Prefer transform and opacity animations when appropriate.

Avoid animating layout-affecting properties continuously when a more efficient alternative exists.

## 6.9 Respect accessibility

Support:

* Reduced-motion preferences.
* Keyboard navigation.
* Visible focus states.
* Accessible interactive labels.
* Appropriate contrast.
* Functional navigation without pointer-only controls.

Reduced-motion support must preserve content visibility and functionality.

Create:

reports/06-animation-implementation.md

---

# PHASE 7 — VISUAL COMPARISON AND ITERATIVE REFINEMENT

## Objective

Compare the actual implementation with the reference and systematically reduce visible differences.

This phase is mandatory.

Do not declare success because the website looks attractive in isolation.

## 7.1 Establish comparable conditions

Use the same:

* Viewport dimensions.
* Device pixel ratio where possible.
* Browser.
* Zoom level.
* Scroll position.
* Interaction state.
* Font-loading state.
* Animation state.

Capture the reference and implementation under comparable conditions.

Avoid comparing screenshots taken at different scroll positions or during different animation stages.

## 7.2 Capture implementation screenshots

Capture the implementation at:

* Initial desktop viewport.
* Main section boundaries.
* Important animation states.
* Project hover states.
* Navigation states.
* Contact section.
* Footer.
* Tablet viewport.
* Mobile viewport.

Use a consistent naming convention.

For example:

screenshots/
├── reference/
├── implementation/
└── comparisons/

Adapt the structure to the project.

## 7.3 Perform visual comparison

Compare:

* Overall composition.
* Element positions.
* Section heights.
* Container widths.
* Text wrapping.
* Typography.
* Background colors.
* Image dimensions.
* Image crops.
* Padding and margins.
* Card geometry.
* Borders and shadows.
* Navigation placement.
* Animation timing.
* Responsive layout.

When supported, generate:

* Side-by-side screenshots.
* Semi-transparent overlays.
* Difference images.
* Pixel-difference statistics.

Do not rely exclusively on a single numerical similarity score.

Font rendering, antialiasing, and animation timing can affect pixel comparisons without necessarily indicating a meaningful defect.

## 7.4 Prioritize visual defects

Classify discrepancies as:

P0 — Critical:

* Page does not load.
* Main content is missing.
* Essential interactions fail.
* Major sections are absent.

P1 — High:

* Hero layout is substantially different.
* Major animations are missing.
* Large images or backgrounds are incorrect.
* Navigation is broken.
* Significant responsive defects exist.

P2 — Medium:

* Typography differs.
* Spacing is inconsistent.
* Cards have incorrect proportions.
* Hover states are incomplete.
* Animation timing differs noticeably.

P3 — Low:

* Small alignment errors.
* Minor color differences.
* Subtle border or shadow differences.
* Small decorative discrepancies.

Fix the highest-impact defects first.

## 7.5 Iterate systematically

For each iteration:

1. Capture the current result.
2. Identify the most important discrepancies.
3. Locate the responsible component or style.
4. Make targeted changes.
5. Rebuild or refresh the application.
6. Capture a new screenshot.
7. Compare again.
8. Record the result.

Avoid changing many unrelated design elements at once.

Do not introduce new visual differences while fixing existing ones.

Continue until the major discrepancies have been addressed or a documented limitation prevents further progress.

Create:

reports/07-visual-comparison.md

Include before-and-after evidence where available.

---

# PHASE 8 — FUNCTIONAL AND INTERACTION TESTING

## Objective

Verify that the reconstructed website actually works.

Use the existing test framework when possible.

If Playwright is already available, use it.

Otherwise, evaluate whether installing it is justified and compatible with the environment.

Do not assume it is already installed.

## 8.1 Navigation testing

Test:

* Every internal navigation link.
* Every external link.
* Mobile menu opening.
* Mobile menu closing.
* Menu dismissal behavior.
* Smooth scrolling.
* Active section indication, if present.
* Back-to-top functionality, if present.
* Browser back and forward navigation.
* Direct URL access.

## 8.2 Interactive component testing

Test every observed interactive element.

Examples include:

* Project cards.
* Modals.
* Galleries.
* Filters.
* Buttons.
* Theme toggles.
* Contact links.
* Forms.
* Download links.
* Social links.

Only test components that actually exist in the reconstructed website.

## 8.3 Contact form testing

If the reference contains a contact form, verify:

* Required fields.
* Input validation.
* Invalid email handling.
* Submission behavior.
* Loading feedback.
* Success feedback.
* Error feedback.
* Keyboard navigation.
* Spam-protection considerations.

Do not display a fake success message when the form has not actually submitted anything.

If a backend or email service is required but unavailable, document the limitation and implement an honest fallback.

Do not expose API keys in client-side code.

## 8.4 Keyboard testing

Verify:

* Tab navigation.
* Focus visibility.
* Enter and Space activation.
* Escape behavior for dismissible overlays.
* Focus management in modals.
* Focus restoration after closing overlays.

## 8.5 Browser console testing

Check for:

* JavaScript errors.
* Failed network requests.
* Missing assets.
* React warnings, if applicable.
* Animation-library errors.
* Invalid DOM nesting.
* Accessibility-related warnings where detectable.

## 8.6 Automated regression tests

Write appropriate tests for important user journeys.

For example:

* Open the portfolio.
* Navigate to a major section.
* Open and close an interactive element.
* Navigate between routes.
* Verify that images load.
* Confirm that the mobile navigation works.
* Verify that the contact action behaves correctly.

Create:

reports/08-functional-testing.md

Clearly distinguish automated tests from manual checks.

---

# PHASE 9 — RESPONSIVE DESIGN AND CROSS-DEVICE VALIDATION

## Objective

Ensure that the reconstructed design remains faithful and usable at different viewport sizes.

## 9.1 Desktop

Validate:

* Main composition.
* Large typography.
* Container widths.
* Navigation alignment.
* Hover effects.
* Scroll-linked animation.
* Image proportions.

## 9.2 Tablet

Validate:

* Navigation transitions.
* Grid column changes.
* Heading wrapping.
* Image scaling.
* Section spacing.
* Touch interaction.

## 9.3 Mobile

Validate:

* Mobile menu.
* Text wrapping.
* Button sizes.
* Card stacking.
* Image crops.
* Horizontal overflow.
* Touch targets.
* Scroll performance.
* Pinned animation behavior.
* Keyboard and focus behavior.

## 9.4 Responsive animation strategy

If the reference modifies animations on smaller devices, reproduce those changes where practical.

Avoid forcing expensive desktop-only animation behavior onto mobile.

For pointer-dependent effects, use an appropriate input-capability check rather than relying only on viewport width.

If a complex effect cannot be reproduced reliably on mobile, implement a documented, accessible fallback that preserves the essential content and user experience.

## 9.5 Validation matrix

Create a table containing:

* Viewport.
* Browser.
* Page state.
* Test performed.
* Result.
* Issues found.
* Fix status.

Create:

reports/09-responsive-testing.md

---

# PHASE 10 — PERFORMANCE, ACCESSIBILITY, AND SEO

## Objective

Prepare the website for real-world use without sacrificing visual fidelity.

## 10.1 Performance

Investigate:

* Image sizes.
* Font-loading strategy.
* JavaScript bundle size.
* Animation performance.
* Unnecessary dependencies.
* Layout shifts.
* Unused assets.
* Excessive event listeners.
* Expensive scroll handlers.
* Unnecessary rendering.
* Heavy canvas or WebGL effects.

Where appropriate:

* Use responsive image sizes.
* Compress images.
* Prefer modern image formats when suitable.
* Lazy-load below-the-fold images.
* Avoid delaying critical above-the-fold content.
* Split large code bundles when justified.
* Pause unnecessary animations when the page is not visible.
* Avoid unnecessary background work.

Do not remove a core reference feature solely to improve a benchmark without first evaluating alternatives.

## 10.2 Accessibility

Check:

* Semantic HTML.
* Heading hierarchy.
* Keyboard accessibility.
* Focus indicators.
* Image alternative text.
* Color contrast.
* Accessible names.
* Reduced-motion support.
* Form labels.
* Modal behavior.
* Mobile navigation accessibility.

## 10.3 SEO

Implement appropriate metadata:

* Page title.
* Description.
* Canonical URL when the deployment URL is known.
* Open Graph metadata.
* Social sharing image, if available.
* Favicon.
* Robots configuration where appropriate.
* Sitemap where appropriate.

Do not publish incorrect metadata or pretend that a temporary development URL is the final domain.

## 10.4 Performance and quality measurements

Run the available build checks and, where supported, browser-based performance audits.

Record actual measurements.

Do not invent Lighthouse scores, loading times, accessibility scores, or Core Web Vitals.

Create:

reports/10-performance-accessibility-seo.md

---

# PHASE 11 — PERSONALIZATION WITH MY CONTENT

## Objective

Once the reference has been reconstructed, replace its personal information with mine while preserving the reference's visual design.

Do not redesign the website during this phase unless I explicitly request a design change.

## 11.1 Identify personal-content fields

Find all content that should be personalized, including:

* Name.
* Professional title.
* Introduction.
* Biography.
* Projects.
* Project descriptions.
* Skills.
* Experience.
* Education.
* Contact details.
* Social links.
* Resume.
* Profile image.
* Metadata.

## 11.2 Use a centralized content configuration

Where practical, keep personal content separate from layout and animation logic.

For example, create a centralized data module for portfolio content if it fits the chosen framework.

Use real information supplied by me or explicitly approved by me.

Do not invent:

* Employment history.
* Academic qualifications.
* Certifications.
* Project achievements.
* Client testimonials.
* Professional experience.
* Performance statistics.

If information is missing, preserve a clearly identifiable placeholder or ask me for the necessary content.

## 11.3 Preserve visual fidelity

When replacing content:

* Match the original text hierarchy.
* Preserve appropriate spacing.
* Prevent unexpected text overflow.
* Adjust line breaks where necessary.
* Keep cards visually consistent.
* Preserve image proportions.
* Maintain responsive behavior.

Content substitutions may change text length, so repeat the relevant visual comparisons after personalization.

## 11.4 Prepare a content checklist

Create:

reports/11-personalization-checklist.md

List all personal information that still needs to be supplied or verified.

---

# PHASE 12 — FINAL PROJECT CLEANUP AND DOCUMENTATION

## Objective

Deliver a maintainable application that can be run, tested, and deployed.

## 12.1 Code quality

Review:

* Component organization.
* Naming consistency.
* Repeated code.
* Unused imports.
* Unused dependencies.
* Dead code.
* Console statements.
* Error handling.
* Accessibility.
* Responsive styles.
* Animation cleanup.
* Asset references.

Do not perform a massive refactor merely for stylistic reasons.

Preserve working behavior.

## 12.2 Security

Check:

* Exposed credentials.
* Unnecessary environment variables.
* Unsafe DOM injection.
* Unvalidated external input.
* Unnecessary permissions.
* Accidental inclusion of private data.
* Untrusted third-party scripts.

Do not commit secrets.

Do not expose sensitive information in generated reports.

## 12.3 Project documentation

Create or update the project README.

Include:

* Project overview.
* Technology stack.
* Prerequisites.
* Installation steps.
* Development command.
* Build command.
* Test command.
* Asset organization.
* Environment variables, if any.
* Deployment instructions.
* Known limitations.

Include only commands that are correct for the actual project.

## 12.4 Verify the production build

Run the actual production build.

Fix all blocking errors.

Verify that:

* The application builds successfully.
* Routes work under the selected hosting configuration.
* Assets resolve correctly.
* No required local development server is needed at runtime.
* The deployment configuration matches the chosen platform.

Do not claim that deployment succeeded unless the website was actually deployed and verified.

---

# PHASE 13 — FINAL ACCEPTANCE AUDIT

## Objective

Determine whether the implementation meets the project requirements.

Evaluate the result using evidence, not intuition.

## 13.1 Visual fidelity

Check:

* [ ] Initial viewport closely matches the reference.
* [ ] Navigation appearance matches.
* [ ] Main typography is consistent.
* [ ] Section order matches.
* [ ] Major spacing is consistent.
* [ ] Images and crops are appropriate.
* [ ] Backgrounds and colors are consistent.
* [ ] Card geometry is consistent.
* [ ] Important decorative elements are present.
* [ ] Major animation behavior is reproduced.
* [ ] Hover states match.
* [ ] Mobile layouts are verified.

## 13.2 Functional completeness

Check:

* [ ] Internal navigation works.
* [ ] External links are correct.
* [ ] Buttons work.
* [ ] Interactive components work.
* [ ] Mobile menu works, if present.
* [ ] Forms behave honestly and correctly, if present.
* [ ] Keyboard navigation works.
* [ ] Browser history works where applicable.
* [ ] No major console errors remain.

## 13.3 Technical quality

Check:

* [ ] Production build succeeds.
* [ ] No unnecessary dependencies were introduced.
* [ ] Assets load correctly.
* [ ] Responsive layouts have been tested.
* [ ] Reduced-motion support is implemented.
* [ ] Accessibility issues have been reviewed.
* [ ] Performance has been measured where possible.
* [ ] Documentation is complete.
* [ ] Known limitations are recorded.

## 13.4 Final evidence

Create:

reports/FINAL-IMPLEMENTATION-REPORT.md

Include:

1. Summary of the implementation.
2. Final application location.
3. Reference website inspected.
4. Reverse Engineering repository inspected.
5. Technologies used and why.
6. Sections reconstructed.
7. Animations reconstructed.
8. Assets reused or substituted.
9. Screenshots captured.
10. Visual differences still present.
11. Automated tests executed.
12. Manual tests executed.
13. Build status.
14. Performance results, if measured.
15. Accessibility findings.
16. Security findings.
17. Known limitations.
18. Personal information still required.
19. Deployment instructions.
20. Recommended next steps.

Include a checklist of completed, partially completed, and blocked items.

Do not conceal failed tests or unresolved visual discrepancies.

---

# REQUIRED WORKING METHOD

Use this order:

1. Workspace and repository audit.
2. Reference website reconnaissance.
3. Visual and technical specification.
4. Project foundation.
5. Asset collection.
6. Structural implementation.
7. Animation implementation.
8. Visual comparison and refinement.
9. Functional testing.
10. Responsive testing.
11. Performance, accessibility, and SEO.
12. Personalization.
13. Cleanup and documentation.
14. Final acceptance audit.

You may perform independent investigative tasks in parallel when the available tools support it, but respect dependencies between implementation phases.

Do not skip directly to the final UI.

Do not spend time generating elaborate documentation that is disconnected from the actual implementation. Every report should contain findings, evidence, decisions, or results that help the project move forward.

When you discover a blocker, document it and continue with independent tasks.

---

# FINAL EXPECTATION

I expect a working reconstructed website in my own application directory.

I do not want only:

* A design proposal.
* A screenshot.
* A generic portfolio.
* A static HTML mockup.
* A list of suggested technologies.
* A theoretical report.
* A partially implemented hero section.

I want the complete observable website experience reconstructed as closely as the available evidence, permissions, tools, and technical constraints allow.

The implementation must be tested against the reference.

Prioritize accuracy, working interactions, responsive behavior, maintainability, and honest reporting.

BEGIN WITH PHASE 0.

First inspect the workspace and downloaded Reverse Engineering repository. Then report the confirmed capabilities and proceed through the implementation plan.
