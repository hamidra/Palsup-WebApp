import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';
import anonymousAvatar from '../../images/anonymousAvatar.png';

const NavBar = ({ user }) =>
  user ? (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">Palz</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link d-lg-none" to="/profile">
            Profile
          </NavLink>
          <NavLink className="nav-link" to="/events">
            Events
          </NavLink>
          <NavLink className="nav-link" to="/pals">
            Activities
          </NavLink>
          <NavLink className="nav-link d-lg-none" to="/signin">
            Log out
          </NavLink>
        </Nav>
        <Nav className="align-items-center ml-auto">
          <a
            className="btn btn-primary d-none d-lg-inline-block"
            href="/signin">
            Log out
          </a>
          <NavLink className="nav-link d-none d-lg-inline-block" to="/profile">
            <Thumbnail user={user} />
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : (
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
          />
        </NavLink>
      </Nav>
    </Navbar>
  );

const mapStateToProps = state => ({
  user: state.user && state.user.info
});
export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(NavBar);
