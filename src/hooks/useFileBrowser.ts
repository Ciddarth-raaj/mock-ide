import { useEffect, useState } from 'react';
import { EditorState, File } from '../types/files';
import { buildTree } from '../utils/files';
import { useSelector } from 'react-redux';

// Used to handle all files API related tasks
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

  useEffect(() => {
    let timer = setTimeout(() => setLoading(false), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { files, setFiles, loading, setLoading };
};

export default useFileBrowser;
