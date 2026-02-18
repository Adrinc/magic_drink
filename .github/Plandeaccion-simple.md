# Plan de Acción Simplificado - Demo Compras

**Tiempo total estimado: ~19.5 horas**

---

## FASE 0: SETUP Y PREPARACIÓN (30 min)

1. Crear estructura de carpetas en `src/components/purchases/` (App, screens, ui, flows)
2. Crear carpetas en `src/data/purchases/`
3. Crear carpeta `src/stores/`
4. Crear carpetas en `public/image/purchases/` (products, suppliers, illustrations)
5. Instalar dependencias: nanostores, lucide-react, framer-motion, recharts
6. Configurar `astro.config.mjs` con BASE_URL
7. Crear archivo CSS global con paleta de colores
8. Importar CSS en Layout.astro

---

## FASE 1: MOCK DATA Y STORE (1.5 horas)

### Paso 1.1: Crear Mock Data (45 min)
1. Crear `categories.js` con 4 categorías (TI, Oficina, Mantenimiento, Marketing)
2. Crear `suppliers.js` con 3-5 proveedores
3. Crear `products.js` con 8-10 productos (usar URLs externas para imágenes)
4. Crear `budgets.js` con presupuestos por centro de costo
5. Crear `seed.js` con helpers para generar IDs y fechas

### Paso 1.2: Crear Store Nanostores (45 min)
1. Crear atoms: cart, selectedRole, budget, requests, orders
2. Crear computed: cartTotal, budgetAvailable, cartItemCount
3. Crear actions para carrito: addToCart, updateCartItemQty, removeFromCart, clearCart
4. Crear actions para solicitudes: createRequest, approveRequest, rejectRequest
5. Crear actions para órdenes: generateOrder, updateOrderStatus
6. Crear action: setRole
7. Probar en consola que funciona

---

## FASE 2: UI BASE Y LAYOUT (2 horas)

### Paso 2.1: Modificar Layout Astro (15 min)
1. Actualizar Layout.astro con metadata
2. Importar CSS global
3. Configurar body con fondo oscuro

### Paso 2.2: Crear Componentes UI Base (1 hora)
1. Crear Badge.jsx (etiquetas de estado con colores)
2. Crear TabNav.jsx (navegación entre Catálogo, Solicitudes, Órdenes, Reportes)
3. Crear TopBar.jsx (logo, tabs, presupuesto, selector de rol, botón CBLuna)
4. Crear ui.module.css con estilos para todos los componentes UI

### Paso 2.3: Crear App Principal (45 min)
1. Crear PurchasesApp.jsx como componente raíz
2. Agregar state para tab activo
3. Renderizar TopBar y pantallas según tab
4. Crear archivos placeholder para las 4 screens (Catalog, Requests, Orders, Reports)
5. Modificar index.astro para montar PurchasesApp
6. Verificar que se ve TopBar con tabs funcionales

---

## FASE 3: CATÁLOGO + CARRITO (3-4 horas)

### Paso 3.1: Crear ProductCard (1 hora)
1. Crear ProductCard.jsx con imagen, nombre, precio
2. Mostrar proveedor
3. Mostrar badge "Disponible por contrato" si aplica
4. Mostrar precio original tachado y precio final
5. Agregar botón "Añadir al carrito"
6. Conectar con store (addToCart)
7. Agregar estilos a ui.module.css

### Paso 3.2: Crear CartPanel (1.5 horas)
1. Crear CartPanel.jsx sticky a la derecha
2. Mostrar header con icono y contador de items
3. Listar items con imagen miniatura
4. Agregar controles qty (+/-) y botón eliminar
5. Mostrar subtotal
6. Agregar bloque "Impacto Estimado"
7. Agregar botón "Crear Solicitud de Compra"
8. Agregar botón "Ver Carrito"
9. Manejar estado vacío
10. Agregar estilos a ui.module.css

### Paso 3.3: Crear CatalogScreen (1.5 horas)
1. Crear layout con hero pequeño
2. Agregar barra de búsqueda
3. Agregar botón "Filtrar"
4. Agregar chips de categorías
5. Crear grid de productos
6. Integrar CartPanel sticky
7. Implementar filtro por categoría
8. Implementar búsqueda por texto
9. Agregar estilos a screens.module.css
10. Verificar que todo funciona en tiempo real

---

## FASE 4: WIZARD CREAR SOLICITUD (2 horas)

### Paso 4.1: Crear Modal Base (30 min)
1. Crear Modal.jsx genérico
2. Agregar overlay oscuro
3. Agregar contenedor centrado
4. Agregar header con título y botón cerrar
5. Agregar body con scroll
6. Agregar footer para botones

### Paso 4.2: Crear CreateRequestModal (1.5 horas)
1. Crear wizard con 3 pasos
2. Paso 1: Datos generales (solicitante, centro de costo, prioridad)
3. Paso 2: Resumen (items, total, advertencias)
4. Paso 3: Notas opcionales
5. Agregar navegación entre pasos
6. Conectar con createRequest del store
7. Vaciar carrito al confirmar
8. Mostrar toast de confirmación
9. Cambiar a tab "Solicitudes"
10. Agregar estilos

---

## FASE 5: SOLICITUDES Y APROBACIÓN (2.5 horas)

### Paso 5.1: Crear RequestsScreen (1 hora)
1. Crear tabla/lista de solicitudes
2. Mostrar columnas: Folio, Fecha, Solicitante, Centro Costo, Total, Estado
3. Usar Badge para estados
4. Agregar botón "Ver detalle"
5. Agregar tabs de filtros (Todas, Enviadas, En aprobación, Aprobadas, Rechazadas)
6. Implementar filtros
7. Agregar estilos

### Paso 5.2: Crear RequestDetailDrawer (1.5 horas)
1. Crear drawer que se desliza desde la derecha
2. Mostrar header con folio, estado, total
3. Crear tabs internos: Detalles, Timeline, Documentos
4. En Detalles: mostrar items y notas
5. En Timeline: mostrar eventos con íconos y fechas
6. Agregar acciones por rol en footer
7. Empleado: botón cancelar
8. Aprobador: botones aprobar/rechazar con input de comentario
9. Finanzas: solo lectura
10. Conectar con approveRequest/rejectRequest del store
11. Verificar que timeline se actualiza

---

## FASE 6: ÓRDENES (1.5 horas)

### Paso 6.1: Botón Generar Orden (30 min)
1. Agregar botón en RequestDetailDrawer cuando estado sea "Aprobada"
2. Conectar con generateOrder del store
3. Mostrar toast de confirmación
4. Cambiar a tab "Órdenes"

### Paso 6.2: Crear OrdersScreen (1 hora)
1. Crear lista/tabla de órdenes
2. Mostrar columnas: Folio, Fecha, Proveedor, Total, Estado
3. Usar Badge para estados
4. Agregar botón "Ver detalle"
5. Crear modal/drawer de detalle
6. Mostrar info del proveedor
7. Mostrar items
8. Agregar botones para cambiar estado (Generada → Enviada → Recibida → Cerrada)
9. Conectar con updateOrderStatus
10. Agregar estilos

---

## FASE 7: REPORTES (2 horas)

### Paso 7.1: Crear KPI Cards (1 hora)
1. Crear ReportsScreen.jsx
2. Crear componente KPICard
3. Agregar 6 KPIs derivados del store:
   - Presupuesto Total
   - Comprometido
   - Gastado
   - Disponible
   - Solicitudes Abiertas
   - Órdenes Activas
4. Usar íconos de lucide-react
5. Agregar colores por tipo de KPI
6. Verificar que se actualizan dinámicamente
7. Agregar estilos

### Paso 7.2: Agregar Gráficas (1 hora)
1. Instalar recharts si no está
2. Crear gráfica de barras: Gasto por categoría
3. Crear gráfica de barras: Top proveedores
4. Derivar datos desde mock data y store
5. Agregar estilos
6. Opcional: agregar click en KPI para drill-down

---

## FASE 8: POLISH Y RESPONSIVE (2 horas)

### Paso 8.1: Hacer Responsive (1 hora)
1. Agregar breakpoints en CSS
2. Mobile (<768px): logo + hamburger en TopBar
3. Mobile: tabs en drawer lateral
4. Mobile: carrito como modal desde bottom
5. Mobile: grid productos a 1 columna
6. Tablet (768-1024px): grid productos a 2 columnas
7. Probar en DevTools con diferentes viewports

### Paso 8.2: Agregar Animaciones (30 min)
1. Tabs: animación de underline con layoutId
2. Modales: fade + scale
3. Drawers: slide from right
4. Items del carrito: fade in
5. Opcional: micro-animaciones en botones

### Paso 8.3: Testing Funcional (30 min)
1. Probar flujo completo: catálogo → solicitud → aprobación → orden → reportes
2. Probar en desktop
3. Probar en tablet
4. Probar en mobile
5. Verificar que no hay errores en consola
6. Verificar que KPIs cambian correctamente

---

## FASE 9: ASSETS Y BRANDING (1 hora)

### Paso 9.1: Optimizar Imágenes (30 min)
1. Reemplazar placeholders con imágenes finales si aplica
2. Optimizar assets en public/image/purchases/
3. Verificar que todas las imágenes cargan

### Paso 9.2: Ilustraciones y Logos (30 min)
1. Agregar ilustración isométrica en hero del catálogo
2. Verificar logo en TopBar
3. Agregar favicon
4. Verificar branding coherente

---

## FASE 10: DEPLOY Y DOCS (30 min)

### Paso 10.1: Build y Preview (15 min)
1. Ejecutar `npm run build`
2. Verificar que no hay errores
3. Ejecutar `npm run preview`
4. Probar build en navegador
5. Verificar que BASE_URL funciona correctamente

### Paso 10.2: Documentación (15 min)
1. Crear/actualizar README.md
2. Agregar instrucciones de instalación
3. Agregar instrucciones de ejecución
4. Documentar flujo de la demo
5. Hacer commit final

---

## CHECKLIST FINAL (Definition of Done)

- [ ] Catálogo muestra productos y se pueden agregar al carrito
- [ ] Carrito actualiza subtotal en tiempo real
- [ ] Botón "Crear Solicitud" genera solicitud y vacía carrito
- [ ] Cambiar rol muestra/oculta botones apropiados
- [ ] Aprobador puede aprobar/rechazar solicitudes
- [ ] Generar orden desde solicitud aprobada funciona
- [ ] Órdenes aparecen con estado "Generada"
- [ ] KPIs en reportes se actualizan dinámicamente
- [ ] Responsive funciona en mobile y tablet
- [ ] No hay errores en consola
- [ ] Botón "Volver a CBLuna" enlaza correctamente

---

## RESUMEN DE TIEMPOS

| Fase | Tiempo |
|------|--------|
| 0. Setup | 0.5h |
| 1. Mock Data + Store | 1.5h |
| 2. UI Base | 2h |
| 3. Catálogo + Carrito | 4h |
| 4. Wizard Solicitud | 2h |
| 5. Solicitudes | 2.5h |
| 6. Órdenes | 1.5h |
| 7. Reportes | 2h |
| 8. Polish + Responsive | 2h |
| 9. Assets | 1h |
| 10. Deploy | 0.5h |
| **TOTAL** | **19.5h** |
