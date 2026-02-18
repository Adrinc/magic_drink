# Demo Compras (Procurement Portal) — Copilot Instructions

## Contexto del Proyecto

Este proyecto es una **demo interactiva de Portal de Compras Internas** para CBLuna. No es un ERP clásico con sidebar; es un **Portal Corporativo de Procurement** (marketplace empresarial privado) donde los usuarios de una empresa:

* Exploran un **Catálogo Interno** (productos/servicios autorizados)
* Crean **Solicitudes de Compra** (Purchase Requests - PR)
* Generan **Órdenes de Compra** (Purchase Orders - PO)
* Revisan **Reportes** (control presupuestal y analítica)

**Concepto central**: Experiencia moderna tipo e-commerce + gobernanza corporativa, sin caer en "checkout" real.

### Mensaje del Producto

> "Facilitamos adquisiciones internas con trazabilidad, control de presupuesto y aprobaciones integradas."

### Alcance de la Demo (MVP)

La demo debe sentirse completa con estos flujos mínimos:

1. **Catálogo → Carrito → Crear Solicitud**
2. **Solicitud (Enviada) → Aprobación (simulada) → Aprobada**
3. **Generar Orden** desde solicitud aprobada
4. **Órdenes** visibles con cambios de estado
5. **Reportes** reflejan cambios dinámicos (contador de solicitudes, monto comprometido, gasto por categoría)

**IMPORTANTE**: NO hay pagos reales. Todo es simulación con mock data.

---

## Stack Principal

* **Framework**: Astro 5.x con integración de React 18
* **Estilos**: CSS Modules (`.module.css`) — **NO Tailwind** para pantallas complejas
* **Estado global**: Nanostores para carrito, solicitudes, órdenes, presupuesto y rol actual
* **Iconos**: Lucide React
* **Animaciones** (opcional): Framer Motion para micro-transiciones (tabs, modales)

### Principios No Negociables

✅ **Mantener una sola fuente de verdad** para: carrito, solicitudes, órdenes, presupuesto  
✅ **NO duplicar lógica** por pantalla — componentes reutilizables  
✅ **Mock data centralizado** en `src/data/purchases/`  
✅ **Componentes pequeños** (cards, badges, tabs, modales, tabla simple)  
✅ **CSS Modules obligatorio** para layouts complejos (no Tailwind)

---

## Arquitectura de Pantallas (TopBar + Tabs)

La UI principal es un layout con **TopBar fijo + navegación por Tabs**:


### Pantallas Principales

#### 1. **Catálogo**
* Grid de productos/servicios autorizados
* Filtros: categoría, proveedor, rango de precio, "solo por contrato"
* Panel lateral fijo: **Carrito de Compras**
  * Items con qty +/- y subtotal
  * Bloque "Impacto Estimado" (comprometido, centro de costo)
  * CTA principal: **Crear Solicitud de Compra**

#### 2. **Solicitudes**
* Lista/tabla de solicitudes con estados:  
  `Borrador | Enviada | En aprobación | Aprobada | Rechazada`
* Detalle con timeline de eventos y acciones por rol

#### 3. **Órdenes**
* Lista de órdenes generadas con estados:  
  `Generada | Enviada | Recibida | Cerrada`
* Vista detalle (cabecera + items + proveedor)

#### 4. **Reportes**
* KPIs dinámicos: Presupuesto usado, Comprometido, Disponible, Solicitudes abiertas
* Gráficas simples (pueden derivarse desde mock data)
* Drill-down opcional (click en KPI → lista filtrada)

### Roles (Simulación sin Auth Real)

Selector simple en TopBar que cambia permisos en UI:

* **Empleado** — crea solicitudes, navega catálogo
* **Aprobador** — aprueba/rechaza solicitudes
* **Finanzas** — monitorea reportes y presupuestos

---

## Estructura del Proyecto

```
src/
├── pages/
│   └── index.astro                    # Entry point (monta la app React)
├── layouts/
│   └── Layout.astro                   # Layout base (metadata, fondo, nav global)
├── components/
│   └── purchases/
│       ├── App/
│       │   ├── PurchasesApp.jsx       # Root component (tabs + layout)
│       │   └── purchasesApp.module.css
│       ├── screens/
│       │   ├── CatalogScreen.jsx      # Pantalla: Catálogo
│       │   ├── RequestsScreen.jsx     # Pantalla: Solicitudes
│       │   ├── OrdersScreen.jsx       # Pantalla: Órdenes
│       │   ├── ReportsScreen.jsx      # Pantalla: Reportes
│       │   └── screens.module.css
│       ├── ui/
│       │   ├── TopBar.jsx             # Barra superior (logo, tabs, rol, presupuesto)
│       │   ├── TabNav.jsx             # Navegación por tabs
│       │   ├── ProductCard.jsx        # Tarjeta de producto
│       │   ├── CartPanel.jsx          # Panel lateral: carrito
│       │   ├── Badge.jsx              # Badge de estado (aprobada, rechazada, etc.)
│       │   ├── Modal.jsx              # Modal genérico
│       │   └── ui.module.css
│       └── flows/
│           ├── CreateRequestModal.jsx  # Wizard: crear solicitud (datos + centro costo + notas)
│           └── RequestDetailDrawer.jsx # Drawer: detalle/timeline/acciones
├── data/
│   └── purchases/
│       ├── products.js                # Mock: productos
│       ├── suppliers.js               # Mock: proveedores
│       ├── budgets.js                 # Mock: presupuestos por centro de costo
│       ├── categories.js              # Mock: categorías
│       └── seed.js                    # Helpers para generar IDs/fechas
├── stores/
│   └── purchasesStore.js              # Nanostores: carrito + solicitudes + órdenes + rol
└── public/
    ├── fonts/
    ├── icons/
    └── image/
        └── purchases/                 # Mock images (productos, banners, logos proveedores)
```

---

## Modelo de Datos (Mock)

Define estructuras simples como objetos JS y respétalas en todo el proyecto:

### Product
```javascript
{
  id: 'prod-001',
  name: 'Dell Latitude 5520 Laptop 15.6"',
  categoryId: 'computech',
  supplierId: 'sup-001',
  price: 1199,
  uom: 'USD',  // unidad de medida
  contractAvailable: true,
  contractDiscount: 0.15,  // 15% descuento si es por contrato
  image: '/image/purchases/products/laptop.png',
  leadTimeDays: 5
}
```

### Supplier
```javascript
{
  id: 'sup-001',
  name: 'ComputoTech',
  rating: 4.5,
  leadTimeDays: 5
}
```

### Budget
```javascript
{
  id: 'cc-001',
  costCenter: 'TI',
  allocated: 500000,    // asignado
  committed: 120000,    // comprometido (solicitudes enviadas/aprobadas)
  spent: 85000          // gastado (órdenes cerradas)
}
```

### CartItem
```javascript
{
  productId: 'prod-001',
  qty: 2
}
```

### PurchaseRequest
```javascript
{
  id: 'PR-00021',
  createdAt: '2026-02-15T10:30:00Z',
  requesterName: 'Carlos Pérez',
  costCenter: 'TI',
  priority: 'Normal',  // 'Normal' | 'Urgente'
  status: 'Enviada',   // 'Borrador' | 'Enviada' | 'En aprobación' | 'Aprobada' | 'Rechazada'
  items: [
    { productId: 'prod-001', qty: 2, price: 1199 }
  ],
  total: 2398,
  notes: 'Requerido para equipo nuevo',
  approvals: [
    { date: '2026-02-15T10:30:00Z', role: 'Empleado', action: 'creada' },
    { date: '2026-02-15T14:20:00Z', role: 'Aprobador', action: 'aprobada', comment: 'OK' }
  ]
}
```

### PurchaseOrder
```javascript
{
  id: 'PO-00011',
  requestId: 'PR-00021',
  supplierId: 'sup-001',
  status: 'Generada',  // 'Generada' | 'Enviada' | 'Recibida' | 'Cerrada'
  createdAt: '2026-02-15T15:00:00Z',
  items: [
    { productId: 'prod-001', qty: 2, price: 1199 }
  ],
  total: 2398
}
```

> **Regla crítica**: Todo lo que se "mueve" (status, commitments, totales) se calcula desde el store.

---

## Patrón de Estado (Nanostores)

### Store Principal (`src/stores/purchasesStore.js`)

```javascript
import { atom, computed } from 'nanostores';

// Atoms
export const $cart = atom([]);  // CartItem[]
export const $selectedRole = atom('employee');  // 'employee' | 'approver' | 'finance'
export const $budget = atom({ allocated: 1000000, committed: 215800, spent: 0 });
export const $requests = atom([]);  // PurchaseRequest[]
export const $orders = atom([]);    // PurchaseOrder[]

// Computed
export const $cartTotal = computed($cart, (items) => {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product.price * item.qty);
  }, 0);
});

export const $budgetAvailable = computed($budget, (b) => {
  return b.allocated - b.committed - b.spent;
});

// Actions
export function addToCart(productId, qty = 1) {
  const cart = $cart.get();
  const existing = cart.find(item => item.productId === productId);
  
  if (existing) {
    existing.qty += qty;
    $cart.set([...cart]);
  } else {
    $cart.set([...cart, { productId, qty }]);
  }
}

export function removeFromCart(productId) {
  $cart.set($cart.get().filter(item => item.productId !== productId));
}

export function createRequest(requestData) {
  const newRequest = {
    id: `PR-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...requestData,
    status: 'Enviada',
    approvals: [
      { date: new Date().toISOString(), role: 'Empleado', action: 'creada' }
    ]
  };
  
  $requests.set([...$requests.get(), newRequest]);
  $cart.set([]);  // Vaciar carrito
}

export function approveRequest(requestId, comment = '') {
  const requests = $requests.get();
  const request = requests.find(r => r.id === requestId);
  
  if (request) {
    request.status = 'Aprobada';
    request.approvals.push({
      date: new Date().toISOString(),
      role: 'Aprobador',
      action: 'aprobada',
      comment
    });
    $requests.set([...requests]);
  }
}

export function generateOrder(requestId) {
  const request = $requests.get().find(r => r.id === requestId);
  
  if (request && request.status === 'Aprobada') {
    const newOrder = {
      id: `PO-${Date.now()}`,
      requestId,
      supplierId: request.items[0].supplierId,  // simplificado
      status: 'Generada',
      createdAt: new Date().toISOString(),
      items: request.items,
      total: request.total
    };
    
    $orders.set([...$orders.get(), newOrder]);
  }
}
```

### Reglas de Negocio

1. **Carrito**: agregar/quitar/cambiar qty → subtotal calculado
2. **Crear solicitud**: convierte carrito → `PurchaseRequest` (estado: `Enviada`) y limpia carrito
3. **Aprobar**: cambia `status` a `Aprobada` y agrega evento en `approvals`
4. **Generar orden**: desde solicitud `Aprobada` crea `PurchaseOrder`
5. **Reportes**: KPIs derivados del estado (NO hardcodeados)

---

## Integración Astro + React

### Página única (recomendado para demo)

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import PurchasesApp from '../components/purchases/App/PurchasesApp.jsx';
---

<Layout title="Demo Compras | CBLuna" showFooter={false}>
  <PurchasesApp client:load />
</Layout>
```

**Directivas críticas:**
- `client:load`: Componente se hidrata inmediatamente
- **NO usar** `client:only` (debe ser SSR-compatible)

### Layout base (`src/layouts/Layout.astro`)

```astro
---
interface Props {
  title: string;
  showFooter?: boolean;
}

const { title, showFooter = false } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="icon" href={`${import.meta.env.BASE_URL}/favicon.png`} />
  <title>{title}</title>
</head>
<body>
  <slot />
  {showFooter && <footer>© 2026 CBLuna</footer>}
</body>
</html>
```

---

## Gestión de Assets y Base URL

**CRÍTICO**: Este proyecto usa una base URL configurada en `astro.config.mjs`:

```javascript
export default defineConfig({
  base: './compras_web_demo',  // ajustar según deploy
  // ...
});
```

### Reglas obligatorias para rutas de assets:

#### 1. Archivos `.astro` y componentes React (`.jsx`):
**SIEMPRE usar `import.meta.env.BASE_URL` para assets en `public/`**

```jsx
// ✅ CORRECTO
<img src={`${import.meta.env.BASE_URL}/image/purchases/products/laptop.png`} alt="Laptop" />
<link rel="icon" href={`${import.meta.env.BASE_URL}/favicon.png`} />

// ❌ INCORRECTO - se romperá en producción
<img src="/image/purchases/products/laptop.png" alt="Laptop" />
<link rel="icon" href="/favicon.png" />
```

#### 2. Archivos CSS Modules (`.module.css`):
**NO usar BASE_URL** - CSS se procesa diferente por Astro

```css
/* ✅ CORRECTO en .module.css */
.productCard {
  background-image: url('/image/purchases/bg-pattern.png');
}
```

#### 3. Fonts en archivos CSS globales:
Para fonts referenciadas desde CSS, agregar manualmente la base:

```css
/* CORRECTO */
@font-face {
  font-family: 'Inter';
  src: url('./compras_web_demo/fonts/Inter.ttf') format('truetype');
}
```

### Patrón común: imágenes dinámicas en React
```jsx
const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img 
        src={`${import.meta.env.BASE_URL}${product.image}`} 
        alt={product.name} 
      />
      <h3>{product.name}</h3>
      <p>${product.price} USD</p>
    </div>
  );
};
```

---

## Convenciones de Código

### Estructura de Componentes React
```jsx
// 1. Imports: React → third-party → stores → data → componentes locales → estilos
import React, { useState, useEffect } from "react";
import { ShoppingCart, Filter } from 'lucide-react';
import { $cart, addToCart } from '../../../stores/purchasesStore';
import { products } from '../../../data/purchases/products';
import ProductCard from '../ui/ProductCard';
import styles from './catalogScreen.module.css';

// 2. Component con props destructuring
const CatalogScreen = () => {
  const [filters, setFilters] = useState({ category: 'all' });
  
  useEffect(() => { 
    // Lógica de inicialización
  }, []);
  
  return (
    <div className={styles.catalog}>
      {/* ... */}
    </div>
  );
};

export default CatalogScreen;
```

### Nomenclatura
- **Componentes React**: PascalCase (`CatalogScreen.jsx`, `ProductCard.jsx`)
- **CSS Modules**: camelCase (`catalogScreen.module.css`, `productCard.module.css`)
- **Data files**: camelCase (`products.js`, `suppliers.js`)
- **Props**: camelCase (`selectedRole`, `onApprove`)
- **Store actions**: camelCase (`addToCart`, `createRequest`)

### Comandos de Desarrollo

```bash
npm run dev      # Dev server localhost:4321
npm run build    # astro check && astro build
npm run preview  # Preview build localmente
```

---

## Errores Críticos a Evitar

### Críticos (Rompen funcionalidad)
- ❌ **NO duplicar** lógica de carrito/solicitudes por pantalla - usar store centralizado
- ❌ **NO hardcodear** KPIs en Reportes - deben derivarse del estado
- ❌ **NO usar** rutas de assets sin `import.meta.env.BASE_URL` en JSX/Astro
- ❌ **NO omitir** `client:load` en componentes interactivos
- ❌ **NO usar** Tailwind para layouts complejos - CSS Modules obligatorio
- ❌ **NO convertirlo en ecommerce real** - NO checkout/pago, solo workflow de aprobación

### Mejores Prácticas
- ✅ **Usar** store centralizado (Nanostores) como única fuente de verdad
- ✅ **Centralizar** mock data en `src/data/purchases/`
- ✅ **Aplicar** CSS variables para theming consistente
- ✅ **Mantener** componentes pequeños y reutilizables
- ✅ **Derivar** reportes y KPIs desde el estado (no hardcode)
- ✅ **Simular** roles sin auth real (solo selector UI)

---

## Estructura de TopBar

```jsx
// components/purchases/ui/TopBar.jsx
const TopBar = () => {
  const role = useStore($selectedRole);
  const budget = useStore($budget);
  
  return (
    <header className={styles.topBar}>
      <div className={styles.brand}>
        <img src={`${import.meta.env.BASE_URL}/image/logos/logo.png`} alt="Logo" />
        <span>Portal de Compras</span>
      </div>
      
      <TabNav />
      
      <div className={styles.indicators}>
        <BudgetIndicator 
          available={budget.allocated - budget.committed - budget.spent} 
          total={budget.allocated}
        />
        <RoleSelector value={role} onChange={(r) => $selectedRole.set(r)} />
        <a href="https://cbluna.com/" className={styles.backLink}>
          Volver a CBLuna
        </a>
      </div>
    </header>
  );
};
```

**IMPORTANTE**: El botón "Volver a CBLuna" debe:
- Enlazar a `https://cbluna.com/`
- NO abrir en nueva ventana (`target="_self"` o sin target)
- Usar `<a>` nativo, NO React Router Link

---

## Definition of Done (DoD)

Se considera lista la demo cuando:

✅ En **Catálogo** se pueden agregar items al carrito y ver subtotal actualizado  
✅ El botón **Crear Solicitud** crea una solicitud con estado `Enviada` y vacía el carrito  
✅ En **Solicitudes** se puede abrir detalle y (con rol Aprobador) aprobar/rechazar  
✅ Una solicitud **Aprobada** permite **Generar Orden** desde su detalle  
✅ En **Órdenes** aparece la nueva orden con estado inicial `Generada`  
✅ En **Reportes** cambian al menos 2 KPIs dinámicamente (comprometido, solicitudes abiertas)  
✅ El selector de **Roles** cambia permisos visibles en UI (botones de aprobación, etc.)

---

## Referencias Rápidas

### Añadir nuevo producto:
1. Agregar objeto en `src/data/purchases/products.js`
2. Asegurar que `image` existe en `public/image/purchases/products/`
3. Verificar `categoryId` y `supplierId` válidos

### Cambiar estados de solicitud:
1. Modificar en `src/stores/purchasesStore.js` → `approveRequest()` o `rejectRequest()`
2. Agregar evento al array `approvals` con timestamp
3. Actualizar UI en `RequestDetailDrawer.jsx`

### Agregar nuevo KPI en Reportes:
1. Crear `computed` en store si es derivado
2. Agregar card en `ReportsScreen.jsx`
3. Mostrar valor actualizado desde store

### Debugging común:
- **Carrito no actualiza**: Verificar que usas `$cart.set([...cart])` (nuevo array)
- **KPIs no cambian**: Revisar que no estén hardcodeados - deben leer del store
- **Assets no cargan**: Agregar `import.meta.env.BASE_URL` en JSX
- **Botón no reactivo**: Agregar `client:load` en componente Astro

---

## Notas de Implementación

1. **Performance**: Lazy load modales/drawers con `React.lazy()` si pesan
2. **Mobile**: Carrito lateral se convierte en drawer/modal en viewport <768px
3. **Animaciones**: Usar Framer Motion solo para transiciones críticas (tabs, modales)
4. **Assets**: Productos mock en `public/image/purchases/products/` con naming `product-id.jpg`
5. **Testing**: Probar flujo completo (catálogo → solicitud → aprobación → orden → reportes)

---

## Mensaje de la Demo

**NO**: "Es un ERP pesado y complicado"  
**SÍ**: "Es un portal moderno que simplifica compras internas con control total"

La demo debe sentirse como un **flujo natural de trabajo**, NO como software legacy.

---

**Tiempo estimado de implementación**: 
- **Phase 1** (Catálogo + Carrito): 4-6 horas  
- **Phase 2** (Solicitudes + Aprobación): 4-6 horas  
- **Phase 3** (Órdenes + Reportes): 3-4 horas  
- **Total**: ~12-16 horas para demo completa funcional


