import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as userEventsDux from '../../redux/dux/userEvents';
import * as userConversationsDux from '../../redux/dux/userConversations';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import SignInFormContainer from '../containers/SignInFormContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import Home from './Home';
import Messages from './Messages';
//import Search from './Search';
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
        <Fragment>
          <div className="header">
            <NavBar />
          </div>
          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/messages" component={Messages} />
              {/*<Route path="/search" component={Search} />*/}
              {/*<Route path="/events" component={Events} />*/}
              <Route path="/signup" component={SignUpFormContainer} />
              <Route path="/signin" component={SignInFormContainer} />
              <Route path="/profile" component={UserProfileContainer} />
            </Switch>
          </div>
        </Fragment>
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
