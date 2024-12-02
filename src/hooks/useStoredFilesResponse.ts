import { useEffect } from 'react';

import ListFilesResponseList from '../api/list-files.json';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, ListFilesResponse } from '../types/files';
import {
  modifyEditorContent,
  setStoredWorksheet,
  setStoresFiles
} from '../redux/CodeEditor/editorActions';
import useStoredWorksheetsResponse from './useStoredWorksheetsResponse';

function useStoredResponse() {
  const storedFiles = useSelector((state: EditorState) => state.storedFiles);
  const dispatch = useDispatch();

  const { worksheets } = useStoredWorksheetsResponse();

  useEffect(() => {
    const storedFiles = localStorage.getItem('ListFilesResponse');

    if (storedFiles) {
      dispatch(setStoresFiles(JSON.parse(storedFiles)));
    } else {
      dispatch(setStoresFiles((ListFilesResponseList as ListFilesResponse).data.files));
    }
  }, []);

  const modifyContentByFilePath = (value: string | undefined, filePath?: string) => {
    if (filePath) {
      const finalValue = value || '';
      dispatch(modifyEditorContent(finalValue));

      const modifiedWorksheet = worksheets.map((item) =>
        item.relativePath === filePath ? { ...item, modifiedContent: finalValue } : item
      );

      dispatch(setStoredWorksheet(modifiedWorksheet));

      //   const modified = storedFiles.map((item) => {
      //     if (item.relativePath === filePath) {
      //       return {
      //         ...item,
      //         gitStatus: 'modified'
      //       };
      //     }

      //     return item;
      //   });

      //   dispatch(setStoresFiles(modified));
    }
  };

  return { files: storedFiles, modifyContentByFilePath };
}

export default useStoredResponse;
