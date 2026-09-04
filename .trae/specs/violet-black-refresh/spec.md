# Aniket Patil Portfolio — Violet/Black Refresh PRD

## Overview
- **Summary**: Complete visual refresh of the existing Aniket Patil portfolio from warm brown/amber "ink & ember" aesthetic to a deep violet + black editorial developer portfolio. Changes cover palette, background shader (Ferrofluid → MoltenMetal), hero portrait treatment, typography hierarchy, button/nav styling, layout asymmetry, metadata updates, and removal of PDF labels.
- **Purpose**: Deliver a minimal, elegant, premium, moody developer portfolio — not a generic template. Strong editorial serif/sans contrast, asymmetric whitespace, restrained atmospheric shader, cohesive violet/black visual system.
- **Target Users**: Recruiters, research collaborators, clients, peers reviewing portfolio and credentials.

## Goals
- Replace every warm brown, amber, bronze, marble reference with deep violet + near-black.
- Install MoltenMetal shader as the primary atmospheric background.
- Simplify hero: remove hard frame around portrait, integrate photo as duotone silhouette.
- Establish strong typographic hierarchy (large serif display / small uppercase sans labels).
- Confident editorial spacing — asymmetric whitespace, not evenly-spaced components.
- Replace generic pill buttons with thin-stroke, less-rounded interactions.
- Header promotes LinkedIn + Resume; GitHub de-emphasized to contact/social section.
- Contact section breaks symmetry, uses single email CTA, "Let's Build Something." as major editorial moment.
- Social icons consistent custom SVG family, correct Instagram icon, subtle staggered scroll-in.
- Footer visually separated from contact.
- Remove all visible "PDF" labeling from certificates UI.
- Custom AP favicon + HTML title exactly "Aniket Patil - Portfolio".
- Motion philosophy: restrained, subtle, intentional; no excessive bounce/scale/glow.

## Non-Goals
- **Do not invent content**: projects, research, descriptions, certificates, experience, resume path — all preserved.
- **Do not add new sections** or remove existing section IDs (hero, tech, projects, beyond, certificates, contact).
- **Do not add decorative UI** to compensate for the new palette; prefer less UI overall.
- **Do not add excessive animation**. WarpText remains on name and hero strap only; no new WebGL effects beyond MoltenMetal shader.
- **Do not break responsiveness**: mobile, tablet, desktop must remain usable.
- **Do not break certificate viewer behavior**: image + PDF viewing continues to function (PDF iframe stays; only visible label text is removed).
- **Do not change file paths** for certificates, resume, projects, profile photo.

## Background & Context
- Site previously used brown Ferrofluid background with variables `--accent: #C77A3F`, `--accent-soft: #E8B481`, `--background: #0E0805`, plus surface-glass at rgba(24,16,9,0.62).
- Header right-aligned GitHub icon + "Download Resume" filled pill; need to swap GitHub→LinkedIn and restyle buttons to thin stroke.
- Existing `icons.tsx` already contains Github, Linkedin, Instagram — all in the same SVG stroke-width-2, round caps style. Instagram is already correct (outline with rounded square + lens dot). Good, no need to change icon family.
- Profile image at `/profile-picture/Large.JPG` (portrait 3:4); window/blinds background visible; need to mask/duotone to blend.
- MoltenMetal component does **not** currently exist as a source file in `/components` (only Ferrofluid.tsx). Must be authored/created as a React Bits-style shader.
- Certificates UI currently shows file-type labels "PDF"/"IMAGE" in three places (corner badge on card thumbnail, lightbox header metadata, and inside the PDF icon thumbnail card). All visible labels must be removed; functionality unchanged.
- Current layout `<html>` bg fixed at `bg-[#0E0805]`; metadata title `"Aniket Patil — CS (AI) Student & Developer"`.
- Contact section currently has 6-col/6-col symmetric mail/location grid and two email CTAs (clickable email address + "Send an email directly" filled pill).

## Functional Requirements

**FR-1 Palette & Background**
- Deep violet/black CSS variable system replaces brown system. Base background near-black (e.g. #070410 or #09050F). Accent violet (e.g. #8B5CF6, #A78BFA) and violet-soft for subtle highlights. Border, surface, text variables tuned accordingly.
- `Ferrofluid` removed from site background; `MoltenMetal` shader added.
- MoltenMetal shader parameters tuned for subtlety: dark/violet, low opacity, slow movement, low shimmer/contrast — atmospheric not flashy.
- HTML root background color changes to violet-tinted near-black.

**FR-2 Hero Portrait**
- Hard rectangular frame/card removed from profile portrait.
- Image treated with violet/black duotone (CSS filter: grayscale + sepia + hue-rotate + saturate + contrast or a gradient map overlay blend mode).
- Silhouette/cutout treatment achieved via mask or alpha-blend so original window/blinds background is suppressed.
- Subtle violet rim light via inset/gradient CSS box-shadow or SVG filter.
- Gentle cursor-proximity translation; no harsh color transitions, no sudden glow.

**FR-3 Hero Typography & Spacing**
- More whitespace above name (increase hero top padding or add offset above availability badge).
- Related elements clustered close (availability badge + "For interesting work and research" near each other).
- Large serif display for name + "I BUILD SYSTEMS..." strap preserved via WarpText with new violet-tinted color values.
- Labels (AVAILABLE, SYSTEMS THINKER / COMPUTATIONAL BUILDER) remain small, uppercase, generous letterspacing, sans family.
- Descriptor "Computer Science AI Undergraduate" reduced in visual weight vs name.

**FR-4 Buttons & Navigation Visual Language**
- Thin stroke / ghost outline treatment replaces heavy filled pills.
- Radius reduced from full `rounded-full` to something moderate (e.g. `rounded-lg` or `rounded-xl`).
- Subtle arrow/underline hover interaction; restrained animation.
- Nav container uses the stroke/glow vocabulary consistently.

**FR-5 Header Links**
- Right-side Github icon replaced with Linkedin icon; links to `https://www.linkedin.com/in/aniket0804/`.
- Resume button styling updated to new button system (thin stroke, low radius); download behavior preserved.
- Center nav Contact pill preserved (links to #contact); GitHub visible only in contact/social row and footer.

**FR-6 Contact Section**
- 6-col / 6-col perfect symmetry broken. Mail panel given more columns/prominence than location.
- "Send an email directly" filled button removed; one clear ghost/outline primary email CTA remains.
- "Let's Build Something." headline substantially increased in size and reduced line-height; feels editorial not component.

**FR-7 Social Links**
- Github, Linkedin, Instagram icons all from existing `icons.tsx` SVG stroke family.
- Staggered fade + up scroll-in animation (~100-150ms per item).
- Constrained: no scale transforms beyond 1.05; no glowing; ~0.5s ease-out.

**FR-8 Footer**
- Thicker/clearly visible top border divider.
- Larger top padding.
- Smaller/muted footer typography.

**FR-9 Certificates PDF Label Removal**
- All visible UI text strings "PDF" and "IMAGE" removed from certificate cards and viewer.
- File-type badges (corner badge on thumbnail tile, inside PDF placeholder tile, lightbox header metadata type) stripped of file-type wording.
- Type detection logic preserved internally (still routes image vs PDF to correct viewer).

**FR-10 Favicon & Metadata**
- Custom AP/Aniket-identity favicon.ico (or equivalent) placed in public/ or declared via app route icon.
- Browser `<title>` in `<head>` and OpenGraph/Twitter title all set exactly to `Aniket Patil - Portfolio`.

## Non-Functional Requirements
**NFR-1 Responsiveness.** Breakpoints 640px/768px/1024px behave correctly. No horizontal scroll; hero portrait sizes appropriately; editorial headline wraps.
**NFR-2 Performance.** Only one WebGL shader background active (MoltenMetal); no extra rAF loops. Reduced-motion media query respected. Page LCP remains reasonable; no layout shift.
**NFR-3 Accessibility.** Focus-visible preserved; sufficient contrast (text on near-black/violet surfaces); semantic section IDs unchanged; keyboard nav on certificate lightbox and links preserved; a11y labels on icon buttons maintained.
**NFR-4 Build.** Production build exits 0; no TS diagnostics.
**NFR-5 Motion restraint.** All interactions: duration < 400ms cubic-bezier(0.22,1,0.36,1); no bounce; maximum scale hover 1.02; no continuous float on most elements (only shader internally moves); profile has no looping float animation.

## Constraints
- **Technical**: Next.js 16 / App Router / Turbopack build, Tailwind v4, framer-motion, OGL shaders, WarpText on hero headlines; no new heavy libraries.
- **Content**: No inventing; experience/certificates/projects paths preserved.
- **Dependencies**: MoltenMetal must be self-contained within /components using OGL (Ferrofluid pattern) — no external fetch of shader URL.

## Assumptions
- Resume still at `/resume/Resume_Aniket.pdf` (directory name `resume` confirmed lowercase in public folder).
- Profile photo at `/profile-picture/Large.JPG` unchanged.
- Lucide imports used elsewhere (`lucide-react` icons in project-card, hero, beyond-the-code, certificates-carousel, contact) are separate from the 3 social icons in `icons.tsx` and remain in-use; only the three social link icons need family consistency (Github/Linkedin/Instagram already match).

## Open Questions
- (none; shader authored inline per React Bits MoltenMetal pattern)

---

## Acceptance Criteria

### AC-1: Warm brown/amber palette completely removed
- **Type**: `rule`
- **Given**: Full codebase
- **When**: Grep for `#0E0805`, `#C77A3F`, `#E8B481`, `#8A4A22`, `rgba(199,122,63`, `rgba(232,180,129` across app/ and components/
- **Then**: Zero matches remain in component props, Tailwind classes, or CSS variables. (Comments are exempt.)
- **Pass Condition**: 0 results; variables `--background/--foreground/--muted/--accent/--accent-soft/--border/--surface-glass` all use violet/black hues.
- **Evidence**: `rg -n '#0E0805|#C77A3F|#E8B481|#8A4A22|rgba\(199,122,63|rgba\(232,180,129' components/ app/globals.css app/layout.tsx app/page.tsx`

### AC-2: MoltenMetal shader is the background; Ferrofluid removed
- **Type**: `rule`
- **Given**: Components/ and layout.tsx
- **When**: Inspect background-canvas.tsx imports and RootLayout body
- **Then**: background-canvas imports MoltenMetal, not Ferrofluid. No `<Ferrofluid />` JSX tag anywhere. MoltenMetal shader props use violet/black colors.
- **Pass Condition**: `grep -n Ferrofluid components/background-canvas.tsx → 0 lines` AND `grep -c MoltenMetal components/background-canvas.tsx ≥ 2` AND `MoltenMetal.tsx` file present in /components.
- **Evidence**: File existence + grep output.

### AC-3: Deep violet/black palette consistently applied
- **Type**: `rubric`
- **Dimension**: Palette cohesion (violet/black system)
- **Scale**: 1–5
- **Anchors**: 1 = brown/amber still visible in multiple places; 3 = variables updated but some inline classes remain old; 5 = every section (hero navbar pill card badges buttons links) uses new violet-accent/soft/muted/border/foreground consistently; no brown leaks.
- **Pass Threshold**: ≥ 4
- **Evidence**: Visual diff of globals.css variables + component-level color class audit.

### AC-4: Photo frame/border removed; portrait duotone + rim light integrated
- **Type**: `rule`
- **Given**: hero.tsx profile markup
- **When**: Search for `aspect-[3/4] w-full overflow-hidden p-2 shadow-2xl surface-glass` (old frame pattern), `surface-glass` inside profile div, or SVG corner marks (`border-t-2 border-l-2 border-accent-soft`)
- **Then**: No surface-glass card wraps the image; no corner SVG marks; no hard `border`/`rounded-2xl` frame applied directly to portrait container. Image instead has CSS duotone (filter: grayscale + hue-rotate + saturate + contrast OR mix-blend-mode + violet overlay) and a violet rim-light (e.g., `box-shadow` inset or `::after` layered gradient). `<Image>` retain original fill/sizes but not inside a card frame.
- **Pass Condition**: Zero `surface-glass` / `surface-elevated` classes on portrait wrapper; duotone filter present; a rim-light present.
- **Evidence**: Relevant lines of hero.tsx in the profile block.

### AC-5: Serif/sans contrast strong; labels small uppercase spaced
- **Type**: `rule`
- **Given**: hero.tsx typography
- **When**: Inspect AVAILABLE badge and SYSTEMS THINKER eyebrow
- **Then**: Both use uppercase, small (~10–12px), generous tracking (≥ 0.18em), sans family, not serif, not italic. Name is Libre Baskerville, ≥ clamp(3.25rem, 9vw, 7.25rem).
- **Pass Condition**: AVAILABLE and eyebrow class font-size ≤ 12px, tracking ≥ 0.18em, uppercase.
- **Evidence**: class names + globals.css font-label/font-eyebrow definitions.

### AC-6: Hero editorial spacing (asymmetric, not evenly spaced)
- **Type**: `rubric`
- **Dimension**: Whitespace confidence & editorial asymmetry
- **Scale**: 1–5
- **Anchors**: 1 = everything has same pt-/pb-/gap- values; 3 = some clustering still generic; 5 = visibly larger breathing room above the name, badge and adjacent descriptor are tight together, section transitions have deliberate gaps, not template rhythm.
- **Pass Threshold**: ≥ 4
- **Evidence**: hero.tsx section padding values; gap values between badge/name/subtitle clusters.

### AC-7: Generic pill buttons redesigned (thin stroke, low radius, subtle interaction)
- **Type**: `rule`
- **Given**: hero.tsx CTA pair; navbar.tsx Download Resume; contact.tsx email CTA; project-card CTA
- **When**: Scan each CTA/button class list
- **Then**: No `rounded-full` on primary/secondary CTAs or Resume button (radius `rounded-lg`/`rounded-xl` acceptable). Download Resume button in navbar uses `border-1` stroke + transparent/ghost base (not `bg-[#F5EFE6] text-[#110A06]` filled). Hero primary CTA may keep a filled tone but should not be a bright white capsule; prefers dark/violet ghost. Project-card pill matches same radius family.
- **Pass Condition**: `rounded-full` does not appear on any CTA `<a>` button; navbar resume button is not a filled pill.
- **Evidence**: grep for `rounded-full` on anchor elements / CTA class.

### AC-8: Header right — LinkedIn replaces GitHub
- **Type**: `rule`
- **Given**: navbar.tsx header right group (items ~line 106–123)
- **When**: Examine right column contents
- **Then**: First visible icon is `<Linkedin>` from icons.tsx linking to `https://www.linkedin.com/in/aniket0804/`. No `<Github>` icon in the header right group. Resume button remains. Download attribute and `/resume/Resume_Aniket.pdf` href unchanged.
- **Pass Condition**: `<Github>` absent from right column; `<Linkedin>` present with correct href.
- **Evidence**: navbar.tsx right column lines.

### AC-9: Contact asymmetric layout; single email CTA
- **Type**: `rule`
- **Given**: contact.tsx
- **When**: Inspect editorial rows/columns grid and CTA buttons
- **Then**: Grid no longer uses exact 6/6 split (e.g. mail 8 cols / location 4 cols). Only one email CTA element rendered: either the ghost button or the inline email link — not both equally prominent. Remove the large filled "Send an email directly" pill; keep one minimal CTA.
- **Pass Condition**: `md:col-span-6 md:col-span-6` symmetry replaced; the phrase "Send an email directly" and its associated filled pill class `bg-[#F5EFE6] text-[#110A06]` removed from JSX.
- **Evidence**: contact.tsx grid col-span values and CTA JSX.

### AC-10: "Let's Build Something." — strong visual moment
- **Type**: `rubric`
- **Dimension**: Editorial headline strength
- **Scale**: 1–5
- **Anchors**: 1 = same size as section headings; 3 = slightly bigger but reads like a section title still; 5 = visibly largest headline on page after name, tight leading, extends near layout edges, clearly a major editorial statement not a section heading.
- **Pass Threshold**: ≥ 4
- **Evidence**: contact.tsx `h2 className` containing the string "Let's Build Something." — font-size clamp, line-height, max-width constraints.

### AC-11: Social icons consistent family; Instagram correct; staggered scroll-in
- **Type**: `rule`
- **Given**: contact.tsx social array + footer.tsx social array
- **When**: Check `<Instagram/>` import source; check stagger animation
- **Then**: Instagram imported from `@/components/icons` (not lucide-react camera icon); both footer and contact use icons.tsx Github/Linkedin/Instagram; contact social links have staggered framer-motion initial/whileInView variants with 100–150ms per-item delay.
- **Pass Condition**: `Instagram` in contact imports not from lucide-react; contact whileInView with stagger in variants.
- **Evidence**: contact.tsx imports and variant declarations; footer.tsx imports.

### AC-12: Footer visually separated (divider + muted typography + top padding)
- **Type**: `rule`
- **Given**: footer.tsx
- **When**: Check wrapper classes
- **Then**: `border-t` width visually increased (e.g., `border-border/60` or stronger) vs previous contact `border-border/40`; `pt-*` at least `py-10` or `py-12`; text size ≤ text-xs/sm, `text-muted`/opacity-low.
- **Pass Condition**: `pt-` value ≥ 10 in rem units; border class present and visually distinct from contact borders.
- **Evidence**: footer.tsx outer element classes.

### AC-13: All visible "PDF" labels removed from certificates UI
- **Type**: `rule`
- **Given**: certificates-carousel.tsx
- **When**: Search strings `"PDF"` and `"IMAGE"` (case sensitive) outside of type declarations/comments
- **Then**: Zero occurrences in JSX-rendered text (badge text, metadata text, viewer header text, placeholder tile text). Internal `type: "image" | "pdf"` TS declarations and code comments exempt. PDF viewer iframe behavior (src + #toolbar=0) unchanged.
- **Pass Condition**: grep for `"PDF"` / `"IMAGE"` literal strings inside JSX expressions → 0 matches in rendered output; corner badge no longer shows file-type word; viewer header metadata row no longer shows file-type word; PDF thumbnail tile doesn't contain "PDF" text.
- **Evidence**: `rg -n '"PDF"|"IMAGE"' components/certificates-carousel.tsx components/certificates.tsx` excluding TS interface lines.

### AC-14: Custom AP favicon installed; HTML title exactly "Aniket Patil - Portfolio"
- **Type**: `rule`
- **Given**: layout.tsx metadata + app/favicon file(s)
- **When**: Check metadata.title, openGraph.title, twitter.title AND existence of favicon.ico or icon file in /app or /public
- **Then**: title strings exactly `Aniket Patil - Portfolio`. A non-default favicon file exists at `app/favicon.ico` (or equivalent). Favicon is a minimal AP/portfolio mark (not default Next.js icon).
- **Pass Condition**: layout metadata.title === `Aniket Patil - Portfolio`; og/twitter match; favicon file exists.
- **Evidence**: layout.tsx title strings; favicon file listing.

### AC-15: Responsive behavior preserved
- **Type**: `rule`
- **Given**: All components
- **When**: Build + dev runtime (synthetic checks via grid breakpoint classes review)
- **Then**: All existing responsive breakpoint classes (`sm:`, `md:`, `lg:`) remain; hero portrait has responsive max-width constraints; navbar center nav still scrollable overflow-x-auto on mobile; no `hidden sm:block` hides critical info on mobile without alternative; certificate lightbox has mobile padding.
- **Pass Condition**: No new code removed mobile fallbacks; certificate lightbox `p-3 sm:p-6` present; hero grid cols 1 then lg-cols-12.
- **Evidence**: Build passes (AC-16); visual breakpoint class audit on hero/navbar/contact/projects.

### AC-16: Production build passes with zero TS errors
- **Type**: `rule`
- **Given**: Entire project
- **When**: `npm run build`
- **Then**: exit code 0; "Failed to type check" absent; GetDiagnostics []
- **Pass Condition**: exit 0; empty diagnostics
- **Evidence**: build terminal output + GetDiagnostics

### AC-17: Motion philosophy (restrained, subtle, intentional)
- **Type**: `rubric`
- **Dimension**: Motion restraint & cohesion
- **Scale**: 1–5
- **Anchors**: 1 = lots of constant float/bounce/glow animations, large scale transforms (>1.05), long durations (>600ms); 3 = some unnecessary animations; 5 = only WarpText on 2 headlines, MoltenMetal internal drift, micro hover strokes on links, subtle 100–150ms staggered social-in, no constant profile float, max durations ~400ms on interactions, max scale 1.02 on buttons.
- **Pass Threshold**: ≥ 4
- **Evidence**: grep for `float-slow`, `animate-pulse`, `whileHover scale > 1.05`, `animation:` durations; review each motion block in hero/contact/carousel/project-card/beyond/navbar.
