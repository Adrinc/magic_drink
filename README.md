# 🛒 Portal de Compras Internas - Demo CBLuna

**Demo interactiva de Portal de Procurement / Marketplace Empresarial Privado**

> Un sistema moderno de gestión de compras internas con experiencia e-commerce + gobernanza corporativa

![Astro](https://img.shields.io/badge/Astro-5.10.0-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer&logoColor=white)

---

## 🎯 ¿Qué es este proyecto?

Portal moderno de compras internas donde los empleados de una empresa:

- ✅ Navegan un **catálogo interno** de productos/servicios autorizados
- ✅ Crean **solicitudes de compra** (Purchase Requests)
- ✅ Aprueban/rechazan con **flujo de aprobaciones** por rol
- ✅ Generan **órdenes de compra** desde solicitudes aprobadas
- ✅ Monitorean **reportes** con control presupuestal en tiempo real

**NO es un e-commerce real** — no hay checkout ni pagos. Es una demo funcional con mock data.

---

## 🚀 Quick Start

### Prerequisitos
- Node.js 18+ 
- npm o pnpm

### Instalación

```bash
# 1. Clonar o descargar el proyecto
cd compras_web_demo

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:4321/cbl_compras_web_demo
```

### Comandos disponibles

| Comando | Acción |
|---------|--------|
| `npm install` | Instalar dependencias |
| `npm run dev` | Dev server en `localhost:4321` |
| `npm run build` | Build producción → `./dist/` |
| `npm run preview` | Preview del build local |
| `npm run astro check` | Validar tipos TypeScript |

---

## 📁 Estructura del Proyecto

```
compras_web_demo/
├── src/
│   ├── components/purchases/
│   │   ├── App/
│   │   │   └── PurchasesApp.jsx          # Root component (tabs + layout)
│   │   ├── screens/
│   │   │   ├── CatalogScreen.jsx         # Catálogo productos
│   │   │   ├── RequestsScreen.jsx        # Solicitudes de compra
│   │   │   ├── OrdersScreen.jsx          # Órdenes de compra
│   │   │   └── ReportsScreen.jsx         # Reportes + KPIs
│   │   ├── ui/
│   │   │   ├── TopBar.jsx                # Barra superior (tabs, rol, presupuesto)
│   │   │   ├── ProductCard.jsx           # Tarjeta producto
│   │   │   ├── CartPanel.jsx             # Carrito lateral
│   │   │   ├── Badge.jsx                 # Estados (aprobada/rechazada)
│   │   │   └── Modal.jsx                 # Modal genérico
│   │   └── flows/
│   │       ├── CreateRequestModal.jsx    # Wizard crear solicitud
│   │       ├── RequestDetailDrawer.jsx   # Detalle solicitud
│   │       └── OrderDetailDrawer.jsx     # Detalle orden
│   ├── data/purchases/
│   │   ├── products.js                   # Mock: productos
│   │   ├── suppliers.js                  # Mock: proveedores
│   │   ├── budgets.js                    # Mock: presupuestos
│   │   └── categories.js                 # Mock: categorías
│   ├── stores/
│   │   └── purchasesStore.js             # Nanostores (estado global)
│   ├── pages/
│   │   └── index.astro                   # Entry point
│   └── layouts/
│       └── LayoutPurchases.astro         # Layout base
├── public/
│   └── image/purchases/
│       ├── illustrations/
│       │   ├── catalog-hero.svg          # Hero catálogo
│       │   └── empty-state.svg           # Estados vacíos
│       ├── products/                     # Imágenes de productos
│       └── logo-compras.svg              # Logo del portal
└── astro.config.mjs                      # Config Astro (base: /cbl_compras_web_demo)
```

---

## 🎨 Stack Tecnológico

### Core
- **Astro 5.10.0** — Framework (SSG + React islands)
- **React 18** — UI components con `client:load`
- **Nanostores** — Estado global reactivo

### Estilos
- **CSS Modules** — Estilos component-scoped (NO Tailwind)
- **Responsive** — 5 breakpoints (1400px/1200px/1024px/768px/480px)
- **Dark Theme** — Variables CSS custom

### Animaciones
- **Framer Motion** — Animaciones fluidas (modal, drawer, tabs, cart items)

### Gráficas
- **Recharts** — Gráficas de reportes (BarChart, PieChart)

### Iconos
- **Lucide React** — Iconos minimalistas

---

## 🎭 Simulación de Roles

El selector en TopBar cambia permisos UI (sin auth real):

| Rol | Permisos |
|-----|----------|
| **Empleado** | Navegar catálogo, crear solicitudes |
| **Aprobador** | Aprobar/rechazar solicitudes, generar órdenes |
| **Finanzas** | Ver reportes, monitorear presupuesto |

---

## 🧪 Flujo Completo (DoD)

### 1. Catálogo → Carrito
- Navegar productos
- Agregar al carrito (lateral fijo)
- Ver subtotal e impacto presupuestal

### 2. Crear Solicitud
- Click "Crear Solicitud"
- Wizard: datos básicos + centro costo + notas
- Solicitud creada con estado "Enviada"

### 3. Aprobación
- Cambiar a rol "Aprobador"
- Ver solicitudes pendientes
- Abrir detalle → Aprobar/Rechazar

### 4. Generar Orden
- Solicitud aprobada → botón "Generar Orden de Compra"
- Orden creada con estado "Generada"

### 5. Reportes Dinámicos
- KPIs actualizan automáticamente:
  - Presupuesto disponible
  - Monto comprometido
  - Solicitudes abiertas
  - Gasto por categoría (gráfica)

---

## 📱 Responsive Design

### Desktop (>1400px)
- Carrito lateral fijo 340px
- Grid productos: 4 columnas
- Tabs inline en TopBar

### Tablet (1024-1200px)
- Carrito 300px
- Grid productos: 2 columnas
- Tablas con scroll horizontal

### Mobile (≤768px)
- **Carrito → bottom sheet** con swipe handle
- Grid productos: 1 columna
- Tabs con iconos (sin texto)
- Botones full-width
- Drawers full-screen

---

## 🎬 Animaciones Implementadas

- **TabNav**: Hover scale 1.02, tap 0.98
- **Modal**: Fade + scale + y-offset entrance
- **Drawers**: Slide-in desde derecha (300ms easeOut)
- **CartPanel items**: Fade-in staggered, exit con slide
- **ProductCard**: Lift hover (-4px), fade-in inicial

---

## 🚢 Deploy

### Build

```bash
npm run build
```

Output en `./dist/` listo para:
- Vercel
- Netlify
- GitHub Pages (configura `base` en `astro.config.mjs`)
- Servidor estático (Nginx, Apache, etc.)

### Configuración BASE_URL

En `astro.config.mjs`:

```javascript
export default defineConfig({
  base: '/cbl_compras_web_demo',  // Ajustar según deploy
  // ...
});
```

**IMPORTANTE**: 
- Assets en JSX/Astro SIEMPRE usan `${import.meta.env.BASE_URL}/...`
- Assets en CSS usan paths absolutos (Astro los resuelve)

---

## 🛠️ Desarrollo

### Agregar nuevo producto

1. Editar `src/data/purchases/products.js`:

```javascript
{
  id: 'prod-xxx',
  name: 'Producto Nuevo',
  categoryId: 'ti',
  supplierId: 'sup-001',
  price: 299,
  contractAvailable: true,
  contractDiscount: 0.10,
  image: 'https://placehold.co/400x300/1e293b/22d3ee?text=Nuevo',
  description: 'Descripción del producto',
  stock: 'available'
}
```

2. (Opcional) Agregar imagen real en `public/image/purchases/products/`

### Agregar nueva pantalla

1. Crear component en `src/components/purchases/screens/`
2. Importar en `PurchasesApp.jsx`
3. Agregar tab en `TabNav.jsx` con icono Lucide
4. Agregar estilos en `screens.module.css`

### Modificar flujo de aprobación

Editar `src/stores/purchasesStore.js` → funciones:
- `approveRequest()`
- `rejectRequest()`
- `generateOrder()`

---

## 🐛 Troubleshooting

### Servidor no inicia
```bash
# Puerto ocupado — Astro busca automáticamente el siguiente
# Verificar en terminal qué puerto usó (ej: 4323)
```

### Assets no cargan
```jsx
// ❌ INCORRECTO
<img src="/image/logo.png" />

// ✅ CORRECTO
<img src={`${import.meta.env.BASE_URL}/image/logo.png`} />
```

### Carrito no actualiza
- Verificar que usas `$cart.set([...cart])` (nuevo array)
- Nanostores requiere inmutabilidad

### Reportes no reflejan cambios
- KPIs deben ser `computed` derivados del estado
- NO hardcodear valores

---

## 📄 Licencia

Demo con fines ilustrativos para CBLuna. Mock data generado con Placehold.co.

---

## 👨‍💻 Autor

**CBLuna** — [cbluna.com](https://cbluna.com)

---

## 🎓 Notas Técnicas

### Por qué CSS Modules (no Tailwind)
- Mejor organización para layouts complejos
- Scoping automático (no class conflicts)
- Reutilización via composición
- Variables CSS custom para theming

### Por qué Nanostores
- Ultra ligero (< 1KB)
- Reactivo sin re-renders innecesarios
- Computed values automáticos
- Framework-agnostic (funciona con Astro + React)

### Por qué Framer Motion
- Animaciones declarativas
- AnimatePresence para enter/exit
- Layout animations automáticas
- Mejor DX que CSS transitions

---

**¿Preguntas o mejoras?** Contacta a CBLuna → [cbluna.com](https://cbluna.com)

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
