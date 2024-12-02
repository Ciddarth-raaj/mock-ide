import { useEffect, useState } from 'react';
import { EditorState, File } from '../types/files';
import { buildTree } from '../utils/files';
import { useSelector } from 'react-redux';

const useFileBrowser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<File[]>([]);

  const storedFiles = useSelector((state: EditorState) => state.storedFiles);

  const parseListFiles = () => {
    setFiles(buildTree(storedFiles));
  };

  useEffect(() => {
    if (storedFiles) {
      parseListFiles();
    }
  }, [storedFiles]);

  return { files, setFiles, loading, setLoading };
};

export default useFileBrowser;
