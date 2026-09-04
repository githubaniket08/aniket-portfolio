# Aniket Patil Portfolio — Refinements v2 Implementation Plan

## Task 1: Global Design System — Typography Consistency & Glass Surface Tuning
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Update `app/globals.css`:
    - Refine `--card-bg`, `--border`, `--muted`, `--foreground` variables for improved separation: darker/lower-opacity card surface with stronger border, slightly muted but readable body text.
    - Add new surface utility classes (e.g. `.surface-glass`, `.surface-elevated`) to consistently apply backdrop-blur, rgba backgrounds, and borders across components.
    - **Remove italic from supporting elements**: change `.font-eyebrow` to `font-style: normal` and use weight/letter-spacing for hierarchy; ensure no other utility applies italic to subheadings/eyebrows/labels/tags.
    - Introduce or refine explicit typography hierarchy classes so equivalent elements use identical classes:
      - `.h-display` — Libre Baskerville 700 for large headings
      - `.h-section` — Libre Baskerville 700 for section headings (Technologies & Tools, Featured Research & Projects, Certifications, etc.)
      - `.text-subheading` — Archivo regular/medium for section descriptions
      - `.text-body` — Archivo for paragraphs
      - `.text-label` — Archivo small uppercase for micro-labels
    - Add a reusable `.section-container` / `.card-surface` pattern to reduce repeated inline classes.
- **Acceptance Criteria Addressed**: AC-2, AC-4, AC-5, AC-12, NFR-4
- **Test Requirements**:
  - `rule` TR-1.1: Grep `globals.css` and all components for `font-style: italic` and `italic` utility — they appear ONLY if not used on supporting/subheading elements (i.e. no `.font-eyebrow` italic, no eyebrow labels italic); `.font-eyebrow` definition is either normal-style or removed/replaced.
  - `rubric` TR-1.2: Glass surface tuning quality; scale 1-5; anchors 1 = no change / too thin or too thick; 3 = workable but inconsistent; 5 = variables tuned so project/experience/cert/tech cards have a refined layered feel with clear readability; threshold >= 4; evidence: globals.css diff + sample rendered components.
- **Notes**: This task is a prerequisite for all component-level changes. Do NOT make component-level typography changes here yet — only establish the system.

## Task 2: Navbar — Replace Contact CTA With Resume Download
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1 (for consistent button styling)
- **Description**:
  - In `components/navbar.tsx`:
    - Remove the far-right "Contact" pill/button.
    - Replace with a "Download Resume" pill/button that links directly to `/resume/Resume_Aniket.pdf` with correct HTML download semantics: `<a href="/resume/Resume_Aniket.pdf" download="Resume_Aniket.pdf" ...>`. (Verify correct case: folder is `resume` lowercase, file is `Resume_Aniket.pdf`.)
    - Keep GitHub icon if still appropriate next to the new button.
    - Update navItems list so the main center pills no longer contain a duplicate "Contact" if the same link was duplicated (currently navItems has both center pills and far-right Contact CTA — leave Contact in center pills so visitors can still jump to `#contact` section; the far-right CTA is the one replaced by Resume Download per requirement).
- **Acceptance Criteria Addressed**: AC-10, AC-11
- **Test Requirements**:
  - `rule` TR-2.1: `navbar.tsx` contains an anchor with `href="/resume/Resume_Aniket.pdf"` and `download` attribute; the far-right desktop CTA text is "Download Resume" (or "Download My Resume"); the old "Contact" pill on the far right is gone.
  - `rule` TR-2.2: File at `public/resume/Resume_Aniket.pdf` exists and matches the `href` path casing.
- **Notes**: Requirement says "top-right Contact" → replace; center nav Contact-to-section anchor can remain per user instruction: "navigation" preserved (the user wants `#contact` nav intact, only top-right ACTION changed to a resume download).

## Task 3: Hero Section — Typography Improvements & Profile Animation Refinement
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - In `components/hero.tsx`:
    - Make "Computer Science (AI) Undergraduate @ KLE Technological University" slightly larger (e.g., `text-lg sm:text-[1.1875rem]`) and brighter (use `text-foreground/92` or a warm off-white — NOT full pure white). Keep Archivo body font. Make it visually prominent but secondary to the name.
    - Remove any italic/slanted eyebrow treatments ("Systems thinker / computational builder") — use a non-italic Libre Baskerville or Archivo with weight/spacing/opacity.
    - Refine the "For interesting work & research" text in the availability badge to match typography system.
    - Rework profile presentation: Pick ONE subtle cohesive animation concept. Remove any "sudden color shift" effects (already removed from previous iteration but verify). Recommended concept: Keep current `float-slow` + breathing glow, BUT make it more cohesive by adding a single animated warm light-wash that moves diagonally across the frame, or by refining the animated dashed corner trace into a subtle continuous perimeter light. Remove the dash-corner SVG hover trace if it feels disjointed; replace with a simpler always-on but gently pulsing inner frame border using a gradient mask, OR keep the offset geometric frame and make it drift very slowly continuously rather than hover-only. Do NOT combine all: choose one. Keep image hover to subtle scale (<1.03) + elevation only.
    - Apply refined `.card-surface` / glass treatment to the photo wrapper, availability badge, and any surface containers.
- **Acceptance Criteria Addressed**: AC-3, AC-5, AC-8, AC-2, AC-4
- **Test Requirements**:
  - `rule` TR-3.1: Hero subtitle sizing >= text-lg on base, >= 1.1875rem on sm; color is a brighter off-white (NOT `text-muted-foreground`).
  - `rule` TR-3.2: No hover causes the profile image to apply a color/desaturation filter that transitions from B&W to color or similar; the image is always natural.
  - `rubric` TR-3.3: Profile animation concept subtlety and cohesion; scale 1-5; anchors 1 = static or jarring; 3 = animated but busy; 5 = single cohesive smooth concept, sophisticated; threshold >= 4.
- **Notes**: No WarpText on subtitle or eyebrow.

## Task 4: Beyond-The-Code — Complete Rewrite Using Resume, Split Into Experience + Extracurricular
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Rewrite `components/beyond-the-code.tsx` from scratch using only the resume content.
  - Section heading remains a heading-style display. Replace "Beyond The Code (Experience)" with a clean layout: the left column introduces BOTH sub-sections; OR the top has a single heading (e.g., "Experience & Leadership") then two sub-sections.
  - **Sub-section 1: EXPERIENCE** (professional/leadership roles):
    - Entry A: *Treasurer, ARC Stack Tech Club | Event Organizer & Coordinator, HR & Literary Club* — *2023 – Present* — "Managed financing and fund allocation of Rs. 3,00,000 across department clusters as Treasurer; led technical event planning and community engagement initiatives. Organized HR and Esports college events reaching 150+ students; contributed to literary activities and student engagement initiatives."
    - Entry B: *Freelance Graphic Designer & Video Editor* — *2018 – Present* — "Delivered branding, promotional, and digital content projects; built client coordination and visual storytelling skills."
  - **Sub-section 2: EXTRACURRICULAR ACTIVITIES**:
    - Entry C: *NCC Sergeant & Contingent Leader – Belagavi Division* — *2019 – 2021* — "Represented Karnataka & Goa Directorate; attended All India Thal Sainik Camp (TSC), New Delhi — Top 10 All India Rank, 0.22 Cal Rifle Shooting (National Level). Participated in IDSSC; qualified for AIGVMSC national-level selection stages."
  - Do NOT invent dates, roles, bullets, or achievements beyond the resume text.
  - Design: Use a clean minimal timeline/card/list. Subtle glass cards using the new `.surface-glass` utilities. Each entry: role/organization (heading font, bold), dates (Archivo label/metadata), description (Archivo body). Left-aligned. Maybe a small accent vertical bar or dot. Gentle hover: lift + border brighten. NOT overly animated.
  - Two sub-sections visually separated: spacing + a thin separator rule + distinct subheadings "EXPERIENCE" and "EXTRACURRICULAR ACTIVITIES" in uppercase micro-labels or small bold.
- **Acceptance Criteria Addressed**: AC-6, AC-7, AC-4, AC-5, AC-9 (FR-4 design)
- **Test Requirements**:
  - `rule` TR-4.1: Component contains exactly the three entries above with exact terminology; no additional entries; descriptions exactly mirror resume wording.
  - `rule` TR-4.2: Two clearly separated sub-sections with distinct labels ("Experience" + "Extracurricular Activities") rendered in the DOM with separate headings/containers.
  - `rubric` TR-4.3: Design quality of the section; scale 1-5; anchors 1 = generic list; 3 = cards but busy; 5 = clean minimal timeline/card/list with subtle glass + refined borders, content remains focus; threshold >= 4.

## Task 5: Certificates Viewer — PDF Rendering Visual Treatment + No Download UI Audit
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Review `components/certificates-carousel.tsx` and `components/certificates.tsx`.
  - Current viewer already hides toolbar via iframe parameters and uses a custom header. Confirm it still works correctly. If the current PDF iframe looks too much like a generic browser white PDF inside a box, tune the viewer by:
    - Ensuring the modal backdrop + header frame the PDF as a "certificate document viewer" — add a subtle frame/inner border around the PDF iframe, a warm inner shadow, or a thin caption bar reading "Credential Preview" or similar (NO action buttons).
    - Ensure iframe has `#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=FitH`.
    - The `certificates.tsx` server component reads files correctly (both .pdf and .jpg detected).
    - No Download, Print, Save, Export buttons anywhere in the UI.
  - Apply refined glass treatment to certificate carousel cards using the new global surface classes.
  - Remove any italic eyebrow usages inside certificate cards (issuer, metadata labels).
- **Acceptance Criteria Addressed**: AC-9, AC-2, AC-4, AC-5
- **Test Requirements**:
  - `rule` TR-5.1: Lightbox contains no visible button or icon labeled Download / Print / Save / Export (case-insensitive); grep returns zero results in certificates-carousel.
  - `rule` TR-5.2: Both PDF and image certs open in the same modal container; PDF iframe src includes the toolbar-hide fragment params.
  - `rubric` TR-5.3: PDF visual presentation quality (does it look like a document inside the portfolio, not a browser PDF?); scale 1-5; anchors 1 = raw white iframe; 3 = acceptable but bland; 5 = framed, styled, feels like a custom document viewer; threshold >= 4.

## Task 6: Cards Across Site — Glass Tuning, Typography Consistency, And Reduce "Components Everywhere"
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - `components/tech-stack.tsx`: Apply new `.surface-glass` classes to category cards; remove any italic subheadings; ensure consistent heading/body fonts; tune hover state to subtle border-brighten + slight lift only.
  - `components/projects-grid.tsx` + `components/project-card.tsx`: Apply refined card surface classes; remove italic on case-study eyebrow + description subtext; tune card header/tags/description typography to use the global classes consistently. Do NOT add cards around every tag — tags exist as chips only. Ensure card composition has breathing room.
  - `components/contact.tsx`: Remove italic eyebrow; use section-level typography classes; review whether every social button needs a heavy card backdrop — keep them restrained (light glass, subtle border, clean). The contact heading, email row, location row should breathe via spacing/alignment/separators, not thick cards.
  - `components/footer.tsx`: Use refined surface class for the footer backdrop. Remove any italic usage.
  - `components/navbar.tsx`: Use refined surface class (already has some; align with globals).
  - General: Where possible, remove duplicated inline `bg-[var(--card-bg)] border border-border backdrop-blur-md` and replace with a single reusable class; however, do NOT introduce new utilities that require a Tailwind plugin. Use plain CSS classes in globals.css.
- **Acceptance Criteria Addressed**: AC-2, AC-4, AC-5, AC-12, NFR-4
- **Test Requirements**:
  - `rule` TR-6.1: No `italic` or `font-eyebrow` with italic remain on supporting elements in tech-stack, project-card, certificates, contact, footer.
  - `rubric` TR-6.2: Overall reduction of "component-list" feel; scale 1-5; anchors 1 = unchanged, everything still boxed; 3 = some improvements; 5 = whitespace/typography/separators create rhythm, cards used selectively; threshold >= 4.

## Task 7: Build, Lint, Responsive And Performance Verification
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Tasks 1-6
- **Description**:
  - Run `npm run build`; fix any TypeScript errors, unused imports, or build issues.
  - Run `GetDiagnostics` for any IDE type/lint issues.
  - Start the dev server and visually verify responsiveness at mobile/tablet/desktop widths for key elements: navbar, hero name/subtitle/profile, experience cards, extracurricular section, project cards, certificate viewer, resume button.
  - Verify no new requestAnimationFrame loops were added beyond what existed (check diff).
  - Verify prefers-reduced-motion handling is intact.
- **Acceptance Criteria Addressed**: AC-1, AC-13, AC-14, AC-15
- **Test Requirements**:
  - `rule` TR-7.1: `npm run build` exits 0.
  - `rule` TR-7.2: GetDiagnostics returns no type/lint errors.
  - `rule` TR-7.3: No new `requestAnimationFrame` usages in diff (excluding pre-existing Ferrofluid/WarpText).
  - `rubric` TR-7.4: Visual responsiveness and overall polish; scale 1-5; anchors 1 = visible breakages; 3 = acceptable; 5 = excellent across all widths, no overlap, smooth animations; threshold >= 4.

## Task 8: Final Content Integrity Review
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Tasks 4, 6, 7
- **Description**:
  - Final diff review confirming:
    - Project titles, descriptions, tags, GitHub URLs unchanged.
    - Tech stack categories and items unchanged.
    - Contact email, socials, location unchanged.
    - Certificate filenames and issuers unchanged.
    - Nav center section links unchanged (Stack, Projects, Experience, Certificates, Contact — all IDs still match).
    - Only changes to content are the Beyond-the-code rewrite using resume text.
- **Acceptance Criteria Addressed**: AC-15
- **Test Requirements**:
  - `rule` TR-8.1: Manual diff of all non-experience content confirms zero content changes outside styling and experience rewrite.
