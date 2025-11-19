# Instrucciones Copilot - Energy Media

## Descripción General del Proyecto
Esta es una aplicación web híbrida **Astro + React** para "Energy Media" - **agencia digital full-service** especializada en marketing digital, branding, desarrollo web/apps y servicios de IA. El sitio es bilingüe (ES/EN) con enfoque en resultados medibles, tecnología de punta y estrategias escalables para empresas B2B y B2C.

### Pilares de Servicio (5 Core)
1. **Marketing Digital Integral** - SEO, SEM, Social Ads, Email Marketing, Influencers
2. **Branding & Identidad Corporativa Completa** - Logos, manuales de marca, diseño gráfico
3. **Desarrollo Web & E-commerce Profesional** - Sitios web, apps móviles, portales empresariales
4. **Servicios Especializados** - Inteligencia Artificial, Video Marketing, CRO, Analítica
5. **Consultoría Estratégica Personalizada** - Auditorías, roadmaps de crecimiento digital, optimización

## ⚡ Reglas de Oro (Leer Primero)

### 1. Estructura de Páginas y Componentes
```
src/pages/{nombre}.astro  →  src/components/{nombre}/
```
- **Cada página `.astro`** tiene su carpeta con el **mismo nombre** en `src/components/`
- Ejemplo: `index.astro` → `src/components/index/`

### 2. Layout Predeterminado
```astro
import LayoutBasic from '../layouts/LayoutBasic.astro'; // SIEMPRE usar este
```
**NO cambiar** a menos que se indique explícitamente.

### 3. Estructura de Carpetas de Componentes
```
src/components/{nombre-pagina}/
├── Secciones/           # IndexSeccion1.jsx, IndexSeccion2.jsx, etc.
├── components/          # Componentes SOLO de esta página
└── css/                 # indexSeccion1.module.css, indexSeccion2.module.css
```

### 4. Nomenclatura de Archivos
- **JSX**: `PascalCase` → `IndexSeccion1.jsx`, `ServiciosSeccion2.jsx`
- **CSS**: `camelCase` + `.module.css` → `indexSeccion1.module.css`, `serviciosSeccion2.module.css`

### 5. Traducciones
```
src/data/translations{NombrePagina}.js
```
- `translationsIndex.js` para `index.astro`
- `translationsServicios.js` para `servicios.astro`
- `translationsNosotros.js` para `nosotros.astro`
- `translationsMetodologia.js` para `metodologia.astro` (será renombrado a "Proceso")
- `translations.js` para elementos globales (navbar, footer)

### 6. Componentes Globales
```
src/components/global/  # NavBar, Footer, animaciones compartidas
```
**NO** mezclar con componentes específicos de página.

### 7. Responsive Design
**TODO** debe funcionar en móvil, tablet y desktop. Siempre incluir media queries.

### 8. Sistema de Diseño "Digital Performance"
**Concepto visual**: Elegancia profesional + precisión medible + tecnología de punta.

**Palabras clave**: profesional, sofisticado, vibrante, medible, resultados, innovación.

**Regla 70/20/10**: 70% neutros (off-white, lavanda), 20% morados (marca), 10% acentos (cian, naranja, ámbar).

---

## 🎨 Sistema de Diseño "Digital Performance"

### Filosofía Visual
El diseño de Energy Media fusiona:
- **Profesionalismo**: Elegancia corporativa, calidad premium, confianza
- **Data**: Precisión medible, métricas visibles, performance-first
- **Innovación**: Tecnología de punta, IA, automatización, escalabilidad

### Paleta de Colores y Atmósferas

#### **Uso por Sección**
- **Base clara** (secciones informativas): `--em-bg-offwhite` (#F6F6F6) con grises lavanda
- **Bloques "cine" oscuros** (emocionales): `--em-purple-primary` (#6F26A9) con negro puro
- **Acentos estratégicos**: Cian/amarillo/naranja SOLO en highlights y métricas

#### **Variables CSS Disponibles** (en `LayoutBasic.astro`):
```css
/* PALETA CORE (REDISEÑO 2025) */
--em-purple-primary: #6F26A9;      /* Morado Energy vibrante (marca, botones) */
--em-purple-light: #A47EB9;        /* Lavanda (fondos suaves) */
--em-purple-deep: #7E2B7F;         /* Morado profundo (gradientes) */

/* ACENTOS */
--em-cyan-accent: #3DBBFF;         /* Azul cian puro (highlights, métricas) */
--em-orange-accent: #FF7A45;       /* Naranja/salmón vivo (badges, micro-llamadas) */
--em-amber-accent: #FFB638;        /* Amarillo/dorado suave (etiquetas) */
--em-red-accent: #F12A2A;          /* Rojo brillante (alertas, énfasis) */

/* NEUTROS */
--em-bg-offwhite: #F6F6F6;         /* Off-white/gris muy claro (fondo de página) */
--em-border-light: #E1DDEC;        /* Bordes, dividers */
--em-text-primary: #1A1A1A;        /* Negro puro (texto principal) */
--em-text-light: #FFFFFF;          /* Blanco puro (texto sobre oscuro) */

/* GRADIENTES */
--em-gradient-purple-cyan: linear-gradient(135deg, #6F26A9, #3DBBFF);
--em-gradient-purple-black: linear-gradient(180deg, #6F26A9, #1A1A1A);
--em-gradient-cta: linear-gradient(135deg, #2BC7FF, #F5C15C);  /* 🔥 Turquesa → Amarillo */
--em-gradient-cta-hover: linear-gradient(135deg, #1FB5ED, #E3AF4A);  /* Hover más oscuro */
```

### Tipografía con Carácter

#### **Fuentes**
- **Headlines**: `--em-font-headline` (Poppins Bold/ExtraBold) - Impacto visual
- **Body/UI**: `--em-font-body` (Inter 400-600) - Legibilidad óptima

#### **Escala Tipográfica** (responsive)
```css
--em-text-h1: clamp(3.5rem, 5vw, 4rem);        /* 56-64px */
--em-text-h2: clamp(2.25rem, 3.5vw, 2.5rem);   /* 36-40px */
--em-text-h3: clamp(1.5rem, 2vw, 1.75rem);     /* 24-28px */
--em-text-body: clamp(1rem, 1.5vw, 1.125rem);  /* 16-18px */
--em-text-caption: 0.875rem;                   /* 14px */
```

#### **Line Heights**
```css
--em-leading-tight: 1.2;    /* Titulares impactantes */
--em-leading-normal: 1.5;   /* Body text */
--em-leading-relaxed: 1.75; /* Textos largos */
```

**Tracking**: Ligeramente negativo (-0.02em) en H1 para impacto.

### Composición y Ritmo Visual

#### **Grid System**
- **12 columnas** con mucho aire (white space generoso)
- **Max-width**: 1280px para contenido principal
- **Gutters**: 20-40px (responsive con `clamp`)

#### **Asimetría Controlada**
- Imágenes/videos **breakout** a full-bleed en bloques clave (Reel, CTA)
- Cards con radios amplios: `--em-radius-lg` (20px) o `--em-radius-xl` (24px)

#### **Separadores Cinematográficos**
- Diagonales suaves o barridos de luz (gradiente morado→cian)
- Transiciones visuales entre secciones contrastantes

### Tratamiento de Imagen y Video

#### **Color Grading**
- Tono cálido en pieles + punch de contraste
- **Grano sutil** (2-3% opacity) para textura premium
- Uso de clase `.cinematic-grain` disponible globalmente

#### **Formatos Mixtos**
- Reel: 16:9, 9:16 y 1:1 para "lenguaje social"
- Hero: 16:9 con **letterbox discreto** (sensación "tráiler")

#### **Badges sobre Video**
```jsx
<div className={styles.metricBadge}>
  <span className={styles.value}>+42% CTR</span>
  <span className={styles.label}>Campaña bilingüe</span>
</div>
```
- Chips con fondo cian/naranja al 12-16% + texto oscuro
- Siempre visibles (contraste AA)

### Motion y Microinteracciones

#### **Easing Cinematográfico**
```css
--em-ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);   /* Principal */
--em-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Opcional */
```

#### **Patrones de Animación**
- **Hero**: Fade + translateY (250-300ms)
- **Reel hover**: Preview 0.5-1s + scale 0.98→1
- **Scroll parallax**: Leve 5-8% (no exagerado)

#### **Respeto por "Reduce Motion"**
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

### Sombras Cinematográficas (3 Capas)

```css
/* Capa 1: Sombra de contacto */
--em-shadow-card: 
  0 10px 30px rgba(103, 46, 146, 0.08),
  0 2px 8px rgba(103, 46, 146, 0.04);

/* Capa 2: Hover elevado */
--em-shadow-card-hover: 
  0 15px 40px rgba(103, 46, 146, 0.12),
  0 4px 12px rgba(103, 46, 146, 0.06);

/* Capa 3: Dramático (lightbox, modales) */
--em-shadow-dramatic: 
  0 20px 50px rgba(103, 46, 146, 0.15),
  0 8px 16px rgba(103, 46, 146, 0.08);
```

**Resultado**: Depth-of-field (desenfoque selectivo) como en cine.

### Componentes con Carácter

#### **Botón Primario**
```css
.btnPrimary {
  background: var(--em-gradient-cta);
  color: var(--em-text-light);
  padding: 14px 32px;
  border-radius: var(--em-radius-md);
  font-weight: 600;
  transition: all 0.3s var(--em-ease-smooth);
}

.btnPrimary:hover {
  box-shadow: var(--em-shadow-glow-cyan);
  transform: translateY(-2px);
}
```

#### **Botón Secundario**
```css
.btnSecondary {
  border: 2px solid var(--em-purple-primary);
  background: transparent;
  color: var(--em-purple-primary);
}

/* En secciones oscuras */
.btnSecondaryDark {
  border: 2px solid var(--em-text-light);
  color: var(--em-text-light);
  background: rgba(255, 255, 255, 0.1);
}
```

#### **Chips de Métricas**
```css
.metricChip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--em-radius-full);
  background: rgba(62, 200, 247, 0.15); /* Cian al 15% */
  color: var(--em-text-primary);
  font-size: var(--em-text-caption);
  font-weight: 600;
}
```

#### **Tarjetas de Casos**
```jsx
<div className={styles.caseCard}>
  <div className={styles.kpiCorner}>+42% ROAS</div>
  <img src={logoCliente} className={styles.clientLogo} />
  <p className={styles.description}>...</p>
  <a href="#" className={styles.ctaLink}>Ver caso completo →</a>
</div>
```

### Voz y Copy (Performance con Alma)

#### **Titulares**
- **Cortos, verbos activos**: "Video que vende", "Cultura que convierte"
- **Promesa + prueba**: "Creatividad multicultural respaldada por métricas"

#### **Microcopy**
- Siempre que sea posible: **KPI + tiempo**
- Ejemplo: "+3.1x ROAS en 60 días" (no solo "+3.1x ROAS")

### Accesibilidad y Calidad

#### **Contraste**
- ✅ Blanco sobre morado `#672E92` ≈ **8.8:1** (AA Large, AAA Normal)
- ✅ Texto `#1A1024` sobre `#F7F5FA` ≈ **14:1** (AAA)
- ❌ **EVITAR**: Blanco sobre naranja/ámbar (bajo contraste)

#### **Estados de Foco**
- Outline visible con `outline-offset: 2px`
- Color: `--em-cyan-accent` para consistencia

#### **Alternativas "Reduce Motion"**
- Todas las animaciones respetan `prefers-reduced-motion`

### Motivos Visuales de Marca

#### **Destello/Prisma** (hilo conductor)
```css
.prismEffect {
  background: var(--em-gradient-purple-cyan);
  height: 2px;
  width: 100%;
  opacity: 0.6;
}
```
Uso: Separadores entre secciones, footer de CTA final.

#### **Textura Sutil**
- Clase global `.cinematic-grain` disponible
- Aplicar en fondos oscuros del Reel para profundidad

#### **Iconografía**
- Estilo: **Lineal** (Lucide-style) con remates redondeados
- Stroke: 2-3px
- Bicolor: morado + cian en highlights

### Dónde Brilla Cada Recurso

| Sección | Atmósfera | Recursos Clave |
|---------|-----------|----------------|
| **Hero** | Vibra "tráiler" | Video teaser, H1 con tracking negativo, 2 CTAs con gradiente |
| **Servicios** | Base clara | Iconografía limpia, bullets con valor, cards con sombra sutil |
| **Casos** | Datos visibles | KPI grande (no tímido), tarjetas con métricas destacadas |
| **OYE** | Autoridad técnica | Visualización duotono, copy de precisión |
| **Reel (Sec 7)** | **Modo cine oscuro** | Mosaico dinámico, métricas en badges, lightbox elegante |
| **CTA final** | Épico + urgente | Gradiente morado→cian, un solo botón grande, copy memorable |

### Anti-Patrones (Para No Verse Genérica)

#### ❌ **PROHIBIDO en Energy Media:**

1. **NO** stock ilustrado sin relación cultural (priorizar footage propio)
2. **NO** glassmorphism excesivo (solo navbar/footer, suficiente)
3. **NO** más de 3 colores por sección (disciplina 70/20/10)
4. **NO** animaciones "rebote" o circus (usar easing suave)
5. **NO** gradientes arcoíris (solo duotono morado/cian)
6. **NO** texto blanco sobre naranja/ámbar (contraste bajo)
7. **NO** videos sin métricas visibles (siempre badge de KPI)
8. **NO** CTAs genéricos ("Click aquí" → "Agenda tu consultoría")
9. **NO** PascalCase en archivos CSS (usar camelCase.module.css)
10. **NO** mezclar ES/EN en mismo objeto de traducción

### Componente Base: CinematicSection

**Uso**:
```jsx
import CinematicSection from '../../global/CinematicSection';

<CinematicSection 
  variant="dark"           // 'light' | 'dark' | 'gradient' | 'purple-black'
  withGrain={true}         // Añade textura cinematográfica
  withAnimation={true}     // Animación al scroll
  threshold={0.1}          // Umbral Intersection Observer
>
  {/* Contenido de la sección */}
</CinematicSection>
```

**Variantes disponibles**:
- `light`: Fondo off-white para contenido informativo
- `dark`: Gradiente morado→negro para secciones emocionales
- `gradient`: Gradiente morado→cian para CTAs
- `purple-black`: Gradiente oscuro para transiciones
- `custom`: Sin background (personalizar desde componente padre)



---

## Arquitectura y Patrones Clave

### Stack Tecnológico
- **Framework**: Astro 5.10.0 (Generación de Sitios Estáticos con islas React)
- **Librería UI**: React 18.2.0 (para componentes interactivos)
- **Estilos**: Tailwind CSS + CSS Modules (`.module.css`)
- **Gestión de Estado**: Nanostores (`@nanostores/react`)
- **i18n**: Sistema de traducción personalizado vía React Context
- **Animación**: GSAP, Framer Motion, React Three Fiber (@react-three/fiber)
- **Video**: Vimeo iframes embebidos

### Estructura del Proyecto
```
src/
├── pages/           # Páginas Astro (enrutamiento basado en archivos)
├── layouts/         # Layout.astro, LayoutBasic.astro
├── components/      # Componentes React organizados por funcionalidad
│   ├── index/       # Página principal (11 secciones)
│   ├── servicios/   # Páginas de servicios (5 tipos)
│   ├── casos/       # Casos de éxito con métricas
│   ├── nosotros/    # Quiénes somos (manifiesto, equipo, premios)
│   ├── metodologia/ # Framework de trabajo (5 pasos)
│   ├── recursos/    # Blog, guías, webinars
│   ├── contacto/    # Formulario + agenda + mapa
│   ├── global/      # Componentes compartidos (navbar, footer, animaciones)
│   └── react_components/ # Componentes React reutilizables
├── data/            # Traducciones, átomos de estado, constantes, videos
└── public/          # Assets estáticos (fuentes, imágenes, videos, modelos 3D)
```

### Patrón de Organización de Componentes (CRÍTICO)

**REGLA FUNDAMENTAL**: Cada página `.astro` en `src/pages/` tiene su carpeta correspondiente en `src/components/` con el **mismo nombre** de la página.

#### Estructura Estándar de Componentes por Página:
```
src/components/{nombre-pagina}/
├── Secciones/           # Secciones numeradas (IndexSeccion1.jsx, IndexSeccion2.jsx, etc.)
├── components/          # Sub-componentes específicos SOLO de esta página
└── css/                 # CSS Modules (*.module.css) - SIEMPRE con extensión .module.css
```

**Ejemplo completo para `index.astro`** (11 secciones):
```
src/components/index/
├── Secciones/
│   ├── IndexSeccion1.jsx      # Hero (video teaser + H1 + CTAs)
│   ├── IndexSeccion2.jsx      # Diferenciadores clave (4 cards)
│   ├── IndexSeccion3.jsx      # Servicios destacados (grid 5)
│   ├── IndexSeccion4.jsx      # Casos con métricas (3 tarjetas)
│   ├── IndexSeccion5.jsx      # Metodología (timeline 5 pasos)
│   ├── IndexSeccion6.jsx      # 🎬 VIDEO SHOWCASE (6-9 videos seleccionados)
│   ├── IndexSeccion7.jsx      # Logos de clientes
│   ├── IndexSeccion8.jsx      # Testimonios
│   ├── IndexSeccion9.jsx      # Planes (Start / Grow / Scale)
│   └── IndexSeccion10.jsx     # CTA final + Newsletter
├── components/
│   ├── DifferentiatorCard.jsx  # Card de diferenciador
│   ├── ServiceCard.jsx         # Card de servicio
│   ├── CaseMetricCard.jsx      # Card de caso con KPIs
│   ├── VideoShowcaseGrid.jsx   # Grid de videos (Sección 6)
│   ├── VideoLightbox.jsx       # Modal para videos
│   └── VideoCard.jsx           # Card individual de video
└── css/
    ├── indexSeccion1.module.css
    ├── indexSeccion2.module.css
    ├── indexSeccion6.module.css  # Estilos para video showcase
    └── ...
```

**Ejemplo para `servicios.astro`** (plantilla reutilizable):
```
src/components/servicios/
├── Secciones/
│   ├── ServiciosSeccion1.jsx   # Hero corto
│   ├── ServiciosSeccion2.jsx   # Problemas que resolvemos
│   ├── ServiciosSeccion3.jsx   # Soluciones y entregables
│   ├── ServiciosSeccion4.jsx   # Proceso específico (4 pasos)
│   ├── ServiciosSeccion5.jsx   # Herramientas martech
│   ├── ServiciosSeccion6.jsx   # Casos relacionados
│   ├── ServiciosSeccion7.jsx   # FAQs
│   └── ServiciosSeccion8.jsx   # CTA (agenda/propuesta)
├── components/
│   ├── ProblemBullet.jsx
│   ├── ProcessStep.jsx
│   └── ToolLogo.jsx
└── css/
    ├── serviciosSeccion1.module.css
    └── ...
```

**Convención de Nombres**:
- **Componentes JSX**: `PascalCase` → `IndexSeccion1.jsx`, `CasosSeccion2.jsx`
- **CSS Modules**: `camelCase` → `indexSeccion1.module.css`, `casosSeccion2.module.css`
- **Siempre** extensión `.module.css` para CSS Modules

#### Componentes Globales
Los componentes compartidos entre múltiples páginas van en `src/components/global/`:
- `NavBar.jsx` - Navegación principal con selector ES/EN
- `Footer.jsx` - Pie de página
- `LanguageSwitch.jsx` - Selector de idioma
- Animaciones compartidas
- Utilidades comunes

**NO** colocar componentes específicos de una página en `global/`.

### Patrón de Ensamblaje de Páginas (CRÍTICO)

**REGLA**: Todas las páginas en `src/pages/*.astro` deben usar `LayoutBasic` a menos que se especifique lo contrario.

#### Estructura de una Página Astro:
```astro
---
import LayoutBasic from '../layouts/LayoutBasic.astro';  // SIEMPRE usar este layout por defecto

// Importar secciones numeradas desde la carpeta correspondiente
import IndexSeccion1 from '../components/index/Secciones/IndexSeccion1.jsx'; // Hero
import IndexSeccion2 from '../components/index/Secciones/IndexSeccion2.jsx'; // Diferenciadores
import IndexSeccion3 from '../components/index/Secciones/IndexSeccion3.jsx'; // Servicios
import IndexSeccion4 from '../components/index/Secciones/IndexSeccion4.jsx'; // Casos
import IndexSeccion5 from '../components/index/Secciones/IndexSeccion5.jsx'; // Metodología
import IndexSeccion6 from '../components/index/Secciones/IndexSeccion6.jsx'; // OYE
import IndexSeccion7 from '../components/index/Secciones/IndexSeccion7.jsx'; // Reel Video
import IndexSeccion8 from '../components/index/Secciones/IndexSeccion8.jsx'; // Logos Clientes
import IndexSeccion9 from '../components/index/Secciones/IndexSeccion9.jsx'; // Testimonios
import IndexSeccion10 from '../components/index/Secciones/IndexSeccion10.jsx'; // Planes
import IndexSeccion11 from '../components/index/Secciones/IndexSeccion11.jsx'; // CTA Final + Newsletter
---

<LayoutBasic title="Energy Media - Creatividad multicultural + performance digital" showFooter={true}>
    <!-- Secciones en orden numérico -->
    <IndexSeccion1 transition:persist client:only/>
    <IndexSeccion2 transition:persist client:only/>
    <IndexSeccion3 transition:persist client:only/>
    <IndexSeccion4 transition:persist client:only/>
    <IndexSeccion5 transition:persist client:only/>
    <IndexSeccion6 transition:persist client:only/>
    <IndexSeccion7 transition:persist client:only/>
    <IndexSeccion8 transition:persist client:only/>
    <IndexSeccion9 transition:persist client:only/>
    <IndexSeccion10 transition:persist client:only/>
    <IndexSeccion11 transition:persist client:only/>
</LayoutBasic>
```

**Directivas obligatorias**:
- `transition:persist` - Para mantener estado entre navegaciones
- `client:only` - Para componentes React con hooks/estado (casi todos los casos)

## Internacionalización (i18n)

### Arquitectura del Sistema de Traducciones (CRÍTICO)

**REGLA**: Cada página tiene su propio archivo de traducciones en `src/data/` con el patrón `translations{NombrePagina}.js`

#### Archivos de Traducción por Página:
```
src/data/
├── translations.js              # Traducciones GLOBALES (navbar, footer, elementos compartidos)
├── translationsIndex.js         # Exclusivo para index.astro (11 secciones)
├── translationsServicios.js     # Exclusivo para páginas de servicios
├── translationsNosotros.js      # Exclusivo para nosotros.astro
├── translationsMetodologia.js   # Exclusivo para metodologia.astro (será renombrado a "Proceso")
├── translationsContacto.js      # Exclusivo para contacto.astro
└── vimeoVideos.js               # Lista de URLs de videos de Vimeo
```

**Estructura de archivo de traducción**:
```javascript
// translationsIndex.js
export const translationsIndex = {
  es: {
    hero: {
      h1: "Creatividad multicultural + performance digital = crecimiento real",
      subtitle: "Conectamos marcas con audiencias hispanas y multiculturales con estrategias data-driven y video que vende.",
      ctaPrimary: "Agenda tu consultoría gratuita",
      ctaSecondary: "Ver casos de éxito"
    },
    differentiators: {
      title: "Diferenciadores clave",
      items: [
        {
          title: "Cultura que convierte",
          description: "Insight cultural auténtico para campañas que resuenan"
        },
        // ...
      ]
    },
    // ...
  },
  en: {
    hero: {
      h1: "Multicultural creativity + digital performance = real growth",
      subtitle: "We connect brands with Hispanic and multicultural audiences through data-driven strategies and video that sells.",
      ctaPrimary: "Schedule your free consultation",
      ctaSecondary: "View success stories"
    },
    // ...
  }
};
```

**Archivo de Videos de Vimeo** (`src/data/vimeoVideos.js`):
```javascript
// Lista completa de URLs de Vimeo para el reel de videos
export const vimeoVideos = [
  "https://player.vimeo.com/video/897006857",
  "https://player.vimeo.com/video/906464385",
  "https://player.vimeo.com/video/1119883818",
  "https://player.vimeo.com/video/1114313177",
  "https://player.vimeo.com/video/1113698153",
  "https://player.vimeo.com/video/1107528153",
  "https://player.vimeo.com/video/1107527479",
  "https://player.vimeo.com/video/1106544096",
  "https://player.vimeo.com/video/1106543448",
  "https://player.vimeo.com/video/1106542411",
  "https://player.vimeo.com/video/1106533496",
  "https://player.vimeo.com/video/1098651741",
  "https://player.vimeo.com/video/1098263467",
  "https://player.vimeo.com/video/1098262712",
  "https://player.vimeo.com/video/1065576213",
  "https://player.vimeo.com/video/1058707649",
  "https://player.vimeo.com/video/1057694037",
  "https://player.vimeo.com/video/1057602607",
  "https://player.vimeo.com/video/1057592923",
  "https://player.vimeo.com/video/1056929683",
  "https://player.vimeo.com/video/1056929454",
  "https://player.vimeo.com/video/1054239205",
  "https://player.vimeo.com/video/1048030996",
  "https://player.vimeo.com/video/1047965817",
  "https://player.vimeo.com/video/1019606001",
  "https://player.vimeo.com/video/906468836",
  "https://player.vimeo.com/video/906190895",
  "https://player.vimeo.com/video/891659224",
  "https://player.vimeo.com/video/884620794",
  "https://player.vimeo.com/video/868107775"
];
```

### Uso en Componentes
```jsx
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { translationsIndex } from '../../../data/translationsIndex';

const MiComponente = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translationsIndex.en : translationsIndex.es;
  
  return <h1>{t.hero.h1}</h1>;
};
```

**Patrón**: Usa `useStore(isEnglish)` para verificaciones booleanas, `useLang()` para acceder al objeto `t` con el método `changeLang()`.

## Convenciones de Estilos

### Híbrido Tailwind + CSS Modules
- **Tailwind**: Usa para layout, espaciado, utilidades responsive
- **CSS Modules**: Usa para animaciones específicas del componente, gradientes, estados complejos
- **Propiedades CSS personalizadas**: Definidas en `tailwind.config.mjs` como `var(--primary-color)`, etc.

### Sistema de Colores Energy Media (ver `src/data/variables.js`)

#### Core
```javascript
primary: '#672E92'        // Morado Energy (marca, botones principales, links hover)
primaryLight: '#A47EB9'   // Lavanda medio (fondos suaves, tarjetas)
```

#### Acentos
```javascript
accent: '#3EC8F7'         // Cian brillante (estados activos, highlights, interactivos)
accentOrange: '#F56831'   // Naranja cálido (badges, micro-llamadas, gráficos)
accentAmber: '#FAB03D'    // Ámbar (etiquetas, indicadores, detalle visual)
accentRed: '#EF1D25'      // Rojo (alertas/errores y énfasis puntual)
```

#### Neutros con tinte lavanda
```javascript
bgOffWhite: '#F7F5FA'     // Off-white (fondo de página)
borderLight: '#E1DDEC'    // Gris lavanda claro (bordes, dividers)
borderMedium: '#DDCDDC'   // Gris lavanda medio (fills sutiles)
textPrimary: '#1A1024'    // Ink (texto principal)
textLight: '#FFFFFF'      // Blanco (texto sobre morado)
```

#### Gradientes
```javascript
gradientPurpleCyan: 'linear-gradient(135deg, #672E92, #3EC8F7)'
gradientPurpleMagenta: 'linear-gradient(135deg, #7E2B7F, #672E92)'
```

**Clases Tailwind**: `primaryColor`, `accentColor`, `primaryBg`, `primaryGradient`, etc.

### Aplicación por Sección
- **Header/Nav**: fondo `#F7F5FA`, logo en morado; links en morado con hover cian.
- **Hero**: titular en `#1A1024`, CTA primario botón morado con texto blanco; CTA secundario borde morado.
- **Secciones "Servicios/Proceso"**: alterna fondos `#F7F5FA` y `#E1DDEC`; iconografía en cian/naranja.
- **Casos/Stats**: cards blancas, acentos en cian y ámbar para gráficos/labels.
- **Footer**: morado sólido con texto blanco y acentos cian.

### Patrones de CSS Modules (CRÍTICO)

**REGLA**: SIEMPRE usar nomenclatura `camelCase` con extensión `.module.css`

- Usa nomenclatura tipo BEM: `.container`, `.header`, `.caseCard`
- Animaciones: Define `@keyframes` en el módulo, aplica con `animation-delay: var(--delay)`
- Responsive: Breakpoints mobile-first en media queries - **TODO debe ser responsive**

**Convención de nombres de archivos CSS**:
```
IndexSeccion1.jsx    →  indexSeccion1.module.css
CasosSeccion3.jsx    →  casosSeccion3.module.css
ServiciosSeccion2.jsx → serviciosSeccion2.module.css
```

**NUNCA**: `IndexSeccion1.module.css` (PascalCase incorrecto)  
**SIEMPRE**: `indexSeccion1.module.css` (camelCase correcto)

**Ejemplo de `indexSeccion2.module.css`** (Diferenciadores):
```css
.differentiatorCard {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(103, 46, 146, 0.1);
  transition: all 0.3s ease;
}

.differentiatorCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(103, 46, 146, 0.15);
}

.iconWrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #672E92, #3EC8F7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

/* Responsive OBLIGATORIO */
@media (max-width: 768px) {
  .differentiatorCard {
    padding: 1.5rem;
  }
  
  .iconWrapper {
    width: 50px;
    height: 50px;
  }
}
```

### Accesibilidad (contraste)
- Blanco sobre morado `#672E92` ≈ 8.8:1 ✓ (ideal para CTAs)
- Naranja como fondo: usa texto oscuro `#1A1024` para cumplir contraste
- Rojo con texto blanco es límite; mejor reservar rojo para iconos/etiquetas

## Flujos de Trabajo Críticos para Desarrolladores

### Servidor de Desarrollo
```bash
npm run dev          # Servidor dev en localhost:4321
npm run build        # Build de producción (ejecuta astro check primero)
npm run preview      # Preview del build de producción
```

### Proceso de Build
1. Astro hace type-checking con `astro check`
2. Genera HTML estático para las páginas
3. Empaqueta las islas React como chunks separados
4. Optimiza assets y fuentes

### Patrón de Visibilidad de Componentes
La mayoría de las secciones usan **Intersection Observer** para animaciones al scroll:
```jsx
const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
    { threshold: 0.1 }
  );
  if (sectionRef.current) observer.observe(sectionRef.current);
  return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
}, []);

// Aplicar clases condicionalmente:
<div className={`${styles.header} ${isVisible ? styles.fadeInUp : ''}`}>
```

## Componentes Específicos de Energy Media

### 1. Video Player (Vimeo iframes)
```jsx
// src/components/global/VimeoPlayer.jsx
import { useState } from 'react';

const VimeoPlayer = ({ videoUrl, title = "Energy Media Video" }) => {
  return (
    <div className="vimeo-wrapper" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <iframe
        src={videoUrl}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
};

export default VimeoPlayer;
```

**Uso**:
```jsx
import VimeoPlayer from '../../../components/global/VimeoPlayer';
import { vimeoVideos } from '../../../data/vimeoVideos';

<VimeoPlayer videoUrl={vimeoVideos[0]} title="Energy Media Reel" />
```

### 2. Reel de Videos (Carrusel)
```jsx
// IndexSeccion7.jsx - Galería de videos con carrusel
import { useState } from 'react';
import { vimeoVideos } from '../../../data/vimeoVideos';
import VimeoPlayer from '../../global/VimeoPlayer';

const IndexSeccion7 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <div className="video-carousel">
      <VimeoPlayer videoUrl={vimeoVideos[currentIndex]} />
      {/* Controles de navegación */}
    </div>
  );
};
```

### 3. Timeline de Metodología (5 pasos)
```jsx
// IndexSeccion5.jsx - Cómo trabajamos
const steps = [
  { number: 1, title: "Descubrimiento cultural & de negocio", description: "..." },
  { number: 2, title: "Plan de crecimiento (90 días + KPIs)", description: "..." },
  { number: 3, title: "Producción & setup", description: "..." },
  { number: 4, title: "Optimización continua", description: "..." },
  { number: 5, title: "Escalamiento", description: "..." }
];
```

### 4. Casos con Métricas (KPIs)
```jsx
// IndexSeccion4.jsx - Casos destacados
const cases = [
  {
    industry: "E-commerce",
    objective: "Aumentar ROAS",
    solution: "Video ads + segmentación cultural",
    metrics: {
      roas: "+42%",
      cac: "–28%",
      leads: "+3.1x"
    }
  },
  // ...
];
```

## Estructura del Sitio

### Mapa del Sitio (Alto Nivel)
```
├── Inicio (11 secciones - NUEVA ESTRUCTURA)
├── Servicios (5 pilares)
│   ├── Marketing Digital Integral
│   ├── Branding & Identidad Corporativa
│   ├── Desarrollo Web & E-commerce
│   ├── Servicios Especializados (IA, Video, CRO)
│   └── Consultoría Estratégica
├── Proceso (6 pasos)
├── Nosotros (misión + valores + equipo)
├── Contacto (form + info)
└── ES / EN (selector de idioma)
```

### Filosofía de Comunicación "Problema → Solución → Prueba"

**CRÍTICO**: Energy Media NO habla de "nosotros" primero, sino del **cliente** primero:

1. **PROBLEMA** - Identificar el dolor del cliente (por qué están aquí)
2. **SOLUCIÓN** - Mostrar cómo resolvemos con servicios concretos + tecnología
3. **PRUEBA** - Validar con métricas reales, garantías, testimonios

**Anti-Patrón PROHIBIDO**: "Nuestros servicios", "Nuestros 5 pilares", "Quiénes somos" antes de mostrar valor.

**Patrón CORRECTO**: "¿Por qué elegirnos?" (beneficios), "Resultados garantizados" (prueba), LUEGO "Servicios integrales".

---

### Página Inicio - 11 Secciones (Nueva Estructura)

**FLUJO NARRATIVO**: Hero → Por Qué → Resultados → Servicios → Paquetes → Proceso → Video → Certs → Testimonios → FAQs → CTA Final

---

#### **Sección 1: Hero - "Transforma tu Negocio"** 
**Objetivo**: Promesa de transformación + oferta de valor inmediata

**Elementos**:
- **Video de fondo**: Loop corto (15-20 seg, muted) - agencia digital profesional
- **Overlay oscuro**: Para legibilidad del texto
- **H1**: "Transforma tu negocio en líder digital con resultados garantizados"
- **Subtitle**: "Marketing digital + desarrollo web + IA. Todo en un solo lugar. Primeros resultados en 30 días o reembolso completo."
- **CTAs**:
  - Primario: "Agenda tu consultoría gratuita ($5,000 MXN de valor)"
  - Secundario: "Ver nuestros resultados"

**Notas técnicas**:
- Video optimizado (<5MB si es local)
- H1 con `font-size: clamp(2.5rem, 5vw, 4rem)`
- CTA primario con badge "GRATIS - $5K valor"
- Animación de entrada fade-in para H1/subtitle

---

#### **Sección 2: ¿Por Qué Elegirnos?** (antes "Diferenciadores")
**Objetivo**: Establecer beneficios tangibles para el cliente

**Elementos**:
- **6 razones** en grid responsive (3x2 desktop, 1 columna móvil)
- Cada card:
  - Ícono distintivo (circular con gradiente morado→cian)
  - Título corto orientado a beneficio
  - Descripción 2-3 líneas con valor concreto

**Razones (6)**:
1. **Experiencia Comprobada** - +8 años transformando negocios digitales con +200 clientes satisfechos
2. **Enfoque Data-Driven** - Decisiones basadas en datos reales, no corazonadas. ROI medible en cada campaña.
3. **Equipo Multidisciplinario** - Marketers + Diseñadores + Desarrolladores + Especialistas en IA trabajando juntos
4. **Tecnología de Punta** - Stack completo: CRM, automatización, IA, analytics en tiempo real
5. **Soporte Prioritario** - Respuesta en <2 horas. Sin esperas, sin excusas.
6. **Planes Flexibles** - Desde startups hasta enterprises. Crece a tu ritmo.

**Notas técnicas**:
- Cards con `box-shadow` morada
- Hover: elevación (`translateY(-5px)`) + sombra más intensa
- Animación de entrada: aparecer en secuencia al hacer scroll

---

#### **Sección 3: Resultados Garantizados** ⭐ NUEVA
**Objetivo**: Prueba social ANTES de servicios - mostrar métricas reales upfront

**Elementos**:
- **Título impactante**: "Resultados que Transforman Negocios"
- **Subtitle**: "No prometemos magia. Entregamos crecimiento medible respaldado por garantía de 90 días."
- **4 métricas grandes** en grid (2x2 desktop):
  - **+200% Tráfico Web** - Promedio en primeros 6 meses
  - **+150% Generación de Leads** - Con optimización continua
  - **+300% Engagement** - En redes sociales orgánicas y pagadas
  - **400-600% ROI** - En campañas de email marketing bien ejecutadas
- **Garantía visible**:
  - Badge grande: "GARANTÍA 90 DÍAS"
  - Copy: "Si no ves resultados medibles en 90 días, reembolso completo. Sin preguntas."
- **Micro-copy**: "Primeros resultados en 30 días. Respuesta <2 horas. Satisfacción garantizada."

**Notas técnicas**:
- Fondo degradado morado→negro (bloque "cine")
- Métricas con animación CountUp al aparecer
- Badges con fondo cian/ámbar al 15%
- Garantía con ícono de escudo + borde brillante

---

#### **Sección 4: Servicios Integrales** (antes "Servicios Destacados")
**Objetivo**: Mostrar portafolio completo con énfasis en IA + Desarrollo Web/Apps

**Elementos**:
- **Título**: "Servicios Integrales para Tu Crecimiento Digital"
- **Subtitle**: "De la estrategia a la ejecución. Todo en un solo lugar."
- **Grid de 6 servicios** (responsive: 3x2 desktop, 1 columna móvil)
- Cada card:
  - Ícono/emoji representativo
  - Título del servicio
  - Tagline corto (1 línea)
  - Copy breve (2-3 bullets de valor)
  - Link "Explorar servicio →"

**Servicios (6)**:
1. **SEO & SEM Profesional** 🎯
   - Tagline: "Domina Google. Más tráfico, más ventas."
   - Bullets: Posicionamiento orgánico + Google Ads + Analítica avanzada
   
2. **Redes Sociales & Paid Ads** 📱
   - Tagline: "Convierte scrollers en clientes."
   - Bullets: Meta Ads + TikTok Ads + LinkedIn Ads + Gestión de comunidad
   
3. **Branding & Diseño Gráfico** 🎨
   - Tagline: "Marca memorable que destaca."
   - Bullets: Logos + Identidad corporativa + Manual de marca + Diseño publicitario
   
4. **Desarrollo Web & Apps Móviles** 💻⚡ **ÉNFASIS**
   - Tagline: "Portales web, CRM, apps móviles a medida."
   - Bullets: Sitios web responsive + E-commerce + Apps iOS/Android + Portales empresariales + CRM personalizado
   
5. **Email Marketing & Automatización** 📧
   - Tagline: "Nurturing que vende en piloto automático."
   - Bullets: Campañas segmentadas + Automatización + A/B testing + ROI 400-600%
   
6. **Marketing con IA & Automatización** 🤖⚡ **ÉNFASIS**
   - Tagline: "Inteligencia artificial al servicio de tu negocio."
   - Bullets: Chatbots inteligentes + Automatización de procesos + Análisis predictivo + Personalización a escala

**Notas técnicas**:
- Cards con `border-radius: 20px`
- Gradiente sutil de fondo (off-white → lavanda claro)
- Servicios 4 y 6 con badge "⚡ DESTACADO" en esquina superior
- Hover: card se eleva, link cambia a cian

---

#### **Sección 5: Paquetes & Soluciones** (antes Sec9, movida aquí)
**Objetivo**: Transparencia de inversión - mostrar pricing orientativo sin asustar

**Elementos**:
- **Título**: "Elige tu Plan de Crecimiento"
- **Subtitle**: "Soluciones escalables desde $8,000 MXN/mes. Planes personalizables según tus objetivos."
- **3 cards de paquetes** (grid horizontal)
- Cada paquete:
  - Nombre del plan (STARTER / GROWTH ⭐ / PREMIUM)
  - Rango de precio MXN
  - Descripción breve (para quién es)
  - Bullets de entregables clave (5-7)
  - CTA: "Solicitar propuesta personalizada"

**Paquetes**:
```
STARTER - Primeros Pasos Digitales
$8,000 - $15,000 MXN/mes

Para: Pequeñas empresas iniciando en digital o con presupuesto limitado

✓ Sitio web profesional responsive (hasta 5 páginas)
✓ SEO básico + Google My Business optimizado
✓ Gestión de 2 redes sociales (contenido orgánico)
✓ Configuración de analytics y tracking
✓ Report mensual con métricas clave
✓ Soporte por email (<24hrs)

---

GROWTH - Escalamiento con Data ⭐ MÁS POPULAR
$16,000 - $30,000 MXN/mes

Para: Empresas en crecimiento que buscan maximizar ROI y escalar con estrategia

✓ Todo en STARTER +
✓ Campañas pagadas multicanal (Meta, Google, LinkedIn)
✓ Email marketing automatizado (hasta 10K contactos)
✓ Producción de video mensual (2-3 piezas para social ads)
✓ A/B testing creativo y de copy
✓ Landing pages optimizadas para conversión
✓ Report quincenal + call de estrategia
✓ Soporte prioritario (<2hrs)

---

PREMIUM - Liderazgo Digital Total
$31,000 - $50,000+ MXN/mes

Para: Empresas establecidas con presupuesto 6 figuras que buscan dominar su industria

✓ Todo en GROWTH +
✓ Desarrollo web/app avanzado (portales, CRM, e-commerce)
✓ Implementación de IA (chatbots, automatización, análisis predictivo)
✓ Producción de video ilimitada + equipo creativo dedicado
✓ Consultoría estratégica mensual (roadmap trimestral)
✓ Campañas en todos los canales disponibles
✓ Report semanal + optimización continua
✓ Account Manager dedicado + soporte 24/7
```

**Notas técnicas**:
- Card GROWTH destacada (escala más grande 1.05x, borde brillante cian)
- Badge "⭐ MÁS POPULAR" en GROWTH
- Hover: elevación de la card
- CTA con gradiente morado
- Nota al pie: "* Planes personalizables. Agenda consultoría gratuita para cotización exacta."

---

#### **Sección 6: Nuestro Proceso de Trabajo** (antes Sec5 "Metodología")
**Objetivo**: Transparencia en el flujo - reducir fricción mostrando cómo trabajamos

**Elementos**:
- **Título**: "Cómo Transformamos tu Negocio (Paso a Paso)"
- **Subtitle**: "Proceso probado en +200 clientes. Sin sorpresas, solo resultados."
- **Timeline horizontal/vertical** (responsive)
- **6 pasos numerados** con:
  - Número del paso (círculo grande morado)
  - Título del paso
  - Descripción breve (2-3 líneas)
  - Duración estimada
  - Entregables clave

**Pasos (6)**:
1. **Descubrimiento & Auditoría** (Semana 1)
   - Analizamos tu negocio, competencia, audiencia, situación digital actual
   - Entregable: Diagnóstico completo con oportunidades identificadas

2. **Estrategia & Roadmap** (Semana 2)
   - Creamos plan de crecimiento 90 días con KPIs medibles
   - Entregable: Roadmap detallado + propuesta de inversión

3. **Implementación & Setup** (Semanas 3-4)
   - Configuramos herramientas, tracking, martech stack, producción inicial
   - Entregable: Infraestructura digital funcionando + primeras campañas live

4. **Optimización Continua** (Mes 2+)
   - Test A/B, iteración creativa, ajuste de segmentación, mejora de CTR/CVR
   - Entregable: Reports quincenales + ajustes basados en data

5. **Reporting & Transparencia** (Ongoing)
   - Dashboards en tiempo real + calls de revisión estratégica
   - Entregable: Reports personalizados + acceso a analytics 24/7

6. **Escalamiento & Crecimiento** (Mes 3+)
   - Expansión a nuevos canales, audiencias, formatos basados en resultados
   - Entregable: Plan de escalamiento + inversión incremental recomendada

**Notas técnicas**:
- Línea conectora entre pasos (gradiente morado→cian)
- Animación de aparición al scroll
- Íconos por paso: lupa → mapa → engranaje → gráfico ascendente → dashboard → cohete
- Duración con badge pequeño (ej: "1 semana", "Ongoing")

---

#### **Sección 7: Video Showcase** ✅ (Mantener actual)
**Objetivo**: Mostrar calidad de producción de video

**Elementos** (ya implementados):
- Título: "Nuestro Trabajo en Video"
- Subtitle: "Producimos video para plataformas digitales: social ads, reels, YouTube, corporativo"
- Grid de 9 videos seleccionados con lightbox
- CTA: "¿Necesitas video profesional para tu marca?"

**Notas técnicas**:
- Grid responsive (3 columnas desktop, 2 tablet, 1 móvil)
- Videos de `vimeoVideos.js` (9 mejores seleccionados)
- Lightbox con `framer-motion`
- Lazy loading de iframes

---

#### **Sección 8: Certificaciones & Partners** ⭐ NUEVA (modificar IndexSeccion8.jsx existente)
**Objetivo**: Autoridad mediante logos de herramientas/certificaciones

**Elementos**:
- **Título**: "Certificados por los Mejores"
- **Subtitle**: "Socios oficiales de las plataformas líderes en marketing y tecnología"
- **Grid de logos** (6-8 logos)
  - Google Partner
  - Meta Business Partner
  - HubSpot Partner
  - Shopify Partner
  - LinkedIn Marketing Partner
  - Microsoft Advertising
  - AWS Partner (si aplica)
  - Vimeo (si aplica)
- **Micro-copy al pie**: "Capacitación continua en las últimas herramientas y estrategias del mercado"

**Notas técnicas**:
- Logos en escala de grises, hover → color
- Grid responsive (4 logos desktop, 2 móvil)
- Fondo off-white o lavanda muy claro
- Cards con border sutil, hover elevación ligera

---

#### **Sección 9: Testimonios + Estadísticas** (modificar IndexSeccion8.jsx actual → renombrar a Sec9)
**Objetivo**: Validación emocional + datos de satisfacción

**Elementos**:
- **Título**: "Lo Que Dicen Nuestros Clientes"
- **Subtitle**: "Más de 200 empresas confiaron en nosotros. Estos son sus resultados."
- **2-3 testimonios** en cards grandes con:
  - Texto del testimonio (2-4 líneas)
  - Nombre + rol + empresa
  - Avatar/foto (opcional)
  - Resultado concreto: "Aumentamos ventas 3x en 6 meses"
- **4 estadísticas de satisfacción** (badges pequeños al pie):
  - 98% Tasa de Satisfacción
  - 85% Clientes Recurrentes (renuevan)
  - 92% Recomiendan Energy Media
  - 4.9/5 Calificación Promedio

**Notas técnicas**:
- Testimonios con `box-shadow` y borde lavanda
- Quote con comillas grandes decorativas
- Stats con iconos: ⭐ (satisfacción), 🔁 (recurrentes), 👍 (recomiendan), ⭐⭐⭐⭐⭐ (rating)
- Carrusel si hay más de 3 testimonios

---

#### **Sección 10: FAQs - Preguntas Frecuentes** ⭐ NUEVA (modificar IndexSeccion10.jsx actual)
**Objetivo**: Reducir fricción pre-contacto respondiendo objeciones comunes

**Elementos**:
- **Título**: "Preguntas Frecuentes"
- **Subtitle**: "Todo lo que necesitas saber antes de comenzar"
- **Accordion de 4-6 preguntas** (expandible/colapsable)

**Preguntas clave (de referencia doc)**:
1. **¿Cuánto tiempo toma ver resultados?**
   - Respuesta: "Primeros resultados medibles en 30 días (tráfico, engagement). ROI significativo en 90 días. Campañas de awareness pueden tomar 60-90 días. Te damos visibilidad completa con reports quincenales."

2. **¿Qué pasa si no estoy satisfecho?**
   - Respuesta: "Garantía de 90 días. Si no ves resultados medibles en ese periodo, reembolso completo sin preguntas. Además, contratos flexibles sin permanencia forzada."

3. **¿Trabajan con mi industria?**
   - Respuesta: "Sí. Hemos trabajado con e-commerce, servicios profesionales, B2B tech, educación, salud, fintech, retail. Si vendes online o necesitas leads, podemos ayudarte."

4. **¿Qué tipo de soporte ofrecen?**
   - Respuesta: "GROWTH y PREMIUM: respuesta <2 horas en horario laboral. STARTER: <24 horas. Todos los planes incluyen account manager asignado y acceso a dashboards 24/7."

5. **¿Puedo cambiar de plan después?** (opcional)
   - Respuesta: "Totalmente. Muchos clientes empiezan con STARTER y escalan a GROWTH cuando ven resultados. Sin penalizaciones por upgrade/downgrade."

6. **¿Requieren permanencia mínima?** (opcional)
   - Respuesta: "Plan inicial de 90 días para garantizar tiempo suficiente de optimización. Después, mes a mes. Sin ataduras de 12-24 meses."

**Notas técnicas**:
- Accordion con `framer-motion` para smooth expand/collapse
- Ícono + / - para indicar estado
- Fondo alternado (pregunta impar: off-white, par: lavanda claro)
- Hover: pregunta se ilumina ligeramente

---

#### **Sección 11: CTA Final + Oferta Especial** ⭐ NUEVA (reescribir IndexSeccion11.jsx actual)
**Objetivo**: Última oportunidad de conversión con oferta de valor irresistible

**Elementos**:
- **Bandera morada** con degradado (full-width, bloque "cine")
- **Badge destacado**: "OFERTA LIMITADA - Nuevos Clientes"
- **Título grande centrado**: "Agenda tu Consultoría Estratégica Gratuita"
- **Subtitle**: "Valor: $5,000 MXN. Hoy: GRATIS. Analizamos tu negocio y te damos roadmap de crecimiento sin compromiso."
- **5 bullets de valor**:
  - ✓ Auditoría completa de tu presencia digital (30-45 min)
  - ✓ Identificación de 3-5 oportunidades de crecimiento rápidas
  - ✓ Recomendaciones de inversión personalizadas
  - ✓ Estimación de ROI esperado en 90 días
  - ✓ Plan de acción inmediato (sin letra chica)
- **Botón CTA grande**: "Agenda Ahora (Sin Costo)"
- **Garantía visible**: "🛡️ Garantía de 90 días. Resultados o reembolso."
- **Newsletter opcional** (al pie):
  - Copy: "O recibe tips de marketing digital + casos de éxito en tu inbox"
  - Input email + botón "Suscribirse"

**Notas técnicas**:
- Fondo degradado morado→magenta oscuro
- CTA con animación `pulse` sutil
- Badge "OFERTA LIMITADA" con efecto blink suave (no molesto)
- Newsletter con validación de email
- Integración Mailchimp/ConvertKit (futuro)

---

### Resumen de Flujo Narrativo (Journey del Usuario - NUEVO)

1. **Hero (Sec1)**: Promesa de transformación + oferta gratis → "Te engancho"
2. **¿Por Qué Elegirnos? (Sec2)**: 6 beneficios concretos → "Te convenzo"
3. **Resultados Garantizados (Sec3)**: Métricas reales + garantía 90 días → "Te demuestro (prueba upfront)"
4. **Servicios (Sec4)**: Qué hacemos (con IA + Web/Apps) → "Te informo con énfasis en diferenciadores"
5. **Paquetes (Sec5)**: Inversión transparente → "Te estructuro opciones"
6. **Proceso (Sec6)**: Cómo trabajamos → "Te tranquilizo con claridad"
7. **Video Showcase (Sec7)**: Calidad visual → "Te muestro ejecución"
8. **Certificaciones (Sec8)**: Autoridad de herramientas → "Te valido (expertise)"
9. **Testimonios+Stats (Sec9)**: Clientes felices → "Te valido (social)"
10. **FAQs (Sec10)**: Respondo objeciones → "Te elimino fricción"
11. **CTA Final (Sec11)**: Oferta irresistible → "Te convierto (última oportunidad)"

**Resultado**: Embudo completo que pone al CLIENTE primero (problema→solución→prueba), muestra valor antes de pedir contacto, enfatiza IA+Web/Apps, y reduce fricción con transparencia (pricing, FAQs, garantías).
4. **Escalabilidad con reporting claro** - Desde pruebas hasta campañas multimillonarias

**Notas técnicas**:
- Cards con `box-shadow` morada
- Hover: elevación (`translateY(-5px)`) + sombra más intensa
- Animación de entrada: aparecer en secuencia al hacer scroll

---

#### **Sección 3: Servicios Destacados**
**Objetivo**: Mostrar el portafolio de servicios core

**Elementos**:
- **Grid de 5 servicios** (responsive: 3 arriba, 2 abajo en desktop)
- Cada card:
  - Ícono/imagen representativa
  - Título del servicio
  - Copy breve (2-3 líneas)
  - Link "Ver servicio →"

**Servicios**:
1. **Video Marketing Digital** - Producción profesional enfocada en performance digital
2. **Marketing Digital Integral** - SEO, SEM, Social Ads, Email Marketing, Influencers
3. **Branding & Identidad Corporativa Completa** - Logos, manuales de marca, diseño gráfico
4. **Desarrollo Web & E-commerce Profesional** - Sitios web, apps móviles, portales empresariales
5. **Servicios Especializados** - Inteligencia Artificial, Video Marketing, CRO, Analítica

**Notas técnicas**:
- Cards con `border-radius: 20px`
- Gradiente sutil de fondo (off-white → lavanda claro)
- Hover: card se eleva, link cambia a cian

---

#### **Sección 4: Casos con Métricas**
**Objetivo**: Prueba social con resultados medibles

**Elementos**:
- **3 tarjetas de casos** en grid horizontal
- Cada tarjeta:
  - Industria/cliente (nombre o genérico)
  - Reto breve
  - Solución implementada
  - **KPIs destacados** en badges (ROAS, CTR, CAC, Leads)
  - CTA: "Explorar caso completo"

**Ejemplo de caso**:
```
Industry: E-commerce moda
Reto: Aumentar ROAS en audiencia hispana
Solución: Video ads bilingües + segmentación cultural
Métricas: 
  - +42% ROAS
  - –28% CAC
  - +3.1x Leads
```

**Notas técnicas**:
- Métricas en badges con fondo cian/ámbar
- Tarjetas con sombra profunda
- Animación de números al aparecer (`CountUp` effect)

---

#### **Sección 5: Metodología (Timeline 5 Pasos)**
**Objetivo**: Transparencia en el proceso de trabajo

**Elementos**:
- **Timeline vertical/horizontal** (responsive)
- **5 pasos numerados** con:
  - Número del paso (círculo grande morado)
  - Título del paso
  - Descripción breve
  - Micro-beneficio/entregable

**Pasos**:
1. **Descubrimiento cultural & de negocio** - Audit inicial + insights de audiencia
2. **Plan de crecimiento (90 días + KPIs)** - Roadmap con objetivos medibles
3. **Producción & setup** - Video, tracking, martech configurado
4. **Optimización continua** - Test A/B, iteración creativa
5. **Escalamiento** - Nuevas audiencias, formatos, canales

**Notas técnicas**:
- Línea conectora entre pasos (gradiente morado→cian)
- Animación de aparición al scroll
- Íconos por paso (lupa → mapa → cámara → gráfico → cohete)

---

#### **Sección 6: 🎬 VIDEO SHOWCASE (Nuestro Trabajo en Video)**
**Objetivo**: Mostrar calidad y variedad de producción de video

**Elementos**:
- **Título**: "Nuestro Trabajo en Video" o "Contenido Visual que Destaca"
- **Subtitle**: "Producimos video para plataformas digitales: social ads, reels, YouTube, corporativo"
- **Grid de 6-9 videos seleccionados** en diseño elegante
- Cada video card:
  - Thumbnail estático
  - Al hover: ligero efecto (scale/brillo)
  - Título del proyecto
  - Tipo/categoría (Social Ad, Corporate, Testimonial, etc.)
- **Modal/Lightbox** al hacer clic:
  - Player de Vimeo
  - Información básica del proyecto
  - Fondo degradado morado→negro

**CTA**:
- "¿Necesitas video profesional para tu marca?"
- Botón: "Agenda tu consultoría" → /contacto

**Notas técnicas**:
- Grid responsive (3 columnas desktop, 2 tablet, 1 móvil)
- Videos de `vimeoVideos.js` (seleccionar 6-9 mejores)
- Lightbox con `framer-motion` para animaciones suaves
- Lazy loading de iframes
- **SIN métricas de performance** (focus en calidad visual)
- Hover state con `transform: scale(1.05)` + sombra cian
- Lightbox con `framer-motion` para animaciones suaves
- Videos de `vimeoVideos.js` (33 URLs disponibles)
- Lazy loading de iframes

---

#### **Sección 8: Logos de Clientes**
**Objetivo**: Prueba social mediante reconocimiento de marca

**Elementos**:
- **Wall/slider** de logos de marcas (10-15)
- Fondo off-white o lavanda muy claro
- Copy breve: "Confían en nosotros" o "Marcas que crecen con nosotros"

**Notas técnicas**:
- Logos en escala de grises, hover → color
- Slider infinito con `keen-slider` o similar
- Responsive: 5 logos visibles desktop, 2-3 móvil

---

#### **Sección 9: Testimonios**
**Objetivo**: Validación emocional + resultados desde la voz del cliente

**Elementos**:
- **2-3 quotes** en cards grandes
- Cada testimonio:
  - Texto del testimonio (2-4 líneas)
  - Nombre + rol + empresa
  - Avatar/foto (opcional)
  - **Resultado concreto**: "Aumentamos ventas 3x en 6 meses"

**Notas técnicas**:
- Cards con `box-shadow` y borde lavanda
- Quote con comillas grandes decorativas
- Carrusel si hay más de 3 testimonios

---

#### **Sección 10: Planes (Start / Grow / Scale)**
**Objetivo**: Orientar sobre niveles de servicio sin pricing exacto

**Elementos**:
- **3 cards de planes** (grid horizontal)
- Cada plan:
  - Nombre del plan (Start / Grow / Scale)
  - Descripción breve (para quién es)
  - Bullets de entregables clave orientativos (5-7)
  - Nota: "Planes personalizables según objetivos"
  - CTA: "Solicitar propuesta"

**Ejemplo**:
```
START - Para marcas que inician en digital
- Video ads piloto (2-3 piezas)
- Setup de tracking y analytics
- Campaña en 1 canal (Meta o Google)
- Report mensual

GROW - Para marcas escalando con data
- Producción mensual de video (6-8 piezas)
- Campaña multi-canal (Meta, Google, TikTok)
- A/B testing creativo
- Insights + optimización
- Report quincenal

SCALE - Para marcas con presupuesto 6 figuras+
- Producción ilimitada + equipo dedicado
- Campañas en todos los canales
- IA + consultoría estratégica
- Report semanal + optimización continua
```

**Notas técnicas**:
- Card del plan "Grow" destacada (escala más grande, borde brillante)
- Hover: elevación de la card
- CTA con gradiente morado

---

#### **Sección 11: CTA Final + Newsletter**
**Objetivo**: Última oportunidad de conversión + captura de leads

**Elementos**:
- **Bandera morada** con degradado (full-width)
- Texto grande centrado: "Listos para crecer con estrategia y datos"
- Subtitle: "Agenda tu consultoría gratuita y descubre cómo hacer que tu marca crezca"
- **Botón CTA grande**: "Agenda tu consultoría" (cian brillante, animación de pulso)
- **Newsletter opcional**:
  - Copy: "O recibe tips de marketing digital en tu inbox"
  - Input email + botón "Suscribirse"

**Notas técnicas**:
- Fondo con gradiente morado→magenta
- CTA con `animation: pulse` sutil
- Newsletter con validación de email
- Integración con Mailchimp/ConvertKit (futuro)

---

### Resumen de Flujo Narrativo (Journey del Usuario)

1. **Hero (Sec1)**: Impacto + promesa → "Te veo"
2. **Diferenciadores (Sec2)**: Por qué nosotros → "Te entiendo"
3. **Servicios (Sec3)**: Qué hacemos → "Te informo"
4. **Casos (Sec4)**: Qué logramos → "Te demuestro"
5. **Metodología (Sec5)**: Cómo trabajamos → "Te tranquilizo"
6. **Video Showcase (Sec6)**: Qué producimos → "Te muestro calidad"
7. **Logos (Sec7)**: Quién confía → "Te valido (autoridad)"
8. **Testimonios (Sec8)**: Qué dicen → "Te valido (social)"
9. **Planes (Sec9)**: Cómo empezar → "Te estructuro"
10. **CTA Final (Sec10)**: Actúa ahora → "Te convierto"

**Resultado**: Embudo completo que mezcla racionalidad (secciones 2-5) con prueba visual (sección 6-8) y cierre persuasivo (secciones 9-10).

### Páginas de Servicios - Plantilla (8 secciones)
1. **Hero corto** (beneficio principal)
2. **Problemas que resolvemos** (3-4 bullets)
3. **Soluciones y entregables** (listas claras + ejemplos)
4. **Proceso específico** (mini flujo 4 pasos)
5. **Herramientas** (logos martech)
6. **Casos relacionados** (2-3)
7. **FAQs** (5-7)
8. **CTA** (agenda/solicitar propuesta)

## Patrones Comunes y Anti-Patrones

### ✅ HACER (OBLIGATORIO)
- **Páginas**: Siempre usar `LayoutBasic` a menos que se indique lo contrario
- **Estructura de carpetas**: Cada página `{nombre}.astro` → carpeta `src/components/{nombre}/`
- **Secciones**: Numerar siempre → `FeatureSeccion1.jsx`, `FeatureSeccion2.jsx`, etc.
- **CSS Modules**: 
  - Nomenclatura `camelCase` → `indexSeccion1.module.css`
  - SIEMPRE extensión `.module.css`
  - Importar: `import styles from '../css/Component.module.css'`
- **Traducciones**: Archivo por página → `translationsFeature.js`
- **Directivas Astro**: Usar `client:only` para componentes React con estado/hooks
- **Responsive**: TODO debe funcionar en móvil, tablet y desktop
- **Videos**: Usar iframes de Vimeo desde `vimeoVideos.js`
- **Colores**: Usar paleta morado/cian de Energy Media

### ❌ NO HACER (PROHIBIDO)
- **NO** usar `PascalCase` en archivos CSS → `IndexSeccion1.module.css` ❌
- **NO** mezclar componentes de diferentes páginas en la misma carpeta
- **NO** poner componentes específicos de página en `src/components/global/`
- **NO** mezclar Español/Inglés en el mismo objeto de traducción (separar `es` y `en`)
- **NO** usar estilos inline para animaciones complejas (usar CSS modules)
- **NO** importar React en archivos React modernos (transformación JSX automática)
- **NO** olvidar `transition:persist` para componentes animados entre navegaciones
- **NO** olvidar hacer responsive el diseño
- **NO** hardcodear URLs de Vimeo (usar `vimeoVideos.js`)
- **NO** usar colores fuera de la paleta Energy Media

## Archivos Clave de Referencia

| Archivo | Propósito |
|---------|-----------|
| `src/data/variables.js` | Átomos Nanostore (`isEnglish`), paleta de colores Energy Media |
| `src/data/signals.jsx` | Contexto `LangProvider`, hook `useLang()` |
| `src/data/vimeoVideos.js` | Lista completa de URLs de videos de Vimeo |
| `src/layouts/LayoutBasic.astro` | Layout principal con SEO, fuentes, estilos globales |
| `src/components/global/NavBar.jsx` | Navegación global con selector ES/EN |
| `src/components/global/VimeoPlayer.jsx` | Componente reutilizable para videos de Vimeo |
| `tailwind.config.mjs` | Tema personalizado de Tailwind con colores de marca Energy Media |

## Librerías de 3D y Animación

- **Three.js**: `@react-three/fiber`, `@react-three/drei` para modelos 3D (`.glb`, `.gltf` en `public/models/`)
- **Rive**: `@rive-app/react-canvas` para animaciones interactivas (archivos `.riv`)
- **GSAP**: Animaciones basadas en timeline para secuencias complejas (metodología, casos)
- **Framer Motion**: Animaciones de componentes React (layout, variants, carruseles)

## SEO & Datos Estructurados

- **Title y meta** por página orientados a "agencia digital, marketing, desarrollo web, IA"
- **Schema**: Organization, Product/Service, FAQPage, BreadcrumbList, VideoObject (en casos y reel)
- **Tracking**: GA4 + GTM + píxeles (Meta/LinkedIn/Google Ads)
- **Consent banner** obligatorio
- **Imágenes**: next-gen, lazy load
- **Video**: optimizado, Core Web Vitals

## Pruebas y Depuración

- **Type Checking**: `npm run build` ejecuta `astro check` automáticamente
- **DevTools del Navegador**: Las islas React son del lado del cliente, inspecciona con React DevTools
- **Advertencias de Consola**: Vigila discrepancias de hidratación (diferencias de renderizado servidor/cliente)
- **Pestaña Network**: Verifica carga de CSS Modules (deben estar con scope con hash: `IndexSeccion3.module.a1b2c3.css`)
- **Videos**: Verifica que iframes de Vimeo carguen correctamente (permitir `autoplay`, `fullscreen`)

## Notas de Despliegue

- **Target**: Generación de sitio estático (SSG)
- **Output**: Carpeta `dist/`
- **Adaptadores**: Configurados para Node.js (`@astrojs/node`) y Vercel (`@astrojs/vercel`)
- **Assets**: Fuentes pre-cargadas automáticamente, imágenes en `public/image/` (organizadas por funcionalidad)
- **Videos**: Embebidos vía Vimeo (no se hospedan localmente)

## Contexto de Negocio - Energy Media

### Identidad Actual
Energy Media es una **agencia digital full-service** que combina marketing, tecnología y creatividad para impulsar el crecimiento medible de empresas B2B y B2C. Con enfoque en resultados basados en datos, ofrece servicios integrados desde branding hasta desarrollo de aplicaciones, pasando por marketing digital y servicios de IA.

### Servicios Core (5 Pilares)
1. **Marketing Digital Integral**: SEO, SEM, Social Ads, Email Marketing, Influencers, Programmatic, CRO
2. **Branding & Identidad Corporativa Completa**: Logos, manuales de marca, diseño gráfico, estrategia de comunicación
3. **Desarrollo Web & E-commerce Profesional**: Sitios web, apps móviles, portales empresariales, e-commerce
4. **Servicios Especializados**: Inteligencia Artificial, Video Marketing, CRO, Analítica avanzada
5. **Consultoría Estratégica Personalizada**: Auditorías digitales, roadmaps de crecimiento, optimización continua

### Proceso de Trabajo (6 Pasos) - ACTUALIZADO
1. **Descubrimiento & Auditoría** (Semana 1) - Análisis de negocio + situación digital actual
2. **Estrategia & Roadmap** (Semana 2) - Plan de crecimiento 90 días con KPIs medibles
3. **Implementación & Setup** (Semanas 3-4) - Herramientas, tracking, martech, producción inicial
4. **Optimización Continua** (Mes 2+) - Test A/B, iteración creativa, mejora de CTR/CVR
5. **Reporting & Transparencia** (Ongoing) - Dashboards en tiempo real + calls estratégicas
6. **Escalamiento & Crecimiento** (Mes 3+) - Nuevos canales, audiencias, formatos

### Tono y Mensajes - ACTUALIZADO

**FILOSOFÍA**: Problema → Solución → Prueba (NO "Nosotros → Servicios → Contacto")

#### Principios de Copy:
- **Verbos activos**: "Transforma", "Domina", "Convierte", "Escala" (no pasivos)
- **Números concretos**: "+200% tráfico", "42:1 ROI", "$5,000 MXN valor" (no vagos)
- **Garantías explícitas**: "90 días o reembolso", "<2 horas respuesta", "Primeros resultados 30 días"
- **Beneficio-primero**: "Para pequeñas empresas iniciando..." (no "Nuestro plan básico...")
- **Transparencia**: Rangos de precio visibles ($8K-50K MXN), proceso detallado

#### Estructura de Servicio (Template):
```
1. TAGLINE emocional (1 línea)
2. PROBLEMA que resuelve (implícito o explícito)
3. SOLUCIÓN con bullets (3-5)
4. MÉTRICA de éxito (% aumento, ROI, tiempo)
5. CTA específico ("Explorar servicio →")
```

**Ejemplo aplicado**:
```
SEO & SEM Profesional 🎯

Tagline: "Domina Google. Más tráfico, más ventas."
Problema: (implícito: bajo ranking, poca visibilidad)
Solución:
  • Posicionamiento orgánico sostenible
  • Google Ads optimizados con datos
  • Analítica avanzada para decisiones
Métrica: "+200% tráfico orgánico en 6 meses (promedio)"
CTA: "Explorar SEO/SEM →"
```

#### Propuesta de Valor Central:
"Marketing digital + desarrollo web + IA. **Todo en un solo lugar**. Primeros resultados en 30 días o reembolso completo."

#### Diferenciadores Clave (énfasis):
- **IA & Automatización**: Chatbots, análisis predictivo, personalización a escala
- **Desarrollo Completo**: Apps móviles, portales web, CRM personalizado, e-commerce
- **Data-Driven Total**: Decisiones basadas en datos reales, no corazonadas
- **Garantía 90 Días**: Resultados medibles o dinero de vuelta

---

## Anti-Patrones (Para No Verse Genérica)

### ❌ **PROHIBIDO en Energy Media:**

#### **Contenido y Copy**:
1. **NO** "Nuestros 5 pilares" o "Nuestros servicios" explícito (demasiado corporativo/frío)
2. **NO** beneficios abstractos sin números ("Mejoramos tu presencia digital" → ❌ / "+200% tráfico web" → ✅)
3. **NO** servicios sin contexto de problema ("Hacemos SEO" → ❌ / "Domina Google con SEO" → ✅)
4. **NO** enfoque "us-focused" vs "client-focused" ("Somos expertos en..." → ❌ / "Transforma tu negocio con..." → ✅)
5. **NO** CTAs genéricos ("Click aquí", "Más info" → ❌ / "Agenda tu consultoría", "Ver resultados" → ✅)

#### **Diseño Visual**:
6. **NO** stock ilustrado sin relación cultural (priorizar footage propio o genérico profesional)
7. **NO** glassmorphism excesivo (solo navbar/footer, suficiente)
8. **NO** más de 3 colores por sección (disciplina 70/20/10: neutros/morados/acentos)
9. **NO** animaciones "rebote" o circus (usar easing suave `--em-ease-smooth`)
10. **NO** gradientes arcoíris (solo duotono morado/cian o morado/magenta)

#### **Accesibilidad**:
11. **NO** texto blanco sobre naranja/ámbar (contraste bajo - usar texto oscuro)
12. **NO** videos sin controles/pause (debe poder pausarse)
13. **NO** animaciones sin `@media (prefers-reduced-motion: reduce)`

#### **Estructura**:
14. **NO** videos sin métricas visibles (siempre badge de KPI si es caso de éxito)
15. **NO** PascalCase en archivos CSS (`IndexSeccion1.module.css` → ❌ / `indexSeccion1.module.css` → ✅)
16. **NO** mezclar ES/EN en mismo objeto de traducción (separar `es` y `en` estrictamente)
17. **NO** componentes específicos de página en `src/components/global/`
18. **NO** hardcodear URLs de Vimeo (usar `vimeoVideos.js`)
19. **NO** crear componentes con sufijo "B" (IndexSeccion8B → ❌ / **modificar IndexSeccion8.jsx existente** → ✅)

#### **Comunicación**:
20. **NO** hablar de "nosotros" antes de mostrar valor al cliente
21. **NO** esconder pricing (mostrar rangos MXN con disclaimer "personalizable")
22. **NO** omitir garantías/tiempos de respuesta (transparencia total)
23. **NO** mencionar OYE, TV, Emmy, "multicultural" como foco principal (ya eliminados)

---

## Componente Base: CinematicSection
