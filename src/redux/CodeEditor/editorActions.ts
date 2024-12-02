import { File, Worksheet } from '../../types/files';
import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE,
  SET_STORED_FILES,
  SET_STORED_WORKSHEETS
} from './actionTypes';

export const selectFile = (editorContent: string, selectedFile: string) => ({
  type: SELECT_FILE,
  payload: { editorContent, selectedFile }
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

export const setStoresFiles = (storedFiles: File[]) => ({
  type: SET_STORED_FILES,
  payload: { storedFiles }
});

export const setStoredWorksheet = (storedWorksheets: Worksheet[]) => ({
  type: SET_STORED_WORKSHEETS,
  payload: { storedWorksheets }
});
