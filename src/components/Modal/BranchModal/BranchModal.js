import React from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';
import BranchItem from './BranchItem';
import { useDispatch, useSelector } from 'react-redux';
import { modifiyBranchModalVisibility } from '../../../redux/CodeEditor/editorActions';

function BranchModal() {
  const branchModalVisibility = useSelector((state) => state.branchModalVisibility);

  const dispatch = useDispatch();

  const handleBranchPress = () => {
    dispatch(modifiyBranchModalVisibility(false));
  };

  if (!branchModalVisibility) {
    return null;
  }

  return createPortal(
    <div className={styles.outerContainer} onClick={handleBranchPress}>
      <div className={styles.mainContainer}>
        <div className={styles.branchItemContainer}>
          <BranchItem branchName="dev" isRemote={false} />
          <BranchItem branchName="master" isRemote={false} />
          <BranchItem branchName="dev" isRemote={false} />
          <BranchItem branchName="dev" isRemote />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BranchModal;
