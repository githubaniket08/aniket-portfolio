# Aniket Patil Portfolio — Refinements v2

## Overview
- **Summary**: A second round of careful, aesthetic and functional refinements to the existing portfolio website, improving foreground/background separation, typography consistency, experience section accuracy, certificate viewing, navigation, and overall visual cohesion — while preserving all existing content, links, projects, research, and structure.
- **Purpose**: Achieve a more modern, minimal, elegant, premium, visually cohesive feel with a dark brown / espresso aesthetic and refined glass/translucent treatment; replace generic experience text with actual resume data; fix certificate viewer for both images and PDFs; replace Contact nav with Resume download.
- **Target Users**: Recruiters, research collaborators, academic reviewers, and technical visitors evaluating Aniket Patil's portfolio.

## Goals
1. Establish visual separation between the Ferrofluid animated background and foreground content using selective, subtle glass/translucent surfaces (not thick cards everywhere).
2. Improve typography readability and consistency: one coherent hierarchy, no unnecessary italic/slanted supporting elements, and slightly brighter/larger "Computer Science AI Undergraduate".
3. Replace the generic "University & Technical Club Leadership" experience with actual content extracted from `public/resume/Resume_Aniket.pdf`, and split into two clearly separate sections: **Experience** and **Extracurricular Activities**.
4. Modernize profile presentation with a single subtle, sophisticated animation concept (no black-to-color hover).
5. Fix certificate viewer so both image and PDF certificates render visually inside the same custom lightbox UI, with no download/print/save/export controls exposed.
6. Replace the top-right Contact nav item with a Resume download action linked to the actual PDF at `public/resume/Resume_Aniket.pdf`.
7. Reduce "components everywhere" feeling via spacing, typography, separators, restrained surfaces; add restrained micro-interactions; maintain performance, accessibility, and responsive behavior.

## Non-Goals
- Complete redesign; remove/reorder sections; invent content.
- Add neon, purple, rainbow, or bright glassmorphism.
- Replace Ferrofluid with another background.
- Make WarpText appear on body text/small elements.
- Expose certificate download/print UI.
- Change any text content outside the Experience rewrite (which must come directly from the resume).
- Add new external libraries beyond what is already installed (framer-motion, ogl, lucide-react, next, react).

## Background & Context
- Project is a Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript personal portfolio.
- Visual foundation: deep dark brown (#0E0805), bronze accent (#C77A3F), off-white foreground (#F5EFE6); Ferrofluid WebGL background.
- Fonts: Libre Baskerville (display/headings), Archivo (body/sans).
- Existing components: `navbar`, `hero`, `tech-stack`, `projects-grid`, `project-card`, `beyond-the-code`, `certificates`, `certificates-carousel`, `contact`, `footer`, `background-canvas`, `Ferrofluid`, `WarpText`.
- Resume located at `public/resume/Resume_Aniket.pdf` — extracted text is in specifier's notes (Treasurer ARC Stack, Freelance Graphic Designer, NCC Sergeant, etc.).
- Certificates folder contains both PDF and JPG certificates (SGCNSP JPG, rest PDFs).

## Functional Requirements
- **FR-1 Glass Foreground**: Selective foreground content surfaces (project cards, experience cards, certificate cards, tech-stack cards, navbar, footer, modal) use a refined dark translucent surface with subtle backdrop blur, faint borders, and low-opacity dark rgba — background remains visible but content clearly readable.
- **FR-2 Typography Readability**: Hero subtitle "Computer Science (AI) Undergraduate" is slightly larger and brighter (off-white, not harsh white); all typography uses a consistent hierarchy; no italic/slanted styling for supporting elements and subheadings (use weight, size, spacing, opacity instead).
- **FR-3 Experience from Resume**: `beyond-the-code.tsx` is rewritten to show TWO distinct sections: (a) EXPERIENCE listing Treasurer ARC Stack Tech Club / Event Organizer & Freelance Graphic Designer & Video Editor exactly per resume, (b) EXTRACURRICULAR ACTIVITIES listing NCC Sergeant & Contingent Leader exactly per resume. Dates, roles, organizations, descriptions match resume.
- **FR-4 Experience Section Design**: Clean minimal timeline/card/list treatment with subtle glass surfaces, refined borders, elegant hover states; not overly animated.
- **FR-5 Profile Animation**: Profile presentation in Hero uses a single subtle, cohesive premium animation (e.g. gentle continuous floating with layered depth / animated frame / restrained light movement) — no sudden black-to-color shift.
- **FR-6 Certificate Viewer**: Both image and PDF certificates open in the same custom viewer lightbox; PDFs render visually inside the viewer (not as generic browser PDF page); no Download, Print, Save, Export controls in UI.
- **FR-7 Nav Resume Button**: Top navbar right-side "Contact" button is replaced with "Download Resume" which downloads the actual file at `/resume/Resume_Aniket.pdf` using correct download attributes.
- **FR-8 Contact Section Intact**: The contact section in the body remains; the CTA still links to `#contact` / email.
- **FR-9 No Information Changes**: All other content (projects, research, certificate names, descriptions, links, navigation, section structure) is preserved exactly.
- **FR-10 Micro-interactions**: Restrained hover lifts, subtle border brightening, smooth button transitions, profile subtle depth, smooth viewer open/close, natural section transitions.

## Non-Functional Requirements
- **NFR-1 Accessibility**: Text contrast maintained on animated background; focus-visible outlines work; interactive elements are obvious; semantic HTML preserved.
- **NFR-2 Responsive**: Works on Desktop, Tablet, Mobile. No horizontal scroll, overlapping text, clipped animations, broken cards, inaccessible modals.
- **NFR-3 Performance**: Ferrofluid and WarpText remain performant. Offscreen/paused effects respected. No additional requestAnimationFrame loops. Reduced-motion honored.
- **NFR-4 Visual Cohesion**: The final visual language is: dark brown + espresso + subtle bronze/warm accents + translucent dark surfaces + soft blur + off-white typography. No neon purple, bright rainbows, pure white cards, excessive orange/glow.
- **NFR-5 Consistency**: Visually equivalent elements (headings, subheadings, body text, labels, tags, metadata, case-study text) use the same typography (font family, weight, sizing, line-height). No "Claude-style" inconsistency remains.

## Constraints
- **Technical**: Must use installed packages only (next 16, react 19, tailwindcss 4, framer-motion, ogl, lucide-react). No external PDF.js; use iframe with toolbar hidden for PDFs.
- **Business**: Content from resume is authoritative. Do not invent or rephrase experience descriptions into generic AI language. Preserve all existing links, projects, certificates, navigation IDs, and section anchors.
- **Dependencies**: None new.

## Assumptions
- The user-provided PDF certificate rendering requirement can be satisfied with an iframe using `#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=FitH` and context-menu prevention (as currently started), inside the custom modal header that presents a "viewer" look rather than a browser PDF toolbar.
- The `resume` folder in public uses lowercase `resume`, confirmed at `public/resume/Resume_Aniket.pdf`.

## Acceptance Criteria

### AC-1: Ferrofluid Background Remains
- **Type**: `rule`
- **Given**: Portfolio is running
- **When**: Any page of the site is loaded
- **Then**: Ferrofluid WebGL animated brown background is rendered behind all content, unchanged as the primary atmospheric layer
- **Pass Condition**: `components/Ferrofluid.tsx` and `components/background-canvas.tsx` are present and still mounted globally by layout; no alternative background component has replaced it; running `npm run build` succeeds
- **Evidence**: Build output + visual inspection

### AC-2: Foreground/Background Separation via Refined Glass Surfaces
- **Type**: `rubric`
- **Dimension**: Quality of foreground/background visual separation and glass treatment restraint
- **Scale**: 1-5
- **Anchors**: 1 = content still blends completely with Ferrofluid; 3 = some cards added but inconsistent/overdone; 5 = selective subtle dark translucent surfaces with backdrop blur, faint borders, layered depth, background visible but content clearly readable, no excess
- **Pass Threshold**: >= 4
- **Evidence**: Visual review of hero, cards, navbar, footer, modals; CSS variables in globals.css reflect tuned card/border; backdrop-filter applied selectively

### AC-3: Typography Readability Improvements
- **Type**: `rule`
- **Given**: Hero section is rendered
- **When**: Inspecting "Computer Science (AI) Undergraduate" element
- **Then**: Its font size is slightly larger than previous (was text-base/text-lg → now between lg and xl) and text color is brighter off-white (closer to #F5EFE6 than muted), while remaining secondary to name in visual hierarchy
- **Pass Condition**: In `hero.tsx`, the element at the corresponding line has a sizing class ≥ `text-lg sm:text-xl` (or equivalent) and uses text color brighter than `text-muted-foreground` (e.g. `text-foreground/90` or custom off-white)
- **Evidence**: Code inspection + build

### AC-4: Consistent Typography System
- **Type**: `rubric`
- **Dimension**: Typography consistency across all sections
- **Scale**: 1-5
- **Anchors**: 1 = different fonts/weights appear arbitrarily; 3 = mostly consistent but lingering mixed styles; 5 = one coherent hierarchy (Libre Baskerville for primary/secondary headings, Archivo for body, no italic for supporting text/subheadings, consistent sizing/line-height/weight rules across equivalent elements)
- **Pass Threshold**: >= 4
- **Evidence**: Code inspection of globals.css utility classes and usage across hero, tech-stack, projects, beyond-the-code, certificates, contact, navbar

### AC-5: No Unnecessary Italic On Supporting Elements
- **Type**: `rule`
- **Given**: Site is fully rendered
- **When**: Scanning supporting subheadings, eyebrow labels, section descriptions, metadata, tags, buttons
- **Then**: No element uses italic purely to create hierarchy; italic is either removed or replaced with weight/size/spacing/opacity
- **Pass Condition**: `.font-eyebrow` class in globals.css either has `font-style: normal` (and italic is not present elsewhere on supporting elements), OR the class is completely removed/replaced with non-italic alternatives across all components
- **Evidence**: Code grep for `font-style: italic` and `italic` classes; inspection of each component

### AC-6: Experience Rewritten From Actual Resume
- **Type**: `rule`
- **Given**: The "Experience" / "Beyond the Code" section is rendered
- **When**: Reading the two sub-sections (Experience and Extracurricular)
- **Then**: The Experience sub-section lists exactly (1) Treasurer, ARC Stack Tech Club | Event Organizer & Coordinator, HR & Literary Club — 2023-Present — and (2) Freelance Graphic Designer & Video Editor — 2018-Present — with descriptions matching resume; the Extracurricular sub-section lists exactly NCC Sergeant & Contingent Leader – Belagavi Division — 2019-2021 — with descriptions matching resume
- **Pass Condition**: `beyond-the-code.tsx` content contains these exact entries with exact role/title/organization/date/description terminology from the resume (no fabricated achievements)
- **Evidence**: Code diff + resume text cross-reference

### AC-7: Experience and Extracurricular Visually Separate
- **Type**: `rule`
- **Given**: The Beyond section is rendered
- **When**: Inspecting the layout
- **Then**: Two clearly-labeled distinct visual blocks exist: "EXPERIENCE" and "EXTRACURRICULAR ACTIVITIES" — each with its own heading, and visually separated by spacing, a separator, or distinct container
- **Pass Condition**: Component renders two titled sections with distinct labels; not one generic merged list
- **Evidence**: Code + rendered HTML

### AC-8: Profile Has Subtle Sophisticated Animation (No Color Shift)
- **Type**: `rubric`
- **Dimension**: Profile animation quality and restraint
- **Scale**: 1-5
- **Anchors**: 1 = static or jarring color change; 3 = animated but distracting/combined many effects; 5 = single cohesive subtle concept (gentle floating, parallax depth, animated frame, restrained glow, elegant border motion) — image never suddenly becomes colorful, smooth and sophisticated
- **Pass Threshold**: >= 4
- **Evidence**: Code inspection of hero profile block + visual verification

### AC-9: Certificate Viewer — Both Image and PDF
- **Type**: `rule`
- **Given**: A certificate card is clicked
- **When**: The viewer opens for either a PDF or an image certificate
- **Then**: (a) image certificates display via `<Image>` as before; (b) PDF certificates render visually inside the custom viewer (iframe inside custom header/footer, toolbar hidden) — BOTH use the same lightbox container; (c) no Download/Print/Save/Export button is visible anywhere in the UI; (d) the modal does not look like a raw browser PDF page
- **Pass Condition**: `certificates-carousel.tsx` renders both types inside the custom modal; the modal header contains only title/issuer/type + close button; there are zero UI controls for saving
- **Evidence**: Code inspection + manual open of SGCNSP (JPG) and a PDF cert

### AC-10: Nav Contact Replaced By Resume Download
- **Type**: `rule`
- **Given**: Navbar is rendered on desktop
- **When**: Inspecting the right-side nav area
- **Then**: The "Contact" pill is replaced with "Download Resume" (or "Download My Resume"); clicking it triggers a download of `/resume/Resume_Aniket.pdf` rather than navigating to a contact section
- **Pass Condition**: `navbar.tsx` right CTA uses `<a>` with `href="/resume/Resume_Aniket.pdf"` and `download` attribute (and optionally opens in new tab); the button label text is "Download Resume" or "Download My Resume"; nav-items list no longer has Contact in the pill row if it was the far-right duplicate
- **Evidence**: Code + click-test in browser

### AC-11: Resume Download Works
- **Type**: `rule`
- **Given**: The site is running in a browser
- **When**: User clicks the Download Resume nav button
- **Then**: The file `public/resume/Resume_Aniket.pdf` is downloaded by the browser (not merely opened in a viewer tab) — the `<a download>` attribute is present with correct path
- **Pass Condition**: `navbar.tsx` contains an anchor with correct path and `download` attribute; file exists at `public/resume/Resume_Aniket.pdf` (case-insensitive folder name verified)
- **Evidence**: File existence check + code inspection

### AC-12: Cohesive Modern Interface (Not Components-Everywhere)
- **Type**: `rubric`
- **Dimension**: Overall design cohesiveness and reduction of "component list" feel
- **Scale**: 1-5
- **Anchors**: 1 = every element is a separate thick card, layout disjoint; 3 = some improvements but still heavy; 5 = visual rhythm via whitespace, typography, subtle separators, restrained surfaces; cards only where they improve hierarchy; sections transition naturally; aligned and spaced consistently
- **Pass Threshold**: >= 4
- **Evidence**: Visual review of all sections side by side + code changes to spacing, borders, and separators

### AC-13: Accessibility and Responsive Behavior
- **Type**: `rule`
- **Given**: Site is tested at 360px (mobile), 768px (tablet), 1280px (desktop) widths
- **When**: Navigating the whole page, opening certificate viewer, interacting with profile, navbar, resume button, experience cards
- **Then**: No horizontal scrolling; no overlapping/clipped text; animations play without clipping; viewer is scrollable/accessible; navbar usable; resume button visible/tappable
- **Pass Condition**: `npm run build` succeeds; manual responsive test across widths with no broken layout
- **Evidence**: Build output + responsive screenshots/tests

### AC-14: Performance and Reduced Motion
- **Type**: `rule`
- **Given**: Site is loaded
- **When**: Scrolling with reduced-motion on, and hiding the tab
- **Then**: Ferrofluid and WarpText existing pause/resume logic still works; no new heavy rAF loops added; animations respect prefers-reduced-motion
- **Pass Condition**: No new `requestAnimationFrame` calls introduced in the diff; existing motion media queries unchanged
- **Evidence**: Code diff grep for new rAF + inspection

### AC-15: No Information Changed Outside Scope
- **Type**: `rule`
- **Given**: Full site rendered
- **When**: Comparing projects, research, certificate metadata, names/links, stack items, contact info, footer
- **Then**: Nothing changed from existing content except the explicitly permitted Experience rewrite and cosmetic style/tuning changes
- **Pass Condition**: Diff review shows no accidental edits to project titles/descriptions, certificates, tech stack items, contact emails, links, nav item labels (except Contact → Resume as specified)
- **Evidence**: Code diff review

## Open Questions
- None. All design directions and content sources are specified by the user.
