import React from 'react';

import Editor from '@monaco-editor/react';

function CodeEditor() {
  function handleEditorChange(value) {
    console.log('here is the current model value:', value);
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
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onChange={handleEditorChange}
      theme="customTheme"
      beforeMount={handleEditorWillMount}
    />
  );
}

export default CodeEditor;
