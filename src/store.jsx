import {createStore} from 'redux';
import reducer from './reducer.jsx';

export default function makeStore() {
  return createStore(reducer, typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f);
}
