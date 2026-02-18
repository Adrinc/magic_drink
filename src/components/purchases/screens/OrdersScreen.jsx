import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { Package, Clock, Building2, DollarSign, Eye, TrendingUp } from 'lucide-react';
import { $orders } from '../../../stores/purchasesStore';
import { formatCurrency, formatDate } from '../../../data/purchases/seed';
import { suppliers } from '../../../data/purchases/suppliers';
import { products } from '../../../data/purchases/products';
import Badge from '../ui/Badge';
import OrderDetailDrawer from '../flows/OrderDetailDrawer';
import styles from './screens.module.css';

const STATUS_FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'Generada', label: 'Generada' },
  { key: 'Enviada', label: 'Enviada' },
  { key: 'Recibida', label: 'Recibida' },
  { key: 'Cerrada', label: 'Cerrada' }
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

const OrdersScreen = () => {
  const orders = useStore($orders);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const stats = {
    total: orders.length,
    active: orders.filter(o => o.status !== 'Cerrada').length,
    pending: orders.filter(o => o.status === 'Generada' || o.status === 'Enviada').length
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDrawer = () => {
    setSelectedOrder(null);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.screenContent}>
        {/* Header */}
        <div className={styles.requestsHeader}>
          <div className={styles.requestsHeaderLeft}>
            <h1 className={styles.requestsTitle}>Órdenes de Compra</h1>
            <p className={styles.requestsDescription}>
              Gestiona órdenes generadas desde solicitudes aprobadas
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.requestsStats}>
          <div className={styles.requestsStatCard}>
            <div className={styles.requestsStatLabel}>Total Órdenes</div>
            <div className={styles.requestsStatValue}>
              <Package size={32} />
              {stats.total}
            </div>
          </div>
          <div className={styles.requestsStatCard}>
            <div className={styles.requestsStatLabel}>Activas</div>
            <div className={styles.requestsStatValue}>
              <TrendingUp size={32} />
              {stats.active}
            </div>
          </div>
          <div className={styles.requestsStatCard}>
            <div className={styles.requestsStatLabel}>Pendientes</div>
            <div className={styles.requestsStatValue}>
              <Clock size={32} />
              {stats.pending}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.requestsFilters}>
          {STATUS_FILTERS.map(filter => {
            const count = filter.key === 'all'
              ? orders.length
              : orders.filter(o => o.status === filter.key).length;

            return (
              <button
                key={filter.key}
                className={`${styles.requestsFilterBtn} ${selectedStatus === filter.key ? styles.requestsFilterBtnActive : ''}`}
                onClick={() => setSelectedStatus(filter.key)}
              >
                {filter.label}
                <span className={styles.requestsFilterBadge}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        {filteredOrders.length > 0 ? (
          <div className={styles.requestsTableWrapper}>
            <table className={styles.requestsTable}>
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Fecha</th>
                  <th>Proveedor</th>
                  <th>Solicitud</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const supplier = suppliers.find(s => s.id === order.supplierId);
                  
                  return (
                    <tr key={order.id}>
                      <td>
                        <div className={styles.requestsTableFolio}>
                          <Package size={18} className={styles.requestsTableFolioIcon} />
                          {order.id}
                        </div>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>
                        <div className={styles.requestsTableUser}>
                          <Building2 size={18} className={styles.requestsTableUserIcon} />
                          {supplier?.name || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className={styles.requestsTableCostCenter}>
                          {order.requestId}
                        </div>
                      </td>
                      <td className={styles.requestsTableAmount}>
                        {formatCurrency(order.total)}
                      </td>
                      <td>
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td>
                        <div className={styles.requestsTableActions}>
                          <button
                            className={styles.requestsTableActionBtn}
                            onClick={() => handleViewDetail(order)}
                          >
                            <Eye size={16} />
                            Ver detalle
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.requestsTableWrapper}>
            <div className={styles.requestsEmptyState}>
              <Package size={64} className={styles.requestsEmptyIcon} />
              <h3 className={styles.requestsEmptyTitle}>
                No hay órdenes {selectedStatus !== 'all' ? `con estado "${selectedStatus}"` : ''}
              </h3>
              <p className={styles.requestsEmptyDescription}>
                Las órdenes se generan automáticamente desde solicitudes aprobadas.
              </p>
            </div>
          </div>
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
