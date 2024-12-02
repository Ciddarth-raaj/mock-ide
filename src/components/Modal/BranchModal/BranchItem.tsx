import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // modifiyBranchModalVisibility,
  selectBranch
} from '../../../redux/CodeEditor/editorActions';
import styles from './styles.module.css';
import { EditorState } from '../../../types/files';
import AlertDialog from '../../AlertDialogue';
import useStoredWorksheetsResponse from '../../../hooks/useStoredWorksheetsResponse';

interface BranchItemProps {
  branchName: string;
  isRemote: boolean;
}

const BranchItem: React.FC<BranchItemProps> = ({ branchName, isRemote }) => {
  const dispatch = useDispatch();

  const { saveAllUnsavedFiles } = useStoredWorksheetsResponse(false);

  const [showAlert, setShowAlert] = useState(false);

  const storedWorksheets = useSelector((state: EditorState) => state.storedWorksheets);
  const selectedBranch = useSelector((state: EditorState) => state.selectedBranch);

  const allFilesAreSaved = () => {
    for (let item of storedWorksheets) {
      if (item.editorContent !== item.modifiedContent && selectedBranch === item.branch) {
        return false;
      }
    }

    return true;
  };

  const handleItemPress = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (allFilesAreSaved()) {
      handleNoSave();
    } else {
      setShowAlert(true);
    }
  };

  const handleSaveAndChange = () => {
    saveAllUnsavedFiles();
    dispatch(selectBranch(branchName));
  };

  const handleNoSave = () => {
    dispatch(selectBranch(branchName));
  };

  return (
    <>
      {showAlert && (
        <AlertDialog
          title="Are you sure?"
          description="All your unsaved changes will be lost"
          positiveButtonText="Save & Change"
          onPositiveAction={handleSaveAndChange}
          negativeButtonText="Change"
          onNegativeAction={handleNoSave}
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className={styles.itemContainer} onClick={handleItemPress}>
        <p>{branchName}</p>
        {isRemote && <p style={{ opacity: 0.4 }}>remote</p>}
      </div>
    </>
  );
};

export default BranchItem;
