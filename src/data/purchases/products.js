// Productos del catálogo interno
export const products = [
  {
    id: 'prod-001',
    name: 'Dell Latitude 5520 Laptop 15.6"',
    categoryId: 'ti',
    supplierId: 'sup-001',
    price: 1199,
    uom: 'USD',
    contractAvailable: true,
    contractDiscount: 0.15,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 5,
    description: 'Laptop empresarial Dell Latitude con procesador Intel Core i5, 8GB RAM, 256GB SSD',
    stock: 'available'
  },
  {
    id: 'prod-002',
    name: 'Silla Ergonómica de Malla Negra',
    categoryId: 'oficina',
    supplierId: 'sup-002',
    price: 249,
    uom: 'USD',
    contractAvailable: true,
    contractDiscount: 0.10,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 7,
    description: 'Silla ejecutiva ergonómica con respaldo de malla, brazos ajustables',
    stock: 'available'
  },
  {
    id: 'prod-003',
    name: 'HP LaserJet Pro Printer M428fdn',
    categoryId: 'ti',
    supplierId: 'sup-004',
    price: 549,
    uom: 'USD',
    contractAvailable: true,
    contractDiscount: 0.12,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 5,
    description: 'Impresora láser multifuncional blanco y negro, WiFi, dúplex automático',
    stock: 'available'
  },
  {
    id: 'prod-004',
    name: 'Bolsa de 20 Notetetas A4 (500 hojas c/u)',
    categoryId: 'oficina',
    supplierId: 'sup-003',
    price: 35,
    uom: 'USD',
    contractAvailable: true,
    contractDiscount: 0.05,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 2,
    description: 'Papel bond tamaño carta, 75g/m², bolsa con 20 paquetes de 500 hojas',
    stock: 'available'
  },
  {
    id: 'prod-005',
    name: 'Monitor Dell 24" Full HD',
    categoryId: 'ti',
    supplierId: 'sup-001',
    price: 189,
    uom: 'USD',
    contractAvailable: true,
    contractDiscount: 0.15,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 5,
    description: 'Monitor LED IPS 24", resolución 1920x1080, HDMI, DisplayPort',
    stock: 'available'
  },
  {
    id: 'prod-006',
    name: 'Escritorio en L 160x120cm',
    categoryId: 'oficina',
    supplierId: 'sup-002',
    price: 425,
    uom: 'USD',
    contractAvailable: false,
    contractDiscount: 0,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 10,
    description: 'Escritorio ejecutivo en forma de L, melamina color nogal, patas metálicas',
    stock: 'on-demand'
  },
  {
    id: 'prod-007',
    name: 'Teclado y Mouse Inalámbrico Logitech',
    categoryId: 'ti',
    supplierId: 'sup-004',
    price: 45,
    uom: 'USD',
    contractAvailable: true,
    contractDiscount: 0.10,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 3,
    description: 'Combo teclado y mouse inalámbrico, receptor USB unificado, batería larga duración',
    stock: 'available'
  },
  {
    id: 'prod-008',
    name: 'Banner Roll-Up 85x200cm',
    categoryId: 'marketing',
    supplierId: 'sup-005',
    price: 89,
    uom: 'USD',
    contractAvailable: false,
    contractDiscount: 0,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 5,
    description: 'Banner retráctil con estructura de aluminio, impresión full color',
    stock: 'on-demand'
  },
  {
    id: 'prod-009',
    name: 'Archivero Metálico 4 Gavetas',
    categoryId: 'oficina',
    supplierId: 'sup-002',
    price: 215,
    uom: 'USD',
    contractAvailable: true,
    contractDiscount: 0.08,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 7,
    description: 'Archivero vertical metálico, 4 gavetas, cerradura de seguridad',
    stock: 'available'
  },
  {
    id: 'prod-010',
    name: 'Tarjetas de Presentación (1000 unidades)',
    categoryId: 'marketing',
    supplierId: 'sup-005',
    price: 65,
    uom: 'USD',
    contractAvailable: false,
    contractDiscount: 0,
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=300&fit=crop&q=80',
    leadTimeDays: 5,
    description: 'Tarjetas de presentación impresas a color, papel couché 300g, barniz UV',
    stock: 'on-demand'
  },
];

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId) {
  if (categoryId === 'all') return products;
  return products.filter(p => p.categoryId === categoryId);
}

export function getProductsBySupplier(supplierId) {
  return products.filter(p => p.supplierId === supplierId);
}

export function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

export function getContractPrice(product) {
  if (!product.contractAvailable) return product.price;
  return Math.round(product.price * (1 - product.contractDiscount));
}
