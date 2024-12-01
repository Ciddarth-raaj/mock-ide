import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  MODIFY_CONTENT,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE
} from './actionTypes';

type ActionType =
  | typeof SELECT_FILE
  | typeof MODIFY_CONTENT
  | typeof REMOVE_TAB
  | typeof MODIFY_BRANCH_MODAL_VISIBILITY
  | typeof SELECT_BRANCH;

export const selectFile = (editorContent: string, selectedFile: string) => ({
  type: SELECT_FILE as ActionType,
  payload: { editorContent, selectedFile }
});

export const modifyEditorContent = (editorContent: string) => ({
  type: MODIFY_CONTENT as ActionType,
  payload: { editorContent }
});

export const removeTab = (selectedFile: string) => ({
  type: REMOVE_TAB as ActionType,
  payload: { selectedFile }
});

export const modifiyBranchModalVisibility = (visibility: boolean) => ({
  type: MODIFY_BRANCH_MODAL_VISIBILITY as ActionType,
  payload: { visibility }
});

export const selectBranch = (branchName: string) => ({
  type: SELECT_BRANCH as ActionType,
  payload: { branchName }
});
