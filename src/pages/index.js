import React from 'react';

import styles from '../styles/index.module.css';

import CodeEditor from '../components/CodeEditor/index';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import FileBrowser from '../components/FileBrowser';
import { Provider } from 'react-redux';
import editorStore from '../redux/CodeEditor/editorStore';

function Index() {
  return (
    <Provider store={editorStore}>
      <div className={styles.mainContainer}>
        <ReflexContainer orientation="vertical">
          <ReflexElement minSize="200" size={300}>
            <FileBrowser />
          </ReflexElement>

          <ReflexSplitter size={0} style={{ borderColor: 'var(--primary)' }} />

          <ReflexElement minSize="200">
            <CodeEditor />
          </ReflexElement>
        </ReflexContainer>
      </div>
    </Provider>
  );
}

export default Index;