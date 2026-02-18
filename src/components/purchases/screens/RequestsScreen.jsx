import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { FileText, Clock, User, Building2, DollarSign, Eye } from 'lucide-react';
import { $requests } from '../../../stores/purchasesStore';
import { formatCurrency, formatDate } from '../../../data/purchases/seed';
import RequestDetailDrawer from '../flows/RequestDetailDrawer';
import Badge from '../ui/Badge';
import styles from './screens.module.css';

const STATUS_FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'Enviada', label: 'Enviadas' },
  { id: 'En aprobación', label: 'En Aprobación' },
  { id: 'Aprobada', label: 'Aprobadas' },
  { id: 'Rechazada', label: 'Rechazadas' }
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

const RequestsScreen = () => {
  const requests = useStore($requests);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filtrar solicitudes por estado
  const filteredRequests = selectedStatus === 'all'
    ? requests
    : requests.filter(r => r.status === selectedStatus);

  const handleViewDetail = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDrawer = () => {
    setSelectedRequest(null);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.screenContent}>
        
        {/* Header */}
        <div className={styles.screenHeader}>
          <div>
            <h2 className={styles.screenTitle}>Solicitudes de Compra</h2>
            <p className={styles.screenDescription}>
              Gestiona y aprueba solicitudes de tu departamento
            </p>
          </div>
          <div className={styles.screenStats}>
            <div className={styles.statCard}>
              <FileText size={20} />
              <div>
                <span className={styles.statValue}>{requests.length}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <Clock size={20} />
              <div>
                <span className={styles.statValue}>
                  {requests.filter(r => r.status === 'Enviada' || r.status === 'En aprobación').length}
                </span>
                <span className={styles.statLabel}>Pendientes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className={styles.filterTabs}>
          {STATUS_FILTERS.map(filter => {
            const count = filter.id === 'all' 
              ? requests.length 
              : requests.filter(r => r.status === filter.id).length;
            
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedStatus(filter.id)}
                className={`${styles.filterTab} ${selectedStatus === filter.id ? styles.filterTabActive : ''}`}
              >
                {filter.label}
                <Badge variant="default" size="sm">{count}</Badge>
              </button>
            );
          })}
        </div>

        {/* Requests Table */}
        {filteredRequests.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={64} />
            <h3>No hay solicitudes</h3>
            <p>
              {selectedStatus === 'all' 
                ? 'Aún no se han creado solicitudes de compra'
                : `No hay solicitudes con estado "${selectedStatus}"`
              }
            </p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.requestsTable}>
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Fecha</th>
                  <th>Solicitante</th>
                  <th>Centro de Costo</th>
                  <th>Prioridad</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(request => (
                  <tr key={request.id} className={styles.tableRow}>
                    <td className={styles.tableCellFolio}>
                      <FileText size={16} />
                      <span>{request.id}</span>
                    </td>
                    <td className={styles.tableCellDate}>
                      {formatDate(request.createdAt)}
                    </td>
                    <td>
                      <div className={styles.tableCellUser}>
                        <User size={16} />
                        <span>{request.requesterName}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.tableCellCostCenter}>
                        <Building2 size={16} />
                        <span>{request.costCenter}</span>
                      </div>
                    </td>
                    <td>
                      <Badge 
                        variant={request.priority === 'Urgente' ? 'error' : 'default'}
                        size="sm"
                      >
                        {request.priority}
                      </Badge>
                    </td>
                    <td className={styles.tableCellAmount}>
                      <DollarSign size={16} />
                      <span>{formatCurrency(request.total)}</span>
                    </td>
                    <td>
                      <Badge variant={getStatusVariant(request.status)} size="sm">
                        {request.status}
                      </Badge>
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewDetail(request)}
                        className={styles.tableActionButton}
                        aria-label={`Ver detalle de ${request.id}`}
                      >
                        <Eye size={16} />
                        <span>Ver detalle</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <RequestDetailDrawer
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default RequestsScreen;
