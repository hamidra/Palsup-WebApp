import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrapious.css';
import Root from './react/Layouts/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

const store = configureStore({
  user: JSON.parse(localStorage.getItem('user'))
});

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
