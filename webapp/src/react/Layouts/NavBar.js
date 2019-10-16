import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';
import anonymousAvatar from '../../images/anonymousAvatar.png';
import Circle from '../components/icons/circle';
import * as userDux from '../../redux/dux/user';
import * as dux from '../../redux/dux/index';

const NavBar = withRouter(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: false
      };
      this.onSelect = this.onSelect.bind(this);
      this.onToggle = this.onToggle.bind(this);
    }
    componentDidMount() {
      try {
        this.props.fetchNotificationCounts();
      } catch (err) {
        console.log(`failed to fetch notification count for user err:${err}`);
      }
    }
    componentDidUpdate(prevProps) {
      console.log(`prev: ${JSON.stringify(prevProps.match)}`);
      console.log(`prop: ${JSON.stringify(this.props.match)}`);
      try {
        if (
          this.props.user &&
          prevProps.location.pathname !== this.props.location.pathname
        ) {
          this.props.fetchNotificationCounts();
        }
      } catch (err) {
        console.log(`failed to fetch notification count for user err:${err}`);
      }
    }
    onSelect() {
      this.setState({ expanded: false });
    }
    onToggle(expanded) {
      this.setState({ expanded: expanded });
    }
    render() {
      const {
        user,
        eventNotificationCount,
        palNotificationCount,
        handleLogout
      } = this.props;
      if (user) {
        return (
          <Navbar
            collapseOnSelect
            fixed="top"
            expand="lg"
            bg="light"
            variant="light"
            onToggle={this.onToggle}
            expanded={this.state.expanded}>
            <Navbar.Brand href="/">
              <div className="logo" />
            </Navbar.Brand>
            <NavLink exact className="nav-link d-none d-md-inline-block" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link nav-item" to="/events">
              Events
              {eventNotificationCount > 0 && (
                <span>
                  <Circle className="notification-circle" />
                </span>
              )}
            </NavLink>
            <NavLink className="nav-link nav-item" to="/pals">
              Activities
              {palNotificationCount > 0 && (
                <span>
                  <Circle className="notification-circle" />
                </span>
              )}
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" onClick={() => this.onSelect()}>
                <NavLink className="nav-link d-lg-none" to="/profile">
                  <Thumbnail user={user} />
                </NavLink>
                <div
                  className="nav-link  d-lg-none text-left"
                  onClick={() => {
                    handleLogout();
                    this.props.history.push('/');
                  }}>
                  Log out
                </div>
              </Nav>
              <Nav className="align-items-center ml-auto">
                <button
                  className="btn btn-primary d-none d-lg-inline-block"
                  onClick={() => {
                    handleLogout();
                    this.props.history.push('/');
                  }}>
                  Log out
                </button>
                <NavLink
                  className="nav-link d-none d-lg-inline-block"
                  to="/profile">
                  <Thumbnail user={user} />
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      } else {
        return (
          <Navbar fixed="top" bg="light" variant="light">
            <Navbar.Brand href="/">
              <div className="logo" />
            </Navbar.Brand>
            <Nav>
              <NavLink exact className="nav-link" to="/">
                Home
              </NavLink>
            </Nav>
            <Nav className="ml-auto d-lg-none">
              <NavLink className="nav-link" to="/signin">
                Log in
              </NavLink>
              <NavLink className="nav-link" to="/signup">
                Sign up
              </NavLink>
            </Nav>
            <Nav className="align-items-center ml-auto d-none d-lg-flex">
              <a className="btn btn-primary" href="/signin">
                Log in
              </a>
              <NavLink className="nav-link" to="/profile">
                <img
                  src={anonymousAvatar}
                  className="avatar avatar-border-white d-inline-block rounded-circle"
                  alt="..."
                />
              </NavLink>
            </Nav>
          </Navbar>
        );
      }
    }
  }
);

const mapStateToProps = state => ({
  user: state.user && state.user.isAuthenticated && state.user.info,
  eventNotificationCount:
    state.userEvents && state.userEvents.notificationCount,
  palNotificationCount: state.userPals && state.userPals.notificationCount
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    dispatch(userDux.actions.loggedOut());
  },
  fetchNotificationCounts: () => {
    dispatch(dux.asyncActions.fetchNotificationCounts());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(NavBar);
