import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../redux/configureStore';
import NavBar from '../components/NavBar';
import SearchActivity from './SearchActivity';
import MessageList from '../components/MessageList';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import SignInFormContainer from '../containers/SignInFormContainer';

const store = configureStore({
  user: JSON.parse(localStorage.getItem('user'))
});

const Root = () => (
  <Router>
    <Provider store={store}>
      <NavBar />
      <Switch>
        <Route path="/search" component={SearchActivity} />
        <Route path="/messages" component={MessageList} />
        <Route path="/SignUp" component={SignUpFormContainer} />
        <Route path="/SignIn" component={SignInFormContainer} />
      </Switch>
    </Provider>
  </Router>
);

export default Root;
