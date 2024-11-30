export const getFileType = (fileName) => {
  const splitted = fileName.split('.');

  if (splitted.length > 0) {
    return splitted[splitted.length - 1];
  }

  return undefined;
};
