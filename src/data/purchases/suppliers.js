// Proveedores
export const suppliers = [
  { 
    id: 'sup-001', 
    name: 'ComputoTech', 
    rating: 4.5, 
    leadTimeDays: 5,
    contactEmail: 'ventas@computotech.com',
    specialties: ['Laptops', 'Equipos de cómputo', 'Accesorios TI']
  },
  { 
    id: 'sup-002', 
    name: 'OfficePro', 
    rating: 4.2, 
    leadTimeDays: 3,
    contactEmail: 'pedidos@officepro.com',
    specialties: ['Mobiliario', 'Sillas', 'Escritorios']
  },
  { 
    id: 'sup-003', 
    name: 'Papier SA', 
    rating: 4.8, 
    leadTimeDays: 2,
    contactEmail: 'contacto@papiersa.com',
    specialties: ['Papelería', 'Suministros de oficina']
  },
  { 
    id: 'sup-004', 
    name: 'TechSupply', 
    rating: 4.6, 
    leadTimeDays: 7,
    contactEmail: 'info@techsupply.com',
    specialties: ['Impresoras', 'Consumibles', 'Hardware']
  },
  { 
    id: 'sup-005', 
    name: 'Marketing Express', 
    rating: 4.3, 
    leadTimeDays: 5,
    contactEmail: 'cotizaciones@mktexpress.com',
    specialties: ['Material promocional', 'Publicidad', 'Diseño']
  },
];

export function getSupplierById(id) {
  return suppliers.find(sup => sup.id === id);
}

export function getSupplierName(id) {
  const supplier = getSupplierById(id);
  return supplier ? supplier.name : 'Proveedor desconocido';
}
