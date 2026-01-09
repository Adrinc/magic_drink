# Portafolio Abraham Domínguez - Copilot Instructions

## Contexto del Proyecto

Este es un **portafolio web personal** para Abraham Domínguez (Creative Full-Stack Engineer / Technical Artist). El proyecto está construido sobre la base de "NetHive", adaptándose para mostrar:
- Perfil profesional híbrido (código + 3D + música + IA)
- Proyectos destacados (Botia, NetHive, Taller Alex, sitios web)
- Habilidades técnicas y creativas
- Timeline de experiencia
- Case studies interactivos

**Objetivo**: Crear un portafolio **impresionante y profesional** que demuestre capacidad técnica avanzada.

## Arquitectura del Proyecto

### Stack Principal
- **Framework**: Astro 5.x con integración de React 18
- **Estilos**: Tailwind CSS + CSS Modules (`.module.css`)
- **Internacionalización**: Sistema custom con nanostores (NO usar astro:i18n)
- **Animaciones**: GSAP + Lenis + Framer Motion + Rive + React Three Fiber
- **Estado**: Nanostores para estado global compartido entre Astro y React

### Estructura Clave
```
src/
├── pages/          # Rutas Astro (index, contacto, 404) - lowercase
├── layouts/        # LayoutBasic.astro (principal), Layout.astro
├── components/
│   ├── index/      # 8 secciones portafolio (IndexSeccion1-8.jsx)
│   │   ├── Secciones/     # Componentes React (PascalCase)
│   │   └── css/           # CSS Modules (camelCase)
│   ├── react_components/  # NavBar, FormContacto (componentes globales)
│   └── global/     # Footer, animaciones compartidas
├── data/
│   ├── translations.js  # Diccionario es/en (~1200 líneas)
│   ├── signals.jsx      # LangContext con localStorage
│   └── variables.js     # Nanostores atoms (isEnglish, selectedCountry)
└── public/
    ├── fonts/      # Inter, OpenSans, Catamaran, OldPress
    ├── image/      # Assets organizados por carpetas
    ├── models/     # Modelos 3D para Three.js
    └── rive/       # Animaciones .riv
```

## Patrones Específicos del Proyecto

### 1. Internacionalización (i18n)
**NO uses `astro:i18n`**. El proyecto usa un sistema custom:

```jsx
// En componentes React
import { useLang } from '../../data/signals';
const { t, changeLang, lang } = useLang();
// Usar: t.navbar.inicio, t.home.soluciones.solutionsTitle

// Nanostores para componentes Astro
import { isEnglish } from '../../data/variables';
import { useStore } from '@nanostores/react';
const ingles = useStore(isEnglish);
```

- **Traducción**: Editar `src/data/translations.js` (estructura anidada es/en)
- **Persistencia**: Lang guardado en `localStorage` vía `signals.jsx`
- **Patrón**: Todos los textos UI vienen de `translations.js`, NO hardcodear strings

### 2. CSS Modules + Tailwind
**Convención estricta**: CSS Modules para componentes, Tailwind para utilidades

```jsx
import styles from './componentName.module.css';
// Usar: className={styles.container}, NO className="container"
```

- **Demo section**: Todos los estilos en `src/components/demo/css/`
- **Index sections**: `src/components/index/css/indexSeccionN.module.css`
- Tailwind solo para spacing/grid/flex, NO para componentes complejos

### 3. Integración Astro-React
**Patrón crítico**: Componentes React requieren directivas específicas

```astro
<!-- SIEMPRE incluir client:only para interactividad -->
<IndexSeccion1 transition:persist client:only/>
<RouterLinks transition:persist client:only />

<!-- transition:persist mantiene estado en navegación -->
<LangWrapper transition:persist client:only>
```

- `client:only`: Hidratar solo en cliente (para nanostores)
- `transition:persist`: Mantener estado entre page transitions
- **NO omitir** estas directivas o perderás estado/interactividad

### 4. Arquitectura de Páginas Astro
**Patrón crítico**: Las páginas `.astro` son contenedores que importan secciones React:

```astro
---
import LayoutBasic from '../layouts/LayoutBasic.astro';
import IndexSeccion1 from '../components/index/Secciones/IndexSeccion1.jsx';
---

<LayoutBasic title="Título SEO">
  <IndexSeccion1 transition:persist client:only/>
  <IndexSeccion2 transition:persist client:only/>
  {/* ... más secciones */}
</LayoutBasic>
```

**Flujo de datos**: Página Astro → Layout → Secciones React → CSS Modules

### 5. Assets y Recursos
```
public/
├── fonts/          # Inter, OpenSans, Catamaran, OldPress (preload en Layout)
├── image/          # backgrounds/, companies/, logos/, testimonials/
├── rive/           # 404.riv para animaciones
└── models/         # Modelos 3D (React Three Fiber)
```

**Importante**: Referencias en CSS como `url('/fonts/Inter.ttf')` (root relativo)

## Comandos de Desarrollo

```bash
npm run dev      # Dev server localhost:4321
npm run build    # astro check && astro build
npm run preview  # Preview build localmente
```

**NO ejecutar** `astro add` sin confirmar - integraciones ya configuradas

## Convenciones de Código

### Estructura de Componentes React
```jsx
// 1. Imports: React → third-party → local data → estilos
import React, { useState } from "react";
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../data/variables';
import styles from './component.module.css';

// 2. Component con useState primero
const Component = () => {
  const ingles = useStore(isEnglish);
  const [state, setState] = useState();
  
  // 3. useEffect después de state
  useEffect(() => { ... }, []);
  
  return <div className={styles.container}>...</div>;
};
```

### Nomenclatura
- **Componentes React**: PascalCase (`DemoInteractivo.jsx`)
- *Librerías de Animación y UI

### Lenis (Smooth Scroll) - CRÍTICO
```jsx
// Inicializar en Layout.astro o componente wrapper global
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### Framer Motion (Animaciones React)
```jsx
impPaleta de Colores del Portafolio

### Opción Principal: "Midnight Studio"
```css
:root {
  --primary-color: #0A0E27;      /* Azul oscuro profundo */
  --secondary-color: #6366F1;    /* Índigo vibrante */
  --accent-creative: #EC4899;    /* Rosa magenta - creatividad */
  --accent-tech: #8B5CF6;        /* Violeta - tech/IA */
  --text-primary: #F8FAFC;       /* Blanco suave */
  --text-secondary: #64748B;     /* Gris medio */
}
```Instalación de Nuevas Librerías (Roadmap)

```bash
# Animaciones esenciales
npm install @studio-freight/lenis framer-motion

# Efectos visuales
npm install react-parallax-tilt lucide-react

# Partículas (opcional)
npm install @tsparticles/react @tsparticles/slim
```estructura anidada es/en)
- **Nueva sección portafolio**: Copiar patrón `IndexSeccionN.jsx` + CSS module correspondiente
- **Modificar sección existente**: Componente en `src/components/index/Secciones/`, estilos en `src/components/index/css/`
- **Variables CSS globales**: Editar `:root` en `src/layouts/LayoutBasic.astro`
- **Cambiar colores**: Actualizar variables CSS en LayoutBasic (NO hardcodear en componentes)
- **Assets**: Todo en `public/` con referencias root-relative: `url('/fonts/Inter.ttf')`

## Perfil del Proyecto

**Desarrollador**: Abraham Domínguez  
**Rol**: Creative Full-Stack Engineer / Technical Artist  
**Stack único**: Código + 3D + Música + IA + Diseño  
**Objetivo**: Portafolio que demuestre versatilidad extrema y capacidad técnica avanzada
### Críticos (Rompen funcionalidad)
- ❌ **NO olvidar** `client:only` en componentes React con nanostores
- ❌ **NO omitir** `transition:persist` si el componente mantiene estado
- ❌ **NO usar** `className="text-blue-500"` en componentes con CSS modules
- ❌ **NO crear** archivos `.css` comunes - usar `.module.css` SIEMPRE
- ❌ **NO modificar** `astro.config.mjs` sin verificar builds

### Mejores Prácticas
- ❌ No hardcodear textos - siempre desde `translations.js`
- ❌ No mezclar español/inglés en código - UI bilingüe, code en inglés
- ❌ No usar Tailwind para componentes complejos - solo utilidades (spacing, grid)
- ❌ No ignorar el orden de imports: React → third-party → local → estilos
- ❌ No crear routes Astro adicionales sin necesidad - mantener estructura simples animados + iconos
3. **IndexSeccion3** - Proyectos Destacados ("The Lab") - Bento Grid + Tilt cards
4. **IndexSeccion4** - Tech Stack ("The Arsenal") - Skills animados + Marquee
5. **IndexSeccion5** - Case Studies ("Deep Dive") - Tabs interactivos + code snippets
6. **IndexSeccion6** - Creative Side ("Beyond Code") - Galería multimedia + audio player
7. **IndexSeccion7** - Timeline ("The Journey") - Línea temporal interactiva
8. **IndexSeccion8** - Contacto ("Let's Create") - Formulario + CTA emocional

## Notas de Implementación

1. **Pages Astro**: SIEMPRE usan `LayoutBasic.astro` como wrapper principal
2. **Secciones React**: Todas llevan `transition:persist client:only` en la página Astro
3. **Forms**: `FormContacto.jsx` usa Nodemailer (configuración en `variables.js`)
4. **Responsive**: Breakpoints en CSS modules (NO Tailwind para layout complejo), mobile-first
5. **Fonts**: Todas con `font-display: swap` (performance)
6. **View Transitions**: Configuradas en `LayoutBasic.astro` con animaciones custom
>
  <ProjectCard />
</motion.div>

// Stagger para listas
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

### GSAP + ScrollTrigger
```jsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Parallax y animaciones por scroll
gsap.to('.element', {
  y: 200,
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});
```

### React Three Fiber + Drei
```jsx
// Para visualizaciones 3D (modelos en public/models/)
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
```

### React Tilt (Efecto 3D en Cards)
```jsx
import Tilt from 'react-parallax-tilt';

<Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
  <ProjectCard />
</Tilt>
```

### Rive Animations
```jsx
import { useRive } from '@rive-app/react-canvas';
// Archivos .riv en public/rive/
```

### Lucide Icons
```jsx
import { Code2, Palette, Music, Brain } from 'lucide-react';
// Usar con Framer Motion para animaciones de iconos
### Rive Animations
```jsx
import { useRive } from '@rive-app/react-canvas';
// Archivos .riv en public/rive/
```

## Notas de Implementación

1. **Pages Astro**: Siempre usan `LayoutBasic` o `Layout` wrapper
2. **Client-side routing**: React Router en componentes, Astro routing para pages
3. **Forms**: `FormContacto.jsx` usa Nodemailer backend (ver variables.js para config)
4. **Responsive**: Breakpoints en CSS modules (no Tailwind), mobile-first
5. **Fonts**: Todas con `font-display: swap` (performance)

## Errores Comunes a Evitar

- ❌ No usar `className="text-blue-500"` en componentes con CSS modules
- ❌ No olvidar `client:only` en componentes React con nanostores
- ❌ No mezclar español/inglés en código - UI bilingüe, code en inglés
- ❌ No hardcodear textos - siempre desde `translations.js`
- ❌ No crear archivos `.css` comunes - usar `.module.css` obligatorio
- ❌ No modificar `astro.config.mjs` sin verificar builds

## Referencias Rápidas

- **Añadir traducción**: Editar `src/data/translations.js` (ambos idiomas)
- **Nueva sección index**: Copiar patrón `IndexSeccionN.jsx` + CSS module
- **Modificar demo**: Estado en `DemoInteractivo.jsx`, pasar como props
- **Estilos globales**: `src/layouts/Layout.astro` (CSS variables en `:root`)
