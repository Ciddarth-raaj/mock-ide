import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import { modifyEditorContent } from '../../redux/CodeEditor/editorActions';
import Tabs from '../Tabs';
import styles from './styles.module.css';
import { EditorState } from '../../types/files';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeContextType } from '../../types/context';

const darkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '569CD6' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'number', foreground: 'B5CEA8' }
  ],
  colors: {
    'editor.background': '#0b0718', // Background color
    'editor.foreground': '#D4D4D4' // Default text color
  }
};

const lightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '569CD6' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'number', foreground: 'B5CEA8' }
  ],
  colors: {
    'editor.background': '#f9f9fc', // Background color
    'editor.foreground': '#D4D4D4' // Default text color
  }
};

const CodeEditor: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext) as ThemeContextType;
  const editorContent = useSelector((state: EditorState) => state.editorContent);
  const editorLanguage = useSelector((state: EditorState) => state.editorLanguage);
  // const editedContentMap = useSelector((state: EditorState) => state.editedContentMap);

  const dispatch = useDispatch();

  const handleEditorChange = (value: string | undefined) => {
    dispatch(modifyEditorContent(value || ''));
  };

  const handleEditorWillMount = (monacoInstance: any) => {
    monacoInstance.editor.defineTheme('darkTheme', darkTheme);
    monacoInstance.editor.defineTheme('lightTheme', lightTheme);
  };

  return (
    <div className={styles.mainContainer}>
      <Tabs />
      <Editor
        height={`calc(100vh - 45px)`}
        language={editorLanguage}
        value={editorContent}
        onChange={handleEditorChange}
        theme={isDarkMode ? 'darkTheme' : 'lightTheme'}
        beforeMount={handleEditorWillMount}
        className={styles.editorStyle}
      />
    </div>
  );
};

export default CodeEditor;
