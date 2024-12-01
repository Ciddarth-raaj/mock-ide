import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BranchIcon from '../../assets/BranchIcon';
import { modifiyBranchModalVisibility } from '../../redux/CodeEditor/editorActions';
import useFileBrowser from '../../hooks/useFileBrowser';
import FileItem from './FileItem/FileItem';
import styles from './styles.module.css';
import { EditorState } from '../../types/files';

const FileBrowser: React.FC = () => {
  const selectedFile = useSelector((state: EditorState) => state.selectedFile);
  const selectedBranch = useSelector((state: EditorState) => state.selectedBranch);

  const dispatch = useDispatch();
  const { files } = useFileBrowser();

  const handleBranchPress = () => {
    dispatch(modifiyBranchModalVisibility(true));
  };

  return (
    <div className={styles.mainContainer}>
      <p className={`secondaryHeading ${styles.sectionHeading}`}>FILE BROWSER</p>
      <div className={styles.filesList}>
        {files.map((item: any) => (
          <FileItem
            key={item.relativePath}
            fileName={item.name}
            relativePath={item.relativePath}
            type={item.pathType}
            childrenFiles={item.children}
            isSelected={item.relativePath === selectedFile}
            gitStatus={item.gitStatus}
            gitIgnored={item.gitIgnored}
          />
        ))}
      </div>
      <div className={`${styles.branchContainer}`} onClick={handleBranchPress}>
        <BranchIcon />
        <p className={`secondaryHeading`}>{selectedBranch}</p>
      </div>
    </div>
  );
};

export default FileBrowser;
