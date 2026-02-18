import React from 'react';
import styles from './screens.module.css';

const RequestsScreen = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenContent}>
        <h2 className={styles.screenTitle}>Solicitudes de Compra</h2>
        <p className={styles.screenDescription}>
          Gestiona y aprueba solicitudes de compra.
        </p>
      </div>
    </div>
  );
};

export default RequestsScreen;
