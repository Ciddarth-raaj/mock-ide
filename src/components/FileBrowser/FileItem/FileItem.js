import React, { useState } from 'react';

import styles from './styles.module.css';
import { getFileType } from '../../../utils/files';
import JS from '../../../assets/FileTypes/JS';
import JSON from '../../../assets/FileTypes/JSON';
import CSS from '../../../assets/FileTypes/CSS';
import DownArrow from '../../../assets/DownArrow';
import SQL from '../../../assets/FileTypes/SQL';
import PYTHON from '../../../assets/FileTypes/PYTHON';
import LOG from '../../../assets/FileTypes/LOG';
import UNKNOWN from '../../../assets/FileTypes/UNKNOWN';

function FileItem({ fileName, isSelected = false, childrenFiles = [], type }) {
  const [isMinimised, setIsMinimised] = useState(true);

  const canExpand = () => {
    if (type === 'directory') {
      return true;
    }

    return false;
  };

  const getFileIcon = () => {
    if (canExpand()) {
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
      case 'sql':
        return <SQL />;
      case 'py':
        return <PYTHON />;
      case 'log':
        return <LOG />;
    }

    return <UNKNOWN />;
  };

  const handleOnFileClick = () => {
    if (canExpand()) {
      setIsMinimised(!isMinimised);
      return;
    }

    alert(`File ${fileName} opened!`);
  };

  return (
    <div className={`${styles.fileItemContainer}`}>
      <div
        className={`${styles.fileNameStyle} ${isSelected ? styles.selected : ''}`}
        onClick={handleOnFileClick}
      >
        {/* <p className={styles.fileTypeStyle}>{getFileType(fileName)}</p> */}
        {getFileIcon()}
        <p>{fileName}</p>
      </div>

      {!isMinimised && (
        <div className={styles.nestedContainer}>
          {childrenFiles.map((item) => (
            <FileItem
              key={item.relativePath}
              fileName={item.name}
              type={item.pathType}
              childrenFiles={item.children}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileItem;
