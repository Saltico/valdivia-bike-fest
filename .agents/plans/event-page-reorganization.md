# Plan de Reorganización: evento.html (Institucional) + ruta.html (Operativo)

## Resumen Ejecutivo

Reorganizar el contenido actual separando la información en dos páginas con responsabilidades distintas:

- **`evento.html`** → Página institucional tipo "Nosotros": identidad, propósito, visión, comunidad, organizadores, historia
- **`ruta.html`** → Página operativa de la edición actual: programa, circuitos, categorías, congreso técnico, inscripción

---

## 1. Separación de Responsabilidades

### evento.html — "¿Qué es Valdivia Bike Fest?"

**Propósito:** Comunicar la identidad, el propósito y el valor del evento. Responder preguntas como:
- ¿Qué es Valdivia Bike Fest?
- ¿Por qué existe?
- ¿Qué lo hace único?
- ¿Quiénes lo organizan?
- ¿Cuál es su relación con Valdivia?

**Carácter:** Editorial, narrativo, institucional. Enfocado en construir la marca y el significado del evento.

### ruta.html — "Todo sobre la edición 2027"

**Propósito:** Presentar la información práctica y operativa de la edición actual. Responder:
- ¿Cuándo es?
- ¿Qué actividades hay?
- ¿Cuáles son los circuitos?
- ¿En qué categorías puedo participar?
- ¿Cómo me inscribo?

**Carácter:** Operativo, escaneable, basado en datos. Enfocado en la acción y la toma de decisiones del participante.

---

## 2. Arquitectura de Contenido

### A. evento.html (Institucional)

```
1. HERO
   - Imagen: carrera.avif (atmósfera del evento)
   - Kicker: "Valdivia Bike Fest / El evento"
   - H1: "La carrera empieza antes."
   - Lead: Propuesta de valor del evento (no datos operativos)

2. ¿QUÉ ES VALDIVIA BIKE FEST?
   - Definición institucional
   - Carácter internacional (American Continental Series, puntos UCI)
   - Relación con el mountain bike chileno

3. PROPÓSITO Y VISIÓN
   - Por qué existe el evento
   - Qué busca lograr
   - Desarrollo del mountain bike en Chile
   - Oportunidades para atletas

4. CARÁCTER INTERNACIONAL
   - Fecha del calendario continental
   - Participación de referentes mundiales
   - Primera fecha selectiva para Selección Nacional
   - Puntos para ranking UCI

5. COMUNIDAD Y PARTICIPACIÓN
   - Ambiente familiar e inclusivo
   - Categorías para todos los niveles
   - Comunidad de riders, familias y seguidores

6. VALDIVIA Y EL ENTORNO
   - Identidad territorial
   - Bosque valdiviano, ríos, naturaleza
   - Experiencia de correr en el sur de Chile
   - Link a página valdivia.html

7. ORGANIZADORES
   - MVK Sports + Club Ciclismo Ríos Cruces
   - Fiscalización: Fedenacich + COPACI
   - Colaboradores (si hay)

8. HISTORIA
   - Ediciones anteriores (2025, 2026)
   - Campeones destacados
   - Trayectoria del evento

9. CTA FINAL
   - "Conoce la edición 2027" → link a ruta.html
   - "Inscríbete" → Eventrid
```

### B. ruta.html (Operativo)

```
1. HERO
   - Imagen: ruta.avif
   - Kicker: "Valdivia Bike Fest / Edición 2027"
   - H1: "Dos circuitos. Una sede."
   - Lead: Datos clave de la edición

2. DATOS CLAVE (Data Board)
   - Fecha: 10–14 marzo 2027
   - Sede: C.D. ASENAV, Valdivia
   - Formatos: XCO + XCC
   - Primera actividad: Mié 10 mar, 09:00
   - Puntos UCI: Suma al ranking mundial
   - CTA: Inscríbete

3. PROGRAMA POR DÍA (Timeline)
   - Mié 10: Retiro de kits (confirmado)
   - Jue 11: Congreso técnico
   - Vie 12: Competencias
   - Sáb 13: Competencias
   - Dom 14: Largadas finales + premiación

4. CIRCUITOS XCO / XCC
   - Cards con métricas (distancia, desnivel, abastecimiento/duración)
   - Descripción de cada formato
   - Nota: horarios en congreso técnico

5. CONGRESO TÉCNICO
   - Panel informativo
   - Qué es, qué se define
   - Estado: por confirmar

6. CATEGORÍAS
   - Grid de 4 grupos (UCI, Master, Abiertas, Menores)
   - Nota: sujeto a confirmación

7. INSCRIPCIÓN
   - CTA prominente a Eventrid
   - Nota: precios/cupos por confirmar

8. SEDE
   - Complejo Deportivo ASENAV
   - Dirección, contexto
   - Link a contacto/mapa
```

---

## 3. Diseño Visual

### Tokens a Mantener (del DESIGN.md)

**Colores:**
- `--ink`: #1A1A1A (fondo principal)
- `--ink-soft`: #4C6444 (acento profundo)
- `--paper`: #F7F7F7 (texto principal)
- `--paper-dim`: #c8d5ce (texto secundario)
- `--turquoise`: #52C7B4 (acento/CTA)
- `--line`: rgba(247,247,247,.2) (bordes)

**Tipografía:**
- Display: Barlow Condensed (títulos, uppercase)
- Body: DM Sans (texto corrido)
- Labels: Barlow Condensed 600, .65rem-.75rem, letter-spacing .1em-.14em

**Geometría:**
- Bordes 1px, sin border-radius
- Grid layouts asimétricos
- Padding generoso: clamp(4rem, 8vw, 6rem)

### Adaptaciones por Página

**evento.html (Institucional):**
- Enfoque editorial: más espacio para texto narrativo
- Secciones con bloques de texto + imágenes opcionales
- Uso de `detail-list` para puntos clave
- Cards de historia con diseño tipo "timeline"
- Menos grids de datos, más flujo narrativo

**ruta.html (Operativo):**
- Enfoque operativo: data boards, tablas, métricas
- Reutilizar `circuit-card`, `event-data-grid`, `event-schedule-list`
- Estados visuales (confirmado/pendiente)
- CTAs prominentes
- Más grids y estructuras tabulares

---

## 4. Plan de Implementación

### Fase 1: Preparar evento.html (Institucional)

**Acción:** Reescribir `evento.html` con contenido institucional basado en las fuentes.

**Secciones a implementar:**
1. Hero (mantener estructura actual, ajustar copy)
2. "¿Qué es?" — Bloque de texto introductorio
3. "Propósito y visión" — Narrativa del evento
4. "Carácter internacional" — Datos de UCI, American Series, selectivo nacional
5. "Comunidad" — Participación familiar, categorías abiertas
6. "Valdivia y el entorno" — Identidad territorial + link a valdivia.html
7. "Organizadores" — MVK Sports, Ríos Cruces, Fedenacich, COPACI
8. "Historia" — Ediciones 2025/2026 con campeones
9. CTA final → ruta.html + Eventrid

**CSS nuevo:**
- Estilos para bloques de texto editorial
- Cards de historia (reutilizar `.history-card`)
- Bloques de organizadores (reutilizar `.organizer-block`)
- Sección "Valdivia" con link destacado

### Fase 2: Preparar ruta.html (Operativo)

**Acción:** Reescribir `ruta.html` moviendo el contenido operativo desde evento.html actual.

**Secciones a implementar:**
1. Hero (mantener estructura actual)
2. Data board (mover desde evento.html)
3. Programa por día (timeline)
4. Circuitos XCO/XCC (ya existe, mantener)
5. Congreso técnico (panel)
6. Categorías (grid)
7. Inscripción (CTA)
8. Sede (info básica)

**CSS a reutilizar:**
- `.event-data-section`, `.event-data-grid`
- `.event-schedule-section`, `.event-schedule-list`
- `.circuit-card` (ya existe)
- `.event-congress-section`
- `.event-categories-section`
- `.event-registration-section`

### Fase 3: Actualizar Traducciones (script.js)

**Acción:** Expandir `pageCopy.evento` y `pageCopy.ruta` con todas las nuevas secciones.

**Para evento.html:**
- Textos institucionales (propósito, visión, comunidad, Valdivia)
- Nombres de secciones

**Para ruta.html:**
- Mover traducciones de secciones operativas desde evento
- Añadir nuevas si es necesario

### Fase 4: Ajustar Navegación y Links Internos

**Acción:** Verificar que los links entre páginas sean coherentes.

- Homepage → evento.html: "Conoce el evento" (institucional)
- Homepage → ruta.html: "Ver ruta y horario" (operativo)
- evento.html → ruta.html: "Conoce la edición 2027"
- ruta.html → evento.html: "¿Qué es VBF?" (en footer o sección)

### Fase 5: Verificación

**Checklist:**
- [ ] HTML semántico correcto
- [ ] CSS válido, sin conflictos
- [ ] JavaScript sin errores
- [ ] Traducciones ES/EN completas
- [ ] Links internos funcionan
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accesibilidad (aria-labels, contraste, semántica)
- [ ] SEO (meta descriptions, headings jerárquicos)
- [ ] Detector de impeccable sin errores críticos

---

## 5. Contenido Institucional para evento.html

Basándome en las fuentes investigadas, el contenido institucional debe incluir:

### ¿Qué es Valdivia Bike Fest?

> Valdivia Bike Fest es una competencia internacional de mountain bike que se realiza en Valdivia, Región de Los Ríos, Chile. Organizada como fecha del American Continental Series MTB, el evento reúne a referentes del cross-country continental y ofrece una experiencia competitiva de alto nivel en uno de los entornos naturales más distintivos del sur de Chile.

### Carácter Internacional

- Fecha del calendario **American Continental Series MTB**
- Competencias con puntaje para el **ranking mundial UCI**
- Participación de referentes internacionales (campeones sudamericanos, panamericanos, medallistas olímpicos)
- **Primera fecha selectiva** para la Selección Nacional de Chile

### Propósito y Visión

- Promover el desarrollo del mountain bike en Chile
- Generar oportunidades para atletas de distintos niveles
- Combinar competencia de alto rendimiento con participación comunitaria
- Posicionar a Valdivia como destino de eventos deportivos internacionales

### Comunidad y Participación

- Ambiente familiar e inclusivo
- Categorías para todos los niveles: Elite, Sub23, Junior, Master, menores, promocional
- Short Track Open abierto a todos los deportistas
- Comunidad de riders, familias y seguidores que comparten la experiencia

### Valdivia y el Entorno

- Identidad territorial fuerte: bosque valdiviano, ríos, naturaleza del sur de Chile
- Experiencia única de competir en un entorno natural privilegiado
- Conexión entre deporte, naturaleza y comunidad local
- Link a página `valdivia.html` para información turística

### Organizadores

- **MVK Sports** + **Club Ciclismo Ríos Cruces** (organizadores)
- **Fedenacich** — Federación de Ciclismo de Chile (fiscalización)
- **COPACI** — Confederación Panamericana de Ciclismo (respaldo internacional)

### Historia

**2026 — Segunda edición**
- Campeón absoluto: Martín Vidaurre (CHI) — 4 victorias UCI
- Campeona femenina: Haley Batten (USA) — medallista olímpica París 2024
- Fecha inaugural del American Continental Series MTB
- Primera fecha selectiva para Selección Nacional Chile

**2025 — Primera edición**
- Datos por confirmar

---

## 6. Entregables

Al completar el plan, se tendrá:

1. **`evento.html`** reescrito con contenido institucional completo
2. **`ruta.html`** reescrito con contenido operativo completo
3. **`styles.css`** con ajustes mínimos (reutilización de componentes existentes)
4. **`script.js`** con traducciones ES/EN expandidas
5. **Navegación interna** coherente entre páginas
6. **Verificación** completa (HTML, CSS, JS, responsive, accesibilidad)

---

## 7. Criterios de Éxito

- El visitante entiende **qué es Valdivia Bike Fest** y **por qué importa** al leer `evento.html`
- El participante encuentra **toda la información práctica** de la edición en `ruta.html`
- No hay duplicación de contenido entre páginas
- El diseño mantiene la coherencia visual del sistema "Trail Control Room"
- La experiencia es responsiva y accesible
- Las traducciones ES/EN están completas

---

## 8. Fuentes de Información

Contenido basado en investigación de:

1. **Fedenacich** — Federación de Ciclismo de Chile
2. **TusDesafios** — Calendario de carreras
3. **Bicineta** — Portal de eventos de ciclismo
4. **BioBioChile** — Cobertura periodística del evento 2026

Todos los datos institucionales verificados contra estas fuentes. No se han inventado hechos ni afirmaciones sin respaldo.

---

## 9. Notas Técnicas

### Reutilización de Componentes

El plan maximiza la reutilización de componentes CSS existentes:

- **Circuit cards** (`.circuit-card`, `.circuit-metrics`, etc.) — ya implementados en ruta.html
- **Data board** (`.event-data-grid`, `.event-data-item`) — implementados en evento.html
- **Schedule list** (`.event-schedule-list`, `.event-schedule-row`) — implementados en evento.html
- **Categories grid** (`.event-categories-grid`, `.category-group`) — implementados en evento.html
- **Congress panel** (`.event-congress-panel`) — implementado en evento.html
- **History cards** (`.history-card`, `.history-champion`) — implementados en evento.html
- **Organizers** (`.event-organizers-grid`, `.organizer-block`) — implementados en evento.html

### Consideraciones de Rendimiento

- Mantener imágenes optimizadas (formato AVIF)
- Lazy loading para imágenes below-the-fold
- CSS crítico inline (si aplica)
- JavaScript mínimo (solo para toggle de idioma y menú móvil)

### Consideraciones de Accesibilidad

- Estructura semántica HTML5 (section, article, nav, main, footer)
- Atributos ARIA donde corresponda
- Contraste de colores WCAG AA
- Navegación por teclado
- Textos alternativos para imágenes

---

**Estado del plan:** Listo para implementación
**Fecha de creación:** 2026-02-11
**Autor:** Plan generado con asistencia de IA y revisión humana
