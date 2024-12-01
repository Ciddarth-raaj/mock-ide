import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  MODIFY_CONTENT,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE
} from './actionTypes';

export const selectFile = (editorContent, selectedFile) => {
  return {
    type: SELECT_FILE,
    payload: { editorContent, selectedFile }
  };
};

export const modifyEditorContent = (editorContent) => {
  return {
    type: MODIFY_CONTENT,
    payload: { editorContent }
  };
};

export const removeTab = (selectedFile) => {
  return {
    type: REMOVE_TAB,
    payload: { selectedFile }
  };
};

export const modifiyBranchModalVisibility = (visibility) => {
  return {
    type: MODIFY_BRANCH_MODAL_VISIBILITY,
    payload: { visibility }
  };
};

export const selectBranch = (branchName) => {
  return {
    type: SELECT_BRANCH,
    payload: { branchName }
  };
};
