import { MODIFY_CONTENT, SELECT_FILE } from './actionTypes';

const initialState = {
  editorContent: '',
  selectedFile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        editorContent: action.payload.editorContent,
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
