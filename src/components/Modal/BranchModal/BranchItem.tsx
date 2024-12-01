import React from 'react';
import { useDispatch } from 'react-redux';
import { selectBranch } from '../../../redux/CodeEditor/editorActions';
import styles from './styles.module.css';

interface BranchItemProps {
  branchName: string;
  isRemote: boolean;
}

const BranchItem: React.FC<BranchItemProps> = ({ branchName, isRemote }) => {
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
};

export default BranchItem;
