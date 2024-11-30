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
