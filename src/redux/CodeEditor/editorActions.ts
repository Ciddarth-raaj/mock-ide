import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  MODIFY_CONTENT,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE
} from './actionTypes';

export const selectFile = (editorContent: string, selectedFile: string) => ({
  type: SELECT_FILE,
  payload: { editorContent, selectedFile }
});

export const modifyEditorContent = (editorContent: string) => ({
  type: MODIFY_CONTENT,
  payload: { editorContent }
});

export const removeTab = (selectedFile: string) => ({
  type: REMOVE_TAB,
  payload: { selectedFile }
});

export const modifiyBranchModalVisibility = (visibility: boolean) => ({
  type: MODIFY_BRANCH_MODAL_VISIBILITY,
  payload: { visibility }
});

export const selectBranch = (branchName: string) => ({
  type: SELECT_BRANCH,
  payload: { branchName }
});
