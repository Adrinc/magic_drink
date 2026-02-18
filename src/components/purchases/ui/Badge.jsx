import React from 'react';
import styles from './ui.module.css';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}) => {
  return (
    <span 
      className={`${styles.badge} ${styles[`badge--${variant}`]} ${styles[`badge--${size}`]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
