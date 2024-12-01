import { useEffect, useState } from 'react';
import Response from '../api/branches.json';
import { BranchesResponse } from '../types/files';

const useBranches = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [localBranches, setLocalBranches] = useState<string[]>([]);
  const [remoteBranches, setRemoteBranches] = useState<string[]>([]);

  const parseListFiles = () => {
    const response: BranchesResponse = Response;
    setLocalBranches(response.data.localBranches);
    setRemoteBranches(response.data.remoteBranches);
  };

  useEffect(() => {
    if (Response) {
      parseListFiles();
    }
  }, []);

  return { localBranches, loading, setLoading, remoteBranches };
};

export default useBranches;
