import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/components/App.jsx'
import { Provider } from 'react-redux';
import makeStore from './src/store.jsx';
import { addFlashMessage } from './src/actionCreators'

export const store = makeStore();

if(typeof window !== 'undefined') {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}
