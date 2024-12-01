import {
  MODIFY_BRANCH_MODAL_VISIBILITY,
  MODIFY_CONTENT,
  REMOVE_TAB,
  SELECT_BRANCH,
  SELECT_FILE
} from './actionTypes';
import { getLanguageFromFilename, getWorksheet, isSelectedFile } from '../../utils/files';
import { insertUnique } from '../../utils/array';
import { EditorState } from '../../types/files';

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
  editedContentMap: {}
};

export default (state = initialState, action: Action): EditorState => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        editorWorksheet: getWorksheet(
          state.selectedBranch,
          state.editedContentMap,
          action.payload.selectedFile
        ),
        editorLanguage: getLanguageFromFilename(action.payload.selectedFile),
        selectedFile: action.payload.selectedFile,
        tabs: insertUnique(state.tabs, action.payload.selectedFile)
      };
    case MODIFY_CONTENT:
      return {
        ...state,
        editedContentMap: {
          ...state.editedContentMap,
          [state.selectedFile ?? '']: action.payload.editorContent
        }
      };
    case REMOVE_TAB:
      return {
        ...state,
        tabs: state.tabs.filter((item) => item !== action.payload.selectedFile),
        selectedFile: isSelectedFile(action.payload.selectedFile, state.selectedFile)
          ? null
          : action.payload.selectedFile,
        editorWorksheet: isSelectedFile(action.payload.selectedFile, state.selectedFile)
          ? undefined
          : getWorksheet(state.selectedBranch, state.editedContentMap, action.payload.selectedFile),
        editorLanguage: isSelectedFile(action.payload.selectedFile, state.selectedFile)
          ? null
          : action.payload.editorLanguage,
        editedContentMap: isSelectedFile(action.payload.selectedFile, state.selectedFile)
          ? { ...state.editedContentMap, [action.payload.selectedFile]: undefined }
          : state.editedContentMap
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
        editorWorksheet: getWorksheet(
          state.selectedBranch,
          state.editedContentMap,
          action.payload.selectedFile
        ),
        editedContentMap: {}
      };
    default:
      return state;
  }
};
