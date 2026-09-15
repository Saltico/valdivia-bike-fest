---
name: Valdivia Bike Fest
description: A route-led mountain bike event site shaped as a Trail Control Room.
colors:
  ink: "#1A1A1A"
  ink-soft: "#4C6444"
  paper: "#F7F7F7"
  paper-dim: "#c8d5ce"
  line: "rgba(247, 247, 247, .2)"
  turquoise: "#52C7B4"
  brand-deep: "#4C6444"
typography:
  display:
    fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif'
    fontSize: "clamp(5rem, 10vw, 9rem)"
    fontWeight: 700
    lineHeight: 0.79
    letterSpacing: "-.045em"
  headline:
    fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif'
    fontSize: "clamp(3.8rem, 7vw, 7.2rem)"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "-.045em"
  body:
    fontFamily: '"DM Sans", Arial, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif'
    fontSize: ".64rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: ".14em"
rounded:
  none: "0"
  dot: "50%"
spacing:
  page-gutter: "clamp(1.25rem, 4vw, 4.75rem)"
  button-y: ".85rem"
  button-x: "1.3rem"
components:
  button-primary:
    backgroundColor: "{colors.turquoise}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: ".85rem 1.3rem"
    height: "3.4rem"
  button-small:
    backgroundColor: "{colors.turquoise}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: ".65rem 1rem"
    height: "2.45rem"
  route-tab-active:
    backgroundColor: "{colors.turquoise}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.25rem"
---

# Design System: Valdivia Bike Fest

## Overview

**Creative North Star: "Trail Control Room"**

The implemented site treats a race website like a field operations desk: part topo map, part timing board, part invitation to ride. The homepage opens with a left-aligned editorial call to action facing a real race photograph overlaid by a living contour-map panel, then moves through route, schedule, results, place, and registration as distinct operational stations. The five supporting pages reuse the same dark shell and cropped logo placeholder for continuity.

The visual world is deliberately not a generic sports-event hero. It is black, brand deep blue-green, turquoise route ink, white paper, hairline dividers, tabular labels, and sharp rectangular boards. Supplied race imagery now anchors the hero, route, results, and Valdivia surfaces; authored SVG geometry remains as the interaction layer.

**Key Characteristics:**
- Route-first storytelling grounded in bosque, agua, ciudad, and Valdivia.
- High-contrast turquoise accents used as status signals, active states, and calls to action.
- Condensed uppercase display type paired with readable DM Sans copy.
- Sharp, data-board geometry with almost no corner rounding.
- Spanish-first copy with a lightweight English toggle intended for equivalent content.

## Colors

The palette reads like a night ride instrument panel: black, white, brand deep blue-green, and turquoise route signal.

### Primary
- **Brand Turquoise** (`{colors.turquoise}`): The primary action color, route line, active tab, emphasis text, status signal, and selected state. It is intentionally rare outside moments that need attention.

### Secondary
- **Brand Deep** (`{colors.brand-deep}`): Dark surface, route context, and readable text on white surfaces.

### Neutral
- **Black** (`{colors.ink}`): Global canvas, dark text on turquoise, dark map marks, and the primary visual field.
- **Brand Deep** (`{colors.ink-soft}`): Mobile menu and secondary dark panel surface.
- **White** (`{colors.paper}`): Main light text, pale results surface, and city-page copy surface.
- **Paper Dim** (`{colors.paper-dim}`): Supporting copy, metadata, navigation, and secondary labels on dark surfaces.
- **Hairline Paper** (`{colors.line}`): Low-contrast borders and rules separating operational data.

**The Signal Rarity Rule.** Turquoise is the signal, not a background wash for ordinary content. Reserve it for actions, route states, live/status markers, and deliberate emphasis.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif fallbacks)

**Body Font:** DM Sans (with Arial, sans-serif fallbacks)

**Label/Mono Font:** Barlow Condensed is reused for labels; there is no separate mono face.

**Character:** The display face is compressed, forceful, and built for race-board headlines. DM Sans supplies the calm reading layer for descriptions and practical information. Headings are uppercase with tight negative tracking; `<em>` is not italicized, but turquoise emphasis.

### Hierarchy
- **Display** (700, `clamp(5rem, 10vw, 9rem)`, `.79` line-height): Homepage hero invitation, broken into short stacked lines.
- **Headline** (700, `clamp(3.8rem, 7vw, 7.2rem)`, `.8` line-height): Section titles and the large supporting-page introductions.
- **Title** (700, generally `clamp(3rem, 6vw, 6rem)`, `.82-.85` line-height): Route detail, inner content, and page subheads.
- **Body** (400, `16px`, `1.5` base line-height): Explanatory copy; many long-form blocks tighten to `1.65` for reading comfort and stay near 35ch maximum.
- **Label** (600-700, `.58-.75rem`, `.05-.14em`, uppercase): Navigation, board metadata, counters, coordinates, status, and section kickers.

**The Two-Speed Type Rule.** Use condensed uppercase type for scanning and identity; keep DM Sans for sentences, descriptions, and anything a rider needs to understand without decoding the display treatment.

## Layout

The shared page gutter is `clamp(1.25rem, 4vw, 4.75rem)`. Desktop sections use asymmetric editorial grids rather than centered cards: the hero is a `.82fr / 1.18fr` copy-to-board split, the event and schedule sections use uneven columns, and the results and Valdivia areas alternate dark/light panels. Sections carry generous vertical padding, generally between `5rem` and `10rem`, with one-pixel rules defining transitions.

The homepage hero is at least `min(53rem, calc(100vh - 5rem))`; its route board is a tall, slightly rotated (`1.5deg`) instrument panel. At `980px`, navigation gaps, hero proportions, and panel heights tighten. At `760px`, the system becomes a single-column reading flow: the header switches to a menu button, the hero stacks copy above the map, the turquoise status strip stacks vertically, section grids become blocks, event items become a vertical list, route tabs become three equal columns above the detail panel, and the Valdivia map precedes its copy. The route board loses its rotation and maps scale to viewport width (`min(73vw, 26rem)`). Supporting-page panels likewise collapse from split grids to stacked map/copy blocks.

The mobile menu is an in-flow absolute panel under the header with a full-width registration action. Navigation and display headlines remain intentionally dense, but practical copy is allowed to wrap. Smooth anchor scrolling is enabled except when reduced motion is requested.

## Elevation & Depth

This is a mostly flat, tonal system. Depth is communicated through adjacent deep brand surfaces, the pale results/city surfaces, hairline rules, the hero board's `1.25rem 1.5rem` black offset shadow, and a stronger fixed toast shadow. There are no rounded cards or floating-card stacks. The route line has a soft turquoise under-stroke to separate it from the contour field.

**The Board-Not-Card Rule.** Containers should feel like field equipment or printed data boards: flat, bordered, and structurally placed. Avoid generic floating cards, soft gradients, or decorative elevation unrelated to route/status information.

## Shapes

The form language is square and instrument-like: buttons, panels, boards, lists, and dividers use zero radius. Circular geometry is reserved for small signal dots and map nodes. Borders are one-pixel translucent paper rules on dark surfaces or one-pixel dark rules on light surfaces. The route board's desktop rotation is a signature silhouette, removed on mobile for legibility and fit.

## Components

### Buttons
- **Shape:** Square, no radius (`0`), with a one-pixel border.
- **Primary:** Chartreuse fill with graphite text; `3.4rem` minimum height, `.85rem 1.3rem` padding, condensed uppercase label, and a northeast arrow for external/forward actions.
- **Hover / Focus:** Hover changes the fill to paper and lifts the button `3px`; the final turquoise CTA reverses to black with turquoise text. Keyboard focus uses a `2px` turquoise outline with `5px` offset.
- **Secondary / Ghost / Tertiary:** Text and arrow links are transparent, condensed uppercase, and use turquoise for the arrow; the arrow shifts diagonally on hover.

### Cards / Containers
- **Corner Style:** Square; no radius.
- **Background:** Dark boards use black or brand deep surfaces; results uses white; the Valdivia map uses supplied imagery with turquoise route cues.
- **Shadow Strategy:** The hero route board gets the only persistent offset shadow; most containers rely on borders and tonal contrast.
- **Border:** Hairline translucent rules divide boards, schedules, tabs, and contact rows.
- **Internal Padding:** Board chrome uses about `1rem`; large detail panels use responsive padding up to `5rem`.

### Navigation
- **Style:** Persistent sticky header with the cropped VBK wordmark, condensed uppercase links, language control where present, and a compact registration action. The header uses brand deep `#4C6444` so the navigation remains visible as a branded control surface. The homepage also has a footer with repeated navigation and metadata.
- **Default / Hover:** Navigation is dim paper by default and turns turquoise on hover. Header and footer are separated by hairline rules.
- **Mobile:** At `760px` the desktop navigation and header CTA hide behind the menu button. The sticky header remains anchored, and the open menu is fixed directly beneath it with large condensed links and a full-width registration button.

### Route Control
- **Style:** The homepage has a three-item tablist for Salida, Bosque, and Meta beside a detail panel. The active/hover tab becomes turquoise with black text; the detail panel updates title, description, index, and three data values.
- **State:** Initial state is `Salida`; all route metrics are visibly `por definir` until official data is supplied. The standalone route page repeats the illustrative route board and reference framing.

### Status, Results, and Place Boards
- **Status:** A full-width turquoise strip carries a live-dot label, countdown cells, and a right/last-line status message. With no date, it remains the explicit `Fecha por anunciar` state.
- **Results:** A bordered board uses a pale grid field, a plus marker, `Resultados por publicar`, and footer categories. It is an intentional empty state, not a data table.
- **Place:** Valdivia uses supplied Chile imagery, a clipped turquoise river cue, map marks, and a white copy panel.

### Accessibility & State Notes
- Semantic landmarks, labelled sections, visible `:focus-visible` outlines, SVG titles/descriptions on the homepage map, button `aria-expanded` state, and route-tab `aria-selected` state are present.
- Reduced-motion users receive disabled smooth scrolling, route animation, and transitions through `prefers-reduced-motion`.
- The route tabs now expose `aria-controls` and update the tabpanel's `aria-labelledby`; arrow-key navigation remains a future enhancement. The language control should continue to update its accessible label and all translated navigation surfaces, including the mobile menu and footer.
- All six HTML pages load `script.js`; the shared script injects the language control where a supporting-page header does not render one explicitly and keeps the mobile menu behavior consistent.

### Known Replacement Points
- Replace every `https://example.com/registro-valdivia-bike-fest` value on the registration CTAs with the external registration platform URL. Until then, `script.js` prevents navigation and shows a replacement reminder toast.
- Set `data-date` on the homepage countdown to the official event date/time. Until then the countdown remains inactive and the announcement state is shown.
- Replace `routeData` values and the route-page/reference SVG with approved distance, elevation, timing, access, and route geometry. Current values intentionally read `por definir` and `referencia`.
- Replace the results empty boards with the supplied official results source, categories, times, and post-race publishing behavior.
- Supplied assets now live in `/img`: `carrera.avif` anchors the hero, `ruta.avif` the route page, `resultados_hombre.avif` and `resultados_mujer.avif` the results board, `chile.avif` the Valdivia surface, and `logo cropped.png` the current logo placeholder. Additional supplied images remain available for future sections.
- Replace the schema and social placeholders (`example.com`), the generic Instagram destination, and any provisional event copy before publishing.

## Do's and Don'ts

### Do:
- **Do** keep the route/status-board metaphor visible in new surfaces through precise labels, map or timing cues, and practical information hierarchy.
- **Do** use the brand black, white, turquoise, and deep blue-green roles rather than introducing a new accent for ordinary UI.
- **Do** preserve square geometry, asymmetric grids, one-pixel rules, and the condensed-display/DM-Sans pairing.
- **Do** keep empty or provisional data states explicit until official event facts and assets are available.
- **Do** preserve the mobile single-column transformation and the reduced-motion escape hatch.

### Don't:
- **Don't** present the illustrative route, countdown, results, coordinates, or commercial links as verified final event data.
- **Don't** turn the system into generic rounded cards, soft-gradient sports marketing, or a photo-first hero that hides the route and registration path.
- **Don't** use turquoise as a general surface color or introduce unapproved colors without a defined product role.
- **Don't** ship the supporting pages with different font loading, script behavior, language coverage, or navigation affordances from the homepage.
- **Don't** rely on color alone for active route state, status, or result availability; retain labels and semantic state.
