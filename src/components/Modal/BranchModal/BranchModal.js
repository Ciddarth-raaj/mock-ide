import React from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';
import BranchItem from './BranchItem';
import { useDispatch, useSelector } from 'react-redux';
import { modifiyBranchModalVisibility } from '../../../redux/CodeEditor/editorActions';
import useBranches from '../../../hooks/useBranches';

function BranchModal() {
  const branchModalVisibility = useSelector((state) => state.branchModalVisibility);
  const dispatch = useDispatch();

  const { localBranches, remoteBranches } = useBranches();

  const handleBranchPress = () => {
    dispatch(modifiyBranchModalVisibility(false));
  };

  if (!branchModalVisibility) {
    return null;
  }

  return createPortal(
    <div className={styles.outerContainer} onClick={handleBranchPress}>
      <div className={styles.mainContainer}>
        <p className={`secondaryHeading ${styles.headingContainer}`}>Select Branch</p>
        <div className={styles.branchItemContainer}>
          {localBranches.map((item) => (
            <BranchItem key={item} branchName={item} isRemote={false} />
          ))}
          {remoteBranches.map((item) => (
            <BranchItem key={item} branchName={item} isRemote />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BranchModal;
