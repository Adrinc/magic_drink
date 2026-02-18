import React from 'react';
import { useStore } from '@nanostores/react';
import { Wallet, User, ExternalLink } from 'lucide-react';
import { $selectedRole, $budgetInfo, $selectedCostCenter, setRole, setCostCenter } from '../../../stores/purchasesStore';
import { formatCurrency } from '../../../data/purchases/seed';
import TabNav from './TabNav';
import styles from './ui.module.css';

const ROLES = [
  { id: 'employee', label: 'Empleado' },
  { id: 'approver', label: 'Aprobador' },
  { id: 'finance', label: 'Finanzas' }
];

const COST_CENTERS = ['TI', 'Oficina', 'Marketing', 'Mantenimiento'];

const TopBar = ({ activeTab, onTabChange }) => {
  const role = useStore($selectedRole);
  const budgetInfo = useStore($budgetInfo);
  const costCenter = useStore($selectedCostCenter);

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarContainer}>
        
        {/* Logo y Brand */}
        <div className={styles.topBarBrand}>
          <div className={styles.topBarLogo}>
            <ShoppingBag size={24} className={styles.topBarLogoIcon} />
          </div>
          <div className={styles.topBarBrandText}>
            <h1 className={styles.topBarTitle}>Portal Compras</h1>
            <span className={styles.topBarSubtitle}>CBLuna Demo</span>
          </div>
        </div>

        {/* Navegación por Tabs */}
        <div className={styles.topBarNav}>
          <TabNav activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Indicadores y Controles */}
        <div className={styles.topBarControls}>
          
          {/* Budget Indicator */}
          <div className={styles.budgetIndicator}>
            <Wallet size={18} />
            <div className={styles.budgetInfo}>
              <span className={styles.budgetLabel}>Disponible ({costCenter})</span>
              <span className={styles.budgetAmount}>
                {formatCurrency(budgetInfo.available)}
              </span>
            </div>
          </div>

          {/* Cost Center Selector */}
          <select
            value={costCenter}
            onChange={(e) => setCostCenter(e.target.value)}
            className={styles.selector}
            aria-label="Seleccionar centro de costo"
          >
            {COST_CENTERS.map(cc => (
              <option key={cc} value={cc}>{cc}</option>
            ))}
          </select>

          {/* Role Selector */}
          <div className={styles.roleSelector}>
            <User size={18} />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.selector}
              aria-label="Seleccionar rol"
            >
              {ROLES.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Volver a CBLuna */}
          <a 
            href="https://cbluna.com/" 
            className={styles.backLink}
            aria-label="Volver a CBLuna"
          >
            <span>Volver a CBLuna</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </header>
  );
};

// Icon placeholder component
const ShoppingBag = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export default TopBar;
