import React from 'react';

import styles from './styles.module.css';
import FileIcon from '../../assets/FileIcon';

function EmptyState() {
  return (
    <div className={styles.emptyStateContainer}>
      <FileIcon />
      <p>Select a file to start editing</p>
    </div>
  );
}

export default EmptyState;
