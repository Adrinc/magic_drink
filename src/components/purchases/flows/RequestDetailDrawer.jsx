import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FileText, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle,
  ShoppingBag,
  MessageSquare,
  Package,
  AlertCircle
} from 'lucide-react';
import { 
  $selectedRole,
  approveRequest,
  rejectRequest,
  generateOrder
} from '../../../stores/purchasesStore';
import { getProductById } from '../../../data/purchases/products';
import { formatCurrency, formatDate, getRelativeTime } from '../../../data/purchases/seed';
import Badge from '../ui/Badge';
import styles from './flows.module.css';

const TABS = [
  { id: 'details', label: 'Detalles', icon: FileText },
  { id: 'timeline', label: 'Timeline', icon: Clock }
];

const getStatusVariant = (status) => {
  switch (status) {
    case 'Aprobada':
      return 'success';
    case 'Rechazada':
      return 'error';
    case 'En aprobación':
      return 'warning';
    case 'Enviada':
      return 'info';
    default:
      return 'default';
  }
};

const getApprovalIcon = (action) => {
  switch (action) {
    case 'creada':
      return FileText;
    case 'aprobada':
      return CheckCircle;
    case 'rechazada':
      return XCircle;
    case 'orden_generada':
      return Package;
    default:
      return MessageSquare;
  }
};

const RequestDetailDrawer = ({ request, isOpen, onClose }) => {
  const role = useStore($selectedRole);
  const [activeTab, setActiveTab] = useState('details');
  const [comment, setComment] = useState('');
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  if (!isOpen || !request) return null;

  const canApprove = role === 'approver' && (request.status === 'Enviada' || request.status === 'En aprobación');
  const canGenerateOrder = request.status === 'Aprobada';
  const isReadOnly = role === 'finance' || request.status === 'Rechazada' || request.status === 'Aprobada';

  const handleApprove = () => {
    if (approveRequest(request.id, comment, 'Aprobador Demo')) {
      setComment('');
      setShowApproveConfirm(false);
      // El drawer permanece abierto para ver el cambio
    }
  };

  const handleReject = () => {
    if (rejectRequest(request.id, comment, 'Aprobador Demo')) {
      setComment('');
      setShowRejectConfirm(false);
    }
  };

  const handleGenerateOrder = () => {
    generateOrder(request.id, 'Oficina Central - Av. Principal 123', 5);
  };

  // Details Tab
  const renderDetailsTab = () => (
    <div className={styles.modalSection}>
      
      {/* Items List */}
      <div className={styles.modalBlock}>
        <h4 className={styles.modalBlockTitle}>
          <ShoppingBag size={18} />
          Items Solicitados
        </h4>
        <div className={styles.requestItems}>
          {request.items.map((item, index) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            
            return (
              <div key={`${item.productId}-${index}`} className={styles.requestItem}>
                <div className={styles.requestItemImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className={styles.requestItemInfo}>
                  <h5 className={styles.requestItemName}>{product.name}</h5>
                  <div className={styles.requestItemDetails}>
                    <span>Cantidad: {item.qty}</span>
                    <span>•</span>
                    <span>{formatCurrency(item.price)} c/u</span>
                    {item.useContract && (
                      <>
                        <span>•</span>
                        <Badge variant="cyan" size="sm">Contrato</Badge>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.requestItemTotal}>
                  {formatCurrency(item.price * item.qty)}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.requestTotal}>
          <span>Total:</span>
          <strong>{formatCurrency(request.total)}</strong>
        </div>
      </div>

      {/* Additional Info */}
      <div className={styles.modalBlock}>
        <h4 className={styles.modalBlockTitle}>
          <FileText size={18} />
          Información Adicional
        </h4>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Centro de Costo:</span>
            <span className={styles.infoValue}>{request.costCenter}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Prioridad:</span>
            <Badge 
              variant={request.priority === 'Urgente' ? 'error' : 'default'}
              size="sm"
            >
              {request.priority}
            </Badge>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Solicitante:</span>
            <span className={styles.infoValue}>{request.requesterName}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Fecha de Creación:</span>
            <span className={styles.infoValue}>{formatDate(request.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {request.notes && (
        <div className={styles.modalBlock}>
          <h4 className={styles.modalBlockTitle}>
            <MessageSquare size={18} />
            Notas
          </h4>
          <p className={styles.notesText}>{request.notes}</p>
        </div>
      )}
    </div>
  );

  // Timeline Tab
  const renderTimelineTab = () => (
    <div className={styles.modalSection}>
      <div className={styles.timeline}>
        {request.approvals.map((approval, index) => {
          const Icon = getApprovalIcon(approval.action);
          const isLast = index === request.approvals.length - 1;
          
          return (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Icon size={18} />
              </div>
              {!isLast && <div className={styles.timelineLine} />}
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <span className={styles.timelineAction}>
                    Solicitud {approval.action}
                  </span>
                  <span className={styles.timelineTime}>
                    {getRelativeTime(approval.date)}
                  </span>
                </div>
                <div className={styles.timelineDetails}>
                  <span className={styles.timelineRole}>{approval.role}</span>
                  {approval.userName && (
                    <>
                      <span>•</span>
                      <span>{approval.userName}</span>
                    </>
                  )}
                </div>
                {approval.comment && (
                  <p className={styles.timelineComment}>{approval.comment}</p>
                )}
                <span className={styles.timelineDate}>
                  {formatDate(approval.date)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="request-overlay"
          className={styles.modalOverlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            key="request-modal"
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
        
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <div className={styles.modalHeaderInfo}>
              <h2 className={styles.modalTitle}>{request.id}</h2>
              <Badge variant={getStatusVariant(request.status)} size="md">
                {request.status}
              </Badge>
            </div>
          </div>
          <div className={styles.modalHeaderRight}>
            <button
              onClick={onClose}
              className={styles.modalClose}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Meta Info (below header for mobile) */}
        <div style={{ padding: '0 1.5rem 1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={16} />
            <span>{request.requesterName}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} />
            <span>{getRelativeTime(request.createdAt)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong style={{ color: 'var(--accent-primary)', fontSize: '1.125rem' }}>{formatCurrency(request.total)}</strong>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.modalTabs}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.modalTab} ${activeTab === tab.id ? styles.modalTabActive : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={styles.modalBody}>
          {activeTab === 'details' ? renderDetailsTab() : renderTimelineTab()}
        </div>

        {/* Footer Actions */}
        <div className={styles.modalFooter}>
          {canApprove && !showApproveConfirm && !showRejectConfirm && (
            <>
              <button
                onClick={() => setShowApproveConfirm(true)}
                className={styles.modalButtonSuccess}
              >
                <CheckCircle size={18} />
                Aprobar Solicitud
              </button>
              <button
                onClick={() => setShowRejectConfirm(true)}
                className={styles.modalButtonError}
              >
                <XCircle size={18} />
                Rechazar
              </button>
            </>
          )}

          {showApproveConfirm && (
            <div className={styles.confirmBox}>
              <div className={styles.confirmHeader}>
                <CheckCircle size={20} />
                <span>Aprobar Solicitud</span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comentario (opcional)"
                className={styles.confirmTextarea}
                rows={3}
              />
              <div className={styles.confirmActions}>
                <button
                  onClick={() => setShowApproveConfirm(false)}
                  className={styles.confirmButtonSecondary}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApprove}
                  className={styles.confirmButtonSuccess}
                >
                  Confirmar Aprobación
                </button>
              </div>
            </div>
          )}

          {showRejectConfirm && (
            <div className={styles.confirmBox}>
              <div className={styles.confirmHeader}>
                <AlertCircle size={20} />
                <span>Rechazar Solicitud</span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Motivo del rechazo (obligatorio)"
                className={styles.confirmTextarea}
                rows={3}
                required
              />
              <div className={styles.confirmActions}>
                <button
                  onClick={() => setShowRejectConfirm(false)}
                  className={styles.confirmButtonSecondary}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReject}
                  className={styles.confirmButtonError}
                  disabled={!comment.trim()}
                >
                  Confirmar Rechazo
                </button>
              </div>
            </div>
          )}

          {canGenerateOrder && !showApproveConfirm && !showRejectConfirm && (
            <button
              onClick={handleGenerateOrder}
              className={styles.modalButtonPrimary}
            >
              <Package size={18} />
              Generar Orden de Compra
            </button>
          )}

          {isReadOnly && !canGenerateOrder && (
            <div className={styles.readOnlyNote}>
              <AlertCircle size={16} />
              <span>Solo lectura - {role === 'finance' ? 'Vista de Finanzas' : `Estado: ${request.status}`}</span>
            </div>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestDetailDrawer;
