# Plan de Migración: HTML Estático → Astro + CMS

**Fecha:** 2026-03-15  
**Estado:** Draft  
**Objetivo:** Transformar la maqueta HTML/CSS/JS actual en un proyecto Astro con CMS headless para gestión de contenido bilingüe.

---

## 1. Análisis del Estado Actual

### 1.1 Estructura de Archivos
```
VBKWeb/
├── index.html          # Homepage con hero, countdown, secciones
├── evento.html         # Página de información del evento
├── ruta.html           # Página de ruta y horarios
├── resultados.html     # Página de resultados
├── valdivia.html       # Página sobre Valdivia
├── contacto.html       # Página de contacto
├── styles.css          # Design system completo (211 líneas)
├── script.js           # Interactividad (199 líneas)
└── img/                # Assets de imagen
```

### 1.2 Design System (DESIGN.md)
- **Concepto:** "Trail Control Room" - estética de panel de control de carrera
- **Paleta:**
  - Primary: `#52C7B4` (turquoise)
  - Secondary: `#4C6444` (brand deep)
  - Neutral: `#1A1A1A` (ink), `#F7F7F7` (paper)
- **Tipografía:**
  - Display: Barlow Condensed (headlines, labels)
  - Body: DM Sans (copy, descriptions)
- **Componentes:** Botones cuadrados, tabs de ruta, countdown, boards de resultados
- **Layout:** Grids asimétricos, mobile-first, breakpoints en 760px y 980px

### 1.3 Funcionalidades JavaScript
- **Countdown:** Cuenta regresiva a fecha del evento (10-14 marzo 2027)
- **Language Toggle:** Cambio ES/EN con objeto `translations` y `pageCopy`
- **Route Tabs:** 3 tabs (Salida, Bosque, Meta) con datos de `routeData`
- **Mobile Menu:** Toggle de navegación móvil
- **Header Scroll:** Navbar transparente → sólido al hacer scroll
- **Registration Links:** Validación de URLs de inscripción

### 1.4 Contenido Bilingüe
Actualmente implementado con:
- Objeto `translations` para labels comunes (días, horas, min, seg)
- Objeto `pageCopy` con versiones ES/EN de cada página
- Toggle manual que actualiza DOM con `innerHTML`

### 1.5 Assets de Imagen
- `carrera.avif` - Hero background
- `ruta.avif` - Página de ruta
- `resultados_hombre.avif`, `resultados_mujer.avif` - Sección resultados
- `chile.avif` - Página Valdivia
- `logo cropped.png` - Logo placeholder

---

## 2. Herramientas Disponibles

### 2.1 Skills de OpenCode
| Skill | Ubicación | Relevancia |
|-------|-----------|------------|
| **astro** | `.agents/skills/astro/SKILL.md` | ✅ Crítico - Guía completa de Astro |
| **wordpress-pro** | `.agents/skills/wordpress-pro/SKILL.md` | ⚠️ Útil si se elige WordPress como CMS |
| **frontend-design** | `.agents/skills/frontend-design/SKILL.md` | ✅ Útil para mantener design system |
| **seo-audit** | `.agents/skills/seo-audit/SKILL.md` | ✅ Importante para SEO del sitio |
| **impeccable** | `~/.config/opencode/skills/impeccable/` | ✅ Para refinamiento visual |

### 2.2 Agentes Disponibles
| Agente | Uso en Migración |
|--------|------------------|
| **astro-dev** | Implementación de componentes Astro |
| **software-architect** | Diseño de arquitectura CMS |
| **project-planner** | Planificación de fases |
| **deployer** | Configuración de deployment |
| **clean-code** | Refactorización durante migración |
| **test-writer** | Tests de componentes |

---

## 3. Arquitectura Propuesta

### 3.1 Estructura de Proyecto Astro
```
vbk-web/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── evento.astro          # /evento
│   │   ├── ruta.astro            # /ruta
│   │   ├── resultados.astro      # /resultados
│   │   ├── valdivia.astro        # /valdivia
│   │   ├── contacto.astro        # /contacto
│   │   └── [lang]/               # Rutas i18n
│   │       ├── index.astro
│   │       └── ...
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── MobileMenu.astro
│   │   │   └── LanguageToggle.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Countdown.astro
│   │   │   ├── RouteTabs.astro
│   │   │   ├── Schedule.astro
│   │   │   ├── Results.astro
│   │   │   └── ValdiviaMap.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── RouteMap.astro
│   │       └── StatusStrip.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── content/
│   │   ├── config.ts             # Content collections schema
│   │   ├── pages/
│   │   │   ├── index.es.md
│   │   │   ├── index.en.md
│   │   │   ├── evento.es.md
│   │   │   └── ...
│   │   ├── routes/
│   │   │   ├── salida.md
│   │   │   ├── bosque.md
│   │   │   └── meta.md
│   │   └── schedule/
│   │       └── day-1.md
│   ├── styles/
│   │   ├── global.css            # Migrado de styles.css
│   │   ├── tokens.css            # CSS custom properties
│   │   └── components/
│   │       ├── header.css
│   │       ├── hero.css
│   │       └── ...
│   ├── scripts/
│   │   ├── countdown.ts
│   │   ├── language-toggle.ts
│   │   ├── route-tabs.ts
│   │   └── header-scroll.ts
│   ├── lib/
│   │   ├── i18n.ts               # Utilidades de traducción
│   │   ├── cms.ts                # Cliente CMS (si aplica)
│   │   └── utils.ts
│   └── assets/
│       └── img/                  # Migrado de /img
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── .env                          # API keys del CMS
```

### 3.2 Content Collections Schema
```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    heroTitle: z.string(),
    heroIntro: z.string(),
    eventDate: z.string().optional(),
    registrationUrl: z.string().url().optional(),
  }),
});

const routesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    index: z.string(), // "01 / 03"
    title: z.string(),
    description: z.string(),
    distance: z.string(),
    elevation: z.string(),
    time: z.string(),
    gpxFile: z.string().optional(),
  }),
});

const scheduleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    time: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

export const collections = {
  'pages': pagesCollection,
  'routes': routesCollection,
  'schedule': scheduleCollection,
};
```

---

## 4. Estrategia de CMS

### 4.1 Opciones Evaluadas

#### Opción A: Astro Content Collections (Markdown/MDX)
**Pros:**
- ✅ Zero config, integrado nativamente
- ✅ Git-based, versionado con el código
- ✅ Gratis, sin dependencias externas
- ✅ TypeScript schemas para validación
- ✅ Rápido (build-time)

**Contras:**
- ❌ Requiere conocimiento técnico para editar
- ❌ No hay UI de administración
- ❌ Difficult para editores no técnicos

**Recomendado para:** Equipo técnico, contenido estable

#### Opción B: WordPress Headless (REST API)
**Pros:**
- ✅ UI de administración familiar
- ✅ Editor WYSIWYG robusto
- ✅ Gestión de medios integrada
- ✅ Plugins para i18n (WPML, Polylang)
- ✅ Skill `wordpress-pro` disponible

**Contras:**
- ❌ Requiere hosting adicional (WordPress)
- ❌ API REST puede ser lenta
- ❌ Complejidad de mantenimiento

**Recomendado para:** Equipo no técnico, contenido frecuente

#### Opción C: Sanity.io
**Pros:**
- ✅ Studio personalizable
- ✅ Real-time updates
- ✅ Excelente para contenido estructurado
- ✅ i18n nativo
- ✅ Free tier generoso

**Contras:**
- ❌ Dependencia de servicio externo
- ❌ Curva de aprendizaje del schema

**Recomendado para:** Contenido dinámico, múltiples editores

#### Opción D: Strapi
**Pros:**
- ✅ Self-hosted, control total
- ✅ UI administrativa completa
- ✅ i18n plugin oficial
- ✅ REST + GraphQL

**Contras:**
- ❌ Requiere hosting y mantenimiento
- ❌ Setup más complejo

**Recomendado para:** Control total, infraestructura propia

### 4.2 Recomendación

**Fase 1 (MVP):** Astro Content Collections con Markdown
- Migrar contenido actual a MDX
- Mantener estructura bilingüe
- Validar arquitectura

**Fase 2 (Post-MVP):** Evaluar CMS headless según necesidades
- Si el equipo es técnico → mantener Content Collections
- Si hay editores no técnicos → migrar a Sanity o WordPress headless

---

## 5. Estrategia de Internacionalización (i18n)

### 5.1 Enfoque Propuesto
```typescript
// src/lib/i18n.ts
export const locales = ['es', 'en'];
export const defaultLocale = 'es';

export function getLocalizedUrl(path: string, locale: string) {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}

export function useTranslations(locale: string) {
  return async (key: string) => {
    const translations = await import(`../locales/${locale}.json`);
    return translations[key] || key;
  };
}
```

### 5.2 Estructura de Contenido
```
src/content/pages/
├── index.es.md
├── index.en.md
├── evento.es.md
├── evento.en.md
└── ...
```

### 5.3 Routing
```typescript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

### 5.4 Language Toggle Component
```astro
---
// src/components/LanguageToggle.astro
const { currentLocale, availableLocales } = Astro.props;
---
<div class="language-toggle">
  {availableLocales.map(locale => (
    <a 
      href={getLocalizedUrl(Astro.url.pathname, locale)}
      class:list={[{ active: locale === currentLocale }]}
    >
      {locale.toUpperCase()}
    </a>
  ))}
</div>
```

---

## 6. Fases de Migración

### Fase 1: Setup y Estructura Base (Semana 1)
**Objetivo:** Proyecto Astro funcional con design system migrado

**Tareas:**
- [ ] Inicializar proyecto Astro con `npm create astro@latest`
- [ ] Configurar TypeScript y ESLint
- [ ] Migrar `styles.css` a `src/styles/`
- [ ] Crear `BaseLayout.astro` con header/footer
- [ ] Migrar componentes de layout (Header, Footer, MobileMenu)
- [ ] Configurar i18n básico
- [ ] Setup de content collections

**Entregables:**
- Proyecto Astro corriendo con `npm run dev`
- Layout base con navegación funcional
- Design system preservado visualmente

### Fase 2: Migración de Páginas (Semana 2)
**Objetivo:** Todas las páginas migradas a Astro

**Tareas:**
- [ ] Migrar `index.html` → `index.astro`
  - Hero section con background image
  - Countdown component
  - Route tabs interactivos
  - Schedule section
  - Results section
  - Valdivia section
  - Final CTA
- [ ] Migrar páginas internas (evento, ruta, resultados, valdivia, contacto)
- [ ] Migrar scripts JS a TypeScript
- [ ] Implementar LanguageToggle funcional
- [ ] Migrar contenido a MDX (ES/EN)

**Entregables:**
- Todas las páginas funcionales
- Language toggle ES/EN operativo
- Countdown funcionando con fecha del evento

### Fase 3: Componentes Interactivos (Semana 3)
**Objetivo:** Interactividad completa

**Tareas:**
- [ ] Countdown component con fecha del CMS
- [ ] Route tabs con datos de content collection
- [ ] Mobile menu con accesibilidad
- [ ] Header scroll effect
- [ ] Registration links con validación
- [ ] Toast notifications

**Entregables:**
- Todas las interacciones funcionando
- Accesibilidad verificada (keyboard navigation, ARIA)
- Performance optimizada

### Fase 4: CMS Integration (Semana 4)
**Objetivo:** Contenido gestionable desde CMS

**Tareas:**
- [ ] Definir schema de content collections
- [ ] Migrar contenido actual a MDX
- [ ] Crear interfaces de edición (si aplica)
- [ ] Testing de flujos de edición
- [ ] Documentación para editores

**Entregables:**
- Contenido editable sin tocar código
- Validación de schemas
- Documentación de uso

### Fase 5: SEO y Performance (Semana 5)
**Objetivo:** Optimización para producción

**Tareas:**
- [ ] Meta tags y Open Graph
- [ ] Sitemap generation
- [ ] Robots.txt
- [ ] Image optimization (Astro Image)
- [ ] Lighthouse audit (>90 en todas las métricas)
- [ ] Schema.org structured data
- [ ] Social media cards

**Entregables:**
- SEO audit aprobado
- Performance score >90
- Social sharing optimizado

### Fase 6: Deployment (Semana 6)
**Objetivo:** Sitio en producción

**Tareas:**
- [ ] Configurar adapter (Vercel/Netlify/Cloudflare)
- [ ] Environment variables
- [ ] CI/CD pipeline
- [ ] Domain configuration
- [ ] SSL certificate
- [ ] Monitoring setup

**Entregables:**
- Sitio live en producción
- Deploy automático en push
- Monitoring activo

---

## 7. Consideraciones Técnicas

### 7.1 Preservación del Design System
- Migrar CSS custom properties a `tokens.css`
- Mantener breakpoints (760px, 980px)
- Preservar animaciones y transiciones
- Mantener accesibilidad (focus states, reduced motion)

### 7.2 Performance
- Usar `<Image />` de Astro para optimización automática
- Lazy loading de imágenes below-the-fold
- Code splitting por ruta
- Prefetch de páginas críticas

### 7.3 SEO
- Meta tags dinámicos desde frontmatter
- Canonical URLs
- Hreflang tags para i18n
- Sitemap automático
- Schema.org para SportsEvent

### 7.4 Accesibilidad
- Semantic HTML preservado
- ARIA labels en componentes interactivos
- Keyboard navigation
- Reduced motion support
- Color contrast WCAG AA

### 7.5 Testing
- Component tests (Vitest)
- E2E tests (Playwright)
- Visual regression tests
- Accessibility audits (axe-core)

---

## 8. Riesgos y Mitigaciones

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Pérdida de design system | Alto | Media | Migración incremental, validación visual |
| Complejidad de i18n | Medio | Alta | Empezar con content collections, evaluar CMS después |
| Performance degradation | Medio | Baja | Astro es optimizado por defecto, monitorear |
| CMS lock-in | Alto | Media | Abstraer capa de CMS, usar interfaces |
| Contenido desactualizado | Medio | Alta | Documentar procesos de edición |

---

## 9. Métricas de Éxito

### Técnico
- ✅ Lighthouse score >90 en todas las categorías
- ✅ Core Web Vitals en verde
- ✅ 0 errores de accesibilidad
- ✅ Build time <30s
- ✅ Bundle size <200KB (gzipped)

### Funcional
- ✅ Todas las páginas migradas
- ✅ Language toggle funcional
- ✅ Countdown operativo
- ✅ Route tabs interactivos
- ✅ Contenido editable desde CMS

### Negocio
- ✅ Tiempo de edición <5min para cambios de contenido
- ✅ Deploy automático <2min
- ✅ 0 downtime durante migración

---

## 10. Próximos Pasos

1. **Decisión de CMS:** Evaluar opciones con el equipo
2. **Setup inicial:** Crear proyecto Astro base
3. **Migración incremental:** Empezar con homepage
4. **Validación:** Comparar visualmente con HTML actual
5. **Iteración:** Migrar páginas restantes

---

## 11. Recursos

### Documentación
- [Astro Docs](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [i18n Guide](https://docs.astro.build/en/guides/internationalization/)

### Skills de OpenCode
- `astro` - Guía completa de Astro
- `frontend-design` - Design system
- `seo-audit` - Optimización SEO

### Herramientas
- Astro CLI: `npm create astro@latest`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

---

**Autor:** AI Assistant  
**Revisado por:** [Pendiente]  
**Aprobado por:** [Pendiente]
