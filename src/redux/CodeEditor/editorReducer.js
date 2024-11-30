import { MODIFY_CONTENT, SELECT_FILE } from './actionTypes';
import { getFileContent, getLanguageFromFilename } from '../../utils/files';

const initialState = {
  editorContent: '',
  selectedFile: null,
  editorLanguage: 'javascript',
  selectedBranch: 'dev'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        editorContent: getFileContent(action.payload.selectedFile, state.selectedBranch),
        editorLanguage: getLanguageFromFilename(action.payload.selectedFile),
        selectedFile: action.payload.selectedFile
      };
    case MODIFY_CONTENT:
      return {
        ...state,
        editorContent: action.payload.editorContent
      };
    default:
      return state;
  }
};
