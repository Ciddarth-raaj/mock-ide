import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE,
  SET_STORED_FILES,
  SET_STORED_WORKSHEETS
} from './actionTypes';
import {
  getLanguageFromFilename,
  isSelectedFile,
  resetAllWorksheet,
  resetWorksheetByPath
} from '../../utils/files';
import { insertUnique } from '../../utils/array';
import { EditorState } from '../../types/files';

interface Action {
  type: string;
  payload: any;
}

const initialState: EditorState = {
  selectedFile: undefined,
  editorLanguage: 'javascript',
  selectedBranch: 'dev',
  tabs: [],
  branchModalVisibility: false,
  storedFiles: [],
  storedWorksheets: []
};

export default (state = initialState, action: Action): EditorState => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        editorLanguage: getLanguageFromFilename(action.payload.selectedFile),
        selectedFile: action.payload.selectedFile,
        tabs: insertUnique(state.tabs, action.payload.selectedFile)
      };
    case REMOVE_TAB: {
      const isFileSelected = isSelectedFile(action.payload.selectedFile, state.selectedFile);
      const selectedFileHOC = (value: any) => (isFileSelected ? undefined : value); // HOC used to return undefined (to reset the editor) if the current file is selected and then closed
      return {
        ...state,
        tabs: state.tabs.filter((item) => item !== action.payload.selectedFile),
        selectedFile: selectedFileHOC(state.selectedFile),
        editorLanguage: selectedFileHOC(state.editorLanguage),

        // The editorContent value is stored in modifiedContent to reset the file
        storedWorksheets: resetWorksheetByPath(
          state.storedWorksheets,
          action.payload.selectedFile,
          state.selectedBranch
        )
      };
    }
    case MODIFY_BRANCH_MODAL_VISIBILITY:
      return {
        ...state,
        branchModalVisibility: action.payload.visibility
      };
    case SELECT_BRANCH:
      return {
        ...state,
        selectedBranch: action.payload.branchName,
        storedWorksheets: resetAllWorksheet(state.storedWorksheets, state.selectedBranch), // All unsaved changes will be reset
        branchModalVisibility: false
      };
    case SET_STORED_FILES:
      return { ...state, storedFiles: action.payload.storedFiles };
    case SET_STORED_WORKSHEETS:
      return { ...state, storedWorksheets: action.payload.storedWorksheets };
    default:
      return state;
  }
};
