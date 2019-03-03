import React, { Component } from 'react';
import { Provider } from 'react-redux';
import NavBar from '../components/NavBar';
import SearchActivity from './SearchActivity';
import MessageThread from '../containers/MessageThreadContainer';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import SignInFormContainer from '../containers/SignInFormContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import Messages from './Messages';
import Playground from './Playground';

export default class Root extends Component {
  componentDidMount() {
    const currentState = this.props.store.getState();
    if (currentState.user.info && currentState.user.info.id) {
      const es = new EventSource(
        `http://localhost:3000/notifications/${currentState.user.info.id}`
      );
      es.addEventListener('NEW_EVENT', e => {
        console.log('sse' + e.data);
      });
      es.addEventListener('NEW_MESSAGE', e => {
        console.log('sse' + e.data);
      });
    }
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <div className="container">
            <NavBar />
            <Switch>
              <Route path="/search" component={SearchActivity} />
              <Route path="/messages" component={Messages} />
              <Route path="/signup" component={SignUpFormContainer} />
              <Route path="/signin" component={SignInFormContainer} />
              <Route path="/profile" component={UserProfileContainer} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
