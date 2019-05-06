import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';
import anonymousAvatar from '../../images/anonymousAvatar.png';
import Circle from '../components/icons/circle';
import * as userDux from '../../redux/dux/user';

const NavBar = withRouter(
  class extends Component {
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
            variant="light">
            <Navbar.Brand href="/">Palz</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavLink className="nav-link d-lg-none" to="/profile">
                  Profile
                </NavLink>
                <NavLink className="nav-link" to="/events">
                  Events
                  {eventNotificationCount > 0 && (
                    <span>
                      <Circle className="notification-circle" />
                    </span>
                  )}
                </NavLink>
                <NavLink className="nav-link" to="/pals">
                  Activities
                  {palNotificationCount > 0 && (
                    <span>
                      <Circle className="notification-circle" />
                    </span>
                  )}
                </NavLink>
                <NavLink className="nav-link d-lg-none" to="/signin">
                  Log out
                </NavLink>
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
            <Navbar.Brand href="/">Palz</Navbar.Brand>
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(NavBar);
