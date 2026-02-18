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
  // Solicitudes Aprobadas
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
      { date: generateMockDate(3), role: 'Empleado', action: 'creada', userName: 'Carlos Pérez' },
      { date: generateMockDate(2), role: 'Aprobador', action: 'aprobada', comment: 'Aprobado según presupuesto Q1', userName: 'Ana García' }
    ]
  },
  {
    id: 'PR-00019',
    createdAt: generateMockDate(7),
    requesterName: 'María González',
    costCenter: 'Operaciones',
    priority: 'Normal',
    status: 'Aprobada',
    items: [
      { productId: 'prod-002', qty: 15, price: 299 }
    ],
    total: 4485,
    notes: 'Sillas ergonómicas para área operativa',
    approvals: [
      { date: generateMockDate(7), role: 'Empleado', action: 'creada', userName: 'María González' },
      { date: generateMockDate(5), role: 'Aprobador', action: 'aprobada', comment: 'Autorizado', userName: 'Laura Martínez' }
    ]
  },
  {
    id: 'PR-00018',
    createdAt: generateMockDate(15),
    requesterName: 'Roberto Sánchez',
    costCenter: 'Finanzas',
    priority: 'Alta',
    status: 'Aprobada',
    items: [
      { productId: 'prod-007', qty: 3, price: 899 }
    ],
    total: 2697,
    notes: 'Escritorios ejecutivos para gerencias',
    approvals: [
      { date: generateMockDate(15), role: 'Empleado', action: 'creada', userName: 'Roberto Sánchez' },
      { date: generateMockDate(13), role: 'Aprobador', action: 'aprobada', userName: 'Ana García' }
    ]
  },
  {
    id: 'PR-00015',
    createdAt: generateMockDate(22),
    requesterName: 'Laura Martínez',
    costCenter: 'Marketing',
    priority: 'Normal',
    status: 'Aprobada',
    items: [
      { productId: 'prod-008', qty: 1, price: 450 }
    ],
    total: 450,
    notes: 'Banner para evento corporativo',
    approvals: [
      { date: generateMockDate(22), role: 'Empleado', action: 'creada', userName: 'Laura Martínez' },
      { date: generateMockDate(20), role: 'Aprobador', action: 'aprobada', userName: 'Carlos Pérez' }
    ]
  },
  
  // Solicitudes En Aprobación
  {
    id: 'PR-00023',
    createdAt: generateMockDate(1),
    requesterName: 'Ana García',
    costCenter: 'RRHH',
    priority: 'Urgente',
    status: 'En aprobación',
    items: [
      { productId: 'prod-003', qty: 5, price: 750 }
    ],
    total: 3750,
    notes: 'Impresoras para nuevas oficinas - Urgente',
    approvals: [
      { date: generateMockDate(1), role: 'Empleado', action: 'creada', userName: 'Ana García' }
    ]
  },
  {
    id: 'PR-00022',
    createdAt: generateMockDate(2),
    requesterName: 'Pedro Ramírez',
    costCenter: 'TI',
    priority: 'Normal',
    status: 'En aprobación',
    items: [
      { productId: 'prod-005', qty: 30, price: 349 },
      { productId: 'prod-006', qty: 5, price: 1099 }
    ],
    total: 15965,
    notes: 'Monitores y teclados para expansión de oficina',
    approvals: [
      { date: generateMockDate(2), role: 'Empleado', action: 'creada', userName: 'Pedro Ramírez' }
    ]
  },
  {
    id: 'PR-00021',
    createdAt: generateMockDate(4),
    requesterName: 'Sofía Torres',
    costCenter: 'Marketing',
    priority: 'Normal',
    status: 'En aprobación',
    items: [
      { productId: 'prod-010', qty: 1000, price: 85 }
    ],
    total: 85000,
    notes: 'Tarjetas de presentación nuevos empleados',
    approvals: [
      { date: generateMockDate(4), role: 'Empleado', action: 'creada', userName: 'Sofía Torres' }
    ]
  },
  
  // Solicitudes Enviadas
  {
    id: 'PR-00024',
    createdAt: generateMockDate(0),
    requesterName: 'Diego Morales',
    costCenter: 'Operaciones',
    priority: 'Normal',
    status: 'Enviada',
    items: [
      { productId: 'prod-004', qty: 50, price: 45 }
    ],
    total: 2250,
    notes: 'Papel bond para impresoras del mes',
    approvals: [
      { date: generateMockDate(0), role: 'Empleado', action: 'creada', userName: 'Diego Morales' }
    ]
  },
  {
    id: 'PR-00017',
    createdAt: generateMockDate(18),
    requesterName: 'Valeria Ruiz',
    costCenter: 'TI',
    priority: 'Alta',
    status: 'Enviada',
    items: [
      { productId: 'prod-001', qty: 10, price: 1199 }
    ],
    total: 11990,
    notes: 'Laptops para nuevo equipo de desarrollo',
    approvals: [
      { date: generateMockDate(18), role: 'Empleado', action: 'creada', userName: 'Valeria Ruiz' }
    ]
  },
  {
    id: 'PR-00016',
    createdAt: generateMockDate(20),
    requesterName: 'Javier Castro',
    costCenter: 'Finanzas',
    priority: 'Normal',
    status: 'Enviada',
    items: [
      { productId: 'prod-009', qty: 2, price: 399 }
    ],
    total: 798,
    notes: 'Archiveros para documentos fiscales',
    approvals: [
      { date: generateMockDate(20), role: 'Empleado', action: 'creada', userName: 'Javier Castro' }
    ]
  },
  
  // Solicitudes Rechazadas
  {
    id: 'PR-00014',
    createdAt: generateMockDate(25),
    requesterName: 'Camila Vargas',
    costCenter: 'Marketing',
    priority: 'Normal',
    status: 'Rechazada',
    items: [
      { productId: 'prod-007', qty: 50, price: 899 }
    ],
    total: 44950,
    notes: 'Escritorios para remodelación completa',
    approvals: [
      { date: generateMockDate(25), role: 'Empleado', action: 'creada', userName: 'Camila Vargas' },
      { date: generateMockDate(24), role: 'Aprobador', action: 'rechazada', comment: 'Presupuesto insuficiente para este trimestre', userName: 'Ana García' }
    ]
  },
  {
    id: 'PR-00013',
    createdAt: generateMockDate(28),
    requesterName: 'Fernando López',
    costCenter: 'RRHH',
    priority: 'Normal',
    status: 'Rechazada',
    items: [
      { productId: 'prod-002', qty: 100, price: 299 }
    ],
    total: 29900,
    notes: 'Sillas para auditorio principal',
    approvals: [
      { date: generateMockDate(28), role: 'Empleado', action: 'creada', userName: 'Fernando López' },
      { date: generateMockDate(27), role: 'Aprobador', action: 'rechazada', comment: 'Cantidad excede límite autorizado', userName: 'Laura Martínez' }
    ]
  },
  
  // Más solicitudes aprobadas
  {
    id: 'PR-00012',
    createdAt: generateMockDate(30),
    requesterName: 'Gabriela Mendoza',
    costCenter: 'TI',
    priority: 'Normal',
    status: 'Aprobada',
    items: [
      { productId: 'prod-006', qty: 15, price: 1099 }
    ],
    total: 16485,
    notes: 'Monitores ultrawide para desarrolladores',
    approvals: [
      { date: generateMockDate(30), role: 'Empleado', action: 'creada', userName: 'Gabriela Mendoza' },
      { date: generateMockDate(29), role: 'Aprobador', action: 'aprobada', userName: 'Carlos Pérez' }
    ]
  },
  {
    id: 'PR-00011',
    createdAt: generateMockDate(35),
    requesterName: 'Ricardo Flores',
    costCenter: 'Operaciones',
    priority: 'Normal',
    status: 'Aprobada',
    items: [
      { productId: 'prod-003', qty: 3, price: 750 }
    ],
    total: 2250,
    notes: 'Impresoras láser para área de producción',
    approvals: [
      { date: generateMockDate(35), role: 'Empleado', action: 'creada', userName: 'Ricardo Flores' },
      { date: generateMockDate(33), role: 'Aprobador', action: 'aprobada', userName: 'Laura Martínez' }
    ]
  },
  {
    id: 'PR-00010',
    createdAt: generateMockDate(40),
    requesterName: 'Isabel Romero',
    costCenter: 'Finanzas',
    priority: 'Alta',
    status: 'Aprobada',
    items: [
      { productId: 'prod-009', qty: 10, price: 399 }
    ],
    total: 3990,
    notes: 'Archiveros metálicos para resguardo',
    approvals: [
      { date: generateMockDate(40), role: 'Empleado', action: 'creada', userName: 'Isabel Romero' },
      { date: generateMockDate(38), role: 'Aprobador', action: 'aprobada', userName: 'Ana García' }
    ]
  },
  {
    id: 'PR-00009',
    createdAt: generateMockDate(45),
    requesterName: 'Andrés Silva',
    costCenter: 'Marketing',
    priority: 'Normal',
    status: 'Aprobada',
    items: [
      { productId: 'prod-008', qty: 3, price: 450 }
    ],
    total: 1350,
    notes: 'Banners para campaña trimestral',
    approvals: [
      { date: generateMockDate(45), role: 'Empleado', action: 'creada', userName: 'Andrés Silva' },
      { date: generateMockDate(43), role: 'Aprobador', action: 'aprobada', userName: 'Carlos Pérez' }
    ]
  },
  {
    id: 'PR-00008',
    createdAt: generateMockDate(50),
    requesterName: 'Natalia Campos',
    costCenter: 'RRHH',
    priority: 'Normal',
    status: 'Aprobada',
    items: [
      { productId: 'prod-010', qty: 500, price: 85 }
    ],
    total: 42500,
    notes: 'Tarjetas corporativas para colaboradores',
    approvals: [
      { date: generateMockDate(50), role: 'Empleado', action: 'creada', userName: 'Natalia Campos' },
      { date: generateMockDate(48), role: 'Aprobador', action: 'aprobada', userName: 'Laura Martínez' }
    ]
  }
]);

export const $orders = atom([
  // Órdenes Enviadas
  {
    id: 'PO-00015',
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
      { status: 'Generada', date: generateMockDate(2), role: 'employee', userName: 'Sistema', notes: 'Orden generada automáticamente desde PR-00020' },
      { status: 'Enviada', date: generateMockDate(1), role: 'employee', userName: 'María López', notes: 'Orden enviada a ComputoTech' }
    ]
  },
  {
    id: 'PO-00014',
    requestId: 'PR-00022',
    supplierId: 'sup-002',
    status: 'Enviada',
    createdAt: generateMockDate(1),
    items: [
      { productId: 'prod-005', qty: 30, price: 349 }
    ],
    total: 10470,
    deliveryAddress: 'Sucursal Norte - Calle 45 #890',
    deliveryDate: generateMockDate(-3),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(1), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(0), role: 'employee', userName: 'Pedro Ramírez' }
    ]
  },
  {
    id: 'PO-00013',
    requestId: 'PR-00021',
    supplierId: 'sup-004',
    status: 'Enviada',
    createdAt: generateMockDate(3),
    items: [
      { productId: 'prod-010', qty: 1000, price: 85 }
    ],
    total: 85000,
    deliveryAddress: 'Almacén Central - Zona Industrial',
    deliveryDate: generateMockDate(-7),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(3), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(2), role: 'employee', userName: 'Sofía Torres' }
    ]
  },
  {
    id: 'PO-00012',
    requestId: 'PR-00017',
    supplierId: 'sup-001',
    status: 'Enviada',
    createdAt: generateMockDate(17),
    items: [
      { productId: 'prod-001', qty: 10, price: 1199 }
    ],
    total: 11990,
    deliveryAddress: 'Oficina TI - Edificio B, Piso 3',
    deliveryDate: generateMockDate(-22),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(17), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(16), role: 'employee', userName: 'Valeria Ruiz' }
    ]
  },
  
  // Órdenes Recibidas
  {
    id: 'PO-00011',
    requestId: 'PR-00019',
    supplierId: 'sup-002',
    status: 'Recibida',
    createdAt: generateMockDate(6),
    items: [
      { productId: 'prod-002', qty: 15, price: 299 }
    ],
    total: 4485,
    deliveryAddress: 'Almacén General - Sótano 1',
    deliveryDate: generateMockDate(-1),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(6), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(5), role: 'employee', userName: 'María González' },
      { status: 'Recibida', date: generateMockDate(2), role: 'approver', userName: 'Laura Martínez', notes: 'Sillas recibidas en buen estado' }
    ]
  },
  {
    id: 'PO-00010',
    requestId: 'PR-00015',
    supplierId: 'sup-003',
    status: 'Recibida',
    createdAt: generateMockDate(20),
    items: [
      { productId: 'prod-008', qty: 1, price: 450 }
    ],
    total: 450,
    deliveryAddress: 'Área Marketing - Piso 2',
    deliveryDate: generateMockDate(-5),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(20), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(19), role: 'employee', userName: 'Laura Martínez' },
      { status: 'Recibida', date: generateMockDate(15), role: 'approver', userName: 'Carlos Pérez', notes: 'Banner instalado correctamente' }
    ]
  },
  {
    id: 'PO-00009',
    requestId: 'PR-00012',
    supplierId: 'sup-001',
    status: 'Recibida',
    createdAt: generateMockDate(29),
    items: [
      { productId: 'prod-006', qty: 15, price: 1099 }
    ],
    total: 16485,
    deliveryAddress: 'Oficina TI - Área Desarrollo',
    deliveryDate: generateMockDate(-10),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(29), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(28), role: 'employee', userName: 'Gabriela Mendoza' },
      { status: 'Recibida', date: generateMockDate(25), role: 'approver', userName: 'Carlos Pérez' }
    ]
  },
  {
    id: 'PO-00008',
    requestId: 'PR-00011',
    supplierId: 'sup-002',
    status: 'Recibida',
    createdAt: generateMockDate(32),
    items: [
      { productId: 'prod-003', qty: 3, price: 750 }
    ],
    total: 2250,
    deliveryAddress: 'Área Producción - Nave 2',
    deliveryDate: generateMockDate(-15),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(32), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(31), role: 'employee', userName: 'Ricardo Flores' },
      { status: 'Recibida', date: generateMockDate(28), role: 'approver', userName: 'Laura Martínez' }
    ]
  },
  
  // Órdenes Cerradas
  {
    id: 'PO-00007',
    requestId: 'PR-00018',
    supplierId: 'sup-003',
    status: 'Cerrada',
    createdAt: generateMockDate(14),
    items: [
      { productId: 'prod-007', qty: 3, price: 899 }
    ],
    total: 2697,
    deliveryAddress: 'Gerencia - Piso 5',
    deliveryDate: generateMockDate(-20),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(14), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(13), role: 'employee', userName: 'Roberto Sánchez' },
      { status: 'Recibida', date: generateMockDate(10), role: 'approver', userName: 'Ana García' },
      { status: 'Cerrada', date: generateMockDate(8), role: 'finance', userName: 'Laura Martínez', notes: 'Factura procesada y pagada' }
    ]
  },
  {
    id: 'PO-00006',
    requestId: 'PR-00010',
    supplierId: 'sup-004',
    status: 'Cerrada',
    createdAt: generateMockDate(37),
    items: [
      { productId: 'prod-009', qty: 10, price: 399 }
    ],
    total: 3990,
    deliveryAddress: 'Finanzas - Área Contabilidad',
    deliveryDate: generateMockDate(-42),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(37), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(36), role: 'employee', userName: 'Isabel Romero' },
      { status: 'Recibida', date: generateMockDate(33), role: 'approver', userName: 'Ana García' },
      { status: 'Cerrada', date: generateMockDate(30), role: 'finance', userName: 'Roberto Sánchez', notes: 'Orden cerrada - Factura liquidada' }
    ]
  },
  {
    id: 'PO-00005',
    requestId: 'PR-00009',
    supplierId: 'sup-003',
    status: 'Cerrada',
    createdAt: generateMockDate(42),
    items: [
      { productId: 'prod-008', qty: 3, price: 450 }
    ],
    total: 1350,
    deliveryAddress: 'Marketing - Sala de Eventos',
    deliveryDate: generateMockDate(-47),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(42), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(41), role: 'employee', userName: 'Andrés Silva' },
      { status: 'Recibida', date: generateMockDate(38), role: 'approver', userName: 'Carlos Pérez' },
      { status: 'Cerrada', date: generateMockDate(35), role: 'finance', userName: 'Laura Martínez' }
    ]
  },
  {
    id: 'PO-00004',
    requestId: 'PR-00008',
    supplierId: 'sup-004',
    status: 'Cerrada',
    createdAt: generateMockDate(47),
    items: [
      { productId: 'prod-010', qty: 500, price: 85 }
    ],
    total: 42500,
    deliveryAddress: 'RRHH - Área Administrativa',
    deliveryDate: generateMockDate(-52),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(47), role: 'employee', userName: 'Sistema' },
      { status: 'Enviada', date: generateMockDate(46), role: 'employee', userName: 'Natalia Campos' },
      { status: 'Recibida', date: generateMockDate(43), role: 'approver', userName: 'Laura Martínez' },
      { status: 'Cerrada', date: generateMockDate(40), role: 'finance', userName: 'Roberto Sánchez' }
    ]
  },
  
  // Órdenes Generadas (recientes)
  {
    id: 'PO-00016',
    requestId: 'PR-00023',
    supplierId: 'sup-002',
    status: 'Generada',
    createdAt: generateMockDate(0),
    items: [
      { productId: 'prod-003', qty: 5, price: 750 }
    ],
    total: 3750,
    deliveryAddress: 'RRHH - Nuevas Oficinas',
    deliveryDate: generateMockDate(-4),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(0), role: 'employee', userName: 'Sistema', notes: 'Orden generada - pendiente envío' }
    ]
  },
  {
    id: 'PO-00003',
    requestId: 'PR-00007',
    supplierId: 'sup-001',
    status: 'Generada',
    createdAt: generateMockDate(1),
    items: [
      { productId: 'prod-001', qty: 5, price: 1199 }
    ],
    total: 5995,
    deliveryAddress: 'TI - Área Soporte',
    deliveryDate: generateMockDate(-5),
    statusHistory: [
      { status: 'Generada', date: generateMockDate(1), role: 'employee', userName: 'Sistema' }
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
