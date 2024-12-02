import { useEffect } from 'react';

import ListFilesResponseList from '../api/list-files.json';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, ListFilesResponse } from '../types/files';
import { setStoredWorksheet, setStoresFiles } from '../redux/CodeEditor/editorActions';
import useStoredWorksheetsResponse from './useStoredWorksheetsResponse';
import { getFileByPath } from '../utils/files';

function useStoredResponse() {
  const storedFiles = useSelector((state: EditorState) => state.storedFiles);
  const selectedBranch = useSelector((state: EditorState) => state.selectedBranch);
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

      if (
        worksheets.find((item) => item.relativePath === filePath && item.branch === selectedBranch)
      ) {
        const modifiedWorksheet = worksheets.map((item) =>
          item.relativePath === filePath && item.branch === selectedBranch
            ? { ...item, modifiedContent: finalValue }
            : item
        );

        dispatch(setStoredWorksheet(modifiedWorksheet));
      } else {
        const file = getFileByPath(storedFiles, filePath);

        if (file) {
          worksheets.push({
            relativePath: filePath,
            name: file.name,
            pathType: file.pathType,
            depth: 0,
            index: file.index,
            gitStatus: file.gitStatus,
            editorContent: '',
            modifiedContent: finalValue,
            gitIgnored: file.gitIgnored,
            branch: selectedBranch
          });

          dispatch(setStoredWorksheet(worksheets));
        }
      }
    }
  };

  return { files: storedFiles, modifyContentByFilePath };
}

export default useStoredResponse;
