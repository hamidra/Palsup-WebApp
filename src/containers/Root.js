import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import SearchActivity from './SearchActivity';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <SearchActivity />
  </Provider>
);

export default Root;
