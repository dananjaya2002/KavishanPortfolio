# DK.Dev — Dark Engineering Studio

## Source and scope

Inspected the latest available source of [the existing Lovable project](https://lovable.dev/projects/61cb8347-90bb-4b91-b9f3-3b7e2afeeed1), revision `936700edfc9d0707bacf77091ca2be23344e9e29`. It supplies the StudioEffects, CSS cube, and paired-project-row references. Its design document still describes the older Ivory/Ink appearance; this document describes the actual local implementation.

The application remains React 18 / Vite / JavaScript / plain CSS / JSON on `feat/lovable-portfolio-redesign`. No dependencies, animation libraries, backend, router, or deployment configuration were added. Lovable was read only for this phase; no generation credits or new project were required.

## Palette and typography

Semantic tokens live in `src/styles.css`. The dark palette is the default; a saved light preference remains supported.

| Role | Dark | Light |
| --- | --- | --- |
| Background | `#060C18` | `#f2f8fc` |
| Secondary background | `#0B1525` | `#e6f0f7` |
| Card | `#111F32` | `#ffffff` |
| Primary text | `#E9F5FC` | `#11283d` |
| Secondary text | `#9aafc5` | `#48657b` |
| Cyan action | `#4ADAEF` | `#086d83` |
| Highlight | `#6FE8FB` | `#07596d` |
| Violet accent | `#9991ee` | `#6755b3` |
| Border | `#23394f` | `#c1d6e4` |

Primary buttons use navy text on cyan in dark mode and white text on teal in light mode. Atmospheric gradients, technical grids, and restrained edge glow are decorative. Cube modes are engineering interests, not live infrastructure status.

- Display: locally bundled Space Grotesk Variable, mostly weight 500.
- Body: locally bundled Inter Variable. No remote font requests.
- Metadata: system monospace; meaningful project text stays 14px or larger, category controls and tags 12px or larger.
- Main container: 1240px maximum, with desktop/tablet/phone gutters of 56/36/20px.
- Controls: at least 44px targets. Cards have 14px corners; buttons 6px.
- Theme selection preserves the existing `theme` storage key. A small pre-paint script avoids a palette flash; restricted storage falls back to dark without preventing use.

## Elastic Spotlight Grid — Option A

`Projects.jsx` groups the visible collection into pairs. The initial four are DAD TV, AI Stack VM, Mail Management System, and PomeScan, sorted by the existing `homepageOrder`.

At widths above 768px:

- Each row starts with `minmax(0, 1fr) minmax(0, 1fr)`; all four selected cards are 520px high.
- Hover or focus expands the active column to `1.6fr` and contracts the neighbor to `0.8fr`.
- `grid-template-columns` transitions over 450ms using `cubic-bezier(.22,.8,.25,1)`.
- The row width and card heights remain fixed. At a 1240px row, the measured widths were 608/608px at rest and approximately 811/405px expanded, including a 24px gap.
- Pointer exit restores equal widths unless keyboard focus remains within a card. Pointer hover takes precedence while present.
- A container query reveals the project role and an additional description line when the active card has sufficient width. Reserved text space prevents the footer from jumping.
- Hover never navigates. The existing named case-study button opens the dialog.
- Reduced motion keeps the columns equal and removes transitions.

At 768px and below, rows stack into one column, card heights follow content, and elastic width changes are disabled.

Search matches title, description, and technology tags locally, combines with category filters, and includes an empty-result state. All 11 projects remain accessible. Search/filter state does not change global previous/next order or project URL handling.

## Holographic cube

`DeveloperVisual.jsx` adapts Lovable's six-face CSS cube and adds complete interaction lifecycle management:

- Outer wireframe cube, illuminated six-face inner cube, and three orbiting rings.
- Perspective and `transform-style: preserve-3d`; no WebGL or canvas runtime.
- Idle rotation: 36 seconds; ring orbits: 24/32/42 seconds.
- Fine-pointer tilt and mouse dragging; touch scrolling remains native.
- Full-Stack, Platform Engineering, and Applied AI modes.
- Named Next mode, Pause/Resume, and Reset buttons.
- The focusable scene supports arrow keys in 15-degree steps and Home to reset.
- Keyboard focus pauses idle motion and prevents pointer tilt from overriding keyboard rotation.
- Reset restores Full-Stack, the stored -18/32-degree orientation, and the idle animation origin.
- IntersectionObserver and document visibility pause offscreen/background animation; dialogs pause the background cube. Reduced motion disables automatic animation and pointer tilt.
- Pointer frames and listeners are cleaned up on preference changes and unmount.

## Intro, spotlight, and entrances

`StudioEffects.jsx` implements:

- **Boot intro:** `DK.DEV // INITIALIZING`, six assembling miniature faces, and a cyan progress line. A 650ms decorative animation dismisses itself; a 1000ms watchdog handles missing animation-end events. It never waits for fabricated loading work.
- Skip button and Escape dismissal. The overlay does not intercept the underlying page's pointer events.
- `dk-boot-seen` in sessionStorage avoids replay in the current tab session. Reduced motion, direct project links, and unavailable session storage bypass the intro.
- React StrictMode is supported: the initial eligibility check does not write storage, and each active effect setup arms its cleanup-safe watchdog. Modal navigation does not remount the intro.
- **Hero spotlight:** bounded radial light follows fine-pointer coordinates via requestAnimationFrame; pointer exit fades it. Coarse pointers and reduced motion bypass tracking.
- **Headline:** brief staggered character reveal. Whole words remain intact for wrapping, and a single accessible heading label avoids spelling the title character by character.
- Existing one-time section reveals, cyan navigation indicators, and button/card edge treatments. Reduced motion reveals content immediately.

## Content, media, and accessibility

The portrait, project screenshots, diagrams, video, CV, and existing contact links remain unchanged. Degree details in `experience.json` were verified against the current CV; project and career content remains JSON-driven.

Text-bearing media uses fixed frames with absolutely positioned images, constrained width/height, and `object-fit: contain`. This prevents intrinsic grid image sizing from cropping covers despite a contain declaration. Architecture diagrams keep natural proportions and full-size links; portrait cropping is separate.

Project selection remains `?project=<existing-slug>#projects`. Existing history behavior, direct links, previous/next, sharing, focus trapping/restoration, Escape dismissal, native video controls, and PDF preview/download remain in use. Preserve the skip link, mobile navigation Escape handling, visible focus, and active-section labels.

## Verification and artifacts

Production build: `npm run build`. Browser verification used the connected Playwright Chromium session, English content, both themes, and reduced motion.

Verified:

- 320/390/768/1440px layouts without horizontal overflow; mobile single-column cards do not expand on hover.
- Equal and expanded desktop rows, rapid pointer changes, pointer exit, keyboard expansion, fixed row width, and full-image frames.
- Cube modes, pointer drag/tilt, arrow controls, reset, pause, and offscreen pause.
- Intro natural completion (approximately 0.69 seconds observed locally), skip, missing-animation watchdog, session no-replay, and reduced-motion bypass.
- All 11 dialogs and their gallery/architecture manifests, real demo playback, Back/Forward, focus wrapping, direct-link dismissal, search/filtering, CV controls, portrait loading, and verified education.
- All 21 referenced media/document paths returned HTTP 200.
- Copy-link handling was checked with a clipboard stub; the native operating-system share sheet was not exercised.
- No browser console errors.

Screenshots are in ignored `.playwright-mcp/`: `dark-hero.png`, `dark-grid-normal.png`, `dark-grid-expanded.png`, `dark-mobile.png`, `dark-mobile-projects.png`, and `dark-boot-intro.png`.

Safari/Firefox and physical touch devices were not tested. The layout uses modern CSS Grid, :has(), and container queries; no legacy-browser polyfill was added. No commit, push, merge, or deployment is part of this change.
