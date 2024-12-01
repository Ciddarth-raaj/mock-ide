import { useEffect, useState } from 'react';

import Response from '../api/branches.json';

function useBranches() {
  const [loading, setLoading] = useState(true);
  const [localBranches, setLocalBranches] = useState([]);
  const [remoteBranches, setRemoteBranches] = useState([]);

  const parseListFiles = () => {
    setLocalBranches(Response.data.localBranches);
    setRemoteBranches(Response.data.remoteBranches);
  };

  useEffect(() => {
    if (Response) {
      parseListFiles();
    }
  }, [Response]);

  return { localBranches, loading, setLoading, remoteBranches };
}

export default useBranches;
