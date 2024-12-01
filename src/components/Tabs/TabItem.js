import React from 'react';

import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { removeTab, selectFile } from '../../redux/CodeEditor/editorActions';

function TabItem({ filePath, isOpen }) {
  const dispatch = useDispatch();

  const handleTabClick = () => {
    dispatch(selectFile('', filePath));
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    dispatch(removeTab(filePath));
  };

  // const getFilePath = () => {
  //   const splitted = filePath.split('/');
  //   splitted.pop();

  //   return splitted.join('/');
  // };

  const getFileName = () => {
    const splitted = filePath.split('/');

    return splitted.pop();
  };

  return (
    <div
      className={`${styles.tabItemContainer} ${isOpen ? styles.selected : ''}`}
      onClick={handleTabClick}
    >
      <p>{getFileName()}</p>

      <p className={styles.closeButton} onClick={handleCloseClick}>
        ×
      </p>
    </div>
  );
}

export default TabItem;
