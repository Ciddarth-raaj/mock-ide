import { useEffect } from 'react';

import WorksheetResponse from '../api/open-worksheets.json';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, Worksheet } from '../types/files';
import { setStoredWorksheet } from '../redux/CodeEditor/editorActions';

function useStoredWorksheetsResponse() {
  const storedWorksheets = useSelector((state: EditorState) => state.storedWorksheets);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return { worksheets: storedWorksheets };
}

export default useStoredWorksheetsResponse;
