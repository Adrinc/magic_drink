import React from 'react';
import styles from './screens.module.css';

const ReportsScreen = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenContent}>
        <h2 className={styles.screenTitle}>Reportes y Analítica</h2>
        <p className={styles.screenDescription}>
          Monitorea KPIs, presupuestos y análisis de compras.
        </p>
      </div>
    </div>
  );
};

export default ReportsScreen;
