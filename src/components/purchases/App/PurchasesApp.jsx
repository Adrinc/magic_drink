import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $activeTab, setActiveTab } from '../../../stores/purchasesStore';
import TopBar from '../ui/TopBar';
import CatalogScreen from '../screens/CatalogScreen';
import RequestsScreen from '../screens/RequestsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import styles from './purchasesApp.module.css';

const PurchasesApp = () => {
  const activeTab = useStore($activeTab);
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCreateRequest = () => {
    // Por ahora, solo cambiamos a la tab de solicitudes
    // En FASE 4 agregaremos el modal wizard
    setActiveTab('requests');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'catalog':
        return <CatalogScreen onCreateRequest={handleCreateRequest} />;
      case 'requests':
        return <RequestsScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'reports':
        return <ReportsScreen />;
      default:
        return <CatalogScreen onCreateRequest={handleCreateRequest} />;
    }
  };

  return (
    <div className={styles.app}>
      <TopBar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className={styles.main}>
        {renderScreen()}
      </main>
    </div>
  );
};

export default PurchasesApp;
