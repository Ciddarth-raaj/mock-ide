import React from 'react';

import styles from './styles.module.css';

function TabItem({ filePath, isOpen }) {
  return (
    <div className={`${styles.tabItemContainer} ${isOpen ? styles.selected : ''}`}>
      <p>{filePath}</p>

      <p className={styles.closeButton}>×</p>
    </div>
  );
}

export default TabItem;
