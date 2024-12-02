import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTab, selectFile } from '../../redux/CodeEditor/editorActions';
import styles from './styles.module.css';
import { getWorksheet } from '../../utils/files';
import { EditorState } from '../../types/files';
import { getGitStatusStyle, getGitStatusText } from '../../utils/git';
import AlertDialog from '../AlertDialogue';
import useStoredWorksheetsResponse from '../../hooks/useStoredWorksheetsResponse';

interface TabItemProps {
  filePath: string;
  isOpen: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ filePath, isOpen }) => {
  const { selectedBranch, storedWorksheets } = useSelector((state: EditorState) => state);
  const worksheet = getWorksheet(storedWorksheets, selectedBranch, filePath);
  const isUnsaved = worksheet?.editorContent !== worksheet?.modifiedContent;

  const { saveCurrentWorksheet } = useStoredWorksheetsResponse(false);

  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const handleTabClick = () => {
    dispatch(selectFile('', filePath));
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // dispatch(removeTab(filePath));
    if (isUnsaved) {
      setShowAlert(true);
    } else {
      handleSave();
    }
  };

  const handleNoSave = () => {
    setShowAlert(false);
    dispatch(removeTab(filePath));
  };

  const handleSave = () => {
    setShowAlert(false);
    saveCurrentWorksheet(filePath);
    dispatch(removeTab(filePath));
  };

  const getFileName = (): string => {
    const splitted = filePath.split('/');
    return splitted.pop() || '';
  };

  return (
    <>
      {showAlert && (
        <AlertDialog
          title="Are you sure?"
          description={
            <span>
              {`Do you want to save the changes you made to ${getFileName()}?`}
              <br />
              <br />
              {"Your changes will be lost if you don't save them."}
            </span>
          }
          positiveButtonText="Save"
          onPositiveAction={handleSave}
          negativeButtonText="Don't Save"
          onNegativeAction={handleNoSave}
          onClose={() => setShowAlert(false)}
        />
      )}

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
    </>
  );
};

export default TabItem;
