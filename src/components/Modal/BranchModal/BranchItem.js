import React from 'react';

import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { selectBranch } from '../../../redux/CodeEditor/editorActions';

function BranchItem({ branchName, isRemote }) {
  const dispatch = useDispatch();

  const handleItemPress = () => {
    dispatch(selectBranch(branchName));
  };

  return (
    <div className={styles.itemContainer} onClick={handleItemPress}>
      <p>{branchName}</p>

      {isRemote && <p style={{ opacity: 0.4 }}>remote</p>}
    </div>
  );
}

export default BranchItem;
