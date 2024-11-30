import { MODIFY_CONTENT, SELECT_FILE } from './actionTypes';

export const selectFile = (editorContent, selectedFile) => {
  return {
    type: SELECT_FILE,
    payload: { editorContent, selectedFile }
  };
};

export const modifyEditorContent = (editorContent) => {
  return {
    type: MODIFY_CONTENT,
    payload: { editorContent }
  };
};
