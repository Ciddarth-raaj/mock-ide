import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import { modifyEditorContent } from '../../redux/CodeEditor/editorActions';
import Tabs from '../Tabs';
import styles from './styles.module.css';
import { EditorState } from '../../types/files';

const CodeEditor: React.FC = () => {
  const editorContent = useSelector((state: EditorState) => state.editorContent);
  const editorLanguage = useSelector((state: EditorState) => state.editorLanguage);

  const dispatch = useDispatch();

  const handleEditorChange = (value: string | undefined) => {
    dispatch(modifyEditorContent(value || ''));
  };

  const handleEditorWillMount = (monacoInstance: any) => {
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

    monacoInstance.editor.defineTheme('customTheme', customTheme);
  };

  return (
    <div className={styles.mainContainer}>
      <Tabs />
      <Editor
        height={`calc(100vh - 45px)`}
        language={editorLanguage}
        value={editorContent}
        onChange={handleEditorChange}
        theme="customTheme"
        beforeMount={handleEditorWillMount}
        className={styles.editorStyle}
      />
    </div>
  );
};

export default CodeEditor;
