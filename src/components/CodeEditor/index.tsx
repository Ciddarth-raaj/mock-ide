import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import Tabs from '../Tabs';
import styles from './styles.module.css';
import { EditorState } from '../../types/files';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeContextType } from '../../types/context';
import EmptyState from './EmptyState';
import useStoredResponse from '../../hooks/useStoredFilesResponse';
import { getWorksheet } from '../../utils/files';

const darkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [{ token: 'comment', foreground: '6A9955', fontStyle: 'italic' }],
  colors: {
    'editor.background': '#0b0718', // Background color
    'editor.foreground': '#D4D4D4' // Default text color
  }
};

const lightTheme = {
  base: 'vs',
  inherit: true,
  rules: [{ token: 'comment', foreground: '6A9955', fontStyle: 'italic' }],
  colors: {
    'editor.background': '#f9f9fc', // Background color
    'editor.foreground': '#D4D4D4' // Default text color
  }
};

const CodeEditor: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext) as ThemeContextType;

  const selectedFile = useSelector((state: EditorState) => state.selectedFile);
  const editorLanguage = useSelector((state: EditorState) => state.editorLanguage);
  const { selectedBranch, storedWorksheets } = useSelector((state: EditorState) => state);
  const editorWorksheet = getWorksheet(storedWorksheets, selectedBranch, selectedFile);

  const { modifyContentByFilePath, saveCurrentFile } = useStoredResponse();

  const handleEditorChange = (value: string | undefined) => {
    modifyContentByFilePath(value || '', selectedFile);
  };

  const handleEditorWillMount = (monacoInstance: any) => {
    monacoInstance.editor.defineTheme('darkTheme', darkTheme);
    monacoInstance.editor.defineTheme('lightTheme', lightTheme);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const code = event.which || event.keyCode;

      let charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === 's') {
        event.preventDefault();
        saveCurrentFile(selectedFile);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFile, saveCurrentFile]);

  return (
    <div className={styles.mainContainer}>
      <Tabs />

      {selectedFile !== undefined && (
        <Editor
          height={`calc(100vh - 45px)`}
          language={editorLanguage}
          value={editorWorksheet?.modifiedContent ?? ''}
          onChange={handleEditorChange}
          theme={isDarkMode ? 'darkTheme' : 'lightTheme'}
          beforeMount={handleEditorWillMount}
          className={styles.editorStyle}
        />
      )}

      {selectedFile === undefined && <EmptyState />}
    </div>
  );
};

export default CodeEditor;
