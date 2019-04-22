import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as userEventsDux from '../../redux/dux/userEvents';
import * as userConversationsDux from '../../redux/dux/userConversations';
import NavBar from './NavBar';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import UserProfile from './UserProfile';
import Home from './Home';
import Events from './Events';
import EventsConversations from './EventsConversations';
import Pals from './Pals';
import Search from './Search';
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
    const { user } = this.props;
    return (
      <Router>
        <Fragment>
          <div className="header">
            <NavBar />
          </div>
          <div className="container-fluid mt-5">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/events" component={user ? Events : SignIn} />
              <Route
                exact
                path="/events/:id"
                component={user ? EventsConversations : SignIn}
              />
              <Route path="/pals" component={user ? Pals : SignIn} />
              <Route
                path="/search"
                render={props => (
                  <Search key={props.location.search} {...props} />
                )}
              />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/profile" component={user ? UserProfile : SignIn} />
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
