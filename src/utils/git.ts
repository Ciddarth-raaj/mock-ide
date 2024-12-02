import { File, Worksheet } from '../types/files';

interface WorksheetData {
  files: File[];
  // eslint-disable-next-line no-unused-vars
  getWorksheet: (filePath: string) => Worksheet | undefined;
}

const checkIfChildIsModified = ({ files, getWorksheet }: WorksheetData) => {
  for (let file of files) {
    const worksheet = getWorksheet(file.relativePath);

    if (worksheet?.gitStatus === 'modified') {
      return true;
    }
  }

  return false;
};

export const getGitStatusStyle = (
  gitStatus?: string | null,
  gitIgnored?: boolean,
  worksheetData?: WorksheetData
) => {
  if (gitIgnored) {
    return { opacity: 0.2 };
  }

  if (gitStatus === 'modified' || (worksheetData && checkIfChildIsModified(worksheetData))) {
    return { color: 'var(--gitModified)' };
  }

  if (gitStatus === 'untracked') {
    return { color: 'var(--gitUntracked)' };
  }

  return { color: 'var(--fontColor)' };
};

export const getGitStatusText = (gitStatus?: string | null) => {
  if (gitStatus === 'modified') {
    return 'M';
  }

  if (gitStatus === 'untracked') {
    return 'U';
  }

  return '';
};
