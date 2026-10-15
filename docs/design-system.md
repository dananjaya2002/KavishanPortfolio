# DK.Dev — Ivory & Ink

## Design source and implementation

The design was generated and refined through [Lovable](https://lovable.dev/projects/61cb8347-90bb-4b91-b9f3-3b7e2afeeed1). The unpublished prototype is a reference; this repository remains the application source of truth. The second design pass uses commit `5bebfe26717f3d19e2ef509d1b579555b67c232f`.

The local port retains React 18, Vite, JavaScript, plain CSS, and JSON content. It reuses the existing project dialog, History API state, résumé preview, and media manifests. No Tailwind, shadcn, router, backend, or runtime service was added.

## Visual language

An editorial engineering studio: warm paper, charcoal, coral punctuation, large typography, numbered chapters, fine dividers, and generous space. Real screenshots communicate the work. The interactive cube is decorative concept art, not a deployment diagram or live system status.

## Tokens

`src/styles.css` defines the actual tokens and theme overrides. Components consume semantic variables.

| Role | Light | Dark |
| --- | --- | --- |
| Background | `oklch(.978 .008 85)` | `oklch(.205 .006 75)` |
| Text | `oklch(.23 .009 75)` | `oklch(.94 .01 85)` |
| Muted text | `oklch(.47 .012 75)` | `oklch(.72 .01 85)` |
| Accent | `#bd3e18` | `#ff926d` |
| Border | `oklch(.84 .011 85)` | `oklch(.36 .008 75)` |

The coral was darkened from the prototype for readable light-theme buttons. The contact band uses fixed charcoal and ivory in both themes. Preserve white text on light-theme primary buttons and charcoal text on dark-theme primary buttons.

- Display: locally bundled Space Grotesk Variable, predominantly weight 500.
- Body: locally bundled Inter Variable; no external font request.
- Technical metadata: system monospace.
- Headings use responsive sizes; paragraph text is generally 14–16px. Category controls and technology tags are at least 12px. Tiny metadata is supplementary.
- Main container: 1240px maximum; side gutters 56px desktop, 36px tablet, 20px phone.
- Breakpoints: 1100px, 860px, 640px, and 360px.
- Corners: 3–6px. Rules: 1px. Buttons and icon controls provide at least 44px targets.

## Page and interactions

1. Hero: identity, two primary actions, social links, and cube visual. Its control cycles three orientations and labels; labels describe interests, not operational status.
2. Projects: the first four entries by `homepageOrder`, visible category controls, and an expandable complete collection. Desktop cards are staggered; phone cards use a true single-column grid.
3. About: the original portrait, biography, and highlights.
4. Experience: both professional entries and achievements, with keys including dates.
5. Skills: every existing JSON category and technology.
6. Contact and footer: email, social links, and back-to-top.

The existing `theme` storage key is preserved. New visitors start in light mode. Storage restrictions do not prevent the theme control from working.

Project selection remains `?project=<existing-slug>#projects`. Direct loading, Back, previous/next, share, Escape, focus trapping, and focus restoration use the existing dialog implementation. Filtering does not change the global previous/next order.

## Media and accessibility

- Keep the existing asset paths and slugs. Product covers and gallery frames use `object-fit: contain`; architecture diagrams retain their natural proportions and full-size links.
- Use the real portrait, original CV, and native demo video. Do not copy guessed prototype asset names or conceptual architecture into production content.
- The portrait uses a controlled crop at larger widths. Keep the face visible when replacing the image.
- Preserve native video controls, muted initial playback, and `preload="metadata"`; never autoplay the demo.
- Maintain visible focus, the skip link, menu Escape handling, active navigation labels, and named icon controls.
- Reduced motion disables animation, reveal movement, and smooth scrolling. Reveal content also has an IntersectionObserver fallback.
- Full-width section colors use clipped box shadows, avoiding viewport-width scrollbar overflow.

## Verification reference

The port was checked at 320, 390, 768, and 1440px in English, with both themes and reduced motion. Browser journeys covered collection expansion/filtering, direct project URLs, history dismissal, navigation, gallery/diagram presence, real video playback, résumé controls, portrait loading, and focus restoration. Browser artifacts belong in ignored `.playwright-mcp/`.
