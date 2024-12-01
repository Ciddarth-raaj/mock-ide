import { createStore } from 'redux';
import editorReducer from './editorReducer';

const editorStore = createStore(editorReducer);

export default editorStore;
