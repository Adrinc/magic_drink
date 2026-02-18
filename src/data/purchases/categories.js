// Categorías de productos
export const categories = [
  { 
    id: 'ti', 
    name: 'TI', 
    icon: '💻', 
    color: '#3B82F6',
    description: 'Tecnología y equipos de cómputo'
  },
  { 
    id: 'oficina', 
    name: 'Oficina', 
    icon: '🪑', 
    color: '#10B981',
    description: 'Mobiliario y suministros de oficina'
  },
  { 
    id: 'mantenimiento', 
    name: 'Mantenimiento', 
    icon: '🔧', 
    color: '#F59E0B',
    description: 'Herramientas y equipo de mantenimiento'
  },
  { 
    id: 'marketing', 
    name: 'Marketing', 
    icon: '📢', 
    color: '#EC4899',
    description: 'Material promocional y publicidad'
  },
];

export function getCategoryById(id) {
  return categories.find(cat => cat.id === id);
}

export function getCategoryName(id) {
  const category = getCategoryById(id);
  return category ? category.name : 'Sin categoría';
}
