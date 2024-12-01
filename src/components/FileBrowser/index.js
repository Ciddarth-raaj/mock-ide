import React from 'react';

import styles from './styles.module.css';
import FileItem from './FileItem/FileItem';
import useFileBrowser from '../../hooks/useFileBrowser';
import { useSelector } from 'react-redux';

function FileBrowser() {
  const selectedFile = useSelector((state) => state.selectedFile);

  const { files } = useFileBrowser();

  return (
    <div className={styles.mainContainer}>
      <p className={`secondaryHeading ${styles.sectionHeading}`}>FILE BROWSER</p>

      {files.map((item) => (
        <FileItem
          key={item.relativePath}
          fileName={item.name}
          relativePath={item.relativePath}
          fileContent={item.editorContent}
          type={item.pathType}
          childrenFiles={item.children}
          isSelected={item.relativePath === selectedFile}
        />
      ))}
    </div>
  );
}

export default FileBrowser;
