import { useEffect } from 'react';

import WorksheetResponse from '../api/open-worksheets.json';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, Worksheet } from '../types/files';
import { setStoredWorksheet } from '../redux/CodeEditor/editorActions';
import { getFileByPath } from '../utils/files';

function useStoredWorksheetsResponse(shouldInitialise?: boolean) {
  const storedFiles = useSelector((state: EditorState) => state.storedFiles);
  const storedWorksheets = useSelector((state: EditorState) => state.storedWorksheets);
  const selectedBranch = useSelector((state: EditorState) => state.selectedBranch);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldInitialise === undefined || shouldInitialise === false) {
      const storedWorksheet = localStorage.getItem('ListWorksheetResponse');

      if (storedWorksheet) {
        dispatch(setStoredWorksheet(JSON.parse(storedWorksheet)));
      } else {
        dispatch(
          setStoredWorksheet(
            (WorksheetResponse as { activeWorksheets: Worksheet[] }).activeWorksheets
          )
        );
      }
    }
  }, [shouldInitialise]);

  const isWorksheetFound = (filePath: string) => {
    return storedWorksheets.find(
      (item) => item.relativePath === filePath && item.branch === selectedBranch
    );
  };

  const modifyWorksheetByFilePath = (value: string | undefined, filePath?: string) => {
    if (filePath) {
      const finalValue = value || '';

      if (isWorksheetFound(filePath)) {
        const modifiedWorksheet = storedWorksheets.map((item) =>
          item.relativePath === filePath && item.branch === selectedBranch
            ? { ...item, modifiedContent: finalValue }
            : item
        );

        dispatch(setStoredWorksheet(modifiedWorksheet));
      } else {
        const file = getFileByPath(storedFiles, filePath);

        if (file) {
          storedWorksheets.push({
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

          dispatch(setStoredWorksheet(storedWorksheets));
        }
      }
    }
  };

  const saveCurrentWorksheet = (filePath?: string) => {
    if (filePath) {
      if (isWorksheetFound(filePath)) {
        const modifiedWorksheet = storedWorksheets.map((item) =>
          item.relativePath === filePath && item.branch === selectedBranch
            ? { ...item, editorContent: item.modifiedContent, gitStatus: 'modified' }
            : item
        );

        dispatch(setStoredWorksheet(modifiedWorksheet));
        localStorage.setItem('ListWorksheetResponse', JSON.stringify(modifiedWorksheet));
      }
    }
  };

  return { worksheets: storedWorksheets, modifyWorksheetByFilePath, saveCurrentWorksheet };
}

export default useStoredWorksheetsResponse;
