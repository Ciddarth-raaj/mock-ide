import { useEffect } from 'react';

import ListFilesResponseList from '../api/list-files.json';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, ListFilesResponse } from '../types/files';
import { setStoresFiles } from '../redux/CodeEditor/editorActions';
import useStoredWorksheetsResponse from './useStoredWorksheetsResponse';

function useStoredResponse() {
  const storedFiles = useSelector((state: EditorState) => state.storedFiles);
  const dispatch = useDispatch();

  const { modifyWorksheetByFilePath, saveCurrentWorksheet } = useStoredWorksheetsResponse();

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
      modifyWorksheetByFilePath(value, filePath);
    }
  };

  const saveCurrentFile = (filePath?: string) => {
    if (filePath) {
      // const modifiedFiles = storedFiles.map((item) =>
      //   item.relativePath === filePath ? { ...item, gitStatus: 'modified' } : item
      // );
      // dispatch(setStoresFiles(modifiedFiles));
      // localStorage.setItem('ListFilesResponse', JSON.stringify(modifiedFiles));

      saveCurrentWorksheet(filePath);
    }
  };

  return { files: storedFiles, modifyContentByFilePath, saveCurrentFile };
}

export default useStoredResponse;
