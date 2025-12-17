
# copilot-instructions.md — Magic Drink  
*(Versión Alpha / v0 del Portal Oficial)*  

---
# 🟣 Descripción de la Magic Drink

Magic Drink es una bebida moderna que, en el mundo real, se ha convertido en un fenómeno global. Superó a todas las sodas tradicionales no por ser más agresiva o dañina, sino por lo contrario: es extremadamente adictiva a nivel sensorial, pero no contiene cafeína ni sustancias perjudiciales para la salud. Esto la volvió un caso único y desconcertante para la industria.

Su efecto no es el de un “golpe de energía” artificial, sino una sensación inmediata de bienestar, enfoque y ligereza emocional. Las personas describen que al beberla se sienten más animadas, creativas y de buen humor, como si el día se volviera un poco más llevadero. Nadie puede explicar del todo por qué funciona tan bien… solo que funciona.

Magic Drink se posiciona como una bebida joven, colorida y optimista, asociada a la música, el arte digital, la cultura pop y la estética kawaii-electrónica. Su imagen pública está ligada a DJ Sweet Hex (Hexy), la carismática brujita musical que actúa como rostro de la marca: no como una simple mascota, sino como un ícono cultural reconocido por campañas, comerciales y eventos.

En la vida cotidiana, Magic Drink está en todas partes: tiendas, escuelas, conciertos, máquinas expendedoras y anuncios urbanos. Es “normal” verla, pero al mismo tiempo genera una fidelidad extraña; quienes la prueban suelen integrarla a su rutina diaria sin cuestionarlo demasiado.

Oficialmente, Magic Drink es solo una bebida innovadora, saludable y legal.
Extraoficialmente… incluso en el mundo real, hay algo en ella que no termina de sentirse del todo normal.

# 🟣 Descripción de Hexy

Hexy es la mascota oficial y rostro musical de Magic Drink, una brujita DJ diseñada para representar la energía creativa, divertida y moderna de la marca.

🎨 Apariencia visual

Hexy tiene una estética kawaii–pop con toque mágico y futurista. Visualmente destaca por:

💗 Cabello rosa intenso, largo y dinámico, que suele verse en movimiento como si siempre estuviera siguiendo un ritmo invisible.

👀 Ojos fucsia brillantes, grandes y expresivos, que transmiten entusiasmo, picardía y cercanía.

🧙‍♀️ Sombrero de bruja icónico, símbolo de su magia musical y de la identidad fantástica de la marca.

🎀 Vestimenta: traje de marinero blanco con adornos azul marino, un moño grande rojo en el pecho, falda azul marino, calcetas negras, botas negras

✨ Estrellas, notas musicales y efectos luminosos como elementos gráficos recurrentes, reforzando su vínculo con la música y la energía.

Su diseño está pensado para funcionar tanto en ilustración como en animación, empaques, anuncios y escenarios digitales, manteniendo siempre una imagen adorable, energética y memorable.

🎧 La música de Hexy y su relación con Magic Drink

La música de Hexy no es solo un acompañamiento: es parte del concepto central de Magic Drink.

🎶 Hexy produce y “lanza” música como si fuera magia: canciones hiper pegajosas, rítmicas y alegres, inspiradas en estilos como kawaii EDM, electro pop, electro swing y house ligero.

🧠 Sus canciones están diseñadas para generar un efecto tipo brainworm: ritmos que se quedan en la cabeza, coros repetitivos y sonidos juguetones que evocan energía constante.

🧃 Esto conecta directamente con Magic Drink, que se presenta como una bebida que activa, anima y acompaña, sin cafeína ni picos artificiales: la energía es emocional, creativa y sensorial.

💫 En el lore de marca, la música de Hexy es la “chispa” que representa cómo Magic Drink transforma momentos cotidianos en experiencias más vivas y divertidas.

Así, Magic Drink no solo se consume: se escucha, se siente y se asocia a un estado de ánimo, y Hexy es la manifestación visual y sonora de ese estado.

🌟 Rol como ícono de marca

En conjunto, Hexy funciona como:

El símbolo emocional de Magic Drink.

La voz musical de la marca.

Una figura que mezcla fantasía, ritmo y cercanía juvenil.

Hexy no vende solo una bebida: vende una experiencia energética positiva, alegre y creativa, donde música y sabor forman parte del mismo concepto.

# 🟣 Descripción General del Proyecto

Este es el portal web oficial de **Magic Drink**, la bebida más popular del mundo.  
Es un sitio corporativo moderno, kawaii, vibrante y construido con:

- **Astro 5 + React 18**  
- Arquitectura SSG + islas de interactividad  
- Sistema híbrido de **Tailwind CSS + CSS Modules**  
- En el futuro: animaciones con **GSAP**, **Rive** y **Three.js**  
- En la versión **ALPHA (v0)**: solo estructura, UI y contenido estático, sin animaciones avanzadas

La web presenta:

- Sabores  
- Productos  
- Merch oficial  
- **DJ Sweet Hex (Hexy)** como idol/mascota  
- **Wonderpop Plaza**  
- Desfiles del “**Día de la Magic Drink**”  
- Testimonios exageradamente positivos  
- Información corporativa ficticia (misión, visión, historia, valores, etc.)

El tono es **comercial, kawaii y mágico**, con un toque de “rareza positiva”.  
No hay elementos oscuros ni lore onírico. No hay Veltheris, eclipse, sueños alterados, ni virus.  
Magic Drink existe **dentro del mundo real**, pero con fenómenos positivos ligeramente inexplicables.

---

# 🟪 Reglas de Oro

## 1. Estructura de carpetas
Cada página `.astro` tiene su propia carpeta:

```
src/pages/{pagina}.astro
src/components/{pagina}/Secciones/
src/components/{pagina}/components/
src/components/{pagina}/css/
```

## 2. Layout obligatorio  
Usar SIEMPRE:

```
import LayoutBasic from '../layouts/LayoutBasic.astro';
```

## 3. Nomenclatura
- Componentes React: **PascalCase.jsx**
- CSS Modules: **archivo.module.css** en **camelCase**
- Assets: nombres claros, sin espacios

## 4. Contenido del universo Magic Drink
El contenido DEBE cumplir:

- Magic Drink es **la bebida más popular del mundo**  
- Es **deliciosa, saludable, adictiva de manera positiva**  
- NO contiene cafeína, pero aun así **da energía**  
- Hexy + Magic Drink = experiencia favorita del público  
- DJ Sweet Hex (compositor) es un misterio sin resolver  
- Wonderpop Plaza = centro comercial oficial  
- Día de la Magic Drink = desfile anual kawaii gigante  
- Raro pero NO oscuro, nunca peligroso

## ❌ Prohibido mencionar:
- Veltheris  
- Eclipse  
- Sueños / planos oníricos  
- Virus / Noctivox / HEX  
- Elementos inquietantes  
- Efectos negativos  
- Glitches

---

# 🎨 Sistema Visual “Kawaii Cosmic Refresh”

## Paleta (CSS variables globales)
```
--md-purple: #AA37F2;
--md-purple-dark: #6822A8;
--md-pink: #FF6AD7;
--md-blue: #82D2FF;

--md-yellow: #F9F871;
--md-mint: #98FFDE;

--md-white: #FFFFFF;
--md-gray: #F8F4FB;
--md-gray-dark: #2C2633;

--md-gradient-main: linear-gradient(135deg, #FF6AD7, #AA37F2);
--md-gradient-sparkle: linear-gradient(135deg, #82D2FF, #F9F871);
--md-gradient-hero: linear-gradient(180deg, rgba(0,0,0,0) 0%, #2C2633 90%);
```

## Tipografías
- **Poppins ExtraBold** — títulos  
- **Inter 400–600** — texto general  
- Estilo kawaii suave, redondeado, sin serif

## Iconografía
- Estrellas, burbujas, corazones, notas musicales
- Estilo redondeado kawaii

### Íconos Oficiales (ubicación: `public/icons/`)

**Logo principal:**
- `public/logo.png` — Logo oficial de Magic Drink

**Íconos de navegación (PNG):**
- `icono_lata.png` — Bebidas/Drinks
- `icono_hexy.png` — Hexy Music
- `icono_bolsa.png` — Merch Oficial
- `icono_globo.png` — Magic Drink Day
- `icono_plaza.png` — Wonderpop Plaza
- `icono_gorro.png` — (adicional)

**Íconos de redes sociales (SVG):**
- `insta.svg` — Instagram
- `facebook.svg` — Facebook
- `twitter.svg` — Twitter
- `linkedin.svg` — LinkedIn
- `vimeo.svg` — Vimeo

**IMPORTANTE:** 
- NO usar emojis genéricos (🥤, 🎧, 📷, etc.) en producción
- Siempre usar los íconos PNG/SVG oficiales del proyecto
- Aplicar `filter: brightness(0) invert(1)` en modo oscuro
- Los íconos PNG de navegación deben ser 24x24px
- Los íconos SVG de redes sociales deben ser 20x20px

## Sombras
```
--md-shadow-card: 0 8px 24px rgba(170, 55, 242, 0.15);
--md-shadow-hover: 0 12px 32px rgba(255, 106, 215, 0.25);
```

---

# 🧃 Componentes Globales

Ubicación:  
`src/components/global/`

Incluye:

- NavBar.jsx  
- FootNetHive.jsx (Footer oficial con íconos reales)
- ButtonPrimary.jsx  
- ButtonSecondary.jsx  
- MagicCard.jsx  
- TestimonialCard.jsx  
- SectionWrapper.jsx  
- AudioPlayer.jsx  

---

# 🗂️ Estructura del Proyecto

```
src/
├── pages/
│   ├── index.astro
│   ├── bebidas.astro
│   ├── hexy.astro
│   ├── merch.astro
│   ├── magicdrinkday.astro
│   ├── wonderpop.astro
│   └── contacto.astro
├── components/
│   ├── index/
│   ├── bebidas/
│   ├── hexy/
│   ├── merch/
│   ├── magicdrinkday/
│   ├── wonderpop/
│   └── contacto/
├── layouts/
│   └── LayoutBasic.astro
├── data/
│   ├── translations.js
│   └── translations{Pagina}.js
└── public/
    ├── images/
    ├── drinks/
    ├── hexy/
    ├── merch/
    └── parade/
```

---

# 📄 Páginas del Portal (Alpha)

## 🏠 1. Inicio (index.astro)
Secciones:

1. Hero con video + degradado  
2. Sabor clásico (lata default)  
3. Sabores destacados  
4. Hexy highlight  
5. Magic Drink Day (teaser)  
6. Merch destacado  
7. Testimonios  
8. Wonderpop Plaza  
9. CTA final  

## 🥤 2. Bebidas
- Lista completa de sabores  
- Ingredientes ficticios  
- Notas de sabor  
- Presentaciones  

## 🎧 3. Hexy Music
- Mascota Hexy  
- Player  
- Portadas  
- ¿Quién es DJ Sweet Hex? (misterio positivo)  

## 🧸 4. Merch
- Productos kawaii  
- Cápsulas sorpresa  
- Peluches, llaveros  
- Ediciones limitadas  

## 🎉 5. Magic Drink Day
- Fotos del desfile  
- Carrozas  
- Reporte “LIVE”  
- Hashtags  

## 🏬 6. Wonderpop Plaza
- Qué es  
- Sucursales ficticias  
- Tienda oficial  

## ✉️ 7. Contacto
- Formulario  
- Información para prensa  
- Logos descargables  

---

# 💬 Testimonios — Reglas

Los testimonios deben ser:

- Positivos  
- Exagerados pero no absurdos  
- Kawaii  
- Centrados en:
  - energía sin cafeína  
  - felicidad  
  - creatividad  
  - sabor perfecto  
  - combinación con música de Hexy  

Ejemplos:

> “Sabe increíble. No tiene cafeína, pero me deja con energía.”  
> “Hexy + Magic Drink = día perfecto.”  
> “No he vuelto a probar otra marca.”  
> “Es adictiva… pero en el buen sentido.”  

---

# 🧁 Narrativa Corporativa

El copy debe sonar como:

- marca gigante  
- confiable  
- con éxito mundial  
- que inspira creatividad y felicidad  
- con un toque de misterio positivo

Plantilla:

1. Promesa mágica  
2. Beneficio inesperado  
3. Rareza suave  
4. Identidad con Hexy  

Ejemplo:

> “Magic Drink ilumina tus días. Su sabor único levanta el ánimo sin cafeína. La ciencia aún debate por qué funciona tan bien — pero tus momentos felices hablan por sí solos.”

---

# ❌ Anti-Patrones (prohibido)
- Cualquier mención a Veltheris, eclipse, virus, sueños  
- Glitches o estética inquietante  
- Temas oscuros  
- Mensajes negativos o ambiguos  
- Glassmorphism excesivo  
- Gradientes saturados estilo arcoíris duro  
- Copys genéricos de empresa sin personalidad kawaii  

---

# ✨ Futuro (v1 – no implementar en Alpha)

- Rive (stickers animados)  
- Modelo 3D de la lata  


---

# ✔️ Conclusión

Este archivo define:

- Identidad visual  
- Tono kawaii corporativo  
- Estructura Astro  
- Convenciones de código  
- Qué es permitido y qué prohibido  
- Estilo narrativo  
- Flujo del portal  
- Introducción a futuras animaciones  

Es la guía oficial para desarrollar el portal **Magic Drink**.

