import React from 'react';

import styles from '../styles/index.module.css';

import CodeEditor from '../components/CodeEditor/index';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import FileBrowser from '../components/FileBrowser';

function Index() {
  return (
    <div className={styles.mainContainer}>
      <ReflexContainer orientation="vertical">
        <ReflexElement minSize="200" size={300}>
          <FileBrowser />
        </ReflexElement>

        <ReflexSplitter size={0} />

        <ReflexElement minSize="200">
          <CodeEditor />
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
}

export default Index;
