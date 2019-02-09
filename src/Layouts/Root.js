import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import NavBar from '../components/NavBar';
import SearchActivity from '../containers/SearchActivity';
import MessageList from '../components/MessageList';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignUp from '../components/SignUp';

const store = configureStore();

const Root = () => (
  <Router>
    <Provider store={store}>
      <NavBar />
      <Switch>
        <Route path="/search" component={SearchActivity} />
        <Route path="/messages" component={MessageList} />
        <Route path="/SignUp" component={SignUp} />
      </Switch>
    </Provider>
  </Router>
);

export default Root;
