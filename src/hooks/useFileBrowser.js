import { useEffect, useState } from 'react';

import Response from '../api/list-files.json';
import { buildTree } from '../utils/files';

function useFileBrowser() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const parseListFiles = () => {
    setFiles(buildTree(Response.data.files));
  };

  useEffect(() => {
    if (Response) {
      parseListFiles();
    }
  }, [Response]);

  return { files, setFiles, loading, setLoading };
}

export default useFileBrowser;
