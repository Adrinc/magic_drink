# 🚀 Plan de Acción - Demo Compras (Procurement Portal)

**Proyecto**: Portal de Compras Internas para CBLuna  
**Fecha inicio**: 17 de febrero de 2026  
**Tiempo estimado total**: ~19.5 horas

---

## 🎨 PALETA DE COLORES

Colores extraídos del diseño de referencia para mantener el look "enterprise moderno":

```css
/* Color System - Procurement Portal */
:root {
  /* Backgrounds */
  --bg-primary: #0F172A;        /* Slate-950 - fondo principal oscuro */
  --bg-secondary: #1E293B;      /* Slate-900 - cards, panel carrito */
  --bg-topbar: #0A0E1A;         /* Casi negro con tinte azul - barra superior */
  --bg-card-light: #E2E8F0;     /* Slate-200 - tarjetas de producto */
  
  /* Accents & CTAs */
  --accent-primary: #3B82F6;    /* Blue-500 - botones principales */
  --accent-cyan: #22D3EE;       /* Cyan-400 - tab activo, iconos */
  --accent-green: #34D399;      /* Emerald-400 - badges "disponible" */
  
  /* Status Colors */
  --success: #10B981;           /* Green-500 - aprobado */
  --warning: #F59E0B;           /* Amber-500 - pendiente */
  --error: #EF4444;             /* Red-500 - rechazado */
  
  /* Pricing */
  --price-discount: #10B981;    /* Verde - precio final */
  --price-original: #EF4444;    /* Rojo - precio tachado */
  
  /* Text */
  --text-primary: #FFFFFF;      /* Blanco - títulos */
  --text-secondary: #94A3B8;    /* Slate-400 - subtítulos */
  --text-muted: #64748B;        /* Slate-500 - labels */
  
  /* Borders */
  --border-subtle: #334155;     /* Slate-700 - divisores suaves */
  --border-card: #475569;       /* Slate-600 - bordes de cards */
  
  /* Overlays & Shadows */
  --overlay-dark: rgba(15, 23, 42, 0.95);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.4);
}
```

---

## 📸 USO DE URLs EXTERNAS PARA IMÁGENES

**IMPORTANTE**: Para acelerar el desarrollo, se permite usar URLs externas para assets:

### Opciones válidas:

1. **Unsplash** (imágenes reales de calidad)
   ```javascript
   image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'
   ```

2. **Placeholder.co** (placeholders semánticos)
   ```javascript
   image: 'https://placehold.co/300x200/1e293b/22d3ee?text=Laptop+Dell'
   ```

3. **Assets locales** (para producción final)
   ```javascript
   image: '/image/purchases/products/laptop-dell.jpg'
   ```

### Patrón recomendado en componentes:

```jsx
const ProductCard = ({ product }) => {
  const imgSrc = product.image.startsWith('http') 
    ? product.image 
    : `${import.meta.env.BASE_URL}${product.image}`;
  
  return <img src={imgSrc} alt={product.name} />;
};
```

---

## 📋 FASES DE IMPLEMENTACIÓN

### **FASE 0: SETUP Y PREPARACIÓN** ⏱️ 30 min

**Objetivo**: Dejar el proyecto listo para desarrollo

#### ✅ Checklist:

- [ ] Crear estructura de carpetas:
  ```
  src/
  ├── components/purchases/
  │   ├── App/
  │   ├── screens/
  │   ├── ui/
  │   └── flows/
  ├── data/purchases/
  ├── stores/
  └── styles/
  ```

- [ ] Crear carpetas en `public/`:
  ```
  public/
  └── image/
      └── purchases/
          ├── products/
          ├── suppliers/
          └── illustrations/
  ```

- [ ] Instalar dependencias:
  ```bash
  npm install nanostores lucide-react
  npm install framer-motion  # opcional
  npm install recharts        # opcional para gráficas
  ```

- [ ] Configurar `astro.config.mjs`:
  ```javascript
  export default defineConfig({
    base: './compras_web_demo',
    integrations: [react()],
  });
  ```

- [ ] Crear `src/styles/procurement-theme.css` con paleta de colores

- [ ] Importar CSS global en Layout.astro

**Resultado esperado**: Estructura de carpetas lista, dependencias instaladas

---

### **FASE 1: MOCK DATA Y STORE** ⏱️ 1.5 horas

**Objetivo**: Crear base de datos simulada y estado global centralizado

#### Paso 1.1: Mock Data (45 min)

**Archivos a crear**:

##### `src/data/purchases/categories.js`
```javascript
export const categories = [
  { id: 'ti', name: 'TI', icon: '💻', color: '#3B82F6' },
  { id: 'oficina', name: 'Oficina', icon: '🪑', color: '#10B981' },
  { id: 'mantenimiento', name: 'Mantenimiento', icon: '🔧', color: '#F59E0B' },
  { id: 'marketing', name: 'Marketing', icon: '📢', color: '#EC4899' },
];
```

##### `src/data/purchases/suppliers.js`
```javascript
export const suppliers = [
  { id: 'sup-001', name: 'ComputoTech', rating: 4.5, leadTimeDays: 5 },
  { id: 'sup-002', name: 'OfficePro', rating: 4.2, leadTimeDays: 3 },
  { id: 'sup-003', name: 'Papier SA', rating: 4.8, leadTimeDays: 2 },
];
```

##### `src/data/purchases/products.js`
```javascript
export const products = [
  {
    id: 'prod-001',
    name: 'Dell Latitude 5520 Laptop 15.6"',
    categoryId: 'ti',
    supplierId: 'sup-001',
    price: 1199,
    contractAvailable: true,
    contractDiscount: 0.15,
    image: 'https://placehold.co/300x200/1e293b/22d3ee?text=Laptop+Dell',
    leadTimeDays: 5,
  },
  {
    id: 'prod-002',
    name: 'Silla Ergonómica de Malla Negra',
    categoryId: 'oficina',
    supplierId: 'sup-002',
    price: 249,
    contractAvailable: true,
    contractDiscount: 0.10,
    image: 'https://placehold.co/300x200/1e293b/10b981?text=Silla+Ergo',
    leadTimeDays: 7,
  },
  // ... agregar 8-10 productos en total
];

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId) {
  return products.filter(p => p.categoryId === categoryId);
}
```

##### `src/data/purchases/budgets.js`
```javascript
export const budgets = [
  { id: 'cc-ti', costCenter: 'TI', allocated: 500000, committed: 120000, spent: 85000 },
  { id: 'cc-oficina', costCenter: 'Oficina', allocated: 200000, committed: 45000, spent: 30000 },
  { id: 'cc-mkt', costCenter: 'Marketing', allocated: 300000, committed: 50800, spent: 40000 },
];
```

##### `src/data/purchases/seed.js`
```javascript
export function generateRequestId() {
  return `PR-${String(Date.now()).slice(-5)}`;
}

export function generateOrderId() {
  return `PO-${String(Date.now()).slice(-5)}`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}
```

#### Paso 1.2: Store Nanostores (45 min)

##### `src/stores/purchasesStore.js`
```javascript
import { atom, computed } from 'nanostores';
import { getProductById } from '../data/purchases/products';
import { generateRequestId, generateOrderId } from '../data/purchases/seed';

// ========== ATOMS ==========
export const $cart = atom([]);  // CartItem[]
export const $selectedRole = atom('employee');  // 'employee' | 'approver' | 'finance'
export const $budget = atom({ allocated: 1000000, committed: 215800, spent: 0 });
export const $requests = atom([]);  // PurchaseRequest[]
export const $orders = atom([]);    // PurchaseOrder[]

// ========== COMPUTED ==========
export const $cartTotal = computed($cart, (items) => {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product) return sum;
    return sum + (product.price * item.qty);
  }, 0);
});

export const $budgetAvailable = computed($budget, (b) => {
  return b.allocated - b.committed - b.spent;
});

export const $cartItemCount = computed($cart, (items) => {
  return items.reduce((count, item) => count + item.qty, 0);
});

// ========== ACTIONS: CARRITO ==========
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

export function updateCartItemQty(productId, qty) {
  const cart = $cart.get();
  const item = cart.find(i => i.productId === productId);
  
  if (item) {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      item.qty = qty;
      $cart.set([...cart]);
    }
  }
}

export function removeFromCart(productId) {
  $cart.set($cart.get().filter(item => item.productId !== productId));
}

export function clearCart() {
  $cart.set([]);
}

// ========== ACTIONS: SOLICITUDES ==========
export function createRequest(requestData) {
  const cart = $cart.get();
  const total = $cartTotal.get();
  
  const newRequest = {
    id: generateRequestId(),
    createdAt: new Date().toISOString(),
    requesterName: 'Usuario Demo',
    status: 'Enviada',
    items: cart.map(item => {
      const product = getProductById(item.productId);
      return {
        productId: item.productId,
        qty: item.qty,
        price: product.price,
        name: product.name,
      };
    }),
    total,
    approvals: [
      {
        date: new Date().toISOString(),
        role: 'Empleado',
        action: 'creada',
        user: 'Usuario Demo',
      }
    ],
    ...requestData,
  };
  
  $requests.set([...$requests.get(), newRequest]);
  clearCart();
  
  // Actualizar presupuesto comprometido
  const budget = $budget.get();
  budget.committed += total;
  $budget.set({ ...budget });
  
  return newRequest;
}

export function approveRequest(requestId, comment = '') {
  const requests = $requests.get();
  const request = requests.find(r => r.id === requestId);
  
  if (request && request.status === 'Enviada') {
    request.status = 'Aprobada';
    request.approvals.push({
      date: new Date().toISOString(),
      role: 'Aprobador',
      action: 'aprobada',
      user: 'Aprobador Demo',
      comment,
    });
    $requests.set([...requests]);
  }
}

export function rejectRequest(requestId, reason = '') {
  const requests = $requests.get();
  const request = requests.find(r => r.id === requestId);
  
  if (request && request.status === 'Enviada') {
    request.status = 'Rechazada';
    request.approvals.push({
      date: new Date().toISOString(),
      role: 'Aprobador',
      action: 'rechazada',
      user: 'Aprobador Demo',
      comment: reason,
    });
    $requests.set([...requests]);
    
    // Liberar presupuesto comprometido
    const budget = $budget.get();
    budget.committed -= request.total;
    $budget.set({ ...budget });
  }
}

// ========== ACTIONS: ÓRDENES ==========
export function generateOrder(requestId) {
  const request = $requests.get().find(r => r.id === requestId);
  
  if (!request || request.status !== 'Aprobada') {
    console.error('Solo se pueden generar órdenes desde solicitudes aprobadas');
    return null;
  }
  
  const newOrder = {
    id: generateOrderId(),
    requestId,
    supplierId: 'sup-001', // simplificado
    status: 'Generada',
    createdAt: new Date().toISOString(),
    items: request.items,
    total: request.total,
    costCenter: request.costCenter,
  };
  
  $orders.set([...$orders.get(), newOrder]);
  return newOrder;
}

export function updateOrderStatus(orderId, newStatus) {
  const orders = $orders.get();
  const order = orders.find(o => o.id === orderId);
  
  if (order) {
    order.status = newStatus;
    $orders.set([...orders]);
    
    // Si se cierra, mover de comprometido a gastado
    if (newStatus === 'Cerrada') {
      const budget = $budget.get();
      budget.committed -= order.total;
      budget.spent += order.total;
      $budget.set({ ...budget });
    }
  }
}

// ========== ACTIONS: ROLES ==========
export function setRole(role) {
  $selectedRole.set(role);
}
```

**Checklist Paso 1**:
- [ ] Todos los archivos de mock data creados
- [ ] Store con atoms, computed y actions
- [ ] Probar en consola: `addToCart('prod-001')` y verificar que funciona

---

### **FASE 2: UI BASE Y LAYOUT** ⏱️ 2 horas

**Objetivo**: TopBar + Tab Navigation + Layout principal

#### Paso 2.1: Layout Astro (15 min)

##### Modificar `src/layouts/Layout.astro`
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
  <link rel="stylesheet" href="/src/styles/procurement-theme.css" />
</head>
<body>
  <slot />
  {showFooter && (
    <footer>
      <p>© 2026 CBLuna - Portal de Compras</p>
    </footer>
  )}
</body>
</html>

<style>
  body {
    margin: 0;
    padding: 0;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
</style>
```

#### Paso 2.2: Componentes UI Base (1 hora)

##### `src/components/purchases/ui/Badge.jsx`
```jsx
import styles from './ui.module.css';

const statusColors = {
  Borrador: 'gray',
  Enviada: 'blue',
  'En aprobación': 'yellow',
  Aprobada: 'green',
  Rechazada: 'red',
  Generada: 'blue',
  Enviada: 'cyan',
  Recibida: 'green',
  Cerrada: 'gray',
};

export default function Badge({ status, size = 'md' }) {
  const color = statusColors[status] || 'gray';
  
  return (
    <span className={`${styles.badge} ${styles[`badge-${color}`]} ${styles[`badge-${size}`]}`}>
      {status}
    </span>
  );
}
```

##### `src/components/purchases/ui/TabNav.jsx`
```jsx
import { useState } from 'react';
import { ShoppingBag, FileText, Package, BarChart3 } from 'lucide-react';
import styles from './ui.module.css';

const tabs = [
  { id: 'catalog', label: 'Catálogo', icon: ShoppingBag },
  { id: 'requests', label: 'Solicitudes', icon: FileText },
  { id: 'orders', label: 'Órdenes', icon: Package },
  { id: 'reports', label: 'Reportes', icon: BarChart3 },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <nav className={styles.tabNav}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={18} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```

##### `src/components/purchases/ui/TopBar.jsx`
```jsx
import { useStore } from '@nanostores/react';
import { $selectedRole, $budget, $budgetAvailable, setRole } from '../../../stores/purchasesStore';
import TabNav from './TabNav';
import styles from './ui.module.css';

const roles = [
  { id: 'employee', label: 'Empleado' },
  { id: 'approver', label: 'Aprobador' },
  { id: 'finance', label: 'Finanzas' },
];

export default function TopBar({ activeTab, onTabChange }) {
  const role = useStore($selectedRole);
  const budget = useStore($budget);
  const available = useStore($budgetAvailable);
  
  return (
    <header className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <div className={styles.brand}>
          <img 
            src={`${import.meta.env.BASE_URL}/image/logos/logo.png`} 
            alt="Logo" 
            className={styles.logo}
          />
          <span className={styles.brandText}>Portal de Compras</span>
        </div>
        
        <TabNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
      
      <div className={styles.topBarRight}>
        <div className={styles.budgetIndicator}>
          <span className={styles.budgetLabel}>Disponible</span>
          <span className={styles.budgetAmount}>
            ${available.toLocaleString('es-MX')}
          </span>
        </div>
        
        <select 
          className={styles.roleSelector}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map(r => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
        
        <a 
          href="https://cbluna.com/" 
          className={styles.backLink}
          target="_self"
        >
          Volver a CBLuna
        </a>
      </div>
    </header>
  );
}
```

##### `src/components/purchases/ui/ui.module.css` (básico)
```css
/* TopBar */
.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-topbar);
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
}

.topBarLeft {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.topBarRight {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 32px;
  height: 32px;
}

.brandText {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* TabNav */
.tabNav {
  display: flex;
  gap: 0.5rem;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab:hover {
  color: var(--text-primary);
}

.tabActive {
  color: var(--accent-cyan);
  border-bottom-color: var(--accent-cyan);
}

/* Budget Indicator */
.budgetIndicator {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.budgetLabel {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.budgetAmount {
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent-green);
}

/* Role Selector */
.roleSelector {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  color: var(--text-primary);
  cursor: pointer;
}

/* Back Link */
.backLink {
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  border: 1px solid var(--border-card);
  border-radius: 6px;
  transition: all 0.2s;
}

.backLink:hover {
  color: var(--text-primary);
  border-color: var(--accent-primary);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-green { background: rgba(16, 185, 129, 0.2); color: var(--success); }
.badge-blue { background: rgba(59, 130, 246, 0.2); color: var(--accent-primary); }
.badge-yellow { background: rgba(245, 158, 11, 0.2); color: var(--warning); }
.badge-red { background: rgba(239, 68, 68, 0.2); color: var(--error); }
.badge-gray { background: rgba(100, 116, 139, 0.2); color: var(--text-muted); }
```

#### Paso 2.3: App Principal (45 min)

##### `src/components/purchases/App/PurchasesApp.jsx`
```jsx
import { useState } from 'react';
import TopBar from '../ui/TopBar';
import CatalogScreen from '../screens/CatalogScreen';
import RequestsScreen from '../screens/RequestsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import styles from './purchasesApp.module.css';

export default function PurchasesApp() {
  const [activeTab, setActiveTab] = useState('catalog');
  
  return (
    <div className={styles.app}>
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className={styles.content}>
        {activeTab === 'catalog' && <CatalogScreen />}
        {activeTab === 'requests' && <RequestsScreen />}
        {activeTab === 'orders' && <OrdersScreen />}
        {activeTab === 'reports' && <ReportsScreen />}
      </main>
    </div>
  );
}
```

##### `src/components/purchases/App/purchasesApp.module.css`
```css
.app {
  min-height: 100vh;
  background: var(--bg-primary);
}

.content {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}
```

##### Crear archivos placeholder para las screens:
```jsx
// src/components/purchases/screens/CatalogScreen.jsx
export default function CatalogScreen() {
  return <div>Catálogo (próximamente)</div>;
}

// ... repetir para RequestsScreen, OrdersScreen, ReportsScreen
```

##### Modificar `src/pages/index.astro`
```astro
---
import Layout from '../layouts/Layout.astro';
import PurchasesApp from '../components/purchases/App/PurchasesApp.jsx';
---

<Layout title="Demo Compras | CBLuna" showFooter={false}>
  <PurchasesApp client:load />
</Layout>
```

**Checklist Fase 2**:
- [ ] Layout Astro actualizado con CSS global
- [ ] TopBar con logo, tabs, presupuesto, selector de rol
- [ ] TabNav funcional (cambia entre pantallas)
- [ ] App renderiza correctamente
- [ ] Ver en navegador: TopBar visible con tabs funcionales

---

### **FASE 3: CATÁLOGO + CARRITO** ⏱️ 3-4 horas

**Objetivo**: Pantalla principal funcional con carrito lateral

#### Paso 3.1: ProductCard (1 hora)

##### `src/components/purchases/ui/ProductCard.jsx`
```jsx
import { ShoppingCart, Check } from 'lucide-react';
import { addToCart } from '../../../stores/purchasesStore';
import { suppliers } from '../../../data/purchases/suppliers';
import styles from './ui.module.css';

export default function ProductCard({ product }) {
  const supplier = suppliers.find(s => s.id === product.supplierId);
  const finalPrice = product.contractAvailable 
    ? product.price * (1 - product.contractDiscount)
    : product.price;
  
  const imgSrc = product.image.startsWith('http') 
    ? product.image 
    : `${import.meta.env.BASE_URL}${product.image}`;
  
  const handleAddToCart = () => {
    addToCart(product.id, 1);
    // Opcional: mostrar toast
  };
  
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={imgSrc} alt={product.name} />
        {product.contractAvailable && (
          <div className={styles.contractBadge}>
            <Check size={14} />
            <span>Disponible por contrato</span>
          </div>
        )}
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productSupplier}>{supplier?.name}</p>
        
        <div className={styles.productPricing}>
          {product.contractAvailable && (
            <span className={styles.priceOriginal}>
              ${product.price.toLocaleString('es-MX')} USD
            </span>
          )}
          <span className={styles.priceFinal}>
            ${Math.round(finalPrice).toLocaleString('es-MX')} USD
          </span>
        </div>
        
        <button 
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
```

##### Agregar estilos de ProductCard a `ui.module.css`:
```css
/* Product Card */
.productCard {
  background: var(--bg-card-light);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.productCard:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.productImage {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.productImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contractBadge {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: var(--accent-green);
  color: var(--bg-primary);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.productInfo {
  padding: 1rem;
}

.productName {
  font-size: 1rem;
  font-weight: 600;
  color: var(--bg-primary);
  margin: 0 0 0.25rem 0;
}

.productSupplier {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0 0 1rem 0;
}

.productPricing {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.priceOriginal {
  font-size: 0.875rem;
  color: var(--price-original);
  text-decoration: line-through;
}

.priceFinal {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--price-discount);
}

.addToCartBtn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.addToCartBtn:hover {
  background: #2563EB;
}
```

#### Paso 3.2: CartPanel (1.5 horas)

##### `src/components/purchases/ui/CartPanel.jsx`
```jsx
import { useStore } from '@nanostores/react';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { 
  $cart, 
  $cartTotal, 
  $cartItemCount,
  updateCartItemQty, 
  removeFromCart 
} from '../../../stores/purchasesStore';
import { getProductById } from '../../../data/purchases/products';
import styles from './ui.module.css';

export default function CartPanel({ onCreateRequest }) {
  const cart = useStore($cart);
  const total = useStore($cartTotal);
  const itemCount = useStore($cartItemCount);
  
  if (cart.length === 0) {
    return (
      <aside className={styles.cartPanel}>
        <div className={styles.cartHeader}>
          <ShoppingCart size={20} />
          <h3>Carrito de Compras</h3>
          <span className={styles.cartCount}>0</span>
        </div>
        
        <div className={styles.emptyCart}>
          <p>Tu carrito está vacío</p>
        </div>
      </aside>
    );
  }
  
  return (
    <aside className={styles.cartPanel}>
      <div className={styles.cartHeader}>
        <ShoppingCart size={20} />
        <h3>Carrito de Compras</h3>
        <span className={styles.cartCount}>{itemCount}</span>
      </div>
      
      <div className={styles.cartItems}>
        {cart.map(item => {
          const product = getProductById(item.productId);
          if (!product) return null;
          
          const imgSrc = product.image.startsWith('http') 
            ? product.image 
            : `${import.meta.env.BASE_URL}${product.image}`;
          
          return (
            <div key={item.productId} className={styles.cartItem}>
              <img src={imgSrc} alt={product.name} className={styles.cartItemImage} />
              
              <div className={styles.cartItemInfo}>
                <p className={styles.cartItemName}>{product.name}</p>
                <p className={styles.cartItemPrice}>
                  ${product.price} USD
                </p>
              </div>
              
              <div className={styles.cartItemControls}>
                <button 
                  onClick={() => updateCartItemQty(item.productId, item.qty - 1)}
                  className={styles.qtyBtn}
                >
                  <Minus size={14} />
                </button>
                <span className={styles.qtyValue}>{item.qty}</span>
                <button 
                  onClick={() => updateCartItemQty(item.productId, item.qty + 1)}
                  className={styles.qtyBtn}
                >
                  <Plus size={14} />
                </button>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.productId)}
                className={styles.removeBtn}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
      
      <div className={styles.cartSummary}>
        <div className={styles.cartSubtotal}>
          <span>Subtotal</span>
          <span className={styles.subtotalAmount}>
            ${total.toLocaleString('es-MX')} USD
          </span>
        </div>
        
        <div className={styles.cartImpact}>
          <h4>Impacto estimado</h4>
          <div className={styles.impactRow}>
            <span>Comprometido</span>
            <span className={styles.impactValue}>
              −${total.toLocaleString('es-MX')}
            </span>
          </div>
          <div className={styles.impactRow}>
            <span>Centro de costo</span>
            <span className={styles.impactValue}>Pendiente</span>
          </div>
        </div>
        
        <button 
          className={styles.createRequestBtn}
          onClick={onCreateRequest}
        >
          Crear Solicitud de Compra
        </button>
        
        <button className={styles.viewCartBtn}>
          Ver Carrito
        </button>
      </div>
    </aside>
  );
}
```

##### Estilos CartPanel en `ui.module.css`:
```css
/* Cart Panel */
.cartPanel {
  position: sticky;
  top: 80px;
  width: 360px;
  height: fit-content;
  max-height: calc(100vh - 100px);
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cartHeader {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.cartHeader h3 {
  margin: 0;
  font-size: 1.125rem;
  flex: 1;
}

.cartCount {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--accent-primary);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.emptyCart {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--text-muted);
}

.cartItems {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.cartItem {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.cartItemImage {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.cartItemInfo {
  flex: 1;
  min-width: 0;
}

.cartItemName {
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cartItemPrice {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

.cartItemControls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qtyBtn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border: 1px solid var(--border-card);
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-primary);
}

.qtyValue {
  font-size: 0.875rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.removeBtn {
  background: transparent;
  border: none;
  color: var(--error);
  cursor: pointer;
  padding: 0.25rem;
}

.cartSummary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.cartSubtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}

.subtotalAmount {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-cyan);
}

.cartImpact {
  background: rgba(59, 130, 246, 0.1);
  padding: 1rem;
  border-radius: 8px;
}

.cartImpact h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.impactRow {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.impactValue {
  font-weight: 600;
  color: var(--accent-cyan);
}

.createRequestBtn {
  width: 100%;
  padding: 0.875rem;
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.createRequestBtn:hover {
  background: #2563EB;
}

.viewCartBtn {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.viewCartBtn:hover {
  color: var(--text-primary);
  border-color: var(--accent-primary);
}
```

#### Paso 3.3: CatalogScreen completo (1.5 horas)

##### `src/components/purchases/screens/CatalogScreen.jsx`
```jsx
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { products } from '../../../data/purchases/products';
import { categories } from '../../../data/purchases/categories';
import ProductCard from '../ui/ProductCard';
import CartPanel from '../ui/CartPanel';
import styles from './screens.module.css';

export default function CatalogScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className={styles.catalogScreen}>
      <div className={styles.catalogMain}>
        {/* Hero */}
        <div className={styles.catalogHero}>
          <div className={styles.heroContent}>
            <h1>Bienvenido al Portal de Compras Internas</h1>
            <p>Gestiona la adquisición de productos y servicios de forma eficiente y bajo presupuesto.</p>
          </div>
          <div className={styles.heroIllustration}>
            {/* Ilustración isométrica aquí */}
          </div>
        </div>
        
        {/* Search & Filters */}
        <div className={styles.catalogFilters}>
          <div className={styles.searchBar}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Buscar productos o servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className={styles.filterBtn}>
            <Filter size={18} />
            Filtrar
          </button>
        </div>
        
        {/* Category Filters */}
        <div className={styles.categoryChips}>
          <button 
            className={`${styles.chip} ${selectedCategory === 'all' ? styles.chipActive : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`${styles.chip} ${selectedCategory === cat.id ? styles.chipActive : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Cart Panel - Sticky */}
      <CartPanel onCreateRequest={() => setShowRequestModal(true)} />
      
      {/* Modal crear solicitud - FASE 4 */}
      {showRequestModal && (
        <div>Modal aquí (Fase 4)</div>
      )}
    </div>
  );
}
```

##### `src/components/purchases/screens/screens.module.css` (básico)
```css
/* Catalog Screen */
.catalogScreen {
  display: flex;
  gap: 2rem;
}

.catalogMain {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Hero */
.catalogHero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
}

.heroContent h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.heroContent p {
  margin: 0;
  color: var(--text-secondary);
  max-width: 600px;
}

/* Search & Filters */
.catalogFilters {
  display: flex;
  gap: 1rem;
}

.searchBar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
}

.searchBar input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
}

.filterBtn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.filterBtn:hover {
  border-color: var(--accent-primary);
}

/* Category Chips */
.categoryChips {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.chip:hover {
  color: var(--text-primary);
  border-color: var(--accent-primary);
}

.chipActive {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

/* Products Grid */
.productsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

**Checklist Fase 3**:
- [ ] ProductCard con imágenes (URLs externas OK)
- [ ] CartPanel lateral sticky
- [ ] Agregar productos actualiza carrito en tiempo real
- [ ] Controles qty (+/-) funcionan
- [ ] Subtotal se calcula correctamente
- [ ] Filtros por categoría funcionan
- [ ] Búsqueda filtra productos

---

### **FASE 4: WIZARD CREAR SOLICITUD** ⏱️ 2 horas

**(Contenido detallado en el Copilot Instructions - resumo aquí)**

#### Objetivos:
- [ ] Modal base genérico
- [ ] CreateRequestModal con 3 pasos (datos, resumen, notas)
- [ ] Al confirmar: crear solicitud, vaciar carrito, cambiar a tab Solicitudes
- [ ] Mostrar toast de confirmación

---

### **FASE 5: SOLICITUDES Y APROBACIÓN** ⏱️ 2.5 horas

#### Objetivos:
- [ ] RequestsScreen con tabla/lista de solicitudes
- [ ] Filtros por estado (tabs)
- [ ] RequestDetailDrawer con timeline
- [ ] Acciones por rol (Empleado: ver, Aprobador: aprobar/rechazar)
- [ ] Timeline actualiza al aprobar/rechazar

---

### **FASE 6: ÓRDENES** ⏱️ 1.5 horas

#### Objetivos:
- [ ] Botón "Generar Orden" en solicitud aprobada
- [ ] OrdersScreen con lista de órdenes
- [ ] Detalle de orden (modal o drawer)
- [ ] Cambiar estados de orden (Generada → Enviada → Recibida → Cerrada)

---

### **FASE 7: REPORTES** ⏱️ 2 horas

#### Objetivos:
- [ ] 6 KPI Cards (Presupuesto, Comprometido, Gastado, Disponible, Solicitudes, Órdenes)
- [ ] KPIs derivados del store (NO hardcodeados)
- [ ] 2 gráficas simples (Gasto por categoría, Top proveedores)
- [ ] Verificar que KPIs cambian al crear/aprobar/cerrar

---

### **FASE 8: POLISH Y RESPONSIVE** ⏱️ 2 horas

#### Objetivos:
- [ ] Responsive mobile (<768px)
- [ ] Carrito se convierte en modal/drawer en mobile
- [ ] Grid productos: 1 columna en mobile
- [ ] Animaciones con Framer Motion (tabs, modales)
- [ ] Testing funcional completo

---

### **FASE 9: ASSETS Y BRANDING** ⏱️ 1 hora

#### Objetivos:
- [ ] Reemplazar placeholders con imágenes finales (si aplica)
- [ ] Ilustración isométrica en hero
- [ ] Logos y favicons
- [ ] Optimizar assets

---

### **FASE 10: DEPLOY Y DOCS** ⏱️ 30 min

#### Objetivos:
- [ ] `npm run build` sin errores
- [ ] Preview local funciona
- [ ] README con instrucciones
- [ ] Git commit final

---

## ✅ DEFINITION OF DONE (DoD)

La demo se considera **COMPLETA** cuando:

- [ ] En **Catálogo** se pueden agregar items al carrito y ver subtotal actualizado
- [ ] El botón **Crear Solicitud** crea una solicitud con estado `Enviada` y vacía el carrito
- [ ] En **Solicitudes** se puede abrir detalle y (con rol Aprobador) aprobar/rechazar
- [ ] Una solicitud **Aprobada** permite **Generar Orden** desde su detalle
- [ ] En **Órdenes** aparece la nueva orden con estado inicial `Generada`
- [ ] En **Reportes** cambian al menos 2 KPIs dinámicamente (comprometido, solicitudes abiertas)
- [ ] El selector de **Roles** cambia permisos visibles en UI (botones de aprobación, etc.)
- [ ] **Responsive**: Funciona en mobile (375px) y tablet (768px)
- [ ] **Sin errores**: No hay errores en consola del navegador
- [ ] **Botón CBLuna**: Enlaza correctamente a https://cbluna.com/

---

## 📊 RESUMEN DE TIEMPOS

| Fase | Duración | Acumulado |
|------|----------|-----------|
| 0. Setup | 0.5h | 0.5h |
| 1. Mock Data + Store | 1.5h | 2h |
| 2. UI Base + Layout | 2h | 4h |
| 3. Catálogo + Carrito | 4h | 8h |
| 4. Wizard Solicitud | 2h | 10h |
| 5. Solicitudes + Aprobación | 2.5h | 12.5h |
| 6. Órdenes | 1.5h | 14h |
| 7. Reportes | 2h | 16h |
| 8. Polish + Responsive | 2h | 18h |
| 9. Assets + Branding | 1h | 19h |
| 10. Deploy + Docs | 0.5h | **19.5h** |

---

## 🎯 PRÓXIMOS PASOS

**Acción inmediata**: Ejecutar **FASE 0 (Setup)** para dejar el proyecto listo.

¿Listo para empezar? 🚀
