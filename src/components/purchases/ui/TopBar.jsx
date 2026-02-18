import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { Wallet, Menu, X, ChevronDown, ArrowLeft, Bell } from 'lucide-react';
import { $selectedRole, $budgetInfo, $selectedCostCenter, setRole, setCostCenter } from '../../../stores/purchasesStore';
import { formatCurrency } from '../../../data/purchases/seed';
import TabNav from './TabNav';
import styles from './ui.module.css';

const ROLES = [
  { id: 'employee', label: 'Empleado', name: 'Carlos Pérez', avatar: 'Carlos.png' },
  { id: 'approver', label: 'Aprobador', name: 'María González', avatar: 'Maria.png' },
  { id: 'finance', label: 'Finanzas', name: 'Laura Martínez', avatar: 'Laura.png' }
];

const COST_CENTERS = ['TI', 'Oficina', 'Marketing', 'Mantenimiento'];

const TopBar = ({ activeTab, onTabChange }) => {
  const role = useStore($selectedRole);
  const budgetInfo = useStore($budgetInfo);
  const costCenter = useStore($selectedCostCenter);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const currentRole = ROLES.find(r => r.id === role) || ROLES[0];

  // Cerrar menú móvil cuando cambia el tab
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isUserMenuOpen && !e.target.closest(`.${styles.userMenu}`)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarContainer}>
        
        {/* Salir Demo - Lado Izquierdo */}
        <a 
          href="https://cbluna.com/" 
          className={styles.exitButton}
          aria-label="Salir de la demo"
        >
          <ArrowLeft size={18} />
          <span className={styles.exitButtonText}>Salir demo</span>
        </a>

        {/* Logo y Brand */}
        <div className={styles.topBarBrand}>
          <div className={styles.topBarLogo}>
            <img 
              src={`${import.meta.env.BASE_URL}/favicon.png`}
              alt="Portal Compras"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.topBarBrandText}>
            <h1 className={styles.topBarTitle}>Portal Compras</h1>
            <span className={styles.topBarSubtitle}>CBLuna</span>
          </div>
        </div>

        {/* Navegación por Tabs - Desktop */}
        <div className={styles.topBarNav}>
          <TabNav activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Indicadores y Controles - Desktop */}
        <div className={styles.topBarControls}>
          
          {/* Budget Indicator */}
          <div className={styles.budgetIndicator}>
            <div className={styles.budgetIcon}>
              <Wallet size={18} />
            </div>
            <div className={styles.budgetInfo}>
              <span className={styles.budgetLabel}>Disponible</span>
              <span className={styles.budgetAmount}>
                {formatCurrency(budgetInfo.available)}
              </span>
            </div>
          </div>

          {/* Cost Center Selector */}
          <div className={styles.selectorWrapper}>
            <label className={styles.selectorLabel}>Centro</label>
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
          </div>

          {/* Notificaciones */}
          <button className={styles.notificationButton} aria-label="Notificaciones">
            <Bell size={20} />
            <span className={styles.notificationBadge}>3</span>
          </button>

          {/* User Menu con Avatar */}
          <div className={styles.userMenu}>
            <button
              className={styles.userMenuButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsUserMenuOpen(!isUserMenuOpen);
              }}
              aria-label="Menú de usuario"
            >
              <img 
                src={`${import.meta.env.BASE_URL}/image/avatares/${currentRole.avatar}`}
                alt={currentRole.name}
                className={styles.userAvatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{currentRole.name}</span>
                <span className={styles.userRole}>{currentRole.label}</span>
              </div>
              <ChevronDown size={16} className={isUserMenuOpen ? styles.chevronOpen : ''} />
            </button>

            {isUserMenuOpen && (
              <div className={styles.userMenuDropdown}>
                <div className={styles.userMenuSection}>
                  <span className={styles.userMenuTitle}>Cambiar Rol</span>
                  {ROLES.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id);
                        setIsUserMenuOpen(false);
                      }}
                      className={`${styles.userMenuItem} ${role === r.id ? styles.userMenuItemActive : ''}`}
                    >
                      <img 
                        src={`${import.meta.env.BASE_URL}/image/avatares/${r.avatar}`}
                        alt={r.name}
                        className={styles.menuItemAvatar}
                      />
                      <div className={styles.menuItemInfo}>
                        <span className={styles.menuItemName}>{r.name}</span>
                        <span className={styles.menuItemRole}>{r.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menú Hamburguesa - Mobile */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuContent}>
            
            {/* User Info Mobile */}
            <div className={styles.mobileUserInfo}>
              <img 
                src={`${import.meta.env.BASE_URL}/image/avatares/${currentRole.avatar}`}
                alt={currentRole.name}
                className={styles.mobileUserAvatar}
              />
              <div>
                <div className={styles.mobileUserName}>{currentRole.name}</div>
                <div className={styles.mobileUserRole}>{currentRole.label}</div>
              </div>
            </div>

            {/* Budget Mobile */}
            <div className={styles.mobileBudget}>
              <Wallet size={20} />
              <div>
                <span className={styles.mobileBudgetLabel}>Disponible ({costCenter})</span>
                <span className={styles.mobileBudgetAmount}>
                  {formatCurrency(budgetInfo.available)}
                </span>
              </div>
            </div>

            {/* Navigation Mobile */}
            <nav className={styles.mobileNav}>
              <TabNav activeTab={activeTab} onTabChange={onTabChange} mobile />
            </nav>

            {/* Selectors Mobile */}
            <div className={styles.mobileSelectors}>
              <div className={styles.mobileSelectorGroup}>
                <label>Centro de Costo</label>
                <select
                  value={costCenter}
                  onChange={(e) => setCostCenter(e.target.value)}
                  className={styles.mobileSelector}
                >
                  {COST_CENTERS.map(cc => (
                    <option key={cc} value={cc}>{cc}</option>
                  ))}
                </select>
              </div>

              <div className={styles.mobileSelectorGroup}>
                <label>Cambiar Rol</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={styles.mobileSelector}
                >
                  {ROLES.map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
