import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTab, selectFile } from '../../redux/CodeEditor/editorActions';
import styles from './styles.module.css';
import { getWorksheet } from '../../utils/files';
import { EditorState } from '../../types/files';
import { getGitStatusStyle, getGitStatusText } from '../../utils/git';

interface TabItemProps {
  filePath: string;
  isOpen: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ filePath, isOpen }) => {
  const { selectedBranch, storedWorksheets } = useSelector((state: EditorState) => state);
  const worksheet = getWorksheet(storedWorksheets, selectedBranch, filePath);

  const isUnsaved = worksheet?.editorContent !== worksheet?.modifiedContent;

  const dispatch = useDispatch();

  const handleTabClick = () => {
    dispatch(selectFile('', filePath));
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeTab(filePath));
  };

  const getFileName = (): string => {
    const splitted = filePath.split('/');
    return splitted.pop() || '';
  };

  return (
    <div
      className={`${styles.tabItemContainer} ${isOpen ? styles.selected : ''}`}
      onClick={handleTabClick}
    >
      <p
        className={styles.fileNameStyle}
        style={getGitStatusStyle(worksheet?.gitStatus, worksheet?.gitIgnored)}
      >
        {getFileName()}
      </p>

      <span
        className={styles.gitStatusText}
        style={getGitStatusStyle(worksheet?.gitStatus, worksheet?.gitIgnored)}
      >
        {getGitStatusText(worksheet?.gitStatus)}
      </span>

      {/* {isUnsaved && <span className={styles.unsavedDot} />} */}
      {isUnsaved && <span className={styles.unsavedStyle}>UNSAVED</span>}

      <p className={styles.closeButton} onClick={handleCloseClick}>
        ×
      </p>
    </div>
  );
};

export default TabItem;
