import { MODIFY_CONTENT, REMOVE_TAB, SELECT_FILE } from './actionTypes';
import { getFileContent, getLanguageFromFilename, isSelectedFile } from '../../utils/files';
import { insertUnique } from '../../utils/array';

const initialState = {
  editorContent: '',
  selectedFile: null,
  editorLanguage: 'javascript',
  selectedBranch: 'dev',
  tabs: []
};

export default (state = initialState, action) => {
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
    default:
      return state;
  }
};
