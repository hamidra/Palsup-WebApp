import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userEventsDux from '../../redux/dux/userEvents';
import * as userConversationsDux from '../../redux/dux/userConversations';
import NavBar from '../components/NavBar';
import SearchActivity from './SearchActivity';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import SignInFormContainer from '../containers/SignInFormContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import Messages from './Messages';
import Playground from './Playground';

const Root = class extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.id) {
      const es = new EventSource(
        `http://localhost:3000/notifications/${this.props.user.id}`
      );
      es.addEventListener('NEW_EVENT', sse =>
        this.props.handleNewEventSse(sse)
      );
      es.addEventListener('NEW_MESSAGE', sse =>
        this.props.handleNewMessageSse(sse)
      );
    }
  }
  render() {
    return (
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
    );
  }
};

const mapStateToProps = state => ({
  user: state && state.user && state.user.info
});

const mapDispatchToProps = dispatch => ({
  handleNewEventSse: sse =>
    dispatch(
      userEventsDux.actions.newEventNotificationRecieved(
        JSON.parse(sse.data).event
      )
    ),
  handleNewMessageSse: async sse => {
    const message = JSON.parse(sse.data).message;
    dispatch(
      userConversationsDux.actions.newMessageNotificationRecieved(message)
    );
    dispatch(userEventsDux.actions.newMessageNotificationRecieved(message));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
