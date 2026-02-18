import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { X, Package, Building2, FileText, Clock, MapPin, Calendar, CheckCircle, Send, Truck, Archive } from 'lucide-react';
import { $selectedRole, updateOrderStatus } from '../../../stores/purchasesStore';
import { formatCurrency, formatDate, getRelativeTime } from '../../../data/purchases/seed';
import { suppliers } from '../../../data/purchases/suppliers';
import { products } from '../../../data/purchases/products';
import Badge from '../ui/Badge';
import styles from '../flows/flows.module.css';

const OrderDetailDrawer = ({ order, onClose }) => {
  const role = useStore($selectedRole);
  const [activeTab, setActiveTab] = useState('details');
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const supplier = suppliers.find(s => s.id === order.supplierId);

  const getNextStatus = (currentStatus) => {
    const flow = {
      'Generada': 'Enviada',
      'Enviada': 'Recibida',
      'Recibida': 'Cerrada'
    };
    return flow[currentStatus] || null;
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Generada': Package,
      'Enviada': Send,
      'Recibida': Truck,
      'Cerrada': Archive
    };
    return icons[status] || Package;
  };

  const getStatusVariant = (status) => {
    const variants = {
      'Generada': 'info',
      'Enviada': 'warning',
      'Recibida': 'success',
      'Cerrada': 'default'
    };
    return variants[status] || 'default';
  };

  const handleChangeStatus = () => {
    const next = getNextStatus(order.status);
    if (next) {
      setNextStatus(next);
      setShowStatusConfirm(true);
    }
  };

  const handleConfirmStatusChange = () => {
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus, deliveryNotes);
      setShowStatusConfirm(false);
      setNextStatus(null);
      setDeliveryNotes('');
    }
  };

  const handleCancelStatusChange = () => {
    setShowStatusConfirm(false);
    setNextStatus(null);
    setDeliveryNotes('');
  };

  const canChangeStatus = () => {
    // Empleado y Aprobador pueden cambiar status hasta Recibida
    // Finance puede cerrar
    if (order.status === 'Cerrada') return false;
    if (order.status === 'Recibida' && role !== 'finance') return false;
    return true;
  };

  const renderDetailsTab = () => (
    <div className={styles.drawerSection}>
      {/* Order Items */}
      <div className={styles.drawerBlock}>
        <h3 className={styles.drawerBlockTitle}>
          <Package size={18} />
          Items de la Orden ({order.items.length})
        </h3>
        <div className={styles.requestItems}>
          {order.items.map((item, index) => {
            const product = products.find(p => p.id === item.productId);
            const itemTotal = item.price * item.qty;

            return (
              <div key={index} className={styles.requestItem}>
                <div className={styles.requestItemImage}>
                  {product && <img src={product.image} alt={product.name} />}
                </div>
                <div className={styles.requestItemInfo}>
                  <h4 className={styles.requestItemName}>{product?.name || 'Producto N/A'}</h4>
                  <div className={styles.requestItemDetails}>
                    <span>Cantidad: {item.qty}</span>
                    <span>•</span>
                    <span>{formatCurrency(item.price)} c/u</span>
                    {item.contractPrice && (
                      <>
                        <span>•</span>
                        <Badge variant="success" size="sm">Precio Contrato</Badge>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.requestItemTotal}>
                  {formatCurrency(itemTotal)}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.requestTotal}>
          <span>Total Orden:</span>
          <strong>{formatCurrency(order.total)}</strong>
        </div>
      </div>

      {/* Supplier Info */}
      <div className={styles.drawerBlock}>
        <h3 className={styles.drawerBlockTitle}>
          <Building2 size={18} />
          Información del Proveedor
        </h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Proveedor</div>
            <div className={styles.infoValue}>{supplier?.name || 'N/A'}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Rating</div>
            <div className={styles.infoValue}>
              {'⭐'.repeat(Math.floor(supplier?.rating || 0))} {supplier?.rating || 'N/A'}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Tiempo de Entrega</div>
            <div className={styles.infoValue}>{supplier?.leadTimeDays || 0} días</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Contacto</div>
            <div className={styles.infoValue}>{supplier?.contactEmail || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className={styles.drawerBlock}>
        <h3 className={styles.drawerBlockTitle}>
          <FileText size={18} />
          Información de la Orden
        </h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Solicitud Origen</div>
            <div className={styles.infoValue}>{order.requestId}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Fecha de Creación</div>
            <div className={styles.infoValue}>{formatDate(order.createdAt)}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Estado Actual</div>
            <div className={styles.infoValue}>
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Entrega Estimada</div>
            <div className={styles.infoValue}>
              {new Date(new Date(order.createdAt).getTime() + (supplier?.leadTimeDays || 0) * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      {order.deliveryAddress && (
        <div className={styles.drawerBlock}>
          <h3 className={styles.drawerBlockTitle}>
            <MapPin size={18} />
            Dirección de Entrega
          </h3>
          <p className={styles.notesText}>
            {order.deliveryAddress}
          </p>
        </div>
      )}

      {/* Notes */}
      {order.notes && (
        <div className={styles.drawerBlock}>
          <h3 className={styles.drawerBlockTitle}>
            <FileText size={18} />
            Notas de Entrega
          </h3>
          <p className={styles.notesText}>
            {order.notes}
          </p>
        </div>
      )}
    </div>
  );

  const renderTimelineTab = () => (
    <div className={styles.drawerSection}>
      <div className={styles.timeline}>
        {order.statusHistory && order.statusHistory.length > 0 ? (
          order.statusHistory.map((event, index) => {
            const StatusIcon = getStatusIcon(event.status);
            const isLast = index === order.statusHistory.length - 1;

            return (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <StatusIcon size={18} />
                </div>
                {!isLast && <div className={styles.timelineLine} />}
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineAction}>{event.status}</span>
                    <span className={styles.timelineTime}>{getRelativeTime(event.date)}</span>
                  </div>
                  <div className={styles.timelineDetails}>
                    Por: <span className={styles.timelineRole}>{event.userName || event.role || 'Sistema'}</span>
                  </div>
                  {event.notes && (
                    <p className={styles.timelineComment}>
                      {event.notes}
                    </p>
                  )}
                  <div className={styles.timelineDate}>
                    {formatDate(event.date)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <Package size={18} />
            </div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineHeader}>
                <span className={styles.timelineAction}>Orden Generada</span>
                <span className={styles.timelineTime}>{getRelativeTime(order.createdAt)}</span>
              </div>
              <div className={styles.timelineDetails}>
                Por: <span className={styles.timelineRole}>Sistema</span>
              </div>
              <div className={styles.timelineDate}>
                {formatDate(order.createdAt)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFooter = () => {
    const next = getNextStatus(order.status);

    if (!canChangeStatus()) {
      if (order.status === 'Cerrada') {
        return (
          <div className={styles.readOnlyNote}>
            <Archive size={16} />
            Orden cerrada - No se pueden realizar más cambios
          </div>
        );
      }
      return (
        <div className={styles.readOnlyNote}>
          <Archive size={16} />
          Solo el rol de Finanzas puede cerrar órdenes recibidas
        </div>
      );
    }

    if (showStatusConfirm) {
      return (
        <div className={styles.confirmBox}>
          <div className={styles.confirmHeader}>
            <CheckCircle size={18} />
            Cambiar estado a: <Badge variant={getStatusVariant(nextStatus)}>{nextStatus}</Badge>
          </div>
          <textarea
            className={styles.confirmTextarea}
            placeholder="Notas de entrega (opcional)..."
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
            rows={3}
          />
          <div className={styles.confirmActions}>
            <button
              className={styles.confirmButtonSuccess}
              onClick={handleConfirmStatusChange}
            >
              <CheckCircle size={16} />
              Confirmar
            </button>
            <button
              className={styles.confirmButtonSecondary}
              onClick={handleCancelStatusChange}
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }

    return (
      <button
        className={styles.drawerButtonPrimary}
        onClick={handleChangeStatus}
      >
        <CheckCircle size={18} />
        Cambiar a: {next}
      </button>
    );
  };

  return (
    <>
      <div className={styles.drawerOverlay} onClick={onClose} />
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerHeaderTop}>
            <div className={styles.drawerHeaderInfo}>
              <h2 className={styles.drawerTitle}>{order.id}</h2>
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </div>
            <button className={styles.drawerClose} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.drawerHeaderMeta}>
            <div className={styles.drawerMetaItem}>
              <Clock size={16} />
              {formatDate(order.createdAt)}
            </div>
            <div className={styles.drawerMetaItem}>
              <Building2 size={16} />
              {supplier?.name || 'N/A'}
            </div>
            <div className={styles.drawerMetaItem}>
              Total: <strong>{formatCurrency(order.total)}</strong>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.drawerTabs}>
          <button
            className={`${styles.drawerTab} ${activeTab === 'details' ? styles.drawerTabActive : ''}`}
            onClick={() => setActiveTab('details')}
          >
            <Package size={16} />
            Detalles
          </button>
          <button
            className={`${styles.drawerTab} ${activeTab === 'timeline' ? styles.drawerTabActive : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Clock size={16} />
            Timeline
          </button>
        </div>

        {/* Body */}
        <div className={styles.drawerBody}>
          {activeTab === 'details' ? renderDetailsTab() : renderTimelineTab()}
        </div>

        {/* Footer */}
        <div className={styles.drawerFooter}>
          {renderFooter()}
        </div>
      </div>
    </>
  );
};

export default OrderDetailDrawer;
