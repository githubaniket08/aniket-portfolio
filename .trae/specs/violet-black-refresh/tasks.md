# Aniket Patil Portfolio — Violet/Black Refresh Implementation Plan

Dependency order (top to bottom):
1. Task 1 → Global palette + MoltenMetal (prereq: NONE)
2. Tasks 2,3,4,5,6 → independent non-overlapping component files (all depend on Task 1 for palette)
3. Task 7 → Build + Diagnostics (depends on 1–6)
4. Review Phase

---

## Task 1: Global Design System — Violet/Black Palette, Surface Classes, MoltenMetal Background
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Rewrite `app/globals.css` `:root` CSS variables from brown/amber system to deep violet + near-black: `--background`, `--foreground`, `--foreground-soft`, `--muted`, `--accent` (violet), `--accent-soft` (muted violet highlight), `--border`, `--border-strong`, `--surface-glass`, `--surface-elevated`, `--surface-soft`, `--ink`.
  - Update `@theme` color tokens accordingly.
  - Update `html`/`body` base background color.
  - Create new component file `/components/MoltenMetal.tsx` — React Bits-style OGL shader component with fragment/vertex shaders for a violet/black molten/marbled flow. Follow Ferrofluid.tsx's pattern (use OGL `Renderer/Triangle/Program/Mesh/Vec`; resize + rAF + reduced-motion + visibility-state pause; dpr capped ≤ 1.75). Tune props: violet hues, low shimmer, slow speed, dark near-black clearColor. Export default `MoltenMetal` with props interface.
  - Add `components/MoltenMetal.css` if any per-class styling needed (usually not for OGL).
  - Rewrite `components/background-canvas.tsx`: drop `Ferrofluid` import; import `MoltenMetal`; render it full-screen fixed; replace warm radial gradient overlays with violet-tinted radial vignettes (top/bottom subtle).
  - Update layout.tsx `<html>` class: `bg-[#0E0805]` → violet-tinted near-black `bg-[#070410]` (or var equivalent).
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-16
- **Test Requirements**:
  - `rule` TR-1.1: No brown/amber color values remain in globals.css vars. Command: `rg -n '#0E0805|#C77A3F|#E8B481|#8A4A22|rgba\(199,122,63|rgba\(232,180,129' app/globals.css app/layout.tsx components/background-canvas.tsx → 0 matches`.
  - `rule` TR-1.2: MoltenMetal component exists and background-canvas uses it. `ls components/MoltenMetal.tsx → exists` AND `grep -c MoltenMetal components/background-canvas.tsx ≥ 2` AND `grep -c Ferrofluid components/background-canvas.tsx == 0`.
  - `rule` TR-1.3: layout html bg no longer espresso brown. `rg 'bg-\[#0E0805\]' app/layout.tsx → 0`.
  - `rubric` TR-1.4: Palette cohesion (AC-3); scale 1-5; anchors 1=many brown leaks 3=variables updated only 5=everything violet/black; threshold ≥4; evidence=globals.css + background-canvas audit.
- **Notes**: MoltenMetal shader — the React Bits reference typically uses simplex noise flowing fluid bands; keep contrast low, violet hues, clear color near-black. Avoid bright highlights.

---

## Task 2: Hero Section — Portrait Frame Removal, Duotone/Cutout + Violet Rim Light, Editorial Spacing, CTA Button Restyle
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - **Portrait block (right column)**: remove the `surface-glass` framing card, remove animated geometric accent frame, remove corner marks, remove profile-orb-1/2 and float-slow animation loops; replace with a simpler silhouette container. Wrap `<Image>` in a div with CSS duotone: apply `filter: grayscale(1) contrast(1.1)` plus a violet overlay layer (`mix-blend-mode: multiply` or `::after` gradient in violets) and subtle inset `box-shadow` for violet rim light. Add restrained cursor-proximity parallax (±2–3px translation) via framer-motion `useMotionValue`/`useSpring` (optional: onMouseMove in parent). No continuous float loop.
  - **Spacing (left column + section)**: Increase hero section `pt-` from `pt-24 md:pt-32` → `pt-36 md:pt-48` or equivalent; reduce gap between AVAILABLE badge cluster ("For interesting work & research") and name; maintain or slightly increase gap between name and degree subtitle; keep eyebrow separate below subtitle. Section `pb-` may remain unchanged or slightly shrink since we grew top.
  - **CTA buttons**: Change "Get in touch" primary and "Explore work" secondary from `rounded-full` → `rounded-xl`. Replace heavy filled warm pill ("Get in touch") with a thin stroke/ghost outline (or minimal semi-filled violet-tinted base). Subtle arrow underline/offset on hover instead of heavy scale. Keep `ArrowUpRight` icon but use a +translate-x/translate-y micro hover instead of scale.
- **Acceptance Criteria Addressed**: AC-4, AC-5, AC-6, AC-7, AC-17
- **Test Requirements**:
  - `rule` TR-2.1: No surface-glass around portrait, no corner marks, no float-slow on profile container. `grep -nE 'surface-glass|corner.*mark|float-slow' components/hero.tsx in profile-right block → 0 matches within profile div`.
  - `rule` TR-2.2: Duotone filter present; rim-light present (inset box-shadow OR gradient overlay). Visual class inspection.
  - `rule` TR-2.3: AVAILABLE + eyebrow class: font-size ≤ 12px, tracking ≥ 0.18em, uppercase, sans font-body family.
  - `rule` TR-2.4: Neither hero CTA button uses `rounded-full`; navbar/resume handled in Task 3. `rg 'rounded-full' components/hero.tsx in CTA anchors → 0`.
  - `rubric` TR-2.5: Whitespace editorial confidence (AC-6); scale 1–5; threshold ≥4; anchors 1=even spacing 3=some clustering 5=clearly asymmetric with strong breathing room above name; evidence=hero section padding + gap values.
  - `rubric` TR-2.6: Motion restraint (AC-17 portion on hero); scale 1–5; threshold ≥4; no float/bounce loops; max hover scale ≤ 1.02; evidence = hero motion props.

---

## Task 3: Navbar & Download Resume Button — LinkedIn Replaces GitHub, Thin Stroke Style
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Import `Linkedin` from `@/components/icons` instead of `Github` in the right column.
  - Update the right-column button icon + href to LinkedIn (`https://www.linkedin.com/in/aniket0804/`).
  - Ensure Github remains in center nav links? No — center nav is anchor list (Stack/Projects/Experience/Certificates/Contact). Only right side changes: Github → Linkedin.
  - **"Download Resume" CTA**: Restyle from filled warm pill `bg-[#F5EFE6] text-[#110A06] rounded-full` → thin stroke outline using new palette: border-violet, transparent or near-black fill, violet/white muted text, moderate radius `rounded-xl`. Hover: subtle underline/arrow shift (add a tiny `ArrowUpRight` icon if helpful; keep text "Download Resume"). Preserve HTML `download` attribute and `/resume/Resume_Aniket.pdf` href.
  - Nav container `surface-glass` stays but palette is now violet-based via Task 1 variables; active nav pill uses new violet foreground instead of off-white-brown.
- **Acceptance Criteria Addressed**: AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-3.1: `<Github>` icon not present in navbar right column; `<Linkedin>` present and href matches. `grep -nE 'Github|Linkedin' components/navbar.tsx → right column line contains Linkedin not Github`.
  - `rule` TR-3.2: Resume button `rounded-full` absent; uses moderate radius and stroke/ghost base. `rg 'rounded-full' components/navbar.tsx on anchors → 0`; `class includes 'border'` and not heavy filled `bg-[#F5EFE6]`.
  - `rule` TR-3.3: Resume download attribute + path intact. `grep -n 'download' components/navbar.tsx present`; `href="/resume/Resume_Aniket.pdf"` present.

---

## Task 4: Contact Section — Asymmetric Grid, Single Email CTA, "Let's Build Something." as Major Editorial Headline, Social Staggered Scroll-In + Consistent Icon Family
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - **Headline "Let's Build Something."**: Change clamp from `text-[clamp(2.5rem,7vw,5.5rem)]` → larger e.g. `clamp(3rem, 9vw, 7.5rem)`; leading tighter `leading-[0.95]`; remove or widen max-width so it approaches layout edges. Keep `h-section` serif display.
  - **Info rows grid**: Replace symmetric `md:col-span-6 md:col-span-6` with asymmetric split (e.g. Mail = 8 cols / Location = 4 cols, or Mail = 7 cols / Location = 5 cols). Mail email size can be larger; "Based in Belagavi" stays secondary/smaller.
  - **Single email CTA**: Remove filled "Send an email directly" pill `bg-[#F5EFE6] text-[#110A06]` + `<Mail>`. Keep only ONE clear CTA path: prefer the existing clickable email hyperlink ("iamanketpatil08@gmail.com" with ArrowUpRight) as the primary; OR retain a ghost/stroke outline button with minimal wording. The other must go. Result = only one primary email interaction visible in the section.
  - **Social links** (`Or find me on` row): Verify/ensure all three icons (Github, Linkedin, Instagram) are imported from `@/components/icons` (not lucide-react). Already they are but confirm Instagram doesn't come from elsewhere. Add framer-motion staggered scroll-in: wrap in `motion.div container variants` with staggerChildren 0.1 to 0.15; each item initial opacity 0/y-10; whileInView visible.
  - Adjust section `surface-soft` badge radius for consistency (no rounded-full if Task 1 CTAs drop it; but social icon pill badges can keep `rounded-full` small container OK since they're tiny decorative chips not CTA buttons. But align them to palette violet.)
- **Acceptance Criteria Addressed**: AC-9, AC-10, AC-11
- **Test Requirements**:
  - `rule` TR-4.1: Grid no longer symmetric 6/6. `grep -n 'col-span-6.*col-span-6' components/contact.tsx → 0`; col-span adds to 12 asymmetrically (e.g. 8+4, 7+5).
  - `rule` TR-4.2: Only ONE primary email CTA element rendered. The "Send an email directly" filled pill class `bg-[#F5EFE6] text-[#110A06]` removed from JSX (class text search).
  - `rule` TR-4.3: "Let's Build Something." clamp upper bound ≥ 7rem, leading ≤ 1.0. `rg 'Let.*Build' components/contact.tsx h2 className inspection`.
  - `rule` TR-4.4: Instagram imported from `@/components/icons`, NOT `lucide-react`. `grep -n 'Instagram' components/contact.tsx import statement → from '@/components/icons'`.
  - `rule` TR-4.5: Social variants have stagger (0.10–0.15). `grep -n staggerChildren components/contact.tsx present and value in range`.

---

## Task 5: Footer — Visually Separated (Divider + Muted Typography + Top Padding)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - Strengthen top border (e.g., `border-t-2 border-border/80` or `border-accent/20` visible).
  - Increase vertical padding from `py-7` → at least `py-12` so the footer clearly drops below contact.
  - Reduce typography: copyright from `text-xs sm:text-sm` → pure `text-xs` and drop `font-light` to an even more muted tone (muted plus opacity-70 if needed).
  - Footer social icons already consistent with icons.tsx — preserve.
- **Acceptance Criteria Addressed**: AC-12
- **Test Requirements**:
  - `rule` TR-5.1: Footer outer has border-t with visual weight (≥ border-t-2 or ≥ stronger opacity than contact section dividers). Compare contact `border-border/40` vs footer (≥ border-border/60). Class inspection.
  - `rule` TR-5.2: `py-` ≥ 12 (48px). `grep py- components/footer.tsx`.
  - `rule` TR-5.3: Copyright text strictly `text-xs` (no sm:text-sm upgrade) and muted class present.

---

## Task 6: Certificates PDF Label Removal + Metadata/Favicon Update
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - **certificates-carousel.tsx — visible file-type labels**: THREE places need removal.
    1. Corner badge on thumbnail tile (currently "IMAGE" or "PDF"). Remove the type wording entirely; keep only an icon (`Maximize2` or `Award`) alone inside a small subtle badge, OR convert badge to show issuer instead. No "IMAGE"/"PDF" word.
    2. Viewer/lightbox header metadata row: the type tag `{selectedCert.type === "image" ? "IMAGE" : "PDF"}` — delete this portion; keep only issuer name on the left of the header. The separator dot and type span removed.
    3. The PDF thumbnail tile (non-image card placeholder) has inner text `Verified Credential` which is fine — but the small Award text above it reads issuer (OK) and the badge says "PDF/IMAGE" (already fixed in #1). Check `span="Verified Credential"` stays; issuer stays. Do NOT introduce file-type word here.
  - **Internals preserved**: type detection, file routing to iframe/image viewer, context menu block, reduced-motion. All unchanged.
  - **layout.tsx — title**: Change `metadata.title`, openGraph.title, twitter.title to exactly `Aniket Patil - Portfolio` (note: hyphen with spaces).
  - **Favicon**: Create `app/favicon.ico` or a minimal AP monogram favicon. Use a simple SVG-like or ICO shape: letter A + P intertwined in a violet mark. If ico hard to binary-write, generate it as a minimal PNG at `app/icon.png` with violet/black AP monogram using simple path shapes; Next serves both. Do NOT leave default Next favicon. Also update `<html>` bg if not already in Task 1 (should be done already). Ensure `metadataBase` and OG image preserved (OG content unchanged).
- **Acceptance Criteria Addressed**: AC-13, AC-14
- **Test Requirements**:
  - `rule` TR-6.1: No rendered "PDF"/"IMAGE" text in JSX. `rg -n '"PDF"|"IMAGE"' components/certificates-carousel.tsx — interfaces excluded`. Result: inside JSX rendered text values only comments/interface declarations remain. Specifically search the JSX render output lines. Alternative: count occurrences `PDF literal` minus those in TS interface and comments → 0.
  - `rule` TR-6.2: metadata.title === `Aniket Patil - Portfolio` exactly; og/twitter same. `grep -n title: app/layout.tsx strings exactly match`.
  - `rule` TR-6.3: Favicon file present: `app/favicon.ico` or `app/icon.png` exists. LS output.

---

## Task 7: Final Build, Lint, Diagnostics, Responsive Class Audit
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Tasks 1,2,3,4,5,6
- **Description**:
  - Run `npm run build`; capture output. Expect exit 0.
  - Run VSCode diagnostics via `GetDiagnostics`.
  - Responsive class audit: ensure hero portrait `max-w-[]` still mobile-responsive; navbar `max-w-[920px]` plus overflow-x-auto center nav on narrow screens; certificate lightbox `p-3 sm:p-6` preserved; contact headline large clamp with reasonable minimum (wraps on mobile naturally).
  - Run `rg` to double-check no brown values escaped cleanup (AC-1 check across whole project, excluding .next).
  - Fix any build errors / diagnostics regressions before marking complete.
- **Acceptance Criteria Addressed**: AC-15, AC-16
- **Test Requirements**:
  - `rule` TR-7.1: `npm run build` exit 0, "Failed to type check" absent. Terminal output.
  - `rule` TR-7.2: GetDiagnostics → `[]`.
  - `rule` TR-7.3: Brown leak sweep (recheck AC-1). Full repo excluding .next: `rg -n --glob '!.next' '#0E0805|#C77A3F|#E8B481|#8A4A22|rgba\(199,122,63|rgba\(232,180,129' .` → 0.
  - `rubric` TR-7.4: Responsive behavior preservation (AC-15); scale 1–5; threshold ≥4; anchors 1=breakage 3=minor clipping 5=fully intact across mobile/tablet/desktop; evidence = responsive class check list audit + build result.
