import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  MODIFY_CONTENT,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE
} from './actionTypes';
import { getFileContent, getLanguageFromFilename, isSelectedFile } from '../../utils/files';
import { insertUnique } from '../../utils/array';
import { EditorState } from '../../types/files';

// Define the action interface
interface Action {
  type: string;
  payload: any;
}

const initialState: EditorState = {
  editorContent: '',
  selectedFile: null,
  editorLanguage: 'javascript',
  selectedBranch: 'dev',
  tabs: [],
  branchModalVisibility: false
};

export default (state = initialState, action: Action): EditorState => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        editorContent: getFileContent(action.payload.selectedFile, state.selectedBranch),
        editorLanguage: getLanguageFromFilename(action.payload.selectedFile),
        selectedFile: action.payload.selectedFile,
        tabs: insertUnique(state.tabs, action.payload.selectedFile)
      };
    case MODIFY_CONTENT:
      return {
        ...state,
        editorContent: action.payload.editorContent
      };
    case REMOVE_TAB:
      return {
        ...state,
        tabs: state.tabs.filter((item) => item !== action.payload.selectedFile),
        selectedFile: isSelectedFile(action.payload.selectedFile, state.selectedFile)
          ? null
          : action.payload.selectedFile,
        editorContent: isSelectedFile(action.payload.selectedFile, state.selectedFile)
          ? null
          : action.payload.editorContent,
        editorLanguage: isSelectedFile(action.payload.selectedFile, state.selectedFile)
          ? null
          : action.payload.editorLanguage
      };
    case MODIFY_BRANCH_MODAL_VISIBILITY:
      return {
        ...state,
        branchModalVisibility: action.payload.visibility
      };
    case SELECT_BRANCH:
      return {
        ...state,
        selectedBranch: action.payload.branchName,
        editorContent: getFileContent(state.selectedFile, action.payload.branchName)
      };
    default:
      return state;
  }
};