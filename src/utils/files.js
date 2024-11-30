import OpenWorksheets from '../api/open-worksheets.json';

export const getFileType = (fileName) => {
  const splitted = fileName.split('.');

  if (splitted.length > 0) {
    return splitted[splitted.length - 1];
  }

  return undefined;
};

export const buildTree = (data) => {
  const root = {};
  data.forEach((item) => {
    const parts = item.relativePath.split('/');
    let current = root;

    parts.forEach((part, index) => {
      if (!current.children) current.children = [];
      let existing = current.children.find((child) => child.name === part);

      if (!existing) {
        existing = {
          name: part,
          pathType: item.pathType,
          depth: index,
          relativePath: parts.slice(0, index + 1).join('/'),
          gitStatus: null,
          gitIgnored: false,
          ...(index === parts.length - 1 ? item : {})
        };
        current.children.push(existing);
      }
      current = existing;
    });
  });
  return root.children;
};

export const getFileContent = (selectedFile, selectedBranch) => {
  const selectedWorksheet = OpenWorksheets.activeWorksheets.find(
    (item) => item.relativePath === selectedFile && item.branch === selectedBranch
  );

  if (selectedWorksheet) {
    return selectedWorksheet.editorContent;
  }

  return '';
};

export const getLanguageFromFilename = (filename) => {
  const extension = getFileType(filename);

  // Map of file extensions to Monaco languages
  const extensionToLanguageMap = {
    js: 'javascript',
    ts: 'typescript',
    jsx: 'javascript',
    tsx: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    cs: 'csharp',
    html: 'html',
    css: 'css',
    scss: 'scss',
    php: 'php',
    json: 'json',
    xml: 'xml',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    sql: 'sql',
    go: 'go',
    swift: 'swift',
    rb: 'ruby',
    kt: 'kotlin',
    sh: 'shell',
    txt: 'plaintext'
  };

  return extensionToLanguageMap[extension] || 'plaintext';
};
