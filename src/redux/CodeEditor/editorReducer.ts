import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  MODIFY_CONTENT,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE,
  SET_STORED_FILES,
  SET_STORED_WORKSHEETS
} from './actionTypes';
import { getLanguageFromFilename, getWorksheet, isSelectedFile } from '../../utils/files';
import { insertUnique } from '../../utils/array';
import { EditorState, Worksheet } from '../../types/files';

interface Action {
  type: string;
  payload: any;
}

const initialState: EditorState = {
  editorWorksheet: undefined,
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
        editorWorksheet: getWorksheet(
          state.storedWorksheets,
          state.selectedBranch,
          action.payload.selectedFile
        ),
        editorLanguage: getLanguageFromFilename(action.payload.selectedFile),
        selectedFile: action.payload.selectedFile,
        tabs: insertUnique(state.tabs, action.payload.selectedFile)
      };
    case MODIFY_CONTENT:
      return {
        ...state,
        editorWorksheet: {
          ...state.editorWorksheet,
          modifiedContent: action.payload.editorContent
        } as Worksheet
      };
    case REMOVE_TAB: {
      const isFileSelected = isSelectedFile(action.payload.selectedFile, state.selectedFile);
      const selectedFileHOC = (value: any) => (isFileSelected ? undefined : value);
      return {
        ...state,
        tabs: state.tabs.filter((item) => item !== action.payload.selectedFile),
        selectedFile: selectedFileHOC(action.payload.selectedFile),
        editorWorksheet: selectedFileHOC(
          getWorksheet(state.storedWorksheets, state.selectedBranch, action.payload.selectedFile)
        ),
        editorLanguage: selectedFileHOC(action.payload.editorLanguage)
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
        editorWorksheet: getWorksheet(
          state.storedWorksheets,
          state.selectedBranch,
          action.payload.selectedFile
        )
      };
    case SET_STORED_FILES:
      return { ...state, storedFiles: action.payload.storedFiles };
    case SET_STORED_WORKSHEETS:
      return { ...state, storedWorksheets: action.payload.storedWorksheets };
    default:
      return state;
  }
};
