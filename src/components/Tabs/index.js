import React from 'react';
import { useSelector } from 'react-redux';
import TabItem from './TabItem';

import styles from './styles.module.css';

function Tabs() {
  const tabs = useSelector((state) => state.tabs);
  const selectedFile = useSelector((state) => state.selectedFile);

  return (
    <div className={`hiddenScrollbar ${styles.tabsContainer}`}>
      {tabs.map((item) => (
        <TabItem key={item} filePath={item} isOpen={selectedFile === item} />
      ))}
    </div>
  );
}

export default Tabs;
