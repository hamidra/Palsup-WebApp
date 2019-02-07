import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import NavBar from '../components/NavBar';
import SearchActivity from './SearchActivity';
import MessageList from '../components/MessageList';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const store = configureStore();

const Root = () => (
  <Router>
    <Provider store={store}>
      <NavBar />
      <Route path="/search" component={SearchActivity} />
      <Route path="/messages" component={MessageList} />
    </Provider>
  </Router>
);

export default Root;
