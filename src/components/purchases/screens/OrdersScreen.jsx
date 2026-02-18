import React from 'react';
import styles from './screens.module.css';

const OrdersScreen = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenContent}>
        <h2 className={styles.screenTitle}>Órdenes de Compra</h2>
        <p className={styles.screenDescription}>
          Visualiza y administra órdenes de compra generadas.
        </p>
      </div>
    </div>
  );
};

export default OrdersScreen;
