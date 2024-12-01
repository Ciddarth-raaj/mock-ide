import { useEffect, useState } from 'react';
import Response from '../api/list-files.json';
import { File, ListFilesResponse } from '../types/files';
import { buildTree } from '../utils/files';

const useFileBrowser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<File[]>([]);

  const parseListFiles = () => {
    setFiles(buildTree((Response as ListFilesResponse).data.files));
  };

  useEffect(() => {
    if (Response) {
      parseListFiles();
    }
  }, []);

  return { files, setFiles, loading, setLoading };
};

export default useFileBrowser;
