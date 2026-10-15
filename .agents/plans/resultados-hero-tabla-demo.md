# Plan: resultados.html — Hero con crossfade + tabla de resultados demo

## Contexto y evidencia

- `resultados.html` hoy es `.inner-page` plano (sin hero) + `.results-page-board` en estado vacío ("Resultados por publicar").
- Ya existe un patrón de crossfade en `script.js` (`setupValdiviaCarousel`, 5 s, `.carousel-img.active`, transición opacity 1.5 s) y un patrón de hero con imagen en `.event-hero` (ruta.html/evento.html): `-bg > img` + `-overlay` + `.inner-intro` z-2.
- Las categorías oficiales 2027 están en `ruta.html:195-236`: UCI (Elite/Sub23/Junior M-F), Master A(30–39)/B(40–49)/C(50–59)/D(60+), Abiertas (Short Track Open, Promocional), Menores (Cadete, Juvenil, Pre-juvenil).
- `INFORMACION_PENDIENTE.md` §13.4 define la estructura: nivel 1 tabs XCO/XCC, nivel 2 Categorías/Clasificaciones/Ranking.
- Restricción AGENTS.md: no inventar resultados reales → la tabla demo debe estar **marcada explícitamente como datos de prueba** y ser removible de una pasada.

## 1. Hero `.results-hero` con crossfade mujer/hombre

- Reemplazar el bloque `.inner-intro` actual por `<section class="results-hero">` clonando el patrón `.event-hero`:
  - `.results-hero-bg` con 2 `<img class="carousel-img">`: `img/resultados_mujer.avif` (activa inicial, `loading="eager" fetchpriority="high"`) y `img/resultados_hombre.avif` (`alt=""` decorativas, como ruta.html).
  - `.results-hero-overlay` con el gradiente existente `rgba(26,26,26,.25→.5→.92)`.
  - `.inner-intro` (kicker / h1 "Tu marca queda aquí." / lead) en z-2.
- JS: generalizar el carousel — leer `data-interval` del contenedor; hero de resultados usa **8000 ms** ("tiempo considerable"), carousel Valdivia mantiene 5000 ms. Con `prefers-reduced-motion`: sin rotación automática (queda la primera imagen), coherente con el resto del sitio.
- CSS: reutilizar `.carousel-img` (styles.css) y dimensionar `.results-hero` como `.event-hero` (`calc(100vh - 7.5rem)` desktop, ajustes 980/760 px).

## 2. Tablero de resultados con datos demo

Estructura del board (bajo el hero, sección sobre fondo oscuro):

- **Head**: `VBF / RESULTADOS 2027` + badge de estado `DATOS DE PRUEBA` (sustituye a `PRÓXIMAMENTE`).
- **Tabs nivel 1**: XCO / XCC — patrón visual de route-tabs (activo turquoise, `aria-selected`/`aria-controls`, click + teclado básico).
- **Selector nivel 2 (categorías)**: fila de chips por grupo — Todas / Elite M / Elite F / Sub23 M / Sub23 F / Junior M / Junior F / Master A–D / Open. Filtran filas de la tabla (JS vanilla, `hidden` en `<tr>`).
- **Tabla** `.results-table`: columnas `POS · DORSAL · CORREDOR/A · CLUB · CATEGORÍA · TIEMPO · DIF.` con `font-variant-numeric: tabular-nums`; filas separadas por hairlines (board-not-card, sin zebra ni radios); fila ganadera con marca turquoise mínima en POS.
- **Datos demo**: ~10 filas por categoría visible, nombres chilenos plausibles, clubes genéricos, tiempos coherentes (XCO Elite M ≈ 1:24–1:32 con vueltas; XCC ≈ 19–22 min), diferencias `+0:12` / `+1:05`. Todo dentro de un contenedor con clase `is-demo` + comentario HTML `<!-- DATOS DE PRUEBA: reemplazar por fuente oficial de cronometraje -->`.
- **Nota de honestidad** bajo el head: "Tabla de demostración con datos ficticios. El tablero oficial se activa después de cada largada."
- **Móvil (≤760 px)**: columnas CLUB y DIF. ocultas; scroll horizontal del board si aún no cabe; POS y TIEMPO siempre visibles.
- **Foot del board**: alinear a `XCO · XCC · CATEGORÍAS` (corrige la inconsistencia actual entre HTML `GENERAL/CATEGORÍAS/TIEMPOS` y el diccionario EN).
- El CSS del empty state (`.results-empty`) se conserva intacto para restaurar el estado "por publicar" quitando solo el bloque `is-demo`.

## 3. Bilingüe y shell

- Ampliar `pageCopy.resultados` (ES/EN): hero completo, tabs, chips, encabezados de tabla, nota demo, head/foot del board. Nombres de corredores no se traducen.
- Corregir en resultados.html: `rel="noopener""` (4 enlaces del footer) y añadir `aria-hidden="true"` a los `<span>↗</span>`.

## 4. Documentación

- `DESIGN.md`: actualizar "Known Replacement Points" (resultados ya no es solo empty state; hero con crossfade) y componentes (Results board con tabla demo).
- `INFORMACION_PENDIENTE.md` §13.4: marcar implementado "diseño de la estructura con estados", dejar pendiente la conexión a cronometraje oficial.

## 5. Verificación (una pasada acotada)

Live Server :5501 — desktop + móvil juntos: crossfade y reduced-motion, tabs XCO/XCC, filtro de chips, toggle ES/EN en todo el copy nuevo, menú móvil, foco visible en tabs/chips, consola limpia, sin CLS en hero, y las otras 5 páginas intactas.
