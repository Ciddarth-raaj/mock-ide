import { useEffect } from 'react';

import ListFilesResponseList from '../api/list-files.json';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, ListFilesResponse } from '../types/files';
import { modifyEditorContent, setStoresFiles } from '../redux/CodeEditor/editorActions';

function useStoredResponse() {
  const storedFiles = useSelector((state: EditorState) => state.storedFiles);
  const dispatch = useDispatch();

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
      dispatch(modifyEditorContent(value || ''));

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
