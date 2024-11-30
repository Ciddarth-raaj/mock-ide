import React, { useState } from 'react';

import styles from './styles.module.css';
import { getFileType } from '../../../utils/files';
import JS from '../../../assets/FileTypes/JS';
import JSON from '../../../assets/FileTypes/JSON';
import CSS from '../../../assets/FileTypes/CSS';
import DownArrow from '../../../assets/DownArrow';

// eslint-disable-next-line no-unused-vars
function FileItem({ fileName, isSelected, childrenFiles = [] }) {
  const [isMinimised, setIsMinimised] = useState(false);

  const getFileIcon = () => {
    if (childrenFiles.length > 0) {
      return (
        <span onClick={() => setIsMinimised(!isMinimised)}>
          <DownArrow />
        </span>
      );
    }

    const fileType = getFileType(fileName);

    switch (fileType) {
      case 'js':
        return <JS />;
      case 'json':
        return <JSON />;
      case 'css':
        return <CSS />;
    }

    return null;
  };

  return (
    <div className={`${styles.fileItemContainer}`}>
      <div className={`${styles.fileNameStyle} ${isSelected ? styles.selected : ''}`}>
        {/* <p className={styles.fileTypeStyle}>{getFileType(fileName)}</p> */}
        {getFileIcon()}
        <p>{fileName}</p>
      </div>

      {isMinimised && (
        <div className={styles.nestedContainer}>
          {childrenFiles.map((item) => (
            <FileItem
              key={item.fileName}
              fileName={item.fileName}
              childrenFiles={item.childrenFiles}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileItem;
