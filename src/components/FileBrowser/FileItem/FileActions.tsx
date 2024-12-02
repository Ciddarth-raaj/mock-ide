import React from 'react';

import styles from './styles.module.css';
import AddFile from '../../../assets/AddFile';
import AddFolder from '../../../assets/AddFolder';

function FileActions() {
  return (
    <div className={styles.actionsContainer}>
      <span className={styles.iconContainer}>
        <AddFile />
      </span>

      <span className={styles.iconContainer}>
        <AddFolder />
      </span>
    </div>
  );
}

export default FileActions;
