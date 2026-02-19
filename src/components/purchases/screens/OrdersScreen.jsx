import React, { useState, useMemo } from "react";
import { useStore } from "@nanostores/react";
import { Package, Clock, Building2, DollarSign, Eye, TrendingUp, Search, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { $orders } from '../../../stores/purchasesStore';
import { formatCurrency, formatDate } from '../../../data/purchases/seed';
import { suppliers } from '../../../data/purchases/suppliers';
import Badge from '../ui/Badge';
import OrderDetailDrawer from '../flows/OrderDetailDrawer';
import styles from './screens.module.css';

const STATUS_FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendientes' },
  { key: 'Generada', label: 'Generadas' },
  { key: 'Enviada', label: 'Enviadas' },
  { key: 'Recibida', label: 'Recibidas' },
  { key: 'Cerrada', label: 'Cerradas' }
];

const getStatusVariant = (status) => {
  const variants = {
    'Generada': 'info',
    'Enviada': 'warning',
    'Recibida': 'success',
    'Cerrada': 'default'
  };
  return variants[status] || 'default';
};

const ITEMS_PER_PAGE = 10;

const OrdersScreen = () => {
  const orders = useStore($orders);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Estadísticas
  const stats = useMemo(() => ({
    total: orders.length,
    active: orders.filter(o => o.status !== 'Cerrada').length,
    sent: orders.filter(o => o.status === 'Enviada').length,
    received: orders.filter(o => o.status === 'Recibida').length
  }), [orders]);

  // Filtrar y buscar
  const filteredOrders = useMemo(() => {
    let filtered = orders;
    
    // Filtro por estado
    if (selectedStatus === 'pending') {
      filtered = filtered.filter(o => o.status === 'Generada' || o.status === 'Enviada');
    } else if (selectedStatus !== 'all') {
      filtered = filtered.filter(o => o.status === selectedStatus);
    }
    
    // Búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(o => {
        const supplier = suppliers.find(s => s.id === o.supplierId);
        return (
          o.id.toLowerCase().includes(query) ||
          o.requestId.toLowerCase().includes(query) ||
          supplier?.name.toLowerCase().includes(query) ||
          o.deliveryAddress?.toLowerCase().includes(query)
        );
      });
    }
    
    return filtered;
  }, [orders, selectedStatus, searchQuery]);

  // Paginación
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  // Reset página al cambiar filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, searchQuery]);

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDrawer = () => {
    setSelectedOrder(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.screen}>

      {/* Hero Banner */}
      <div className={`${styles.screenHero} ${styles.ordersHeroBg}`}>
        <div className={styles.screenHeroContent}>
          <div className={styles.screenHeroIcon}>
            <Package size={28} />
          </div>
          <div className={styles.screenHeroText}>
            <h2>Órdenes de Compra</h2>
            <p>Gestiona órdenes generadas desde solicitudes aprobadas</p>
          </div>
        </div>
      </div>

      <div className={styles.screenContent}>

        {/* Filtros y Búsqueda */}
        <div className={styles.tableControls}>
          <div className={styles.filterTabs}>
            {STATUS_FILTERS.map(filter => {
              let count;
              if (filter.key === 'all') {
                count = orders.length;
              } else if (filter.key === 'pending') {
                count = orders.filter(o => o.status === 'Generada' || o.status === 'Enviada').length;
              } else {
                count = orders.filter(o => o.status === filter.key).length;
              }

              return (
                <button
                  key={filter.key}
                  onClick={() => setSelectedStatus(filter.key)}
                  className={`${styles.filterTab} ${selectedStatus === filter.key ? styles.filterTabActive : ''}`}
                >
                  {filter.label}
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
          
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar por folio, proveedor, solicitud..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className={styles.resultsInfo}>
          <span>
            Mostrando {paginatedOrders.length} de {filteredOrders.length} órdenes
          </span>
        </div>

        {/* Table / Cards */}
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={64} />
            <h3>No hay órdenes</h3>
            <p>
              {searchQuery 
                ? `No se encontraron órdenes que coincidan con "${searchQuery}"`
                : selectedStatus === 'all' 
                  ? 'Las órdenes se generan automáticamente desde solicitudes aprobadas'
                  : `No hay órdenes con estado "${selectedStatus}"`
              }
            </p>
          </div>
        ) : (
          <>
            {/* Table - Desktop */}
            <div className={styles.tableWrapper}>
              <table className={styles.modernTable}>
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>Solicitud</th>
                    <th>Dirección</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map(order => {
                    const supplier = suppliers.find(s => s.id === order.supplierId);
                    
                    return (
                      <tr key={order.id} className={styles.modernTableRow}>
                        <td className={styles.folioCell}>
                          <Package size={16} />
                          <span>{order.id}</span>
                        </td>
                        <td className={styles.dateCell}>
                          {formatDate(order.createdAt)}
                        </td>
                        <td>
                          <div className={styles.userCell}>
                            <Building2 size={16} />
                            <span>{supplier?.name || 'N/A'}</span>
                          </div>
                        </td>
                        <td className={styles.folioCell}>
                          <span>{order.requestId}</span>
                        </td>
                        <td>
                          <div className={styles.addressCell}>
                            <MapPin size={14} />
                            <span>{order.deliveryAddress}</span>
                          </div>
                        </td>
                        <td className={styles.amountCell}>
                          <DollarSign size={16} />
                          <span>{formatCurrency(order.total)}</span>
                        </td>
                        <td>
                          <Badge variant={getStatusVariant(order.status)} size="sm">
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <button
                            onClick={() => handleViewDetail(order)}
                            className={styles.actionButton}
                            aria-label={`Ver detalle de ${order.id}`}
                          >
                            <Eye size={16} />
                            <span>Ver</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cards - Mobile */}
            <div className={styles.cardsGrid}>
              {paginatedOrders.map(order => {
                const supplier = suppliers.find(s => s.id === order.supplierId);
                
                return (
                  <div key={order.id} className={styles.requestCard}>
                    <div className={styles.requestCardHeader}>
                      <div className={styles.requestCardFolio}>
                        <Package size={18} />
                        <span>{order.id}</span>
                      </div>
                      <Badge variant={getStatusVariant(order.status)} size="sm">
                        {order.status}
                      </Badge>
                    </div>
                    
                    <div className={styles.requestCardBody}>
                      <div className={styles.requestCardRow}>
                        <Building2 size={16} />
                        <span>{supplier?.name || 'N/A'}</span>
                      </div>
                      <div className={styles.requestCardRow}>
                        <Package size={16} />
                        <span>{order.requestId}</span>
                      </div>
                      <div className={styles.requestCardRow}>
                        <Clock size={16} />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className={styles.requestCardRow}>
                        <MapPin size={16} />
                        <span className={styles.addressText}>{order.deliveryAddress}</span>
                      </div>
                    </div>
                    
                    <div className={styles.requestCardFooter}>
                      <div className={styles.requestCardAmount}>
                        <DollarSign size={18} />
                        <span>{formatCurrency(order.total)}</span>
                      </div>
                      <button
                        onClick={() => handleViewDetail(order)}
                        className={styles.requestCardButton}
                      >
                        <Eye size={16} />
                        Ver detalle
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>
                
                <div className={styles.paginationNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`${styles.paginationNumber} ${currentPage === page ? styles.paginationNumberActive : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Siguiente
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Drawer */}
      {selectedOrder && (
        <OrderDetailDrawer
          order={selectedOrder}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
};

export default OrdersScreen;
