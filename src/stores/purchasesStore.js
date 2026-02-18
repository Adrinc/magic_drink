import { atom, computed } from 'nanostores';
import { getProductById, getContractPrice } from '../data/purchases/products';
import { getBudgetByCostCenter } from '../data/purchases/budgets';
import { generateRequestId, generateOrderId, generateMockDate } from '../data/purchases/seed';

// ========================================
// ATOMS (fuente de verdad)
// ========================================

export const $cart = atom([]);
export const $selectedRole = atom('employee');
export const $requests = atom([
  // Mock request inicial para testing
  {
    id: 'PR-00020',
    createdAt: generateMockDate(3),
    requesterName: 'Carlos Pérez',
    costCenter: 'TI',
    priority: 'Normal',
    status: 'Aprobada',
    items: [
      { productId: 'prod-001', qty: 2, price: 1199 }
    ],
    total: 2398,
    notes: 'Laptops para equipo nuevo de desarrollo',
    approvals: [
      { 
        date: generateMockDate(3), 
        role: 'Empleado', 
        action: 'creada',
        userName: 'Carlos Pérez'
      },
      { 
        date: generateMockDate(2), 
        role: 'Aprobador', 
        action: 'aprobada', 
        comment: 'Aprobado según presupuesto Q1',
        userName: 'Ana García'
      }
    ]
  }
]);

export const $orders = atom([
  // Mock order 1 - En proceso de entrega
  {
    id: 'PO-00010',
    requestId: 'PR-00020',
    supplierId: 'sup-001',
    status: 'Enviada',
    createdAt: generateMockDate(2),
    items: [
      { productId: 'prod-001', qty: 2, price: 1199 }
    ],
    total: 2398,
    deliveryAddress: 'Oficina Central - Av. Principal 123',
    deliveryDate: generateMockDate(-5),
    statusHistory: [
      {
        status: 'Generada',
        date: generateMockDate(2),
        role: 'employee',
        userName: 'Sistema',
        notes: 'Orden generada automáticamente desde PR-00020'
      },
      {
        status: 'Enviada',
        date: generateMockDate(1),
        role: 'employee',
        userName: 'María López',
        notes: 'Orden enviada a ComputoTech'
      }
    ]
  },
  // Mock order 2 - Recibida
  {
    id: 'PO-00009',
    requestId: 'PR-00019',
    supplierId: 'sup-002',
    status: 'Recibida',
    createdAt: generateMockDate(7),
    items: [
      { productId: 'prod-005', qty: 10, price: 45 }
    ],
    total: 450,
    deliveryAddress: 'Almacén General - Sótano 1',
    deliveryDate: generateMockDate(0),
    statusHistory: [
      {
        status: 'Generada',
        date: generateMockDate(7),
        role: 'employee',
        userName: 'Sistema'
      },
      {
        status: 'Enviada',
        date: generateMockDate(6),
        role: 'employee',
        userName: 'Pedro Ramírez'
      },
      {
        status: 'Recibida',
        date: generateMockDate(1),
        role: 'approver',
        userName: 'Laura Martínez',
        notes: 'Productos recibidos en buen estado'
      }
    ]
  },
  // Mock order 3 - Cerrada
  {
    id: 'PO-00008',
    requestId: 'PR-00018',
    supplierId: 'sup-003',
    status: 'Cerrada',
    createdAt: generateMockDate(15),
    items: [
      { productId: 'prod-007', qty: 1, price: 899 }
    ],
    total: 899,
    deliveryAddress: 'Sala de Conferencias - Piso 5',
    deliveryDate: generateMockDate(-8),
    statusHistory: [
      {
        status: 'Generada',
        date: generateMockDate(15),
        role: 'employee',
        userName: 'Sistema'
      },
      {
        status: 'Enviada',
        date: generateMockDate(14),
        role: 'employee',
        userName: 'Carlos Pérez'
      },
      {
        status: 'Recibida',
        date: generateMockDate(10),
        role: 'approver',
        userName: 'Ana García'
      },
      {
        status: 'Cerrada',
        date: generateMockDate(8),
        role: 'finance',
        userName: 'Roberto Sánchez',
        notes: 'Orden cerrada - Factura procesada'
      }
    ]
  }
]);

export const $selectedCostCenter = atom('TI');
export const $searchQuery = atom('');
export const $selectedCategory = atom('all');
export const $selectedSupplier = atom('all');
export const $priceRange = atom({ min: 0, max: 5000 });
export const $contractOnly = atom(false);
export const $activeTab = atom('catalog');

// ========================================
// COMPUTED (valores derivados)
// ========================================

export const $cartTotal = computed($cart, (items) => {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product) return sum;
    const price = item.useContract ? getContractPrice(product) : product.price;
    return sum + (price * item.qty);
  }, 0);
});

export const $cartItemCount = computed($cart, (items) => {
  return items.reduce((sum, item) => sum + item.qty, 0);
});

export const $budgetInfo = computed([$selectedCostCenter], (costCenter) => {
  const budget = getBudgetByCostCenter(costCenter);
  if (!budget) {
    return {
      allocated: 0,
      committed: 0,
      spent: 0,
      available: 0,
      utilizationPercent: 0
    };
  }
  
  const available = budget.allocated - budget.committed - budget.spent;
  const utilized = budget.committed + budget.spent;
  const utilizationPercent = budget.allocated > 0 
    ? Math.round((utilized / budget.allocated) * 100) 
    : 0;
  
  return {
    ...budget,
    available,
    utilizationPercent
  };
});

export const $requestsStats = computed($requests, (requests) => {
  return {
    total: requests.length,
    pending: requests.filter(r => r.status === 'Enviada' || r.status === 'En aprobación').length,
    approved: requests.filter(r => r.status === 'Aprobada').length,
    rejected: requests.filter(r => r.status === 'Rechazada').length,
    draft: requests.filter(r => r.status === 'Borrador').length
  };
});

export const $ordersStats = computed($orders, (orders) => {
  return {
    total: orders.length,
    generated: orders.filter(o => o.status === 'Generada').length,
    sent: orders.filter(o => o.status === 'Enviada').length,
    received: orders.filter(o => o.status === 'Recibida').length,
    closed: orders.filter(o => o.status === 'Cerrada').length
  };
});

// Totales financieros globales
export const $financialStats = computed([$requests, $orders], (requests, orders) => {
  // Comprometido: solicitudes aprobadas no cerradas
  const committed = requests
    .filter(r => r.status === 'Aprobada' || r.status === 'En aprobación')
    .reduce((sum, r) => sum + r.total, 0);
  
  // Gastado: órdenes cerradas
  const spent = orders
    .filter(o => o.status === 'Cerrada')
    .reduce((sum, o) => sum + o.total, 0);
  
  // Total presupuesto (simplificado - suma de todos los centros de costo)
  const allocated = 500000; // Hardcoded para demo, debería sumarse de budgets
  
  const available = allocated - committed - spent;
  
  return {
    allocated,
    committed,
    spent,
    available,
    utilizationPercent: allocated > 0 ? Math.round(((committed + spent) / allocated) * 100) : 0
  };
});

// Gasto por categoría
export const $spendingByCategory = computed([$orders], (orders) => {
  const categoryTotals = {};
  
  orders.forEach(order => {
    order.items.forEach(item => {
      const product = getProductById(item.productId);
      if (product) {
        if (!categoryTotals[product.categoryId]) {
          categoryTotals[product.categoryId] = 0;
        }
        categoryTotals[product.categoryId] += item.price * item.qty;
      }
    });
  });
  
  return Object.entries(categoryTotals).map(([categoryId, amount]) => ({
    categoryId,
    amount
  })).sort((a, b) => b.amount - a.amount);
});

// Gasto por proveedor
export const $spendingBySupplier = computed([$orders], (orders) => {
  const supplierTotals = {};
  
  orders.forEach(order => {
    if (!supplierTotals[order.supplierId]) {
      supplierTotals[order.supplierId] = {
        total: 0,
        orderCount: 0
      };
    }
    supplierTotals[order.supplierId].total += order.total;
    supplierTotals[order.supplierId].orderCount += 1;
  });
  
  return Object.entries(supplierTotals).map(([supplierId, data]) => ({
    supplierId,
    ...data
  })).sort((a, b) => b.total - a.total);
});

// ========================================
// ACTIONS - Cart
// ========================================

export function addToCart(productId, qty = 1, useContract = true) {
  const cart = $cart.get();
  const product = getProductById(productId);
  
  if (!product) return;
  
  const existingIndex = cart.findIndex(item => 
    item.productId === productId && item.useContract === useContract
  );
  
  if (existingIndex >= 0) {
    cart[existingIndex].qty += qty;
    $cart.set([...cart]);
  } else {
    $cart.set([...cart, { productId, qty, useContract }]);
  }
}

export function updateCartItemQty(productId, qty, useContract) {
  const cart = $cart.get();
  const item = cart.find(i => 
    i.productId === productId && i.useContract === useContract
  );
  
  if (item) {
    if (qty <= 0) {
      removeFromCart(productId, useContract);
    } else {
      item.qty = qty;
      $cart.set([...cart]);
    }
  }
}

export function removeFromCart(productId, useContract) {
  const cart = $cart.get();
  $cart.set(cart.filter(item => 
    !(item.productId === productId && item.useContract === useContract)
  ));
}

export function clearCart() {
  $cart.set([]);
}

export function toggleCartItemContract(productId, currentUseContract) {
  const cart = $cart.get();
  const item = cart.find(i => 
    i.productId === productId && i.useContract === currentUseContract
  );
  
  if (item) {
    item.useContract = !currentUseContract;
    $cart.set([...cart]);
  }
}

// ========================================
// ACTIONS - Requests
// ========================================

export function createRequest({ costCenter, priority, notes, requesterName }) {
  const cart = $cart.get();
  
  if (cart.length === 0) return null;
  
  const items = cart.map(item => {
    const product = getProductById(item.productId);
    const price = item.useContract ? getContractPrice(product) : product.price;
    return {
      productId: item.productId,
      qty: item.qty,
      price,
      useContract: item.useContract
    };
  });
  
  const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const newRequest = {
    id: generateRequestId(),
    createdAt: new Date().toISOString(),
    requesterName: requesterName || 'Usuario Demo',
    costCenter,
    priority,
    status: 'Enviada',
    items,
    total,
    notes: notes || '',
    approvals: [
      {
        date: new Date().toISOString(),
        role: 'Empleado',
        action: 'creada',
        userName: requesterName || 'Usuario Demo'
      }
    ]
  };
  
  $requests.set([newRequest, ...$requests.get()]);
  clearCart();
  
  return newRequest;
}

export function approveRequest(requestId, comment = '', userName = 'Aprobador') {
  const requests = $requests.get();
  const request = requests.find(r => r.id === requestId);
  
  if (!request || request.status === 'Aprobada' || request.status === 'Rechazada') {
    return false;
  }
  
  request.status = 'Aprobada';
  request.approvals.push({
    date: new Date().toISOString(),
    role: 'Aprobador',
    action: 'aprobada',
    comment,
    userName
  });
  
  $requests.set([...requests]);
  return true;
}

export function rejectRequest(requestId, comment = '', userName = 'Aprobador') {
  const requests = $requests.get();
  const request = requests.find(r => r.id === requestId);
  
  if (!request || request.status === 'Aprobada' || request.status === 'Rechazada') {
    return false;
  }
  
  request.status = 'Rechazada';
  request.approvals.push({
    date: new Date().toISOString(),
    role: 'Aprobador',
    action: 'rechazada',
    comment,
    userName
  });
  
  $requests.set([...requests]);
  return true;
}

export function getRequestById(requestId) {
  return $requests.get().find(r => r.id === requestId);
}

export function deleteRequest(requestId) {
  const requests = $requests.get();
  $requests.set(requests.filter(r => r.id !== requestId));
}

// ========================================
// ACTIONS - Orders
// ========================================

export function generateOrder(requestId, deliveryAddress, deliveryDays = 5) {
  const request = getRequestById(requestId);
  
  if (!request || request.status !== 'Aprobada') {
    return null;
  }
  
  // Determinar proveedor principal (simplificado: del primer item)
  const firstProduct = getProductById(request.items[0].productId);
  
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
  
  const newOrder = {
    id: generateOrderId(),
    requestId,
    supplierId: firstProduct.supplierId,
    status: 'Generada',
    createdAt: new Date().toISOString(),
    items: request.items,
    total: request.total,
    deliveryAddress: deliveryAddress || 'Oficina Central - Dirección por definir',
    deliveryDate: deliveryDate.toISOString(),
    statusHistory: [
      {
        status: 'Generada',
        date: new Date().toISOString(),
        role: $selectedRole.get(),
        userName: getUserName()
      }
    ]
  };
  
  $orders.set([newOrder, ...$orders.get()]);
  return newOrder;
}

export function updateOrderStatus(orderId, newStatus, notes = '') {
  const orders = $orders.get();
  const order = orders.find(o => o.id === orderId);
  
  if (!order) return false;
  
  order.status = newStatus;
  
  // Initialize statusHistory if it doesn't exist
  if (!order.statusHistory) {
    order.statusHistory = [];
  }
  
  // Add status change to history
  order.statusHistory.push({
    status: newStatus,
    date: new Date().toISOString(),
    role: $selectedRole.get(),
    userName: getUserName(),
    notes
  });
  
  $orders.set([...orders]);
  return true;
}

export function getOrderById(orderId) {
  return $orders.get().find(o => o.id === orderId);
}

export function getOrdersByRequest(requestId) {
  return $orders.get().filter(o => o.requestId === requestId);
}

// ========================================
// ACTIONS - Role & Navigation
// ========================================

export function setRole(role) {
  $selectedRole.set(role);
}

export function setActiveTab(tab) {
  $activeTab.set(tab);
}

export function setCostCenter(costCenter) {
  $selectedCostCenter.set(costCenter);
}

// ========================================
// ACTIONS - Filters
// ========================================

export function setSearchQuery(query) {
  $searchQuery.set(query);
}

export function setSelectedCategory(category) {
  $selectedCategory.set(category);
}

export function setSelectedSupplier(supplier) {
  $selectedSupplier.set(supplier);
}

export function setPriceRange(min, max) {
  $priceRange.set({ min, max });
}

export function setContractOnly(value) {
  $contractOnly.set(value);
}

export function clearFilters() {
  $searchQuery.set('');
  $selectedCategory.set('all');
  $selectedSupplier.set('all');
  $priceRange.set({ min: 0, max: 5000 });
  $contractOnly.set(false);
}
