import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as userEventsDux from '../../redux/dux/userEvents';
import * as userConversationsDux from '../../redux/dux/userConversations';
import * as userPalsDux from '../../redux/dux/userPals';
import * as dux from '../../redux/dux/index';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import UserProfile from './UserProfile';
import Home from './Home';
import Events from './Events';
import EventsConversations from './EventsConversations';
import Pals from './Pals';
import Search from './Search';
import { backend_endpoint } from '../../settings';

const Root = class extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.id) {
      const es = new EventSource(
        `${backend_endpoint}/notifications/${this.props.user.id}`
      );
      es.addEventListener('NEW_EVENT', sse =>
        this.props.handleNewEventSse(sse)
      );
      es.addEventListener('NEW_EVENT_INTEREST', sse =>
        this.props.handleEventInterestSse(sse)
      );
      es.addEventListener('NEW_MESSAGE', sse =>
        this.props.handleNewMessageSse(sse)
      );
      es.addEventListener('NEW_PAL_INTEREST', sse =>
        this.props.handlePalInterestSse(sse)
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
          <div className="container-fluid">
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
  user: state && state.user && state.user.isAuthenticated && state.user.info
});

const mapDispatchToProps = dispatch => ({
  handleNewEventSse: async sse =>
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
  },
  handleEventInterestSse: async sse => {
    const data = JSON.parse(sse.data);
    console.log(sse.data);
    data.eventId &&
      data.interestedUser &&
      dispatch(
        userEventsDux.actions.eventInterestNotificationRecieved(
          data.eventId,
          data.interestedUser
        )
      );
  },
  handlePalInterestSse: async sse => {
    const data = JSON.parse(sse.data);
    console.log(sse.data);
    data.palId &&
      data.interestedUserId &&
      dispatch(
        userPalsDux.actions.palInterestNotificationRecieved(
          data.palId,
          data.interestedUserId
        )
      );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
