// Utilidades para generar datos mock (IDs, fechas, etc.)

let requestCounter = 21;  // Comenzamos en PR-00021
let orderCounter = 11;    // Comenzamos en PO-00011

export function generateRequestId() {
  const id = `PR-${String(requestCounter).padStart(5, '0')}`;
  requestCounter++;
  return id;
}

export function generateOrderId() {
  const id = `PO-${String(orderCounter).padStart(5, '0')}`;
  orderCounter++;
  return id;
}

export function resetCounters() {
  requestCounter = 21;
  orderCounter = 11;
}

export function formatDate(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Intl.DateTimeFormat('es-ES', options).format(date);
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(number) {
  return new Intl.NumberFormat('es-ES').format(number);
}

export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Hoy';
  if (diffInDays === 1) return 'Ayer';
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
  return `Hace ${Math.floor(diffInDays / 365)} años`;
}

export function generateMockDate(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

export function getStatusColor(status) {
  const statusColors = {
    // Solicitudes
    'Borrador': 'var(--status-info)',
    'Enviada': 'var(--status-info)',
    'En aprobación': 'var(--status-warning)',
    'Aprobada': 'var(--status-success)',
    'Rechazada': 'var(--status-error)',
    
    // Órdenes
    'Generada': 'var(--status-info)',
    'Enviada': 'var(--status-warning)',
    'Recibida': 'var(--status-success)',
    'Cerrada': 'var(--text-tertiary)',
    
    // Stock
    'available': 'var(--status-success)',
    'on-demand': 'var(--status-warning)',
    'out-of-stock': 'var(--status-error)'
  };
  
  return statusColors[status] || 'var(--text-secondary)';
}

export function getPriorityColor(priority) {
  const priorityColors = {
    'Normal': 'var(--text-secondary)',
    'Urgente': 'var(--status-error)',
    'Alta': 'var(--status-warning)'
  };
  
  return priorityColors[priority] || 'var(--text-secondary)';
}

export function truncateText(text, maxLength = 50) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateRandomId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
