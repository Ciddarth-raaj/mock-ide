import React from 'react';

import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { selectFile } from '../../redux/CodeEditor/editorActions';

function TabItem({ filePath, isOpen }) {
  const dispatch = useDispatch();

  const handleTabClick = () => {
    dispatch(selectFile('', filePath));
  };

  return (
    <div
      className={`${styles.tabItemContainer} ${isOpen ? styles.selected : ''}`}
      onClick={handleTabClick}
    >
      <p>{filePath}</p>

      <p className={styles.closeButton}>×</p>
    </div>
  );
}

export default TabItem;
