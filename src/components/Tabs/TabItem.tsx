import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTab, selectFile } from '../../redux/CodeEditor/editorActions';
import styles from './styles.module.css';

interface TabItemProps {
  filePath: string;
  isOpen: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ filePath, isOpen }) => {
  const dispatch = useDispatch();

  const handleTabClick = () => {
    dispatch(selectFile('', filePath));
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeTab(filePath));
  };

  const getFileName = (): string => {
    const splitted = filePath.split('/');
    return splitted.pop() || '';
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
};

export default TabItem;
