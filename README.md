# Valdivia Bike Fest

Sitio web oficial de Valdivia Bike Fest - Competencia de mountain bike en Valdivia, Chile.

## 🏁 Estado del Proyecto

Este es un prototipo HTML/CSS/JS estático. La migración a Astro + CMS está planificada en `.agents/plans/astro-cms-migration.md`.

## 🚀 Deploy Automático

Este proyecto usa GitHub Actions para deploy automático a GitHub Pages.

### Workflows Configurados

#### 1. Deploy a GitHub Pages (`deploy.yml`)
- **Trigger**: Push a `main` o `master`
- **Acción**: Deploya el sitio estático a GitHub Pages
- **URL**: Se habilitará en Settings > Pages después del primer deploy

#### 2. Validación (`validate.yml`)
- **Trigger**: Push y Pull Requests a `main` o `master`
- **Acción**: Valida HTML y verifica enlaces internos
- **Propósito**: Asegura que los cambios no rompan el sitio

### Habilitar GitHub Pages

Después del primer push a GitHub:

1. Ve a **Settings** > **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. El sitio se deployará automáticamente en cada push

## 🔒 Seguridad y Permisos

Los workflows están configurados con permisos mínimos:
- `contents: read` - Solo lectura del código
- `pages: write` - Escritura en GitHub Pages (solo deploy)
- `id-token: write` - Autenticación OIDC

**Importante**: Estos workflows solo afectan este repositorio específico.

## 📁 Estructura del Proyecto

```
VBKWeb/
├── index.html          # Homepage
├── evento.html         # Información del evento
├── ruta.html           # Ruta y horarios
├── resultados.html     # Resultados
├── valdivia.html       # Sobre Valdivia
├── contacto.html       # Contacto
├── styles.css          # Design system completo
├── script.js           # Interactividad
└── img/                # Assets de imagen
```

## 🛠️ Desarrollo Local

1. Abre `index.html` en tu navegador, o
2. Usa Live Server en VS Code (puerto 5501)

## 📋 Información Pendiente

Revisa `INFORMACION_PENDIENTE.md` para ver qué datos faltan por confirmar antes de publicar.

## 🤖 OpenCode Integration

Este proyecto está configurado para usar OpenCode con:
- **Agentes**: `.opencode/agents/` y `.agents/agents/`
- **Skills**: `.agents/skills/`
- **Planes**: `.agents/plans/`
- **Instrucciones**: `AGENTS.md`

## 📄 Licencia

Todos los derechos reservados © Valdivia Bike Fest
