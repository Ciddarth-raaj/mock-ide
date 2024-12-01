import React from 'react';

import styles from './styles.module.css';
import FileItem from './FileItem/FileItem';
import useFileBrowser from '../../hooks/useFileBrowser';
import { useSelector } from 'react-redux';
import BranchIcon from '../../assets/BranchIcon';

function FileBrowser() {
  const selectedFile = useSelector((state) => state.selectedFile);
  const selectedBranch = useSelector((state) => state.selectedBranch);

  const { files } = useFileBrowser();

  return (
    <div className={styles.mainContainer}>
      <p className={`secondaryHeading ${styles.sectionHeading}`}>FILE BROWSER</p>

      <div className={styles.filesList}>
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

      <div className={`${styles.branchContainer}`}>
        <BranchIcon />
        <p className={`secondaryHeading`}>{selectedBranch}</p>
      </div>
    </div>
  );
}

export default FileBrowser;
