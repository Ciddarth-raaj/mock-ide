import React from 'react';

import styles from './styles.module.css';
import FileItem from './FileItem/FileItem';

function FileBrowser() {
  return (
    <div className={styles.mainContainer}>
      <FileItem fileName="FileBrowser.js" />
      <FileItem fileName="styles.module.css" isSelected={true} />
    </div>
  );
}

export default FileBrowser;
