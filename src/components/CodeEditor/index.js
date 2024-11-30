import React from 'react';

import styles from './styles.module.css';

import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyEditorContent } from '../../redux/CodeEditor/editorActions';

function CodeEditor() {
  const editorContent = useSelector((state) => state.editorContent);
  const editorLanguage = useSelector((state) => state.editorLanguage);
  const dispatch = useDispatch();

  function handleEditorChange(value) {
    dispatch(modifyEditorContent(value));
  }

  const handleEditorWillMount = (monaco) => {
    const customTheme = {
      base: 'vs-dark', // Base theme (e.g., 'vs', 'vs-dark', 'hc-black')
      inherit: true, // Inherit base theme properties
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

    monaco.editor.defineTheme('customTheme', customTheme);
  };

  return (
    <Editor
      height="100vh"
      language={editorLanguage}
      value={editorContent}
      onChange={handleEditorChange}
      theme="customTheme"
      beforeMount={handleEditorWillMount}
      className={styles.editorStyle}
    />
  );
}

export default CodeEditor;
