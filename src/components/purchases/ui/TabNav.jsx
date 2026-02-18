import React from 'react';
import { ShoppingBag, FileText, Package, BarChart3 } from 'lucide-react';
import styles from './ui.module.css';

const tabs = [
  { id: 'catalog', label: 'Catálogo', icon: ShoppingBag },
  { id: 'requests', label: 'Solicitudes', icon: FileText },
  { id: 'orders', label: 'Órdenes', icon: Package },
  { id: 'reports', label: 'Reportes', icon: BarChart3 }
];

const TabNav = ({ activeTab, onTabChange }) => {
  return (
    <nav className={styles.tabNav}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={18} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default TabNav;
