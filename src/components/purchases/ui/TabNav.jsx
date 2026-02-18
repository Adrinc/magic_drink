import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, FileText, Package, BarChart3 } from 'lucide-react';
import styles from './ui.module.css';

const tabs = [
  { id: 'catalog', label: 'Catálogo', icon: ShoppingBag },
  { id: 'requests', label: 'Solicitudes', icon: FileText },
  { id: 'orders', label: 'Órdenes', icon: Package },
  { id: 'reports', label: 'Reportes', icon: BarChart3 }
];

const TabNav = ({ activeTab, onTabChange, mobile = false }) => {
  return (
    <nav className={mobile ? styles.tabNavMobile : styles.tabNav}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            className={`${mobile ? styles.tabButtonMobile : styles.tabButton} ${isActive ? (mobile ? styles.tabButtonMobileActive : styles.tabButtonActive) : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <Icon size={20} />
            <span>{tab.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
};

export default TabNav;
