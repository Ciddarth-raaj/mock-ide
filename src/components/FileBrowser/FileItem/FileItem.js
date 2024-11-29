import React from 'react';

import styles from './styles.module.css';

// eslint-disable-next-line no-unused-vars
function FileItem({ fileName, isSelected }) {
  return (
    <div className={`${styles.fileItemContainer}`}>
      <div className={`${styles.fileNameStyle} ${isSelected ? styles.selected : ''}`}>
        {fileName}
      </div>
    </div>
  );
}

export default FileItem;
