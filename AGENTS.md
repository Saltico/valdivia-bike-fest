# Agent Instructions

## Repository Shape

- This is a static HTML/CSS/vanilla-JS site, not an Astro/WordPress application in its current form; there is no `package.json`, lockfile, build tool, test runner, lint configuration, CI workflow, or generated-code step.
- The six pages are `index.html`, `evento.html`, `ruta.html`, `resultados.html`, `valdivia.html`, and `contacto.html`; shared presentation is in `styles.css` and shared behavior is in `script.js`.
- Images and the current cropped logo are in `img/`; preserve supplied assets and their existing paths unless replacing them with approved production assets.
- `PRODUCT.md` defines the product constraints and `DESIGN.md` records the visual system and known replacement points; consult both before changing structure or copy.

## Local Verification

- Open the root with the VS Code Live Server extension; `.vscode/settings.json` sets port `5501`.
- There is no repository-provided automated verification command. Manually check every HTML page in a browser after changes, including the mobile menu, language toggle, registration links, route tabs, countdown state, and responsive layout.
- Check the browser console and verify that local assets load, all six pages resolve, and keyboard focus remains visible.

## Data Safety

- Do not invent event facts, dates, route metrics, race results, coordinates, sponsors, or commercial claims. Keep provisional states explicit until official data is supplied.
- Before publishing, replace all `example.com` registration/schema URLs, generic social URLs, empty countdown `data-date`, illustrative route data/SVG, and empty results boards. The exact inventory is also tracked in `INFORMACION_PENDIENTE.md` and `DESIGN.md`.
- `script.js` intentionally blocks registration links containing `example.com` and shows a reminder toast; do not remove that guard until every registration CTA has a real approved URL.

## Shared Behavior

- All pages load `script.js`; keep navigation, mobile-menu behavior, language switching, and accessibility state consistent across pages.
- Homepage route tabs read their values from `routeData` in `script.js`; update that object and the standalone route page together when official route information arrives.
- The countdown only starts when `index.html` has a valid `data-date`; use an unambiguous official date/time with the correct Chile timezone.
- The language toggle swaps Spanish and English client-side. Any new user-facing copy needs both languages and must account for mobile navigation/footer selectors where applicable.

## UI Constraints

- Preserve the established route/status-board visual language, square geometry, asymmetric layouts, one-pixel rules, and existing Barlow Condensed / DM Sans pairing.
- Use the approved brand roles from `PRODUCT.md`: turquoise `#52C7B4`, deep green `#4C6444`, white `#F7F7F7`, and black `#1A1A1A`.
- Preserve semantic landmarks, route tab `aria-selected`/`aria-controls`, mobile menu `aria-expanded`, visible focus styles, SVG titles/descriptions, and reduced-motion behavior.
