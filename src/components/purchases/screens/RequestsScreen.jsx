import React, { useState, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { FileText, Clock, User, Building2, DollarSign, Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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

const ITEMS_PER_PAGE = 10;

const RequestsScreen = () => {
  const requests = useStore($requests);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar y buscar
  const filteredRequests = useMemo(() => {
    let filtered = requests;
    
    // Filtro por estado
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(r => r.status === selectedStatus);
    }
    
    // Búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.id.toLowerCase().includes(query) ||
        r.requesterName.toLowerCase().includes(query) ||
        r.costCenter.toLowerCase().includes(query) ||
        r.notes?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [requests, selectedStatus, searchQuery]);

  // Paginación
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, currentPage]);

  // Reset página al cambiar filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, searchQuery]);

  const handleViewDetail = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDrawer = () => {
    setSelectedRequest(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Estadísticas rápidas
  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'Enviada' || r.status === 'En aprobación').length,
    approved: requests.filter(r => r.status === 'Aprobada').length,
    rejected: requests.filter(r => r.status === 'Rechazada').length
  }), [requests]);

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
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FileText size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stats.total}</span>
              <span className={styles.statLabel}>Total Solicitudes</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <Clock size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stats.pending}</span>
              <span className={styles.statLabel}>Pendientes</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FileText size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stats.approved}</span>
              <span className={styles.statLabel}>Aprobadas</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <FileText size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stats.rejected}</span>
              <span className={styles.statLabel}>Rechazadas</span>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className={styles.tableControls}>
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
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
          
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar por folio, solicitante, centro de costo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className={styles.resultsInfo}>
          <span>
            Mostrando {paginatedRequests.length} de {filteredRequests.length} solicitudes
          </span>
        </div>

        {/* Table - Desktop */}
        {filteredRequests.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={64} />
            <h3>No hay solicitudes</h3>
            <p>
              {searchQuery 
                ? `No se encontraron solicitudes que coincidan con "${searchQuery}"`
                : selectedStatus === 'all' 
                  ? 'Aún no se han creado solicitudes de compra'
                  : `No hay solicitudes con estado "${selectedStatus}"`
              }
            </p>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.modernTable}>
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
                  {paginatedRequests.map(request => (
                    <tr key={request.id} className={styles.modernTableRow}>
                      <td className={styles.folioCell}>
                        <FileText size={16} />
                        <span>{request.id}</span>
                      </td>
                      <td className={styles.dateCell}>
                        {formatDate(request.createdAt)}
                      </td>
                      <td>
                        <div className={styles.userCell}>
                          <User size={16} />
                          <span>{request.requesterName}</span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.costCenterCell}>
                          <Building2 size={16} />
                          <span>{request.costCenter}</span>
                        </div>
                      </td>
                      <td>
                        <Badge 
                          variant={request.priority === 'Urgente' ? 'error' : request.priority === 'Alta' ? 'warning' : 'default'}
                          size="sm"
                        >
                          {request.priority}
                        </Badge>
                      </td>
                      <td className={styles.amountCell}>
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
                          className={styles.actionButton}
                          aria-label={`Ver detalle de ${request.id}`}
                        >
                          <Eye size={16} />
                          <span>Ver</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards - Mobile */}
            <div className={styles.cardsGrid}>
              {paginatedRequests.map(request => (
                <div key={request.id} className={styles.requestCard}>
                  <div className={styles.requestCardHeader}>
                    <div className={styles.requestCardFolio}>
                      <FileText size={18} />
                      <span>{request.id}</span>
                    </div>
                    <Badge variant={getStatusVariant(request.status)} size="sm">
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className={styles.requestCardBody}>
                    <div className={styles.requestCardRow}>
                      <User size={16} />
                      <span>{request.requesterName}</span>
                    </div>
                    <div className={styles.requestCardRow}>
                      <Building2 size={16} />
                      <span>{request.costCenter}</span>
                    </div>
                    <div className={styles.requestCardRow}>
                      <Clock size={16} />
                      <span>{formatDate(request.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className={styles.requestCardFooter}>
                    <div className={styles.requestCardAmount}>
                      <DollarSign size={18} />
                      <span>{formatCurrency(request.total)}</span>
                    </div>
                    <button
                      onClick={() => handleViewDetail(request)}
                      className={styles.requestCardButton}
                    >
                      <Eye size={16} />
                      Ver detalle
                    </button>
                  </div>
                </div>
              ))}
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
      <RequestDetailDrawer
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default RequestsScreen;
