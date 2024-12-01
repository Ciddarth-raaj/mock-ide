import React from 'react';
import { useSelector } from 'react-redux';
import TabItem from './TabItem';
import styles from './styles.module.css';
import { EditorState } from '../../types/files';

const Tabs: React.FC = () => {
  const tabs = useSelector((state: EditorState) => state.tabs);
  const selectedFile = useSelector((state: EditorState) => state.selectedFile);

  return (
    <div className={`hiddenScrollbar ${styles.tabsContainer}`}>
      {tabs.map((item) => (
        <TabItem key={item} filePath={item} isOpen={selectedFile === item} />
      ))}
    </div>
  );
};

export default Tabs;
